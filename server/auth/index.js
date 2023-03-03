const router = require("express").Router();
const {
  models: { User, Board, UserBoard },
} = require("../db");
const requestIp = require("request-ip");

// an example that assumes a req.body that contains identifying key-value pairs (like an email field), and that users have some instance method to evaluate the password on req.body
router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// A sign up route that will create a user. Once the user is created, it should be set as the user on the session.
router.post("/signup", async (req, res, next) => {
  try {
    const clientIp = req.headers["x-forwarded-for"]
      ? req.headers["x-forwarded-for"].split(",")[0]
      : req.connection.remoteAddress;
    const user = await User.create(req.body);
    const newBoard = await Board.create({
      boardName: "Your Default Board",
      creatorId: user.id,
    });
    const userBoard = await UserBoard.create({
      boardId: newBoard.id,
      userId: user.id,
      privilege: "ADMIN",
    });
    const updateIp = await user.update({ ip: clientIp });

    console.log(`***
    ***
    ***
    Logging:New user has been created
    ***
    ***
    ***
    `, user);

    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
