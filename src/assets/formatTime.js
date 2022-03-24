/**日期、时间格式化*/
import Moment from 'moment';
/**
 * @param {Date} date 需要格式化的时间
 * @param {String} formatStr 格式
 * */
function formatTime(date, formatStr) {
  if (!date) {
    date = new Date();
  }
  if (!formatStr) {
    formatStr = "YYYY-MM-DD"
  }
  return Moment(date).format(formatStr);
}


export default formatTime