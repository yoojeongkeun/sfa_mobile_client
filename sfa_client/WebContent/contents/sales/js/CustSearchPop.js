page = 
{	 
	custCode: "",
	custName: "",
	houseYN: "",
    init:function(json)
	{
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
				callback: "tab02.callbackGetDetailCustData",
				message: {
					custCode: $(".on").find(".spanCustCode").text(),
					deptCode: $(".on").attr("deptcode"),
					deptName: $(".on").attr("deptname")
				}
								
			});
		});
		
		$("#btnCancel").click(function(){
			if(page.type != undefined){
				bizMOB.Ui.closeDialog({
					callback: "tab02.callbackNotSelected"
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
		page.custCode = json.custCode;
		page.custName = json.custName;
		page.houseYN = json.houseYN;
		page.getCustList();
		
	},	 
	initLayout:function()
	{		
		
	},
	getCustList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01318");
		tr.body.P01 = page.houseYN;
		tr.body.P02 = page.custCode;
		tr.body.P03 = page.custName;
		
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
						callback: "tab02.callbackGetDetailCustData",
						message: {
							custCode: json.body.LIST01[0].CustCode,
							deptCode: json.body.LIST01[0].DeptCode,
							deptName: json.body.LIST01[0].DeptName							
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
                    {type:"single", target:".spanCustCode", value:"CustCode"},
                    {type:"single", target:".spanCustName", value:"CustName"},
                    {type:"single", target:".spanCustAddress", value:"Address1"},
                    {type:"single", target:"@deptcode+", value:"DeptCode"},
                    {type:"single", target:"@deptname+", value:"DeptName"},
                ]
            }
        ];
        var options = { clone:true, newId: "tbodyListNew", replace:true };
        $("#tbodyList").bMRender(json.body, dir, options);
	}
};


