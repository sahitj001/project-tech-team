const User = require('../models/User')
const https = require('https')

exports.profile = (req, res) => {
	if (req.user) {
		res.render('profile', {
			user: req.user
		})
	}
}
exports.goToEdit = (req, res) => {
	res.render('edit-profile', {
		user: req.user
	})
}

exports.doEdit = (req, res) => {
	let filePath = req.file.path
	let randomCheck = req.body.pickupBox
	let name = req.body.name
	let userId = req.user.id
	let userAge = req.body.age
	let userPreference = req.body.genderPreference
	let userHobby = req.body.hobby

	const options = {
		hostname: 'pebble-pickup.herokuapp.com',
		path: '/tweets',
	}

	console.log('checkbox is: ', req.body.pickupBox)
	//Nodejs. (z.d.). Making HTTP requests with Node.js. Geraadpleegd op 13 april 2020, van https://nodejs.dev/making-http-requests-with-nodejs
	//if checkbox has been checked, connect to api to choose random pickupline
	if (randomCheck) {
		//make connection with API
		https.get(options, resp => {
			resp.on('data', d => {

				//taking the list of json pickuplines and putting them in a variable
				let pickupLines = JSON.parse(d)

				// console.log('data is', pickupLines)

				//here I choose which pickupline I want to use. the list consists out of an array so I picked an object within that array
				//random picker for array
				console.log('pickupline length is: ', pickupLines.length)
				let randomLine = Math.floor(Math.random() * pickupLines.length - 1)
				let myLine = pickupLines[randomLine]
				//here I take the key value from the object. tweet is the pickupline from that object
				let temp = myLine.tweet
				console.log('pickupline is ', temp)

				User.findOneAndUpdate({
					_id: userId
				}, {
					$set: {
						pickupline: temp,
						name: name,
						picture: filePath,
						age: userAge,
						preferences: userPreference,
						hobby: userHobby
					}
				},
				function (err) {
					if (err) {
						console.log('something went wrong when i tried to update: ', err)
					} else {
						console.log('account has been updated')
					}
				})
				res.redirect('/profile')
			})
		})
	} else {
		console.log('checkbox not ticked')
		let sentence = req.body.pickupText
		User.findOneAndUpdate({
			_id: userId
		}, {
			$set: {
				pickupline: sentence,
				name: name,
				picture: filePath,
				age: userAge,
				preferences: userPreference,
				hobby: userHobby
			}
		}, function (err) {
			if (err) {
				console.log('something went wrong when i tried to update: ', err)
			} else {
				console.log('account has been updated without checkbox tick')
				res.redirect('/profile')
			}
		})
	}
}
