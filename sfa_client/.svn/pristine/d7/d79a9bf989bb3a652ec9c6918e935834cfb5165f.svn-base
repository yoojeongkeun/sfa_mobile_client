page = 
{	 
	P01: "", // 브랜드명
	P02: "", // 고객명
	
    init:function(json)
	{
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
				callback: "page.callbackGetDetailCustData",
				message: {
					brandName: $(".on").find(".spanBrandName").text(),
					custCode: $(".on").find(".spanCustCode").text(),
					custName: $(".on").find(".spanCustName").text(),
					contractDate: $(".on").attr("contractdate")
				}
								
			});
		});
		
		$("#btnCancel").click(function(){
			if(page.type != undefined){
				bizMOB.Ui.closeDialog({
					
				});
			}else{
				bizMOB.Ui.closeDialog();
			}
		});	
		
		$(".btn_close").click(function(){
			bizMOB.Ui.closeDialog();
		});
	},	 
	initData:function(json)
	{
		page.P01 = json.P01;
		page.P02 = json.P02;
		page.getCustList();
		
	},	 
	initLayout:function()
	{		
		
	},
	getCustList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01901");
		tr.body.P01 = page.P01;
		tr.body.P02 = page.P02;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "고객 목록을 불러오는데 실패하였습니다.");
					return;
				}
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.toast("조회된 고객이 존재하지 않습니다.");
					bizMOB.Ui.closeDialog();
				}else if(json.body.LIST01.length == 1){
					bizMOB.Ui.closeDialog({				 
						callback: "page.callbackGetDetailCustData",
						message: {
							brandName: json.body.LIST01[0].R01,
							custCode: json.body.LIST01[0].R02,
							custName: json.body.LIST01[0].R03,
							contractDate: json.body.LIST01[0].R04
						}										
					});
				}else{
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
                value:"LIST01",
                detail:
                [                    
                    {type:"single", target:".spanBrandName", value:"R01"},
                    {type:"single", target:".spanCustCode", value:"R02"},
                    {type:"single", target:".spanCustName", value:"R03"},
                    {type:"single", target:"@contractdate+", value:"R04"}
                ]
            }
        ];
        var options = { clone:true, newId: "tbodyListNew", replace:true };
        $("#tbodyList").bMRender(json.body, dir, options);
	}
};