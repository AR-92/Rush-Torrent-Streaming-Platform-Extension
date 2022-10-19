// Handlebars.registerHelper('cut', function(aString) {
//     return aString.slice(0, 15)
// });
// Handlebars.registerHelper('dat', function(bString) {
//     bString = moment(bString).format('MMMM Do YYYY, h:mm:ss a');
//     return bString
// });

// function renderDefaultUi(){
//     var arrayOfTor=[
//         'magnet:?xt=urn:btih:c9e15763f722f23e98a29decdfae341b98d53056&dn=Cosmos+Laundromat&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fcosmos-laundromat.torrent',
//         'magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fbig-buck-bunny.torrent',
//         'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent',
//         'magnet:?xt=urn:btih:209c8226b299b308beaf2b9cd3fb49212dbd13ec&dn=Tears+of+Steel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Ftears-of-steel.torrent',
//         'magnet:?xt=urn:btih:a88fda5954e89178c372716a6a78b8180ed4dad3&dn=The+WIRED+CD+-+Rip.+Sample.+Mash.+Share&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fwired-cd.torrent'
//     ];

//     console.log(arrayOfTor)
// }
function checkifVedio(name,id){
    // if(file.name.match(/.(mp3|mp4)$/i)){}
 if(name.match(/.(mp4)$/i)){
     return `${name}  <button class="btn-primary playz" id="${id}" name="${name}"> Paly </button>`;
     
 } else if(name.match(/.(mp3)$/i)){
    return `${name}  <button class="btn-primary playzmp3" id="${id}" name="${name}"> Paly Audio </button>`;
     
 }
 else{
     return  `${name}`;
 }
}
function torrentStatsUI(data) {
    var html = `
    <div class="torrentStats">
        <div class="header">${data.name}</div>
        <b>Peers : </b><span id=""> ${data.numPeers}</span><br>
        <b>Downloaded : </b><span id=""> ${data.downloaded}</span><br>
        <b>Time Left : </b><span id=""> ${data.remaining}</span><br>
        <b>Speed : </b><span id=""> ${data.downloadSpeed}</span><br>
        <b>Total Size : </b><span id=""> ${data.size}</span><br>
        <b>Ratio : </b><span id=""> ${(data.ratio * 100).toString().slice(0, 3)}</span><br>
        <b>Progress : </b><span>${data.progress}%</span><div class="progress" style="width:${data.progress}%"></div>
        <small>Health: ${data.health}</small><img style="width: 15px;" src="./img/pulse.svg" /><br>
        <div style="background-color: #ffee5b;
        padding: 3px;
        margin-top:5px;
        width: calc(${data.health}% - 4%);
        border-radius: 20px;"></div>
        </div>
    `;
    // var compiled_template = Handlebars.compile(html);
    // var rendered = compiled_template(data);
    // document.getElementById('stats').insertAdjacentHTML("afterend", rendered);
    document.getElementById('stats').innerHTML = html;

    // $dashboardItems.insertAdjacentHTML("beforeend", rendered);

}

function torrentFileUI(data) {
    // console.log(data)
    // file.name=file.name.slice(0,10);
    var html='';
   data.rows.forEach(element => {
     
       html += `
       <li class="items box files" >
       <small style="color: darkgray;">${element.doc.type}</small><br>
       <b style="font-size: 18px;">
       ${element.doc.name.slice(0, 15) }
       </b><br>
       <small style="color: darkgray;">${moment(element.doc.date).format('MMMM Do YYYY, h:mm:ss a')}</small><br>
       <ul class="subFiles">
       
       
       `;
       //    <button class="btn-primary playz" id="${element.doc._id}"> Paly </button>
       element.doc.allFiles.forEach(e => {
           html+=`<li class="subfilesItems">${checkifVedio(e.name,element.doc._id)}</li>`
           //    console.log(e );
        })
        html+=`</ul>
        <button class="btn btn-danger remover"  data="${element.doc._id}">Remove</button>
        </li>`;
    });
    // <button class="btn btn-primary copyMag"  data="${element.doc._id}">Copy Magnet Link</button>
    // <button class="btn remover"  data="${element.doc._id}"><img style="width: 20px;" src="./img/trash-outline.svg" /></button>
    // <small>Health: {{doc.health}}</small><img style="width: 15px;" src="./img/pulse.svg" /><br>
    // <div style="background-color: #ffee5b;
    // padding: 3px;
    // margin-top:5px;
    // width: calc({{doc.health}}% - 4%);
    // border-radius: 20px;"></div>
    // <button class="btn playz" id="{{doc._id}}"><img style="width: 20px;" src="./img/caret-forward-outline.svg" />   </button>
    // <button class="btn downz" data="{{doc._id}}"><img style="width: 20px;" src="./img/cloud-download-outline.svg" /></button>
    // <button class="btn downz" data="{{doc._id}}"><img style="width: 20px;" src="./img/documents.svg" /></button>
    // var compiled_template = Handlebars.compile(html);
    // var rendered = compiled_template(data);
    document.getElementById('content').innerHTML = html;

    // $dashboardItems.innerHTML=html;
    // $dashboardItems.insertAdjacentHTML("beforeend", html);
}