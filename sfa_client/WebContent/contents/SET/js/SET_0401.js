/**
 * @author ehpark@mcnc.co.kr
 * @title wifi 등록
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
				
		//아디지우기
		$(".btnTxtClear").click(function() {
			$(this).hide().parents(".conInput").find("input").val("");
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

			page.installData.networkName 	= $("#networkName").val().trim(); 
			page.installData.networkPswd 	= $("#networkPswd").val().trim();
			page.installData.securityType	 	= "";
			page.installData.wps					= "";
			
			if(page.installData.networkName == "") {
				cescoUtil.alert.show("네트워크 이름를 입력하세요");
				return
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
				_sPagePath	: "SET/html/SET_0400.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});			
		});
		
		//WPS버튼
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
			_sPagePath	: "SET/html/SET_0300.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	},
};