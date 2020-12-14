## 常见问题

<br/>

**A、为什么执行 `npm run watch` 同步后，修改编译但还是不同步？**

1、检查你的同步地址有没有填错

2、同步功能依赖基础包轮询 pc 的 server。如果你在基础包运行的时候，运行了其他脚本， `Scriptable`  就会终止基础包的进程。<br/>

此时再点击基础包执行同步就好，目前无解，因为 `Scriptable` 只能保持一个脚本在运行。<br/>

虽然可以通过注入同步代码到编译后的脚本来解决，但是会引入额外的代码干扰。本框架遵循一致性原则，编译是啥，同步过去就是啥。<br/>

所见即所得，不额外引入复杂度。即便断开同步也能如期运行。<br/>

<br/>

<br/>

**B、如何停止同步代码？**

代码同步轮询，请求错误到一定次数就会断开，不用手动停止。

<br/>

<br/>

**C、可以用 js 或 jsx 开发吗，without the typescript ？**

可以，只要你的代码在 `./src/index.ts` 引入就能打包。

<br/>

<br/>

**D、为什么小部件偶尔会出现下面这种状况？**

<img src="https://p.pstatp.com/origin/137720002d8f18db2616a" alt="小部件出错" width="480px" />

这种状况是因为 `Scriptable` 内部处理多个小部件异步渲染时没处理好。导致部分小部件渲染为空。([在此可以看到相关讨论](https://talk.automators.fm/t/hellp-call-script-setwidget-to-set-the-content-of-the-widget-run-in-widget/9615/7))

解决方法也很简单，在渲染时最外层加个 await。由于打包器不支持 `top-level-await`，所以本框架内置了一个末尾底部等待的函数 `EndAwait` ，使用方法见下

```tsx
Class HelloWorld {
    async init() {
        ....
    }
    async render() {
        .....
    }
}

// 使用前
// new HelloWorld().init()

// 使用后，这样就不会出现以上状况了
EndAwait(() => new HelloWorld().init())
```

<br/>

<br/>

**E、为什么 jsx widget 是异步渲染？**

为了方便引入网络资源，比如图片，实现 `wimage` 的 src 填写网络连接就能自动加载图片，是需要异步等待的。所以渲染小部件，返回 ListWidget 实例也是异步。

<br/>

<br/>

**F、基础包同步运行时报错，而同步后，直接运行所同步的脚本却没报错？**

可能是基础包版本过旧原因，再扫二维码进引导页重新安装一下基础包即可。

<br/>

<br/>