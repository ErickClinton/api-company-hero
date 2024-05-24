import { Controller, Get, Logger, Param } from "@nestjs/common";
import { RecomendationService } from "./recomendation.service";

@Controller("recomendation")
export class RecomendationController {
    private readonly logger = new Logger(RecomendationController.name);

    constructor(private readonly recomendationService: RecomendationService) {}

    @Get("/:city")
    getRecomendation(@Param("city") city: string): string {
        this.logger.log("Start method getRecomendation");
        return this.recomendationService.getRecomendation(city);
    }
}
