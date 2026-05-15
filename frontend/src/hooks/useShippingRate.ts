// frontend/src/hooks/useShippingRate.ts
import { GROUND_ADVANTAGE_MATRIX, USPSZone } from "../data/uspsMatrix";

export interface ShippingQuote {
    provider: "USPS";
    service: "Ground Advantage" | "Priority";
    cost: number;
    source: "live" | "offline-fallback";
}

/**
 * Calculates the shipping cost using the local JSON matrix.
 * Used when the device is offline or the USPS API is unreachable.
 */
export const calculateOfflineRate = (
    weightOz: number,
    zone: USPSZone,
): ShippingQuote => {
    // 1. Find all weight tiers in the matrix
    const availableTiers = Object.keys(GROUND_ADVANTAGE_MATRIX)
        .map(Number)
        .sort((a, b) => a - b);

    // 2. Find the lowest tier that fits the package weight
    let targetTier = availableTiers.find((tier) => weightOz <= tier);

    // 3. If it exceeds 15.9oz, cap it to the highest tier for now
    // (We will add Priority Mail logic later!)
    if (!targetTier) {
        targetTier = 15.9;
    }

    // 4. Return the standardized quote object
    return {
        provider: "USPS",
        service: "Ground Advantage",
        cost: GROUND_ADVANTAGE_MATRIX[targetTier][zone],
        source: "offline-fallback",
    };
};
