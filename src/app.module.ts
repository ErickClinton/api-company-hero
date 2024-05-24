import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecomendationModule } from "./api/app/recomendation/recomendation.module";
import { OpenWeatherModule } from "./api/app/recomendation/producer/open-weather/openWeather.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationModule } from "./api/app/recomendation/producer/spotify/authentication/authentication.module";
import { SpotifyModule } from "./api/app/recomendation/producer/spotify/Spotify.module";

const internModules = [RecomendationModule, OpenWeatherModule, HttpModule, AuthenticationModule, SpotifyModule];
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
