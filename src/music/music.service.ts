import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MusicsDocument, Musics } from './schema/musicSchema';
import { Model } from 'mongoose';
import { Query  } from 'express-serve-static-core';
import { promises } from 'dns';
import { Music } from './dto/musicDto';
import axios from 'axios';

@Injectable()
export class MusicService {
    constructor(@InjectModel(Musics.name) private musicModel: Model<MusicsDocument>){}

    async getMusics(query: Query): Promise<Musics[]> {
        const page=Number(query.page);
        const limit=Number(query.limit);

        const skip=limit*(page-1);

        const title= query.title ? {
            genre_ids : {
                $regex : query.title,
                $options: 'i',
            }
        } : {};
        
        return await this.musicModel.find(title).limit(limit).skip(skip);
    }

    async getMusic(id: string): Promise<Musics>{
        return this.musicModel.findById(id)
    }


    async createMusic(music: Music): Promise<Musics>{
        return await this.musicModel.create(music);
    }

    async updateMusic (id: string, music: Music): Promise<Musics> {
        return await this.musicModel.findByIdAndUpdate(id ,music,
            {
                returnOriginal: false,
              })
    }
    
    async deleteMusic( id: string) {
        return await this.musicModel.findByIdAndDelete(id,{
            returnOriginal: false,
          });
      }


    async addMusics(musics: any ){
        const headers= {
            "Authorization": `Bearer ${"BQAwYJFvwPLzdVsZv0-Qoekn-cG3e0EC-NUvGWQfYZijR-3vHypk9IyIdiwLWx9jijAbtVKvnCnaALcSmXGYsFDp2LVB7WPwL_wqOtxf8UBQhmfpx8E"}`  }
        const items: any = musics.tracks.items;

        for (let track of items) { 
            const response: any = await axios.get(track.artists[0].href, {headers});
            const artists= response.data;
            const combinedData = {
                name: track.name,
                duration_ms: track.duration_ms,
                image_url: track.album.images[0].url,
                release_date: track.album.release_date,
                artist: {
                  name: artists.name,
                  popularity: artists.popularity,
                  image_url: artists.images[0].url,
                  followers: artists.followers.total,
                  genres: artists.genres
                }
              };

            const music= await this.musicModel.create(combinedData);
        }
        
    }
}
