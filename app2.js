        var $dashboardItems = document.querySelector(".dashboardItems");

        var instagramTager = new instaFollow({ username: '_rana.g' });
        instagramTager.inserter();

        var db = new PouchDB('torrentFiles');
        var TF = new TorrenFiles(db);

        TF.getFiles().then((result) => {
            console.log(result);
            if(result.rows.length <= 0){
                // renderDefaultUi();
                var arrayOfTor=[
                    'magnet:?xt=urn:btih:c9e15763f722f23e98a29decdfae341b98d53056&dn=Cosmos+Laundromat&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fcosmos-laundromat.torrent',
                    'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent',
                    'magnet:?xt=urn:btih:a88fda5954e89178c372716a6a78b8180ed4dad3&dn=The+WIRED+CD+-+Rip.+Sample.+Mash.+Share&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fwired-cd.torrent'
                ];
                console.log(TF.FilesList)
                arrayOfTor.forEach(element => {
                    TF.saveMagnet(element).then(() => {
                        torrentFileUI(TF.FilesList);
                        playTorrent();
                    });
                });
            }
            torrentFileUI(result);
            playTorrent();
        });
        var upload = document.getElementById("myfile");

        upload.onchange = function(e) {
            let files = e.target.files;
            let fileArray = Object.values(files);
            fileArray.forEach(element => {
                TF.saveFile(element).then(() => {
                    torrentFileUI(TF.FilesList);
                    playTorrent();
                });
            });
        };
        dragDrop('.filerAdder', {
            onDrop: (files, pos, fileList, directories) => {
                files.forEach(element => {
                    TF.saveFile(element).then(() => {
                        torrentFileUI(TF.FilesList);
                        playTorrent();
                    });
                });
            },
        })
        document.querySelector("#saveMagnet").addEventListener("click", function() {
            var magnet = document.getElementById("textMagnet");
            TF.saveMagnet(magnet.value).then(() => {
                torrentFileUI(TF.FilesList);
                playTorrent();
                document.getElementById("textMagnet").value = null
            });
            // torrentFileUI(TF.FilesList);
        })

        function playTorrent() {
            var $dashboardFilesPlay = document.getElementsByClassName("playz");
            var $dashboardFilesPlaymp3 = document.getElementsByClassName("playzmp3");
            var $dashboardFilesRemove = document.getElementsByClassName("remover");
            for (let i = 0; i < $dashboardFilesPlay.length; i++) {
                $dashboardFilesPlay[i].addEventListener("click", function() {
                    TF.playFile($dashboardFilesPlay[i].id,$dashboardFilesPlay[i].name);
                })
            }
            for (let i = 0; i < $dashboardFilesPlaymp3.length; i++) {
                $dashboardFilesPlaymp3[i].addEventListener("click", function() {
                    TF.playFile($dashboardFilesPlaymp3[i].id,$dashboardFilesPlaymp3[i].name);
                })
            }
            for (let i = 0; i < $dashboardFilesRemove.length; i++) {
                $dashboardFilesRemove[i].addEventListener("click", function() {
                    TF.removeFile($dashboardFilesRemove[i].getAttribute("data")).then(() => {
                        torrentFileUI(TF.FilesList);
                playTorrent();

                    })
                })
            }
        }
        // function play(file) {
        //     var player = new MediaElementPlayer('video');
        //     file.renderTo('#video_from_mejs')
        //     var gg = document.getElementById("video_from_mejs").src;
        //     player.setSrc(gg);
        //     player.media.load();
        //     player.defaultVideoWidth = 1024;
        //     player.defaultVideoHeight = 436;
        //     player.width = 1024;
        //     player.height = 436;
        //     player.setPlayerSize(1024, 436);
        //     player.play();
        // }