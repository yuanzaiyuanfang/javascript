//10010.js

//https://alipay.10010.com/mobileWeChatApplet/home/queryUserInfo.htm?mobile=132411234567&stoken=d72b03f54baa6756bbbae87a85a462c554a1ed9b6c4bf5517ab53161951ec1267702f5bf567c5a1fe391c5804ee6789&loginCode=061ienbX0ZfUa12unieX0aTEbX0ihdis
var mobile = "18584875908"
var stoken = "432f0e7305db6eb0e2acfc8341806cb9951239227ec198c4a0d12859f8aa2eb497e46129203ada92517f6e6fac2c8de5"
var loginCode = "033rRp7a1s6AiQ1DG49a1S5h7a1rRp78"
var bgcolor = $color("clear")

var generalInfo
var dataPlan

let MATRIX_TEMPLATE = [{
  type: "label",
  props: {
    id: "remainTitle",
    font: $font(16),
    bgcolor: bgcolor
  },
  layout: function (make, view) {
    make.top.equalTo(0)
    make.height.equalTo(30)
    make.centerX.equalTo(0)
  }
},
{
  type: "label",
  props: {
    id: "val",
    textColor: $color("black"),
    font: $font(24),
    bgcolor: bgcolor
  },
  layout: function (make, view) {
    make.top.equalTo($("remainTitle").bottom)
    make.centerX.equalTo(0)
  }
}
]

function render_app() {
  $ui.render({
    props: {
      title: "ChinaUnicom",
      bgcolor: bgcolor,

    },
    views: [{
      type: "label",
      props: {
        id: "queryTime",
        bgcolor: $color("white"),
        textColor: $color("black"),
        align: $align.center,
        font: $font(14),
        text: "截至 " + dataPlan.queryTime
      },
      layout: function (make) {
        make.top.equalTo(0)
        make.height.equalTo(30)
        make.centerX.equalTo()
      }
    },
    {
      type: "matrix",
      props: {
        columns: 3,
        itemHeight: 70,
        spacing: 0,
        template: MATRIX_TEMPLATE,
        data: matrixData()
      },
      layout: function (make) {
        make.left.right.equalTo(0)
        make.top.equalTo($("queryTime").bottom)
        make.height.equalTo(80)
      }
    },
    {
      type: "canvas",
      layout: $layout.fill,
      events: {
        draw: function (view, ctx) {
          ctx.strokeColor = $color("lightGray")
          ctx.setLineWidth(0.5)
          ctx.moveToPoint(view.frame.width / 3, 40)
          ctx.addLineToPoint(view.frame.width / 3, 90)
          ctx.moveToPoint(view.frame.width * 2 / 3, 40)
          ctx.addLineToPoint(view.frame.width * 2 / 3, 90)
          ctx.strokePath()
        }
      }
    },
    {
      type: "list",
      props: {
        id: "infoList",
        rowHeight: 90,
        data: [{
          title: "语音余量",
          rows: voicePlanList_app()
        },
        {
          title: "数据余量",
          rows: dataPlanList_app()
        }
        ]
      },
      layout: function (make) {
        make.top.equalTo($("matrix").bottom)
        make.left.right.equalTo(0)
        make.bottom.equalTo(0)
      }
    }
    ]
  })

}

function render_today() {
  $ui.render({
    props: {
      title: "ChinaUnicom"
    },
    views: [{
      type: "blur",
      props: {
        style: 1 // 0 ~ 5
      },
      layout: $layout.fill
    },
    {
      type: "view",
      props: {

        bgcolor: bgcolor
        // bgcolor: $color("#F9F9F9")
      },
      layout: function (make, view) {
        make.top.equalTo(0)
        make.height.equalTo(150)
        make.left.right.equalTo(0)
      }
    },
    {
      type: "label",
      props: {
        id: "queryTime",
        bgcolor: bgcolor,
        // bgcolor: $color("#F9F9F9"),
        align: $align.center,
        font: $font(14),
        text: "截至 " + generalInfo.flush_date_time //dataPlan.queryTime
      },
      layout: function (make) {
        make.top.equalTo(0)
        make.height.equalTo(30)
        make.centerX.equalTo()
      }
    },
    {
      type: "matrix",
      props: {
        columns: 3,
        itemHeight: 60,
        bgcolor: bgcolor,
        spacing: 0,
        template: MATRIX_TEMPLATE,
        data: matrixData()
      },
      layout: function (make) {
        make.left.right.equalTo(0)
        make.top.equalTo($("queryTime").bottom)
        make.height.equalTo(60)
      }
    },
    {
      type: "list",
      props: {
        id: "infoList",
        bgcolor: bgcolor,
        rowHeight: 75,
        data: [{
          title: "语音余量",
          rows: voicePlanList_today()
        },
        {
          title: "数据余量",
          rows: dataPlanList_today()
        }
        ]
      },
      layout: function (make) {
        make.top.equalTo($("matrix").bottom)
        make.left.right.equalTo(0)
        make.bottom.equalTo(0)
      }
    }
    ]
  })

}

