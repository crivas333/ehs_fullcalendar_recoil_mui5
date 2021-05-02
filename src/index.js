import mongoose from 'mongoose'
import express from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
//import dotenv from 'dotenv'
import path from 'path' // for deployment / heroku !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

import session from 'express-session'
require('dotenv').config({ path: './src/.env' });

//console.log('dorenv-process.env: ', process.env)
//import morgan from 'morgan'
const schedulerRoutes = require('./REST_routes/schedulerRoutes');
const dataGridRoutes = require('./REST_routes/dataGridRoutes');

const MongoStore = require('connect-mongo');

const morgan = require('morgan')

const IN_PROD = (process.env.NODE_ENV ==='production')?true:false;

(async () => {
  try {
    const clientP = mongoose.connect(
      `mongodb+srv://dala:${process.env.DB_PASSWORD}@cluster0-pii3g.mongodb.net/chat?retryWrites=true&w=majority`,  
      { //keepAlive: true, //check this out
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true, //check
        useFindAndModify: false //check
      }
    ).then(m => m.connection.getClient())
    
    const app = express()
    if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'))
    }
    // for fetch - it can be used cors or Access-Control-Allow-Origin
    // Allow cross-origin
    app.use(cors())
    // app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
    app.disable('x-powered-by') 

     app.use(session({
      store: MongoStore.create({
        clientPromise: clientP,
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default,
        //dbName: 'sessions'
      }),
      name: process.env.SESS_NAME,
      secret: process.env.SESS_SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(process.env.SESS_LIFETIME),
        sameSite: true,
        // sameSite: false, // for axios
        // secure: false // FOR LOCAL DEVELOPMENT
        secure: process.env.NODE_ENV === 'production' // FOR HEROKU
      }
    }))
    app.use(express.json());
    // app.use(express.urlencoded({extended:false})) //for FORMS processing
    app.use('/api/v1/appointments', schedulerRoutes);
    app.use('/api/v1/dataGrid', dataGridRoutes);
  
    // to force express to recognize connection as HTTPS and receive cookie with 'secure' set
    // app.set('trust proxy', 1)
    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
    }

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, cors: false })
    //server.applyMiddleware({ app, cors: true })
    //server.applyMiddleware({ app })

    if (process.env.NODE_ENV === 'production') {
      console.log('we are on production: ', process.env.SESS_SECRET)
      app.use(express.static('client/build'))
      app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
      })

    }

    const PORT = process.env.PORT || 4000
    app.listen({ port: PORT }, () =>
    {
      console.log(`http://localhost:${PORT}${server.graphqlPath}`)
      console.log('process.env.SESS_NAME: ',process.env.SESS_NAME)}
    )
  } catch (e) {
    console.error('server errors: ',e)
  }
})()
