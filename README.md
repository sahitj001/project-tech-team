# project-tech-team <img src="public/img/logo.png" width="40" align="left" />
## Lovr - Where Lovebirds Meet
![unknown](https://user-images.githubusercontent.com/45426792/79072920-dd461700-7ce3-11ea-9f11-9d0620b3e80c.png)
A dating app where people can meet each other and maybe become Lovebirds themselves.

lovebirds is a project we made for project Tech within the CMD course.

## Used packages
### express
Lovebirds is made with the express framework.
https://expressjs.com/en/starter/installing.html

### Mongoose
Our database is based on Mongoose from MongoDB with a Json file structure.
https://www.npmjs.com/package/mongoose

```javascript
const UserSchema = new Schema({
	name: String,
	email: String,
	age: Number,
	password: String,
	date: String,
	preferences: String,
	hobby: Array,
	picture: String,
	pickupline: String,
	likes: {
		type: [Schema.Types.ObjectId],
		ref: 'User',
		autopopulate: true
	},
	dislikes: {
		type: [Schema.Types.ObjectId],
		ref: 'User',
		autopopulate: true
	}
})
```

### EJS
The template engine used for Lovebirds is EJS
https://www.npmjs.com/package/ejs

### Security
For security we have used a few packages like: 
* PassportJS http://www.passportjs.org/docs/authenticate/
* Dotenv https://www.npmjs.com/package/dotenv
* Bcrypt https://www.npmjs.com/package/passport
* Ratelimiter https://www.npmjs.com/package/ratelimiter
* Express-Validator https://www.npmjs.com/package/express-validator

## How to install

Sample of .env

```
MONGODB_URI=uri
DB_USER=username
DB_PASS=password
SECRET=secretkey
```

1. Open a terminal

2. Clone this repo
```
git clone https://github.com/sahitj001/project-tech-team
```

3. Install node modules
```
npm install
```

4. Run the application
```
npm start
```
## Contributors
Team - Jordy Sahit, Chun Xiao, Azam Awan and Giovanni Dwidjosewojo

## License
[MIT](https://github.com/sahitj001/project-tech-team/blob/master/LICENSE)
