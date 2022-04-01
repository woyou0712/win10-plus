const { reactive } = require("vue");
const { getUserInfo } = require("@/utils/Token.js");
const { userAppList } = require("@/apis/system/app.js");

const homeAddrs = []; // 桌面所有的区域列表


export const appIconSize = reactive({ width: 75, height: 75, fontSize: 14, }); // 应用图标大小
export const systemAppAll = reactive([]); // 所有的系统应用
export const systemAppHome = reactive([]); // 桌面显示的系统应用

export const userAppAll = reactive([]); // 所有的用户应用
export const userAppHome = reactive([]); // 桌面显示的用户应用

/**
 * 将桌面切割成网格
 */
export function sliceHome() {
  homeAddrs.splice(0)
  let e = document.getElementById('window-home-app-addrs');
  let width = e.offsetWidth - 10, height = e.offsetHeight - 10;
  let row = parseInt(height / appIconSize.height), col = parseInt(width / appIconSize.width); // 计算行和列数

  // 获取 从上到下从左到右 的所有坐标
  for (let c = 0; c < col; c++) {
    let left = appIconSize.width * c + 5;
    for (let r = 0; r < row; r++) {
      let top = appIconSize.height * r + 5;
      homeAddrs.push({
        left, top
      })
    }
  }
  setSystemAppAddr();
  setUserAppAddr();
};

/**
 * 设置桌面系统应用所在位置
 */
export function setSystemAppAddr() {
  for (var i = 0; i < systemAppHome.length && i < homeAddrs.length; i++) {
    let app = systemAppHome[i];
    app.left = homeAddrs[i].left;
    app.top = homeAddrs[i].top;
  }

}
/**
 * 设置桌面个人应用所在位置
 */
export function setUserAppAddr() {
  // 排列在系统应用之后
  for (var i = systemAppHome.length, n = 0; n < userAppHome.length && i < homeAddrs.length; i++, n++) {
    let app = userAppHome[n];
    app.left = homeAddrs[i].left;
    app.top = homeAddrs[i].top;
  }
}

/**
 * 初始化 角色拥有的 系统应用
 */
function __initSystemApp() {
  // 1. 获取用户角色绑定的系统应用列表
  let user = getUserInfo();
  let systemApps = user.Role.apps ? user.Role.apps : [];
  // 2. 全部储存
  systemAppAll.splice(0, systemAppAll.length, ...systemApps);
  // 3. 单独存储桌面应用列表
  systemAppHome.splice(0);
  for (let item of systemApps) {
    if (item.show_home === 1) {
      systemAppHome.push(item)
    }
  }
}

/**
 * 拉取 个人应用
 */
function __pullUserApp() {
  return new Promise(async (next, error) => {
    try {
      // 1. 获取应用列表
      let { data } = await userAppList()
      userAppAll.splice(0, userAppAll.length, ...data);
      userAppHome.splice(0);
      for (let item of data) {
        if (item.show_home === 1) {
          userAppHome.push(item)
        }
      }
      next()
    } catch (err) {
      error(err)
    }
  })
}
import { pullUserInfo } from "@/utils/Token.js";
export function initAPP() {
  return new Promise(async (next, error) => {
    try {
      await pullUserInfo(); // 初始化 个人信息
      await __pullUserApp(); // 拉取 个人应用
      __initSystemApp(); // 初始化系统应用
      // 切割桌面网格 放置APP
      sliceHome();
      next()
    } catch (err) {
      error(err)
    }
  })

}