const swaggerAutogen = require('swagger-autogen')({openapi:'3.0.0'});

const doc = {
  info: {
    title: 'Gestione utenti',
    description: 'API per la gestione utenti'
  },
  components: {
    schemas: {
        registerSchema:{
            $username:"username",
            $email:"mail@unimi.it",
            $password:"password",
            $favhero:"favhero"
        },
        loginSchema: {
            $email:"mail@unimi.it",
            $password:"password"
        },
        addCardSchema: {
            $id:"id",
            $cardID: "cardID" 
        },
        delCardSchema: {
            $id:"id",
            $cardID: "cardID" 
        },
        changeSchema: {
            $id:"id",
            $username:"username",
            $email:"mail@unimi.it",
            $password:"password",
            $credit: 0,
            $favhero: "favhero"
        }
    }
  },
  host: 'localhost:5500'  //collegarsi esattamente all'URI indicato per evitare problemi di CORS/connessione
                          //es.: se c'è localhost NON collegarti a 127.0.0.1
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc);