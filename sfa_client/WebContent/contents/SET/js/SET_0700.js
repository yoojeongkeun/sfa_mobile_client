/**
 * @author ehpark@mcnc.co.kr
 * @title 인증번호 생성
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
		page.installData = data.installData;
				
		if(!page.installData.authNo) {			
			var no = "", possible = "0123456789";
		    for(var i = 0; i < 4; i++) {
		        no += possible.charAt(Math.floor(Math.random() * possible.length));
		    }		    
			$("#inpAuthNo").val(no);
			
		} else {
			$("#inpAuthNo").val(page.installData.authNo);
		}
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
				
		//다음버튼
		$("#btnNext").click(function() {				
			
			if($("#contentsWrap").bMValidate("check") ) {
				
				 page.installData.authNo = $("#inpAuthNo").val();
				 
				cescoUtil.windowOpen({
					_sPagePath	: "SET/html/SET_0701.html",
					_bReplace 	: true,
					_oMessage 	: {
						installData : page.installData
					}
				});
			}			
		});		

		$("#contentsWrap").bMValidate({
			"rules" : {
				"#inpAuthNo"	: "number::인증번호 숫자 4자리를 입력 하세요.",
				"#inpAuthNo"	: "minLength(4)::인증번호 숫자 4자리를 입력 하세요.",
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
			_sPagePath	: "SET/html/SET_0600.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	},
};