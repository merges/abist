// Old code to be incorporated again soon

var itemsDataJson = (env === 'production') ? getData('data/items.json') : getData('data/items.json');

function readJsonFileSync(filepath, encoding) {
  consoleLog("trying to read file", filepath);
  if (typeof (encoding) == 'undefined'){
    encoding = 'utf8';
  }
  var file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}

function getData(file) {
  var filepath = __dirname + '/' + file;
  return readJsonFileSync(filepath);
}

// Route for express

app.use('/itemsData', function(req, res){
  consoleLog('trying to use /itemsData');
  res.send(itemsDataJson);
  res.end();
});