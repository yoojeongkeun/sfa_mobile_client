page  =
{
	custCode : "",
	custName : "",
	workDate : "",
	
	init : function(json)
	{	
		ipmutil.appendCommonMenu();
		page.custCode = bizMOB.Storage.get("custCode");
		page.workDate = bizMOB.Storage.get("workYMD");
		custName  =  bizMOB.Storage.get("custName");
		
		SRMovePage.serviceRegist(); // 상당 카테고리 이동 	
		// 기본 설정값
		page.initInterface(json);
		page.initData(json);
		page.initLayout();
	},
	initInterface:function(json)
	{	
		if(json != null && JSON.stringify(json) != "{}")
		{
			page.custCode = json.custCode;
			page.custName = json.custName;
			page.workDate = json.workDate;
		}
		else
		{
			page.custCode = bizMOB.Storage.get("custCode");
			page.workDate = bizMOB.Storage.get("workYMD");
			custName  =  bizMOB.Storage.get("custName");
		}
		
		page.setCategory();
		page.setFloor();		
		page.setList();
		
		$("#category").change(function(){
			page.setList();
		});
		
		$("#ch").change(function(){
			page.setList();
		});
		
		$("#btnSearch").click(function(){
			page.setList();
			$("#txtSearch").hideKeypad();
		});
		
		$("#txtSearch").keyup(function(e){
			if(e.keyCode == 13){
				page.setList();
				$("#txtSearch").hideKeypad();
			}
		});
		
		
		
		$("#tb01New").delegate(".slideDetail", "click", function(){
			$(".slideDetail tr").removeClass('bg02');
			$(this).find("#trDetail").toggleClass('bg02');
	    });
		
		$(".bot_btn").click(function(){
			var $selcetValue = $("#tb01New").find(".bg02");
			
			bizMOB.Web.open("monitoring/html/CM031.html", {
				modal 	: false,
				replace : false,
				message : {
					divSeNum  		: $selcetValue.find("#t01")[0].textContent, //구획일련번호
					divLarge  		: $selcetValue.find("#t02")[0].textContent, //대분류명
					divLargeCode  	: $selcetValue.find(".rowData01")[0].textContent, //대분류코드
					divMiddle  		: $selcetValue.find(".rowData04")[0].textContent, //중분류명
					divMiddleCode	: $selcetValue.find(".rowData03")[0].textContent, //중분류코드
					floor  			: $selcetValue.find("#t03")[0].textContent, //층명
					floorCode  		: $selcetValue.find(".rowData02")[0].textContent, // 층코드
					divDetail  		: $selcetValue.find(".rowData06")[0].textContent, // 세분류명
					divDetailCode  	: $selcetValue.find(".rowData05")[0].textContent, // 세분류코드
					divCode			: $selcetValue.find(".rowData08")[0].textContent, // 구획코드
					posiDesp		: $selcetValue.find(".rowData07")[0].textContent // 세부위치설명
				}
			});
	    });
		
		$("#btnShowSearchBox").click(function(){			
			$("#searchBox").toggle();
			if($("#searchBox").is(":visible")){
				$(".top_fix01").css("padding-top", "231px");
				$("#btnShowSearchBox").text("검색창 닫기");		
			}else{
				$(".top_fix01").css("padding-top", "127px");
				$("#btnShowSearchBox").text("검색창 열기");
			}
		});
	},
	initData:function(json)
	{
		
	},
	initLayout:function()
	{
	 	var IDName  =  bizMOB.Storage.get("UserName");
 		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID  =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
 		
 		$("#subname").text(IDName);
 		
 		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
 		var layout = ipmutil.getDefaultLayout(bizMOB.Storage.get("custName"));
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
	setCategory: function(){	
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03002");
		tr.body.P01 = page.custCode;
		
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
				if(json.body.LIST.length == 0){
					bizMOB.Ui.alert("안내", "코드값이 존재하지 않습니다.");
					return;
				}
				page.setSelect(json, "category");
			}
		});
	},
	setFloor: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03003");
		tr.body.P01 = page.custCode;
		
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
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "코드값이 존재하지 않습니다.");
					return;
				}
				page.setSelectFloor(json, "ch");
			}
		});
	},
	setSelect: function(json, selectID){
		var cnt = json.body.LIST.length;
		var list = json.body.LIST;
		for(var i = 0; i < cnt; i++){
			$("#" + selectID).append("<option value=\"" + list[i].R01 + "\">" + list[i].R02 +"</option>");
		}
	},
	setSelectFloor: function(json, selectID){
		var cnt = json.body.LIST01.length;
		var list = json.body.LIST01;
		for(var i = 0; i < cnt; i++){
			$("#" + selectID).append("<option value=\"" + list[i].R01 + "\">" + list[i].R01 +"</option>");
		}
	},
	setList: function(){	
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03004");
		tr.body.P01 = page.workDate;
		tr.body.P02 = page.custCode;
		tr.body.P03 = $("#category").val();
		tr.body.P04 = $("#ch").val();
		tr.body.P05 = $("#txtSearch").val();
		
		bizMOB.Web.post(
		{
			message : tr,
			success : function(json) {
				if (json.header.result == true) {

					page.renderList(json, "list01");

				} else {

					bizMOB.Ui.alert("로그인", json.header.error_text);
				}
			}
		});
	},
	renderList : function(json, listName) {
		// 항목 리스트를 셋팅하기
		var dir = [ {
			type : "loop",
			target : ".slideDetail",
			value : listName,
			detail : [
					{
						type : "single",
						target : "#t01",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R01);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#t02",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R04);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#t03",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R06);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#t04",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R02);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#t05",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R14);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#t06",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R15);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#t07",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R16);
							return returnValue;
						}
					}, 
					//히든값 설정 - 저장할 경우 넘겨야 하는 값을 위한 히든 값
					{type:"single", target:".rowData01", value:"R03"},
					{type:"single", target:".rowData02", value:"R05"},
					{type:"single", target:".rowData03", value:"R07"},
					{type:"single", target:".rowData04", value:"R08"},
					{type:"single", target:".rowData05", value:"R09"},
					{type:"single", target:".rowData06", value:"R10"},
					{type:"single", target:".rowData07", value:"R11"},
					{type:"single", target:".rowData08", value:"R12"}
					]
		} ];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"tb01New", replace:true };
		// 그리기
		$("#tb01").bMRender(json.body, dir, options);
	},
};


/**
 * 안드로이드 빽버튼 이벤트!
 */
function onClickAndroidBackButton() {
	bizMOB.Web.close(
	{
		modal : false ,
		callback : "page.callbackOnSearch"
	});
}