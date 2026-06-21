import { APIRequestContext, APIResponse } from '@playwright/test';

export async function get(
    request: APIRequestContext,
    endpoint: string
): Promise<APIResponse> {
    return request.get(endpoint);
}

export async function post(
    request: APIRequestContext,
    endpoint: string,
    payload: object
): Promise<APIResponse> {
    return request.post(endpoint, { data: payload });
}

export async function del(
    request: APIRequestContext,
    endpoint: string,
    token?: string
): Promise<APIResponse> {
    return request.delete(endpoint, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
}
