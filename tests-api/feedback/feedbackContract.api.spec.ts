import { test, expect } from '@playwright/test';
import { getAllFeedbacks } from '../../api/clients/FeedbackApiClient';
import {
    assertSuccessfulResponse,
    assertFeedbackSchema,
} from '../../api/assertions/FeedbackApiAssertions';

test.describe('Feedback API — Contract Tests', () => {
    test('GET /api/Feedbacks responds with status 200', async ({ request }) => {
        const response = await getAllFeedbacks(request);

        await assertSuccessfulResponse(response);
    });

    test('GET /api/Feedbacks body matches the feedback schema', async ({ request }) => {
        const response = await getAllFeedbacks(request);
        const body = await response.json();

        await assertSuccessfulResponse(response);
        await assertFeedbackSchema(body);
    });

    test('GET /api/Feedbacks returns status "success"', async ({ request }) => {
        const response = await getAllFeedbacks(request);
        const body = await response.json();

        expect(body.status).toBe('success');
    });

    test('GET /api/Feedbacks data is an array', async ({ request }) => {
        const response = await getAllFeedbacks(request);
        const body = await response.json();

        expect(Array.isArray(body.data)).toBe(true);
    });

    test('GET /api/Feedbacks Content-Type is JSON', async ({ request }) => {
        const response = await getAllFeedbacks(request);

        expect(response.headers()['content-type']).toContain('application/json');
    });
});
