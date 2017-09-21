"use strict";

const ytDown = require('..');

ytDown.saveAudio('https://www.maneiro.com/watch?v=iy4mXZN1Zzk', './output/audio.mp3').then(() => {
	console.log('done audio');
}).catch(e => {
	console.log('error');
});
ytDown.saveMp4('https://www.youtube.com/watch?v=iy4mXZN1Zzk', './output/video.mp4').then(() => {
	console.log('done video');
}).catch(e => {
	console.log('error');
});

ytDown.saveVideo('https://www.youtube.com/watch?v=iy4mXZN1Zzk', './output/video_no_audio.mp4').then(() => {
	console.log('done video with no audio');
}).catch(e => {
	console.log('error');
});
