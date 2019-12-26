function getLocalVersion() {
    return $file.exists("app.json") ? JSON.parse($file.read("app.json").string).version : "V0.0.0"
}

function getOnlineVersion(isAuto) {
    $http.get({
        url: "https://gitee.com/heiwukong/JSBox/raw/master/update",
        handler: function(resp) {
            var data = resp.data
            var name = $addin.current.name
            if (getLocalVersion() != data.update[name].version) {
                var url =  "https://gitee.com/heiwukong/JSBox/raw/master/newVersion/" + name +".box"
                var content = data.update[name].content
                isUpdate(url, content)
            } else {
                if (!isAuto) {
                    $ui.alert({
                        title: "当前已是最新版本",
                        message: "版本号：" + data.update[name].version,
                    })
                }
            }
        }
    })
}

function isUpdate(url, content) {
    $ui.alert({
        title: "检测到更新",
        message: content,
        actions: [
            {
                title: "立即更新",
                handler: function() {
                    toUpdate(url)
                }
            }
        ]
    })
}

function toUpdate(url) {
    $http.download({
        url: url,
        showsProgress: false,
        progress: function(bytesWritten, totalBytes) {
            var percentage = bytesWritten * 1.0 / totalBytes
            $ui.progress(0.5, "正在更新")
        },
        handler: function(resp) {
            var file = resp.data
            $addin.save({
                name: $addin.current.name,
                data: file,
                handler: function(success) {
                    $device.taptic(2)
                    $ui.toast("更新完成")
                    $delay(1, ()=>{
                        $addin.restart()
                    })
                }
            })
        }
    })
}

module.exports = {
    getOnlineVersion: getOnlineVersion,
    getLocalVersion: getLocalVersion
}