<p align="center"><a href="https://github.com/2214962083/ios-scriptable-tsx" target="_blank" rel="noopener noreferrer"><img width="100" src="https://scriptable.app/assets/appicon.png" alt="ios-scriptable-tsx logo" style="border-radius: 30px;"></a></p>

<p align="center">
  <!-- package.json 版本 -->
  <a href="https://github.com/2214962083/ios-scriptable-tsx"><img src="https://img.shields.io/github/package-json/v/2214962083/ios-scriptable-tsx" alt="Version"></a>
  <!-- star数量 -->
  <a href="https://github.com/2214962083/ios-scriptable-tsx"><img src="https://img.shields.io/github/stars/2214962083/ios-scriptable-tsx" alt="Github stars"></a>
  <!-- issues -->
  <a href="https://github.com/2214962083/ios-scriptable-tsx/issues"><img src="https://img.shields.io/github/issues/2214962083/ios-scriptable-tsx" alt="Issues"></a>
  <!-- 仓库大小 -->
  <a href="https://github.com/2214962083/ios-scriptable-tsx"><img src="https://img.shields.io/github/repo-size/2214962083/ios-scriptable-tsx" alt="Repo size"></a>
  <!-- 语言 -->
  <a href="https://github.com/2214962083/ios-scriptable-tsx"><img src="https://img.shields.io/github/languages/top/2214962083/ios-scriptable-tsx" alt="Language"></a>
  <!-- 最后一次提交时间 -->
  <a href="https://github.com/2214962083/ios-scriptable-tsx"><img src="https://img.shields.io/github/last-commit/2214962083/ios-scriptable-tsx" alt="Last commit date"></a>
  <!-- 证书 -->
  <a href="https://github.com/2214962083/ios-scriptable-tsx/blob/dev/LICENSE"><img src="https://img.shields.io/github/license/2214962083/ios-scriptable-tsx" alt="License"></a>
  <!-- package.json 关键词 -->
  <a href="https://github.com/2214962083/ios-scriptable-tsx"><img src="https://img.shields.io/github/package-json/keywords/2214962083/ios-scriptable-tsx" alt="Keywords"></a>
</p>
<h2 align="center">ios-scriptable-tsx</h2>

<br/><br/>

## 快速开始

1. 克隆本项目：

   ```bash
   git clone https://github.com/2214962083/ios-scriptable-tsx.git
   ```

2. 进入 `ios-scriptable-tsx` 目录，执行 `npm install` 安装依赖

3. 在 `./src/scripts` 目录下新创建一个文件叫 `helloWorld.tsx` 

4. 把下面代码粘贴上去：

   ```tsx
   import {h} from '@app/lib/jsx-runtime'
   
   class HelloWorld {
     async init() {
       // ListWidget 实例
       const widget = (await this.render()) as ListWidget
       // 注册小部件
       Script.setWidget(widget)
       // 调试用
       !config.runsInWidget && (await widget.presentMedium())
       // 脚本结束
       Script.complete()
     }
     async render(): Promise<unknown> {
       return (
         <wbox>
           <wspacer></wspacer>
           <wtext font={30} textAlign="center">
             Hello World
           </wtext>
           <wspacer></wspacer>
         </wbox>
       )
     }
   }
   
   new HelloWorld().init()
   ```

5. 然后，去 `./src/index.ts` 删除已有的东西，引入`helloWorld.tsx`

   ```tsx
   import './scripts/helloWorld.tsx'
   ```

6. 执行 `npm run watch`，并用手机扫描命令终端的二维码，打开引导页**（手机和 pc 必须处于同一个局域网下面）**，我的是这样的：

   <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhpv0b5gnj30i50d1q2y.jpg" alt="服务同步地址展示" height="480px"/>

   <br/>

   7. 根据引导页提示操作，**此举是用来安装基础包，若已安装基础包，无需再进引导页**：

   <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhpxwaqo6j30n01dsdpb.jpg" alt="开发者引导页" width="320px"/>

   <br/>

   8. 在 `scriptable` 右上角 `+` 创建一个空脚本，命名为 `你好世界` ：

      <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhq89z0fjj30n01ds7kp.jpg" alt="创建你好世界脚本" width="320px"/>

      <br/>

      9. 点击基础包，选择远程开发：

         <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqb6fhe0j30n01dsdxz.jpg" alt="选择远程开发" width="320px"/>

         <br/>

         10. 选择 `你好世界.js` ：

             <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqcjbqukj30n01ds4qp.jpg" alt="选择脚本" width="320px"/>

<br/>

## 项目目录说明

