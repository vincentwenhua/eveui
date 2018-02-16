var Config = Config || {};

/**
 * @var The API server url.
 */
Config.API_BASE = '';

/**
 * @var The Socket server url.
 */
Config.WS_BASE = '';

/**
 * Android Configuration.
 * @type {{}}
 */
Config.Android = {};
Config.Android.senderID = '';

/**
 * API requests timeout in milliseconds
 * @type {number}
 */
Config.API_REQUEST_TIMEOUT = 3000;

/**
 * Config for upload file size(kb). 2MB
 * @type {number}
 */
Config.MaxFileSize = 2048;

Config.SupportLanguage = {
  'en': 'en-US',
  'zh': 'zh-CN'
};

/**
 * Config for geolocation
 *
 * @type {{enableHighAccuracy: boolean, maximumAge: number, timeout: number}}
 */
Config.Geolocation = {
    useBaidu: false,
    BaiduApiUrl: '',
    useAmap: false,
    AmapApiUrl: '',
    accuracyAccepted: 0,
    options: {
        enableHighAccuracy: false,
        maximumAge        : 0,
        timeout           : 27000
    }
};

Config.GeoLocationOptions = {
  enableHighAccuracy: true,
  maximumAge        : 10,
  timeout           : 27000
};

Config.NonCachable = [
    Config.API_BASE + '/guardians',
    Config.API_BASE + '/friends'
];

/**
 * Request exclude spinnner.
 *
 * @type {{method: string, uri: string}[]}
 */
Config.excludeSpinner = [
    {
        method: 'GET',
        uri: Config.API_BASE + '/account/email/exists'
    },
    {
        method: 'GET',
        uri: Config.API_BASE + '/sync/devices'
    },
    {
        method: 'GET',
        uri: Config.API_BASE + '/auth?'
    },
    {
        method: 'GET',
        uri: 'partials/login/auth.html'
    },
    {
        method: 'GET',
        uri: 'languages/en-US/common.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/zh-CN/common.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/en-US/errors.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/zh-CN/errors.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/en-US/breadcrumb.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/zh-CN/breadcrumb.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/en-US/title.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/zh-CN/title.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/en-US/messages.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/zh-CN/messages.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/en-US/tooltips.lang.json'
    },
    {
        method: 'GET',
        uri: 'languages/zh-CN/tooltips.lang.json'
    }
];
