let fs=require('fs')
let a=fs.readFileSync('./data/phuongtrinh.txt','utf-8');
let arrEquation=a.split(',');
let arrTime=[];
let fileOutput='./fileProcess/1.txt';
for (var i = 0; i <arrEquation.length; i++) {
  arrTime.push(arrEquation[i].split('->')[0].split('+')[arrEquation[i].split('->')[0].split('+').length-1].split('_')[0]);
}
arrTime=arrTime.sort(function(a,b) {
  return a-b;
})
let filePath=fileOutput;
fs.writeFileSync(filePath,arrTime)
