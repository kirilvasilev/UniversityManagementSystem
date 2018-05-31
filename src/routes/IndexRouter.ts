// import { Router, Request, Response, NextFunction } from 'express';
// import { ServerResponse } from 'spdy';
// import * as HttpStatus from 'http-status-codes';
// import fs from 'fs';
// import MimeType from 'mime-types';
// import path from 'path';
// import util from 'util';

// import { GetUserRepo, GetCourseRepo } from '../container/ContainerProvider';
// import { handleError } from '../handlers/ErrorHandler';
// import { log, LogLevel } from '../logger/ILogger';
// import { UserType } from '../models/UserModel';


// const CONTROLLER_NAME = 'UserRouter';


// var stremOption = {
//     method: 'GET',
//     request: {
//         accept: '**/*'
//     },
//     response: {
//         'content-type': ''
//     }
// };

// interface MimeResult {
//     path: String,
//     mime: String | Boolean
// }

// class IndexRouter {

//     public router: Router;

//     constructor() {
//         this.router = Router();
//         this.routes();
//     }

//     LoadIndex(req: Request, res: Response, next: NextFunction) {
//         const regExt = /\.(.*)/;
//         let resources = new Array<MimeResult>();
//         const fileDir = path.join(__dirname, '../app');
//         let dirCont = fs.readdirSync(fileDir);

//         let files = dirCont.filter(el => { return el.match(/^((?!(views)).)*\.(js)$/ig); });
//         console.log(files);
//         files.forEach(async file => {
//             let fileExtention = file.split(regExt)[1];
//             let option = Object.assign(stremOption, { 'response': { 'content-type': MimeType.lookup(fileExtention) } });
//             let fPath = fileDir + '\\' + file;
//             let stream = res.push(`/${file}`, option);
//             stream.on('error', (error: any) => {
//                 console.log('Error occured', error.message);
//                 stream.removeAllListeners();
//             });
//             stream.end(fs.readFileSync(fPath));

//             //     stream.on('end', () => {
//             //         console.log('stream ended');
//             //       stream.removeAllListeners();
//             //     });

//             // fs.createReadStream(fPath).pipe(stream);

//         });
//         let html = fs.readFileSync(fileDir + '\\index.html').toString();
//         res.send(html);
//         //res.end(); 
//     }

//     public routes() {
//         // using server push middlewear
//         this.router.get('/', this.LoadIndex);
//     }
// }

// // export

// export default new IndexRouter().router;
