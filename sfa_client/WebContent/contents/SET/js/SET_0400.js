/**
 * @author ehpark@mcnc.co.kr
 * @title wifi 등록
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData 		: {},		//설치정보
	retryCnt 		: 3, 		//wifi목록 재요청수

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
			
		page.getSSIDList();
	},	
	callbackGetSSIDList: function(resGetSSIDList) {
		
		$(".layerNoti").hide();
		page.renderList(resGetSSIDList.get_ssid_list);
		
		return;
		
		if(resGetSSIDList.result && resGetSSIDList.get_ssid_list.length > 0) {
			$(".layerNoti").hide();
			page.renderList(resGetSSIDList.get_ssid_list);
			
		} else {		
			
			if( page.retryCnt-- == 0) {
				
				cescoUtil.confirm.show({
					txtHtml : "와이파이 목록이 없습니다",
					lbtnTxt : "직접입력",
					lCallback : function() {
						$("#btnChangeInput").click();
					},
					rbtnTxt : "재시도",
					rCallback : function() {
						page.retryCnt = 3;
						page.getSSIDList();
					}
				});
				
			} else {					
				setTimeout(function() {
					page.getSSIDList();
				}, 3000);
			}	
		}
	
	},
	//wifi목록 가져오기
	getSSIDList : function() 
	{
		//$(".layerNoti").show();
		
		cescoUtil.getSSIDList();
		
	},
	
	//wifi감도 css
	getWifiSignalStrengthCss : function(signalStrength)
	{
		signalStrength =  Math.abs(Number(signalStrength));			    	 
		if( isNaN(signalStrength)) {
			return " wifi01";
		} else {
			return signalStrength < 10 ? " wifi01" : signalStrength < 40 ? " wifi02" : signalStrength < 70 ?  " wifi03" : " wifi04";
		}
	},
	
	//wifi목록랜더
	renderList : function(list)
	{
		var dir = [ {
			"type" 	: "loop",
			"target" 	: ".record",
			"value" 	: ".",
			"detail" 	: [ 
			     { "type" : "single", "target" : ".@data", 						"value" : function(arg) {
			    	 return arg.item;
			     } , "valueType" : "data"	},
			     { "type" : "single", "target" : ".ssid", 							"value" : "ssid" 	},
			     { "type" : "single", "target" : ".signalStrength@class+", 	"value" : function(arg) {
			    	 
			    	return page.getWifiSignalStrengthCss(arg.item.signalStrength);
			     } },
			     { "type" : "single", "target" : ".securityType@class+",		"value" : function(arg) {
			    	 return arg.item.securityType == "open" ? "" : " lock";
			     } 	} 
			  ]
		}];
		$("#wifiListTemplate").bMRender(list, dir, { clone : true, 	newId : "wifiList",	replace : true 	});
		
		$("#wifiList .record:eq(0)").click();	
	},
	
	initInterface : function() 
	{
		//와이파이목록 펼치기
		$("#btnWifiSel").click(function() {			
			$(this).toggleClass("on");
			$("#wifiList").toggle();
		});
		
		//와이파이 선택
		$("#wifiList").on("click", ".record", function() {
			
			var $this = $(this),
			selWifi = $this.data("data");
			
			$("#wifiList .record.on").removeClass("on");
			$this.addClass("on");
						
			$("#selWifiName").text( selWifi.ssid);
			$("#selSignalStrength").removeClass("wifi01 wifi02 wifi03 wifi04 wifi05").addClass( page.getWifiSignalStrengthCss(selWifi.signalStrength) );
			if(selWifi.securityType == "open") {
				$("#selSecurityType").removeClass("lock");
			} else {
				$("#selSecurityType").addClass("lock");
			}
			
			$("#btnWifiSel").removeClass("on");		
			$("#wifiList").hide();
			
			if( selWifi.securityType == "open") {
				$("#networkPswdWrap").hide();
			} else {
				$("#networkPswd").val("").change();
				$("#networkPswdWrap").show();
			}
		});
		
		//텍스트지우기
		$("#btnTxtClear").click(function() {
			$(this).hide().parents(".idBox").find("input").val("");
		});
		
		//인풋포커스
		$("#networkPswd").on("input keyup change", function() {
			var $btnTxtClear =  $("#btnTxtClear");	
			
			if( $(this).val() == "" )  {
				$btnTxtClear.hide();
			} else {
				$btnTxtClear.show();
			};
		});
		
		//비밀번호 표시
		$("#visiblePw").change(function() {
			if( $(this).is(":checked")) {
				$("#networkPswd").prop("type", "text");
			} else {
				$("#networkPswd").prop("type", "password");
			}			
		});
		
		//다음버튼
		$("#btnNext").click(function() {

			var data = $("#wifiList .record.on").data("data");
			
			page.installData.securityType		= data.securityType;
			page.installData.networkName 	= data.ssid;
			page.installData.networkPswd 	= "";
			page.installData.wps					= "";
			
			if(data.securityType != "open" ) {
				page.installData.networkPswd = $("#networkPswd").val().trim();
				
				if(page.installData.networkPswd == "") {
					cescoUtil.alert.show("비밀번호를 입력하세요");
					return;
				}
			}
								
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0500.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
			
		});
		
		//직접입력, 선택입력 토글버튼
		$("#btnChangeInput").click(function() {			
			page.installData.networkName 	= "";
			page.installData.networkPswd 	= "";
			page.installData.securityType	 	= "";
			page.installData.wps					= "";
			
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0401.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});			
		});
		
		//WPS 버튼
		$("#btnWPS").click(function() {			
			page.installData.securityType		= "";
			page.installData.networkName 	= "";
			page.installData.networkPswd 	= "";
			page.installData.wps					= true;
											
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0500.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
		});
		
		// Wi-Fi 리스트 가져오기 버튼
		$("#btnGetWiFiList").click(function(){
			page.getSSIDList();
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
	},
		
	backbutton : function()
	{
		var isAndroid = bizMOB.Device.isAndroid();	
		
		if( isAndroid ) {
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0300.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
			
		} else {
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0301.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
		}
		
	},
};