page  =
{
	callback1 : "",
	type : "",
		
	init : function(json)
	{
		page.callback1 = json.callback1;
		page.type = json.type;
		
		// 기본 설정값
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData(json);
		page.initLayout();
		$("#selSType").trigger("change");
	},
	initInterface:function()
	{
		if(page.type == "N")
			$("#selSType").val("N");
		else
			$("#selSType").val("J");
		
		$("#selSType").change(function(){
			
			if($("#selSType").val() == "N"){
				$("#txtBuildingNo").show();
				$("#txtBuildingNM").show();
				$("#txtBuildingNo").val("");
				$("#txtBuildingNM").val("");
			}
			else{
				$("#txtBuildingNo").hide();
				$("#txtBuildingNM").hide();
				$("#txtBuildingNo").val("");
				$("#txtBuildingNM").val("");
			}
		});
		
		$("#selSIDO").change(function(){
			
			page.getAddrGUNGUList($("#selSIDO").val());
		});
		
		$("#btnClsTitle").click(function(){
			
			bizMOB.Ui.closeDialog();
		});
		
		$("#btnSearch").click(function(){
			
			page.getAddrSearchList();
			$("#tbCheckAddr").hide();
			$(".clAddrContent").css("top", "170px");
		});
		
		$("#listNew").delegate(".renderBody", "click", function() {
			
			$("#listNew").find(".renderBody").removeAttr("style");
			$(this).css("background-color", "#fff3dd");
			
			$("#txtSearchAddress1").val($(this).find(".clAddress1").text());
			$("#txtSearchAddress2").val($(this).find(".clAddress2").text());
			$("#txtSearchZipcode").val($(this).find(".clZipCode").text());
			$("#tbCheckAddr").show();
			$(".clAddrContent").css("top", "281px");
		});
		
		$("#ChecklistNew").delegate(".renderBody", "click", function() {
			
			$("#listNew").find(".renderBody").removeAttr("style");
			$("#listNew").find(".renderBody").attr("select", "0");
			
			$(this).css("background-color", "#fff3dd");
			$(this).attr("select", "1");
			
			$("#txtCheckLTAddress1").val($(this).find(".clLT_ADDR1").text());
			$("#txtCheckLTAddress2").val($(this).find(".clLT_ADDR2").text());
			$("#txtCheckLTZipcode").val($(this).find(".clLT_ZIPCODE").text());
			
			$("#txtCheckSTAddress1").val($(this).find(".clST_ADDR1").text());
			$("#txtCheckSTAddress2").val($(this).find(".clST_ADDR2").text());
			$("#txtCheckBuildingNM").val($(this).find(".clST_BLD").text());
			$("#txtCheckSTZipcode").val($(this).find(".clST_ZIPCODE").text());
			$("#txtCheckUNQ_LAW").val($(this).find(".clUNQ_LAW").text());
		
		});
		
		
		$("#btnAddrCheck").click(function(){
			
			page.GetAddrCheckList();
		});
		
		$("#btnBefore").click(function(){
			
			$("#divCheck").hide();
			$("#divSearch").show();
		});
		
		$("#btnSelect").click(function(){
			
			var $list = $("#ChecklistNew").find(".renderBody[select=1]");
			
			if($list.length > 0)
			{
				var rMsg = {};
				
				rMsg.LT_ZIPCODE = $($list[0]).find(".LT_ZIPCODE").text();
				rMsg.ZIPCODE5 = $($list[0]).find(".clZIPCODE5").text();
				rMsg.ZIPCODE6 = $($list[0]).find(".clZIPCODE6").text();
				rMsg.LT_ZIPSEQ = $($list[0]).find(".clLT_ZIPSEQ").text();
				rMsg.LT_ADDR1 = $($list[0]).find(".clLT_ADDR1").text();
				rMsg.LT_ADDR2 = $($list[0]).find(".clLT_ADDR2").text();
				rMsg.IN_ADDR1 = $("#txtSearchAddress1").val();
				rMsg.IN_ADDR2 = $("#txtSearchAddress2").val();
				rMsg.IN_TYPE = $("#selSType").val();
				rMsg.ST_ZIPCODE = $($list[0]).find(".clST_ZIPCODE").text();
				rMsg.ST_ADDR1 = $($list[0]).find(".clST_ADDR1").text();
				rMsg.ST_ADDR2 = $($list[0]).find(".clST_ADDR2").text();
				rMsg.ST_BLD = $($list[0]).find(".clST_BLD").text();
				rMsg.UNQ_LAW = $($list[0]).find(".clUNQ_LAW").text();
				rMsg.UNQ_OFFICE = $($list[0]).find(".clUNQ_OFFICE").text();
				rMsg.UNQ_BLD_MNO = $($list[0]).find(".clUNQ_BLD_MNO").text();
				rMsg.ADDR_RESULT = $($list[0]).find(".clADDR_RESULT").text();
				rMsg.GIS1X = $($list[0]).find(".clGIS1X").text();
				rMsg.GIS1Y = $($list[0]).find(".clGIS1Y").text();
				rMsg.GIS2X = $($list[0]).find(".clGIS2X").text();
				rMsg.GIS2Y = $($list[0]).find(".clGIS2Y").text();
				
				bizMOB.Ui.closeDialog({
					modal : false,
	        		callback:  page.callback1,
	        		message : rMsg
				});	
			}
			else
				alert("선택된 항목이 없습니다. 주소를 다시 확인해주세요!");
		});
	},
	
	initData:function(json)
	{
		page.getAddrSIDOList();
	},
	
	initLayout:function()
	{
		var IDName	  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("주소검색");
 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$(".submain").show();
 			$(".menuf").show();
 			$(".menuf").animate({
 				left : 0
 			}, 500);
  		   // 메뉴 열림 
 	         
 		}}));
 		
 		bizMOB.Ui.displayView(layout);
	},
	
	//시도 콤보박스 목록조회
	getAddrSIDOList: function(){
		
		var varParamList = [];
		varParamList.push(["strSIDO", ""]);
		
		// 검색목록을 Json스트링으로 변경하여 호출함!
		var datastromg = page.getParamsJasonString(varParamList);
		
		$.ajax({
			type: "POST",
			url: "http://112.169.182.145:8880/mCesnet/GetGroupwareInfo.asmx/GetAddrSIDOListJson",
			dataType: "json",
			data: datastromg,
			contentType: "application/json; charset=utf-8",
			success: function(msg) {
				
            	var rList = JSON.parse(msg.d);
            	
            	$("#selSIDO").html("");
            	$.each(rList, function(i, listElement){
            		$("#selSIDO").append("<option value='" + listElement.SIDO_NM + "'>" + listElement.SIDO_NM + "</option>");
            	});
            	$("#selSIDO").val("서울");
            	$("#selSIDO").trigger("change");
			},
			error: function(msg){
				
				var errJson = JSON.parse(msg.responseText);
				alert(errJson.Message);
			}
    	});
	},
	
	//시군구 콤보박스 목록조회
	getAddrGUNGUList: function(pSIDO){
		
		var varParamList = [];
		varParamList.push(["strSIDO", pSIDO]);
		
		// 검색목록을 Json스트링으로 변경하여 호출함!
		var datastromg = page.getParamsJasonString(varParamList);
		
		$.ajax({
			type: "POST",
			url: "http://112.169.182.145:8880/mCesnet/GetGroupwareInfo.asmx/GetAddrGUNGUListJson",
			dataType: "json",
			data: datastromg,
			contentType: "application/json; charset=utf-8",
			success: function(msg) {
				
            	var rList = JSON.parse(msg.d);
            	
            	$("#selGUNGU").html("");
            	$.each(rList, function(i, listElement){
            		$("#selGUNGU").append("<option value='" + listElement.GUNGU + "'>" + listElement.GUNGU + "</option>");
            	});
			},
			error: function(msg){
				var errJson = JSON.parse(msg.responseText);
				alert(errJson.Message);
			}
    	});
	},
	
	// 검색버튼 클릭 ( 주소 검색 리스트 조회 )
	getAddrSearchList: function(){
		
		var sKind = $("#selSType").val();
		var sZipCode = $("#txtZipCode").val();
		var sSIDO = $("#selSIDO").val();
		var sGungu = $("#selGUNGU").val();
 		var sStreetOrDond = $("#txtUMD").val();
 		var sBuildingNo = $("#txtBuildingNo").val();
 		var sBuildingNM = $("#txtBuildingNM").val();
		
		var varParamList = [];
		varParamList.push(["strSKind", sKind]);
		varParamList.push(["strZipCode", sZipCode]);
		varParamList.push(["strSido", sSIDO]);
		varParamList.push(["strGungu", sGungu]);
		varParamList.push(["strStreetOrDong", sStreetOrDond]);
		varParamList.push(["strBuildingNo", sBuildingNo]);
		varParamList.push(["strBuildingNM", sBuildingNM]);
		
		// 검색목록을 Json스트링으로 변경하여 호출함!
		var datastromg = page.getParamsJasonString(varParamList);
		
		$.ajax({
			type: "POST",
			url: "http://112.169.182.145:8880/mCesnet/GetGroupwareInfo.asmx/GetAddrSearchListJson",
			dataType: "json",
			data: datastromg,
			contentType: "application/json; charset=utf-8",
			success: function(msg) {
				
            	var json = JSON.parse(msg.d);
            	
        		if(json.header.result == true){
        			
        			if(json.body.List.length <= 0)
        				alert("조회된 내역이 없습니다.");
            		var dir = 
        			[
        			 	{
        			 		type:"loop",
        			 		target:".renderBody",
        			 		value:"List",
        			 		detail:
        		 			[
        						{type:"single", target:".clZipCode", value:"우편번호"},
        						{type:"single", target:".clSIDO", value:"시도명"},
        						{type:"single", target:".clGUNGU", value:"시군구명"},
        						{type:"single", target:".clUMD", value:"읍면동"},
        						{type:"single", target:".clBuildingNo", value:"건물번호"},
        						{type:"single", target:".clBuildingNM", value:"건물명"},
        						{type:"single", target:".clDetailNM", value:"상세주소"},
        						{type:"single", target:".clStreetNM", value:"도로명"},
        						{type:"single", target:".clHouseNum", value:"번지"},
        						{type:"single", target:".clUnderYN", value:"지하여부"},
        						{type:"single", target:".clAddress1", value:"주소"},
        						{type:"single", target:".clAddress2", value:"기타주소"}
//        						{type:"single", target:"@class", value:function(arg){
//        	 			 			return arg.item.R14 == "3" ? "TC_cancel" : (arg.item.R10 == "N" ? "" : "TC_new");
//        	 			 		}}
        	 		        ]
        			 	}
        			];
        			// 반복옵션(이전의 항목을 삭제하는 옵션)
        			var options = { clone:true, newId:"listNew", replace:true };
        			// 그리기
        			$("#listOri").bMRender(json.body, dir, options);
        		}
        		else
        			alert(json.header.error_text);
			},
			error: function(msg){
				var errJson = JSON.parse(msg.responseText);
				alert(errJson.Message);
			}
    	});
	},
	
	// 검증버튼 클릭 ( 선택주소 검증리스트 조회 )
	GetAddrCheckList: function(){
		
		var sSearchAddrZip = $("#txtSearchZipcode").val();
		var sSearchAddr1 = $("#txtSearchAddress1").val();
		var sSearchAddr2 = $("#txtSearchAddress2").val();
		var sSKind = $("#selSType").val();
		
		var varParamList = [];
		varParamList.push(["strSearchAddrZip", sSearchAddrZip]);
		varParamList.push(["strSearchAddr1", sSearchAddr1]);
		varParamList.push(["strSearchAddr2", sSearchAddr2]);
		varParamList.push(["strSKind", sSKind]);
		
		// 검색목록을 Json스트링으로 변경하여 호출함!
		var datastromg = page.getParamsJasonString(varParamList);
		
		$.ajax({
			type: "POST",
			url: "http://112.169.182.145:8880/mCesnet/GetGroupwareInfo.asmx/GetAddrCheckListJson",
			dataType: "json",
			data: datastromg,
			contentType: "application/json; charset=utf-8",
			success: function(msg) {
				
            	var json = JSON.parse(msg.d);
            	
            	if(json.header.result == true){
            		if(json.body.List.length <= 0)
        				alert("조회된 내역이 없습니다.");
            		var dir = 
        			[
        			 	{
        			 		type:"loop",
        			 		target:".renderBody",
        			 		value:"List",
        			 		detail:
        		 			[
    		 			 		{type:"single", target:".clLT_ZIPCODE", value:"LT_ZIPCODE"}, 	// 우편번호5자리
    		 			 		{type:"single", target:".clZIPCODE5", value:"ZIPCODE5"}, 		// 우편번호5자리
    		 			 		{type:"single", target:".clZIPCODE6", value:"ZIPCODE6"}, 		// 우편번호6자리
    		 			 		
    		 			 		{type:"single", target:".clLT_ZIPSEQ", value:"LT_ZIPSEQ"},		// 우편번호순번
    		 			 		{type:"single", target:".clLT_ADDR1", value:"LT_ADDR1"},		// 지번주소1
        						{type:"single", target:".clLT_ADDR2", value:"LT_ADDR2"},		// 지번주소2
        		 			 
        						{type:"single", target:".clST_ZIPCODE", value:"ST_ZIPCODE"},	// 신우편번호
        						{type:"single", target:".clST_ADDR1", value:"ST_ADDR1"},		// 신주소1
        						{type:"single", target:".clST_ADDR2", value:"ST_ADDR2"},		// 신주소2
        						{type:"single", target:".clST_BLD", value:"ST_BLD"},			// 건물명
        						
        						{type:"single", target:".clUNQ_LAW", value:"UNQ_LAW"},			// 법정동코드
        						{type:"single", target:".clUNQ_OFFICE", value:"UNQ_OFFICE"},	// 행정동코드
        						{type:"single", target:".clUNQ_BLD_MNO", value:"UNQ_BLD_MNO"},	// 건물관리번호
        						{type:"single", target:".clADDR_RESULT", value:"ADDR_RESULT"},	// 정제된주소결과
        						
        						{type:"single", target:".clGIS1X", value:"GIS1X"},				// 좌표X1
        						{type:"single", target:".clGIS1Y", value:"GIS1Y"},				// 좌표Y1
        						{type:"single", target:".clGIS2X", value:"GIS2X"},				// 좌표X2
        						{type:"single", target:".clGIS2Y", value:"GIS2Y"}				// 좌표Y2
        						
        	 		        ]
        			 	}
        			];
        			// 반복옵션(이전의 항목을 삭제하는 옵션)
        			var options = { clone:true, newId:"ChecklistNew", replace:true };
        			// 그리기
        			$("#ChecklistOri").bMRender(json.body, dir, options);
        			
        			$("#divSearch").hide();
        			$("#divCheck").show();        			
            	}
            	else {
            		alert(json.header.error_text);
            	}
			},
			error: function(msg){
				var errJson = JSON.parse(msg.responseText);
				alert(errJson.Message);
			}
    	});
	},
	
	getParamsJasonString:function(liPrams)
	{
		var strReturn = '';
		if(liPrams.length > 0){
			strReturn += '{';
			$.each(liPrams, function(i, listElement){	
				
				strReturn += '"' + listElement[0] + '":"' + listElement[1] + '"';
				
				if(i < liPrams.length - 1)
					strReturn += ',';
			});
			strReturn += '}';
		}
		return strReturn;
	},
	
	getDeList:function(pCustCode, $target)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS070");
		tr.body.vCustCode = pCustCode;
		
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
				
				page.renderDeList(json, "LIST", $target);
			}
		});
	}
};