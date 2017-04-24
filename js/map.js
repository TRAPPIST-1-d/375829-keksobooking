'use strict';
var arrAdvertObjects = [];
var arrOfferTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var arrOfferType = [
  'flat',
  'house',
  'bungalo'
];
var arrOfferCheckInOut = [
  '12:00',
  '13:00',
  '14:00'
];
var arrAllOfferFeatures = [
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
  var elemExist = false;
  for (var a = 0; a < array.length; a++) {
    if (array[a] === element) {
      elemExist = true;
    }
  }
  return elemExist;
}
function getArrObjectOfferFeatures() {
  var arrObjectOfferFeatures = [];
  var lenghtArrObjectOfferFeatures = getRandomMinMax(0, arrAllOfferFeatures.length);
  var elementToAdd;
  while (arrObjectOfferFeatures.length < lenghtArrObjectOfferFeatures) {
    elementToAdd = arrAllOfferFeatures[getRandomMinMax(0, (arrAllOfferFeatures.length - 1))];
    if (elementAlreadyInArray(arrObjectOfferFeatures, elementToAdd) !== true) {
      arrObjectOfferFeatures[arrObjectOfferFeatures.length] = elementToAdd;
    }
  }
  return arrObjectOfferFeatures;
}
function getAdvertObject() {
  var randomLocationX = getRandomMinMax(300, 900);
  var randomLocationY = getRandomMinMax(100, 500);
  var AdvertObject;
  AdvertObject = {
    author: {
      avatar: 'img/avatars/user0' + (arrAdvertObjects.length + 1) + '.png'
    },
    offer: {
      title: arrOfferTitle[arrAdvertObjects.length],
      address: '{{' + randomLocationX + '}}, {{' + randomLocationY + '}}',
      price: getRandomMinMax(1000, 1000000),
      type: arrOfferType[getRandomMinMax(0, (arrOfferType.length - 1))],
      rooms: getRandomMinMax(1, 5),
      guests: getRandomMinMax(1, 15000),
      checkin: arrOfferCheckInOut[getRandomMinMax(0, (arrOfferCheckInOut.length - 1))],
      checkout: arrOfferCheckInOut[getRandomMinMax(0, (arrOfferCheckInOut.length - 1))],
      features: getArrObjectOfferFeatures(),
      description: '',
      photos: []
    },
    location: {
      x: randomLocationX,
      y: randomLocationY
    }
  };
  return AdvertObject;
}
while (arrAdvertObjects.length < 8) {
  arrAdvertObjects[arrAdvertObjects.length] = getAdvertObject();
}
function getMarkerDOMElement(orderInArr) {
  var markerDOMElement = document.createElement('div');
  markerDOMElement.setAttribute('class', 'pin');
  markerDOMElement.setAttribute('style', 'left: ' + arrAdvertObjects[orderInArr].location.x + 'px; top: ' + (arrAdvertObjects[orderInArr].location.y) + 'px');
  var image = document.createElement('img');
  image.setAttribute('src', arrAdvertObjects[orderInArr].author.avatar);
  image.setAttribute('class', 'rounded');
  image.setAttribute('width', '40');
  image.setAttribute('height', '40');
  markerDOMElement.appendChild(image);
  return markerDOMElement;
}
var fragmentMarkersDOMElems = document.createDocumentFragment();
for (var a2 = 0; a2 < arrAdvertObjects.length; a2++) {
  fragmentMarkersDOMElems.appendChild(getMarkerDOMElement(a2));
}
document.querySelector('.tokyo__pin-map').appendChild(fragmentMarkersDOMElems);
//var lodgeTemplate = document.querySelector('#lodge-template');
//lodgeTemplate.querySelector('.lodge__title').textContent = arrAdvertObjects[0].offer.title;
//lodgeTemplate.querySelector('lodge__address').textContent = arrAdvertObjects[0].offer.address;
//lodgeTemplate.querySelector('lodge__price').textContent = arrAdvertObjects[0].offer.price + '&#x20bd;/ночь';
//lodgeTemplate.querySelector('lodge__type').textContent =
