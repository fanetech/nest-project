import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/todo.entitie';

@Controller('todo')
export class TodoController {
  constructor() {
    this.todos = [];
  }
  todos: Todo[];
  @Get('v2')
  getTodoV2(@Req() request: Request, @Res() response: Response) {
    console.log('Récupérer la liste des todos');
    response.status(202);
    response.json({
      contenu: `Je suis une response générée à partie de l'objet response`,
    });
  }

  @Get()
  getTodo() {
    console.log('Récupérer la liste des todos');

    return this.todos;
  }

  @Post()
  addTodo(@Body() newTodo: Todo) {
    if (this.todos.length) {
      newTodo.id = this.todos[this.todos.length - 1].id + 1;
    } else {
      newTodo.id = 1;
    }
    this.todos.push(newTodo);
    return newTodo;
  }

  @Delete()
  deleteTodo() {
    console.log('Supprimer un todo de la liste des todos');
    return 'Delete Todo';
  }

  @Put()
  modifierTodo() {
    console.log("Modifier l'un des todo de la liste des todos");
    return 'Update Todo';
  }
}
