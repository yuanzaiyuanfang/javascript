/**erots
id: 5d550b8bd5de2b006c9fa1a5
build: 1
source: b8200736546848dab9c9b9562764660d
*/
/*
moonzju@twitter
野猪看电视
观看电视直播源的节目，外国电视为主，绝大部分是720P画质，某些频道可能需要翻墙才能观看
感谢LCO LOK网友提供的直接点击播放的方法
version：1.0.6
*/
var channelName = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
var channelAddr = [
    "https://dy2.jsyunbf.com/20170919/QgwA7EqB/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/4Cl9ayF0/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/2cedsebB/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/VzjLevlI/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/HU2WEbpZ/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/MvuHyo8X/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/RQkhA9V0/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/4L7IQJo4/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/mxVAonny/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20170919/Uu9hxZ0Z/1200kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20170926/jiJbocwg/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20170926/fGBgff0k/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20170926/8ABruzDL/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20170926/oimZbKZ1/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20170926/8vfHQ0TM/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20171003/8DGRLdOi/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20171003/leOwmQSH/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20171003/QBbubnI9/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20171003/2N8qOaCx/900kb/hls/index.m3u8",
    "https://videos2.jsyunbf.com/20171003/JDIKAKFq/900kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171010/gU5DEi5F/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171010/GTyaum9z/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171010/gQzqX3P4/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171010/Q4S9cy8C/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171010/9C7Xg7TP/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171016/hmAAGE4J/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171016/AZ3dCUza/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171016/oVufUwlQ/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171016/CNUiQKAC/1200kb/hls/index.m3u8",
    "https://dy2.jsyunbf.com/20171016/MrSSenNC/1200kb/hls/index.m3u8"
]

const video = {
    type: "video",
    props: {
        id: 'video',
        src: "",

    },
    layout: function (make, view) {
        make.left.right.equalTo(0)
        make.top.equalTo(0)
        make.height.equalTo(256)
    }
};


const menu = {
    type: "matrix",
    props: {

        columns: 2,
        itemHeight: 88,
        spacing: 10,
        template: [{
            type: "label",
            props: {
                id: "tile",
                radius: 8,
                bgcolor: $color("#474b51"),
                textColor: $color("#abb2bf"),
                align: $align.center,
                font: $font(20)
            },
            layout: $layout.fill
        }],
        data: channelName.map(function (item) {
            return {
                tile: {
                    text: "" + item + "集"
                }
            }
        })
    },
    layout: function (make) {
        make.left.bottom.right.equalTo(0)
        make.top.equalTo(280)
        make.height.equalTo(446)
    },
    events: {
        didSelect: function (sender, indexPath, data) {
            var token = data.tile.text
            var index = indexPath.item
            var url = channelAddr[index]
            $("video").src = url
            $delay(0.1, function () {
                $("video").play()
            });
        }
    }
}

$ui.render({
    props: {
        title: "使徒行者2(30)"
    },
    views: [video, menu]
});