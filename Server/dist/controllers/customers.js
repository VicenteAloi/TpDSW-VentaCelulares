"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesUser = exports.getSalesUsers = exports.deleteCustomer = exports.updateCustomer = exports.getCustomers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const connection_1 = __importDefault(require("../db/connection"));
const sales_1 = require("../models/sales");
const getCustomers = (request, response) => {
    let queryTable = "SELECT * FROM users WHERE isAdmin = false";
    let customerList = [];
    connection_1.default.query(queryTable).then((values) => {
        if (values[0].length > 0) {
            customerList = values[0];
            response.status(200).json(customerList);
        }
        else {
            response.status(404).send({ msg: 'No hay clientes cargados' });
        }
    });
};
exports.getCustomers = getCustomers;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const dni = req.params.dni;
    if (email == "" || email == undefined) {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        try {
            yield user_1.User.update({
                password: hashedPassword
            }, {
                where: {
                    dni: dni
                }
            });
            return res.status(200).json({
                msg: 'Password Actualizada',
                body: hashedPassword, password, User: user_1.User
            });
        }
        catch (error) {
            return res.status(400).json({
                msg: "No se pudo Actualizar"
            });
        }
    }
    else {
        const emailExist = yield user_1.User.findOne({
            where: {
                email: email
            }
        });
        if (emailExist) {
            return res.status(400).json({
                msg: 'Email Ya Existente'
            });
        }
        try {
            yield user_1.User.update({
                email: email
            }, {
                where: {
                    dni: dni
                }
            });
            return res.status(200).json({
                msg: "Actualizado"
            });
        }
        catch (error) {
            return res.status(400);
        }
    }
    ;
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (request, response) => {
    let querySearch = "DELETE FROM users WHERE dni = ? and isAdmin = false";
    connection_1.default.query({
        query: querySearch,
        values: [request.params.dni]
    }).then((resp) => {
        if (resp[1]) {
            response.status(200).send({ msg: 'Cliente Eliminado' }); //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
        }
    });
};
exports.deleteCustomer = deleteCustomer;
const getSalesUsers = (req, res) => {
    const listOfSales = sales_1.Sales.findAll();
    res.status(200).json({
        message: 'Todo Ok',
        body: listOfSales
    });
    return (listOfSales);
};
exports.getSalesUsers = getSalesUsers;
const getSalesUser = (req, res) => {
    let querySearch = "SELECT * FROM sales INNER JOIN products ON products.id = sales.idProduct WHERE idCustomer = ?;";
    let salesList;
    connection_1.default.query({
        query: querySearch,
        values: [req.params.id]
    }).then((values) => {
        if (values[0].length > 0) {
            salesList = values[0]; //porque esta promesa devuelve un arreglo, donde la primera posicion contiene otro arreglo de la data
            res.status(200).json(salesList);
        }
        else {
            res.status(404).send({ msg: 'No hay ventas registradas' });
        }
    });
};
exports.getSalesUser = getSalesUser;
