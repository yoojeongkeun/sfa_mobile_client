page  =
{
	Carcode:"",
	Pagepath:"",
	init : function(json)
	{	
		page.Pagepath = json.Pagepath;
		page.Carcode  = json.Carcode;
		// 기본 설정값
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{	
		$("#tlist02new").delegate(".fieldInfo", "click", function()
        {
            var selectCarCode = $(this).find("#carCode").text();
            var selectCarName = $(this).find("#carName").text();
            $("#btnConfirm").attr("carCode", selectCarCode);
            $("#btnConfirm").attr("carName", selectCarName); 
            $("#fieldInfo").find("tr").attr("class", "fieldInfo");
			$(this).attr("class", "bg02");
        });
		
		$("#btnSearch").click(function()
        {
			var searchContent = $("#getCarList").val();
			
			if (searchContent == ""){
				
				bizMOB.Ui.alert("알림","고객을 입력해주세요.");
				return;				
			}			
			page.searchCarList(searchContent);
        });
		
		$("#getCarList").keyup(function(e)
		{
			// Enter Key 입력시 고객검색 
			if(e.which != "13")
				return;
			
			var searchContent = $("#getCarList").val();
			
			if (searchContent == ""){
				
				bizMOB.Ui.alert("알림","차량을 입력해주세요.");
				return;
				
			}
			
			page.searchCarList(searchContent);
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
	    				carCode : $("#btnConfirm").attr("carCode"),
	    				carName : $("#btnConfirm").attr("carName")
					}        			
		        });
			}, 500);	        
        });			
	},
	initData:function(json)
	{
		$("#getCarList").val(page.Carcode);
		//page.carCode = "BE4814";	
       if (page.Carcode !=  "" && page.Carcode != undefined )
		page.searchCarList(page.Carcode);
		
	},
	initLayout:function()
	{
        
	},
	
	searchCarList:function(searchContent)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00401");
		tr.body.P01 = searchContent;
		
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
				
				page.renderList(json, "CARLIST");
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
					{type:"single", target:"#carCode", value:"R01"},
					{type:"single", target:"#carName", value:"R02"},
					{type:"single", target:"#carType", value:"R03"}
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"tlist02new", replace:true };
		// 그리기
		$("#tlist02").bMRender(json.body, dir , options);
	},
};