const express = require('express')
const { route } = require('./routes/routes')
const app = express()
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const port = 4000


app.use("/files", express.static("uploads")) /* Definindo rota estatica para uma pasta local (uploads) */

app.use(cors());

app.use(express.json());

app.use(route)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = { app }
