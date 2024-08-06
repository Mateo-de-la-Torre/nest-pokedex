import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ) {}


  async executeSeed() {

    await this.pokemonModel.deleteMany({});
    
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, no: number }[] = []; // array de 2 posiciones

    data.results.forEach(async({name, url}) => {
      
      const segments = url.split('/');

      const no:number = +segments[ segments.length -2 ]; // penultim posicion

      pokemonToInsert.push({name, no}); // [{ name: bulbasour, no: 1 }]
      
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
