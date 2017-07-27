page  =
{
	custCode : "",
	pageType : "",
	init : function(json)
	{
		// 기본 설정값
		ipmutil.appendCommonMenu();
		page.custCode  = json.custCode;
		page.pageType = json.pageType;
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		custInfoMove.init($(".contentsWrap2"), page.custCode, "history", page.pageType);
	},
	initData:function(json)
	{
		cm022001.init($("#custHistory"), function() {
			cm022001.getCustMeetList(page.custCode);
		});
	},
	initLayout:function()
	{
		var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		$("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("고객정보");
 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));
 		
 		bizMOB.Ui.displayView(layout);
	}
};