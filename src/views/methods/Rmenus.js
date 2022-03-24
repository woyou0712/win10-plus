import getBrowser from "@/new-dream-plus/Win/getBrowser.js";
import { openApp, openInfoMsg } from "./openApp.js";
import { setFooterDirection } from "./setFooter.js"

import { openStyleSetting } from "@/components/settings/style.js"
/**
 * 桌面右键
 */
export const HomeMenu = [

  {
    icon: null,
    name: "全屏",
    fn: function () {
      if (getBrowser() == "ie") {
        alert("当前浏览器不支持该功能,请尝试手动按F11");
        return;
      }
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      }
    }
  },

  {
    icon: null,
    name: "退出全屏",
    fn: function () {
      if (getBrowser() == "ie") {
        alert("当前浏览器不支持该功能,请尝试手动按F11");
        return;
      }
      if (
        !!document.fullscreenElement ||
        !!document.mozFullScreenElement ||
        !!document.webkitFullscreenElement
      ) {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }
  },
  {
    icon: null,
    name: "刷新",
    fn: function () {
      location.reload()
    }
  },
  {
    icon: null,
    name: "个性化",
    fn: openStyleSetting
  },
  {
    icon: null,
    name: "关于",
    fn: function () {
      openInfoMsg()
    }
  },
]


/**
 * 任务栏右键
 */
export const footMenu = [
  {
    icon: null,
    name: "任务栏居上",
    fn: () => {
      setFooterDirection({ footer_direction: 0 })
    }
  },
  {
    icon: null,
    name: "任务栏居右",
    fn: () => {
      setFooterDirection({ footer_direction: 1 })
    }
  },
  {
    icon: null,
    name: "任务栏居下",
    fn: () => {
      setFooterDirection({ footer_direction: 2 })
    }
  },
  {
    icon: null,
    name: "任务栏居左",
    fn: () => {
      setFooterDirection({ footer_direction: 3 })
    }
  },
]




/**
 * 根据APPID查找APP图标
 */
import { systemAppAll, userAppAll } from "./setApp.js"
function __getAppIcon(app_id) {
  for (let item of systemAppAll) {
    if (item.app_id === app_id) {
      return item.icon_el
    }
  }
  for (let item of userAppAll) {
    if (item.app_id === app_id) {
      return item.icon_el
    }
  }
}
/**
 * 应用右键
 */
import { openProperty } from "@/components/property/show.js"
export const AppMenu = [
  {
    icon: null,
    name: "打开",
    fn: (e) => {
      let name = e.getAttribute("app-name"); // 获取APPId
      let type = e.getAttribute("app-type");
      let url = e.getAttribute("app-url");
      let app_id = e.getAttribute("app-id");
      // icon值太长，不适合放在元素属性上，直接从列表中获取
      let icon_el = __getAppIcon(app_id);
      openApp({ name, type, url, app_id, icon_el })
    }
  },
  {
    icon: null,
    name: "属性",
    fn: (e) => {
      let appId = e.getAttribute("app-id");
      openProperty(appId);
    }
  },
]

