const express = require('express');
const router = express.Router();

const Room = require('../models/room');

//view all
router.get('/', async (req,res)=>{
    try{
        const rooms = await Room.find({});
        res.render('room/index.ejs', {rooms});
    }
    catch(error){
        console.error(error);
        res.redirect('/')
    }
});

//add
router.get('/new', (req, res)=>{
    res.render('Room/new.ejs')
});

//create
router.post('/', async (req, res) => {
    try{
        req.body.owner = req.session.user._id;
        if (req.body.availability === 'on') {
            req.body.availability = true;
        } else if (req.body.availability === 'off') {
            req.body.availability = false;
        } else {
            throw new Error('Invalid')
        }
        console.log(req.body)
        await Room.create(req.body);
        res.redirect(`/rooms`);
    }
    catch(error){
        console.error(error);
        res.redirect('/rooms/new');
    }
 
});

//show
router.get('/:id', async (req, res) => {
    const room = await Room.findById(req.params.id);
    res.render('room/show.ejs', {room});
});

//edit 
router.get('/:id/edit', async (req, res) => {
    const room = await Room.findById(req.params.id);

    res.render('room/edit.ejs', {room});
});

//update 
router.put('/:id', async (req, res)=>{
    try{
        const updateroom = req.body;
        console.log(updateroom)
    if (updateroom.availability === 'on') {
        updateroom.availability = true;
    }
    else   {
        updateroom.availability = false;
    } 
    await Room.findByIdAndUpdate(req.params.id, updateroom, {new: true});
    res.redirect(`/rooms/${req.params.id}`)
    }
    catch(error){
        console.error(error);
        res.redirect(`/rooms/${req.params.id}/edit`);
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try{
        await Room.findByIdAndDelete(req.params.id);
        res.redirect('/rooms');
    }
    catch(error){
        console.error(error);
        res.redirect(`/rooms/${req.params.id}`);
    }
});


module.exports = router