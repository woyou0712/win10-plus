import { reactive } from "vue";
import { systemBgAdd, systemBgList, getSettings, addSettings } from "@/apis/system.js"

import defaultBg from "@/assets/images/bg_1.jpeg" // 默认背景图片
import { initCos } from "@/cos/index.js"



/**
 * ----------------------------------------------------- 缓存 -----------------------------------------------------
 * ----------------------------------------------------- 缓存 -----------------------------------------------------
 * ----------------------------------------------------- 缓存 -----------------------------------------------------
 * ----------------------------------------------------- 缓存 -----------------------------------------------------
 * ----------------------------------------------------- 缓存 -----------------------------------------------------
 */
const showBgTypeKey = 'showBgType', showBgIdKey = "showBgId", footDirectionKey = "footDirection", footerBgIdKey = "footerBgId";
/**
 * 补全缺省值
 */
const defaultSettings = { bg_type: 0, bg_id: 0, footer_direction: 2, footer_bg_id: 0 }; // 配置项缺省值
function appendDefault(settings) {
  if (!settings.bg_type && settings.bg_type !== 0) {
    settings.bg_type = defaultSettings.bg_type
  }
  if (!settings.bg_id && settings.bg_id !== 0) {
    settings.bg_id = defaultSettings.bg_id
  }
  if (!settings.footer_direction && settings.footer_direction !== 0) {
    settings.footer_direction = defaultSettings.footer_direction
  }
  if (!settings.footer_bg_id && settings.footer_bg_id !== 0) {
    settings.footer_bg_id = defaultSettings.footer_bg_id
  }
}


/**
 * 获取本地缓存的设置
 */
function pullSettings() {
  let bg_type = localStorage.getItem(showBgTypeKey);
  let bg_id = localStorage.getItem(showBgIdKey);
  let footer_direction = localStorage.getItem(footDirectionKey);
  let footer_bg_id = localStorage.getItem(footerBgIdKey);
  return { bg_type, bg_id, footer_direction, footer_bg_id }
}



/** 
 * -----------------------------------------------------  背景 ----------------------------------------------------- 
 * -----------------------------------------------------  背景 ----------------------------------------------------- 
 * -----------------------------------------------------  背景 ----------------------------------------------------- 
 * -----------------------------------------------------  背景 ----------------------------------------------------- 
 * -----------------------------------------------------  背景 ----------------------------------------------------- 
 * */
// 获取背景列表
function pullBgList() {
  return new Promise((next, error) => {
    bgImages.splice(1); // 清空缓存之外的背景
    systemBgList().then(res => {
      bgImages.push(...res.data)
      next(bgImages)
    }).catch(err => {
      error(err)
    })
  })
}

const cos = initCos()
const Bucket = 'goods-1256120257';
const Region = 'ap-nanjing';
/**
 * 上传背景图片
 */
export function uploadImage(e) {
  let el = e.target
  var file = el.files[0];
  if (!file) return;
  let prefix = `${Date.now()}-${file.name}`
  // 分片上传文件
  cos.sliceUploadFile(
    {
      Bucket: Bucket,
      Region: Region,
      Key: `system/settings/${prefix}`, // 此处的key是上传到储存桶后的文件名称,也是获取零时key的时候后端需要的prefix
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
        return console.error(err)
      }
      systemBgAdd(`${window.WINDOWS_CONFIG.cosUrl}/${data.Key}`).then(() => {
        el.value = null
        pullBgList()
      })
    }
  );

}

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
export const bgColors = reactive([
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
])

/**
 * 桌面背景样式
 */
export const bgStyle = reactive({
  width: "100%",
  height: "calc(100% - 40px)",
  backgroundImage: "none",
  backgroundColor: "none",
})

/**
 * 设置背景
 * @param {*} param0 修改的属性
 */
function setBg({ bg_type, bg_id }) {
  console.log("设置桌面背景")
  let bgList = bg_type == 1 ? bgColors : bgImages, bg = {};
  for (let i = 0; i < bgList.length; i++) {
    if (bgList[i].id == bg_id) {
      bg = bgList[i]
      break
    }
  }
  if (bg_type == 1) {
    bgStyle["backgroundImage"] = "none"
    bgStyle["backgroundColor"] = bg.color
  } else {
    bgStyle["backgroundImage"] = `url(${bg.url ? bg.url : ""})`
  }
}


