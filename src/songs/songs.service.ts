import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song, SongDocument } from './schemas/song.schema';

@Injectable()
export class SongsService {
  // NestJS inyectará aquí el modelo de Mongoose gracias al decorador @InjectModel
  constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>) {}

  // Ahora este método usará el modelo inyectado para consultar la base de datos real
  async findAll(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  async findTrending(): Promise<Song[]> {
    return this.songModel.find().sort({ reproducciones: -1 }).limit(10).exec();
  }

  async findByArtist(artistName: string): Promise<Song[]> {
    return this.songModel.find({ artista: new RegExp(artistName, 'i') }).exec();
  }
}