import { ref, reactive } from "vue"
import { Win } from "@/new-dream-plus/index.js"
import { AppIdMap } from "./appList.js"


/**
 * 添加打开的应用到底部任务栏
 */
function appendOpenApp() {
  let openList = [];
  let keys = Object.keys(Win.allMap);
  for (let index = 0; index < keys.length; index++) {
    let item = Win.allMap[keys[index]]
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
function notMiniTop() {
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
 * 打开应用
 */
export function openApp(e) {
  let appId = null;
  if (e.nodeName === 'DIV') {
    appId = e.getAttribute("data-key"); // 获取APPId
  } else if (e) {
    appId = e
  } else {
    return console.warn("argument is not Element or appId"); // 参数不是App元素或者索引
  }
  console.log(appId)
  let app = AppIdMap[appId]
  console.log(app)
  let newApp = new Win({
    id: app.id,
    title: app.name,
    width: app.width,
    height: app.height,
    miniBtn: app.miniBtn,
    maxBtn: app.maxBtn,
    resize: app.resize,
    component: app,
  })
  newApp.onmounted(() => {
    console.log("窗口打开成功")
    appendOpenApp() // 同步到任务栏
  }).ontop((app) => {
    console.log("置顶APP", app.id)
    topAppId.value = app.id
  }).onmini((app) => {
    console.log("最小化", app.id)
    notMiniTop(); // 计算去除最小化的置顶窗口
  }).onmax(app => {
    console.log("最大化", app.id)
  }).onclose(app => {
    console.log("关闭", app)
    appendOpenApp(); // 同步到任务栏
  })
  return newApp
}


/**
 * 查看属性
 */
import property from "@/Apps/property.vue"
export function openProperty(e) {
  let appId = e.getAttribute("data-key"); // 获取APP下标
  let app = AppIdMap[appId]
  let newApp = new Win({
    id: `property-${app.id}`,
    title: app.name,
    miniBtn: property.miniBtn,
    maxBtn: property.maxBtn,
    resize: property.resize,
    width: property.width,
    height: property.height,
    component: property,
    props: { app }
  })
  newApp.onmounted(() => {
    console.log("窗口打开成功")
    appendOpenApp(); // 同步到任务栏
  }).ontop((app) => {
    console.log("置顶APP", app.id)
    topAppId.value = app.id;
  }).onmini((app) => {
    console.log("最小化", app.id)
    notMiniTop(); // 计算去除最小化的置顶窗口
  }).onmax(app => {
    console.log("最大化", app.id)
  }).onclose(app => {
    console.log("关闭", app.id)
    appendOpenApp(); // 同步到任务栏
  })
  return newApp
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
    appendOpenApp(); // 同步到任务栏
  }).ontop((app) => {
    console.log("置顶APP", app.id)
    topAppId.value = app.id;
  }).onmini((app) => {
    console.log("最小化", app.id)
    notMiniTop(); // 计算去除最小化的置顶窗口
  }).onmax(app => {
    console.log("最大化", app.id)
  }).onclose(app => {
    console.log("关闭", app.id)
    appendOpenApp(); // 同步到任务栏
  })
  return newApp
}



// 所有已经打开的APP
export const openAppList = reactive([]);
// 当前置顶的APPID
export const topAppId = ref(null);