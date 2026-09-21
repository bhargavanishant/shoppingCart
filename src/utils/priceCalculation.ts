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

export const getItemsTotalCost = (
    cartItems: { price: number; discountPercentage: number; quantity: number }[]
): number =>
    roundToTwoDecimals(
        cartItems.reduce((sum, item) => {
            const shownPrice = getShowcasedPrice(item.price, item.discountPercentage);
            return sum + shownPrice * item.quantity;
        }, 0)
    );

export const getTaxLevied = (itemsTotalCost: number): number =>
    roundToTwoDecimals(itemsTotalCost * 0.08);

export const getTotalCartCost = (itemsTotalCost: number, taxLevied: number): number =>
    roundToTwoDecimals(itemsTotalCost + taxLevied);