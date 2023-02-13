import express from 'express';
const router = express.Router();
import {converse, subscribeApp} from '../controllers/chatbotController.js'

export const convo = router.post('/webhook', converse)
export const connect = router.get('/webhook',subscribeApp)