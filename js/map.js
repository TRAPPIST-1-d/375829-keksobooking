/* eslint-disable no-undef,no-unused-vars */
'use strict';

var moduleMap = (function (module1, module2, module3) {
  var dialog = document.getElementById('offer-dialog');
  var dialogCross = document.querySelector('.dialog__close');
  var tokioMap = document.querySelector('.tokyo__pin-map');

  var pastDialogPanel = function (num) {
    var dialogPanel = document.getElementById('offer-dialog').querySelector('.dialog__panel');

    document.querySelector('.dialog__title').firstChild.src = module3.adverts[num].author.avatar;
    document.getElementById('offer-dialog').replaceChild(module1.createDialogPanel(num), dialogPanel);
    dialog.style.display = 'block';
  };

  function findObject(urlSting) {
    for (var a5 = 0; a5 < module3.adverts.length; a5++) {
      if (urlSting.indexOf(module3.adverts[a5].author.avatar) !== -1) {
        return a5;
      }
    }
    return 0;
  }

  function switchTargetedPin(evt) {
    var clickedPin = evt.target;
    module2.removePinActive();
    if (clickedPin.parentElement.classList.contains('pin')) {
      clickedPin.parentElement.classList.add('pin--active');
      pastDialogPanel(findObject(clickedPin.src));
      return;
    }
    if (clickedPin.classList.contains('pin')) {
      clickedPin.classList.add('pin--active');
      pastDialogPanel(findObject(clickedPin.firstChild.src));
    }
  }

  pastDialogPanel(0);

  tokioMap.addEventListener('click', switchTargetedPin);

  tokioMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      switchTargetedPin(evt);
    }
  });

  document.addEventListener('keydown', module2.escapeCloseDialog);

  dialogCross.addEventListener('click', function () {
    module2.closeDialog();
  });

})(moduleCard, modulePin, moduleDat);
