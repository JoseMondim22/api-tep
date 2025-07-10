import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SongDocument = Song & Document;

@Schema()
export class Song {
  @Prop()
  nombre: string;

  @Prop()
  artista: string;

  @Prop()
  genero: string;

  @Prop({ name: 'ano_salida' }) // Mapea a 'ano_salida' en la BD
  anoSalida: number;

  @Prop()
  reproducciones: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);