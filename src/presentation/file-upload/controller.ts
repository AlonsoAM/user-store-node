import {Response, Request} from "express";
import {CustomError} from "../../domain";

export class FileUploadController{
    constructor(){}

    private handledError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        console.log(`${error}`);
        return res.status(500).json({error: "Internal Server Error"});
    };

    public uploadFile = async (req: Request, res: Response) => {
        res.json({message: "File uploaded successfully"});
    }

    public uploadMultipleFiles = async (req: Request, res: Response) => {
        res.json({message: "Multiple Files uploaded successfully"});
    }
}