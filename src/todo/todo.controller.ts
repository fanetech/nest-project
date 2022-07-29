import { TodoService } from './todo.service';
import { AddTodoDto } from './dto/addTodoDto';
import { GetAllTodoDto } from './dto/getPaginetedTodoDto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entitie';

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
  getTodoById(@Param('id') id) {
    this.TodoService.getTodoById(+id);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    return this.TodoService.addTodo(newTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id) {
    return this.TodoService.deleteTodo(+id);
  }

  @Put(':id')
  modifierTodo(@Param('id') id, @Body() newTodo: Partial<AddTodoDto>) {
    return this.TodoService.updateTodo(+id, newTodo);
  }
}
