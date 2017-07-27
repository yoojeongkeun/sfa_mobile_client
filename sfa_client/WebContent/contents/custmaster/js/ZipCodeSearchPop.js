page = {
	
	init : function(json) {
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initData : function(json) {
	
	},
	initInterface : function() {
		$("#btnSearch").click(function(){
			if($("#txtSearchText").val().trim() == ""){
				bizMOB.Ui.alert("안내", "동 이름을 입력해주세요.");
				return;
			}
			page.search();
		});
		
		$("#txtSearchText").keydown(function(e){
			if(e.keyCode == "13"){
				$("#btnSearch").trigger("click");
			}
		});
		
		$("#tbodyZipInfoNew").delegate(".trZipInfo", "click", function(){
			$(".trZipInfo").removeClass("on");
			$(this).addClass("on");
		});
		
		$(".btnSelect").click(function(){
			if($(".on").length == 0){
				bizMOB.Ui.alert("우편번호 선택 후 진행해주세요.");
				return;
			}else{
				bizMOB.Ui.closeDialog({
					callback: "page.setZipCode",
					message: {
						zipCode: $(".on").find(".txtZipCode").text()
					}
				});
			}
		});
		
		$(".btnCancel").click(function(){
			bizMOB.Ui.closeDialog();
		});
	},
	initLayout : function() {
		bizMOB.Ui.displayView();
	},
	search: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01327");
		tr.body.P01 = $("#txtSearchText").val();
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "우편번호 정보를 불러오는데 실패하였습니다.");
					return;
				}
				page.renderList(json);
			}
		});
	},
	renderList: function(json){	
		var dir = 
        [
            {
                type:"loop",
                target: ".trZipInfo",
                value:"LIST01",
                detail: [
                         	{type:"single", target:".txtZipCode", value:"R01"},
                         	{type:"single", target:".txtAddress", value:"R02"},
                         	{type:"single", target:".txtDeptName", value:"R04"}                     		
                        ]
            }
        ];
        var options = { clone:true, newId: "tbodyZipInfoNew", replace:true };
        $("#tbodyZipInfo").bMRender(json.body, dir, options);
	}
};