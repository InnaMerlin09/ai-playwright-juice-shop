import { test, expect } from '@playwright/test';
import {
    getAllFeedbacks,
    createFeedback,
    deleteFeedback,
    fetchCaptcha,
} from '../../api/clients/FeedbackApiClient';
import {
    assertSuccessfulResponse,
    assertCreatedResponse,
    assertFeedbackExists,
    assertFeedbackNotFound,
} from '../../api/assertions/FeedbackApiAssertions';
import { buildFeedback } from '../../api/builders/FeedbackBuilder';
import { FeedbackSingleResponse } from '../../api/models/Feedback';

const TEST_COMMENT = 'Excellent service — automated CRUD test';
const TEST_RATING = 5;

test.describe('Feedback API — CRUD', () => {

    let createdFeedbackId: number;
    let adminToken: string;

    test.beforeAll(async ({ request }) => {
        const response = await request.post('/rest/user/login', {
            data: {
                email: process.env.ADMIN_EMAIL ?? 'admin@juice-sh.op',
                password: process.env.ADMIN_PASSWORD ?? 'admin123',
            },
        });
        const body = await response.json();
        adminToken = body.authentication?.token ?? '';
    });

    test('POST /api/Feedbacks creates a new feedback', async ({ request }) => {
        const { captchaId, captcha } = await fetchCaptcha(request);

        const payload = buildFeedback()
            .withComment(TEST_COMMENT)
            .withRating(TEST_RATING)
            .withCaptcha(captchaId, captcha)
            .build();

        const response = await createFeedback(request, payload);
        const body: FeedbackSingleResponse = await response.json();

        await assertCreatedResponse(response);
        expect(body.data.id).toBeDefined();
        expect(body.data.comment).toBe(TEST_COMMENT);
        expect(body.data.rating).toBe(TEST_RATING);

        createdFeedbackId = body.data.id;
    });

    test('GET /api/Feedbacks returns the created feedback', async ({ request }) => {
        test.skip(!createdFeedbackId, 'Skipped: feedback was not created in previous step');

        const response = await getAllFeedbacks(request);
        const body = await response.json();

        await assertSuccessfulResponse(response);
        await assertFeedbackExists(body, TEST_COMMENT);
    });

    test('DELETE /api/Feedbacks/:id removes the feedback', async ({ request }) => {
        test.skip(!createdFeedbackId || !adminToken, 'Skipped: missing id or admin token');

        const deleteResponse = await deleteFeedback(request, createdFeedbackId, adminToken);
        await assertSuccessfulResponse(deleteResponse);

        const listResponse = await getAllFeedbacks(request);
        const body = await listResponse.json();
        await assertFeedbackNotFound(body, createdFeedbackId);
    });

});
