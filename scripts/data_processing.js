$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data.txt",
        dataType: "text",
        success: function(data) {processData(data);}
    });
});

function processData(allText) {
    /* Example of data to process:
        [timestamp  , temperature   , pressure  , lat   , long  , depth             ]
        [1541692273 , 12.4          , 1.2       , 0.0   , 0.0   , 1.9999999999999996]
     */

    var record_num = 6;  // or however many elements there are in each row
    var allTextLines = allText.split(/\r\n|\n/);
    var entries = allTextLines[0].split(',');
    var lines = [];

    var headings = entries.splice(0,record_num);
    while (entries.length>0) {
        var tarr = [];
        for (var j=0; j<record_num; j++) {
            tarr.push(headings[j]+":"+entries.shift());
        }
        lines.push(tarr);
    }
    // alert(lines);
}