import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Conecta con tu base de datos local de MongoDB.
    // Asegúrate de que el nombre 'tu_basedatos' coincida con el que creaste.
    MongooseModule.forRoot('mongodb://localhost:27017/ApiTEP'),
    
    // Importas el módulo de canciones que ya tenías
    SongsModule,
    
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}