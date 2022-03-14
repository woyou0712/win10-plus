<template>
  <div id="window-home" @click="showWin = false">
    <!-- 桌面 -->
    <div v-Rclick="HomeMenu" id="window-home-app-addrs" :style="bgStyle">
      <!-- 应用 -->
      <div
        v-Rclick="AppMenu"
        class="window-home-app-item"
        v-for="(item, index) in HomeApp"
        :key="index"
        :data-key="item.id"
        :style="{
          width: `${appIconSize.width}px`,
          height: `${appIconSize.height}px`,
          fontSize: `${appIconSize.fontSize}px`,
          top: `${item.top}px`,
          left: `${item.left}px`,
        }"
        @dblclick="openApp(item.id)"
      >
        <div class="app-icon" v-html="item.icon"></div>
        <div class="app-name" v-text="item.name"></div>
      </div>
      <!-- Win菜单 -->
      <windows-win />
    </div>
    <!-- 任务栏 -->
    <footer v-Rclick="footMenu" id="window-home-footer" :style="footStyle">
      <!-- win -->
      <div class="app-item" @click.stop="showWin = !showWin">
        <img class="app-icon" :src="WinLogo" />
      </div>
      <!-- 打开的应用 -->
      <div
        class="app-item"
        v-for="(item, index) in openAppList"
        :key="index"
        :class="item.id === topAppId ? 'top' : ''"
        @click="openApp(item.id)"
      >
        <div
          class="app-icon"
          v-html="AppIdMap[item.id] ? AppIdMap[item.id].icon : defaultSvg"
        ></div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getUserInfo } from "@/assets/Token.js";
import { reactive, onMounted } from "vue";
import WinLogo from "@/assets/images/logo.png";
import WindowsWin from "@/components/Win.vue";

export default {
  components: { "windows-win": WindowsWin },
  name: "Home",
  setup() {
    // 用户
    const userInfo = reactive(getUserInfo());

    // 桌面图标网格
    const {
      appIconSize,
      slice,
      HomeApp,
      AllApp,
      AppIdMap,
    } = require("./methods/appList.js");
    // 右键菜单
    const { HomeMenu, AppMenu, footMenu } = require("./methods/Rmenus.js");
    // 打开应用, 已打开的应用，置顶应用
    const { openApp, openAppList, topAppId } = require("./methods/openApp.js");
    // 个性化配置
    const {
      bgStyle,
      footStyle,
      initSettings,
    } = require("./methods/styleSettings.js");
    onMounted(() => {
      initSettings();
    });

    const { showWin } = require("@/components/win.js");

    return {
      userInfo, // 用户信息

      bgStyle, // 背景样式

      footStyle, // 任务栏样式

      HomeMenu, // 桌面右键菜单
      AppMenu, // 应用右键图标
      footMenu, // 任务栏右键菜单
      appIconSize, // 应用图标大小

      openApp, // 打开应用
      openAppList, // 已打开的应用
      topAppId, // 置顶应用

      slice, // 将桌面切割成网格区域
      HomeApp, //桌面应用
      AllApp, // 所有应用
      AppIdMap, // 应用ID映射表
      WinLogo,
      showWin, // 是否显示Win菜单
      defaultSvg,
    };
  },

  mounted() {
    // 切割网格
    this.slice();
    // 监听窗口大小变化
    window.onresize = () => {
      this.slice();
    };
  },
};
const defaultSvg = `
 <svg
      t="1647237790206"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3119"
      width="100%"
      height="100%"
    >
      <path
        fill="currentColor"
        d="M288 640C270.08 640 256 654.08 256 672 256 689.92 270.08 704 288 704 305.92 704 320 689.92 320 672 320 654.08 305.92 640 288 640zM288 256C270.08 256 256 270.08 256 288 256 305.92 270.08 320 288 320 305.92 320 320 305.92 320 288 320 270.08 305.92 256 288 256zM288 448C270.08 448 256 462.08 256 480 256 497.92 270.08 512 288 512 305.92 512 320 497.92 320 480 320 462.08 305.92 448 288 448zM768 64 192 64C121.6 64 64 121.6 64 192l0 576c0 70.4 57.6 128 128 128l576 0c70.4 0 128-57.6 128-128L896 192C896 121.6 838.4 64 768 64zM832 768c0 35.2-28.8 64-64 64L192 832c-35.2 0-64-28.8-64-64L128 192c0-35.2 28.8-64 64-64l576 0c35.2 0 64 28.8 64 64L832 768zM672 256l-256 0C398.08 256 384 270.08 384 288 384 305.92 398.08 320 416 320l256 0C689.92 320 704 305.92 704 288 704 270.08 689.92 256 672 256zM672 448l-256 0C398.08 448 384 462.08 384 480 384 497.92 398.08 512 416 512l256 0C689.92 512 704 497.92 704 480 704 462.08 689.92 448 672 448zM672 640l-256 0C398.08 640 384 654.08 384 672 384 689.92 398.08 704 416 704l256 0c17.92 0 32-14.08 32-32C704 654.08 689.92 640 672 640z"
        p-id="3120"
      ></path>
    </svg>
`;
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