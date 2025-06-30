export interface IOrder{
    id:string,
    user_id:string,
    total_amount:number,
    status:string,
    payment_reference:string
    createdAt:string
}

export interface IUserWithOrders{
    id:string,
    first_name:string,
    last_name:string,
    order:IOrder[];
}