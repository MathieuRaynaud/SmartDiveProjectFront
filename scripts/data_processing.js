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
    console.log(allText);
    var record_num = 6;  // or however many elements there are in each row
    var allTextLines = allText.split('\n');
    var data_matrix = new Array(6);
    for (var d=0; d<record_num; d++){
        data_matrix[d]=new Array(allTextLines.length);
    }
    for (var j=0; j < allTextLines.length; j++) {
        var entries = allTextLines[j].split(',');

        for (var i = 0; i < entries.length; i++) {

            data_matrix[i][j] = entries[i];
        }
    }
    console.log(data_matrix);
}