/**
 * Created by EricYang on 10/11/20.
 */
import moment from 'moment'
const CryptoJS = require('crypto-js') //

const key = CryptoJS.enc.Utf8.parse('3019519629981742') //
const iv = CryptoJS.enc.Utf8.parse('2359394434655161') //

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param word
 * @returns {string}
 * @constructor
 */
export function Decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

/**
 * @param word
 * @returns {string}
 * @constructor
 */
export function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString().toUpperCase()
}

export function getUTCTime(inputTime) {
  const date = new Date(inputTime)
  const Y = date.getUTCFullYear()
  const M =
    date.getUTCMonth() + 1 < 10
      ? '0' + (date.getUTCMonth() + 1)
      : date.getUTCMonth() + 1
  let mouth = ''

  switch (M.toString()) {
    case '01':
      mouth = 'Jan-'
      break
    case '02':
      mouth = 'Feb-'
      break
    case '03':
      mouth = 'Mar-'
      break
    case '04':
      mouth = 'Apr-'
      break
    case '05':
      mouth = 'May-'
      break
    case '06':
      mouth = 'Jun-'
      break
    case '07':
      mouth = 'Jul-'
      break
    case '08':
      mouth = 'Aug-'
      break
    case '09':
      mouth = 'Sep-'
      break
    case '10':
      mouth = 'Oct-'
      break
    case '11':
      mouth = 'Nov-'
      break
    case '12':
      mouth = 'Dec-'
      break
    default:
      break
  }

  const D =
    date.getUTCDate() < 10
      ? '0' + date.getUTCDate() + '-'
      : date.getUTCDate() + '-'
  const h =
    date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()
  const m =
    date.getUTCMinutes() < 10
      ? '0' + date.getUTCMinutes()
      : date.getUTCMinutes()
  const s =
    date.getUTCSeconds() < 10
      ? '0' + date.getUTCSeconds()
      : date.getUTCSeconds()

  return mouth + D + Y + ' ' + h + ':' + m + ':' + s + ' UTC'
}

export function momnetTime(val) {
  return moment(val).format('YYYY-MM-DD hh:mm:ss A')
}
