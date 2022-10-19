 class TorrenFiles {
     constructor(db) {
         this.FilesList;
         this.db = db;
         this.rtcConfig = `{
            "comment": "WARNING: This is *NOT* a public endpoint. Do not depend on it in your app",
            "iceServers": [
              {
                "urls": [
                  "stun:stun.l.google.com:19302",
                  "stun:global.stun.twilio.com:3478",
                  "stun:35.224.227.218:443"
                ]
              },
              {
                "urls": [
                  "turn:relay.instant.io:443?transport=udp",
                  "turn:relay.instant.io:443?transport=tcp",
                  "turns:relay.instant.io:443?transport=tcp"
                ],
                "username": "relay.instant.io",
                "credential": "nepal-cheddar-baize-oleander"
              }
            ]
          }`;
         this.client = window.client = new WebTorrent({
             tracker: {
                 rtcConfig: JSON.parse(this.rtcConfig)
             }
         });

     };
     getFiles() {
         return new Promise((resolve, reject) => {
             this.db.allDocs({
                 include_docs: true,
                 attachments: true
             }).then((result) => {
                 this.FilesList = result;
                 resolve(result)
             })
         })
     }
     getFile(id) {
         return new Promise((resolve, reject) => {
             db.get(id).then((doc) => {
                 resolve(doc);
             })
         })
     }
     saveFile(file) {
         return new Promise((resolve, reject) => {
             //  this.d(file)
             this.GetFileDetails(file).then((result) => {
                 this.db.put(result);
                 this.getFiles().then(result => {
                     this.FilesList = result;
                     resolve(true)
                 });
             })
         })
     }
     d(file) {
         // this.client.add(file, {
         //     announce: [
         //         'wss://tracker.openwebtorrent.com',
         //         'wss://tracker.btorrent.xyz',
         //         'wss://tracker.webtorrent.io',
         //     ]
         // },(torrent) => {
         //     // torrent.on('ready', (x)=> {
         //     //     // console.log('Peers', torrent.numPeers ,x)
         //     // })
         //     console.log('torrent', torrent)
         //     torrent.on('noPeers', function (announceType) {
         //         console.log("announceType >>> ",announceType)
         //     })
         //     torrent.on('wire',  (wire, addr)=> {
         //         console.log('Peers', torrent.numPeers)

         //         // console.log('Downloaded', wire.downloaded)
         //         // console.log('Uploaded', wire.uploaded)
         //         // console.log('Download Speed', wire.downloadSpeed())
         //         // console.log('Upload Speed', wire.uploadSpeed())
         //     })
         // this.client.on("torrent",(torrent)=>{
         // setTimeout(() => {
         //     console.log("on toeent ready ", torrent.numPeers);
         //     this.client.remove(torrent.infoHash);
         // }, 15000);
         // })
         // });
     }
     saveMagnet(magnet) {
         return new Promise((resolve, reject) => {
             this.GetMagnetDetails(magnet).then((result) => {
                 console.log(result)
                 this.db.put(result);
                 this.getFiles().then(result => {
                     this.FilesList = result;
                     resolve(true)
                 });
             });
         });
     }
     removeFile(id) {
         return new Promise((resolve, reject) => {
             db.get(id).then((doc) => {
                 db.remove(doc);
                 this.getFiles().then(result => {
                     this.FilesList = result;
                     resolve(true)
                 });
             })
         })
     }
     getRange(value, in_min, in_max, out_min, out_max) {
         var range = (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
         if (range > out_max) {
             return out_max
         }
         return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
     }
     getHealth(magnetLink) {
         return new Promise((resolve, reject) => {
             var xmlhttp = new XMLHttpRequest()
             xmlhttp.open('GET', 'https://checker.openwebtorrent.com/check?magnet=' + encodeURIComponent(magnetLink))
             xmlhttp.send(null)
             xmlhttp.onreadystatechange = function() {
                 if (this.readyState === 4 && this.status === 200) {
                     var response = JSON.parse(this.responseText)
                     var newArr = response.extra.filter(function(el) {
                         return el.tracker.includes("ws");
                     });
                     var objStats;
                     objStats = newArr.reduce(function(result, item) {
                         if (!item.error) {
                             return result + item.seeds;
                         } else {
                             return result + 0;
                         }
                     }, 0);
                     console.log(objStats, newArr)

                     function getRange(value, in_min, in_max, out_min, out_max) {
                         var range = (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
                         if (range > out_max) {
                             return out_max
                         }
                         return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
                     }
                     objStats = getRange(objStats, 0, 10, 0, 100);
                     console.log(objStats)

                     resolve(objStats)
                 }
             }
         });
     }
     getExe(fname) {
         return fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1);
     }
     prettyBytes(num) {
         var exponent, unit, neg = num < 0,
             units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
         if (neg) num = -num
         if (num < 1) return (neg ? '-' : '') + num + ' B'
         exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
         num = Number((num / Math.pow(1000, exponent)).toFixed(2))
         unit = units[exponent]
         return (neg ? '-' : '') + num + ' ' + unit
     }
     GetFileDetails(file) {
         return new Promise((resolve, reject) => {
             var o = {
                 _id: file.name,
                 name: file.name,
                 date: file.lastModifiedDate,
                 type: "Torrent File",
                 tfile: file,
                 allFiles: [],
             };
             this.client.add(file, {
                 announce: [
                     'http://router.bittorrent.com:6881',
                     'http://dht.transmissionbt.com:6881',
                     'wss://tracker.openwebtorrent.com',
                     'wss://tracker.btorrent.xyz'
                 ]
             }, (torrent) => {
                 o.size = this.prettyBytes(torrent.length);
                 o.nameOnfile = torrent.name;
                 torrent.files.forEach(element => {
                     o.allFiles.push(element)
                 });
                 var x = torrent.files.find(function(file) {
                     return file.name.endsWith('.mp4')
                 });
                 if (x) {
                     o.valid = true;
                     o.fileType = this.getExe(x.name);
                 } else {
                     o.valid = false;
                 }
                 //  this.getHealth(torrent.magnetURI).then((res) => {
                 //      o.health = res
                 //     })
                 this.client.remove(torrent.magnetURI);
                 resolve(o)
             })
         })

     }
     GetMagnetDetails(magnet) {
         return new Promise((resolve, reject) => {
             let params = new URLSearchParams(magnet);
             let name = params.get("dn"); // is the string "Jonathan"
             var o = {
                 _id: name,
                 name: name,
                 date: new Date(),
                 type: "Magnet Link",
                 tfile: magnet,
                 allFiles: [],
             };
            //  console.log(o, params)
            //  resolve(o)

              this.client.add(magnet, {
                  announce: [
                      'http://router.bittorrent.com:6881',
                      'http://dht.transmissionbt.com:6881',
                      'wss://tracker.openwebtorrent.com',
                      'wss://tracker.btorrent.xyz'
                  ]
              }, (torrent) => {
                  console.log(torrent)
                  o.size = this.prettyBytes(torrent.length);
                  o.nameOnfile = torrent.name;
                  torrent.files.forEach(element => {
                    o.allFiles.push(element)
                });
                  var x = torrent.files.find(function(file) {
                      return file.name.endsWith('.mp4')
                  });
                  if (x) {
                      o.valid = true;
                      o.fileType = this.getExe(x.name);
                  } else {
                      o.valid = false;
                  }
                  //  this.getHealth(torrent.magnetURI).then((res) => {
                  //      o.health = res
                  // })
                  this.client.remove(torrent.magnetURI);
                  resolve(o)
              })
         })

     }
     blobToFile(theBlob, fileName) {
         //A Blob() is almost a File() - it's just missing the two properties below which we will add
         theBlob.lastModifiedDate = new Date();
         theBlob.name = fileName;
         return theBlob;
     }
     removeAllTorrentsEx(id) {
         this.client.torrents.forEach(element => {
             console.log(id, element.infoHash)
             if (id === element.infoHash) {
                 console.log("torrentssss", element.infoHash)
             } else {
                 this.client.remove(element.infoHash);
             }
         });
     }
     closer(torrent){
         document.getElementById("vidCloser").addEventListener('click',()=>{
            document.getElementById('v').innerHTML=``;
            this.client.remove(torrent.infoHash);
         })
     }
     playFile(id,nameoffile) {
         return new Promise((resolve, reject) => {
             this.getFile(id).then((result) => {
                 console.log(result)
                 if (result.type !== 'Magnet Link') {

                     console.log("not mag")
                     var f = this.blobToFile(result.tfile, result.name);
                 } else {
                     var f = result.tfile
                     let params = new URLSearchParams(result.tfile);

                     console.log("link mag", params.values(),result);
                     for(var value of params.values()) {
                        console.log(value);
                      }

                 }
                 console.log("ffff", f)

                 this.client.add(f, {
                     announce: [
                         //  'http://router.bittorrent.com:6881',
                         //  'http://dht.transmissionbt.com:6881',
                         //  'http://tracker.opentrackr.org:1337/announce',
                         //  'http://torrent.nwps.ws:6969/announce',
                         //  'http://open.kickasstracker.com:80/announce',
                         //  'http://open.acgnxtracker.com:80/announce',

                         'wss://tracker.openwebtorrent.com',
                         'wss://tracker.btorrent.xyz',
                         'wss://tracker.webtorrent.io',
                         'wss://tracker.fastcast.nz',

                         //  'wss://video.blender.org:443/tracker/socket',
                         //  'wss://tube.privacytools.io:443/tracker/socket',
                         //  'wss://tracker.sloppyta.co:443/announce',
                         //  'wss://tracker.lab.vvc.niif.hu:443/announce',
                         //  'wss://tracker.files.fm:7073/announce',
                         //  'wss://peertube.cpy.re:443/tracker/socket',
                         //  'wss://open.tube:443/tracker/socket',
                         //  'wss://hub.bugout.link:443/announce',
                         //  'ws://tracker.btsync.cf:2710/announce',
                         //  'ws://tracker.sloppyta.co:80/announce',
                         //  'ws://tracker.lab.vvc.niif.hu:80/announce',
                         //  'ws://tracker.files.fm:7072/announce',
                         //  'ws://tracker.btsync.cf:6969/announce',
                         //  'ws://hub.bugout.link:80/announce',

                         // "udp://tracker.opentrackr.org:1337/announce"
                     ]
                 }, (torrent) => {

                     this.removeAllTorrentsEx(torrent.infoHash)
                    //  torrent.on('metadata',  ()=> {
                   
                        // $dashboardItems.innerHTML=hh;
                        // $dashboardItems.insertAdjacentHTML("afterbegin", hh);
                        var x = torrent.files.find(function(file) {
                            if(file.name===nameoffile){
                                return file
                            }
                        });
                        if(nameoffile.match(/.(mp4)$/i)){
                            var hh = `<li class="items vidElem" style="float: left;"><div class="headerVid">${torrent.name}<button class="btn btn-danger" id="vidCloser"> Close </button></div><video width="1024" height="436"  id="video"></video></li>
                            <li  class="items vidElem" id="stats" style="float: left;" ></li>
                            `;
                            document.getElementById('v').innerHTML = hh;
                            this.closer(torrent);
                            this.playerInstall(x);
                        }
                        if(nameoffile.match(/.(mp3)$/i)){
                            var hh = `<li class="items vidElem" style="float: left;"><div class="headerVid">${torrent.name}<button class="btn btn-danger" id="vidCloser"> Close </button></div><audio   id="video"></audio></li>
                            <li  class="items vidElem" id="stats" style="float: left;" ></li>
                            `;
                            document.getElementById('v').innerHTML = hh;
                            this.closer(torrent);
                            this.mp3playerInstall(x);
                        }
                        // document.documentElement.scrollTop = 0;
                        // document.getElementById('container').scrollTo(0,0);
                        document.getElementById('container').scrollTo({ top: 0, behavior: 'smooth' });

                        // console.log(this.getExe(nameoffile))
                        // if()
                        //  console.log("namesss ?/", x,nameoffile)
                        //  var x = torrent.files.find(function(file) {
                            //     return file.name.endsWith('.mkv')
                            // });
                        // })

                     function getRange(value, in_min, in_max, out_min, out_max) {
                         var range = (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
                         if (range > out_max) {
                             return out_max
                         }
                         return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
                     }

                     torrent.on('download', function(bytes) {
                         var health = getRange(torrent.numPeers, 0, 10, 0, 100);
                         torrentStatsUI({
                             name: torrent.name,
                             numPeers: torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers'),
                             remaining: TF.remainingTime(torrent),
                             downloaded: TF.prettyBytes(torrent.downloaded),
                             downloadSpeed: TF.prettyBytes(torrent.downloadSpeed) + '/s',
                             size: TF.prettyBytes(torrent.length),
                             progress: Math.round(torrent.progress * 100 * 100) / 100,
                             ratio: torrent.ratio,
                             health: health,
                         })
                     })
                 })
             })
         })
     }
     remainingTime(torrent) {
         // Remaining time
         var remaining
         if (torrent.done) {
             remaining = 'Done.'
         } else {
             remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
             remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
         }
         return remaining
     }
     playerInstall(file) {
         var player = new MediaElementPlayer('video');
         file.renderTo('#video_from_mejs')
         var gg = document.getElementById("video_from_mejs").src;
         player.setSrc(gg);
         player.media.load();
         player.defaultVideoWidth = 1024;
         player.defaultVideoHeight = 436;
         player.width = 1024;
         player.height = 436;
         player.setPlayerSize(1024, 436);
         player.play();
     }
     mp3playerInstall(file) {
        var player = new MediaElementPlayer('video');
        file.renderTo('#video_from_mejs')
        var gg = document.getElementById("video_from_mejs").src;
        player.setSrc(gg);
        player.media.load();
        player.defaultVideoWidth = 1024;
        player.defaultVideoHeight = 436;
        player.width = 1024;
        player.height = 436;
        player.setPlayerSize(1024, 436);
        player.play();
    }
 }