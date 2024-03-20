import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Concert } from './entities/concert.entity';
import { UpdateConcertDto } from './dto/update-concert.dto';
import exp from 'constants';

describe('ConcertService', () => {
  let service: ConcertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcertService],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all concerts ', async () => {
      const concerts = service.findAll();
      expect(concerts).toBeDefined();
      expect(Array.isArray(concerts)).toBeTruthy();
    });
  });

  describe('create', () => {
    it('should create a new concert', async () => {
      const createConcertDto: CreateConcertDto = {
        name: 'Test Concert',
        des: 'Test Description',
        amount: '100',
      };
      const result = service.create(createConcertDto);
      expect(result).toEqual(createConcertDto);
      const newConcert = service.concerts.find(
        (concert) => concert.name === 'Test Concert',
      );
      expect(newConcert).toBeDefined();
      expect(newConcert.des).toBe('Test Description');
      expect(newConcert.amount).toBe('100');
    });
    it('should throw an error if provided with incorrect format', () => {
      const createConcertDto: CreateConcertDto = {
        name: 'Test Concert',
        des: '',
        amount: '100',
      };
      expect(() => service.create(createConcertDto)).toThrow(
        'incorrect format',
      );
      expect(service.concerts.length).toBe(2);
    });
  });

  describe('findnum', () => {
    it('should return correct reserve', () => {
      service.concerts[0].user_reserve.push({
        userid: 3,
        username: 'TestUser',
      });
      const result = service.findnum();
      expect(result.reserve_count).toBe(3);
    });
    it('should return correct seats', () => {
      const result = service.findnum();
      expect(result.seat_count).toBe(700);
    });
    it('should return correct cancel', () => {
      const result = service.findnum();
      expect(result.cancel).toBe(2);
    });
  });

  describe('timeformat', () => {
    it('should format time PM', () => {
      const timePM = '3/21/2024, 1:15:28 PM';
      const formattimePM = service.timeformat(timePM);
      expect(formattimePM).toBe('21/03/2024 13:15:28');
    });
    it('should format time AM', () => {
      const timeAM = '3/21/2024, 9:33:23 AM';
      const formattimeAM = service.timeformat(timeAM);
      expect(formattimeAM).toBe('21/03/2024 09:33:23');
    });
  });

  describe('update', () => {
    it('should update concert and add noti', () => {
      const id = 1;
      const updateConcertDto: UpdateConcertDto = {
        userid: 3,
        username: 'TestUser',
      };

      const result = service.update(id, updateConcertDto);
      expect(result).toBe('200 OK');
      const concert = service.concerts.find((concert) => concert.id === id);
      expect(concert).toBeDefined();
      expect(concert.user_reserve.length).toBe(3);
      const notification = service.noti.find(
        (noti) => noti.User_name === 'TestUser',
      );
      expect(notification).toBeDefined();
      expect(notification!.Action).toBe('reserve');
    });
    it('should thorw an error if not fulfill data', () => {
      const id = 1;
      const updateConcertDto: UpdateConcertDto = {
        userid: undefined,
        username: 'TestUser',
      };
      expect(() => service.update(id, updateConcertDto)).toThrow(
        'incorrect format',
      );
    });

    it('should throw an error if user reserved', () => {
      const id = 1;
      const updateConcertDto: UpdateConcertDto = {
        userid: 1,
        username: 'John',
      };
      expect(() => service.update(id, updateConcertDto)).toThrow(
        'user reserved',
      );
    });
  });

  describe('cancel', () => {
    it('should cancel concert and add noti', () => {
      const concertId = 1;
      const userId = 1; 
      const updateConcertDto = { userid: userId };
       const result = service.cancle(concertId, updateConcertDto);
       expect(result).toBe('200 OK'); 
       const concert = service.concerts.find(c => c.id === concertId);
       expect(concert).toBeDefined();
       expect(concert.user_reserve.length).toBe(1);
       const noti = service.noti[service.noti.length-1]
       expect(noti).toBeDefined();
       expect(noti.Action).toBe('Cancel')
    });
    it('should throw error if concert not found', () =>{
      const concertId = 999;
      const userId = 1;
      const updateConcertDto = {userid: userId};

      expect(() => service.cancle(concertId, updateConcertDto)).toThrow('not found Concert');
    });
    it('should throw error if user not reserved', () =>{
      const concertId = 2;
      const userId = 1;
      const updateConcertDto = {userid: userId};

      expect(() => service.cancle(concertId, updateConcertDto)).toThrow('user not reserved');
    });
  });

  describe('delete', () => {
    it('should delete a concert success', () => {
      const concertId = 1;
      const result = service.delete(concertId);
      expect(result).toBe('200 OK'); 
      const concert = service.concerts.find(c => c.id === concertId);
      expect(concert).toBeUndefined(); 
    });

    it('should throw error if concert not found', () => {
      const concertId = 999;
      expect(() => service.delete(concertId)).toThrow('not found Concert');
    });
  });
});
