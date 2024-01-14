import { Request, Response } from 'express';
import { knex } from '../banco/conexao';

export const listarCarro = async (req: Request, res: Response) => {
    try {
        const carros = await knex('carros');
        return res.json(carros);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const detalharCarros = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const carro = await knex('carros').where({ id });
        return res.json(carro);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
};

export const cadastrarCarros = async (req: Request, res: Response) => {
    const { marca, modelo, ano, cor, valor } = req.body;

    try {
        const cadastroCarro = await knex('carros').insert({ marca, modelo, ano, cor, valor }).returning('*');
        return res.status(202).json(cadastroCarro[0]);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

export const atualizarCarro = async (req: Request, res: Response) => {
    const { marca, modelo, ano, cor, valor } = req.body;
    const { id } = req.params;

    try {
        const carro = await knex('carros').where({ id });

        if (!carro) {
            return res.status(400).json({ mensagem: 'Carro não encontrado' });
        }

        const atualizacao = await knex('carros').where({ id }).update({ marca, modelo, ano, cor, valor });

        return res.status(201).json({ mensagem: 'Atualização concluída.' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
};

export const excluirCarro = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const carro = await knex('carros').where({ id });

        if (!carro) {
            return res.status(400).json({ mensagem: 'Carro não encontrado.' });
        }

        await knex('carros').where({ id }).del();

        return res.status(200).json({ mensagem: 'Carro excluído.' });
    } catch (error) {
        return res.status(500).json('Erro interno do servidor.');
    }
}; 