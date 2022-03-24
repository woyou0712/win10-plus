import { ref, reactive } from "vue"
import { Win } from "@/new-dream-plus/index.js"
import appModules from "@/Apps/index.js"; // 引入所有应用


/**
 * 系统应用{id:app}map表
 */
export const appMap = (function () {
  let map = {};
  for (let i = 0; i < appModules.length - 1; i++) {
    let app = appModules[i]["default"]
    map[app.id] = app
  }
  return map
})();

// 所有已经打开的APP
export const openAppList = reactive([]);
// 当前置顶的APPID
export const topAppId = ref(null);

/**
 * 添加打开的应用到底部任务栏
 */
function __appendOpenApp() {
  let openList = [];
  let keys = Object.keys(Win.allMap);
  for (let index = 0; index < keys.length; index++) {
    let item = Win.allMap[keys[index]]
    console.log(item)
    // 如果窗口存在，且是顶级窗口，则添加到打开窗口列表
    if (item && !item.parentId) {
      openList.push(item)
    }
  }
  openAppList.splice(0, openAppList.length, ...openList)
}
/**
 * 有窗口最小化之后，重新计算置顶窗口
 */
function __notMiniTop() {
  let appId = null, zIndex = 0;
  for (let index = 0; index < openAppList.length; index++) {
    let item = openAppList[index];
    // 只计算不是最小化的窗口
    if (item.status !== "mini") {
      if (item.zIndex > zIndex) {
        zIndex = item.zIndex;
        appId = item.id
      }
    }
  }
  topAppId.value = appId
}
/**
 * 应用配置项
 */
function __appOption({ name, type, url, app_id, icon_el }) {
  let option = {
    id: app_id,
    title: name,
    icon: icon_el
  }
  let app = type == 1 ? appMap[app_id] : null;
  if (app) {
    option.width = app.width;
    option.height = app.height;
    option.miniBtn = app.miniBtn;
    option.maxBtn = app.maxBtn;
    option.resize = app.resize;
    option.component = app;
  } else {
    let reg = /^https?:\/\//; // 如果不是以http或者https开头的url，则补全
    if (!reg.test(url)) {
      url = `http://${url}`
    }
    option.url = url
  }
  return option
}


/**
 * 打开应用
 */
export function openApp(option) {
  if (!option) {
    return console.warn("argument is not App"); // 参数不是App元素或者索引
  }
  let newApp = new Win(__appOption(option))
  newApp.onmounted(() => {
    console.log("窗口打开成功")
    __appendOpenApp() // 同步到任务栏
  }).ontop((app) => {
    console.log("置顶APP", app.id)
    topAppId.value = app.id
  }).onmini((app) => {
    console.log("最小化", app.id)
    __notMiniTop(); // 计算去除最小化的置顶窗口
  }).onmax(app => {
    console.log("最大化", app.id)
  }).onclose(app => {
    console.log("关闭", app)
    __appendOpenApp(); // 同步到任务栏
    __notMiniTop(); // 重新计算置顶窗口
  })
  return newApp
}


/**
 * 打开内置应用
 */
export function openSelfApp(option) {
  let newApp = new Win(option)
  newApp.onmounted(() => {
    console.log("窗口打开成功")
    __appendOpenApp(); // 同步到任务栏
  }).ontop((app) => {
    console.log("置顶APP", app.id)
    topAppId.value = app.id;
  }).onmini((app) => {
    console.log("最小化", app.id)
    __notMiniTop(); // 计算去除最小化的置顶窗口
  }).onmax(app => {
    console.log("最大化", app.id)
  }).onclose(app => {
    console.log("关闭", app.id)
    __appendOpenApp(); // 同步到任务栏
    __notMiniTop(); // 重新计算置顶窗口
  })
  return newApp
}

export function setTopApp(win) {
  openApp({ name: win.title, type: win.component ? 1 : 0, url: win.url, app_id: win.id, icon_el: win.icon })
}

/**
 * 关于
 */
import infoMsg from "@/Apps/infoMsg.vue"
export function openInfoMsg(e) {
  let newApp = new Win({
    id: infoMsg.id,
    title: infoMsg.name,
    miniBtn: infoMsg.miniBtn,
    maxBtn: infoMsg.maxBtn,
    resize: infoMsg.resize,
    width: infoMsg.width,
    height: infoMsg.height,
    component: infoMsg,
  })
  newApp.onmounted(() => {
    console.log("窗口打开成功")
    __appendOpenApp(); // 同步到任务栏
  }).ontop((app) => {
    console.log("置顶APP", app.id)
    topAppId.value = app.id;
  }).onmini((app) => {
    console.log("最小化", app.id)
    __notMiniTop(); // 计算去除最小化的置顶窗口
  }).onmax(app => {
    console.log("最大化", app.id)
  }).onclose(app => {
    console.log("关闭", app.id)
    __appendOpenApp(); // 同步到任务栏
  })
  return newApp
}



