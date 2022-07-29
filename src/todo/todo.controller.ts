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
  getTodo(@Query() mesQueryParams) {
    console.log('Récupérer la liste des todos');
    console.log(mesQueryParams);

    return this.todos;
  }

  @Get('/:id')
  getTodoById(@Param('id') id) {
    const todo = this.todos.find((todo) => todo.id === +id);
    console.log('get todo by id');
    if (todo) return todo;
    throw new NotFoundException("le todo n'existe pas");
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

  @Delete(':id')
  deleteTodo(@Param('id') id) {
    const index = this.todos.findIndex((todos) => todos.id === +id);
    if (index > 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Le todo n'existe pas`);
    }
    console.log('Supprimer un todo de la liste des todos');
    return {
      message: `Le todo d'id ${id} à été supprimé avec succès`,
      count: 1,
    };
  }

  @Put(':id')
  modifierTodo(@Param('id') id, @Body() newTodo: Partial<Todo>) {
    const todo = this.getTodoById(id);
    console.log("Modifier l'un des todo de la liste des todos");
    todo.name = newTodo.name ?? todo.name;
    todo.description = newTodo.description ?? todo.description;
    return todo;
  }
}
