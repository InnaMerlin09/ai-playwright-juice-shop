import { expect } from '@playwright/test';
import { Product, ProductListResponse } from '../models/Product';

export { assertSuccessfulResponse } from './BaseApiAssertions';

export async function assertProductExists(body: ProductListResponse, productName: string): Promise<void> {
    const found = body.data.some((product: Product) => product.name === productName);
    expect(found, `Expected product "${productName}" to exist in results`).toBe(true);
}

export async function assertSearchResultsContain(body: ProductListResponse, searchTerm: string): Promise<void> {
    const allMatch = body.data.every(
        (product: Product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    expect(allMatch, `Expected all results to contain "${searchTerm}" in name or description`).toBe(true);
}

export async function assertEmptyResults(body: ProductListResponse): Promise<void> {
    expect(body.data.length, 'Expected empty results array').toBe(0);
}
