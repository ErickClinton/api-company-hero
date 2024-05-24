import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecomendationModule } from "./api/app/recomendation/recomendation.module";

@Module({
    imports: [RecomendationModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
