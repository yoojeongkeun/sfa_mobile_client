tab03 = 
{	 
    init:function(json)
	{
    	tab03.initInterface();
    	tab03.initData(json);
    	tab03.initLayout();
	},
	initInterface:function()
	{		
		page.setDateTime("#t03_calDay", "#t03_btnCal");
		page.setDateTime("#VISITDATE", "#t03_btnCal2");
		page.setDateTime("#t03_calTestSendDay", "#t03_btnCal3");
		page.setDateTime("#t03_calNextPlan", "#t03_btnCal4");
		
		$(".t03_chkEqual").click(function(){
			 if($(".t03_chkEqual").prop("checked")){
				 $("#INTERVIEWER").val($("#t03_colorcutor").val());
			 }else{
				 $("#INTERVIEWER").val("");
			 }
		});
		
		$("#t03_fromTime, #t03_toTime").change(function(){
			var fromTime = $("#t03_fromTime").val();
			var toTime = $("#t03_toTime").val();
			
			var fromHour = fromTime.substr(0, 2);
			var fromMinute = fromTime.substr(3, 2);
			var toHour = toTime.substr(0, 2);
			var toMinute = toTime.substr(3, 2);
			
			var resultHour = toHour - fromHour;
			var resultMinute = toMinute - fromMinute;
			
			if(resultMinute < 0){
				resultMinute = 60 + resultMinute;
				resultHour--;
			}
			
			$("#t03_timeHour").val(resultHour);
			$("#t03_timeMin").val(resultMinute);
			
		});
		
		$("#rdConType1").attr("checked", true);
		$("#rdConType2").attr("checked", false);
		
		
		var contractType1 = "C10000";
		var contractType2 = "C20000";
		if(bizMOB.Storage.get("dutyCode") == "C39"){
			contractType1 = "FS100";
			contractType2 = "FS200";				
		}
		tab03.setTypeCombobox($("#t03_selWorkType"), "ContactType", "", $("#rdConType1").is(":checked") ? contractType1 : contractType2);
		
		$("#t03_Area").change(function(){
    		$("#t03_Area2").val($(this).val() * 3.305785);    		
    	});
		
		$("#t03_Area").keyup(function(){
    		$("#t03_Area2").val($(this).val() * 3.305785);    		
    	});
		
		$("#rdConType1").change(function(){
			tab03.setType("ContactType");
			tab03.clearCombobox(1);
		});
		
		$("#rdConType2").change(function(){
			tab03.setType("ContactType");
			tab03.clearCombobox(1);
		});
		
		$("#t03_selWorkType").change(function(){
			tab03.setType("JobType");
			tab03.clearCombobox(2);
		});

		$("#t03_selDeType").change(function(){
			tab03.setType("JobDetailType");
			tab03.clearCombobox(3);
		});
		
		$("#t03_selActReason").change(function(){
			tab03.setType("ActReason");
			tab03.clearCombobox(4);
    	});
		
		$("#t03_selCounResult").change(function(){
			tab03.setType("FutPlan");
		});
		
		// 하단 탭 show, hide 기능
		$(".t03_liTab").click(function(){
			$(".t03_liTab button").removeAttr("id");
			$(this).find("button").attr("id", "current");
			var tabIndex = $(this).attr("tabindex");
			if(tabIndex == "1" ){
				$("#t03_divTab1").show();
				$("#t03_divTab2").hide();
				$("#t03_divTab3").hide();
				$("#t03_divTab4").hide();
				$("#t03_divTab5").hide();
				$("#t03_divTab6").hide();
			}else if(tabIndex == "2"){
				$("#t03_divTab1").hide();
				$("#t03_divTab2").show();
				$("#t03_divTab3").hide();
				$("#t03_divTab4").hide();
				$("#t03_divTab5").hide();
				$("#t03_divTab6").hide();
			}else if(tabIndex == "3"){
				$("#t03_divTab1").hide();
				$("#t03_divTab2").hide();
				$("#t03_divTab3").show();
				$("#t03_divTab4").hide();
				$("#t03_divTab5").hide();
				$("#t03_divTab6").hide();
			}else if(tabIndex == "4"){
				$("#t03_divTab1").hide();
				$("#t03_divTab2").hide();
				$("#t03_divTab3").hide();
				$("#t03_divTab4").show();
				$("#t03_divTab5").hide();
				$("#t03_divTab6").hide();
			}else if(tabIndex == "5"){
				$("#t03_divTab1").hide();
				$("#t03_divTab2").hide();
				$("#t03_divTab3").hide();
				$("#t03_divTab4").hide();
				$("#t03_divTab5").show();
				$("#t03_divTab6").hide();
			}else if(tabIndex == "6"){
				$("#t03_divTab1").hide();
				$("#t03_divTab2").hide();
				$("#t03_divTab3").hide();
				$("#t03_divTab4").hide();
				$("#t03_divTab5").hide();
				$("#t03_divTab6").show();
			}
		});
		
		$(".t3_btnGallery").click(function(){
			bizMOB.Ui.alert("TAB3에서 갤러리버튼");
		});
		
		
 		
 		$("#t03_btnAdd").click(function(){
 			var bool = true;
 			
 			$.each($(".t03_Accomp"), function(i, colElement){
				if($($(colElement).find("td")[3]).attr("val") == $("#t03_User").val())
				{
					bool = false;
					return;
				}
			});
 			if(bool)
			{
 				var strReturnText = "";
 	 			var strCnt = "";
 	 			strCnt = $(".t03_Accomp:visible").length + 1;
 	 			
 	 			strReturnText += "<tr class=" + "t03_Accomp" + ">" +
 									"<td class='t03_compSeq'>" + strCnt + "</td>" +
 									"<td><input type='checkbox'></td>" +
 									"<td class='t03_compDept' val=" + $("#t03_Dept").val() + ">" + $("#t03_Dept option:selected").text() + "</td>" +
 									"<td class='t03_compUser' val=" + $("#t03_User").val() + ">" + $("#t03_User option:selected").text() + "</td>" +
 								"</tr>";
 	 			
 	 			$("#t03_AccompListNew").append(strReturnText);
			}
 			
    	});
 		
 		$("#t03_btnDel").click(function(){
 			$.each($(".t03_Accomp"), function(i, colElement){
				if($(colElement).find("input").is(":checked"))
				{
					colElement.remove();
				}
			});
 			
 			$.each($(".t03_Accomp"), function(i, colElement){
 				$($(colElement).find("td")[0]).text(i+1);
			});
    	});
 		
 		$("#t03_btnTrans").click(function(){
 			$(".t03_tab06").toggle();
 			if($(".t03_tab06").is(":visible")){
 				$(".t03_tab06").trigger("click");
 			}else{
 				$(".t03_tab01").trigger("click");
 			}
 			
 		});
	},	 
	initData:function(json)
	{
		var nowDate  = new Date();
		$("#t03_calDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
 		
 		$("#t03_fromTime").val("00:00");
 		$("#t03_toTime").val("01:00"); 		
 		
 		$("#t03_timeHour").val("1");
 		$("#t03_timeMin").val("0");
 		
 		tab03.setComboBox($("#t03_Dept"), "0");
 		tab03.setComboBox($("#t03_User"), "2");
	},	 
	initLayout:function()
	{	
		var dutyCode = bizMOB.Storage.get("dutyCode");
		
		if(dutyCode == "C39"){ // FSD일 경우
			$(".t03_SDview").hide();			
			$(".t03_tab04").hide();
			$(".t03_tab05").hide();
			$(".t03_tab01 button").text("수행내용");			
		}else if(dutyCode == "B33"){ // 팀장일 경우		
			$(".t03_FSDview").hide();
			$(".t03_tab02").hide();
			$(".t03_tab03").hide();			
		}else{
			$(".t03_FSDview").hide();
			$(".t03_tab02").hide();
			$(".t03_tab03").hide();
			$(".t03_tab04").hide();
			$(".t03_tab05").hide();			
		}
	},
	
	setType: function(Type){
		var contractType1 = "C10000";
		var contractType2 = "C20000";
		if($(".reportType").val() == "003"){
			contractType1 = "FS100";
			contractType2 = "FS200";				
		}
		switch(Type)
	    {		
	        case "ContactType": tab03.setTypeCombobox($("#t03_selWorkType"), "ContactType", "", $("#rdConType1").is(":checked") ? contractType1 : contractType2, "0"); break;
	        case "JobType": tab03.setTypeCombobox($("#t03_selDeType"), "JobType", $("#rdConType1").is(":checked") ? contractType1 : contractType2, $("#t03_selWorkType").val(), "0"); break;
	        case "JobDetailType": tab03.setTypeCombobox($("#t03_selActReason"), "JobDetailType", $("#t03_selWorkType").val(), $("#t03_selDeType").val(), "0"); break;
	        case "ActReason": tab03.setTypeCombobox($("#t03_selCounResult"), "ActReason", $("#t03_selDeType").val(), $("#t03_selActReason").val(), "0"); break;
	        case "FutPlan": tab03.setTypeCombobox($("#t03_selFutPlan"), "FutPlan", $("#t03_selActReason").val(), $("#t03_selCounResult").val(), "0"); break;
	    }
    },
    
    setType2: function(Type, pValue, value, sValue){
		switch(Type) 
	    {
	        case "ContactType": tab03.setTypeCombobox($("#t03_selWorkType"), "ContactType", "", value, sValue); break;
	        case "JobType": tab03.setTypeCombobox($("#t03_selDeType"), "JobType", pValue, value, sValue); break;
	        case "JobDetailType": tab03.setTypeCombobox($("#t03_selActReason"), "JobDetailType", pValue, value, sValue); break;
	        case "ActReason": tab03.setTypeCombobox($("#t03_selCounResult"), "ActReason", pValue, value, sValue); break;
	        case "FutPlan": tab03.setTypeCombobox($("#t03_selFutPlan"), "FutPlan", pValue, value, sValue); break;
	    }
    },
	
	setTypeCombobox: function($selectID, Type, ParentValue, Value, SetValue){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01314");
    	tr.body.P01 = Type;
		tr.body.P02 = ParentValue.length == 0 ? "" : ParentValue;
		tr.body.P03 = Value;
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST.length == 0){
    				bizMOB.Ui.alert("안내", "코드구분값을 가져오는데 실패했습니다.");
    				return;
    			}
    			if(SetValue != "0")
    				page.bindingCombobox($selectID, json.body.LIST, SetValue);
    			else
    				page.bindingCombobox($selectID, json.body.LIST);
    			
    		}
    	});
    },
    
    setComboBox: function($selectID, pDiv){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01316");
		tr.body.P04 = pDiv;
		tr.body.P05 = "";
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				page.bindingCombobox($selectID, json.body.LIST);
			}		
		});		
	},
	
	setData: function(list, userId){
		$("#t03_calDay").val(list.R04.substr(0, 10));
		$("#t03_timeHour").val(list.R22);
		$("#t03_timeMin").val(list.R23);
		$("#t03_fromTime").val(list.R04.substr(11, 5));
		$("#t03_toTime").val(list.R05.substr(11, 5));
		$("#t03_toTime").trigger("change");
		
		$("#t03_selFSClassify").val(list.R24);
		$("#t03_calTestSendDay").val(list.R25 == "" ? "" : list.R25.substr(0, 10));
		$("#t03_txtTime").val(list.R25 == "" ? "00:00" : list.R25.substr(11, 5));
		$("#t03_calNextPlan").val(list.R25.trim() == "" ? "" : page.changeDateFormat(list.R26, "-"));
		$("#t03_txtPerformOrder").val(list.R27);
		$("#t03_txtHQRequest").val(list.R28);
		
		$("#t03_colorcutor").val(list.R12);
		if(list.R06 == "C10000")
		{
			$("#rdConType1").attr("checked", true);
			$("#rdConType2").attr("checked", false);
		}
		else
		{
			$("#rdConType2").attr("checked", true);
			$("#rdConType1").attr("checked", false);
		}
		tab03.setType2("ContactType", "", list.R06, list.R07);
		tab03.setType2("JobType", list.R06, list.R07, list.R08);
		tab03.setType2("JobDetailType", list.R07, list.R08, list.R09);
		tab03.setType2("ActReason", list.R08, list.R09, list.R10);
		tab03.setType2("FutPlan", list.R09, list.R10, list.R11);
		
		$("#t03_Area").val(list.R13);
		$("#t03_Area2").val(list.R14);
		
		$("#textCont").val(list.R15);
		
		$("#t02_selRegBR").html("<option value='" + list.R16 + "'>" + list.R21 + "</option>");
		$("#t02_selRegUserID").html("<option value='" + list.R03 + "'>" + list.R17 + "</option>");
		
		if(bizMOB.Storage.get("UserID") == list.R23){
			if(list.R22 == "B35" || list.R22 == "B36"){
				tab04.positionType = "C";				
			}else{
				tab04.positionType = "S";
			}
		}else{
			if(list.R22 == "B35" || list.R22 == "B36" || list.R22 == "B33" || list.R22 == "B39" || list.R22 == "C34"){
				tab04.positionType = "C";				
			}else{
				tab04.positionType = "S";
			}
		}		
	},
	setTransData: function(list){
		$("#VISITDATE").val(page.changeDateFormat(list.R04, "-"));
		$("#INTERVIEWER").val(list.R05);
		if(list.R06 != ""){
			var tel = list.R06.split("-");
			$("#PHONE1").val(tel[0]);
			$("#PHONE2").val(tel[1]);
			$("#PHONE3").val(tel[2]);
		}
		if(list.R07 != ""){
			var phone = list.R07.split("-");
			$("#HP1").val(phone[0]);
			$("#HP2").val(phone[1]);
			$("#HP3").val(phone[2]);
		}
		
		list.R08 == "Y" ? $("#BASIC").prop("checked", true) : $("#BASIC").prop("checked", false);
		list.R09 == "Y" ? $("#FIC").prop("checked", true) : $("#FIC").prop("checked", false);
		list.R10 == "Y" ? $("#VBC").prop("checked", true) : $("#VBC").prop("checked", false);
		list.R11 == "Y" ? $("#BEDBUG").prop("checked", true) : $("#BEDBUG").prop("checked", false);
		list.R12 == "Y" ? $("#MOTH").prop("checked", true) : $("#MOTH").prop("checked", false);
		
		$("#t03_btnTrans").addClass("btn_on");
		$(".t03_tab06").show();

	},	
	renderCompList:function(json)
	{
		// 항목 리스트를 셋팅하기
		var num = 0;
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".t03_Accomp",
		 		value:"LIST06",
		 		detail:
	 			[
	 			 	{type:"single", target:".t03_compSeq", value:function(){
	 			 		return ++num;
	 			 	}},
	 			 	{type:"single", target:".t03_compDept", value:"R02"},
	 			 	{type:"single", target:".t03_compDept@val", value:"R01"},
	 			 	{type:"single", target:".t03_compUser", value:"R04"},
	 			 	{type:"single", target:".t03_compUser@val", value:"R03"},
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"t03_AccompListNew", replace:true };
		// 그리기
		$("#t03_AccompList").bMRender(json.body, dir, options);
		
		// 영업일자는 수정 불가하도록
		$("#t03_calDay").attr("disabled", "");
		$("#t03_btnCal").attr("disabled", "");
		
		$(".bx-viewport").css("height", ($("#tab03").height() + 56) + "px");
	},	
	renderSubmitDoc:function(json)
	{
		// 항목 리스트를 셋팅하기
		var num = 0;
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".t03_trSubmitDocList",
		 		value:"LIST06",
		 		detail:
	 			[
	 			 	{type:"single", target:".t03_compSeq", value:function(){
	 			 		return ++num;
	 			 	}},
	 			 	{type:"single", target:".t03_txtSubmitDocName", value:"R02"},
	 			 	{type:"single", target:"@code+", value:"R01"},
	 			 	{type:"single", target:".t03_txtSubmitDocSeq", value:"R03"}
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"t03_submitDocListNew", replace:true };		
		// 그리기
		$("#t03_submitDocList").bMRender(json.body, dir, options);		
	},
	setSubmitDoc: function(list){
		$(".t03_chkSubmitDoc").prop("checked", false);
		$(list).each(function(i, le){
			$(".t03_trSubmitDocList[code=" + le.R01 + "]").find(".t03_chkSubmitDoc").prop("checked", true);			
		});
	},
	clearCombobox: function(comboboxLevel){
		switch(comboboxLevel){
			case 1:
				$("#t03_selDeType").html('<option value="">세부구분</option>');
			case 2:
				$("#t03_selActReason").html('<option value="">활동사유</option>');
			case 3:
				$("#t03_selCounResult").html('<option value="">상담결과</option>');
			case 4:
				$("#t03_selFutPlan").html('<option value="">향후계획</option>');
		}
	}
};
