var _action1 = require("scripts/action_general")
var _action2 = require("scripts/action_favorite")
var _action3 = require("scripts/action_setting")
var _data = require("scripts/data")

const ROOT_VC = $objc("UIApplication").invoke("sharedApplication.keyWindow.rootViewController")
const TABBAR_MIAN = $app.env == $env.app ? (ROOT_VC.invoke("selectedIndex") == 0 ? true : false) : false
// Caculate TabBar Height for iPhone X
const TABBAR_HEIGHT = calTabBarHeight(TABBAR_MIAN)

Array.prototype.move = function(from, to) {
  var cellData = this[from]
  this.splice(from, 1)
  this.splice(to, 0, cellData)
}

// Template Object
const template = [{
    type: "image",
    props: {
      id: "cover",
      radius: 5
    },
    layout: function(make) {
      make.width.equalTo(75)
      make.top.bottom.inset(5)
      make.left.inset(15)
    },
    views: [{
      type: "view",
      props: {
        id: "presell",
        hidden: true
      },
      layout: function(make) {
        make.size.equalTo($size(20, 25))
        make.right.inset(5)
        make.top.inset(0)
      },
      views: [{
          type: "canvas",
          layout: $layout.fill,
          events: {
            draw: function(view, ctx) {
              var width = view.frame.width
              var height = view.frame.height
              ctx.fillColor = $color("#8CB155")
              ctx.setAlpha(0.9)
              ctx.moveToPoint(0, 0)
              ctx.addLineToPoint(0, height)
              ctx.addLineToPoint(width * 0.5, height - 5)
              ctx.addLineToPoint(width, height)
              ctx.addLineToPoint(width, 0)
              ctx.fillPath()
            }
          }
        },
        {
          type: "label",
          props: {
            text: "预售",
            textColor: $color("white"),
            font: $font("bold", 8),
            align: $align.center
          },
          layout: function(make) {
            make.height.equalTo(20)
            make.left.top.right.equalTo(0)
          }
        }
      ]
    }]
  },
  {
    type: "label",
    props: {
      id: "title",
      font: $font("bold", 18),
      autoFontSize: true
    },
    layout: function(make) {
      var preView = $("cover")
      make.left.equalTo(preView.right).offset(10)
      make.height.equalTo(18)
      make.top.inset(8)
      make.right.inset(5)
    }
  },
  {
    type: "label",
    props: {
      id: "genres",
      font: $font(12),
      bgcolor: $color("#F5F5F5"),
      textColor: $color("darkGray"),
      radius: 2
    },
    layout: function(make) {
      var preView = $("title")
      make.top.equalTo(preView.bottom).offset(5)
      make.height.equalTo(20)
      make.left.equalTo(preView.left)
    }
  },
  {
    type: "label",
    props: {
      id: "director",
      font: $font(12),
      textColor: $color("darkGray")
    },
    layout: function(make) {
      var preView = $("genres")
      make.top.equalTo(preView.bottom).offset(5)
      make.left.equalTo(preView.left)
      make.right.inset(5)
    }
  },
  {
    type: "label",
    props: {
      id: "cast",
      font: $font(12),
      textColor: $color("darkGray")
    },
    layout: function(make) {
      var preView = $("director")
      make.top.equalTo(preView.bottom).offset(5)
      make.left.equalTo(preView.left)
      make.right.inset(5)
    }
  },
  {
    type: "label",
    props: {
      id: "info",
      font: $font(12),
      textColor: $color("darkGray")
    },
    layout: function(make) {
      var preView = $("cast")
      make.top.equalTo(preView.bottom).offset(5)
      make.left.equalTo(preView.left)
      make.right.inset(5)
    }
  }
]

function calTabBarHeight(isRunningMain) {
  if ($device.isIphoneX) {
    return isRunningMain ? 70 : 50
  }

  return 50
}

/*
 * View objects
 */

