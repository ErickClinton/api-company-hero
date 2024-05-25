import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { HandleHttpError } from "../shared/utils/handleHttpError";
import { AuthenticationService } from "../producer/spotify/authentication/authentication.service";

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Cron("55 * * * *")
    public async refreshTokenSpotify(): Promise<void> {
        try {
            this.logger.log(`Start service refreshTokenSpotify`);
            await this.authenticationService.getToken();
            this.logger.log(`End service refreshTokenSpotify `);
        } catch (error) {
            this.logger.error(`Error service refreshTokenSpotify - Error - ${error}`);
            throw HandleHttpError.return(error);
        }
    }
}
