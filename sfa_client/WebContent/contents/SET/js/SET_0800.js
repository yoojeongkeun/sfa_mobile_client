/**
 * @author ehpark@mcnc.co.kr
 * @title 설치완료
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
		
		if(page.installData.mainYN == "Y") {
			$("#mainUserStep").show();
		} else {
			$("#secondaryUserStep").show();
		}
		
		$("#contentsWrap").bMRender(data.installData, [ 
    		{ "type" : "single", "target" : "#productImages@src", 		"value" : function(arg) {
    			return CESCO_CONST.DEVICE_TYPE[arg.item.deviceType] ?
    					CESCO_CONST.DEVICE_TYPE[arg.item.deviceType].modelImage : "";
    		} },         		
   	    ]);
	},

	initInterface : function() 
	{
		//완료
		$("#btnNext").click(function() {						
			//cescoUtil.windowClose({});
			bizMOB.Web.open("root/html/CM002.html", { 
				message : 
				   	{
				   	   UserID  :  bizMOB.Storage.get("UserID")
				   	},
				modal:false,
		        replace:false
			}); 
		});
		
		//이미지없음
		$("#productImages").error(function() {	
			$(this).removeAttr("src").attr("alt", "제품 이미지가 없습니다.");
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
		var isAndroid = bizMOB.Device.isAndroid();	
		
		if( isAndroid ) {
			//바코드, NFC 선택
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0200.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
			
		} else {
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0202.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
		}
	},
};