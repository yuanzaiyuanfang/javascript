//Prepare view
$ui.menu({
  items: ["全局抓包", "mp3", "mp4", "m3u8", "关闭", "活动会话", "抓包记录"],
  handler: function(title, idx) {
    switch (idx) {
      case 0:
        $app.openURL("thor://sniffer.gui/launch?filter_name=%E7%9C%9F%E2%80%A2%E5%85%A8%E5%B1%80%E6%8A%93%E5%8C%85")
        break
      case 1:
        $app.openURL("thor://sniffer.gui/launch?filter_name=mp3")
        break
      case 2:
        $app.openURL("thor://sniffer.gui/launch?filter_name=mp4")
        break
      case 3:
        $app.openURL("thor://sniffer.gui/launch?filter_name=m3u8")
        break
      case 4:
        $app.openURL("thor://sniffer.gui/shutdown")
        break
      case 5:
        $app.openURL("thor://session.gui/active")
        break
      case 6:
        $app.openURL("thor://session.gui/all")
        break
      default:
        break
    }
  }
})