/*
 * Created on June 11, 2019
 * Dr.Chain Project
 * @author: Jae-Hyeong Kim, Su-Min Lee, Won-Hyo Choi
 */
const express = require('express');
const router = express.Router();

const conn = require('../global/db.js');
const crypto = require('crypto');

// encrypt function
function encrypt(text, key) {
	const cipher = crypto.createCipher('aes-256-cbc', key);
	let encipheredContent = cipher.update(text, 'utf8', 'hex');
	encipheredContent += cipher.final('hex');

	return encipheredContent;
}

// decrypt function
function decrypt(text, key) {
	const decipher = crypto.createDecipher('aes-256-cbc', key);
	let decipheredContent = decipher.update(text, 'hex', 'utf8');
	decipheredContent += decipher.final('utf8');

	return decipheredContent;
}

// get the hash value of input data
function get_hash(text) {
	const shasum = crypto.createHash('sha1');
	shasum.update(text);
	return shasum.digest('hex');
}

// get all data from user table
router.get('/all', (req, res, next) => {
	conn.query('SELECT * FROM user', (err, rows, fields) => {
		try {
			if(!err){
				res_data = JSON.parse(JSON.stringify(rows));
				res.json(res_data);
			} else { // Error handling
				console.log('Error while performing Query.', err);
			}
		} catch (e) { // Error handling
			next(e);
		}

	});
});

// get specific data from user table
router.get('/:id', (req, res, next) => {
	conn.query('SELECT * FROM user WHERE id='+req.params.id, (err, rows, fields) => {
		try {
			if(!err) {
				res_data = JSON.parse(JSON.stringify(rows));
				res.json(res_data);
			} else {
				console.log('Error while performing Query.', err);
			}
		} catch(e) { // Error handling
			next(e);
		}
	});
});

// sign up and insert data
router.post('/signup', (req, res, next) => {
	if(req.body.gender<0 || req.body.gender>1){
		res.status(500).redirect("/signup");
	}
	else if(req.body.role<0 || req.body.role>1) {
		res.status(500).redirect("/signup");
	}
	else {
		const login_id = req.body.id;
		const login_password = req.body.password;
		const user_name = req.body.name;
		const user_gender = req.body.gender;
		const user_age = req.body.age;
		const user_role = req.body.role;

		let query_user = "INSERT INTO user (name, gender, age, role) values (?, ?, ?, ?);"
		let param_user = [user_name, user_gender, user_age, user_role];

		conn.query(query_user, param_user, (err, result) => {
			try {
				if(!err){

					let res_data = JSON.parse(JSON.stringify(result));
					let insertId = res_data['insertId'];

					let hash_pw = get_hash(login_password);

					let query_login = "INSERT INTO user_sign (login_id, login_password, user_id) values (?, ?, ?);";
					let param_login = [login_id, hash_pw, insertId];

					conn.query(query_login, param_login, (err, result) => {
						try {
							if(!err) {
								console.log('sign up success');
								res.redirect("/login");
							} else {
								res.status(500);
							}
						} catch (e) { // Error handling
							next(e);
						}
					})
				} else { // Error handling
					console.log("Error while performing Query.", err);
				}
			} catch (e) { // Error handling
				next(e);
			}
		})
	}
});

// login
router.post('/signin', (req, res, next) => {
	const id_login = req.body.id || null;
	const pw_login = req.body.password || null;
	const pw_hash = get_hash(pw_login);

	let query = "SELECT user_id FROM user_sign WHERE login_id=? and login_password=?;";
	let param = [id_login, pw_hash];

	conn.query(query, param, (err, result) => {
		try {
			if(!err) {
				result_json = JSON.parse(JSON.stringify(result));
				if(result_json[0]==undefined){
					console.log('debug');
					//alert("Please reinput your id and password.");
					res.status(500).redirect('/login');
				} else {
					user_id = result_json[0]['user_id'];
					console.log(result_json[0]['user_id'], 'login');
					res.cookie('user_id', user_id);
					res.redirect("/select?id="+user_id);
				}
			} else { // Error handling
				next(err);
			}
		} catch (e) { // Error handling
			next(e);
		}
	})
})

module.exports = router;
