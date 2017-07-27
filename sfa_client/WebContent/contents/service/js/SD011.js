page  =
{
	searchDate: "",
	detailSearchDate: "",
	isFirst: true,
	init : function(json)
	{
		// 기본 설정값
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{	
		$("#btnCal").click(function(){
			$("#calendar").slideToggle(200);
		});
		
		$("#btnPrev").click(function(){
			page.searchDate = (new Date(page.searchDate)).bMAddMonth(-1).bMToFormatDate("yyyy-mm-01");
			page.search(page.searchDate);
		});
		
		$("#btnNext").click(function(){
			page.searchDate = (new Date(page.searchDate)).bMAddMonth(1).bMToFormatDate("yyyy-mm-01");
			page.search(page.searchDate);
			
		});
		
		$(".btnRegist").click(function(){
			bizMOB.Ui.openDialog("service/html/SD011_pop.html", 
			{ 
				message : 
			   	{
					fromDate: page.makeDate(),
					toDate: page.makeDate(),
					jsonData: {
						msgId: "",
						msgSendYN: "False",
						msgType: "",
						msgSendTime: ""
					}
			   	},
			   	width:"90%",
				height:"85%"
			});
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
		}).delegate(".btnModify", "click", function(){
			$that = $(this).parents(".conBody");
			bizMOB.Ui.openDialog("service/html/SD011_pop.html", 
			{ 
				message : 
			   	{
					fromDate: $that.find(".startDate").text().substr(0, 10),
					fromTime: $that.find(".startDate").text().substr(11, 5),
					toDate: $that.find(".endDate").text().substr(0, 10),
					toTime: $that.find(".endDate").text().substr(11, 5),
					mode: "M",
					jsonData: {
						salesPlanID: $that.attr("salesplanid"),
						custCode: $that.attr("custCode"),
						custName: $that.attr("custName"),
						title: $that.find(".salesCustName").text(),
						repDept: $that.find(".responseDept").text(),
						repUser: $that.find(".responseUser").text(),
						contactReson: $that.find(".contactReason").attr("code"),
						address: $that.find(".address").text(),
						contents: $that.find(".contents").val(),
						custType: $that.attr("custtype"),
						msgId: $that.attr("msgid"),
						msgSendYN: $that.attr("msgsendyn"),
						msgType: $that.attr("msgtype"),
						msgSendTime: $that.attr("msgsendtime")
					}
			   	},
			   	width:"90%",
				height:"85%"
			});
		// 시험분석 버튼 클릭 이벤트
		}).delegate(".btnTestAnalysis", "click", function(){
			var openOption = 
			{
				modal   : false,
				replace : false,
				message : { 
					custCode: $(this).parents(".conBody").attr("custcode"),
					custName: $(this).parents(".conBody").attr("custname"),
					planId:  $(this).parents(".conBody").attr("salesplanid"),
					workDay: page.detailSearchDate,
					listTitle: $(this).text()
				},
			};
			bizMOB.Web.open("testanalysis/html/FSM0028.html", openOption);
		});
		
		
	},
	initData:function(json)
	{		
		var today = (new Date()).bMToFormatDate("yyyy-mm-01");
		page.searchDate = today;
		page.search(today);
	},
	initLayout:function()
	{
		var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		$("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("방문일정");
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
	search : function(searchDate)
	{
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01101");
				 
		 tr.body.P01 = "";
		 tr.body.P02 = searchDate; // TEST 데이터.
				 
		 bizMOB.Web.post({
			 
			message:tr,
			success:function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				page.makeCalander(json.body.LIST01);
			}
		 });
		 
	},
	custInfoRender:function(json, listName)
	{
		// 항목 리스트를 셋팅하기
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".fieldInfo",
		 		value:listName,
		 		detail:
	 			[
					{type:"single", target:".codename", value:"R01"},
					{type:"single", target:".codevalue", value:"R02"}
					
 		        ]
		 	}
		];
		// 그리기
	$("#tlist01").bMRender(json.body, dir);
	},
	makeCalander: function(obj){
		var htmlText = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpaR08ing=\"0\">" +
	        "<colgroup>" +
            "<col width=\"14%\" />" +
            "<col width=\"14%\" />" +
            "<col width=\"14%\" />" +
            "<col width=\"14%\" />" +
            "<col width=\"14%\" />" +
            "<col width=\"14%\" />" +
            "<col width=\"14%\" />" +
	    "</colgroup>" + 
        "<tr>" +
            "<th class=\"sunday\">일</th>" +
            "<th>월</th>" +
            "<th>화</th>" +
            "<th>수</th>" +
            "<th>목</th>" +
            "<th>금</th>" +
            "<th>토</th>" +
        "</tr><tr>";  
        
		var num = "0";
	 	
		$.each(obj, function(i){
	 		
	 		if(obj[i]["R01"] != num)
	 			htmlText += "</tr><tr>";
	 		
	 		num = obj[i]["R01"];
	 			
	   	    htmlText += (obj[i]["R13"] == 1 ? "<td valign=\"top\" class=\"no_date\">"   : "<td valign=\"top\" class=\"date\">") +
	            "<ul>" +
	              (obj[i]["R02"] % 7 == 1 || obj[i]["R05"] == "Y" ? "<li class=\"txt_date sunday\" id=\"dd\">" + obj[i]["R08"] +  "</li>" : obj[i]["R02"] % 7 == 0 ? "<li class=\"txt_date saturday\" id=\"dd\">" + obj[i]["R08"] + "</li>" : "<li class=\"txt_date\" id=\"dd\">" + obj[i]["R08"] + "</li>") +
	              
	              (obj[i]["R10"] == 0 && obj[i]["R10"] == 0 ? "<li class=\"txt_serv1\"></li><li class=\"txt_serv2\"></li>" :
	                  ("<li class=\"txt_serv1\">" + (obj[i]["R13"] == 1 ? "" : obj[i]["R12"] + "/" + obj[i]["R10"] + "</li>") +
	                  "<li class=\"txt_serv2\">" + (obj[i]["R13"] == 1 ? "" : obj[i]["R11"] + "/" + obj[i]["R10"] + "</li>"))) +
	            "</ul>" +
	          "</td>";
	          
	 	});
	 	$("#calendar").html(htmlText);
	 	$(".date").css("background-color", "white");
     	$(".date").on('click', function(){
     		$(".date").css("background-color", "white");
     		$(this).css("background-color", "rgba(166,199,255,0.5)");
     		if(!$(this).find(".txt_serv1").html() == ""){
     			var dd = $(this).find("#dd").text();
 				dd = dd.length == 1 ? "0" + dd : dd; 
 				page.detailSearchDate = $("#headerYear").text() + $("#headerMonth").text() + dd;
     			page.setVisitListDetail(page.detailSearchDate); // 일자 클릭시 디테일
     		}
  		});
     	
     	/*$(".date").on('mouseover', function(){
     		$(".date").css("background-color", "white");
     		$(this).css("background-color", "rgba(166,199,255,0.5)");
     	}).on('mouseout', function(){
     		$(this).css("background-color", "white");
     	});*/
     	
     	$(".date").on('click', function(){
     		$(".date").removeClass("on");
     		$(".date").css("background-color", "white");
     		$(this).css("background-color", "rgba(166,199,255,0.5)");
     		$(this).addClass("on");
     	});
     	
     	$("#headerYear").text(page.searchDate.substr(0, 4));
     	$("#headerMonth").text(page.searchDate.substr(5, 2));
     	
     	if(page.isFirst){
     		$($(".date")[(new Date()).getDate() - 1]).trigger("click");
     		page.isFirst = false;
     	}
	},
	setVisitListDetail: function(sDate){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01102");
		tr.body.P01 = "";
		tr.body.P02 = sDate;
		
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
	 			 	{ type:"single", target:"@salesplanid+", value: "R01" },
	 			 	{ type:"single", target:"@custcode+", value: "R03" },
	 			 	{ type:"single", target:"@custname+", value: "R19" },
	 			 	{ type:"single", target:"@custtype+", value: "R16" },
	 			    { type:"single", target:".custType", value: "R15" },
					{ type:"single", target:".salesType", value: function(args){
						return args.item.R18 + "<br />(" + args.item.R20 + ")";
					} },
					{ type:"single", target:".salesCustName", value: "R04" },
					{ type:"single", target:".salesStep", value: "R17" },					
					{ type:"single", target:".custName", value: function(args){
						return "(" + args.item.R03 + ") " + args.item.R19;
					} },
					{ type:"single", target:".responseDept", value: "R21" },
					{ type:"single", target:".responseUser", value: "R21" },					
					{ type:"single", target:".contactReason", value: "R20" },
					{ type:"single", target:".btnTestAnalysis", value: function(args){
						var returnVal = "";
						switch(args.item.R14){						
							case "111":
							case "112":
								returnVal = "자가품질검사";
								break;
							case "113":
							case "114":
								returnVal = "참고용검사";
								break;
						}
						return returnVal;
					} },
					{ type:"single", target:".contactReason@code", value: "R14" },
					{ type:"single", target:".address", value: "R05" },
					{ type:"single", target:".startDate", value: function(args){
						return (new Date(args.item.R08)).bMToFormatDate("yyyy-mm-dd HH:mm");
					} },
					{ type:"single", target:".endDate", value: function(args){
						return (new Date(args.item.R09)).bMToFormatDate("yyyy-mm-dd HH:mm");
					} },
					{ type:"single", target:".contents", value: "R07" },
					
					{ type:"single", target:"@msgid+", value: "R23" },
					{ type:"single", target:"@msgsendyn+", value: "R24" },
					{ type:"single", target:"@msgtype+", value: "R25" },
					{ type:"single", target:"@msgsendtime+", value: "R26" }
 		        ]
		 	}
		];
		var options = { clone:true, newId:"contlistNew", replace:true };
		$("#contlist").bMRender(json.body, dir, options);
		$("#detailDate").text(page.detailSearchDate.substr(4, 2).bMToNumber() + "월 " + page.detailSearchDate.substr(6, 2).bMToNumber() + "일");
		
		$(".salesType").each(function(i, item){
			$(item).html($(item).text());
		});
		
		// 방문 접촉사유가 식품시료분석 관련이면 시험분석 버튼을 보여줌
		$(".btnTestAnalysis").each(function(i, item){
			var code = $(item).parents(".trList").find(".contactReason").attr("code"); 
			if(code == "111" || code == "112" || code == "113" || code == "114"){
				$(item).show();
			}
		});
	},
	makeDate: function(){
		var y = $("#headerYear").text();
		var m = $("#headerMonth").text();
		var d = $(".on").find("#dd").text();
		
		return y + "-" + m + "-" + (d.length == 1 ? "0" + d : d);
	},
    // 부서관련 콤보박스!
    setComboBox: function(id, list, strValue){
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
	refresh: function(){
		$("#contlistNew").html("");
		page.isFirst = true;
		var today = (new Date()).bMToFormatDate("yyyy-mm-01");
		page.searchDate = today;
		page.search(today);
	}
};