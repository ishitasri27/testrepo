const express = require("express");
const app = express();

const AUTHOR_MODEL = require("./models/author");
const NEWS_MODEL = require("./models/news");

const bcrypt = require("bcryptjs"); 

app.use(express.json());

const mongoose = require("mongoose");
const databaseconnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/myfirstdatabase");
    console.log("Database successfully connected");
  } catch (error) {
    console.log(error);
  }
};

app.post("/authors", async (req, res) => {
  try {
    let encryptedpassword = await bcrypt.hash(req.body.password, 12);
    const newauthor = new AUTHOR_MODEL({
      name : req.body.name, 
      email : req.body.email,
      password : encryptedpassword,
      phonenumber : req.body.phonenumber,
      address : req.body.address,
      publishedarticles : req.body.publishedarticles
    });
    console.log(req.body);
    await newauthor.save();
    res.json({ success: true, message: "New data created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
});
    
    app.post("/news", async (req, res) => {
        try {
          const newnews = new NEWS_MODEL({
            headline : req.body.headline,
            description : req.body.description,
            location : req.body.location,
            newsauthor : req.body.newsauthor
          });
          console.log(req.body);
          await newnews.save();
    res.json({ success: true, message: "New data created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get("/gettingauthor", async (req, res) => {
    try {
      console.log("Fetching authors from databse");
      const authordata = await AUTHOR_MODEL.find();
      res.json({ success: true, authordata });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  app.get("/gettingnews", async (req, res) => {
    try {
      console.log("Fetching news from databse");
      const newsdata = await NEWS_MODEL.find();
      res.json({ success: true, newsdata });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  //updating Name of the author
  app.put("/updateauthor", async (req, res) => {
    try {
      const updateddocument = await AUTHOR_MODEL.findOneAndUpdate(
        { email: req.body.email }, 
        { name: req.body.name } 
      );
      res.json({ success: true });
    } catch (error) {
        console.log(error);
      res.status(400).json({ success: false });
    }
  });

  //getting News published by a particular Author
  app.get("/getnewsAuthor", async (req, res) => {
    try {
      const authorname = req.body.authorname;
      const newsData = await NEWS_MODEL.find(authorname);
      console.log(newsData);
      res.json({ success: true, newsData });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  //getting News of a  particular location
  app.get("/getnewsLocation", async (req, res) => {
    try {
      const location = req.body.location;
      const newsData = await NEWS_MODEL.find(location);
      console.log(newsData);
      res.json({ success: true, newsData });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  //deleting a News
  app.delete("/deactivate", async (req, res) => {
    try {
      const deleteddocument = await NEWS_MODEL.findOneAndDelete({
        headline: req.params.headline, 
      });
      res.json({ success: true });
    } catch (error) {
        console.log(error);
      res.status(400).json({ success: false });
    }
  });
  
  databaseconnection();
  
  let port = 5000;
  app.listen(port, () => console.log(`Server is running at ${port}`));