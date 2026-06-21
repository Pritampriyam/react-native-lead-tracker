const express = require("express");
const { getIO } = require("../config/socket");
const { sampleLead } = require("../services/leadService");

const router = express.Router();

// Meta Webhook Verification
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (token === "my_verify_token") {
      return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
  }

  res.send("Webhook Route Working");
});

// Meta Webhook Event Receiver
router.post("/", (req, res) => {
  console.log("Webhook Received:");
  console.log(JSON.stringify(req.body, null, 2));

  getIO().emit("newLead", {
    ...sampleLead,
    id: Date.now().toString(),
  });

  return res.sendStatus(200);
});

module.exports = router;