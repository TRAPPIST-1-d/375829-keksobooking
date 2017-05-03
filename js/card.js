'use strict';

var moduleCard = (function (module1) {

  var dialog = document.getElementById('offer-dialog');

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

  function createDialogPanel(number) {
    var lodgeTemplateClone = document.querySelector('#lodge-template').cloneNode(true);
    var lodgeTemplate = lodgeTemplateClone.content;
    var dialogPanel = document.getElementById('offer-dialog').querySelector('.dialog__panel');
    var roomsAndGuests = 'Для ' + module1.adverts[number].offer.guests + ' гостей в ' + module1.adverts[number].offer.rooms + ' комнатах';
    var checkinTime = 'Заезд после ' + module1.adverts[number].offer.checkin + ', выезд до ' + module1.adverts[number].offer.checkout;
    var fragmentSpansWithFetures = document.createDocumentFragment();

    function getSpanWithFeature(orderInFeatureArr) {
      var spanWithFeature = document.createElement('span');
      spanWithFeature.setAttribute('class', 'feature__image feature__image--' + module1.adverts[number].offer.features[orderInFeatureArr]);
      return spanWithFeature;
    }

    for (var a4 = 0; a4 < module1.adverts[number].offer.features.length; a4++) {
      fragmentSpansWithFetures.appendChild(getSpanWithFeature(a4));
    }

    lodgeTemplate.querySelector('.lodge__title').textContent = module1.adverts[number].offer.title;
    lodgeTemplate.querySelector('.lodge__address').textContent = module1.adverts[number].offer.address;
    lodgeTemplate.querySelector('.lodge__price').innerHTML = module1.adverts[number].offer.price + ' &#x20bd;/ночь';
    lodgeTemplate.querySelector('.lodge__type').textContent = getRusLodgeType(module1.adverts[number].offer.type);
    lodgeTemplate.querySelector('.lodge__rooms-and-guests').textContent = roomsAndGuests;
    lodgeTemplate.querySelector('.lodge__checkin-time').textContent = checkinTime;
    lodgeTemplate.querySelector('.lodge__features').appendChild(fragmentSpansWithFetures);
    lodgeTemplate.querySelector('.lodge__description').textContent = module1.adverts[number].offer.description;

    document.querySelector('.dialog__title').firstChild.src = module1.adverts[number].author.avatar;
    document.getElementById('offer-dialog').replaceChild(lodgeTemplate, dialogPanel);
    dialog.style.display = 'block';
  }

  return {
    createDialogPanel: createDialogPanel
  };

})(moduleDat);
