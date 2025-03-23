require('dotenv').config();  

module.exports = {
  database: process.env.MONGO_URI, 
  secret: process.env.JWT_SECRET  
};
