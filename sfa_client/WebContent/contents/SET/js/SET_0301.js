/**
 * @author ehpark@mcnc.co.kr
 * @title cesco_iot 연결안내 (IOS)
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData : {},			//설치정보
	cesco_iot  : "Cesco_",	//ssid
	
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
		
		page.cesco_iot += page.installData.barcode;				
		$(".cesco_iot").text(page.cesco_iot);
	},

	initInterface : function() 
	{
		//설명이미지 Swipe
		$("#swipe").Swipe({
			stopPropagation : true,
			disableScroll : true,
			continuous : false,
			callback : function(index, element) 	{
				$("#pageNavi>span").removeClass("on");
				$("#pageNavi>span").eq(index).addClass("on");
			},
		});
		
		//IOS 기기연결
		$("#btnConnetToDevice").click(function() {	
			
			if(cescoUtil.isEmulator()) {
				cescoUtil.windowOpen({
					_sPagePath	: "SET/html/SET_0400.html",
					_bReplace 	: true,
					_oMessage 	: {
						installData : page.installData
					}
				});
			}
			
			page.cescoIOTConnectIOS();
		});	
		
		//다음버튼
		$("#btnNext").click(function() {
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0400.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
		});
	},
		
	//IOS 기기연결
	cescoIOTConnectIOS : function() 
	{
		$(".layerNoti").show();
				    		
		//cesco_iot 연결확인
		cescoUtil.verifyWifiSetting(page.cesco_iot, function(res) {
			if(res.result) {
				
				//device 연결확인
				cescoUtil.connectToIotDevice(function(resConnectToIotDevice) {
					 if(resConnectToIotDevice.result) {										 
						 $(".layerNoti").hide();
						 $("#btnConnetToDevice").hide();
						 $("#btnNext").show();
							
					 } else {
						$(".layerNoti").hide();
						$("#btnConnetToDevice em").text("제품을 연결할 수 없습니다　|　다시시도");
					 }
				});
				
			} else {
				
				cescoUtil.alert.show({
					txtHtml : "WI-FI설정 후 확인 버튼을 눌러주세요",
					btnTxt : "설정으로 이동하기",
					callback : function() {
						cescoUtil.wifiSetting(function() {});						
					}
				});
				
				$(".layerNoti").hide();
				$("#btnConnetToDevice em").text("확　인");
				
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
	},
		
	backbutton : function()
	{
		cescoUtil.windowOpen({
			_sPagePath	: "SET/html/SET_0204.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	},
};