/**
 * ------------------------------------------------------- 个性化设置 -------------------------------------------------------
 */
import { getSettings, addSettings } from "@/apis/system/settings.js"
// 配置项缺省值
const defaultSettings = { bg_type: 1, bg_id: 0, footer_direction: 2, footer_bg_id: 0 };
/**
 * 初始化设置
 */
import { pullBgList } from "./setHome.js"
export function initSettings() {
  return new Promise(async (next, error) => {
    try {
      // 拉取背景图片列表
      await pullBgList();
      let settings = (await getSettings()).data;
      // 如果没有设置信息
      if (!settings || !settings.id) {
        settings = defaultSettings; // 使用默认值
        submitSettings(settings); // 提交保存默认值
      }
      // 更新视图
      setStyle(settings, 1);
      next()
    } catch (err) {
      error(err)
    }
  })
}

/**
 * 视图更新
 */
import { setBg } from "./setHome.js"
import { setFooterDirection, setFooterColor } from "./setFooter.js"
export function setStyle(option, isInit) {
  console.log(isInit)
  let { bg_type, bg_id, footer_direction, footer_bg_id } = option;
  // 设置背景
  if ((bg_type || bg_type === 0) && (bg_id || bg_id === 0)) {
    setBg({ bg_type, bg_id })
  }
  // 设置任务栏方向
  if (footer_direction || footer_direction === 0) {
    setFooterDirection({ footer_direction })
  }
  // 设置任务栏主题颜色
  if (footer_bg_id || footer_bg_id === 0) {
    setFooterColor({ footer_bg_id })
  }
  // 如果不是初始化，则保存到服务器
  if (!isInit) {
    submitSettings(option)
  }
}


/**
 *  提交设置 保存到服务器
 */
function submitSettings(option) {
  return new Promise((next, error) => {
    addSettings(option).then(() => { next(true) }).catch(error)
  })
}


