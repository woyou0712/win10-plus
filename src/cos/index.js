import COS from "./cos-js-sdk-v5.min.js"
import { getSettingsCosKey } from "@/apis/system.js"

export function initCos() {
  return new COS({
    getAuthorization: function (options, callback) {
      getSettingsCosKey().then(({ data }) => {
        var credentials = data.credentials;
        console.log(data, credentials)
        if (!data || !credentials) return console.error('credentials invalid');
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
        });
      })
    }
  });
}