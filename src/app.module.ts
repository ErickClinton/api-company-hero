import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecomendationModule } from "./api/app/recomendation/recomendation.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { CronModule } from "./api/cron/cron.module";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthenticationModule } from "./api/producer/spotify/authentication/authentication.module";
import { OpenWeatherModule } from "./api/producer/open-weather/openWeather.module";
import { SpotifyModule } from "./api/producer/spotify/spotify.module";

const internModules = [
    AuthenticationModule,
    CronModule,
    HttpModule,
    RecomendationModule,
    OpenWeatherModule,
    SpotifyModule
];
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env"]
        }),
        ScheduleModule.forRoot(),
        ...internModules
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
