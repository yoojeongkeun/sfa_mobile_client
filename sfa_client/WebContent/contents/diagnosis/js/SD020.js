
page  =
{
	custCode : "",
	brandName: "",
	custName: "",
	$that: "",
	$listThat: "",
	init : function(json)
	{
		// 기본 설정값
		ipmutil.resetChk();
		ipmutil.appendCommonMenu();
		
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		$(".div_table").css("width", "initial"); //테스트용 삭제하기
		
		// 리스트 펼침 이벤트
		$("#tableListNew").delegate(".trTitle", "click", function(){
			var $this = $(this).parent().find(".trList"); 
			var isVisible = $this.is(":visible");
			$(".trList").hide();
			if(isVisible){
				$this.hide();
			}else{
				$this.show();
			}
		});
		
		// 지사 콤보박스 변경 이벤트
		$("#selBranch").change(function(){
			page.setPartUserCombobox("P01", $(this).val(), $("#selPart"));
			$("#selUser").html("<option value=''>담당자</option>");
		});
		
		// 파트 콤보박스 변경 이벤트
		$("#selPart").change(function(){			
			page.setPartUserCombobox("P02", $(this).val(), $("#selUser"));
		});
		
		// 무료진단 배정 버튼 클릭 이벤트
		$("#tableListNew").delegate(".btnRegist", "click", function(){
			// HC로 분배된 고객은 HC 자신만 수정 가능하다.
			if($(this).parents(".tbodyList").attr("r25") == "999998" && $(this).parents(".tbodyList").attr("userid") != bizMOB.Storage.get("UserID")){
				bizMOB.Ui.alert("안내", "HC에게 분배된 고객은 HC만 수정할 수 있습니다.");
				return;
			}
			page.$listThat = $(this);
			bizMOB.Ui.openDialog("diagnosis/html/SD020_POP.html", 
			{ 
				message : 
			   	{
					custCode: $(this).parents(".tbodyList").attr("custcode"),
					seqn: $(this).parents(".tbodyList").attr("seqn")
			   	},
			   	width:"80%",
				height:"42%"
			});
			
		// 전화 버튼 눌렀을 때 처리
		}).delegate('.btn_call', 'click', function(){
			var $that = $(this);
			var btnOK = bizMOB.Ui.createTextButton("네", function(){
				bizMOB.Phone.tel($that.parents(".tbodyList").find(".txtPhoneNumber").text().trim());
			});
			var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
				
			});
			bizMOB.Ui.confirm("알림", "고객과 통화를 하시겠습니까?", btnOK, btnCancel);	
		
		// 문자 버튼 눌렀을 대 처리
		}).delegate('.btn_sms', 'click', function(){
			var $that = $(this);
			var btnOK = bizMOB.Ui.createTextButton("네", function(){				
				bizMOB.Phone.sms($that.parents(".tbodyList").find(".txtPhoneNumber").text().trim(), "");
			});
			var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
				
			});
			bizMOB.Ui.confirm("알림", "고객에게 문자 메세지를 보내시겠습니까?", btnOK, btnCancel);
		// 무료진단해제 버튼 클릭 이벤트	
		}).delegate(".btnClear", "click", function(){
			if($(this).parents(".tbodyList").attr("r25") == "999998" && $(this).parents(".tbodyList").attr("userid") != bizMOB.Storage.get("UserID")){
				bizMOB.Ui.alert("안내", "HC에게 분배된 고객은 HC만 수정할 수 있습니다.");
				return;
			}
			var $this = $(this);
			if($this.parents(".tbodyList").attr("R04") == "N"){
				bizMOB.Ui.toast("취소된 고객입니다.");
				return;
			}
			if($this.parents(".tbodyList").attr("R32") == "Y"){
				bizMOB.Ui.toast("이미 진단이 완료된 고객입니다.");
				return;
			}
			var btnOK = bizMOB.Ui.createTextButton("네", function(){				
				page.clearDiagnosis($this);
			});
			var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
				
			});
			bizMOB.Ui.confirm("알림", "무료진단을 해제하시겠습니까?", btnOK, btnCancel);
		// 영업일지 버튼 클릭 이벤트
		}).delegate(".btnGotoSalesActivity", "click", function(){			
			bizMOB.Web.open("sales/html/SD013.html", {
				modal : false,
				replace : false,
				message : {
					custCode: $(this).parents(".tbodyList").find(".txtCustCode").text().trim(),
					custName: $(this).parents(".tbodyList").find(".txtCustName").text().trim()
				}
			});
		// 접촉이력 버튼 클릭 이벤트
		}).delegate(".btnGotoContactHistory", "click", function(){
			bizMOB.Web.open("custmaster/html/CM075.html", {
				modal : false,
				replace : false,
				message : {
					custCode: $(this).parents(".tbodyList").find(".txtCustCode").text().trim()
				}
			});
		// 고객정보 버튼 클릭 이벤트
		}).delegate(".btnGotoCustInfo", "click", function(){
			bizMOB.Web.open("custmaster/html/CM007.html", {
				modal : false,
				replace : false,
				message : {
					custCode: $(this).parents(".tbodyList").find(".txtCustCode").text().trim()
				}
			});
		});
		
		// 조회 버튼 클릭 이벤트
		$(".btnSearch").click(function(){
			page.getFreeDiagnosisList();
		});
		
		$(".btn_close").click(function(){			
			if($(this).hasClass("btn_close")){
				$(".tlist00").hide();
				$(".c_btn").hide();
				$(".div_table").css("top", "-8px");
				$(this).removeClass("btn_close").addClass("btn_open");				
			}else if($(this).hasClass("btn_open")){
				$(".tlist00").show();
				$(".c_btn").show();
				$(".div_table").css("top", "150px");
				$(this).removeClass("btn_open").addClass("btn_close");
			}
		});
	},
	initData:function(json)
	{	
		page.setBranchCombobox("FIRST", bizMOB.Storage.get("deptCode"));		
	},
	initLayout:function()
	{
		
		// 지사 로그인 시 지사를 변경 못 하도록 처리
		var deptCode = bizMOB.Storage.get("deptCode");
		if(deptCode >= "10280" && deptCode <= "18011"){
			$("#selBranch").attr("disabled", "");
		}
		
		var option = cescommutil.datePickerOption(function(date){		 				 
			}, "yy-mm-dd"		 			
		);
		$("#calFrom").datepicker(option).val((new Date()).bMAddMonth(-1).bMToFormatDate());
		$("#calTo").datepicker(option).val((new Date()).bMToFormatDate());
				
		
		$("#btnCalFrom").click(function(){
			$("#calFrom").focus();
		});
		
		$("#btnCalTo").click(function(){
			$("#calTo").focus();
		});
		
		var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		$("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("무료진단 배정");
 		/*layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));*/
 		
 		bizMOB.Ui.displayView(layout);
	},	
	getFreeDiagnosisList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD02001");
		
		tr.body.P01 = $("#selBranch").val();
		tr.body.P02 = $("#calFrom").val().replace(/-/g, "");
		tr.body.P03 = $("#calTo").val().replace(/-/g, "");
		tr.body.P04 = $("input[name=rdCustType]:checked").val();
		tr.body.P05 = $("#selStatus").val();
		tr.body.P06 = $("#selPart").val();
		tr.body.P07 = $("#selUser").val();
		
		
		
		/* 테스트 데이터
		//'12020', '20130715', '20130720', '4', '0','',''
		tr.body.P01 = "12020";
		tr.body.P02 = "20150415";
		tr.body.P03 = "20150820";
		tr.body.P04 = "4";
		tr.body.P05 = "0";
		tr.body.P06 = "";
		tr.body.P07 = "";
		*/
		
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "무료진단 배정 리스트를 불러오는데 실패하였습니다.");
					return;
				}
				
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.toast("검색 조건에 맞는 데이터가 없습니다.");
					return;
				}
				
				page.renderList(json);				
			}
		});
	},
	renderList: function(json){
		var num = 1;
		var dir = 
        [
            {
                type:"loop",
                target:".tbodyList",
                value:"LIST01",
                detail:
                [
                 	{type:"single", target:".num", value: function(json){
                 		return num++;
                 	}},
                 	{type:"single", target:"@seqn+", value: "R02"},
                 	{type:"single", target:"@custcode+", value: "R03"},
                 	{type:"single", target:"@R04+", value: "R04"}, //이관
                 	{type:"single", target:"@R29+", value: "R29"}, //이관
                 	{type:"single", target:"@R30+", value: "R30"}, //배정
                 	{type:"single", target:"@R32+", value: "R32"}, //진단
                 	{type:"single", target:"@R34+", value: "R34"}, //계약
                 	{type:"single", target:"@R25+", value: "R25"}, //파트코드?(HC가 999998로 되어있는 코드)
                 	{type:"single", target:"@userid+", value: "R27"}, //분배자 사번
                    {type:"single", target:".txtCustName", value: "R05"},
                    {type:"single", target:".txtCustCode", value: "R03"},
                    {type:"single", target:".txtCancelYN", value: function(json){
                    	return json.item.R04 == "Y" ? "진행" : "취소";
                    }},
                    {type:"single", target:".txtCancelYN@class", value: function(json){
                    	return json.item.R04 == "Y" ? "txtCancelYN label02" : "txtCancelYN label03";
                    }},
                    {type:"single", target:".txtMoveDate", value: "R01"},                    
                    {type:"single", target:".txtAddress", value: "R17"},
                    {type:"single", target:".txtAssign", value: function(json){
                    	if(json.item.R30 == "Y"){
                    		return "배정";	
                    	}else{
                    		return "미배정";
                    	}
                    }},                    
                    {type:"single", target:".txtStatus", value: function(json){
                    	var returnValue = "";
                    	if(json.item.R29 == "Y"){
                    		returnValue = "이관";
                    	}
                    	if(json.item.R30 == "Y"){
                    		returnValue = "배정";	
                    	}
                    	if(json.item.R32 == "Y"){
                    		returnValue = "진단";
                    	}
                    	if(json.item.R34 == "Y"){
                    		returnValue = "계약";
                    	}
                    	return returnValue;
                    }},
                    {type:"single", target:".txtDistDeptName@value", value: "R37"},
                    {type:"single", target:".txtDistPartName@value", value: "R26"},
                    {type:"single", target:".txtDistUserName@value", value: "R28"},
                    {type:"single", target:".txtRespDeptName", value: "R15"},
                    {type:"single", target:".txtMajorContents", value: "R18"},
                    {type:"single", target:".txtTypeLarge", value: "R08"},
                    {type:"single", target:".txtTypeMedium", value: "R09"},
                    {type:"single", target:".txtBugKind", value: function(json){
                    	return json.item.R20.trim().length == 0 ? "" : json.item.R20.substr(0, json.item.R20.length - 1); 
                    }},                    
                    {type:"single", target:".txtChildYN", value: "R41"},
                    {type:"single", target:".txtTelNumber", value: "R10"},
                    {type:"single", target:".txtPhoneNumber", value: "R11"},                    
                    {type:"single", target:".txtReceiptUser", value: "R14"},
                    {type:"single", target:".txtMemo", value: "R24"}
                ]
            }
        ];
        var options = { clone:true, newId: "tableListNew", replace:true };
        $("#tableList").bMRender(json.body, dir, options);
	},
	setBranchCombobox: function(settingType, strValue){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01205");
    	tr.body.P01 = "";
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST01.length == 0){
    				bizMOB.Ui.alert("안내", "지사 리스트를 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingCombobox($("#selBranch"), json.body.LIST01, settingType, strValue);
    		}
    	});
    },
    setPartUserCombobox: function(searchType, searchData, $searchCombobox, settingType, strValue){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SDC0001");
    	
    	if(searchType == "P01"){
	    	tr.body.P01 = searchType;
	    	tr.body.P02 = searchData;
	    	tr.body.P03 = "";
	    	tr.body.P04 = "";
	    	
    	}else if(searchType == "P02"){
    		tr.body.P01 = searchType;
	    	tr.body.P02 = $("#selBranch").val();
	    	tr.body.P03 = searchData;
	    	tr.body.P04 = "";
    		
    	}
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "리스트를 불러오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingCombobox($searchCombobox, json.body.LIST01, settingType, strValue);
    		}
    	});
    	
    },
    bindingCombobox: function($that, list, settingType, strValue){
    	var comboboxOption = "";
    	$.each(list, function(i, listElement){
    		comboboxOption += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
    	});
    	$that.html(comboboxOption);
    	
    	// 최초 콤보박스 바인딩 시 지사 세팅 후 파트 콤보박스 불러옴
    	if(settingType == "FIRST"){
    		$that.val(strValue);
    		page.setPartUserCombobox("P01", bizMOB.Storage.get("deptCode"), $("#selPart"), "SECOND", bizMOB.Storage.get("partCode"));
    	}
    	
    	// 파트코드 세팅하는 부분
    	if(settingType == "SECOND"){
    		//$that.val(strValue);
    		page.setPartUserCombobox("P02", bizMOB.Storage.get("partCode"), $("#selUser"), "THIRD", bizMOB.Storage.get("UserID"));
    	}
    	
    	// 담당자 세팅하는 부분
    	if(settingType == "THIRD"){
    		//$that.val(strValue);
    		page.getFreeDiagnosisList();
    	}
    },
    // 배정진단 해제
    clearDiagnosis: function($that){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD02003");
    	tr.body.P01 = $that.parents(".tbodyList").attr("custcode").trim();
    	tr.body.P02 = $that.parents(".tbodyList").attr("seqn").trim();
    	tr.body.P03 = "";
    	page.$that = $that;
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "무료진단 해제에 실패하였습니다.");
    				return;
    			}
    			bizMOB.Ui.toast("무료진단이 해제되었습니다.");
    			
    			// 무료진단 해제 후 화면 리로드가 아닌 값만 변경해줌
    			$changeList = page.$that.parents(".tbodyList");
    			$changeList.find(".txtAssign").text("미배정");
    			$changeList.find(".txtDistDeptName").val("");
    			$changeList.find(".txtDistPartName").val("");
    			$changeList.find(".txtDistUserName").val("");
    		}
    	});
    },
    // 배정 팝업 후 콜백 함수
    setDiagnosisAfter: function(json){
    	var $that = page.$listThat.parents(".tbodyList"); 
    	$that.find(".txtDistDeptName").val(json.deptName);
    	$that.find(".txtDistPartName").val(json.partName);
    	$that.find(".txtDistUserName").val(json.userName);
    	$that.find(".txtAssign").text("배정");
    }
};