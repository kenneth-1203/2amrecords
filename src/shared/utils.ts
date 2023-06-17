import { Timestamp } from "firebase/firestore";
import { IBagItem } from "./interfaces";

export const formatTimeDiff = (timestamp: string) => {
  const now = Date.now();
  const diffMs = now - new Date(timestamp).getTime();

  // If the time difference is less than a minute, show "just now"
  if (diffMs < 60 * 1000) {
    return "just now";
  }

  // If the time difference is less than an hour, show the number of minutes ago
  if (diffMs < 60 * 60 * 1000) {
    const diffMin = Math.floor(diffMs / (60 * 1000));
    if (diffMin === 1) {
      return `1 minute ago`;
    }
    return `${diffMin} minutes ago`;
  }

  // If the time difference is less than a day, show the number of hours ago
  if (diffMs < 24 * 60 * 60 * 1000) {
    const diffHrs = Math.floor(diffMs / (60 * 60 * 1000));
    return `${diffHrs} hours ago`;
  }

  // Otherwise, show the date and time of the comment
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const removeFileExtension = (fileName: string) => {
  return fileName.replace(/\.(png|jpeg)$/i, "");
};

export const getSizeValue = (size: number) => {
  if (size === 0) return "S";
  if (size === 1) return "M";
  if (size === 2) return "L";
  if (size === 3) return "XL";
};

export const formatDate = (timestamp: Timestamp): string => {
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursFormated = ("0" + hours).slice(-2);
  return `${year}/${month}/${day} ${hoursFormated}:${minutes}:${seconds} ${amPm}`;
};

export const getQuantities = (items: IBagItem[]) => {
  const quantities: { [key: string]: number } = {};

  for (const item of items) {
    if (quantities[item.id]) {
      quantities[item.id] += 1;
    } else {
      quantities[item.id] = 1;
    }
  }

  return Object.entries(quantities).map(([id, quantity]) => ({ id, quantity }));
}