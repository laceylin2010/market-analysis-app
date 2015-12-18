var allProducts=[];
var data;
var productName = ['bag','banana','boots','chair','cthulhu','dragon','pen','scissors','shark','sweep','unicorn','usb','water_can','wine_glass'];
function Product (imageName, filePath) {
  this.imageName = imageName;
  this.filePath = filePath;
  this.tally = 0;
  this.views = 0;
  allProducts.push(this);
  data.labels.push(imageName);
  data.datasets[0].data.push(0);
}
function buildAlbum() {
  for (var i = 0; i<productName.length; i++){
    new Product(productName[i], 'imgs/' + productName[i] + '.jpg');
  }
  localStorage.setItem('allProducts', JSON.stringify(allProducts));
}
var resultsEl = document.getElementById('results');

var productRank = {
  totalClicks: 0,
  leftObj: null,
  middleObj: null,
  rightObj: null,

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
  tallyClicks: function(elId) {
    for(var i in allProducts){
      if(allProducts[i].imageName === elId) {
        allProducts[i].tally +=1;
        this.totalClicks +=1;
        data.datasets[0].data[i] = allProducts[i].tally;
      }
    }
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
    localStorage.setItem('data', JSON.stringify(data));
  },

  showResults: function(){
    if (this.totalClicks % 15 === 0) {
      this.resultsEl.hidden = false;
    }else {
      this.resultsEl.hidden = true;
    }
  }
};
if(localStorage.data && localStorage.allProducts){
  allProducts = JSON.parse(localStorage.getItem('allProducts'));
  data = JSON.parse(localStorage.getItem('data'));
} else {
  data = {
    labels: [],
    datasets: [
      {
        label: 'My First dataset',
        fillColor: '#2E2A26',
        strokeColor: 'black',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        data: [],
      },
    ]
  };
  buildAlbum();
}

productRank.leftEl.addEventListener('click', function(){
  productRank.tallyClicks(productRank.leftEl.id);
  productRank.displayImages();
  productRank.showResults();
});

productRank.middleEl.addEventListener('click', function(){
  productRank.tallyClicks(productRank.middleEl.id);
  productRank.displayImages();
  productRank.showResults();
});

productRank.rightEl.addEventListener('click', function(){
  productRank.tallyClicks(productRank.rightEl.id);
  productRank.displayImages();
  productRank.showResults();
});
productRank.displayImages();

var refresh = document.getElementById('refresh');

resultsEl.addEventListener('click', function(){
  refresh.hidden = false;
  voteTable();
});

refresh.addEventListener('click', function(){
  window.location.reload();
});
function voteTable(){
  var catalogVotesEl = document.getElementById('votes');
  var context = document.getElementById('popularity').getContext('2d');
  var barChart= new Chart(context).Bar(data);
}
