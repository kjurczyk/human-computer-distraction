function allStorage() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + localStorage.getItem(key));
    }

    return archive;
}

var values = new Array();
Object.keys(localStorage).forEach(function(key){
    values.push("<span>"+ key + ": " + localStorage.getItem(key) + "</span>");
    console.log(key);
    console.log(localStorage.getItem(key));
 });

 document.getElementById('logs').innerHTML = values.join("<br>");
 /*
document.write("<pre>" + JSON.stringify(existingEntries) + "</pre>");    
document.write("<pre>" + JSON.stringify(entry) + "</pre>");
*/