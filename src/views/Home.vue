<template>
  <div id="window-home" @click="isShowWin = false">
    <!-- 桌面 -->
    <div v-Rclick="HomeMenu" id="window-home-app-addrs" :style="bgStyle">
      <!-- 系统应用 -->
      <div
        v-Rclick="AppMenu"
        class="window-home-app-item"
        v-for="(item, index) in systemAppHome"
        :key="index"
        :app-key="item.id"
        :app-name="item.name"
        :app-type="item.type"
        :app-url="item.url"
        :app-id="item.app_id"
        :style="{
          width: `${appIconSize.width}px`,
          height: `${appIconSize.height}px`,
          fontSize: `${appIconSize.fontSize}px`,
          top: `${item.top}px`,
          left: `${item.left}px`,
        }"
        @dblclick="openApp(item)"
      >
        <div class="app-icon" v-html="item.icon_el"></div>
        <div class="app-name" v-text="item.name"></div>
      </div>
      <!-- 个人应用 -->
      <div
        v-Rclick="AppMenu"
        class="window-home-app-item"
        v-for="(item, index) in userAppHome"
        :key="index"
        :app-key="item.id"
        :app-name="item.name"
        :app-url="item.url"
        :app-id="item.app_id"
        :style="{
          width: `${appIconSize.width}px`,
          height: `${appIconSize.height}px`,
          fontSize: `${appIconSize.fontSize}px`,
          top: `${item.top}px`,
          left: `${item.left}px`,
        }"
        @dblclick="openApp(item)"
      >
        <div class="app-icon" v-html="item.icon_el"></div>
        <div class="app-name" v-text="item.name"></div>
      </div>
      <!-- Win菜单 -->
      <windows-win v-show="isShowWin" />
    </div>
    <!-- 任务栏 -->
    <footer v-Rclick="footMenu" id="window-home-footer" :style="footStyle">
      <!-- win -->
      <div class="app-item" @click.stop="isShowWin = !isShowWin">
        <img class="app-icon" :src="WinLogo" />
      </div>
      <!-- 打开的应用 -->
      <div
        class="app-item"
        v-for="(item, index) in openAppList"
        :key="index"
        :class="item.id === topAppId ? 'top' : ''"
        @click="setTopApp(item)"
        :title="item.title"
      >
        <div
          class="app-icon"
          v-html="
            allShowAppMap[item.id] ? allShowAppMap[item.id].icon : defaultIcon
          "
        ></div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";
import WindowsWin from "./Win/index.vue";
import WinLogo from "@/assets/images/logo.png";
import { Win } from "@/new-dream-plus/index.js";
import { pullUserInfo } from "@/utils/Token.js";
import { initAPP, sliceHome } from "./methods/setApp.js";
import { initSettings } from "./methods/settingStyle.js";
let sliceHomeTime = null; // 窗口大小变化防抖装置
export default {
  components: { "windows-win": WindowsWin },
  name: "Home",
  setup() {
    /**
     * 应用
     */
    const {
      appIconSize,
      systemAppHome,
      userAppHome,
    } = require("./methods/setApp.js");
    const {
      openApp,
      setTopApp,
      openAppList,
      topAppId,
    } = require("./methods/openApp.js");
    /**
     * 个性化
     */
    // 桌面
    const { bgStyle } = require("./methods/setHome.js");
    // 任务栏
    const { footStyle } = require("./methods/setFooter.js");
    // 右键菜单
    const { HomeMenu, footMenu, AppMenu } = require("./methods/Rmenus.js");

    const isShowWin = ref(false);
    return {
      // 个性化样式
      bgStyle, // 背景样式
      footStyle, // 任务栏样式
      // 桌面应用
      appIconSize, // 应用图标大小
      systemAppHome,
      userAppHome,
      openApp, // 打开应用
      setTopApp, // 置顶应用
      openAppList, // 打开的应用列表
      topAppId, // 当前置顶的APP
      // 右键菜单
      HomeMenu,
      footMenu,
      AppMenu,
      WinLogo,
      isShowWin,
    };
  },
  computed: {
    defaultIcon() {
      return window.WINDOWS_CONFIG.defaultIcon;
    },
    allShowAppMap() {
      return Win.allMap;
    },
  },
  async mounted() {
    // 个性化设置
    await initSettings();
    await initAPP();
    // 监听窗口大小变化 防抖设置
    window.onresize = () => {
      clearTimeout(sliceHomeTime);
      sliceHomeTime = setTimeout(() => {
        sliceHome();
      }, 150);
    };
  },
};
</script>
<style lang="scss" scoped>
#window-home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  #window-home-app-addrs {
    padding: 5px;
    overflow: hidden;
    background-size: 100% 100%;
    position: relative;
    background-color: #444444;
    .window-home-app-item {
      overflow: hidden;
      padding-top: 6px;
      text-align: center;
      border: 1px solid rgba($color: #000000, $alpha: 0);
      transition: 0.1s;
      cursor: pointer;
      position: absolute;
      color: #ffffff;
      .app-icon {
        width: 50%;
        height: 50%;
        overflow: hidden;
        margin: 0 auto;
      }
      .app-name {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 5px;
      }
    }
    .window-home-app-item:hover {
      background-color: rgba($color: #000000, $alpha: 0.3);
      border-color: #ccc;
    }
  }
  #window-home-footer {
    display: flex;
    z-index: 999999;
    background-color: #ffffff;
    color: #666666;
    .app-item {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.2s;
      .app-icon {
        width: 16px;
        height: 16px;
      }
    }
    .app-item.top {
      background-color: rgba($color: #000000, $alpha: 0.2);
    }
    .app-item:hover {
      background-color: rgba($color: #000000, $alpha: 0.4);
    }
  }
}
</style>
<style>
svg.icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
}
.text-btn {
  color: #409eff;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  text-overflow: ellipsis;
}
.text-btn:hover {
  color: #66b1ff;
}
.text-btn + .text-btn {
  margin-left: 10px;
}
</style>