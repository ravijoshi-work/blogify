import moment from "moment";

export function formateDateToTime(date?: Date) {
  if (!date) return "";
  const time = moment(date);
  const formattedTime = time.format("MMMM Do YYYY");
  return formattedTime;
}


