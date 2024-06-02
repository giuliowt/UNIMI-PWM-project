const express = require('express');  /* per gestire il server */
/* var cors = require('cors'); */
const crypto = require('crypto');  /* per hashare file */
const app = express();
const port = 3000;

app.use(express.json()); //per leggere e parsare i body che arrivano
/* app.use(cors()); */

/* funzione per hashare */
function hash(input) {
    return crypto.createHash("SHA256")
        .update(input)
        .digest("hex")
}


