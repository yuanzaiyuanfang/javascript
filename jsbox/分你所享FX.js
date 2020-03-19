$ui.loading(true)
$http.get({
  url: "http://mp.weixin.qq.com/mp/homepage?__biz=MzI4MzA2MzE4OA==&hid=3&sn=54aae2bc08397e96e8e2eb25f936ea2d&scene=18#wechat_redirect",
  handler: function(resp) {
    $ui.loading(false)
    var data = resp.data.replace(/\n|\s|\r/g, "")
    var img = data.match(/background-image.*?(?=\'\))/g).map(function(item) { return item.replace(/background-image:url\(\'/, "") })
    var jumpURL = data.match(/<ahref=\".*?(?=\">)/g).map(function(item) { return item.replace(/<ahref=\"/, "") })
    mainView(img, jumpURL)
  }
})

function mainView(img, jumpURL) {
  $ui.render({
    props: {
      title: "分你所享FX"
    },
    views: [{
        type: "gallery",
        props: {
          id: "ImageGallery",
          items: [{
              type: "button",
              props: {
                src: img[0]
              },
              events: {
                tapped(sender) {
                  openURL(jumpURL[0])
                }
              }
            },
            {
              type: "button",
              props: {
                src: img[1]
              },
              events: {
                tapped(sender) {
                  openURL(jumpURL[1])
                }
              }
            }
          ],
          interval: 3
        },
        layout: function(make, view) {
          make.left.right.top.inset(0)
          make.height.equalTo(185)
        }
      },
      {
        type: "view",
        props: {
          id: "Rview"
        },
        views: [{
       type: "button",
        props: {
        id: "B1",
        title: "限免信息",
             titleColor: $color("black"),
              bgcolor: $color("#FAFAFA")
            },
            layout: function(make, view) {
              make.bottom.left.inset(0)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(3)
            },
            events: {
              tapped(sender) {
                $("B2").titleColor = $color("black")
                $("B3").titleColor = $color("black")
                sender.titleColor = $color("666666")
                load(0)
              }
            }
          },
        {
            type: "button",
            props: {
              id: "B2",
              title: "软游教程",
              titleColor: $color("black"),
              bgcolor: $color("#FAFAFA")
            },
            layout: function(make, view) {
        make.bottom.inset(0)
        make.left.equalTo($("B1").right)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(3)
            },
            events: {
              tapped(sender) {
                $("B3").titleColor = $color("black")
                $("B1").titleColor = $color("black")
                sender.titleColor = $color("666666")
                load(1)
              }
            }
          },
          {
            type: "button",
            props: {
              id: "B3",
              title: "软游评测",
              titleColor: $color("black"),
              bgcolor: $color("#FAFAFA")
            },
            layout: function(make, view) {
              make.bottom.inset(0)
              make.left.equalTo($("B2").right)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(3)
            },
            events: {
              tapped(sender) {
                $("B2").titleColor = $color("black")
                $("B1").titleColor = $color("black")
                sender.titleColor = $color("666666")
                load(2)
              }
            }
          }
        ],
        layout: function(make) {
          make.top.equalTo($("ImageGallery").bottom)
          make.left.right.inset(0)
          make.height.equalTo(44)
        }
      },
      {
        type: "list",
        props: {
          rowHeight: 80,
          template: [{
              type: "image",
              props: {
                id: "img",
                bgcolor: $color("white")
              },
              layout: function(make, view) {
                make.left.top.bottom.inset(10)
                make.width.equalTo(80)
              }
            },
            {
              type: "label",
              props: {
                id: "Name",
                font: $font("bold", 15),
                lines: 1
              },
              layout: function(make, view) {
                make.left.equalTo($("img").right).offset(10)
                make.top.inset(13)
              }
            },
            {
              type: "label",
              props: {
                id: "note",
                font: $font(13),
                textColor: $color("gray")
              },
              layout: function(make) {
                make.left.equalTo($("Name"))
                make.bottom.inset(10)
                make.top.inset(30)
                make.right.inset(10)
              }
            },
          ]
        },
        layout: function(make) {
          make.top.equalTo($("Rview").bottom)
          make.right.left.bottom.inset(0)
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            openURL(data.url)
          }
        }
      }
    ]
  })
  load(0)
}

function load(num) {
  $http.post({
    url: "http://mp.weixin.qq.com/mp/homepage?__biz=MzI4MzA2MzE4OA==&hid=3&sn=54aae2bc08397e96e8e2eb25f936ea2d&scene=18&cid=" + num + "&begin=0&count=500&action=appmsg_list&f=json",
    handler: function(resp) {
      var arr = []
      var data = resp.data.appmsg_list
      for (i in data) {
        arr.push({
          Name: {
            text: data[i].title
          },
          img: {
            src: data[i].cover
          },
          note: {
            text: data[i].digest
          },
          url: data[i].link
        })
      }
      $("list").data = arr
    }
  })
}

function openURL(url, title) {
  $ui.push({
    props: {
      title: "分你所享FX"
    },
    views: [{
      type: "web",
      props: {
        url: url,
        toolbar: false
      },
      layout: $layout.fill
    }]
  })
}