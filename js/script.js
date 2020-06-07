$(document).ready(function(){
	$("#district").hide();

	$.ajax({
		url: 'https://api.covidindiatracker.com/state_data.json',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			var str = '';
			for (var i = 0; i<response.length; i++) {
				str += '<tr>';
				str += '<td><a href="index.html?id='+response[i].id+'">'+response[i].state+'</a></td>';
				str += '<td>'+response[i].active+'</td>';
				str += '<td>'+response[i].confirmed+'</td>';
				str += '<td>'+response[i].recovered+'</td>';
				str += '<td>'+response[i].deaths+'</td>';
				str += '</tr>';
			}
			$("#state tbody").append(str);
		}
	});
	

	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null) {
			return null;
		}
		return decodeURI(results[1]) || 0;
	}
	var id = $.urlParam('id');
	if(id!=null){
		$("#district").show();
		$.ajax({
			url: 'https://api.covidindiatracker.com/state_data.json',
			type: 'GET',
			dataType: 'json',
			success: function(response){
				for (var i = 0; i<response.length; i++) {
					if(response[i].id==id){
						$("#st_head").html(response[i].state+" statistics");
						var inp = '';
						if(response[i].districtData.length==0){
							inp += '<tr>';
							inp += '<td> - </td>';
							inp += '<td> - </td>';
							inp += '<td> - </td>';
							inp += '<td> - </td>';
							inp += '</tr>';
						} else {
							for(var j=0;j<response[i].districtData.length;j++) {
							inp += '<tr>';
							inp += '<td>'+response[i].districtData[j].name+'</a></td>';
							inp += '<td>'+response[i].districtData[j].confirmed+'</td>';
							inp += '<td>'+response[i].districtData[j].recovered+'</td>';
							inp += '<td>'+response[i].districtData[j].deaths+'</td>';
							inp += '</tr>';
						}
						}
						$("#district tbody").append(inp);
					}
				}
			}
		});
	}

});