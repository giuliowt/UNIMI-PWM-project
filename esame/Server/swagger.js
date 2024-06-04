const swaggerAutogen = require('swagger-autogen')({openapi:'3.0.0'});

const doc = {
  info: {
    title: 'Gestione AFSE',
    description: 'API per la gestione di AFSE'
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
        changeSchema: {
            $id:"id",
            $username:"username",
            $email:"mail@unimi.it",
            $password:"password",
            $credit: 0,
            $favhero: "favhero",
            $cards: [1234,5678]
        },
        addtradeSchema: {
            $id: "userID",
            $offered: [1234,5678],
            $received: [1234,5678]
        }
    }
  },
  host: 'localhost:5500'  //collegarsi esattamente all'URI indicato per evitare problemi di CORS/connessione
                          //es.: se c'è localhost NON collegarti a 127.0.0.1
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc);