page = 
{	 
	custCode: "",
	custNm: "",
	prePath: "",
    init:function(json)
	{
    	page.custCode = json.custCode;
    	page.custNm = json.custNm;
    	page.prePath = json.prePath;
    	
    	$("#custCode").val(page.custCode);
    	$("#custNm").val(page.custNm);
    	
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		$(".btn_close01").click(function(){
			bizMOB.Ui.closeDialog({
				callback: page.prePath,
				message: {
					custCode: page.custCode,
					custNm: page.custNm
				}
			});
		});
		
		$("#addAcct").click(function(){
			page.setVirtualAcct();
		});
	},	 
	initData:function(json)
	{
		page.getComboBoxList("", "#selDept", "L1", "N");
		page.getVirtualList();
	},	 
	initLayout:function()
	{		
		
	},
	
	// 콤보박스 조회
	getComboBoxList: function(preID, selID, type, changeYN){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01403");
		tr.body.P01 = changeYN == "Y" ? $(preID).val() : "";
		tr.body.P05 = type;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "목록을 불러오는데 실패하였습니다.");
					return;
				}
				page.setComboBox(preID, selID, json.body.LIST, type, changeYN);
			}
		});
	},
	
	// 콤보박스 세팅
	setComboBox: function(preID, selID, list, type, changeYN){
		var options = "";
		$.each(list, function(i, listElement){
			options += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
		});
		$(selID).html(options);
		if(type == "L1"){
			$(selID).val(bizMOB.Storage.get("deptCode"));
			page.getComboBoxList("", ".selUser", "L2", "N");
		}
		else if(type == "L2" || changeYN == "N")
			$(selID).val(bizMOB.Storage.get("UserID"));
	},
	
	getVirtualList: function(selID){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01603");
		tr.body.P01 = "";
		tr.body.P02 = "";
		tr.body.P03 = "";
		tr.body.P04 = $("#custCode").val();
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "목록을 불러오는데 실패하였습니다.");
					return;
				}
				
				var options = "";
				$.each(json.body.LIST01, function(i, listElement){
					options += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
				});
				$("#selBank").html(options);
				
				options = "";
				$.each(json.body.LIST02, function(i, listElement){
					options += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
				});
				$("#selMain").html(options);
			}
		});
	},
	
	setVirtualAcct: function(){
		//교육용앱 로직 막기
		/*if(true)
		{
			bizMOB.Ui.alert("안내", "교육용 앱에서는 진행할 수 없습니다.");
			return;
		}*/
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01604");
		tr.body.P01 = $("#selBank").val();
		tr.body.P02 = page.custCode;
		tr.body.P03 = $("#selMain").val();
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "목록을 불러오는데 실패하였습니다.");
					return;
				}
				else
					bizMOB.Ui.alert("안내", "가상계좌가 정상발번되었습니다.");
			}
		});
	},
};


