const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const app = express();
const PORT = 3000;

const limiter = rateLimit({
  windowMs: 10000,
  max: 5,
  message: "Try harder to make my battery boom lol",
})

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(limiter)

// app.use("/api/message", limiter);
// app.use("/api/messages", limiter);
// app.use("/api/battery", limiter);

const MESSAGES_FILES = "messages.json";

let messages = [];
if (fs.existsSync(MESSAGES_FILES)) {
  messages = JSON.parse(fs.readFileSync((MESSAGES_FILES)));
}

app.get("/api/messages", (req, res) => {
  res.json(messages.slice(-20).reverse());
})

app.post("/api/message", (req, res) => {
  let { message, captchaAnswer, captcha } = req.body;
  if (!message || !captchaAnswer || !captcha) return res.status(400).send("Missing fields");

  //maybe some captcha verif here 

  if (messages.length > 20) messages.shift();
  message = message.substring(0, 1000);
  messages.push({ message, time: new Date().toISOString() });
  fs.writeFileSync(MESSAGES_FILES, JSON.stringify(messages, null, 2));
  res.json({ success: true });
});

app.get("/api/battery", (req, res) => {
  exec("./test_cmd", (err, stdout) => {
    if (err) return res.status(500).send("termux-battery-status error");
    res.json({ battery: stdout.trim() });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


