export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    deluxePrice: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductListResponse {
    status: string;
    data: Product[];
}
