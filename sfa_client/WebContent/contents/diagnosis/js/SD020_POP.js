page = 
{	 
	custCode: "",
	seqn: "",
	houseYN: "",
    init:function(json)
	{
    	page.type = json.type;
    	page.custCode = json.custCode;
    	page.seqn = json.seqn;
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		// 지사 콤보박스 변경 이벤트
		$("#selBranch").change(function(){
			page.setPartUserCombobox("P01", $(this).val(), $("#selPart"));
			$("#selUser").html("<option value=''>담당자</option>");
		});
		
		// 파트 콤보박스 변경 이벤트
		$("#selPart").change(function(){			
			page.setPartUserCombobox("P02", $(this).val(), $("#selUser"));
		});
		
		$(".btn_close").click(function(){
			bizMOB.Ui.closeDialog();
		});
		
		$("#btnSelect").click(function(){
			if($("#selUser").val() == ""){
				bizMOB.Ui.toast("사원 선택 후 배정해주세요.");
				return;
			}
			var btnOK = bizMOB.Ui.createTextButton("네", function(){
				page.setDiagnosis();
			});
			var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
				
			});
			bizMOB.Ui.confirm("알림", "무료진단을 배정하시겠습니까?", btnOK, btnCancel);
		});

		$("#btnCancel").click(function(){
			bizMOB.Ui.closeDialog();
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
    		$that.val(strValue);
    		page.setPartUserCombobox("P02", bizMOB.Storage.get("partCode"), $("#selUser"), "THIRD", bizMOB.Storage.get("UserID"));
    	}
    	
    	// 담당자 세팅하는 부분
    	if(settingType == "THIRD"){
    		$that.val(strValue);
    	}
    },
    setDiagnosis: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD02002");
    	tr.body.P01 = page.custCode;
    	tr.body.P02 = page.seqn;
    	tr.body.P03 = $("#selUser").val();
    	tr.body.P04 = "";
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "무료진단 배정에 실패하였습니다.");
    				return;
    			}
    			bizMOB.Ui.toast("무료진단이 배정되었습니다.");
    			bizMOB.Ui.closeDialog({
    				modal : false,
	        		callback: "page.setDiagnosisAfter",
	        		message : 
					{
	    				deptName : $("#selBranch option:selected").text(),
	    				partName : $("#selPart option:selected").text(),
	    				userName : $("#selUser option:selected").text()	    				
					} 
    			});
    		}
    	});
    }
};