function matrixData() {
  return generalInfo.dataList.map(function (item) {
    return {
      remainTitle: {
        text: item.remainTitle
      },
      val: {
        text: item.number + item.unit
      }
    }
  })
}

function voicePlanList_today() {
  return [{
    type: "view",
    layout: $layout.fill,
    views: [{
      type: "label",
      props: {
        id: "itemName",
        font: $font(16),
        text: "国内通话余量 " + generalInfo.dataList[2].number + "分钟",
        align: $align.center
      },
      layout: function (make, view) {
        make.left.inset(20)
        make.top.equalTo(view.super).inset(15)
      }
    },
    {
      type: "label",
      props: {
        id: "addUpUpper",
        font: $font(16),
        text: "总量: " + Math.round(generalInfo.dataList[2].number * 100 / generalInfo.dataList[2].persent) + "分钟",
        align: $align.center
      },
      layout: function (make, view) {
        make.right.inset(20)
        make.top.equalTo(view.super).inset(15)
      }
    },
    {
      type: "progress",
      props: {
        id: "voicePercent",
        progressColor: $color("darkGray"),
        value: generalInfo.dataList[2].persent / 100
      },
      layout: function (make, view) {
        // make.centerY.equalTo(view.super)
        make.top.equalTo($("itemName").bottom).offset(15)
        make.left.inset(20)
        make.right.inset(80)
      }
    },
    {
      type: "label",
      props: {
        text: (generalInfo.dataList[2].persent) + "%",
        align: $align.center,
        font: $font(16),
      },
      layout: function (make, view) {
        make.left.equalTo($("voicePercent").right).offset(15)
        make.centerY.equalTo($("voicePercent").centerY)
      }
    }
    ]
  }

  ]
}

function dataPlanList_today() {

  return [{
    type: "view",
    layout: $layout.fill,
    views: [{
      type: "label",
      props: {
        id: "dataBalanceCurMonth",
        font: $font(16),
        text: /*(dataPlan.voiceListCombo[0].feePolicyName)*/ "本月数据余量 " + generalInfo.dataList[1].number + generalInfo.dataList[1].unit, // + dataPlan.voiceListCombo[0].addUpUpper,
        align: $align.center
      },
      layout: function (make, view) {
        make.left.inset(20)
        // make.centerY.equalTo($("voicePercent").centerY)
        make.top.equalTo(view.super).inset(15)
      }
    },
    {
      type: "label",
      props: {
        id: "dataTotalCurMonth",
        font: $font(16),
        text: "总量: " + (generalInfo.dataList[1].number * 100 / generalInfo.dataList[1].persent).toFixed(2) + generalInfo.dataList[1].unit, //calcCurMonthTotal().toFixed(2) + "GB",
        align: $align.center
      },
      layout: function (make, view) {
        make.right.inset(20)
        // make.centerY.equalTo($("voicePercent").centerY)
        make.top.equalTo(view.super).inset(15)
      }
    },
    {
      type: "progress",
      props: {
        id: "curMonthPercent",
        progressColor: $color("darkGray"),
        value: generalInfo.dataList[1].persent / 100 //calcCurMonthRest() / calcCurMonthTotal()
      },
      layout: function (make, view) {
        // make.centerY.equalTo(view.super)
        make.top.equalTo($("dataTotalCurMonth").bottom).offset(15)
        make.left.inset(20)
        make.right.inset(80)
      }
    },
    {
      type: "label",
      props: {
        text: /*(calcCurMonthRest() / calcCurMonthTotal() * 100).toFixed(1)*/ generalInfo.dataList[1].persent + "%",
        align: $align.center,
        font: $font(16),
      },
      layout: function (make, view) {
        make.left.equalTo($("curMonthPercent").right).offset(15)
        make.centerY.equalTo($("curMonthPercent").centerY)
      }
    }
    ]
  }]
}

