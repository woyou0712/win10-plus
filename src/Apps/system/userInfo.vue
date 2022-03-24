<template>
  <div class="property">
    <div class="list">
      <div class="item">
        <div class="label">
          <div class="img" v-html="userInfo.icon || defaultSvg"></div>
        </div>
        <div class="data">{{ userInfo.account }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">姓名：</div>
        </div>
        <div class="data">{{ userInfo.name }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">邮箱：</div>
        </div>
        <div class="data">{{ userInfo.email }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">手机：</div>
        </div>
        <div class="data">{{ userInfo.phone }}</div>
      </div>
    </div>
  </div>
</template>

<script>
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
import { getUserInfo } from "@/utils/Token.js";
export default {
  id: "system-user-info", // 应用唯一标识
  name: "用户", // APP名称
  width: "400px",
  height: "350px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  setup() {
    const userInfo = getUserInfo();
    return { userInfo, defaultSvg };
  },
  icon: defaultSvg,
};

</script>

<style lang="scss" scoped>
.property {
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  background-color: #dfdfdf;
  .list {
    background: #f1f1f1;
    height: 100%;
    padding: 10px;
    color: #666666;
    .item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      + .item {
        border-top: 1px solid #808080;
      }
      .label {
        width: 120px;
        .img {
          width: 60px;
          height: 60px;
        }
        .text {
          padding-left: 10px;
        }
      }
      .data {
        width: calc(100% - 120px);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>