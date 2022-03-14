<template>
  <div class="property">
    <div class="list">
      <div class="item">
        <div class="label">
          <div class="img" v-html="app.icon"></div>
        </div>
        <div class="data">{{ app.name }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">ID：</div>
        </div>
        <div class="data">{{ app.id }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">permission：</div>
        </div>
        <div class="data">{{ app.permission }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">width：</div>
        </div>
        <div class="data">{{ app.width }}</div>
      </div>
      <div class="item">
        <div class="label">
          <div class="text">height：</div>
        </div>
        <div class="data">{{ app.height }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  id: "global-property", // 应用唯一标识
  name: "属性", // APP名称
  width: "400px",
  height: "350px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  props: {
    app: {
      type: Object,
      required: true,
    },
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