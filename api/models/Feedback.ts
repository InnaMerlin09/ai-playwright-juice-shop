export interface Feedback {
    id: number;
    UserId: number | null;
    comment: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface FeedbackPayload {
    comment: string;
    rating: number;
    captchaId: number;
    captcha: string | number;
}

export interface FeedbackListResponse {
    status: string;
    data: Feedback[];
}

export interface FeedbackSingleResponse {
    status: string;
    data: Feedback;
}
