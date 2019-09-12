// const process = require('process')

const fs = require('fs')

// const ColorLog = () => {}
// ColorLog.blue = (msg) => {
//   console.log('\033[34;1m  ' + msg + '  \033[0m');
// }

// process.on('beforeExit', (code) => {
//   ColorLog.blue('进程 beforeExit 事件的代码: ' + code + '  pid:' + process.ppid + '  cwd:' + process.cwd())
//   ColorLog.blue('platform--' + process.platform + '  uptime:' + process.uptime())
// })

// fs.writeFile("01.txt", "我是要写入的11.txt文件的内容", {
//   flag: "a"
// }, function (err, data) {
//   if (err) {
//     return console.log(err);
//   } else {
//     console.log("写入成功", data);
//   }
// })

// fs.readFile('./01.txt', (err, data) => {
//   if (err) {
//     throw err
//   } else {
//     console.log('readFile--', data.toString())
//   }
// })

// fs.mkdir('./02', (err) => {
//   if (err) {
//     throw err
//   } else {
//     console.log('02创建成功')
//     fs.writeFile('./02/02.txt', 'hhhhhh', (err) => {
//       if (err) {
//         throw err
//       }

//       console.log('02.txt创建成功')
//     })
//   }
// })

// fs.rename('01.txt', '01_new.txt', (err) => {
//   if (err) {
//     throw err
//   }

//   console.log('01.txt重命名为01_new.txt')
// })

// fs.stat('./01_new.txt', (err, stats) => {
//   if (err) {
//     throw err
//   }
//   console.log('stats--', stats.isDirectory(), 'file--', stats.isFile())
// })


setImmediate(() => {
  console.log('setImmediate--')
})

setTimeout(() => {
  console.log('setTimeout--')
})

fs.readFile('./01_new.txt', (err, data) => {
  if (err) {
    throw err
  }


  setTimeout(() => {
    console.log('readFile--setTimeout--', data)
  })

  setImmediate(() => {
    console.log('readFile--setImmediate--', data)
  })
})