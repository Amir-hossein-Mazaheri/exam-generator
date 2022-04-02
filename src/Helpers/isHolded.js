import dayjs from "dayjs";

export default function isHolded(ISOTimeString) {
  const now = dayjs();
  const passedTime = dayjs(ISOTimeString);

  if (now > passedTime) {
    return true;
  }

  return false;
}
