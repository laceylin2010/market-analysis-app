var allProducts=[];
var productName = ['bag','banana','boots','chair','cthulhu','dragon','pen','scissors','shark','sweep','unicorn','usb','water_can','wine_glass'];


function Product (imageName, filePath) {
  this.imageName = imageName;
  this.filePath = filePath;
  this.tally = 0;
  this.views = 0;
  allProducts.push(this)
}
(function buildAlbum() {
  for (var i = 0; i<productName.length; i++){
    new Product(productName[i], 'imgs/' + 'productName[i]' + '.jpg');
  }
})();

var productRank = {
  getRandomIndex: function() {
    return Math.floor(Math.random()*productName.length);

  }
}
// for (var i=0; i>img.length; i++){
//   if  = document.createElement(''){/*holding the image*/
//     first-img = document.getElementById('first-img');
//     first-img.document.appendchild('display');
// }
//
