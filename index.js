"use strict";

const fs = require('fs');
const ytdl = require('ytdl-core');
const queryString = require('query-string');

const save = (url, output, filter = format => format.container === 'mp4') => {
	return new Promise(resolve => {
		const stream = ytdl(url, { filter, }).pipe(fs.createWriteStream(output));
		stream.on('finish', () => {
			return resolve();
		});
	});
};
const saveAudio = (url, output) => {
	return new Promise((resolve, reject) => {
		getInfo(url).then(info => {
			save(info.url, output, 'audioonly').then(() => {
				resolve();
			});
		}).catch(reject);
	});
};
const saveVideo = (url, output) => {
	return new Promise((resolve, reject) => {
		getInfo(url).then(info => {
			save(info.url, output, 'videoonly').then(() => {
				resolve();
			});
		}).catch(reject);
	});
};
const saveMp4 = (url, output) => {
	return new Promise((resolve, reject) => {
		getInfo(url).then(info => {
			save(info.url, output).then(() => {
				resolve();
			});
		}).catch(reject);
	});
};
const getInfo = url => {
	return new Promise((resolve, reject) => {
		const { v } = queryString.parse(url.split('?')[1]);
		ytdl.getInfo(v, (err, info) => {
			if (err) return reject(err);
			return resolve({
				data: {
					title: info.title,
					rating: info.average_rating,
					uploaded: info.author.name,
					lentgh: info.length_seconds,
				},
				url: `https://www.youtube.com/?v=${v}`,
			});
		});
	});
};

module.exports = {
	saveAudio,
	saveMp4,
	saveVideo,
	getInfo,
};
