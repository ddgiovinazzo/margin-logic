const DESIGN_PALETTE = {
    // Core Identity Brands
    PRIMARY_BRAND: "#007bff", // Vibrant brand blue for primary buttons
    PRIMARY_FOCUS: "#0056b3", // Deep accent blue for focused inputs/active items
    PRIMARY_HOVER: "#0069d9", // Slightly darker blue for mouse hover feedback

    // Layout Canvas Surfaces
    CANVAS_BACKGROUND: "#f8f9fa", // Light neutral gray canvas background tint
    SURFACE_CARD: "#ffffff", // Crisp white background for items, forms, and cards
    BORDER_NEUTRAL: "#ced4da", // Subtle gray border stroke line outline

    // Contextual Typography Values
    TEXT_MAIN: "#212529", // Near-black charcoal color for readable body copy
    TEXT_MUTED: "#6c757d", // Faded slate gray color for placeholders and secondary metadata

    // Asynchronous State Signaling Callouts
    SIGNAL_SUCCESS: "#28a745", // Deep forest green for profitable margins/success badges
    SIGNAL_ERROR_BG: "#fff0f0", // Soft pink wash tint for error callout container backdrops
    SIGNAL_ERROR_STROKE: "#ffcccc", // Soft salmon border for error cards
    SIGNAL_ERROR_TEXT: "#c00000", // Deep crimson red for highly legible error message strings
};

Object.freeze(DESIGN_PALETTE); // Make object strictly immutable so properties cannot be altered at runtime
export { DESIGN_PALETTE };
