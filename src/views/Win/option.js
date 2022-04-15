const { toQuitLogin } = require("@/utils/Token.js"); // 退出登录
import { appsIcon, openAppList } from "@/components/settings/appList/open.js"
import { userIcon, openUserInfo } from "@/components/userInfo/open.js"
import { reactive } from "vue";
import { getUserInfo } from "@/utils/Token.js";
export const leftList = reactive([
  {
    name: "退出",
    icon: `<svg
              t="1647152380246"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2194"
              width="200"
              height="200"
            >
              <path
                fill="currentColor"
                d="M662.016 247.6544a32 32 0 1 1 29.4912-56.832 390.4 390.4 0 1 1-359.0144 0 32 32 0 1 1 29.4912 56.832 326.4 326.4 0 1 0 300.032 0zM544 384a32 32 0 1 1-64 0v-256a32 32 0 1 1 64 0v256z"
                p-id="2195"
              />
          </svg>`,
    fn: toQuitLogin
  },
  {
    name: "应用",
    icon: appsIcon,
    fn: openAppList
  },
  {
    name: "用户",
    icon: userIcon,
    fn: openUserInfo
  },
]);

export function initWinMenu() {
  let { picture, account, name } = getUserInfo();
  if (name) {
    leftList[2].name = name
  } else if (account) {
    leftList[2].name = account
  }
  if (picture) {
    leftList[2].icon = `<img class="icon" src="${picture}"/>`;
  }
}