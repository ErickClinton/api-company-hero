import { Injectable, Logger } from "@nestjs/common";
import { OpenWeatherService } from "./producer/open-weather/openWeather.service";

@Injectable()
export class RecomendationService {
    private readonly logger = new Logger(RecomendationService.name);

    constructor(private readonly openWeatherService: OpenWeatherService) {}
    async getRecomendation(city: string): Promise<string> {
        try {
            this.logger.log(`Start service getRecomendation - Request - ${JSON.stringify({ city })}`);
            const response = await this.openWeatherService.getTemperatureByCity(city);
            this.logger.log(`End service getRecomendation - Response - ${JSON.stringify({ response })}`);
            return city;
        } catch (error) {
            this.logger.error(`Error service getRecomendation - Error - ${JSON.stringify({ error })}`);
            throw new Error(error);
        }
    }
}
