## 快速开始

<br/>

1. 克隆本项目：

   ```bash
   git clone https://github.com/2214962083/ios-scriptable-tsx.git
   ```

<br/>

2. 进入 `ios-scriptable-tsx` 目录，执行 `npm install` 安装依赖

<br/>

3. 在 `./src/scripts` 目录下新创建一个文件叫 `helloWorld.tsx`

<br/>

4. 把下面代码粘贴上去：

   ```tsx
   // jsx、tsx 必须引入的解析函数
   import {h} from '@app/lib/jsx-runtime'
   
   class HelloWorld {
     // 因为 constructor 无法 async await，所以在 init 渲染小部件
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

     // 手动声明 wbox 返回的是 Promise<unknown>
     // 记住，这是异步构建
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

<br/>

5. 然后，去 `./src/index.ts` 删除已有的东西，引入`helloWorld.tsx`

   ```tsx
   // 打包入口默认是 ./src/index.ts
   // 这样引入其他位置的脚本，就会打包进来
   import './scripts/helloWorld.tsx'
   ```

<br/>

6. 执行 `npm run watch`，并用手机扫描命令终端的二维码，打开引导页（**手机和 pc 必须处于同一个局域网下面**），我的是这样的：

    <img src="https://p.pstatp.com/origin/137b500023367dc3190a4" alt="服务同步地址展示" width="320px"/>

  <br/>

7. 根据引导页提示操作，**此举是用来安装基础包，若已安装基础包，无需再进引导页**：

    <img src="https://p.pstatp.com/origin/13794000249e68ff96157" alt="开发者引导页" width="240px"/>

  <br/>

8. 在 `scriptable` 右上角 `+` 创建一个空脚本，命名为 `你好世界` ：

    <img src="https://p.pstatp.com/origin/fefa0003087e0525a0c9" alt="创建你好世界脚本" width="240px"/>

  <br/>

9. 点击基础包，选择远程开发， 选择 `你好世界.js`：

    <img src="https://p.pstatp.com/origin/137780002c300979c7e08" alt="选择远程开发" width="240px"/> <img src="https://p.pstatp.com/origin/13875000091c4b13729f9" alt="选择脚本" width="240px"/>

  <br/>

10. 输入同步地址，`http://IP地址:端口/打包后的文件` ，默认是 pc 上提示的链接加上 `/index.js`，同步成功，看到小部件预览效果了：

    <img src="https://p.pstatp.com/origin/feba0001f91c805d4aa2" alt="输入同步地址" width="240px"/> <img src="https://p.pstatp.com/origin/13729000297a9c6a241cc" alt="同步成功" width="240px"/>
    
  <br/>

11. 长按桌面，点击添加 `scriptable` 小部件，然后长按小部件，点击编辑小部件 ：

    <img src="https://p.pstatp.com/origin/138840000ab5a2a77c25e" alt="添加 scriptable 小部件" width="240px"/> <img src="https://p.pstatp.com/origin/fe77000360daabc45cd4" alt="编辑小部件" width="240px"/>
    
  <br/>

12. `Script` 选择 `你好世界`，就能看到效果了，恭喜你完成新手教学 ：

    <img src="https://p.pstatp.com/origin/1375a0002cf37b40f5587" alt="选择要显示的脚本" width="240px"/> <img src="https://p.pstatp.com/origin/1377600025b435bcb2eca" alt="最终效果" width="240px"/>
    
  <br/>

<br/>

