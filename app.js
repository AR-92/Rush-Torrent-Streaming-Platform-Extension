    getTem(`./templates/main.htm`, 'main', { logoImage: "./img/icon.png" });
    // getTem(`./templates/panel.htm`, 'panel', {});
    // var instagramTager = new instaFollow({ username: '_rana.g' });
    // instagramTager.inserter();
    // setTimeout(() => {
    setTimeout(() => {
        var client = new WebTorrent();
        // var torrent;
        var arrayoftorrents = [];
        var $progressBar = document.querySelector('#progressBar');
        var $filename = document.querySelector('#torrentname');
        var $numPeers = document.querySelector('#numPeers');
        var $downloaded = document.querySelector('#downloaded');
        var $total = document.querySelector('#total');
        var $remaining = document.querySelector('#remaining');
        var $uploadSpeed = document.querySelector('#uploadSpeed');
        var $downloadSpeed = document.querySelector('#downloadSpeed');



        //     document.getElementById("fileinput").addEventListener("change",(x)=>{
        //         console.log(x.target.value);
        //     })
        dragDrop('#dropTarget', {
            onDrop: (files, pos, fileList, directories) => {
                console.log('Here are the dropped files', files);
                client.add(files[0], (torrent) => {
                        // torrent=torrent;
                        torrent.files.forEach(function(file) {
                            console.log("vvvvv", file)

                            if (file.name.match(/.(mp4)$/i)) {
                                console.log("founddddddd")
                                    // document.getElementById("torrentvid").innerHTML=``;
                                file.appendTo('#torrentvid');
                                // setInterval(onProgress(torrent), 500)
                            }
                        });

                        onProgress(torrent)

                    })
                    // console.log('Dropped at coordinates', pos.x, pos.y)
                    // console.log('Here is the raw FileList object if you need it:', fileList)
                    // console.log('Here is the list of directories:', directories)
            },
            onDragEnter: () => {},
            onDragOver: () => {
                console.log("ovver");

            },
            onDragLeave: () => {}
                // downloadtorrent(files)
                // oldget(files,client);
        })

        //  function gg(f) {
        //   return new Promise((reject,resolve)=>{
        //         client.add(f, (torrent) => {
        //             torrent.files.forEach((file) => {
        //                 if (file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
        //                      file.getBlobURL((err, url) => {
        //                           resolve(url);
        //                     });
        //                 }
        //             })
        //         })
        //     })

        // }

        // async function downloadtorrent(arr) {
        //     document.getElementById("droperText").innerHTML = '';
        //     arr.forEach(element => {
        //         document.getElementById("droperText").insertAdjacentHTML("beforeend", element.name + '<br>');
        //         var h = await gg(element);
        //         console.log("fileshhhh ", h);

        //     });
        //     document.getElementById("droperText").insertAdjacentHTML("beforeend", '<br><b>PLEASE WAIT YOUR TORRENTS ARE GETING READY</b>');
        // }
        // Statistics
        function onProgress(torrent) {
            setInterval(() => {
                console.log("i ran ")
                $filename.innerHTML = torrent.name;

                // Peers
                $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')

                // Progress
                var percent = Math.round(torrent.progress * 100 * 100) / 100
                $progressBar.innerHTML = percent + '%'
                $downloaded.innerHTML = prettyBytes(torrent.downloaded)
                $total.innerHTML = prettyBytes(torrent.length)

                // Remaining time
                var remaining
                if (torrent.done) {
                    remaining = 'Done.'
                } else {
                    remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
                    remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
                }
                $remaining.innerHTML = remaining

                // Speed rates
                $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
                $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
            }, 500)

        }

        // Human readable bytes util
        function prettyBytes(num) {
            var exponent, unit, neg = num < 0,
                units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            if (neg) num = -num
            if (num < 1) return (neg ? '-' : '') + num + ' B'
            exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
            num = Number((num / Math.pow(1000, exponent)).toFixed(2))
            unit = units[exponent]
            return (neg ? '-' : '') + num + ' ' + unit
        }
    }, 3000);

    function oldget(files, client) {
        files.forEach(element1 => {
            if (element1.name.match(/.(torrent)$/i)) {
                client.add(element1, (torrent) => {
                    var obj = {
                        name: torrent.name,
                        createdBy: torrent.createdBy.toString(),
                        created: torrent.created.toString(),
                    }
                    torrent.files.forEach((file) => {
                        // console.log(file.name.match(/.(jpg|jpeg|png|gif)$/i))
                        torrent.on('done', function() {
                            // Here
                            console.log("we are done here")
                        })
                        if (file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
                            file.getBlobURL((err, url) => {
                                if (err) {
                                    console.log(",,,,,,,", err)
                                }
                                torlist({
                                    name: obj.name.slice(0, 20),
                                    createdBy: obj.createdBy.slice(0, 50),
                                    created: obj.created.slice(0, 50),
                                    url: url,
                                })
                            })
                            console.log(">>>> ", file);
                            torlist({
                                name: obj.name.slice(0, 20),
                                createdBy: obj.createdBy.slice(0, 50),
                                created: obj.created.slice(0, 50),
                                // url: t,
                            })
                        }
                    })

                });
                // console.log(element1);

            }

        });
    }

    function torlist(obj) {
        fetch(`./templates/thumbnail.htm`)
            .then(response => response.text())
            .then(response => {
                var template = response.toString()
                var compiled_template = Handlebars.compile(template);
                var rendered = compiled_template(obj);
                document.getElementById("container").insertAdjacentHTML("beforeend", rendered);
            })
    }
    // var userSelection = document.getElementsByClassName('listitem');
    // document.getElementById("panelClose").addEventListener("click", () => {
    //     anime({
    //         targets: '.panel',
    //         right: "-2000px",
    //     });
    //     for (let x = 0; x < userSelection.length; x++) {
    //         userSelection[x].classList.remove("active");
    //     }
    // });
    // for (let i = 0; i < userSelection.length; i++) {
    //     userSelection[i].addEventListener("click", function() {
    //         console.log("nav tabs info ", userSelection[i] === this, userSelection[i]);
    //         for (let x = 0; x < userSelection.length; x++) {
    //             userSelection[x].classList.remove("active");
    //         }
    //         this.classList.add("active");
    //         anime({
    //             targets: '.panel',
    //             right: "0px",
    //         });
    // })
    // }





    function onTorrent(torrent) {
        console.log('Got torrent metadata!', torrent, client);
        torrent.files.forEach((file) => {
            console.log("::::::::", file);
        })
    }

    function tor(torrent) {
        var random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        torrent.on('download', (bytes) => {
            var html = `
            <ul class="torrentCard " id="${random}">
        <li class="torrentCardList"><b> ${torrent.name} </b></li>
        <li class="torrentCardList"><b> just downloaded: </b>${ (bytes / 1000).toFixed(1)}Kb </li>
        <li class="torrentCardList"><b> total downloaded: </b>${ (torrent.downloaded / 1000).toFixed(1)}Kb </li>
        <li class="torrentCardList"><b> download speed: </b>${ (torrent.downloadSpeed / 1000).toFixed(1)}Kb/s </li>
        <li class="torrentCardList"><b> progress: </b>${(torrent.progress * 100).toFixed(1)}% </li>
        <li class="torrentCardList"><b> Peers: </b>${torrent.numPeers} </li>
        <li class="torrentCardList"><b> ETA: </b>${(torrent.timeRemaining/60000 ).toFixed(1)} Min </li>
        </ul>
        `;
            // document.getElementById("torrentsinfo").innerHTML = html;
        })
        torrent.files.forEach((file) => {
            if (file.name.match(/.(mp4)$/i)) {
                // console.log("::::::::", random, file);
                document.getElementById(`torrentsvid`).innerHTML = ``;
                var htm = `<div class=" ${random}" style=""></div>`;
                document.getElementById(`torrentsvid`).insertAdjacentHTML("beforeend", htm);

                file.appendTo(`.${random}`);
            }
        })
        torrent.on('done', function() {
            console.log('Progress: 100%')
            clearInterval(interval)
        })
    }
    // function getFileType(fname) {
    //     return fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1);
    // }

    // function log(str) {
    //     var html = '<div class="box card" style="text-align: center;padding:30px;margin:20px">';
    //     html += str + '</div>';
    //     document.getElementById('container').insertAdjacentHTML("beforeend", html);
    // }
    // function playert(torrent){
    //     torrent.files.forEach((file)=> {
    //         if (file.name.match(/.(mp4)$/i)) {
    //             // if(file.name.match(/.(jpg|jpeg|png|gif|mp4)$/i)){
    //             // var random = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    //             console.log("::::::::",random)
    //             var htm = `<li class="torrentCardList .${random}"  style="text-align: center;padding:30px;margin:20px"></li>`;
    //             // setTimeout(() => {

    //                 document.getElementById(random).insertAdjacentHTML("beforeend", htm);
    //             // }, 2000);
    //             // if(file.name.match(/.(jpg|jpeg|png|gif)$/i)){
    //             //     file.appendTo('.'+random);
    //             // }
    //             file.appendTo('.' + random);
    //         }
    //         // file.appendTo('.' + random);

    //         // console.log('.' + random, ">type", getFileType(file.name));

    //         // log(file)
    //         // console.log("files ", file)
    //         // console.log('(Blob URLs only work if the file is loaded from a server. "http//localhost" works. "file://" does not.)')
    //         // file.getBlobURL(function(err, url) {
    //         //     if (err) return log(err.message)
    //         //     console.log('File done.', url)
    //         //     log('<a href="' + url + '">Download full file: ' + file.name + '</a>')
    //         // })
    //         })
    // }