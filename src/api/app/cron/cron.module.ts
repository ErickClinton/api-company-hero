import { Module } from "@nestjs/common";
import { CronService } from "./cron.service";
import { AuthenticationModule } from "../producer/spotify/authentication/authentication.module";

@Module({
    imports: [AuthenticationModule],
    controllers: [],
    providers: [CronService]
})
export class CronModule {}
