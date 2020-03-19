const _strings = $app.strings
const language = $app.info.locale

function l10n(key) {
  return _strings[language][key] || key
}

module.exports = {
  l10n: l10n
}