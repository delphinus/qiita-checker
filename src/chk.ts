import {RequestHandler}from'express'

export const chk: RequestHandler=(req,res)=>
res.status(200).send('Hello, World!').end()
