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
const saveAudio = (URL, output) => {
	return new Promise(async(resolve, reject) => {
		try {
			const { url } = await getInfo(URL);
			await save(url, output, 'audioonly');
			resolve();
		}
		catch (err) { return reject(err) }
	});
};
const saveVideo = (URL, output) => {
	return new Promise(async(resolve, reject) => {
		try {
			const { url } = await getInfo(URL);
			await save(url, output, 'videoonly');
			resolve();
		}
		catch (err) { return reject(err) }
	});
};
const saveMp4 = (URL, output) => {
	return new Promise(async(resolve, reject) => {
		try {
			const { url } = await getInfo(URL);
			await save(url, output);
			resolve();
		}
		catch (err) { return reject(err) }
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
