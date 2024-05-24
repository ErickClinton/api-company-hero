import { Module } from "@nestjs/common";
import { RecomendationController } from "./recomendation.controller";
import { RecomendationService } from "./recomendation.service";
import { OpenWeatherModule } from "./producer/open-weather/openWeather.module";

@Module({
    imports: [OpenWeatherModule],
    controllers: [RecomendationController],
    providers: [RecomendationService]
})
export class RecomendationModule {}
