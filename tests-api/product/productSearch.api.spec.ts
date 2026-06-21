import { test, expect } from '@playwright/test';
import {
    getAllProducts,
    getProductById,
    searchProducts,
} from '../../api/clients/ProductApiClient';
import {
    assertSuccessfulResponse,
    assertProductExists,
    assertSearchResultsContain,
    assertEmptyResults,
} from '../../api/assertions/ProductApiAssertions';
import { ProductListResponse } from '../../api/models/Product';

test.describe('Product API — Search', () => {
    let firstProductId: number;

    test.beforeAll(async ({ request }) => {
        const response = await getAllProducts(request);
        const body: ProductListResponse = await response.json();
        firstProductId = body.data[0].id;
    });

    test('GET /api/Products returns status 200', async ({ request }) => {
        const response = await getAllProducts(request);

        await assertSuccessfulResponse(response);
    });

    test('GET /api/Products returns a non-empty product list', async ({ request }) => {
        const response = await getAllProducts(request);
        const body: ProductListResponse = await response.json();

        await assertSuccessfulResponse(response);
        expect(body.data.length).toBeGreaterThan(0);
    });

    test('GET /api/Products/:id returns the correct product', async ({ request }) => {
        const response = await getProductById(request, firstProductId);
        const body = await response.json();

        await assertSuccessfulResponse(response);
        expect(body.data.id).toBe(firstProductId);
        expect(body.data.name).toBeDefined();
        expect(body.data.price).toBeDefined();
    });

    test('GET /rest/products/search?q=juice returns juice products', async ({ request }) => {
        const response = await searchProducts(request, 'juice');
        const body: ProductListResponse = await response.json();

        await assertSuccessfulResponse(response);
        await assertSearchResultsContain(body, 'juice');
    });

    test('GET /rest/products/search?q=apple returns apple products', async ({ request }) => {
        const response = await searchProducts(request, 'apple');
        const body: ProductListResponse = await response.json();

        await assertSuccessfulResponse(response);
        await assertProductExists(body, 'Apple Juice (1000ml)');
    });

    test('GET /rest/products/search?q=banana returns relevant products', async ({ request }) => {
        const response = await searchProducts(request, 'banana');
        const body: ProductListResponse = await response.json();

        await assertSuccessfulResponse(response);
        await assertSearchResultsContain(body, 'banana');
    });

    test('GET /rest/products/search with unknown term returns empty results', async ({ request }) => {
        const response = await searchProducts(request, 'xyznotaproduct999');
        const body: ProductListResponse = await response.json();

        await assertSuccessfulResponse(response);
        await assertEmptyResults(body);
    });

    test('[Finding] GET /rest/products/search with SQL injection triggers 500 — vulnerability documented', async ({ request }) => {
        const response = await searchProducts(request, "' OR 1=1--");

        // Juice Shop is intentionally vulnerable to SQL injection.
        // A hardened API would return 400 Bad Request with a safe error message.
        // The 500 response and HTML body confirm an unhandled SQL error is leaked.
        expect(
            response.status(),
            'SQL injection should be handled gracefully (400) but triggers a 500 server error'
        ).toBe(500);
    });
});
