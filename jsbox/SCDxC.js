//anton.j@2017-10-22 Ver1.0

/*---------head---------*/
var warn = 0 //(0 or 1)

$app.strings = {
  "en": {
    "解析A": "解析A",
    "解析D": " 解析D",
//......
  },
  "zh-Hant": {
    "解析A": "默认接口❈",
    "解析D": "新增接口⊕",
//......
  }
}

var ports = [
  { name: $l10n("解析A"), url: "" },
  { name: "解析B", url: "" },
  { name: "解析C", url: "" },
  { name: $l10n("解析D"), url: "" },
]

var NET = [
  { name: "主页", url: "http://scdxc.top" },
  { name: "APP", url: "http://scdxc.cn" },
  { name: "微博", url: "https://m.weibo.cn/u/5760689347?jumpfrom=weibocom" },
  { name: "小店", url: "http://m.tb.cn/h.3b24Tcn" },
  { name: "商务合作", url: "https://mp.weixin.qq.com/s/iT_SRvwaEWcxaSHNn4QaLQ" },
//{ name: "SS", url: "http://ss.scdxc.top" },
]

var searchNET = [
  { name: "默认搜", net: "http://m.v.sogou.com/vw/search.jsp" },
  { name: "影视", net: "http://ifkdy.com/" },
  { name: "电视", net: "http://wx.iptv789.com/tv.php" },
  { name: "音乐", net: "http://music.2333.me" },
  { name: "广播", net: "http://m.qingting.fm/categories/5" },
  { name: "动漫", net: "http://m.acfun.tv/search/" },
  { name: "直播", net: "https://www.douyu.com" },
  { name: "新增站", net: "http://hwkxk.cn/music/" },
]

var Cha = searchNET[0].net //(0~7)
var ChaN = searchNET[0].name //(0~7)
var Port = ports[0].url //(0~4)
var PoetN = ports[0].name //(0~4)
var Site = NET[0].url //(0~8)

/*------------head----------*/


//main
var r = /\w{2,10}\.com/
var i = 0
var reg = ""
while (NET[i]) {
  if (reg.length !== 0) {
    var reg = r.exec(NET[i].url) + ".*html|" + reg
  } else {
    var reg = r.exec(NET[i].url) + ".*html" + reg
  }
  i++
}
var reg = reg + "|mgtv.com/#/"

if (warn == 1) {
  $ui.toast("anton.j的提醒:运行此脚本建议关闭SSR及相关")
} else {}

if (typeof($context.safari) == "undefined") {
  var link = $context.link || $clipboard.link ? $context.link || $clipboard.link : ""
} else {
  var link = $context.safari.items.location.href
}
if (link.search(reg) == -1) {} else {
  $ui.alert({
    title: "直接解析播放如下链接:\n\n" + link,
    actions: [{
        title: "OK",
        handler: function() {
          parse_play(link)
        }
      },
      {
        title: "Cancel",
        style: "Cancel",
      },
    ]
  })
}
main(Site)

//all function
function main(url) {
  $ui.render({
    props: {
      title: "SCDxC - 求关注"
    },
    views: [{
        type: "web",
        props: {
          id: "videoweb",
          url: Site,
          toolbar: true,

          script: function() {
            var Html = window.parent.location.href
            $notify("customEvent", Html)
          }

        },
        layout: function(make, view) {
          make.top.inset(28)
          make.bottom.right.left.inset(0)
        },

        events: {
          customEvent: function(object) {
            //$clipboard.text = obj
            $("videoweb").title = object
          }
        }

      },

      {
        type: "tab",
        props: {
          id: "headmenu",
          items: NET.map(function(item) {
            return item.name
          }),
          bgcolor: $rgb(255, 255, 255),
          radius: 6,
          tintColor: $color("#424242")
        },
        layout: function(make, view) {
          make.top.left.right.inset(1)
          make.height.equalTo(25)
        },
        events: {
          changed: function(sender) {
            var Site = NET[sender.index].url
            var Title = NET[sender.index].name
            $("videoweb").url = Site
          }
        }
      },

      {
        type: "label",
        props: {
          id: "textlabel",
          font: $font(11),
          text: "----------请至VIP视频最终页面点击[解析]键 ----------",
          textColor: $color("#d2691e"),
          bgcolor: $rgb(255, 255, 255),
          radius: 8,
          align: $align.center
        },
        layout: function(make, view) {
          make.bottom.inset(0)
          make.left.right.inset(0)
          make.height.equalTo(11)
          make.centerX.equalTo(view.super)
        }
      },
    ]
  })
}

