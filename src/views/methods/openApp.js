import { ref, reactive } from "vue"
import { Win, Message } from "@/new-dream-plus/index.js"
import appModules from "@/Apps/index.js"; // 引入所有应用


/**
 * 系统应用{id:app}map表
 */
export const appMap = (function () {
  let map = {};
  for (let i = 0; i < appModules.length; i++) {
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
function __appendOpenApp(app) {
  if (app.parentId) {
    return
  }
  openAppList.push(app);
}
/**
 * 移除关闭应用
 */
function __removeOpenApp(app) {
  for (let index = 0; index < openAppList.length; index++) {
    let item = openAppList[index];
    // 只计算不是最小化的窗口
    if (item.id === app.id) {
      openAppList.splice(index, 1)
    }
  }
  __notMiniTop()
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
  console.log(appMap)
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
  } else if (!url) {
    return null
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
 * 打开应用（在应用列表的）
 */
export function openApp(option) {
  if (!option) {
    return console.warn("argument is not App"); // 参数不是App元素或者索引
  }
  option = __appOption(option)
  if (!option) {
    Message.error("应用数据异常！")
    return
  }
  let newApp = new Win(option);
  __onApp(newApp);
  return newApp;
}


/**
 * 打开内置应用 (不在应用列表的)
 */
export function openSelfApp(option) {
  let newApp = new Win(option);
  __onApp(newApp);
  return newApp;
}

/**
 * 置顶已经打开的应用
 */
export function setTopApp(win) {
  openApp({ name: win.title, type: win.component ? 1 : 0, url: win.url, app_id: win.id, icon_el: win.icon })
}


/**
 * 监听应用
 */
function __onApp(newApp) {
  newApp.onmounted((app) => {
    console.log("窗口打开成功")
    __appendOpenApp(app) // 同步到任务栏
  }).ontop((app) => {
    console.log("置顶APP", app.id);
    if (app.parentId) { return }
    topAppId.value = app.id;
  }).onmini((app) => {
    console.log("最小化", app.id);
    __notMiniTop(); // 计算去除最小化的置顶窗口
  }).onmax((app) => {
    console.log("最大化", app.id);
  }).onclose((app) => {
    console.log("关闭", app.id);
    __removeOpenApp(app); // 同步到任务栏
  })
}

