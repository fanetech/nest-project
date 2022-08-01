import { TradeService } from './trade.service';

import { Body, Controller, Get, Post } from '@nestjs/common';

import { Trade } from './entities/trade.entitie';

@Controller('trade')
export class TradeController {
  trades: Trade[] = [];

  constructor(private tradeService: TradeService) {}
  @Post()
  addTrade(@Body() newTrade) {
    const { paire, desc, ratio } = newTrade;
    const trade = new Trade();
    trade.paire = paire;
    trade.desc = desc;
    trade.ratio = ratio;
    let id;
    if (this.trades.length) {
      id = this.trades[this.trades.length - 1].id + 1;
      trade.id = id;
    } else {
      trade.id = 1;
    }
    this.trades.push(trade);

    return trade;
  }
  @Get()
  getTrade() {
    return this.trades;
  }
}
