import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class RecomendationService {
    private readonly logger = new Logger(RecomendationService.name);

    getRecomendation(city: string): string {
        try {
            this.logger.log(`Start service getRecomendation - Request - ${JSON.stringify({ city })}`);

            this.logger.log(`End service getRecomendation - Request - ${JSON.stringify({ city })}`);

            return city;
        } catch (error) {
            this.logger.error(`Error service getRecomendation - Error - ${JSON.stringify({ error })}`);
            throw new Error(error);
        }
    }
}
