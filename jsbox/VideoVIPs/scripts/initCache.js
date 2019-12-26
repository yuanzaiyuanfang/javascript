function initCache() {
    if (!$cache.get("initTab")) {
        $cache.set("ininTab", 0)
    }
    if (!$cache.get("initWeb")) {
        $cache.set("initWeb", "https://v.qq.com")
    }
    if (!$cache.get("initTopOffset")) {
        if ($device.isIphoneX) {
            $cache.set("initTopOffset", 40)
        } else {
            $cache.set("initTopOffset", 20)
        }
    }
}


module.exports = {
    initCache: initCache
}