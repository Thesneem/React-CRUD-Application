const usermodel = require("../models/usermodel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60

const createToken = (id, email) => {
    return jwt.sign({ id, email }, 'tezzsecretkey', {
        expiresIn: maxAge
    })
}


module.exports = {
    register: async (req, res, next) => {
        try {
            console.log("hi")
            const { name, email, password } = req.body
            const newuser = usermodel({
                name, email, password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err) throw err
                    newuser.password = hash
                    newuser.save().then(() => {
                        console.log(newuser)
                        const token = createToken(newuser._id, newuser.email)
                        console.log(token + 'TOKEN')
                        // res.cookie('jwt', token, {
                        //     withCredentials: true,
                        //     httpOnly: false,
                        //     maxAge: maxAge * 1000
                        // }
                        // )
                        res.status(201).json({ user: newuser._id, created: true, token })

                    })
                        .catch((err) => {
                            console.log(err)
                            res.status(11000).json('Email exist')
                        })
                })

            })


        }
        catch (err) {
            console.log(err)
        }
    },

    login: async (req, res, next) => {
        try {
            console.log("hiLogin")
            const { email, password } = req.body;
            const user = await usermodel.findOne({ email: email });
            if (!user) {
                console.log("Invalid user")
                res.status(400).json({ error: "Invalid email or password" });
            }
            else {
                const isUser = await bcrypt.compare(password, user.password);
                if (!isUser) {
                    console.log("Invalid password")
                    res.status(400).json({ error: "Invalid email or password" });

                }

                else {
                    const token = createToken(user._id, user.email)
                    console.log(token + 'TOKEN')
                    res.status(201).json({ type: 'success', token })
                }
            }
            //         else {
            //     res.json('error')
            // }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    },
    profile: async (req, res, next) => {
        try {
            console.log(req.user)
            const user = await usermodel.findById({ _id: req.user.id })
            // Set the cache-control header to disable caching
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            console.log(user)
            res.status(201).json({ user })
        }
        catch (err) {
            console.log(err)
        }
    }
    ,
    editprofile: async (req, res, next) => {
        try {
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
    editImage: async (req, res, next) => {
        try {
            console.log("editImage")
            const image = req.file.filename
            const user = await usermodel.updateOne({ _id: req.user.id }, { $set: { image: image } }, { upsert: true })
            res.status(201).json({ type: 'Success' })
        }
        catch (err) {

        }
    }
}