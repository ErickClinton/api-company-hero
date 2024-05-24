import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecomendationModule } from "./api/app/recomendation/recomendation.module";
import { OpenWeatherModule } from "./api/app/recomendation/producer/open-weather/openWeather.module";

@Module({
    imports: [RecomendationModule, OpenWeatherModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
