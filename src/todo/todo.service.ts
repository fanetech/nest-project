import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from './dto/addTodoDto';
import { Todo } from './entities/todo.entitie';

@Injectable()
export class TodoService {
  todos: Todo[] = [];
  getTodos(): Todo[] {
    return this.todos;
  }
  addTodo(newTodo: AddTodoDto) {
    const { name, description } = newTodo;
    let id;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    const todo = {
      id,
      description,
      name,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }
  getTodoById(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === +id);
    console.log('get todo by id');
    if (todo) return todo;
    throw new NotFoundException("le todo n'existe pas");
  }

  updateTodo(id: number, newTodo: Partial<Todo>) {
    const todo = this.getTodoById(id);
    console.log("Modifier l'un des todo de la liste des todos");
    todo.name = newTodo.name ?? todo.name;
    todo.description = newTodo.description ?? todo.description;

    return todo;
  }

  deleteTodo(id: number) {
    // console.log(typeof id);
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
}
