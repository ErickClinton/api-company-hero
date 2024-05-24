import { CoordContract } from "./response-open-weather-api-contract/coord.contract";
import { WeatherContract } from "./response-open-weather-api-contract/weather.contract";
import { MainContract } from "./response-open-weather-api-contract/main.contract";
import { WindContract } from "./response-open-weather-api-contract/wind.contract";
import { CloudsContract } from "./response-open-weather-api-contract/clouds.contract";
import { SysContract } from "./response-open-weather-api-contract/sys.contract";

export class ResponseOpenWeatherApiContract {
    coord: CoordContract;
    weather: WeatherContract[];
    base: string;
    main: MainContract;
    visibility: number;
    "wind": WindContract;
    "clouds": CloudsContract;
    dt: number;
    sys: SysContract;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
