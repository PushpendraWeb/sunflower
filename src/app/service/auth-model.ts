
export class AuthModel {
    Id: number = 0;
    access_token: string = '';
    token_type: string = '';
    expires_in: number = 0;
    refresh_token: string = '';
    expires_time: Date = new Date();
    AccessToken: string = '';
    message: string = '';
    err: string = '';
    roleId: number = 0;
    code: number = 0;
    type: string = '';
}
