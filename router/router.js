import {Router} from "express";
import { getTasks, createTask, editTask, getSingleTask } from "../modules/functions.js";
import * as dotenv from 'dotenv'
dotenv.config()

export const router = Router()

router.get("/",(req,res)=>{
    return res.status(200).send({message: "clickup webhook api handler"})
})


router.get("/clickup", async (req,res)=>{
    return res.status(200).send({message: await getTasks({listId: 900500459390, apiKey: process.env.APIKEY})})
})


router.get("/clickup/create", async (req,res)=>{
    return res.status(200).send({message: await createTask({listId: 900500459390, apiKey: process.env.APIKEY})})
})

router.get("/clickup/edit/:taskId", async (req,res)=>{
    return res.status(200).send({message: await editTask({taskId: req.params.taskId, apiKey: process.env.APIKEY})})
})

router.get("/clickup/get/", async (req,res)=>{
    return res.status(200).send({message: "get task id api. provide a :taskId in param"})
})

router.get("/clickup/get/:taskId", async (req,res)=>{
    return res.status(200).send({message: await getSingleTask({taskId: req.params.taskId, apiKey: process.env.APIKEY})})
})

router.get("/router",(req,res)=>{
    return res.status(200).send({message: "hello from router!"})
})