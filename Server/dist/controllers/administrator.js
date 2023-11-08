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
exports.getOneAdministrator = exports.deleteAdministrator = exports.updateAdministrator = exports.getAdministrators = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("../models/user");
const getAdministrators = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //let queryTable = "SELECT * FROM users WHERE users.isAdmin = true";
    let administratorsList = [];
    try {
        administratorsList = yield user_1.User.findAll({ where: { isAdmin: true } });
    }
    finally {
        if (administratorsList.length === 0) {
            return response.status(400).send({ msg: 'No hay administradores cargados' });
        }
        else {
            return response.status(200).json(administratorsList);
        }
    }
});
exports.getAdministrators = getAdministrators;
const updateAdministrator = (request, response) => {
    let queryControl = "SELECT * FROM users WHERE  dni = ? and isAdmin = true";
    connection_1.default.query({
        query: queryControl,
        values: [request.params.dni]
    }).then((value) => {
        if (value[0].length === 1) {
            //ESTO SE EJECUTA SI EL ADMINISTRADOR SE ENCONTRÓ VALUE[0] ESTA LA TUPLA ENCONTRADA EN LA BD
            //AHORA DEBEMOS SABER SI EL EMAIL NO ESTA REPETIDO EN OTRO ADMINISTRADOR
            let queryEmail = "SELECT email FROM users WHERE email like ? AND dni <> ? "; //TRAIGO TODOS LOS EMAIL IGUALES AL NUEVO PERO DISTINTO AL ADMIN(YA QUE PUEDE NO ACTUALIZARLO)
            connection_1.default.query({
                query: queryEmail,
                values: [request.body.email, request.params.dni]
            }).then((resp) => {
                if (resp[0].length == 0) {
                    let queryForUpdate = "UPDATE users SET email = ?, password = ? WHERE dni = ?";
                    let hashedPassword = '';
                    bcrypt_1.default.hash(request.body.password, 10).then((value) => hashedPassword = value).finally(() => {
                        connection_1.default.query({
                            query: queryForUpdate,
                            values: [request.body.email, hashedPassword, request.params.dni]
                        }).then(() => {
                            response.send({ msg: 'Administrador actiualizado' });
                        });
                    }); //hasheo 
                }
                else {
                    response.status(404).send({ msg: 'Email duplicado' });
                }
            });
        }
        else {
            response.status(404).send({ msg: 'administrador no encontrado' });
        }
    });
};
exports.updateAdministrator = updateAdministrator;
const deleteAdministrator = (request, response) => {
    let querySearch = "DELETE FROM users WHERE dni = ? and isAdmin = true";
    connection_1.default.query({
        query: querySearch,
        values: [request.params.dni]
    }).then((resp) => {
        if (resp[1]) {
            response.status(200).send({ msg: 'Administrador Eliminado' }); //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
        }
    });
};
exports.deleteAdministrator = deleteAdministrator;
const getOneAdministrator = (request, response) => {
    let querySearch = "SELECT * FROM users WHERE dni = ? and isAdmin = true";
    connection_1.default.query({
        query: querySearch,
        values: [request.params.dni]
    }).then((value) => {
        if (value[0].length === 1) {
            response.status(200).json(value[0][0]);
        }
        else {
            response.status(404).send({ msg: 'No encontrado' });
        }
    });
};
exports.getOneAdministrator = getOneAdministrator;
