import { Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Injectable()
export class ConcertService {
  concerts: {
    id: number;
    name: string;
    des: string;
    amount: string;
    user_reserve: { userid: number; username: string }[];
  }[] = [
    {
      id: 1,
      name: 'Concert Name 1',
      des: 'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non.dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
      amount: '500',
      user_reserve: [
        { userid: 1, username: 'John' },
        { userid: 2, username: 'Lisa' },
      ],
    },
    {
      id: 2,
      name: 'Concert Name 2',
      des: "i'm hungry",
      amount: '200',
      user_reserve: [],
    },
  ];
  noti: {
    time: string;
    User_name: string;
    Concertname: string;
    Action: string;
  }[] = [
    {
      time: '19/03/2024 16:22:49',
      User_name: 'John',
      Concertname: 'Concert Name -1',
      Action: 'Cancel',
    },
    {
      time: '19/05/2024 16:22:49',
      User_name: 'John',
      Concertname: 'Concert Name -2',
      Action: 'Cancel',
    },
  ];

  create(createConcertDto: CreateConcertDto) {
    const { name, des, amount } = createConcertDto;
    console.log(createConcertDto)

    if (!name || !des || !amount) {
      throw new Error('incorrect format');

    }

    const newId = this.concerts[this.concerts.length-1].id+1;
    const user_reserves = [];
    this.concerts.push({
      id: newId,
      name,
      des,
      amount,
      user_reserve: user_reserves,
    });
    return createConcertDto;
  }

  findAll() {
    return this.concerts;
  }

  findnoti() {
    return this.noti;
  }

  findnum() {
    const reserve_count = this.concerts.reduce(
      (total, concert) => total + concert.user_reserve.length,
      0,
    );
    const seat_count = this.concerts.reduce(
      (total, concert) => total + Number(concert.amount),
      0,
    );
    const cancel = this.noti.filter(
      (notification) => notification.Action === 'Cancel',
    ).length;

    return {
      reserve_count: reserve_count,
      seat_count: seat_count,
      cancel: cancel,
    };
  }

  findOne(id: number): string {
    const concert = this.concerts.find((concert) => concert.id === id);
    if (concert) {
      return `This action returns a ${concert.name} ${id} concert`;
    } else {
      return `No concert found with ID ${id}`;
    }
  }
  //12/09/2024 15:00:00
  //2024-03-19T12:28:34.467Z

  timeformat(time: string) {
    const [date, timePM] = time.split(', ');
    const [timen, period] = timePM.split(' ');
    let lastitme = '';
    if (period === 'PM') {
      const [hour, minute, second] = timen.split(':').map(Number);
      lastitme = `${hour + 12}:${minute < 10 ? '0' : ''}${minute}:${
        second < 10 ? '0' : ''
      }${second}`;
    } else if (period === 'AM') {
      const [hour, minute, second] = timen.split(':').map(Number);
      lastitme = `${hour < 10 ? '0' : ''}${hour}:${
        minute < 10 ? '0' : ''
      }${minute}:${second < 10 ? '0' : ''}${second}`;
    }
    const [month, day, year] = date.split('/');
    const lastdate = `${day}/${Number(month) < 10 ? '0' : ''}${month}/${year}`;
    return lastdate + ' ' + lastitme;
  }

  update(id: number, updateConcertDto: UpdateConcertDto) {
    const { userid, username } = updateConcertDto;
    if (!userid || !username) {
      throw new Error('incorrect format');
    }
    const concert = this.concerts.find((concert) => concert.id === id);
    const times = this.timeformat(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })
    );
    if (concert) {
      const isUserReserved = concert.user_reserve.some(
        (user) => user.userid === updateConcertDto.userid,
      );
      if (isUserReserved) {
        throw new Error('user reserved');
      }
      concert.user_reserve.push({ userid: userid, username: username });
      this.noti.push({
        time: times,
        User_name: username,
        Concertname: concert.name,
        Action: 'reserve',
      });
      return '200 OK';
    } else {
      throw new Error('not found Concert');
    }
  }

  cancle(id: number, updateConcertDto: UpdateConcertDto) {
    const { userid } = updateConcertDto;
    if (!userid) {
      throw new Error('incorrect format');
    }
    const concert = this.concerts.find((concert) => concert.id === id);
    const times = this.timeformat(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
    );
    if (concert) {
      const isUserReserved = concert.user_reserve.some(
        (user) => user.userid === updateConcertDto.userid,
      );
      if (!isUserReserved) {
        throw new Error('user not reserved');
      }
      const usernamenoti = concert.user_reserve.find(
        (usernamen) => usernamen.userid === userid,
      );
      this.noti.push({
        time: times,
        User_name: usernamenoti.username,
        Concertname: concert.name,
        Action: 'Cancel',
      });
      const index = concert.user_reserve.findIndex(
        (item) => item.userid === userid,
      );
      concert.user_reserve.splice(index, 1);
      return '200 OK';
    } else {
      throw new Error('not found Concert');
    }
  }

  delete(id: number) {
    const index = this.concerts.findIndex((concert) => concert.id === id);
    if (index !== -1) {
      this.concerts.splice(index, 1);
      return '200 OK';
    } else {
      throw new Error('not found Concert');
    }
  }
}
