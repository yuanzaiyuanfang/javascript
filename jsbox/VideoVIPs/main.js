var update = require("./scripts/update")
var initCache = require("./scripts/initCache")
var show = require("./scripts/app")

update.getOnlineVersion(true)

initCache.initCache()

$http.get({
    url: "https://gitee.com/heiwukong/JSBox/raw/master/JSBox/" + $addin.current.name,
    handler: function (resp) {
        var data = resp.data
        var items = data.items
        var urls = data.urls
        var keys = data.keys
        var apis = data.apis

        show.show(items, urls, keys, apis)
    }
})