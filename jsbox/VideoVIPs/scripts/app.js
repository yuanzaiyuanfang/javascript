var setting = require("scripts/setting")

function show(items, urls, keys, apis) {
    $ui.render({
        props: {
            id: "mainView",
            navBarHidden: true,
            statusBarStyle: 0
        },
        views: [
            {
                type: "tab",
                props: {
                    id: "videoTab",
                    items: items,
                    index: $cache.get("initTab")
                },
                layout: function(make) {
                    make.top.inset($cache.get("initTopOffset"))
                    make.centerX.equalTo($device.info.centerX)
                },
                events: {
                    changed: function(sender) {
                        $device.taptic(0)
                        $("showWeb").url = urls[sender.index]
                        $cache.set("initTab", sender.index)
                        $cache.set("initWeb", $("showWeb").url)
                    }
                }
            },

            {
                type: "web",
                props: {
                    id: "showWeb",
                    url: $cache.get("initWeb"),
                    script: function() {
                        var a = document.getElementsByTagName("a")
                        for (let i = 0; i < a.length; i++) {
                            a[i].setAttribute("target", "")
                        }
                        
                        document.getElementsByClassName("m-user")[0].style.backgroundColor = "#ffffff"  // 首页header
                        document.getElementsByClassName("g-nav-head")[0].style.backgroundColor = "#ffffff"  // 菜单栏
                        document.getElementsByClassName("m-search search-fixed")[0].style.backgroundColor = "#ffffff"   // 搜索栏
                    }
                },
                layout: function(make) {
                    make.top.equalTo($("videoTab").bottom).offset(5)
                    make.bottom.inset(50)
                    make.left.right.inset(0)
                },
                events: {
                    didFinish: function(sender) {
                        sender.eval({
                            script: "document.getElementsByClassName('header-search-box')[0].style.backgroundColor = '#ffffff', document.getElementsByClassName('header-searchInput')[0].style.backgroundColor = '#ffffff', document.getElementsByClassName('search-input')[0].style.backgroundColor = '#ffffff', document.getElementsByClassName('search-input')[0].style.color = '#000000', document.getElementsByClassName('g-nav-head')[0].style.backgroundColor = '#ffffff'"
                            // 搜索页header 搜索框  搜索输入框  搜索框文字  搜索结果导航栏
                        })
                    }
                }
            },

            {
                type: "button",
                props: {
                    id: "goBackButton",
                    src: "./assets/goBack.png"
                },
                layout: function(make) {
                    make.left.inset($device.info.screen.width / 8 - 15)
                    make.bottom.inset(10) // 25 - 15
                    make.size.equalTo($size(30, 30))
                },
                events: {
                    tapped: function(sender) {
                        $device.taptic(0)
                        $("showWeb").goBack()
                        for (let index = 0; index < keys.length; index++) {
                            if ($("showWeb").url.indexOf(keys[index][0]) != -1) {
                                $("videoTab").index = keys[index][1]
                                $cache.set("initTab", keys[index][1])
                            }
                        }
                    }
                }
            },

            {
                type: "button",
                props: {
                    id: "goHomeButton",
                    src: "./assets/home.png"
                },
                layout: function(make) {
                    make.left.equalTo($("goBackButton").left).offset($device.info.screen.width / 4)
                    make.bottom.equalTo($("goBackButton").bottom)
                    make.size.equalTo($size(30, 30))
                },
                events: {
                    tapped: function(sender) {
                        $device.taptic(0)
                        $("showWeb").url = urls[$("videoTab").index]
                    }
                }
            },

            {
                type: "button",
                props: {
                    id: "playButton",
                    src: "./assets/play.png"
                },
                layout: function(make) {
                    make.left.equalTo($("goBackButton").left).offset($device.info.screen.width * 2 / 4)
                    make.bottom.equalTo($("goBackButton").bottom)
                    make.size.equalTo($size(30, 30))
                },
                events: {
                    tapped: function(sender) {
                        $device.taptic(0)
                        for (let index = 0; index < keys.length; index++) {
                            if ($("showWeb").url.indexOf(keys[index][0]) != -1) {
                                if (keys[index][1] == 0) {
                                    var api = $cache.get("defQQ")
                                } else if (keys[index][1] == 1) {
                                    var api = $cache.get("defIqiyi")
                                } else if (keys[index][1] == 2) {
                                    var api = $cache.get("defYouku")
                                } else if (keys[index][1] == 3) {
                                    var api = $cache.get("defMgtv")
                                }
                                if (!api) {
                                    api = apis[keys[index][1]]
                                }
                                $ui.preview({
                                    title: items[keys[index][1]],
                                    url: api + $("showWeb").url
                                })
                                $cache.set("initWeb", $("showWeb").url)
                            }
                        }
                    }
                }
            },

            {
                type: "button",
                props: {
                    id: "settingButton",
                    src: "./assets/setting.png"
                },
                layout: function(make) {
                    make.left.equalTo($("goBackButton").left).offset($device.info.screen.width * 3 / 4)
                    make.bottom.equalTo($("goBackButton").bottom)
                    make.size.equalTo($size(30, 30))
                },
                events: {
                    tapped: function(sender) {
                        $device.taptic(0)
                        setting.setting()
                    }
                }
            },
        ]
    })
}

module.exports = {
    show: show
}