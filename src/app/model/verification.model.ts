export class VerificationModel {
    userName: string;
    code: string;

    constructor(public _userName: string, public _code: string) {
        this.userName = _userName;
        this.code = _code;
    }
}