/**
 * @author ehpark@mcnc.co.kr
 * @title ip 등록
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData : {},		//설치정보

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
		page.installData = data.installData;
		
		$("#contentsWrap").bMRender(data.installData, [ 
        		{ "type" : "single", "target" : "#ipAddress", 			"value" : "ipAddress"},
        		{ "type" : "single", "target" : "#subnetMask", 		"value" : "subnetMask"},
        		{ "type" : "single", "target" : "#basicGateway", 		"value" : "basicGateway"},
        		{ "type" : "single", "target" : "#basicDNS", 			"value" : "basicDNS"}
   	    ]);
	},

	initInterface : function() 
	{
		//자동입력 직접입력
		$("input[name=cngType]").change(function() {			
			if( $(this).val() == "static" ) {
				$("#contentsWrap .inp").prop("disabled", false);
			} else {
				$("#contentsWrap .inp").val("").prop("disabled", true).change();
			}			
		});
			
		//인풋포커스
		$(".inp").on("input keyup change", function() {
			var $btnTxtClear =  $(this).parents(".conInput").find(".btnTxtClear");
			
			if( $(this).val() == "" )  {
				$btnTxtClear.hide();
			} else {
				$btnTxtClear.show();
			};
		});
		//지우기
		$(".btnTxtClear").click(function() {
			$(this).hide().parents(".conInput").find("input").val("");
		});
		
		$("#contentsWrap").bMValidate({
			"rules" : {
				"#ipAddress"		: "required::IP주소를 입력 하세요.",
				"#subnetMask" 	: "required::서브넷 마스크를 입력 하세요.",
				"#basicGateway"	: "required::기본 게이트웨이를 입력 하세요.",
				"#basicDNS" 		: "required::기본 설정 DNS서버를 입력 하세요."
			}
		});
		
		//다음버튼
		$("#btnNext").click(function() {
									
			if( $("input[name=cngType]:checked").val() == "static"  ) {
				if(!$("#contentsWrap").bMValidate("check") ) {
					return;
				}				
				page.installData.ipType = "static";
			} else {
				page.installData.ipType = "dynamic";
			}
			
			page.installData.basicDNS 			= $("#basicDNS").val().trim();
			page.installData.basicGateway 	= $("#basicGateway").val().trim();
			page.installData.subnetMask 		= $("#subnetMask").val().trim();
			page.installData.ipAddress 			= $("#ipAddress").val().trim();
			
			if(cescoUtil.appTest) {
				cescoUtil.windowOpen({
					_sPagePath	: "SET/html/SET_0502.html",
					_bReplace 	: true,
					_oMessage 	: {
						installData : page.installData
					}
				});
			}			
			
			$(".layerNoti").show();
			
			if(page.installData.networkPswd.trim() != ""){
				page.installData.securityType = "PSK";
			}
			
			cescoUtil.setIotDevece({
				connectionType 	: page.installData.wps ? "wps" : "normal",
				securityType 		:  page.installData.securityType == "PSK" ? "wpa2-aes" : page.installData.securityType, //"wpa2"
				ipType				: page.installData.ipType,
				ssid					: page.installData.networkName,
				pwd					: page.installData.networkPswd,
				staticIP				: page.installData.ipAddress,
				subnetMask			: page.installData.subnetMask,
				gateway				: page.installData.basicGateway,
				dns					: page.installData.basicDNS,
				callback :	 "page.callbackSetIoTDevice"
			});
		
		});
	},
	callbackSetIoTDevice: function(resSetIotDevece) {
		
		$(".layerNoti").hide();					
		cescoUtil.windowOpen({
			_sPagePath	: "SET/html/SET_0502.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
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
		cescoUtil.windowOpen({
			_sPagePath	: "SET/html/SET_0400.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	},
};