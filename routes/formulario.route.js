const express = require('express');
const formularioRoutes = express.Router();
const Formulario = require('../model/Formulario'); // Supondo que 'Formulario' seja o seu modelo Mongoose
 
// API para adicionar formulário
formularioRoutes.route('/add').post(async (req, res) => {
    try {
        let formulario = new Formulario(req.body);
        await formulario.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Formulario added successfully' });
    } catch (err) {
        console.error('Error adding formulario:', err);
        res.status(409).send({ 'status': 'failure', 'mssg': 'Unable to save to database' });
    }
});
 
// API para obter todos os formulários
formularioRoutes.route('/getall').get(async (req, res) => {
    try {
        const formularios = await Formulario.find();
        res.status(200).json({ 'status': 'success', 'formularios': formularios });
    } catch (err) {
        console.error('Error getting formularios:', err);
        res.status(400).json({ 'status': 'failure', 'mssg': 'Something went wrong' });
    }
});
 
// API para obter um formulário pelo ID
formularioRoutes.route('/:id').get(async (req, res) => {
    try {
        const formulario = await Formulario.findById(req.params.id);
        if (!formulario) {
            return res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        }
        res.status(200).json({ 'status': 'success', 'formulario': formulario });
    } catch (err) {
        console.error('Error getting formulario by ID:', err);
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
    }
});
 
// API para atualizar um formulário pelo ID
formularioRoutes.route('/update/:id').put(async (req, res) => {
    try {
        const formulario = await Formulario.findById(req.params.id);
        if (!formulario) {
            return res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        }
 
        formulario.nome = req.body.nome;
        formulario.email = req.body.email;
        formulario.telefone = req.body.telefone;
        formulario.cep = req.body.cep;
        formulario.rua = req.body.rua;
 
        await formulario.save();
        res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
    } catch (err) {
        console.error('Error updating formulario:', err);
        res.status(500).json({ 'status': 'failure', 'mssg': 'An error occurred', 'error': err });
    }
});
 
// API para deletar um formulário pelo ID
 
 
formularioRoutes.route('/delete/:id').delete(async (req, res) => {
    try {
        const result = await Formulario.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        }
        res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
    } catch (err) {
        console.error('Error deleting formulario:', err);
        res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
    }
});
 
 
 
 
module.exports = formularioRoutes;