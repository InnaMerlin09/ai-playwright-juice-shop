import { expect, APIResponse } from '@playwright/test';

export async function assertSuccessfulResponse(
    response: APIResponse
): Promise<void> {
    expect(
        response.status(),
        `Expected 200 but got ${response.status()}`
    ).toBe(200);
}

export async function assertCreatedResponse(
    response: APIResponse
): Promise<void> {
    expect(
        response.status(),
        `Expected 201 but got ${response.status()}`
    ).toBe(201);
}

export async function assertClientErrorResponse(
    response: APIResponse,
    expectedStatus: number
): Promise<void> {
    expect(
        response.status(),
        `Expected ${expectedStatus} but got ${response.status()}`
    ).toBe(expectedStatus);
}
