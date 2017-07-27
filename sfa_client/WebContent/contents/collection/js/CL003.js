page  =
{
	userID: "",
	deptCode: "",
	cdCompany: "7000",
	cardTradeNumber: "", // 7702
	closingNumber: "", // SH
	billingNumber: "",
	ref_no_rcp: "",
	init : function(json)
	{			
		page.initFirst(json);
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initFirst: function(){
		page.userID = bizMOB.Storage.get("UserID");
		page.deptCode = bizMOB.Storage.get("deptCode");
		ipmutil.resetChk();
		ipmutil.appendCommonMenu(page.userName);
	},
	initInterface:function()
	{	
		page.setDateTime("#calFrom", "#btnCalFrom");
		page.setDateTime("#calTo", "#btnCalTo");
		var nowDate  = new Date();
		$("#calFrom").val(nowDate.bMAddDay(-3).bMToFormatDate("yyyy-mm-dd"));
		$("#calTo").val((new Date()).bMToFormatDate("yyyy-mm-dd"));
		
		$("#btnSearch").click(function(){
			page.setReceiptList();
		});		
		
		$("#cancelationListNew").delegate(".listHeader", "click", function(){
			if($(this).parent().hasClass("bg02")){
				$(this).parent().find(".cardInfomation").toggle();
				return;
				
			}
			$(".approvalCancelList").removeClass("bg02");
			$(this).parent().addClass("bg02");
			$(".cardInfomation").hide();
			$(this).parent().find(".cardInfomation").show();
		});
			
		// 영수증 문자 출력 버튼 클릭
		$("#btnReceiptByPhone").click(function(){
			var focusRow = $(".bg02");
			
			var phoneNumber = focusRow.find(".txtPhoneNumber").val().trim(); // 고객연락처
			if(phoneNumber == ""){
				bizMOB.Ui.alert("안내", "고객 휴대전화번호를 확인해주세요.");				
				return;
			}
			
			if(!$(".approvalCancelList").hasClass("bg02")){
				bizMOB.Ui.alert("안내", "영수증 출력 할 건을 선택해주세요.");
				return;
			}
			var btnOK = bizMOB.Ui.createTextButton("확인", function(){
				page.printReceipt(phoneNumber);
			});			
			var btnCancel = bizMOB.Ui.createTextButton("돌아가기", function(){
				return;
			});
			
			bizMOB.Ui.confirm("안내", "해당 건의 영수증을 [" + phoneNumber + "] 번호로 보내시겠습니까?", btnOK, btnCancel);
					
		});
		
		// 영수증 E-Mail 출력 버튼 클릭
		$("#btnReceiptByEMail").click(function(){
			var focusRow = $(".bg02");
			
			var email = focusRow.find(".txtEMail").val().trim(); // 고객연락처
			if(email == ""){
				bizMOB.Ui.alert("안내", "고객 E-Mail을 확인해주세요.");				
				return;
			}
			
			if(!$(".approvalCancelList").hasClass("bg02")){
				bizMOB.Ui.alert("안내", "영수증 출력 할 건을 선택해주세요.");
				return;
			}
			var btnOK = bizMOB.Ui.createTextButton("확인", function(){
				page.printReceipt(email);
			});			
			var btnCancel = bizMOB.Ui.createTextButton("돌아가기", function(){
				return;
			});
			
			bizMOB.Ui.confirm("안내", "해당 건의 영수증을 [" + email + "] 주소로 보내시겠습니까?", btnOK, btnCancel);
					
		});
		
	},
	initData:function(json)
	{	
		if(bizMOB.Storage.get("dbname") == "E"){
			bizMOB.Ui.alert("교육용 어플에서는 항목이 임의로 표시됩니다.");
			var forEduTestList = {"body":{"LIST01":[{"R05":"1234-1234-1234-1234","R02":"AJ2555","R03":"건승인","R01":"20140827","R04":"SC비씨카드","R07":"10.0","R06":"2014-09","R08":"2014-06","R13":"0","R09":"정보전략실","R11":"취소","R12":"51766442","R10":"장우제","R17":"2.45","R19":"7000","R16":"청구","R14":"140827A000724","R18":"","R20":"","R15":"정상완료","R21":"","R23":"","R24":"0","R22":"","R27":"10.0","R37":"","R29":"AJ2555","R33":"","R25":"0","R31":"","R35":"","R32":"","R36":"","R34":"","R30":"","R28":"","R26":"10.0","R40":"","R39":"","R38":"","R47":"","R46":"","R48":"","R49":"0","R43":"","R42":"","R44":"","R45":"세스코","R50":"731969366         ","R41":""},{"R05":"1234-1234-1234-1234","R02":"AJ2555","R03":"건승인","R01":"20140827","R04":"SC비씨카드","R07":"10.0","R06":"2014-09","R08":"2014-06","R13":"0","R09":"정보전략실","R11":"승인","R12":"51766442","R10":"장우제","R17":"2.45","R19":"7000","R16":"청구","R14":"140827A000717","R18":"","R20":"","R15":"정상완료","R21":"","R23":"","R24":"0","R22":"","R27":"10.0","R37":"","R29":"AJ2555","R33":"","R25":"0","R31":"","R35":"","R32":"","R36":"","R34":"","R30":"","R28":"","R26":"10.0","R40":"","R39":"","R38":"","R47":"","R46":"","R48":"","R49":"0","R43":"","R42":"","R44":"","R45":"세스코","R50":"731969366         ","R41":""}]},"header":{"result":true,"trcode":"CM08101","error_code":"","error_text":"","info_text":"","login_session_id":"","message_version":""}};
			page.renderApprovalCancelList(forEduTestList);			
		}else{
			page.setReceiptList();
		}
	},
	initLayout:function()
	{
		var custName  =  bizMOB.Storage.get("custName");
		var custCode  =  bizMOB.Storage.get("custCode");		
		var userID  =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		ipmutil.ipmMenuMove(page.userName,custCode,custName,userID,deptName,deptCode);
		
		var layout; 
		layout = ipmutil.getDefaultLayout("단말기 영수증 출력");
		
		layout.titlebar.setTopLeft(bizMOB.Ui.createButton({ button_text : "이전", image_name : "common/images/top_icon_back.png", listener : function() {
			if (bizMOB.Storage.get("inputcheck") == "1"){
				var button1 = bizMOB.Ui.createTextButton("예", function(){            
					bizMOB.Web.close({
						modal : false
					});
				});
     	    	var btncancel = bizMOB.Ui.createTextButton("아니오", function(){
     	    		return;
                });
  	            bizMOB.Ui.confirm("페이지 이동", "이 페이지를 벗어나시겠습니까? 수정한 항목은 저장되지 않습니다.", button1,btncancel);
     	    }else{
     	    	 bizMOB.Web.close(
				 {
					 modal : false 
				 });
		    }
		}}));
		
 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		}})); 		
 		bizMOB.Ui.displayView(layout);
	},
	setReceiptList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS152");
		
		tr.body.P01 = bizMOB.Storage.get("UserID"); // 사번		
		tr.body.P02 = $("#calFrom").val().replace(/-/g, "");
		tr.body.P03 = $("#calTo").val().replace(/-/g, "");
		tr.body.P04 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "영수증 리스트를 불러오는데 실패하였습니다.");
					return;
				}
				page.renderApprovalCancelList(json);
			}
		});
	},
	renderApprovalCancelList: function(json){
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".approvalCancelList",
		 		value:"LIST01",
		 		detail:
	 			[  
	 			 	{type:"single", target:".approvalType", value:"R11"},
	 			 	{type:"single", target:".spanConfirmDate", value:function(arg){
	 			 		var ymd = '20' + arg.item.R06;
	 			 		ymd = ymd.substr(0, 4) + '-' + ymd.substr(4, 2) + '-' + ymd.substr(6, 2);
	 			 		return ymd;
	 			 	}},
	 			 	{type:"single", target:".custInfo", value:function(arg){
	 			 		return "[" + arg.item.R03 + "] " + arg.item.R04;
	 			 	}},
	 			 	{type:"single", target:".approvalCharge", value:function(arg){
	 			 		return arg.item.R12.bMToNumber().bMToStr().bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".cardRequestDate", value:function(arg){
	 			 		var ymd = '20' + arg.item.R06;
	 			 		ymd = ymd.substr(0, 4) + '-' + ymd.substr(4, 2) + '-' + ymd.substr(6, 2);
	 			 		var hms = arg.item.R07;
	 			 		hms = hms.substr(0, 2) + ':' + hms.substr(2, 2) + ':' + hms.substr(4, 2);
	 			 		return ymd + ' ' + hms;
	 			 	}},
	 			 	{type:"single", target:".txtPhoneNumber@value", value:"R16"},
	 			 	{type:"single", target:".txtEMail@value", value:"R18"},
	 			 	
	 			 	{type:"single", target:".cardSort", value:"R09"},
	 			 	{type:"single", target:".cardNumber", value:"R08"},
	 			 	{type:"single", target:".cardInstallment", value:"R13"},
	 			 	{type:"single", target:"@r01+", value:"R01"},{type:"single", target:"@r02+", value:"R02"},{type:"single", target:"@r03+", value:"R03"},{type:"single", target:"@r04+", value:"R04"},{type:"single", target:"@r05+", value:"R05"},{type:"single", target:"@r06+", value:"R06"},{type:"single", target:"@r07+", value:"R07"},{type:"single", target:"@r08+", value:"R08"},{type:"single", target:"@r09+", value:"R09"},{type:"single", target:"@r10+", value:"R10"},{type:"single", target:"@r11+", value:"R11"},{type:"single", target:"@r12+", value:"R12"},{type:"single", target:"@r13+", value:"R13"},{type:"single", target:"@r14+", value:"R14"},{type:"single", target:"@r15+", value:"R15"},{type:"single", target:"@r16+", value:"R16"},{type:"single", target:"@r17+", value:"R17"},{type:"single", target:"@r18+", value:"R18"}
 		        ]
		 	}
		];
		var options = { clone:true, newId:"cancelationListNew", replace:true };
		$("#cancelationList").bMRender(json.body, dir, options); 	
		$(".txtPhoneNumber").toSel();
	},
	printReceipt: function(repAddr){
		var focusRow = $(".bg02");
		
		var bizrno = "212-81-05946";
		var trmnlNo = "DPT0030087";				
		var mrhst = "(주)세스코";
		var mrhstAdres = "서울특별시 강동구 상일로10길 46(상일동)";
		var mrhstRprsntv = "전순표, 전찬혁";
		var mrhstTelno = "1588-1119";				
		var cardCashSe = "CARD";
		var delngSe = focusRow.attr("r11") == "승인" ? 1 : 0; // 0:취소,  1:승인
		var setleMssage = "* 부가가치세법 시행령 제57조 2항에 따라 신용카드 매출전표(영수증)도 매입 세금계산서로 사용할 수 있으며 별도의 세금계산서/계산서를 교부하지 않습니다.";
		var rciptNo = ""; // 회사앱에서 자체적으로 관리하는 영수증번호
		var confmNo = focusRow.attr("r05"); // 승인번호
		var confmDe = focusRow.attr("r06").trim(); // 승인일자 yyMMdd
		var confmTime = focusRow.attr("r07"); // 승인시간 HHmmss
		var cardNo = focusRow.attr("r08"); // 카드번호
		var instlmtMonth = focusRow.attr("r13"); // 할부개월
		var issuCmpnyNm = focusRow.attr("r14");
		var puchasCmpnyNm = focusRow.attr("r15");
		var splpc = focusRow.attr("r12").bMToNumber() - focusRow.attr("r17").bMToNumber(); // 공급가
		var vat = focusRow.attr("r17").bMToNumber(); // 부가세
		var taxxpt = 0; // 면세액
		var cstmrTelno = repAddr; // 고객연락처
		
		var v = {
				call_type:"js2app",
	            id:"RUN_APPLICATION",
	        	param:{
	        		method : "url",
	    			url : {
	    				url : "fpispksnet://receipt?bizrno="		+ bizrno
							    				+"&trmnlNo="		+ trmnlNo
							    				+"&mrhst="			+ mrhst
							    				+"&mrhstAdres="		+ mrhstAdres
							    				+"&mrhstRprsntv="	+ mrhstRprsntv
							    				+"&mrhstTelno="		+ mrhstTelno
							    				+"&cardCashSe="		+ cardCashSe
							    				+"&delngSe="		+ delngSe
							    				+"&setleMssage="	+ setleMssage
							    				+"&rciptNo="		+ rciptNo
							    				+"&confmNo="		+ confmNo
							    				+"&confmDe="		+ confmDe
							    				+"&confmTime="		+ confmTime
							    				+"&cardNo="			+ cardNo
							    				+"&instlmtMonth="	+ instlmtMonth
							    				+"&issuCmpnyNm="	+ issuCmpnyNm
							    				+"&puchasCmpnyNm="	+ puchasCmpnyNm
							    				+"&splpc="			+ splpc
							    				+"&vat="			+ vat
							    				+"&taxxpt="			+ taxxpt
							    				+"&cstmrTelno="		+ cstmrTelno
	    			}
	     		}
		};
		bizMOB.onFireMessage(v);	
	},
	setDateTime: function(txtName, btnName){
		$(btnName).click(function(){
			$(txtName).focus();
		});
		var option = cescommutil.datePickerOption(function(date){		 				 
			}, "yy-mm-dd"
		);
		$(txtName).datepicker(option);
	}
};


