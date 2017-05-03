/* eslint-disable no-undef,no-unused-vars */
'use strict';

var moduleMap = (function (module1, module2) {

  var dialogCross = document.querySelector('.dialog__close');

  module1.createDialogPanel(0);

  dialogCross.addEventListener('click', function () {
    module2.closeDialog();
  });

})(moduleCard, modulePin);
