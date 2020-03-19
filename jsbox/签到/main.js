$ui.render({
  views: [{
    layout: $layout.fill,
    views: [{
      type: "label",
      props: {
        id: "wq",
        text: "日常签到",
        font: $font('AlNile', 26),
        textColor: $color("#bbbcbf"),
        lines: 0
      },
      layout: function(make, view) {
      make.centerX.equalTo(view.super)
        make.top.inset(20)
      }
    }]
  },
  {
        type: "button",
        props: {
            title: "京东",
            id: "as",
            bgcolor: $color("666666"),
        },
layout: function(make, view) {

      make.top.equalTo($("wq").bottom).inset(20)
      make.centerX.equalTo(view.super)           
      make.height.equalTo(30)   
      make.width.equalTo(80)                           
         },
        events: {
            tapped: function (sender) {
           var weifeng = require('scripts/jingdong')
            }
        }
    },
    {
        type: "button",
        props: {
            title: "吾爱",
            id: "we",
            bgcolor: $color("666666"),
         },
       layout: function(make, view) {

           make.top.equalTo($("wq").bottom).inset(20)
           make.right.equalTo($("as").left).inset(40)
           make.height.equalTo(30)
                    make.width.equalTo(80)
         },
        events: {
            tapped: function (sender) {
           var wuai = require('scripts/wuai')
            }
        }
    },
    {
        type: "button",
        props: {
            title: "115",
            id: "ad",
            bgcolor: $color("666666"),
        },
layout: function(make) {

           make.top.equalTo($("wq").bottom).inset(20)
           make.left.equalTo($("as").right).inset(40)
           make.height.equalTo(30)
                    make.width.equalTo(80)
         },
        events: {
            tapped: function (sender) {
           var tieba = require('scripts/115')
            }
        }
      },
      {
        type: "button",
        props: {
            title: "微博钱包",
            id: "wei",
            bgcolor: $color("666666"),
        },
layout: function(make, view) {

      make.top.equalTo($("as").bottom).inset(20)
      make.centerX.equalTo(view.super)           
      make.height.equalTo(30)   
      make.width.equalTo(80)                           
         },
        events: {
            tapped: function (sender) {
           var weifeng = require('scripts/weibo')
            }
        }
    },
     {
        type: "button",
        props: {
            title: "斗鱼",
            id: "dou",
            bgcolor: $color("666666"),
         },
       layout: function(make, view) {

           make.top.equalTo($("we").bottom).inset(20)
           make.right.equalTo($("wei").left).inset(40)
           make.height.equalTo(30)
                    make.width.equalTo(80)
         },
        events: {
     tapped: function (sender) {
    var wuai = require('scripts/douyu')
         }
       }
     }
   ]
})