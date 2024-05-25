import { Injectable, Logger } from "@nestjs/common";
import { AuthenticationService } from "../producer/spotify/authentication/authentication.service";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Cron("*/55 * * * *")
    public async refreshTokenSpotify(): Promise<void> {
        try {
            this.logger.log(`Start service refreshTokenSpotify`);
            await this.authenticationService.getToken();
            this.logger.log(`End service refreshTokenSpotify `);
        } catch (error) {
            this.logger.error(`Error service refreshTokenSpotify - Error - ${error}`);
            throw new Error(error);
        }
    }
}