function parse_play(url) {
  $ui.push({
    views: [{
        type: "web",
        props: {
          id: "playweb",
          title: "全网—VIP影音播放搜索",
          url: Port + url,
          //toolbar: true
        },
        layout: $layout.fill
      },
      {
        type: "tab",
        props: {
          id: "bottommenu",
          items: ports.map(function(item) {
            return item.name
          }),
          bgcolor: $rgb(66, 66, 66),
          radius: 6,
          tintColor: $color("#d2691e")
        },
        layout: function(make, view) {
          make.left.right.inset(2)
          make.bottom.inset(2)
          make.height.equalTo(30)
        },
        events: {
          changed: function(sender) {
            var Port = ports[sender.index].url
            var PortN = ports[sender.index].name

            if (PortN.search("新增") == -1) {
              $("playweb").url = Port + url
            } else {
              addport(Port, PortN)
            }

          }
        }
      },
    ]
  })
}

function searchvideo(Cha, ChaN) {
  $ui.push({
    views: [{
        type: "web",
        props: {
          id: "searchweb",
          title: "全网—VIP影音播放搜索",
          url: Cha,
          toolbar: true
        },
        layout: $layout.fill
      },
      {
        type: "tab",
        props: {
          items: searchNET.map(function(item) {
            return item.name
          }),
          bgcolor: $rgb(255, 255, 255),
          radius: 6,
          tintColor: $color("#d2691e"),
          font: $font(12)
        },
        layout: function(make, view) {
          make.left.right.inset(1)
          make.bottom.inset(44)
          make.height.equalTo(30)
        },
        events: {
          changed: function(sender) {
            var Cha = searchNET[sender.index].net
            var ChaN = searchNET[sender.index].name

            /*------后期修改搜索入口1------*/
            if (ChaN == "影视") {
              dybee($("search".url))
            }
            /*else if(ChaN=="电视"){
              addXX1($("search".url))
            } else if(ChaN=="广播"){
              addXX2($("search".url))
            } else if(ChaN=="音乐"){
              addXX3($("search".url))
            } else if(ChaN=="动漫"){
              addXX4($("search".url))
            } else if(ChaN=="直播"){
              addXX5($("search".url))
            } */
            else if (ChaN == "新增站") {
              addXX6($("search".url))
            } else {
              $("searchweb").url = Cha
            }
            /*------后期修改搜索入口1------*/

          }
        }
      },
    ]
  })
}

function dybee(url) {
  $ui.push({
    views: [{
        type: "input",
        props: {
          id: "inputDy",
          type: $kbType.search,
          text: "战狼",
          font:$font(11),
          textColor:$color("red"),
          darkKeyboard: true,

        },
        layout: function(make, view) {
          make.top.left.inset(10)
          make.height.equalTo(30)
          make.width.equalTo(200)
        },
        events: {
          changed: function(sender) {
            $("inputDy").text
          }
        }
      },
      
/*----edit----*/






      {
        type: "list",
        props: {
          id: "dybee",
          data: ["搜索","推荐", "电影", "电视"]
        },
        layout: function(make, view) {
          make.top.equalTo($("inputDy").bottom).offset(10)
          make.left.right.inset(1)
          make.bottom.inset(10)
        },
        events: {
          didSelect: function(tableView, indexPath, title) {
            if (title == "推荐") {
              $http.get({
                url: "http://www.dybee.cn/",
                handler: function(resp) {
                  var searchM = resp.data
                  if (searchM.search("共找到0篇关于") == -1) {

                    $ui.alert(searchM)//test

                  } else {
                    $ui.alert("test")
                  }
                  //

                }
              })
            }
          }
        }

      }

    ]
  })
}

function addXX6(url) {
  $ui.alert("正在编辑中......")
}

function addport(Port, PortN) {
  $ui.alert("正在编辑中......")

}

/*-------------end@anton.j------------*/