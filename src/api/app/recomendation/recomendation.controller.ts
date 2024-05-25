import { Controller, Get, Logger, Param } from "@nestjs/common";
import { RecomendationService } from "./recomendation.service";
import { ResponsePlaylistDto } from "../producer/spotify/contract/dto/responsePlaylist.dto";

@Controller("recomendation")
export class RecomendationController {
    private readonly logger = new Logger(RecomendationController.name);

    constructor(private readonly recomendationService: RecomendationService) {}

    @Get("/:city/:quantity")
    getRecomendation(
        @Param("city") city: string,
        @Param("quantity") quantityPlaylist: number
    ): Promise<ResponsePlaylistDto[]> {
        this.logger.log("Start method getRecomendation");
        return this.recomendationService.getRecomendation(city, quantityPlaylist);
    }
}
