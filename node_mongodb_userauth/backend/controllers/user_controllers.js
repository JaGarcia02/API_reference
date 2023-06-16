const user_models = require("../models/user_models");
const bcrypt = require("bcrypt");
const key = require("../middlewares/TokenAuthenticaton");
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  // --- hashed password --- //
  const HashedPassword = bcrypt.hashSync(password, 10);
  try {
    // --- cheking the user if existing --- //
    const UserExist = await user_models.findOne({ email: email });
    if (UserExist) {
      res.status(400).json({
        message: "Email is already taken!, Please proceed to login.",
      });
    } else {
      const signup = await user_models.create({
        name: name,
        email: email,
        password: HashedPassword,
      });

      return res
        .status(200)
        .json({ signup, message: "User Created", status: "Success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Error" });
    throw new Error(error);
  }
};

const UsersList = async (req, res) => {
  try {
    const userlist = await user_models
      .find({})
      .sort({ createdAt: "descending" });
    return res.status(200).json(userlist);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Error" });
    throw new Error(error);
  }
};

const LogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // --- cheking the user if existing --- //
    const UserExist = await user_models.findOne({ email: email });
    const PasswordCorrect = bcrypt.compareSync(password, UserExist.password);
    if (!UserExist) {
      return res.status(400).json({
        message: "Email is not existing!, Please signup.",
      });
    } else if (!PasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Password didn't match!", status: "Error" });
    } else {
      // --- jsonwebtoken (this will create a new token every login) --- //
      const token = jwt.sign(
        { id: UserExist.id, name: UserExist.name, email: UserExist.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30s",
        }
      );
      // --- this will save the token to the cookie --- //
      res.cookie(String(UserExist._id), token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        sameSite: "lax",
      });
      // --- this will return a message of the response --- //
      return res.status(200).json({
        message: "Login Successful",
        status: "Success",
        encrypted_data: token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Error" });
    throw new Error(error);
  }
};

const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  // --- hashed password --- //
  const HashedPassword = bcrypt.hashSync(password, 10);
  try {
    // --- validate if --- //
    const updateuser = await user_models.findByIdAndUpdate(id, {
      email: email,
      password: HashedPassword,
    });
    const updated_data = await user_models.findById(id);
    if (!updateuser) {
      return res
        .status(400)
        .json({ message: "User not found, update failed!", status: "Error" });
    } else {
      return res
        .status(200)
        .json({ updated_data, message: "User upadated", status: "Success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Error" });
    throw new Error(error);
  }
};

const UpadateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await user_models.findById(id);
    const updated_data = await user_models.findByIdAndUpdate(id, {
      name: name,
    });
    return res.status(200).json({
      updated_data,
      message: "User info upadated.",
      status: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Error" });
    throw new Error(error);
  }
};

const DeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const delete_student = await user_models.findByIdAndDelete(id);
    if (!delete_student) {
      return res
        .status(400)
        .json({ message: "User not found, deletion failed!", status: "Error" });
    } else {
      return res.status(200).json({
        message: "User has been successfully removed.",
        status: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Error" });
    throw new Error(error);
  }
};

// --- getting token to be validated by the middleware --- //
const GetUserToken = async (req, res) => {
  const userID = req.id;
  try {
    const user = await user_models.findById(userID, "-password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found!", status: "Error" });
    } else {
      return res
        .status(200)
        .json({ user, message: "Token is valid.", status: "Success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: "Error" });
    throw new Error(error);
  }
};

module.exports = {
  SignUp,
  UsersList,
  LogIn,
  UpdateUser,
  UpadateUserInfo,
  DeleteUser,
  GetUserToken,
};
