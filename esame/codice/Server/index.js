/* IN CASO DI ERROR DI TIPO 405 (METHOD NOT ALLOWED) RIAVVIARE IL SERVER WEB */

const express = require('express');  //per gestire il server
var cors = require('cors');  //per evitare problemi di cors
const fs = require('fs');    // per gestire file
const crypto = require('crypto');  //per hashare file
const app = express();
const port = 5500;

app.use(express.json()); //per leggere e parsare i body che arrivano
app.use(cors()); //per evitare problemi di cors


/*------------------------------------------------codice per utilizzare mongodb------------------------------------------------*/
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://giulio:NM7Oj2a6auu2BrNU@afse.xunlcd2.mongodb.net/?retryWrites=true&w=majority&appName=AFSE";
const client = new MongoClient(uri);
/*------------------------------------------------codice per utilizzare mongodb------------------------------------------------*/
/*------------------------------------------------funzione per hashare------------------------------------------------*/
function hash(input) {
    return crypto.createHash("SHA256")
        .update(input)
        .digest("hex")
}
/*------------------------------------------------funzione per hashare------------------------------------------------*/
/*------------------------------------------------codice per generare swagger------------------------------------------------*/
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/*------------------------------------------------codice per generare swagger------------------------------------------------*/

/* avvio del server */
app.listen(port, () => {
    console.log("AFSE listening on port " + port)
})

