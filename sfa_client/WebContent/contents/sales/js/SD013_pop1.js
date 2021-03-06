page = 
{	 
	list: "",
	type: "",
	pageType: "",
    init:function(json)
	{
    	page.pageType = json.pageType;
    	page.type = json.type;
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
				callback: page.pageType == "1" ? "page.callbackSetCustList" : "tab02.callbackSetCustList",
				message: {
					custCode: $(".on").find(".spanCustCode").text()					
				}
								
			});
		});
		
		$("#btnCancel").click(function(){
			if(page.type != undefined){
				bizMOB.Ui.closeDialog({
					callback: page.pageType == "1" ? "page.callbackNotSelected" : "tab02.callbackNotSelected"
				});
			}else{
				bizMOB.Ui.closeDialog();
			}
		});	
	},	 
	initData:function(json)
	{
		page.list = json.list;
		page.renderCustomer(page.list);
	},	 
	initLayout:function()
	{		
		
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
                    {type:"single", target:".spanCustCode", value:"R01"},
                    {type:"single", target:".spanCustName", value:"R02"}
                ]
            }
        ];
        var options = { clone:true, newId: "tbodyListNew", replace:true };
        $("#tbodyList").bMRender(json.body, dir, options);
	}
};


