export class User {
    public name: string;
    public password: string;
    public id: string;
    constructor(id: string, name: string, password:string) {
        this.name = name;
        this.password = password;
        this.id = id;
    }
}