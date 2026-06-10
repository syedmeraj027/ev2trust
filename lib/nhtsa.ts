// lib/nhtsa.ts

/**
 * EV2Trust Core Data Engine
 * Interacts with the official, free US Government NHTSA APIs.
 * 100% Free, No API Keys Required.
 */

export interface VehicleDetails {
  vin: string;
  make: string;
  model: string;
  year: string;
  fuelType: string;
  manufacturer: string;
  errorCode: string;
  errorText: string;
  isValid: boolean;
}

export interface RecallResult {
  date: string;
  component: string;
  summary: string;
  remedy: string;
  consequence: string;
}

export interface RecallData {
  count: number;
  results: RecallResult[];
  error?: string;
}

/**
 * Decodes a 17-character VIN using the NHTSA vPIC API.
 */
export async function decodeVIN(vin: string): Promise<VehicleDetails | null> {
  if (!vin || vin.length !== 17) {
    return null;
  }

  try {
    // We use format=json to get a clean JSON response
    const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin.toUpperCase()}?format=json`, {
      // Next.js caching strategy: revalidate every hour so we don't spam the gov API for the same VIN
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error("Failed to connect to NHTSA vPIC database.");
    }

    const data = await response.json();
    
    if (!data.Results || data.Results.length === 0) {
      return null;
    }

    const result = data.Results[0];

    // Check if the API returned an error for this specific VIN
    const errorCode = result.ErrorCode || "";
    // "0" means successful decode. "0 - VIN decoded clean. Check Digit (9th position) is correct"
    const isValid = errorCode.startsWith("0");

    return {
      vin: vin.toUpperCase(),
      make: result.Make || "Unknown Make",
      model: result.Model || "Unknown Model",
      year: result.ModelYear || "Unknown Year",
      fuelType: result.FuelTypePrimary || "Unknown Fuel Type",
      manufacturer: result.Manufacturer || "Unknown Manufacturer",
      errorCode: errorCode,
      errorText: result.ErrorText || "",
      isValid: isValid,
    };
  } catch (error) {
    console.error("VIN Decode Error:", error);
    return null;
  }
}

/**
 * Fetches official safety recalls for a specific Year, Make, and Model.
 */
export async function getVehicleRecalls(year: string, make: string, model: string): Promise<RecallData> {
  if (!year || !make || !model || year === "Unknown Year") {
    return { count: 0, results: [], error: "Missing required vehicle parameters for recall check." };
  }

  try {
    const url = `https://api.nhtsa.gov/recalls/recallsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${encodeURIComponent(year)}`;
    
    const response = await fetch(url, {
      next: { revalidate: 86400 } // Cache recall data for 24 hours
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recall data.");
    }

    const data = await response.json();

    // Map the raw NHTSA response to our clean TypeScript interface
    const results: RecallResult[] = (data.results || []).map((item: any) => ({
      date: item.ReportReceivedDate || "Unknown Date",
      component: item.Component || "General System",
      summary: item.Summary || "No summary provided.",
      remedy: item.Remedy || "No remedy specified.",
      consequence: item.Consequence || "Not specified."
    }));

    return {
      count: data.Count || 0,
      results: results,
    };
  } catch (error) {
    console.error("Recall Fetch Error:", error);
    return { count: 0, results: [], error: "Failed to connect to Recall Database." };
  }
}

/**
 * Master Function: Runs both API calls simultaneously for maximum speed.
 */
export async function getFullVehicleReport(vin: string) {
  const vehicle = await decodeVIN(vin);
  
  if (!vehicle || !vehicle.isValid) {
    return { vehicle, recalls: null };
  }

  // Once we have the Year, Make, and Model, we fetch the recalls
  const recalls = await getVehicleRecalls(vehicle.year, vehicle.make, vehicle.model);

  return {
    vehicle,
    recalls
  };
}