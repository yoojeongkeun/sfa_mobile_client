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
		$("#safe1").click(function(){
			bizMOB.Web.open("root/html/Airgenic_SafeData_Cust.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});
		
		$("#safe2").click(function(){
			bizMOB.Web.open("root/html/Airgenic_SafeData_Drug.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});
	},
	initData:function(json)
	{
		
	},
	initLayout:function()
	{        
		var layout = ipmutil.getDefaultLayout("안전성 자료");
		bizMOB.Ui.displayView(layout);		
	}
};