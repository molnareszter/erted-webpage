
var langs;
var language;
var dic;
var dics;
var keys;

function getLanguage() {
    (localStorage.getItem('language') == null) ? setLanguage('hu') : false;
    language = localStorage.getItem('language')
}

function getDics(data) {
      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
        keys = [];
		langs = [];
		dics = {};
//		console.log(data)
		$.each(data, function( index, row ) {
		  if(index == 0) {
			$.each(row, function( ind, colData ) {
				if (ind != 0) {
				    langs.push(colData);
				    dics[colData]={};
				}
			});
		  } else {
			$.each(row, function( ind, colData ) {
			    if (ind == 0) {
                    keys.push(colData);
                } else {
                    dics[langs[ind-1]][row[0]] = colData;
                }

			});
		  }
		});
//        console.log("langs", langs)
//        console.log("keys", keys)
//        console.log("dics", dics)
	  }
	}


function loadLanguage() {
    $.ajax({
    url:  '/lang/lang.tsv',
    dataType: 'text', async: false,
    success: function(response)
             	  {
             		arr = $.csv.toArrays(response,{"separator":"\t"});
             		getDics(arr)
             	  } });
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    dic = dics[lang]
    location.reload();
}

$(document).ready(function(){
    loadLanguage()
    getLanguage()
    dic = dics[language]
//    console.log(dic)
    $.each(keys, function( index, key ) {
        $('#'+key).text(dic[key]);
    })
});