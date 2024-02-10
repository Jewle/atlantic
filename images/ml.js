function ML(langs, forceLang, defaultLang) {
  this.langs = {}

  for (_key in langs) {
    var isMultiLangDictionary = _key.indexOf('_') > -1 ? true : false;
    
    if (isMultiLangDictionary) {
      var innerKeys = _key.split('_');

      innerKeys.forEach(function (_innerKey) {
        this.langs[_innerKey] = langs[_key]
      }, this);
    } else {
      this.langs[_key] = langs[_key]
    }
  }


  this.defaultLang = defaultLang || null;
  this.forceLang = forceLang || null;
  this.targetLang = this.__getUserLang();
}

ML.prototype.__getUserLang = function() {
  if (this.forceLang) return this.langs[this.forceLang];

  var langBrowser = navigator.language || (navigator.languages && navigator.languages[0]);
  
  var langObj = this.langs[langBrowser];
  if (langObj == undefined && langBrowser && langBrowser.length > 0) {
    var parsedLang = langBrowser.slice(0, 2);
    if (this.langs[parsedLang]) {
      langObj = this.langs[parsedLang];
    } else {
      langObj = this.langs[this.defaultLang];
    }
  }
  return langObj;
}

ML.prototype.getLocalisedStringFor = function(stringName) {
  if (!this.targetLang) return '';
  var localisedString = this.targetLang[stringName] || '';
  return localisedString;
}

ML.prototype.localizeElementsBySelectors = function(dictionary) {
  for (key in dictionary) {
    var keyElementsSet = document.querySelectorAll(key);

    if (keyElementsSet.length) {
      for (i = 0; i < keyElementsSet.length; i++) {
        console.log(this.targetLang[dictionary[key]], keyElementsSet[i])
        keyElementsSet[i].innerHTML = this.targetLang[dictionary[key]];
      }
    }
  }
}