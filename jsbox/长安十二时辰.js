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

var channelName = ["1集", "2集", "3集", "4集", "5集", "6集", "7集", "8集", "9集", "10集", "11集", "12集", "13集", "14集", "15集", "16集", "17集", "18集", "19集", "20集", "21集", "22集", "23集", "24集", "25集", "26集", "27集", "28集", "29集", "30集", "31集", "32集", "33集", "34集", "35集", "36集", "37集", "38集", "39集", "40集", "41集", "42集", "43集", "44集", "45集", "46集", "47集", "48集"]
var channelAddr = [
    "https://yun.kubozy-youku-163.com/20190629/16081_2e1c0be7/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16080_c6e0c228/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16079_9df4aad8/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16078_7dbd4460/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16077_aa1a408d/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16076_03f3780a/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16075_d858b882/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16074_49af8c8a/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16073_3f7e83b6/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16072_fa152c88/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16071_2cd437d1/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190629/16070_edb4590a/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190704/16387_c2452ba8/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190704/16386_bd55e38e/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190704/16385_806e8f1b/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190704/16384_60b8b210/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190711/16802_4be0e31b/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190711/16803_8b25e9fc/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190711/16804_48acf511/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190711/16805_7e1f00d5/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190715/17111_7154e2f7/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190715/17110_1dfd0bf1/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190715/17109_56e448a0/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190718/17353_6a68cc5c/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190718/17352_065c57a5/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190718/17351_e75cd171/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190722/17646_0624f398/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190722/17645_aea7db84/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190722/17644_ed7ad2b4/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190725/17948_aeb1d1e7/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190725/17947_5926b0d0/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190725/17946_4d27596b/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190729/18222_b73f698f/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190729/18221_4d613145/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190729/18220_826785eb/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190801/18595_de9e6326/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190801/18594_ac46d730/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190801/18593_829efadb/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190805/18900_b5b88e79/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190805/18899_7242930e/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190805/18898_a97984d3/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190805/18897_2a1009a8/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190805/18896_eee235ff/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190808/19177_4bb14b4d/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190808/19176_4a1f7ed8/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190808/19175_403db882/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190812/19419_9dc80298/1000k/hls/index.m3u8",
    "https://yun.kubozy-youku-163.com/20190812/19418_f45afbad/1000k/hls/index.m3u8"
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

        columns: 4,
        itemHeight: 40,
        spacing: 5,
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
        title: "长安十二时辰"
    },
    views: [video, menu]
});