/**
 * @author ehpark@mcnc.co.kr
 * @title 설치공간 선택
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	codeList : [], //설치공간 목록

	init : function(event) 
	{
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData(event);
		page.initLayout();
	},

	initData : function(data) 
	{
		var IDName    =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		//설치공간 목록조회
		bizMOB.Network.requestTr({
			_sTrcode 	: "CES0032",
			_oBody 		: {},
			_fCallback 	: function(resCES0032) {
				if (cescoUtil.checkResponseError(resCES0032)) {
					page.codeList = resCES0032.body.codeList;					
					page.renderList();
				}
			}
		});		
	},
		
	renderList : function() 
	{
		var codeType = $("#btnTab .on button").val(); //codeType 0 가정집 1 업소
		
		var dir = [ {
			"type" 		: "loop",
			"target" 		: ".record",
			"condition" 	: function(arg) { return arg.item.codeType == codeType; },
			"value" 		: ".",
			"detail" 		: [ 
			     { "type" : "single", "target" : ".btnRecord@data", 		"value" : function(arg) {
			    	 return arg.item;
			     } , "valueType" : "data"	},
			     { "type" : "single", "target" : ".codeName", 				"value" : "codeName" 	},
			  ]
		}];
		$("#listTemplate").bMRender(page.codeList, dir, { clone : true, 	newId : "list", 	replace : true 	});
		
		if( $("#list>li.record").size() == 0 ) {
			$("#noData").show();
			
		} else {
			$("#noData").hide();
		}
	},

	initInterface : function() 
	{
		//가정집/업소 탭
		$("#btnTab button").click(function() {
			$("#btnTab > li.on").removeClass("on");
			$(this).parents().addClass("on");
			
			page.renderList();
		});
		
		//선택
		$("#contentsWrap").on("click", ".btnRecord", function() {			
			var data = $(this).data("data");			
			cescoUtil.windowClose({
				_sCallback 	: "page.callbackSET_0601",
				_oMessage 	: {
					insSpace : data
				}
			});
		});
	},
		
	initLayout : function() 
	{
		var layout = ipmutil.getDefaultLayout("설치공간");
		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));
  	  	bizMOB.Ui.displayView(layout);  
  	  	bizMOB.Ui.displayView(layout);  
	},
};