# JSX、TSX 组件

<br/>

## wbox

组件画布，必须处于 jsx 最外层，映射为[ListWidget](https://docs.scriptable.app/listwidget/)

| 属性       | 类型             | 默认值    | 必填 | 说明                                                         |
| ---------- | ---------------- | --------- | ---- | ------------------------------------------------------------ |
| background | string \| object |           | 否   | 背景<br/>可以为hex 字符串，例子：#ffffff<br/>可以为网络图片链接，例子：http://example.com/a.jpg<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象<br/>可以为 [Image](https://docs.scriptable.app/image/) 对象<br/>可以为 [LinearGradient](https://docs.scriptable.app/lineargradient/) 渐变对象 |
| spacing    | number           | 0         | 否   | 间隔距离                                                     |
| href       | string           |           | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| updateDate | Date             |           | 否   | 小组件更新日期<br />该属性指示何时可以再次刷新窗口小部件。在到达日期之前，不会刷新小部件。**不保证小部件将在指定的日期完全刷新。**<br/><br/>小部件的刷新率部分取决于iOS / iPadOS。例如，如果设备电池电量低或用户很少看小部件，则小部件可能不会刷新。 |
| padding    | Array<number>    | [0,0,0,0] | 否   | 内边距，**依次是上、左、下、右**，四个都要填                 |
| onClick    | function         |           | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当`href` 存在时，只执行 `onClick` |

<br/>

<br/>

## wstack

容器组件，类似 `div` ，映射为[WidgetStack](https://docs.scriptable.app/widgetstack/)

| 属性                            | 类型             | 默认值    | 必填 | 说明                                                         |
| ------------------------------- | ---------------- | --------- | ---- | ------------------------------------------------------------ |
| background                      | string \| object |           | 否   | 背景<br/>可以为hex 字符串，例子：#ffffff<br/>可以为网络图片链接，例子：http://example.com/a.jpg<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象<br/>可以为 [Image](https://docs.scriptable.app/image/) 对象<br/>可以为 [LinearGradient](https://docs.scriptable.app/lineargradient/) 渐变对象 |
| spacing                         | number           | 0         | 否   | 间隔距离                                                     |
| padding                         | Array<number>    | [0,0,0,0] | 否   | 内边距，**依次是上、左、下、右**，四个都要填                 |
| width                           | number           | 0         | 否   | 组件宽，**当宽度设置 <= 0 时，小部件将自动确定该尺寸的长度。** |
| height                          | number           | 0         | 否   | 组件高，**当高度设置 <= 0 时，小部件将自动确定该尺寸的长度。** |
| borderRadius                    | number           | 0         | 否   | 边框四个角的圆角程度                                         |
| borderWidth                     | number           | 0         | 否   | 边框宽度                                                     |
| borderColor                     | string \| object | #000000   | 否   | 边框颜色<br/>可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| href                            | string           |           | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| [verticalAlign](#verticalAlign) | string           | top       | 否   | 内容垂直方向对齐方式                                         |
| [flexDirection](#flexDirection) | string           | row       | 否   | 排版方向                                                     |
| onClick                         | function         |           | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当`href` 存在时，只执行 `onClick` |
<br/>

##### <span id="verticalAlign">verticalAlign 的合法值</span>

| 值     | 说明                 |
| ------ | -------------------- |
| top    | 顶部对齐内容（默认） |
| center | 居中对齐内容         |
| bottom | 底部对齐内容         |
<br/>

##### <span id="flexDirection">flexDirection 的合法值</span>

| 值     | 说明             |
| ------ | ---------------- |
| row    | 横向排版（默认） |
| column | 纵向排版         |

<br/>

<br/>

## wimage

图片组件 ，映射为[WidgetImage](https://docs.scriptable.app/widgetimage/)

| 属性                      | 类型             | 默认值  | 必填 | 说明                                                         |
| ------------------------- | ---------------- | ------- | ---- | ------------------------------------------------------------ |
| src                       | string \| object |         | 是   | 图片资源地址<br/>可以为网络连接，例子：http://example.com/a.jpg<br/>可以为 [Image](https://docs.scriptable.app/image/) 对象<br/>可以为[SFSymbol 的 icon名字](https://docs.scriptable.app/sfsymbol/)，就是  [ios 自带图标库里](https://apps.apple.com/us/app/sf-symbols-browser/id1491161336)某图标的iconName，例子：tv.circle.fill<br/> |
| href                      | string           |         | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| resizable                 | boolean          | true    | 否   | 图片是否可以调整大小                                         |
| width                     | number           |         | 否   | 图片宽，**当宽高都为空时，图片将显示原尺寸。**               |
| height                    | number           |         | 否   | 图片高，**当宽高都为空时，图片将显示原尺寸。**               |
| opacity                   | number           | 1       | 否   | 透明度，范围0到1，0为完全透明，1为完全不透明。               |
| borderRadius              | number           | 0       | 否   | 边框四个角的圆角程度                                         |
| borderWidth               | number           | 0       | 否   | 边框宽度                                                     |
| borderColor               | string \| object | #000000 | 否   | 边框颜色<br/>可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| containerRelativeShape    | boolean          | false   | 否   | 如果为true，则图片的角将相对于包含的小部件进行四舍五入。<br/>如果为true，则会忽略borderRadius的值<br/>我知道你看不懂，我也是，可以[看官方文档解释](https://docs.scriptable.app/widgetimage/#containerrelativeshape) |
| filter                    | string \| object |         | 否   | 加滤镜<br />可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| [imageAlign](#imageAlign) | string           | left    |      | 图片横向对齐方式                                             |
| [mode](#mode)             | string           | fit     | 否   | 图片显示模式                                                 |
| onClick                   | function         |         | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当`href` 存在时，只执行 `onClick` |

<br/>

##### <span id="imageAlign">imageAlign 的合法值</span>

| 值     | 说明               |
| ------ | ------------------ |
| left   | 左对齐图片（默认） |
| center | 中间对齐图片       |
| right  | 右对齐图片         |

<br/>

##### <span id="mode">mode 的合法值</span>

| 值   | 说明               |
| ---- | ------------------ |
| fit  | 图片将适应可用空间 |
| fill | 图片将填充可用空间 |

