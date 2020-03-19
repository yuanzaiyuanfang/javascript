
// Supported Sites: https://www.online-downloader.com/Supported-Sites
// power by https://www.online-downloader.com/

if ($app.env == $env.today) {
    let name = $addin.current.name.split(".js")
    $app.openURL("jsbox://run?name=" + $text.URLEncode(name[0]))
}

var buyMeaCoffee = require('scripts/coffee')

var videoUrl = $context.safari ? $context.safari.items.location.href : $context.link || $clipboard.text
if (videoUrl) {
    if (videoUrl.indexOf("twitter.com") != -1) {
        buyMeaCoffee.showcoffee(0)
        twitterDl()
    } else {
        videoParser()
    }
} else {
    buyMeaCoffee.showcoffee(0)
    alert($l10n("ALERT"))
}

function videoParser() {
    $ui.loading(true)
    $http.get({
        url: 'https://www.online-downloader.com/DL/dd.php?videourl=' + videoUrl,
        handler: function (resp) {
            $ui.loading(false)
            var data = resp.data
            data = data.replace(/\({/, "{")
            data = data.replace(/}\)/, "}")
            data = JSON.parse(data)
            if (data.Video_DownloadURL == null) {
                buyMeaCoffee.showcoffee(0)
                alert($l10n("INVALID"))
            } else {
                mainView(data)
                buyMeaCoffee.showcoffee(1)
            }

        }
    })
}

function mainView(data) {
    var rowsData = ["Recommended Quality"]
    for (var i = 1; i <= data.Video_Format_Count; i++) {
        rowsData.push(data["Video_" + i + "_WH"] + " - " + data["Video_" + i + "_Format_Note"] + "." + data["Video_" + i + "_Ext"] + "  ( " + data["Video_" + i + "_File_Size"] + ")")
    }
    $ui.render({
        props: {
            id: "mainView",
            navButtons: [
                {
                    icon: "058",
                    handler: function () {
                        buyMeaCoffee.coffee(1)
                    }
                }
            ]
        },
        views: [{
            type: "video",
            props: {
                src: data.Video_DownloadURL,
                poster: data.Video_Image
            },
            layout: function (make, view) {
                make.left.right.top.inset(0)
                make.height.equalTo(256)
            }
        }, {
            type: "list",
            props: {
                data: [
                    {
                        title: data.Video_Title,
                        rows: rowsData
                    }
                ],
                footer: {
                    type: "label",
                    props: {
                        height: 20,
                        text: "Online Downloader by Neurogram",
                        textColor: $color("#AAAAAA"),
                        align: $align.center,
                        font: $font(12)
                    }
                },
                actions: [
                    {
                        title: $l10n("DOWNLOAD"),
                        color: $color("red"),
                        handler: function (sender, indexPath) {
                            copyDL(data, indexPath.row, "dl")
                        }
                    },
                    {
                        title: $l10n("COPY"),
                        color: $color("gray"),
                        handler: function (sender, indexPath) {
                            copyDL(data, indexPath.row, "copy")
                        }
                    }
                ]
            },
            layout: function (make, view) {
                make.edges.insets($insets(256, 0, 0, 0))
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    alert($l10n("DIDSELECT"))
                }
            }
        },
        {
            type: "blur",
            props: {
                style: 5,
                alpha: 0
            },
            views: [{
                type: "progress",
                props: {
                    progressColor:$color("#f5a117"),
                    trackColor: $color("#ffffff")
                },
                layout: function (make, view) {
                    make.center.equalTo(view.super)
                    make.width.equalTo(250)
                    make.height.equalTo(15)
                }
            }, {
                type: "label",
                props: {
                    id: "progressLabel",
                    textColor: $color("darkGray"),
                    align: $align.center
                },
                layout: function (make, view) {
                    make.top.equalTo($("progress").bottom).inset(10)
                    make.centerX.equalTo(view.super.centerX)
                }
            }],
            layout: $layout.fill
        }
        ]
    })
}


function copyDL(data, row, type) {
    if (row == 0) {
        var url = data.Video_DownloadURL
    } else {
        var url = data["Video_" + row + "_Url"]
    }
    if (type == "dl") {
        $ui.animate({
            duration: 0.3,
            animation: function () {
                $("blur").alpha = 1
            }
          })
        $http.download({
            url: url,
            progress: function (bytesWritten, totalBytes) {
                $("progressLabel").text = bytesWritten + " / " + totalBytes
                $("progress").value = bytesWritten / totalBytes
            },
            handler: function (resp) {
                $ui.animate({
                    duration: 0.3,
                    animation: function () {
                        $("blur").alpha = 0
                    }
                  })
                $share.sheet(resp.data)
            }
        })
    } else {
        $clipboard.text = url
        alert($l10n("COPYLINK"))
    }
}



function twitterDl() {

    var found = false

    $ui.loading(true)
    $ui.toast($l10n("ANALYSING"))

    $ui.create({
        type: "web",
        props: {
            hidden: true,
            url: "http://twittervideodownloader.com/",
            script: function () {
                var finished = false
                var worker = function () {
                    var elements = document.getElementsByClassName("expanded button small float-right") || []
                    if (elements.length > 0 && !finished) {
                        var items = []
                        for (var i = 0; i < elements.length; ++i) {
                            var element = elements[i]
                            var title = element.parentElement.parentElement.getElementsByClassName("float-left")[0].innerText
                            items.push({ title: title, url: element.href })
                        }
                        $notify("showMenu", { items: items })
                        clearInterval(timer)
                        finished = true
                    }
                }
                worker()
                var timer = setInterval(worker, 500)
            }
        },
        layout: $layout.fill,
        events: {
            didFinish: function (sender) {
                var script = "document.getElementsByClassName('input-group-field')[0].value='" + videoUrl + "';document.querySelector('.button[type=submit]').click();"
                sender.eval({ script: script })
            },
            showMenu: function (info) {
                found = true
                $ui.loading(false)
                $ui.menu({
                    items: info.items.map(function (item) { return item.title }),
                    handler: function (title, idx) {
                        download(info.items[idx].url)
                    }
                })
            }
        }
    })

    function download(url) {
        $ui.loading(true)
        $ui.toast($l10n("DOWNLOADING"))
        $http.download({
            url: url,
            handler: function (resp) {
                $ui.loading(false)
                $share.sheet(resp.data)
            }
        })
    }

    $thread.main({
        delay: 30,
        handler: function () {
            $ui.loading(false)
            if (!found) {
                $ui.toast($l10n("ANALYSIS-FAILED"))
            }
        }
    })
}