page  =
/**
 * @author INSEOK
 *
 */
{
	strContractObjects: "",
    init : function(json)
    {
    	page.CustCode = json.custCode;
        // 기본 설정값
        page.initInterface();
        page.initData(json);
        page.initLayout();
    },
    
    initInterface:function()
    {     
    	$("#selHeadOffice").change(function(){
    		page.setBranchCombobox();
    	});
    	
    	$("#selTypeLarge").change(function(){
    		page.setTypeMediumCombobox();
    	});
    	
    	$("#selCustType").change(function(){
    		if($(this).val() == "2"){
    			$("#btnContractObject").css("background", "#02aed2");
    			$("#btnContractObject").addClass("btnOn");
    		}else if($(this).val() == "3"){
    			$("#btnContractObject").css("background", "#eeeeee");
    			$("#btnContractObject").removeClass("btnOn");
    		}else{
    			$("#btnContractObject").css("background", "#eeeeee");
    			$("#btnContractObject").removeClass("btnOn");
    		}
    	});
    	
    	$("#txtFromPyeong").keyup(function(){
    		$("#txtFromMeterSquare").val($(this).val() * 3.305785);    		
    	});
    	
    	$("#txtToPyeong").keyup(function(){
    		$("#txtToMeterSquare").val($(this).val() * 3.305785);    		
    	});
    	
    	$("#btnOpen").click(function(){
    		$(".searchDiv").toggle();
    		if($(".searchDiv").is(":visible")){
    			$(".divWrap").css("top", "340px");
    		}else{
    			$(".divWrap").css("top", "40px");
    		}    		
    	});
    	
    	$("#btnClear").click(function(){
    		$("#selBranch").val("");
    		$("#selTypeMedium").val("");
    		$("#selCustType").val("");
    		$("#txtCustCode").val("");
    		$("#txtCustName").val("");
    		$("#selType").val("");
    		$("#txtFromPyeong").val("");
    		$("#txtToPyeong").val("");
    	});
    
    	$("#btnSearch").click(function(){    		
    		page.totalCustomerSearch();
    	});
    	
    	$("#btnContractObject").click(function(){
    		if(!$(this).hasClass("btnOn")){
    			return;
    		}
    		var openOption = 
    		{
    			message:{ userID : "", contractObjects: page.strContractObjects.returnValue != undefined ? page.strContractObjects.returnValue : ""  },
    			width:"85%",
    			height:"70%", 
    			base_on_size:"page",
    			base_size_orientation:"vertical"
    		};
    		
    		bizMOB.Ui.openDialog("custmaster/html/CM093_1.html", openOption); 
    	});
    	
    	// 우편번호 클릭시
    	$("#txtZipCode").click(function(){
    		bizMOB.Ui.openDialog("custmaster/html/ZipCodeSearchPop.html", { 
				message : 
			   	{
					CustInfo  :  page.custInfo
			   	},
			   	width:"90%",
				height:"65%"
			});
    	});
    	
    	$("#tbodyListNew").delegate(".tableList", "click", function(){
    		bizMOB.Ui.openDialog("custmaster/html/CM007.html", 
			{ 
				message : 
			   	{
					custCode: $(this).find(".spanCustCode").text(),
					pageType: "POP"
			   	},
			   	width:"100%",
				height:"90%"
			});
    	});
    },
    
    initData:function(json)
    {
    	page.setHeadOfficeCombobox();
    	page.setBranchCombobox();
    	page.setTypeLargeCombobox();
    },
    initLayout:function()
    {	
    	var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		$("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("고객정보");
 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));
 		
 		bizMOB.Ui.displayView(layout);
    },
    setHeadOfficeCombobox: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01204");
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST01.length == 0){
    				bizMOB.Ui.alert("안내", "본부 리스트를 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingCombobox($("#selHeadOffice"), json.body.LIST01);
    		}
    	});
    },
    setBranchCombobox: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01205");
    	tr.body.P01 = $("#selHeadOffice").val();
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST01.length == 0){
    				bizMOB.Ui.alert("안내", "지사 리스트를 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingCombobox($("#selBranch"), json.body.LIST01);
    		}
    	});
    },
    setTypeLargeCombobox: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01202");
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST01.length == 0){
    				bizMOB.Ui.alert("안내", "유형대 리스트를 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingCombobox($("#selTypeLarge"), json.body.LIST01);
    		}
    	});
    },
    setTypeMediumCombobox: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01203");
    	tr.body.P01 = $("#selTypeLarge").val();
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST01.length == 0){
    				bizMOB.Ui.alert("안내", "유형중 리스트를 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingCombobox($("#selTypeMedium"), json.body.LIST01);
    		}
    	});
    },
    bindingCombobox: function($that, list){
    	var comboboxOption = "";
    	$.each(list, function(i, listElement){
    		comboboxOption += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
    	});
    	$that.html(comboboxOption);
    },
    totalCustomerSearch: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01201");
    	tr.body.deptCode = $("#selBranch").val() == "0" ? "" : $("#selBranch").val();
    	tr.body.custCode = $("#txtCustCode").val().trim();
    	tr.body.custName = $("#txtCustName").val().trim();
    	tr.body.custClass = $("#selCustType").val() == "" ? "0" : $("#selCustType").val();
    	tr.body.facilitiesName = $("#txtFacilitiesName").val().trim();
    	tr.body.address = $("#txtAddress").val().trim();
    	tr.body.zipCode = $("#txtZipCode").val().trim();
    	tr.body.typeB = $("#selTypeLarge").val().trim();
    	tr.body.typeM = $("#selTypeMedium").val() == "0" ? "" : $("#selTypeMedium").val();
    	tr.body.bizType = $("#selType").val() == "" ? "0" : $("#selType").val();
    	tr.body.contObject = page.strContractObjects.returnValue != undefined ? page.strContractObjects.returnValue : "";
    	tr.body.sizeYN = $("#chkWholeArea").prop("checked") ? "N" : "Y";
    	tr.body.fromSize = $("#txtFromPyeong").val().trim();
    	tr.body.toSize = $("#txtToPyeong").val().trim();
    	
    	if(tr.body.custCode == "" && tr.body.custName == "" && tr.body.facilitiesName == "" &&
    	   tr.body.typeB == "" && tr.body.typeM == "" && tr.body.custClass == "0" && tr.body.zipCode == "" && tr.body.address == ""){
    		bizMOB.Ui.alert("안내", "조회 조건을 한 가지 이상 입력해주세요.");
    		return;
    	}	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "고객 조회에 실패하였습니다.");
    				return;
    			}
    			if($("#selCustType").val() == "2"){
    				$("#divDefaultWrap").hide();
    				$("#divContractWrap").show();
    				$("#divCancelWrap").hide();
    				page.renderCustList(json, "Contract");
    			}else if($("#selCustType").val() == "3"){
    				$("#divDefaultWrap").hide();
    				$("#divContractWrap").hide();
    				$("#divCancelWrap").show();
    				page.renderCustList(json, "Cancel");
    			}else{    				
    				$("#divDefaultWrap").show();
    				$("#divContractWrap").hide();
    				$("#divCancelWrap").hide();
    				page.renderCustList(json, "");
    			}
    			
    		}
    	});
    },
    renderCustList: function(json, searchType){
    	var num = 1;
    	var dir = 
		[
		 	{
		 		type:"loop", target:".tableList", value:"LIST01",
		 		detail:
	 			[
	 			 	{ type:"single", target:".spanNumber", value: function(){
	 			 		return num++;
	 			 	} },
	 			 	{ type:"single", target:".spanHeadOffice", value: "R01" },
	 			 	{ type:"single", target:".spanBranch", value: "R02" },
	 			 	//{ type:"single", target:".spanCustType", value: "R03" },
	 			 	{ type:"single", target:".spanCustType", value: "R04" },
	 			 	{ type:"single", target:"@style+", value: function(args){
	 			 		switch(args.item.R04){
		 			 		case "계약고객": return "color: blue;"; break;
		 			 		case "해약고객": return "color: red;"; break;
		 			 		case "유망고객": return "color: green;"; break;
		 			 		default: return ""; break;
	 			 		}
	 			 	} },
					{ type:"single", target:".spanCustCode", value: "R05" },
					{ type:"single", target:".spanCustName", value: "R06" },
					{ type:"single", target:".spanContractArea", value: "R07" },
					{ type:"single", target:".spanOfficeType", value: "R08" },
					{ type:"single", target:".spanType", value: "R09" },
					{ type:"single", target:".spanAddress", value: "R10" },
					//{ type:"single", target:".", value: "R11" },
					{ type:"single", target:".spanPhoneNumber", value: "R12" },
					{ type:"single", target:".spanTypeLarge", value: "R13" },
					{ type:"single", target:".spanTypeMedium", value: "R14" },
					//{ type:"single", target:".", value: "R15" }, // 시설명인데 없음
					{ type:"single", target:".spanCancelDate", value: "R16" },
					{ type:"single", target:".spanCancelCause", value: "R17" },
					{ type:"single", target:".spanContractDate", value: "R18" },
					{ type:"single", target:".spanContractTerm", value: "R19" },
					{ type:"single", target:".spanContractType", value: "R20" },
					{ type:"single", target:".spanContractKind", value: "R21" },
					{ type:"single", target:".spanContractUserName", value: "R22" },
					{ type:"single", target:".spanEarlyAmount", value: "R23" },
					{ type:"single", target:".spanRegularAmount", value: "R24" }										
 		        ]
		 	}
		];
		var options = { clone:true, newId:"tbody" + searchType + "ListNew", replace:true };
		$("#tbody" + searchType + "List").bMRender(json.body, dir, options);
    },
    setContractObjects: function(resultValue){
    	page.strContractObjects = resultValue;
    },
    setZipCode: function(json){
    	$("#txtZipCode").val(json.zipCode);
    }
};

















