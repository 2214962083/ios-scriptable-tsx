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

## 目录

- [项目目录说明]
- [打包配置]
- [其他配置]
- [jsx 组件属性](./widget-element.md)

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

6. 执行 `npm run watch`，并用手机扫描命令终端的二维码，打开引导页（**手机和 pc 必须处于同一个局域网下面**），我的是这样的：

    <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhpv0b5gnj30i50d1q2y.jpg" alt="服务同步地址展示" height="480px"/>

  <br/>

7. 根据引导页提示操作，**此举是用来安装基础包，若已安装基础包，无需再进引导页**：

    <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhpxwaqo6j30n01dsdpb.jpg" alt="开发者引导页" width="320px"/>

  <br/>

8. 在 `scriptable` 右上角 `+` 创建一个空脚本，命名为 `你好世界` ：

    <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhq89z0fjj30n01ds7kp.jpg" alt="创建你好世界脚本" width="320px"/>

  <br/>

9. 点击基础包，选择远程开发， 选择 `你好世界.js`：

    <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqb6fhe0j30n01dsdxz.jpg" alt="选择远程开发" width="320px"/> <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqcjbqukj30n01ds4qp.jpg" alt="选择脚本" width="320px"/>

  <br/>

10. 输入同步地址，`http://IP地址:端口/打包后的文件` ，默认是 pc 上提示的链接加上 `/index.js`，同步成功，看到小部件预览效果了：

    <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqlsy0abj30n01dstux.jpg" alt="输入同步地址" width="320px"/> <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqooocoij30n01dsaju.jpg" alt="同步成功" width="320px"/>
    
  <br/>

11. 长按桌面，点击添加 `scriptable` 小部件，然后长按小部件，点击编辑小部件 ：

    <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqst4khkj30n01dsnpd.jpg" alt="添加 scriptable 小部件" width="320px"/> <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqus04b6j30n01dshdt.jpg" alt="编辑小部件" width="320px"/>
    
  <br/>

12. `Script` 选择 `你好世界`，就能看到效果了，恭喜你完成新手教学 ：

    <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqx0nxrqj30n01ds4qp.jpg" alt="选择要显示的脚本" width="320px"/> <img src="http://ww1.sinaimg.cn/large/006Pg1gLgy1glhqxu8vkxj30n01dskjl.jpg" alt="最终效果" width="320px"/>
    
  <br/>

<br/>

