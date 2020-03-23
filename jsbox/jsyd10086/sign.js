const superagent = require('superagent');
require('superagent-proxy')(superagent);
const push = require("push");
const jsmccClientUrl = 'http://wap.js.10086.cn/jsmccClient/action.dox'
const openTreasureChestUrl = 'http://wap.js.10086.cn/mb_nact/17853'
const springToUrl = 'http://wap.js.10086.cn/mb_nact/22890/activityM7/activity_page.activity?pageid=30068&rn=1584618685'
const nactUrl = "http://wap.js.10086.cn/nact/action.do";
const proxy = 'http://127.0.0.1:8888';
const arrays = [1, 2, 3, 4, 5]
const defaultMins = 1000
const tipsTitle = "掌上营业厅-江苏移动"
let fluxIds = []
let eCounts = 0

let jsmccClientDefaultHeaders = {
    'Host': 'wap.js.10086.cn',
    'Cookie': 'mywaytoopen=8322aAF24b29314EF5A8D665285A71ED61; mobile=10129-18707-5382-1300; WT_FPC=id=2aaecc9daa2edf422d71575338158427:lv=1584431287979:ss=1584431277965; APPTOKEN=374b6c6c317048794f4f392f4348764e557042736675354d387670666463573166514b7a723961464777432b756f6465574f3450524538774d66746d2055466559347750357a6b64554f447330504d6e433367783334773d3d; yxaType=undefined',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
    'LC-SYSVERSION': '13.3.1',
    'latitude': '31.1835',
    'version': '7.3.1',
    'LC-PN': '15051791913',
    'uc': '1107',
    'platform': 'iphone',
    'longitude': '121.4866',
    'Accept-Language': 'zh-cn',
    'jailBreak': '0',
    'Accept': '*/*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept-Encoding': 'gzip, deflate',
    'LC-IFS': 'share_getEBeanByShare',
    'hgvhv': '8322aAF24b29314EF5A8D665285A71ED61',
    'device': 'iPhone 6s'
}

let jsmccClientParams = {
    'auth': 'yes',
    'appKey': 'IpFxHa!3qc#',
    'md5sign': 'FC2F77F5DD46F60F68AB61A53B8DFBBA',
    'internet': 'WiFi',
    'sys_version': '13.3.1',
    'screen': '750*1334',
    'model': 'iPhone',
    'date': '20200319',
    'longitude': '121.4866',
    'latitude': '31.1835',
    'imei': 'C8D93A5D-E874-4632-A858-907055C66F5B',
    'deviceid': '8322AF24-2931-4EF5-A8D6-65285A71ED61',
    'mywaytoopen': '8322aAF24b29314EF5A8D665285A71ED61',
    'jsonParam': '[{"dynamicURI":"/share","dynamicParameter":{"method":"getEBeanByShare" ,"url":"","rewardType":"1"},"dynamicDataNodeName":"loginNode2"}]'
}

