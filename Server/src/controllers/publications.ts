import { Request, Response, request } from 'express';
import { Publication } from '../models/publication';



export const getPublications = async (request: Request, response: Response) => {
  const { idAdmin } = request.params;
  try {
    const publications = await Publication.findAll({ where: { idAdministrator: idAdmin } })
    if (publications) {
      return response.status(200).json(publications)
    } else {
      return response.status(400).send({ msg: 'No hay publicaciones de este administrador' })
    }
  } catch (error) {
    return response.status(400).send(error)
  }
};

export const newPublication = async (request: Request, response: Response) => {
  const { idAdmin } = request.params; //recibimos la id del usuario por ruta(parametro)
  const { body } = request; //recibimos el producto



}