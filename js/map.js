'use strict';

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

function getAdvert() {
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
}

function getRusLodgeType(lodgeType) {
  switch (lodgeType) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
  }
  return lodgeType;
}

function getSpanWithFeature(orderInFeatureArr) {
  var spanWithFeature = document.createElement('span');
  spanWithFeature.setAttribute('class', 'feature__image feature__image--' + arrAdverts[0].offer.features[orderInFeatureArr]);
  return spanWithFeature;
}

function getMarker(orderInArr) {
  var markerDOMElement = document.createElement('div');
  var location = 'left: ' + (arrAdverts[orderInArr].location.x - 28) + 'px; top: ' + (arrAdverts[orderInArr].location.y - 75) + 'px';
  markerDOMElement.setAttribute('class', 'pin');
  markerDOMElement.setAttribute('style', location);
  var image = document.createElement('img');
  image.setAttribute('src', arrAdverts[orderInArr].author.avatar);
  image.setAttribute('class', 'rounded');
  image.setAttribute('width', '40');
  image.setAttribute('height', '40');
  markerDOMElement.appendChild(image);
  return markerDOMElement;
}

var arrAdverts = [];
var fragmentMarkers = document.createDocumentFragment();
var lodgeTemplate = document.querySelector('#lodge-template').content;
var fragmentSpansWithFetures = document.createDocumentFragment();
var dialogPanel = document.getElementById('offer-dialog').querySelector('.dialog__panel');

for (var a2 = 0; arrAdverts.length < 8; a2++) {
  arrAdverts.push(getAdvert());
}

for (var a3 = 0; a3 < arrAdverts.length; a3++) {
  fragmentMarkers.appendChild(getMarker(a3));
}
document.querySelector('.tokyo__pin-map').appendChild(fragmentMarkers);

for (var a4 = 0; a4 < arrAdverts[0].offer.features.length; a4++) {
  fragmentSpansWithFetures.appendChild(getSpanWithFeature(a4));
}

var roomsAndGuests = 'Для ' + arrAdverts[0].offer.guests + ' гостей в ' + arrAdverts[0].offer.rooms + ' комнатах';
var checkinTime = 'Заезд после ' + arrAdverts[0].offer.checkin + ', выезд до ' + arrAdverts[0].offer.checkout;

lodgeTemplate.querySelector('.lodge__title').textContent = arrAdverts[0].offer.title;
lodgeTemplate.querySelector('.lodge__address').textContent = arrAdverts[0].offer.address;
lodgeTemplate.querySelector('.lodge__price').innerHTML = arrAdverts[0].offer.price + ' &#x20bd;/ночь';
lodgeTemplate.querySelector('.lodge__type').textContent = getRusLodgeType(arrAdverts[0].offer.type);
lodgeTemplate.querySelector('.lodge__rooms-and-guests').textContent = roomsAndGuests;
lodgeTemplate.querySelector('.lodge__checkin-time').textContent = checkinTime;
lodgeTemplate.querySelector('.lodge__features').appendChild(fragmentSpansWithFetures);
lodgeTemplate.querySelector('.lodge__description').textContent = arrAdverts[0].offer.description;
document.getElementById('offer-dialog').replaceChild(lodgeTemplate, dialogPanel);
document.querySelector('.dialog__title').firstChild.src = arrAdverts[0].author.avatar;

var pinList = document.querySelectorAll('.pin')
