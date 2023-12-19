# playMusic

一个音乐播放器,基于网易云音乐api，使用vue3全家桶开发。

## 未完成

- [x] 整体框架搭建，路由设计，布局设计 
- [x] 所有基本界面设计与内容显示
- [x] 登录
- [x] 音乐播放器
- [x] 播放列表
- [x] 视频播放器
- [x] 收藏
- [x] FM电台播放
- [ ] 播放模式
- [ ] 设置
- [ ] 歌词
- [ ] 缓存优化
- [ ] 主题
- [ ] 国际化
- [ ] 打算react重构

## 项目结构

```
├─README.md
├─package.json
├─package-lock.json
├─vite.config.js
├─index.html
├─public
├─src
  ├─api
  ├─assets
  │  ├─css
  │  └─icons
  ├─components
  ├─router
  ├─store
  │  └─plugins
  ├─utils
  └─views

```

## 环境需求

node环境即可,本地v18.16.0,选择与本地相近版本即可

## 项目主要技术栈

- Vue3
- Vue-router
- Vuex

[api接口]: https://github.com/Binaryify/NeteaseCloudMusicApi
[项目参考]: https://github.com/qier222/YesPlayMusic

## 项目初始化

```sh
npm install
```

### 项目运行

```sh
npm run dev
```

### 项目打包

```sh
npm run build
```

