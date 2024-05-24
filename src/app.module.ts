import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecomendationModule } from "./api/app/recomendation/recomendation.module";
import { OpenWeatherModule } from "./api/app/recomendation/producer/open-weather/openWeather.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

const internModules = [RecomendationModule, OpenWeatherModule, HttpModule];
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env"]
        }),
        ...internModules
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
