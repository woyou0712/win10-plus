<template>
  <div class="property">
    <div class="list">
      <div class="item">
        <div class="label">
          <input
            class="img file-selector"
            type="file"
            @change="uploadPicture"
          />
          <img class="img" v-if="userInfo.picture" :src="userInfo.picture" />
          <div class="img" v-else v-html="userIcon"></div>
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

export default {
  id: "system-user-info", // 应用唯一标识
  name: "用户", // APP名称
  width: "400px",
  height: "350px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  setup() {
    const { userIcon } = require("./open.js");
    const {userInfo ,uploadPicture } = require("./setInfo.js");
    return { userInfo, userIcon, uploadPicture };
  },
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
        position: relative;
        .img {
          width: 60px;
          height: 60px;
        }
        .file-selector {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 100;
          opacity: 0;
          cursor: pointer;
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