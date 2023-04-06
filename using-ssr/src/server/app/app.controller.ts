import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { MessageDto } from '../dtos/messageDto';
import {
  Film,
  Planet,
  Species,
  StarWarsPerson,
  Starship,
  Vehicle,
} from '../../shared/types';
import { PeopleRequestDto } from 'dtos/peopleRequestDto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('people')
  getPeople(@Query() params: PeopleRequestDto): Promise<StarWarsPerson[]> {
    return this.appService.getPeople(params);
  }

  @Get('people/:id')
  getPerson(@Param('id') id: string): Promise<StarWarsPerson> {
    return this.appService.getPerson(id);
  }

  @Get('people/:id/species')
  getPersonSpecies(@Param('id') id: string): Promise<Species[]> {
    return this.appService.getPersonSpecies(id);
  }

  @Get('people/:id/movies')
  getPersonMovies(@Param('id') id: string): Promise<Film[]> {
    return this.appService.getPersonMovies(id);
  }

  @Get('people/:id/vehicles')
  getPersonVehicles(@Param('id') id: string): Promise<Vehicle[]> {
    return this.appService.getPersonVehicles(id);
  }

  @Get('people/:id/starships')
  getPersonStarships(@Param('id') id: string): Promise<Starship[]> {
    return this.appService.getPersonStarships(id);
  }

  @Get('people/:id/homeworld')
  getPersonHomeworld(@Param('id') id: string): Promise<Planet> {
    return this.appService.getPersonHomeworld(id);
  }

  @Post()
  echoMessage(@Body() body: MessageDto): string {
    return body.message;
  }
}
