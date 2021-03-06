/**
 * ---------------------------------------------------  桌面  ---------------------------------------------------
 */
import { reactive } from "vue";

import { systemBgList } from "@/apis/system/settings.js"
import defaultBg from "@/assets/images/bg_1.jpeg"; // 默认背景图片



/**
 * 背景图片列表
 */
export const bgImages = reactive([
  {
    id: 0,
    url: defaultBg
  }
])

/**
 * 背景颜色列表
 */
export const bgColors = [
  { id: 0, color: "#000000" },
  { id: 1, color: "#303133" },
  { id: 2, color: "#636c53" },
  { id: 3, color: "#606266" },
  { id: 4, color: "#909399" },
  { id: 5, color: "#409EFF" },
  { id: 6, color: "#67C23A" },
  { id: 7, color: "#E6A23C" },
  { id: 8, color: "#F56C6C" },
  { id: 9, color: "#1caf5a" }
]

/**
 * 桌面背景样式
 */
export const bgStyle = reactive({
  width: "100%",
  height: "calc(100% - 40px)",
  backgroundImage: "none",
  backgroundColor: "none",
})

// 获取背景列表
export function pullBgList() {
  return new Promise((next, error) => {
    bgImages.splice(1); // 清空基础背景之外的背景图片
    systemBgList().then(res => {
      bgImages.push(...res.data)
      next()
    }).catch(err => {
      error(err)
    })
  })
}



/**
 * 设置背景 
 * @param {Number} bg_type 背景类型： 0:纯色，1:图片
 */
export function setBg({ bg_type, bg_id }) {
  console.log("设置桌面背景")
  let bgList = bg_type == 1 ? bgImages : bgColors, bg = {};
  for (let i = 0; i < bgList.length; i++) {
    if (bgList[i].id == bg_id) {
      bg = bgList[i]
      break
    }
  }
  if (bg_type == 1) {
    bgStyle["backgroundImage"] = `url('${bg.url ? bg.url : ""}')`
  } else {
    bgStyle["backgroundImage"] = "none"
    bgStyle["backgroundColor"] = bg.color;
  }
}

