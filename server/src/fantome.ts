import * as mongodb from "mongodb";

export interface Fantome {
   login: string;
   password: string;
   role: "Guerrier" | "Alchimiste" | "Sorcier"| "Espions" | "Enchanteur";
   _id?: mongodb.ObjectId;
}