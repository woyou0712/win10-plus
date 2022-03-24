<template>
  <div class="left-table">
    <div class="title">
      <slot></slot>
    </div>
    <div
      class="left-item"
      v-for="(item, index) in menusList"
      :key="index"
      @click="$emit('update:modelValue', item.id)"
      :class="modelValue === item.id ? 'on' : ''"
    >
      <span v-text="item.name"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menusList: {
      type: Array,
      default() {
        return [];
      }
    },
    modelValue: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  mounted() {
    console.log(this.menusList, this.modelValue);
  }
};
</script>

<style lang="scss" scoped>
.left-table {
  width: 300px;
  height: 100%;
  overflow-y: auto;
  padding: 5px 0;
  background-image: linear-gradient(
    45deg,
    #f5f5f5,
    #f1f1f1,
    #f5f5f5,
    #f1f1f1,
    #f5f5f5,
    #f1f1f1
  );
  .title {
    font-weight: 700;
    padding: 10px;
    cursor: default;
  }
  .left-item {
    padding: 10px 20px;
    color: #444444;
    border-left: 4px solid rgba($color: #000000, $alpha: 0);
    cursor: pointer;
  }
  .left-item.on {
    border-left-color: #409eff;
  }
  .left-item:hover {
    background-color: rgba(220, 220, 220, 0.5);
  }
}
</style>