let mysql = require('mysql')
const express = require('express')
const app = express()
let db = {}

// //插入操作，注意使用异步返回查询结果
// db.insert = function(connection, sql, paras, callback){
//     connection.query(sql, paras, function (error, results, fields) {
//         if (error) throw error;
//         callback(results.insertId);//返回插入的id
//     });
// }

//关闭数据库
db.close = function (connection) {
  //关闭连接
  connection.end(function (err) {
    if (err) {
      return;
    } else {
      console.log('关闭连接');
    }
  })
}

//获取数据库连接
db.connection = function () {
  //数据库配置
  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'mytest',
    port: 3306
  });
  //数据库连接
  connection.connect(function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      // 'SELECT * FROM user'
      // 'update user set name = ? where id = 1 
      // ['222']
      //  INSERT INTO user set ? 
      // {
      //   id: null,
      //   name: '赵7',
      //   age: 98,
      //   group: 3,
      //   status: 'padding'
      // }
      // delete from user where id = 12
      let selectAll = 'delete from user where id = 6'
      connection.query(selectAll, (err, results) => {
        if (err) {
          console.log('error--', err)
          return
        }
        console.log('results--', results)
        // results.map(items => {
        //   console.log('map--items--', items)
        // })
      })

      // console.log('数据库连接成功')
    }
  });
}

db.connection()


app.listen(3030, () => {
  console.log('正在监听端口3030')
})