page  =
{	
	custCode : "",
	custName : "",
	cabllFunctionName: "",
	Custin:"",
	Pagepath:"",
	pList :"",
	init : function(json)
	{	
		$("#selCustSearchType").val(json.searchType);
		$("#txtCustSearchText").val(json.searchText);
		page.cabllFunctionName = json.callbackFunctionName;
		
		page.Pagepath = json.Pagepath;
		page.Custin  = json.Custin;
		// 기본 설정값
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{	
		$("#tlist02new").delegate(".fieldInfo", "click", function()
        {
            var selectCustCode = $(this).find("#custCode").text();
            var selectCustName = $(this).find("#custName").text();
            //var selectDeptName = $(this).find("#contType").attr("deptName").text();
            var selectCustClCd = $(this).find("#contType").attr("custClCd");
            $("#btnConfirm").attr("custcode", selectCustCode);
            $("#btnConfirm").attr("custname", selectCustName); 
            //$("#btnConfirm").attr("deptname", selectDeptName); 
            $("#btnConfirm").attr("custClCd", selectCustClCd); 
            $("#fieldInfo").find("tr").attr("class", "fieldInfo");
			$(this).attr("class", "bg02");
        });
		
		$("#btnSearch").click(function()
        {
			var searchContent = $("#txtCustSearchText").val();
			
			if (searchContent == ""){
				
				bizMOB.Ui.alert("알림","검색어를 입력해주세요.");
				return;				
			}			
			page.searchCustList();
        });
		
		$("#txtCustSearchText").keyup(function(e)
		{
			// Enter Key 입력시 고객검색 
			if(e.which != "13")
				return;
			
			var searchContent = $("#txtCustSearchText").val();
			
			if (searchContent == ""){
				
				bizMOB.Ui.alert("알림","검색어를 입력해주세요.");
				return;
				
			}
			page.searchCustList();
		});
		
		$("#btnCancel").click(function()
	    {
			setTimeout(function(){
				bizMOB.Ui.closeDialog();
			}, 500);
	        
        });
				
		//확인 버튼 클릭 이벤트
		$("#btnConfirm").click(function()
	    {
			if($("#btnConfirm").attr("custcode").length < 1)
			{
				bizMOB.Ui.alert("알림","고객을 선택하여 주십시오.");
				return;
			}
			
			setTimeout(function(){
				bizMOB.Ui.closeDialog(
	    		{
	        		modal : false,
	        		callback: page.cabllFunctionName,
	        		message : 
					{
	    				CustCode : $("#btnConfirm").attr("custcode"),
	    				CustName : $("#btnConfirm").attr("custname"),
	    				//DeptName : $("#btnConfirm").attr("deptname"),
	    				CustClCd : $("#btnConfirm").attr("custClCd"),
					}        			
		        });
			}, 500);	        
        });			
	},
	initData:function(json)
	{
		page.searchCustList();		
	},
	initLayout:function()
	{
        
	},
	
	searchCustList:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISCS001");
		 
		tr.body.cSRCHTPCD = $("#selCustSearchType").val();
		tr.body.nvcSRCHVALU = $("#txtCustSearchText").val();
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
		        		callback: page.cabllFunctionName,
		        		message : 
						{
		    				CustCode : json.body.LIST01[0].CUSTNO,
		    				CustName : json.body.LIST01[0].CUSTNM,
		    				CustClCd : json.body.LIST01[0].CUSTCLNO
						}        			
			        });
				}
				
				// 조회된 고객이 두 건 이상일 경우
				page.renderList(json, "LIST01");
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
		 		target:".fieldInfo",
		 		value:listName,
		 		detail:
	 			[
					{type:"single", target:"#custCode", value:"CUSTNO"},
					{type:"single", target:"#custName", value:"CUSTNM"},
					{type:"single", target:"#contType", value:"CUSTCLNM"},
					//{type:"single", target:"#contType@deptName", value:"DEPTNM"},
					{type:"single", target:"#contType@custClCd", value:"CUSTCLNO"}
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"tlist02new", replace:true };
		// 그리기
		$("#tlist02").bMRender(json.body, dir, options);
	}
	
};