var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true}), module2);
};

// src/lib/base.ts
var require_base = __commonJS((exports, module2) => {
  __export(exports, {
    Base: () => Base2,
    Testing: () => Testing2
  });
  class Base2 {
    constructor(arg = "") {
      this.arg = arg;
      this._actions = {};
      this.init();
    }
    init(widgetFamily = config.widgetFamily) {
      this.widgetFamily = widgetFamily;
      this.SETTING_KEY = this.md5(Script.name());
      this.FILE_MGR_LOCAL = FileManager.local();
      this.BACKGROUND_KEY = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY}.jpg`);
      this.settings = this.getSettings();
    }
    render() {
      throw new Error("抽象方法，要自行实现");
    }
    registerAction(name, func) {
      this._actions[name] = func.bind(this);
    }
    actionUrl(name = "", data = "") {
      const u = URLScheme.forRunningScript();
      const q = `act=${encodeURIComponent(name)}&data=${encodeURIComponent(data)}&__arg=${encodeURIComponent(this.arg)}&__size=${this.widgetFamily}`;
      let result = "";
      if (u.includes("run?")) {
        result = `${u}&${q}`;
      } else {
        result = `${u}?${q}`;
      }
      return result;
    }
    base64Encode(str) {
      const data = Data.fromString(str);
      return data.toBase64String();
    }
    base64Decode(b64) {
      const data = Data.fromBase64String(b64);
      return data.toRawString();
    }
    md5(str) {
      function d(n, t2) {
        const r2 = (65535 & n) + (65535 & t2);
        return (n >> 16) + (t2 >> 16) + (r2 >> 16) << 16 | 65535 & r2;
      }
      function f(n, t2, r2, e2, o2, u2) {
        let c, f2;
        return d((c = d(d(t2, n), d(e2, u2))) << (f2 = o2) | c >>> 32 - f2, r2);
      }
      function l(n, t2, r2, e2, o2, u2, c) {
        return f(t2 & r2 | ~t2 & e2, n, t2, o2, u2, c);
      }
      function v(n, t2, r2, e2, o2, u2, c) {
        return f(t2 & e2 | r2 & ~e2, n, t2, o2, u2, c);
      }
      function g(n, t2, r2, e2, o2, u2, c) {
        return f(t2 ^ r2 ^ e2, n, t2, o2, u2, c);
      }
      function m(n, t2, r2, e2, o2, u2, c) {
        return f(r2 ^ (t2 | ~e2), n, t2, o2, u2, c);
      }
      function i(n, t2) {
        let r2, e2, o2, u2;
        n[t2 >> 5] |= 128 << t2 % 32, n[14 + (t2 + 64 >>> 9 << 4)] = t2;
        let c = 1732584193;
        for (let f2 = -271733879, i2 = -1732584194, a2 = 271733878, h2 = 0; h2 < n.length; h2 += 16)
          c = l(r2 = c, e2 = f2, o2 = i2, u2 = a2, n[h2], 7, -680876936), a2 = l(a2, c, f2, i2, n[h2 + 1], 12, -389564586), i2 = l(i2, a2, c, f2, n[h2 + 2], 17, 606105819), f2 = l(f2, i2, a2, c, n[h2 + 3], 22, -1044525330), c = l(c, f2, i2, a2, n[h2 + 4], 7, -176418897), a2 = l(a2, c, f2, i2, n[h2 + 5], 12, 1200080426), i2 = l(i2, a2, c, f2, n[h2 + 6], 17, -1473231341), f2 = l(f2, i2, a2, c, n[h2 + 7], 22, -45705983), c = l(c, f2, i2, a2, n[h2 + 8], 7, 1770035416), a2 = l(a2, c, f2, i2, n[h2 + 9], 12, -1958414417), i2 = l(i2, a2, c, f2, n[h2 + 10], 17, -42063), f2 = l(f2, i2, a2, c, n[h2 + 11], 22, -1990404162), c = l(c, f2, i2, a2, n[h2 + 12], 7, 1804603682), a2 = l(a2, c, f2, i2, n[h2 + 13], 12, -40341101), i2 = l(i2, a2, c, f2, n[h2 + 14], 17, -1502002290), c = v(c, f2 = l(f2, i2, a2, c, n[h2 + 15], 22, 1236535329), i2, a2, n[h2 + 1], 5, -165796510), a2 = v(a2, c, f2, i2, n[h2 + 6], 9, -1069501632), i2 = v(i2, a2, c, f2, n[h2 + 11], 14, 643717713), f2 = v(f2, i2, a2, c, n[h2], 20, -373897302), c = v(c, f2, i2, a2, n[h2 + 5], 5, -701558691), a2 = v(a2, c, f2, i2, n[h2 + 10], 9, 38016083), i2 = v(i2, a2, c, f2, n[h2 + 15], 14, -660478335), f2 = v(f2, i2, a2, c, n[h2 + 4], 20, -405537848), c = v(c, f2, i2, a2, n[h2 + 9], 5, 568446438), a2 = v(a2, c, f2, i2, n[h2 + 14], 9, -1019803690), i2 = v(i2, a2, c, f2, n[h2 + 3], 14, -187363961), f2 = v(f2, i2, a2, c, n[h2 + 8], 20, 1163531501), c = v(c, f2, i2, a2, n[h2 + 13], 5, -1444681467), a2 = v(a2, c, f2, i2, n[h2 + 2], 9, -51403784), i2 = v(i2, a2, c, f2, n[h2 + 7], 14, 1735328473), c = g(c, f2 = v(f2, i2, a2, c, n[h2 + 12], 20, -1926607734), i2, a2, n[h2 + 5], 4, -378558), a2 = g(a2, c, f2, i2, n[h2 + 8], 11, -2022574463), i2 = g(i2, a2, c, f2, n[h2 + 11], 16, 1839030562), f2 = g(f2, i2, a2, c, n[h2 + 14], 23, -35309556), c = g(c, f2, i2, a2, n[h2 + 1], 4, -1530992060), a2 = g(a2, c, f2, i2, n[h2 + 4], 11, 1272893353), i2 = g(i2, a2, c, f2, n[h2 + 7], 16, -155497632), f2 = g(f2, i2, a2, c, n[h2 + 10], 23, -1094730640), c = g(c, f2, i2, a2, n[h2 + 13], 4, 681279174), a2 = g(a2, c, f2, i2, n[h2], 11, -358537222), i2 = g(i2, a2, c, f2, n[h2 + 3], 16, -722521979), f2 = g(f2, i2, a2, c, n[h2 + 6], 23, 76029189), c = g(c, f2, i2, a2, n[h2 + 9], 4, -640364487), a2 = g(a2, c, f2, i2, n[h2 + 12], 11, -421815835), i2 = g(i2, a2, c, f2, n[h2 + 15], 16, 530742520), c = m(c, f2 = g(f2, i2, a2, c, n[h2 + 2], 23, -995338651), i2, a2, n[h2], 6, -198630844), a2 = m(a2, c, f2, i2, n[h2 + 7], 10, 1126891415), i2 = m(i2, a2, c, f2, n[h2 + 14], 15, -1416354905), f2 = m(f2, i2, a2, c, n[h2 + 5], 21, -57434055), c = m(c, f2, i2, a2, n[h2 + 12], 6, 1700485571), a2 = m(a2, c, f2, i2, n[h2 + 3], 10, -1894986606), i2 = m(i2, a2, c, f2, n[h2 + 10], 15, -1051523), f2 = m(f2, i2, a2, c, n[h2 + 1], 21, -2054922799), c = m(c, f2, i2, a2, n[h2 + 8], 6, 1873313359), a2 = m(a2, c, f2, i2, n[h2 + 15], 10, -30611744), i2 = m(i2, a2, c, f2, n[h2 + 6], 15, -1560198380), f2 = m(f2, i2, a2, c, n[h2 + 13], 21, 1309151649), c = m(c, f2, i2, a2, n[h2 + 4], 6, -145523070), a2 = m(a2, c, f2, i2, n[h2 + 11], 10, -1120210379), i2 = m(i2, a2, c, f2, n[h2 + 2], 15, 718787259), f2 = m(f2, i2, a2, c, n[h2 + 9], 21, -343485551), c = d(c, r2), f2 = d(f2, e2), i2 = d(i2, o2), a2 = d(a2, u2);
        return [c, f, i, a];
      }
      function a(n) {
        let t2 = "";
        for (let r2 = 32 * n.length, e2 = 0; e2 < r2; e2 += 8)
          t2 += String.fromCharCode(n[e2 >> 5] >>> e2 % 32 & 255);
        return t2;
      }
      function h(n) {
        const t2 = [];
        let e2;
        for (t2[(n.length >> 2) - 1] = void 0, e2 = 0; e2 < t2.length; e2 += 1)
          t2[e2] = 0;
        for (let r2 = 8 * n.length, e3 = 0; e3 < r2; e3 += 8)
          t2[e3 >> 5] |= (255 & n.charCodeAt(e3 / 8)) << e3 % 32;
        return t2;
      }
      function e(n) {
        for (let t2, r2 = "0123456789abcdef", e2 = "", o2 = 0; o2 < n.length; o2 += 1)
          t2 = n.charCodeAt(o2), e2 += r2.charAt(t2 >>> 4 & 15) + r2.charAt(15 & t2);
        return e;
      }
      function r(n) {
        return unescape(encodeURIComponent(n));
      }
      function o(n) {
        let t2;
        return a(i(h(t2 = r(n)), 8 * t2.length));
      }
      function u(n, t2) {
        return function(n2, t3) {
          let r2, e2, o2 = h(n2);
          const u2 = [], c = [];
          for (u2[15] = c[15] = void 0, 16 < o2.length && (o2 = i(o2, 8 * n2.length)), r2 = 0; r2 < 16; r2 += 1)
            u2[r2] = 909522486 ^ o2[r2], c[r2] = 1549556828 ^ o2[r2];
          return e2 = i(u2.concat(h(t3)), 512 + 8 * t3.length), a(i(c.concat(e2), 640));
        }(r(n), r(t2));
      }
      function t(n, t2, r2) {
        return t2 ? r2 ? u(t2, n) : e(u(t2, n)) : r2 ? o(n) : e(o(n));
      }
      return t(str);
    }
    async httpGet(url, json = true, useCache = false) {
      let data = null;
      const cacheKey = this.md5(url);
      if (useCache && Keychain.contains(cacheKey)) {
        const cache = Keychain.get(cacheKey);
        return json ? JSON.parse(cache) : cache;
      }
      try {
        const req = new Request(url);
        data = await (json ? req.loadJSON() : req.loadString());
      } catch (e) {
      }
      if (!data && Keychain.contains(cacheKey)) {
        const cache = Keychain.get(cacheKey);
        return json ? JSON.parse(cache) : cache;
      }
      Keychain.set(cacheKey, json ? JSON.stringify(data) : data);
      return data;
    }
    async getImageByUrl(url, useCache = true) {
      const cacheKey = this.md5(url);
      const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey);
      if (useCache && FileManager.local().fileExists(cacheFile)) {
        return Image.fromFile(cacheFile);
      }
      try {
        const req = new Request(url);
        const img = await req.loadImage();
        FileManager.local().writeImage(cacheFile, img);
        return img;
      } catch (e) {
        const ctx = new DrawContext();
        ctx.size = new Size(100, 100);
        ctx.setFillColor(Color.red());
        ctx.fillRect(new Rect(0, 0, 100, 100));
        return await ctx.getImage();
      }
    }
    async renderHeader(widget, icon, title, color = false) {
      const header = widget.addStack();
      header.centerAlignContent();
      const _icon = header.addImage(await this.getImageByUrl(icon));
      _icon.imageSize = new Size(14, 14);
      _icon.cornerRadius = 4;
      header.addSpacer(10);
      const _title = header.addText(title);
      if (color)
        _title.textColor = color;
      _title.textOpacity = 0.7;
      _title.font = Font.boldSystemFont(12);
      widget.addSpacer(15);
      return widget;
    }
    async getWidgetScreenShot(title = null) {
      async function generateAlert(message2, options) {
        const alert = new Alert();
        alert.message = message2;
        for (const option of options) {
          alert.addAction(option);
        }
        const response = await alert.presentAlert();
        return response;
      }
      function cropImage(img2, rect) {
        const draw = new DrawContext();
        draw.size = new Size(rect.width, rect.height);
        draw.drawImageAtPoint(img2, new Point(-rect.x, -rect.y));
        return draw.getImage();
      }
      function phoneSizes() {
        const phones = {
          "2532": {
            small: 474,
            medium: 1014,
            large: 1062,
            left: 78,
            right: 618,
            top: 231,
            middle: 819,
            bottom: 1407
          },
          "2688": {
            small: 507,
            medium: 1080,
            large: 1137,
            left: 81,
            right: 654,
            top: 228,
            middle: 858,
            bottom: 1488
          },
          "1792": {
            small: 338,
            medium: 720,
            large: 758,
            left: 54,
            right: 436,
            top: 160,
            middle: 580,
            bottom: 1e3
          },
          "2436": {
            small: 465,
            medium: 987,
            large: 1035,
            left: 69,
            right: 591,
            top: 213,
            middle: 783,
            bottom: 1353
          },
          "2208": {
            small: 471,
            medium: 1044,
            large: 1071,
            left: 99,
            right: 672,
            top: 114,
            middle: 696,
            bottom: 1278
          },
          "1334": {
            small: 296,
            medium: 642,
            large: 648,
            left: 54,
            right: 400,
            top: 60,
            middle: 412,
            bottom: 764
          },
          "1136": {
            small: 282,
            medium: 584,
            large: 622,
            left: 30,
            right: 332,
            top: 59,
            middle: 399,
            bottom: 399
          },
          "1624": {
            small: 310,
            medium: 658,
            large: 690,
            left: 46,
            right: 394,
            top: 142,
            middle: 522,
            bottom: 902
          },
          "2001": {
            small: 444,
            medium: 963,
            large: 972,
            left: 81,
            right: 600,
            top: 90,
            middle: 618,
            bottom: 1146
          }
        };
        return phones;
      }
      let message;
      message = title || "开始之前，请先前往桌面,截取空白界面的截图。然后回来继续";
      const exitOptions = ["我已截图", "前去截图 >"];
      const shouldExit = await generateAlert(message, exitOptions);
      if (shouldExit)
        return;
      const img = await Photos.fromLibrary();
      const height = img.size.height;
      const phone = phoneSizes()[height];
      if (!phone) {
        message = "好像您选择的照片不是正确的截图，或者您的机型我们暂时不支持。点击确定前往社区讨论";
        const _id = await generateAlert(message, ["帮助", "取消"]);
        if (_id === 0)
          Safari.openInApp("https://support.qq.com/products/287371", false);
        return;
      }
      message = "截图中要设置透明背景组件的尺寸类型是？";
      const sizes = ["小尺寸", "中尺寸", "大尺寸"];
      const size = await generateAlert(message, sizes);
      const widgetSize = sizes[size];
      message = "要设置透明背景的小组件在哪个位置？";
      message += height == 1136 ? " （备注：当前设备只支持两行小组件，所以下边选项中的「中间」和「底部」的选项是一致的）" : "";
      const crop = {w: 0, h: 0, x: 0, y: 0};
      if (widgetSize == "小尺寸") {
        crop.w = phone.small;
        crop.h = phone.small;
        const positions = ["左上角", "右上角", "中间左", "中间右", "左下角", "右下角"];
        const _posotions = ["Top left", "Top right", "Middle left", "Middle right", "Bottom left", "Bottom right"];
        const position = await generateAlert(message, positions);
        const keys = _posotions[position].toLowerCase().split(" ");
        crop.y = phone[keys[0]];
        crop.x = phone[keys[1]];
      } else if (widgetSize == "中尺寸") {
        crop.w = phone.medium;
        crop.h = phone.small;
        crop.x = phone.left;
        const positions = ["顶部", "中间", "底部"];
        const _positions = ["Top", "Middle", "Bottom"];
        const position = await generateAlert(message, positions);
        const key = _positions[position].toLowerCase();
        crop.y = phone[key];
      } else if (widgetSize == "大尺寸") {
        crop.w = phone.medium;
        crop.h = phone.large;
        crop.x = phone.left;
        const positions = ["顶部", "底部"];
        const position = await generateAlert(message, positions);
        crop.y = position ? phone.middle : phone.top;
      }
      const imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h));
      return imgCrop;
    }
    async notify(title, body = "", url, opts = {}) {
      let n = new Notification();
      n = Object.assign(n, opts);
      n.title = title;
      n.body = body;
      if (url)
        n.openURL = url;
      return await n.schedule();
    }
    async shadowImage(img, color = "#000000", opacity = 0.7) {
      const ctx = new DrawContext();
      ctx.size = img.size;
      ctx.drawImageInRect(img, new Rect(0, 0, img.size["width"], img.size["height"]));
      ctx.setFillColor(new Color(color, opacity));
      ctx.fillRect(new Rect(0, 0, img.size["width"], img.size["height"]));
      const res = await ctx.getImage();
      return res;
    }
    getSettings(json = true) {
      let res = json ? {} : "";
      let cache = "";
      if (Keychain.contains(this.SETTING_KEY)) {
        cache = Keychain.get(this.SETTING_KEY);
      }
      if (json) {
        try {
          res = JSON.parse(cache);
        } catch (e) {
        }
      } else {
        res = cache;
      }
      return res;
    }
    saveSettings(notify = true) {
      const res = typeof this.settings === "object" ? JSON.stringify(this.settings) : String(this.settings);
      Keychain.set(this.SETTING_KEY, res);
      if (notify)
        this.notify("设置成功", "桌面组件稍后将自动刷新");
    }
    getBackgroundImage() {
      let result = null;
      if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
        result = Image.fromFile(this.BACKGROUND_KEY);
      }
      return result;
    }
    setBackgroundImage(img, notify = true) {
      if (!img) {
        if (this.FILE_MGR_LOCAL.fileExists(this.BACKGROUND_KEY)) {
          this.FILE_MGR_LOCAL.remove(this.BACKGROUND_KEY);
        }
        if (notify)
          this.notify("移除成功", "小组件背景图片已移除，稍后刷新生效");
      } else {
        this.FILE_MGR_LOCAL.writeImage(this.BACKGROUND_KEY, img);
        if (notify)
          this.notify("设置成功", "小组件背景图片已设置！稍后刷新生效");
      }
    }
  }
  const Testing2 = async (Widget2, default_args = "") => {
    let M;
    if (config.runsInWidget) {
      M = new Widget2(args.widgetParameter || "");
      const W = await M.render();
      Script.setWidget(W);
      Script.complete();
    } else {
      const {act, data, __arg, __size} = args.queryParameters;
      M = new Widget2(__arg || default_args || "");
      if (__size)
        M.init(__size);
      if (!act || !M["_actions"]) {
        const actions = M["_actions"];
        const _actions = [
          async () => {
            const a = new Alert();
            a.title = "服务器 IP";
            a.message = "请输入远程开发服务器（电脑）IP地址";
            let xjj_debug_server = "192.168.1.3";
            if (Keychain.contains("xjj_debug_server")) {
              xjj_debug_server = Keychain.get("xjj_debug_server");
            }
            a.addTextField("server-ip", xjj_debug_server);
            a.addAction("连接");
            a.addCancelAction("取消");
            const id = await a.presentAlert();
            if (id === -1)
              return;
            const ip = a.textFieldValue(0);
            Keychain.set("xjj_debug_server", ip);
            const server_api = `http://${ip}:5566`;
            const SELF_FILE = module2.filename.replace("「小件件」开发环境", Script.name());
            const req = new Request(`${server_api}/sync`);
            req.method = "POST";
            req.addFileToMultipart(SELF_FILE, "Widget", Script.name());
            try {
              const res = await req.loadString();
              if (res !== "ok") {
                return M.notify("连接失败", res);
              }
            } catch (e) {
              return M.notify("连接错误", e.message);
            }
            M.notify("连接成功", "编辑文件后保存即可进行下一步预览操作");
            const rconsole_log = async (data2, t = "log") => {
              const _req = new Request(`${server_api}/console`);
              _req.method = "POST";
              _req.headers = {
                "Content-Type": "application/json"
              };
              _req.body = JSON.stringify({
                t,
                data: data2
              });
              return await _req.loadString();
            };
            const lconsole_log = console.log.bind(console);
            const lconsole_warn = console.warn.bind(console);
            const lconsole_error = console.error.bind(console);
            console.log = (d) => {
              lconsole_log(d);
              rconsole_log(d, "log");
            };
            console.warn = (d) => {
              lconsole_warn(d);
              rconsole_log(d, "warn");
            };
            console.error = (d) => {
              lconsole_error(d);
              rconsole_log(d, "error");
            };
            while (1) {
              let _res = "";
              try {
                const _req = new Request(`${server_api}/sync?name=${encodeURIComponent(Script.name())}`);
                _res = await _req.loadString();
              } catch (e) {
                M.notify("停止调试", "与开发服务器的连接已终止");
                break;
              }
              if (_res === "stop") {
                console.log("[!] 停止同步");
                break;
              } else if (_res === "no") {
              } else if (_res.length > 0) {
                M.notify("同步成功", "新文件已同步，大小：" + _res.length);
                const _code = _res.split("// @组件代码开始")[1].split("// @组件代码结束")[0];
                let NewWidget = null;
                try {
                  const _func = new Function(`const _Debugger = Base => {
${_code}
return Widget
}
return _Debugger`);
                  NewWidget = _func()(Base2);
                } catch (e) {
                  M.notify("解析失败", e.message);
                }
                if (!NewWidget)
                  continue;
                M = new NewWidget(__arg || default_args || "");
                if (__size)
                  M.init(__size);
                FileManager.local().writeString(SELF_FILE, _res);
                const i = await _actions[1](true);
                if (i === 4 + Object.keys(actions).length)
                  break;
              }
            }
          },
          async (debug = false) => {
            const a = new Alert();
            a.title = "预览组件";
            a.message = "测试桌面组件在各种尺寸下的显示效果";
            a.addAction("小尺寸 Small");
            a.addAction("中尺寸 Medium");
            a.addAction("大尺寸 Large");
            a.addAction("全部 All");
            a.addCancelAction("取消操作");
            const funcs = [];
            if (debug) {
              for (const _ in actions) {
                a.addAction(_);
                funcs.push(actions[_].bind(M));
              }
              a.addDestructiveAction("停止调试");
            }
            const i = await a.presentSheet();
            if (i === -1)
              return;
            let w;
            switch (i) {
              case 0:
                M.widgetFamily = "small";
                w = await M.render();
                await w.presentSmall();
                break;
              case 1:
                M.widgetFamily = "medium";
                w = await M.render();
                await w.presentMedium();
                break;
              case 2:
                M.widgetFamily = "large";
                w = await M.render();
                await w.presentLarge();
                break;
              case 3:
                M.widgetFamily = "small";
                w = await M.render();
                await w.presentSmall();
                M.widgetFamily = "medium";
                w = await M.render();
                await w.presentMedium();
                M.widgetFamily = "large";
                w = await M.render();
                await w.presentLarge();
                break;
              default:
                const func = funcs[i - 4];
                if (func)
                  await func();
                break;
            }
            return i;
          },
          async () => {
            const SELF_FILE = module2.filename.replace("「小件件」开发环境", Script.name());
            const source = FileManager.local().readString(SELF_FILE);
            Pasteboard.copyString(source);
            await M.notify("复制成功", "当前脚本的源代码已复制到剪贴板！");
          },
          async () => {
            Safari.openInApp("https://www.kancloud.cn/im3x/scriptable/content", false);
          },
          async () => {
            Safari.openInApp("https://support.qq.com/products/287371", false);
          }
        ];
        const alert = new Alert();
        alert.title = M.name;
        alert.message = M.desc;
        alert.addAction("远程开发");
        alert.addAction("预览组件");
        alert.addAction("复制源码");
        alert.addAction("开发文档");
        alert.addAction("反馈交流");
        for (const _ in actions) {
          alert.addAction(_);
          _actions.push(actions[_]);
        }
        alert.addCancelAction("取消操作");
        const idx = await alert.presentSheet();
        if (_actions[idx]) {
          const func = _actions[idx];
          await func();
        }
        return;
      }
      const _tmp = act.split("-").map((_) => _[0].toUpperCase() + _.substr(1)).join("");
      const _act = `action${_tmp}`;
      if (M[_act] && typeof M[_act] === "function") {
        const func = M[_act].bind(M);
        await func(data);
      }
    }
  };
});