function voicePlanList_app() {
  arr = dataPlan.voiceListCombo.map(function (item) {
    return {
      type: "view",
      layout: $layout.fill,
      views: [{
        type: "label",
        props: {
          id: "dataBalanceCurMonth",
          font: $font(16),
          text: item.feePolicyName
        },
        layout: function (make, view) {
          make.left.inset(20)
          make.top.equalTo(view.super).inset(15)
        }
      },
      {
        type: "progress",
        props: {
          id: "curMonthPercent",
          progressColor: $color("darkGray"),
          value: item.usedPercent / 100
        },
        layout: function (make, view) {
          make.top.equalTo($("dataBalanceCurMonth").bottom).offset(10)
          make.left.inset(20)
          make.right.inset(70)
        }
      },
      {
        type: "label",
        props: {
          text: item.usedPercent + "%",
          font: $font(16),
        },
        layout: function (make, view) {
          make.right.equalTo(-15)
          make.centerY.equalTo($("curMonthPercent").centerY)
        }
      },
      {
        type: "label",
        props: {
          id: "dataTotalCurMonth",
          font: $font(14),
          text: "总量: " + item.addUpUpper + "分钟",
          align: $align.center
        },
        layout: function (make, view) {
          make.top.equalTo($("curMonthPercent").bottom).offset(15)
          make.left.equalTo(view.super.left).inset(20)
        }
      },
      {
        type: "label",
        props: {
          id: "dataTotalCurMonth",
          font: $font(14),
          text: "剩余: " + item.xCanUseValue + "分钟",
          align: $align.center
        },
        layout: function (make, view) {
          make.top.equalTo($("curMonthPercent").bottom).offset(15)
          make.right.equalTo(view.super.right).inset(15)

        }
      }
      ]
    }
  })
  return arr
}

