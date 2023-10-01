
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop()
    name: string;
    @Prop()
    popularity: number;
    @Prop()
    image_url: string;
    @Prop()
    followers: number;
    @Prop()
    geners: string[];
}


export const ArtistSchema = SchemaFactory.createForClass(Artist);
