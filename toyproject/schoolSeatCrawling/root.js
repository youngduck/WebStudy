const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async (addr) => {
  try {
    return await axios.get(addr);
  } catch (error) {
    console.error(error);
  }
};

const getSeatNumber = async (room_number) => {
  let result = {};

  if (room_number == 1) {
    result = {
      start: 80,
    };
  } else if (room_number == 2) {
    result = {
      start: 60,
    };
  } else {
    result = {
      start: 67,
      end: 135,
    };
  }

  return result;
};

const getNormalSeatDataBySingle = async (url, room_number, type, point, target) => {
  const result = await getHTML(url).then((html) => {
    const $ = cheerio.load(html.data);
    const bodyList = $(target);

    let seatInfo = [];

    bodyList.each((i, elem) => {
      if (i < point.start) {
        let seatOn = false;
        if ($(elem).attr('bgcolor') === '#0C2E86') {
          seatOn = true;
        }
        seatInfo.push([$(elem).find('font').text(), seatOn]);
      }
    });

    return seatInfo;
  });

  return result;
};

const getLaptopSeatDataBySingle = async (url, room_number, type, point, target) => {
  const result = await getHTML(url).then((html) => {
    const $ = cheerio.load(html.data);
    const bodyList = $(target);

    let seatInfo = [];

    bodyList.each((i, elem) => {
      if (i >= point.start) {
        let seatOn = false;
        if ($(elem).attr('bgcolor') === '#0C2E86') {
          seatOn = true;
        }
        seatInfo.push([ $(elem).find('font').text(), seatOn]);
      }
    });

    return seatInfo;
  });

  return result;
};

const getNormalSeatDataByDouble = async (url, room_number, type, point, target) => {
  const result = await getHTML(url).then((html) => {
    const $ = cheerio.load(html.data);
    const bodyList = $(target);

    let seatInfo = [];

    bodyList.each((i, elem) => {
      if (i <= point.start || i > point.end) {
        let seatOn = false;
        if ($(elem).attr('bgcolor') === '#0C2E86') {
          seatOn = true;
        }
        seatInfo.push([ $(elem).find('font').text(), seatOn]);
      }
    });

    return seatInfo;
  });

  return result;
};

const getLaptopSeatDataByDouble = async (url, room_number, type, point, target) => {
  const result = await getHTML(url).then((html) => {
    const $ = cheerio.load(html.data);
    const bodyList = $(target);

    let seatInfo = [];

    bodyList.each((i, elem) => {
      if (i > point.start && i <= point.end) {
        let seatOn = false;
        if ($(elem).attr('bgcolor') === '#0C2E86') {
          seatOn = true;
        }
        seatInfo.push([$(elem).find('font').text(), seatOn]);
      }
    });

    return seatInfo;
  });

  return result;
};

module.exports = {
  getHTML,
  getSeatNumber,
  getNormalSeatDataBySingle,
  getNormalSeatDataByDouble,
  getLaptopSeatDataBySingle,
  getLaptopSeatDataByDouble,
};