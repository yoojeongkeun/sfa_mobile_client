page  =
{
		/*

		작성자 			: 조선호
		최초작성일자	: 2014-05-21
		수정이력
		  1. ----- 

		*/ 
		HistoryGubun : "",
		init : function(json)
		{
			ipmutil.appendCommonMenu();
			page.initInterface();
			page.initData(json);
			page.initLayout();
			
		},
		initInterface:function()
		{
			$(".btn_search").click(function()
			{
				page.searchCustList();
			});
			
			$("#inpSearchText").keypress(function(e){
				if(e.which == 13) page.searchCustList(); 
			});
			
			$(".click_up").click(function()
			{
				// class에 on 추가
				if(!$(this).hasClass("on"))
				{
					$(this).parent().find(".on").removeClass("on");
					$(this).addClass("on");
				}
				var buttonType = $(this).attr("id");
				
				if(buttonType == "scheduleSoon")
				{
					// 일정순
					//bizMOB.Ui.alert("일정순");
					//$("#custlistnew").bMSort({"orderby" : "asc", "field" : ".custName@orderno1", "fieldType" : "int"});
				}
				else
				{
					// 위치순
					//bizMOB.Ui.alert("위치순");
				}
					
			});
			
			page.setEvent();
		},
		initData:function(json)
		{
			var IDName    =  bizMOB.Storage.get("UserName");
			var custName  =  bizMOB.Storage.get("custName");
	 		var custCode  =  bizMOB.Storage.get("custCode");
	 		
	 		var UserID    =  bizMOB.Storage.get("UserID");
	 		var deptName  =  bizMOB.Storage.get("deptName");
	 		var deptCode  =  bizMOB.Storage.get("deptCode");
	 		
	 		$("#subname").text(IDName);
	 		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
	 	    
	 		if(json.custCode != ""){
	 			page.returnCustomerInfo({CustCode : json.custCode, CustName : ""});
	 			return;
	 		}
	 		
	 		if (custCode == undefined) return;
	 		
	 		page.returnCustomerInfo({CustCode : custCode, CustName : custName});
		},
		initLayout:function()
		{
			var IDName    =  bizMOB.Storage.get("UserName");
			var custName  =  bizMOB.Storage.get("custName");
	 		var custCode  =  bizMOB.Storage.get("custCode");
	 		
	 		var UserID    =  bizMOB.Storage.get("UserID");
	 		var deptName  =  bizMOB.Storage.get("deptName");
	 		var deptCode  =  bizMOB.Storage.get("deptCode");
	 		
			
			
			ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
			var layout = ipmutil.getDefaultLayout("고객검색");
			
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
		setEvent:function()
		{
			$("#custlistnew").delegate(".btn_call", "click", function()
	        {
				var telnum = $(this).parent().attr("phonenumber").replace("-", "");
	            var button1 = 
	            	bizMOB.Ui.createTextButton("예", function()
			        {
			            if (telnum.length > 8) bizMOB.Phone.tel(telnum);
			        });
	            var button2 = 
	            	bizMOB.Ui.createTextButton("아니오", function()
			        {
			           return;
			        });
	            if (telnum == "")
	            {
	            	
	            	bizMOB.Ui.alert("알림","고객전화번호가 등록되지 않았습니다.");
	            	return;
	            }
	            
	            bizMOB.Ui.confirm("통화", "고객과 통화 하시겠습니까?", button1,button2);
	        });
			
			$("#custlistnew").delegate(".btn_sms", "click", function()
	        {
				var telnum = $(this).parent().attr("phonenumber").replace("-", "");
	            var button1 = 
	            	bizMOB.Ui.createTextButton("예", function()
			        {
			            if (telnum.length > 8) bizMOB.Phone.sms(telnum, "");
			        });
	            var button2 = 
	            	bizMOB.Ui.createTextButton("아니오", function()
			        {
			           return;
			        });
	            if (telnum == "")
	            {
	            	
	            	bizMOB.Ui.alert("알림","고객전화번호가 등록되지 않았습니다.");
	            	return;
	            }
	            
	            bizMOB.Ui.confirm("통화", "고객에게 문자메시지를 발송 하시겠습니까?", button1,button2);
	        });
			
			$("#custlistnew").delegate(".btn_map", "click", function()
	        {
				var address = $(this).parent().parent().find(".custAddress").text();
				var parenthesesIndex = address.lastIndexOf("(");
				if(parenthesesIndex == -1){
					bizMOB.Map.show(address);
				}else{
					bizMOB.Map.show(address.substr(0, parenthesesIndex));
				}
					            
	        });
			
			
			$("#custlistnew").delegate(".custName", "click", function()
	        {
				var custCode = $(this).attr("custcode");
				page.moveCustInfoPage(custCode);
	        });
			
			$("#custlistnew").delegate(".custAddress", "click", function()
	        {
				var custCode = $(this).parent().parent().find(".custName").attr("custcode");
				page.moveCustInfoPage(custCode);
	        });
		},
		moveCustInfoPage:function(custCode)
		{
			// 고객정보열람 이동
			if (custCode.length == 0)
			{
				bizMOB.Ui.alert("고객을 먼저 선택해 주세요.");
				return;
			}
			
			var openOption = 
			{
				modal   : false,
				replace : false,
				message : { custCode : custCode },
			};
			
			bizMOB.Web.open("custmaster/html/CM007.html", openOption);
		},
		searchCustList:function()
		{
			var seachText = $("#inpSearchText").val();
			
			if (seachText.length <= 1)
			{
				bizMOB.Ui.alert("2글자 이상 입력해 주세요.");
				return;
			}
			
			var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00301");
			tr.body.P01 = seachText;
			tr.body.P02 = $("#selCustSearchType").val();
			tr.body.P03 = "";
			
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
					
					page.renderList(json, "L01");
				}
			});
		},
		renderList:function(json, listName)
		{
			// 항목 리스트를 셋팅하기
			var dir = 
			[
			 	{
			 		type:"loop",
			 		target:".cust_list_detail",
			 		value:listName,
			 		detail:
		 			[
		 			 	{type:"single", target:".custName@custcode+", value:"R01"}, // 고객코드
		 			 	{type:"single", target:".custName", value:"R02"}, // 고객명
						{type:"single", target:".cust_stat@class+", value:function(arg)
	                        { 
	                            // 고객명 합치기(고객코드, 고객명, 고객구분)
						        var custType = arg.item.R03;
						        var imageClass = "";
	                            
						        switch(custType)
						        {
						            case "3": // 해약고객
						            case "7": // 취소고객
						            	imageClass = " cancel";
	                                    break;
						            case "5": // 유망고객
						            	imageClass = " poss";
	                                    break;
	                                default :
	                                	imageClass = "";
	                                    	break;
						        }
	                            
	                            return imageClass;
	                        }},
	                    {type:"single", target:".btn_group@phonenumber+", value:"R04"}, // 전화번호
	                    {type:"single", target:".custAddress", value:"R05"}, // 주소
	                    {type:"single", target:".oldCustAddress", value:function(arg){
	                    	return arg.item.R09 == "" ? "구 주소 정보 없음" : arg.item.R09;
	                    }}, // 주소
	                    {type:"single", target:"@orderno1+", value:"R06"}, // 일정조회순서
	                    {type:"single", target:"@orderno2+", value:"R07"}, // 지역조회순서
	                    {type:"single", target:".cust_stat", value:"R08"} // 고객구분명
	 		        ]
			 	}
			];
			// 반복옵션(이전의 항목을 삭제하는 옵션)
			var options = { clone:true, newId:"custlistnew", replace:true };
			// 그리기
			$("#custlist").bMRender(json.body, dir, options);
			
			$("#inpSearchText").hideKeypad();
		},
		
		returnCustomerInfo:function(json)
		{
			// 데이터가 없다면 실행하지 않음
			if (json == undefined || json.CustCode.length < 6)
			{				
				return;
			}
			$("#inpSearchText").val(json.CustCode);			
			page.searchCustList();
		}
		
	};




