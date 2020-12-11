# <span id="config-introduction">项目目录说明和配置指南</span>

<br/>

## <span id="project-dir-introduction">项目目录说明</span>

```
ios-scriptable-tsx
├── .vscode                 // vscode 配置
├── 打包好的成品             // 可以粘贴到 scriptable 运行的成品
├── docs                    // 文档
├── src                     // 代码目录
│   ├── lib                 // 本项目主要文件存放处，请勿挪动
│   │   └── static          // 存放开发引导文件的文件夹
│   │   └── basic           // 基础包源码
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

##  <span id="scriptable-config">scriptable.config.js 打包配置</span>

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

## <span id="others-config">其他配置</span>

| 配置文件名                                               | 用途                           |
| -------------------------------------------------------- | ------------------------------ |
| [.editorconfig](http://editorconfig.org)                 | 统一各个编辑器编辑风格（可删） |
| [.eslintrc.js](https://cn.eslint.org/)                   | 定义代码规范（可删）           |
| [prettier.config.js](https://prettier.io)                | 自动对齐、美化代码用（可删）   |
| [tsconfig.json](https://www.typescriptlang.org/tsconfig) | typescript配置文件 （不可删）  |

<br/>

## <span id="env-config">环境变量配置</span>

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
