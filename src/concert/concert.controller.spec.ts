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
    test('should create concert success', async () => {
      const createConcertDto = {
        name: 'Test Concert',
        des: 'Test Description',
        amount: '100',
      };
      const res = httpMocks.createResponse();
      const response = controller.create(createConcertDto, res);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(201);
    });
  });

  describe('GetAll', () => {
    test('should Get All concert success', async () => {
      const res = httpMocks.createResponse();
      const response = controller.findAll();
      // sorry but i con't test method GET T.T
    });
  });

  describe('reserve concert', () => {
    test('should create concert success', async () => {
      const updateConcertDto = {
        userid: 4,
        username: 'Dud',
      };
      const res = httpMocks.createResponse();
      const response = controller.update(8, updateConcertDto, res);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });

  describe('cancel concert', () => {
    test('should cancle concert success', async () => {
      const updateConcertDto = {
        userid: 1,
      };
      const res = httpMocks.createResponse();
      const response = controller.cancle(1, updateConcertDto, res);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });

  describe('cancel concert', () => {
    test('should cancle concert success', async () => {
      const updateConcertDto = {
        userid: 1,
      };
      const res = httpMocks.createResponse();
      const response = controller.cancle(1, updateConcertDto, res);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });

  describe('delete concert', () => {
    test('should delete concert success', async () => {
      const res = httpMocks.createResponse();
      const response = controller.delete(1, res);
      expect(response).toBeDefined();
      expect(response.statusCode).toBe(200);
    });
  });

});
