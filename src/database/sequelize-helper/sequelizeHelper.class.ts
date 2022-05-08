import { ConflictException, InternalServerErrorException, NotFoundException, NotImplementedException, UnprocessableEntityException } from "@nestjs/common/exceptions";
import { DELETE_STOCK_NOT_IMPLEMENTED_MESSAGE, GET_NOT_FOUND_MESSAGE, POST_FK_ERROR_MESSAGE, POST_UNIQUE_PRODUCT_ID_ERROR, POST_VALIDATION_ERROR_MESSAGE } from "src/constants.class";

export class SequelizeHelper {
    static throwHttpError(error?: HttpErrors, id?: number, item?: string) {
        switch(error){
            case HttpErrors.GET_NOT_FOUND:
                throw new NotFoundException(this.replaceOnMessage(GET_NOT_FOUND_MESSAGE, '?id', id));
            case HttpErrors.POST_VALIDATION_ERROR:
                throw new UnprocessableEntityException(POST_VALIDATION_ERROR_MESSAGE);
            case HttpErrors.POST_UNIQUE_PRODUCT_ID_ERROR:
                throw new ConflictException(this.replaceOnMessage(POST_UNIQUE_PRODUCT_ID_ERROR, '?id', id));
            case HttpErrors.POST_FK_ERROR:
                throw new NotFoundException(this.replaceOnMessage(this.replaceOnMessage(POST_FK_ERROR_MESSAGE, '?id', id), '?item', item));
            case HttpErrors.DELETE_STOCK_NOT_IMPLEMENTED:
                throw new NotImplementedException(DELETE_STOCK_NOT_IMPLEMENTED_MESSAGE);
            default:
                throw new InternalServerErrorException();
        }
    }

    static messageWithId(message: string, id: number) {
        return { message: this.replaceOnMessage(message, '?id', id) }
    }

    private static replaceOnMessage(message: string, key: string, value: any) {
        return message.replace(key, value.toString());
    }
}

export enum HttpErrors{
    GET_NOT_FOUND,
    POST_VALIDATION_ERROR,
    POST_UNIQUE_PRODUCT_ID_ERROR,
    POST_FK_ERROR,
    DELETE_STOCK_NOT_IMPLEMENTED
}