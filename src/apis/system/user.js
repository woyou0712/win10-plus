import service from "@/assets/service.js"
/**
 * 登录
 * @param {Object} data 
 * @returns 
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
 * 获取用户信息
 * @returns 
 */
export function userInfo() {
  return service({
    url: "/system/user/info",
    method: "get"
  })
}

