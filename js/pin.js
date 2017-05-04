/* eslint-disable no-unused-vars,no-undef */
'use strict';

var modulePin = (function (module) {

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

  for (var a3 = 0; a3 < module.adverts.length; a3++) {
    fragmentMarkers.appendChild(getMarker(a3));
  }
  tokioMap.appendChild(fragmentMarkers);

  return {
    removePinActive: removePinActive,
    getMarker: getMarker,
    closeDialog: closeDialog,
    escapeCloseDialog: escapeCloseDialog
  };

})(moduleDat);
