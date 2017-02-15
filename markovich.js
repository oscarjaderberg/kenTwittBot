var MarkovChain = require('markovchain');
var fs = require('fs');
var shortid = require('shortid');


//Markov chain ------------------------------
//Read from lyrics textfile
var lyrics = new MarkovChain(fs.readFileSync('./db/ken.txt', 'utf8'));

//Array for quotes to be saved
var obj = {
    table: []
};


//constructor
var useUpperCase = function(wordList) {
  var tmpList = Object.keys(wordList).filter(function(word) {
    return word[0] >= 'A' && word[0] <= 'Z'
  })
  return tmpList[~~(Math.random()*tmpList.length)]
}

//log result
function toArray(err, toFile){
    
    for (i = 0; i < 2000; i++) {
        obj.table.push({ 
            id: shortid.generate(),
            time: Date.now(),
            quote: lyrics.start(useUpperCase).end(14).process() + "."
        });
        console.log(obj.table[i]);
    }
    //var json = JSON.stringify(obj);
    var stringToWrite = "var jsonData = " + JSON.stringify(obj.table) + ";";
    fs.writeFile('./www/js/quotes.js', stringToWrite, function (err){
  					if (err) return console.log(err);
  						console.log('data > quotes.js');
  					});
    var json = JSON.stringify(obj);
    fs.writeFile('./db/quotes.json', json, 'utf8');
    console.log(err, "done")
};

toArray();

