
// interface AccountModel{
//     name: String

import { ObjectId } from "mongodb";

// }
export interface Account {
    _id: ObjectId,
	username: String,
	email: String,
	exp: Number,
    avatar: String,
    frame: String,
    banner: String,
	status: String,
}

export interface wallet {
    u_id: ObjectId,
    waller_address: String,
    gems: Number,
    credits: Number
}
export interface items {
    u_id: ObjectId,
    list_items: [
        {
            i_id: ObjectId,
            item_name: String,
            amount: Number,
        }
    ]
}

export interface authen {
    u_id: ObjectId,
    email: String,
    password: String,
    otp: Number,
}