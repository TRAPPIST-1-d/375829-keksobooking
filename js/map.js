'use strict';
var arrAdverts = [];
var dialogCross = document.querySelector('.dialog__close');
var fragmentMarkers = document.createDocumentFragment();
var tokioMap = document.querySelector('.tokyo__pin-map');

for (var a2 = 0; arrAdverts.length < 8; a2++) {
  arrAdverts.push(window.dat.getAdvert(arrAdverts));
}

for (var a3 = 0; a3 < arrAdverts.length; a3++) {
  fragmentMarkers.appendChild(window.pin.getMarker(a3));
}
tokioMap.appendChild(fragmentMarkers);

window.card.createDialogPanel(0);

dialogCross.addEventListener('click', function () {
  window.card.closeDialog();
});
