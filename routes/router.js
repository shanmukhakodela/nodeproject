const express = require('express');

const router = express.Router()
const { v4: uuidv4 } = require("uuid");

const cache = {};

function set(key, value) {
    cache[key] = value;
}

function get(key) {
    return cache[key];
}
function getAll() {
    return cache;
}

function remove(key) {
    delete cache[key];
} 
//Post Method
router.post('/post', (req, res) => {
    try {
        if(req.body.name && req.body.email) {
            // Generate a UUID v4
        const uuid = uuidv4();
        const data = {_id: uuid, name:req.body.name, email: req.body.email};
        set(uuid, data);
        res.status(200).json(cache[uuid]);
        } else {
            res.status(400).json({message: "Invalid body"})
        }
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', (req, res) => {
    try {
        const data = getAll();
        if(data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({message: "data not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    try {
        const data = get(req.params.id);
        if(data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({message: "Data not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    try {
        const data = get(req.params.id);
        if(req.body.name && req.body.email && data) {
            data.name = req.body.name;
            data.email = req.body.email;
            set(req.params.id, data);
            res.status(200).json(cache[req.params.id]);
        } else {
            res.status(400).json({message: "Invalid body"});
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    try {
        remove(req.params.id);
        const data = getAll();
        res.status(200).json(data);   
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;
