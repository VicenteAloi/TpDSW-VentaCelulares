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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPublication = exports.getPublications = void 0;
const publication_1 = require("../models/publication");
const getPublications = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { idAdmin } = request.params;
    try {
        const publications = yield publication_1.Publication.findAll({ where: { idAdministrator: idAdmin } });
        if (publications) {
            return response.status(200).json(publications);
        }
        else {
            return response.status(400).send({ msg: 'No hay publicaciones de este administrador' });
        }
    }
    catch (error) {
        return response.status(400).send(error);
    }
});
exports.getPublications = getPublications;
const newPublication = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { idAdmin } = request.params; //recibimos la id del usuario por ruta(parametro)
    const { body } = request; //recibimos el producto
});
exports.newPublication = newPublication;
