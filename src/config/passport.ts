import User from '../models/user.model';
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SECRET"
};

module.exports = (passport: { use: (arg0: any) => void }) => {
  passport.use(
    new Strategy(opts, async (payload: { user_id: any; }, done: (arg0: null, arg1: boolean) => any) => {
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
    })
  );
};