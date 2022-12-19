export default function useTimeAgo(prevDate) {
  const diff = Number(new Date()) - new Date(prevDate);
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  switch (true) {
    case diff < minute:
      return Math.round(diff / 1000) + "秒前";
    case diff < hour:
      return Math.round(diff / minute) + "分钟前";
    case diff < day:
      return Math.round(diff / hour) + "小时前";
    case diff < month:
      return Math.round(diff / day) + "天前";
    case diff < year:
      return Math.round(diff / month) + "个月前";
    case diff > year:
      return Math.round(diff / year) + "年前";
    default:
      return "";
  }
}
