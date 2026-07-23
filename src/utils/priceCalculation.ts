const roundToTwoDecimals = (value: number): number =>
    Number(value.toFixed(2));

export const getShowcasedPrice = (
    price: number,
    discountPercentage: number
): number =>
    roundToTwoDecimals(price * (1 - discountPercentage / 100));

export const getSavings = (
    originalPrice: number,
    showcasedPrice: number
): number =>
    roundToTwoDecimals(originalPrice - showcasedPrice);