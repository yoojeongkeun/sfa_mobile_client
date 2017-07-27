
page  =
{
	custCode : "",
	init : function(json)
	{
		// 기본 설정값
		ipmutil.resetChk();
		ipmutil.appendCommonMenu();
		
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		$("#contlistNew").toDel("input");
		$("#contlistNew").toDel("textarea");
		$("#calFrom").val((new Date()).bMAddMonth(-1).bMToFormatDate("yyyy-mm-dd"));
		$("#calTo").val((new Date()).bMToFormatDate());
		$("#btnCalFrom").click(function(){
			$("#calFrom").focus();
		});
		
		$("#btnCalTo").click(function(){
			$("#calTo").focus();
		});
		
		$("#btnSearch").click(function(){
			if($("#calFrom").val() == ""){
				bizMOB.Ui.alert("안내", "접수시작일을 입력해주세요.");
				return;
			}
			
			if($("#calTo").val() == ""){
				bizMOB.Ui.alert("안내", "접수종료일을 입력해주세요.");
				return;
			}
			page.setClientRequestList();
		});
		
		$("#contlistNew").delegate(".trTitle", "click", function(){
			if($(this).parents(".conBody").find(".trList").is(":visible")){
				$(this).parents(".conBody").find(".trList").hide();
				return;
			}
			$(".trList").hide();			
			$(".trTitle").css("background", "#fff");			
			$(this).parents(".conBody").find(".trList").show();
			$(this).css("background", "#dde0ff");
		}).delegate(".btnDetail", "click", function(){
			var openOption = 
			{
				modal   : false,
				replace : false,
				message : { custCode : $(this).parents(".conBody").attr("custcode") },
			};
			bizMOB.Web.open("custmaster/html/CM007.html", openOption);
		}).delegate(".btnContract", "click", function(){
			var openOption = 
			{
				modal   : false,
				replace : false,
				message : { custCode : $(this).parents(".conBody").attr("custcode") },
			};
			bizMOB.Web.open("custmaster/html/CM010.html", openOption);
		}).delegate(".btnVBC", "click", function(){
			var openOption = 
			{
				modal   : false,
				replace : false,
				message : { custCode : $(this).parents(".conBody").attr("custcode") },
			};
			bizMOB.Web.open("custmaster/html/CM009.html", openOption);
		}).delegate(".btnContactHistory", "click", function(){
			var openOption = 
			{
				modal   : false,
				replace : false,
				message : { custCode : $(this).parents(".conBody").attr("custcode") },
			};
			bizMOB.Web.open("custmaster/html/CM075.html", openOption);
		});		
		
	},
	initData:function(json)
	{
		$("#btnSearch").trigger("click");
	},
	initLayout:function()
	{
		var option = cescommutil.datePickerOption(function(date){		 				 
			}, "yy-mm-dd"		 			
		);
		$("#calFrom").datepicker(option);
		$("#calTo").datepicker(option);
		
		var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		$("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("무료 진단 이관");
 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));
 		
 		bizMOB.Ui.displayView(layout);
	},
	setClientRequestList: function(){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01001");
		tr.body.P01 = ""; // 세션사용
		tr.body.P02 = $("#calFrom").val().replace(/-/g, "");
		tr.body.P03 = $("#calTo").val().replace(/-/g, "");		
		tr.body.P04 = $("#selCustType").val();
		tr.body.P05 = $("#selStatus").val();
		tr.body.P06 = ""; //파트코드 일단 생략
		tr.body.P07 = ""; // 세션사용
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{				
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				page.renderClientRequest(json, "LIST01");
				ipmutil.resetChk();
			}		
		});		
	},
	renderClientRequest: function(json, listName){
		var dir = 
		[
		 	{
		 		type:"loop", target:".conBody", value:listName,
		 		detail:
	 			[
	 			 	{ type:"single", target:"@custcode+", value: "R03" },
	 			    { type:"single", target:".custType", value: function(args){
	 			    	return args.item.R06.replace("고객", "");
	 			    } },
					{ type:"single", target:".moveDate", value: function(args){
						return args.item.R01.bMToFormatDate();
					} },
					{ type:"single", target:".moveCustName", value: "R05" },
					{ type:"single", target:".receipUserName", value: "R14" },					
					//{ type:"single", target:".resName", value: "R06" },
					//{ type:"single", target:".interName", value: "R14" },
					{ type:"single", target:".typeL", value: "R08" },
					{ type:"single", target:".typeM", value: "R09" },
					{ type:"single", target:".phoneNumber", value: "R10" },
					{ type:"single", target:".cellphoneNumber", value: "R11" },					
					{ type:"single", target:".address", value: "R17" },
					{ type:"single", target:".distributionPartName", value: "R26" },
					{ type:"single", target:".distributionUserName", value: "R28" },					
					{ type:"single", target:".witnessYN", value: "R19" },
					{ type:"single", target:".witnessTerm", value: "R21" },
					{ type:"single", target:".witnessPest", value: "R42" },
					{ type:"single", target:".contents", value: "R24" }
					
 		        ]
		 	}
		];
		var options = { clone:true, newId:"contlistNew", replace:true };
		$("#contlist").bMRender(json.body, dir, options);
	},
	setClientRequestListDetail: function(that, receiptDate, receiptUserID, receiptNum){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07602");	
		tr.body.P01 = receiptDate;
		tr.body.P02 = receiptUserID;
		tr.body.P03 = receiptNum;		
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{				
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				//page.renderClientRequest(json, "LIST01");
				page.setClientRequestItem(that, json);
				ipmutil.resetChk();
			}		
		});	
	},	
	setTime: function(time, id){    	
    	$("." + id + ":visible").val(time);	
    }
};