import { FeedbackPayload } from '../models/Feedback';

class FeedbackBuilderClass {

    private payload: Partial<FeedbackPayload> = {};

    withComment(comment: string): FeedbackBuilderClass {
        this.payload.comment = comment;
        return this;
    }

    withRating(rating: number): FeedbackBuilderClass {
        this.payload.rating = rating;
        return this;
    }

    withCaptcha(captchaId: number, captcha: string | number): FeedbackBuilderClass {
        this.payload.captchaId = captchaId;
        this.payload.captcha = captcha;
        return this;
    }

    build(): FeedbackPayload {
        if (this.payload.comment === undefined) {
            throw new Error('FeedbackBuilder: comment is required');
        }
        if (this.payload.rating === undefined) {
            throw new Error('FeedbackBuilder: rating is required');
        }
        if (this.payload.captchaId === undefined || this.payload.captcha === undefined) {
            throw new Error('FeedbackBuilder: captcha is required — call withCaptcha()');
        }
        return this.payload as FeedbackPayload;
    }
}

export function buildFeedback(): FeedbackBuilderClass {
    return new FeedbackBuilderClass();
}
