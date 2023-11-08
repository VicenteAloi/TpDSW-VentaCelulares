import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/user';
import connection from '../db/connection'
import { Sales } from '../models/sales';




export const getCustomers = (request: Request, response: Response) => {
  let queryTable = "SELECT * FROM users WHERE isAdmin = false";
  let customerList: any[] = [];
  connection.query(queryTable).then((values) => {
    if (values[0].length > 0) {
      customerList = values[0];
      response.status(200).json(customerList);
    } else {
      response.status(404).send({ msg: 'No hay clientes cargados' })
    }
  })
}



export const updateCustomer = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const dni = req.params.dni;
  if (email == "" || email == undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await User.update({
        password: hashedPassword
      }, {
        where: {
          dni: dni
        }
      })
      return res.status(200).json({
        msg: 'Password Actualizada',
        body: hashedPassword, password, User
      })
        ;
    } catch (error) {
      return res.status(400).json({
        msg: "No se pudo Actualizar"
      });
    }
  } else {
    const emailExist = await User.findOne({
      where: {
        email: email
      }
    })

    if (emailExist) {
      return res.status(400).json({
        msg: 'Email Ya Existente'
      })
    }

    try {
      await User.update({
        email: email
      }, {
        where: {
          dni: dni
        }
      });
      return res.status(200).json({
        msg: "Actualizado"
      });
    } catch (error) {
      return res.status(400)
    }
  };
}


export const deleteCustomer = (request: Request, response: Response) => {
  let querySearch = "DELETE FROM users WHERE dni = ? and isAdmin = false";
  connection.query({
    query: querySearch,
    values: [request.params.dni]
  }).then((resp) => {
    if (resp[1]) {
      response.status(200).send({ msg: 'Cliente Eliminado' })  //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
    }
  })
}

export const getSalesUsers = (req: Request, res: Response) => {
  const listOfSales = Sales.findAll();
  res.status(200).json({
    message: 'Todo Ok',
    body: listOfSales
  })
  return (listOfSales)
}


export const getSalesUser = (req: Request, res: Response) => {
  let querySearch = "SELECT * FROM sales INNER JOIN products ON products.id = sales.idProduct WHERE idCustomer = ?;";
  let salesList: any;
  connection.query({
    query: querySearch,
    values: [req.params.id]
  }).then((values) => {
    if (values[0].length > 0) {
      salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
      res.status(200).json(salesList)
    } else {
      res.status(404).send({ msg: 'No hay ventas registradas' })
    }
  })
}

