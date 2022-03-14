import { ref, reactive } from "vue";

export const showWin = ref(false)

export const leftList = reactive([
  {
    name: "系统",
    appId: "system-settings"
  },
  {
    name: "用户",
    appId: "system-user-info"
  },
]);
