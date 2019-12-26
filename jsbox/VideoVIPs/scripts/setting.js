var headerStyle = require("scripts/headerStyle")
var update = require("scripts/update")

var name = $addin.current.name

function setting() {
    var settingTemplate = {
        props: {

        },
        views: [
            {
                type: "label",
                props: {
                    id: "templateLabel"
                },
                layout: function(make, view) {
                    make.center.equalTo(view.super)
                    make.left.inset(10)
                }
            },
            {
                type: "image",
                props: {
                    src: "./assets/next.png"
                },
                layout: function(make) {
                    make.centerY.equalTo($("templateLabel").centerY)
                    make.right.inset(10)
                    make.size.equalTo($size(20, 20))
                }
            }
        ]
    }
    var settingData = [
        {
            title: "功能",
            rows: [
                {
                    templateLabel: {
                        text: "自定义接口"
                    }
                },
                {
                    templateLabel: {
                        text: "夜间模式"
                    }
                }
            ]
        },
        {
            title: "更多",
            rows: [
                {
                    templateLabel: {
                        text: "快捷指令版「" + name + "」"
                    }
                }
            ]
        },
        {
            title: "关于",
            rows: [
                {
                    templateLabel: {
                        text: "关注公众号"
                    }
                },
                {
                    templateLabel: {
                        text: "意见与建议"
                    }
                },
                {
                    templateLabel: {
                        text: "支持与赞赏"
                    }
                },
                {
                    templateLabel: {
                        text: "分享给朋友"
                    }
                }
            ]
        },
        {
            title: "其他",
            rows: [
                {
                    type: "button",
                    props: {
                        title: "检查更新",
                        type: 1,
                        titleColor: $color("#1580f8")
                    },
                    layout: $layout.fill,
                    events: {
                        tapped: function(sender) {
                            $device.taptic(0)
                            update.getOnlineVersion(false)
                        }
                    }
                },
                {
                    type: "button",
                    props: {
                        title: "清理缓存",
                        type: 1,
                        titleColor: $color("red")
                    },
                    layout: $layout.fill,
                    events: {
                        tapped: function(sender) {
                            $device.taptic(0)
                            clearCache()
                        }
                    }
                }
            ]
        }
    ]

    var settingDidSelect = function(sender, indexPath, data) {
        $device.taptic(0)
        $http.get({
            url: "https://gitee.com/heiwukong/JSBox/raw/master/support",
            handler: function(resp) {
                var data = resp.data
                var wechatName = data.wechatName
                var feedbackMail = data.feedback.mail
                var feedbackWechat = data.feedback.wechat
                var supportWechat = data.support.wechat
                var supportAlipay = data.support.alipay

                if (indexPath.section == 0) {
                    if (indexPath.row == 0) {
                        defAPI()
                    } else if (indexPath.row == 1) {
                        darkMode()
                    }
                } else if (indexPath.section == 1) {
                    if (indexPath.row == 0) {
                        shortcuts()
                    }
                } else if (indexPath.section == 2) {
                    if (indexPath.row == 0) {
                        followWechat(wechatName)
                    } else if (indexPath.row == 1) {
                        feedback(feedbackMail, feedbackWechat)
                    } else if (indexPath.row == 2) {
                        support(supportWechat, supportAlipay)
                    } else if (indexPath.row == 3) {
                        share2Friend()
                    }
                }
            }
        })
    }
    
    headerStyle.headerStyle("设置", settingTemplate, settingData, true, settingDidSelect)
}

