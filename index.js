const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const editJsonFile = require("edit-json-file");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/video", express.static(__dirname + "public/video"));

app.set("view engine", "ejs");
app.set("views", "./views");

var cocktailDB = editJsonFile("data/cocktails.json");

app.get("/", (req, res) => {
  res.render("pages/index", {
    head: {
      url: "https://" + req.get("host") + req.originalUrl,
    },
  });
});

app.get("/accommodation", (req, res) => {
  res.render("pages/accommodation", {
    head: {
      url: "https://" + req.get("host") + req.originalUrl,
    },
    data: require("./data/accommodation.json"),
  });
});

app.get("/accommodation/:slug", (req, res) => {
  const slug = req.params.slug;
  const data = require("./data/accommodation.json");
  const accommodation = data.find(
    (accommodation) => accommodation.slug === slug,
  );
  if (accommodation) {
    res.render("pages/accommodation-detail", {
      head: {
        url: "https://" + req.get("host") + req.originalUrl,
      },
      accommodation,
    });
  } else {
    res.render("pages/404", {
      head: {
        url: "https://" + req.get("host") + req.originalUrl,
      },
    });
  }
});

app.get("/dining", (req, res) => {
  res.render("pages/dining", {
    head: {
      url: "https://" + req.get("host") + req.originalUrl,
    },
    le12: require("./data/le12.json"),
  });
});

app.post("/api/cocktail", (req, res) => {
  const ingredients = req.body.ingredients;
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    res.status(400).send("Bad request");
    return;
  }
  var id = Math.random().toString(36).substr(2, 9);
  try {
    cocktailDB.set(id, ingredients);
    cocktailDB.save();
    res.json({
      id,
    });
  } catch (e) {
    res.status(500).send("Internal server error");
    return;
  }
});

app.get("/cocktail/:id", (req, res) => {
  if (cocktailDB.get(req.params.id)) {
    res.render("pages/cocktail", {
      head: {
        url: "https://" + req.get("host") + req.originalUrl,
      },
      ingredients: cocktailDB.get(req.params.id),
    });
  } else {
    res.render("pages/404", {
      head: {
        url: "https://" + req.get("host") + req.originalUrl,
      },
    });
  }
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});

app.all("*", (req, res) => {
  res.render("pages/404", {
    head: {
      url: "https://" + req.get("host") + req.originalUrl,
    },
  });
});

app.listen(port, () => {
  console.log(`Le serveur est lancé sur le port ${port}`);
});
