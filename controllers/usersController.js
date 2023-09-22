const User = require('../models/user');

const users= [];
let failedAddUserAttempt = false;
let failedLoginAttempt = false;
let failureMessage = '';

const renderRegister = (res) => res.render('register', {failedAddUserAttempt, failureMessage});

const register = (req, res) => {
    renderRegister(res);
}

const addUsersVerifier = (req, res, next) => {
    const newUser = req.body;

    if (newUser.password !== newUser.confirmationPassword) {
        failedAddUserAttempt = true;
        failureMessage = `Passwords must match. Please try again.`;
        renderRegister(res);
        return;
    } 

    const existingUser = 
        users.filter(user => user.username === newUser.username || user.email === newUser.email).length;

    if(existingUser > 0) {
        failedAddUserAttempt = true;
        failureMessage = `User must have unique username and email. Username or email already in use.`;
        renderRegister(res);
        return;
    } else {
        failedAddUserAttempt = false;
        failureMessage = ``;
        next();
    }
}

const addUsers = (req, res) => {
    // After verifying the User is valid in addUsersVerifier, add the new User
    const user = req.body;
    const newUser = new User(user.username, user.email, user.password);

    users.push(newUser);
    console.log(`User with username ${newUser.username} and email ${newUser.email} added to the database`);
    res.redirect('/api/v1/users/login');
}

const userLoginPage = (req, res) => {
    res.render('login', {failedLoginAttempt, failureMessage});
}

const onUserLoginAction = (req, res) => {
    const potentialUser = req.body;

    const user = users.find(user => user.username == potentialUser.username);

    if(user == undefined) {
        failedLoginAttempt = true;
        failureMessage = `User cannot be not found. Please try again or register new user.`;
        res.render('login', {failedLoginAttempt, failureMessage});
    } else if(user.email !== potentialUser.email || user.password !== potentialUser.password) {
        failedLoginAttempt = true;
        failureMessage = `Information incorrect for user with name ${user.username}. Cannot authenticate. Please try again.`;
        res.render('login', {failedLoginAttempt, failureMessage});
    } else {
        failedLoginAttempt = false;
        failureMessage = ``;
        res.redirect(`/api/v1/users/${user.username}`);
    }
}

const getUser = (req, res) => {
    const username = req.params['id'];
    const user = users.find(user => user.username == username);

    res.render('user', {user});
}

const updateInfo = (req, res) => {
    const oldUsername = req.params['id'];
    const newUserName = req.body.username;
    const newEmail = req.body.email;

    // Get the old user, find its index, create a new user
    // with the old user's password, and update the user's array
    // with the new user
    const user = users.find(user => user.username == oldUsername);
    const index = users.indexOf(user);
    const newUser = new User(newUserName, newEmail, user.password);
    users[index] = newUser;

    res.redirect(`/api/v1/users/${newUser.username}`);
}

const updatePassword = (req, res) => {
    const username = req.params['id'];
    const newPassword = req.body.password;
    const confirmationPassword = req.body.confirmationPassword;

    if(newPassword !== confirmationPassword) {
        console.log('Updated passwords must be equal.');
    } else {
    // Get the old user, find its index, create a new user
    // with the old user's username and email, and update the user's 
    // array with the new user (with updated password)
        const user = users.find(user => user.username == username);
        const index = users.indexOf(user);
        const newUser = new User(user.username, user.email, newPassword);
        users[index] = newUser;

        res.redirect(`/api/v1/users/${newUser.username}`);
    } 
}

module.exports = {
    register,
    addUsersVerifier,
    addUsers,
    userLoginPage,
    onUserLoginAction,
    getUser,
    updateInfo,
    updatePassword,
};