let nactDefaultHeader = {
    'Host': 'wap.js.10086.cn',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': 'zh-cn',
    'Accept-Encoding': 'gzip, deflate',
    'hgvhv': 'null',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'http://wap.js.10086.cn',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Jsmcc/1.0 ua=jsmcc&loginmobile=15051791913&deviceid=8322AF24-2931-4EF5-A8D6-65285A71ED61&platform=iphone&channel=sd&ch=03&version=7.3.1&netmode=WiFi&time=20200317174931&lng=121.4866011437222&lat=31.18352029410671&poi=%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E5%8D%9A%E6%88%90%E8%B7%AF%E5%8D%9A%E6%88%90%E8%B7%AF&cityCode=14&JType=0&platformExpland=iPhone%206s&idfaMd5=0AED0134-029A-412F-AE83-6730F607DBFF&sign=C3EE13A3BE9C41A1603A87A6CA3260DF&sign2=44CC6C96C9E750754B7B635D967586D1&sign3=100B919FC2AE1435CEE7DC68F9DE1D08',
    'Referer': 'http://wap.js.10086.cn/nact/resource/2204/html/index.html',
    'Cookie': 'mywaytoopen=0; CmWebtokenid=15051791913,js; WT_FPC=id=2aaecc9daa2edf422d71575338158427:lv=1584438572619:ss=1584438202827; cmtokenid=30BD6C24D5394CBFB807474AC818340C@js.ac.10086.cn; userMobileForBigData=15051791913; mobile=38801-55571-5554-1311; JSESSIONID=P-rn5fNyb5wRKsI6IwK9EQFT5sToYi3JcgyrlMh_SmJtDnr3__NR!661787986; last_login_mobile=15051791913; tid=H09742W0JA1584438441939; _XWBD_channel=03; userAreaNum=11; TY_SESSION_ID=eb268414-f788-4554-8cfa-9a47f5c49c56; XWBD_SESSIONID=S031717472192689318; mywaytoopen=8322aAF24b29314EF5A8D665285A71ED61; cmjsSSOCookie=30BD6C24D5394CBFB807474AC818340C@js.ac.10086.cn; DuoWanLoginCookie=F86A48F5572F630784B5CB7FB2DA9A32; PlaintextLoginCookie=15051791913; SmsNoPwdLoginCookie=9880B4419776802C28E6DFA427D01C29; APPTOKEN=374b6c6c317048794f4f392f4348764e557042736675354d387670666463573166514b7a723961464777432b756f6465574f3450524538774d66746d20554665594c64466a74506664644a7477684f366343772b3849673d3d; cstamp=1584438184059; yxaType=undefined'
}

const openTreasureChestHeaders = {
    'Host': 'wap.js.10086.cn',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Cookie': 'app_open_flag=true; JSESSIONID=nL7yB6TmVlPOLGhdXQ1IANMy1eXRQi43m7W_iBZVylv9gJfMKOGN!481428343; XWBD_SESSIONID=NR15DF5QDZH0XYX; _xwbd_page=R0I7RS7ZDB6QDNQ##client#IOS#NR15DF5QDZH0XYX#1#15051791913#1107#LPNX8F20C0NK8NV##IOS_E_SP_01#AVEUT70VDC9O0JL#IOS_P_SP_01#H5V8QW0KXRYIU71##QOI836TRSPTNWAY#IOS_T_SP_01_A06########0#IOS_T_SP_01_A06; userAreaNum=1107; userMobileForBigData=15051791913; mywaytoopen=8322aAF24b29314EF5A8D665285A71ED61; CmWebtokenid=15051791913,js; userMobileForBigData=15051791913; WT_FPC=id=254431e9f7926e623151584520844842:lv=1584606670484:ss=1584606668926; last_login_mobile=15051791913; mywaytoopen=0; tid2=N2AJ29VG4C1584606670203; mobile=55185-18707-5544-1301; _XWBD_channel=03; tid=8SS371KGJB1584606667604; TY_SESSION_ID=9c11a46d-483b-4f2c-aef5-d890906c6a1f; cmjsSSOCookie=E3E70B953D73445EACF709E4F1C7419C@js.ac.10086.cn; cmtokenid=E3E70B953D73445EACF709E4F1C7419C@js.ac.10086.cn; APPTOKEN=374b6c6c317048794f4f392f4348764e557042736675354d387670666463573166514b7a723961464777432b756f6465574f3450524538774d66746d20554665596a694d4e31702f6b55763054684f77395363566a6c413d3d; DuoWanLoginCookie=F86A48F5572F630784B5CB7FB2DA9A32; PlaintextLoginCookie=15051791913; SmsNoPwdLoginCookie=9880B4419776802C28E6DFA427D01C29; cstamp=1584522356394',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Jsmcc/1.0 ua=jsmcc&loginmobile=15051791913&deviceid=8322AF24-2931-4EF5-A8D6-65285A71ED61&platform=iphone&channel=sd&ch=03&version=7.3.1&netmode=WiFi&time=20200319170231&lng=121.4865912403021&lat=31.18352305254547&poi=%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E5%8D%9A%E6%88%90%E8%B7%AF%E5%8D%9A%E6%88%90%E8%B7%AF&cityCode=14&JType=0&platformExpland=iPhone%206s&idfaMd5=C8D93A5D-E874-4632-A858-907055C66F5B&sign=78EF8C9C293C3E196F395504917B7F73&sign2=E988E4D3A171AA691FA9C393B682C0DB&sign3=ECF7B14F4919FE6C26C55EFF04467537',
    'Accept-Language': 'zh-cn',
    'Referer': 'https://wap.js.10086.cn/mb_nact/17853',
    'Accept-Encoding': 'gzip, deflate, br',
    'Upgrade-Insecure-Requests': '1',
}

