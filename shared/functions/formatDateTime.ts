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
export function formatTTC(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-GB", options);
}
