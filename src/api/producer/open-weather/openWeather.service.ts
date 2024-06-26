import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import * as process from "process";
import { HttpService } from "@nestjs/axios";
import { ResponseOpenWeatherApiContract } from "./contract/responseOpenWeatherApi.contract";
import { firstValueFrom } from "rxjs";
import { HandleHttpError } from "../../shared/utils/handleHttpError";

@Injectable()
export class OpenWeatherService {
    private readonly logger = new Logger(OpenWeatherService.name);
    private readonly apiKeyOpenWeather = process.env.API_KEY_OPEN_WEATHER;
    private readonly baseUrlOpenWeather = "http://api.openweathermap.org/data/2.5/weather?units=metric";

    constructor(private readonly httpService: HttpService) {}

    public async getTemperatureByCity(city: string): Promise<number> {
        try {
            this.logger.log(`Start service getTemperatureByCity - Request - ${JSON.stringify({ city })}`);

            const observable = this.httpService.get(
                `${this.baseUrlOpenWeather}&q=${city}&appid=${this.apiKeyOpenWeather}`
            );

            const response: ResponseOpenWeatherApiContract = await firstValueFrom(observable)
                .then((res) => res.data)
                .catch((err) => {
                    if (err.response?.status === 404) {
                        throw new HttpException(
                            `City not found - ${city}. Please check the input.`,
                            HttpStatus.NOT_FOUND
                        );
                    } else {
                        throw new HttpException(JSON.stringify(err), HttpStatus.BAD_REQUEST);
                    }
                });
            const temperature = response.main.temp;

            this.logger.log(`End service getTemperatureByCity - Response - ${JSON.stringify({ temperature })}`);

            return temperature;
        } catch (error) {
            this.logger.error(`Error service getTemperatureByCity - Error - ${JSON.stringify({ error })}`);
            throw HandleHttpError.return(error);
        }
    }
}
