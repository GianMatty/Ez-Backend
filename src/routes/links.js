const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const db = url
    const newLink = {
        title,   
        db,
        description,
        user_id: req.user.id
    };
    console.log(newLink)
    await pool.query('INSERT INTO dbs set ?', [newLink]);
    req.flash('success', 'Backend Generado Exitosamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM dbs WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM dbs WHERE ID = ?', [id]);
    req.flash('success', 'Backend eliminado exitosamente');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM dbs WHERE id = ?', [id]);
    const link = links[0]
    console.log(links);
    res.render('links/edit', { link });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE dbs set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Backend actualizado exitosamente');
    res.redirect('/links');
});

module.exports = router;