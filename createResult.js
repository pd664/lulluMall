const { users } = require('./User')
const socket = require('./server')

let period_num = 20231010000
// let totalPrice = 0

// const  = (io) => {
    async function createResult(arr, persons) {
        let min = Number.MAX_SAFE_INTEGER;
        let res = {}
        let totalPrice = 0;
        let winNum = 0
        period_num = period_num+1
        
        // calculate minimum price
        for(let i = 0; i < arr.length; i++) {
          if(arr[i][1] < min) {
            min = arr[i][1]
            winNum = i
          }
          totalPrice += arr[i][1]
        }
        if(totalPrice == 0) {
          res['period_num'] = period_num
          res['totalPrice'] = 12000
          res['winNum'] = Math.floor(Math.random()*10);
        }
        else {
          res['period_num'] = period_num
        res['totalPrice'] = totalPrice
        res['winNum'] = winNum
        }
    
        // send result to connected users
        for(let i = 0; i < users.length; i++) {
          socket.ioObject.socket.to(users[i].id).emit('result', res);
        }
    
        // update won amount in database
        for(let i = 0; i < persons[winNum].length; i++) {
          let userDbAmt = 0
          let amt = persons[winNum][i].total_amount
          let userId = persons[winNum][i].userId
          let userDb = await Credentials.find({ userId:userId })
          .then((data) => {
            userDbAmt = data[0].balance
          })
          .catch((err) => console.log("err is"))
          let update = {balance : userDbAmt + (amt * 9)}
          await Credentials.findOneAndUpdate({ userId:userId }, update)
          .then((data) => {
            if (data.length) {
      
            }
          })
        }
    
        // update losing amount in database
        for(let i = 0; i < persons.length; i++) {
          let userDbAmt = 0
          for(let j = 0; j < persons[i].length; i++) {
            if(i == winNum) continue;
            else {
              let amt = persons[i][j].total_amount
              let userId = persons[i][j].userId
              let userDb = await Credentials.find({ userId:userId })
              .then((data) => {
                userDbAmt = data[0].balance
              })
              .catch((err) => console.log("err is"))
              let update = {balance : userDbAmt - amt}
              await Credentials.findOneAndUpdate({ userId:userId }, update)
            }
          }
        }
        arr = [[0,0],[0,0]]
    }
//     rootResult()
//     // return io.to(id).emit('result', res);
// }

module.exports = {
    createResult
}