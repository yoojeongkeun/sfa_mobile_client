page =
{
	mode : "",
	
	DBCODE : "",
	TBCODE : "",
	ITEMCODE : "",
	UNQCODE : "",
	ZIPCODE6 : "",
	ZIPSEQ : "",
	ZIPCODE5 : "",
	IN_ADDR1 : "",
	IN_ADDR2 : "",
	IN_TYPE : "",
	ST_ADDR1 : "",
	ST_ADDR2 : "",
	ST_BLD : "",
	LT_ADDR1 : "",
	LT_ADDR2 : "",
	COORDINATE1X : "",
	COORDINATE1Y : "",
	COORDINATE2X : "",
	COORDINATE2Y : "",
	ADDR_RESULT : "",
	UNQ_BLD_MNO : "",
	CHANGE_YN : "",
	UNQ_LAW : "",
	UNQ_OFFICE : "",
	
	init:function(json)
	{
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	
	initInterface:function()
	{
		$(".btn_search02").click(function(){
			bizMOB.Ui.openDialog("Address/html/AD001.html", 
			{
			message:{	
			 		callback1 : "page.setAddress",
		 			type : "O"
			 		}, 
			width:"90%",
			height:"90%"
			});
		});
		
		$(".btn_close").click(function(){
			bizMOB.Ui.closeDialog({		
				
			});
		});
		
		$("#largeCombo").change(function(){
		    page.setTypeMediumCombobox($("#mediumCombo"), $("#largeCombo"));
		});
		
		$(".custInfo").keypress(function(e){
			if(e.which == 13 && $("input[name='cust_rd']:checked").val() == "1") 
				page.getCustInfo(); 
			else if (e.which == 13 && $("input[name='cust_rd']:checked").val() == "2")
				page.callbackNotSelected();
		});
		
		// 초기화 버튼 클릭시
		$("#btnClear").click(function(){
			page.resetAllData();
			
		});
		
		$("#veriPhone1").click(function(){
			if($("#phoneNum1").val() == "")
			{
				bizMOB.Ui.alert("안내", "검증번호를 입력하세요.");
				return;
			}
			page.veriData("T", $(this));
		});
		
		$("#veriPhone2").click(function(){
			if($("#phoneNum2").val() == "")
			{
				bizMOB.Ui.alert("안내", "검증번호를 입력하세요.");
				return;
			}
			page.veriData("P", $(this));
		});
		
		$("#veriCorpNum").click(function(){
			if($("#corpNum").val() == "")
			{
				bizMOB.Ui.alert("안내", "검증번호를 입력하세요.");
				return;
			}
			page.veriData("C", $(this));
		});
		
		$("#phoneNum1").keydown(function(e){
			$("#veriPhone1").removeClass("btn02On");
		});
		
		$("#phoneNum2").keydown(function(e){
			$("#veriPhone2").removeClass("btn02On");
		});
		
		$("#corpNum").keydown(function(e){
			$("#veriCorpNum").removeClass("btn02On");
		});
		
		$("#selBR").change(function(){
			page.getComboBoxList("#selUserID", "C01", $(this).val());
		});
		
		$("#btnSave").click(function(){
			page.regist();
		});
		
		$(".custType").change(function(){
			if($("input[name='cust_rd']:checked").val() == "1")
			{
				page.resetAllData();
				$(".custTp").show();
				$("#largeCombo").removeAttr("disabled");
				page.setTypeLargeCombobox($("#largeCombo"));
				page.clear();
			}
			else
			{
				$(".custTp").hide();
				$("#largeCombo").val("340");
				$("#largeCombo").attr("disabled", true);
				page.setTypeMediumCombobox($("#mediumCombo"), $("#largeCombo"));
				page.clear();
			}
		});
	},
	
	initData:function(json)
	{
		page.setTypeLargeCombobox($("#largeCombo"));
		
		page.getComboBoxList("#selBR", "B01", "");
	},	 
	
	initLayout:function()
	{	
		
	},
	
	getCustInfo: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01302");	
		
		if($("#custCode").val().trim() == "" && $("#custNm").val().trim() == ""){
			bizMOB.Ui.alert("안내", "검색어를 입력 후 진행해주세요.");
			return;
		}
		
		tr.body.P01 = $("#custCode").val();		
		tr.body.P02 = $("#custNm").val();
		tr.body.P03 = "";
		tr.body.P04 = bizMOB.Storage.get("deptCode"); //TEST
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "유망고객 리스트를 불러오는데 실패하였습니다.");
					return;
				}
				
				if(json.body.LIST01.length == 0){
				// 고객 조회가 없을 경우 새로 발급
					page.callbackNotSelected();					
				}else if(json.body.LIST01.length > 1){
				// 고객 조회가 2 이상일 경우 팝업으로 고객 선택				
					page.json = json;
					var paramJson = {body: "", header: ""}; paramJson.body = {LIST01: [{}]}; paramJson.body.LIST01 = [];
					for(var i=0; i<json.body.LIST01.length; i++){
						paramJson.body.LIST01[i] = {R01:"", R02:""};
						paramJson.body.LIST01[i].R01 = json.body.LIST01[i].R01;
						paramJson.body.LIST01[i].R02 = json.body.LIST01[i].R02;
					}
					bizMOB.Ui.openDialog("sales/html/SD013_pop1.html", 
					{ 
						message : 
					   	{
							list: paramJson,
							type: "1",
							pageType: "1"
					   	},
					   	width:"95%",
						height:"85%"
					});
				}else{
					page.setCustData(json.body.LIST01[0]);
				}
			}		
		});
	},
	
	setCustData: function(list){
		$("#custCode").val(list.R01);
		$("#custNm").val(list.R02);
		$("#largeCombo").val(list.R06);
		page.setTypeMediumCombobox($("#mediumCombo"), $("#largeCombo"), list.R07);
		$("#newAddr1").val(list.R09 + " " + list.R10);
		$("#zipCode1").val(list.R08);
		$("#selBR").val(list.R05);
		page.getComboBoxList("#selUserID", "C01", list.R05, list.R27);
		
		page.mode = "U";
	},
	
	setAddress: function(rMsg){
		$("#newAddr1").val(rMsg.ST_ADDR1);
		$("#newAddr2").val(rMsg.ST_ADDR2 + ' ' + rMsg.ST_BLD);
		$("#zipCode1").val(rMsg.ST_ZIPCODE);
		
		page.DBCODE = "D001";
		page.TBCODE = "T001";
		page.ITEMCODE = "I001";
		page.UNQCODE = "";
		page.ZIPCODE6 = rMsg.ZIPCODE6;
		page.ZIPSEQ = rMsg.LT_ZIPSEQ;
		page.ZIPCODE5 = rMsg.ST_ZIPCODE;
		page.IN_ADDR1 = rMsg.IN_ADDR1;
		page.IN_ADDR2 = rMsg.IN_ADDR2;
		page.IN_TYPE = rMsg.IN_TYPE;
		page.ST_ADDR1 = rMsg.ST_ADDR1;
		page.ST_ADDR2 = rMsg.ST_ADDR2;
		page.ST_BLD = rMsg.ST_BLD;
		page.LT_ADDR1 = rMsg.LT_ADDR1;
		page.LT_ADDR2 = rMsg.LT_ADDR2;
		page.COORDINATE1X = rMsg.GIS1X;
		page.COORDINATE1Y = rMsg.GIS1Y;
		page.COORDINATE2X = rMsg.GIS2X;
		page.COORDINATE2Y = rMsg.GIS2Y;
		page.ADDR_RESULT = rMsg.ADDR_RESULT;
		page.UNQ_BLD_MNO = rMsg.UNQ_BLD_MNO;
		page.CHANGE_YN = "Y";
		page.UNQ_LAW = rMsg.UNQ_LAW;
		page.UNQ_OFFICE = rMsg.UNQ_OFFICE;
	},
	
	setTypeLargeCombobox: function($selectID){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01202");
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST01.length == 0){
    				bizMOB.Ui.alert("안내", "유형대 리스트를 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingCombobox($selectID, json.body.LIST01);
    			
    		}
    	});
    },
    
    setTypeMediumCombobox: function($selectID, $pSelectID, strValue){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01203");
    	tr.body.P01 = $pSelectID.val();
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST01.length == 0){
    				bizMOB.Ui.alert("안내", "유형중 리스트를 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingCombobox($selectID, json.body.LIST01, strValue);
    		}
    	});
    },
    
    bindingCombobox: function($that, list, strValue){
    	var comboboxOption = "";
    	$.each(list, function(i, listElement){
    		comboboxOption += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
    	});
    	$that.html(comboboxOption);
    	if(strValue != undefined)
    		$that.val(strValue);
    },
    
    callbackNotSelected: function(){
		var btnOK = bizMOB.Ui.createTextButton("네", function(){
			page.makeCustCode();
		});
		var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
			return;
		});
		bizMOB.Ui.confirm("알림", "새로운 고객코드를 발번하시겠습니까?", btnOK, btnCancel);
	},
	
	makeCustCode: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01307");
		tr.body.P01 = $("input[name='cust_rd']:checked").val();
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result || json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "고객코드 신규 발급에 실패하였습니다.");
					return;
				}
				page.resetAllData();
				$("#custCode").val(json.body.LIST01[0].고객코드);
				page.mode = "I"; // 신규 발번 후 insert 모드로
				$("#custCode").attr("disabled", ""); // 고객코드 수정 못 하도록
			}
		});
	},
	
	callbackSetCustList: function(message){
		var index = -1;
		for(var i=0; i<page.json.body.LIST01.length; i++){
			if(message.custCode == page.json.body.LIST01[i].R01){
				index = i;
				break;
			}
		}		
		if(index == -1){
			bizMOB.Ui.toast("일치하는 고객이 존재하지 않습니다.");
			return;
		}	
		page.setCustData(page.json.body.LIST01[i]);		
	},
	
	resetAllData: function(){
		$("#newAddr1").val("");
		$("#newAddr2").val("");
		$("#zipCode1").val("");
		
		if($("input[name='cust_rd']:checked").val() == "1")
		{
			$("#largeCombo").val(0);
			$("#mediumCombo").html("<option value> 유형중</option>");
		}
		else
		{
			$("#largeCombo").val("340");
			page.setTypeMediumCombobox($("#mediumCombo"), $("#largeCombo"));
		}
		
		$("#selBR").val("");
		$("#selUserID").html("<option value>관리사원</option>");
		
		$("#CustBR").val("");
		$("#CustUserID").val("");
		
		$(".btn02").removeClass("btn02On");
		$("#chkPage").removeAttr("checked");
	},
	
	clear: function(){
		$("#newAddr1").val("");
		$("#newAddr2").val("");
		$("#zipCode1").val("");
		
		$("#custCode").val("");
		$("#custNm").val("");
		$("#phoneNum1").val("");
		$("#phoneNum2").val("");
		$("#corpNum").val("");
		$("#Ceo").val("");
		$("#eMail").val("");
		
		$("#selBR").val("");
		$("#selUserID").html("<option value>관리사원</option>");
		
		$("#CustBR").val("");
		$("#CustUserID").val("");
		
		$(".btn02").removeClass("btn02On");
		$("#chkPage").removeAttr("checked");
	},
	
	veriData: function(type, $this){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01332");
		tr.body.P01 = type;
		tr.body.P02 = type == "T" ? $("#phoneNum1").val() : (type == "P" ? $("#phoneNum2").val() : $("#corpNum").val());
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "고객정보 체크에 실패했습니다.");
					return;
				}
				if(json.body.R01 == "0")
					{
						bizMOB.Ui.alert("안내", "해당 " + (type == "T" ? "전화번호" : (type == "P" ? "휴대폰번호" : "사업자번호")) + "는 미등록된 번호입니다.");
						$this.addClass("btn02On");
					}
				else
					{
						bizMOB.Ui.alert("안내","해당 " + (type == "T" ? "전화번호" : (type == "P" ? "휴대폰번호" : "사업자번호")) + "는 이미 존재하는 고객입니다. (고객코드: " + json.body.R01 +")");
						$this.removeClass("btn02On");
					}
			}
		});
	},
	
	 // 부서관련 콤보박스!
	getComboBoxList: function(selID, type, strValue, strUserID){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01303");
		tr.body.P01 = type;
		tr.body.P02 = strValue;
		tr.body.P03 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "본부 목록을 불러오는데 실패하였습니다.");
					return;
				}
				page.setComboBox(selID, json.body.LIST01, strUserID);
			}
		});		
	},
	// 부서관련 콤보박스!
	setComboBox: function(id, list, strUserID){
		var options = "";
		$.each(list, function(i, listElement){
			options += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
		});
		$(id).html(options);
		if(strUserID != undefined)
			$(id).val(strUserID);
	},
	
	regist: function(){
		
		if($("#chkPage").is(":checked"))
		{
			if($("#corpNum").val() == "" || $("#Ceo").val() == "" || $("#eMail").val() == "")
			{
				bizMOB.Ui.alert("안내", "계산서 발행시 하위메뉴는 필수등록하셔야 합니다.");
				return;
			}
		}
		
		var boolSave = false;
		
		var rList = $(".btn02");
		
    	$.each(rList, function(i, listElement){
    		if(!($(listElement).hasClass("btn02On")))
			{
    			if(!($("input[name='cust_rd']:checked").val() == 2 && $(listElement).attr("id") == "veriCorpNum"))
				{
    				boolSave = true;
				}
			}
    	});
    	
    	if(boolSave)
		{
    		bizMOB.Ui.alert("안내", "검증을 완료하여 주십시오.");
			return;
		}
		
		if(page.mode == ""){
			bizMOB.Ui.alert("안내", "고객 검색 혹은 새로운 고객코드 발번 후 등록이 가능합니다.");
			return;
		}
		if($("#custCode").val() == ""){
			bizMOB.Ui.alert("안내", "고객코드를 입력해주세요.");
			return;
		}
		if($("#CustBR").val() == ""){
			bizMOB.Ui.alert("안내", "고객 담당자를 입력해주세요.");
			return;
		}
		if($("#newAddr1").val() == ""){
			bizMOB.Ui.alert("안내", "주소 검색 후 등록해주세요.");
			return;
		}
    	
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01313");
		
		
		// 신주소 관련 파라미터
		tr.body.DBCODE = "D001";
		tr.body.TBCODE = $("#custCode").val().length == 6 ? "T001" : "T002";
		tr.body.ITEMCODE = "I001";
		tr.body.UNQCODE = $("#custCode").val();
    	tr.body.ZIPCODE6 = page.ZIPCODE6;
    	tr.body.ZIPSEQ = page.ZIPSEQ;
    	tr.body.ZIPCODE5 = page.ZIPCODE5;
    	tr.body.IN_ADDR1 = page.IN_ADDR1;
    	tr.body.IN_ADDR2 = page.IN_ADDR2;
    	tr.body.IN_TYPE = page.IN_TYPE;
    	tr.body.ST_ADDR1 = page.ST_ADDR1;
    	tr.body.ST_ADDR2 = page.ST_ADDR2;
    	tr.body.ST_BLD = page.ST_BLD;
    	tr.body.LT_ADDR1 = page.LT_ADDR1;
    	tr.body.LT_ADDR2 = page.LT_ADDR2;
    	tr.body.COORDINATE1X = page.COORDINATE1X;
    	tr.body.COORDINATE1Y = page.COORDINATE1Y;
    	tr.body.COORDINATE2X = page.COORDINATE2X;
    	tr.body.COORDINATE2Y = page.COORDINATE2Y;
    	tr.body.ADDR_RESULT = page.ADDR_RESULT;
    	tr.body.UNQ_BLD_MNO = page.UNQ_BLD_MNO;
    	tr.body.CHANGE_YN = page.CHANGE_YN;
    	tr.body.UNQ_LAW = page.UNQ_LAW;
    	tr.body.UNQ_OFFICE = page.UNQ_OFFICE;
		
		tr.body.P01 = $("#custCode").val();
		tr.body.P02 = $("#custNm").val();
		tr.body.P03 = "";
		tr.body.P04 = $("input[name='t02_rd']:checked").val();
		tr.body.P05 = "1"; // 더 보기
		tr.body.P06 = "";
		tr.body.P07 = $("#selBR").val();
		tr.body.P08 = $("#selUserID").val();
		tr.body.P09 = $("#CustBR").val();
		tr.body.P10 = $("#CustUserID").val();
		tr.body.P11 = $("#largeCombo").val();
		tr.body.P12 = $("#mediumCombo").val();
		tr.body.P13 = $("#phoneNum1").val();
		tr.body.P14 = $("#phoneNum2").val();
		tr.body.P15 = "";
		tr.body.P16 = $("#eMail").val();
		tr.body.P17 = page.ZIPCODE5;
		tr.body.P18 = page.IN_ADDR1; //$("#t02_txtOldAddress").val(); //$("#t02_txtOldAddress").attr("addr1"); 신주소1
		tr.body.P19 = page.ST_BLD + (page.ST_ADDR2 == "" ? "" : (" " + page.ST_ADDR2)) ; //$("#t02_txtOldAddress").attr("addr2"); 신주소2
		tr.body.P20 = "";
		tr.body.P21 = "";
		tr.body.P22 = "0";
		tr.body.P23 = "";
		tr.body.P24 = page.LT_ADDR1; //$("#t02_txtNewAddress").attr("addr1");  구주소1
		tr.body.P25 = page.LT_ADDR2; //$("#t02_txtNewAddress").attr("addr2");  구주소2
		tr.body.P26 = "";
		tr.body.P27 = page.mode;
		tr.body.P28 = $("#chkPage").is(":checked") ? "Y" : "N";
		tr.body.P29 = $("#Ceo").val();
		tr.body.P30 = $("input[name='cust_rd']:checked").val();
		
		var list01 = [];
		for(var i=0; i < 1; i++){
			list01.push({
				P01: $("#custCode").val(),
				P02: $("#CustBR").val(),
				P03: $("#CustUserID").val(),
				P04: "1",
				P05: $("#phoneNum1").val(),
				P06: $("#phoneNum2").val(),
				P07: "",
				P08: $("#eMail").val()
			});
		}
		
		tr.body.LIST01 = list01;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "유망고객 등록에 실패하였습니다.");
					return;
				}			
				bizMOB.Ui.toast("유망고객을 등록하였습니다.");
				page.searchCustList();
			}
		});
		
	},
	
	searchCustList:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISCS001");
		 
		tr.body.cSRCHTPCD = "CS002";
		tr.body.nvcSRCHVALU = $("#custCode").val();
		tr.body.cUSID = "";
				
		
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
				
				// 조회된 고객이 없을 경우				
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.toast("조회된 고객이 없습니다.");
					bizMOB.Ui.closeDialog();					
					return;
				}
				
				// 조회된 고객이 한 건일 경우
				if(json.body.LIST01.length == 1){
					bizMOB.Ui.closeDialog(
		    		{
		        		modal : false,
		        		callback: "master.callbackSetCustList",
		        		message : 
						{
		    				CustCode : json.body.LIST01[0].CUSTNO,
		    				CustName : json.body.LIST01[0].CUSTNM,
		    				CustClCd : json.body.LIST01[0].CUSTCLNO
						}        			
			        });
				}
			}
		});
		
	},
};


