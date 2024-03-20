import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { Request, Response } from 'express';

jest.mock('./concert.service');
const httpMocks = require('node-mocks-http');

describe('ConcertController', () => {
  let controller: ConcertController;
  let service: ConcertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [ConcertService],
    }).compile();

    controller = module.get<ConcertController>(ConcertController);
    service = module.get<ConcertService>(ConcertService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    // it('should create concert success', async () => {
    //   const createConcertDto = {
    //     name: 'Test Concert',
    //     des: 'Test Description',
    //     amount: '100',
    //   };

    //   const res = httpMocks.createResponse();

    //   const response = controller.create(createConcertDto, res);
    //   expect(response).toBeDefined();
    //   expect(response.statusCode).toBe(201);
    // });

    it('should handle invalid body', () => {
      const createConcertDto2 = {
        name: 'Test Concert2',
        des: 'Test Description',
        amount: '',
      };
      const res = httpMocks.createResponse();

      const response = controller.create(createConcertDto2, res);
      console.log(response)
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(201);
    });
  });
});
