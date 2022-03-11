import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import jalali from "jalaliday";
import "dayjs/locale/fa";

dayjs.extend(jalali);
dayjs.extend(utc);

export function showJalaliTime(time, format = "YYYY/MM/DD HH:mm") {
  return dayjs(time).calendar("jalali").locale("fa").format(format);
}

export function convertToUTC(time) {
  return dayjs.utc(time).toISOString();
}
