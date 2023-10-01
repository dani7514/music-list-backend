import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './music/music.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ 
  MongooseModule.forRoot('mongodb+srv://leul1:1nE5YenZ4d3CEzoa@cluster0.hslqx7t.mongodb.net/music?retryWrites=true&w=majority',),
  MusicModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
