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

    if (!name || !des || !amount) {
      return 'Incorrect format';
    }

    const newId = this.concerts.length + 1;
    const user_reserves = [];
    this.concerts.push({
      id: newId,
      name,
      des,
      amount,
      user_reserve: user_reserves,
    });
    return `New concert created with ID ${newId}`;
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
      cancel: cancel
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
    const split = time.split('T');
    let date = split[0];
    let times = split[1];
    times = times.split('.')[0];
    let datelist = date.split('-').reverse();
    date = datelist.join('/');
    const result = date + ' ' + times;
    return result;
  }

  update(id: number, updateConcertDto: UpdateConcertDto) {
    const { userid, username } = updateConcertDto;
    console.log(userid,username)
    if (!userid || !username) {
      return 'Incorrect format';
    }
    const concert = this.concerts.find((concert) => concert.id === id);
    const times = this.timeformat(new Date().toISOString());
    if (concert) {
      const isUserReserved = concert.user_reserve.some(
        (user) => user.userid === updateConcertDto.userid,
      );
      if (isUserReserved) {
        return `400 Bad request`;
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
      return `No concert found `;
    }
  }

  cancle(id: number, updateConcertDto: UpdateConcertDto) {
    const { userid } = updateConcertDto;
    if (!userid) {
      console.log(userid);
      return 'Incorrect format';
    }
    const concert = this.concerts.find((concert) => concert.id === id);
    console.log('before', concert.user_reserve);
    const times = this.timeformat(new Date().toISOString());
    if (concert) {
      const isUserReserved = concert.user_reserve.some(
        (user) => user.userid === updateConcertDto.userid,
      );
      if (!isUserReserved) {
        return `400 Bad request`;
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
      return `No concert found `;
    }
  }

  delete(id: number) {
    const index = this.concerts.findIndex((concert) => concert.id === id);
    if (index !== -1) {
      this.concerts.splice(index, 1);
      return "200 OK";
    } else {
      return `No concert found with ID ${id}`;
    }
  }
}