/** 
 * -----------------------------------------------------  任务栏 ----------------------------------------------------- 
 * -----------------------------------------------------  任务栏 ----------------------------------------------------- 
 * -----------------------------------------------------  任务栏 ----------------------------------------------------- 
 * -----------------------------------------------------  任务栏 ----------------------------------------------------- 
 * -----------------------------------------------------  任务栏 ----------------------------------------------------- 
 * */

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
 * 任务栏背景列表
 */
export const footBgColors = reactive([
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
])


/**
 * 设置任务栏方向
 */
import { slice } from "./appList.js";
function setFooterDirection({ footer_direction }) {
  console.log("设置任务栏方向")
  let box = document.getElementById("window-home");
  switch (parseInt(footer_direction)) {
    case 0:
      box.style["flex-direction"] = "column-reverse"
      bgStyle.width = "100%";
      bgStyle.height = "calc(100% - 40px)";
      footStyle.width = "100%";
      footStyle.height = "40px";
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
  setWinAddr(footer_direction)
  slice(); // 重新计算切割桌面网格
}
/**
 * 设置任务栏背景颜色
 */
function setFooterColor({ footer_bg_id }) {
  console.log("设置任务栏主题颜色")
  for (let i = 0; i < footBgColors.length; i++) {
    if (footBgColors[i].id == footer_bg_id) {
      footStyle.backgroundImage = footBgColors[i].bg;
      footStyle.color = footBgColors[i].color;
      return
    }
  }

}


/** 
 * ----------------------------------------------------- win窗口位置 -----------------------------------------------------
 * ----------------------------------------------------- win窗口位置 -----------------------------------------------------
 * ----------------------------------------------------- win窗口位置 -----------------------------------------------------
 * ----------------------------------------------------- win窗口位置 -----------------------------------------------------
 * ----------------------------------------------------- win窗口位置 -----------------------------------------------------
 * */
/**
 * 窗口位置
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
function setWinAddr(footDirection) {
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



/** 
 * ----------------------------------------------------- 提交设置 -----------------------------------------------------
 * ----------------------------------------------------- 提交设置 -----------------------------------------------------
 * ----------------------------------------------------- 提交设置 -----------------------------------------------------
 * ----------------------------------------------------- 提交设置 -----------------------------------------------------
 * ----------------------------------------------------- 提交设置 -----------------------------------------------------
 * */

/**
 *  提交设置 
 * @param {*} param0 新的属性
 * @param {*} updateView 强制更新视图界面
 */
export function submitSettings({ bg_type, bg_id, footer_direction, footer_bg_id }, updateView) {

  let Set = pullSettings(), updateBg = false, updateFooterDirection = false, updateFooterColor = false;
  // 新的属性存在 并且 和缓存的属性不一样 则 储存
  // 背景 
  if ((bg_type || bg_type === 0) && bg_type != Set.bg_type || updateView) {
    updateBg = true;
    Set.bg_type = bg_type;
    localStorage.setItem(showBgTypeKey, bg_type);
  }
  if ((bg_id || bg_id === 0) && bg_id != Set.bg_id || updateView) {
    updateBg = true;
    Set.bg_id = bg_id;
    localStorage.setItem(showBgIdKey, bg_id);
  }
  // 任务栏
  if ((footer_direction || footer_direction === 0) && footer_direction != Set.footer_direction || updateView) {
    updateFooterDirection = true;
    Set.footer_direction = footer_direction;
    localStorage.setItem(footDirectionKey, footer_direction);
  }
  if ((footer_bg_id || footer_bg_id === 0) && footer_bg_id != Set.footer_bg_id || updateView) {
    updateFooterColor = true;
    Set.footer_bg_id = footer_bg_id;
    localStorage.setItem(footerBgIdKey, footer_bg_id);
  }
  return new Promise(async (next, error) => {
    if (!updateBg && !updateFooterDirection && !updateFooterColor) { return next(false) }; //没有更新
    if (updateBg) { setBg(Set) }; // 设置背景
    if (updateFooterDirection) { setFooterDirection(Set) }; // 设置任务栏方向
    if (updateFooterColor) { setFooterColor(Set) }; // 设置任务栏主题

    addSettings(Set).then(() => { next(true) }).catch(error)
  })

}


/**
 * 初始化设置
 */
export function initSettings() {
  return new Promise(async (next, error) => {
    try {
      // 拉取背景图片列表
      await pullBgList();
      let settings = (await getSettings()).data;
      if (!settings || !settings.id) {
        settings = pullSettings(); // 尝试获取缓存
      }
      // 补全默认缺省值
      appendDefault(settings);
      // 提交设置
      submitSettings(settings, true)
      next()
    } catch (err) {
      error(err)
    }
  })
}










