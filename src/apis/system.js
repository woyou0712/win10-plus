import service from "@/utils/service.js"

/**
 * 获取验证码
 * @returns 
 */
 export function getCode() {
  return service({
    url: "/system/code/get",
    method: "get"
  })
}



/**
 * 用户列表
 */
export function getUserList(params) {
  return service({
    url: `/system/user/list`,
    method: "get",
    params
  })
}

