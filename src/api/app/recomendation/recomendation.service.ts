import { Injectable, Logger } from "@nestjs/common";
import { HandleHttpError } from "../../shared/utils/handleHttpError";
import { OpenWeatherService } from "../../producer/open-weather/openWeather.service";
import { SpotifyService } from "../../producer/spotify/spotify.service";
import { ResponsePlaylistDto } from "../../producer/spotify/contract/dto/responsePlaylist.dto";

@Injectable()
export class RecomendationService {
    private readonly logger = new Logger(RecomendationService.name);

    constructor(
        private readonly openWeatherService: OpenWeatherService,
        private readonly spotifyService: SpotifyService
    ) {}
    public async getRecomendation(city: string, quantityPlaylist: number): Promise<ResponsePlaylistDto[]> {
        try {
            this.logger.log(`Start service getRecomendation - Request - ${JSON.stringify({ city, quantityPlaylist })}`);
            const temperature = await this.openWeatherService.getTemperatureByCity(city);
            const playlists = await this.spotifyService.getPlaylist(temperature, quantityPlaylist);
            this.logger.log(`End service getRecomendation - Response - ${JSON.stringify({ playlists })}`);
            return playlists;
        } catch (error) {
            this.logger.error(`Error service getRecomendation - Error - ${JSON.stringify({ error })}`);
            throw HandleHttpError.return(error);
        }
    }
}
