import { initCos } from "@/cos/index.js";
import { systemBgAdd } from "@/apis/system/settings.js"
const Bucket = 'goods-1256120257';
const Region = 'ap-nanjing';
/**
 * 上传图片
 */
export function uploadImage(file, path) {
  if (!file) return;
  let key = `${path}/${Date.now()}-${file.name}`
  const cos = initCos({ path });
  return new Promise((next, error) => {
    // 分片上传文件
    cos.sliceUploadFile(
      {
        Bucket: Bucket,
        Region: Region,
        Key: key, // 此处的key是上传到储存桶后的文件名称,也是获取临时key的时候后端需要的prefix
        Body: file,
        onHashProgress: function (progressData) {
          console.log('校验中', JSON.stringify(progressData));
        },
        onProgress: function (progressData) {
          console.log('上传中', JSON.stringify(progressData));
        },
      },
      function (err, data) {
        if (err) {
          error(err)
          return console.error(err)
        }
        console.log(data)
        systemBgAdd(`${window.WINDOWS_CONFIG.cosUrl}/${data.Key}`).then(() => {
          next()
        })
      }
    );
  })
}
