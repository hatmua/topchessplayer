let fs =require('fs');
let TGvaHD=fs.readFileSync('../tao qhtt/fileProcess/3.txt','utf-8').split('\n');


const readline = require('readline');
const rl = readline.createInterface({
    input: fs.createReadStream('./result/cplex.txt'),
    output: process.stdout,
    terminal: false
});
let t=0;
fs.writeFileSync('./ketluan.txt',"")
rl.on('line',(line)=>{
  if(t>0){
    let numberlan= line.split('=')[1];
    if(numberlan>0){
      let varbien=line.split('=')[0].split('_');
      fs.appendFileSync('./ketluan.txt','tai thoi diem thu '+TGvaHD[varbien[1]].split(' ')[1]+', thuc hien hanh dong '+varbien[2]+' '+numberlan+' lan\n');
    }
  }
  t++;
})
