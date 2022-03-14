import { ref, reactive } from "vue"
// 获取验证码 , 管理员登录, 获取管理员信息
import { getCode, adminLogin, getAdminUserInfo } from "@/apis/system.js";
import { setToken, setUserInfo } from "@/assets/Token.js";
import router from "@/router/index.js";
import { ElMessage } from "element-plus"
const accountKey = "account";

/**
 * 获取用户信息
 */
function pullUserInfo() {
  getAdminUserInfo().then(res => {
    setUserInfo(res.data)
    setTimeout(() => { isAjax.value = 0; router.push({ path: "/" }) }, 500)
  })
}



export const svg = ref("");
export const isAjax = ref(0);
export const form = reactive({ account: "", password: "", code: "" });
export function initForm() {
  let account = localStorage.getItem(accountKey);
  form.account = account ? account : "";
  form.password = "";
  form.code = "";
};



/**
 * 登录
 */

export function toLogin() {
  if (!form.account || !form.password || !form.code) {
    return ElMessage.error("账号/密码/验证码 请填写完整!")
  }
  if (isAjax.value) { return }
  isAjax.value = 1
  adminLogin(form).then(res => {
    setToken(res.token);
    pullUserInfo()
    localStorage.setItem(accountKey, form.account)
  }).catch(() => {
    pullCode()
    setTimeout(() => {
      isAjax.value = 0;
    }, 500)
  })
}

/**
 * 拉取验证码
 */
export function pullCode() {
  getCode().then(res => {
    svg.value = res.data
  })
}



