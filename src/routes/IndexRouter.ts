import { Router, Request, Response, NextFunction } from 'express';
import  * as HttpStatus  from 'http-status-codes';
import fs from 'fs';
import MimeType from 'mime-types';
import path from 'path';

import { GetUserRepo, GetCourseRepo } from '../container/ContainerProvider';
import { handleError } from '../handlers/ErrorHandler';
import { log, LogLevel } from '../logger/ILogger';
import { UserType } from '../models/UserModel';


const CONTROLLER_NAME = 'UserRouter';


var stremOption = {
    method: 'GET',
    request: {
        accept: '*/*'
    },
    response: {
        'content-type': ''
    }
};

interface MimeResult {
    path: String,
    mime: String | Boolean
}

class IndexRouter {    

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    // public ResourceScript(line: string): Boolean {
    //     if (/<script/.test(line) && /src=/.test(line)) {
    //         return line.match(/src="([^"]*)"/)[1] !== '';
    //     }

    //     return false;
    // };

    // ResourceStyleseet(line: string): Boolean {
    //     if (/<link/.test(line) && /stylesheet/.test(line) && /href=/.test(line)) {
    //         return line.match(/href="([^"]*)"/)[1] !== '';
    //     }

    //     return false;
    // };

    // ResourceImage(line: string): Boolean {
    //     if (/<img/.test(line) && /src=/.test(line)) {
    //         return line.match(/src="([^"]*)"/)[1] !== '';
    //     }

    //     return false;
    // };

    // private ResourceFileList(filePath: string, option: any) {
    //     var result:MimeResult[] = [];
    //     var regFile = /\/.*?([\/\w\.]+)[\s\?]?.*/;
    //     var regExt = /\.(.*)/;

    //     fs.readFileSync(filePath, option).split(/\n/).filter(function (line) {
    //         var file = void 0;
    //         if (this.ResourceScript(line)) {
    //             file = this.ResourceScript(line);
    //         } else if (this.ResourceStyleseet(line)) {
    //             file = this.ResourceStyleseet(line);
    //         } else if (this.ResourceImage(line)) {
    //             file = this.ResourceImage(line);
    //         } else {
    //             return false;
    //         }

    //         var fileExtention = file.split(regExt)[1];

    //         result.push({
    //             path: file,
    //             mime: MimeType.lookup(fileExtention)
    //         });
    //     });

    //     return result;
    // };

    // public CreateResourcefileMap(viewFileDi: string) {
    //     var result = {};

    //     return new Promise(function (resolve, reject) {
    //         fs.readdir(viewFileDir, function (error, file) {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }

    //             Promise.all(file.map(function (fileName) {
    //                 var list = [];
    //                 var viewfilePath = viewFileDir + '/' + fileName;
    //                 var option = { encoding: 'utf8' };
    //                 result[viewPath + '/' + fileName] = this.resourceFileList(viewfilePath, option);
    //                 return result;
    //             })).then(resolve(result));
    //         });
    //     });
    // };
    public routes() {
    // using server push middlewear
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            // resorceFileMap = {
            //      'filename': [
            //          {
            //              'path': 'file/to/path',
            //              'mime': 'file-mime-type'
            //          }
            //      ]
            //  }
            // createResourcefileMap(viewPath + req.url).then(function (resorceFileMap) {
            //     var pushFiles = this.ResorceFileMap[viewPath + '/index.html'];

            //     pushFiles.forEach(function (file) {
            //         var option = Object.assign(stremOption, { 'response': { 'content-type': file.mime } });
            //         // create push stream
            //         var stream = res.push(file.path, option);
            //         stream.on('error', function (error) {
            //             console.error(error);
            //         });
            //         stream.end(fs.readFileSync('' + publicPath + file.path));
            //     });
            //     next();
            // });
            let resources = new Array<MimeResult>();
            let dirCont = fs.readdirSync(path.join(__dirname, '/app'));
            let files = dirCont.filter( el => {return el.match(/.*\.(js)/ig);}); 
            console.log(files);
        });

        // router.get('/', function (req, res) {
        //     var html = _fs2.default.readFileSync(viewPath + '/index.html');
        //     res.end(html);
        // });

        // // server send files (server push)
        // router.get('/push', function (req, res) {
        //     var html = _fs2.default.readFileSync(viewPath + '/push/index.html');
        //     res.end(html);
        // });
    }
}

// export

export default new IndexRouter().router;
