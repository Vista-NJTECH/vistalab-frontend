export default function useTimeAgo(prevDate) {
  const diff = Number(new Date(prevDate) - new Date());
  if (diff < 0) return 0;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  switch (true) {
    case diff < minute:
      return Math.round(diff / 1000) + "秒";
    case diff < hour:
      return Math.round(diff / minute) + "分钟";
    case diff < day:
      return Math.round(diff / hour) + "小时";
    case diff < month:
      return Math.round(diff / day) + "天";
    case diff < year:
      return Math.round(diff / month) + "个月";
    case diff > year:
      return Math.round(diff / year) + "年";
    default:
      return "";
  }
}
