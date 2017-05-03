'use strict';

(function () {

  var inputForm = document.body.querySelector('.notice__form');
  var newTitle = document.getElementById('title');
  var newType = document.getElementById('type');
  var newPrice = document.getElementById('price');
  var newRoomNum = document.getElementById('room_number');
  var newCapacity = document.getElementById('capacity');
  var newTimeIn = document.getElementById('time');
  var newTimeOut = document.getElementById('timeout');
  var submitButton = inputForm.querySelector('.form__submit');


  inputForm.addEventListener('change', function (evt) {
    if (evt.target === newTimeIn) {
      newTimeOut.value = newTimeIn.value;
    }
    if (evt.target === newTimeOut) {
      newTimeIn.value = newTimeOut.value;
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

  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
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
    if (newTimeIn.value !== newTimeOut.value) {
      newTimeIn.style.border = '2px solid red';
      newTimeOut.style.border = '2px solid red';
    } else {
      newTimeIn.style.border = '';
      newTimeOut.style.border = '';
    }
  });
})();


