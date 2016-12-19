var filter = $("#filter").val();
var autoCompleteOptionsDefault = {
	data: autoCompleteItem,
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
	data: autoCompleteOperationDescription,
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
	data: autoCompletePartDescription,
	getValue: "partDescription",
	requestDelay: 500,
	list: {
		maxNumberOfElements: 15,
		match: {
			enabled: true
		}
	}
};

$("option").attr("selected", false);
$('option[value="item"]').attr("selected", true);
easyAutocompleteUpdateOptions(autoCompleteOptionsDefault);
$("#btn-search").on("click", function(e) {
	e.preventDefault();
	var value = $("#search").val();
	if (value == "" || value < 4) {
		return;
	}
	loading(function() {
	$("#items-list").empty();

	items = filterChange(value);
	
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

function filterChange (value) {
	var result;
	filter = $("#filter").val();
	$("#search").val("");

	switch (filter) {
	case "item":
		easyAutocompleteUpdateOptions(autoCompleteOptionsDefault);
		result = jsonData.byItem[value];
		break;
	case "partDescription":
		easyAutocompleteUpdateOptions(autoCompleteOptionsPartDescription)
		result = jsonData.byPartDescription[value];
		break;
	case "operationDescription":
		easyAutocompleteUpdateOptions(autoCompleteOptionsOperDescription);
		result = jsonData.byOperationDescription[value];
		break;
	}
	return result;
}

function easyAutocompleteUpdateOptions(options) {
	$("#search").easyAutocomplete(options);
	$("#search").focus();
}

$("#filter").on('change', function(e) {
	filterChange();
});

function loading(callback) {
	$(".loading-notification").removeClass('slideOutDown').addClass('slideInUp');
	var tm = setTimeout(callback, 500);
		
}
$(".loading-notification").addClass('slideOutDown');