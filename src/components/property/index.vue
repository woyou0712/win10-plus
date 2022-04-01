<template>
  <div class="property">
    <div class="list">
      <div class="item">
        <div class="label">
          <div class="img" v-html="app.icon_el"></div>
        </div>
        <div class="data">{{ app.name }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">APPID：</div>
        </div>
        <div class="data">{{ app.app_id }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">创建时间：</div>
        </div>
        <div class="data">{{ formatTime(app.create_time) }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">更新时间：</div>
        </div>
        <div class="data">{{ formatTime(app.update_time) }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">应用类型：</div>
        </div>
        <div class="data">{{ app.type == 1 ? "内置组件" : "外部链接" }}</div>
      </div>
      <div class="item" v-if="app.url">
        <div class="label">
          <div class="text">链接地址：</div>
        </div>
        <div class="data">{{ app.url }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import formatTime from "@/utils/formatTime.js";
export default {
  id: "global-system-property", // 应用唯一标识
  name: "属性", // APP名称
  width: "400px",
  height: "370px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  props: {
    app: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return { formatTime };
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