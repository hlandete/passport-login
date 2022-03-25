const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken')


router.get('/', function(req, res, next){
    console.log("Hello");
    res.send('Hello World')
});

router.post('/signup', passport.authenticate('signup', {session: false}), async (req, res)=>{
    res.json({
        message: 'Signup succesful',
        user: req.user
    })
})


router.post('/login', passport.authenticate('login', {session: false}), async (req, res)=>{
    
    res.json({
        message: 'Signup succesful',
        user: req.user
    })
})

/*router.post('/login', async (req, res, next)=>{
    passport.authenticate('login', {session: false},  async (err, user, info)=>{
        try {
            if(err || !user) {
                const error = new Error('new Error')
                return next(error)
            }

            req.login(user, {session: false}, async (err) =>{
                if (err) return next(err)
                const body = {_id: user._id, email: user.email};
                const token = jwt.sign({user: body}, 'top_secret');

                return res.json({token});
            })
        } catch (e) {
            return next(e)
        }
    })(req, res, next)
})*/


router.get('/checkToken', passport.authenticate('jwt', {session: false}), async (req, res)=>{
    res.json({
        message: 'success'
    });
});

module.exports = router;