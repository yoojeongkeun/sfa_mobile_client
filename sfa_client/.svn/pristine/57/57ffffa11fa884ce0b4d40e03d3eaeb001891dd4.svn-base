tab01 = 
{	 
	list : new Array,
	
    init:function(json)
	{
    	tab01.initInterface();
    	tab01.initData(json);
		tab01.initLayout();
	},
	initInterface:function()
	{
		 $(".t01_btnSearch").click(function(){
			 //bizMOB.Ui.alert("TAB1에서 조회버튼");
			 tab01.setSearchList();
		 });
		 
		 $("#contlistnew").delegate(".t01_btnSalesSearch", "click", function() {
			 $this = $(this);
			 page.setSalesReport(
					 $this.parent().parent().parent().parent().find(".t01_CustCode").text(),
					 $this.parent().parent().parent().parent().attr("seqn"),
					 $this.parent().parent().parent().parent().find(".t01_MngNm").attr("userId")
			 );
		 });
		 
		 $(".t01_btnClear").click(function(){
			 $('select[id*="t01"]').val("N");
			 
			 var nowDate  = new Date();
	 		 $("#t01_calFromtDay").val((new Date()).bMPreviousMonth().bMToFormatDate("yyyy-mm-dd")); // 기본 검색일 한 달 전으로
	 		 $("#t01_calToDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
			 
			 $("#rdCon1").attr("checked", true);
		 });
		 
		 $("#contlistnew").delegate(".t01_list", "click", function() {
			 $this = $(this);
			 if($this.parent().find(".t01_listDetail").is(":visible"))
			 {
				 $this.parent().find(".t01_listDetail").hide();
				 $(".bx-viewport").css("height", ($("#tab01").height() + 56) + "px");
			 }
			 else
			 {
				 $this.parent().find(".t01_listDetail").show();
				 $(".bx-viewport").css("height", ($("#tab01").height() + 56) + "px");
			 }
				 
		 });
		 
		 $("#contlistnew").delegate(".t01_btnSalesPass", "click", function() {
			 var $this = $(this);
			 bizMOB.Ui.openDialog("sales/html/SD013_pop.html", {
		           width : "99%",
				   height : "68%",
				   message : {
					   CustCode : $this.parent().parent().parent().parent().find(".t01_CustCode").text(),
					   UserId : bizMOB.Storage.get("UserID")
				   }
				});
		 });
		 
		 $("#contlistnew").delegate(".t01_btnCustInfo", "click", function() {
			 var $this = $(this);
			 bizMOB.Web.open("custmaster/html/CM007.html", {
					modal : false,
					replace : false,
					message : {custCode : $this.parent().parent().parent().parent().find(".t01_CustCode").text()}
				});
		 });
		 
		 $("#t01_setTypeLarge").change(function(){
			 page.setTypeMediumCombobox($("#t01_setTypeMedi"), $("#t01_setTypeLarge"));
		 });
		 
		 page.setTypeLargeCombobox($("#t01_setTypeLarge"));
		 
		 $("#t01_selHQ").change(function(){
			 page.getComboBoxList("#t01_selBR", "B01", $(this).val());
			 $("#t01_selUserID").html("<option value>담당자</option>");
		 });
		 
		 $("#t01_selBR").change(function(){
			 page.getComboBoxList("#t01_selUserID", "C01", $(this).val());
		 });
		 
		 page.setDateTime("#t01_calFromtDay", "#t01_btnFromCal");	
		 page.setDateTime("#t01_calToDay", "#t01_btnToCal");	
		 
		 var nowDate  = new Date();
		 $("#t01_calFromtDay").val((new Date()).bMPreviousMonth().bMToFormatDate("yyyy-mm-dd")); 		 
 		 $("#t01_calToDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
	 		
 		 $("#btnOpen").click(function(){
    		 $(".searchDiv").toggle();
    		 /*if($(".searchDiv").is(":visible")){
    			 $(".divWrap").css("top", "305px");
    		 }else{
    			 $(".divWrap").css("top", "32px");
    		 }  */  		
    	 });
 		 
 		$("#rdCon1").attr("checked", true);
			
	},	 
	initData:function(json)
	{
		 
	},	 
	initLayout:function()
	{	
		// 본부 콤보박스
		
		if(bizMOB.Storage.get("dutyCode") == "C39"){
			$(".t01_notFS").hide();
		}
		
		tab01.getComboBoxList();
		
		tab01.setCommonCombo();
	},
	
	getComboBoxList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01328");
		tr.body.P01 = "";
		tr.body.P02 = "";
		tr.body.P03 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "본부/부서/사원 목록을 불러오는데 실패하였습니다.");
					return;
				}
				
				tab01.setUserInfoCombobox("t01_selHQ", json.body.LIST01, json.body.R01);
				tab01.setUserInfoCombobox("t01_selBR", json.body.LIST02, json.body.R02);
				tab01.setUserInfoCombobox("t01_selUserID", json.body.LIST03, json.body.R03);
				
				switch(json.body.R04){
					case "TYPE1": // 본사인원일때는 콤보박스 고정하지 않음
						break;
					case "TYPE2": // 본부장, 영업매니저일 경우에는 본부만 고정
						$("#t01_selHQ").attr("disabled", "");						
						break;
					case "TYPE3": // 지사장, 팀장, SM일 경우에는 본부, 부서 고정
						$("#t01_selHQ").attr("disabled", "");
						$("#t01_selBR").attr("disabled", "");
						break;
					case "TYPE4": // 그 외 인원들은 본부, 부서, 사원 고정
						$("#t01_selHQ").attr("disabled", "");
						$("#t01_selBR").attr("disabled", "");
						$("#t01_selUserID").attr("disabled", "");
						break;	
					}
			}
		});		
	},
	
	setUserInfoCombobox: function(id, list, value){
		var htmlText = "";
		for ( var i = 0; i < list.length; i++) {
			htmlText += "<option value='" + list[i].R01 + "'>" + list[i].R02 + "</option>";
		}
		$("#" + id).html(htmlText);
		$("#" + id).val(value);
	},
	
	
	setCommonCombo: function(callback){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01304");
		tr.body.P01 = "";
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
				else
				{
					list = json.body;
					
					//if(callback) callback();
					
					//tab01.setComboBox(list);
					
					$("#t01_selJobGroup option").remove();
					$("#t01_selBusiType option").remove();
					$("#t01_selSalesTrans option").remove();
					$(".reportType option").remove();
					
					var listCode1 = list.LIST01;

					for ( var i = 0; i < listCode1.length; i++) {
						$("#t01_selJobGroup").append(
								"<option value='" + listCode1[i].R01 + "'>" + listCode1[i].R02 + "</option>");
					}
					
					var listCode2 = list.LIST02;

					for ( var i = 0; i < listCode2.length; i++) {
						$("#t01_selBusiType").append(
								"<option value='" + listCode2[i].R01 + "'>" + listCode2[i].R02 + "</option>");
					}
					
					var listCode3 = list.LIST03;

					for ( var i = 0; i < listCode3.length; i++) {
						$("#t01_selSalesTrans").append(
								"<option value='" + listCode3[i].R01 + "'>" + listCode3[i].R02 + "</option>");
					}
					
					var listCode4 = list.LIST04;

					for ( var i = 0; i < listCode4.length; i++) {
						$(".reportType").append(
								"<option value='" + listCode4[i].R01 + "'>" + listCode4[i].R02 + "</option>");
					}
					
					var dutyCode = bizMOB.Storage.get("dutyCode");
					
					if(dutyCode == "C39"){ // FSD일 경우
						$(".reportType").val("003");
						
					}else if(dutyCode == "B33"){ // 팀장일 경우
						$(".reportType").val("002");
					}else{
						$(".reportType").val("001");
					}
				}
			}		
		});		
	},
	
	setSearchList:function()
	{
		var rdCon = ""; //서비스유형
		if($("#rdCon1").is(":checked")) { rdCon = "N"; } //전체
		if($("#rdCon2").is(":checked")) { rdCon = "2"; } //외근
		if($("#rdCon3").is(":checked")) { rdCon = "3"; } //내근
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01306");
		tr.body.P01 = $("#t01_calFromtDay").val();
		tr.body.P02 = $("#t01_calToDay").val();
		tr.body.P03 = $("#t01_txtCustCode").val() == "" ? "N" : $("#t01_txtCustCode").val();
		tr.body.P04 = $("#t01_txtCustName").val();
		tr.body.P05 = $("#t01_selBR").val() == "" ? "N" : ($("#t01_selBR").val() == "0" ? "N" : $("#t01_selBR").val());
		tr.body.P06 = $("#t01_selUserID").val() == "" ? "N" : ($("#t01_selUserID").val() == "0" ? "N" : $("#t01_selUserID").val());
		tr.body.P07 = $("#t01_setTypeLarge").val() == "" ? "N" : $("#t01_setTypeLarge").val();
		tr.body.P08 = $("#t01_setTypeMedi").val() == "0" ? "N" : ($("#t01_setTypeMedi").val() == "0" ? "N" : $("#t01_setTypeMedi").val());
		tr.body.P09 = $("#t01_selBusiType").val();
		tr.body.P10 = rdCon;
		tr.body.P11 = $("#t01_selWorkType").val();
		tr.body.P12 = $("#t01_selDeType").val();
		tr.body.P13 = $("#t01_selActReason").val();
		tr.body.P14 = $("#t01_selCounResult").val();
		tr.body.P15 = $("#t01_selFutPlan").val();
		tr.body.P16 = $("#t01_selJobGroup").val() == "N" ? "" : $("#t01_selJobGroup").val();
		tr.body.P17 = $("#t01_selSalesTrans").val();
		tr.body.P18 = $("#t01_selReportType").val();
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				tab01.renderList(json);
			}
		});		
	},
	
	renderList:function(json)
	{
		// 항목 리스트를 셋팅하기
		var num = 0;
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:"#t01_conBody",
		 		value:"LIST",
		 		detail:
	 			[
	 			 	{type:"single", target:".t01_Seq", value:function(){
	 			 		return ++num;
	 			 	}},
	 			 	{type:"single", target:"@seqn", value:"R05"},
	 			 	{type:"single", target:".t01_MngNm", value:"R17"},
	 			 	{type:"single", target:".t01_MngNm@userId", value:"R16"},
	 			 	{type:"single", target:".t01_ActDay", value:"R02"},
	 			 	{type:"single", target:".t01_CustCode", value:"R01"},
	 			 	{type:"single", target:".t01_CustNm", value:"R18"},
	 			 	{type:"single", target:".t01_WorkDay", value:"R02"},
	 			 	{type:"single", target:".t01_WorkTime", value:"R03"},
	 			 	{type:"single", target:".t01_ConnType", value:"R08"},
	 			 	{type:"single", target:".t01_WorkType", value:"R09"},
	 			 	{type:"single", target:".t01_DetailType", value:"R10"},
	 			 	{type:"single", target:".t01_ActReason", value:"R11"},
	 			 	{type:"single", target:".t01_CounResult", value:"R12"},
	 			 	{type:"single", target:".t01_FuturePlan", value:"R13"},
	 			 	{type:"single", target:".t01_C_FN", value:function(arg)
	 			 		{  
                    	   	return parseInt(arg.item.R23);
					    }
	 			 	},
	 			 	{type:"single", target:".t01_C_FN@style", value:function(arg)
	 			 		{  
	 			 			if(arg.item.R23.length == 0)
	 			 				return "display:none;";
	 			 			else
	 			 				return "";
					    }
	 			 	},
	 			 	{type:"single", target:".t01_E_FN", value:function(arg)
					    {  
                    	   	return arg.item.R25;
					    }
	 			 	},
	 			 	{type:"single", target:".t01_E_FN@style", value:function(arg)
					    {  
		 			 		if(arg.item.R25.length == 0)
	 			 				return "display:none;";
	 			 			else
	 			 				return "";
					    }
	 			 	},
	 			 	{type:"single", target:".t01_P_FN", value:function(arg)
					    {  
                    	   	return arg.item.R27;
					    }
	 			 	},
	 			 	{type:"single", target:".t01_P_FN@style", value:function(arg)
					    {  
		 			 		if(arg.item.R27.length == 0)
	 			 				return "display:none;";
	 			 			else
	 			 				return "";
					    }
	 			 	},
	 			 	{type:"single", target:".t01_I_FN", value:function(arg)
					    {  
                    	   	return arg.item.R29;
					    }
	 			 	},
	 			 	{type:"single", target:".t01_I_FN@style", value:function(arg)
					    {  
		 			 		if(arg.item.R29.length == 0)
	 			 				return "display:none;";
	 			 			else
	 			 				return "";
					    }
	 			 	},
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"contlistnew", replace:true };
		// 그리기
		$("#contlist").bMRender(json.body, dir, options);
		
		$(".bx-viewport").css("height", ($("#tab01").height() + 56) + "px");
	},
};


