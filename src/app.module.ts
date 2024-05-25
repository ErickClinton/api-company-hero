import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecomendationModule } from "./api/app/recomendation/recomendation.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { CronModule } from "./api/app/cron/cron.module";
import { OpenWeatherModule } from "./api/app/producer/open-weather/openWeather.module";
import { AuthenticationModule } from "./api/app/producer/spotify/authentication/authentication.module";
import { SpotifyModule } from "./api/app/producer/spotify/spotify.module";
import { ScheduleModule } from "@nestjs/schedule";

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
