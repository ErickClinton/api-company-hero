import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SpotifyService } from "./Spotify.service";
import { AuthenticationModule } from "./authentication/authentication.module";

@Module({
    imports: [HttpModule, AuthenticationModule],
    controllers: [],
    providers: [SpotifyService],
    exports: [SpotifyService]
})
export class SpotifyModule {}
