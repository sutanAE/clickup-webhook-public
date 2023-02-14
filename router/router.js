import {Router} from "express";
import { getTasks, createTask, editTask, getSingleTask, handleWebhook, updateCustom } from "../modules/functions.js";
import * as dotenv from 'dotenv'
import { routerConfig } from "./router.config.js";
dotenv.config()

export const router = Router()

router.get("/",(req,res)=>{
    return res.status(200).send({message: "clickup webhook api handler"})
})


router.get("/clickup", async (req,res)=>{
    return res.status(200).send({message: await getTasks({listId: routerConfig.listId, apiKey: process.env.APIKEY})})
})


router.get("/clickup/create", async (req,res)=>{
    return res.status(200).send({message: await createTask({listId: routerConfig.listId, apiKey: process.env.APIKEY})})
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
    return res.status(200).send({status:200, message: "hello from router!"})
})


router.get("/clickup/webhook/", async (req,res)=>{
    return res.status(200).send({status:200, message: "clickup webhook"})
})

router.post("/clickup/webhook/print", async (req,res)=>{
    console.log("HEADERS")
    console.log(req.headers)
    console.log("BODY \n")
    console.log(req.body)
    return res.status(200).send({status:200, message: "clickup webhook"})
})

router.get("/clickup/webhook/:taskId/edit", async (req,res)=>{
    const data = await updateCustom({taskId: req.params.taskId, apiKey: process.env.APIKEY, fieldId: routerConfig.affectedField})
    return res.status(200).send({status:200, message: data})
})


router.post("/clickup/webhook/:taskId/edit", async (req,res)=>{
    console.log("HEADERS")
    console.log(req.headers)
    console.log("BODY \n")
    console.log(req.body)
    const data = await updateCustom({taskId: req.params.taskId, apiKey: process.env.APIKEY, fieldId: routerConfig.affectedField})
    return res.status(200).send({status:200, message: data})
})

router.get("/clickup/webhook/:taskId", async (req,res)=>{
    console.log("sending to handleWebhook")
    const result = await handleWebhook({taskId: req.params.taskId, apiKey: process.env.APIKEY})
    console.log("receiving data from handleWebhook")

    const {value } = result.custom_fields.filter((d)=>{return d.id == routerConfig.customField})[0]
    const relatedTaskIds = value.map(x => x.id)
    // return res.status(200).send(relatedTaskIds)
    return res.status(200).send(result)
})
