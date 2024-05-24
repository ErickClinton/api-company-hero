import { Module } from "@nestjs/common";
import { RecomendationController } from "./recomendation.controller";
import { RecomendationService } from "./recomendation.service";

@Module({
    imports: [],
    controllers: [RecomendationController],
    providers: [RecomendationService]
})
export class RecomendationModule {}
