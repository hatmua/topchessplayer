//config
let fs=require('fs')

let inputFilePath1='./fileProcess/2.txt';//file thời gian cần sắp xếp
let outputFilePath1='./fileProcess/3.txt';// file thời gian ghi kết quả đã sắp xếp

let Time = fs.readFileSync('./fileProcess/1.txt','utf-8').split(',');//lay tu file 1arrTime
for (var i = 0; i < Time.length; i++) {
  Time[i]=Time[i].replace(/(\r\n|\n|\r)/gm, "")
}
let inputFilePath2='./fileProcess/3.txt';
let outputFilePath2='./fileProcess/4.txt';

let a=fs.readFileSync('./data/phuongtrinh.txt','utf-8');
let arr3=a.split(',');
for (var i = 0; i < arr3.length; i++) {
  arr3[i]=arr3[i].replace(/(\r\n|\n|\r)/gm, "")
}
let inputFilePath3='./fileProcess/4.txt';
let outputFilePath3='./fileProcess/5.txt';
let sodong=parseInt(fs.readFileSync('./data/sodong.txt','utf-8'));

let inputFilePath4='./fileProcess/5.txt';
let outputFilePath4='./fileProcess/6.lp';
let n=sodong+1;//so dong cua file tren
let m=arr3.length;//so phuong trinh
let s4='';
let arrPTQT=JSON.parse(fs.readFileSync('./data/phuongtrinhquantrong.txt','utf-8').split(','));
for (var i4 = 0; i4 < n; i4++) {
  for (const p in arrPTQT) {
    s4=s4+' + '+arrPTQT[p]+' x_'+i4+'_'+p;
  }
}
let _S=JSON.parse(fs.readFileSync('./data/gioihan.txt'));


function func1() {
  console.log('1 bat dau sap xep thoi gian');
  return new Promise((resolve,reject)=>{
    const readline1 = require('readline');
    const rl1 = readline1.createInterface({
        input: fs.createReadStream(inputFilePath1),
        output: process.stdout,
        terminal: false
    });
    let arr1=[];
    rl1.on('line',(line1)=>{
      arr1.push(parseInt(line1))
    })
    rl1.on('close',()=>{
      arr1.sort(function(a, b){return a-b});
      console.log(arr1);
      console.log('dang sap');
      fs.writeFileSync(outputFilePath1,'');
      if(arr1.length<sodong+1){
        for (var i = 0; i < arr1.length; i++) {
          fs.appendFileSync(outputFilePath1,i+' '+arr1[i]+'\n');
        }
      }else{
        for (var i = 0; i < sodong+1; i++) {
          fs.appendFileSync(outputFilePath1,i+' '+arr1[i]+'\n');
        }
      }
      resolve();
    })
  })
}

function func2(){
  console.log('2 bat dau tao thoi gian va hanh dong goc');
  return new Promise((resolve,reject)=>{
    fs.readFile(inputFilePath2, "utf8",(err,kq)=>{
      let a=kq.split('\n');
      fs.writeFileSync(outputFilePath2,'')
      for (var i = 0; i < a.length; i++) {
        let s=' ';
        for (var k = 0; k <Time.length; k++) {
          for (var j = i; j>=0; j--) {
            if((parseInt(a[i].split(' ')[1])-Time[k])==parseInt(a[j].split(' ')[1])){
              s=s+j+','+k+' ';
              break;
            }
          }
        }
        fs.appendFileSync(outputFilePath2,a[i]+' '+s+'\n');
      }
      resolve();
    })
  })
}