function generateMainViewObjects() {
  recent = {
    type: "view",
    props: {
      id: "recent",
      info: "recent",
      hidden: false
    },
    layout: $layout.fill,
    views: [{
        type: "menu",
        props: {
          id: "recent_bar",
          index: SETTING_FILE[0][1],
          items: [$l10n("bar_recent1"), $l10n("bar_recent2"), $l10n("bar_recent3")],
          tintColor: $color(SETTING_FILE[0][5])
        },
        layout: function(make) {
          make.height.equalTo(40)
          make.left.top.right.inset(0)
        },
        events: {
          changed: function(sender) {
            $("onscreen").hidden = true
            $("comingsoon").hidden = true
            $("recent_search").hidden = true
            var idx = sender.index
            if (idx == ON_SCREEN) {
              $("onscreen").hidden = false
            } else if (idx == COMING_SOON) {
              $("comingsoon").hidden = false
            } else {
              $("recent_search").hidden = false
            }
          }
        }
      },
      {
        type: "view",
        props: {
          id: "recent_list",
          info: "recent_list"
        },
        layout: function(make) {
          var preView = $("recent_bar")
          make.top.equalTo(preView.bottom)
          make.left.bottom.right.inset(0)
        },
        views: [{
            type: "list",
            props: {
              id: "onscreen",
              info: 0,
              hidden: true,
              rowHeight: 115,
              bgcolor: $color("#F9F9F9"),
              data: [],
              template: template,
              footer: {
                type: "view",
                props: {
                  height: 60
                },
                views: [{
                  type: "label",
                  props: {
                    id: "onscreen_page",
                    font: $font(12),
                    align: $align.center,
                    textColor: $color("#AAAAAA")
                  },
                  layout: function(make, view) {
                    make.height.equalTo(20)
                    make.centerX.equalTo(view.super)
                    make.top.inset(10)
                  }
                }]
              },
              actions: [{
                title: $l10n("action_favorite"),
                handler: function(sender, indexPath) {
                  var data = sender.object(indexPath)
                  if (unique(data.id)) {
                    _action2.favoriteItem(data)
                  } else {
                    $ui.error($l10n("error_favorited"))
                  }
                }
              }]
            },
            layout: $layout.fill,
            events: {
              didSelect: function(sender, indexPath, data) {
                handleSelected(data)
              },
              pulled: function(sender) {
                _data.fetchDataOnScreen(true)
              },
              didReachBottom: function(sneder) {
                $device.taptic(0)
                var start = $("onscreen").info
                _data.loadDataOnScreen(start)
              }
            }
          },
          {
            type: "list",
            props: {
              id: "comingsoon",
              info: 0,
              hidden: true,
              rowHeight: 115,
              stickyHeader: true,
              bgcolor: $color("#F9F9F9"),
              data: [{
                title: "",
                rows: []
              }],
              template: template,
              footer: {
                type: "view",
                props: {
                  height: 60
                },
                views: [{
                  type: "label",
                  props: {
                    id: "comingsoon_page",
                    font: $font(12),
                    align: $align.center,
                    textColor: $color("#AAAAAA")
                  },
                  layout: function(make, view) {
                    make.height.equalTo(20)
                    make.centerX.equalTo(view.super)
                    make.top.inset(10)
                  }
                }]
              },
              actions: [{
                title: $l10n("action_favorite"),
                handler: function(sender, indexPath) {
                  var data = sender.object(indexPath)
                  if (unique(data.id)) {
                    _action2.favoriteItem(data)
                  } else {
                    $ui.error($l10n("error_favorited"))
                  }
                }
              }]
            },
            layout: $layout.fill,
            events: {
              didSelect: function(sender, indexPath, data) {
                handleSelected(data)
              },
              pulled: function(sender) {
                _data.fetchDataComingSoon(true)
              },
              didReachBottom: function(sneder) {
                $device.taptic(0)
                var start = $("comingsoon").info
                _data.loadDataComingSoon(start)
              }
            }
          },
          {
            type: "list",
            props: {
              id: "recent_search",
              info: "search",
              hidden: true,
              rowHeight: 115,
              bgcolor: $color("#F9F9F9"),
              data: [],
              template: template,
              header: {
                type: "view",
                props: {
                  height: 40
                },
                views: [{
                  type: "input",
                  props: {
                    id: "recent_keyword",
                    placeholder: $l10n("placeholder_recent"),
                    textColor: $color("darkGray")
                  },
                  layout: function(make) {
                    make.left.right.inset(10)
                    make.top.bottom.inset(5)
                  },
                  events: {
                    returned: function(sender) {
                      sender.blur()
                      if (sender.text != "") {
                        _data.fetchDataQuery(sender.text)
                      }
                    },
                    didBeginEditing: function(sender) {
                      sender.runtimeValue().invoke("selectAll")
                    }
                  }
                }]
              },
              actions: [{
                title: $l10n("action_favorite"),
                handler: function(sender, indexPath) {
                  var data = sender.object(indexPath)
                  if (unique(data.id)) {
                    _action2.favoriteItem(data)
                  } else {
                    $ui.error($l10n("error_favoreted"))
                  }
                }
              }]
            },
            layout: $layout.fill,
            events: {
              didSelect: function(sender, indexPath, data) {
                handleSelected(data)
              },
              didEndScrollingAnimation: function(sender) {
                // For focus() To Top
                $ui.animate({
                  duration: 0.2,
                  animation: function() {
                    sender.contentOffset = $point(0, 0)
                  }
                })
              }
            }
          }
        ]
      }
    ]
  }

  // Favorite View Object
  favorite = {
    type: "view",
    props: {
      id: "favorite",
      info: "favorite",
      hidden: true
    },
    layout: $layout.fill,
    views: [{
        type: "menu",
        props: {
          id: "favorite_bar",
          items: [$l10n("bar_favorite1"), $l10n("bar_favorite2"), $l10n("bar_favorite3")],
          tintColor: $color(SETTING_FILE[0][5])
        },
        layout: function(make) {
          make.height.equalTo(40)
          make.left.top.right.inset(0)
        },
        events: {
          changed: function(sender) {
            $("favorited").hidden = true
            $("checked").hidden = true
            $("favorite_search").hidden = true
            var idx = sender.index
            if (idx == FAVORITED) {
              $("favorited").hidden = false
            } else if (idx == CHECKED) {
              $("checked").hidden = false
            } else {
              $("favorite_search").hidden = false
            }
          }
        }
      },
      {
        type: "view",
        props: {
          id: "favorite_list",
          info: "favorite_list"
        },
        layout: function(make) {
          var preView = $("favorite_bar")
          make.top.equalTo(preView.bottom)
          make.left.bottom.right.inset(0)
        },
        views: [{
            type: "list",
            props: {
              id: "favorited",
              hidden: false,
              rowHeight: 115,
              reorder: true,
              stickyHeader: true,
              data: FAVORITE_FILE.FAVORITED,
              template: template,
              footer: {
                props: {
                  height: 0.1
                }
              },
              actions: [{
                  title: $l10n("action_check"),
                  handler: function(sender, indexPath) {
                    var data = sender.object(indexPath)
                    _action2.favoriteCheckUncheck(data, indexPath, "FAVORITED", "CHECKED")
                  }
                },
                {
                  title: "delete",
                  handler: function(sender, indexPath) {
                    _action2.favoriteItemDelete("FAVORITED", indexPath.row)
                  }
                }
              ]
            },
            layout: $layout.fill,
            events: {
              didSelect: function(sender, indexPath, data) {
                handleSelected(data, false)
              },
              reorderMoved: function(from, to) {
                FAVORITE_FILE.FAVORITED.move(from.row, to.row)
              },
              reorderFinished: function() {
                _action3.saveFavorite(FAVORITE_FILE)
              }
            },
            views: [{
              type: "label",
              props: {
                id: "no_favorited",
                hidden: FAVORITE_FILE.FAVORITED.length ? true : false,
                font: $font("bold", 18),
                textColor: $color("gray"),
                text: $l10n("no_favorited")
              },
              layout: $layout.center
            }]
          },
          {
            type: "list",
            props: {
              id: "checked",
              hidden: true,
              rowHeight: 115,
              reorder: true,
              stickyHeader: true,
              data: FAVORITE_FILE.CHECKED,
              template: template,
              footer: {
                props: {
                  height: 0.1
                }
              },
              actions: [{
                  title: $l10n("action_uncheck"),
                  handler: function(sender, indexPath) {
                    var data = sender.object(indexPath)
                    _action2.favoriteCheckUncheck(data, indexPath, "CHECKED", "FAVORITED")
                  }
                },
                {
                  title: "delete",
                  handler: function(sender, indexPath) {
                    _action2.favoriteItemDelete("CHECKED", indexPath.row)
                  }
                }
              ]
            },
            layout: $layout.fill,
            events: {
              didSelect: function(sender, indexPath, data) {
                handleSelected(data, false)
              },
              reorderMoved: function(from, to) {
                FAVORITE_FILE.CHECKED.move(from.row, to.row)
              },
              reorderFinished: function() {
                _action3.saveFavorite(FAVORITE_FILE)
              }
            },
            views: [{
              type: "label",
              props: {
                id: "no_checked",
                hidden: FAVORITE_FILE.CHECKED.length ? true : false,
                font: $font("bold", 18),
                textColor: $color("gray"),
                text: $l10n("no_checked")
              },
              layout: $layout.center
            }]
          },
          {
            type: "list",
            props: {
              id: "favorite_search",
              info: "search",
              hidden: true,
              rowHeight: 115,
              stickyHeader: true,
              bgcolor: $color("#F9F9F9"),
              template: template,
              header: {
                type: "view",
                props: {
                  height: 40
                },
                views: [{
                  type: "input",
                  props: {
                    id: "favorite_keyword",
                    placeholder: $l10n("placeholder_favorite"),
                    textColor: $color("darkGray")
                  },
                  layout: function(make) {
                    make.left.right.inset(10)
                    make.top.bottom.inset(5)
                  },
                  events: {
                    returned: function(sender) {
                      sender.blur()
                      if (sender.text != "") {
                        _action2.findFavorite(sender.text)
                      }
                    },
                    didBeginEditing: function(sender) {
                      sender.runtimeValue().invoke("selectAll")
                    }
                  }
                }]
              },
              actions: [{
                title: $l10n("action_locate"),
                handler: function(sender, indexPath) {
                  var data = sender.object(indexPath)
                  _action2.locateFavorite(indexPath, data)
                }
              }]
            },
            layout: $layout.fill,
            events: {
              didSelect: function(sender, indexPath, data) {
                handleSelected(data, false)
              },
              didEndScrollingAnimation: function(sender) {
                // For focus() To Top
                $ui.animate({
                  duration: 0.2,
                  animation: function() {
                    sender.contentOffset = $point(0, 0)
                  }
                })
              }
            }
          }
        ]
      }
    ]
  }

  // Setting View Object
  setting = {
    type: "list",
    props: {
      id: "setting",
      info: "setting",
      hidden: true,
      showsVerticalIndicator: false,
      data: [{
          title: $l10n("setting_title1"),
          rows: [{
              setup: {
                text: $l10n("setting_1_1")
              },
              value: {
                text: MENU.COVER_IMAGE_QUALITY.filter(function(x) {
                  return SETTING_FILE[0][0] == x.value
                })[0].name
              }
            },
            {
              setup: {
                text: $l10n("setting_1_2")
              },
              value: {
                text: MENU.RECENT_MAIN_INDEX.filter(function(x) {
                  return SETTING_FILE[0][1] == x.value
                })[0].name
              }
            },
            {
              type: "views",
              layout: $layout.fill,
              views: [{
                  type: "label",
                  props: {
                    text: $l10n("setting_1_3"),
                    textColor: $color("darkGray")
                  },
                  layout: function(make, view) {
                    make.centerY.equalTo(view.super)
                    make.left.inset(15)
                  }
                },
                {
                  type: "stepper",
                  props: {
                    min: 10,
                    value: SETTING_FILE[0][2],
                    tintColor: $color(SETTING_FILE[0][5])
                  },
                  layout: function(make, view) {
                    make.centerY.equalTo(view.super)
                    make.right.inset(15)
                  },
                  events: {
                    changed: function(sender) {
                      sender.next.text = sender.value
                      _action3.saveSetting(0, 2, sender.value)
                    }
                  }
                },
                {
                  type: "label",
                  props: {
                    text: SETTING_FILE[0][2].toString(),
                    color: $color(SETTING_FILE[0][5])
                  },
                  layout: function(make, view) {
                    make.centerY.equalTo(view.super)
                    make.right.equalTo(view.prev.left).offset(-10)
                  }
                }
              ]
            },
            {
              type: "views",
              layout: $layout.fill,
              views: [{
                  type: "label",
                  props: {
                    text: $l10n("setting_1_4"),
                    textColor: $color("darkGray")
                  },
                  layout: function(make, view) {
                    make.centerY.equalTo(view.super)
                    make.left.inset(15)
                  }
                },
                {
                  type: "switch",
                  props: {
                    on: SETTING_FILE[0][3],
                    onColor: $color(SETTING_FILE[0][5])
                  },
                  layout: function(make, view) {
                    make.centerY.equalTo(view.super)
                    make.right.inset(15)
                  },
                  events: {
                    changed: function(sender) {
                      $cache.clear()
                      _action3.saveSetting(0, 3, sender.on)
                    }
                  }
                }
              ]
            },
            {
              setup: {
                text: $l10n("setting_1_5")
              },
              value: {
                text: ""
              }
            },
            {
              setup: {
                text: $l10n("setting_1_6")
              },
              value: {
                text: ""
              }
            },
            {
              setup: {
                text: $l10n("setting_1_7")
              },
              value: {
                text: ""
              }
            },
            {
              setup: {
                text: $l10n("setting_1_8")
              },
              value: {
                text: ""
              }
            }
          ]
        },
        {
          title: $l10n("setting_title2"),
          rows: [{
              setup: {
                text: $l10n("setting_2_1")
              },
              value: {
                text: MENU.SAVING_PATH.filter(function(x) {
                  return SETTING_FILE[1][0] == x.value
                })[0].name
              }
            },
            {
              setup: {
                text: $l10n("setting_2_2")
              },
              value: {
                text: ""
              }
            }
          ]
        },
        {
          title: $l10n("setting_title3"),
          rows: [{
              setup: {
                text: $l10n("setting_3_1")
              },
              value: {
                text: ""
              }
            },
            {
              setup: {
                text: $l10n("setting_3_2")
              },
              value: {
                text: ""
              }
            },
            {
              setup: {
                text: $l10n("setting_3_3")
              },
              value: {
                text: ""
              }
            }
          ]
        }
      ],
      template: {
        props: {
          accessoryType: 1
        },
        views: [{
            type: "label",
            props: {
              id: "setup",
              textColor: $color("darkGray")
            },
            layout: function(make, view) {
              make.centerY.equalTo(view.super)
              make.left.inset(15)
            }
          },
          {
            type: "label",
            props: {
              id: "value",
              textColor: $color(SETTING_FILE[0][5])
            },
            layout: function(make, view) {
              make.centerY.equalTo(view.super)
              make.right.inset(0)
            }
          }
        ]
      },
      footer: {
        type: "view",
        props: {
          height: 50
        },
        views: [{
          type: "label",
          props: {
            text: $l10n("setting_footer") + $addin.current.version,
            lines: 0,
            font: $font(12),
            textColor: $color("#AAAAAA"),
            align: $align.center
          },
          layout: function(make) {
            make.left.top.right.inset(0)
          }
        }]
      }
    },
    layout: $layout.fill,
    events: {
      didSelect: function(view, indexPath) {
        _action3.activeSettingMenu(indexPath)
      }
    }
  }
}

