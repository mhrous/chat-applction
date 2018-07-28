const { Router } = require("express");

const { getChat, createChat } = require("../middlewares/chat");

const { getAllUsers, getChatList } = require("../middlewares/user");

const { register, logIn } = require("../middlewares/authentication");

const { downlodeFile } = require("../middlewares/file");

const router = Router();

// router.use("/users", userRouter);
// router.use("/chat", chatRouter);
// router.use("/", authentication);
router.post("/register", register);
router.post("/login", logIn);

router.post("/chat/new", createChat);
// router.post("/chat/message/:id", newMessage);
router.get("/chat/:id", getChat);

router.get("/users", getAllUsers);
router.get("/users/chat-list/:id", getChatList);

router.get("/public/:path/:name", downlodeFile);

module.exports = router;
