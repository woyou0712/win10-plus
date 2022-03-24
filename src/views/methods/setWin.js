import { reactive } from "vue"
/**
 * ---------------------------------------------------  WIN窗口  ---------------------------------------------------
 */

/**
 * win窗口位置
 */
export const winAddr = reactive({
  top: "inherit",
  left: "0",
  bottom: "0",
  right: "inherit"
})
/**
 * 窗口左侧小菜单
 */
export const winLeftListStyle = reactive({
  flexDirection: "column-reverse"
})


/**
 * 设置win窗口位置
 */
export function setWinAddr(footDirection) {
  switch (String(footDirection)) {
    case '0':
      winAddr.top = "0"
      winAddr.left = "0"
      winAddr.bottom = "inherit"
      winAddr.right = "inherit"
      winLeftListStyle.flexDirection = "column"
      return;
    case '1':
      winAddr.top = "0"
      winAddr.left = "inherit"
      winAddr.bottom = "inherit"
      winAddr.right = "0"
      winLeftListStyle.flexDirection = "column"
      return;
    case '2':
      winAddr.top = "inherit"
      winAddr.left = "0"
      winAddr.bottom = "0"
      winAddr.right = "inherit"
      winLeftListStyle.flexDirection = "column-reverse"
      return;
    case '3':
      winAddr.top = "0"
      winAddr.left = "0"
      winAddr.bottom = "inherit"
      winAddr.right = "inherit"
      winLeftListStyle.flexDirection = "column"
      return;
  }
}