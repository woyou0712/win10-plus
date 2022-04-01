<template>
  <div class="windows-win" :style="winAddr">
    <div class="left">
      <div class="app-list" :style="appListStyel">
        <div
          class="app-item"
          v-for="(item, index) in leftList"
          :key="index"
          @click="item.fn"
        >
          <div class="icon-box">
            <div class="icon" v-html="item.icon"></div>
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="right" :style="footStyle">
      <div
        class="app-item"
        v-for="item in systemAppAll"
        :key="item.id"
        @click="openApp(item)"
      >
        <div class="icon" v-html="item.icon_el"></div>
      </div>
      <div
        class="app-item"
        v-for="item in userAppAll"
        :key="item.id"
        @click="openApp(item)"
      >
        <div class="icon" v-html="item.icon_el"></div>
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

    const { openApp } = require("@/views/methods/openApp.js");
    const { systemAppAll, userAppAll } = require("@/views/methods/setApp.js");
    return {
      // 位置样式
      winAddr,
      winLeftListStyle,
      footStyle,
      // 左侧小菜单
      leftList,
      openApp,
      systemAppAll,
      userAppAll,
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