const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const database = require("./database");

// const memos = [];

app.use(cors());
app.use(express.json());

app.get("/api/memos", async (_요청, 응답) => {
  const result = await database.run("SELECT * FROM memos");
  응답.send(result);
});

app.post("/api/memos", async (요청, 응답) => {
  await database.run("INSERT INTO memos (content) VALUES (?)", [요청.body.content]);
  const result = await database.run("SELECT * FROM memos");
  응답.send(result);
});

app.put("/api/memos/:id", async (요청, 응답) => {
  console.log(요청.body.editContent);
  await database.run(`UPDATE memos SET content=? WHERE id=?`, [요청.body.editContent, 요청.params.id]);
  const result = await database.run("SELECT * FROM memos");
  응답.send(result);
});

app.delete("/api/memos/:id", async (요청, 응답) => {
  await database.run(`DELETE FROM memos WHERE id=?`, [요청.params.id]);
  const result = await database.run("SELECT * FROM memos");
  응답.send(result);
});

app.listen(port, () => {
  console.log(`${port}번 작동 중`);
});
