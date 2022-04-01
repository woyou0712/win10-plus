<template>
  <div class="info-msg">
    <p>此应用由小妖个人开发,敬请指教!</p>
    <p>交流群:666713758</p>
  </div>
</template>

<script>
export default {
  id: "global-window-info-msg", // 应用唯一标识
  name: "关于", // APP名称
  width: "350px",
  height: "130px",
  miniBtn: false, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
};
</script>

<style scoped>
.info-msg {
  color: darkolivegreen;
  padding: 0 20px;
}
</style>