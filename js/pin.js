/* eslint-disable no-unused-vars,no-undef */
'use strict';

var modulePin = (function (module, module2) {

  var dialogCross = document.querySelector('.dialog__close');
  var fragmentMarkers = document.createDocumentFragment();
  var tokioMap = document.querySelector('.tokyo__pin-map');
  var dialog = document.getElementById('offer-dialog');

  function getMarker(orderInArr) {
    var markerDOMElement = document.createElement('div');
    var location = 'left: ' + (module.adverts[orderInArr].location.x - 28) + 'px; top: ' + (module.adverts[orderInArr].location.y - 75) + 'px';
    markerDOMElement.setAttribute('class', 'pin');
    markerDOMElement.setAttribute('tabindex', '0');
    markerDOMElement.setAttribute('style', location);
    var image = document.createElement('img');
    image.setAttribute('src', module.adverts[orderInArr].author.avatar);
    image.setAttribute('class', 'rounded');
    image.setAttribute('width', '40');
    image.setAttribute('height', '40');
    markerDOMElement.appendChild(image);
    return markerDOMElement;
  }

  function findObject(urlSting) {
    for (var a5 = 0; a5 < module.adverts.length; a5++) {
      if (urlSting.indexOf(module.adverts[a5].author.avatar) !== -1) {
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

  function closeDialog() {
    dialog.style.display = 'none';
    removePinActive();
  }

  function removePinActive() {
    var activated = tokioMap.querySelector('.pin--active');
    if (activated !== null) {
      activated.classList.remove('pin--active');
    }
  }

  function switchTargetedPin(evt) {
    var clickedPin = evt.target;
    removePinActive();
    if (clickedPin.parentElement.classList.contains('pin')) {
      clickedPin.parentElement.classList.add('pin--active');
      module2.createDialogPanel(findObject(clickedPin.src));
      return;
    }
    if (clickedPin.classList.contains('pin')) {
      clickedPin.classList.add('pin--active');
      module2.createDialogPanel(findObject(clickedPin.firstChild.src));
    }
  }

  for (var a3 = 0; a3 < module.adverts.length; a3++) {
    fragmentMarkers.appendChild(getMarker(a3));
  }
  tokioMap.appendChild(fragmentMarkers);

  document.addEventListener('keydown', escapeCloseDialog);

  dialogCross.addEventListener('click', function () {
    closeDialog();
  });

  tokioMap.addEventListener('click', switchTargetedPin);

  tokioMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      switchTargetedPin(evt);
    }
  });

  return {
    removePinActive: removePinActive,
    getMarker: getMarker,
    closeDialog: closeDialog
  };

})(moduleDat, moduleCard);
