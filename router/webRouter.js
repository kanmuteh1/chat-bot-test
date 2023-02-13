// const express = require('express');
import express from 'express';
import { homeView } from '../controllers/webPageController.js';
const router = express.Router();

export const home = router.get('/', homeView);
