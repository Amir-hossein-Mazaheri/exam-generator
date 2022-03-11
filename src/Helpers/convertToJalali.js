import dayjs from "dayjs";
import jalali from "jalaliday";
import "dayjs/locale/fa";

dayjs.extend(jalali);

export function showJalaliTime(time, format = "YYYY/MM/DD HH:mm") {
  return dayjs(time).calendar("jalali").locale("fa").format(format);
}