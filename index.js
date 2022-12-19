const express = require("express");
const fs = require("node:fs");

const app = express();

app.use(express.json());

app.get("/counter/:bookId", (req, res) => {
  const { bookId } = req.params;
  if (fs.existsSync("data.js")) {
    fs.readFile("data.js", "utf-8", function (_, data) {
      const result = JSON.parse(data);
      res.json(`${result[bookId]}`);
    });
  }
});

app.post("/counter/:bookId/incr", (req, res) => {
  const { bookId } = req.params;
  if (!fs.existsSync("data.js")) {
    const countObj = { [bookId]: 1 };
    fs.writeFileSync("data.js", JSON.stringify(countObj), (err) => {
      if (err) throw Error(err);
    });
  } else {
    fs.readFile("data.js", "utf-8", function (_, data) {
      const res = JSON.parse(data);
      if (res[bookId]) {
        res[bookId] += 1;
      } else {
        res[bookId] = 1;
      }
      fs.writeFileSync("data.js", JSON.stringify(res), (err) => {
        if (err) throw Error(err);
      });
    });
  }

  res.json("ok");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});
