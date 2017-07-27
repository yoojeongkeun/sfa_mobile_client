/**
 * @author ehpark@mcnc.co.kr
 * @title 제품등록 2. NFC태그 선택
 */


function readNFC(resReadNFC){		
	var barcode = resReadNFC.NdefMessage[0].replace("\n", "");
	page.reqData(barcode);
}

//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData 	: {},			//설치정보
	checkInterval : null,		//nfc check interval id
	
	init : function(event) 
	{
		var IDName    =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData(event);
		page.initLayout();
	},

	initData : function(data) 
	{
		page.installData = data.installData;		
		
		cescoUtil.nfcEnable();
		
		page.checkInterval = setInterval(function() { 	
			cescoUtil.nfcCheckStatus();		
		}, 3500);
	},
	
	//nfc상태 callback
	callback_nfcCheckStatus : function(resStatus)
	{
		if(resStatus.result) {
			cescoUtil.nfcEnable();
		} else {
			bizMOB.Window.toast({
				_sMessage : "NFC가 비활성화 되어 있습니다. NFC를 활성화 하고 읽기모드로 변경 해주세요."
			});
		}
	},
	
	//nfc리드 callback 
	callback_readNFC : function(resReadNFC)
	{		
		var barcode = resReadNFC.NdefMessage[0].replace("\n", "");
		page.reqData(barcode);
	},
	
	//바코드정보 인증요청
	reqData : function (barcode)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CES0031");
		tr.body.barcode = barcode;
		bizMOB.Web.post({
			message: tr,
			success: function(resCES0031){
				if (cescoUtil.checkResponseError(resCES0031)) {
					
					$("#txtBarcodeError").hide();
					page.installData = $.extend(true, page.installData, resCES0031.body);
										
					//if(resCES0031.body.deviceSetYN == "Y") {
					if(false) {
						bizMOB.Ui.alert("안내", "이미 기기설정이 되어있는 기기입니다.");
						/*cescoUtil.confirm.show({
							txtHtml : "기기설정이 되어있습니다.<br/>기기설정 단계를 넘어가시겠습니까?",
							lbtnTxt : "아니요",
							lCallback : function() {
								cescoUtil.windowOpen({
									_sPagePath	: "SET/html/SET_0204.html",
									_oMessage 	: {
										installData : page.installData
									},
									_bReplace 	: true
								});
							},
							rbtnTxt : "네 (정보입력)",
							rCallback : function() {
								cescoUtil.windowOpen({
									_sPagePath	: "SET/html/SET_0600.html",
									_oMessage 	: {
										skipSetting	: true,
										installData 	: page.installData
									},
									_bReplace 	: true
								});
							}
						});*/
					
					} else {
						cescoUtil.windowOpen({
							_sPagePath	: "SET/html/SET_0204.html",
							_oMessage 	: {
								installData : page.installData
							},
							_bReplace 	: true
						});
					}
										
				} else {
					$("#txtBarcodeError").show();
				}
			}
		});
		
		/*bizMOB.Network.requestTr({
			_sTrcode 	: "CES0031",
			_oBody 		: {
				barcode : barcode
			},
			_fCallback 	: function(resCES0031) {
						
				if (cescoUtil.checkResponseError(resCES0031)) {
				
					$("#txtBarcodeError").hide();
					page.installData = $.extend(true, page.installData, resCES0031.body);
										
					if(resCES0031.body.deviceSetYN == "Y") {
						
						cescoUtil.confirm.show({
							txtHtml : "기기설정이 되어있습니다.<br/>기기설정 단계를 넘어가시겠습니까?",
							lbtnTxt : "아니요",
							lCallback : function() {
								cescoUtil.windowOpen({
									_sPagePath	: "SET/html/SET_0204.html",
									_oMessage 	: {
										installData : page.installData
									},
									_bReplace 	: true
								});
							},
							rbtnTxt : "네 (정보입력)",
							rCallback : function() {
								cescoUtil.windowOpen({
									_sPagePath	: "SET/html/SET_0600.html",
									_oMessage 	: {
										skipSetting	: true,
										installData 	: page.installData
									},
									_bReplace 	: true
								});
							}
						});
					
					} else {
						cescoUtil.windowOpen({
							_sPagePath	: "SET/html/SET_0204.html",
							_oMessage 	: {
								installData : page.installData
							},
							_bReplace 	: true
						});
					}
										
				} else {
					$("#txtBarcodeError").show();
				}
			}
		});*/
	},
	initInterface : function() 
	{
		
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
			_sPagePath	: "SET/html/SET_0200.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	},
};
