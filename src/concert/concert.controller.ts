import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post()
  create(@Body() createConcertDto: CreateConcertDto) {
    return this.concertService.create(createConcertDto);
  }

  @Get()
  findAll() {
    return this.concertService.findAll();
  }


  @Get('noti')
  findNoti() {
    return this.concertService.findnoti();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateConcertDto: UpdateConcertDto) {
    return this.concertService.update(+id,updateConcertDto);
  }

  @Put('cancle/:id')
  cancle(@Param('id') id:string,@Body() updateConcertDto: UpdateConcertDto){
    return this.concertService.cancle(+id,updateConcertDto);

  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.concertService.delete(+id);
  }
}
