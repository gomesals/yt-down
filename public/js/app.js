/*global axios*/
(function() {
    "use strict";
    var form = document.getElementById('form');
    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        getInfo();
    });

    function getInfo() {
        var linkEl = document.getElementById('link');
        axios.get('/api/?link=' + linkEl.value).then(function(response) {
            setInfo(response.data);
        }).catch(function(error) {
            console.log(error);
            alert('Server unavailable');
        });
    }

    function setInfo(video) {
        document.getElementById('title').innerText = video.data.title;
        document.getElementById('uploaded').innerHTML = '<strong>Uploaded by:</strong> ' + video.data.uploaded;
        document.getElementById('length').innerHTML = '<strong>Length:</strong> ' + video.data.length;
        document.getElementById('asmp3').href = "download/mp3/" + video.v;
        document.getElementById('asmp4').href = "download/mp4/" + video.v;
    }
})();
