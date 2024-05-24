import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SpotifyService } from "./Spotify.service";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [SpotifyService],
    exports: [SpotifyService]
})
export class SpotifyModule {}
