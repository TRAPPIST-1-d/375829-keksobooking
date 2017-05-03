'use strict';
window.card = (function () {

  var dialog = document.getElementById('offer-dialog');
  var dialogCross = document.querySelector('.dialog__close');

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

  function escapeCloseDialog(evt) {
    if (evt.keyCode === 27) {
      closeDialog();
    }
  }

  function closeDialog() {
    dialog.style.display = 'none'; // block покажет
    window.pin.removePinActive();
    document.removeEventListener('keydown', escapeCloseDialog);
  }

  function createDialogPanel(number) {
    var lodgeTemplateClone = document.querySelector('#lodge-template').cloneNode(true);
    var lodgeTemplate = lodgeTemplateClone.content;
    var dialogPanel = document.getElementById('offer-dialog').querySelector('.dialog__panel');
    var roomsAndGuests = 'Для ' + window.arrAdverts[number].offer.guests + ' гостей в ' + window.arrAdverts[number].offer.rooms + ' комнатах';
    var checkinTime = 'Заезд после ' + window.arrAdverts[number].offer.checkin + ', выезд до ' + window.arrAdverts[number].offer.checkout;
    var fragmentSpansWithFetures = document.createDocumentFragment();

    function getSpanWithFeature(orderInFeatureArr) {
      var spanWithFeature = document.createElement('span');
      spanWithFeature.setAttribute('class', 'feature__image feature__image--' + window.arrAdverts[number].offer.features[orderInFeatureArr]);
      return spanWithFeature;
    }

    for (var a4 = 0; a4 < window.arrAdverts[number].offer.features.length; a4++) {
      fragmentSpansWithFetures.appendChild(getSpanWithFeature(a4));
    }

    lodgeTemplate.querySelector('.lodge__title').textContent = window.arrAdverts[number].offer.title;
    lodgeTemplate.querySelector('.lodge__address').textContent = window.arrAdverts[number].offer.address;
    lodgeTemplate.querySelector('.lodge__price').innerHTML = window.arrAdverts[number].offer.price + ' &#x20bd;/ночь';
    lodgeTemplate.querySelector('.lodge__type').textContent = getRusLodgeType(window.arrAdverts[number].offer.type);
    lodgeTemplate.querySelector('.lodge__rooms-and-guests').textContent = roomsAndGuests;
    lodgeTemplate.querySelector('.lodge__checkin-time').textContent = checkinTime;
    lodgeTemplate.querySelector('.lodge__features').appendChild(fragmentSpansWithFetures);
    lodgeTemplate.querySelector('.lodge__description').textContent = window.arrAdverts[number].offer.description;

    document.querySelector('.dialog__title').firstChild.src = window.arrAdverts[number].author.avatar;
    document.getElementById('offer-dialog').replaceChild(lodgeTemplate, dialogPanel);
    document.addEventListener('keydown', escapeCloseDialog);
    dialogCross.addEventListener('click', function () {
      closeDialog();
    });
    dialog.style.display = 'block';
  }
  return {
    createDialogPanel: createDialogPanel,
    closeDialog: closeDialog
  };

})();
