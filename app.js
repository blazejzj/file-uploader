require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const app = express();

// routers
const indexRouter = require("./routes/indexRouter");
const registerRouter = require("./routes/registerRouter");
// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// forms
app.use(express.urlencoded({ extended: true }));

// sessions
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
        store: new PrismaSessionStore(new PrismaClient(), {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);
app.use(passport.session());
app.use((req, res, next) => {
    // give us global access to user provided with passport
    res.locals.user = req.user;
    next();
});

// routes
app.use("/", indexRouter);
app.use("/register", registerRouter);

// start
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server has now started.");
});
