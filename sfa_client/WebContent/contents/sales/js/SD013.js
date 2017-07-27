function ale(msg){
	bizMOB.Ui.alert("안내", msg);
}

page = 
{	 
	list: "",
	mode:"I",
	slider:"",
	dutyCode: bizMOB.Storage.get("dutyCode"),
	positionType: "S",
	salesSeq: "",
	type: "2",
	
	custCode: "", // 무료진단 화면에서 넘어오는 고객코드
	custName: "", // 무료진단 화면에서 남어오는 고객명
    init:function(json)
	{
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		$(".btnClear").click(function(){
			var btnOK = bizMOB.Ui.createTextButton("네", function(){
				page.clear();	
			});
			var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
				return;
			});
			bizMOB.Ui.confirm("알림", "영업일지 화면을 초기화하시겠습니까?", btnOK, btnCancel);
		});
		
		$(".btnDelete").click(function(){
			if(page.mode == "M"){ // 삭제는 수정 모드일때만 가능
				var btnOK = bizMOB.Ui.createTextButton("네", function(){
					tab04.checkDate("D");
				});
				var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
					return;
				});
				bizMOB.Ui.confirm("알림","영업일지를 삭제하시겠습니까?", btnOK, btnCancel);
			}else{
				bizMOB.Ui.toast("삭제는 수정중이거나 입력 후에 가능합니다.");
			}
		});
	},	 
	initData:function(json)
	{
		page.custCode = json.custCode;
		page.custName = json.custName;
	},	 
	initLayout:function()
	{		
		var layout = ipmutil.getDefaultLayout("영업일지 등록");
		bizMOB.Ui.displayView(layout);
		$.get("SD013_tab01.html", function(data){
			$(".bxslider").append(data);
			$.get("SD013_tab02.html", function(data){
				$(".bxslider").append(data);
				$.get("SD013_tab03.html", function(data){
					$(".bxslider").append(data);
					$.get("SD013_tab04.html", function(data){
						tab04.setPage();
						$(".bxslider").append(data);
						page.slider = $('.bxslider').bxSlider({ 
							pager : false,
							controls: false,
							//adaptiveHeight: true,							
							touchEnabled: false,
							swipeThreshold: 150,
							infiniteLoop: false,
							onSlideBefore: function(){
								switch(page.slider.getCurrentSlide()){
								case 0:
									//$(".bot_btn").css("display", "none");
									$(".bot_btn").slideUp(100);
									$(".bx-viewport").css("height", ($("#tab01").height() + 56) + "px");
									break;
								case 1:
									$(".bot_btn").css("display", "none");
									$(".t02_footer").slideDown(100);
									$(".bx-viewport").css("height", ($("#tab02").height() + 86) + "px");
									break;
								case 2:
									$(".bot_btn").css("display", "none");
									$(".t03_footer").slideDown(100);
									$(".bx-viewport").css("height", ($("#tab03").height() + 226) + "px");
									break;
								case 3:
									$(".bot_btn").css("display", "none");
									$(".t04_footer").slideDown(100);
									$(".bx-viewport").css("height", ($("#tab04").height() + 56) + "px");
									break;
								default:
									break;		
								}
								$(".hide").parent().parent().scrollTop("0");
							},
							onSlideAfter: function(){
								$(".liTopMenu").removeClass("on");
								$($(".liTopMenu")[page.slider.getCurrentSlide()]).addClass("on");
								
							}
						});
						$(".topButtons").click(function(){
							page.slider.goToSlide($(this).attr("page") - 1); 
							
						});						
						page.onInitCompleted();
					});
				});
			});
		});
	},
	// HTML 모으고 bxSlider 기능 처리 후
	onInitCompleted: function(){
		//page.setCommonCombo();
		
		//---------- 직책에 따른 컨트롤 visible 처리 -----------
		var dc = page.dutyCode; //직책코드
		var ui = bizMOB.Storage.get("UserID");
		
		//dc = "B36"; //테스트
		
		if(dc == "B46"){ // 홈케어 카운슬러는 only 가정집 되게
			$(".trHomeCust").hide();
			$("#chkHomeCust").prop("checked", true);
			$("#N00002").parents("li").hide();
			$(".N00002_1").parent().show();
		}
		
		
		
		if(page.checkUser("1", ui)){ // 사번 체크로직
			
		}else if(page.checkUser("2", dc)){ // 직책 체크로직
			$("#t02_selBR").attr("disabled", "");
		}else{
			$("#t02_selBR").attr("disabled", "");
			$("#t02_selUserID").attr("disabled", "");
		}
		
		if(page.checkUser("3", dc)){
			page.positionType = "C";
			$(".t02_btnRegist").css("color", "#8E8E8E").css("background-color", "#767676").attr("disabled", "");
		}else if(page.checkUser("4", bizMOB.Storage.get("deptCode"))){
			page.positionType = "S";
		}
		
		tab01.init();
		tab02.init();
		tab03.init();
		tab04.init();
		
		if(page.custCode != undefined){			
			if(page.custCode.length == 10){
				$("#chkHomeCust").prop("checked", true);
				page.clear();
			}
			$("#t02_txtCustCode").val(page.custCode);
			$("#t02_btnSearch").trigger("click");
			page.slider.goToSlide(1);		
		}
		
		page.setCommonCombo();
	},
	checkUser: function(type, checkValue){
		var returnBoolValue = false;
		var userList = ["09112", "06389", "11027", "12157", "11159", "10860", "12380"];
		var dutyList = ["B39", "C34", "B33", "B31"];
		var positionTypeList = ["B35", "B36", "B38"];
		var deptCodeList = ["10225", "10210"];
		var actReasonList = ["A20000", "A60000", "A70000", "A80000", "A90000", "A100000", "A110000"];
		var list = [];
		switch(type){
			case "1": list = userList; break;
			case "2": list = dutyList; break;
			case "3": list = positionTypeList; break;
			case "4": list = deptCodeList; break;
			case "5": list = actReasonList; break;
		}
		for(var i=0; i<list.length; i++){
			if(list[i] == checkValue){
				returnBoolValue = true;
				break;
			}
		}		
		return returnBoolValue;
	},	
	setCommonCombo: function(callback){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01301");
		tr.body.P01 = "";
		if(bizMOB.Storage.get("dutyCode") == "C39"){
			tr.body.P01 = "FS";				
		}
		
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
					tab03.renderSubmitDoc(json);
					
					$(".Combo1 option").remove();
					$(".Combo2 option").remove();
					$(".Combo3 option").remove();
					$(".Combo4 option").remove();
					$(".Combo5 option").remove();
					
					var listCode1 = list.LIST01;

					for ( var i = 0; i < listCode1.length; i++) {
						$(".Combo1").append(
								"<option value='" + listCode1[i].R01 + "'>" + listCode1[i].R02 + "</option>");
					}
					
					var listCode2 = list.LIST02;

					for ( var i = 0; i < listCode2.length; i++) {
						$(".Combo2").append(
								"<option value='" + listCode2[i].R01 + "'>" + listCode2[i].R02 + "</option>");
					}
					
					var listCode3 = list.LIST03;

					for ( var i = 0; i < listCode3.length; i++) {
						$(".Combo3").append(
								"<option value='" + listCode3[i].R01 + "'>" + listCode3[i].R02 + "</option>");
					}
					
					var listCode4 = list.LIST04;

					for ( var i = 0; i < listCode4.length; i++) {
						$(".Combo4").append(
								"<option value='" + listCode4[i].R01 + "'>" + listCode4[i].R02 + "</option>");
					}
					
					var listCode5 = list.LIST05;

					for ( var i = 0; i < listCode5.length; i++) {
						$(".Combo5").append(
								"<option value='" + listCode5[i].R01 + "'>" + listCode5[i].R02 + "</option>");
					}
				}
			}		
		});		
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
    // 계약예상등급
    setContractExpactGradeCombobox: function(selID){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01303");
		tr.body.P01 = "Z01";
		tr.body.P02 = "";
		tr.body.P03 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "계약예상등급 목록을 불러오는데 실패하였습니다.");
					return;
				}
				page.setComboBox(selID, json.body.LIST01);
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
    // 부서관련 콤보박스!
	getComboBoxList: function(selID, type, strValue, strUserID, strDeptCode){
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
				page.setComboBox(selID, json.body.LIST01, strUserID, strDeptCode);
			}
		});		
	},
	// 부서관련 콤보박스!
	setComboBox: function(id, list, strUserID, strDeptCode){
		var options = "";
		$.each(list, function(i, listElement){
			options += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
		});
		$(id).html(options);
		if(strUserID != undefined)
			$(id).val(strUserID);
		if(strDeptCode != undefined){
			$(id).val(strDeptCode);
			page.getComboBoxList("#t02_selUserID", "C01", strDeptCode, bizMOB.Storage.get("UserID"));
		}
	},
	setDateTime: function(txtName, btnName){
		$(btnName).click(function(){
			$(txtName).focus();
		});
		var option = cescommutil.datePickerOption(function(date){		 				 
			}, "yy-mm-dd"		 			
		);
		$(txtName).datepicker(option);
	},
	changeDateFormat: function(date, symbol){
		if(date.length != 8)
			return "";
		if(symbol == undefined)
			symbol = "-";
		return date.substr(0, 4) + symbol + date.substr(4, 2) + symbol + date.substr(6, 2);
					
	},
	setSalesReport: function(custCode, seqn, userId){ // 상세 불러오기 테스트
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01312");
		tr.body.P01 = custCode;
		tr.body.P02 = seqn;
		tr.body.P03 = userId;
		tr.body.P04 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "업무일지 내역 불러오는데 실패하였습니다.");
					return;
				}
				page.slider.goToSlide(1);
				
				tab02.setData(json.body.LIST01[0], userId);
				
				tab03.setData(json.body.LIST02[0]);
				tab03.renderCompList(json);
				tab03.setSubmitDoc(json.body.LIST07);
				
				if(json.body.LIST05.length != 0) // 영업이관 정보가 있으면
					tab03.setTransData(json.body.LIST05[0]);
				
				var pageType = false;
				var divideList = json.body.LIST08;
				
				$.each(divideList, function(i, colElement){
					if(colElement.R01 == "Y")
						pageType = true;
				});
				
				if(pageType) // 과거 / 현재 일지 구분 향후 일자로 처리
				{
					page.type = "2";
					tab04.setPage();
					tab04.setDetailData2(json, "LIST03");
					tab04.renderList2(json, ".contTarg", "diagTb", "LIST08", json.body.LIST09);
				}
				else
				{
					page.type = "1";
					tab04.setPage();
					tab04.setDetailData(json, "LIST03");
				}
				
				page.salesSeq = json.body.LIST02[0].R02;
				page.mode = "M";
				$("#t02_txtCustCode").attr("disabled", "");
				$("#t02_txtCustName").attr("disabled", "");
				$(".t03_btnRegist, .t04_btnRegist").text("일지수정");	

			}
		});
	},
	clear: function(){
		tab02.initData();
		tab02.initLayout();
		tab03.initData();
		tab03.initLayout();
		page.type = "2";
		tab04.setPage();
		tab04.initData();
		tab04.initLayout();
		$("#t02_txtCustCode").val("");
		$("#t02_txtCustName").val("");
		$("#t02_txtFacilityName").val("");
		$("#t02_typeMedium").html('<option value=""> 유형중</option>');
		$("#t02_txtNewAddress").val("");
		$("#t02_txtAddressNumber").val("");
		
		$("#t03_selWorkType").val("");
		$("#t03_colorcutor").val("");
		$("#textCont").val("");
		$("#t03_AccompListNew").html("");
		$("#t03_selDeType").html('<option value="">세부구분</option>');
		$("#t03_selActReason").html('<option value="">활동사유</option>');
		$("#t03_selCounResult").html('<option value="">상담결과</option>');
		$("#t03_selFutPlan").html('<option value="">향후계획</option>');
		
		$("#t03_btnFree").removeClass("btn_on");
		$("#t03_btnTrans").removeClass("btn_on");
		
		// 영업이관 관련 초기화
		$(".t03_tab06").hide();
		$("#VISITDATE, #INTERVIEWER, #PHONE1, #PHONE2, #PHONE3, #HP1, #HP2, #HP3").val("");
		$("input[name=Chk]").prop("checked", false);
		$(".t03_chkSubmitDoc").prop("checked", false); 
		$(".t03_tab01").trigger("click");
		
		// FS 관련 초기화
		$("#t03_selFSClassify").html('<option value="">분류</option>');
		$("#t03_txtPerformOrder").val("");
		$("#t03_calTestSendDay").val("");
		$("#t03_txtTime").val("");
		$("#t03_calNextPlan").val("");
		
		page.mode = "I";
		page.salesSeq = "";
		$("#t02_txtCustCode").removeAttr("disabled");
		$("#t02_txtCustName").removeAttr("disabled");
		$(".t03_btnRegist, .t04_btnRegist").text("일지등록");		
	},
	deleteReport: function(){
		if(page.salesSeq == ""){ 
			bizMOB.Ui.toast("삭제하지 못하였습니다.");
			return;
		}
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01325");
		tr.body.P01 = $("#t02_txtCustCode").val();
		tr.body.P02 = page.salesSeq;
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "영업일지 삭제에 실패하였습니다.");
					return;
				}
				if(json.body.R01 == "9999"){
					bizMOB.Ui.alert("안내", "이미 승인된 영업문서가 존재하여 삭제할 수 없습니다.");
				}else{
					bizMOB.Ui.toast("영업일지가 삭제되었습니다.");
					$(".t01_btnSearch").trigger("click");
					page.clear();
				}
			}
		});
	}
};



