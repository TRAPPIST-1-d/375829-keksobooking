'use strict';

var dialogCross = document.querySelector('.dialog__close');

window.card.createDialogPanel(0);

dialogCross.addEventListener('click', function () {
  window.card.closeDialog();
});

