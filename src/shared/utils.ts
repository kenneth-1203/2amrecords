export function formatTimeDiff(timestamp: string) {
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
}
