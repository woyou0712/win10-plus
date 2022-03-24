import service from "@/assets/service.js"
/**
 * 添加背景图片
 */
export function systemBgAdd(url) {
  return service({
    url: "/system/settings/bgAdd",
    method: "post",
    data: { url }
  })
}

/**
 * 获取背景图片列表
 */
export function systemBgList() {
  return service({
    url: "/system/settings/bgList",
    method: "get",
  })
}


/**
 * 获取设置信息
 */
export function getSettings() {
  return service({
    url: "/system/settings/get",
    method: "get"
  })
}

/**
 * 添加设置信息
 */
export function addSettings(data) {
  return service({
    url: "/system/settings/add",
    method: "post",
    data
  })
}
