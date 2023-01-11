import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const fantomeRouter = express.Router();
fantomeRouter.use(express.json());
 
fantomeRouter.get("/", async (_req, res) => {
   try {
       const fantomes = await collections.fantomes.find({}).toArray();
       res.status(200).send(fantomes);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

fantomeRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const fantome = await collections.fantomes.findOne(query);
  
        if (fantome) {
            res.status(200).send(fantome);
        } else {
            res.status(404).send(`Erreur pour trouver le fantome: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Erreur pour trouver le fantome: ID ${req?.params?.id}`);
    }
 });

 fantomeRouter.get("/:login", async (req, res) => {
    try {
        const login = req?.params?.login;
        const query = { _id: new mongodb.ObjectId(login) };
        const fantome = await collections.fantomes.findOne(query);
  
        if (fantome) {
            res.status(200).send(fantome);
        } else {
            res.status(404).send(`Erreur pour trouver le fantome: ID ${login}`);
        }
  
    } catch (error) {
        res.status(404).send(`Erreur pour trouver le fantome: ID ${req?.params?.login}`);
    }
 });

 fantomeRouter.post("/", async (req, res) => {
    try {
        const fantome = req.body;
        const result = await collections.fantomes.insertOne(fantome);
  
        if (result.acknowledged) {
            res.status(201).send(`Creation d'un nouveau fantome: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Erreur a la creation d'un nouveau fantome.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 fantomeRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const fantome = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.fantomes.updateOne(query, { $set: fantome });
  
        if (result && result.matchedCount) {
            res.status(200).send(`fantome modifié: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Erreur pour trouver le fantome: ID ${id}`);
        } else {
            res.status(304).send(`Erreur pour modifier le fantome: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 fantomeRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.fantomes.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Fantome enlevé: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Erreur pour enlevé le fantome: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Erreur pour trouver le fantome: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });