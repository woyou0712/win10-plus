import service from "@/utils/service.js"

/**
 * --------------------------------------------  储存桶 --------------------------------------------
 */

/**
 * 获取系统设置文件上传临时Key
 */
export function getCosKey(params) {
  return service({
    url: "/system/cos/key",
    method: "get",
    params
  })
}



