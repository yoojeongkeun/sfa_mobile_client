page = 
{	 
		custCode: "",
	 	userId: "",
	 	Text: "", // 문구
	 	Code: "", // return
	 	SurveyCode : "", // 문진코드
	 	CustName : "", // 고객명
	 	DiagType : "", // 진단구분	

	init:function(json)
	{		 
		page.initInterface();
		page.initData(json);
		page.initLayout();
		
		// 진단일시
		var nowDate  = new Date();
		$("#t03_calDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
		$("#t01_calDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));		
		
		// 부서 조회
		page.getComboBoxList();
		
		$("#t01_selBR").val(bizMOB.Storage.get("deptCode")); // 관리부서
		$("#t01_selUserID").val(page.userId); // 사원
		
		// 장비 조회
		page.SearchDevice();  
	},	 
	
	initInterface:function()
	{
		// 고객 검색
		$("#t02_btnSearch").click(function(){
			page.getCustInfo();			
		});
		
		// CLEAR 클릭
		$(".btn01").click(function(){
			
			$("#custCode").val("");
			$("#custNm").val("");
			var nowDate  = new Date();
			$("#t03_calDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
			$("#t01_calDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));	
			$("#contDept").val("");
			
    	});
		
		// 조회 클릭
		$(".btn03").click(function(){
			page.Search();
		});		
		
		// 관리부서 변경
		$("#t01_selBR").change(function(){
			 page.getComboBoxListUser("#t01_selUserID", "C01", $(this).val());
		 });
		
		// 그리드 클릭
		$("#contlistnew").delegate(".trTitle", "click", function() {
			var $this = $(this).parent().find(".trList"); 
			var value = $(this).attr("value"); 
			
			var isVisible = $(this).parent().find("#trList" + value).is(":visible");
//			$(".trList").hide();
			if(isVisible){
				$(this).parent().find("#trList" + value).hide();
			}else{
				$(this).parent().find("#trList" + value).show();
			}
    	});
		
		// 회수처리
		$(".btn_02").click(function(){
			
			$("input[class=chkBox]:checked").each(function (i, item) {
				var value = $(this).attr("value"); 
	            var PromotionNo = $(item).parent().parent().find("#PromotionNo").text().bMToNumber(); // 수불번호
	            var VendorCode = $(item).parent().parent().parent().find("#VendorCode" + value).text(); // 고객코드
	            var Last_Install_Date = $(item).parent().parent().parent().find("#tarNum" + value).text(); // 시작시간
	            var Item_SERL = $(item).parent().parent().find("#Device").text(); // 장비일련번호
	            var Last_Return_Date = $(item).parent().parent().parent().find("#tarNumEnd" + value).text(); // 종료시간
	            var FromDate = $(item).parent().parent().find("#Date").text().replace("-","").replace("-",""); // 설치일자
	            var No = $(item).parent().parent().find("#No").text().bMToNumber(); // 설치순번
	            
	            page.SaveCHK(PromotionNo, VendorCode, Last_Install_Date, Item_SERL, Last_Return_Date, FromDate, No);
	            
	        });
		});
		
		// 전체 체크
		$("#allChk").click(function(){
			if($("#allChk").prop("checked")) {
				$(".tlist03 input[type=checkbox]").prop("checked",true);
			} else {
				$(".tlist03 input[type=checkbox]").prop("checked",false);
			}
		});
		
		// 진단일시
		page.setDateTime("#t03_calDay", "#t03_btnCal");
		page.setDateTime("#t01_calDay", "#t01_btnCal");		 
		
	},	 
	
	initData:function(json)
	{
		page.custCode = json.CustCode;
 		page.userId = json.UserID;
 		page.Text = json.strText;
 		page.Code = json.strCode;
 		page.SurveyCode = json.strSurveyCode;
 		page.CustName = json.strCustName;
 		page.DiagType = json.strDiagType;
	},		
	
	initLayout:function()
	{
		var IDName    =  bizMOB.Storage.get("UserName");
 		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
 		
 		$("#subname").text(IDName);
 		
 		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
 		var layout = ipmutil.getDefaultLayout("무료체험 장비 회수");
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
	
	// 부서관련 콤보박스!
	getComboBoxListUser: function(selID, type, strValue, strUserID, strDeptCode){
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
	
	// 진단일시
	setDateTime: function(txtName, btnName){
		$(btnName).click(function(){	
			$(txtName).focus();
		});		
		
		var option = cescommutil.datePickerOption(function(date){		
			}, "yy-mm-dd"		 			
		);
		
		$(txtName).datepicker(option);
	},
	
	SaveCHK: function(PromotionNo, VendorCode, Last_Install_Date, Item_SERL, Last_Return_Date, FromDate, No){
		
		var nowDate  = new Date();
		
		// 체크
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01409");
		tr.body.P01 = PromotionNo; // 수불번호
		tr.body.P02 = "";
		tr.body.P03 = VendorCode; // 고객코드
		tr.body.P04 = "2"; // 회수. ITEM_STAT
		tr.body.P05 = Last_Install_Date; // 시작시간
		tr.body.P06 = nowDate.bMToFormatDate("yyyy-mm-dd HH:mm:ss"); // 회수일
		tr.body.P07 = "0"; // 회수기간
		tr.body.P08 = "무료체험 종료"; // 회수사유
		tr.body.P09 = page.userId;
		tr.body.P10 = "SD"; // 공기질 회수처리 구분
		tr.body.P11 = "";
		tr.body.P12 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "회수처리 체크에 실패하였습니다.");
					return;
				}
				
				list = json.body;
				var listCode1 = list.LIST01;
				var YN = "";
				
				if(listCode1[0].R01 != "Y"){
					YN = listCode1[0].R01;					
				}
				
				if(YN != ""){
					bizMOB.Ui.alert("안내", YN);
					return;
				}
				else{
					// 저장
					page.Save(Item_SERL, VendorCode, Last_Return_Date, PromotionNo, FromDate, No);
				}
			}
		});	
	},
	
	Save: function(Item_SERL, VendorCode, Last_Return_Date, PromotionNo, FromDate, No){
				
		// 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01410");
		tr.body.P01 = $(".selDept").val(); // 부서코드
		tr.body.P02 = Item_SERL;
		tr.body.P03 = "2"; // 회수
		tr.body.P04 = VendorCode; // 고객코드
		tr.body.P05 = $(".selUser").val(); // 사번
		tr.body.P06 = "1900-01-01";
		tr.body.P07 = "";
		tr.body.P08 = ""; 
		tr.body.P09 = 0;
		tr.body.P10 = ""; // 종료일자
		tr.body.P11 = Last_Return_Date; // 종료시간
		tr.body.P12 = page.userId; // 사번
		tr.body.P13 = "";
		tr.body.P14 = PromotionNo; // 수불번호
		tr.body.P15 = "7000"; 
		tr.body.P16 = "SD"; // 공기질 회수처리 구분
		tr.body.P17 = "";
		tr.body.P18 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "회수 처리하는데 실패하였습니다.");
					return;
				}
				
				list = json.body;
//				var listCode1 = list.LIST01;
				
				if(list.LIST01[0].R01 != "Y"){
					bizMOB.Ui.alert("안내", list.LIST01[0].R01);
					return;				
				}
				else{
					
					var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01411");
					tr.body.P01 = VendorCode; // 고객코드
					tr.body.P02 = FromDate; // 설치일자
					tr.body.P03 = Item_SERL; // 장비일련번호
					tr.body.P04 = No; // 설치순번
					tr.body.P05 = page.userId; // 사번
					tr.body.P06 = "";
					tr.body.P07 = "";
					
					bizMOB.Web.post({
						message: tr,
						success: function(json){
							if(!json.header.result){
								bizMOB.Ui.alert("안내", "회수 처리하는데 실패하였습니다.");
								return;
							}
							
							bizMOB.Ui.alert("안내", "회수 처리되었습니다.");
							page.Search();
							return;
						}
					});	
				}
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
			page.getComboBoxListUser("#t02_selUserID", "C01", strDeptCode, bizMOB.Storage.get("UserID"));
		}
	},
	
	// 부서
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
				
