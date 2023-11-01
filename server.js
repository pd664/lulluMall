const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
// const { io } = require('./socket')
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const cors = require('cors')
var jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const db1 = 'mongodb+srv://pd664:parteek123@cluster0.cfqdyne.mongodb.net/test?retryWrites=true&w=majority'
const Credentials = require('./schema/credentialSchema')
const SaprePreviousResult = require('./schema/sapreSchema')
const ParityPreviousResult = require('./schema/paritySchema')
const EmardPreviousResult = require('./schema/emardSchema')
const BconePreviousResult = require('./schema/bconeSchem')
const utils = require("./utils");
const parityResult = require('./routes/parityPrevResult')
app.use(cors())
app.use(bodyParser.json());

const { addUser, removeUser, users } = require('./User');
const credentialSchema = require("./schema/credentialSchema");
const ResultSchema = require("./schema/sapreSchema");
// const { createResult } = require('./createResult')
// const { tick, second } = require('./timer')

// const io = socketIo(server);
app.set('port', (process.env.PORT || 3001));
var serverws = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
const io = socketIo(serverws);
// const io = socketIo(server, {
//   cors: {
//     origin: "*"
//   }
// });
// const rootSocket = require('./socket')(io)
io.sockets.on("connection", (socket) => {
  console.log("New client connected", socket.handshake.headers.origin);
  // let url_connected = socket.handshake.headers.origin;
  const id = socket.id
  addUser(socket.id)

  socket.on('setSocketId', function (data) {
    var userName = data.name;
    var userId = data.userId;
    console.log("user is", userName, userId)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    removeUser(socket.id)
  });
  socket.emit("hello", "world")
  socket.emit("timer", second)

});
mongoose.connect(db1, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log(`connection successfull`);
})
.catch((err) => console.log(err));

let minute = 1
var seconds = 60 * minute;
let second = seconds;
let period_num = 20231010000
function tick() {
  console.log("tick called")
  let time = setInterval(async () => {
    console.log("second is", seconds)
    seconds--
    if (second === 30) {
      period_num = period_num+1
      await createResult('parity', parityArr, parityPersons, parityColorArr,  parityPersonsArr)
      await createResult('sapre', sapreArr, sparePersons, sapreColorArr, saprePersonsArr)
      await createResult('bcone', bconeArr, bconePersons, bconeColorArr, bconePersonsArr)
      await createResult('emerd', emerdArr, emerdPersons, emerdColorArr, emerdPersonsArr)
      parityArr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      parityColorArr = [0,0,0]
      parityPersonsArr = [[], [], []]
      parityPersons = [[], [], [], [], [], [], [], [], []]
      
      sapreArr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      sapreColorArr = [0,0,0]
      saprePersonsArr = [[], [], []]
      sparePersons = [[], [], [], [], [], [], [], [], []]
      
      bconeArr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      bconeColorArr = [0,0,0]
      bconePersonsArr = [[], [], []]
      bconePersons = [[], [], [], [], [], [], [], [], []]
      
      emerdArr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      emerdColorArr = [0,0,0]
      emerdPersonsArr = [[], [], []]
      emerdPersons = [[], [], [], [], [], [], [], [], []]
    }
    else if (seconds <= 0) {
      seconds = 60 * minute
    }

    second = seconds
  }, 1000)
}

tick()

app.use(parityResult)
app.use(require('./routes/bconePrevResult'))
app.use(require('./routes/saprePrevResult'))
app.use(require('./routes/emerdPrevResult'))
app.get("/verifyToken", function (req, res) {
  var token = req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }

  jwt.verify(token, 'ABCDEF$123', function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    Credentials.find({ userId: user.userId })
      .then((data) => {
        data.forEach((row) => {
          if (user.userId !== row.id) {
            return res.status(401).json({
              error: true,
              message: "Invalid user.",
            });
          }
          var userObj = utils.getCleanUser(row);
          return res.json({ user: userObj, token });
        });
      })
      .catch((error) => {
        return res.status(401).json({
          error: true,
          message: error,
        });
      })
  })
});


