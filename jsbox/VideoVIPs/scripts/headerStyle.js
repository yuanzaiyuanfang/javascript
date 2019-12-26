function headerStyle(headerTitle, template, data, selectable, didSelect) {
    $ui.push({
        props: {
            id: "headerStyleView",
            bgcolor: $color("#f9f9f9"),
            navBarHidden: true,
            statusBarStyle: 0
        },
        views: [
            {
                type: "list",
                props: {
                    id: "myList",
                    selectable: selectable,
                    template: template,
                    header: {
                        props: {
                            id: "listHeader",
                            height: 95
                        },
                        views: [
                            {
                                type: "label",
                                props: {
                                    id: "listHeaderLabel",
                                    text: headerTitle,
                                    font: $font("bold", 40)
                                },
                                layout: function(make) {
                                    make.left.inset(10)
                                    make.bottom.inset(0)
                                }
                            }
                        ]
                    },
                    data: data
                },
                layout: function(make) {
                    make.top.inset($cache.get("initTopOffset"))
                    make.bottom.left.right.inset(0)
                },
                events: {
                    didSelect: function(sender, indexPath, data) {
                        didSelect(sender, indexPath, data)
                    },
                    didScroll: function(sender) {
                        if (sender.contentOffset.y >= 40) {
                            $("scroll2HeaderLabel").hidden = false
                            $("listHeaderLabel").hidden = true
                        } else if (sender.contentOffset.y < 40) {
                            $("scroll2HeaderLabel").hidden = true
                            $("listHeaderLabel").hidden = false
                        } else if (sender.contentOffset.y < 0) {
                            let size = 40 - sender.contentOffset.y * 0.05
                            if (size > 50) {
                                size = 50
                            }
                            $("listHeaderLabel").font = $font(size)
                        }
                    }
                }
            },
            {
                type: "blur",
                props: {
                    id: "scroll2HeaderBlur",
                    style: 0,
                    bgcolor: $color("#f9f9f9")
                },
                layout: function(make) {
                    make.top.inset($cache.get("initTopOffset") - 20)
                    make.left.right.inset(0)
                    make.height.equalTo(65)
                }
            },
            {
                type: "label",
                props: {
                    id: "scroll2HeaderLabel",
                    text: headerTitle,
                    font: $font("bold", 18),
                    align: $align.center,
                    hidden: true
                },
                layout: function(make) {
                    make.top.inset($cache.get("initTopOffset") - 10)
                    make.left.right.inset(0)
                    make.height.equalTo(65)
                }
            }
        ]
    })
}

function headerStyle2(headerTitle, template, data, selectable, didSelect) {
    $ui.push({
        props: {
            id: "headerStyleView",
            bgcolor: $color("#f9f9f9"),
            navBarHidden: true,
            statusBarStyle: 0
        },
        views: [
            {
                type: "list",
                props: {
                    id: "myList",
                    bgcolor: $color("#f9f9f9"),
                    selectable: selectable,
                    template: template,
                    data: data
                },
                layout: function(make) {
                    make.top.inset($cache.get("initTopOffset") + 45)
                    make.bottom.left.right.inset(0)
                },
                events: {
                    didSelect: function(sender, indexPath, data) {
                        didSelect(sender, indexPath, data)
                    }
                }
            },
            {
                type: "blur",
                props: {
                    style: 0,
                    bgcolor: $color("#f9f9f9")
                },
                layout: function(make) {
                    make.top.inset($cache.get("initTopOffset") - 20)
                    make.left.right.inset(0)
                    make.height.equalTo(65)
                }
            },
            {
                type: "label",
                props: {
                    text: headerTitle,
                    font: $font("bold", 18),
                    align: $align.center
                },
                layout: function(make) {
                    make.top.inset($cache.get("initTopOffset") - 10)
                    make.left.right.inset(0)
                    make.height.equalTo(65)
                }
            }
        ]
    })
}

module.exports = {
    headerStyle: headerStyle,
    headerStyle2: headerStyle2
}