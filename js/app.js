var filter = "partDescription";
var jsonData;
$.getJSON("json/inventory_master_list.json", function(data) {
	jsonData = data;
});

var options = {
	url: "json/inventory_master_list.json",
	getValue: filter,
	list: {
		maxNumberOfElements: 10,
		match: {
			enabled: true
		}
	}
};

$("#search").easyAutocomplete(options);
$("#btn-search").on("click", function(e) {
	e.preventDefault();
	$("#items-list").empty();

	var value = $("#search").val();
	var items = JSON.search(jsonData, '//*['+ filter +'="'+ value +'"]');

	for (var i = 0; i < items.length; i++) {
		$("#items-list").append("<table>"+
  "<tr><td>"+ items[i].item +"</td></tr>"+
  "<tr><td>"+ items[i].partDescription +"</td></tr>"+
  "<tr>"+
    "<tr>"+
      "<td>"+ items[i].stkUm +"</td>"+
      "<td>"+ items[i].operation +"</td>"+
      "<td>"+ items[i].itemType +"</td>"+
    "</tr>"+ 
  "</tr>"+
  "<tr><td>"+ items[i].operationDescription +"</td></tr>"+
"</table>");
	}
});