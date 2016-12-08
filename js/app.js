var filter = $("#filter").val();
var autoCompleteOptionsUrl = "json/inventory_master_list_no-duplicates.json";
var jsonData;
$.getJSON("json/inventory_master_list.json", function(data) {
	jsonData = data;
});

var autoCompleteOptions = {
	url: "json/inventory_master_list_no-duplicates.json",
	getValue: filter,
	requestDelay: 500,
	list: {
		maxNumberOfElements: 10,
		match: {
			enabled: true
		}
	}
};

var autoCompleteOptions2 = {
	url: "json/inventory_master_list_operation-description.json",
	getValue: "operationDescription",
	requestDelay: 500,
	list: {
		maxNumberOfElements: 10,
		match: {
			enabled: true
		}
	}
};



$("#search").easyAutocomplete(autoCompleteOptions);
$("#btn-search").on("click", function(e) {
	e.preventDefault();
	var value = $("#search").val();
	if (value == "" || value < 4) {
		return;
	}
	loading(function() {
	$("#items-list").empty();

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

		if (i <= items.length) {
			$(".loading-notification").removeClass('slideInUp').addClass('slideOutDown');
		}
	}
});
});

$("#filter").on('change', function(e) {
	filter = $("#filter").val();
	autoCompleteOptions.getValue = filter;

	if (filter === "item" || filter === "partDescription") {
		$("#search").easyAutocomplete(autoCompleteOptions);
	} else {
		$("#search").easyAutocomplete(autoCompleteOptions2);
	}
});

function loading(callback) {
	$(".loading-notification").removeClass('slideOutDown').addClass('slideInUp');
	var tm = setTimeout(callback, 500);
		
}
$(".loading-notification").addClass('slideOutDown');