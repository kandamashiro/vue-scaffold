const core = require('mathjs/core');

const math = core.create();

math.import(require('mathjs/lib/function/arithmetic/add'));
math.import(require('mathjs/lib/function/arithmetic/subtract'));
math.import(require('mathjs/lib/function/arithmetic/multiply'));
math.import(require('mathjs/lib/function/arithmetic/divide'));
math.import(require('mathjs/lib/function/arithmetic/floor'));
math.import(require('mathjs/lib/function/probability/combinations'));

_.mixin({
  // 首字母大写
  ucFirst(string) {
    return string.replace(/\b\w+\b/g, (word) => {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
  },

  combinations: math.combinations,

  serializeObject(serializeArray) {
    return _(serializeArray).reduce((obj, prop) => {
      if (prop.name.indexOf('[]') === -1) {
        obj[prop.name] = prop.value;
      } else {
        prop.name = prop.name.replace('[]', '');
        if (_.isArray(obj[prop.name])) {
          obj[prop.name].push(prop.value);
        } else {
          obj[prop.name] = [prop.value];
        }
      }

      return obj;
    }, {});
  },
  unique(arr) {
    const unique = [];
    const repeat = [];
    const hash = {};

    if (!_.isEmpty(arr)) {
      const length = arr.length;
      let i = 0, elem;
      for (; i < length; i++) {
        elem = arr[i];
        if (!hash[elem]) {
          unique.push(elem);
          hash[elem] = true;
        } else {
          repeat.push(elem);
        }
      }
    }

    return {
      unique,
      repeat,
    };
  },

  zhLength(str) {
    return str.replace(/[\u4e00-\u9fa5]/g, '**').length;
  },

  fixedConvert2yuan(money, options) {
    options = _.extend({}, {
      fixed: 3,
      clear: false,
    }, options);
    return _.convert2yuan(money, options);
  },

  convert2yuan(money, options) {
    options = _.extend({}, {
      fixed: 4,
      ratio: 10000,
      clear: true,
    }, options);

    return _.formatDiv(money, options.ratio, options);
  },

  convert2Point(money, options) {
    options = _.extend({}, {
      fixed: 2,
      ratio: 100000,
      clear: true,
    }, options);

    return _.formatDiv(money, options.ratio, options);
  },

  formatDiv(money, ratio, options) {
    let format;

    money = money || 0;

    options = _.extend({}, {}, options);

    if (!_.isUndefined(money)) {
      format = _(money).div(ratio);

      if (options.fixed || options.fixed === 0) {
        format = format.toFixed(options.fixed);
      }

      if (options.clear) {
        format = math.add(format, 0);
      }
    }

    return format;
  },

  formatMul(money, ratio, {clear = true, fixed = 0} = {clear: true, fixed: 4}) {
    let format;

    if (!_.isUndefined(money)) {
      format = _(money).mul(ratio);

      if (fixed) {
        format = format.toFixed(fixed);
      }

      if (clear) {
        format = math.add(format, 0);
      }
    }

    return format;
  },

  toLink(arg) {
    const href = window.location.href;
    const index = href.indexOf('/index.html');
    if (index > -1) {
      return href.substring(0, index) + arg;
    }
    return href.substring(0, href.indexOf('/#')) + arg;
  },

  // 格式化时间
  toTime(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD H:mm:ss') : timestamp;
  },

  toDate(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD') : timestamp;
  },

  // 格式化时间
  formatTime(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD H:mm:ss') : timestamp;
  },

  formatDate(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'YYYY-MM-DD') : timestamp;
  },

  formatAMPM(timestamp, format) {
    return timestamp ? moment(timestamp).format(format || 'h:mm A') : timestamp;
  },

  add(arg1, arg2) {
    return math.add(arg1, arg2);
  },

  // 除法   arg1除arg2
  div(arg1, arg2) {
    arg1 = arg1 || 0;
    return math.divide(arg1, arg2);
  },

  // 乘法  arg1乘arg2
  mul(arg1, arg2) {
    arg1 = arg1 || 0;
    return math.multiply(arg1, arg2);
  },

  // 减法 arg1减arg2
  sub(arg1, arg2) {
    return math.subtract(arg1, arg2);
  },

  floor(arg1, index) {
    const sArg1 = String(arg1);
    const pos = sArg1.indexOf('.');
    if (pos > -1) {
      return Number(sArg1.substring(0, pos + index + 1));
    }
    return arg1;
  },


  // 将小驼峰式转成 user-id 格式
  toDataStyle(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
  },

  addHrefArgs(href, args, val) {
    const nArgs = this.getUrlParam('', href) || {};

    if (!_(args).isObject()) {
      nArgs[args] = val;
    } else {
      _(nArgs).extend(args);
    }

    href = href.replace(/\?.*/, '');

    _(nArgs).each((val, arg) => {
      if (!/\?.*=/.test(href)) {
        href += `?${arg}=${encodeURI(val)}`;
      } else {
        href += `&${arg}=${encodeURI(val)}`;
      }
    });

    return href;
  },

  getUrl(uri, args, val) {
    let url;

    let match = location.hash.match(/#?(.*)(\?.*)/);

    if (!match || !match[2]) {
      match = location.hash.match(/#?(.*)(\??.*)/);
    }

    if (!match) {
      url = `#${uri || ''}`;
    } else {
      url = `#${match[1]}${uri}${match[2]}`;
    }

    if (args) {
      url = this.addHrefArgs(url, args, val);
    }

    return url;
  },

  /**
   * 键盘验证
   */
  validateNumber(keyCode) {
    // 数字
    if (keyCode >= 48 && keyCode <= 57) return true;
    // 小数字键盘
    if (keyCode >= 96 && keyCode <= 105) return true;
    // Backspace, del, 左右方向键
    return keyCode === 8 || keyCode === 46 || keyCode === 37 || keyCode === 39;


  },
});

Vue.filter('formatDiv', _.formatDiv);
Vue.filter('toTime', _.toTime);
Vue.filter('fixedConvert2yuan', _.fixedConvert2yuan);
Vue.filter('convert2yuan', _.convert2yuan);
