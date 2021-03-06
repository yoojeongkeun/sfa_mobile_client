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
    	
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		$("#custCode").val(page.custCode);
		$("#custNm").val(page.custNm);
		
		$(".btn_search").click(function(){
			page.getCustInfo("2");
		});
		
		$("#choiceAcct").click(function(){
			bizMOB.Ui.closeDialog({				 
				callback: page.prePath,
				message: {
					accountNo: $(".on").find(".accountNo").text(),
					key: $(".on").find(".accountNo").attr("key")
				}
			});
		});
		
		$("#addAcct").click(function(){
			if($("#custCode").val == "")
			{
				bizMOB.Ui.alert("안내", "고객을 조회하여 주십시오.");
				return;
			}
			
			bizMOB.Ui.openDialog("order/html/SD016_pop2.html",
			{ 
			   	width:"95%",
				height:"50%",
				message: {
					custCode: $("#custCode").val(),
					custNm: $("#custNm").val(),
					prePath: "page.callbackAddAccount"
				}
			});
		});
		
		$(".btn_close01").click(function(){
			bizMOB.Ui.closeDialog();
		});
		
		$("#virtualNew").delegate(".tbAccount", "click", function(){
			if($(this).hasClass("on"))
				$("tbody").removeClass("on");
			else
			{
				$("tbody").removeClass("on");
				$(this).addClass("on");
			}
		});
	},	 
	initData:function(json)
	{
		page.getVirtualAccList();
	},	 
	initLayout:function()
	{		
		
	},
	
	getCustInfo: function(type){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01404");
		tr.body.P01 = $("#custNm").val();
		tr.body.P04 = type;
		tr.body.P05 = $("#custCode").val();
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "리스트를 불러오는데 실패하였습니다.");
					return;
				}
				
				if(json.body.LIST.length == 0){
				// 고객 조회가 없을 경우
					bizMOB.Ui.alert("안내", "검색에 해당하는 고객이 없습니다.");
					return;
				}else if(json.body.LIST.length > 1){
				// 고객 조회가 2 이상일 경우 팝업으로 고객 선택
					var paramJson = {body: "", header: ""}; paramJson.body = {LIST: [{}]}; paramJson.body.LIST = [];
					for(var i=0; i<json.body.LIST.length; i++){
						paramJson.body.LIST[i] = {R01:"", R02:"", R03:"", R04:""};
						paramJson.body.LIST[i].R01 = json.body.LIST[i].R01;
						paramJson.body.LIST[i].R02 = json.body.LIST[i].R02;
						paramJson.body.LIST[i].R03 = json.body.LIST[i].R03;
						paramJson.body.LIST[i].R04 = json.body.LIST[i].R04;
					}
					bizMOB.Ui.openDialog("order/html/SD015_pop.html",
					{ 
						message : 
					   	{
							list: paramJson,
							prePath : "page.callbackSetCustList",
							preCancelPath : "page.callbackNotSelected",
					   	},
					   	width:"95%",
						height:"85%"
					});
				}else{
					page.callbackSetCustList(json.body.LIST[0]);
				}
			}
		});
	},
	
	callbackSetCustList: function(message){
		$("#custCode").val(message.R02);
		$("#custNm").val(message.R03);
		
		page.getVirtualAccList();
	},
	
	callbackAddAccount: function(message){
		$("#custCode").val(message.custCode);
		$("#custNm").val(message.custNm);
		
		page.getVirtualAccList();
	},
	
	getVirtualAccList:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01602");
		tr.body.P01 = $("#custCode").val();
		tr.body.P02 = "-1";
		tr.body.P03 = "";
		
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
				
				page.renderList(json);
			}
		});		
	},
	
	renderList:function(json)
	{
		// 항목 리스트를 셋팅하기
		var num = 0;
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".tbAccount",
		 		value:"LIST",
		 		detail:
	 			[
	 			 	{type:"single", target:".seq", value:function(){
	 			 		return ++num;
	 			 	}},
	 			 	{type:"single", target:".custCode", value:"R01"},
	 			 	{type:"single", target:".custNm", value:"R02"},
	 			 	{type:"single", target:".type", value:"R03"},
	 			 	{type:"single", target:".bank", value:"R04"},
	 			 	{type:"single", target:".accountNo", value:"R05"},
	 			 	{type:"single", target:".accountNo@key", value:"R07"},
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"virtualNew", replace:true };
		// 그리기
		$("#virtual").bMRender(json.body, dir, options);
	},
};


