import getBrowser from "@/new-dream-plus/Win/getBrowser.js";
import { Message } from "@/new-dream-plus";
import { openApp } from "./openApp.js";
import { openInfoMsg, msgIcon } from "@/components/infoMsg/open.js"
import { setFooterDirection } from "./setFooter.js"

import { openStyleSetting, styleIcon } from "@/components/settings/style.js"
import { openAddUserApp, appIcon } from "@/components/settings/userApp/openAdd.js"

/**
 * 桌面右键
 */
export const HomeMenu = [
  {
    icon: appIcon,
    name: "新建应用",
    fn: () => {
      openAddUserApp({
        submit: (form) => {

        }
      })
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
    icon: styleIcon,
    name: "个性化",
    fn: openStyleSetting
  },
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
    icon: msgIcon,
    name: "关于",
    fn: openInfoMsg
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
import { systemAppShortcut, userAppShortcut } from "@/apis/system/app.js";
import { initAPP } from "./setApp.js";
import { openProperty } from "@/components/property/open.js";
export const AppMenu = [
  {
    icon: null,
    name: "打开",
    fn: (e) => {
      let name = e.getAttribute("app-name");
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
    name: "删除桌面快捷方式",
    fn: (e) => {
      let id = e.getAttribute("app-key");
      let type = e.getAttribute("app-type"); // 存在则是系统应用，否则为个人应用
      let api = type || type === 0 ? systemAppShortcut : userAppShortcut;
      api(id).then(async () => {
        new Message("删除成功");
        await initAPP()
      })
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

