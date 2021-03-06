
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
			$(this).css("background", "#fff3dd");
			
			page.setItemList($(this).parent());
			
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
		var layout = ipmutil.getDefaultLayout("신규 이관");
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
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00901");
		tr.body.P01 = "";
		tr.body.P02 = $("#calFrom").val().replace(/-/g, "");
		tr.body.P03 = $("#calTo").val().replace(/-/g, "");		
		tr.body.P04 = $("#selCustType").val();
		
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
	 			 	{ type:"single", target:"@custcode+", value: "R01" },
	 			    { type:"single", target:".custType", value: function(args){
	 			    	var returnValue = "(해충)";
	 			    	if(args.item.R15 + args.item.R16 + args.item.R17 + args.item.R18 + args.item.R19 == "NNNNN"){
	 			    		if(args.item.R21 == "Y"){
	 			    			returnValue = "(위생)";
	 			    		}
	 			    	}else{
	 			    		if(args.item.R21 == "Y"){
	 			    			returnValue = "(해충,위생)";
	 			    		}
	 			    	}
	 			    	return args.item.R02 + returnValue;
	 			    } },
					{ type:"single", target:".moveDate", value: function(args){
						return args.item.R03.bMToFormatDate();
					} },
					{ type:"single", target:".moveCustName", value: "R04" },
					{ type:"single", target:".receipUserName", value: "R05" },
					{ type:"single", target:".resName", value: "R06" },					
					{ type:"single", target:".typeL", value: "R07" },
					{ type:"single", target:".typeM", value: "R08" },
					{ type:"single", target:".phoneNumber", value: "R09" },
					{ type:"single", target:".cellphoneNumber", value: "R10" },
					{ type:"single", target:".area", value: "R11" },
					{ type:"single", target:".address", value: "R12" },
					{ type:"single", target:".visitDate", value: function(args){
						return args.item.R13.bMToFormatDate();
					} },
					{ type:"single", target:".interName", value: "R14" },
					{ type:"single", target:".problemPest", value: function(args){
						var str = "";
						str += args.item.R15 == "Y" ? "일반방제, " : "";
						str += args.item.R16 == "Y" ? "FIC, " : "";
						str += args.item.R17 == "Y" ? "VBC, " : "";
						str += args.item.R18 == "Y" ? "빈대, " : "";
						str += args.item.R19 == "Y" ? "화랑곡나방, " : "";
						str += args.item.R21 == "Y" ? "위생용품, " : "";
						return str.substr(0, str.length - 2);
					} },
					{ type:"single", target:".contents", value: "R20" },
					{ type:"single", target:".interest", value: function(args){
						var returnValue = "관심없음";
						switch(args.item.R22){
							case "0": returnValue = ""; break;
							case "1": returnValue = "하"; break;
							case "2": returnValue = "중"; break;
							case "3": returnValue = "상"; break;
						}
						return returnValue;
					} }
					
 		        ]
		 	}
		];
		var options = { clone:true, newId:"contlistNew", replace:true };
		$("#contlist").bMRender(json.body, dir, options);		
	},	
	setTime: function(time, id){    	
    	$("." + id + ":visible").val(time);	
    },
    setItemList: function($that){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00902");
    	tr.body.P01 = $that.attr("custcode");
    	tr.body.P02 = $that.find(".moveDate").text().replace(/-/g, "");
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("위생용품 항목 정보를 가져오는데 실패하였습니다.");
    				return;
    			}
    			if(json.body.LIST01.length == 0){
    				return;
    			}
    			page.renderItemList(json, $that);
    		}
    	});
    },
    renderItemList: function(json, $that){
    	var dir = 
		[
		 	{
		 		type:"loop", target:".trList2", value:"LIST01",
		 		detail:
	 			[
	 			 	{ type:"single", target:".spanDiv", value: "DIV2" },
	 			 	{ type:"single", target:".spanItem", value: "ChkNm2" }
 		        ]
		 	}
		];
		var options = { clone:true, newId:$that.find(".tbodyList2New"), replace:true, isClass:true };
		$that.find(".tbodyList2").bMRender(json.body, dir, options);
    }
};