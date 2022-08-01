import { Injectable } from '@nestjs/common';

@Injectable()
export class FaneService {
  getName(name: string): object {
    const message = { name, msg: `hello ${name}` };
    return message;
  }
}
