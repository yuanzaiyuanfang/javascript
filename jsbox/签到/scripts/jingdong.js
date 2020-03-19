$ui.loading("客官请稍等")
  $http.get({
    url: "https://api.m.jd.com/client.action?functionId=signBeanStart&body=%7B%22rnVersion%22%3A%223.9%22%7D&appid=ld&client=apple&clientVersion=&networkType=&osVersion=&uuid=&jsonp=jsonp_1529394547506_46907",
    header: {
     "Cookie": "",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1"
      },
    body: {},
    handler: function(resp) {
      let a = resp.data
   $http.get({
    url: "https://api.m.jd.com/client.action?functionId=signBeanStart&body=%7B%22rnVersion%22%3A%223.9%22%7D&appid=ld&client=apple&clientVersion=&networkType=&osVersion=&uuid=&jsonp=jsonp_1529394547506_46907",
    handler: function(resp) {
      let b = resp.data
    $ui.loading(false)
      if(a!=b)
      {
      alert("恭喜您成功获取京豆👏")
      }
      else
      {
      alert("签到失败，请重新获取cookie")
      }
     }
   })
  }
})