const springToHeaders = {
    'Host': 'wap.js.10086.cn',
    'Cookie': 'app_open_flag=true; JSESSIONID=nBTyokMZHwXqz0oDp0Ta2OyL2hJtxHs7ECXf-LSTbTFOVp5pxt98!1200983108; CmWebtokenid=15051791913,js; userMobileForBigData=15051791913; XWBD_SESSIONID=336ZXQ8HT0TZ79O; _xwbd_page=R0I7RS7ZDB6QDNQ##client#IOS#336ZXQ8HT0TZ79O#1#15051791913#1107#JJCN819JXTC1PE6#JJCN819JXTC1PE6#home#PRNWBJXROJQS9HG#home#66H6TBT49A5HEZ4##IGDRETLJJOLY32I#IOS_T_HOME_Z03########2#IOS_T_HOME_Z03; userAreaNum=1107; userMobileForBigData=15051791913; mywaytoopen=8322aAF24b29314EF5A8D665285A71ED61; mywaytoopen=0; _XWBD_channel=03; tid=B1NIU352751584618636912; WT_FPC=id=254431e9f7926e623151584520844842:lv=1584618636857:ss=1584618513422; last_login_mobile=15051791913; mobile=55185-18707-5544-1301; TY_SESSION_ID=e12a7446-c19c-4ffb-aee0-98948d428661; cmjsSSOCookie=FEAB1B73E80946A186B0EB3DD158C6F6@js.ac.10086.cn; cmtokenid=FEAB1B73E80946A186B0EB3DD158C6F6@js.ac.10086.cn; DuoWanLoginCookie=F86A48F5572F630784B5CB7FB2DA9A32; PlaintextLoginCookie=15051791913; SmsNoPwdLoginCookie=9880B4419776802C28E6DFA427D01C29; APPTOKEN=374b6c6c317048794f4f392f4348764e557042736675354d387670666463573166514b7a723961464777432b756f6465574f3450524538774d66746d20554665596a694d4e31702f6b55763054684f77395363566a6c413d3d; cstamp=1584522356394',
    'Upgrade-Insecure-Requests': '1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Jsmcc/1.0 ua=jsmcc&loginmobile=15051791913&deviceid=8322AF24-2931-4EF5-A8D6-65285A71ED61&platform=iphone&channel=sd&ch=03&version=7.3.1&netmode=WiFi&time=20200319195125&lng=121.486610849783&lat=31.18348883590329&poi=%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E5%8D%9A%E6%88%90%E8%B7%AF%E5%8D%9A%E6%88%90%E8%B7%AF&cityCode=14&JType=0&platformExpland=iPhone%206s&idfaMd5=C8D93A5D-E874-4632-A858-907055C66F5B&sign=86EFD9937495CB869AE90D154CF07FD9&sign2=007DAA1CED7A83C6DF5B1B5A71938F55&sign3=936955BF7CE48A88FD1D27A2092F5857',
    'Referer': 'http://wap.js.10086.cn/mb_nact/17916',
    'Accept-Language': 'zh-cn',
    'Accept-Encoding': 'gzip, deflate'
}

