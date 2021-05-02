import mongoose from 'mongoose'
import express from 'express'
// import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'

import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import dotenv from 'dotenv'
import path from 'path' // for deployment

//var data = require('./dataSource.json');
//import morgan from 'morgan'
const schedulerRoutes = require('./REST_routes/schedulerRoutes');
const dataGridRoutes = require('./REST_routes/dataGridRoutes');
// const MongoDBStore = require('connect-mongodb-session')(session)
const MongoStore = require('connect-mongo')(session)

// import * as morgan from 'morgan'
var morgan = require('morgan')
// import * as config from './config'


//var data = require('./dataSource.json');
// require('dotenv').config()
// import {
//   APP_PORT, IN_PROD, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME,
//   SESS_NAME, SESS_SECRET, SESS_LIFETIME, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD
// } from './config'

const IN_PROD = process.env.NODE_ENV === 'production'
dotenv.config({ path: './.env' });

(async () => {
  try {
    const conn= await mongoose.connect(`mongodb+srv://dala:${process.env.DB_PASSWORD}@cluster0-pii3g.mongodb.net/chat?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      //mongoose.set('debug', true)
      //console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);

    //await mongoose.connect('mongodb://localhost:27020/chat',
    // await mongoose.connect('mongodb://localhost/chat',
    //   {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false
    //   })

    const app = express()
    // if (process.env.NODE_ENV === 'development') {
    //   // app.use(morgan('dev'))
    // }
    // for fetch - it can be used cors or Access-Control-Allow-Origin
    // Allow cross-origin
    app.use(cors())
    // app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
    app.disable('x-powered-by')

    if(process.env.NODE_ENV === 'development') {
      app.use(morgan('dev'));
      //app.use(morgan('tiny'));
    }
    


    app.use(session({
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default,
        dbName: 'sessions'
      }),
      name: process.env.SESS_NAME,
      secret: process.env.SESS_SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        // maxAge: parseInt(SESS_LIFETIME),
        maxAge: parseInt(process.env.SESS_LIFETIME),
        sameSite: true,
        // sameSite: false, // for axios
        // secure: false // FOR LOCAL DEVELOPMENT
        ////////////////////////////////////// secure: process.env.IN_PROD
        secure: process.env.NODE_ENV === 'production' // FOR HEROKU
      }
    }))

    app.use(express.json());
    // app.use(express.urlencoded({extended:false})) //for FORMS processing
    app.use('/api/v1/appointments', schedulerRoutes);
    app.use('/api/v1/dataGrid', dataGridRoutes);
    // all record
    // app.get('/api/orders', function (req, res) {
    //   console.log('server-side API: ',req)
    //   return res.status(200).json({ result: data, count: data.length });
    //   /////////return res.json({ result: data, count: data.length });
    // });
    // to force express to recognize connection as HTTPS and receive cookie with 'secure' set
    // app.set('trust proxy', 1)
    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      // sess.cookie.secure = true // serve secure cookies
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
    // server.applyMiddleware({ app, cors: true })
    // server.applyMiddleware({ app })

    if (process.env.NODE_ENV === 'production') {
      console.log('we are on production: ', process.env.SESS_SECRET)
      app.use(express.static('client/build'))
      app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
      })

    }

    const PORT = process.env.PORT || 4000
    app.listen({ port: PORT }, () =>
      console.log(`http://localhost:${PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error('server errors: ',e)
  }
})()
