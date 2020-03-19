//v2porn
/* cache
- cnPage //自拍page
- jpPage // av page
- collection 收藏
*/

/* notes:
- 国产自拍(type:0)from v2porn.com
- AV (type=1) from v2porn.com 会卡死
- AV影院(type=2) from luochat.com
*/

$app.open()
var indexUrl = "http://v2porn.com"
var headers = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0.1 Safari/604.3.5"
}

// v2porn only
var v2Reg = ']};xvideoData.keys = {"normal":"(key.*?)","vip":'

var cnAPI = "http://web.z7msdurclx6evqqnk4mm.space/api/v2/videos/latest?per_page=20&page="
var jpAPI = "http://www.luochat.com/api/movie/index?pagesize=20&typeid=14&page="

var LIST_TEMPLATE = [{
    type: "image",
    props: {
      id: "image"
    },
    layout: function (make, view) {
      make.left.top.bottom.inset(5)
      make.width.equalTo(150)
      make.height.equalTo(90)
    }
  },
  {
    type: "label",
    props: {
      id: "title",
      font: $font("bold", 15),
      lines: 0
    },
    layout: function (make, view) {
      make.top.inset(10)
      make.left.equalTo($("image").right).offset(10)
      make.right.inset(10)
    }
  },
  {
    type: "label",
    props: {
      id: "length",
      font: $font("bold", 12),
      lines: 0
    },
    layout: function (make, view) {
      make.left.equalTo($("image").right).offset(10)
      make.bottom.equalTo(view.super)
      make.right.inset(10)
      make.bottom.inset(10)
    }
  },
  {
    type: "label",
    props: {
      id: "time",
      font: $font("bold", 12),
      lines: 0
    },
    layout: function (make, view) {
      make.bottom.equalTo(view.super)
      make.right.equalTo(view.super).inset(10)
      make.bottom.inset(10)
    }
  }
]

$ui.render({
  props: {
    title: "V2porn"
  },
  views: [
    /*{
      type: "progress",
      props: {
        value: 0,
        trackColor: $color("clear"),
        progressColor: $color("black")
      },
      layout: function(make, view) {
        make.top.equalTo(1)
        make.width.equalTo(view.super)
      }
    },*/
    {
      type: "menu",
      props: {
        id: "segment",
        items: ["国产自拍", "AV影院", "我的收藏"],
        //tintColor: $color("darkGray"),
        align: $align.center
      },
      layout: function (make, view) {
        // make.top.equalTo($("progress").bottom).offset(5)
        make.top.equalTo(0)
        make.height.equalTo(40)
        make.width.equalTo(view.super)
        make.centerX.equalTo()
      },
      events: {
        ready: function (sender) {
          $cache.set("cnPage", 1)
          cnVideoFetch(1)
        //   collection = $cache.get("collection")
        //   if (!collection) {
        //     sender.disable(2)
        //   }
        },
        changed: function (sender) {
          var idx = sender.index
          if (idx == 0) { // cn
            $cache.set("cnPage", 1)
            cnVideoFetch(1)
          } else if (idx == 1) { // jp
            $cache.set("jpPage", 1)
            jpVideoFetch(1)
          } else if (idx == 2) { // fav
            collection = $cache.get("collection")
            if (!collection) {
                // $("list").data = []  
                $ui.alert("收藏夹空")
                $("segment").index = 0
                 $cache.set("cnPage", 1)
          cnVideoFetch(1)
            }
            else{
                $("list").data = collection
            }
            
          }
        }
      }
    },
    {
      type: "list",
      props: {
        rowHeight: 120,
        template: LIST_TEMPLATE,
        actions: [{
            title: "😂",
            handler: function (tableView, indexPath) {
              if ($("segment").index != 2) {
                var object = tableView.object(indexPath)
                addToCollection(object)
              } else {
                removeFromCollection(indexPath)
              }
            }
          },
          {
            title: "⬇️",
            handler: function (tableView, indexPath) {
              var object = tableView.object(indexPath)
              download(object)
            }
          }
        ]
      },
      layout: function (make) {
        make.top.equalTo($("segment").bottom).offset(0)
        make.right.left.bottom.inset(0)
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          data.type == 2 ? pushVideo("男神的武器", data.title.text, data.url) : getReal(data.title.text, data.url, data.image.src, data.type)
        },
        didReachBottom: function (sender) {
          sender.endFetchingMore()
          if ($("segment").index == 0) {
            var page = $cache.get("cnPage") + 1
            $cache.set("cnPage", page)
            cnVideoFetch(page)
          } else if ($("segment").index == 1) {
            var page = $cache.get("jpPage") + 1
            $cache.set("jpPage", page)
            jpVideoFetch(page)
          }
        }
      }
    }

  ]
})

function addToCollection(object) {
  var collection = $cache.get("collection")
  if (!collection) {
    collection = []
    // $("segment").enable(2)
  }
  collection.unshift(object)
  $cache.set("collection", collection)
  $ui.toast("收藏成功")
}

