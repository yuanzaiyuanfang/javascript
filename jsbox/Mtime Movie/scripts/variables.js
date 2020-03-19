var ON_SCREEN = 0,
  COMING_SOON = 1,
  FAVORITED = 0,
  CHECKED = 1,
  LOCAL = "mtime/",
  ICLOUD = "drive://mtime/"

var MENU = {
  COVER_IMAGE_QUALITY: [{
      "name": $l10n("setting_1_1_value1"),
      "value": "80X45X2"
    },
    {
      "name": $l10n("setting_1_1_value2"),
      "value": "160X90X2"
    },
    {
      "name": $l10n("setting_1_1_value3"),
      "value": "320X180X2"
    }
  ],
  RECENT_MAIN_INDEX: [{
      "name": $l10n("setting_1_2_value1"),
      "value": 0
    },
    {
      "name": $l10n("setting_1_2_value2"),
      "value": 1
    }
  ],
  THEME_COLOR: [{
      "name": $l10n("setting_1_6_value1"),
      "value": "tint"
    },
    {
      "name": $l10n("setting_1_6_value2"),
      "value": "darkGray"
    }
  ],
  SAVING_PATH: [{
      "name": $l10n("setting_2_1_value1"),
      "value": "mtime/"
    },
    {
      "name": $l10n("setting_2_1_value2"),
      "value": "drive://mtime/"
    }
  ]
}

var DEFAULT_SETTING = [
  ["160X90X2", 0, 15, false, 290, "tint"],
  [LOCAL]
]

var DEFAULT_FAVORITE = {
  FAVORITED: [],
  CHECKED: []
}

// Read Setting
var SETTING
// Try Local
var file = $file.read(LOCAL + "Setting.conf")
if (typeof(file) == "undefined") {
  // Try iCloud
  file = $file.read(ICLOUD + "Setting.conf")
  if (typeof(file) == "undefined") {
    SETTING = 0
  } else {
    SETTING = 1
  }
} else {
  SETTING = 1
}
var SETTING_FILE = SETTING ? JSON.parse(file.string) : JSON.parse(JSON.stringify(DEFAULT_SETTING))

// Read Favorite
var FAVORITE
// Try Local
var file = $file.read(LOCAL + "Favorite.conf")
if (typeof(file) == "undefined") {
  // Try iCloud
  file = $file.read(ICLOUD + "Favorite.conf")
  if (typeof(file) == "undefined") {
    FAVORITE = 0
  } else {
    FAVORITE = 1
  }
} else {
  FAVORITE = 1
}
var FAVORITE_FILE = FAVORITE ? JSON.parse(file.string) : JSON.parse(JSON.stringify(DEFAULT_FAVORITE))

// Global Variable
var RAW_DATA = []