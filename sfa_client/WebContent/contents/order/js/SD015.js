page = 
{
	orderjson : "",
    init:function(json)
	{
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		page.setDateTime("#calFromtDay", "#btnFromCal");	
		page.setDateTime("#calToDay", "#btnToCal");
		
		var nowDate  = new Date();
		$("#calToDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
		$("#calFromtDay").val(nowDate.bMAddMonth(-1).bMToFormatDate("yyyy-mm-dd"));
		
		page.getComboBoxList("", ".selDept", "L1", "N");
		
		$("#btnOpen").click(function(){
   		 	$(".searchDiv").toggle();
   		 	
   		 	if($("#btnOpen").hasClass("btn_close"))
   		 	{
   		 		$("#btnOpen").removeClass("btn_close");
   		 		$("#btnOpen").toggleClass("btn_open");
   		 		$("#belowArea").css("top", "0px");
		 	}
				
			else
			{
				$("#btnOpen").removeClass("btn_open");
				$("#btnOpen").toggleClass("btn_close");
				$("#belowArea").css("top", "220px");
			}
   	 	});
		
		$("#saleDept").change(function(){
			page.getComboBoxList($("#saleDept"), "#saleUser", "L2", "Y");
		});
		
		$("#contDept").change(function(){
			page.getComboBoxList($("#contDept"), "#contUser", "L2", "Y");
		});
		
		$("#btnClear").click(function(){
			var nowDate  = new Date();
			$("#calToDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
			$("#calFromtDay").val(nowDate.bMAddMonth(-1).bMToFormatDate("yyyy-mm-dd"));
			
			$("#orderNo").val("");
			
			$("#custCode").val("");
			$("#custNm").val("");
			$("#custInfo").val("");
			
			page.getComboBoxList("", ".selDept", "L1", "N");
		});
		
		/*$("#btnSearch").click(function(){
			page.getCustInfo("1");
		});*/
		
		$("#regOrder").click(function(){
			if(!($("tbody").hasClass("on")))
			{
				bizMOB.Web.open("order/html/SD018.html", {
    				modal : false,
    				replace : false,
    				message : {
    					orderNo : "",
    					custCode : "",
    					orderjson : "",
    					unitType : ""
    				}
    			});
				
				//선택 확인창 삭제 20170829 박태환
				/*var button1 = 
	            	bizMOB.Ui.createTextButton("예", function()
			        {
	            		bizMOB.Web.open("order/html/SD018.html", {
	        				modal : false,
	        				replace : false,
	        				message : {
	        					orderNo : "",
	        					custCode : "",
	        					orderjson : "",
	        					unitType : ""
	        				}
	        			});
			        });
	            var button2 = 
	            	bizMOB.Ui.createTextButton("아니오", function()
			        {
			           return;
			        });
	            bizMOB.Ui.confirm("알림", "신규 주문서를 등록하시겠습니까?", button1, button2);*/
			}
			else
			{
				var divideList = page.orderjson.body.LIST;
				var jsonBody = "";
				
				$.each(divideList, function(i, colElement){
					if($(".on").find(".orderNo").text() == colElement.ORDRNO)
					{
						jsonBody = colElement;
						return;
					}
						
				});
				
				bizMOB.Web.open("order/html/SD018.html", {
					modal : false,
					replace : false,
					message : {
						orderNo : $(".on").find(".orderNo").text(),
						custCode : $(".on").find(".custCode").text(),
						orderjson : jsonBody,
						unitType : $(".on").find(".unitType").attr("code"),
					}
				});
			}
		});
		
		$("#btnSelect").click(function(){
			page.getOrderList();
		});
		
		$("#orderListNew").delegate("tr", "click", function(){
			if($(this).parent().hasClass("on"))
			{
				$("tbody").removeClass("on");
				$("#regOrder").text("주문서 등록");
			}
			else
			{
				$("tbody").removeClass("on");
				$(this).parent().addClass("on");
				$("#regOrder").text("주문서 수정");
			}
		});
	},	 
	
	initData:function(json)
	{
		 
	},	 
	
	initLayout:function()
	{	
		var layout = ipmutil.getDefaultLayout("주문서 조회");
		bizMOB.Ui.displayView(layout);
	},
	
	//일자 세팅
	setDateTime: function(txtName, btnName){
		$(btnName).click(function(){
			$(txtName).focus();
		});
		var option = cescommutil.datePickerOption(function(date){		 				 
			}, "yy-mm-dd"
		);
		$(txtName).datepicker(option);
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
					page.json = json;
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
							list: paramJson
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
		$("#custInfo").val(message.R04);
	},
	
	callbackNotSelected: function(){
		$("#custCode").val("");
		$("#custNm").val("");
		$("#custInfo").val("");
	},
	
	getOrderList:function()
	{	
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01405");
		tr.body.P01 = $("#saleDept").val();
		tr.body.P02 = $("#saleUser").val();
		tr.body.P03 = "";
		tr.body.P04 = $("#custCode").val();
		tr.body.P05 = $("#custNm").val();
		tr.body.P06 = $("#orderNo").val();
		tr.body.P07 = $("#calFromtDay").val().substring(0,4) + $("#calFromtDay").val().substring(5,7) + $("#calFromtDay").val().substring(8,10);
		tr.body.P08 = $("#calToDay").val().substring(0,4) + $("#calToDay").val().substring(5,7) + $("#calToDay").val().substring(8,10);
		tr.body.P09 = $("#contDept").val();
		tr.body.P10 = $("#contUser").val();
		
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
		 		target:".orderDetail",
		 		value:"LIST",
		 		detail:
	 			[
	 			 	{type:"single", target:".seq", value:function(){
	 			 		return ++num;
	 			 	}},
	 			 	{type:"single", target:".orderNo", value:"ORDRNO"},
	 			 	{type:"single", target:".custCode", value:"CUSTCODE"},
	 			 	{type:"single", target:".custNm", value:"CUSTNAME"},
	 			 	{type:"single", target:".custType", value:"CUSTTYPENM"},
	 			 	{type:"single", target:".rcptYmd", value:"RCPTYMD"},
	 			 	{type:"single", target:".payType", value:"PAIDMTHDNM"},
	 			 	{type:"single", target:".rlesYmd", value:"RLESYMD"},
	 			 	{type:"single", target:".dlvyYmd", value:"DLVYYMD"},
	 			 	{type:"single", target:".notTax", value:function(args){
	 			 		return args.item.NOTAXAMT.bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".tax", value:function(args){
	 			 		return args.item.TAXAMT.bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".amt", value:function(args){
	 			 		return args.item.AMT.bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".rcptUser", value:"RCPTUSERNM"},
	 			 	{type:"single", target:".unitType@code", value:"CUSTTYPE"},
	 			 	{type:"single", target:".unitType", value:function(args){
	 			 		return args.item.CUSTTYPE == "2" ? "멤버스가" : "정상가";
	 			 	}},
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"orderListNew", replace:true };
		// 그리기
		$("#orderList").bMRender(json.body, dir, options);
		
		page.orderjson = json;
	},
};



