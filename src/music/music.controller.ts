import {BadRequestException, Body, Controller, Delete,
     Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors,
      } from '@nestjs/common';
import { MusicService } from './music.service';
import { Music } from './dto/musicDto';
import { Musics } from './schema/musicSchema';
import {diskStorage} from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';


@Controller('music')
export class MusicController {
    constructor (private musicService: MusicService){}

    @Get('/:id')
    async getMusic(@Param('id') id: string): Promise<Musics>{
        return await this.musicService.getMusic(id);
    }

    @Get()
    async getMusics(@Query() query): Promise<Musics[]>{
        return await this.musicService.getMusics(query);
    }

    @Post()
    async createMusic(@Body() music: Music): Promise<Musics>{
        return await this.musicService.createMusic(music);
    }

    @Post('/add')
    async add(@Body() music: any) {
        return await this.musicService.addMusics(music)
    }

    @Patch('/:id')
    async updateMusic(@Body() music: Music, @Param('id') id: string): Promise<Musics[]>{
        return await this.musicService.updateMusic(id,music);
    }

    @Delete('/:id')
    async deleteMusic(@Param('id') id: string): Promise<Musics>{
        return await this.musicService.deleteMusic(id);
    }

    // @Post('/upload/:id')
    // @UseInterceptors(FileInterceptor('image',{
    //     storage: diskStorage({
    //         destination: "./images/upload",
    //         filename: (req, file, cb) => {
    //             const name = file.originalname.split('.')[0];
    //             const fileExtention = file.originalname.split('.')[1];
    //             const newFilename = name + '_' + Date.now() + '.' + fileExtention;

    //             cb(null, newFilename);
    //             },
    //     }),
    //     fileFilter: (req, file, cb) => {
    //         if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //           return cb(null, false);
    //         }
    //         return cb(null, true);
    //       },
    // })
    // )
    // async uploadFile(
    //     @UploadedFile() file: Express.Multer.File ,
    //     @Param('id') id: string,
    // ){
    //     if (!file) {
    //         throw new BadRequestException('File is not an image');
    //       } else {
    //         const response = { image: `upload/${file.filename}` };
    //         return await this.musicService.updateMusic(id,{
    //             image: response.image
    //         })
    //       } 
    // }


    

}