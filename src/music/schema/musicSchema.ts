import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Artist } from './artistSchema';

@Schema()
export class Musics{
  @Prop()
  name: string;

  @Prop()
  duration_ms: number;

  @Prop()
  image_url: string;

  @Prop()
  release_date: string;

  @Prop()
  artist: Artist; 
}

export type MusicsDocument = Musics & Document;

export const MusicsSchema = SchemaFactory.createForClass(Musics);
