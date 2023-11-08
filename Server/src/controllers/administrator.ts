import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connection from '../db/connection';
import { User } from '../models/user';

export const getAdministrators = async (request: Request, response: Response) => {
  //let queryTable = "SELECT * FROM users WHERE users.isAdmin = true";
  let administratorsList: any[] = [];
  try{
    administratorsList = await User.findAll({where:{isAdmin:true}})
  }finally{
    if(administratorsList.length === 0){
      return response.status(400).send({msg:'No hay administradores cargados'})
    }
    else{
      return response.status(200).json(administratorsList)
    }
  }
};

export const updateAdministrator = (request: Request, response: Response) => {
  let queryControl = "SELECT * FROM users WHERE  dni = ? and isAdmin = true";
  connection.query({
    query: queryControl,
    values: [request.params.dni]
  }).then((value) => {
    if (value[0].length === 1) {
      //ESTO SE EJECUTA SI EL ADMINISTRADOR SE ENCONTRÓ VALUE[0] ESTA LA TUPLA ENCONTRADA EN LA BD
      //AHORA DEBEMOS SABER SI EL EMAIL NO ESTA REPETIDO EN OTRO ADMINISTRADOR
      let queryEmail = "SELECT email FROM users WHERE email like ? AND dni <> ? "; //TRAIGO TODOS LOS EMAIL IGUALES AL NUEVO PERO DISTINTO AL ADMIN(YA QUE PUEDE NO ACTUALIZARLO)
      connection.query({
        query: queryEmail,
        values: [request.body.email, request.params.dni]
      }).then((resp) => {
        if (resp[0].length == 0) {
          let queryForUpdate = "UPDATE users SET email = ?, password = ? WHERE dni = ?";
          let hashedPassword = '';
          bcrypt.hash(request.body.password, 10).then((value) => hashedPassword = value).finally(() => {
            connection.query({
              query: queryForUpdate,
              values: [request.body.email, hashedPassword, request.params.dni]
            }).then(() => {
              response.send({ msg: 'Administrador actiualizado' })
            })
          }) //hasheo 
        }
        else { response.status(404).send({ msg: 'Email duplicado' }) }
      })
    } else {
      response.status(404).send({ msg: 'administrador no encontrado' })
    }
  })
}

export const deleteAdministrator = (request: Request, response: Response) => {
  let querySearch = "DELETE FROM users WHERE dni = ? and isAdmin = true";
  connection.query({
    query: querySearch,
    values: [request.params.dni]
  }).then((resp) => {
    if (resp[1]) {
      response.status(200).send({ msg: 'Administrador Eliminado' })  //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
    }
  })
}

export const getOneAdministrator = (request: Request, response: Response) => {
  let querySearch = "SELECT * FROM users WHERE dni = ? and isAdmin = true";
  connection.query({
    query: querySearch,
    values: [request.params.dni]
  }).then((value) => {
    if (value[0].length === 1) {
      response.status(200).json(value[0][0]);
    } else {
      response.status(404).send({ msg: 'No encontrado' });
    }
  })
};


