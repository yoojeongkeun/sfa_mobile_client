/**
 * @author ehpark@mcnc.co.kr
 * @title 제품연결 (Android)
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData 	: {},		//설치정보
	retryCnt 	: 3, 		//제품연결 재시도 수
	_connectFailed: "",
	cesco_iot: "",
	resGetWifiList: "",
	securityType: "",
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
	},

	initInterface : function() 
	{
		var isAndroid = true;//bizMOB.Device.isAndroid();	
				
		//다음 (제품연결)		
		$("#btnConnetToDevice").click(function() {
			/*$(".layerNoti").hide();
			$("#btnConnetToDevice").hide();
			$("#btnNext").show();
			return;*/
			if( isAndroid ) {
				
				$(".layerNoti").show();
				
				//연결전 딜레이
				setTimeout(function() {
					page.cescoIOTConnectAndroid();
				}, 5000);
				
			} else {
				//IOS는 다음페이지에서 한다
				cescoUtil.windowOpen({
					_sPagePath	: "SET/html/SET_0301.html",
					_bReplace 	: true,
					_oMessage 	: {
						installData : page.installData
					}
				});
			}
		});	
		
		//다음 (제품연결 완료)
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
		
	//Android 기기연결
	cescoIOTConnectAndroid : function()
	{		
		if( cescoUtil.appTest ) {
			$(".layerNoti").hide();
			$("#btnConnetToDevice").hide();
			$("#btnNext").show();
			return;
		}
		
		$(".layerNoti").show();
		
		//와이파이목록 가져오기
		cescoUtil.getWifiList("page.callbackWifiList");		

		page._connectFailed = function() {
			
			if( page.retryCnt-- == 0) {
				$(".layerNoti").hide();
				$("#btnConnetToDevice>em").text("제품을 연결할 수 없습니다　|　다시시도");
				
			} else {
				
				//연결전 딜레이
				setTimeout(function() {
					page.cescoIOTConnectAndroid();
				}, 5000);
			}
			
		};	
	},
	callbackWifiList: function(resGetWifiList) {	
		//alert(page.installData.barcode);
		page.cesco_iot = "Cesco_"+page.installData.barcode;
		page.resGetWifiList = resGetWifiList;
		if(page.resGetWifiList.result) {
			for(var i=0, len=page.resGetWifiList.result_list.length; i<len; i++) {
				//cesco_iot ssid 찾기
				if (page.resGetWifiList.result_list[i].ssid == page.cesco_iot) {		
					page.securityType = page.resGetWifiList.result_list[i].security_type;
					cescoUtil.wifiDisconnect("page.callbackWifiDisconnect");
					break;						
				}
				
				if(i==len-1) {
					//cesco_iot 없음
					page._connectFailed();
				}
			}
			
		} else {
			//getWifiList false
			page._connectFailed();
		}
	},
	callbackWifiDisconnect: function(resWifiDisconnect) {
		if(resWifiDisconnect.result) {			
			cescoUtil.connectWifi(page.cesco_iot, "12345678", page.securityType, "page.callbackConnctWifi");			
		} else {
			//wifiDisconnect false
			page._connectFailed();
		}
	},
	callbackConnctWifi: function(resConnectWifi) {
		 if(resConnectWifi.result) {		
			 //연결 성공 후 딜레이
			 setTimeout(function() {
				 $(".layerNoti").hide();
				 $("#btnConnetToDevice").hide();
				 $("#btnNext").show();
			  }, 3000);
			 				
		 } else {
			 //connectWifi false
			 page._connectFailed();
		 }
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