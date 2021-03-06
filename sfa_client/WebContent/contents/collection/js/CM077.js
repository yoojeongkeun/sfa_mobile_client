// 카드 수금 새 버젼(장우제 사원)*

page  =
{
	Seq : "",
	custCode  : "",
	deptCode  : "",
	deptName  : "",
	userID  : "",
	HistoryGubun : "",
	userName : "",
	isDisable: false,
	
	cdCompany: "7000",
	saleYM: "",
	cditem: "",
	custType: "",
	workType: "",
	charge: "",
	contractType: "",
	hnoclosing: "",
	noclosing: "",
	no_sr: "",
	_seq: "",
	cardTradeNumber: "", // 7702
	closingNumber: "", // SH
	billingNumber: "",
	tempSaleYM: "",	
	
	firstYN: true,
	secondYN: true,
	thirdYN: true,
	
	orderNo: "",
	cardMsg: "",
	
	init : function(json)
	{	
		page.initFirst(json);
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initFirst: function(json){
		ipmutil.resetChk();
		ipmutil.setAllSelect(document, "input", "click");
		page.userName = bizMOB.Storage.get("UserName");
		page.custCode = json.custCode;
		page.orderNo = json.orderNo;
		page.cardMsg = json.cardMsg;
		page.userID = bizMOB.Storage.get("UserID");
		page.deptCode = bizMOB.Storage.get("deptCode");
		page.deptName = bizMOB.Storage.get("deptName");
		if (json.HistoryGubun == undefined){
			page.HistoryGubun  =  "";		
		}
		else{		    
			page.HistoryGubun  =  json.HistoryGubun;		 	
		}
		
		ipmutil.appendCommonMenu(page.userName);
		
		page.searchCardInformation();
	},
	initInterface:function()
	{		
		$("#btnSearch").click(function(){			
		    if ($("#txtSearchText").val() !="")
		    	page.custlistCheck();
		});
		
		$("#txtSearchText").keyup(function(e){
			if(e.keyCode == "13"){
				$("#btnSearch").trigger("click");
			}
		});
		
		$(".cardnum input").keyup(function(e){
			if($(this).val().length >= 4 )
			{				
				$(this).next().select();
			}
		});
		
		var nowDate  = new Date();
	    $("#approvalDate").html(nowDate.bMToFormatDate("yyyy-mm-dd"));  // 수금일자 
	    $("#txtSearchText").val(page.custCode);
	     
	    $("#DetpNm").attr("DeptCode", page.deptCode);
	    $("#DetpNm").html(page.deptName);
	    
	    // 리스트의 삭제 버튼 눌렀을 때
	    $("#chargeListNew").delegate(".btnDelete","click", function(){
	    	var clickedRow = $(this).parent().parent().parent();
	    	var btnOK = bizMOB.Ui.createTextButton("예", function(){	    		
		    	clickedRow.remove();
		    	if(clickedRow.find(".chargeType").hasClass("type1")){ // 매출확정이면
		    		page.saleYM = $($("#chargeListNew .trCharge")[0]).attr("r06");
		    	}
		    	page.setChargeSum();
	    	});
	    	
	    	var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
	    		return;
	    	});
	    	
	    	bizMOB.Ui.confirm("안내", "삭제하시겠습니까?", btnOK, btnCancel);	    	
	    });
	    
	    // 선청구 버튼 클릭 이벤트
	    $("#btnAdd").click(function(){
	    	if(page.custCode == undefined || page.custCode == ""){
	    		bizMOB.Ui.alert("안내", "고객 선택 후 진행해주세요.");
	    		return;
	    	}
	    	
	    	var btnOK = bizMOB.Ui.createTextButton("확인", function(){
	    		bizMOB.Ui.openDialog("collection/html/CM078.html", 
				{
		            message:  {CustCode : page.custCode}, 
		            width : "80%",
				    height : "40%",
				}); 
	        	page.CHAINSTATUS  ="1";
	    	});
	    	
	    	var btnCancel = bizMOB.Ui.createTextButton("취소", function(){
	    		return;
	    	});
	    	
	    	bizMOB.Ui.confirm("안내", "선청구 진행시 기존 매출확정분/현장매출분이 리스트에서 사라집니다. 계속 진행하시겠습니까?\n(매출확정분/현장매출분은 고객 조회시 다시 나타나며 선청구와 동시에 진행 할 수 없습니다.)", btnOK, btnCancel);
	    });
		
        $("#btnRequest").click(function(){
        	if(page.custCode == ""){
        		bizMOB.Ui.alert("안내", "고객을 먼저 선택해주세요.");
        		return;
        	}
        	
        	if($("#installment").val().bMToNumber() >= 100){
        		bizMOB.Ui.alert("안내", "할부개월수를 확인해주세요.");
        		return;
        	}
        	
        	if(($("#selInstallmentType").val() == "AD02" || $("#selInstallmentType").val() == "AD03") && $("#installment").val().bMToNumber() <= 1){
        		bizMOB.Ui.alert("안내", "할부개월수를 확인해주세요");
        		return;
        	}
        	
        	if($("#changeAmt").val() == "" || $("#changeAmt").val().bMToNumber().bMToStr() == 0){
        		bizMOB.Ui.alert("안내", "승인을 요청 할 내역이 존재하지 않습니다.");
        		return;
        	}
        	
        	if($("#selCardSort").val() == ""){
            	bizMOB.Ui.alert("안내", "카드종류를 선택해주세요.");
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
        		
        	
        	
        	var that = $(this);
        	if(!page.isDisable){
				page.isDisable = true;
				that.css("opacity", "0.5");
				setTimeout(function(){
					that.css("opacity", "1");
					page.isDisable = false;
				},3000);
			}else{
				bizMOB.Ui.alert("안내", "연속해서 누를 수 없습니다.");
				return;
			}
        	// 먼저 채번 후
        	var btnOK = bizMOB.Ui.createTextButton("확인", function(){
        		
        		page.firstYN = true;
				page.secondYN = true;
				page.thirdYN = true;
				
				
				// 매출확정일 경우 체크 로직, 선청구/현장매출일 경우 바로 발번로직
				if($(".salesok").length == 0 && $(".otherlist").length != 0){
					page.secondCheck2();
				}else{
					page.firstCheck();
				}
				
        		
        	});
        	var btnCancel = bizMOB.Ui.createTextButton("취소", function(){
        		return;
        	});
        	bizMOB.Ui.confirm("안내", page.cardMsg, btnOK, btnCancel);
            
	    });
	     
		$("#selCardSort").change(function(){			 
		    page.CHAINSTATUS  ="1"; //??		     		 
		});		
	},
	initData:function(json)
	{	
		page.Seq = "";		
		page.commonCodeSearch();
		if (page.custCode != undefined ) page.searchCardInformation();
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
		layout = ipmutil.getDefaultLayout("카드승인");
		
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
	// 카드 종류 Search
	commonCodeSearch:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00001");
		tr.body.Gubun ="A003";  //카드종류 
		tr.body.Type = "1";  // 업종구분
				 
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){
					 bizMOB.Ui.alert("안내", "카드 목록을 불러오는데 실패하였습니다.");    
				}else{
					$("#selCardSort").empty().data('option');  // 아이템 제거 
					$("#selCardSort").append("<option value=''></option>") ;
					
					for(var i=0; i<json.body.list01.length; i++){
						$("#selCardSort").append("<option value='"+json.body.list01[i].Code+"'> "+json.body.list01[i].CodeName+" </option>") ;
					}
				}
			}
		});
	},
	// 고객 카드 정보 Select
	searchCardInformation:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07706");
		tr.body.P01 = $("#approvalDate").html().replace(/-/g, ""); //승인일자 
		tr.body.P02 = page.custCode;  // 고객코드
		
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){	
					bizMOB.Ui.alert("안내", "고객의 카드 정보가 존재하지 않습니다.");
					$("#chargeListNew").remove();
					$("#ChangeAmt").val("0");
					$("#CardNum1").val("");
					$("#CardNum2").val("");
					$("#CardNum3").val("");
					$("#CardNum4").val("");
					//return;
				}else{
				    $("#selCardSort").val(json.body.R11);  //  카드종류
		    		$("#CardNum1").val(json.body.R10.substr(0,4));  //카드번호 
		    		$("#CardNum2").val(json.body.R10.substr(4,4));  //카드번호 
		    		$("#CardNum3").val(json.body.R10.substr(8,4));  //카드번호 
		    		$("#CardNum4").val(json.body.R10.substr(12,4));  //카드번호 
		    		$("#CardYear").val(json.body.R09.substr(0,4));  //카드유효기간
		    		$("#CardMonth").val(json.body.R09.substr(4,2)); //카드유효기간
		    		$("#custName").html($("#txtSearchText").val() + ' '+ json.body.R12); // 고객코드 , 고객명
		    		$("#custName").attr("custcode", $("#txtSearchText").val());  //  고객코드 
		    		$("#DetpNm").html(json.body.R07);   //부서명
		    		$("#DetpNm").attr("deptcode",json.body.R08); //부서코드 
		    		
		    		if(json.body.R11 == "3314"){ // 삼성카드 -> 무이자할부로 처리
		    			$("#selInstallmentType").val("AD03");
		    		}else{
		    			$("#selInstallmentType").val("AD01");
		    		}
		    		
		    		page.searchInformation(json);
				}
			}
		});		
	},
	searchInformation:function(siteSaleJSON)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07701");
		tr.body.P01 = "7000"; 
		tr.body.P02 = page.custCode; // 고객코드
		tr.body.P03 = page.orderNo; // 주문서번호
        		 
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){				  
					$("#RenderListNew").remove();
					$("#changeAmt").val("0");
					$("#CardNum1").val("");
					$("#CardNum2").val("");
					$("#CardNum3").val("");
					$("#CardNum4").val("");
				}else{
					var chargeList = json.body.LIST01;
					if(chargeList.length == 0){
						bizMOB.Ui.alert("안내", "고객의 매출 확정 내역이 존재하지 않습니다.");
						$("#changeAmt").val("");
						$("#installment").val("");
						//page.renderChargeList(json, "LIST01");
						return;
					}
		    		page.renderChargeList(json, "LIST01", siteSaleJSON);
				}
			}
		});
	},	
	// 매출확정 리스트 출력
	renderChargeList: function(json, listName, siteSaleJSON){
		
		if(json.body.LIST01.length != 0){
			var item = json.body.LIST01[0];
			page.saleYM = item.R04;
			page.cditem = item.R33;
			page.custType = item.R08;
			page.workType = item.R37;
			page.charge = item.R28;
			page.contractType = item.R35;
			page.hnoclosing = item.R01;
			page.noclosing = item.R02;
			page.no_sr = item.R06;
			page._seq = item.R05;
		}
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".trCharge",
		 		value:listName,
		 		detail:
	 			[  
	 			 	{type:"single", target:"@class+", value:function(){
	 			 		return " salesok";}
	 			 	},
	 			 	{type:"single", target:"@r01+", value:"R33"},
	 			 	{type:"single", target:"@r06+", value:"R04"},
	 			 	{type:"single", target:"@cditem+", value:"R33"},
	 			 	{type:"single", target:"@hnoclosing+", value:"R01"},
	 			 	{type:"single", target:"@noclosing+", value:"R02"},	 			 	
	 			 	{type:"single", target:"@nosr+", value:"R06"},
	 			 	{type:"single", target:"@seq+", value:"R05"},
	 			 	{type:"single", target:"@saleym+", value:"R04"},
	 			 	{type:"single", target:"@worktype+", value:"R37"},
	 			 	{type:"single", target:"@charge+", value:"R28"},
	 			 	{type:"single", target:"@contracttype+", value:"R35"},
	 			 	
                    {type:"single", target:".contractNm", value:"R34"},
                    {type:"single", target:".contractNm@ContractCode", value:"R33"},
                    {type:"single", target:".saleYM", value:"R04"},
                    {type:"single", target:".amt", value:function(arg){  
                    	return arg.item.R28.bMToNumber().bMToStr().bMToCommaNumber();
					}},
                    {type:"single", target:".workNm", value:function(arg){
                	   return page.getWorkName(arg.item.R37);
				    }},
                    {type:"single", target:".workNm@workGubun", value:function(arg)
				    {  
				        return parseInt(arg.item.R37);
				    }},
				    {type:"single", target:".chargeType", value: function(arg){
				    	return "매출확정";
				    }},
				    {type:"single", target:".chargeType@class+", value: function(arg){
				    	return " type1";
				    }}
 		        ]
		 	}
		];
		var options = { clone:true, newId:"chargeListNew", replace:true };
		$("#chargeList").bMRender(json.body, dir, options); // 사용버전

		page.setChargeSum();
		//page.renderSiteSaleChargeList(siteSaleJSON);
	},
	// 현장매출 리스트
	renderSiteSaleChargeList: function(json){
		//test데이터
		//json={"body":{"list01":[{"R05":"11111.0","R02":"일반방제","R03":"","R01":"6801","R04":"5","R06":"2014-06"},{"R05":"10000.0","R02":"해충동정","R03":"","R01":"6820","R04":"5","R06":"2014-06"},{"R05":"10000.0","R02":"먼지다듬이","R03":"","R01":"6831","R04":"5","R06":"2014-06"},{"R05":"12000.0","R02":"VBC 전문살균","R03":"","R01":"6846","R04":"5","R06":"2014-06"},{"R05":"40000.0","R02":"VBC 시스템","R03":"","R01":"6847","R04":"5","R06":"2014-06"},{"R05":"1000.0","R02":"피닉스","R03":"","R01":"6878","R04":"5","R06":"2014-06"}],"R07":"정보전략실","R08":"10225","R09":"201905","R11":"3306","R12":"세스코","R10":"5549590078924815"},"header":{"result":true,"trcode":"CM07706","error_code":"","error_text":"","info_text":"","login_session_id":"","message_version":""}};
		if(json.body.list01.length != 0){
			var item = json.body.list01[0];
			page.saleYM = item.R06;
		}
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".trCharge",
		 		value:"list01",
		 		detail:
	 			[  
					{type:"single", target:"@class+", value:function(){
						return " otherlist";}
					},
					{type:"single", target:"@r01+", value:"R01"},
					{type:"single", target:"@r06+", value:"R06"},
	 			    {type:"single", target:"@cditem+", value:"R01"},
	 				{type:"single", target:"@hnoclosing+", value:function(){return page.hnoclosing;}},
					{type:"single", target:"@noclosing+", value:function(){return page.noclosing;}},	 			 	
					{type:"single", target:"@nosr+", value:function(){return page.no_sr;}},
					{type:"single", target:"@seq+", value:function(){return page._seq == "" ? "0" : page._seq;}},
					{type:"single", target:"@saleym+", value:"R06"},
					{type:"single", target:"@worktype+", value:"R04"},
					{type:"single", target:"@charge+", value:"R05"},//
					{type:"single", target:"@contracttype+", value:function(){return page.contractType;}},					
					
                    {type:"single", target:".contractNm", value:"R02"},
                    {type:"single", target:".contractNm@ContractCode", value:"R01"},
                    {type:"single", target:".saleYM", value:"R06"},
                    {type:"single", target:".amt", value:function(arg){  
                    	return arg.item.R05.bMToNumber().bMToStr().bMToCommaNumber();
					} },
                    {type:"single", target:".workNm", value:function(arg){
                	   return page.getWorkName(arg.item.R04);
				    } },
                    {type:"single", target:".workNm@workGubun", value:"R04"},
				    {type:"single", target:".chargeType", value: function(arg){
				    	return "현장매출";
				    }},
				    {type:"single", target:".chargeType@class+", value: function(arg){
				    	return " type3";
				    }}
 		        ]
		 	}
		];
		var options = { clone:true, newId:"chargeListNew", replace:false };
		//$("#chargeList").bMRender(json.body, dir, options); // 사용버전
		$("#chargeList").bMMerge(json.body, dir, ["R01", "R06"], options); // 테스트
		page.setChargeSum();
	},	
	// 팝업창에서 받아오는 선청구리스트 출력
	renderPreChargeList: function(json){
		if(json.body.LIST01.length != 0){
			var item = json.body.LIST01[0];
			page.saleYM = item.R01;
		}
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".trCharge",
		 		value:"LIST01",
		 		detail:
	 			[  
					{type:"single", target:"@class+", value:function(){
						return " otherlist";}
					},
	 			    {type:"single", target:"@cditem+", value:"R02"},
	 				{type:"single", target:"@hnoclosing+", value:function(){return page.hnoclosing;}},
					{type:"single", target:"@noclosing+", value:function(){return page.noclosing;}},	 			 	
					{type:"single", target:"@nosr+", value:function(){return page.no_sr;}},
					{type:"single", target:"@seq+", value:function(){return page._seq == "" ? "0" : page._seq;}},
					{type:"single", target:"@saleym+", value:"R01"},
					{type:"single", target:"@worktype+", value:function(){return "5";}},
					{type:"single", target:"@charge+", value:"R04"},//
					{type:"single", target:"@contracttype+", value:function(){return page.contractType;}},					
					
                    {type:"single", target:".contractNm", value:"R03"},
                    {type:"single", target:".contractNm@ContractCode", value:"R02"},
                    {type:"single", target:".saleYM", value:function(arg){
                    	return arg.item.R01.substr(0, 4) + "-" + arg.item.R01.substr(4, 2);
                    }},
                    {type:"single", target:".amt", value:function(arg){  
                    	return arg.item.R04.bMToNumber().bMToStr().bMToCommaNumber();
					}},
                    {type:"single", target:".workNm", value:function(arg){
                	   return page.getWorkName("5"); // 현재 프로시저에 5로 고정되어 있음 ///////////////////////////////// 확인하기
				    }},
                    {type:"single", target:".workNm@workGubun", value:function(arg)
				    {  
				      return parseInt(5);
				    }},
				    {type:"single", target:".chargeType", value: function(arg){
				    	return "선청구";
				    }},
				    {type:"single", target:".chargeType@class+", value: function(arg){
				    	return " type2";
				    }}
 		        ]
		 	}
		];
		var options = { clone:true, newId:"chargeListNew", replace:true };
		$("#chargeList").bMRender(json.body, dir, options); // 사용버전
		page.setChargeSum();
	},	
	// 현재 리스트 금액의 합계를 구해서 inputbox에 값을 할당해주는 함수
	setChargeSum: function(){
		var chargeSum = 0;
		var cnt = $(".amt:visible").length;
		for(var i = 0; i < cnt; i++){
			chargeSum += $($(".amt:visible")[i]).html().bMToNumber();
		}
		$("#changeAmt").val(chargeSum.bMToStr().bMToCommaNumber());
	},
	custlistCheck:function(){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01101");
		tr.body.P01 = $("#txtSearchText").val();
		tr.body.P02 = page.userID;
	   
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false){
					return;
				}
				
				if(json.body.List01.length > 1){
					bizMOB.Ui.openDialog("collection/html/CM011.html", 
					{
			           message:  {Custin : $("#txtSearchText").val() ,Pagepath : "page.cardMove"}, //SR번호 넘기기" +
			           width  : "80%",
					   height : "75%",
					});
				}else{					
				    page.custCode  =  json.body.List01[0].R01;
				    $("#txtSearchText").val(json.body.List01[0].R01);
				    $("#txtSearchText").hideKeypad();
				    
				    $("#custName").val(json.body.List01[0].R02);
				    $("#custName").attr("custcode", page.custCode);
				   
				    page.searchCardInformation();
				}				
			}
		});		
	},	
	cardMove :function(json){
		page.custCode  =  json.CustCode;
		$("#custName").val(json.CustCode);
		$("#custName").attr("custcode",json.CustCode);
		$("#txtSearchText").val(json.CustCode);
		page.initData(json);
	},	
	// 기승인 체크 로직
	preApprovalCheck: function(saleYM){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07705");
		
		tr.body.P01 = "M"; // DeviceType
		tr.body.P02 = page.custCode; // 고객코드
		tr.body.P03 = (new Date()).bMToFormatDate("yyyymmdd"); // 요청일자
		tr.body.P04 = $("#CardNum1").val() + $("#CardNum2").val() + $("#CardNum3").val() + $("#CardNum4").val(); // 카드번호
		tr.body.P05 = $("#changeAmt").val().bMToNumber().bMToStr(); // 결제금액
		tr.body.P06 = saleYM;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "기승인 체크 중 오류가 발생하였습니다.");
					return false;
				}else{
					if(json.body.R01 == "001"){
						bizMOB.Ui.alert("안내", json.body.R02);
						return false;
					}else if(json.body.R01 == "002"){
						bizMOB.Ui.alert("안내", json.body.R02);
						return false;
					}else if(json.body.R01 == "003"){
						page.makeClosingNumber();
					}
				}
			}
		});
	},
	// 승인요청 로직
	approvalRequest: function(){
        if(page.custCode == ""){
        	bizMOB.Ui.alert("안내", "고객코드를 확인해주세요.");
        	return;
        }
        
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CARD002");
		
		var cardApprovalRequestDetail = []; // 카드승인요청상세 배열
		var collectionRepayment = []; // 수금반제 배열
		
		var trChargeList = $(".trCharge:visible");
		var trChargeLength = trChargeList.length;
		
		var chargeAmt = $("#changeAmt").val().bMToNumber().bMToStr();
		
		for(var i = 0; i < trChargeLength; i++){
			cardApprovalRequestDetail.push({
				L1P01: page.custCode,
				L1P02: $(trChargeList[i]).attr("saleym").replace(/-/g, ""),
				L1P03: $(trChargeList[i]).attr("cditem"),
				L1P04: $(trChargeList[i]).attr("worktype"),
				L1P05: $(trChargeList[i]).attr("charge"),
				L1P06: "0",
				L1P07: "0",
				L1P08: $(trChargeList[i]).attr("contracttype"),
			});
			
			var hnoclosing = $(trChargeList[i]).attr("hnoclosing");
			
			collectionRepayment.push({
				L2P01: page.cdCompany,
				L2P02: page.closingNumber,
				L2P03: $(trChargeList[i]).attr("hnoclosing"),
				L2P04: $(trChargeList[i]).attr("noclosing"),
				L2P05: $(trChargeList[i]).attr("nosr"),
				L2P06: $(trChargeList[i]).attr("seq") == "" ? "0" : $(trChargeList[i]).attr("seq"),
				L2P07: hnoclosing == undefined || hnoclosing == "" ? "002" : "001", 
				L2P08: page.custCode,
				L2P09: $(trChargeList[i]).attr("charge"),
				L2P10: $(trChargeList[i]).attr("charge"),
				L2P11: ""
			});
		}
		
		tr.body.LIST01 = cardApprovalRequestDetail;
		tr.body.LIST02 = collectionRepayment;
	        
        tr.body.P01 = page.custCode;
        tr.body.P02 = $("#CardNum1").val() + $("#CardNum2").val() + $("#CardNum3").val() + $("#CardNum4").val();
        tr.body.P03 = $("#CardYear").val() + $("#CardMonth").val();
        tr.body.P04 = page.saleYM.replace(/-/g, "");
        tr.body.P05 = $("#installment").val() == "" ? "0" : $("#installment").val();
        tr.body.P06 = chargeAmt;
        tr.body.P07 = "0";
        tr.body.P08 = "0";
        tr.body.P09 = page.cardTradeNumber;
        tr.body.P10 = page.billingNumber;
        tr.body.P11 = page.cdCompany;
        tr.body.P12 = $("#selCardSort").val();
        tr.body.P13 = $("#selInstallmentType").val();
        tr.body.P14 = page.addMonth(new Date(), 3); //취소일자
        tr.body.P15 = Math.floor(chargeAmt * 0.0265).bMToStr(); //할부수수료
        
        
        tr.body.P16 = page.cdCompany;
        tr.body.P17 = page.closingNumber;
        tr.body.P18 = (new Date()).bMToFormatDate("yyyymmdd");
        tr.body.P19 = page.deptCode;
        tr.body.P20 = page.userID;
        tr.body.P21 = page.custCode;
        tr.body.P22 = "001";
        tr.body.P23 = "001";
        tr.body.P24 = $("#selCardSort").val();
        tr.body.P25 = $("#CardNum1").val() + $("#CardNum2").val() + $("#CardNum3").val() + $("#CardNum4").val();
        tr.body.P26 = chargeAmt;
        tr.body.P27 = "0";
        tr.body.P28 = chargeAmt;
        tr.body.P29 = "";
        tr.body.P30 = "";
        tr.body.P31 = "";
        tr.body.P32 = "";
        tr.body.P33 = "N";
        tr.body.P34 = "0";
        tr.body.P35 = "카드건승인";
        tr.body.P36 = page.billingNumber;
        tr.body.P37 = page.userID;
        tr.body.P38 = "";
        tr.body.P39 = "";        
	     
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
   					    bizMOB.Ui.confirm("알림", "카드 승인이 완료되었습니다.", btnConfirm); 
                    }else{
                    	var errMsg = json.body.R01.split("|");
                 	    bizMOB.Ui.alert("승인 실패", "카드종류 : " + errMsg[2] + "\n" + "불능사유 : " + errMsg[4]);
                 	   $("#btnRequest").text("재승인");
                    }
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
		tr.body.P03 = "SH";

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
	// 승인 전 Insert 로직
	preInsert: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07704");
		
		var chargeAmt = $("#changeAmt").val().bMToNumber().bMToStr();
		
		tr.body.P01 = "1";
		tr.body.P02 = page.billingNumber;
		tr.body.P03 = page.cdCompany;
		tr.body.P04 = page.saleYM.replace(/-/g, "");
		tr.body.P05 = page.custCode;
		tr.body.P06 = page.custType;
		tr.body.P07 = page.cardTradeNumber;
		tr.body.P08 = $("#CardNum1").val() + $("#CardNum2").val() + $("#CardNum3").val() + $("#CardNum4").val();
		tr.body.P09 = $("#CardYear").val() + $("#CardMonth").val();
		tr.body.P10 = $("#installment").val() == "" ? 0 : $("#installment").val().bMToNumber(); // 할부기간
		tr.body.P11 = chargeAmt;
		tr.body.P12 = page.userID;
		tr.body.P13 = $("#selInstallmentType").val();
		tr.body.P14 = page.addMonth(new Date(), 3); //취소일자
        tr.body.P15 = Math.floor(chargeAmt * 0.0265); //할부수수료
		
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){	
					bizMOB.Ui.alert("안내", "카드 승인 내역 등록에 실패하였습니다.");
					return;
				}else{
					page.approvalRequest();
				}
			}
		});	
	},
	addMonth: function(date, num){
        var dd = new Date(date);
        var y = dd.getFullYear();
        var my = dd.getMonth() + 1 + num;        
        var nm = dd.getMonth() + 1;       
        var m = nm + (num % 12) - 12 <= 0 ? (nm + (num % 12)) <= 0 ? (nm + (num % 12)) + 12 : (nm + (num % 12)) : (nm + (num % 12)) - 12;
        var d = dd.getDate();

        if(num >= 0){
        	y += my % 12 == 0 ? ((my / 12) | 0) - 1 : (my / 12) | 0;
        }else{
        	y += ((my-12) / 12) | 0;
        }
       	m = m % 12 == 0 ? 12 : m % 12;
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return (new Date(y + '-' + m + '-' + d)).bMToFormatDate("yyyymmdd"); 
    },
    getWorkName: function(workType){
        var workName  = "";
	    switch(workType) 
	    {
	        case "1": workName  = "초기1차"; break;
	        case "2": workName  = "초기2차"; break;
	        case "3": workName  = "초기3차"; break;
	        case "4": workName  = "정기이월"; break;
	        case "5": workName  = "정기작업"; break;
	        case "6": workName  = "크레임"; break;
	        case "E": workName  = "방문요청"; break;
	        case "F": workName  = "서류전달"; break;
	        case "Z": workName  = "기타"; break;
	        case "7": workName  = "추가(有)"; break;
	        case "8": workName  = "추가(無)"; break;
	        case "9": workName  = "무료진단"; break;
	        case "V": workName  = "VBC 설치"; break;
	    }
	    return workName;
    },
    firstCheck: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07708");
    	
    	$(".salesok").each(function(i, listElement){
    		tr.body.P_PAGE = "2";
	    	tr.body.CD_COMPANY = "7000";
	    	tr.body.HNO_CLOSING = $(listElement).attr("hnoclosing");
	    	tr.body.NO_CLOSING = $(listElement).attr("noclosing");
	    	tr.body.NO_SR = $(listElement).attr("nosr");
	    	tr.body.CD_ITEM = $(listElement).attr("cditem");
	    	tr.body.AMT = $(listElement).attr("charge");
	    	
	    	bizMOB.Web.post({
	    		message: tr,
	    		success: function(json){
	    			if(!json.header.result || json.body.LIST01.length == 0){
	    				return;
	    			}else{
	    				if(json.body.LIST01[0].RESULT == "FALSE"){
	    					if(page.firstYN)
	    						bizMOB.Ui.alert(json.body.LIST01[0].RESULTMSG);
	    					page.firstYN = false;
	    					return;
	    				}
	    				if($(".salesok").length == (i + 1)){
	    					if(page.firstYN)
	    						page.secondCheck();
	    				}
	    			}
	    		}
	    	});
    	});
    },
    secondCheck: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07707");
    	
    	$(".salesok").each(function(i, listElement){
    		tr.body.CustCode = page.custCode;
	    	tr.body.SaleYm = $(listElement).attr("saleym").replace("-", "");
	    	
	    	bizMOB.Web.post({
	    		message: tr,
	    		success: function(json){
	    			if(!json.header.result){
	    				return;
	    			}else{
	    				if(json.body.LIST01.length != 0){
	    					page.secondYN = false;
	    					return;
	    				}
	    				if($(".salesok").length == (i + 1)){
	    					if(page.secondYN)
	    						page.thirdCheck();
	    				}
	    			}
	    		}
	    	});
    	});
    },
    thirdCheck: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07705");
		$(".salesok").each(function(i, listElement){			
			tr.body.P01 = "M"; // DeviceType
			tr.body.P02 = page.custCode; // 고객코드
			tr.body.P03 = (new Date()).bMToFormatDate("yyyymmdd"); // 요청일자
			tr.body.P04 = $("#CardNum1").val() + $("#CardNum2").val() + $("#CardNum3").val() + $("#CardNum4").val(); // 카드번호
			tr.body.P05 = $("#changeAmt").val().bMToNumber().bMToStr(); // 결제금액
			tr.body.P06 = $(listElement).attr("saleym").replace("-", "");
			
			bizMOB.Web.post({
				message: tr,
				success: function(json){
					if(!json.header.result){
						bizMOB.Ui.alert("안내", "기승인 체크 중 오류가 발생하였습니다.");
						return;
					}else{						
						if(json.body.R01 == "001"){
							bizMOB.Ui.alert("안내", json.body.R02);
							page.thirdYN = false;
							return;
						}else if(json.body.R01 == "002"){
							bizMOB.Ui.alert("안내", json.body.R02);
							page.thirdYN = false;
							return;
						}
						if($(".salesok").length == (i + 1)){
							if(page.thirdYN)
								page.makeClosingNumber();
							
							//혹시나..
							page.firstYN = true;
							page.secondYN = true;
							page.thirdYN = true;
							
						}
					}
				}
			});
		});
    },
    secondCheck2: function(){ // 선청구, 현장매출 체크
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07707");
    	
    	$(".otherlist").each(function(i, listElement){
    		tr.body.CustCode = page.custCode;
	    	tr.body.SaleYm = $(listElement).attr("saleym").replace("-", "");
	    	
	    	bizMOB.Web.post({
	    		message: tr,
	    		success: function(json){
	    			if(!json.header.result){
	    				return;
	    			}else{
	    				if(json.body.LIST01.length != 0){
	    					page.secondYN = false;
	    					return;
	    				}
	    				if($(".otherlist").length == (i + 1)){
	    					if(page.secondYN)
	    						page.thirdCheck2();
	    				}
	    			}
	    		}
	    	});
    	});
    },
    thirdCheck2: function(){ // 선청구, 현장매출 체크
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07705");
		$(".otherlist").each(function(i, listElement){			
			tr.body.P01 = "M"; // DeviceType
			tr.body.P02 = page.custCode; // 고객코드
			tr.body.P03 = (new Date()).bMToFormatDate("yyyymmdd"); // 요청일자
			tr.body.P04 = $("#CardNum1").val() + $("#CardNum2").val() + $("#CardNum3").val() + $("#CardNum4").val(); // 카드번호
			tr.body.P05 = $("#changeAmt").val().bMToNumber().bMToStr(); // 결제금액
			tr.body.P06 = $(listElement).attr("saleym").replace("-", "");
			
			bizMOB.Web.post({
				message: tr,
				success: function(json){
					if(!json.header.result){
						bizMOB.Ui.alert("안내", "기승인 체크 중 오류가 발생하였습니다.");
						return;
					}else{						
						if(json.body.R01 == "001"){
							bizMOB.Ui.alert("안내", json.body.R02);
							page.thirdYN = false;
							return;
						}else if(json.body.R01 == "002"){
							bizMOB.Ui.alert("안내", json.body.R02);
							page.thirdYN = false;
							return;
						}
						if($(".otherlist").length == (i + 1)){
							if(page.thirdYN)
								page.makeClosingNumber();
							
							//혹시나..
							page.firstYN = true;
							page.secondYN = true;
							page.thirdYN = true;
							
						}
					}
				}
			});
		});
    }
};

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }    
}