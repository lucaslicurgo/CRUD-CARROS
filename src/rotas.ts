import { Router } from 'express';
import { atualizarCarro, cadastrarCarros, detalharCarros, excluirCarro, listarCarro } from './controladores/carros';

const rotas = Router();

rotas.get('/carros', listarCarro);
rotas.get('/carros/:id', detalharCarros);
rotas.post('/carros', cadastrarCarros);
rotas.put('/carros/:id', atualizarCarro);
rotas.delete('/carros/:id', excluirCarro);

export default rotas;