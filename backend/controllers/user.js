const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const UserModels = require ('../Models/UserModels.js');
const passwordValidator = require("password-validator"); //Permet de vérifier la complexité d'un mot de passe
const checkInputs = require("../utils/checkInputs");

let userModels = new UserModels();

let schema = new passwordValidator();
//Le mot de passe doit contenir au minimum 8 caractères, au maximum 20 caractères, doit avoir au moins une majuscule, une minuscule, un nombre et pas d'espace
schema.is().min(8).is().max(20).has().uppercase().has().lowercase().has().digits().has().not().spaces();

//Inscription
exports.signup = (req, res, next) => {
    let email = req.body.email.trim();
	let password = req.body.password;
	let firstName = req.body.firstName.trim();
    let lastName = req.body.lastName.trim();

    //On vérifie que les champs nom, prénom et email ne sont pas vides
    if(firstName == null || lastName == null || email == null || password == null){
        res.status(400).json({
            error: "Paramètres manquants."
        });
    }

    //On vérifie que le nom, prénom et email sont bien formatés
    else if(!checkInputs.validEmail(email) || !checkInputs.validName(firstName) || !checkInputs.validName(lastName)){
        res.status(400).json({
            error: "Paramètres incorrectement syntaxés."
        });
    }

    //On vérifie que le mot de passe respecte les recommandations de sécurité
    else if(!schema.validate(req.body.password)){
        return res.status(400).json({
            error: "Le mot de passe entré n'est pas correctement formaté."
        });
    } else {
        let hash = bcrypt.hashSync(password, 10);

        let sqlInserts = [lastName, firstName, email, hash];
        userModels.signup(sqlInserts)
            .then((response) =>{
                res.status(201).json(JSON.stringify(response))
             })
            .catch((error) =>{
                console.error(error);
                res.status(400).json({error})
            })

    }
};

//Connexion
exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let sqlInserts = [email];
    userModels.login(sqlInserts, password)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}

//Cherche un profil
exports.seeMyProfile = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    userModels.seeMyProfile(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
}   

//Modifie un profil
exports.updateUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlInserts = [firstName, lastName, email, userId];
    userModels.updateUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            res.status(400).json(error)
        })
}
 
//Supprime un utilisateur
exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    userModels.deleteUser(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(error)
        })
} 
 


