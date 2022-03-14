<template>
  <div class="system-setting">
    <set-left v-model="menuId" :menusList="menusList">系统</set-left>
    <div class="set-right">
      <div class="list" v-show="menuId == 1">
        <div class="item">
          <div class="th name">名称</div>
          <div class="th id">ID</div>
          <div class="th home">桌面</div>
          <div class="th resize">缩放</div>
          <div class="th permission">权限</div>
        </div>
        <div class="item" v-for="(item, index) in AllApp" :key="index">
          <div v-text="item.name" class="td name"></div>
          <div v-text="item.id" class="td id"></div>
          <div v-text="item.showHome ? '是' : '否'" class="td home"></div>
          <div v-text="item.resize ? '是' : '否'" class="td resize"></div>
          <div
            v-text="item.permission ? item.permission : '公用'"
            class="td permission"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import setLeft from "../components/settingLeft.vue";
export default {
  components: { "set-left": setLeft },
  id: "system-settings", // 应用唯一标识
  permission: null, // 权限标识，为空则表示所有用户可用
  name: "系统", // APP名称
  width: "1000px",
  height: "720px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: true, // 是否显示最大化按钮
  showHome: true, // 是否在桌面显示
  resize: true, // 是否可缩放
  // 应用图标 可以是img标签和svg标签
  icon: `
    <svg
      t="1646989430788"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1794"
      width="100%"
      height="100%"
    >
      <path
        fill="currentColor"
        d="M512 697.6c102.4 0 182.4-83.2 182.4-185.6 0-102.4-83.2-185.6-182.4-185.6-102.4 0-182.4 83.2-182.4 185.6C329.6 614.4 412.8 697.6 512 697.6L512 697.6zM512 646.4c-73.6 0-134.4-60.8-134.4-134.4 0-73.6 60.8-134.4 134.4-134.4 73.6 0 134.4 60.8 134.4 134.4C646.4 585.6 585.6 646.4 512 646.4L512 646.4z"
        p-id="1795"
        fill="#2c2c2c"
      ></path>
      <path
        fill="currentColor"
        d="M249.015232 843.178592c35.2 28.8 73.6 51.2 112 67.2 41.6-38.4 96-60.8 150.4-60.8 57.6 0 108.8 22.4 150.4 60.8 41.6-16 80-38.4 112-67.2-12.8-54.4-3.2-112 22.4-163.2 28.8-48 73.6-86.4 128-102.4 3.2-22.4 6.4-44.8 6.4-67.2 0-22.4-3.2-44.8-6.4-67.2-54.4-16-99.2-54.4-128-102.4-28.8-48-35.2-108.8-22.4-163.2-35.2-28.8-73.6-51.2-112-67.2-41.6 38.4-92.8 60.8-150.4 60.8-54.4 0-108.8-22.4-150.4-60.8-41.6 16-80 38.4-112 67.2 12.8 54.4 3.2 112-22.4 163.2-28.8 48-73.6 86.4-128 102.4-3.2 22.4-6.4 44.8-6.4 67.2 0 22.4 3.2 44.8 6.4 67.2 54.4 16 99.2 54.4 128 102.4C252.215232 731.178592 261.815232 788.778592 249.015232 843.178592M361.015232 958.378592c-54.4-19.2-105.6-48-150.4-89.6-6.4-6.4-9.6-16-6.4-22.4 16-48 9.6-99.2-16-140.8-25.6-44.8-64-73.6-112-83.2-9.6-3.2-16-9.6-16-19.2-6.4-28.8-9.6-60.8-9.6-89.6 0-28.8 3.2-57.6 9.6-89.6 3.2-9.6 9.6-16 16-19.2 48-12.8 89.6-41.6 112-83.2 25.6-44.8 28.8-92.8 16-140.8-3.2-9.6 0-19.2 6.4-22.4 44.8-38.4 96-67.2 150.4-89.6 9.6-3.2 16 0 22.4 6.4 35.2 35.2 80 57.6 128 57.6 48 0 96-19.2 128-57.6 6.4-6.4 16-9.6 22.4-6.4 54.4 19.2 105.6 48 150.4 89.6 6.4 6.4 9.6 16 6.4 22.4-16 48-9.6 99.2 16 140.8 25.6 44.8 64 73.6 112 83.2 9.6 3.2 16 9.6 16 19.2 6.4 28.8 9.6 60.8 9.6 89.6 0 28.8-3.2 57.6-9.6 89.6-3.2 9.6-9.6 16-16 19.2-48 12.8-89.6 41.6-112 83.2-25.6 44.8-28.8 92.8-16 140.8 3.2 9.6 0 19.2-6.4 22.4-44.8 38.4-96 67.2-150.4 89.6-9.6 3.2-16 0-22.4-6.4-35.2-35.2-80-57.6-128-57.6-48 0-96 19.2-128 57.6-3.2 3.2-9.6 6.4-16 6.4C364.215232 958.378592 361.015232 958.378592 361.015232 958.378592z"
        p-id="1796"
        fill="#2c2c2c"
      ></path>
    </svg>
  `,
  setup() {
    const menuId = ref(1),
      menusList = [
        {
          id: 1,
          name: "应用",
        },
      ];
    const { AllApp } = require("@/views/methods/appList.js");
    return {
      menuId,
      menusList, // 左侧菜单列表
      AllApp,
    };
  },
};
</script>

<style lang="scss" scoped>
.system-setting {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 5px 10px;
  .set-right {
    width: calc(100% - 300px);
    height: 100%;
    overflow-y: auto;
    background-image: linear-gradient(
      -45deg,
      #f5f5f5,
      #ffffff,
      #f5f5f5,
      #ffffff,
      #f5f5f5,
      #ffffff,
      #f5f5f5
    );
    padding: 10px 0;
    .list {
      width: 100%;
      padding: 10px 20px;
      overflow: auto;
      .item {
        width: 600px;
        display: flex;
        padding: 5px 10px;
        font-size: 12px;
        .th {
          font-weight: 700;
          font-size: 14px;
        }
        .th.td {
          padding: 0 10px;
        }
        .name {
          width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .id {
          width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .home {
          width: 80px;
          text-align: center;
        }
        .resize {
          width: 80px;
        }
        .permission {
          width: 150px;
          text-align: right;
        }
        .btn-text {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>