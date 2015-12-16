var allProducts=[];
var productName = ['bag','banana','boots','chair','cthulhu','dragon','pen','scissors','shark','sweep','unicorn','usb','water_can','wine_glass'];


var data = {
  // labels and datasets are two properties in the data object
  // datasets is only one object with one index. the index being 0. and inside are objects inside the index
  // to reach stroke color for example: data.datasets[0].strokeColor
    labels: [],
    datasets: [
        {
            label: "My First dataset",
            fillColor: '#3D93FF',
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []

        },
    ]
};


/*functional Javascript*/

var resultsEl = document.getElementById('results');


function Product (imageName, filePath) {
  this.imageName = imageName;
  this.filePath = filePath;
  this.tally = 0;
  this.views = 0;
  allProducts.push(this);
  data.labels.push(imageName);
  data.datasets[0].data.push(0);

}

(function buildAlbum() {
  for (var i = 0; i<productName.length; i++){
    new Product(productName[i], 'imgs/' + productName[i] + '.jpg');
  }

})();

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
    // productRank.leftEl.id is being assigned the element of productRank.leftobj.imageName

    productRank.middleEl.src = productRank.middleObj.filePath;
    productRank.middleEl.id = productRank.middleObj.imageName;

    productRank.rightEl.src = productRank.rightObj.filePath;
    productRank.rightEl.id = productRank.rightObj.imageName;

  },

  tallyClicks: function(elId) {
    for(var i in allProducts){
      if(allProducts[i].imageName === elId) {
        // if u get all the images names at each index for all products, make absolute equal to all products on each index.
        allProducts[i].tally +=1;
        this.totalClicks +=1;
        console.log(allProducts[i].imageName + ' has ' + allProducts[i].tally);
        data.datasets[0].data[i] = allProducts[i].tally;
      }
    }
  },

  showResults: function(){
    if (this.totalClicks % 15 === 0) {
      this.resultsEl.hidden = false;

    }else {
        this.resultsEl.hidden = true;
      }
    }
  };


productRank.leftEl.addEventListener('click', function(){
  productRank.tallyClicks(productRank.leftEl.id);
  // leftEl.id is calling productRank.leftobj.imagename
  productRank.displayImages();
  productRank.showResults();
});

productRank.middleEl.addEventListener('click', function(){
  // productRank.totalClicks +=1;
  // productRank.leftObj.tally += 1; this is replaced in the tallyClicks function.
  productRank.tallyClicks(productRank.middleEl.id);
  // product rank is the variable and tally clicks is inside that variable to call the function. to specify the function to affect the middle image we need to get the element for it by calling the Id
  productRank.displayImages();
  productRank.showResults();
});

productRank.rightEl.addEventListener('click', function(){
  productRank.tallyClicks(productRank.rightEl.id);
  productRank.displayImages();
  productRank.showResults();
});

productRank.leftEl.addEventListener('click', productRank.displayImages);
productRank.middleEl.addEventListener('click', productRank.displayImages);
productRank.rightEl.addEventListener('click', productRank.displayImages);

  function voteTable(){
  var catalogVotesEl = document.getElementById('votes');
  var tbEl = document.createElement('table');

  //   for(var i=0; i<allProducts.length; i++){
  // var trEl = document.createElement('tr');
  // var tdEl = document.createElement('td');
  // tdEl.textContent= allProducts[i].imageName;
  // trEl.appendChild(tdEl);
  // tbEl.appendChild(trEl);
  // catalogVotesEl.appendChild(tbEl);
  // var tdEl = document.createElement('td');
  // tdEl.textContent = allProducts[i].tally;
  // trEl.appendChild(tdEl);
  // tbEl.appendChild(trEl);
  // catalogVotesEl.appendChild(tbEl);

  var context = document.getElementById('popularity').getContext('2d');
  var barChart= new Chart(context).Bar(data);
}
  // };



productRank.displayImages();
productRank.resultsEl.addEventListener('click', function(){
refresh.hidden=false;

voteTable();
});

refresh.addEventListener('click', function(){
  window.location.reload()
})
