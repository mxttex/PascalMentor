var express = require('express')
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var cors = require('cors')
const DB = require('./dbMethods')
const app = express()
const router = express.Router()
const tokenManager = require('jsonwebtoken')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
  {
    console.log('Server is running...');
    next();
  }
})

router.route('/registerStudent').post((request, response) => {
  DB.AddNewStudent(request.body).then(
    (data) => {
      try {
        response.json(data[0])
      }
      catch {
        const toReturn = {
          status : 400
        }
        console.log('ritorno: \n', toReturn )
        return toReturn
      }
    }
  )
})

router.route('/registerTeacher').post((request, response) => {
  DB.AddNewTeacher(request.body).then(
    (data) => {
      try {
        response.json(data[0])
      }
      catch {
        const toReturn = {
          status : 400
        }
        console.log('ritorno: \n', toReturn )
        return toReturn
      }
    })
})

const PORT = process.env.PORT || 8089
app.listen(PORT)
console.log('server is listening at port: ', PORT)