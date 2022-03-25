import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import jalali from "jalaliday";
import fa_IR from "dayjs/esm/locale/fa";

dayjs.extend(jalali);
dayjs.extend(utc);

dayjs.calendar("jalali");

export function showJalaliTime(time, format = "YYYY/MM/DD HH:mm") {
  return dayjs(time).locale(fa_IR).format(format);
}

export function convertToUTC(time) {
  return dayjs.utc(time).toISOString();
}

export function convertToJalaliDayJS(time) {
  return dayjs(dayjs(time).locale(fa_IR).format("YYYY-MM-DD"), {
    jalali: true,
  });
}
