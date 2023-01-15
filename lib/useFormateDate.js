function padTo2Digits(nr, len = 2, chr = `0`) {
  return `${nr}`.padStart(2, chr);
}

export default function useFormatDate(passedDate) {
  const date = new Date(passedDate);
  return (
    [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join("-") +
    " " +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(":")
  );
}
