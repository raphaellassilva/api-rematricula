import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prerequisito } from './entities/prerequisito.entity';
import { PrerequisitoService } from './prerequisito.service';
import { PrerequisitoController } from './prerequisito.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prerequisito])],
  providers: [PrerequisitoService],
  controllers: [PrerequisitoController],
  exports: [PrerequisitoService],
})
export class PrerequisitoModule {}