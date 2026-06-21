import { APIRequestContext, APIResponse } from '@playwright/test';
import { FeedbackPayload } from '../models/Feedback';
import { get, post, del } from './BaseApiClient';

const FEEDBACK_ENDPOINT = '/api/Feedbacks';
const CAPTCHA_ENDPOINT = '/rest/captcha';

export async function getAllFeedbacks(request: APIRequestContext): Promise<APIResponse> {
    return get(request, FEEDBACK_ENDPOINT);
}

export async function getFeedbackById(request: APIRequestContext, id: number): Promise<APIResponse> {
    return get(request, `${FEEDBACK_ENDPOINT}/${id}`);
}

export async function createFeedback(request: APIRequestContext, payload: FeedbackPayload): Promise<APIResponse> {
    return post(request, FEEDBACK_ENDPOINT, payload);
}

export async function deleteFeedback(request: APIRequestContext, id: number, token: string): Promise<APIResponse> {
    return del(request, `${FEEDBACK_ENDPOINT}/${id}`, token);
}

export async function fetchCaptcha(request: APIRequestContext): Promise<{ captchaId: number; captcha: string }> {
    const response = await get(request, CAPTCHA_ENDPOINT);
    const body = await response.json();
    return { captchaId: body.captchaId as number, captcha: body.answer as string };
}
