import { ConflictException, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from "@nestjs/common/exceptions";
import { DELETE_FK_ERROR_MESSAGE, GET_NOT_FOUND_MESSAGE, POST_VALIDATION_ERROR_MESSAGE } from "src/constants.class";

export class SequelizeHelper {
    static throwHttpError(error: HttpErrors, id?: number) {
        if(error === HttpErrors.DEFAULT)
            throw new InternalServerErrorException();
        if(error === HttpErrors.GET_NOT_FOUND)
            throw new NotFoundException(this.addIdToMessage(GET_NOT_FOUND_MESSAGE, id));
        if(error === HttpErrors.DELETE_FK_ERROR)
            throw new ConflictException(this.addIdToMessage(DELETE_FK_ERROR_MESSAGE, id));
        if(error === HttpErrors.POST_VALIDATION_ERROR)
            throw new UnprocessableEntityException(POST_VALIDATION_ERROR_MESSAGE);
    }

    static messageWithId(message: string, id: number) {
        return { message: this.addIdToMessage(message, id) }
    }

    private static addIdToMessage(message: string, id: number) {
        return message.replace('?id', id.toString());
    }
}

export enum HttpErrors{
    DEFAULT,
    GET_NOT_FOUND,
    DELETE_FK_ERROR,
    POST_VALIDATION_ERROR
}