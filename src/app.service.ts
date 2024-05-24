import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    serverIsRunning(): string {
        return "Server is healthy and running!";
    }
}
