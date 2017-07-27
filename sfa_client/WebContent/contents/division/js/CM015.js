page  =
{
		/*

		작성자 			: 조선호
		최초작성일자	: 2014-05-21
		수정이력
		  1. ----- 

		*/ 
	custCode:"",
	custName:"",
	init : function(json)
	{
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		$("#btnCustSearch").click(function()
		{
			var searchText = $("#txtCustText").val();
			
			if (searchText.length <= 1)
			{
				bizMOB.Ui.alert("경고", "고객 검색내용을 2글자 이상을 입력해 주세요.");
				return;
			}
			else
			{
				page.CustlistCheck();
			}
			//page.searchCustomer(searchText);
		});		
		
		 $("#txtCustText").keyup( function(e) {
				
			var searchText = $("#txtCustText").val();
		 	var code = e.which;
				
			if (code  == "13")
			{			
				if (searchText.length > 1)
					 page.CustlistCheck();
			}
						
		});
		
		
		$("#btnRefresh").click(function()
		{
			page.getDivList();
		});
		
		$("#btnDelete").click(function()
		{
			var divSeNum = $("#divListnew .bg02 .divSeNum").text();
			var posiNm = $("#divListnew .bg02 .posiinfo").text();
			
			if(divSeNum.length == 0){
				bizMOB.Ui.alert("경고", "삭제할 구획을 선택해 주세요.");
				return;
			}
			
            var button1 = 
            	bizMOB.Ui.createTextButton("확인", function()
		        {
		            page.deleteDiv(divSeNum);
		        });
            
            bizMOB.Ui.confirm("삭제", posiNm.toString() + "(" +  divSeNum.toString() + ") 구획을 삭제하시겠습니까?", button1);
		});
		
		$("#btnAdd").click(function()
		{
			/*
			pCustCode   고객코드
			pLaClsCode   대분류코드
			pLaClsNm    대분류명
			pFlooCode    층코드
			pFlooNm      층명
			pMiClsCode  중분류코드
			pMiClsNm    중분류명
			pDeClsCode  세분류코드
			pDeClsNm    세분류명
			*/
			
			var $selectItem = $("#divListnew .bg02");
			var pCustCode = page.custCode;
			var pLaClasCode = $selectItem.find(".laCls").attr("code");
			var pLaClsNm = $selectItem.find(".laCls").text();
			var pFlooCode = $selectItem.find(".floor").attr("code");
			var pFlooNm = $selectItem.find(".floor").text();
			var pMiClsCode = $selectItem.find(".miCls").attr("code");
			var pMiClsNm = $selectItem.find(".miCls").text();
			var pDeClsCode = $selectItem.find(".deCls").attr("code");
			var pDeClsNm = $selectItem.find(".deCls").text();
			var callbackMethod = "page.addCallBack";
			var path = "division/html/CM068.html";
			
			bizMOB.Ui.openDialog(path,
			{
				message:
				{
					"pCustCode":pCustCode,
					"pLaClsCode":pLaClasCode,
					"pLaClsNm":pLaClsNm,
					"pFlooCode":pFlooCode,
					"pFlooNm":pFlooNm,
					"pMiClsCode":pMiClsCode,
					"pMiClsNm":pMiClsNm,
					"pDeClsCode":pDeClsCode,
					"pDeClsNm":pDeClsNm,
					"pCallBack":callbackMethod
				},
				width:"80%",
				height:"80%",
				base_on_size:"page",
				base_size_orientation:"vertical"
			});
		});
		
		$("#btnModify").click(function(){
			if($("#divListnew .bg02").length == 0){
				bizMOB.Ui.alert("안내", "수정할 구획을 선택해주세요.");
				return;
			}
		
			var $selectItem = $("#divListnew .bg02");
			var pCustCode = page.custCode;
			var pLaClsCode = $selectItem.find(".laCls").attr("code");
			var pLaClsNm = $selectItem.find(".laCls").text();
			var pFlooCode = $selectItem.find(".floor").attr("code");
			var pFlooNm = $selectItem.find(".floor").text();
			var pMiClsCode = $selectItem.find(".miCls").attr("code");
			var pMiClsNm = $selectItem.find(".miCls").text();
			var pDeClsCode = $selectItem.find(".deCls").attr("code");
			var pDeClsNm = $selectItem.find(".deCls").text();
			var pDivisionNum = $selectItem.find(".divSeNum").text();
			var pPositionInfo = $selectItem.find(".posiinfo").text();
			var pCheckYN = $selectItem.find(".inspDiv").is(":checked") ? "Y" : "N";
			var pDivsCode = $selectItem.find(".divs").attr("code");
			var callbackMethod = "page.getDivList";			
			var path = "division/html/CM016_1.html";			
			
			bizMOB.Ui.openDialog(path,
			{
				message:
				{
					"pCustCode":pCustCode,
					"pLaClsCode":pLaClsCode,
					"pLaClsNm":pLaClsNm,
					"pFlooCode":pFlooCode,
					"pFlooNm":pFlooNm,
					"pMiClsCode":pMiClsCode,
					"pMiClsNm":pMiClsNm,
					"pDeClsCode":pDeClsCode,
					"pDeClsNm":pDeClsNm,
					"pCallBack":callbackMethod,
					"pDivisionNum":pDivisionNum,
					"pPositionInfo":pPositionInfo,
					"pCheckYN":pCheckYN,
					"pPagePath":callbackMethod,
					"pDivsCode":pDivsCode
					
				},
				width:"80%",
				height:"85%",
				base_on_size:"page",
				base_size_orientation:"vertical"
			});
		});
		
		$("#divListnew").delegate(".divDetail", "click", function()
        {
			// 자신의 노드만 펼치기
			$(".divDetail").removeClass("bg02");
			$(this).addClass("bg02");
        });
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
 	     		
 		if (custCode == undefined) return;
 		
 		page.returnCustomerInfo({CustCode : custCode, CustName : custName});
 		
	},
	initLayout:function()
	{
		$("#divList").hide();
		
		// 공용처리
		var layout = ipmutil.getDefaultLayout("구획화등록");
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
	
	CustlistCheck:function()
	{
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01101");
		tr.body.P01 = $("#txtCustText").val();
		tr.body.P02 = page.UserID;
	   
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					return;
				}
				
				if(json.body.List01.length > 1)
				{
						bizMOB.Ui.openDialog("collection/html/CM011.html", 
						{
				           message:  {
				        	   			Custin : $("#txtCustText").val() 
				        	   		,	Pagepath : "page.returnCustomerInfo"
			        	   			 }, //
				           width : "80%",
						    height : "67%",
						});
				}
				else
				{					
				   $("#txtCustText").html(json.body.List01[0].R01);
				   page.custCode = json.body.List01[0].R01;
				   page.custName = json.body.List01[0].R02;					
				   $("#txtCustInfo").text("[" + page.custCode + "] " + page.custName);
				   
				   $("#txtCustText").hideKeypad();
				   page.getDivList();
				}
				
			}
		});
		
	},
	
	deleteDiv:function(divSeNum)
	{
		var trCustDiv = bizMOB.Util.Resource.getTr("Cesco", "CM01503");
		trCustDiv.body.P01 = page.custCode;
		trCustDiv.body.P02 = divSeNum;
		
		bizMOB.Web.post(
		{
			message:trCustDiv,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					bizMOB.Ui.alert("확인", "삭제하였습니다.");
					page.getDivList();
					return;
				}
				
			}
		});
	},
	addCallBack:function(json) // 추가후 콜백
	{
		// 최종 저장되면 리스트를 재조회함
		if (json.result == "Y")
			page.getDivList();
	},
	getDivList:function() // 구획리스트 가져오기
	{
		if (page.custCode.length < 6)
		{
			bizMOB.Ui.alert("경고", "고객을 먼저 검색해 주세요.");
			return;
		}
		
		var trCustDiv = bizMOB.Util.Resource.getTr("Cesco", "CM01501");
		trCustDiv.body.P01 = page.custCode;
		
		bizMOB.Web.post(
		{
			message:trCustDiv,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				page.renderList(json, "DivisionInfo");
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
		 		target:".divDetail",
		 		value:listName,
		 		detail:
	 			[
					{type:"single", target:".divSeNum", value:"R02"}, // 구획번호
					{type:"single", target:".laCls@code+", value:"R03"}, // 대분류코드
					{type:"single", target:".laCls", value:"R04"}, // 대분류명
					{type:"single", target:".floor@code+", value:"R05"}, // 층분류코드
					{type:"single", target:".floor", value:"R06"}, // 층분류명
					{type:"single", target:".miCls@code+", value:"R07"}, // 중분류코드
					{type:"single", target:".miCls", value:"R08"}, // 중분류명
					{type:"single", target:".deCls@code+", value:"R09"}, // 세분류코드
					{type:"single", target:".deCls", value:"R10"}, // 세분류명
					{type:"single", target:".posiinfo", value:"R11"}, // 위치설명
					{type:"single", target:".divs@code+", value:"R12"}, // 상세구획코드
					{type:"single", target:".divs", value:"R13"}, // 상세구획명
					{type:"single", target:".inspDiv@checked", value:function(arg){
						if (arg.item.R14 == "Y") return true;
						else return false;
					}} // 상세구획명
					
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"divListnew", replace:true };
		// 그리기
		$("#divList").bMRender(json.body, dir , options);
	},
	searchCustomer:function(searchText) // 고객검색
	{
		bizMOB.Ui.openDialog("collection/html/CM011.html", 
		{
			message:
			{
				Custin:searchText,
				Pagepath:"page.returnCustomerInfo"
			},
			width:"80%",
			height:"80%",
			base_on_size:"page",
			base_size_orientation:"vertical"
		});
	},
	returnCustomerInfo:function(json)
	{
		// 데이터가 없다면 실행하지 않음
		if (json == undefined || json.CustCode.length < 6)
		{
			page.getDivList();
			return;
		}
		
		page.custCode = json.CustCode;
		page.custName = json.CustName;
		
		$("#txtCustInfo").text("[" + page.custCode + "] " + page.custName);
		page.getDivList();
	}	
};