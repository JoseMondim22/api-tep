import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song, SongSchema } from './schemas/song.schema';
import { FeatureFlagsModule } from '../feature-flags/feature-flag.module'; // <-- 1. Importa el módulo


@Module({
  imports: [MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
  FeatureFlagsModule,
],
  controllers: [SongsController],
  providers: [SongsService],
  
})
export class SongsModule {}