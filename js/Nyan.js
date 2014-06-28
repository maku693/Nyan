var Nyan = Nyan || {};

Nyan.colors = [
  'f00',
  'f90',
  'ff0',
  '3f0',
  '09f',
  '63f'
];

Nyan.app = function(listViewQuery) {
  this.loadNyanCount();

  var defaultHTML = '<div class="items"></div><li class="add-item">+</li><li class="remove-all-items">Nyan count: <span class="nyan--count"></span></li>';

  this.listViewElem = document.querySelector(listViewQuery);
  this.listViewElem.innerHTML = defaultHTML;

  var listItemsWrapperElemQuery = listViewQuery + '>.items';
  var addItemElemQuery          = listViewQuery + ' .add-item';
  var removeAllItemsElemQuery   = listViewQuery + ' .remove-all-items';
  var listItemsCountElemQuery   = removeAllItemsElemQuery + ' .nyan--count';

  this.listItemsWrapperElem = document.querySelector(listItemsWrapperElemQuery);
  this.addItemElem          = document.querySelector(addItemElemQuery);
  this.removeAllItemsElem   = document.querySelector(removeAllItemsElemQuery);
  this.listItemsCountElem   = document.querySelector(listItemsCountElemQuery);

  if (this.nyanCount){
    for (var i = 0; i < this.nyanCount; i++) {
      var bgColor = '#' + Nyan.colors[i%6];
      this.addItem(bgColor);
    }
  }

  this.addItemElem.addEventListener('click', function(){
    var bgColor = '#' + this.colors[this.nyanCount % 6];
    this.nyanCount++;
    this.addItem(bgColor);
    this.storeNyanCount();
    this.updateCountView();
  }.bind(this));

  this.removeAllItemsElem.addEventListener('click', function(){
    if(this.nyanCount && window.confirm('Remove all Nyans?')){
      window.localStorage.clear();
      this.nyanCount = 0;
      this.listItemsWrapperElem.innerHTML='';
      this.storeNyanCount();
      this.updateCountView();
    }
  }.bind(this));

  this.updateCountView();
};

Nyan.loadNyanCount = function() {
  var nyanCountObj = window.localStorage.getItem('nyanCount');
  console.log(nyanCountObj);
  if (nyanCountObj) {
    this.nyanCount = 0;
    this.nyanCount = nyanCountObj;
    console.log(this.nyanCount);
  } else {
    this.nyanCount = 0;
  }
};

Nyan.storeNyanCount = function() {
  window.localStorage.removeItem('nyanCount');
  window.localStorage.setItem('nyanCount', this.nyanCount);
};

Nyan.addItem = function(bgColor) {
  var liElem = document.createElement('li');
  liElem.style.background = bgColor + ' url(/img/nyan.gif)';
  liElem.style.backgroundPosition = 'center center';
  liElem.style.backgroundRepeat = 'no-repeat';
  this.listItemsWrapperElem.appendChild(liElem);
};

Nyan.updateCountView = function() {
  this.listItemsCountElem.innerHTML = this.nyanCount;
};
