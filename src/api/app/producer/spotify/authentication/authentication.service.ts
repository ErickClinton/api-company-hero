import { HttpException, Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { HttpStatusCode } from "axios";
import { RequestLoginDto } from "./dto/request-login.dto";
import { ResponseAuthenticationContract } from "./contract/response-authentication.contract";
import { HandleHttpError } from "../../../shared/utils/handleHttpError";

@Injectable()
export class AuthenticationService {
    private readonly logger = new Logger(AuthenticationService.name);
    private readonly baseUrl = "https://accounts.spotify.com/api/token";
    private readonly grantType = "client_credentials";
    private readonly apiClientIdSpotify = process.env.API_CLIENT_ID_SPOTIFY;
    private readonly apiClientSecret = process.env.API_CLIENT_SECRET;
    public token: string;

    constructor(private readonly httpService: HttpService) {}

    public async setToken(): Promise<void> {
        try {
            this.logger.log(`Start service setToken`);

            const loginParams = this.createRequestLogin();
            const observable = this.httpService.post(this.baseUrl, loginParams, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            const response: ResponseAuthenticationContract = await firstValueFrom(observable)
                .then((res) => res.data)
                .catch((err) => {
                    throw new HttpException(JSON.stringify(err), HttpStatusCode.BadRequest);
                });

            const token = response.access_token;
            this.token = token;
            this.logger.log(`End service setToken - Response - ${JSON.stringify({ token })}`);
        } catch (error) {
            this.logger.error(`Error service setToken - Error - ${JSON.stringify({ error })}`);
            throw HandleHttpError.return(error);
        }
    }

    public async getToken(): Promise<string> {
        this.logger.log("Start service getToken");
        if (!this.token) {
            await this.setToken();
        }
        this.logger.log(`End service getToken - Response - ${this.token}`);
        return this.token;
    }

    private createRequestLogin(): RequestLoginDto {
        try {
            this.logger.log(`Start service createRequestLogin `);
            const loginRequest = new RequestLoginDto();
            loginRequest.grant_type = this.grantType;
            loginRequest.client_secret = this.apiClientSecret;
            loginRequest.client_id = this.apiClientIdSpotify;

            this.logger.log(`End service createRequestLogin - Response - ${JSON.stringify({ loginRequest })}`);
            return loginRequest;
        } catch (error) {
            this.logger.error(`Error service createRequestLogin - Error - ${JSON.stringify({ error })}`);
            throw HandleHttpError.return(error);
        }
    }
}