//단말기에서 취소 서명 완료 후 로직
function getDataCallback(result){
	//alert(JSON.stringify(result));
	
	var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBI058");
	
	tr.body.P01 = page.closingNumber;		
	tr.body.P02 = chkUnd(result.cardCashSe);
	tr.body.P03 = chkUnd(result.delngSe);
	tr.body.P04 = chkUnd(result.setleSuccesAt);
	tr.body.P05 = chkUnd(result.setleMssage);
	tr.body.P06 = chkUnd(result.confmNo);
	tr.body.P07 = chkUnd(result.confmDe);
	tr.body.P08 = chkUnd(result.confmTime);
	tr.body.P09 = chkUnd(result.cardNo);	
	tr.body.P10 = chkUnd(result.instlmtMonth);
	tr.body.P11 = chkUnd(result.issuCmpnyCode);
	tr.body.P12 = chkUnd(result.issuCmpnyNm);
	tr.body.P13 = chkUnd(result.puchasCmpnyCode);
	tr.body.P14 = chkUnd(result.puchasCmpnyNm);
	tr.body.P15 = chkUnd(result.aditInfo);
	tr.body.P16 = chkUnd(page.ref_no_rcp);
	
	bizMOB.Web.post({
		message: tr,
		success: function(json){
			if(!json.header.result){
				bizMOB.Ui.alert("단말기 취소 승인 후 정보 저장에 실패하였습니다." + json.header.error_text);
				return;
			}
			if(result.setleSuccesAt == "X"){
				bizMOB.Ui.alert("카드 취소 실패", result.setleMssage);
			}else{
				bizMOB.Ui.toast("단말기 카드 취소 승인이 정상적으로 이루어졌습니다.");	
			}
		}			
	});	
}



function chkUnd(str){
	return str == undefined ? "" : str;
}