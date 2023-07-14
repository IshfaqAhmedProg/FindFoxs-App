import { Timestamp } from "firebase/firestore";

export function formatDate(date: Date): string {
  const day = date?.getDate();
  const month = date?.toLocaleString("default", { month: "short" });
  const year = date?.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}`;
}

export function formatTime(date: Date): string {
  let hours = date?.getHours();
  const minutes = date?.getMinutes().toString().padStart(2, "0");
  const seconds = date?.getSeconds().toString().padStart(2, "0");

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes}:${seconds} ${period}`;
}
export function calculateTTC(endTime: Date, startTime: Date) {
  const durationInMilliseconds = endTime.getTime() - startTime.getTime();
  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedDuration;
}
