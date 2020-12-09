# JSX、TSX 组件

<br/>

## wbox

组件画布，必须处于 jsx 最外层，映射为[ListWidget](https://docs.scriptable.app/listwidget/)

| 属性                                                         | 类型             | 默认值                                  | 必填 | 说明                                                         |
| ------------------------------------------------------------ | ---------------- | --------------------------------------- | ---- | ------------------------------------------------------------ |
| [background](https://docs.scriptable.app/listwidget/#backgroundcolor) | string \| object | 浅色模式是#ffffff<br/>暗黑模式是#000000 | 否   | 背景<br/>可以为hex 字符串，例子：#ffffff<br/>可以为网络图片链接，例子：http://example.com/a.jpg<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象<br/>可以为 [Image](https://docs.scriptable.app/image/) 对象<br/>可以为 [LinearGradient](https://docs.scriptable.app/lineargradient/) 渐变对象<br />wbox不能设置透明背景，ios不支持。<br/>不过，可以通过[裁剪桌面截图，营造视觉上的透明](https://github.com/2214962083/ios-scriptable-tsx/blob/b528a7ceeed719f8cc7cd79bb1b422244c98cb91/src/lib/help.ts#L753) |
| [spacing](https://docs.scriptable.app/listwidget/#spacing)   | number           | 0                                       | 否   | 间隔距离                                                     |
| [href](https://docs.scriptable.app/listwidget/#url)          | string           |                                         | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| [updateDate](https://docs.scriptable.app/listwidget/#refreshafterdate) | object           |                                         | 否   | 小组件更新日期<br />只接收 [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象<br />该属性指示何时可以再次刷新窗口小部件。在到达日期之前，不会刷新小部件。**不保证小部件将在指定的日期完全刷新。**<br/>小部件的刷新率部分取决于iOS / iPadOS。例如，如果设备电池电量低或用户很少看小部件，则小部件可能不会刷新。 |
| [padding](https://docs.scriptable.app/listwidget/#-setpadding) | Array<number>    | [0,0,0,0]                               | 否   | 内边距，**依次是上、左、下、右**，四个都要填                 |
| onClick                                                      | function         |                                         | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当 `href` 存在时，只执行 `onClick` |

<br/>

<br/>

## wstack

容器组件，类似 `div` ，映射为[WidgetStack](https://docs.scriptable.app/widgetstack/)

| 属性                                                         | 类型             | 默认值    | 必填 | 说明                                                         |
| ------------------------------------------------------------ | ---------------- | --------- | ---- | ------------------------------------------------------------ |
| [background](https://docs.scriptable.app/widgetstack/#backgroundcolor) | string \| object |           | 否   | 背景<br/>可以为hex 字符串，例子：#ffffff<br/>可以为网络图片链接，例子：http://example.com/a.jpg<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象<br/>可以为 [Image](https://docs.scriptable.app/image/) 对象<br/>可以为 [LinearGradient](https://docs.scriptable.app/lineargradient/) 渐变对象 |
| [spacing](https://docs.scriptable.app/widgetstack/#spacing)  | number           | 0         | 否   | 间隔距离                                                     |
| [padding](https://docs.scriptable.app/widgetstack/#-setpadding) | Array<number>    | [0,0,0,0] | 否   | 内边距，**依次是上、左、下、右**，四个都要填                 |
| [width](https://docs.scriptable.app/widgetstack/#size)       | number           | 0         | 否   | 组件宽，**当宽度设置 <= 0 时，小部件将自动确定该尺寸的长度。** |
| [height](https://docs.scriptable.app/widgetstack/#size)      | number           | 0         | 否   | 组件高，**当高度设置 <= 0 时，小部件将自动确定该尺寸的长度。** |
| [borderRadius](https://docs.scriptable.app/widgetstack/#cornerradius) | number           | 0         | 否   | 边框四个角的圆角程度                                         |
| [borderWidth](https://docs.scriptable.app/widgetstack/#borderwidth) | number           | 0         | 否   | 边框宽度                                                     |
| [borderColor](https://docs.scriptable.app/widgetstack/#bordercolor) | string \| object | #000000   | 否   | 边框颜色<br/>可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| [href](https://docs.scriptable.app/widgetstack/#url)         | string           |           | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| [verticalAlign](#wstack-verticalAlign)                       | string           | top       | 否   | 内容垂直方向对齐方式                                         |
| [flexDirection](#wstack-flexDirection)                       | string           | row       | 否   | 排版方向                                                     |
| onClick                                                      | function         |           | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当 `href` 存在时，只执行 `onClick` |
<br/>

##### <span id="wstack-verticalAlign">verticalAlign 的合法值</span>

| 值                                                           | 说明                 |
| ------------------------------------------------------------ | -------------------- |
| [top](https://docs.scriptable.app/widgetstack/#-topaligncontent) | 顶部对齐内容（默认） |
| [center](https://docs.scriptable.app/widgetstack/#-centeraligncontent) | 居中对齐内容         |
| [bottom](https://docs.scriptable.app/widgetstack/#-bottomaligncontent) | 底部对齐内容         |
<br/>

##### <span id="wstack-flexDirection">flexDirection 的合法值</span>

| 值                                                           | 说明             |
| ------------------------------------------------------------ | ---------------- |
| [row](https://docs.scriptable.app/widgetstack/#-layouthorizontally) | 横向排版（默认） |
| [column](https://docs.scriptable.app/widgetstack/#-layoutvertically) | 纵向排版         |

<br/>

<br/>

## wimage

图片组件 ，映射为[WidgetImage](https://docs.scriptable.app/widgetimage/)，组件里面不可包裹其他组件

| 属性                                                         | 类型             | 默认值  | 必填 | 说明                                                         |
| ------------------------------------------------------------ | ---------------- | ------- | ---- | ------------------------------------------------------------ |
| [src](https://docs.scriptable.app/widgetimage/#image)        | string \| object |         | 是   | 图片资源地址<br/>可以为网络连接，例子：http://example.com/a.jpg<br/>可以为 [Image](https://docs.scriptable.app/image/) 对象<br/>可以为 [SFSymbol 的 icon名字](https://docs.scriptable.app/sfsymbol/) ，就是  [ios 自带图标库里](https://apps.apple.com/us/app/sf-symbols-browser/id1491161336) 某图标的iconName，例子：tv.circle.fill<br/> |
| [href](https://docs.scriptable.app/widgetimage/#url)         | string           |         | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| [resizable](https://docs.scriptable.app/widgetimage/#resizable) | boolean          | true    | 否   | 图片是否可以调整大小                                         |
| [width](https://docs.scriptable.app/widgetimage/#imagesize)  | number           |         | 否   | 图片宽，**当宽高都为空时，图片将显示原尺寸。**               |
| [height](https://docs.scriptable.app/widgetimage/#imagesize) | number           |         | 否   | 图片高，**当宽高都为空时，图片将显示原尺寸。**               |
| [opacity](https://docs.scriptable.app/widgetimage/#imageopacity) | number           | 1       | 否   | 透明度，范围0到1，0为完全透明，1为完全不透明。               |
| [borderRadius](https://docs.scriptable.app/widgetimage/#cornerradius) | number           | 0       | 否   | 边框四个角的圆角程度                                         |
| [borderWidth](https://docs.scriptable.app/widgetimage/#borderwidth) | number           | 0       | 否   | 边框宽度                                                     |
| [borderColor](https://docs.scriptable.app/widgetimage/#bordercolor) | string \| object | #000000 | 否   | 边框颜色<br/>可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| [containerRelativeShape](https://docs.scriptable.app/widgetimage/#containerrelativeshape) | boolean          | false   | 否   | 如果为true，则图片的角将相对于包含的小部件进行四舍五入。<br/>如果为true，则会忽略borderRadius的值<br/>我知道你看不懂，我也是，可以[看官方文档解释](https://docs.scriptable.app/widgetimage/#containerrelativeshape) |
| [filter](https://docs.scriptable.app/widgetimage/#tintcolor) | string \| object |         | 否   | 加滤镜<br />可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| [imageAlign](#wimage-imageAlign)                             | string           | left    |      | 图片横向对齐方式                                             |
| [mode](#wimage-mode)                                         | string           | fit     | 否   | 图片显示模式                                                 |
| onClick                                                      | function         |         | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当 `href` 存在时，只执行 `onClick` |

<br/>

##### <span id="wimage-imageAlign">imageAlign 的合法值</span>

| 值                                                           | 说明               |
| ------------------------------------------------------------ | ------------------ |
| [left](https://docs.scriptable.app/widgetimage/#-leftalignimage) | 左对齐图片（默认） |
| [center](https://docs.scriptable.app/widgetimage/#-centeralignimage) | 中间对齐图片       |
| [right](https://docs.scriptable.app/widgetimage/#-rightalignimage) | 右对齐图片         |

<br/>

##### <span id="wimage-mode">mode 的合法值</span>

| 值                                                           | 说明                       |
| ------------------------------------------------------------ | -------------------------- |
| [fit](https://docs.scriptable.app/widgetimage/#-applyfittingcontentmode) | 图片将适应可用空间（默认） |
| [fill](https://docs.scriptable.app/widgetimage/#-applyfillingcontentmode) | 图片将填充可用空间         |

<br/>

<br/>

## wspacer

空格占位组件，映射为[WidgetSpacer](https://docs.scriptable.app/widgetspacer/)，组件里面不可包裹其他组件

| 属性                                                       | 类型   | 默认值 | 必填 | 说明                                    |
| ---------------------------------------------------------- | ------ | ------ | ---- | --------------------------------------- |
| [length](https://docs.scriptable.app/widgetspacer/#length) | number | 0      | 否   | 空格长度，当为0时是弹性占位（能占则占） |

<br/>

<br/>

## wtext

文字组件，映射为[WidgetText](https://docs.scriptable.app/widgettext/)，组件里面不可包裹其他组件，只可以包裹文字

| 属性                                                         | 类型             | 默认值                                  | 必填 | 说明                                                         |
| ------------------------------------------------------------ | ---------------- | --------------------------------------- | ---- | ------------------------------------------------------------ |
| [textColor](https://docs.scriptable.app/widgettext/#textcolor) | string \| object | 浅色模式是#000000<br/>暗黑模式是#ffffff | 否   | 文字颜色<br />可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| [font](https://docs.scriptable.app/widgettext/#font)         | number \| object |                                         | 否   | 文字字体样式<br />为number时，使用正常系统字体，并设置为这个尺寸。<br />也可以传 [Font](https://docs.scriptable.app/font/) 字体对象进来 |
| [opacity](https://docs.scriptable.app/widgettext/#textopacity) | number           | 1                                       | 否   | 透明度，范围0到1，0为完全透明，1为完全不透明。               |
| [maxLine](https://docs.scriptable.app/widgettext/#linelimit) | number           | 0                                       | 否   | 最大行数。<br/>显示的最大行数。该值 <= 0 时，将禁用该限制。  |
| [scale](https://docs.scriptable.app/widgettext/#minimumscalefactor) | number           | 1                                       | 否   | 文字可缩最小的倍数，取值范围 0 到 1 。<br />例如：0.5 时，允许布局调整时缩小文字到原来的 0.5 倍大小<br />有点拗口，[看官方文档](https://docs.scriptable.app/widgettext/#minimumscalefactor) |
| [shadowColor](https://docs.scriptable.app/widgettext/#shadowcolor) | string \| object | #000000                                 | 否   | 阴影颜色， `shadowRadius` 属性的值必须大于零，此属性才能生效。<br />可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| [shadowRadius](https://docs.scriptable.app/widgettext/#shadowradius) | number           | 0                                       | 否   | 阴影模糊距离                                                 |
| [shadowOffset](https://docs.scriptable.app/widgettext/#shadowoffset) | object           | new Point(0, 0)                         | 否   | 阴影的偏移位置。 `shadowRadius` 属性的值必须大于零，此属性才能生效。<br />传入 [Point](https://docs.scriptable.app/point/#point) 位置对象 |
| [href](https://docs.scriptable.app/widgettext/#url)          | string           |                                         | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| [textAlign](#wtext-textAlign)                                | string           | left                                    | 否   |                                                              |
| onClick                                                      | function         |                                         | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当 `href` 存在时，只执行 `onClick` |

<br/>

##### <span id="wtext-textAlign">textAlign 的合法值</span>

| 值                                                           | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [left](https://docs.scriptable.app/widgettext/#-leftaligntext) | 文字左对齐**（在`wstack`里左对齐文本，应该在文本组件右边放一个 `wspacer` ）** |
| [center](https://docs.scriptable.app/widgettext/#-centeraligntext) | 文字居中对齐**（在`wstack`里居中对齐文本，应该在文本组件两边放一个 `wspacer` ）** |
| [right](https://docs.scriptable.app/widgettext/#-rightaligntext) | 文字右对齐**（在`wstack`里右对齐文本，应该在文本组件左边放一个 `wspacer` ）** |

<br/>

<br/>

## wdate

日期组件，映射为[WidgetDate](https://docs.scriptable.app/widgetdate/)，组件里面不可包裹其他组件，有点类似 `wtext` 组件，区别在文字改成了日期

| 属性                                                         | 类型             | 默认值                                  | 必填 | 说明                                                         |
| ------------------------------------------------------------ | ---------------- | --------------------------------------- | ---- | ------------------------------------------------------------ |
| [date](https://docs.scriptable.app/widgetdate/#date)         | object           |                                         | 是   | 需要显示的时间<br />只接收 [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象 |
| [mode](#wdate-mode)                                          | string           |                                         | 是   | 显示的时间格式                                               |
| [textColor](https://docs.scriptable.app/widgetdate/#textcolor) | string \| object | 浅色模式是#000000<br/>暗黑模式是#ffffff | 否   | 文字颜色<br />可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| [font](https://docs.scriptable.app/widgetdate/#font)         | number \| object |                                         | 否   | 文字字体样式<br />为number时，使用正常系统字体，并设置为这个尺寸。<br />也可以传 [Font](https://docs.scriptable.app/font/) 字体对象进来 |
| [opacity](https://docs.scriptable.app/widgetdate/#textopacity) | number           | 1                                       | 否   | 透明度，范围0到1，0为完全透明，1为完全不透明。               |
| [maxLine](https://docs.scriptable.app/widgetdate/#linelimit) | number           | 0                                       | 否   | 最大行数。<br/>显示的最大行数。该值 <= 0 时，将禁用该限制。  |
| [scale](https://docs.scriptable.app/widgetdate/#minimumscalefactor) | number           | 1                                       | 否   | 文字可缩最小的倍数，取值范围 0 到 1 。<br />例如：0.5 时，允许布局调整时缩小文字到原来的 0.5 倍大小<br />有点拗口，[看官方文档](https://docs.scriptable.app/widgettext/#minimumscalefactor) |
| [shadowColor](https://docs.scriptable.app/widgetdate/#shadowcolor) | string \| object | #000000                                 | 否   | 阴影颜色， `shadowRadius` 属性的值必须大于零，此属性才能生效。<br />可以为hex 字符串，例子：#ffffff<br/>可以为  [Color](https://docs.scriptable.app/color/)  对象 |
| [shadowRadius](https://docs.scriptable.app/widgetdate/#shadowradius) | number           | 0                                       | 否   | 阴影模糊距离                                                 |
| [shadowOffset](https://docs.scriptable.app/widgetdate/#shadowoffset) | object           | new Point(0, 0)                         | 否   | 阴影的偏移位置。 `shadowRadius` 属性的值必须大于零，此属性才能生效。<br />传入 [Point](https://docs.scriptable.app/point/#point) 位置对象 |
| [href](https://docs.scriptable.app/widgetdate/#url)          | string           |                                         | 否   | 点击时打开的url <br/>不与 `onClick` 共存，当 `onClick` 存在时，只执行 `onClick` |
| [textAlign](#wtext-textAlign)                                | string           | left                                    | 否   |                                                              |
| onClick                                                      | function         |                                         | 否   | 用 [URLScheme](https://docs.scriptable.app/urlscheme/) 实现的点击事件<br/>不与 `href` 共存，当 `href` 存在时，只执行 `onClick` |

<br/>

##### <span id="wdate-mode">mode 的合法值</span>

| 值                                                           | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [time]([WidgetDate - Scriptable Docs](https://docs.scriptable.app/widgetdate/#-applytimestyle)) | 显示日期的时间部分。例如：11:23PM                            |
| [date]([WidgetDate - Scriptable Docs](https://docs.scriptable.app/widgetdate/#-applydatestyle)) | 显示整个日期。例如：June 3, 2019                             |
| [relative](https://docs.scriptable.app/widgetdate/#-applyrelativestyle) | 将日期显示为相对于现在的日期。例如：2 hours, 23 minutes 1 year, 1 month |
| [offset](https://docs.scriptable.app/widgetdate/#-applyoffsetstyle) | 将日期显示为从现在开始的偏移量。例如：+2 hours -3 months     |
| [timer](https://docs.scriptable.app/widgetdate/#-applytimerstyle) | 从现在开始将日期显示为计时器计数。例如：2:32 36:59:01        |