function generateDetailViewData(actors, data) {
  var d = [{
      //title: $l10n("detail_info"),
      title: " ",
      rows: [{
        type: "view",
        props: {
          bgcolor: $color("white")
        },
        layout: function(make, view) {
          make.top.bottom.inset(0)
          make.left.right.inset(10)
          shadowView(view)
        },
        views: [{
            // Title
            type: "label",
            props: {
              font: $font("bold", 18),
              text: data.name
            },
            layout: function(make) {
              make.height.equalTo(18)
              make.top.inset(10)
              make.left.right.inset(15)
            }
          },
          {
            // Original Title
            type: "label",
            props: {
              font: $font("bold", 13),
              autoFontSize: true,
              text: data.nameEn
            },
            layout: function(make, view) {
              var preView = view.prev
              make.top.equalTo(preView.bottom)
              make.left.right.inset(15)
            }
          },
          {
            // Genres
            type: "label",
            props: {
              font: $font(12),
              bgcolor: $color("#F5F5F5"),
              textColor: $color("darkGray"),
              radius: 2,
              text: " " + (data.type.join(" | ") || "无") + " "
            },
            layout: function(make, view) {
              var preView = view.prev
              make.top.equalTo(preView.bottom).offset(5)
              make.height.equalTo(20)
              make.left.inset(15)
            }
          },
          {
            // Director
            type: "label",
            props: {
              font: $font(12),
              textColor: $color("darkGray"),
              text: "导演: " + (data.director.name || "无")
            },
            layout: function(make, view) {
              var preView = view.prev
              make.top.equalTo(preView.bottom).offset(5)
              make.left.right.inset(15)
            }
          },
          {
            // Cast
            type: "label",
            props: {
              font: $font(12),
              lines: 0,
              textColor: $color("darkGray"),
              text: "主演: " + (actors.join(" | ") || "无"),
              align: $align.justified
            },
            layout: function(make, view) {
              var preView = view.prev
              make.top.equalTo(preView.bottom).offset(5)
              make.left.right.inset(15)
            }
          },
          {
            // info
            type: "label",
            props: {
              font: $font(12),
              textColor: $color("darkGray"),
              text: "影讯: " + ([data.mins, data.releaseDate].filter(function(text) { return text != "" }).map(function(text) { return text.replace(/(\d{4})(\d{2})(\d{2})/g, "$1年$2月$3日上映") }).join(" - ") || "无")
            },
            layout: function(make, view) {
              var preView = view.prev
              make.top.equalTo(preView.bottom).offset(5)
              make.left.right.inset(15)
            }
          }
        ]
      }]
    },
    {
      title: $l10n("detail_summary"),
      rows: [{
        type: "view",
        props: {
          bgcolor: $color("white")
        },
        layout: function(make, view) {
          make.top.bottom.inset(0)
          make.left.right.inset(10)
          shadowView(view)
        },
        views: [{
          type: "text",
          props: {
            editable: false,
            selectable: false,
            scrollEnabled: false,
            font: $font(15),
            textColor: $color("darkGray"),
            text: data.story,
            insets: $insets(8, 8, 8, 8),
            align: $align.justified
          },
          layout: function(make, view) {
            make.edges.inset(1)
            shadowView(view)
          }
        }]
      }]
    },
    {
      title: $l10n("detail_gallery"),
      rows: [{
        type: "view",
        layout: $layout.fill,
        views: [{
          type: "gallery",
          props: {
            clipsToBounds: false,
            items: data.stageImg.list.map(function(d) {
              var cell = {
                type: "view",
                props: {},
                views: [{
                  type: "image",
                  props: {
                    src: d.imgUrl,
                    contentMode: $contentMode.scaleAspectFit,
                    bgcolor: $color("clear")
                  },
                  layout: function(make) {
                    make.top.bottom.inset(0)
                    make.left.right.inset(5)
                  }
                }]
              }
              return cell
            })
          },
          layout: function(make) {
            make.top.bottom.inset(0)
            make.left.right.inset(10)
          },
          events: {
            longPressed: function(sender) {
              $device.taptic(1)
              var page = sender.sender.page
              $quicklook.open({
                url: data.stageImg.list[page].imgUrl
              })
            },
            ready: function(view) {
              // Hide page indicator
              view.super.runtimeValue().invoke("views.objectAtIndex", 1).invoke("setHidden", true)
              shadowView(view, 0.8)
            }
          }
        }]
      }]
    }
  ]

  if (!data.story) {
    d.splice(1, 2)
  } else if (data.stageImg.list.length == 0) {
    d.splice(2, 1)
  }
  return d
}

