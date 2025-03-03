var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    {
      console.log('Server is running...');
      next();
    }
  })

