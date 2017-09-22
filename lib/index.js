"use strict";

const fs = require('fs');
const ytdl = require('ytdl-core');
const TIME = 900000; // 15 minutes

const save = (url, output, filter = format => format.container === 'mp4') => {
	return new Promise(resolve => {
		url = `https://www.youtube.com/?v=${url}`;
		const stream = ytdl(url, { filter, }).pipe(fs.createWriteStream(output));
		stream.on('finish', () => {
			setTimeout(() => {
				fs.unlink(output, e => {
					if (e) console.log(e);
				});
			}, TIME);
			return resolve();
		});
	});
};
const saveAudio = (url, output) => {
	return new Promise(async(resolve, reject) => {
		try {
			const info = await getInfo(url);
			await save(info.v, `public/files/${info.v}.mp3`, 'audioonly');
			resolve(info);
		}
		catch (err) { return reject(err) }
	});
};
const saveVideoMuted = (url, output) => {
	return new Promise(async(resolve, reject) => {
		try {
			const info = await getInfo(url);
			await save(info.v, `public/files/${info.v}_muted.mp4`, 'videoonly');
			resolve(info);
		}
		catch (err) { return reject(err) }
	});
};
const saveVideo = (url, output) => {
	return new Promise(async(resolve, reject) => {
		try {
			const info = await getInfo(url);
			await save(info.v, `public/files/${info.v}.mp4`);
			resolve(info);
		}
		catch (err) { return reject(err) }
	});
};
const getInfo = v => {
	return new Promise((resolve, reject) => {
		ytdl.getInfo(v, (err, info) => {
			if (err) return reject(err);
			return resolve({
				data: {
					title: info.title,
					uploaded: info.author.name,
					length: info.length_seconds, //TODO: convert
				},
				url: `https://www.youtube.com/?v=${v}`,
				v,
			});
		});
	});
};

module.exports = {
	saveAudio,
	saveVideo,
	saveVideoMuted,
	getInfo,
};
