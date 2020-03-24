const cookieName = '掌上营业厅-江苏移动'
const wxCookieName = '微信-江苏移动'
const syCjHeadersKey = 'chavy_sy_cj_jsyd' //视娱抽奖headers key
const syCjHomeUrl = "https://wap.js.10086.cn/mb_nact/17853"
const wxCjHeadersKey = 'chavy_wx_cj_jsyd' //微信抽奖 header key
const wxCjHomeUrl = "http://wap.js.10086.cn/nact/resource/8006/html/index.html?ch=2184"
const cllCjHeadersKey = 'chavy_cll_cj_jsyd' //春来了抽奖 headers key
const cllCjHomeUrl = "http://wap.js.10086.cn/mb_nact/17916"
const chavy = init()

const requrl = $request.url

if ($request && requrl.indexOf(syCjHomeUrl) >= 0) {
  const syCjHeadersVal = JSON.stringify($request.headers)
  if (syCjHeadersVal) chavy.setdata(syCjHeadersKey, syCjHeadersVal)
  title = chavy.msg(cookieName, `获取，视娱抽奖cookie: 成功`, ``)
} else if ($request && requrl.indexOf(cllCjHomeUrl) >= 0) {
  const cllCjHeadersVal = JSON.stringify($request.headers)
  if (cllCjHeadersVal) chavy.setdata(cllCjHeadersKey, cllCjHeadersVal)
  title = chavy.msg(cookieName, `获取,春来了Cookie: 成功`, ``)
} else if ($request && requrl.indexOf(wxCjHomeUrl) >= 0) {
  const wxCjHeadersVal = JSON.stringify($request.headers)
  if (wxCjHeadersVal) chavy.setdata(wxCjHeadersKey, wxCjHeadersVal)
  title = chavy.msg(wxCookieName, `获取,微信抽奖Cookie: 成功`, ``)
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(val, key)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return {
    isSurge,
    isQuanX,
    msg,
    log,
    getdata,
    setdata,
    get,
    post,
    done
  }
}
chavy.done()