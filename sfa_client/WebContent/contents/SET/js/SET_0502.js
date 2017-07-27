/**
 * @author ehpark@mcnc.co.kr
 * @title wifi연결안내
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
		//다음버튼
		/*$("#btnNext").click(function() {
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0800.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
		});*/
		$("#btnNext").click(function() {
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0503.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
		});
	},
			
	initLayout : function() 
	{	
		var layout = new bizMOB.Ui.PageLayout();
		var titlebar = new bizMOB.Ui.TitleBar("설치하기");
		titlebar.setBackGroundImage("common/images/bg_titlebar.png");
		titlebar.setTopLeft(bizMOB.Ui
				.createButton({
					image_name: "common/images/top_icon_back.png",
					listener: function(){
						onClickAndroidBackButton();
					}
				}));
				

		titlebar.setVisible(true);
		
		titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));
  	  	bizMOB.Ui.displayView(layout);  
		layout.setTitleBar(titlebar);
		
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




//백버튼 이벤트 / 메인화면 데이터 갱신
function onClickAndroidBackButton() {	
	var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
		cescoUtil.windowOpen({
			_sPagePath	: "SET/html/SET_0300.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	});
	var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
		return;
	});
	bizMOB.Ui.confirm("안내", "이전 화면으로는 돌아갈 수 없습니다.\n제품 연결부터 다시 진행해야 합니다.\n다시 진행하시겠습니까?", btnConfirm, btnCancel); 
}
