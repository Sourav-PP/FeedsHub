import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log('--- 🚀 Incoming Request Details ---');
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`);
    console.log(`Content-Type: ${req.headers['content-type']}`); // Crucial for file uploads!

    // IMPORTANT: req.body will be empty here UNLESS a prior body-parser 
    // (like express.json() or express.urlencoded()) has run globally.
    // However, the Content-Type header tells you what to expect.
    console.log('Req.Body (Raw State):', 
    typeof req.body === "object" 
        ? JSON.stringify(req.body, null, 2) 
        : req.body
);
    console.log("req.files:", req.files);
    console.log("req.file:", req.file);
    console.log('-----------------------------------');
    
    next();
};