function dataPlanList_app() {
  arr1 = dataPlan.flowListCombo.map(function (item) {
    return {
      type: "view",
      layout: $layout.fill,
      views: [{
        type: "label",
        props: {
          id: "dataBalanceCurMonth",
          font: $font(16),
          text: item.addUpItemName
        },
        layout: function (make, view) {
          make.left.inset(20)
          make.top.equalTo(view.super).inset(15)
        }
      },
      {
        type: "label",
        props: {
          id: "isLocal",
          text: "#" + (item.feePolicyName == "本地流量" ? "本地" : "国内"),
          font: $font(14),
          bgcolor: $color("#DCDCDC"),
        },
        layout: function (make, view) {
          make.centerY.equalTo($("dataBalanceCurMonth").centerY)
          make.left.equalTo($("dataBalanceCurMonth").right).offset(8)
        }
      },
      {
        type: "progress",
        props: {
          id: "curMonthPercent",
          progressColor: $color("darkGray"),
          value: item.usedPercent / 100
        },
        layout: function (make, view) {
          make.top.equalTo($("dataBalanceCurMonth").bottom).offset(10)
          make.left.inset(20)
          make.right.inset(70)
        }
      },
      {
        type: "label",
        props: {
          text: item.usedPercent + "%",
          font: $font(16),
        },
        layout: function (make, view) {
          make.right.equalTo(-15)
          make.centerY.equalTo($("curMonthPercent").centerY)
        }
      },
      {
        type: "label",
        props: {
          id: "dataTotalCurMonth",
          font: $font(14),
          text: "剩余流量: " + item.remainValue + item.canUseUnitVal,
          align: $align.center
        },
        layout: function (make, view) {
          make.top.equalTo($("curMonthPercent").bottom).offset(15)
          make.right.equalTo(view.super.right).inset(15)

        }
      },
      {
        type: "label",
        props: {
          id: "dataTotalCurMonth",
          font: $font(14),
          text: "总量: " + item.totalValue + item.totalUnitVal,
          align: $align.center
        },
        layout: function (make, view) {
          make.top.equalTo($("curMonthPercent").bottom).offset(15)
          make.left.equalTo(view.super.left).inset(20)
        }
      }
      ]
    }
  })

  arr2 = dataPlan.carryForwardListCombo.map(function (item) {
    return {
      type: "view",
      layout: $layout.fill,
      views: [{
        type: "label",
        props: {
          id: "dataBalanceCurMonth",
          font: $font(16),
          text: item.addUpItemName
        },
        layout: function (make, view) {
          make.left.inset(20)
          make.top.equalTo(view.super).inset(15)
        }
      },
      {
        type: "label",
        props: {
          id: "isLocal",
          text: "#" + (item.feePolicyName == "本地流量" ? "本地" : "国内"),
          font: $font(14),
          bgcolor: $color("#DCDCDC"),
        },
        layout: function (make, view) {
          make.centerY.equalTo($("dataBalanceCurMonth").centerY)
          make.left.equalTo($("dataBalanceCurMonth").right).offset(8)
        }
      },
      {
        type: "label",
        props: {
          text: "#转结",
          font: $font(14),
          bgcolor: $color("#DCDCDC"),
        },
        layout: function (make, view) {
          make.left.equalTo($("isLocal").right).offset(3)
          make.centerY.equalTo($("isLocal").centerY)
        }
      },
      {
        type: "progress",
        props: {
          id: "curMonthPercent",
          progressColor: $color("darkGray"),
          value: item.usedPercent / 100
        },
        layout: function (make, view) {
          make.top.equalTo($("dataBalanceCurMonth").bottom).offset(10)
          make.left.inset(20)
          make.right.inset(70)
        }
      },
      {
        type: "label",
        props: {
          text: item.usedPercent + "%",
          font: $font(16),
        },
        layout: function (make, view) {
          make.right.equalTo(-15)
          make.centerY.equalTo($("curMonthPercent").centerY)
        }
      },
      {
        type: "label",
        props: {
          id: "dataTotalCurMonth",
          font: $font(14),
          text: "剩余流量: " + item.remainValue + item.canUseUnitVal,
          align: $align.center
        },
        layout: function (make, view) {
          make.top.equalTo($("curMonthPercent").bottom).offset(15)
          make.right.equalTo(view.super.right).inset(15)

        }
      },
      {
        type: "label",
        props: {
          id: "dataTotalCurMonth",
          font: $font(14),
          text: "总量: " + item.totalValue + item.totalUnitVal,
          align: $align.center
        },
        layout: function (make, view) {
          make.top.equalTo($("curMonthPercent").bottom).offset(15)
          make.left.equalTo(view.super.left).inset(20)
        }
      }
      ]
    }
  })
  return arr2.concat(arr1)
}
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function main() {
  $ui.toast("查询中...", 1)

  if ($app.env == $env.today) {

    $http.get({
      url: "https://alipay.10010.com/mobileWeChatApplet/home/queryUserInfo.htm?mobile=" + mobile + "&stoken=" + stoken + "&loginCode=" + loginCode,
      handler: function (resp) {
        generalInfo = resp.data
        var date = new Date().Format("yyyy-MM-dd hh:mm:ss")
        generalInfo.flush_date_time = date//.getFullYear() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        render_today()
      }
    })
  } else if ($app.env == $env.app) {
    $http.get({
      url: "https://alipay.10010.com/mobileWeChatApplet/operationservice/queryOcsPackageFlowLeftContent.htm?mobile=" + mobile + "&stoken=" + stoken,
      handler: function (resp) {
        dataPlan = resp.data
        if (generalInfo != null) {
          render_app()
        }
      }
    })

    $http.get({
      url: "https://alipay.10010.com/mobileWeChatApplet/home/queryUserInfo.htm?mobile=" + mobile + "&stoken=" + stoken + "&loginCode=" + loginCode,
      handler: function (resp) {
        generalInfo = resp.data
        var date = new Date().Format("yyyy-MM-dd hh:mm:ss")
        generalInfo.flush_date_time = date//.pattern("yyyy-MM-dd hh:mm:ss")//date.getFullYear() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        if (dataPlan != null) {
          render_app()
        }
      }
    })
  } else {
    $ui.alert("只支持通过today widget或主程序打开")
  }

}

main()