let loginDefaultCookies = {
    mywaytoopen: '8322aAF24b29314EF5A8D665285A71ED61',
    mobile: '10129-18707-5382-1300',
    WT_FPC: 'id\\:2aaecc9daa2edf422d71575338158427:lv\\:1584431287979:ss\\:1584431277965',
    APPTOKEN: '374b6c6c317048794f4f392f4348764e557042736675354d387670666463573166514b7a723961464777432b756f6465574f3450524538774d66746d2055466559347750357a6b64554f447330504d6e433367783334773d3d',
    yxaType: 'undefined'
}
let loginResponseCookies = {};
let beforeLoginCookies = {};
let taskIds = [];


// 登录获取Cookie
const login = function () {
    var params = [{
        "dynamicURI": "/login",
        "dynamicParameter": {
            "method": "lnNew",
            "m": "15051791913",
            "p": "666888",
            "verifyCode": "0",
            "deviceCode": "92cda8553619f95821a4017f6c5284316b2cd416e29db4bfbf2b7c4b1755f07d",
            "openPush": "0",
            "smsCode": ""
        },
        "dynamicDataNodeName": "loginNode2"
    }]
doJsmccClientRequest(params, (error, response, jsonText) => {
            if (jsonText && jsonText.loginNode2 && jsonText.loginNode2.resultCode === '1' && !jsonText.loginNode2.errorCode) {
                const headerCookies = response.header['set-cookie']
                headerCookies.forEach(cookie => {
                    cookie = cookie.substring(0, cookie.indexOf(';')).split('=')
                    loginResponseCookies[cookie[0]] = cookie[1]
                })
                for (let key in loginDefaultCookies) {
                    beforeLoginCookies[key] = loginDefaultCookies[key]
                }

                for (let key in loginResponseCookies) {
                    beforeLoginCookies[key] = loginResponseCookies[key]
                }

                processCookie()

                sign()
                //doSpringTo()
            }
        })
}

// 处理cookie
const processCookie = function () {
    doProcessCookie(nactDefaultHeader)
    doProcessCookie(jsmccClientDefaultHeaders)
    doProcessCookie(openTreasureChestHeaders)
    doProcessCookie(springToHeaders)
}
const doProcessCookie = function (header) {
    let cookies = header['Cookie']
    cookies = cookies.split(';')
    let processCookie = {}
    cookies.forEach(cookie => {
        cookie = cookie.split('=')
        processCookie[cookie[0].trim()] = cookie[1].trim()
    })

    for (let key in beforeLoginCookies) {
        processCookie[key] = beforeLoginCookies[key]
    }

    cookies = ''
    for (let key in processCookie) {
        cookies += key + "=" + processCookie[key] + "; "
    }
    header['Cookie'] = cookies
}

// 签到
const sign = function () {
    const params = {
        'reqUrl': 'act2204',
        'method': 'sign',
        'operType': '2',
        'actCode': '2204'
    }
    doNactRequest(params, (error, response, jsonText) => {
        let subtitle = "签到失败"
        let message
        if (jsonText) {
            if (jsonText.success && jsonText.resultObj.isLogin) {
                if (jsonText.resultObj.signLog) {
                    subtitle = "签到成功"
                    message = "已连续签到" + jsonText.resultObj.count + "天" +"\n"+jsonText.resultObj.signLog.year + "年" + jsonText.resultObj.signLog.month + "月" + jsonText.resultObj.signLog.checkinDays + ",获得"
                    if(jsonText.resultObj.awardName.indexOf("一次抽奖机会")>-1){
         drawForSign(subtitle,message)             
                    return false}
                     message+= jsonText.resultObj.awardName
                    console.log('签到成功')
                } else if (jsonText.resultObj.errorCode) {
                    if (jsonText.resultObj.errorCode === '-2204005') {
                        subtitle = "重复签到"
                        console.log('重复签到')
                    }
                    message = jsonText.resultObj.errorMsg
                }
            }
        }
        tips(subtitle, message)
        
        getETask()
    })
}

