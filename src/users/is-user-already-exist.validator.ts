import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "./user.service";

@Injectable()
@ValidatorConstraint()
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(
        private userService: UserService
    ){}

    validate(userName: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return true //!!!this.userService.findByName(userName);    
    }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint,
        });
    };
}
