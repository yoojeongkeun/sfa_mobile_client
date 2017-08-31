page = 
{	 
	prePath: "",
	unitType: "",
	custCode: "",
	originType: "",
	
    init:function(json)
	{
    	page.prePath = json.prePath;
    	page.unitType = json.unitType;
    	page.custCode = json.custCode;
    	page.originType = json.originType;
    	
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		if(page.unitType == "2"){
			$("#sCustType").val("멤버스가");
			$("#thProceType").text("멤버스가");
		}else if(page.unitType == "9"){
			$("#sCustType").val("법인단가");
			$("#thProceType").text("법인단가");
		}else{
			$("#sCustType").val("정상가");
			$("#thProceType").text("단가");
		}
		
		$("#btnSearchItem").click(function(){
			page.getItemList();
		});
		
		$(".btn_close").click(function(){
			bizMOB.Ui.closeDialog({		
				
			});
		});
		
		$(".btn_02").click(function(){
			var html = "";
			$.each($(".tbItem"), function(i, colElement){
				if($(colElement).find(".itemChkBox").is(":checked"))
				{
					html += $(colElement)[0].outerHTML;
				}
			});
			
			bizMOB.Ui.closeDialog({				 
				callback: page.prePath,
				message: {
					html : html
				}
			});
		});
		
		$("#btnSearchItem").click(function(){
			page.getItemList();
		});
		
		$(".btn_close01").click(function(){
			bizMOB.Ui.closeDialog();
		});
	},	 
	initData:function(json)
	{
		page.getItemList();
	},
	initLayout:function()
	{		
		
	},
	
	getItemList:function()
	{	
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01701");
		tr.body.P01 = $("#sItemCode").val();
		tr.body.P02 = $("#sItemNm").val();
		tr.body.P03 = "";
		tr.body.P04 = page.originType;//"AE30";
		tr.body.P05 = page.unitType;
		tr.body.P06 = page.custCode;
		
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
		var listLength = json.body.LIST.length;
		for(var i = 0; i < listLength; i++){
			if(json.body.LIST[i].SALEITEMCODE == "S0244" || json.body.LIST[i].SALEITEMCODE == "S0245"
				|| json.body.LIST[i].SALEITEMCODE == "S0246"){
				json.body.LIST.splice(i, 1);
				i--;
				listLength--;
			}
		}
		
		
		var num = 0;
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".tbItem",
		 		value:"LIST",
		 		detail:
	 			[
	 			 	{type:"single", target:".itemSeq", value:function(){
	 			 		return ++num;
	 			 	}},
	 			 	{type:"single", target:".itemCode", value:"SALEITEMCODE"},
	 			 	{type:"single", target:".itemNm", value:"SALEITEMNAME"},
	 			 	{type:"single", target:".itemNm", value:"SALEITEMNAME"},
	 			 	{type:"single", target:".itemAmt", value:"STDPRICE"},
	 			 	{type:"single", target:".itemTax", value:"TAX"},
	 			 	{type:"single", target:".itemTax@rate", value:function(args){
	 			 		return 0;
	 			 	}},
	 			 	{type:"single", target:".itemTotNm", value:"SALEITEMFULLNAME"},
	 			 	{type:"single", target:".itemDeNm", value:"SALEITEMSHRTNAME"},
	 			 	{type:"single", target:".itemContNm", value:"CONTTARGNAME"},
	 			 	{type:"single", target:".itemContNm@code", value:"CONTTARGCODE"},
	 			 	{type:"single", target:".itemContIven", value:"CPMSITEMNAME"},
	 			 	
	 			 	{type:"single", target:"@minimum_qty+", value:"MINIMUM_QTY"},
	 			 	{type:"single", target:"@discount_price+", value:"DISCOUNT_PRICE"},
	 			 	{type:"single", target:"@discount_tax+", value:"DISCOUNT_TAX"}
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"itemListNew", replace:true };
		// 그리기
		$("#itemList").bMRender(json.body, dir, options);
	},
};


