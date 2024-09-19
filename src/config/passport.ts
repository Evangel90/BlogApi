import User from "../models/user.model";
const { Strategy, ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
import dotenv from "dotenv";

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SECRET",
};

module.exports = (passport: { use: (arg0: any) => void }) => {
  passport.use(
    new Strategy(
      opts,
      async (
        payload: { user_id: any },
        done: (arg0: null, arg1: boolean) => any
      ) => {
        await User.findById(payload.user_id)
          .then((user: any) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(() => {
            return done(null, false);
          });
      }
    )
  );
};

//Google Strategy
module.exports = (passport: { use: (arg0: any) => void }) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/users/profile",
        passReqToCallback: true,
      },
      async (
        request: any,
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: (arg0: any, arg1: any) => any
      ) => {
        // await User.findOrCreate({ googleId: profile.id }, function (err: any, user: any) {
        // });
        return done(null, profile);
      }
    )
  );
};
