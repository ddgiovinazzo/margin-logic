export interface ShippingQuote {
    provider: "USPS";
    service: "Ground Advantage" | "Priority";
    cost: number;
    source: "live" | "offline-fallback";
}
