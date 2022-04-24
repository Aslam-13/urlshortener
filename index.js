const express = require('express');
const mongoose = require('mongoose');
const shortUrl = require('./modals/shortUrl');
   const app = express();
   dotenv.config();

   
   const url = process.env.MONGO;
 
mongoose.connect(url , {
  useNewUrlParser: true, useUnifiedTopology: true
})
app.use(express.urlencoded({ extended: true}));
 app.set('view engine', 'ejs');
 
  
app.get('/', async (req, res) => {
  const shortUrls = await shortUrl.find(); 
  res.render('index', {shortUrls});
 })
 app.post('/shortUrls', async (req, res) => { 
     await shortUrl.create({full: req.body.name});
   res.redirect('/')
 
 })
 app.get('/:url', async(req, res) =>{
   const value = await shortUrl.findOne({short: req.params.url})
   if(value === null){
     return res.sendStatus(404);
   }
   value.clicks++;
   value.save();
   res.redirect(value.full);
   })
app.listen(process.env.PORT || 3000);