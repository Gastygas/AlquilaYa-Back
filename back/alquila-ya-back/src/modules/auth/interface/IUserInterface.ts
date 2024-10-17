export interface IUser{
    id:number,
    name:string,
    surname:string,
    phone:string,
    dni:number,
    isAdmin:boolean,
    password:string,
    email:string,
    country?:string,
    adress?:string,
}