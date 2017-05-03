'use strict';

window.pin = (function () {

  var tokioMap = document.querySelector('.tokyo__pin-map');
//  var fragmentMarkers = document.createDocumentFragment();

  function getMarker(orderInArr) {
    var markerDOMElement = document.createElement('div');
    var location = 'left: ' + (window.arrAdverts[orderInArr].location.x - 28) + 'px; top: ' + (window.arrAdverts[orderInArr].location.y - 75) + 'px';
    markerDOMElement.setAttribute('class', 'pin');
    markerDOMElement.setAttribute('tabindex', '0');
    markerDOMElement.setAttribute('style', location);
    var image = document.createElement('img');
    image.setAttribute('src', window.arrAdverts[orderInArr].author.avatar);
    image.setAttribute('class', 'rounded');
    image.setAttribute('width', '40');
    image.setAttribute('height', '40');
    markerDOMElement.appendChild(image);
    return markerDOMElement;
  }

  function findObject(urlSting) {
    for (var a5 = 0; a5 < window.arrAdverts.length; a5++) {
      if (urlSting.indexOf(window.arrAdverts[a5].author.avatar) !== -1) {
        return a5;
      }
    }
    return 0;
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
      window.card.createDialogPanel(findObject(clickedPin.src));
      return;
    }
    if (clickedPin.classList.contains('pin')) {
      clickedPin.classList.add('pin--active');
      window.card.createDialogPanel(findObject(clickedPin.firstChild.src));
    }
  }

 // for (var a3 = 0; a3 < window.arrAdverts.length; a3++) {
 //   fragmentMarkers.appendChild(getMarker(a3));
 // }
 // tokioMap.appendChild(fragmentMarkers);

  tokioMap.addEventListener('click', switchTargetedPin);

  tokioMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      switchTargetedPin(evt);
    }
  });

  return {
    removePinActive: removePinActive,
    getMarker: getMarker
  };

})();
