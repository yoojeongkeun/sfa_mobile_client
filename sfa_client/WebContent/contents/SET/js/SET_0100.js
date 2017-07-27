/**
 * @author ehpark@mcnc.co.kr
 * @title wifi활성화
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {	
		
	installData : {},	//설치정보

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
		page.installData = data.installData||{};
	},

	initInterface : function() 
	{
			
		
		//확인
		$("#btnNext").click(function() {
			
			var v = {
			    call_type : "js2app",
		        	id    : "CHECK_AND_GET_FROM_WIFI",
		        	param  : {
		        		type   : "status",
		        		callback  : "page.afterWifiStatus"
		        	}
			    };
		    bizMOB.onFireMessage(v);
			
			
		});
	},
		
	initLayout : function() 
	{
		//cescoTitlebar.setInsTitleBar("설치하기", page.backbutton);
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
		//cescoUtil.windowClose({});
	},
	afterWifiStatus: function(res){
		var isAndroid = true;
		
		if(!res.result) {					
			if( cescoUtil.isEmulator() ) {
				/*cescoUtil.windowOpen({
					_sPagePath 	: "SET/html/SET_0200.html",
					_bReplace 		: true,
					_oMessage 		: {
						installData : page.installData
					}
				});*/
				
				bizMOB.Web.open("SET/html/SET_0200.html", {
					modal : false,
					replace : false,
					message : {
						installData : page.installData
					}
				});
			} else {
				bizMOB.Ui.toast("공기청정기 연결을 위해 스마트폰의 Wi-Fi를 활성화해주세요.");
			}
			
		} else {
			
			if( isAndroid ) {
				//바코드, NFC 선택화면
				/*cescoUtil.windowOpen({
					_sPagePath 	: "SET/html/SET_0200.html",
					_bReplace 		: true,
					_oMessage	 	: {
						installData : page.installData
					}
				});*/
				bizMOB.Web.open("SET/html/SET_0200.html", {
					modal : false,
					replace : false,
					message : {
						installData : page.installData
					}
				});
			} else {
				//바코드 입력화면
				/*cescoUtil.windowOpen({
					_sPagePath 	: "SET/html/SET_0202.html",
					_bReplace 		: true,
					_oMessage	 	: {
						installData : page.installData
					}
				});*/
				bizMOB.Web.open("SET/html/SET_0202.html", {
					modal : false,
					replace : false,
					message : {
						installData : page.installData
					}
				});
			}
		}		
	}
};