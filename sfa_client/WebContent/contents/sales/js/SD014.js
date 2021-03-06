page = 
{	
	YYYY: "",
	MM: "",
	UserId: "",
	json: "",
    init:function(json)
	{
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		$("#selHQ").change(function(){
			 page.getComboBoxList("#selBR", "B01", $(this).val());
		 });
		 
		 $("#selBR").change(function(){
			 page.getComboBoxList("#selUserID", "C01", $(this).val());
		 });
		 
		 $(".btn_search01").click(function(){
			 page.getSalesGoalList();
			 
			 page.YYYY = "2011";//$("#selYYYY").val();
			 page.MM = "03";//$("#selMM").val();
			 page.UserId = "00176";//$("#selUserID").val();
				
		 });
		 
		 $("#listNew").delegate(".trMast", "click", function() {
			 var $this = $(this);
			 var $that = $($this.parent().find(".trDetail"));
			 
			 if($that.attr("clickOn") == "off")
			 {
				 $that.find(".textStr").val($this.find(".seq").attr("text"));
				 $that.find(".sumAmtDe").val($this.find(".sumAmt").text());
				 $that.show();
				 $that.attr("clickOn", "on");
				 if($that.attr("setting") == "n")
				 {
					 page.getSalesGoalListDe($this.find(".custCode").text(), $that);
				 }
			 }
			 else
			 {
				 $that.hide();
				 $that.attr("clickOn", "off");
			 }
		 });
		 
		 $("#listNew").delegate("input", "click", function(event) {
			 $(this).select();
		 });
		 
		 $("#listNew").delegate(".deAmt", "change", function(event) {
			 var $this = $(this);
			 var divideList = $this.parent().parent().parent().find(".deAmt");
			 var sumAmt = 0;
				
			 $.each(divideList, function(i, colElement){
				 sumAmt = sumAmt + $(colElement).val().bMToNumber();
			 });
			 
			 $this.parent().parent().parent().parent().parent().find(".sumAmtDe").val(sumAmt.bMToStr().bMToCommaNumber());
		 });
		 
		 $("#listNew").delegate(".deAmt", "keyup", function(event) {
			 var $this = $(this);
			 var divideList = $this.parent().parent().parent().find(".deAmt");
			 var sumAmt = 0;
				
			 $.each(divideList, function(i, colElement){
				 sumAmt = sumAmt + $(colElement).val().bMToNumber();
			 });
			 
			 $this.parent().parent().parent().parent().parent().find(".sumAmtDe").val(sumAmt.bMToStr().bMToCommaNumber());
		 });
		 
		 $("#btnSearch").click(function(){
			 page.getCustInfo();			
		 });
		 
		 $(".btnSave").click(function(){
			 // 체크로직 추가하기
			 page.save();
		 });
	},	 
	
	initData:function(json)
	{
		 
	},	 
	
	initLayout:function()
	{	
		var layout = ipmutil.getDefaultLayout("영업계획 등록");
		bizMOB.Ui.displayView(layout);
		
		// 본부 콤보박스
		page.getComboBoxList("#selHQ", "A01", "");
	},
	
	// 부서관련 콤보박스!
	getComboBoxList: function(selID, type, strValue, strUserID, strDeptCode){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01303");
		tr.body.P01 = type;
		tr.body.P02 = strValue;
		tr.body.P03 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "본부 목록을 불러오는데 실패하였습니다.");
					return;
				}
				page.setComboBox(selID, json.body.LIST01, strUserID, strDeptCode);
			}
		});		
	},
	
	// 부서관련 콤보박스! 
	setComboBox: function(id, list, strUserID, strDeptCode){
		var options = "";
		$.each(list, function(i, listElement){
			options += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
		});
		$(id).html(options);
		if(strUserID != undefined)
			$(id).val(strUserID);
		if(strDeptCode != undefined){
			$(id).val(strDeptCode);
			page.getComboBoxList("#t02_selUserID", "C01", strDeptCode, bizMOB.Storage.get("UserID"));
		}
	},
	
	getSalesGoalList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01401");
		tr.body.P01 = "2011";//$("#selYYYY").val();
		tr.body.P02 = "03";//$("#selMM").val();
		tr.body.P03 = "00176";//$("#selUserID").val();
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", json.header.error_text);
					return;
				}
				$("#yyyyGoalAmt").val(json.body.LIST01[0].R03.bMToStr().bMToCommaNumber());
				$("#mmGoalAmt").val(json.body.LIST01[0].R04.bMToStr().bMToCommaNumber());
				
				$("#totalAmt").val(json.body.LIST02[0].R01.bMToStr().bMToCommaNumber());
				
				$("#totalAmt").val(json.body.LIST02[0].R01.bMToStr().bMToCommaNumber());
				
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
		 		target:"#custbody",
		 		value:"LIST03",
		 		detail:
	 			[
	 			 	{type:"single", target:".seq", value:function(){
	 			 		return ++num;
	 			 	}},
	 			 	{type:"single", target:".custCode", value:"R01"},
	 			 	{type:"single", target:".custNm", value:"R02"},
	 			 	{type:"single", target:".custType", value:"R03"},
	 			 	{type:"single", target:".sumAmt", value:function(arg)
	 			 		{  
                    	   	return arg.item.R05.bMToStr().bMToCommaNumber();
					    }
	 			 	},
	 			 	{type:"single", target:".seq@text", value:function(arg)
	 			 		{  
                    	   	return arg.item.R04;
					    }
	 			 	},
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"listNew", replace:true };
		// 그리기
		$("#list").bMRender(json.body, dir, options);
	},
	
	getSalesGoalListDe: function(custCode, $that){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01402");
		tr.body.P01 = page.YYYY;
		tr.body.P02 = page.MM;
		tr.body.P03 = page.UserId;
		tr.body.P04 = custCode;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", json.header.error_text);
					return;
				}
				page.renderListDe(json, $that);
			}
		});		
	},
	
	renderListDe:function(json, $that)
	{
		// 항목 리스트를 셋팅하기
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".detailbody",
		 		value:"LIST",
		 		detail:
	 			[
	 			 	{type:"single", target:"@r01+", value:"R01"},
	 			 	{type:"single", target:"@r02+", value:"R02"},
	 			 	{type:"single", target:"@r03+", value:"R03"},
	 			 	{type:"single", target:"@r04+", value:"R04"},
	 			 	{type:"single", target:"@r05+", value:"R05"},
	 			 	{type:"single", target:"@r06+", value:"R06"},
	 			 	{type:"single", target:"@r07+", value:"R07"},
	 			 	{type:"single", target:"@r08+", value:"R08"},
	 			 	{type:"single", target:"@r09+", value:"R09"},
	 			 	{type:"single", target:"@r10+", value:"R10"},
	 			 	{type:"single", target:"@r11+", value:"R11"},
	 			 	{type:"single", target:"@r12+", value:"R12"},
	 			 	{type:"single", target:"@r13+", value:"R13"},
	 			 	{type:"single", target:".servNm", value:"R09"},
	 			 	{type:"single", target:".cnt@value", value:function(arg)
	 			 		{  
                	   		return arg.item.R10.bMToNumber();
	 			 		}
	 			 	},
	 			 	{type:"single", target:".deAmt@value", value:function(arg)
	 			 		{  
                    	   	return arg.item.R11.bMToNumber();
					    }
	 			 	}
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		//var options = { clone:true, newId:"listNew", replace:true };
		// 그리기
		$that.find(".tbDetail").bMRender(json.body, dir);
		
		$that.attr("setting", "y");
	},
	
	getCustInfo: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01302");
		tr.body.P01 = $("#txtCustCode").val();		
		tr.body.P02 = $("#txtCustName").val();
		tr.body.P03 = "";
		tr.body.P04 = "10225";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "유망고객 리스트를 불러오는데 실패하였습니다.");
					return;
				}
				
				if(json.body.LIST01.length == 0){
				// 고객 조회가 없을 경우 새로 발급
					//page.makeCustCode();
				}else if(json.body.LIST01.length > 1){
				// 고객 조회가 2 이상일 경우 팝업으로 고객 선택				
					page.json = json;
					var paramJson = {body: "", header: ""}; paramJson.body = {LIST01: [{}]}; paramJson.body.LIST01 = [];
					for(var i=0; i<json.body.LIST01.length; i++){
						paramJson.body.LIST01[i] = {R01:"", R02:""};
						paramJson.body.LIST01[i].R01 = json.body.LIST01[i].R01;
						paramJson.body.LIST01[i].R02 = json.body.LIST01[i].R02;
					}
					bizMOB.Ui.openDialog("sales/html/SD013_pop1.html", 
					{ 
						message : 
					   	{
							list: paramJson
					   	},
					   	width:"95%",
						height:"85%"
					});
				}else{
					page.setCustData(json.body.LIST01[0]);
				}
			}		
		});
	},
	
	setCustData: function(list){
		
	},
	save: function(){
		//$(".trDetail[setting=y]").find(".detailbody").length
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01406");
		
		var detailList = [];
		
		$(".trDetail[setting=y]").find(".detailbody").each(function(i, le){
			var $le = $(le);
			var strategy = $($(".trDetail[setting=y]").find(".detailbody")[0]).parents(".Tdep01").find(".textStr").val();
		    detailList.push({
		    	P01: strategy,
		    	P02: "",
		    	P03: $le.attr("r01"),
		    	P04: $le.attr("r02"),
		    	P05: $le.attr("r03"),
		    	P06: $le.attr("r04"),
		    	P07: $le.attr("r05"),
		    	P08: $le.attr("r06"),
		    	P09: $le.attr("r07"),
		    	P10: $le.attr("r08"),
		    	P11: "", // 세팅 X
		    	P12: $le.find(".cnt").val(),
		    	P13: $le.find(".deAmt").val(),
		    	P14: "", // 세팅 X
		    	P15: "" // 세션 아이디		    	
		    });			
		});
		
		tr.body.LIST01 = detailList;

		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "세부영업계획 저장에 실패하였습니다.");					
					return;
				}
				bizMOB.Ui.toast("세부영업계획이 저장되었습니다.");
			}
		});
	}
};



