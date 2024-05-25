import { Module } from "@nestjs/common";
import { RecomendationController } from "./recomendation.controller";
import { RecomendationService } from "./recomendation.service";
import { SpotifyModule } from "../producer/spotify/spotify.module";
import { OpenWeatherModule } from "../producer/open-weather/openWeather.module";

@Module({
    imports: [OpenWeatherModule, SpotifyModule],
    controllers: [RecomendationController],
    providers: [RecomendationService]
})
export class RecomendationModule {}
