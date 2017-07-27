page = 
{	 
	custCode: "",
	custNm: "",
	type: "",
		
	list: "",
	prePath: "",
	preCancelPath: "",
    init:function(json)
	{
    	page.custCode = json.custCode;
    	page.custNm = json.custNm;
    	page.type = json.type;
    	page.prePath = json.prePath;
    	page.preCancelPath = json.preCancelPath;
    	
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
				callback: page.prePath,
				message: {
						R02: $(".on").find(".spanCustCode").text()
					,	R03: $(".on").find(".spanCustName").text()
					,	R04: $(".on").find(".spanCustType").attr("info")
				}
								
			});
		});
		
		$("#btnCancel").click(function(){
			bizMOB.Ui.closeDialog({
				callback: page.preCancelPath
			});
		});	
	},	 
	initData:function(json)
	{
		page.getCustInfo();
	},	 
	initLayout:function()
	{		
		
	},
	
	getCustInfo: function(type){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01404");
		tr.body.P01 = page.custNm;
		tr.body.P04 = page.type;
		tr.body.P05 = page.custCode;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "리스트를 불러오는데 실패하였습니다.");
					return;
				}
				
				if(json.body.LIST.length == 0)
				{
					// 고객 조회가 없을 경우
					bizMOB.Ui.alert("안내", "검색에 해당하는 고객이 없습니다.");
					return;
				}
				else
				{
					page.renderCustomer(json);
				}
			}
		});
	},
	
	renderCustomer: function(json){
		var dir = 
        [
            {
                type:"loop",
                target:".trList",
                value:"LIST",
                detail:
                [                    
                 	{type:"single", target:".spanCustType", value:"R01"},
                    {type:"single", target:".spanCustCode", value:"R02"},
                    {type:"single", target:".spanCustName", value:"R03"},
                    {type:"single", target:".spanCustType@info", value:"R04"}
                ]
            }
        ];
        var options = { clone:true, newId: "tbodyListNew", replace:true };
        $("#tbodyList").bMRender(json.body, dir, options);
	}
};


