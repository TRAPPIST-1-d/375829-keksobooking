'use strict';


var  moduleDat = (function () {

  var OFFER_TITLE_LIST = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var OFFER_TYPE_LIST = [
    'flat',
    'house',
    'bungalo'
  ];
  var CHECK_IN_OUT_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES_LIST = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var arrAdverts = [];

  function getRandomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function elementAlreadyInArray(array, element) {
    for (var a = 0; a < array.length; a++) {
      if (array[a] === element) {
        return true;
      }
    }
    return false;
  }

  function getFeatures() {
    var arrFeatures = [];
    var targetLenght = getRandomMinMax(0, FEATURES_LIST.length);
    var elementToAdd;
    while (arrFeatures.length < targetLenght) {
      elementToAdd = FEATURES_LIST[getRandomMinMax(0, (FEATURES_LIST.length - 1))];
      if (elementAlreadyInArray(arrFeatures, elementToAdd) !== true) {
        arrFeatures.push(elementToAdd);
      }
    }
    return arrFeatures;
  }

  var getAdvert = function () {
    var randomLocationX = getRandomMinMax(300, 900);
    var randomLocationY = getRandomMinMax(100, 500);
    return {
      author: {
        avatar: 'img/avatars/user0' + (arrAdverts.length + 1) + '.png'
      },
      offer: {
        title: OFFER_TITLE_LIST[arrAdverts.length],
        address: randomLocationX + ', ' + randomLocationY,
        price: getRandomMinMax(1000, 1000000),
        type: OFFER_TYPE_LIST[getRandomMinMax(0, (OFFER_TYPE_LIST.length - 1))],
        rooms: getRandomMinMax(1, 5),
        guests: getRandomMinMax(1, 30),
        checkin: CHECK_IN_OUT_TIMES[getRandomMinMax(0, (CHECK_IN_OUT_TIMES.length - 1))],
        checkout: CHECK_IN_OUT_TIMES[getRandomMinMax(0, (CHECK_IN_OUT_TIMES.length - 1))],
        features: getFeatures(),
        description: '',
        photos: []
      },
      location: {
        x: randomLocationX,
        y: randomLocationY
      }
    };
  };

  for (var a2 = 0; arrAdverts.length < 8; a2++) {
    arrAdverts.push(getAdvert(arrAdverts));
  }

  return {
    adverts: arrAdverts
  };

})();
