import service from "@/utils/service.js"
/**
 * 登录
 */
export function login(data) {
  return service({
    url: "/system/user/login",
    method: "post",
    data
  })
}

/**
 * 退出登录
 */
export function quitLogin() {
  return service({
    url: "/system/user/quit",
    method: "delete"
  })
}



/**
 * 获取自身信息
 */
export function userInfo() {
  return service({
    url: "/system/user/info",
    method: "get"
  })
}
/**
 * 修改自身信息
 */
export function userEditInfo(data) {
  return service({
    url: "/system/user/editInfo",
    method: "put",
    data
  })

}

/**
 * 修改自身密码
 */
export function userEditPassword(data) {
  return service({
    url: "/system/user/editPassword",
    method: "put",
    data
  })
}



