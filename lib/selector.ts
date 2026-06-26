// Tire Finder logic. Deterministic mapping from simple answers to a
// recommended tire TYPE (a category, never a fabricated brand or price).
// The concierge sources the exact set from the recommendation.

export type Choice = { id: string; label: string; hint?: string; icon: IconKey };
export type Question = { id: QId; title: string; choices: Choice[] };
export type IconKey = "car" | "suv" | "sport" | "ev" | "snow" | "seasons" | "sun" | "rain" | "commute" | "highway" | "track" | "trail";

export type QId = "vehicle" | "climate" | "driving";
export type Answers = Partial<Record<QId, string>>;

export const QUESTIONS: Question[] = [
  {
    id: "vehicle",
    title: "What do you drive?",
    choices: [
      { id: "car", label: "Car / Sedan", icon: "car" },
      { id: "suv", label: "SUV / Truck", icon: "suv" },
      { id: "sport", label: "Sports / Performance", icon: "sport" },
      { id: "ev", label: "Electric (EV)", icon: "ev" },
    ],
  },
  {
    id: "climate",
    title: "Where do you live?",
    choices: [
      { id: "snow", label: "Snow & ice winters", icon: "snow" },
      { id: "seasons", label: "Four seasons", icon: "seasons" },
      { id: "hot", label: "Hot & dry", icon: "sun" },
      { id: "wet", label: "Wet & rainy", icon: "rain" },
    ],
  },
  {
    id: "driving",
    title: "How do you mostly drive?",
    choices: [
      { id: "commute", label: "Daily commute", icon: "commute" },
      { id: "highway", label: "Long highway miles", icon: "highway" },
      { id: "spirited", label: "Spirited / track", icon: "track" },
      { id: "offroad", label: "Off-road / trails", icon: "trail" },
    ],
  },
];

export type Recommendation = {
  type: string;
  tagline: string;
  why: string;
  bestFor: string[];
};

// Order matters — first matching rule wins.
export function recommend(a: Answers): Recommendation {
  const { vehicle, climate, driving } = a;

  if (driving === "offroad") {
    return {
      type: "All-Terrain (A/T)",
      tagline: "Pavement-civil, trail-ready.",
      why: "You leave the pavement, so you need an aggressive but road-friendly tread that bites on dirt, gravel, and snow without punishing you on the highway.",
      bestFor: ["Trails & gravel", "Light snow", "Trucks & SUVs"],
    };
  }

  if (climate === "snow") {
    if (driving === "spirited" || vehicle === "sport") {
      return {
        type: "Winter + Summer set",
        tagline: "The right rubber for each season.",
        why: "Hard winters plus a car you enjoy driving = a dedicated winter set for grip in the cold and a performance set for the rest of the year. Your concierge manages the swap.",
        bestFor: ["Real winters", "Max grip", "Seasonal swaps"],
      };
    }
    return {
      type: "All-Weather (3PMSF)",
      tagline: "One tire, snowflake-rated.",
      why: "You see real snow but want one tire all year. A 3PMSF-rated all-weather tire is severe-snow certified yet livable in summer — no garage full of spares.",
      bestFor: ["Snow & ice", "Year-round", "No swaps"],
    };
  }

  if (driving === "spirited" || (vehicle === "sport" && climate === "hot")) {
    return {
      type: "Max-Performance Summer",
      tagline: "Built to be pushed.",
      why: "Spirited driving in warm, dry conditions calls for a summer performance compound — sharper turn-in, shorter stops, and grip that holds when you ask for it.",
      bestFor: ["Dry grip", "Handling", "Warm climates"],
    };
  }

  if (climate === "wet") {
    return {
      type: "Grand-Touring All-Season",
      tagline: "Confident in the rain, quiet on the highway.",
      why: "Frequent rain rewards a wet-optimized all-season: deep grooves that resist hydroplaning, with the comfort and long tread life of a touring tire.",
      bestFor: ["Wet grip", "Comfort", "Long life"],
    };
  }

  if (vehicle === "suv") {
    return {
      type: "Highway All-Season (H/T)",
      tagline: "Smooth, durable, made for the weight.",
      why: "For a daily SUV or truck, a highway all-season carries the load, runs quiet, and lasts — tuned for road manners, not mud.",
      bestFor: ["SUV / Truck", "Quiet ride", "Durability"],
    };
  }

  if (vehicle === "ev") {
    return {
      type: "EV-optimized All-Season",
      tagline: "Range-friendly and quiet.",
      why: "EVs are heavy and instant-torque — an EV-tuned all-season handles the load, lowers rolling resistance for range, and keeps the cabin quiet.",
      bestFor: ["Extra range", "Low noise", "Heavy torque"],
    };
  }

  // Default: four-seasons commuter / highway
  return {
    type: "Grand-Touring All-Season",
    tagline: "The all-rounder, done right.",
    why: "For everyday driving across changing seasons, a grand-touring all-season is the sweet spot — dependable grip, a comfortable quiet ride, and long tread life.",
    bestFor: ["All seasons", "Comfort", "Long life"],
  };
}
