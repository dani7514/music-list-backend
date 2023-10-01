import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Musics, MusicsSchema } from './schema/musicSchema';

@Module({
  imports: [MongooseModule.forFeature([{name: Musics.name , schema: MusicsSchema}])],
  controllers: [MusicController,],
  providers: [MusicService]
})
export class MusicModule {}
