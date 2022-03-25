const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/User');

const jwt = require('jsonwebtoken')


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) =>{
    try {
        const user = await User.create({email, password});
        return done(null, user);
    } catch (error) {
        done(error);
    }
}))

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{
    try {
        const user = await User.findOne({email});
        if(!user){
            return done(null, false, {message: 'User does not exist'})
        }
        
        const validate = await user.isValidPassword(password);
        if(!validate){
            return done(null, false, {message: 'User or password incorrect'})
        }
        
        const body = {_id: user._id, email: user.email};
        const token = jwt.sign({user: body}, process.env.JWT_SECRET);

        return done(null, token);

    } catch (error) {
        return done(error);
    }
}))

passport.use('jwt', new JwtStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) =>{
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}))