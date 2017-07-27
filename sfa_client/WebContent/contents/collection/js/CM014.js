
page  =
{
		
	CustCode:"",
	init : function(json)
	{
		page.CustCode = json.CustCode;
		page.initInterface();
		page.initData();
		page.initLayout();
		
	},	
	initInterface:function()
	{		
		
		
		$("#Amt").toNum();
		$("#Amt").click(function(){
			$(this).select();
		});
		
		$("#btnInput").click(function(){
			$("#Amt").attr("readonly", "");
			setTimeout(function(){
				bizMOB.Ui.closeDialog(
			    		{
			        		modal : false,
			        		callback: "page.SetContractAdd",
			        		message : 
							{
			    				ContractCode : $("#contractObject option:selected").val(),  //계약대상코드
			    				ContractName : $("#contractObject option:selected").text(),  //계약대상명
			    				Amt : $("#Amt").val().bMToCommaNumber()  //금액
							}        			
				        });
			}, 500);
			  
			
		});
		
		$("#btnClose").click(function(){
			//$("#Amt").attr("readonly", "");
			setTimeout(function(){
				bizMOB.Ui.closeDialog();
			}, 500);
		});
	},
	initData:function(json)
	{
		
		
		// 콤보박스 세팅
		page.setComboboxes("A001", "contractObject");
	},
	initLayout:function()
	{
		
	},
	setComboboxes: function(gubun, selectID){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00001");
		var GubunType ="";
		if (page.CustCode.length > 6)
		{
			
			GubunType = "4";
		}
		else
		{
			GubunType = "1";
		}
		
		
		tr.body.Gubun = gubun;
		tr.body.Type = GubunType; // 고객타입으로 변경해야 합니다. 
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
				if(json.body.list01.length == 0){
					bizMOB.Ui.alert("안내", "코드값이 존재하지 않습니다.");
					return;
				}
				page.setSelect(json, selectID);
			}
		});
	},
	setSelect: function(json, selectID){
		var cnt = json.body.list01.length;
		var list = json.body.list01;
		for(var i = 0; i < cnt; i++){
			$("#" + selectID).append("<option value=\"" + list[i].Code + "\">" + list[i].CodeName +"</option>");
		}		
	}
};