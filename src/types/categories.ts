export interface Review {
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
    date: string;
}

export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: string;
    images: string[];
    reviews: Review[];
    quantity?: number;
    productPrice?: number;
    availabilityStatus: string;
    sku: string;
    tags: string[];
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
    weight: number;
    dimensions: ProductDimensions;
}