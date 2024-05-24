import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class OpenWeatherService {
    private readonly logger = new Logger(OpenWeatherService.name);

    getTemperatureByCity(city: string): string {
        try {
            this.logger.log(`Start service getTemperatureByCity - Request - ${JSON.stringify({ city })}`);

            this.logger.log(`End service getTemperatureByCity - Request - ${JSON.stringify({ city })}`);

            return city;
        } catch (error) {
            this.logger.error(`Error service getTemperatureByCity - Error - ${JSON.stringify({ error })}`);
            throw new Error(error);
        }
    }
}
