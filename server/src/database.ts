import * as mongodb from "mongodb";
import { Fantome } from "./fantome";
 
export const collections: {
   fantomes?: mongodb.Collection<Fantome>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("cranetAdresseFantomes");
   await applySchemaValidation(db);
 
   const fantomesCollection = db.collection<Fantome>("fantomes");
   collections.fantomes = fantomesCollection;
}
 
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["login", "password", "role"],
           additionalProperties: false,
           properties: {
               _id: {},
               login: {
                   bsonType: "string",
                   description: "'login' is required",
               },
               password: {
                   bsonType: "string",
                   description: "'password' is required",
                   minLength: 10
               },
               role: {
                   bsonType: "string",
                   description: "'role' is required",
                   enum: ["Guerrier", "Alchimiste", "Sorcier", "Espions", "Enchanteur"],
               },
           },
       },
   };
 
  await db.command({
       collMod: "fantomes",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("fantomes", {validator: jsonSchema});
       }
   });
}