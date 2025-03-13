import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import app from '../../core/app.js';
export const helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
export const heloo = onRequest((request, response) => {
    logger.info("heloo logs!", { structuredData: true });
    response.send("Hello!");
});
export const api = onRequest(app);
