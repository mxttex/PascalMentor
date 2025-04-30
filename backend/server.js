var express = require("express");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const DB = require("./dbMethods");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", router);

const secret = "DavidVeneti";

router.use((request, response, next) => {
  {
    console.log("Server is running...");
    next();
  }
});

router.route("/register").post((req, res) => {
  DB.AddNewUser(req.body).then((data) => {
    try {
      res.json(data[0]);
    } catch {
      res.status(400).send();
    }
  });
})

router.route("/log").post((req, res) => {
  DB.TryToLog(req.body).then((rit) => {
    try {
      const user = rit[0];
      const payload = { user };
      const options = { expiresIn: "168h" }; // scade dopo una settimana
      const token = jwt.sign(payload, secret, options);
      
      res.cookie("token", token, { httpOnly: true });
      console.log(user)
      const ret = {
        type: user.Tipo,
        userId: user.ID
      }
      res.status(200).json(ret)
    } catch (error) {
      console.log(error);
      res.status(400).send(`Credenziali Errate ${error}`);
    }
  });
});



router.route("/seePersonalData").get(async (req, res) => {
  const result = await verifyToken(req.cookies.token)
  if(result.success){
    res.status(200).send(result.user)
  }
  else
    res.status(401).send("Token Non Valido");
});

router.route("/").get(async (req, res) => {
  const result = await verifyToken(req.cookies.token)
  if(result.success){
    const ret = {
      type: result.user.user.Tipo,
      userId: result.user.user.ID
    }
    res.status(200).json(ret)
  }
  else
    res.status(401).send("Token Non Valido");
})

router.route("/createEvent").post(async (req, res) => {
  DB.CreateEvent(req.body).then((data) => {
    try {
      res.json(data[0]);
    } catch {
      res.status(400).send();
    }
  });
});

router.route("/logout").get((req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.route("/seeAllRipetition").get((req, res) => {
  DB.FetchAllRipetitions().then((data) => {
    try{
      res.status(200).send(data[0])
    }
    catch{
      res.status(404).send('Nessuna Ripetizione Trovata')
    }
  })
})

router.route("/getSubjects").get((req, res) => {
  DB.fetchSubjects().then((data) => {
    try{
      res.status(200).send(data[0])
    }
    catch{
      res.status(404).send('Nessuna Materia Trovata')
    }
  })
})

router.route("/bookSpecificRipetition").post((
  (req, res) => 
    DB.BookRipetition(req.body).then(
      (data) => {
        try {
          res.status(200).send()
        } catch (error) {
          res.status(500).send(error)
        }
      }
    )
))
//funzione per vedere se una persona puo' accedere ad una determinata risorsa
async function verifyToken(token) {
  return new Promise((resolve) => {
    if (!token) {
      return resolve({ success: false, user: null });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return resolve({ success: false, user: null });
      }

      resolve({ success: true, user: decoded });
    });
  });
}


const PORT = process.env.PORT || 8089;
app.listen(PORT);
console.log("server is listening at port: ", PORT);