// 签到抽奖
const drawForSign = function (message) {
    const params = {
        'reqUrl': 'act2204',
        'method': 'drawForSign',
        'operType': '3',
        'actCode': '2204'
    }
    doNactRequest(params, (error, response, jsonText) => {
        let subtitle = "签到失败"
        if (jsonText) {
            if (jsonText.success && jsonText.resultObj.isLogin) {
                if (!jsonText.resultObj.errorCode) {
                    subtitle = "签到成功,抽奖成功"
                    message = message + jsonText.resultObj.awardName
                    console.log('抽奖成功')
                } else if (jsonText.resultObj.errorCode) {
                    if (jsonText.resultObj.errorCode === '-2204008') {
                        subtitle = "重复抽奖"
                        console.log('重复抽奖')
                    }
                    message = jsonText.resultObj.errorMsg
                }
            }
        }
        tips(subtitle, message)
        
        getETask()
    })
}


// 获取所有待领取的E豆列表
const getPendingCollectionEList = function () {
    let param = {
        'reqUrl': 'act2277',
        'method': 'initIndexPage',
        'operType': '1',
        'actCode': '2277',
        'extendParams': 'ch%3D0263',
        'mywaytoopen': ''
    }
    doNactRequest(param, (error, response, jsonText) => {
            if (jsonText.resultObj.showFluxList&&jsonText.resultObj.showFluxList.length > 0) {
                const showFluxList = jsonText.resultObj.showFluxList
                showFluxList.forEach(fluxInfo => {
                    fluxIds.push(fluxInfo.id)
                })
                fluxIds.forEach((fluxId, index) => {
                    setTimeout(function () {
                        getE(fluxId)
                        if (fluxIds.length - 1 === index) {
                            console.log('累计获得E豆:' + eCounts + "个");
                            tips('今日E豆已全部领取', '累计获得E豆:' + eCounts + "个");
                        }
                    }, defaultMins * index)
                })
            }else{
              console.log("暂无需要领取的Ｅ豆！")
            }
        
    })
}

function getE(fluxId) {
    const params = {
        'reqUrl': 'act2277',
        'method': 'receiveTaskFlux',
        'operType': '1',
        'fluxId': fluxId,
        'actCode': '2277',
        'extendParams': 'ch%3D0263',
        'mywaytoopen': ''
    }

    doNactRequest(params, (error, response, jsonText) => {
        if (jsonText.resultObj.bindFluxResult) {
            eCounts += parseInt(jsonText.resultObj.addFlux);
            console.log("获得E豆 : " + jsonText.resultObj.addFlux + "个")
        } else {
            console.log("获得E豆失败")
        }
    })
}

// 获取所有E豆任务
const getETask = function () {
    const param = {
        'reqUrl': 'act2277',
        'method': 'initTaskInfoPage',
        'operType': '1',
        'actCode': '2277',
        'extendParams': 'ch%3D0263'
    }
    doNactRequest(param, (error, response, jsonText) => {
        // 获取所有任务
        const taskList = jsonText ? jsonText.resultObj.taskList : ''
        if (!taskList) {
            console.log('get e tasks error taskList is null')
            return
        }
        taskList.forEach(task => {
            // 搜集所有需要访问的才能获得E豆的任务ID
            task.taskUrl && taskIds.push(task.taskId)
            task.taskId === 'FXRW' && taskIds.push('FXRW')
        });
        taskIds.push('QDRW')
        doTask()
    })
}
// 执行所有任务
const doTask = function () {
    doTaskUrl()
    doLoginVideoEntertainment()
    //doSpringTo()
    setTimeout(function(){
      getPendingCollectionEList()
    }, 10 * defaultMins)
}

