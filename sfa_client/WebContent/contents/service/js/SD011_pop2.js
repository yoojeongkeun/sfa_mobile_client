page = 
{	 
	list: "",
	type: "",
	custCode: "",
	custName: "",	
    init:function(json)
	{
    	page.custCode = json.custCode;
    	page.custName = json.custName;
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		$("#tbodyListNew").delegate("tr", "click", function(){
			$("tr").removeClass("on");
			$(this).addClass("on");
		});
		
		$("#btnSelect").click(function(){
			if($(".on").length == 0){
				bizMOB.Ui.toast("고객을 선택 후 진행해주세요.");
				return;
			}
			bizMOB.Ui.closeDialog({				 
				callback: "page.callbackSetCustList",
				message: {
					custIndex: $(".trList.on").index()				
				}
								
			});
		});
		
		$("#btnCancel").click(function(){
			if(page.type != undefined){
				bizMOB.Ui.closeDialog({
					callback: "page.callbackNotSelected"
				});
			}else{
				bizMOB.Ui.closeDialog();
			}
		});	
	},	 
	initData:function(json)
	{
		page.getCustList();
		
	},	 
	initLayout:function()
	{		
		
	},
	getCustList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01318");
		tr.body.P01 = "";
		tr.body.P02 = page.custCode;
		tr.body.P03 = page.custName;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "고객 목록을 불러오는데 실패하였습니다.");
					return;
				}
				
				page.renderCustomer(json);
			}
		});
	},
	renderCustomer: function(json){
		var dir = 
        [
            {
                type:"loop",
                target:".trList",
                value:"LIST01",
                detail:
                [                    
                    {type:"single", target:".spanCustCode", value:"CustCode"},
                    {type:"single", target:".spanCustName", value:"CustName"}
                ]
            }
        ];
        var options = { clone:true, newId: "tbodyListNew", replace:true };
        $("#tbodyList").bMRender(json.body, dir, options);
	}
};


