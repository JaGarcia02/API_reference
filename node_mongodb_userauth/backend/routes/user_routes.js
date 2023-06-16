const express = require("express");
const VerifyToken = require("../middlewares/TokenAuthenticaton");
const router = express.Router();
const {
  SignUp,
  UsersList,
  LogIn,
  UpdateUser,
  UpadateUserInfo,
  DeleteUser,
  GetUserToken,
} = require("../controllers/user_controllers");

// --- post request --- //
router.post("/signup", SignUp);
router.post("/login", LogIn);

// --- put request --- //
router.put("/update-user/:id", UpdateUser);
router.put("/update-user-info/:id", UpadateUserInfo);

// --- get request --- //
router.get("/view-users", UsersList);
router.get("/verify-token", VerifyToken, GetUserToken);

// --- delete request --- //
router.delete("/delete-user/:id", DeleteUser);

module.exports = router;
