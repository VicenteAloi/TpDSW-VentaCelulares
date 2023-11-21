import { Request, Response, request } from "express";
import connection from '../db/connection';
import { Sales } from "../models/sales";
import sequelize, { where } from "sequelize/types/sequelize";
import { Product } from "../models/product";
import { QueryTypes } from "sequelize";
import { toDefaultValue } from "sequelize/types/utils";

export const getSales = (request: Request, response: Response) => {
  let queryTable = 'SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct';
  let salesList: any;
  connection.query(queryTable).then((values) => {
    if (values[0].length > 0) {
      salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
      response.status(200).json(salesList)
    } else {
      response.status(404).send({ msg: 'No hay ventas registradas' })
    }
  })
}

export const getOneSales = (request:Request,response:Response)=>{
  let queryTable = 'SELECT * FROM sales INNER JOIN users ON users.dni = sales.dniCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.dni = ?';
  let salesList:any[] = [];
  connection.query({
    query:queryTable,
    values:[request.params.dniCustomer]
  }).then((values)=>{
    if(values[0].length > 0 ){
      salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
      response.status(200).json(salesList)
    }else{
      response.status(404).send({msg: 'No hay ventas registradas'})
    }
  })
}

export const postSell = async (request:Request,response:Response)=>{
  // recibimos un arreglo de ventas, que hace referencia a una compra por cada producto del carrito
  const {body} = request;
  console.log(body);
  for(let j = 0 ; j < body.length;j++){
    try {
      const produc = await Product.findOne({where:{id : body[j].idProduct}})
      await Product.update({ stock: produc?.dataValues.stock  - body[j].quantity }, { where: { id: body[j].idProduct } });
      await Sales.create({
        idCustomer: body[j].idCustomer,
        idProduct: body[j].idProduct,
        quantity: body[j].quantity,
        idShipping: body[j].idShipping
      })
    }catch(error){
      return response.status(400).send({msg:'No se pudo cargar'}) 
    }
  }  
  return response.status(200).send({msg:'Correcto'})
}





