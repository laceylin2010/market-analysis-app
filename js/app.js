var allProducts=[];
var productName = ['bag','banana','boots','chair','cthulhu','dragon','pen','scissors','shark','sweep','unicorn','usb','water_can','wine_glass'];

var resultsEl = document.getElementById('results');

function Product (imageName, filePath) {
  this.totalClicks = 0;
  this.imageName = imageName;
  this.filePath = filePath;
  this.tally = 0;
  this.views = 0;
  allProducts.push(this);
}

(function buildAlbum() {
  for (var i = 0; i<productName.length; i++){
    new Product(productName[i], 'imgs/' + productName[i] + '.jpg');
  }

})();


var productRank = {
  leftObj: null,
  middleObj: null,
  rightObj: null,

  leftEl: document.getElementById('img1'),
  middleEl: document.getElementById('img2'),
  rightEl: document.getElementById('img3'),

  getRandomIndex: function() {
    return Math.floor(Math.random() * productName.length);
  },
  displayImages: function() {
    productRank.leftObj = allProducts[productRank.getRandomIndex()];
    productRank.middleObj = allProducts[productRank.getRandomIndex()];
    productRank.rightObj = allProducts[productRank.getRandomIndex()];

    if (productRank.leftObj === productRank.middleObj || productRank.leftObj === productRank.rightObj || productRank.rightObj === productRank.middleObj){
      productRank.displayImages();
    }

    productRank.leftEl.src = productRank.leftObj.filePath;
    productRank.leftEl.id = productRank.leftObj.imageName;

    productRank.middleEl.src = productRank.middleObj.filePath;
    productRank.middleEl.id = productRank.middleObj.imageName;

    productRank.rightEl.src = productRank.rightObj.filePath;
    productRank.rightEl.id = productRank.rightObj.imageName;

  },
  showResults: function(){
    if (this.totalClicks % 15 ===0) {

      this.resultsEl.hidden = false;
    }
  }
};

productRank.leftEl.addEventListener('click', function(){
  productRank.totalClicks +=1;
  productRank.leftObj.tally += 1;
  console.log(productRank.leftObj.imageName + ' has ' + productRank.leftObj.tally);
  productRank.displayImages();
  productRank.showResults();
});

productRank.middleEl.addEventListener('click', function(){
  productRank.totalClicks +=1;
  productRank.middleObj.tally += 1;
  console.log(productRank.middleObj.imageName + ' has ' + productRank.middleObj.tally);
  productRank.displayImages();
  productRank.showResults();
});

productRank.rightEl.addEventListener('click', function(){
  productRank.totalClicks +=1;
  productRank.rightObj.tally += 1;
  console.log(productRank.rightObj.imageName + ' has ' + productRank.rightObj.tally);
  productRank.displayImages();
  productRank.showResults();
});

productRank.leftEl.addEventListener('click', productRank.displayImages);
productRank.middleEl.addEventListener('click', productRank.displayImages);
productRank.rightEl.addEventListener('click', productRank.displayImages);



resultsEl.addEventListener('click', function(event){
  var catalogVotesEl = document.getElementById('votes');
  var tbEl = document.createElement('table');
  for(var i=0; i<allProducts.length; i++){
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent= allProducts[i];
  trEl.appendChild(tdEl);
  tbEl.appendChild(trEl);
  catalogVotesEl.appendChild(tbEl);

    }
  }
);


//   thEl.textContent = 'Name of Image';
//   trEl.appendChild(thEl);
//   totalEl.textContent = 'Total';
//   trEl.appendChild(totalEl);
//   for(var i = 0; i<productName.length; i++){
//     var tvCurrent = document.createElement('tv');
//     tvCurrent.textContent = productName[i];
//     trEl.appendChild(tvCurrent);
//   };
//   tbEl.appendChild(trEl);
//   catalogVotesEl.appendChild(tbEl);

productRank.displayImages();
productRank.showResults();
