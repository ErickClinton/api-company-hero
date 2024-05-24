import { Module } from "@nestjs/common";
import { OpenWeatherService } from "./openWeather.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [OpenWeatherService],
    exports: [OpenWeatherService]
})
export class OpenWeatherModule {}
