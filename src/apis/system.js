import service from "@/assets/service.js"
import { getUserInfo } from "@/assets/Token.js";
/**
 * 登录
 * @param {Object} data 
 * @returns 
 */
export function adminLogin(data) {
  return service({
    url: "/system/user/admin/user/login",
    method: "post",
    data
  })
}

/**
 * 退出登录
 */
export function adminQuitLogin() {
  return service({
    url: "/system/user/admin/user/quit",
    method: "delete"
  })
}


/**
 * 获取验证码
 * @returns 
 */
export function getCode() {
  return service({
    url: "/system/code",
    method: "get"
  })
}
/**
 * 获取用户信息
 * @returns 
 */
export function getAdminUserInfo() {
  return service({
    url: "/system/user/admin/user/info",
    method: "get"
  })
}



/**
 * 获取系统设置文件上传临时Key
 */
export function getSettingsCosKey() {
  let userInfo = getUserInfo()
  if (!userInfo || !userInfo.account) { return console.error("请先登录!") }
  return service({
    url: "/system/cos/systemKey",
    method: "get",
    params: { user_type: userInfo.user_type }
  })
}


/**
 * 添加背景图片
 */
export function systemBgAdd(url) {
  let userInfo = getUserInfo();
  if (!userInfo || !userInfo.account) { return console.error("请先登录!") }
  return service({
    url: "/system/settings/bgAdd",
    method: "post",
    data: { user_type: userInfo.user_type, url }
  })
}

/**
 * 获取背景图片列表
 */
export function systemBgList() {
  let userInfo = getUserInfo();
  if (!userInfo || !userInfo.account) {
    return console.error("未登录!")
  }
  return service({
    url: "/system/settings/bgList",
    method: "get",
    params: { user_type: userInfo.user_type }
  })
}


/**
 * 获取设置信息
 */
export function getSettings() {
  let userInfo = getUserInfo();
  if (!userInfo || !userInfo.account) {
    return console.error("未登录!")
  }
  return service({
    url: "/system/settings/settings",
    method: "get",
    params: { user_type: userInfo.user_type }
  })
}
/**
 * 添加设置信息
 */
export function addSettings(data) {
  let userInfo = getUserInfo();
  if (!userInfo || !userInfo.account) {
    return console.error("未登录!")
  }
  return service({
    url: "/system/settings/settings",
    method: "post",
    data: Object.assign({ user_type: userInfo.user_type }, data)
  })
}


/**
 * 用户列表
 */
export function getUserList(params) {
  let userInfo = getUserInfo();
  if (!userInfo || !userInfo.account) {
    return console.error("未登录!")
  }
  return service({
    url: `/system/user/${userInfo.user_type == 1 ? 'shop' : 'admin'}/user/list`,
    method: "get",
    params
  })
}