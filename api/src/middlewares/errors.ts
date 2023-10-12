import { NextFunction, Request, Response } from "express";

export default function (error: unknown, req: Request, res: Response, next: NextFunction) {
    let errorMessage = "Une erreur s'est produite";
    if (error instanceof Error) errorMessage = error.message;
    console.error(errorMessage);

    res.status(500).json({ error: errorMessage });
}