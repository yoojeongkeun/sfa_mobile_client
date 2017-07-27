/**
 * @author ehpark@mcnc.co.kr
 * @title 제품등록 1. 바코드스캔/NFC태그 선택
 */
// bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData : {}, // 설치정보

	init : function(event) {
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData(event);
		page.initLayout();
	},

	initData : function(data) {
		var IDName    =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		page.installData = data.installData || {};
	},

	initInterface : function() {
		// 바코드스캔 버튼
		$("#btnBarcode").click(function() {
			cescoUtil.windowOpen({
				_sPagePath : "SET/html/SET_0202.html",
				_bReplace : true,
				_oMessage : {
					installData : page.installData
				}
			});
		});

		// NFC태그 버튼
		$("#btnNFC").click(function() {
			cescoUtil.nfcCheckStatus();
		});
	},

	// nfc상태 callback
	callback_nfcCheckStatus : function(resStatus) {
		if (resStatus.result) {
			cescoUtil.windowOpen({
				_sPagePath : "SET/html/SET_0203.html",
				_bReplace : true,
				_oMessage : {
					installData : page.installData
				}
			});
		} else {
			cescoUtil.nfcRequestSetting();
		}
	},

	initLayout : function() {
		// cescoTitlebar.setInsTitleBar("설치하기", page.backbutton);
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

	backbutton : function() {
		cescoUtil.windowOpen({
			_sPagePath : "SET/html/SET_0100.html",
			_bReplace : true,
			_oMessage : {
				installData : page.installData
			}
		});
	},
};