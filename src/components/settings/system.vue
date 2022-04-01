<template>
  <div class="system-setting">
    <set-left v-model="menuId" :menusList="menusList">应用管理</set-left>
    <div class="set-right">
      <system-app-table v-show="menuId == 1" />
      <user-app-table v-show="menuId == 2" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import setLeft from "./leftTable.vue";
import systemAppTable from "./systemApp/table.vue";
import userAppTable from "./userApp/table.vue";

export default {
  components: {
    "set-left": setLeft,
    "system-app-table": systemAppTable,
    "user-app-table": userAppTable,
  },
  id: "system-settings", // 应用唯一标识
  name: "系统", // APP名称
  width: "1000px",
  height: "720px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  setup() {
    const menuId = ref(1),
      menusList = [
        {
          id: 1,
          name: "系统应用",
        },
        {
          id: 2,
          name: "个人应用",
        },
      ];
    return {
      menuId,
      menusList, // 左侧菜单列表
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
  }
}
</style>