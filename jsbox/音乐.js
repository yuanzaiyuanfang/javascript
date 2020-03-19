$app.hidden = true
$debug = false

const api = 'http://music.able.cat/download/api/?id='
const qapi = 'http://music.able.cat/download/api/?t=qq&id='
const player = 'http://music.able.cat/download/player/#'
const headers = "Welcome To AbleCat's Muisc For Pin"
const footers = "Design & Powered by AbleCats"

var isQQ = false
var Switch = false
var playing = false
var playindex = false

var timer = null
var keyword = $clipboard.link
var inputtext = null

$ui.render({
  props: {
    title: "AbleCat's Player"
  },
  views: [{
    type: "list",
    props: {
      rowHeight: 100.0,
      separatorInset: $insets(0, 5, 0, 0),
      header: {
        type: "view",
        props: {
          height: 50
        },
        views: [{
          type: "input",
          props: {
            type: $kbType.search,
            align: $align.center,
            placeholder: "请输入关键字"
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super)
            make.top.equalTo(3)
            make.height.equalTo(32)
            make.right.left.inset(10)
          },
          events: {
            returned: function(sender) {
              if (sender.text) {
                inputtext = encodeURI(sender.text)
                var ltem = ["网易云", "QQ音乐"]
                var data = [api, qapi]
                makeMemu(ltem, 2, data)

                sender.blur()
                timer.invalidate()

              } else {
                Main()
              }
            }
          }
        }, {
          type: "label",
          props: {
            height: 20,
            text: headers,
            textColor: $color("#AAAAAA"),
            align: $align.center,
            font: $font(12)
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super)
            make.top.equalTo($("input").bottom)
          }
        }]
      },
      footer: {
        type: "label",
        props: {
          height: 20,
          text: footers,
          textColor: $color("#AAAAAA"),
          align: $align.center,
          font: $font(12)
        }
      },
      template: [{
          type: "image",
          props: {
            id: "image"
          },
          layout: function(make, view) {
            make.left.top.bottom.inset(5)
            make.width.equalTo(view.height)
          }
        },
        {
          type: "label",
          props: {
            id: "title",
            font: $font("bold", 18),
            autoFontSize: true
          },
          layout: function(make) {
            var preView = $("image")
            make.left.equalTo(preView.right).offset(10)
            make.height.equalTo(18)
            make.top.inset(8)
            make.right.inset(5)
          }
        },
        {
          type: "label",
          props: {
            id: "id",
            font: $font(12),
            bgcolor: $color("#F5F5F5"),
            textColor: $color("#666666"),
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
            id: "singer",
            font: $font(12),
            textColor: $color("#666666")
          },
          layout: function(make) {
            var preView = $("id")
            make.top.equalTo(preView.bottom).offset(5)
            make.left.equalTo(preView.left)
            make.right.inset(5)
          }
        },
        {
          type: "label",
          props: {
            id: "flac",
            font: $font(12),
            textColor: $color("#666666")
          },
          layout: function(make) {
            var preView = $("singer")
            make.top.equalTo(preView.bottom).offset(5)
            make.left.equalTo(preView.left)
            make.right.inset(5)
          }
        }
      ],
      actions: [{
          title: "分享",
          handler: function(tableView, indexPath) {
            var object = tableView.object(indexPath)
            if (isQQ) {
              url = player + "str=" + inputtext + "&id=" + object.id.text
            } else {
              url = player + object.id.text
            }
            $share.sheet([object.image, url, object.title.text])
          }
        },
        {
          title: "打开",
          handler: function(tableView, indexPath) {
            var object = tableView.object(indexPath)
            if (isQQ) {
              url = player + "str=" + inputtext + "&id=" + findNumber(object.id.text)
            } else {
              url = player + object.id.text
            }
            $app.openURL(url)
          }
        },
        {
          title: "下载",
          handler: function(tableView, indexPath) {
            var object = tableView.object(indexPath)
            url = object.url
            flac = object.flac.url
            var item = ["高清", "无损"]
            var data = [url, flac]

            if (flac) {
              makeMemu(item, 1, data)
            } else {
              downloader(url)
            }
          }
        },
      ]
    },
    layout: $layout.fill,
    events: {
      didSelect: function(tableView, indexPath) {
        var object = tableView.object(indexPath)
        url = player + object.id.text
        if (playindex == false || playindex != indexPath) {
          playing = true
          playindex = indexPath
          $audio.play({
            url: object.url
          })
          $ui.toast('歌曲正在缓冲,请稍后...')
        } else {
          if (playing) {
            $ui.toast('歌曲已暂停,再次点击继续播放')
            $audio.pause()
            playing = false
          } else {
            $audio.resume()
            playing = true
          }
        }

      },
      pulled: function(sender) {
        getURL(keyword)
      }
    }
  }]
})

function getURL(api) {
  $ui.toast("数据正在获取中,请稍后...")
  $("list").beginRefreshing()
  $http.get({
    url: api,
    handler: function(res) {
      updata(res.data)
    }
  })
}

function getTure(s) {
  if (s) {
    return 'TURE'
  } else {
    return 'FALSE'
  }
}

function updata(stories) {
  var data = []
  count = stories.count
  for (var id = 0; id < count; id++) {
    story = stories.data[id]
    data.push({
      url: story.url,
      image: {
        src: story.pic
      },
      id: {
        text: story.id + platform()
      },
      title: {
        text: story.title
      },
      singer: {
        text: '歌手:' + story.singer
      },
      flac: {
        text: '无损:' + getTure(story.flac),
        url: story.flac
      }
    })
  }
  $("list").data = data
  $("list").endRefreshing()
}

function makeMemu(item, d, data) {
  $ui.menu({
    items: item,
    handler: function(title, idx) {
      if (d == 1) {
        downloader(data[idx])
      } else if (d == 2) {
        if (idx) {
          isQQ = true
        } else {
          isQQ = false
        }
        keyword = data[idx] + inputtext
        getURL(keyword)
      }
    }
  })
}

function platform() {
  let platform
  if (isQQ) {
    platform = ' | QQ'
  } else {
    platform = ' | WY'
  }
  return platform
}

function findNumber(data) {
  return /^\d{7,11}/.exec(data);
}

function downloader(url) {
  $http.download({
    url: url,
    progress: function(bytesWritten, totalBytes) {
      var percentage = bytesWritten * 1.0 / totalBytes
    },
    handler: function(resp) {
      $share.sheet(resp.data)
    }
  })
}

function openURL(url) {
  $ui.push({
    props: {
      title: url
    },
    views: [{
      type: "web",
      props: {
        url: url
      },
      layout: $layout.fill
    }]
  })
}

function initWithSwich() {
  if (keyword == undefined || keyword.indexOf('music.163.com') == -1) {
    $("input").focus()

  }
}

function Main() {
  initWithSwich()
}

Main()
//防操作失误造成的假死 20秒后重新初始化...
if (keyword == undefined && keyword.indexOf('music.163.com') == -1) {
  timer = $timer.schedule({
    interval: 20,
    handler: function() {
      initWithSwich()
    }
  })
}