```
ios-scriptable-tsx
├── .vscode                 // vscode 配置
├── 打包好的成品             // 可以粘贴到 scriptable 运行的成品
├── docs                    // 文档
├── src                     // 代码目录
│   ├── lib                 // 本项目主要文件存放处，请勿挪动
│   │   └── static          // 存放开发引导文件
│   │   └── compile.ts      // 打包脚本，请勿随意更改
│   │   └── constants.ts    // 常量
│   │   └── env.ts          // 加载 dotenv 文件的脚本
│   │   └── help.ts         // 常用 api 函数封装
│   │   └── jsx-runtime.ts  // tsx、jsx 编译后解释回 scriptable api 的文件
│   │   └── server.ts       // 开启监听服务器，用于手机代码同步
│   ├── scripts             // 开发者存放小组件源代码的目录
│   └── types               // 存放类型声明目录
│   │   └── widget          // 存放 jsx、tsx element 可接收参数类型的目录
│   └── index.ts            // 打包主入口文件
├── .editorconfig           // 编辑器配置
├── .env                    // dotenv 文件，打包就加载进环境变量
├── .env.development        // dotenv 文件，开发环境时，加载进环境变量
├── .env.production         // dotenv 文件，生产环境时，加载进环境变量
├── .eslintrc.js            // eslint 配置，统一代码风格
├── .gitignore              // gitignore 文件
├── package.json            // 项目信息、依赖声明文件
├── prettier.config.js      // prettier 配置，用于美化、对齐代码
├── README.md               // 文档
├── scriptable.config.js    // scriptable 打包配置
└── tsconfig.json           // TypeScript 编译选项
```

<br/>

## scriptable.config.js 打包配置

| 属性             | 类型      | 必填 | 默认                   | 描述                           |
|----------------|---------|----|----------------------|------------------------------|
| rootPath       | string  | 否  | \./                  | 项目根目录, 不建议修改                 |
| inputFile      | string  | 否  | \./src/index\.ts     | 输入文件，当执行编译时生效，不建议修改          |
| inputDir       | string  | 否  | \./src/scripts/      | 输入文件夹，当执行批量编译时生效，不建议修改       |
| outputDir      | string  | 否  | \./dist/             | 输出文件夹，不建议修改                  |
| minify         | boolean | 否  | 开发环境为false，生存环境为true | 是否压缩代码                       |
| encrypt        | boolean | 否  | 开发环境为false，生存环境为true | 是否加密代码                       |
| header         | string  | 否  |                      | 往编译后的代码头部插入的代码（一般是作者信息）      |
| [esbuild](https://esbuild.github.io/api/#simple-options)        | object  | 否  |                      | esbuild 自定义配置                |
| [encryptOptions](https://github.com/javascript-obfuscator/javascript-obfuscator) | object  | 否  |                      | javascript\-obfuscator 自定义配置（加密代码配置） |

<br/>

## 环境变量配置

`ios-scriptable-tsx` 提供两个环境模式，开发环境 `development` 模式和生产环境 `production`模式 ，你可以用代码 `process.env.NODE_ENV` 获取到这个值。你可以在项目根目录下的 `package.json` 文件里的 `scripts` 看到他们是怎么传进去的。

```bash
npm run watch 		#development开发环境
npm run dev 		#development开发环境
npm run dev:all		#development开发环境
npm run build		#production开发环境
npm run build:all	#production开发环境
```

<br/>

**本项目集成了[dotenv](https://github.com/motdotla/dotenv)，你可以替换你的项目根目录中的下列文件来指定环境变量（如果你用过 [vue-cli](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E5%92%8C%E6%A8%A1%E5%BC%8F) 你会很熟悉它）：**

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

<br/>

一个环境文件只包含环境变量的“键=值”对：

```
FOO=bar
HELLO=你好
```

**环境变量将会载入挂载到 `process.env `上。例如在打包时，`process.env.FOO`将会被替换成字符串 `bar` ，`process.env.HELLO`将会被替换成字符串`你好`。被载入的变量将会对./src 目录下的所有代码可用。**

<br/>当为`development`开发环境打包时，下面的文件会被依次载入:

```
.env 
.env.local
.env.development
.env.development.local
```

<br/>

当为`production`生产环境打包时，下面的文件会被依次载入:

```
.env 
.env.local
.env.production
.env.production.local
```

<br/>

## 其他配置

| 配置文件名                                               | 用途                           |
| -------------------------------------------------------- | ------------------------------ |
| [.editorconfig](http://editorconfig.org)                 | 统一各个编辑器编辑风格（可删） |
| [.eslintrc.js](https://cn.eslint.org/)                   | 定义代码规范（可删）           |
| [prettier.config.js](https://prettier.io)                | 自动对齐、美化代码用（可删）   |
| [tsconfig.json](https://www.typescriptlang.org/tsconfig) | typescript配置文件 （不可删）  |

