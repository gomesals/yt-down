"use strict";

const ytDown = require('../lib/');
const express = require('express');
const router = express.Router();
router.route('/mp3/:v').get(getMp3);
router.route('/mp4/:v').get(getMp4);
router.route('/mp4/:v/muted').get(getMp4Muted);

async function getMp3(req, res) {
    try {
        const info = await ytDown.saveAudio(req.params.v);
        res.download(`./public/files/${req.params.v}.mp3`, `${info.data.title}.mp3`);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
async function getMp4(req, res) {
    try {
        const info = await ytDown.saveVideo(req.params.v);
        res.download(`./public/files/${req.params.v}.mp4`, `${info.data.title}.mp4`);
    }
    catch (err) { res.sendStatus(500); }
};
async function getMp4Muted(req, res) {
    try {
        const info = await ytDown.saveVideoMuted(req.params.v);
        res.download(`./public/files/${req.params.v}_muted.mp4`, `${info.data.title} [no audio].mp4`);
    }
    catch (err) { res.sendStatus(500); }
};

module.exports = router;
