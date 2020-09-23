
const jwt = require('jsonwebtoken'); //Permet la création d'un jeton/token d'authentification pour sécuriser la connexion d'un utilisateur
const connectdb = require('../connectdb.js');
const mysql = require('mysql');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //Récupération du token provenant de la requête
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //Fonction qui décode le token (RANDOM_TOKEN_SECRET sera remplacé par une chaîne plus complexe en situation de déploiement réel dans tous les fichiers qui l'utilisent)
        const userId = decodedToken.userId; //Récupération de l'id de l'utilisateur
        let sqlInserts = [userId];
        let sql = 'SELECT COUNT(id) FROM users WHERE id=?';
        sql = mysql.format(sql, sqlInserts); 
        connectdb.query(sql, function(err, result){
            if (err) reject({error : 'Erreur dans l\'inscription'});
            if (result[0]['COUNT(id)'] !== 1) {
                throw 'Token invalide';
            } else {
                next();
            }
        })
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée!'})
    }
}; 