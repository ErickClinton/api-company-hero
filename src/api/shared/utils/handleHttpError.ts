import { HttpException, HttpStatus } from "@nestjs/common";

export class HandleHttpError {
    public static return = (error: any): never => {
        if (error && !error?.status?.toString().startsWith("4")) {
            throw new HttpException(JSON.stringify(error.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            throw new HttpException(error?.message, error?.status);
        }
    };
}
