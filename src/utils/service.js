import axios from 'axios';
import { getToken, toQuitLogin } from './Token.js';
import { getUUID } from "./UUID.js";
import { Message } from "@/new-dream-plus"

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分

  // baseURL:  process.env.VUE_APP_BASE_API,
  baseURL: window.WINDOWS_CONFIG.baseUrl,
  // 超时
  timeout: 60000
})

// request拦截器
service.interceptors.request.use(config => {
  let token = getToken();
  if (token) {
    config.headers['token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  let uuid = getUUID();
  config.headers["uuid"] = uuid
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof (value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  if (code === 200) {
    return res.data
  }
  if (code === -1) {
    toQuitLogin()
  }
  Message.error(res.data.msg)
  return Promise.reject('error')
},
  error => {
    console.log('err' + error)
  }
)

export default service
