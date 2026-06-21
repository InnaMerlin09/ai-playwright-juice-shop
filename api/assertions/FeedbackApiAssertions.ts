import { expect } from '@playwright/test';
import Ajv from 'ajv';
import { Feedback, FeedbackListResponse } from '../models/Feedback';
import feedbackSchema from '../schemas/feedback.schema.json';

export { assertSuccessfulResponse, assertCreatedResponse, assertClientErrorResponse } from './BaseApiAssertions';

const ajv = new Ajv();
const validateFeedbackList = ajv.compile(feedbackSchema);

export async function assertFeedbackSchema(
    body: unknown
): Promise<void> {
    const valid = validateFeedbackList(body);
    if (!valid) {
        throw new Error(
            `Schema validation failed: ${ajv.errorsText(validateFeedbackList.errors)}`
        );
    }
}

export async function assertFeedbackExists(
    body: FeedbackListResponse,
    comment: string
): Promise<void> {
    const found = body.data.some(
        (feedback: Feedback) => feedback.comment === comment
    );
    expect(found, `Expected a feedback with comment "${comment}" to exist`).toBe(true);
}

export async function assertFeedbackNotFound(
    body: FeedbackListResponse,
    id: number
): Promise<void> {
    const found = body.data.some((feedback: Feedback) => feedback.id === id);
    expect(found, `Expected feedback with id ${id} to not exist`).toBe(false);
}
