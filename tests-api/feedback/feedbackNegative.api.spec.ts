import { test, expect } from '@playwright/test';
import { env } from '../../support/env';
import { createFeedback, deleteFeedback, fetchCaptcha } from '../../api/clients/FeedbackApiClient';
import { assertClientErrorResponse } from '../../api/assertions/FeedbackApiAssertions';
import { buildFeedback } from '../../api/builders/FeedbackBuilder';

test.describe('Feedback API — Negative Tests', () => {

    let adminToken: string;
    const createdIds: number[] = [];

    test.beforeAll(async ({ request }) => {
        const response = await request.post('/rest/user/login', {
            data: {
                email: env.testUserEmail,
                password: env.testUserPassword,
            },
        });
        const body = await response.json();
        adminToken = body.authentication?.token ?? '';
    });

    test.afterAll(async ({ request }) => {
        for (const id of createdIds) {
            await deleteFeedback(request, id, adminToken);
        }
    });

    test('POST with wrong captcha answer is rejected with 401', async ({ request }) => {
        const { captchaId } = await fetchCaptcha(request);

        const payload = buildFeedback()
            .withComment('Valid comment')
            .withRating(4)
            .withCaptcha(captchaId, -9999)
            .build();

        const response = await createFeedback(request, payload);

        await assertClientErrorResponse(response, 401);
    });

    test('[Finding] POST without captcha fields triggers 500 — missing input guard', async ({ request }) => {
        const incompletePayload = { comment: 'Valid comment', rating: 4 };

        const response = await request.post('/api/Feedbacks', { data: incompletePayload });

        // A hardened API should return 400 Bad Request for missing required fields.
        // Juice Shop crashes with a 500 because it tries to look up a captcha that was never provided.
        expect(
            response.status(),
            'Missing captcha fields should return 400 but Juice Shop returns 500'
        ).toBe(500);
    });

    // ─────────────────────────────────────────────────────────────────────────
    // SECURITY FINDINGS — Missing server-side input validation
    //
    // Juice Shop does not enforce these constraints at the API level.
    // The following tests document the actual behavior and serve as regression
    // markers: if any of these start returning 400, validation was added.
    // ─────────────────────────────────────────────────────────────────────────

    test('[Finding] POST with rating below 1 is accepted — validation missing', async ({ request }) => {
        const { captchaId, captcha } = await fetchCaptcha(request);

        const payload = buildFeedback()
            .withComment('Valid comment')
            .withRating(-1)
            .withCaptcha(captchaId, captcha)
            .build();

        const response = await createFeedback(request, payload);
        const body = await response.json();

        expect(
            response.status(),
            'Rating -1 should be rejected (400) but Juice Shop accepts it (201)'
        ).toBe(201);

        createdIds.push(body.data.id);
    });

    test('[Finding] POST with rating above 5 is accepted — validation missing', async ({ request }) => {
        const { captchaId, captcha } = await fetchCaptcha(request);

        const payload = buildFeedback()
            .withComment('Valid comment')
            .withRating(999)
            .withCaptcha(captchaId, captcha)
            .build();

        const response = await createFeedback(request, payload);
        const body = await response.json();

        expect(
            response.status(),
            'Rating 999 should be rejected (400) but Juice Shop accepts it (201)'
        ).toBe(201);

        createdIds.push(body.data.id);
    });

    test('[Finding] POST with empty comment is accepted — validation missing', async ({ request }) => {
        const { captchaId, captcha } = await fetchCaptcha(request);

        const payload = buildFeedback()
            .withComment('')
            .withRating(4)
            .withCaptcha(captchaId, captcha)
            .build();

        const response = await createFeedback(request, payload);
        const body = await response.json();

        expect(
            response.status(),
            'Empty comment should be rejected (400) but Juice Shop accepts it (201)'
        ).toBe(201);

        createdIds.push(body.data.id);
    });

    test('[Finding] POST with oversized comment is accepted — validation missing', async ({ request }) => {
        const { captchaId, captcha } = await fetchCaptcha(request);

        const payload = buildFeedback()
            .withComment('A'.repeat(10001))
            .withRating(4)
            .withCaptcha(captchaId, captcha)
            .build();

        const response = await createFeedback(request, payload);
        const body = await response.json();

        expect(
            response.status(),
            'Comment > 10000 chars should be rejected (400) but Juice Shop accepts it (201)'
        ).toBe(201);

        createdIds.push(body.data.id);
    });

});
