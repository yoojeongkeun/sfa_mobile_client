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
	
	NO_RCP: "",
	MO_TYPE: "", // 조회구분( air: 공기청정기, 그외는 일반 )
	
	init : function(json)
	{	
		page.MO_TYPE = json.MO_TYPE;
		
		page.initFirst(json);
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initFirst: function(json){
		ipmutil.resetChk();
		ipmutil.setAllSelect(document, "input", "click");
		page.userName = bizMOB.Storage.get("UserName");
		page.custCode = bizMOB.Storage.get("custCode");
		page.orderNo = json.orderNo == undefined ? "" : json.orderNo;
		page.cardMsg = json.cardMsg == undefined ? "" : json.cardMsg;
		page.userID = bizMOB.Storage.get("UserID");
		page.deptCode = bizMOB.Storage.get("deptCode");
		page.deptName = bizMOB.Storage.get("deptName");
		if (json.HistoryGubun == undefined){
			page.HistoryGubun  =  "";		
		}
		else{		    
			page.HistoryGubun  =  json.HistoryGubun;		 	
		}
		
		
		if (json.orderNo != "")
		{			
			page.orderMove(json);
		}
		
		ipmutil.appendCommonMenu(page.userName);
	},
	initInterface:function()
	{		
		ipmutil.makeCustSearchWrap();
		ipmutil.setCustSearch($("#selCustSearchType"), $("#txtCustSearchText"), $("#btnCustSearch"), "page.cardMove");
		
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
	    		bizMOB.Ui.openDialog("collection/html/CM093_1.html", 
				{
		            message:  {CustCode : page.custCode}, 
		            width : "80%",
				    height : "80%",
				}); 
	        	page.CHAINSTATUS  ="1";
	    	});
	    	
	    	var btnCancel = bizMOB.Ui.createTextButton("취소", function(){
	    		return;
	    	});
	    	
	    	bizMOB.Ui.confirm("안내", "선청구 진행시 기존 매출확정분/현장매출분이 리스트에서 사라집니다. 계속 진행하시겠습니까?\n(매출확정분/현장매출분은 고객 조회시 다시 나타나며 선청구와 동시에 진행 할 수 없습니다.)", btnOK, btnCancel);
	    });
		
	    
	    // 승인요청 버튼 클릭 이벤트
        $("#btnRequest").click(function(){
        	if(page.custCode == ""){
        		bizMOB.Ui.alert("안내", "고객을 먼저 선택해주세요.");
        		return;
        	}
        	
        	
        	
        	if((page.custType == "1" || page.custType == "2") && $("#selInstallmentType").val() == "AD03"){
        		bizMOB.Ui.alert("안내", "산업체 /소규모 고객은 무이자 할부 대상이 아닙니다.");
        		return;
        	}
        	
        	if($("#selInstallmentType").val() == "AD03" && $("#installment").val() >= "12" && $("#changeAmt").val().bMToNumber() <= "300000"){
        		bizMOB.Ui.alert("안내", "무이자 할부, 12개월 이상일 경우에는 30만원 이하 금액은 승인이 불가합니다.");
        		return;
        	}
        	
        	var orderYN = false;
        	var dlist = $("#chargeListNew").find("tr");
    		
        	if(dlist.length > 1)
    		{
        		$.each(dlist, function(i, colElement){
    				if($(colElement).find(".contractNm").attr("contractcode") == "6850")
					{
    					orderYN = true;
    	        		return;
					}
        		});
    		}
        	
        	if(orderYN)
    		{
        		bizMOB.Ui.alert("안내", "환경위생은 단일 주문서 단위로 진행해야 합니다.");
        		return;
    		}
        	
        	if($("#changeAmt").val() == "" || $("#changeAmt").val().bMToNumber().bMToStr() == 0){
        		bizMOB.Ui.alert("안내", "승인을 요청 할 내역이 존재하지 않습니다.");
        		return;
        	}
        	
        	/*if($("#selCardSort").val() == ""){
            	bizMOB.Ui.alert("안내", "카드종류를 선택해주세요.");
            	return;
            }*/
        	
    		// 교육용 DB일 경우 버튼 막기
        	var dbname = bizMOB.Storage.get("dbname");
        	
        	if(dbname == "E"){
        		bizMOB.Ui.alert("안내", "교육용 어플에서는 사용하실 수 없습니다.");
        		return;
        	}else if(dbname == undefined || dbname == "" || dbname == null){
        		bizMOB.Ui.alert("안내", "세션값이 존재하지 않습니다.");
        		return;
        	}
        	
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
        	var btnOK = bizMOB.Ui.createTextButton("진행", function(){
        		
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
        	var btnCancel = bizMOB.Ui.createTextButton("돌아가기", function(){
        		return;
        	});
        	bizMOB.Ui.confirm("안내", "카드 승인을 진행하시겠습니까?\n(카드 단말기의 전원을 켜서 연결한 후 진행 버튼을 눌러주세요)", btnOK, btnCancel);
	    });
	     
		$("#selCardSort").change(function(){			 
		    page.CHAINSTATUS  ="1"; //??		     		 
		});		
	},
	initData:function(json)
	{	
		page.Seq = "";		
		page.commonCodeSearch();
		
		if (page.custCode != undefined && page.custCode != "")
		{
			$("#selCustSearchType").val("CS002");
			$("#txtCustSearchText").val(page.custCode);
			$("#btnCustSearch").trigger("click");
			//page.searchCardInformation();
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
		layout = ipmutil.getDefaultLayout("카드단말기 승인");
		
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
		
		if(page.MO_TYPE != "air") { // 공기청정기 (DE) 에서 들어온 경우는 메인 돌아가기 버튼 없앤다. 
		
	 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
	 			$("#_submain").show();
				$("#_menuf").show();
				$("#_menuf").animate({
					left : 0
				}, 500);
	 		}}));
		}
 		
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
		tr.body.P02 = $("#txtSearchText").val();  // 고객코드
		
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
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07710");
		tr.body.P01 = "7000"; 
		tr.body.P02 = page.custCode; // 고객코드
		tr.body.P03 = page.orderNo; // 주문서번호
		tr.body.P04 = (page.MO_TYPE == undefined ? "" : page.MO_TYPE);
        		 
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
	 			 	{type:"single", target:"@r30+", value:"R30"},
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
				    }},
				    {type:"single", target:".txtTax", value: function(arg){
				    	if(arg.item.R30 > 0)
				    		return " (부가세 " + arg.item.R30.bMToNumber().toString().bMToCommaNumber() + "원 포함)";
				    	else
				    		return "";
				    }},
				    {type:"single", target:".txtTaxYN", value:"R41"}
 		        ]
		 	}
		];
		var options = { clone:true, newId:"chargeListNew", replace:true };
		$("#chargeList").bMRender(json.body, dir, options); // 사용버전

		page.renderSiteSaleChargeList(siteSaleJSON);
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
				    }},
				    {type:"single", target:".txtTax", value: function(arg){
				    	if(arg.item.R07 > 0)
				    		return " (부가세 " + arg.item.R07.bMToNumber().toString().bMToCommaNumber() + "원 포함)";
				    	else
				    		return "";
				    }},
				    {type:"single", target:".txtTaxYN", value:"R08"}
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
		if(json.list1.body.LIST01.length != 0){
			var item = json.list1.body.LIST01[0];
			page.saleYM = item.R01;
		}
		
		var contObjectList = json.list2.split("|");
		var removeIndexList = [];
		for(var i=0; i<json.list1.body.LIST01.length; i++){
			var removeYN = true;
			for(var j=0; j<contObjectList.length-1; j++){				
				if(json.list1.body.LIST01[i].R02 == contObjectList[j]){
					removeYN = false;
				}
			}
			if(removeYN){
				removeIndexList.push(i);
			}
		}
		
		removeIndexList = removeIndexList.sort(function(a, b){return b - a;});
		for(var i=0; i<removeIndexList.length; i++){
			json.list1.body.LIST01.splice(removeIndexList[i] - 0, 1);
		}
		
		var seq = 1;
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
					{type:"single", target:"@seq+", value:function(){return seq++;}},
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
				    }},
				    {type:"single", target:".txtTax", value: function(arg){
				    	if(arg.item.R08 > 0)
				    		return " (부가세 " + arg.item.R08.bMToNumber().toString().bMToCommaNumber() + "원 포함)";
				    	else
				    		return "";
				    }},
				    {type:"single", target:"@r30+", value:"R08"},
				    {type:"single", target:".txtTaxYN", value:"R09"}
 		        ]
		 	}
		];
		var options = { clone:true, newId:"chargeListNew", replace:true };
		$("#chargeList").bMRender(json.list1.body, dir, options); // 사용버전
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
		
		var tax = 0;
		$(".trCharge:visible").each(function(i, listElement){
			tax += $(listElement).attr("r30") == "" ? 0 : $(listElement).attr("r30").bMToNumber(); 
		});
		
		$("#txtTax").val(tax.bMToStr().bMToCommaNumber());
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
		$("#txtCustSearchText").val("[" + json.CustCode + "] " + json.CustName);
		page.searchCardInformation();
		//page.initData(json);
	},	
	orderMove :function(json){
		page.custCode  =  json.CustCode;		
		
		//
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
		if(page.custCode == ""){
        	bizMOB.Ui.alert("안내", "고객코드를 확인해주세요.");
        	return;
        }
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS148");
		
		tr.body.P01 = page.closingNumber;
		tr.body.P02 = page.saleYM.replace(/-/g, "");		// 수금일자
		tr.body.P03 = page.deptCode;		// 승인부서
		tr.body.P04 = page.userID;		// 승인사원
		tr.body.P05 = page.custCode;		// 고객코드
		tr.body.P06 = $("#changeAmt").val().bMToNumber().toString();		// 금액
		tr.body.P07 = page.billingNumber;
		tr.body.P08 = page.cardTradeNumber;
		tr.body.P09 = $("#txtTax").val().bMToNumber().toString();		// 부가세
				
		var collectionRepayment = []; // 수금반제 배열
		
		var trChargeList = $(".trCharge:visible");
		var trChargeLength = trChargeList.length;
				
		for(var i = 0; i < trChargeLength; i++){			
			collectionRepayment.push({
				P01: page.closingNumber,				
				P02: $(trChargeList[i]).attr("hnoclosing"),
				P03: $(trChargeList[i]).attr("noclosing"),
				P04: $(trChargeList[i]).attr("nosr"),
				P05: $(trChargeList[i]).attr("seq") == "" ? "0" : $(trChargeList[i]).attr("seq"),			 				
				P06: $(trChargeList[i]).attr("cditem"),
				P07: page.custCode,				
				P08: $(trChargeList[i]).attr("charge")
			});
		}
		
		tr.body.LIST01 = collectionRepayment;
			
		
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){	
					bizMOB.Ui.alert("안내", "단말기 승인 전 내역 등록에 실패하였습니다.");
					return;
				}else{
					
					var bizrno = "212-81-05946";
					//var trmnlNo = "DPT0Q13159";DPT0030087
					var trmnlNo = "DPT0030087";  // 터미널 번호 변경
					var cardCashSe = "CARD";
					var delngSe = 1; // 0:취소, 1:승인
					var splpc = ($("#changeAmt").val().bMToNumber() - $("#txtTax").val().bMToNumber()).toString();
					var vat = $("#txtTax").val().bMToNumber().toString();
					var taxxpt = 0;
					var aditInfo = "nosigndata";
					
					//var srcConfmNo = "37435006";
					//var srcConfmDe = "160601";
					//var srcInstlmtMonth = "0";
					
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
										    				+"&aditInfo=" 		+ aditInfo
										    				//+"&srcConfmNo="		+ srcConfmNo
										    				//+"&srcConfmDe="		+ srcConfmDe
										    				//+"&srcInstlmtMonth="+ srcInstlmtMonth
										    				+"&mrhsInfo=" 		+ page.custCode
										    				+"&callbackAppUrl="	+ callbackAppUrl
				    			}
				     		}
					};
					bizMOB.onFireMessage(v);
				}
			}
		});
		
		//카드단말기 적용으로 인한 주석처리
		/*var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07704");
		
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
		});	*/
		
		
		
		
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
    },
    insertFailedLog: function(result, errorText){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBI059");
    			
    	tr.body.P01 = page.closingNumber; // [NO_RCP]			
    	tr.body.P02 = page.saleYM.replace(/-/g, ""); // [DT_RCP]
    	tr.body.P03 = page.deptCode; // [CD_DEPT]
    	tr.body.P04 = page.userID; // [CD_EMP]
    	tr.body.P05 = page.custCode; // [CD_PARTNER]
    	tr.body.P06 = $("#changeAmt").val().bMToNumber().toString(); // [AM_RCP]
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
    	tr.body.P25 = errorText;
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				if(confirm("실패 이력 저장에 실패하였습니다. 해당 화면 캡쳐 후 정보전략실로 문의 바랍니다.\n" + json.header.error_text)){
    					bizMOB.Web.close();
    				}else{
    					bizMOB.Web.close();
    				}
    			}    			
    		}			
    	});
    }
};

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }    
}


// 단말기에서 서명 완료 후 로직
function getDataCallback(result){
	//alert(JSON.stringify(result));
	
	var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS149");
	
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
	
	bizMOB.Web.post({
		message: tr,
		success: function(json){
			if(!json.header.result){
				if(confirm("단말기 승인 후 정보 저장에 실패하였습니다. " + json.header.error_text)){
					page.insertFailedLog(result, json.header.error_text);
				}else{
					page.insertFailedLog(result, json.header.error_text);
				}
				return;
			}
			if(result.setleSuccesAt == "X"){
				bizMOB.Ui.alert("카드결재 실패", result.setleMssage);
			}else{
				bizMOB.Ui.toast("단말기 카드승인이 정상적으로 이루어졌습니다.");	
				bizMOB.Web.close();
			}			
		}			
	});	
}

function chkUnd(str){
	return str == undefined ? "" : str;
}