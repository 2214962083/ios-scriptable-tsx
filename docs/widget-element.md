# JSX、TSX 组件

<br/>

## wbox

组件画布，必须处于 jsx 最外层，映射为[ListWidget](https://docs.scriptable.app/listwidget/)

| 属性       | 类型                                                         | 默认值    | 必填 | 说明                                                         |
| ---------- | ------------------------------------------------------------ | --------- | ---- | ------------------------------------------------------------ |
| background | [Color](https://docs.scriptable.app/color/) \| [Image](https://docs.scriptable.app/image/) \| [LinearGradient](https://docs.scriptable.app/lineargradient/) \| string |           | 否   | 背景<br/>可以为 `Color` 对象、hex 字符串<br/>可以为 `Image` 对象、网络图片链接<br/>可以为渐变对象 `LinearGradient` |
| spacing    | number                                                       | 0         | 否   | 间隔距离                                                     |
| href       | string                                                       |           | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| updateDate | [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) |           | 否   | 小组件更新日期<br />该属性指示何时可以再次刷新窗口小部件。在到达日期之前，不会刷新小部件。**不保证小部件将在指定的日期完全刷新。**<br/><br/>小部件的刷新率部分取决于iOS / iPadOS。例如，如果设备电池电量低或用户很少看小部件，则小部件可能不会刷新。 |
| padding    | number[]                                                     | [0,0,0,0] | 否   | 内边距，**依次是上、左、下、右**，四个都要填                 |
| onClick    | Function                                                     |           | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当`href` 存在时，只执行 `onClick` |

<br/>

<br/>

## wstack

组件常用容器，类似 `div` ，映射为[WidgetStack](https://docs.scriptable.app/widgetstack/)

| 属性                            | 类型                                                         | 默认值    | 必填 | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ | --------- | ---- | ------------------------------------------------------------ |
| background                      | [Color](https://docs.scriptable.app/color/) \| [Image](https://docs.scriptable.app/image/) \| [LinearGradient](https://docs.scriptable.app/lineargradient/) \| string |           | 否   | 背景<br/>可以为 `Color` 对象、hex 字符串<br/>可以为 `Image` 对象、网络图片链接<br/>可以为渐变对象 `LinearGradient` |
| spacing                         | number                                                       | 0         | 否   | 间隔距离                                                     |
| padding                         | number[]                                                     | [0,0,0,0] | 否   | 内边距，**依次是上、左、下、右**，四个都要填                 |
| width                           | number                                                       | 0         | 否   | 组件宽，**当宽度设置 <= 0 时，小部件将自动确定该尺寸的长度。** |
| height                          | number                                                       | 0         | 否   | 组件高，**当高度设置 <= 0 时，小部件将自动确定该尺寸的长度。** |
| borderRadius                    | number                                                       | 0         | 否   | 边框四个角的圆角程度                                         |
| borderWidth                     | number                                                       | 0         | 否   | 边框宽度                                                     |
| borderColor                     | [Color](https://docs.scriptable.app/color/) \| string        | #000000   | 否   | 边框颜色                                                     |
| href                            | string                                                       |           | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| [verticalAlign](#verticalAlign) | string                                                       | top       | 否   | 内容垂直方向对齐方式                                         |
| [flexDirection](#flexDirection) | string                                                       | row       | 否   | 排版方向                                                     |
| onClick                         | Function                                                     |           | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当`href` 存在时，只执行 `onClick` |

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

