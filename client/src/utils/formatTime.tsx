export default function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-NP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
