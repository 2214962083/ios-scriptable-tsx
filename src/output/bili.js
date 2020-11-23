// src/input/bili.ts
class Im3xWidget {
  constructor(arg = "") {
    this.arg = arg;
    this.widgetSize = config.widgetFamily;
  }
  async render() {
    if (this.widgetSize === "medium") {
      return await this.renderSmall();
    } else if (this.widgetSize === "large") {
      return await this.renderLarge();
    } else {
      return await this.renderSmall();
    }
  }
  async renderSmall() {
    const data = await this.getData();
    const w = new ListWidget();
    const header = w.addStack();
    const icon = header.addImage(await this.getImage("https://www.bilibili.com/favicon.ico"));
    icon.imageSize = new Size(15, 15);
    header.addSpacer(10);
    const title = header.addText("哔哩哔哩粉丝");
    title.textOpacity = 0.9;
    title.font = Font.systemFont(14);
    w.addSpacer(20);
    let flTxt;
    if (data.code != 0) {
      flTxt = w.addText("请填写B站MID");
      flTxt.textColor = new Color("#fb7299");
      flTxt.font = Font.systemFont(14);
    } else {
      flTxt = w.addText(this.toThousands(data.data["follower"]));
      flTxt.textColor = new Color("#fb7299");
      flTxt.font = Font.boldRoundedSystemFont(this.getFontsize(data.data["follower"]));
    }
    flTxt.centerAlignText();
    w.addSpacer(20);
    const utTxt = w.addText("更新于:" + this.nowTime());
    utTxt.font = Font.systemFont(12);
    utTxt.centerAlignText();
    utTxt.textOpacity = 0.5;
    w.url = "bilibili://";
    return w;
  }
  async renderMedium() {
    const w = new ListWidget();
    w.addText("暂不支持该尺寸组件");
    return w;
  }
  async renderLarge() {
    const w = new ListWidget();
    w.addText("暂不支持该尺寸组件");
    return w;
  }
  async getData() {
    const api = "http://api.bilibili.com/x/relation/stat?vmid=" + this.arg;
    const req = new Request(api);
    const res = await req.loadJSON();
    return res;
  }
  async getImage(url) {
    const req = new Request(url);
    return await req.loadImage();
  }
  toThousands(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  }
  nowTime() {
    const date = new Date();
    return date.toLocaleTimeString("chinese", {hour12: false});
  }
  getFontsize(num) {
    if (num < 99) {
      return 38;
    } else if (num < 9999 && num > 100) {
      return 30;
    } else if (num < 99999 && num > 1e4) {
      return 28;
    } else if (num < 999999 && num > 1e5) {
      return 24;
    } else if (num < 9999999 && num > 1e6) {
      return 22;
    } else {
      return 20;
    }
  }
  async test() {
    if (config.runsInWidget)
      return;
    this.widgetSize = "small";
    const w1 = await this.render();
    await w1.presentSmall();
    this.widgetSize = "medium";
    const w2 = await this.render();
    await w2.presentMedium();
    this.widgetSize = "large";
    const w3 = await this.render();
    await w3.presentLarge();
  }
  async init() {
    if (!config.runsInWidget)
      return;
    const widget = await this.render();
    Script.setWidget(widget);
    Script.complete();
  }
}
module.exports = Im3xWidget;
new Im3xWidget(args.widgetParameter).init();
