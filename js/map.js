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


function getMarker(orderInArr) {
  var markerDOMElement = document.createElement('div');
  var location = 'left: ' + (arrAdverts[orderInArr].location.x - 28) + 'px; top: ' + (arrAdverts[orderInArr].location.y - 75) + 'px';
  markerDOMElement.setAttribute('class', 'pin');
  markerDOMElement.setAttribute('tabindex', '0');
  markerDOMElement.setAttribute('style', location);
  var image = document.createElement('img');
  image.setAttribute('src', arrAdverts[orderInArr].author.avatar);
  image.setAttribute('class', 'rounded');
  image.setAttribute('width', '40');
  image.setAttribute('height', '40');
  markerDOMElement.appendChild(image);
  return markerDOMElement;
}

function removePinActive() {
  var activated = tokioMap.querySelector('.pin--active');
  if (activated !== null) {
    activated.classList.remove('pin--active');
  }
}

function closeDialog() {
  dialog.style.display = 'none'; // block покажет
  removePinActive();
  document.removeEventListener('keydown', escapeCloseDialog);
}

function findObject(urlSting) {
  for (var a5 = 0; a5 < arrAdverts.length; a5++) {
    if (urlSting.indexOf(arrAdverts[a5].author.avatar) !== -1) {
      return a5;
    }
  }
  return 0;
}

function escapeCloseDialog(evt) {
  if (evt.keyCode === 27) {
    closeDialog();
  }
}

function createDialogPanel(number) {
  var lodgeTemplateClone = document.querySelector('#lodge-template').cloneNode(true);
  var lodgeTemplate = lodgeTemplateClone.content;
  var dialogPanel = document.getElementById('offer-dialog').querySelector('.dialog__panel');
  var roomsAndGuests = 'Для ' + arrAdverts[number].offer.guests + ' гостей в ' + arrAdverts[number].offer.rooms + ' комнатах';
  var checkinTime = 'Заезд после ' + arrAdverts[number].offer.checkin + ', выезд до ' + arrAdverts[number].offer.checkout;
  var fragmentSpansWithFetures = document.createDocumentFragment();

  function getSpanWithFeature(orderInFeatureArr) {
    var spanWithFeature = document.createElement('span');
    spanWithFeature.setAttribute('class', 'feature__image feature__image--' + arrAdverts[number].offer.features[orderInFeatureArr]);
    return spanWithFeature;
  }

  for (var a4 = 0; a4 < arrAdverts[number].offer.features.length; a4++) {
    fragmentSpansWithFetures.appendChild(getSpanWithFeature(a4));
  }

  lodgeTemplate.querySelector('.lodge__title').textContent = arrAdverts[number].offer.title;
  lodgeTemplate.querySelector('.lodge__address').textContent = arrAdverts[number].offer.address;
  lodgeTemplate.querySelector('.lodge__price').innerHTML = arrAdverts[number].offer.price + ' &#x20bd;/ночь';
  lodgeTemplate.querySelector('.lodge__type').textContent = getRusLodgeType(arrAdverts[number].offer.type);
  lodgeTemplate.querySelector('.lodge__rooms-and-guests').textContent = roomsAndGuests;
  lodgeTemplate.querySelector('.lodge__checkin-time').textContent = checkinTime;
  lodgeTemplate.querySelector('.lodge__features').appendChild(fragmentSpansWithFetures);
  lodgeTemplate.querySelector('.lodge__description').textContent = arrAdverts[number].offer.description;

  document.querySelector('.dialog__title').firstChild.src = arrAdverts[number].author.avatar;
  document.getElementById('offer-dialog').replaceChild(lodgeTemplate, dialogPanel);
  document.addEventListener('keydown', escapeCloseDialog);
  dialog.style.display = 'block';
}

function switchTargetedPin(evt) {
  var clickedPin = evt.target;
  removePinActive();
  if (clickedPin.parentElement.classList.contains('pin')) {
    clickedPin.parentElement.classList.add('pin--active');
    createDialogPanel(findObject(clickedPin.src));
    return;
  }
  if (clickedPin.classList.contains('pin')) {
    clickedPin.classList.add('pin--active');
    createDialogPanel(findObject(clickedPin.firstChild.src));
  }
}

var arrAdverts = [];
var fragmentMarkers = document.createDocumentFragment();
var tokioMap = document.querySelector('.tokyo__pin-map');
var dialog = document.getElementById('offer-dialog');
var dialogCross = document.querySelector('.dialog__close');
var inputForm = document.body.querySelector('.notice__form');
var newTitle = document.getElementById('title');
var newType = document.getElementById('type');
var newPrice = document.getElementById('price');
var newRoomNum = document.getElementById('room_number');
var newCapacity = document.getElementById('capacity');
var newTimeIn = document.getElementById('time');
var newTimeOut = document.getElementById('timeout');
var submitButton = inputForm.querySelector('.form__submit');

for (var a2 = 0; arrAdverts.length < 8; a2++) {
  arrAdverts.push(getAdvert());
}

for (var a3 = 0; a3 < arrAdverts.length; a3++) {
  fragmentMarkers.appendChild(getMarker(a3));
}
tokioMap.appendChild(fragmentMarkers);

createDialogPanel(0);

tokioMap.addEventListener('click', switchTargetedPin);

tokioMap.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    switchTargetedPin(evt);
  }
});

dialogCross.addEventListener('click', function () {
  closeDialog();
});

inputForm.addEventListener('change', function (evt) {
  if (evt.target === newTimeIn) {
    switch (newTimeIn.value) {
      case '1':
        newTimeOut.value = '1';
        return;
      case '2':
        newTimeOut.value = '2';
        return;
      case '3':
        newTimeOut.value = '3';
        return;
    }
  }
  if (evt.target === newTimeOut) {
    switch (newTimeOut.value) {
      case '1':
        newTimeIn.value = '1';
        return;
      case '2':
        newTimeIn.value = '2';
        return;
      case '3':
        newTimeIn.value = '3';
        return;
    }
  }
  if (evt.target === newType) {
    switch (newType.value) {
      case '2':
        newPrice.min = 0;
        return;
      case '1':
        newPrice.min = 1000;
        return;
      case '3':
        newPrice.min = 10000;
        return;
    }
  }
  if (evt.target === newRoomNum) {
    switch (newRoomNum.value) {
      case '2':
        newCapacity.value = '1';
        return;
      case '3':
        newCapacity.value = '1';
        return;
      case '1':
        newCapacity.value = '2';
        return;
    }
  }
  if (evt.target === newCapacity) {
    switch (newCapacity.value) {
      case '2':
        newRoomNum.value = '1';
        return;
      case '1':
        newRoomNum.value = '2';
        return;
    }
  }
});

inputForm.addEventListener('submit', function (evt) {
  if (newTitle.checkValidity() !== true) {
    newTitle.style.border = '2px solid red';
  } else {
    newTitle.style.border = '';
  }
  if (newPrice.checkValidity() !== true) {
    newPrice.style.border = '2px solid red';
  } else {
    newPrice.style.border = '';
  }
});

