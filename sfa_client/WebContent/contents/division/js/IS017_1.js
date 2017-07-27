page  =
{
	init : function(json)
	{	
		page.initInterface();
		page.initData(json);
		page.initLayout();
		
	},
	initInterface:function()
	{
		$("#btnConfirm").click(function(){
			bizMOB.Ui.closeDialog(
			{
				modal : false,
        		callback: "page.SetDetail",
        		message : 
				{
        			copyCode : $("#comDivisionType").val()
				}
			});
		 });
		$("#btnCancel").click(function(){
			bizMOB.Ui.closeDialog();
		 });
	},
	initData:function(json)
	{
		
	},
	initLayout:function()
	{
		
	},
};