/*
 * View render
 */

function mainView() {
  $ui.render({
    props: {
      title: "Movie List"
    },
    views: [{
        type: "matrix",
        props: {
          id: "menu",
          itemHeight: 50,
          columns: 3,
          spacing: 0,
          scrollEnabled: false,
          selectable: false,
          //bgcolor: $rgb(247, 247, 247),
          template: [{
              // Button Image
              type: "image",
              props: {
                id: "menu_image",
                bgcolor: $color("clear")
              },
              layout: function(make, view) {
                make.centerX.equalTo(view.super)
                make.width.height.equalTo(25)
                make.top.inset(7)
              },
            },
            {
              type: "label",
              props: {
                id: "menu_label",
                font: $font(10),
                textColor: $color("lightGray")
              },
              layout: function(make, view) {
                var preView = view.prev
                make.centerX.equalTo(preView)
                make.top.equalTo(preView.bottom).offset(1)
              }
            }
          ],
          data: [{
              menu_image: {
                icon: $icon("067", $color("clear"), $size(72, 72)),
                tintColor: $color(SETTING_FILE[0][5])
              },
              menu_label: {
                text: $l10n("menu_recent"),
                textColor: $color(SETTING_FILE[0][5])
              }
            },
            {
              menu_image: {
                icon: $icon("061", $color("clear"), $size(72, 72)),
                tintColor: $color("lightGray")
              },
              menu_label: {
                text: $l10n("menu_favorite")
              }
            },
            {
              menu_image: {
                icon: $icon("002", $color("clear"), $size(72, 72)),
                tintColor: $color("lightGray")
              },
              menu_label: {
                text: $l10n("menu_setting")
              }
            }
          ]
        },
        layout: function(make, view) {
          make.height.equalTo(TABBAR_HEIGHT)
          make.left.bottom.right.inset(0)
        },
        events: {
          didSelect: function(sender, indexPath) {
            _action1.activeMenu(indexPath.row)
          },
          longPressed: function(sender) {
            var width = sender.sender.frame.width / 3
            var x = sender.location.runtimeValue().invoke("CGPointValue").x
            var row = Math.floor(x / width)
            _action1.activeSegment(row)
          }
        }
      },
      {
        type: "canvas",
        layout: function(make, view) {
          var preView = view.prev
          make.top.equalTo(preView.top)
          make.height.equalTo(1)
          make.left.right.inset(0)
        },
        events: {
          draw: function(view, ctx) {
            var width = view.frame.width
            var scale = $device.info.screen.scale
            ctx.strokeColor = $color("gray")
            // $rgb(211, 211, 211)
            ctx.setLineWidth(1 / scale)
            ctx.moveToPoint(0, 0)
            ctx.addLineToPoint(width, 0)
            ctx.strokePath()
          }
        }
      },
      {
        type: "view",
        props: {
          id: "content"
        },
        layout: function(make) {
          var preView = $("menu")
          make.bottom.equalTo(preView.top)
          make.left.top.right.inset(0)
        },
        views: [recent, favorite, setting]
      }
    ]
  })
}

