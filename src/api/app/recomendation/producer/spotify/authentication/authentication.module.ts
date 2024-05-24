import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { AuthenticationService } from "./authentication.service";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [AuthenticationService],
    exports: [AuthenticationService]
})
export class AuthenticationModule {}
