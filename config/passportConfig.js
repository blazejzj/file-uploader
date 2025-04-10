const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../prisma/queries");

function configurePassport(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await db.getUserByUsername(username);
                if (!user) {
                    return done(null, false, {
                        message: "Username or password is incorrect",
                    });
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, {
                        message: "Username or password is incorrect",
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await db.getUserById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = configurePassport;
