var arrAdvertObjects = [];
function getAdvertObject() {
  var AdvertObject;
  var arrOfferTitle = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде',
  ];
  AdvertObject = {
    author: {
      avatar: 'img/avatars/user{{0' + (arrAdvertObjects.length + 1) + '}}.png'
    },
    offer: {
      title: arrOfferTitle[arrAdvertObjects.length],
      address: '{{' + location.x +'}}, {{' + location.y + '}}',
      price:
    }
  };
}
