var data = JSON.parse(localStorage.getItem('listdata')) || []
var btn = document.querySelector('.btn');
var list = document.querySelector('.list')
var clear = document.querySelector('.clear')
var reset = document.querySelector('#reset')
var showResult = document.querySelector('#show-result');
// dom 指定

btn.addEventListener('click',addData);
reset.addEventListener('click',resetBtn);
clear.addEventListener('click',clearAll);
update(data);

// 監聽事件

function addData(e){
    e.preventDefault();
    var weight = parseInt(document.querySelector('#weight').value);
    var height = parseInt(document.querySelector('#height').value);
    var calc =  (weight/(height*height))*10000
    var BMI = calc.toFixed(0);
    var fitness;
    var style;
    var today = new Date();
    if(document.querySelector('#height').value == ''|| document.querySelector('#weight').value == '')
        {return} // input無內容不回應
    function result(){
        if(BMI < 18.5){
             fitness = '過輕';
             style = 'style-1'
             btn.setAttribute('class','btn-style1');
             showResult.setAttribute('class','color1');
             reset.setAttribute('class','btn-reset1');
             
        }else if (BMI < 25){
            fitness = '標準';
            style = 'style-2'
            btn.setAttribute('class','btn-style2');
            showResult.setAttribute('class','color2');
            reset.setAttribute('class','btn-reset2');
        }else {
            fitness = '過重';
            style = 'style-3'
            btn.setAttribute('class','btn-style3');
            showResult.setAttribute('class','color3');
            reset.setAttribute('class','btn-reset3');
        }
    }; // 判斷身材
    result();
    var txt = {
        height: height,
        weight: weight,
        BMI: BMI,
        result: fitness,
        date: (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear(),
        style: style,
    }
    btn.textContent ='BMI '+BMI;
    showResult.textContent = fitness;
    data.push(txt);
    update(data);
    localStorage.setItem('listdata', JSON.stringify(data))
}
// 資料更新
function resetBtn(){
    btn.textContent = '看結果';
    btn.setAttribute('class','btn');
    reset.setAttribute('class','btn-a');
    showResult.textContent = '';
}
// 重置按鍵樣式

function update(e){
    var len = e.length;
    var str = '';
    for(var i = 0 ;i < len ;i++){
        str += '<li class="'+e[i].style+'"><span>'+e[i].result+'</span><span>BMI  '+e[i].BMI+'</span><span>weight  '+e[i].weight+'kg</span><span>height  '+e[i].height+'cm</span><span class="font-size-s">'+e[i].date+'</span></li>';
    }
   list.innerHTML = str;
}
// 介面

function clearAll(e){
    e.preventDefault();
    data = [];
    localStorage.setItem('listdata',JSON.stringify(data));
    update(data);
}
// 清除記錄