app.post("/users/signup", (req, res) => {
  const user = req.body.mobileNumber;
  const pwd = req.body.password;
  const userId = req.body.id;

  console.log("/signup", user, pwd)
  if (!user || !pwd || !userId) {
    return res.status(400).json({
      error: true,
      message: "Please enter all details",
    });
  }

  const signup = new Credentials({
    mobile: user,
    password: pwd,
    userId: userId,
    balance: 0
  });
  Credentials.find({ mobile: user })
    .then((result) => {
      if (result.length < 1) {
        signup.save();
        return res.status(200).json({
          error: false,
          message: "Account created successfully",
        });
      }
      else if (result.length >= 1) {
        console.log("Username already taken")
        return res.status(400).json({
          error: true,
          message: "Username already taken",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: true,
        message: err,
      });
    })
});

app.post("/users/signin", function (req, res) {
  console.log("user", req.body.mobileNumber)
  const mobile = req.body.mobileNumber;
  const pwd = req.body.password;

  if (!mobile || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password is required.",
    });
  }

  Credentials.find({ mobile: mobile })
    .then((data) => {
      // console.log("data", data)
      if (data.length > 0) {
        data.map((row) => {
          if (mobile == row.mobile) {
            let a = bcrypt.compareSync(pwd, row.password);
            if (a == true) {
              console.log("row is", row)
              const token = utils.generateToken(row);

              const userObj = utils.getCleanUser(row);
              return res.status(200).json({ user: userObj, token });
            }
          } else {
            console.log("wrong")
            return res.status(401).json({
              error: true,
              message: "Username or Password is Wrong.",
            });
          }
        });
      } else {
        console.log("No mobile found")
        return res.status(401).json({
          error: true,
          message: "No mobile found.",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        error: true,
        message: err,
      });
    })

})

let parityArr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
let parityColorArr = [0,0,0]
let parityPersonsArr = [[], [], []]
let parityPersons = [[], [], [], [], [], [], [], [], []]

let sapreArr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
let sapreColorArr = [0,0,0]
let saprePersonsArr = [[], [], []]
let sparePersons = [[], [], [], [], [], [], [], [], []]

let bconeArr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
let bconeColorArr = [0,0,0]
let bconePersonsArr = [[], [], []]
let bconePersons = [[], [], [], [], [], [], [], [], []]

let emerdArr = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
let emerdColorArr = [0,0,0]
let emerdPersonsArr = [[], [], []]
let emerdPersons = [[], [], [], [], [], [], [], [], []]

app.post('/bet', (req, res) => {
  let num = req.body.number;
  let user = req.body.user;
  let totalAmt = req.body.totalAmt;
  let gameName = req.body.gameName;
console.log("gamename",  gameName)
  switch (gameName) {
    case 'parity': {
      parityArr[num][1] = parityArr[num][1] + totalAmt
      parityPersons[num].push(user)
      return
    }

    case 'spare': {
      sapreArr[num][1] = sapreArr[num][1] + totalAmt
      sparePersons[num].push(user)
      return
    }

    case 'bcone': {
      bconeArr[num][1] = bconeArr[num][1] + totalAmt
      bconePersons[num].push(user)
      return
    }

    case 'emerd': {
      emerdArr[num][1] = emerdArr[num][1] + totalAmt
      emerdPersons[num].push(user)
      return
    }

    default: return ''
  }
});


app.post('/colorBet', (req, res) => {
  let color = req.body.color;
  let user = req.body.user;
  let totalAmt = req.body.totalAmt;
  let gameName = req.body.gameName;
console.log("gamename",  gameName, color, user)
  switch (gameName) {
    case 'parity': {
      if(color == 'green') {
        parityColorArr[0] = parityColorArr[0] + totalAmt
        parityPersonsArr[0].push(user)
      }
      else if(color == 'violet') {
        parityColorArr[1] = parityColorArr[1] + totalAmt
        parityPersonsArr[1].push(user)
      }
      else if(color == 'red') {
        parityColorArr[2] = parityColorArr[2] + totalAmt
        parityPersonsArr[2].push(user)
      }
      return
    }

    case 'sapre': {
      if(color == 'green') {
        sapreColorArr[0] = sapreColorArr[0] + totalAmt
        saprePersonsArr[0].push(user)
      }
      else if(color == 'violet') {
        sapreColorArr[1] = sapreColorArr[1] + totalAmt
        saprePersonsArr[1].push(user)
      }
      else if(color == 'red') {
        sapreColorArr[2] = sapreColorArr[2] + totalAmt
        saprePersonsArr[2].push(user)
      }
      return
    }

    case 'bcone': {
      if(color == 'rgreen') {
        bconeColorArr[0] = bconeColorArr[0] + totalAmt
        bconePersonsArr[0].push(user)
      }
      else if(color == 'violet') {
        bconeColorArr[1] = bconeColorArr[1] + totalAmt
        bconePersonsArr[1].push(user)
      }
      else if(color == 'red') {
        bconeColorArr[2] = bconeColorArr[2] + totalAmt
        bconePersonsArr[2].push(user)
      }
      return
    }

    case 'emerd': {
      if(color == 'green') {
        emerdColorArr[0] = emerdColorArr[0] + totalAmt
        emerdPersonsArr[0].push(user)
      }
      else if(color == 'violet') {
        emerdColorArr[1] = emerdColorArr[1] + totalAmt
        emerdPersonsArr[1].push(user)
      }
      else if(color == 'red') {
        emerdColorArr[2] = emerdColorArr[2] + totalAmt
        emerdPersonsArr[2].push(user)
      }
      return
    }

    default: return ''
  }
});

