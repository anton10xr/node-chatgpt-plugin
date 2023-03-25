const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const bodyParser = require("body-parser");

const openapi = require("./openapi.js");
const aiPluginManifest = require("./ai-plugin.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const getHostUrl = (req) => `${req.protocol}://${req.headers.host}`;

const TODOS = {};

app.post("/todos/:username", (req, res) => {
  const username = req.params.username;
  const todo = req.body.todo;

  if (!TODOS[username]) {
    TODOS[username] = [];
  }

  TODOS[username].push(todo);
  res.status(200).send("OK");
});

app.get("/todos/:username", (req, res) => {
  const username = req.params.username;
  res.status(200).json(TODOS[username] || []);
});

app.delete("/todos/:username", (req, res) => {
  const username = req.params.username;
  const todoIdx = req.body.todo_idx;

  if (0 <= todoIdx && todoIdx < (TODOS[username] || []).length) {
    TODOS[username].splice(todoIdx, 1);
  }

  res.status(200).send("OK");
});

app.get("/logo.png", (req, res) => {
  res.sendFile("pub/logo.png", { root: __dirname }, (err) => {
    if (err) {
      res.status(404).send("Logo not found");
    }
  });
});

app.get("/.well-known/ai-plugin.json", async (req, res) => {
  const manifest_json = aiPluginManifest(getHostUrl(req));
  res.set("Content-Type", "application/json").send(manifest_json);
});

app.get("/openapi.json", (req, res) => {
  const openapi_json = openapi(getHostUrl(req));
  res.set("Content-Type", "application/json").json(openapi_json);
});

const main = () => {
  const port = +process.env.PORT || 5002;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
};

main();
