"use strict";

const ytDown = require('../lib/');
const express = require('express');
const queryString = require('query-string');
const router = express.Router();
router.route('/').get(_get);

async function _get(req, res) {
    try {
        const { v } = queryString.parse(req.query.link.split('?')[1]);
        res.json(await ytDown.getInfo(v));
    }
    catch (err) { res.sendStatus(500); }
};
module.exports = router;
