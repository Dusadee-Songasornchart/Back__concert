import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Injectable()
export class ConcertService {

  concert = [{id:1,name:"joh"}]

  create(createConcertDto: CreateConcertDto) {
    return 'This action adds a new concert';
  }

  findAll() {
    return `This action returns all concert`;
  }

  findOne(id: number) {
    return `This action returns a ${this.concert[0].name} ${id} concert`;
  }

  update(id: number, updateConcertDto: UpdateConcertDto) {
    return `This action updates a #${id} concert`;
  }

  remove(id: number) {
    return `This action removes a #${id} concert`;
  }
}