// src/input/weibo.ts
const base = __toModule(require_base());
class Widget extends base.Base {
  constructor(arg) {
    super(arg);
    this.name = "微博热榜";
    this.desc = "实时刷新微博热搜榜事件";
    this.registerAction("插件设置", this.actionSetting.bind(this));
  }
  async render() {
    if (this.widgetFamily === "medium") {
      return await this.renderMedium();
    } else if (this.widgetFamily === "large") {
      return await this.renderLarge();
    } else {
      return await this.renderSmall();
    }
  }
  async renderSmall() {
    const res = await this.httpGet("https://m.weibo.cn/api/container/getIndex?containerid=106003%26filter_type%3Drealtimehot");
    const data = res["data"]["cards"][0]["card_group"];
    data.shift();
    const topic = data[0];
    console.log(topic);
    let w = new ListWidget();
    w = await this.renderHeader(w, "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2225458401,2104443747&fm=26&gp=0.jpg", "微博热搜");
    const body = w.addStack();
    const txt = body.addText(topic["desc"]);
    body.addSpacer();
    txt.leftAlignText();
    txt.font = Font.lightSystemFont(14);
    w.addSpacer();
    const footer = w.addStack();
    footer.centerAlignContent();
    const img = footer.addImage(await this.getImageByUrl(topic["pic"]));
    img.imageSize = new Size(18, 18);
    footer.addSpacer(5);
    if (topic["icon"]) {
      const hot = footer.addImage(await this.getImageByUrl(topic["icon"]));
      hot.imageSize = new Size(18, 18);
      footer.addSpacer(5);
    }
    const num = footer.addText(String(topic["desc_extr"]));
    num.font = Font.lightSystemFont(10);
    num.textOpacity = 0.5;
    w.url = this.actionUrl("open-url", topic["scheme"]);
    return w;
  }
  async renderMedium(count = 4) {
    const res = await this.httpGet("https://m.weibo.cn/api/container/getIndex?containerid=106003%26filter_type%3Drealtimehot");
    const data = res["data"]["cards"][0]["card_group"];
    data.shift();
    let w = new ListWidget();
    w = await this.renderHeader(w, "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2225458401,2104443747&fm=26&gp=0.jpg", "微博热搜");
    const body = w.addStack();
    const bodyLeft = body.addStack();
    bodyLeft.layoutVertically();
    for (let i = 0; i < count; i++) {
      const topic = data[i];
      const dom = bodyLeft.addStack();
      dom.centerAlignContent();
      const pic = dom.addImage(await this.getImageByUrl(topic["pic"]));
      pic.imageSize = new Size(18, 18);
      dom.addSpacer(5);
      const title = dom.addText(topic["desc"]);
      title.lineLimit = 1;
      title.font = Font.lightSystemFont(14);
      dom.addSpacer(5);
      if (topic["icon"]) {
        const iconDom = dom.addStack();
        const icon = iconDom.addImage(await this.getImageByUrl(topic["icon"]));
        icon.imageSize = new Size(18, 18);
      }
      dom.addSpacer();
      const extr = dom.addText(String(topic["desc_extr"]));
      extr.font = Font.lightSystemFont(12);
      extr.textOpacity = 0.6;
      dom.url = this.actionUrl("open-url", topic["scheme"]);
      bodyLeft.addSpacer(5);
    }
    body.addSpacer();
    w.url = this.actionUrl("setting");
    return w;
  }
  async renderLarge() {
    return await this.renderMedium(11);
  }
  async actionSetting() {
    const settings = this.getSettings();
    const arg = settings["type"] || "1";
    const a = new Alert();
    a.title = "打开方式";
    a.message = "点击小组件浏览热点的方式";
    a.addAction((arg === "0" ? "✅ " : "") + "微博客户端");
    a.addAction((arg === "1" ? "✅ " : "") + "自带浏览器");
    a.addCancelAction("取消设置");
    const i = await a.presentSheet();
    if (i === -1)
      return;
    this.settings["type"] = String(i);
    this.saveSettings();
  }
  async actionOpenUrl(url) {
    const settings = this.getSettings();
    if (settings["type"] === "1") {
      Safari.openInApp(url, false);
    } else {
      const k = decodeURIComponent(url).split("q=")[1].split("&")[0];
      Safari.open("sinaweibo://searchall?q=" + encodeURIComponent(k));
    }
  }
}
base.Testing(Widget);
