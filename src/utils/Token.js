import { quitLogin, userInfo } from "@/apis/system/user.js"
import router from "@/router/index.js";
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


function setUserInfo(user) {
  if (user && user.account) {
    user = JSON.stringify(user)
  }
  return sessionStorage.setItem(userInfoKey, user)
}

export function removeInfo() {
  return sessionStorage.removeItem(userInfoKey)
}


export function toQuitLogin() {
  quitLogin().then(() => {
    removeToken();
    removeInfo();
    router.push({ path: "/login" })
  }).catch(() => {
  })
}
import { initWinMenu } from "@/views/Win/option.js";
export function pullUserInfo() {
  return new Promise(async (next, error) => {
    try {
      let { data } = await userInfo();
      setUserInfo(data)
      initWinMenu() // win菜单数据更新
      next(data)
    } catch (err) {
      error(err)
    }
  })
}