function defAPI() {
    var defAPITemplate = {
        props: {

        },
        views: [
            {
                type: "input",
                props: {
                    id: "defAPIInput",
                    bgcolor: $color("white"),
                    type: $kbType.url
                },
                layout: $layout.fill,
                events: {
                    returned: function(sender) {
                        $device.taptic(0)
                        if (sender.text != "") {
                            if (sender.placeholder == "腾讯视频接口") {
                                $cache.set("defQQ", sender.text)
                            } else if (sender.placeholder == "爱奇艺接口") {
                                $cache.set("defIqiyi", sender.text)
                            } else if (sender.placeholder == "优酷接口") {
                                $cache.set("defYouku", sender.text)
                            } else if (sender.placeholder == "芒果TV接口") {
                                $cache.set("defMgtv", sender.text)
                            }
                            $ui.toast("自定义" + sender.placeholder + "成功")
                        }
                        sender.blur()
                    }
                }
            }
        ]
    }

    var defAPIData = [
        {
            title: "腾讯视频",
            rows: [
                {
                    defAPIInput: {
                        text: $cache.get("defQQ"),
                        placeholder: "腾讯视频接口"
                    }
                }
            ]
        },
        {
            title: "爱奇艺",
            rows: [
                {
                    defAPIInput: {
                        text: $cache.get("defIqiyi"),
                        placeholder: "爱奇艺接口"
                    }
                }
            ]
        },
        {
            title: "优酷",
            rows: [
                {
                    defAPIInput: {
                        text: $cache.get("defYouku"),
                        placeholder: "优酷接口"
                    }
                }
            ]
        },
        {
            title: "芒果TV",
            rows: [
                {
                    defAPIInput: {
                        text: $cache.get("defMgtv"),
                        placeholder: "芒果TV接口"
                    }
                }
            ]
        },
        {
            rows: [
                {
                    type: "button",
                    props: {
                        title: "重置所有接口",
                        type: 1,
                        titleColor: $color("red")
                    },
                    layout: $layout.fill,
                    events: {
                        tapped: function(sender) {
                            $device.taptic(0)
                            resetAllAPI()
                        }
                    }
                }
            ]
        }
    ]

    var defAPIDidSelect = function(sender, indexPath, data) {

    }

    headerStyle.headerStyle2("自定义接口", defAPITemplate, defAPIData, true, defAPIDidSelect)
}

function darkMode() {
    $ui.toast("敬请期待")
}

function shortcuts() {
    $http.get({
        url: "https://gitee.com/heiwukong/JSBox/raw/master/JSBox/" + $addin.current.name,
        handler: function(resp) {
            var data = resp.data
            $app.openURL(data.shortcuts)
        }
    })
}

function followWechat(wechatName) {
    $clipboard.text = wechatName
    $ui.alert({
        title: "公众号「" + wechatName + "」已复制",
        message: "点击关注后将跳转到微信，请搜索关注",
        actions: [
            {
                title: "取消",
                handler: function() {

                }
            },
            {
                title: "关注",
                handler: function() {
                    $app.openURL("weixin://")
                }
            }
        ]
    })
}

function feedback(mail, wechat) {
    $ui.menu({
        items: ["邮件反馈", "微信反馈"],
        handler: function(title, idx) {
            if (idx == 0) {
                $system.mailto(mail)
            } else if (idx == 1) {
                $clipboard.text = wechat
                $ui.alert({
                    title: "微信号已复制",
                    message: "点击确定后将跳转到微信，请搜索添加",
                    actions: [
                        {
                            title: "取消",
                            handler: function() {
            
                            }
                        },
                        {
                            title: "确定",
                            handler: function() {
                                $app.openURL("weixin://")
                            }
                        }
                    ]
                })
            }
        }
    })
}

function support(wechat, alipay) {
    $ui.menu({
        items: ["微信赞赏", "支付宝赞赏"],
        handler: function(title, idx) {
            if (idx == 0) {
                $photo.save({
                    data: $data({base64: wechat}),
                    handler: function(success) {
                        $ui.alert({
                            title: "赞赏码已保存到相册",
                            message: "点击赞赏后将跳转到微信，请扫码赞赏",
                            actions: [
                                {
                                    title: "取消",
                                    handler: function() {
                    
                                    }
                                },
                                {
                                    title: "确定",
                                    handler: function() {
                                        $app.openURL("weixin://scanqrcode")
                                    }
                                }
                            ]
                        })
                    }
                })
            } else if (idx == 1) {
                $app.openURL(alipay)
            }
        }
    })
}

function share2Friend() {
    $share.sheet({
        items: ["https://xteko.com/redir?name=" + name + "&url=https://gitee.com/heiwukong/JSBox/raw/master/newVersion/" + name + "/" + name + update.getLocalVersion() + ".box", name],
        handler: function(success) {
            $ui.toast("分享成功")
        }
    })
}

function clearCache() {
    $ui.alert({
        title: "清理缓存",
        message: "是否要清理缓存",
        actions: [
            {
                title: "不要",
                handler: function() {

                }
            },
            {
                title: "是的",
                handler: function() {
                    $cache.remove("initTab")
                    $cache.remove("initWeb")
                    $cache.remove("initTopOffset")
                    $ui.toast("缓存清理成功")
                }
            }
        ]
    })
}

function resetAllAPI() {
    $ui.alert({
        title: "重置所有接口",
        message: "重置后将全部使用内置接口",
        actions: [
            {
                title: "算了",
                handler: function() {

                }
            },
            {
                title: "好的",
                handler: function() {
                    $cache.remove("defQQ")
                    $cache.remove("defIqiyi")
                    $cache.remove("defYouku")
                    $cache.remove("defMgtv")
                    $ui.toast("重置接口成功")
                }
            }
        ]
    })
}

module.exports = {
    setting: setting
}