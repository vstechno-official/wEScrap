const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/extract', async (req, res, next) => {
  try {
    const url = req.body.url;
    const response = await axios.get(url);
    const html = response.data;
        const $ = cheerio.load(html);
      const css = [];
    $('link[rel="stylesheet"]').each((i, elem) => {
      css.push($(elem).attr('href'));
    });
        const extractedHtml = $('html').html();
        res.json({ css, html: extractedHtml });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

