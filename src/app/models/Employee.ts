export class Employee{
    id: null | number;
    name: string;
    email: string;
    department: string;
    createdAt : Date;
    updatedAt : Date;

    constructor(id:null|number, name:string, email: string, department: string, createdAt: Date, updatedAt: Date){
        this.id=id;
        this.name=name;
        this.email=email;
        this.department=department;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }
}