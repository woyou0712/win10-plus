import getBrowser from "@/new-dream-plus/Win/getBrowser.js";
import { openApp, openProperty, openInfoMsg } from "./openApp.js";
import { submitSettings } from "./styleSettings.js"

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
    fn: function () {
      openApp("system-style-settings")
    }
  },
  {
    icon: null,
    name: "关于",
    fn: function () {
      openInfoMsg()
    }
  },
]



export const footMenu = [
  {
    icon: null,
    name: "任务栏居上",
    fn: () => {
      submitSettings({ footer_direction: 0 })
    }
  },
  {
    icon: null,
    name: "任务栏居右",
    fn: () => {
      submitSettings({ footer_direction: 1 })
    }
  },
  {
    icon: null,
    name: "任务栏居下",
    fn: () => {
      submitSettings({ footer_direction: 2 })
    }
  },
  {
    icon: null,
    name: "任务栏居左",
    fn: () => {
      submitSettings({ footer_direction: 3 })
    }
  },
]




export const AppMenu = [
  {
    icon: null,
    name: "打开",
    fn: openApp
  },
  {
    icon: null,
    name: "属性",
    fn: openProperty
  },
]