async function createResult(gameName, arr, persons, colorArr, colorPerson) {
  console.log("result created")
  let min = Number.MAX_SAFE_INTEGER;
  let res = {}
  let totalPrice = 0;
  let winNum = 0
  let num = 0
  let winColor = 0
  // calculate minimum price
  for(let i = 0; i < arr.length; i++) {
    if(i == 0) {
      num = (arr[i][1] * 9) + (colorArr[2] * 1.5) + (colorArr[1] * 4.5)
    }
    else if(i == 5) {
      num = (arr[i][1] * 9) + (colorArr[1] * 4.5) + (colorArr[0] * 1.5)
    }
    else if(i == 1 || i == 3 || i==7 || i == 9) {
      num = (arr[i][1]*9) + (colorArr[0] * 2)
    }
    else {
      num = (arr[i][1] * 9) + (colorArr[2] * 2)
    }
    if(num < min) {
      console.log("min is ", min)
      min = num 
      winNum = i
    }
    totalPrice += arr[i][1]
  } 

  // set winColor
  if(winNum == 1 || winNum == 3 || winNum == 7 || winNum == 9) winColor = 0
  else if(winNum == 2 || winNum == 4 || winNum == 6 || winNum == 9) winColor = 2
  else winColor = 1


  if(totalPrice == 0) {
    res['period_num'] = period_num
    res['totalPrice'] = 12000
    res['winNum'] = Math.floor(Math.random()*10);
  }

  else {
    res['period_num'] = period_num
    res['totalPrice'] = totalPrice
    res['winNum'] = winNum
    
  // update winners of number amount in database
  for(let i = 0; i < persons[winNum].length; i++) {
    let userDbAmt = 0
    console.log(persons[winNum][i])
    let amt = persons[winNum][i].total_amount
    let userId = persons[winNum][i].userId
    let userDb = await Credentials.find({ userId:userId })
    .then((data) => {
      userDbAmt = data[0].balance
      console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
    })
    .catch((err) => console.log("err is"))
    let update = {balance : userDbAmt + (amt * 9)}
    // await Credentials.findOneAndUpdate({ userId:userId }, update)
    // .then((data) => {
    //   if (data.length) {

    //   }
    // })
  }

  // update winners of colors in database

  if(winNum == 5) {
    for(let i = 0; i < colorPerson[0].length; i++) {
      let userDbAmt = 0
      console.log("colorperson is", colorPerson[0][i])
      let amt = colorPerson[0][i].total_amount
      let userId = colorPerson[0][i].userId
      let userDb = await Credentials.find({ userId:userId })
      .then((data) => {
        userDbAmt = data[0].balance
        console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
      })
      .catch((err) => console.log("err is", err))
      let update = {balance : userDbAmt + (amt * 1.5)}
      await Credentials.findOneAndUpdate({ userId:userId }, update)
    }
    for(let i = 0; i < colorPerson[1].length; i++) {
      let userDbAmt = 0
      console.log("colorperson is", colorPerson[1][i])
      let amt = colorPerson[1][i].total_amount
      let userId = colorPerson[1][i].userId
      let userDb = await Credentials.find({ userId:userId })
      .then((data) => {
        userDbAmt = data[0].balance
        console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
      })
      .catch((err) => console.log("err is", err))
      let update = {balance : userDbAmt + (amt * 4.5)}
      await Credentials.findOneAndUpdate({ userId:userId }, update)
    }
  }
  else if(winNum == 0) {
    for(let i = 0; i < colorPerson[2].length; i++) {
      let userDbAmt = 0
      console.log("colorperson is", colorPerson[2][i])
      let amt = colorPerson[2][i].total_amount
      let userId = colorPerson[2][i].userId
      let userDb = await Credentials.find({ userId:userId })
      .then((data) => {
        userDbAmt = data[0].balance
        console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
      })
      .catch((err) => console.log("err is", err))
      let update = {balance : userDbAmt + (amt * 1.5)}
      await Credentials.findOneAndUpdate({ userId:userId }, update)
    }
    for(let i = 0; i < colorPerson[1].length; i++) {
      let userDbAmt = 0
      console.log("colorperson is", colorPerson[1][i])
      let amt = colorPerson[1][i].total_amount
      let userId = colorPerson[1][i].userId
      let userDb = await Credentials.find({ userId:userId })
      .then((data) => {
        userDbAmt = data[1].balance
        console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
      })
      .catch((err) => console.log("err is", err))
      let update = {balance : userDbAmt + (amt * 4.5)}
      await Credentials.findOneAndUpdate({ userId:userId }, update)
    }
  }
  else if(winNum == 1 || winNum == 3 || winNum == 7 || winNum == 9) {
    for(let i = 0; i < colorPerson[0].length; i++) {
      let userDbAmt = 0
      console.log("colorperson is", colorPerson[0][i])
      let amt = colorPerson[0][i].total_amount
      let userId = colorPerson[0][i].userId
      let userDb = await Credentials.find({ userId:userId })
      .then((data) => {
        userDbAmt = data[0].balance
        console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
      })
      .catch((err) => console.log("err is", err))
      let update = {balance : userDbAmt + (amt * 2)}
      await Credentials.findOneAndUpdate({ userId:userId }, update)
    }
  }
  else if(winNum == 2 || winNum == 4 || winNum == 6 || winNum == 8) {
    for(let i = 0; i < colorPerson[2].length; i++) {
      let userDbAmt = 0
      console.log("colorperson is", colorPerson[2][i])
      let amt = colorPerson[2][i].total_amount
      let userId = colorPerson[2][i].userId
      let userDb = await Credentials.find({ userId:userId })
      .then((data) => {
        userDbAmt = data[0].balance
        console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
      })
      .catch((err) => console.log("err is", err))
      let update = {balance : userDbAmt + (amt * 2)}
      await Credentials.findOneAndUpdate({ userId:userId }, update)
    }
  }

  // update losser of number amount in database
  for(let i = 0; i < persons.length; i++) {
    let userDbAmt = 0
    for(let j = 0; j < persons[i].length; j++) {
      if(i == winNum) continue;
      else {
        let amt = persons[i][j].total_amount
        let userId = persons[i][j].userId
        let userDb = await Credentials.find({ userId:userId })
        .then((data) => {
          userDbAmt = data[0].balance
          console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
        })
        .catch((err) => console.log("err is"))
        let update = {balance : userDbAmt - amt}
        await Credentials.findOneAndUpdate({ userId:userId }, update)
      }
    }
  }
  
  //  // update losser of color amount in database
  for(let i = 0; i < colorPerson.length; i++) {
    let userDbAmt = 0
    if(i == winColor) continue;
    else {
      for(let j = 0; j < colorPerson[i].length; j++) {
        let amt = colorPerson[i][j].total_amount
        let userId = colorPerson[i][j].userId
        let userDb = await Credentials.find({ userId:userId })
        .then((data) => {
          userDbAmt = data[0].balance
          console.log("user dbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",  data[0].balance)
        })
        .catch((err) => console.log("err is"))
        let update = {balance : userDbAmt - amt}
        await Credentials.findOneAndUpdate({ userId:userId }, update)
      
    }
    }
  }
  }
  switch(gameName) {
    // console.log("gameName", gameName)
    case ('parity') : {
      const latestResult = new ParityPreviousResult(res)
      await latestResult.save();
      break;
      // return
    }
    case ('emerd') : {
      const latestResult = new EmardPreviousResult(res)
      await latestResult.save();
      break;
      // return
    }

    case ('bcone') : {
      const latestResult = new BconePreviousResult(res)
      await latestResult.save();
      break;
      // return
    }
    case ('sapre'): {
      const latestResult = new SaprePreviousResult(res)
      await latestResult.save();
      break;
      // return
    }
  }
  console.log("res is", res)
// console.log("all users are", users)
  // send result to all connected users
  users.forEach((user) => {
      console.log("user is connected emitted result",`${gameName}_result`, user)
      io.sockets.to(user.id).emit(`${gameName}_result`, res);
  })
}

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('lullu/build'))
}

// server.listen(port, () => console.log(`Listening on port ${port}`));