function func3() {
  console.log('3 tao ra json hanh dong');
  return new Promise((resolve,reject)=>{
    let input3=[];
    let output3=[];
    for (var i = 0; i < arr3.length; i++) {
      input3.push(arr3[i].split('->')[0]);
      output3.push(arr3[i].split('->')[1]);
    }
    for (var i = 0; i < output3.length; i++) {
      output3[i]=output3[i].replace(/_/g,' ')
    }
    let equation=[];//[{object:,formular:}]


    function check(array,name) {
      for (var i = 0; i < array.length; i++) {
        if(array[i].object==name){
          return i;
        }
      }
      return -1;
    }
    for (var i = 0; i < input3.length; i++) {
      let s=input3[i].split('+'); //s=[3_X,2_Y,3_N...]
      for (var j = 0; j < s.length; j++) {
        let flag=check(equation,s[j].split('_')[1])
        if(flag!=-1){
          equation[flag].formular=equation[flag].formular+' '+s[j].split('_')[0]+'_'+i;
        }else{
          equation.push({object:s[j].split('_')[1],formular:''+s[j].split('_')[0]+'_'+i})
        }
      }
    }
    for (var i = 0; i < equation.length; i++) {
      if(equation[i].object=='T'){equation.splice(i,1); break;}
    }
    let fs=require('fs')
    const readline = require('readline');
    const rl = readline.createInterface({
        input: fs.createReadStream(inputFilePath3),
        output: process.stdout,
        terminal: false
    });
    let t=0;
    let ThemNguyenLieu={};
    for (var j = 0; j < equation.length; j++) {
      ThemNguyenLieu[equation[j].object]='';
    }
    fs.writeFileSync(outputFilePath3,'')
    let system={};
    rl.on('line',(line)=>{
      console.log(t);
      if(t>sodong){
        rl.close();
        rl.removeAllListeners();
      }else{
        if(t>0) for (const p in system) {
            system[p]=system[p].split('<=')[0].trim()
          }
        let vitaminArr=line.trim().split(' ');
        for (var j = 0; j < equation.length; j++) {
          let formularArr=equation[j].formular.split(' ');
          if(t>0){
            for (var k = 0; k < formularArr.length; k++) {
              system[equation[j].object]=system[equation[j].object]+' '+formularArr[k].split('_')[0]+' x_'+t+'_'+formularArr[k].split('_')[1];
            }
          }else{
            system[equation[j].object]='';
            for (var k = 0; k < formularArr.length; k++) {
              system[equation[j].object]=system[equation[j].object]+' '+formularArr[k].split('_')[0]+' x_'+t+'_'+formularArr[k].split('_')[1];
            }
          }
          system[equation[j].object]=system[equation[j].object].trim();
        }
        for (var j = 2; j < vitaminArr.length; j++) {
          addInput(ThemNguyenLieu,vitaminArr[j]);
        }
        for (const p in system) {
          system[p]=system[p]+' '+ThemNguyenLieu[p]+'<= S_'+p;
        }
        for (const p in system) {
          system[p]=rutgon(system[p].split('<=')[0].trim())+'<='+system[p].split('<=')[1];
        }
        fs.appendFileSync(outputFilePath3,JSON.stringify(system)+'\n');
      }
      t++;
    })

    rl.on('close',()=>{
      resolve();
    })

    function addInput(ThemNguyenLieu,Vitamin){//vitamin 17,3
      if (Vitamin=="") return;
        let line=Vitamin.split(',')[0];
        let s=Vitamin.split(',')[1];
        let outputArr=output3[s].split('+');
        for (var o = 0; o < outputArr.length; o++) {
         if(ThemNguyenLieu[outputArr[o].split(' ')[1]]!=undefined) ThemNguyenLieu[outputArr[o].split(' ')[1]]=ThemNguyenLieu[outputArr[o].split(' ')[1]]+'-'+outputArr[o].split(' ')[0]+' x_'+line+'_'+s+' ';
        }
    }

    //rutgon

    function rutgon(s) {
      if(s=='') return '';
      let s_a=s.split(' ');
      for (var i = 1; i < s_a.length; i=i+2) {
        for (var j = i+2; j < s_a.length; j=j+2) {
          if(s_a[j]==s_a[i]){
            s_a[i-1]=parseInt(s_a[i-1])+parseInt(s_a[j-1]);
            s_a.splice(j-1,2);
            j=j-2;
          };
        }
      }
      let kq="";
      for (var i = 0; i < s_a.length; i=i+2) {
        kq=kq+s_a[i]+' '+s_a[i+1]+' ';
      }
      return kq;
    }

  })
}

function func4() {
  console.log('4 tao ra he phuong trinh may tinh co the hieu');
  return new Promise((resolve,reject)=>{
    let fs=require('fs')
    const readline = require('readline');
    fs.writeFileSync(outputFilePath4,'');
    fs.appendFileSync(outputFilePath4,'Maximize'+'\n'+' obj:');
    fs.appendFileSync(outputFilePath4,s4+'\n');
    fs.appendFileSync(outputFilePath4,'Subject To'+'\n');
    const rl = readline.createInterface({
        input: fs.createReadStream(inputFilePath4),
        output: process.stdout,
        terminal: false
    });

    let count=0;
    rl.on('line',(line)=>{
      let a=JSON.parse(line);
      for (const p in a) {
        a[p]=a[p].replace('S_'+p,_S[p])
        fs.appendFileSync(outputFilePath4,' T'+count+p+': '+ThemDauCong(a[p]))
        fs.appendFileSync(outputFilePath4,'\n');
      }
      count++;
    })
    rl.on('close',()=>{
      fs.appendFileSync(outputFilePath4,'General');
      fs.appendFileSync(outputFilePath4,'\n');
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
          fs.appendFileSync(outputFilePath4,' x_'+i+'_'+j);
        }
      }
      fs.appendFileSync(outputFilePath4,'\nEnd');
      resolve();
    })


    function ThemDauCong(stringa) {
      let s=stringa;//3 x_17_0 3 x_16_0 -1 x_0_1 -1 x_1_1 -1 x_2_1 -1 x_3_1 -1 x_4_1 -1 x_5_1 -1 x_6_1 -1 x_0_6 -1 x_7_1 <= S_X
      let arrs=s.split(' <=')[0].split(' ');
      if(arrs[0][0]=='-'){
        arrs[0]='- '+arrs[0].split('-')[1];
      }
      for (var i = 2; i < arrs.length; i=i+2) {
        if(arrs[i][0]=='-'){
          arrs[i]='- '+arrs[i].split('-')[1];
        }else{
          arrs[i]='+ '+arrs[i];
        }
      }
      let kqs='';
      for (var i = 0; i < arrs.length; i++) {
        kqs+=arrs[i]+' ';
      }
      return kqs+'<='+s.split(' <=')[1];
    }
  })
}



func1().then(()=>{
  func2().then(()=>{
    func3().then(()=>{
      func4().then(()=>{
        console.log('ket qua file:'+outputFilePath4);
      })
    })
  })
})
