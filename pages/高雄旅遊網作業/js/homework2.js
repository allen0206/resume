var xhr = new XMLHttpRequest
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',false)
xhr.send();
var data = JSON.parse(xhr.responseText).result.records
var datalen = data.length
var btn = document.querySelector('.menu');
var select = document.querySelector('#select')
// dom 資料



select.addEventListener('change',changeList,false)
btn.addEventListener('click',showlist,false)
getZone(data);
init(data)
//監聽 事件

function changeList(e){
    let str = '';
    let titlestr = '';
    let list = document.querySelector('.list')
    let title = document.querySelector('.h2')
    let option = e.target.value
    for(let i=0 ;i < datalen;i++){
      if (option == data[i].Zone){
          str += `<li><img src="${data[i].Picture1}"><h2>${data[i].Name}</h2><h3>${data[i].Zone}</h3><p><img src="img/icons_clock.png" alt="">${data[i].Opentime}</p><p><img src="img/icons_pin.png" alt="">${data[i].Add}</p><p><img src="img/icons_phone.png" alt="">${data[i].Tel}</p><span><img src="img/icons_tag.png">${data[i].Ticketinfo}</span></li>`
          titlestr = data[i].Zone
      }
    }
    list.innerHTML = str;
    title.textContent = titlestr;
}
// 呈現list

function showlist(item){
    console.log(item.target.nodeName)
    if(item.target.nodeName !== 'BUTTON'){return}
    changeList(item);
}
// 點擊呈現list

function getZone(e){
    let str= '';
    //抓出所有區域
    match = e.map(item=>Object.values(item)[1]);
    console.log(match)
    //利用filter去除重複項目
    matchlist = match.filter(function (el,i,arr){
        console.log(el,i,arr);
        return arr.indexOf(el)===i;
    });
    console.log(matchlist)
    //Html 
    for(let i=0;i<matchlist.length;i++){
        str=str+`
        <option value="${matchlist[i]}">${matchlist[i]}</option>
        `
    }
    //渲染頁面
    select.innerHTML=str;
}
function init(e){
    let string = '' 
    let list = document.querySelector('.list')
    match = e.map(item=>Object.values(item)[1])
    console.log(match[0])
    for(let i= 0;i<matchlist.length;i++){
        if(match[i] == '三民區'){
            string += `<li><img src="${e[i].Picture1}"><h2>${e[i].Name}</h2><h3>${e[i].Zone}</h3><p><img src="img/icons_clock.png" alt="">${e[i].Opentime}</p><p><img src="img/icons_pin.png" alt="">${e[i].Add}</p><p><img src="img/icons_phone.png" alt="">${e[i].Tel}</p><span><img src="img/icons_tag.png">${e[i].Ticketinfo}</span></li>`
         }
      }
    list.innerHTML = string;
}
// 初始化