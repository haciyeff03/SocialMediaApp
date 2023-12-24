import { ID } from "appwrite";
import { INewUser } from "@/types";
import { account } from "./config";
export async function CreateUserAccount(user:INewUser) {
try {
    const newAccount= await account.create(
        ID.unique(),
        user.name,
        user.password,
        user.email
    )
    return newAccount;
}

catch (error) {
    console.log(error);
}

}