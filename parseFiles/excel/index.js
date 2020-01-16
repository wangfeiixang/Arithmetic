var xlsx = require("node-xlsx");
var fs = require('fs');
var name = '04'
var list = xlsx.parse(name + ".xlsx");
praseExcel(list);
//解析Excel
function praseExcel(list) {
  console.log("qqq");
  for (var i = 0; i < list.length; i++) {
    var excleData = list[i].data;
    var sheetArray = [];
    var typeArray = excleData[1];
    var keyArray = excleData[2];
    for (var j = 3; j < excleData.length; j++) {
      var curData = excleData[j];
      if (curData.length == 0) continue;
      var item = changeObj(curData, typeArray, keyArray);
      sheetArray.push(item);
    }
    if (sheetArray.length > 0)
      writeFile(name + ".json", JSON.stringify(sheetArray));
  }
  console.log("qqq");
}
//转换数据类型
function changeObj(curData, typeArray, keyArray) {
  var obj = {};
  for (var i = 0; i < curData.length; i++) {
    //字母 
    obj[keyArray[i]] = changeValue(curData[i], typeArray[i]);
  }
  return obj;
}

function changeValue(value, type) {
  if (value == null || value == "null") return ""
  if (type == "int") return Math.floor(value);
  if (type == "Number") return value;
  if (type == "String") return value;
}
//写文件
function writeFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf-8', complete);

  function complete(err) {
    if (!err) {
      console.log("文件生成成功");
    }
  }
}