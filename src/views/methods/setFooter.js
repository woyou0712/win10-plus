import { reactive } from "vue"
import { bgStyle } from "./setHome.js"
/**
 * ---------------------------------------------------  任务栏  ---------------------------------------------------
 */
/**
 * 任务栏背景列表
 */
export const footBgColors = [
  {
    id: 0,
    bg: "linear-gradient(-45deg,#222222,#292929,#222222,#292929,#222222,#292929,#222222,#292929,#222222)",
    color: "#FFFFFF"
  },
  {
    id: 1,
    bg: "linear-gradient(-45deg,#D1D1D1,#F6F6F6,#D1D1D1,#F6F6F6,#D1D1D1,#F6F6F6,#D1D1D1,#F6F6F6,#D1D1D1)",
    color: "#444444"
  },
  {
    id: 2,
    bg: "linear-gradient(-45deg,#409EFF,#53a8ff,#409EFF,#53a8ff,#409EFF,#53a8ff,#409EFF,#53a8ff,#409EFF)",
    color: "#FFFFFF"
  },
  {
    id: 3,
    bg: "linear-gradient(-45deg,#67C23A,#aedb96,#67C23A,#aedb96,#67C23A,#aedb96,#67C23A,#aedb96,#67C23A)",
    color: "#444444"
  },
  {
    id: 4,
    bg: "linear-gradient(-45deg,#F56C6C,#E6A23C,#F56C6C,#E6A23C,#F56C6C,#E6A23C,#F56C6C,#E6A23C,#F56C6C)",
    color: "#FFFFFF"
  },
]
/**
 * 任务栏样式
 */
export const footStyle = reactive({
  width: "100%",
  height: "40px",
  "flex-direction": "row",
  backgroundImage: "none",
  color: "none",
})

/**
 * 设置任务栏方向
 */
import { sliceHome } from "./setApp.js";
import { setWinAddr } from "./setWin.js"
export function setFooterDirection({ footer_direction }) {
  console.log("设置任务栏方向")
  let box = document.getElementById("window-home");
  switch (parseInt(footer_direction)) {
    case 0:
      box.style["flex-direction"] = "column-reverse"
      bgStyle.width = "100%";
      bgStyle.height = "calc(100% - 40px)";
      footStyle.width = "100%";
      footStyle.height = "40px";
      footStyle["flex-direction"] = "row"
      break
    case 1:
      box.style["flex-direction"] = "row"
      bgStyle.width = "calc(100% - 40px)";
      bgStyle.height = "100%";
      footStyle.width = "40px";
      footStyle.height = "100%";
      footStyle["flex-direction"] = "column"
      break
    case 2:
      box.style["flex-direction"] = "column"
      bgStyle.width = "100%";
      bgStyle.height = "calc(100% - 40px)";
      footStyle.width = "100%";
      footStyle.height = "40px";
      footStyle["flex-direction"] = "row"
      break
    case 3:
      box.style["flex-direction"] = "row-reverse"
      bgStyle.width = "calc(100% - 40px)";
      bgStyle.height = "100%";
      footStyle.width = "40px";
      footStyle.height = "100%";
      footStyle["flex-direction"] = "column"
      break
  }
  sliceHome(); // 重新计算切割桌面网格
  setWinAddr(footer_direction); // 设置WIN窗口位置
}
/**
 * 设置任务栏背景颜色
 */
export function setFooterColor({ footer_bg_id }) {
  console.log("设置任务栏主题")
  for (let i = 0; i < footBgColors.length; i++) {
    if (footBgColors[i].id == footer_bg_id) {
      footStyle.backgroundImage = footBgColors[i].bg;
      footStyle.color = footBgColors[i].color;
      return
    }
  }
}