/* funzione per loggare nuovo utente */
app.post("/login", async function(req, res) {
    /* #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/loginSchema"
              }  
          }
      }
    } */

    email = req.body.email
    password = hash(req.body.password)

    const pwmClient=await client.connect()
    try {
        query = await pwmClient.db("AFSE").collection("users").find({
            "email": email,
            "password": password
        }).toArray();

        /* controllo che la mail non sia già stata usata */
        if(query.length==0) {
            res.status(400).send({
                error: "wrong email or password"
            })
        } else {
            res.status(200).send({
                sessionid:query[0]._id,  /* ritorno l'id così da avere un id di sessione */
                username: query[0].username,
                email: query[0].email,
                favhero: query[0].favhero,
                credit: query[0].credit,
                cards: query[0].cards
            })
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
})

/* funzione per registrare nuovo utente */
app.post("/register", async function(req, res) {
    /* #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/registerSchema"
              }  
          }
      }
    } */

    username = req.body.username
    email = req.body.email
    password = req.body.password
    favhero = req.body.favhero

    /* controllo campi validi */
    if(username.length<3 || username==undefined) {
        res.status(400).send("wrong username");
        return;
    }
      
    if(password.length<8 || password==undefined) {
        res.status(400).send("unsafe password");
        return;
    }

    if(email==undefined) {
        res.status(400).send("wrong email");
        return;
    }

    user = {
        "username": username,
        "email": email,
        "password": hash(password),  /* password hashata per maggiore sicurezza */
        "favhero": favhero,
        "credit": 0,
        "cards": []
    }
  
    const pwmClient=await client.connect()
    try {
        query = await pwmClient.db("AFSE").collection("users").find({
            "email": email
        }).toArray();

        /* controllo che la mail non sia già stata usata */
        if(query.length==0) {
            await pwmClient.db("AFSE").collection("users").insertOne(user);
            res.status(201).send("user created")
        } else {
            res.status(400).send("email already in use")
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
})

/* funzione per cancellare utente */
app.delete("/delete/:id", async function(req, res) {
    id=req.params.id;

    try {
        const pwmClient=await client.connect()

        await pwmClient.db("AFSE").collection("users").deleteOne({_id: ObjectId.createFromHexString(id)});
        await client.close();
        res.status(201).send("user deleted")

    } catch (e) {
        console.log(e);
        res.status(500).send("server error")
    } finally {
        await client.close();
    }
})

/* funzione per ottenere informazioni su un utente specifico */
app.get("/user/:id", async function(req, res){
    id=req.params.id;
    const pwmClient=await client.connect()

    /* query per prendere info sull'utente */
    query = await pwmClient.db("AFSE").collection("users").find({
        "_id": ObjectId.createFromHexString(id)
    }).toArray();

    if(query.length!=0) {
        query=query[0]
        res.status(200).send({
            username: query.username,
            email: query.email,
            favhero: query.favhero,
            credit: query.credit,
            cards: query.cards
        })
    } else {
        res.status(400).send({
            error: "user not found"
        })
    }
    
})

/* funzione per cambiare proprietà all'utente */
app.post("/change", async function(req, res){
    /* #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/changeSchema"
              }  
          }
      }
    } */

    id=req.body.id
    const pwmClient=await client.connect()

    try {
       
        query = {}

        /* utilizzo più if senza l'else if così da poter modificare più campi con una sola query */
        if(req.body.username)
            query.username=req.body.username
        if(req.body.email)
            query.email=req.body.email
        if(req.body.password && req.body.password != "undefined")
            query.password=hash(req.body.password)
        if(req.body.credit)
            query.credit=req.body.credit
        if(req.body.favhero)
            query.favhero=req.body.favhero
        if(req.body.credit)
            query.credit=req.body.credit
        if(req.body.cards)
            query.cards=req.body.cards


        await pwmClient.db("AFSE").collection("users").updateOne({
            "_id": ObjectId.createFromHexString(id)
        }, { $set: query })

        res.status(201).send("user updated")

    } catch (e) {
        console.log(e);
        res.status(500).send("server error")
    }
})

/* funzione per aggiungere un trade */
app.post("/addtrade", async function(req, res) {
    /* #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/addtradeSchema"
              }  
          }
      }
    } */


    try {
        /* const pwmClient=await client.connect() */
        /* await pwmClient.db("AFSE").collection("trades").insertOne(trade); */  //trade sarebbe il successivo newtrade

        trades = JSON.parse(fs.readFileSync("../../trades.json"))
        offered = []
        for (let i = 0; i < req.body.offered.length; i++) 
            offered.push(parseInt(req.body.offered[i]));
        
        received = []
        for (let i = 0; i < req.body.received.length; i++) 
            received.push(parseInt(req.body.received[i]));

        newtrade={
            "tradeid": hash(trades.length.toString()),  //hasho l'id del trade per avere maggiore sicurezza
            "id": req.body.id,
            "username": req.body.username,
            "offered": offered,
            "received": received
        }
          
        trades.push(newtrade)
        fs.writeFileSync("../../trades.json", JSON.stringify(trades));
        res.status(201).send("added new trade")

    } catch (e) {
        console.log(e);
        res.status(500).send("server error")
    }
})

/* funzione per cancellare un trade */
app.delete("/trade/:id", async function(req, res) {
    tradeid=req.params.id;
    trades = JSON.parse(fs.readFileSync("../../trades.json"))

    try {

        /* const pwmClient=await client.connect()
        await pwmClient.db("AFSE").collection("trades").deleteOne({_id: ObjectId.createFromHexString(tradeid)}); */

        for (let i = 0; i < trades.length; i++) {
            if(trades[i].tradeid==tradeid) {
                trades.splice(i, 1)
            }
        }

        fs.writeFileSync("../../trades.json", JSON.stringify(trades));
        res.status(201).send("trade deleted")
    } catch (e) {
        console.log(e);
        res.status(500).send("server error")
    }
})

/* funzione per ottenere i trade */
app.get("/getTrades", async function(req, res) {
    trades = JSON.parse(fs.readFileSync("../../trades.json"))

    try {

        /* const pwmClient=await client.connect()
        trades = await pwmClient.db("AFSE").collection("trades").find().toArray(); */

        res.status(200).send(JSON.stringify(trades))
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: "server error"
        })
    }
})

/* funzione per salvare i trades nel db */
app.get("/saveTrades", async function(req, res) {
    trades = JSON.parse(fs.readFileSync("../../trades.json"))

    const pwmClient=await client.connect()
    await pwmClient.db("AFSE").collection("trades").deleteMany({})

    for (let i = 0; i < trades.length; i++) {
        await pwmClient.db("AFSE").collection("trades").insertOne(trades[i])
    }
    await client.close()

    res.status(201).send("DB updated")
})
