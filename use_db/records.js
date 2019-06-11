/*
 * Created on June 11, 2019
 * Dr.Chain Project
 * @author: Jae-Hyeong Kim, Su-Min Lee, Won-Hyo Choi
 */
const express = require('express');
const router = express.Router();

const conn = require('../global/db.js');
const crypto = require('crypto');

const Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// address of contract -> get the value in Remix
let contract_addr = "Enter_the_contract_address";

// smart contract abi
let abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_records_id",
				"type": "uint256"
			},
			{
				"name": "_data_hash",
				"type": "string"
			}
		],
		"name": "Change_list",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_records_id",
				"type": "uint256"
			},
			{
				"name": "_data_hash",
				"type": "string"
			}
		],
		"name": "Input_list",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "record_list",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_records_id",
				"type": "uint256"
			}
		],
		"name": "Show_list",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

// connect to Contract
let user_contract = new web3.eth.Contract(abi, contract_addr);

// insert the values in block_chain
function ether_input(id, hash){
	let new_account = '';
	web3.eth.getAccounts().then(e => {
		new_account = e[0];
		user_contract.methods.Input_list(id, hash).send({
			from: new_account,
			gas: 100000
		}, (err, result) => {
			if(!err) {
				console.log("Block ether input success!");
			} else { // Error handling
				console.log("error");
			}
		});
	})
}

// get the values in block_chain -> get the value in Remix
function ether_output(id) {
	var records_hash = '';

	return user_contract.methods.Show_list(id).call({from: 'Enter_the_account_address'});
}


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
	conn.query('SELECT * FROM records_secure', (err, rows, fields) => {
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

// get specific data from block_chain
router.get('/:id', (req, res, next) => {
	conn.query('SELECT * FROM records_secure WHERE id='+req.params.id, (err, rows, fields) => {
		try {
			if(!err){
				res_data = JSON.parse(JSON.stringify(rows))[0];
				let records_id = res_data['id'];
				let hash_secure = res_data['hash'];
				let decrypt_key = '' + records_id + hash_secure.substring(parseInt(hash_secure.length/2), hash_secure.length);
				res_data['data'] = JSON.parse(decrypt(res_data['data'], decrypt_key));

				var block_hash = '';
				var database_hash = '';

				ether_output(records_id).then((result) => {
					block_hash = result;
					database_hash = hash_secure;

					console.log("Block Chain's hash value : ", block_hash);
					console.log("Database's hash value : ", database_hash);

					if(block_hash == database_hash){
						console.log('records get success!');
						res.json(res_data);
					} else { // Error handling
						res.send('No validity');
					}

				}).catch(e => console.log(e)); // Error handling
			} else {
				console.log('Error while performing Query.', err);
			}
		} catch (e) { // Error handling
			next(e);
		}
	});
});

// get specific data from block_chain in doctor authority
router.get('/doctor/:user_id', (req, res, next) => {
	const user_id = req.params.user_id || 0;

	let query = "SELECT * FROM records WHERE user_id = ?";
	let param = [user_id];

	conn.query(query, param, (err, rows, fields) => {
		try {
			if(err) { // Error handling
				res.status(500).send('NO');
				console.log('Error while performing Query.', err);
			} else {
				res_data = JSON.parse(JSON.stringify(rows));
				res.status(200).send(res_data);
			}
		} catch(e) { // Error handling
			next(e);
		}
	})
})

// write record and insert data
router.post('/insert', (req, res, next) => {
	const user_id = req.body.user_id || null;
	const doctor_id = req.body.doctor_id || null;
	const disease = req.body.disease || null;
	const opinion = req.body.opinion || null;
	const img = req.body.img || null;
	const contract_addr = req.body.contract_addr || null;
	const hospital_id = req.body.hospital_id || null;

	let json_obj = {};
	json_obj['user_id'] = user_id;
	json_obj['hospital_id'] = hospital_id;
	json_obj['doctor_id'] = doctor_id;
	json_obj['disease'] = disease;
	json_obj['opinion'] = opinion;
	json_obj['img'] = img;
	json_obj['contract_addr'] = contract_addr;
	json_obj['regTime'] = Date.now();
	let json_str = JSON.stringify(json_obj);

	const query = "INSERT INTO records (user_id, hospital_id, doctor_id, disease, opinion, img, contract_addr) values (?, ?, ?, ?, ?, ?, ?);";
	let param = [user_id, hospital_id, doctor_id, disease, opinion, img, contract_addr];
	conn.query(query, param, (err, rows, fields) => {
		try {
			if(!err) {
				console.log('insert success');
				let res_data = JSON.parse(JSON.stringify(rows));

				let insertId = res_data['insertId'];

				let hash_secure = get_hash(json_str);
				let encrypt_key = '' + insertId + hash_secure.substring(parseInt(hash_secure.length/2), hash_secure.length);

				let data_secure = encrypt(json_str, encrypt_key);

				let query_secure = "INSERT INTO records_secure (id, data, hash) values ((select id from records where opinion=? order by id desc limit 1), ?, ?);";
				let param_secure = [opinion, data_secure, hash_secure];



				conn.query(query_secure, param_secure, (err, results) => {
					try {
						if(!err) {
							console.log('secure insert success!');
							ether_input(insertId, hash_secure);
							res.status(200).send('OK');
						} else {
							console.log('secure record fail!', err);
							res.status(500).send('NO');
						}
					} catch (e) { // Error handling
						next(e);
					}
				});

			} else { // Error handling
				console.log('Error while performing Query.', err);
				res.status(500).send('NO');
			}
		} catch (e) { // Error handling
			next(e);
		}
	});
});

// insert hash value
router.get('/hash/:r_id', (req, res, next) => {
	const records_id = req.params.r_id || -1;

	ether_output(records_id).then((result) => {
		let block_hash = result;
		let db_hash = '';
		const query = "select hash from records_secure where id=?;";
		const param = [records_id];

		conn.query(query, param, (err, result) => {
			try{
				let res_data = JSON.parse(JSON.stringify(result))[0];
				db_hash = res_data['hash'];

				json_obj = {};
				json_obj['block_hash'] = block_hash;
				json_obj['db_hash'] = db_hash;

				res.json(json_obj);
			} catch (e) { // Error handling
				next(e);
			}
		})
	}).catch(e => {console.log(e)}); // Error handling
})

module.exports = router;
