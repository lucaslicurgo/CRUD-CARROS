"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excluirCarro = exports.atualizarCarro = exports.cadastrarCarros = exports.detalharCarros = exports.listarCarro = void 0;
const conexao_1 = require("../banco/conexao");
const listarCarro = async (req, res) => {
    try {
        const carros = await (0, conexao_1.knex)('carros');
        return res.json(carros);
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};
exports.listarCarro = listarCarro;
const detalharCarros = async (req, res) => {
    const { id } = req.params;
    try {
        const carro = await (0, conexao_1.knex)('carros').where({ id: Number(id) }).first();
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' });
        }
        return res.json(carro);
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};
exports.detalharCarros = detalharCarros;
const cadastrarCarros = async (req, res) => {
    const { marca, modelo, ano, cor, valor } = req.body;
    try {
        const cadastroCarro = await (0, conexao_1.knex)('carros').insert({ ano, cor, marca, modelo, valor }).returning('*');
        return res.status(201).json(cadastroCarro[0]);
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};
exports.cadastrarCarros = cadastrarCarros;
const atualizarCarro = async (req, res) => {
    const { marca, modelo, ano, cor, valor } = req.body;
    const { id } = req.params;
    try {
        const carro = await (0, conexao_1.knex)('carros').where({ id: Number(id) }).first();
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado' });
        }
        await (0, conexao_1.knex)('carros').where({ id: Number(id) }).update({ marca, modelo, ano, cor, valor });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};
exports.atualizarCarro = atualizarCarro;
const excluirCarro = async (req, res) => {
    const { id } = req.params;
    try {
        const carro = await (0, conexao_1.knex)('carros').where({ id: Number(id) });
        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado.' });
        }
        await (0, conexao_1.knex)('carros').where({ id: Number(id) }).del();
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json('Erro interno do servidor.');
    }
};
exports.excluirCarro = excluirCarro;
