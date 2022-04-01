import service from "@/utils/service.js"
/**
 * --------------------------------------------  个人应用 --------------------------------------------
 */

/**
 * 个人应用列表
 */
export function userAppList() {
  return service({
    url: "/system/userApp/list",
    method: "get"
  })
}
/**
 * 添加个人应用
 */
export function userAppAdd(data) {
  return service({
    url: "/system/userApp/add",
    method: "post",
    data
  })
}
/**
 * 修改个人应用
 */
export function userAppEdit(data) {
  return service({
    url: "/system/userApp/edit",
    method: "put",
    data
  })
}
/**
 * 个人应用是否桌面显示
 */
export function userAppShowHome(id) {
  return service({
    url: `/system/userApp/showHome/${id}`,
    method: "put"
  })
}
/**
 * 删除个人应用
 */
export function userAppDelete(id) {
  return service({
    url: `/system/userApp/delete/${id}`,
    method: "delete"
  })
}

/**
 * 删除桌面快捷方式
 */
 export function userAppShortcut(id) {
  return service({
    url: `/system/userApp/shortcut/${id}`,
    method: "delete",
  })
}


/**
 * --------------------------------------------  系统应用 --------------------------------------------
 */

/**
 * 系统应用列表
 */
export function systemAppList(params) {
  return service({
    url: "/system/app/list",
    method: "get",
    params
  })
}
/**
 * 添加系统应用
 */
export function systemAppAdd(data) {
  return service({
    url: "/system/app/add",
    method: "post",
    data
  })
}
/**
 * 删除系统应用
 */
export function systemAppDelete(id) {
  return service({
    url: `/system/app/delete/${id}`,
    method: "delete"
  })
}
/**
 * 修改系统应用
 */
export function systemAppEdit(data) {
  return service({
    url: `/system/app/edit`,
    method: "put",
    data
  })
}
/**
 * 删除桌面快捷方式
 */
export function systemAppShortcut(id) {
  return service({
    url: `/system/app/shortcut/${id}`,
    method: "delete",
  })
}