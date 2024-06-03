const express = require('express');  //per gestire il server
var cors = require('cors');  //per evitare problemi di cors
const crypto = require('crypto');  //per hashare file
const app = express();
const port = 5500;

app.use(express.json()); //per leggere e parsare i body che arrivano
app.use(cors()); //per evitare problemi di cors


/*------------------------------------------------codice per utilizzare mongodb------------------------------------------------*/
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://giulio:NM7Oj2a6auu2BrNU@afse.xunlcd2.mongodb.net/?retryWrites=true&w=majority&appName=AFSE";
const client = new MongoClient(uri);
client.connect();
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

/* funzione per aggiungere una figurina */
app.post("/addCard", async function(req, res){
    /* #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/addCardSchema"
              }  
          }
      }
    } */

    id=req.body.id
    cardID=req.body.cardID
    const pwmClient=await client.connect()
    
    try {
        /* controllo che l'utente a cui sto dando la figurina esista */
        query = await pwmClient.db("AFSE").collection("users").find({
            "_id": ObjectId.createFromHexString(id)
        }).toArray();

        if(query.length!=0) {
            await pwmClient.db("AFSE").collection("users").updateOne(
                {_id:ObjectId.createFromHexString(id)},
                {$push:{
                    cards: cardID
                }});
            res.status(201).send("card added")
        } else {
            res.status(401).send("user not found")
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("server error")
    } finally {
        await client.close();
    }
    
})

/* funzione per rimuovere una figurina */
app.post("/delCard", async function(req, res){
    /* #swagger.requestBody = {
      required: true,
      content: {
          "application/json": {
              schema: {
                  $ref: "#/components/schemas/delCardSchema"
              }  
          }
      }
    } */

    id=req.body.id
    cardID=req.body.cardID
    cardIsPresent=false
    const pwmClient=await client.connect()
    
    try {
        /* controllo che l'utente a cui sto dando la figurina esista */
        query = await pwmClient.db("AFSE").collection("users").find({
            "_id": ObjectId.createFromHexString(id)
        }).toArray();
        
        if(query.length==0) {
            res.status(400).send("user not found")
            return
        }

        for (let i = 0; i < query[0].cards.length; i++) {
            if(cardID==query[0].cards[i]) {
                cardIsPresent=true
                query[0].cards.splice(i, 1)
                break;
            }
        }

        if(cardIsPresent) {
            await pwmClient.db("AFSE").collection("users").updateOne({
                "_id": ObjectId.createFromHexString(id)
            }, {$set:{
                cards: query[0].cards
            }})
            res.status(201).send("card removed")
        } else {
            res.status(400).send("user haven't this card")
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("server error")
    } finally {
        await client.close();
    }
    
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
                sessionid:query[0]._id  /* ritorno l'id così da avere un id di sessione */
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

        /* controllo che l'utente a cui sto dando la figurina esista */
        query = await pwmClient.db("AFSE").collection("users").find({
            "_id": ObjectId.createFromHexString(id)
        }).toArray();

        if(query.length!=0) {
            await pwmClient.db("AFSE").collection("users").deleteOne({_id: ObjectId.createFromHexString(id)});
            await client.close();
            res.status(201).send("user deleted")
        } else {
            res.status(400).send("user not found")
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("server error")
    } finally {
        await client.close();
    }
})

/* funzione per ottenere informazioni sull'utente */
app.get("/user/:id", async function(req, res){
    id=req.params.id;
    const pwmClient=await client.connect()

    /* controllo che l'utente a cui sto dando la figurina esista */
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

/* funzione per cambiare proprietà */
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
        /* controllo che l'utente selezionato esista */
        query = await pwmClient.db("AFSE").collection("users").find({
            "_id": ObjectId.createFromHexString(id)
        }).toArray();

        if(query.length!=0) {
           
            /* utilizzo più if senza l'else if così da poter modificare più campi con una sola query */
            if(req.body.username)
                query[0].username=req.body.username
            if(req.body.email)
                query[0].email=req.body.email
            if(req.body.password)
                query[0].password=hash(req.body.password)
            if(req.body.credit)
                query[0].credit=req.body.credit
            if(req.body.favhero)
                query[0].favhero=req.body.favhero


            await pwmClient.db("AFSE").collection("users").updateOne({
                "_id": ObjectId.createFromHexString(id)
            }, { $set: query[0] })

            res.status(201).send("user updated")

        } else {
            res.status(400).send("user not found")
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("server error")
    } finally {
        await client.close();
    }
})
