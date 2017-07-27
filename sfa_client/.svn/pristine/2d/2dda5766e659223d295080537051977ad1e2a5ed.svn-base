page = 
{
	hour: "",
	minute: "",
	obj: "",
	init: function(json){		
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface: function(){
		$("#ampm").click(function(){
			if($("#ampm").text() == "오전"){
				$("#ampm").text("오후");
			}else{
				$("#ampm").text("오전");
			}
		});
		
		$("#btnOk").click(function(){
			var hour = $("#txtHour").val();
			var minute = $("#txtMinute").val();
			
			if($("#ampm").text() == "오후"){
				hour = hour - 0 + 12;
				hour = hour.toString();
			}
			
			if($("#ampm").text() == "오전" && $("#txtHour").val() == "12"){
				hour = "00";
			}
			
			if($("#ampm").text() == "오후" && $("#txtHour").val() == "12"){
				hour = "12";
			}
			
			if($("#txtMinute").val() == ""){
				minute = "00";
			} 
			
			$("input").attr("readonly", "");			
			setTimeout(function(){				
				bizMOB.Ui.closeDialog({ callback: "page.setTime(\"" + (hour.length == 1 ? "0" + hour : hour) + ":" + (minute.length == 1 ? "0" + minute : minute) + "\", \""+ page.obj +"\")" });	
			}, 300);
		});
		
		$("#btnCancel").click(function(){
			$("input").attr("readonly", "");
			setTimeout(function(){				
				bizMOB.Ui.closeDialog();	
			}, 300);
		});
		
				
		$("#btnHourPlus").click(function(){
			var hour = $("#txtHour").val() - 0;
			if(hour >= 12) hour = 0;
			$("#txtHour").val(hour + 1);
		});
		
		$("#btnMinutePlus").click(function(){			
			var minute = $("#txtMinute").val() - 0;
			if(minute >= 59) minute = -1;
			$("#txtMinute").val(minute + 1);
		});
		
		$("#btnHourMinus").click(function(){
			var hour = $("#txtHour").val() - 0;
			if(hour <= 1) hour = 13;			
			$("#txtHour").val(hour - 1);
		});
		
		$("#btnMinuteMinus").click(function(){
			var minute = $("#txtMinute").val() - 0;
			if(minute <= 0) minute = 60;
			$("#txtMinute").val(minute - 1);
		});
		
		$("#txtHour").click(function(){
			$(this).select();
		});
		
		$("#txtMinute").click(function(){
			$(this).select();
		});
		
		$("#txtHour").keyup(function(){
			if($(this).val() - 0 >= 13){
				$(this).val("12");
			}
			
			if($(this).val() >= "00" && $(this).val() <= "09"){				
				$("#txtMinute").focus();
			}
		});
		
		$("#txtHour").change(function(){
			if($(this).val() - 0 == 0){
				$(this).val("12");
			}	
		});
		
		$("#txtMinute").keyup(function(){
			if($(this).val() - 0 >= 60){
				$(this).val("59");                                              
			}
			
			if($(this).val().length > 2){ // 다시 확인해보기
				$(this).val($(this).val().substr(0, 2));
			}
		});

	},
	initData: function(json){
		page.obj = json.obj;
		page.hour = json.time.split(":")[0];
		page.minute = json.time.split(":")[1];
		
		if(page.hour == "" || page.hour == undefined) page.hour = "0";
		if(page.minute == ""  || page.minute == undefined) page.minute = "0";
		
		if(page.hour >= "12"){
			if(page.hour != "12") 
				page.hour = page.hour - 12;
			$("#ampm").text("오후");
		}
		$("#txtHour").val(page.hour);
		$("#txtMinute").val(page.minute);
	},
	initLayout: function(json){
		
	}
};