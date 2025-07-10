import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './schemas/song.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FeatureFlagGuard } from '../feature-flags/feature-flag.guard';
import { CheckFeatureFlag } from '../feature-flags/feature-flag.decorator';

@UseGuards(JwtAuthGuard) // <-- 1. Dejamos este aquí para proteger TODAS las rutas con token
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  // Este endpoint solo está protegido por JWT
  @Get()
  async findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  // 👇 2. Aplicamos la seguridad de la flag solo a este método 👇
  @UseGuards(FeatureFlagGuard)
  @CheckFeatureFlag('trending-vip')
  @Get('trending')
  async findTrending(): Promise<Song[]> {
    return this.songsService.findTrending();
  }

  // Este endpoint también está protegido solo por JWT
  @Get('artist/:name')
  async findByArtist(@Param('name') name: string): Promise<Song[]> {
    return this.songsService.findByArtist(name);
  }
   @UseGuards(FeatureFlagGuard)
   @CheckFeatureFlag('genero')
   @Get('genre/:genreName') // Use a URL parameter for the genre name
  async findByGenre(@Param('genreName') genreName: string): Promise<Song[]> {
    return this.songsService.findByGenreInApp(genreName);
  }
}