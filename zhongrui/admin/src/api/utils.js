const config = require('../../config')

var server_url = config.dev.proxyTable[Object.keys(config.dev.proxyTable)[0]].target


export function timestampToTime (unixtimestamp){
  var unixtimestamp = new Date(unixtimestamp*1000);
  var year = 1900 + unixtimestamp.getYear();
  var month = "0" + (unixtimestamp.getMonth() + 1);
  var date = "0" + unixtimestamp.getDate();
  var hour = "0" + unixtimestamp.getHours();
  var minute = "0" + unixtimestamp.getMinutes();
  var second = "0" + unixtimestamp.getSeconds();
  return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
      + " " + hour.substring(hour.length-2, hour.length) + ":"
      + minute.substring(minute.length-2, minute.length) + ":"
      + second.substring(second.length-2, second.length);
}

export function imgjoin(img){
  return server_url+img
}

function PrefixInteger(num, length) {  
 return (Array(length).join('0') + num).slice(-length);
}

export function timeformart(t){
  var d = new Date(t);
  return PrefixInteger(d.getHours(),2) + ':' + PrefixInteger(d.getMinutes(),2) + ':' + PrefixInteger(d.getSeconds(),2); 
}

export function dateformart(t){
  var d = new Date(t);
  return PrefixInteger(d.getFullYear(),4) + '-' + PrefixInteger(d.getMonth()+1,2) + '-' + PrefixInteger(d.getDate(),2); 
}

