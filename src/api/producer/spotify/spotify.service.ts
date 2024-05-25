import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { MusicalGenreEnum } from "../../shared/enum/musicalGenre.enum";
import { HttpService } from "@nestjs/axios";
import { AuthenticationService } from "./authentication/authentication.service";
import { firstValueFrom } from "rxjs";
import { ResponsePlaylistContract } from "./contract/responsePlaylist.contract";
import { ResponsePlaylistDto } from "./contract/dto/responsePlaylist.dto";
import { HandleHttpError } from "../../shared/utils/handleHttpError";

@Injectable()
export class SpotifyService {
    private readonly logger = new Logger(SpotifyService.name);
    private readonly baseUrl = "https://api.spotify.com/v1";

    constructor(
        private readonly httpService: HttpService,
        private readonly authenticationService: AuthenticationService
    ) {}

    public async getPlaylist(temperature: number, quantityPlaylist: number): Promise<ResponsePlaylistDto[]> {
        try {
            this.logger.log(`Start service getPlaylist - Request - ${JSON.stringify({ temperature })}`);

            const token = await this.authenticationService.getToken();
            const musicalGenre = this.getMusicalGenre(temperature);

            const observable = this.httpService.get(
                `${this.baseUrl}/search?q=${musicalGenre}&type=playlist&limit=${quantityPlaylist}`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const response: ResponsePlaylistContract = await firstValueFrom(observable)
                .then((res) => res.data)
                .catch((err) => {
                    if (err.response?.status === 401) {
                        throw new HttpException(
                            `Not authorized. check if the token was successfully retrieved.`,
                            HttpStatus.UNAUTHORIZED
                        );
                    } else {
                        throw new HttpException(JSON.stringify(err), HttpStatus.BAD_REQUEST);
                    }
                });
            const playlistDto = this.createResponsePlaylist(response);

            this.logger.log(`End service getPlaylist - Response - ${JSON.stringify({ playlistDto })}`);
            return playlistDto;
        } catch (error) {
            this.logger.error(`Error service getPlaylist - Error - ${error.message}`);
            throw HandleHttpError.return(error);
        }
    }

    private getMusicalGenre(temperature: number): MusicalGenreEnum {
        try {
            this.logger.log(`Start service getMusicalGenre - Request - ${JSON.stringify({ temperature })}`);
            if (temperature > 25) {
                return MusicalGenreEnum.POP;
            } else if (temperature >= 10 && temperature <= 25) {
                return MusicalGenreEnum.ROCK;
            } else {
                return MusicalGenreEnum.CLASSICAL;
            }
        } catch (error) {
            this.logger.error(`Error service getTemperatureByCity - Error - ${JSON.stringify({ error })}`);
            throw HandleHttpError.return(error);
        }
    }

    private createResponsePlaylist(responsePlaylistsContract: ResponsePlaylistContract): ResponsePlaylistDto[] {
        try {
            this.logger.log(
                `Start service createResponsePlaylist - Request - ${JSON.stringify({ responsePlaylistsContract })}`
            );
            const playlists: ResponsePlaylistDto[] = [];
            const playlistsContract = responsePlaylistsContract.playlists.items;

            for (const playlist of playlistsContract) {
                const responsePlaylist = new ResponsePlaylistDto();
                responsePlaylist.name = playlist.name;
                responsePlaylist.link = playlist.external_urls.spotify;
                responsePlaylist.description = playlist.description;
                playlists.push(responsePlaylist);
            }

            this.logger.log(`Start service createResponsePlaylist - Response - ${JSON.stringify({ playlists })}`);

            return playlists;
        } catch (error) {
            this.logger.error(`Error service createResponsePlaylist - Error - ${JSON.stringify({ error })}`);
            throw HandleHttpError.return(error);
        }
    }
}
