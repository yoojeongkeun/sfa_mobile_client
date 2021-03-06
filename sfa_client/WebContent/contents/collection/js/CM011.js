page  =
{
	custCode : "",
	custName : "",
	Custin:"",
	Pagepath:"",
	pList :"",
	init : function(json)
	{	
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
            $("#btnConfirm").attr("custcode", selectCustCode);
            $("#btnConfirm").attr("custname", selectCustName); 
            $("#fieldInfo").find("tr").attr("class", "fieldInfo");
			$(this).attr("class", "bg02");
        });
		
		$("#btnSearch").click(function()
        {
			var searchContent = $("#getCustList").val();
			
			if (searchContent == ""){
				
				bizMOB.Ui.alert("알림","고객을 입력해주세요.");
				return;				
			}			
			page.searchCustList(searchContent);
        });
		
		$("#getCustList").keyup(function(e)
		{
			// Enter Key 입력시 고객검색 
			if(e.which != "13")
				return;
			
			var searchContent = $("#getCustList").val();
			
			if (searchContent == ""){
				
				bizMOB.Ui.alert("알림","고객을 입력해주세요.");
				return;
				
			}
			
			page.searchCustList(searchContent);
		});
		
		$("#btnCancel").click(function()
	    {
			setTimeout(function(){
				bizMOB.Ui.closeDialog();
			}, 500);
	        
        });
				
		$("#btnConfirm").click(function()
	    {
			setTimeout(function(){
				bizMOB.Ui.closeDialog(
	    		{
	        		modal : false,
	        		callback: page.Pagepath,
	        		message : 
					{
	    				CustCode : $("#btnConfirm").attr("custcode"),
	    				CustName : $("#btnConfirm").attr("custname")
					}        			
		        });
			}, 500);	        
        });			
	},
	initData:function(json)
	{
		//page.custCode = "BE4814";	
       if (page.Custin !=  "" && page.Custin != undefined )
		page.searchCustList(page.Custin);
		
	},
	initLayout:function()
	{
        
	},
	
	searchCustList:function(searchContent)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01101");
		tr.body.P01 = searchContent;
		tr.body.P02 = "";
				
		
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
				
				page.renderList(json, "List01");
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
					{type:"single", target:"#custCode", value:"R01"},
					{type:"single", target:"#custName", value:"R02"},
					{type:"single", target:"#contType", value:"R03"}
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"tlist02new", replace:true };
		// 그리기
		$("#tlist02").bMRender(json.body, dir, options);
	}
	
};