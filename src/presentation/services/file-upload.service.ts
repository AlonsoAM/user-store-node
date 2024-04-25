import {UploadedFile} from "express-fileupload";
import path from "path";
import * as fs from "fs";

export class FileUploadService {

    constructor() {
    }

    private checkFolder = (folderPath: string) => {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    public uploadFile = async (file: UploadedFile, folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) => {
        try {
            const fileExtension = file.mimetype.split('/').at(1);
            const destination = path.resolve(__dirname, `../../../`, folder);
            this.checkFolder(destination);
            file.mv(destination + `/mi-imagen.${fileExtension}`);
        } catch (e) {
            console.log({e});
        }

    }

    public uploadMultipleFiles = async (file: UploadedFile[], folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) => {
        throw new Error("Method not implemented.");
    }

}
