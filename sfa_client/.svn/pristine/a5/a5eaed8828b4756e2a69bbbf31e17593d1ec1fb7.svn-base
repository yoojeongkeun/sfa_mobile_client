
page  =
{
		
	CustCode:"",	
	init : function(json)
	{
		
		page.CustCode  = json.CustCode;
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

		var nowDate  = new Date();
		 $("#SaleYY1").val(nowDate.bMToFormatDate("yyyy")); // 매출년월
		 $("#SaleMM1").val(nowDate.bMToFormatDate("mm"));     // 매출월
		
		$("#btnInput").click(function(){
			$("#Amt").attr("readonly", "");
			setTimeout(function(){
				bizMOB.Ui.closeDialog(
	    		{
	        		modal : false,
	        		callback: "page.SetCardContractAdd",
	        		message : 
					{
	    				ContractCode : $("#contractObject option:selected").val(),  //계약대상코드
	    				ContractName : $("#contractObject option:selected").text(),  //계약대상명
	    				WorkName : $("#workType option:selected").text(),  //작업구분명
	    				WorkGubun : $("#workType option:selected").val(),  //작업구분코드
	    				ContractEnd : $("#stipulationContract option:selected").val(),  //약정계약구분
	    				ContractEndName : $("#stipulationContract option:selected").text(),  //약정계약구분명
	    			    SaleYYMM  : $("#SaleYY1").val() + $("#SaleMM1").val(),  //매출년월
	    				Amt : $("#Amt").val()  //금액
					}        			
		        });	
			}, 500);			  
		});
		
		$("#btnClose").click(function(){
			$("#Amt").attr("readonly", "");
			setTimeout(function(){
				bizMOB.Ui.closeDialog();
			}, 500);
		});
	},
	initData:function()
	{
		// 콤보박스 세팅
		page.setComboboxes("A001", "contractObject");
		page.setComboboxes("A004", "stipulationContract");
		//page.setComboboxes("A005", "workType");		
		//page.setYearMonthCombobox();
		page.setDate();
	},
	initLayout:function()
	{
		
	},
	setComboboxes: function(gubun, selectID){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00001");
		var type  = "";
		if (page.CustCode.length > 6)
		{
			
			type = "4";
		}
		else
		{
			type = "1";
		}
		tr.body.Gubun = gubun;
		tr.body.Type = type; // 고객타입으로 변경해야 합니다. 
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
	setYearMonthCombobox: function(){ // 달력 콤보박스. 현재 사용하지 않음.
		var nowYear = (new Date()).getFullYear();
		var nowMonth = (new Date()).getMonth();
		for(var i = 0; i < 20; i++){
			if((i + 2010) == nowYear)
				$("#year").append("<option value=\"" + (i + 2010) + "\" selected>" + (i + 2010) +"</option>");
			else
				$("#year").append("<option value=\"" + (i + 2010) + "\">" + (i + 2010) +"</option>");
		}
		
		for(var i = 0; i < 12; i++){
			month = (((i + 1) + "").length == 1 ? "0" + (i + 1) : (i + 1));
			if(i == nowMonth)
				$("#month").append("<option value=\"" + month + "\" selected>" + month +"</option>");
			else
				$("#month").append("<option value=\"" + month + "\">" + month +"</option>");
					
		}
	},
	setDate: function(){
		$(".year").val((new Date()).getFullYear());
		$(".month").val((new Date()).getMonth() + 1);
	},
	setSelect: function(json, selectID){
		var cnt = json.body.list01.length;
		var list = json.body.list01;
		for(var i = 0; i < cnt; i++){
			$("#" + selectID).append("<option value=\"" + list[i].Code + "\">" + list[i].CodeName +"</option>");
		}		
	}
};