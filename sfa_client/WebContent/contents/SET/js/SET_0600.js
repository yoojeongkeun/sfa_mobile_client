/**
 * @author ehpark@mcnc.co.kr
 * @title 정보입력
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData 		: {},		//설치정보
	skipSetting	 	: false,	//기기설정단계 건너뜀 여부
	
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
		page.skipSetting 	= data.skipSetting;
		page.installData 	= data.installData;
		
		$("#contentsWrap").bMRender(data.installData, [ 
       		{ "type" : "single", "target" : "#insAddr1@value", 			"value" : "insAddr1"},
       		{ "type" : "single", "target" : "#insAddr1@buildNo", 			"value" : "buildNo"}, 
       		{ "type" : "single", "target" : "#insAddr1@regionID", 		"value" : "regionID"}, 
       		{ "type" : "single", "target" : "#insAddr2@value", 			"value" : "insAddr2"},
       		{ "type" : "single", "target" : "#insArea@value", 				"value" : "insArea"},
       		{ "type" : "single", "target" : "#insSpace@value", 			"value" : "insSpaceName"},
       		{ "type" : "single", "target" : "#insSpace@insSpaceCD",	"value" : "insSpaceCD"},
       		{ "type" : "single", "target" : ".@", 								"value" : function(arg) {
       			if(arg.item.envFeatureCD) {
       				$(arg.element).find(".envFeatureCD[value=" + arg.item.envFeatureCD +"]").addClass("on");
       			} else {
       				$(arg.element).find(".envFeatureCD:eq(0)").addClass("on");
       			}
       		}}     
  	    ]);
		
		$(".inp").change();
	},

	initInterface : function() 
	{
		//인풋포커스
		$(".inp").on("input keyup change", function() {
			var $btnTxtClear =  $(this).next(".btnTxtClear");
			
			if( $(this).val() == "" )  {
				$btnTxtClear.hide();
			} else {
				$btnTxtClear.show();
			};
		});
		
		//지우기
		$(".btnTxtClear").click(function() {
			$(this).hide().prev(".inp").val("");
		});
		
		//주소
		$("#insAddr1").click(function() {
			cescoUtil.windowOpen({
				_sPagePath : "ADD/html/ADD_0100.html"
			});
		});
		
		//장소입력
		$("#insArea").on("input keyup change", function() {
			$(".btnInsArea").removeClass("on");
		});
		
		//장소버튼
		$(".btnInsArea").click( {term : 500}, function() {			
			$("#insArea").val( $(this).text() ).change();
			
			$(".btnInsArea").removeClass("on");
			$(this).addClass("on");
		});
		
		//공간선택
		$("#insSpace, #btnInsSpace").click(function() {
			cescoUtil.windowOpen({
				_sPagePath : "SET/html/SET_0601.html"
			});
		});
		
		//환경특징
		$(".envFeatureCD").click( {term : 500}, function() {
			$(".envFeatureCD").removeClass("on");
			$(this).addClass("on");		
		});
				
		//다음버튼
		$("#btnNext").click(function() {
						
			if($("#contentsWrap").bMValidate("check") ) {
				page.installData.buildNo				= $("#insAddr1").attr("buildNo"),
				page.installData.regionID			= $("#insAddr1").attr("regionID"),
				page.installData.insAddr1			= $("#insAddr1").val().trim();
				page.installData.insAddr2			= $("#insAddr2").val().trim();
				page.installData.insArea 			= $("#insArea").val().trim();
				page.installData.insSpaceCD 		= $("#insSpace").attr("insSpaceCD");
				page.installData.insSpaceName 	= $("#insSpace").val().trim();
				page.installData.envFeatureCD 	= $(".envFeatureCD.on").val()||"1000";
				
				cescoUtil.windowOpen({
					_sPagePath	: "SET/html/SET_0700.html",
					_bReplace 	: true,
					_oMessage 	: {
						installData : page.installData
					}
				});
			}
		});
		
		$("#contentsWrap").bMValidate({
			"rules" : {
				"#insAddr1"			: "required::설치주소를 입력 하세요.",
				"#insAddr2"			: "required::설치주소 상세를 입력 하세요.",
				"#insArea" 			: "required::설치장소를 입력 하세요.",
				"#insSpace"			: "required::설치공간을 입력 하세요."
			}
		});
	},
	
	//주소선택 완료
	callbackADD_0100 : function(result)
	{
		$("#insAddr1").val(result.selAddr)
						.attr("regionID", result.addr.regionID)
						.attr("buildNo", result.addr.buildNo).change();
	},
	
	//공간선택 완료
	callbackSET_0601 : function(result)
	{
		$("#insSpace").val(result.insSpace.codeName).attr("insSpaceCD", result.insSpace.code).change();
	},
	
	initLayout : function() 
	{
		var layout = ipmutil.getDefaultLayout("설치하기");
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
		
	backbutton : function()
	{
		var isAndroid = bizMOB.Device.isAndroid();	
		
		if( page.skipSetting ) {
			
			if(isAndroid) {
				cescoUtil.windowOpen({
					_sPagePath	: "SET/html/SET_0200.html",
					_bReplace 	: true,
					_oMessage 	: {
						installData : page.installData
					}
				});	
			} else {
				cescoUtil.windowOpen({
					_sPagePath	: "SET/html/SET_0202.html",
					_bReplace 	: true,
					_oMessage 	: {
						installData : page.installData
					}
				});
			}
			
		} else {
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0503.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
		}
	},
};