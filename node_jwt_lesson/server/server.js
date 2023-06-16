const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const users = [
  {
    id: "1",
    username: "Ja",
    password: "@bcd!2E4",
    isAdmin: true,
  },
  {
    id: "2",
    username: "Kevin",
    password: "qwerty",
    isAdmin: true,
  },
  {
    id: "3",
    username: "Rose",
    password: "12345",
    isAdmin: false,
  },
  {
    id: "4",
    username: "Bob",
    password: "12345",
    isAdmin: false,
  },
];

let refreshTokens = [];

app.post("/api/refresh", (req, res) => {
  // token the refresh token from the user
  const refreshToken = req.body.token;
  // send token if there is no token or it's invalid
  if (!refreshToken) {
    return res.status(401).json("You are not authenticated!");
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  // validate refresh token
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    //create new access token, and refresh token
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateAccessToken(user);

    refreshTokens.push(newRefreshToken);
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, isAdmin: user.isAdmin },
    "mySecretKey",
    { expiresIn: "15m" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, isAdmin: user.isAdmin },
    "myRefreshSecretKey"
  );
};

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    // res.json(user);
    // generate an acces token

    // this is the structre to create a jwt token
    // *** user is the valu of the users array *** //
    // const accessToken = jwt.sign(
    //   { id: user.id, username: user.username, isAdmin: user.isAdmin }, // you can add any data to be encrypted here
    //   // by getting the id from the user id in the database: username is the value of the user from the users array username: isAdmin is the value of isAdmin in user
    //   // *** user will be the calling function from users to get the data in the users array *** //
    //   "mySecretKey",
    //   { expiresIn: "15m" }
    // );
    // const refreshToken = jwt.sign(
    //   {
    //     id: user.id,
    //     username: user.username,
    //     isAdmin: user.isAdmin,
    //   },
    //   "myRefreshSecretKey",
    //   { expiresIn: "15m" }
    // );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    res
      .status(400)
      .json("Username and Password not found or wrong Password and Username");
  }
  //   res.json("This works");
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(404).json("You are not authenticated!");
  }
};

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully!");
});

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted!");
  } else {
    res.status(403).json("You are not allowed to delete this user!!!");
  }
});

app.listen(5000, () => console.log("Backend server is running"));
