/**
 * @author ehpark@mcnc.co.kr
 * @title 인증번호 생성 확인
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData 	: {},			//설치정보
	userInfo		: {}, 			//사용자정보
	
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
		page.installData 	= data.installData;
		page.userInfo 		= cescoUtil.StorageGet("userInfo");
		
		$("#contentsWrap").bMRender(data.installData, [ 
     		{ "type" : "single", "target" : "#authNo", 	"value" : "authNo"},   
	    ]);		
		
		page.saveInstallData();
	},

	//설치완료
	saveInstallData : function()
	{		
		bizMOB.Network.requestTr({
			_sTrcode 	: "CES0034",
			_oBody 		: {
				objtNo				: page.installData.objtNo, 				//장비일련번호 
				custNo				: page.installData.custNo,				//기기고객코드
				insAddr2				: page.installData.insAddr2, 			//설치주소2
				insAddr1				: page.installData.insAddr1,			//설치주소1
				regionID				: page.installData.regionID,			//지역아이디
				buildNo				: page.installData.buildNo,				//설치건물번호				
				authNo				: page.installData.authNo,				//인증번호
				barcode				: page.installData.barcode, 			//바코드
				envFeatureCD		: page.installData.envFeatureCD,	//환경 특징 코드					
				insSpaceCD			: page.installData.insSpaceCD, 		//설치공간코드
				insArea				: page.installData.insArea, 			//설치장소
			},
			_fCallback 	: function(resCES0034) {
				if (cescoUtil.checkResponseError(resCES0034)) {					
					if (resCES0034.body.isSuccess) {
						
						cescoUtil.StorageSet("userInfo", $.extend(page.userInfo, {cleanerList : resCES0034.body.cleanerList }));					
						
						$(".btnShare").show();
						$("#btnNext").show();
					} else {
						cescoUtil.alert.show(resCES0034.body.errorMsg);
					}
				}
			}
		});
	},
	
	initInterface : function() 
	{		
		//카카오
		$("#btnKakaoTalk").click(function() {
			cescoUtil.sendToKakaotalk({
				text 				: "[세스코 에어]\n공기청정기를 스마트폰으로 편리하게!\n" + page.userInfo.userName +"님이 초대합니다. \n\n인증번호 " + page.installData.authNo,
				urlPath 			: "",  
				imageUrl 		: "",
			});
		});
		
		//sms
		$("#btnSms").click(function() {
			bizMOB.System.callSMS({
				_aNumber : [],
				_sMessage : "[세스코 에어]\n공기청정기를 스마트폰으로 편리하게!\n" + page.userInfo.userName +"님이 초대합니다. \n\n인증번호 " + page.installData.authNo,
			});
		});
		
		//다음버튼
		$("#btnNext").click(function() {						
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0800.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
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
			_sPagePath	: "SET/html/SET_0700.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	},
};