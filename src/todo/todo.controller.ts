import { UpperAndFusionPipe } from './../pipes/upper-and-fusion.pipe';
import { NOTFOUND } from 'dns';
import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/addTodoDto';
import { GetAllTodoDto } from './dto/getPaginetedTodoDto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entitie';

// @UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private TodoService: TodoService) {}

  @Get('v2')
  getTodoV2(@Req() request: Request, @Res() response: Response) {
    console.log('Récupérer la liste des todos');
    response.status(202);
    response.json({
      contenu: `Je suis une response générée à partie de l'objet response`,
    });
  }

  @Get()
  getTodo(@Query() mesQueryParams: GetAllTodoDto): Todo[] {
    console.log('Récupérer la liste des todos');

    return this.TodoService.getTodos();
  }

  @Get('/:id')
  getTodoById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id,
  ) {
    this.TodoService.getTodoById(id);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.TodoService.addTodo(newTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id) {
    // console.log(typeof id);
    return this.TodoService.deleteTodo(+id);
  }

  @Put(':id')
  modifierTodo(
    @Param('id', ParseIntPipe) id,
    @Body() newTodo: Partial<AddTodoDto>,
  ) {
    return this.TodoService.updateTodo(id, newTodo);
  }
  @Post('pipe')
  testPipe(@Body(UpperAndFusionPipe) data) {
    return data;
  }
}
