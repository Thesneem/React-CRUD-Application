const usermodel = require("../models/usermodel")
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60

const createToken = (id, email) => {
    return jwt.sign({ id, email }, 'tezzsecretkey', {
        expiresIn: maxAge
    })
}

const Adminemail = 'admin@gmail.com';
const Adminpassword = 'admin'

module.exports = {
    adminLogin: (req, res, next) => {
        try {
            const { email, password } = req.body
            if (email == Adminemail && password == Adminpassword) {
                const token = createToken(email)
                console.log(token + 'adminTOKEN')
                res.status(201).json({ type: 'success', token })

            }

        }
        catch (err) {
            console.log(err)
        }
    },
    userlist: async (req, res, next) => {
        const search = req.query.search || ''
        const query = {
            name: { $regex: search, $options: 'i' }
        }
        try {
            console.log(req.query.search)
            const user = await usermodel.find(query)
            console.log(user + 'Hellooo')
            res.status(201).json({ type: 'success', user })
        }
        catch (err) {
            console.log(err)
        }
    },
    adduser: async (req, res, next) => {
        try {
            const { name, email, password } = req.body
            console.log(req.body)
            console.log(req.file + 'FILE')
            // const image = req.file.filename
            const newuser = usermodel({
                name,
                email,
                password,

            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err) throw err
                    newuser.password = hash
                    newuser.save().then(() => {
                        res.status(201).json("success")
                    })

                        .catch((err) => {
                            res.status(400).json('Error' + err)
                        })
                })
            })
        }
        catch (err) {
            console.log(err)
        }
    },
    edituser: async (req, res, next) => {
        try {
            console.log('reachedEdit')
            const id = req.params.id
            console.log(req.body)
            console.log(id + 'EDItUSERID')
            const { name, email } = req.body
            await usermodel.findOneAndUpdate({ _id: id }, { $set: { name, email } })
                // console.log(user + 'Updateduser')
                .then(() => {
                    res.status(201).json("successfully edited User")
                })
                .catch((err) => {
                    res.status(400).json('Error' + err)
                })
        }
        catch (err) {
            console.log(err)
        }
    },
    deleteuser: async (req, res, next) => {
        try {
            // console.log(req.body._id + "DELETUSER")
            console.log('Hi' + req.params.id)
            // Modify the userToDelete object to have a valid ObjectId
            // const id = new mongoose.Types.ObjectId(req.body._id);
            // req.body._id = id
            // userToDelete._id = id;
            const id = req.params.id
            await usermodel.findByIdAndDelete({ _id: id })
                .then(() => {
                    res.status(201).json("user deleted successfully")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

}