import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { Request, Response } from 'express';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService
    ) {}

  @Post()
  create(@Body() createConcertDto: CreateConcertDto, @Res() res: Response) {
    try {
      const concert = this.concertService.create(createConcertDto);
      return res.status(201).json(concert);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid request body' });
    }
  }

  @Get()
  findAll() {
    return this.concertService.findAll();
  }

  @Get('noti')
  findNoti() {
    return this.concertService.findnoti();
  }

  @Get('num')
  Allnum() {
    return this.concertService.findnum();
  }

  @Put('reserve/:id')
  update(
    @Param('id') id: number,
    @Body() updateConcertDto: UpdateConcertDto,
    @Res() res: Response,
  ) {
    try {
      const concert = this.concertService.update(+id, updateConcertDto);
      return res.status(200).json(concert);
    } catch (error)  {
      if(error.message === "not found Concert"){
        return res.status(404).json({ message: error.message });
      }else if(error.message === "user not reserved"){
        return res.status(400).json({ message: error.message });
      }else{
        return res.status(400).json({ message: error.message });
      }
    }
  }

  @Put('cancel/:id')
  cancle(
    @Param('id') id: number,
    @Body() updateConcertDto: UpdateConcertDto,
    @Res() res: Response,
  ) {
    try {
      const concert = this.concertService.cancle(+id, updateConcertDto);
      return res.status(200).json(concert);
    } catch (error) {
      if(error.message === "not found Concert"){
        return res.status(404).json({ message: error.message });
      }else if(error.message === "user not reserved"){
        return res.status(400).json({ message: error.message });
      }else{
        return res.status(400).json({ message: error.message });
      }
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() res: Response) {
    try {
      const concert = this.concertService.delete(+id);
      return res.status(200).json(concert);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}
