import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,// configura las variables de entorno
    MongooseModule.forFeature([ // configura Mongoose para usar el esquema Pokemon.
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ])
  ],
  exports: [
    MongooseModule
  ]
})
export class PokemonModule {}
