import { adminQuitLogin } from "../apis/system.js"
import router from "../router/index.js";
const TokenKey = "token";
const userInfoKey = "userInfo"

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}


export function getUserInfo() {
  let user = sessionStorage.getItem(userInfoKey);
  if (user) {
    user = JSON.parse(user)
  } else {
    user = {}
  }
  return user
}


export function setUserInfo(user) {
  if (user && user.account) {
    user = JSON.stringify(user)
  }
  return sessionStorage.setItem(userInfoKey, user)
}

export function removeInfo() {
  return sessionStorage.removeItem(userInfoKey)
}


export function quitLogin() {

  adminQuitLogin().then(() => {
    removeToken();
    removeInfo();
    router.push({ path: "/login" })
  }).catch(() => {
  })
}

export function getUserMenus() {
  let user = getUserInfo()
  return user.menus || []
}