import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/removeMovie', async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('my-movies');
        let returnVal = await db.collection('movies').deleteOne( {name:req.body.name})
        console.log(returnVal);
        if( returnVal.deletedCount == 1) {
            res.status(200).json({message: `Movie ${req.body.name} deleted`});
        }
        else {
            res.status(200).json({message: "Unable to delete movie"});
        }
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
})

app.post('/api/addTeam', async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('TeamMaker');
        await db.collection('teams').insertOne( {teamName:req.body.teamName, players:req.body.players, wins:req.body.wins, losses:req.body.losses, ties:req.body.ties})       
        res.status(200).json({message: "Success"});
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
})

app.post('/api/addPoster', async (req, res) => {
    console.log("Testadd" + req)
})

app.get('/api/teams', async (req, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true});
        const db = client.db('TeamMaker');
        const teams = await db.collection('teams').find({}).toArray();
        console.log(teams);
        res.status(200).json(teams);
        client.close();
    }
    catch( error) {
        res.status(500).json( { message: "Error connecting to db", error});
    }
})
app.listen(8000, () => console.log("listening on port 8000"));