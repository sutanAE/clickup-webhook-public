// Sutan.mufti@ambersideenergy.com
// This server is for testing only
// deployment to WAN; connecting to Clickup API network

// create a .env file with the APIKEY=$APIKEY value; look for clickup documentation.

import express from 'express'
import { router } from './router/router.js';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json());


router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(200).send({status: 500, message: "something broke in the server"})
  })

app.use("/api", router)

app.get("/",(req,res)=>{

    return res.status(200).send({message: "hello world!"})
})


app.listen(3000, ()=> {
    console.log("listening on 3000")
})