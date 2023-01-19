import mongoose from "mongoose";
import express from "express";
// import bodyParser from 'body-parser'
import cors from "cors";
//import { ApolloServer } from "apollo-server-express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import schemaDirectives from "./directives";
//import dotenv from 'dotenv'
import path from "path"; // for deployment / heroku !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

import session from "express-session";
require("dotenv").config({ path: "./src/.env" });

//console.log('dorenv-process.env: ', process.env)
//import morgan from 'morgan'
const schedulerRoutes = require("./REST_routes/schedulerRoutes");
const dataGridRoutes = require("./REST_routes/dataGridRoutes");
const fullCalendarRoutes = require("./REST_routes/fullCalendarRoutes");

const MongoStore = require("connect-mongo");

const morgan = require("morgan");

const IN_PROD = process.env.NODE_ENV === "production" ? true : false;

(async () => {
  try {
    const clientP = mongoose
      .connect(
        `mongodb+srv://dala:${process.env.DB_PASSWORD}@cluster0-pii3g.mongodb.net/chat?retryWrites=true&w=majority`,
        {
          //keepAlive: true, //check this out
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true, //check
          useFindAndModify: false, //check
        }
      )
      .then((m) => m.connection.getClient());

    //Required logic for integrating with Express
    const app = express();
    if (process.env.NODE_ENV === "development") {
      app.use(morgan("dev"));
    }
    // for fetch - it can be used cors or Access-Control-Allow-Origin
    // Allow cross-origin
    //app.use(cors()); //configured below
    app.disable("x-powered-by");

    app.use(
      session({
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
          httpOnly: true, //test
          sameSite: true,
          // sameSite: false, // for axios
          // secure: false // FOR LOCAL DEVELOPMENT
          secure: process.env.NODE_ENV === "production", // FOR HEROKU
        },
      })
    );
    //app.use(express.json());

    // app.use(express.urlencoded({extended:false})) //for FORMS processing
    app.use("/api/v1/appointments", schedulerRoutes);
    app.use("/api/v1/dataGrid", dataGridRoutes);
    app.use("/api/v1/fullCalendar", fullCalendarRoutes);

    // to force express to recognize connection as HTTPS and receive cookie with 'secure' set
    // app.set('trust proxy', 1)
    if (app.get("env") === "production") {
      app.set("trust proxy", 1); // trust first proxy
    }

    const appolloserver = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      //plugins: [], //plugins go here
      //plugins: [process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageProductionDefault() : ApolloServerPluginLandingPageLocalDefault({ embed: false })],
    });
    // Ensure we wait for our server to start
    await appolloserver.start(); //await is a must

    //server.applyMiddleware({ app, cors: false }); //Appollo V3

    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    //using ApolloServer<BaseContext>
    app.use(
      //"/graphql", // Appollo V3
      "/",
      //cors({ origin: ['https://www.your-app.example', 'https://studio.apollographql.com'] }),
      cors(), //works with and without
      // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
      //bodyParser.json({ limit: '50mb' }),
      json(),
      expressMiddleware(appolloserver, {
        context: async ({ req, res }) => ({ req, res }), //works
        //context: ({ req, res }) => ({ req, res }), //works
      })
    );
    await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
    //console.log(`Server ready at http://localhost:4000/graphql`);
    console.log(`Server ready at http://localhost:4000/`);

    // if (process.env.NODE_ENV === "production") {
    //   console.log("we are on production: ", process.env.SESS_SECRET);
    //   app.use(express.static("client/build"));
    //   app.get("/*", (req, res) => {
    //     res.sendFile(
    //       path.resolve(__dirname, "../client", "build", "index.html")
    //     );
    //   });
    // }

    // const PORT = process.env.PORT || 4000;
    // app.listen({ port: PORT }, () => {
    //   console.log(`http://localhost:${PORT}${server.graphqlPath}`);
    //   console.log("process.env.SESS_NAME: ", process.env.SESS_NAME);
    // });
  } catch (e) {
    console.error("server errors: ", e);
  }
})();
