var _action = require("scripts/action_setting")

const DEFAULT_FAVORITE_SEARCH = [{
  title: $l10n("bar_favorite1"),
  rows: []
},
{
  title: $l10n("bar_favorite2"),
  rows: []
}
]

Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return fmt
}

function findFavorite(keyword) {
  keyword = keyword.toLowerCase()
  // Init List Data
  $("favorite_search").data = DEFAULT_FAVORITE_SEARCH
  // Find Favorited
  var favorited = JSON.stringify(FAVORITE_FILE.FAVORITED).toLowerCase()
  $thread.background({
    delay: 0,
    handler: function() {
      var index = 0
      var idx = 0
      var row = -1
      while (favorited.indexOf(keyword, index) != -1) {
        index = favorited.indexOf(keyword, index) + 1
        var sub = favorited.substring(0, index).match(/\"genres\"/g).length - 1
        if (row == sub) {
          continue
        }
        row = sub
        var cellData = $("favorited").object($indexPath(0, row))
        cellData.row = row
        $("favorite_search").insert({
          indexPath: $indexPath(0, idx),
          value: cellData
        })
        idx++
      }
    }
  })
  // Find Checked
  var checked = JSON.stringify(FAVORITE_FILE.CHECKED).toLowerCase()
  $console.info(checked)
  $thread.background({
    delay: 0,
    handler: function() {
      var index = 0
      var idx = 0
      var row = -1
      while (checked.indexOf(keyword, index) != -1) {
        index = checked.indexOf(keyword, index) + 1
        var sub = checked.substring(0, index).match(/\"genres\"/g).length - 1
        if (row == sub) {
          continue
        }
        row = sub
        var cellData = $("checked").object($indexPath(0, row))
        cellData.row = row
        $("favorite_search").insert({
          indexPath: $indexPath(1, idx),
          value: cellData
        })
        idx++
      }
    }
  })
}

function locateFavorite(rawIndexPath, rawData) {
  var section = rawIndexPath.section
  var row = rawData.row
  var indexPath = $indexPath(0, row)
  var dstViewId = section ? "checked" : "favorited"
  var data = $(dstViewId).object(indexPath)

  var id = data.id
  var rawId = rawData.id
  if (rawId != id) {
    $ui.error($l10n("error_locate"))
    $("favorite_search").delete(rawIndexPath)
    return
  }

  $("favorite_search").hidden = true
  $(dstViewId).hidden = false
  $("favorite_bar").index = section
  $ui.animate({
    duration: 0.2,
    animation: function() {
      $(dstViewId).scrollTo({
        indexPath: indexPath,
        animated: false
      })
    },
    completion: function() {
      $ui.animate({
        duration: 0.3,
        animation: function() {
          $(dstViewId).cell(indexPath).bgcolor = $color("#DFDFDF")
        },
        completion: function() {
          $ui.animate({
            delay: 0.8,
            duration: 0.8,
            animation: function() {
              $(dstViewId).cell(indexPath).bgcolor = $color("white")
            }
          })
        }
      })
    }
  })
}

function favoriteItem(cellData) {
  var data = cellData
  delete data.presell
  data.info.text = "收藏于: " + (new Date()).format("yyyy年M月d日")
  $("favorited").insert({
    index: 0,
    value: data
  })
  FAVORITE_FILE.FAVORITED.unshift(data)
  _action.saveFavorite(FAVORITE_FILE)
  $ui.toast($l10n("toast_favorited"))
  
  // Toggle No Favorited
  $("no_favorited").hidden = true
}

function favoriteItemDelete(section, row) {
  FAVORITE_FILE[section].splice(row, 1)
  _action.saveFavorite(FAVORITE_FILE)
  
  // Toggle No Favorited / No Checked
  $("no_" + section.toLowerCase()).hidden = FAVORITE_FILE[section].length
}

function favoriteCheckUncheck(cellData, indexPath, from, to) {
  var info = to == "FAVORITED" ? "收藏于: " : "已看于: "
  cellData.info.text = info + (new Date()).format("yyyy年M月d日")
  var row = indexPath.row
  $(from.toLowerCase()).delete(indexPath)
  $(to.toLowerCase()).insert({
    index: 0,
    value: cellData
  })
  FAVORITE_FILE[from].splice(row, 1)
  FAVORITE_FILE[to].unshift(cellData)
  _action.saveFavorite(FAVORITE_FILE)
  
  if (from == "FAVORITED") {
    $ui.toast($l10n("toast_checked"))
  } else {
    $ui.toast($l10n("toast_unchecked"))
  }
  
  // Toggle No Favorited / No Checked
  $("no_" + from.toLowerCase()).hidden = FAVORITE_FILE[from].length ? true : false
  $("no_" + to.toLowerCase()).hidden = FAVORITE_FILE[to].length ? true : false
}

module.exports = {
  findFavorite: findFavorite,
  locateFavorite: locateFavorite,
  favoriteItem: favoriteItem,
  favoriteItemDelete: favoriteItemDelete,
  favoriteCheckUncheck: favoriteCheckUncheck
}