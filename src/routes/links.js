const express = require('express')
const router = express.Router()
const multer = require('multer')
const mimeTypes = require('mime-types')
const path = require('path')

const pool = require('../database');

const storage=multer.diskStorage({
    destination:'uploads/',
    filename:function(req,file,cb){
        cb("",Date.now() + file.originalname)
    }
})

const upload = multer({
    storage:storage
})

const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', upload.single('archivo'), isLoggedIn, async (req, res) => {
    const { empresa, rubro, fecha, domicilio, RFC, descripcion } = req.body;
    const newLink = {
        empresa,
        rubro,
        fecha,
        domicilio,
        RFC,
        descripcion,
        PathImage:req.file.path,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO proveedor set ?', [newLink]);
    req.flash('success', 'Registro guardado satisfactoriamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM proveedor WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM proveedor WHERE ID = ?', [id]);
    req.flash('success', 'Registro eliminado satisfactoriamente');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM proveedor WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', { link: links[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { empresa, rubro, fecha, domicilio, RFC, descripcion } = req.body;
    const newLink = {
        empresa,
        rubro,
        fecha,
        domicilio,
        RFC,
        descripcion
    };
    await pool.query('UPDATE proveedor set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Registro actualizado satisfactoriamente');
    res.redirect('/links');
});

router.get('/details/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM proveedor WHERE id = ?', [id]);
    console.log(links);
    res.render('links/details', { link: links[0] });
});

module.exports = router