function detailView(title, data, cellData, showFavorite = false) {
  var actors = data.actors.filter(function(x) { return x.name != "" }).map(function(x) { return x.name })
  $ui.push({
    props: {
      title: title
    },
    views: [{
        // In order to generate rowHeight
        type: "text",
        props: {
          hidden: true,
          id: "actor",
          font: $font(12),
          text: "主演: " + actors.join(" | "),
          insets: $insets(5, 10, 5, 10)
        },
        layout: function(make, view) {
          make.top.bottom.inset(0)
          make.left.right.inset(10)
        },
      },
      {
        // In order to generate rowHeight
        type: "text",
        props: {
          hidden: true,
          id: "summary",
          font: $font(15),
          text: data.story,
          insets: $insets(8, 8, 8, 8)
        },
        layout: function(make) {
          make.top.bottom.inset(0)
          make.left.right.inset(11)
        }
      },
      {
        type: "list",
        props: {
          id: "detail",
          bgcolor: $color("white"),
          bounces: false,
          showsVerticalIndicator: false,
          separatorHidden: true,
          data: generateDetailViewData(actors, data),
          header: {
            type: "view",
            props: {
              // Cover Image
              height: 280 + 20
            },
            views: [{
                type: "image",
                props: {
                  src: data.img
                },
                layout: function(make) {
                  make.height.equalTo(155)
                  make.left.top.right.inset(0)
                }
              },
              {
                type: "blur",
                props: {
                  style: 1
                },
                layout: function(make, view) {
                  var pre = view.prev
                  make.height.equalTo(pre)
                  make.left.top.right.inset(0)
                }
              },
              {
                type: "canvas",
                layout: function(make, view) {
                  var pre = view.prev
                  make.bottom.equalTo(pre.bottom)
                  make.height.equalTo(15)
                  make.left.right.inset(0)
                },
                events: {
                  draw: function(view, ctx) {
                    var width = view.frame.width
                    var height = view.frame.height
                    // Back
                    ctx.fillColor = $color("white")
                    //$color("#F9F9F9")
                    ctx.setAlpha(0.3)
                    ctx.moveToPoint(0, height)
                    ctx.addLineToPoint(0, height * 0.75)
                    ctx.addQuadCurveToPoint(width * 0.6, 0, width, height * 0.5)
                    ctx.addLineToPoint(width, height)
                    ctx.fillPath()

                    // Front
                    ctx.fillColor = $color("white")
                    //$color("#F9F9F9")
                    ctx.setAlpha(1)
                    ctx.moveToPoint(0, height)
                    ctx.addQuadCurveToPoint(width * 0.5, 0, width, height)

                    ctx.fillPath()
                  }
                }
              },
              {
                // For Image Shadow
                type: "view",
                props: {
                  clipsToBounds: false
                },
                layout: function(make, view) {
                  // Set Shadow
                  shadowImage(view)
                  make.centerX.equalTo(view.super).offset(-60)
                  make.width.equalTo(200)
                  make.top.inset(20)
                  make.bottom.inset(0)
                },
                events: {
                  longPressed: function(sender) {
                    $device.taptic(1)
                    $quicklook.open({
                      url: data.img
                    })
                  }
                }
              },
              {
                type: "image",
                props: {
                  radius: 5,
                  src: data.img
                },
                layout: function(make, view) {
                  make.centerX.equalTo(view.super).offset(-60)
                  make.width.equalTo(200)
                  make.top.inset(20)
                  make.bottom.inset(0)
                }
              },
              {
                type: "view",
                props: {
                  alpha: 0.8,
                  clipsToBounds: false,
                  bgcolor: $color("white")
                },
                layout: function(make, view) {
                  // Set Rate
                  rate(data.overallRating == -1 ? 0.0 : data.overallRating)
                  // Set Shadow
                  shadowRate(view)

                  var preView = view.prev
                  make.left.equalTo(preView.right).offset(20)
                  make.width.height.equalTo(100)
                  make.top.inset(30)
                },
                views: [{
                    // Average Rate
                    type: "label",
                    props: {
                      id: "rate",
                      font: $font(45),
                      autoFontSize: true,
                      align: $align.center,
                      textColor: $color("darkGray")
                    },
                    layout: function(make, view) {
                      make.centerX.equalTo(view.super)
                      make.width.height.equalTo(50)
                      make.top.inset(10)
                    }
                  },
                  {
                    type: "label",
                    props: {
                      font: $font("bold", 16),
                      autoFontSize: true,
                      align: $align.center,
                      textColor: data.isEggHunt ? $color("#729C31") : $color("lightGray"),
                      text: data.isEggHunt ? "有彩蛋" : "无彩蛋"
                    },
                    layout: function(make, view) {
                      var preView = view.prev
                      make.centerX.equalTo(view.super)
                      make.top.equalTo(preView.bottom).offset(5)
                    }
                  }
                ]
              },
              {
                // Open
                type: "button",
                props: {
                  bgcolor: $color("white"),
                  clipsToBounds: false
                },
                layout: function(make, view) {
                  // Set Shadow
                  shadowButton(view)

                  var preView = view.prev
                  make.centerX.equalTo(preView)
                  make.top.equalTo(preView.bottom).offset(40)
                  make.size.equalTo($size(100, 30))
                },
                views: [{
                    type: "image",
                    props: {
                      icon: $icon("042", $color("lightGray"), $size(72, 72)),
                      bgcolor: $color("clear")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super)
                      make.width.height.equalTo(16)
                      make.left.inset(10)
                    }
                  },
                  {
                    type: "label",
                    props: {
                      text: $l10n("detail_open"),
                      font: $font("bold", 14),
                      autoFontSize: true,
                      align: true,
                      textColor: $color("lightGray")
                    },
                    layout: function(make, view) {
                      var preView = view.prev
                      make.centerY.equalTo(view.super)
                      make.left.equalTo(preView.right).offset(10)
                      make.right.inset(10)
                    }
                  }
                ],
                events: {
                  tapped: function(sender) {
                    actionOpen(data.name, cellData.id, data.releaseDate)
                  }
                }
              },
              {
                // Share
                type: "button",
                props: {
                  bgcolor: $color("white"),
                  clipsToBounds: false
                },
                layout: function(make, view) {
                  // Set Shadow
                  shadowButton(view)

                  var preView = view.prev
                  make.centerX.equalTo(preView)
                  make.top.equalTo(preView.bottom).offset(10)
                  make.size.equalTo($size(100, 30))
                },
                views: [{
                    type: "image",
                    props: {
                      icon: $icon("022", $color("lightGray"), $size(72, 72)),
                      bgcolor: $color("clear")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super)
                      make.width.height.equalTo(16)
                      make.left.inset(10)
                    }
                  },
                  {
                    type: "label",
                    props: {
                      text: $l10n("detail_share"),
                      font: $font("bold", 14),
                      autoFontSize: true,
                      align: true,
                      textColor: $color("lightGray")
                    },
                    layout: function(make, view) {
                      var preView = view.prev
                      make.centerY.equalTo(view.super)
                      make.left.equalTo(preView.right).offset(10)
                      make.right.inset(10)
                    }
                  }
                ],
                events: {
                  tapped: function(sender) {
                    actionShare(cellData.id)
                  }
                }
              },
              {
                // Favorite
                type: "button",
                props: {
                  bgcolor: $color("white"),
                  clipsToBounds: false,
                  hidden: !showFavorite
                },
                layout: function(make, view) {
                  // Set Shadow
                  shadowButton(view)

                  var preView = view.prev
                  make.centerX.equalTo(preView)
                  make.top.equalTo(preView.bottom).offset(10)
                  make.size.equalTo($size(100, 30))
                },
                views: [{
                    type: "image",
                    props: {
                      icon: $icon("061", $color("lightGray"), $size(72, 72)),
                      bgcolor: $color("clear")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super)
                      make.width.height.equalTo(16)
                      make.left.inset(10)
                    }
                  },
                  {
                    type: "label",
                    props: {
                      text: $l10n("detail_favorite"),
                      font: $font("bold", 14),
                      autoFontSize: true,
                      align: true,
                      textColor: $color("lightGray")
                    },
                    layout: function(make, view) {
                      var preView = view.prev
                      make.centerY.equalTo(view.super)
                      make.left.equalTo(preView.right).offset(10)
                      make.right.inset(10)
                    }
                  }
                ],
                events: {
                  tapped: function(sender) {
                    if (unique(cellData.id)) {
                      _action2.favoriteItem(cellData)
                    } else {
                      $ui.error($l10n("error_favorited"))
                    }
                  }
                }
              }
            ]
          },
          footer: {
            type: "view",
            props: {
              height: 50
            },
            views: [{
              type: "label",
              props: {
                text: $l10n("detail_footer"),
                font: $font(12),
                textColor: $color("#AAAAAA"),
                align: $align.center
              },
              layout: function(make) {
                make.left.top.right.inset(10)
              }
            }]
          }
        },
        layout: $layout.fill,
        events: {
          rowHeight: function(sender, indexPath) {
            if (indexPath.section == 0) {
              return 95 + $("actor").contentSize.height + (data.nameEn ? 15 : 0)
            } else if (indexPath.section == 1) {
              return 2 + $("summary").contentSize.height
            } else {
              return 230
            }
          }
        }
      }
    ]
  })
}

