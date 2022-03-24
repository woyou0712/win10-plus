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
 * 获取系统设置文件上传临时Key
 */
 export function getSettingsCosKey() {
  return service({
    url: "/system/cos/systemKey",
    method: "get"
  })
}