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
    var allTextLines = allText.split('\n');
    var data_matrix = new Array(allTextLines.length);
    for (var d=0; d<allTextLines.length; d++){
        data_matrix[d]=new Array(record_num);
    }
    for (var j=0; j < allTextLines.length; j++) {
        var entries = allTextLines[j].split(',');

        for (var i = 0; i < entries.length; i++) {

            data_matrix[j][i] = entries[i];
        }
    }
    return data_matrix;
}