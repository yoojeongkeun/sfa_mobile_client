/**
 * @author ehpark@mcnc.co.kr
 * @title 인증번호 입력 (부사용자)
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData : {},		//설치정보
	custNo: "",
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
		page.custNo = data.custNo;
	},

	initInterface : function() 
	{
		//인풋포커스
		$(".inp").on("input keyup change", function() {
			var $btnTxtClear =  $(this).parents(".conInput").find(".btnTxtClear");			
			if( $(this).val() == "" )  {
				$btnTxtClear.hide();
			} else {
				$btnTxtClear.show();
			};
		});
				
		//텍스트 지우기
		$(".btnTxtClear").click(function() {
			$(this).hide().parents(".conInput").find("input").val("");
		});
		
		//다음
		$("#btnNext").click(function() {
			if($("#contentsWrap").bMValidate("check") ) {
				page.checkAuthNo();
			}			
		});
		
		$("#contentsWrap").bMValidate({
			"rules" : {
				"#inpAuthNo"	: "number::인증번호 숫자 4자리를 입력 하세요.",
				"#inpAuthNo"	: "minLength(4)::인증번호 숫자 4자리를 입력 하세요.",
			}
		});
		
	},
	
	//인증번호 확인
	checkAuthNo : function()
	{
		var authNo = $("#inpAuthNo").val();
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CES0036");
		//tr.body.deviceID = page.installData.barcode;
		//tr.body.authNo = authNo;
		tr.body.custNo = page.installData.custNo;
		tr.body.objtNo = page.installData.objtNo;
		tr.body.authNo = authNo;
		 
		bizMOB.Web.post({
			message: tr,
			success: function(resCES0036){
				if(!resCES0036.header.result){
					bizMOB.Ui.alert("안내", "인증에 실패하였습니다. " + resCES0036.header.error_text);
					
				}
				if (cescoUtil.checkResponseError(resCES0036)) {

					if(resCES0036.body.isSuccess) {
						
						page.installData.authNo = authNo;							
						page.saveInstallData();
						
					} else {
						$("#errorTextWrap").show();
						$("#errorText").text(resCES0036.body.errorMsg);
					}
					
				}
			}
		}); 
		 /*bizMOB.Network.requestTr({
				_sTrcode 	: "CES0036",
				_oBody 		: {
					deviceID		: page.installData.barcode,
					authNo		: authNo
				},
				_fCallback 	: function(resCES0036) 
				{
					if (cescoUtil.checkResponseError(resCES0036)) {

						if(resCES0036.body.isSuccess) {
							
							page.installData.authNo = authNo;							
							page.saveInstallData();
							
						} else {
							$("#errorTextWrap").show();
							$("#errorText").text(resCES0036.body.errorMsg);
						}
						
					}
				}
			});*/
		 
	},
	

	//부사용자 설치완료
	saveInstallData : function()
	{		
		var userInfo = cescoUtil.StorageGet("userInfo");
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CES0037");
		tr.body.custNo = page.installData.custNo;
		tr.body.objtNo = page.installData.objtNo;
		
		bizMOB.Web.post({
			message: tr,
			success: function(resCES0037){
				if (cescoUtil.checkResponseError(resCES0037)){					
					cescoUtil.StorageSet("userInfo", $.extend(userInfo, {cleanerList : resCES0037.body.cleanerList }));		
					
					cescoUtil.windowOpen({
						_sPagePath	: "SET/html/SET_0800.html",
						_bReplace 	: true,
						_oMessage 	: {
							installData : page.installData
						}
					});					
				}
			}
		});
		
		/*bizMOB.Network.requestTr({
			_sTrcode 	: "CES0037",
			_oBody 		: {
				objtNo				: page.installData.objtNo, 		//장비일련번호 
				custNo				: page.installData.custNo,		//기기고객코드
			},
			_fCallback 	: function(resCES0037) {
				if (cescoUtil.checkResponseError(resCES0037)) 
				{					
					cescoUtil.StorageSet("userInfo", $.extend(userInfo, {cleanerList : resCES0037.body.cleanerList }));		
					
					cescoUtil.windowOpen({
						_sPagePath	: "SET/html/SET_0800.html",
						_bReplace 	: true,
						_oMessage 	: {
							installData : page.installData
						}
					});					
				}
			}
		});*/
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
			_sPagePath	: "SET/html/SET_0204.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	},
};