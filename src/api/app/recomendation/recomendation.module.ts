import { Module } from "@nestjs/common";
import { RecomendationController } from "./recomendation.controller";
import { RecomendationService } from "./recomendation.service";
import { OpenWeatherModule } from "./producer/open-weather/openWeather.module";
import { SpotifyModule } from "./producer/spotify/Spotify.module";

@Module({
    imports: [OpenWeatherModule, SpotifyModule],
    controllers: [RecomendationController],
    providers: [RecomendationService]
})
export class RecomendationModule {}
