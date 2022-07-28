import { Body, Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('todo')
export class TodoController {
@Get("v2")
getTodoV2(
    @Req() request: Request,
    @Res() response: Response
){
    console.log("Récupérer la liste des todos");
    response.status(202);
  response.json({
        contenu: `Je suis une response générée à partie de l'objet response`
    })

}

@Get()
getTodo(
   
){
    console.log("Récupérer la liste des todos");
   
   return "Listes des todos"

}

@Post()
addTodo(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string
){

    console.log("Ajouter un todo a la liste des todos");
    console.log(id, name, description)
    return "Add Todo"
}

@Delete()
deleteTodo(){
    console.log("Supprimer un todo de la liste des todos");
    return "Delete Todo"
}


@Put()
modifierTodo(){
    console.log("Modifier l'un des todo de la liste des todos")
    return "Update Todo"
}

}