/*
 * Favorite View sub-functions
 */

function unique(id) {
  var file = JSON.stringify(FAVORITE_FILE)
  return file.indexOf(id) == -1 ? true : false
}

/*
 * Detail View sub-functions
 */

function handleSelected(raw, button = true) {
  $ui.loading(true)
  var title = raw.title.text
  var url = "https://ticket-api-m.mtime.cn/movie/detail.api?locationId=" + SETTING_FILE[0][4] + "&movieId=" + raw.id
  $http.get({
    url: url,
    handler: function(resp) {
      $ui.loading(false)
      detailView(title, resp.data.data.basic, raw, button)
    }
  })
}

function actionOpen(name, id, date) {
  function alertOpen(url) {
    $ui.alert({
      title: $l10n("alert_open_title_app"),
      actions: [{
          title: $l10n("alert_button_cancel"),
          style: "Cancel",
          handler: function() {}
        },
        {
          title: $l10n("alert_button_open"),
          handler: function() {
            $app.openURL(url)
            if ($app.env == $env.today) {
              $app.close()
            }
          }
        }
      ]
    })
  }

  $ui.action({
    message: $l10n("detail_open_in"),
    actions: [{
        title: $l10n("detail_mtime"),
        handler: function() {
          $safari.open({
            url: "https://m.mtime.cn/#!/movie/" + id + "/"
          })
          $delay(0.5, function() {
            alertOpen("mtime://scheme?applinkData=%7b%22handleType%22%3a%22jumpPage%22%2c%22pageType%22%3a%22movieDetail%22%2c%22movieId%22%3a%22" + id + "%22%7d")
          })
        }
      },
      {
        title: $l10n("detail_douban"),
        handler: function() {
          $http.get({
            url: "https://api.douban.com/v2/movie/search?count=5&q=" + encodeURIComponent(name),
            handler: function(resp) {
              for (var i of resp.data.subjects) {
                if (i.title == name && date.indexOf(i.year) != -1) {
                  $safari.open({
                    url: "https://movie.douban.com/subject/" + i.id
                  })
                  $delay(0.5, function() {
                    alertOpen("douban://v2/movie/" + i.id)
                  })
                  return
                }
              }
              $ui.error($l10n("error_douban"))
            }
          })
        }
      }
    ]
  })
}

