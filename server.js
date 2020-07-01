// Create express app
var express = require("express")
var cors = require('cors')
var app = express()
var db = require("./database.js")


app.use(cors())

// Server port
var HTTP_PORT = 3000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/cnpj/:id", (req, res, next) => {
    var sql = "select * from cnpj_dados_cadastrais_pj where cnpj = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});