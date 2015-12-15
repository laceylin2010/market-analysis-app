var allProducts=[];
var productName = ['bag','banana','boots','chair','cthulhu','dragon','pen','scissors','shark','sweep','unicorn','usb','water_can','wine_glass'];

var resultsEl = document.getElementById('results');

function Product (imageName, filePath) {
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
  totalClicks: 0,


  resultsEl: document.getElementById('results'),
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
    console.log("productRank.totalClicks is: " + productRank.totalClicks);
    console.log("productRank.resultsEl.hidden" + productRank.resultsEl.hidden);

    if (this.totalClicks % 15 === 0) {
      this.resultsEl.hidden = false;

      console.log("productRank.resultsEl.hidden" + productRank.resultsEl.hidden);
    }else {
        this.resultsEl.hidden = true;
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

  function voteTable(){
  var catalogVotesEl = document.getElementById('votes');
  var tbEl = document.createElement('table');

    for(var i=0; i<allProducts.length; i++){
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent= allProducts[i].imageName;
  trEl.appendChild(tdEl);
  tbEl.appendChild(trEl);
  catalogVotesEl.appendChild(tbEl);
  var tdEl = document.createElement('td');
  tdEl.textContent = allProducts[i].tally;
  trEl.appendChild(tdEl);
  tbEl.appendChild(trEl);
  catalogVotesEl.appendChild(tbEl);
};
  };

productRank.displayImages();
productRank.resultsEl.addEventListener('click', function(){
voteTable();
});
