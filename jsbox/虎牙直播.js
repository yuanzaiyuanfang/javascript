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

var channelName=["各国赌片","韩国电影","甄子丹","刘德华","科幻动作","周润发","恐怖大片","木乃伊系列","洪金宝系列","吴京系列","成龙","李连杰","林正英","周星驰","CCTV1","CCTV1高清","CCTV2","CCTV2高清","CCTV3","CCTV3高清","CCTV4","CCTV4高清","CCTV5","CCTV5高清","CCTV6","CCTV6高清","CCTV7","CCTV7高清","CCTV8","CCTV8高清","CCTV9","CCTV9高清","CCTV10","CCTV10高清","CCTV11","CCTV11高清","CCTV12","CCTV12高清","CCTV13","CCTV13","CCTV14","CCTV14高清","CCTV15","CCTV15高清","CCTV阿拉伯语","CCTV法语","CCTV西班牙语","CCTV俄语","CETV1","浙江卫视","浙江卫视高清","湖南卫视","湖南卫视高清","安徽卫视","CHC高清电影","广东体育频道","TVB财经资讯台"]
var channelAddr=[
    "https://js.hls.huya.com/huyalive/29106097-2689446042-11551082794746642432-2789253870-10057-A-0-1_1200.m3u8",
    "https://aldirect.hls.huya.com/huyalive/28466698-2689662310-11552011658733813760-3048959582-10057-A-1525512946-1_1200.m3u8",
    "https://aldirect.hls.huya.com/huyalive/29169025-2686219938-11537226783573147648-2847699096-10057-A-1524024759-1_1200.m3u8",
    "https://aldirect.hls.huya.com/backsrc/94525224-2467341872-10597152648291418112-2789274550-10057-A-0-1_1200.m3u8",
    "https://aldirect.hls.huya.com/backsrc/28466698-2689656864-11551988268341919744-2847699194-10057-A-0-1_1200.m3u8",
    "https://aldirect.hls.huya.com/backsrc/94525224-2460685774-10568564925062447104-2789253840-10057-A-0-1_1200.m3u8",
    "https://aldirect.hls.huya.com/huyalive/29106097-2689447600-11551089486305689600-2789274568-10057-A-1525420695-1_1200.m3u8",
    "http:////aldirect.hls.huya.com/huyalive/28466698-2689654812-11551979455069028352-2847687626-10057-A-1525510268-1_1200.m3u8",
    "https://tx.hls.huya.com/huyalive/29106097-2689406282-11550912026846953472-2789274558-10057-A-0-1_1200.m3u8",
    "https://aldirect.hls.huya.com/backsrc/30765679-2554414705-10971127618396487680-3048991636-10057-A-0-1_1200.m3u8",
    "https://aldirect.hls.huya.com/huyalive/94525224-2460685722-10568564701724147712-2789253838-10057-A-0-1_1200.m3u8",
    "https://js.hls.huya.com/huyalive/94525224-2460686093-10568566295157014528-2789253848-10057-A-0-1_1200.m3u8",
    "https://tx.hls.huya.com/huyalive/94525224-2460686034-10568566041753944064-2789274542-10057-A-0-1_1200.m3u8",
    "https://tx.hls.huya.com/huyalive/94525224-2460685313-10568562945082523648-2789274524-10057-A-0-1_1200.m3u8",
    "http://cctvcnch5c.v.wscdns.com/live/cctv1_2/index.m3u8",
    "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000083.m3u8",
   "http://cctvcnch5c.v.wscdns.com/live/cctv2_2/index.m3u8",
   "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000084.m3u8",
    "http://cctvcnch5c.v.wscdns.com/live/cctv3_2/index.m3u8",
    "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000085.m3u8",
    "http://cctvcnch5c.v.wscdns.com/live/cctv4_2/index.m3u8",
    "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000489.m3u8",
    "http://115.238.238.218/tv_radio_36132/tv_channel_812__redirect__36132.m3u8",
    "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000086.m3u8",
    "http://cctvcnch5c.v.wscdns.com/live/cctv6_2/index.m3u8",
    "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000088.m3u8",
    "http://cctvcnch5c.v.wscdns.com/live/cctv7_2/index.m3u8",
    "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000089.m3u8",
    "http://cctvcnch5c.v.wscdns.com/live/cctv8_2/index.m3u8",
    "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000090.m3u8",
    "http://cctvcnch5c.v.wscdns.com/live/cctvjilu_2/index.m3u8",
    "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000091.m3u8",
     "http://cctvcnch5c.v.wscdns.com/live/cctv10_2/index.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000092.m3u8",
     "http://cctvcnch5c.v.wscdns.com/live/cctv11_2/index.m3u8",
     "http://httpdvb.slave.ttcatv.tv:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A161U30976010K775F3DB3I93DF1D1BPBM3226877V1044EZ33519WE3618BFDD11&playtoken=ABCDEFGHI&programid=4200000324.m3u8",
     "http://cctvcnch5c.v.wscdns.com/live/cctv12_2/index.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000093.m3u8",
     "http://cctvcnch5c.v.wscdns.com/live/cctv13_2/index.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&programid=4200000004.m3u8",
     "http://cctvcnch5c.v.wscdns.com/live/cctvchild_2/index.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A152U3091704BKB2E38607I93DF1D1BP8M340BC08V0Z334B7W15AF4B80449EB7F0&playtoken=ABCDEFGHI&auth=no&rate=sd&programid=4200000094.m3u8",
     "http://cctvcnch5c.v.wscdns.com/live/cctv15_2/index.m3u8",
     "http://httpdvb.slave.ttcatv.tv:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D22A161U30976010K775F3DB3I93DF1D1BPBM3226877V1044EZ33519WE3618BFDD11&playtoken=ABCDEFGHI&programid=4200000325.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D2634D5U309BC04BKB2E3DE63I93DF1D1BP8M340BE44V0Z334B7W15B020A904D215E8&playtoken=ABCDEFGHI&auth=no&programid=4200000129.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D2634D5U309BC04BKB2E3DE63I93DF1D1BP8M340BE44V0Z334B7W15B020A904D215E8&playtoken=ABCDEFGHI&auth=no&programid=4200000128.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D2634D5U309BC04BKB2E3DE63I93DF1D1BP8M340BE44V0Z334B7W15B020A904D215E8&playtoken=ABCDEFGHI&auth=no&programid=4200000127.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D2634D5U309BC04BKB2E3DE63I93DF1D1BP8M340BE44V0Z334B7W15B020A904D215E8&playtoken=ABCDEFGHI&auth=no&programid=4200000130.m3u8",
     "http://httpdvb.slave.bfgd.com.cn:13164/playurl?playtype=live&protocol=hls&accesstoken=R5D2634D5U309BC04BKB2E3DE63I93DF1D1BP8M340BE44V0Z334B7W15B020A904D215E8&playtoken=ABCDEFGHI&auth=no&programid=4200000490.m3u8",
     "http://ali.m.l.cztv.com/channels/lantian/channel01/360p.m3u8",
     "http://hls-ott-zhibo.wasu.tv/live/246/index.m3u8",
     "http://ivi.bupt.edu.cn/hls/hunantv.m3u8",
     "http://223.110.242.130:6610/gitv/live1/G_HUNAN-CQ/G_HUNAN-CQ/1.m3u8?IASHttpSessionId=OTT2502920190501172444174578",
     "http://cctvtxyh5c.liveplay.myqcloud.com/wstv/anhui_2_hd.m3u8",
    "http://ivi.bupt.edu.cn/hls/chchd.m3u8",
    "http://116.199.5.51:8114/hls/Fsv_chan_hls_se_idx=020&FvSeid=1&Fsv_ctype=LIVES&Fsv_otype=1&Provider_id=0&Pcontent_id=8114.m3u8",
    "http://e1.vdowowza.vip.hk1.tvb.com/tvblive/smil:mobilehd_financeintl.smil/chunklist.m3u8",
]

const video = {
    type: "video",
    props: {
        id:'video',
      src: "",
      
    },
    layout: function(make, view) {
      make.left.right.equalTo(0)
      make.top.equalTo(0)
      make.height.equalTo(256)
    }
  };


  const menu={
    type: "matrix",
    props: {
      
      columns: 2,
      itemHeight: 88,
      spacing: 10,
      template: [{
        type: "label",
        props: {
          id: "tile",
          radius:8,
          bgcolor: $color("#474b51"),
          textColor: $color("#abb2bf"),
          align: $align.center,
          font: $font(20)
        },
        layout: $layout.fill
      }],
      data: channelName.map(function(item) {
        return {
          tile: {
            text: "" + item
          }
        }
      })
    },
    layout: function(make) {
      make.left.bottom.right.equalTo(0)
      make.top.equalTo(280)
      make.height.equalTo(446)
    },
    events: {
      didSelect: function(sender, indexPath, data) {
        var token = data.tile.text
        var index = indexPath.item
        var url=channelAddr[index]
        
        
          $("video").src=url
  
          $delay(0.1, function() {
            $("video").play()
        });
                    
        
      }
    }
  }

$ui.render({
    props: {
        title: "虎牙直播"
    },
    views: [video,menu]
});


