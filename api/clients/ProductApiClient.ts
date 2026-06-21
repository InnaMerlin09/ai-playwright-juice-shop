import { APIRequestContext, APIResponse } from '@playwright/test';
import { get } from './BaseApiClient';

const PRODUCT_ENDPOINT = '/api/Products';
const PRODUCT_SEARCH_ENDPOINT = '/rest/products/search';

export async function getAllProducts(request: APIRequestContext): Promise<APIResponse> {
    return get(request, PRODUCT_ENDPOINT);
}

export async function getProductById(request: APIRequestContext, id: number): Promise<APIResponse> {
    return get(request, `${PRODUCT_ENDPOINT}/${id}`);
}

export async function searchProducts(request: APIRequestContext, query: string): Promise<APIResponse> {
    return get(request, `${PRODUCT_SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}`);
}
