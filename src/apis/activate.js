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