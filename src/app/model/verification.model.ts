export class VerificationModel {
    userName: string;
    code: string;

    constructor(public userName: string, public code: string) {
        this.userName = userName;
        this.code = code;
    }
}