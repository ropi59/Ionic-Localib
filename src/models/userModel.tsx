export class UserModel {

    id!: number
    name: string
    firstName: string
    email: string



    constructor(name: string, firstName: string, email: string) {
        this.name = name;
        this.firstName = firstName;
        this.email = email;
    }
}