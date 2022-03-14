const { reactive } = require("vue");
const homeAddrs = []; // 桌面所有的区域列表


/**
 * 将桌面切割成网格
 */
 function sliceHome() {
  homeAddrs.splice(0)
  let e = document.getElementById('window-home-app-addrs');
  let width = e.offsetWidth - 10, height = e.offsetHeight - 10;
  let row = parseInt(height / appIconSize.height), col = parseInt(width / appIconSize.width); // 计算行和列数

  for (let c = 0; c < col; c++) {
    let left = appIconSize.width * c + 5;
    for (let r = 0; r < row; r++) {
      let top = appIconSize.height * r + 5;
      homeAddrs.push({
        left, top
      })
    }
  }
  initApp()
}

import appModules from "@/Apps/index.js"; // 引入所有应用
import { getUserMenus } from "@/assets/Token.js";
function initApp() {
  // 获取用户权限列表
  let menus = getUserMenus()
  // 设置图标位置
  AllApp.splice(0); // 清空应用
  HomeApp.splice(0); // 清空应用
  for (let i = 0; i < appModules.length && i < homeAddrs.length; i++) {
    let item = appModules[i].default;
    if (isInatall(menus, item)) {
      item = reactive(Object.assign({ top: null, left: null }, item))
      AppIdMap[item.id] = item; // 添加到映射表
      AllApp.push(item); // 添加到APP列表
      // 添加到桌面显示
      if (item.showHome) {
        HomeApp.push(item)
        item.top = homeAddrs[HomeApp.length - 1].top;
        item.left = homeAddrs[HomeApp.length - 1].left;
      }
    } else {
      break
    }
  }
}

/**
 * 用户是否安装APP
 */

function isInatall(menus, app) {
  if (menus.indexOf("*") !== -1) { return true }
  return menus.indexOf(app.permission) !== -1;
}




export const appIconSize = reactive({ width: 75, height: 75, fontSize: 14, }); // 应用图标大小
export const AllApp = reactive([]); // 用户可用的所有应用
export const HomeApp = reactive([]); // 桌面显示的应用
export const AppIdMap = {}; // 应用Map表，id:app 便于快速找到应用
export const slice = sliceHome; // 将桌面切割成网格