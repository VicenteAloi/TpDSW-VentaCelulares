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
exports.getOneProduct = exports.deleteProduct = exports.updateProduct = exports.newProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const publication_1 = require("../models/publication");
const sales_1 = require("../models/sales");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.Product.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
const newProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, file } = request;
    console.log('body:', body);
    console.log('file:', file);
    //AHORA TRANSFORMAMOS LA IMAGEN QUE VIENE DE TIPO FILE DESDE EL FRONT (Con postman anda pero con el Front no ( consulta)) --> Lo que me da a entender que la API esta bien pero del Front mando mal la info
    if (file != undefined) {
        const url = file.filename;
        //MANDAMOS A LA BD TODO LISTO
        try {
            yield product_1.Product.create({
                model: body.model,
                brand: body.brand,
                description: body.description,
                image: url,
                price: Number(body.price),
                stock: Number(body.stock)
            });
            return response.status(200).send({ msg: 'Producto cargado correctamente' });
        }
        catch (error) {
            return response.status(400).json({ msg: 'Ocurrio un Error', error });
        }
    }
});
exports.newProduct = newProduct;
const updateProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { body } = request;
    try {
        const productUpd = yield product_1.Product.update({ price: body.price, stock: body.stock, description: body.description }, { where: { id: id } });
        if (productUpd) {
            return response.status(200).send({ msg: 'Producto actualizado exitosamente' });
        }
        else {
            return response.status(400).send({ msg: 'Producto no encontrado' });
        }
    }
    catch (error) {
        return response.status(400).json({ msg: 'Ocurrio un Error', error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    // let querySalesProduct = "DELETE FROM sales WHERE idProduct = ?";
    // let queryPublicationsProduct = "DELETE FROM publications WHERE idProduct = ?";
    // let querySearch = "DELETE FROM products WHERE id = ?";
    //ver FK en sales y publications antes de eliminar el producto
    try {
        try {
            yield sales_1.Sales.destroy({ where: { idProduct: id } });
        }
        finally {
            try {
                yield publication_1.Publication.destroy({ where: { idProduct: id } });
            }
            finally {
                try {
                    yield product_1.Product.destroy({ where: { id: id } });
                    return response.status(200).send({ msg: 'Producto eliminado correctamente' });
                }
                catch (error) {
                    return response.status(400).send({ msg: 'Producto no encontrado', error });
                }
            }
        }
    }
    catch (_a) {
        return response.status(400);
    }
});
exports.deleteProduct = deleteProduct;
const getOneProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProd } = request.params;
    try {
        const product = yield product_1.Product.findOne({ where: { id: idProd } });
        if (product) {
            return response.status(200).json(product);
        }
        else {
            return response.status(400).send({ msg: 'Producto no encontrado' });
        }
    }
    catch (error) {
        return response.status(400).json({ msg: 'ocurrio un error', error });
    }
});
exports.getOneProduct = getOneProduct;