//				tab01.setUserInfoCombobox("t01_selHQ", json.body.LIST01, json.body.R01);
				page.setUserInfoCombobox("t01_selBR", json.body.LIST02, json.body.R02);
				page.setUserInfoCombobox("t01_selUserID", json.body.LIST03, json.body.R03);
				
				switch(json.body.R04){
					case "TYPE1": // 본사인원일때는 콤보박스 고정하지 않음
						break;
					case "TYPE2": // 본부장, 영업매니저일 경우에는 본부만 고정
//						$("#t01_selHQ").attr("disabled", "");						
						break;
					case "TYPE3": // 지사장, 팀장, SM일 경우에는 본부, 부서 고정
//						$("#t01_selHQ").attr("disabled", "");
						$("#t01_selBR").attr("disabled", "");
						break;
					case "TYPE4": // 그 외 인원들은 본부, 부서, 사원 고정
//						$("#t01_selHQ").attr("disabled", "");
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
	
	getCustInfo: function(){
		var custCode = $("#custCode").val();
		var custName = $("#custNm").val();
		
		if(custCode.trim() == "" && custName.trim() == ""){
			bizMOB.Ui.alert("안내", "고객코드나 고객명을 입력 후 조회해주세요.");
			return;
		}
		
		bizMOB.Ui.openDialog("sales/html/CustSearchPop.html", { 
			message : 
		   	{
				custCode: custCode,
				custName: custName,
				houseYN: $("#chkHomeCust").prop("checked") ? "Y" : "N",
				Where: "CM004"
		   	},
		   	width:"90%",
			height:"65%"
		});
	},
	
	SearchDevice: function(){
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01407");		
		tr.body.P01 = "DS02"; // 그룹코드
		if($("#t01_selUserID").val() == ""){
			tr.body.P02 = page.userId;
		}
		else{
			tr.body.P02 = $("#t01_selUserID").val();
		}
		tr.body.P03 = "Y"; //조회구분
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					list = json.body;
					var listCode1 = list.LIST01;
					
					$("#contDept option").remove();
					
					for ( var i = 0; i < listCode1.length; i++) {
						$("#contDept").append(
								"<option value='" + listCode1[i].R01 + "'>" + listCode1[i].R02 + "</option>");
					}	
				}
			}
		});
    },
    
    Search: function(){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01408");
		tr.body.P01 = $("#t03_calDay").val().replace("-","").replace("-",""); // From
		tr.body.P02 = $("#t01_calDay").val().replace("-","").replace("-",""); // To
		tr.body.P03 = $("#t01_selBR").val(); // DeptCode
		tr.body.P04 = $("#t01_selUserID").val(); // UserID
		tr.body.P05 = $("#custCode").val(); // CustCode
		tr.body.P06 = $("#contDept option:checked").text(); // 장비번호
		tr.body.P07 = ""; 
		tr.body.P08 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					
					list = json.body;
					var listCode1 = list.LIST01;
					
					$("#t01_conBody tr").remove();
					
					for ( var i = 0; i < listCode1.length; i++) {
						$("#t01_conBody").append(
								"<tr class = 'trTitle' value = '" + i + "'>"
									+ "<td><input type='checkbox' class = 'chkBox' value='" + i + "'></td>"
									+ "<td id = 'Date'>" + listCode1[i].R02 + "</td>"
									+ "<td id = 'Device'>" + listCode1[i].R03 + "</td>"
									+ "<td id = 'Division'>" + listCode1[i].R13 + "</td>"
									+ "<td style='display:none;' id = 'PromotionNo'>" + listCode1[i].R09 + "</td>"
									+ "<td style='display:none;' id = 'No'>" + listCode1[i].R04 + "</td>"
									+ "</tr>"
									
									+ "<tr class = 'trList' id = 'trList" + i + "'>"
									+ "<td></td>"
									+ "<td colspan='3'>"
									+ "<table class='t_dep04'>"
									+ "<colgroup>"
									+ "<col width='25%'></col>"
									+ "<col width='*'></col>"
									+ "<col width='25%'></col>"
									+ "<col width='*'></col>"
									+ "</colgroup>"
									+ "<tbody>"
									+ "<tr>"
									+ "<th>고객코드</th>"
									+ "<td id = 'VendorCode" + i + "'>" + listCode1[i].R01 + "</td>"
									+ "<th>고객명</th>"
									+ "<td>" + listCode1[i].R11 + "</td>"
									+ "</tr>"
									+ "<tr>"
									+ "<th class='tac'>설치형태</th>"
									+ "<td class='tarNum'>" + listCode1[i].R12 + "</td>"
									+ "<th class='tac'>설치담당</th>"
									+ "<td class='Pl10'>" + listCode1[i].R14 + "</td>"
									+ "</tr>"
									+ "<tr>"
									+ "<th class='tac'>회수여부</th>"
									+ "<td colspan='3' class='tarNum'>" + listCode1[i].R10 + "</td>"
									+ "</tr>"
									+ "<tr>"
									+ "<th class='tac'>설치주소</th>"
									+ "<td colspan='3' class='tarNum'>" + listCode1[i].R15 + "</td>"
									+ "</tr>"
									+ "<tr>"
									+ "<th class='tac'>시작시간</th>"
									+ "<td colspan='3' class='tarNum' id = 'tarNum" + i + "'>" + listCode1[i].R07 + "</td>"
									+ "</tr>"
									+ "<tr>"
									+ "<th class='tac'>종료시간</th>"
									+ "<td colspan='3' class='tarNum' id = 'tarNumEnd" + i + "'>" + listCode1[i].R08 + "</td>"
									+ "</tr>"
									+ "</tbody>"
									+ "</table></td>"
									+ "</tr>");
					}	
					
					$(".trList").hide();
				}
			}
		});
    },	
    
    // 고객 검색 callback
    
};

tab02={
	callbackGetDetailCustData: function(returnJson){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01326");
		tr.body.P01 = $("#chkHomeCust").prop("checked") ? "Y" : "N";
		tr.body.P02 = returnJson.custCode;
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "고객 상세데이터를 불러오는데 실패했습니다.");
					return;
				}
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "해당 고객의 상세정보가 존재하지 않습니다.");
					return;
				}
				var list = json.body.LIST01[0];
				$("#custCode").val(list.R01);
				$("#custNm").val(list.R02);			
			}
		});		
	},
}

