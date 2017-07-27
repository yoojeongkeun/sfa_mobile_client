page  =
{
	init : function(json)
	{	
		ipmutil.resetChk();
		// 기본 설정값
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{		
		$("#txtBarcode").toSel();
		$("#btnClose").click(function(){
			onClickAndroidBackButton();
			//bizMOB.Ui.closeDialog();			
		});
		
		$("#btnInput").click(function(){
			if($("#txtBarcode").val() == ""){
				bizMOB.Ui.alert("입력", "바코드를 입력해주세요.");
				return;
			}
			$("#txtBarcode").attr("readonly", "");
			setTimeout(function(){
				bizMOB.Ui.closeDialog({ callback: "page.barcodeMove", message: $("#txtBarcode").val() });  
			}, 500);			
		});
	},
	initData:function(json)
	{
		
	},
	initLayout:function()
	{ 
		bizMOB.Ui.displayView();
	}	
};