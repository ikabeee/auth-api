const express = require('express');
const http = require('http');
const path = require('node:path');
const usersDb = (require(path.join(__dirname, './db/users.json'))); //Path 

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(express.json()); // Middleware

app.get('/users/all', (_req, res) => {
    res.json(usersDb);
});

// app.put('/users/:id', (req, res)=>{
//     try {
//         const id = req.params.id;
//         const 
//     }
// })

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = usersDb.findIndex(user => user.id == id);
    if (!user) {
        res.status(400).json({error: 'User not found'});
    }
    return res.json(user);
});

app.delete('/users/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = usersDb.findIndex(c => c.id == id);
        if (!user) {
            res.status(400).json({error: 'User not found'});
        }
        const deletedUser = usersDb.splice(user, 1);
        return res.status(200).json({ 
            message: `User deleted`, 
            user: deletedUser[0] 
        });
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }

});

server.listen(port, () => {
    console.log(`Listening app on port ${port}`);
});