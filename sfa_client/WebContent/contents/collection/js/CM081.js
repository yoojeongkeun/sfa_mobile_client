page  =
{
	userID: "",
	deptCode: "",
	cdCompany: "7000",
	cardTradeNumber: "", // 7702
	closingNumber: "", // SH
	billingNumber: "",
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
			var btnOK = bizMOB.Ui.createTextButton("확인", function(){
				page.approvalCheck();
			});			
			var btnCancel = bizMOB.Ui.createTextButton("돌아가기", function(){
				return;
			});
			bizMOB.Ui.confirm("안내", "해당 카드 승인 건을 취소하시겠습니까?", btnOK, btnCancel);			
		});
	},
	initData:function(json)
	{	
		/*if(bizMOB.Storage.get("dbname") == "E"){
			bizMOB.Ui.alert("교육용 어플에서는 항목이 임의로 표시됩니다.");
			var forEduTestList = {"body":{"LIST01":[{"R05":"1234-1234-1234-1234","R02":"AJ2555","R03":"건승인","R01":"20140827","R04":"SC비씨카드","R07":"10.0","R06":"2014-09","R08":"2014-06","R13":"0","R09":"정보전략실","R11":"취소","R12":"51766442","R10":"장우제","R17":"2.45","R19":"7000","R16":"청구","R14":"140827A000724","R18":"","R20":"","R15":"정상완료","R21":"","R23":"","R24":"0","R22":"","R27":"10.0","R37":"","R29":"AJ2555","R33":"","R25":"0","R31":"","R35":"","R32":"","R36":"","R34":"","R30":"","R28":"","R26":"10.0","R40":"","R39":"","R38":"","R47":"","R46":"","R48":"","R49":"0","R43":"","R42":"","R44":"","R45":"세스코","R50":"731969366         ","R41":""},{"R05":"1234-1234-1234-1234","R02":"AJ2555","R03":"건승인","R01":"20140827","R04":"SC비씨카드","R07":"10.0","R06":"2014-09","R08":"2014-06","R13":"0","R09":"정보전략실","R11":"승인","R12":"51766442","R10":"장우제","R17":"2.45","R19":"7000","R16":"청구","R14":"140827A000717","R18":"","R20":"","R15":"정상완료","R21":"","R23":"","R24":"0","R22":"","R27":"10.0","R37":"","R29":"AJ2555","R33":"","R25":"0","R31":"","R35":"","R32":"","R36":"","R34":"","R30":"","R28":"","R26":"10.0","R40":"","R39":"","R38":"","R47":"","R46":"","R48":"","R49":"0","R43":"","R42":"","R44":"","R45":"세스코","R50":"731969366         ","R41":""}]},"header":{"result":true,"trcode":"CM08101","error_code":"","error_text":"","info_text":"","login_session_id":"","message_version":""}};
			page.renderApprovalCancelList(forEduTestList);			
		}else{
			page.setApprovalCancelList();
		}*/
		
		page.setApprovalCancelList();
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
		layout = ipmutil.getDefaultLayout("카드승인취소");
		
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
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM08101");

		tr.body.R01 = "7000"; // CD_COMPANY
		tr.body.R02 = ""; // CUSTCODE인데 쓰지 않음
		tr.body.R03 = ""; // 승인사번 세션처리
		tr.body.R04 = ""; // 더미
		tr.body.R05 = ""; // 더미
		
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
	 			 	{type:"single", target:".custCode", value:"R02"},
	 			 	{type:"single", target:".custName", value:"R45"},
	 			 	{type:"single", target:".approvalCharge", value:function(arg){
	 			 		return arg.item.R07.bMToNumber().bMToStr().bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".cardSort", value:"R04"},
	 			 	{type:"single", target:".cardNumber", value:function(arg){
	 			 		return arg.item.R05.substr(0, 15) + "****";
	 			 	}},
	 			 	{type:"single", target:".cardExpiryDate", value:"R06"},
	 			 	{type:"single", target:".cardInstallment", value:"R13"},
	 			 	{type:"single", target:"@r01+", value:"R01"},{type:"single", target:"@r02+", value:"R02"},{type:"single", target:"@r03+", value:"R03"},{type:"single", target:"@r04+", value:"R04"},{type:"single", target:"@r05+", value:"R05"},{type:"single", target:"@r06+", value:"R06"},{type:"single", target:"@r07+", value:"R07"},{type:"single", target:"@r08+", value:"R08"},{type:"single", target:"@r09+", value:"R09"},{type:"single", target:"@r10+", value:"R10"},{type:"single", target:"@r11+", value:"R11"},{type:"single", target:"@r12+", value:"R12"},{type:"single", target:"@r13+", value:"R13"},{type:"single", target:"@r14+", value:"R14"},{type:"single", target:"@r15+", value:"R15"},{type:"single", target:"@r16+", value:"R16"},{type:"single", target:"@r17+", value:"R17"},{type:"single", target:"@r18+", value:"R18"},{type:"single", target:"@r19+", value:"R19"},{type:"single", target:"@r20+", value:"R20"},{type:"single", target:"@r21+", value:"R21"},{type:"single", target:"@r22+", value:"R22"},{type:"single", target:"@r23+", value:"R23"},{type:"single", target:"@r24+", value:"R24"},{type:"single", target:"@r25+", value:"R25"},{type:"single", target:"@r26+", value:"R26"},{type:"single", target:"@r27+", value:"R27"},{type:"single", target:"@r28+", value:"R28"},{type:"single", target:"@r29+", value:"R29"},{type:"single", target:"@r30+", value:"R30"},{type:"single", target:"@r31+", value:"R31"},{type:"single", target:"@r32+", value:"R32"},{type:"single", target:"@r33+", value:"R33"},{type:"single", target:"@r34+", value:"R34"},{type:"single", target:"@r35+", value:"R35"},{type:"single", target:"@r36+", value:"R36"},{type:"single", target:"@r37+", value:"R37"},{type:"single", target:"@r38+", value:"R38"},{type:"single", target:"@r39+", value:"R39"},{type:"single", target:"@r40+", value:"R40"},{type:"single", target:"@r41+", value:"R41"},{type:"single", target:"@r42+", value:"R42"},{type:"single", target:"@r43+", value:"R43"},{type:"single", target:"@r44+", value:"R44"},{type:"single", target:"@r45+", value:"R45"},{type:"single", target:"@r46+", value:"R46"},{type:"single", target:"@r47+", value:"R47"},{type:"single", target:"@r48+", value:"R48"},{type:"single", target:"@r49+", value:"R49"},{type:"single", target:"@r50+", value:"R50"}
 		        ]
		 	}
		];
		var options = { clone:true, newId:"cancelationListNew", replace:true };
		$("#cancelationList").bMRender(json.body, dir, options); 	
	},
	approvalCheck: function(){
		var focusRow = $(".bg02");
		if(focusRow.attr("r11") != "승인"){
			bizMOB.Ui.alert("안내", "승인된 건이 아니므로 취소할 수 없습니다.");
			return;
		}		
		
		// 교육용 DB일 경우 버튼 막기
		/*var dbname = bizMOB.Storage.get("dbname");
    	
    	if(dbname == "E"){
    		bizMOB.Ui.alert("안내", "교육용 어플에서는 사용하실 수 없습니다.");
    		return;
    	}else if(dbname == undefined || dbname == "" || dbname == null){
    		bizMOB.Ui.alert("안내", "세션값이 존재하지 않습니다.");
    		return;
    	}*/
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
	preInsert: function(){
		// 취소 전 insert 로직
		var focusRow = $(".bg02");
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07704");
		
		tr.body.P01 = "2";
		tr.body.P02 = page.billingNumber;
		tr.body.P03 = page.cdCompany;
		tr.body.P04 = focusRow.attr("r08").replace(/-/g, "");
		tr.body.P05 = focusRow.attr("r02");
		tr.body.P06 = focusRow.attr("r28");
		tr.body.P07 = page.cardTradeNumber;
		tr.body.P08 = focusRow.attr("r05").replace(/-/g, "");
		tr.body.P09 = focusRow.attr("r06").replace(/-/g, "");
		tr.body.P10 = focusRow.attr("r13").replace(/-/g, "");
		tr.body.P11 = focusRow.attr("r07").replace(/,/g, "");
		tr.body.P12 = page.userID;
		tr.body.P13 = focusRow.attr("r47");
		tr.body.P14 = focusRow.attr("r48");
        tr.body.P15 = focusRow.attr("r49");
		
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){	
					bizMOB.Ui.alert("안내", "카드 승인 취소 내역 등록에 실패하였습니다.");
					return;
				}else{
					page.approvalCancelRequest();
				}
			}
		});
		
		
	},
	approvalCancelRequest: function(){
		var focusRow = $(".bg02");
		var custCode = focusRow.attr("r02");
		var cardNum = focusRow.attr("r05").replace(/-/g, "");
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CARD003");
		
		var cardApprovalRequestDetail = []; // 카드승인요청상세 배열
		var collectionRepayment = []; // 수금반제 배열
				
		
		/*cardApprovalRequestDetail.push({
			L1P01: custCode,
			L1P02: $(trChargeList[i]).attr("saleym").replace(/-/g, ""),
			L1P03: $(trChargeList[i]).attr("cditem"),
			L1P04: $(trChargeList[i]).attr("worktype"),
			L1P05: $(trChargeList[i]).attr("charge"),
			L1P06: "0",
			L1P07: "0",
			L1P08: $(trChargeList[i]).attr("contracttype"),
		});*/ //현재 사용하지 않는다 함(상세 계약대상 관룐)
		

		
		/*collectionRepayment.push({
			L2P01: page.cdCompany,
			L2P02: page.closingNumber,
			L2P03: $(trChargeList[i]).attr("hnoclosing"),
			L2P04: $(trChargeList[i]).attr("noclosing"),
			L2P05: $(trChargeList[i]).attr("nosr"),
			L2P06: $(trChargeList[i]).attr("seq") == "" ? "0" : $(trChargeList[i]).attr("seq"),
			L2P07: hnoclosing == undefined || hnoclosing == "" ? "002" : "001", 
			L2P08: custCode,
			L2P09: chargeAmt,
			L2P10: chargeAmt,
			L2P11: ""
		});*/ // 반제도 로직상 데이터가 들어가지 않는 구조
		
		
		tr.body.LIST01 = cardApprovalRequestDetail;
		tr.body.LIST02 = collectionRepayment;
	        
		// 취소시엔 안 들어감
        tr.body.P01 = '';
        tr.body.P02 = '';
        tr.body.P03 = '';
        tr.body.P04 = '';
        tr.body.P05 = '';
        tr.body.P06 = '';
        tr.body.P07 = '';
        tr.body.P08 = '';
        tr.body.P09 = '';
        tr.body.P10 = '';
        tr.body.P11 = '';
        tr.body.P12 = '';
        tr.body.P13 = '';
        tr.body.P14 = '';
        tr.body.P15 = '';
        
        // 수금등록
        tr.body.P16 = page.cdCompany;
        tr.body.P17 = page.closingNumber;
        tr.body.P18 = (new Date()).bMToFormatDate("yyyymmdd");
        tr.body.P19 = page.deptCode;
        tr.body.P20 = page.userID;
        tr.body.P21 = custCode;
        tr.body.P22 = "002"; // hnoclosing이 ''이면 002 아니면 001인데 프로시저에서 ''만 던짐
        tr.body.P23 = "001";
        tr.body.P24 = focusRow.attr("r35");
        tr.body.P25 = focusRow.attr("r12");
        tr.body.P26 = focusRow.attr("r07").replace(/,/g, "");
        tr.body.P27 = "0";
        tr.body.P28 = focusRow.attr("r07").replace(/,/g, "");
        tr.body.P29 = "";
        tr.body.P30 = "";
        tr.body.P31 = "";
        tr.body.P32 = "";
        tr.body.P33 = "N";
        tr.body.P34 = focusRow.attr("r07").replace(/,/g, "");
        tr.body.P35 = "카드건승인 취소";
        tr.body.P36 = page.billingNumber;
        tr.body.P37 = page.userID;
        tr.body.P38 = focusRow.attr("r18"); // 프로시저에서 '' 가져옴
        tr.body.P39 = focusRow.attr("r46"); // 프로시저에서 '' 가져옴
        
        // 카드승인취소 부분
        tr.body.P40 = custCode;
        tr.body.P41 = focusRow.attr("r01");
        tr.body.P42 = "8";
        tr.body.P43 = focusRow.attr("r04");
        tr.body.P44 = cardNum;
        tr.body.P45 = focusRow.attr("r06").replace(/-/g, "");
        tr.body.P46 = focusRow.attr("r07").replace(/,/g, "");
        tr.body.P47 = focusRow.attr("r08").replace(/-/g, "");
        tr.body.P48 = focusRow.attr("r09");
        tr.body.P49 = focusRow.attr("r10");
        tr.body.P50 = focusRow.attr("r11");
        tr.body.P51 = focusRow.attr("r12");
        tr.body.P52 = focusRow.attr("r13");
        tr.body.P53 = focusRow.attr("r14");
        tr.body.P54 = "";
        tr.body.P55 = "";
        tr.body.P56 = "0";
        tr.body.P57 = page.cardTradeNumber;
        tr.body.P58 = focusRow.attr("r18"); // 프로시저에서 '' 값 던짐
        tr.body.P59 = focusRow.attr("r35"); // 프로시저에서 '' 값 던짐
        
        bizMOB.Web.post({
		    message:tr,
			success:function(json){
			    if(json.header.result==false){
				    bizMOB.Ui.alert("경고",json.header.error_text);
				    return;
				}else{
                    if(json.body.R01.substr(0,1) == "O"){
                        var btnConfirm = bizMOB.Ui.createTextButton("확인", function(){
			 			    bizMOB.Web.close({
							    modal : false
						    });	 
                        });
                        ipmutil.resetChk();
   					    bizMOB.Ui.confirm("알림", "취소 승인이 완료되었습니다.", btnConfirm); 
                    }else{
                    	var errMsg = json.body.R01.split("|");
                 	    bizMOB.Ui.alert("취소 승인 실패", "카드종류 : " + errMsg[2] + "\n" + "불능사유 : " + errMsg[4]);
                    }
				}
            }
        });
	}
	
	
	
};