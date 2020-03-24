const cookieName = '掌上营业厅-江苏移动'
const wxCookieName = '微信-江苏移动'
const syCjHeadersKey = 'chavy_sy_cj_jsyd' //视娱抽奖headers key
const syCjUrl = "http://wap.js.10086.cn/mb_nact/22590/activityM7/activity_page.activity?pageid=30068&rn=" + new Date().getTime()
const wxCjHeadersKey = 'chavy_wx_cj_jsyd' //微信抽奖 header key
const cjUrl = 'http://wap.js.10086.cn/nact/action.do'
const cllCjHeadersKey = 'chavy_cll_cj_jsyd' //春来了抽奖 headers key
const cllCjUrl = 'http://wap.js.10086.cn/mb_nact/22890/activityM7/activity_page.activity?pageid=30068&rn=' + new Date().getTime()
const cjjgReg = new RegExp('<p\\sclass\=\"text\"><p>.*?<\/p>', 'g')
const chavy = init()

const doSyCj = function () {
    const syCjHeadersVal = chavy.getData(syCjHeadersKey)
    const url = {
        url: syCjUrl,
        headers: JSON.parse(syCjHeadersVal)
    }
    chavy.get(url, (error, response, data) => {
        chavy.msg(cookieName, getCjjgMessage(data), '')
    })
}
const doCllCj = function () {
    const cllCjHeadersVal = chavy.getData(cllCjHeadersKey)
    const url = {
        url: cllCjUrl,
        headers: JSON.parse(cllCjHeadersVal)
    }
    chavy.get(url, (error, response, data) => {
        chavy.msg(cookieName, getCjjgMessage(data), '')
    })
}

let wxCjHeaders = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": "mywaytoopen=abd9a6d0eba3d7b129985d9bb753a5f5de; WT_FPC=id=2b256cf40ec25cb20bc1581646226252:lv=1584997793426:ss=1584996749198; mobile=46993-35091-5627-1300; JSESSIONID=-iMJOv1PYEtLNYNh1Ry3v-HapKUfzP_O6WzOyCHZr6jygRePeGSP!1377075740; _XWBD_channel=2184; XWBD_SESSIONID=S032404522881043068",
    "Host": "wap.js.10086.cn",
    "Origin": "http://wap.js.10086.cn",
    "Referer": "http://wap.js.10086.cn/nact/resource/8006/html/index.html?code=081VINaQ1Az1X41uZP6Q1PRVaQ1VINas&state=",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.11(0x17000b21) NetType/WIFI Language/zh_CN",
    "X-Requested-With": "XMLHttpRequest",
    "hgvhv": "abd9a6d0eba3d7b129985d9bb753a5f5de"
}

const wxCjParams = {
    'reqUrl': 'act8006',
    'method': 'drawFunction',
    'operType': '3',
    'actCode': '8006',
    'extendParams': 'code=081VINaQ1Az1X41uZP6Q1PRVaQ1VINas',
    'mywaytoopen': 'abd9a6d0eba3d7b129985d9bb753a5f5de'
}
const doWxCj = function () {
    let wxCjHeadersVal = chavy.getData(wxCjHeadersKey)
    wxCjHeadersVal = JSON.parse(wxCjHeadersVal)

    wxCjHeaders['Cookie'] = wxCjHeadersVal['Cookie']

    const url = {
        url: cjUrl,
        headers: wxCjHeaders,
        body: JSON.stringify(wxCjParams)
    }
    chavy.get(url, (error, response, data) => {
        const cookies = response.header['set-cookie']
        if (cookies.indexOf('last_login_mobile') > -1) {
            chavy.msg(wxCookieName, '微信抽奖成功!', '')
        } else {
            console.log('微信抽奖失败!')
        }
        chavy.done()
    });
}

const getCjjgMessage = function (data) {
    data = data.match(cjjgReg)[0]
    return data.substring(19, data.lastIndexOf('<'))
}

const doCj = function () {
    doSyCj()
    doCllCj()
    doWxCj()
}

doCj()

function init() {
    isSurge = () => {
        return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
        return undefined === this.$task ? false : true
    }
    getData = (key) => {
        if (isSurge()) return $persistentStore.read(key)
        if (isQuanX()) return $prefs.valueForKey(key)
    }
    setData = (key, val) => {
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
            $task.fetch(url).then((resp) => typeof cb === 'function' && cb(null, resp, resp.body))
        }
    }
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => typeof cb === 'function' && cb(null, resp, resp.body))
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
        getData,
        setData,
        get,
        post,
        done
    }
}