var _action = require("scripts/action_setting")

function activeMenu(index) {
  const trans = ["recent", "favorite", "setting"]
  var dstViewId = trans[index]
  if (dstViewId == "setting" && SETTING == 0) {
    // Notify file missing
    $device.taptic(1)
    _action.saveSettingAsDefault()
  }

  var viewId = $("content").views.filter(function(x) {
    return x.hidden == false
  })[0].info
  if (dstViewId == viewId) {
    var subViewId = $(viewId + "_list").views.filter(function(x) {
      return x.hidden == false
    })[0]
    if (subViewId.info == "search") {
      $(dstViewId + "_keyword").focus()
    } else {
      if (subViewId.data.length === 0) return
      subViewId.scrollTo({
        indexPath: $indexPath(0, 0)
      })
    }
  } else {
    var color = $color(SETTING_FILE[0][5])
    for (var i = 0; i < 3; i++) {
      $("menu").cell($indexPath(0, i)).views[0].views[0].tintColor = index == i ? color : $color("lightGray")
      $("menu").cell($indexPath(0, i)).views[0].views[1].textColor = index == i ? color : $color("lightGray")
    }
    $(viewId).hidden = true
    $(dstViewId).hidden = false
  }
}

function activeSegment(index) {
  const trans = ["recent", "favorite", "setting"]
  var dstViewId = trans[index]
  if (dstViewId == "setting") {
    return
  }

  var viewId = $("content").views.filter(function(x) {
    return x.hidden == false
  })[0].info

  if (dstViewId == viewId) {
    $device.taptic(0)
    var subViewId = $(viewId + "_list").views.filter(function(x) {
      return x.hidden == false
    })[0]
    subViewId.hidden = true
    if (typeof(subViewId.next) != "undefined") {
      $(viewId + "_bar").index += 1
      subViewId.next.hidden = false
    } else {
      $(viewId + "_bar").index = 0
      subViewId.super.views[0].hidden = false
    }
  }
}

module.exports = {
  activeMenu: activeMenu,
  activeSegment: activeSegment
}