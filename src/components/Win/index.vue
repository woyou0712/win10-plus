<template>
  <div class="windows-win" :style="winAddr">
    <div class="left">
      <div class="app-list" :style="appListStyel">
        <!-- 退出 -->
        <div class="app-item" @click="quitLogin">
          <div class="icon-box">
            <div class="icon">
              <svg
                t="1647152380246"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2194"
                width="200"
                height="200"
              >
                <path
                  fill="currentColor"
                  d="M662.016 247.6544a32 32 0 1 1 29.4912-56.832 390.4 390.4 0 1 1-359.0144 0 32 32 0 1 1 29.4912 56.832 326.4 326.4 0 1 0 300.032 0zM544 384a32 32 0 1 1-64 0v-256a32 32 0 1 1 64 0v256z"
                  p-id="2195"
                />
              </svg>
            </div>
          </div>
          <div class="name">退出</div>
        </div>
        <div
          class="app-item"
          v-for="(item, index) in leftList"
          :key="index"
          @click="openApp(item.appId)"
        >
          <div class="icon-box">
            <div
              class="icon"
              v-html="appMap[item.appId] && appMap[item.appId].icon"
            ></div>
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="right" :style="footStyle">
      <div
        class="app-item"
        v-for="(item, index) in AllApp"
        :key="index"
        @click="openApp(item.id)"
      >
        <div class="icon" v-html="item.icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const { leftList } = require("./option.js");
    const { winAddr, winLeftListStyle } = require("@/views/methods/setWin.js");
    const { footStyle } = require("@/views/methods/setFooter");
    const { quitLogin } = require("@/utils/Token.js"); // 退出登录
    const { openApp, appMap } = require("@/views/methods/openApp.js");

    return {
      winAddr,
      footStyle,
      winLeftListStyle,
      leftList,
      quitLogin,
      openApp,
      appMap,
    };
  },
  computed: {
    appListStyel() {
      return {
        flexDirection: this.winLeftListStyle.flexDirection,
        backgroundImage: this.footStyle.backgroundImage,
        color: this.footStyle.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.windows-win {
  width: 380px;
  height: 600px;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 4px 0 #aaa;
  z-index: 999999;
  display: flex;
  opacity: 0.95;
  background-color: #ffffff;
  color: #666666;
  .left {
    width: 40px;
    height: 100%;
    .app-list {
      width: 100% !important;
      height: 100% !important;
      display: flex;
      overflow: hidden;
      position: relative;
      z-index: 10;
      transition: 0.3s;
      .app-item {
        width: 160px;
        height: 40px;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        transition: 0.2s;
        .icon-box {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            width: 20px;
            height: 20px;
          }
        }
        .name {
          width: 120px;
          font-size: 16px;
          line-height: 40px;
          overflow: hidden;
        }
      }
      .app-item:hover {
        background-color: rgba($color: #000000, $alpha: 0.3);
      }
    }
    .app-list:hover {
      width: 160px !important;
      box-shadow: 1px 0 2px 0 #aaa;
    }
  }
  .right {
    width: 340px !important;
    height: 100% !important;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    align-content: baseline;
    .app-item {
      width: 90px;
      height: 65px;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      margin-left: 10px;
      transition: 0.3s;
      cursor: pointer;
      .icon {
        width: 50px;
        height: 50px;
        color: #666666;
      }
    }
    .app-item:hover {
      margin-top: 8px;
      box-shadow: 0 3px 6px 0 #aaaaaa;
    }
  }
}
</style>