import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './schemas/song.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // <-- Aplica el "candado" aquí, una sola vez
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  // Este endpoint ahora está protegido
  @Get()
  async findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  // Este también está protegido
  @Get('trending')
  async findTrending(): Promise<Song[]> {
    return this.songsService.findTrending();
  }

  // Y este también
  @Get('artist/:name')
  async findByArtist(@Param('name') name: string): Promise<Song[]> {
    return this.songsService.findByArtist(name);
  }
}