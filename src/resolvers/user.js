import Joi from "joi";
import { signUp, signIn, objectId } from "../schemas";
import { attemptSignIn, signOut } from "../auth";
import { User } from "../models";

// function isAuthenticated(session) {
//   return session.user != undefined;
// }
export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      return User.findById(req.session.userId);
    },
    users: (root, args, context, info) => {
      // TODO: projection, pagination
      return User.find({});
    },
    user: async (root, args, context, info) => {
      // TODO: projection
      await Joi.validate(args, objectId);
      return User.findById(args.id);
    },
    openSession: (root, args, { req }, info) => {
      // TODO: projection
      console.log("openSession: ", req.session.userId);
      if (req.session.userId) {
        // console.log(User.findById(req.session.userId))
        return User.findById(req.session.userId);
      } else {
        return null;
      }
      // if (req.session.userId) return true
      // else return false
    },
    isLoggedIn: (root, args, { req }, info) => {
      // TODO: projection
      if (req.session.userId) {
        // console.log(User.findById(req.session.userId))
        return true;
      } else {
        return false;
      }
      // if (req.session.userId) return true
      // else return false
    },
    isConnected: (root, args, { req }, info) => {
      // console.log(req.session.userId)
      console.log(req.session);
      return true;
    },
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: projection
      console.log("Mutation - SignUp");
      await Joi.validate(args, signUp, { abortEarly: false });

      const user = await User.create(args);

      req.session.userId = user.id;

      return user;
    },
    signIn: async (root, args, { req }, info) => {
      console.log("Mutation - signIn");
      // TODO: projection
      await Joi.validate(args, signIn, { abortEarly: false });
      try {
        const user = await attemptSignIn(args.email, args.password);
        req.session.userId = user.id;
        return user;
      } catch (err) {
        console.log("signIn-error: ", err);
      }
    },
    signOut: (root, args, { req, res }, info) => {
      console.log("Mutation - signOut");
      return signOut(req, res);
    },
  },
  User: {
    chats: async (user, args, { req }, info) => {
      // TODO: should not be able to list other ppl's chats or read their msgs!
      return (await user.populate("chats").execPopulate()).chats;
    },
  },
};