// 执行视娱相关任务
const doVideoEntertainmentTasks = function () {
    //doPumpingFlow()
    doNews()
    doVideos()
    doAd()
    doFavorite()
}
// 抽流量
const doPumpingFlow = function () {
 
superagent.get(springToUrl).set(springToHeaders).end((error, response) => {
      console.log(response.text)
        if (response) {
            console.log('抽流量成功');
        } else {
            console.log('抽流量失败');
        }
    })
}
// 春来了,抽流量
const doSpringTo = function () {
    superagent.get(springToUrl).set(springToHeaders).end((error, response) => {
      console.log(response)
        if (response.text) {
            console.log('抽流量成功');
        } else {
            console.log('抽流量失败');
        }
    })
}
// 视娱看新闻
const doNews = function () {
    arrays.forEach((key, index) => {
        setTimeout(function () {
            getEBeanByShare(2);
        }, defaultMins * index)
    })
}
// 视娱看视频
const doVideos = function () {
    arrays.forEach((key, index) => {
        setTimeout(function () {
            getEBeanByShare(3);
        }, defaultMins * index)
    })
}
// 视娱看广告
const doAd = function () {
    arrays.forEach((key, index) => {
        setTimeout(function () {
            getEBeanByShare(4);
        }, defaultMins * index)
    })
}
// 收藏视娱
const doFavorite = function () {
    arrays.forEach((key, index) => {
        setTimeout(function () {
            getEBeanByShare(5);
        }, defaultMins * index)
    })
}
// 登录视娱
const doLoginVideoEntertainment = function () {
    getEBeanByShare(1)
    doVideoEntertainmentTasks()
}

// 执行所有需要访问才能获得E豆的任务
const doTaskUrl = function () {
    if (taskIds.length > 0) {
        taskIds.forEach((taskId, index) => {
            setTimeout(function () {
                doGetPageTask(taskId)
            }, defaultMins * index)
        })
    }
}

const doGetPageTask = function (taskId) {
    const params = {
        'reqUrl': 'act2277',
        'method': 'doTask' + taskId,
        'operType': '1',
        'taskId': taskId,
        'actCode': '2277',
        'fxmobile': '',
        'extendParams': 'ch%3D0263',
        'mywaytoopen': ''
    }
    if (taskId === 'KGG') {
        params['taskSplitId'] = 'KGG_1'
    }
    doNactRequest(params, (error, response, jsonText) => {
        if (jsonText.resultObj.isSuccess) {
            console.log("获取前往页面获得E豆任务成功,任务ID:" + taskId)
        } else {
            console.log("获取前往页面获得E豆任务失败,任务ID:" + taskId + "," + jsonText.resultMsg)
        }
    })
}

const tips = function (title, message) {
    push.schedule({
      title: tipsTitle,
      body:title + "\n" + message,
      delay: 5,
      handler: result => {
        const id = result.id;
      }
    });
}

const getEBeanByShare = function (rewardType) {
    const jsonParams = [{
        "dynamicURI": "/share",
        "dynamicParameter": {
            "method": "getEBeanByShare",
            "url": "",
            "rewardType": rewardType
        },
        "dynamicDataNodeName": "loginNode2"
    }]
    doJsmccClientRequest(jsonParams, (error, response, jsonText) => {
        if (jsonText && jsonText.loginNode2 && jsonText.loginNode2.resultCode === '1' && !jsonText.loginNode2.errorCode) {
            let message;
            if (jsonText.loginNode2.resultObj.popMsg) {
                message = jsonText.loginNode2.resultObj.popMsg
            } else if (rewardType === 1) {
                message = '登录'
            } else if (rewardType === 2) {
                message = '看新闻'
            } else if (rewardType === 3) {
                message = '看视频'
            } else if (rewardType === 4) {
                message = '看广告'
            } else if (rewardType === 5) {
                message = '新闻收藏'
            }
            console.log("登录视娱成功 : " + jsonText.loginNode2.resultObj.buttonTxt + "," + message)
        }
    })
}

const doJsmccClientRequest = function (params, callback) {
    jsmccClientParams['jsonParam'] = JSON.stringify(params)
    superagent.post(jsmccClientUrl)
        .send(jsmccClientParams)
        //.proxy(proxy)
        .set(jsmccClientDefaultHeaders).end(function (error, response) {
            callback(error, response, JSON.parse(response.text))
        });
}

const doNactRequest = function (params, callback) {
    superagent.post(nactUrl)
        .send(params)
        //.proxy(proxy)
        .set(nactDefaultHeader).end(function (error, response) {
            callback(error, response, JSON.parse(response.text))
        });
}
//doPumpingFlow()
login()