function removeFromCollection(indexPath) {
  $ui.toast("已取消收藏")
  /*var collection = $cache.get("collection")
  if (collection.length == 1) {
    $cache.remove("collection")
    $("segment").index = 0
    $("segment").disable(2)
    $cache.set("cnPage", 1)
    cnVideoFetch(1)
    return
  }*/
  $("list").delete(indexPath)
  $cache.set("collection", $("list").data)
}

function cnVideoFetch(page) {
  $http.get({
    url: cnAPI + page,
    header: headers,
    handler: function (resp) {
      var data = $("list").data
      if (page == 1) {
        data = []
      }
      var videos = resp.data.data.videos
      for (var idx in videos) {
        var video = videos[idx]
        data.push({
          url: indexUrl + "/v/" + video.id_encrypt,
          image: {
            src: video.origin_href
          },
          title: {
            text: video.title
          },
          length: {
            text: video.duration
          },
          time: {
            text: video.timeout
          },
          type: 0
        })
      }
      $("list").data = data
    }
  })
}

function jpVideoFetch(page) {
  /*男神的武器 start*/
  $http.get({
    url: jpAPI + page,
    header: headers,
    handler: function (resp) {
      var data = $("list").data
      if (page == 1) {
        data = []
      }
      var body = resp.data
      for (var idx in body) {
        var video = body[idx]
        data.push({
          url: video.video,
          image: {
            src: video.pic
          },
          title: {
            text: video.title
          },
          length: {
            text: video.time
          },
          time: {
            text: video.length
          },
          type: 2

        })
      }
      $("list").data = data
    }
  })
  /*男神的武器 end*/

  /* v2porn 
  $http.get({
    url: "http://v2porn.com/v/cinema?page=" + page,
    header: headers,
    handler: function(resp) {
      var data = $("list").data
      if (page == 1) {
        data = []
      }
      var body = resp.data
      var regExp = new RegExp(/<div class=\"cinema-video-box\">[\s\S]*?<div class=\"cinema-video-content\">[\s\S]*?<img src=\"(http:\/\/img.vquite.space\/thumb\/.*?.jpg)\">[\s\S]*?<div class=\"cinema-video-time\">(.*?)<\/div>[\s\S]*?<a class=\"cinema-video-play\" href=\"http:\/\/v2porn.com\/v\/(.*?)\" target=\"_blank\"><img src=\"http:\/\/static.vstatic.space\/bundle\/images\/v2-play-btn-efabfcff3c.png\"><\/a>[\s\S]*?<\/div>[\s\S]*?<div class=\"cinema-video-title\">[\s\S]*?<a href=\"http:\/\/v2porn.com\/v\/.*?\" target=\"_blank\">(.*?)<\/a>[\s\S]*?<div>(.*?次观看)\.(.*?)<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/g)
      while ((result = regExp.exec(body)) != null) {
        data.push({
          url: indexUrl + "/v/" + result[3],
          image: {
            src: result[1]
          },
          title: {
            text: result[4]
          },
          length: {
            text: result[2]
          },
          time: {
            text: result[6]
          },
          type: 1
        })
      }
      $("list").data = data
    }
  })
  */
}

function getReal(title, link, img, flag) {
  $http.request({
    method: "GET",
    url: link,
    handler: function (resp) {
      url = findMP4(resp.data, flag)
      pushVideo("v2porn", title, url)
    }
  })
}

function pushVideo(site, title, url) {
  $ui.push({
    props: {
      title: site
    },
    views: [{
        type: "label",
        props: {
          id: "webViewTitle",
          text: title,
          font: $font("bold", 18),
          lines: 0
        },
        layout: function (make, view) {
          make.height.equalTo(90)
          make.top.equalTo(20)
          make.left.right.inset(10)
        }
      },
      {
        type: "video",
        props: {
          // url: url,
          // ua: headers["User-Agent"],
          // toolbar: true
          src: url
        },
        layout: function (make, view) {
          make.left.right.equalTo(0)
          make.top.equalTo($("webViewTitle").bottom)
          make.height.equalTo(200)
          // make.bottom.equalTo(view.super)
        }
      }
    ]
  })
}

function download(object) {
  if (object.type == 2) {
    $ui.toast("无法下载")
    return
  }
  $ui.toast("开始下载: " + object.title.text)
  $http.request({
    method: "GET",
    header: headers,
    url: object.url,
    handler: function (resp) {
      url = findMP4(resp.data, object.type)
      $ui.loading(true)
      $http.download({
        url: url,
        header: headers,
        progress: function (bytesWritten, totalBytes) {
          var percentage = bytesWritten * 1.0 / totalBytes
          //$("progress").value = percentage 
        },
        handler: function (resp) {
          // $("progress").value = 0
          $ui.loading(false)
          $share.sheet([object.title.text + ".mp4", resp.data])
        }
      })
    }
  })
}

function findMP4(txt, type) {
  real = String(txt)
  // var regExp = (type == 0) ? (new RegExp(cnReg)) : (new RegExp(jpReg))
  var regExp = new RegExp(v2Reg)
  link = regExp.exec(real)
  return "http://media.vsteam.space/" + link[1]
}
