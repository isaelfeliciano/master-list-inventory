var filter = $("#filter").val();
var jsonData;

$.getJSON("json/inventory_master_list_indexed.json", function(data) {
	jsonData = data;
});

var autoCompleteOptionsDefault = {
	url: "json/auto-complete-item.json",
	getValue: "item",
	requestDelay: 500,
	list: {
		maxNumberOfElements: 15,
		match: {
			enabled: true
		}
	}
};

var autoCompleteOptionsOperDescription = {
	url: "json/auto-complete-operationDescription.json",
	getValue: "operationDescription",
	requestDelay: 500,
	list: {
		maxNumberOfElements: 15,
		match: {
			enabled: true
		}
	}
};

var autoCompleteOptionsPartDescription = {
	url: "json/auto-complete-partDescription.json",
	getValue: "partDescription",
	requestDelay: 500,
	list: {
		maxNumberOfElements: 15,
		match: {
			enabled: true
		}
	}
};



$("#search").easyAutocomplete(autoCompleteOptionsDefault);
$("#btn-search").on("click", function(e) {
	e.preventDefault();
	var value = $("#search").val();
	if (value == "" || value < 4) {
		return;
	}
	loading(function() {
	$("#items-list").empty();

	if (filter === "item") {
		var items = jsonData.byItem[value];
	} 
	if (filter === "partDescription") {
		var items = jsonData.byPartDescription[value];
	}
	if (filter === "operationDescription") {
		var items = jsonData.byOperationDescription[value];
	}
	/*else {
		var items = JSON.search(jsonData, '//*['+ filter +'="'+ value +'"]');
	}*/


	for (var i = 0; i < items.length; i++) {
		$("#items-list").append('<table class="center-align">'+
  '<tr class="row row__part-number"><td>'+ items[i].item +'</td></tr>'+
  '<tr class="row row__part-description separate-line"><td>'+ items[i].partDescription.replace('(quotes)', '"') +'</td></tr>'+
    '<tr class="row row__data-group separate-line">'+
      '<td><span>Stk UM:\n'+ items[i].stkUM +'</span></td>'+
      '<td><span>Oper:\n'+ items[i].operation +'</span></td>'+
      '<td><span>I/T:\n'+ items[i].itemType +'</span></td>'+
    '</tr>'+ 
  '<tr class="row row__oper-description"><td>'+ items[i].operationDescription.replace('(quotes)', '"') +'</td></tr>'+
'</table>');

		if (i <= items.length) {
			$(".loading-notification").removeClass('slideInUp').addClass('slideOutDown');
		}
	}
});
});

function filterChange () {
	filter = $("#filter").val();
	// autoCompleteOptions.getValue = filter;
	$("#search").val("");

	if (filter === "item") {
		$("#search").easyAutocomplete(autoCompleteOptionsDefault);
		window.location.reload();
	} 
	if (filter === "partDescription") {
		$("#search").easyAutocomplete(autoCompleteOptionsPartDescription)
	} else {
		$("#search").easyAutocomplete(autoCompleteOptionsOperDescription);
	}
}

if (filter === "item") {
	$("#search").easyAutocomplete(autoCompleteOptionsDefault);
} 
$("#filter").on('change', function(e) {
	filterChange();
});

function loading(callback) {
	$(".loading-notification").removeClass('slideOutDown').addClass('slideInUp');
	var tm = setTimeout(callback, 500);
		
}
$(".loading-notification").addClass('slideOutDown');