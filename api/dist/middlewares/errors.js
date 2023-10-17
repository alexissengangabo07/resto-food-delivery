"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(error, req, res, next) {
    let errorMessage = "Une erreur s'est produite";
    if (error instanceof Error)
        errorMessage = error.message;
    console.error(errorMessage);
    res.status(500).json({ error: errorMessage });
}
exports.default = default_1;
