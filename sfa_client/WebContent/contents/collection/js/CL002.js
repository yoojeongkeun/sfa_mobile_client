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
		$("#cancelationListNew").delegate(".approvalCancelList", "click", function(){
			if($(this).hasClass("bg02")){
				$(this).find(".cardInfomation").toggle();
				return;
				
			}
			$(".approvalCancelList").removeClass("bg02");
			$(this).addClass("bg02");
			$(".cardInfomation").hide();
			$(this).find(".cardInfomation").show();
		});
		
		$("#btnCancelRequest").click(function(){
			if(!$(".approvalCancelList").hasClass("bg02")){
				bizMOB.Ui.alert("안내", "취소 할 건을 선택해주세요.");
				return;
			}
			var btnOK = bizMOB.Ui.createTextButton("진행", function(){
				page.approvalCheck();
			});			
			var btnCancel = bizMOB.Ui.createTextButton("돌아가기", function(){
				return;
			});
			bizMOB.Ui.confirm("안내", "해당 건 취소를 진행하시겠습니까?\n(카드 단말기의 전원을 켜서 연결한 후 진행 버튼을 눌러주세요)", btnOK, btnCancel);			
		});
		
		// 영수증 버튼 클릭
		$("#btnReceipt").click(function(){
			if(!$(".approvalCancelList").hasClass("bg02")){
				bizMOB.Ui.alert("안내", "영수증 출력 할 건을 선택해주세요.");
				return;
			}
			var btnOK = bizMOB.Ui.createTextButton("확인", function(){
				page.printReceipt();
			});			
			var btnCancel = bizMOB.Ui.createTextButton("돌아가기", function(){
				return;
			});
			bizMOB.Ui.confirm("안내", "해당 건의 영수증을 출력하시겠습니까?", btnOK, btnCancel);	
						
					
		});
	},
	initData:function(json)
	{	
		if(bizMOB.Storage.get("dbname") == "E"){
			bizMOB.Ui.alert("교육용 어플에서는 항목이 임의로 표시됩니다.");
			var forEduTestList = {"body":{"LIST01":[{"R05":"1234-1234-1234-1234","R02":"AJ2555","R03":"건승인","R01":"20140827","R04":"SC비씨카드","R07":"10.0","R06":"2014-09","R08":"2014-06","R13":"0","R09":"정보전략실","R11":"취소","R12":"51766442","R10":"장우제","R17":"2.45","R19":"7000","R16":"청구","R14":"140827A000724","R18":"","R20":"","R15":"정상완료","R21":"","R23":"","R24":"0","R22":"","R27":"10.0","R37":"","R29":"AJ2555","R33":"","R25":"0","R31":"","R35":"","R32":"","R36":"","R34":"","R30":"","R28":"","R26":"10.0","R40":"","R39":"","R38":"","R47":"","R46":"","R48":"","R49":"0","R43":"","R42":"","R44":"","R45":"세스코","R50":"731969366         ","R41":""},{"R05":"1234-1234-1234-1234","R02":"AJ2555","R03":"건승인","R01":"20140827","R04":"SC비씨카드","R07":"10.0","R06":"2014-09","R08":"2014-06","R13":"0","R09":"정보전략실","R11":"승인","R12":"51766442","R10":"장우제","R17":"2.45","R19":"7000","R16":"청구","R14":"140827A000717","R18":"","R20":"","R15":"정상완료","R21":"","R23":"","R24":"0","R22":"","R27":"10.0","R37":"","R29":"AJ2555","R33":"","R25":"0","R31":"","R35":"","R32":"","R36":"","R34":"","R30":"","R28":"","R26":"10.0","R40":"","R39":"","R38":"","R47":"","R46":"","R48":"","R49":"0","R43":"","R42":"","R44":"","R45":"세스코","R50":"731969366         ","R41":""}]},"header":{"result":true,"trcode":"CM08101","error_code":"","error_text":"","info_text":"","login_session_id":"","message_version":""}};
			page.renderApprovalCancelList(forEduTestList);			
		}else{
			page.setApprovalCancelList();
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
		layout = ipmutil.getDefaultLayout("단말기 취소승인");
		
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
	setApprovalCancelList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS151");
		
		tr.body.P01 = bizMOB.Storage.get("UserID"); // 사번		
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "승인내역 리스트를 불러오는데 실패하였습니다.");
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
	 			 	{type:"single", target:".custCode", value:"R03"},
	 			 	{type:"single", target:".custName", value:"R04"},
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
	 			 	
	 			 	{type:"single", target:".cardSort", value:"R09"},
	 			 	{type:"single", target:".cardNumber", value:"R08"},
	 			 	{type:"single", target:".cardInstallment", value:"R13"},
	 			 	{type:"single", target:"@r01+", value:"R01"},{type:"single", target:"@r02+", value:"R02"},{type:"single", target:"@r03+", value:"R03"},{type:"single", target:"@r04+", value:"R04"},{type:"single", target:"@r05+", value:"R05"},{type:"single", target:"@r06+", value:"R06"},{type:"single", target:"@r07+", value:"R07"},{type:"single", target:"@r08+", value:"R08"},{type:"single", target:"@r09+", value:"R09"},{type:"single", target:"@r10+", value:"R10"},{type:"single", target:"@r11+", value:"R11"},{type:"single", target:"@r12+", value:"R12"},{type:"single", target:"@r13+", value:"R13"},{type:"single", target:"@r14+", value:"R14"}
 		        ]
		 	}
		];
		var options = { clone:true, newId:"cancelationListNew", replace:true };
		$("#cancelationList").bMRender(json.body, dir, options); 	
	},
	approvalCheck: function(){
		var focusRow = $(".bg02");
		if(focusRow.attr("r11") != "승인"){
			bizMOB.Ui.alert("안내", "이미 취소된 건입니다..");
			return;
		}
		
		// 교육용 DB일 경우 버튼 막기
		var dbname = bizMOB.Storage.get("dbname");
    	
    	if(dbname == "E"){
    		bizMOB.Ui.alert("안내", "교육용 어플에서는 사용하실 수 없습니다.");
    		return;
    	}else if(dbname == undefined || dbname == "" || dbname == null){
    		bizMOB.Ui.alert("안내", "세션값이 존재하지 않습니다.");
    		return;
    	}
    	//
    	
    	
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM08102");
		
		tr.body.P01 = focusRow.attr("r02"); //고객코드
		tr.body.P02 = focusRow.attr("r14");; //BUSINUM
		tr.body.P03 = ""; //dummy
		tr.body.P04 = ""; //dummy
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("카드 취소 체크에 실패하였습니다.");
					return;
				}
				
				if(json.body.R01 == "TRUE"){
					page.makeClosingNumber();
				}else{
					bizMOB.Ui.alert("안내", "카드무이자 취소대상 선정이 아니거나 취소가능일이 지난 고객입니다.");
					return;
				}					
			}
		});
	},	
	//넘버링 하는 부분인데 추후 하나로 합쳐야 함
	makeClosingNumber: function() //_sNo_Rcp
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07703");
		
		tr.body.P01 = page.cdCompany; 
		tr.body.P02 = (new Date()).bMToFormatDate("yyyymmdd");
		tr.body.P03 = "RS";

		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){	
					bizMOB.Ui.alert("안내", "마감 번호 채번 중 문제가 발생하였습니다.");
					return;
				}else{
					page.closingNumber = json.body.R01;
					page.makeBillingNumber();
				}
			}
		});		
	},
	makeBillingNumber: function(type) //_strChargeNO
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07703");
		
		tr.body.P01 = page.cdCompany; 
		tr.body.P02 = (new Date()).bMToFormatDate("yyyymmdd");
		tr.body.P03 = "CC";

		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){	
					bizMOB.Ui.alert("안내", "청구 번호 채번 중 문제가 발생하였습니다.");
					return;
				}else{
				    page.billingNumber = json.body.R01;
				    page.makeCardTradeNumber();
				}
			}
		});		
	},
	makeCardTradeNumber: function(type) //_strBusiNum
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07702");
	
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){	
					bizMOB.Ui.alert("안내", "카드거래번호 채번 중 문제가 발생하였습니다.");
					return;
				}else{
				    page.cardTradeNumber = json.body.R01;
				    // 세 가지 채번이 끝나고 나면
				    page.preInsert();
				}
			}
		});		
	},
	callPaymentApp: function(){
		var focusRow = $(".bg02");
		
		var bizrno = "212-81-05946";
		var trmnlNo = "DPT0030087";
		var cardCashSe = "CARD";
		var delngSe = 0; // 0:취소,  1:승인
		var splpc = focusRow.attr("r12").bMToNumber();
		var vat = 0;
		var taxxpt = 0;
		var srcConfmNo = focusRow.attr("r05");
		var srcConfmDe = focusRow.attr("r06");
		var srcInstlmtMonth = focusRow.attr("r13");
		
		//var callbackAppUrl = "bizmob.cesco.sfa://"; // 배포용
		
		var callbackAppUrl = "bizmob.cesco://"; // 테스트용
		
		//var callbackAppUrl = "bizmob.cesco.ieis.edu://"; // EDU용
		
		
		var v = {
				call_type:"js2app",
	            id:"RUN_APPLICATION",
	        	param:{
	        		method : "url",
	    			url : {
	    				url : "fpispksnet://default?bizrno="		+ bizrno
							    				+"&trmnlNo="		+ trmnlNo
							    				+"&cardCashSe="		+ cardCashSe
							    				+"&delngSe="		+ delngSe
							    				+"&splpc="			+ splpc
							    				+"&vat="			+ vat
							    				+"&taxxpt="			+ taxxpt
							    				+"&taxxpt="			+ taxxpt
							    				+"&srcConfmNo="		+ srcConfmNo
							    				+"&srcConfmDe="		+ srcConfmDe
							    				+"&srcInstlmtMonth="+ srcInstlmtMonth
							    				+"&mrhsInfo=" 		+ page.custCode
							    				+"&callbackAppUrl="	+ callbackAppUrl
	    			}
	     		}
		};
		bizMOB.onFireMessage(v);
	},
	preInsert: function(){
		var focusRow = $(".bg02");
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBI057");
		
		tr.body.P01 = page.closingNumber; // no_rcp
		tr.body.P02 = ""; // 수금일자 getdate()처리
		tr.body.P03 = ""; // 부서코드 session 처리
		tr.body.P04 = ""; // 사원코드 session 처리
		tr.body.P05 = focusRow.attr("r03"); // 고객코드
		tr.body.P06 = focusRow.attr("r12"); // 승인금액
		tr.body.P07 = ""; //focusRow.attr("r01"); // ref_no_rcp
		tr.body.P08 = page.cardTradeNumber;
		tr.body.P09 = focusRow.attr("r05");
		tr.body.P10 = focusRow.attr("r14");
		
		page.ref_no_rcp = focusRow.attr("r01");
		
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){	
					bizMOB.Ui.alert("안내", "카드 승인 취소 내역 등록에 실패하였습니다.");
					return;
				}else{
					page.callPaymentApp();
				}
			}
		});
		
	},
	printReceipt: function(){
		var focusRow = $(".bg02");
		
		var bizrno = "212-81-05946";
		var trmnlNo = "DPT0030087";				
		var mrhst = "가맹점명";
		var mrhstAdres = "가맹점주소";
		var mrhstRprsntv = "가맹점대표자";
		var mrhstTelno = "가맹점전화번호";				
		var cardCashSe = "CARD";
		var delngSe = 1; // 0:취소,  1:승인
		var setleMssage = "영수증에 표시되는 안내성 메세지";
		var rciptNo = "CESCORECEIPTNO"; // 회사앱에서 자체적으로 관리하는 영수증번호
		var confmNo = focusRow.attr("r05"); // 승인번호
		var confmDe = focusRow.attr("r06").trim(); // 승인일자 yyMMdd
		var confmTime = focusRow.attr("r07"); // 승인시간 HHmmss
		var cardNo = focusRow.attr("r08"); // 카드번호
		var instlmtMonth = focusRow.attr("r13"); // 할부개월
		var issuCmpnyNm = "발급사명";
		var puchasCmpnyNm = "매입사명";
		var splpc = focusRow.attr("r12").bMToNumber(); // 공급가
		var vat = 0; // 부가세
		var taxxpt = 0; // 면세액
		var cstmrTelno = "01090616648"; // 고객연락처
		
		alert(confmDe);
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
    insertFailedLog: function(result){
    	var focusRow = $(".bg02");
    	
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBI059");
    			
    	tr.body.P01 = page.closingNumber; // [NO_RCP]			
    	tr.body.P02 = page.saleYM.replace(/-/g, ""); // [DT_RCP]
    	tr.body.P03 = page.deptCode; // [CD_DEPT]
    	tr.body.P04 = page.userID; // [CD_EMP]
    	tr.body.P05 = page.custCode; // [CD_PARTNER]
    	tr.body.P06 = focusRow.attr("r12").bMToNumber(); // [AM_RCP]
	    tr.body.P07 = chkUnd(result.cardCashSe);	 // [cardCashSe]
    	tr.body.P08 = chkUnd(result.delngSe);		 // [delngSe]
    	tr.body.P09 = chkUnd(result.setleSuccesAt);  // [setleSuccesAt]
    	tr.body.P10 = chkUnd(result.setleMssage);	 // [setleMssage]
    	tr.body.P11 = chkUnd(result.confmNo);		 // [confmNo]
    	tr.body.P12 = chkUnd(result.confmDe);		 // [confmDe]
    	tr.body.P13 = chkUnd(result.confmTime);		 // [confmTime]
    	tr.body.P14 = chkUnd(result.cardNo);		 // [cardNo]
    	tr.body.P15 = chkUnd(result.instlmtMonth);	 // [instlmtMonth]
    	tr.body.P16 = chkUnd(result.issuCmpnyCode);	 // [issuCmpnyCode]
    	tr.body.P17 = chkUnd(result.issuCmpnyNm);	 // [issuCmpnyNm]
    	tr.body.P18 = chkUnd(result.puchasCmpnyCode);// [puchasCmpnyCode]
    	tr.body.P19 = chkUnd(result.puchasCmpnyNm);	 // [puchasCmpnyNm]
    	tr.body.P20 = chkUnd(result.aditInfo);		 // [aditInfo]
    	tr.body.P21 = ""; // [REF_NO_RCP]
    	tr.body.P22 = page.cardTradeNumber; // [BusiNum]
    	tr.body.P23 = page.userID; // [RegUser]
    	tr.body.P24 = $("#txtTax").val().bMToNumber().toString(); // [TAX]
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("실패 이력 저장에 실패하였습니다. 해당 화면 캡쳐 후 정보전략실로 문의 바랍니다.\n" + json.header.error_text);    				
    			}
    			bizMOB.Web.close();
    		}			
    	});
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
				bizMOB.Ui.alert("단말기 취소 승인 후 정보 저장에 실패하였습니다.");
				page.insertFailedLog(result);
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