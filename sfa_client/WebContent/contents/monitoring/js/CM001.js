page  =
{
	init:function(json)
	{	
		// 기본 설정값
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initData:function(json)
	{
		
	},
	initInterface:function()
	{		
		$("#_btnclose").click(function(){
			ImgUtil.shoot("ipm", "test", function(data){
				bizMOB.Ui.alert("data : " + data);
			});
		});
		
		$("#_btnclose1").click(function(){
			ImgUtil.imageView(1000000013);
		});
	},
	initLayout:function()
	{
		
	}
};