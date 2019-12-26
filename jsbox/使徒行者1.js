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

var channelName = ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
var channelAddr = [
    "https://leshi.cdn-zuyida.com/20170926/FA5g99eo/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/yG8fA3FC/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/JxCbbbFa/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/gWLhUFrw/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/AXbj9Bgr/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/0lgByuvg/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/V6iM6iFf/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/jpZdcOtX/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/dX0cUU38/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/mXG8DDZ9/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/3ADYxr1s/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/PJ6lnydd/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/jbDXk85w/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/uDX9yRyS/600kb/hls/index.m3u8",
    "https://leshi.cdn-zuyida.com/20170926/kDKu43Vr/600kb/hls/index.m3u8"
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
                    text: "" + item
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
        title: "使徒行者1"
    },
    views: [video, menu]
});