function actionShare(id) {
  $delay(0.1, function() {
    $quicklook.open({
      list: [$("detail").snapshot.png,
        $data({ string: "https://m.mtime.cn/#!/movie/" + id + "/" })
      ]
    })
  })
}

function rate(number) {
  var rate = number.toFixed(1).toString()
  var string = $objc("NSMutableAttributedString").invoke("alloc.initWithString", rate)
  string.invoke("addAttribute:value:range:", "NSFont", $font("bold", 25), $range(1, 2))
  string.invoke("addAttribute:value:range:", "NSBaselineOffset", 10, $range(1, 2))
  $("rate").runtimeValue().invoke("setAttributedText", string)
}

function shadowImage(view) {
  var layer = view.runtimeValue().invoke("layer")

  var subLayer = $objc("CALayer").invoke("layer")
  subLayer.invoke("setFrame", $rect(5, 5, 190, 270))
  subLayer.invoke("setBackgroundColor", $color("white").runtimeValue().invoke("CGColor"))
  subLayer.invoke("setMasksToBounds", false)
  subLayer.invoke("setShadowOffset", $size(10, 10))
  subLayer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"))
  subLayer.invoke("setShadowOpacity", 0.5)
  subLayer.invoke("setShadowRadius", 10)
  layer.invoke("addSublayer", subLayer)
}

function shadowRate(view) {
  var layer = view.runtimeValue().invoke("layer")

  layer.invoke("setCornerRadius", 5)
  layer.invoke("setShadowOffset", $size(5, 5))
  layer.invoke("setShadowColor", $color("darkGray").runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", 0.5)
  layer.invoke("setShadowRadius", 10)
}

function shadowView(view, alpha = 0.3) {
  var layer = view.runtimeValue().invoke("layer")

  layer.invoke("setCornerRadius", 5)
  layer.invoke("setShadowOffset", $size(0, 0))
  layer.invoke("setShadowColor", $color("lightGray").runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", alpha)
  layer.invoke("setShadowRadius", 10)
}

function shadowButton(view) {
  var layer = view.runtimeValue().invoke("layer")

  layer.invoke("setShadowOffset", $size(2, 2))
  layer.invoke("setShadowColor", $color("lightGray").runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", 0.2)
  layer.invoke("setShadowRadius", 3)
}

module.exports = {
  generateMainViewObjects: generateMainViewObjects,
  mainView: mainView
}