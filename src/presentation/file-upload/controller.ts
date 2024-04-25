import {Response, Request} from "express";
import {CustomError} from "../../domain";
import {FileUploadService} from "../services/file-upload.service";
import {UploadedFile} from "express-fileupload";

export class FileUploadController{
    constructor( private readonly fileUploadService: FileUploadService){}

    private handledError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message});
        }
        console.log(`${error}`);
        return res.status(500).json({error: "Internal Server Error"});
    };

    public uploadFile = async (req: Request, res: Response) => {

        const files = req.files;

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({error: "No files were selected."});
        }

        const file = req.files.file as UploadedFile;
        this.fileUploadService.uploadFile(file)
            .then(uploaded => res.json({message: "File uploaded successfully"}))
            .catch(error => this.handledError(error, res))

    }

    public uploadMultipleFiles = async (req: Request, res: Response) => {
        res.json({message: "Multiple Files uploaded successfully"});
    }
}