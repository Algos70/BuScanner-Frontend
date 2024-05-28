import { toast } from "react-toastify";
import { TripsModelKamilKoc } from "../Models/models";

// Convert date from YYYY-MM-DD to DD.MM.YYYY
export function DateToDDMMYYYY(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

export function formatTime(time: string) {
  const formattedArrivalTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedArrivalTime;
}

// calculate the time difference between two times
export function timeDifference(startTime: string, endTime: string): string {
  // Convert start and end times to 24-hour format
  const { hours: startHour, minutes: startMinute } = convertTo24Hour(startTime);
  const { hours: endHour, minutes: endMinute } = convertTo24Hour(endTime);

  // Create date objects for both times, using the same date
  const startDate = new Date(0, 0, 0, startHour, startMinute);
  let endDate = new Date(0, 0, 0, endHour, endMinute);

  // If end time is before start time, assume it spans over midnight
  if (endDate < startDate) {
    endDate = new Date(0, 0, 1, endHour, endMinute); // Move endDate to the next day
  }

  // Calculate the difference in milliseconds
  const diffMs: number = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to minutes
  const diffMinutes: number = Math.floor(diffMs / 60000);

  // Extract hours and minutes
  const hours: number = Math.floor(diffMinutes / 60);
  const minutes: number = diffMinutes % 60;

  return `${hours} h ${minutes} m`;
}

// Convert time from 12-hour format to 24-hour format
function convertTo24Hour(time: string): {
  hours: number;
  minutes: number;
} {
  // eslint-disable-next-line prefer-const
  let [timePart, modifier] = time.split(" ");
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

export function getURLFromMessage(message: string) {
  const urlMatch = message.match(/http:\/\/[^\s]+/);
  const url = urlMatch ? urlMatch[0] : null;
  if (!url) {
    throw new Error("No URL found in message");
  }
  return new URL(url);
}

export function getParamsFromUrl(url: URL) {
  const params = new URLSearchParams(url.search);

  const userId = params.get("userId");
  const code = params.get("code");

  if (!userId || !code) {
    throw new Error("No userId or code found in URL");
  }

  return { userId, code };
}

export function notify(text: string, type: "success" | "error") {
  return type === "success"
    ? toast.success(`${text}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    : toast.error(`${text}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
}

export function getLocalUserInfo() {
  return localStorage.getItem("userInfo");
}

export function getInitials(name: string) {
  const names = name.split(" ");
  return `${names[0][0]}${names[1] ? names[1][0] : ""}`;
}

export function getHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return hash;
}

export function generateBackground(name: string) {
  const hash = getHash(name);
  const hue = ((hash % 360) + 360) % 360; // Ensure hue is within 0-359
  const saturation = 60 + (hash % 20); // Saturation between 60-80
  const lightness = 50 + (hash % 20); // Lightness between 50-70
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function toCamelCase(input: string): string {
  const turkishToEnglishMap: { [key: string]: string } = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    I: "I",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return input
    .split(" ")
    .map((word) =>
      word
        .split("")
        .map((char) => turkishToEnglishMap[char] || char)
        .join("")
    )
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}


export function getEnumKeyByValue<T extends {[key: string]: string}>(enumObj: T, value: string): keyof T | undefined {
  return Object.keys(enumObj).find(key => enumObj[key] === value) as keyof T | undefined;
}


export function formatTimestamp(timestamp : string) {
  const date = new Date(timestamp);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}:${month}:${year} ${hours}:${minutes}`;
}

export function sortTripsByPriceTotal(trips: TripsModelKamilKoc[]): TripsModelKamilKoc[] {
  return trips.sort((a, b) => a.priceTotal - b.priceTotal);
}

export function findCheapestTrip(trips: TripsModelKamilKoc[]): TripsModelKamilKoc | null {
  if (trips.length === 0) return null;
  return trips.reduce((cheapest, trip) => {
    return trip.priceTotal < cheapest.priceTotal ? trip : cheapest;
  }, trips[0]);
}

export function findFastestTrip(trips: TripsModelKamilKoc[]): TripsModelKamilKoc | null {
  if (trips.length === 0) return null;
  return trips.reduce((fastest, trip) => {
    const fastestTime = fastest.hours * 60 + fastest.minutes;
    const tripTime = trip.hours * 60 + trip.minutes;
    return tripTime < fastestTime ? trip : fastest;
  }, trips[0]);
}

export function findBestTimePriceRatioTrip(trips: TripsModelKamilKoc[]): TripsModelKamilKoc | null {
  if (trips.length === 0) return null;
  return trips.reduce((bestTrip, trip) => {
    const bestTripRatio = (bestTrip.hours * 60 + bestTrip.minutes) / bestTrip.priceTotal;
    const tripRatio = (trip.hours * 60 + trip.minutes) / trip.priceTotal;
    return tripRatio < bestTripRatio ? trip : bestTrip;
  }, trips[0]);
}