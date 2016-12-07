var filter = $("#filter").val();
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
		$("#items-list").append('<table class="center-align">'+
  '<tr class="row row__part-number"><td>'+ items[i].item +'</td></tr>'+
  '<tr class="row row__part-description separate-line"><td>'+ items[i].partDescription +'</td></tr>'+
    '<tr class="row row__data-group separate-line">'+
      '<td><span>Stk UM:\n'+ items[i].stkUm +'</span></td>'+
      '<td><span>Oper:\n'+ items[i].operation +'</span></td>'+
      '<td><span>I/T:\n'+ items[i].itemType +'</span></td>'+
    '</tr>'+ 
  '<tr class="row row__oper-description"><td>'+ items[i].operationDescription +'</td></tr>'+
'</table>');
	}
});

$("#filter").on('change', function(e) {
	filter = $("#filter").val();
	options.getValue = filter;
	$("#search").easyAutocomplete(options);
	console.log(filter);
});