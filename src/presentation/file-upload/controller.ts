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

        const type = req.params.type as string;
        const validTypes = ['users', 'products', 'categories'];

        if (!validTypes.includes(type)) {
            return res.status(400).json({error: `Invalid type ${type}, valid ones are ${validTypes.join(', ')}`});
        }

        const file = req.body.files[0] as UploadedFile;
        this.fileUploadService.uploadFile(file, `uploads/${type}`)
            .then(uploaded => res.status(200).json(uploaded))
            .catch(error => this.handledError(error, res))

    }

    public uploadMultipleFiles = async (req: Request, res: Response) => {
        const type = req.params.type as string;
        const validTypes = ['users', 'products', 'categories'];

        if (!validTypes.includes(type)) {
            return res.status(400).json({error: `Invalid type ${type}, valid ones are ${validTypes.join(', ')}`});
        }

        const files = req.body.files as UploadedFile[];
        this.fileUploadService.uploadMultipleFiles(files, `uploads/${type}`)
            .then(uploaded => res.status(200).json(uploaded))
            .catch(error => this.handledError(error, res))
    }
}