/**
 * @author ehpark@mcnc.co.kr
 * @title 설치완료 데이터 수신확인
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {

	installData 	: {}, 	//설치정보
	retryCnt 	: 0, 	//데이터 수신확인 재시도 수
	
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
		
		page.reqData();
	},
		
	//데이터수신 확인
	reqData : function()
	{
		$("#resultI").show();
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CES0035");		
		tr.body.deviceID = page.installData.barcode;
		
		bizMOB.Web.post({
			message: tr,
			success: function(resCES0035){
				if (cescoUtil.checkResponseError(resCES0035)) 	{		
					$("#nodata").hide();
					$("#resultS, #btnNext").show();
					page.renderData(resCES0035.body.measureList);
					
				} else {
					$("#nodata").show();			
					
					if(page.retryCnt == 3) {
						$("#resultR, #btnBack").show();			
						
					} else {			
						$("#resultF").show();						
						setTimeout(function() {
							$("#btnReflash").show();
						}, 1000*60);						
					}
				}
				
				$("#resultI").hide();
			}
		});
		
		/*bizMOB.Network.requestTr({
			_sTrcode 	: "CES0035",
			_oBody 		: {
				deviceID : page.installData.barcode
			},
			_fCallback 	: function(resCES0035)
			{
				if (cescoUtil.checkResponseError(resCES0035)) 	{		
					$("#nodata").hide();
					$("#resultS, #btnNext").show();
					page.renderData(resCES0035.body.measureList);
					
				} else {
					$("#nodata").show();			
					
					if(page.retryCnt == 3) {
						$("#resultR, #btnBack").show();			
						
					} else {			
						$("#resultF").show();						
						setTimeout(function() {
							$("#btnReflash").show();
						}, 1000*60);						
					}
				}
				
				$("#resultI").hide();
			}
		});*/
	},
	
	//수신확인결과 랜더
	renderData : function(list)
	{
		var dir = [ {
			"type" 	: "loop",
			"target" 	: ".record",
			"value" 	: ".",
			"detail" 	: [ 
			     { "type" : "single", "target" : ".indexName", 				"value" : "indexName" },
			     { "type" : "single", "target" : ".indexMeasure", 			"value" : "indexMeasure" },
			     { "type" : "single", "target" : ".isSuccess@class+", 	"value" : function(arg) {			    	 
			    	 if(arg.item.isSuccess) {
			    		 $(arg.element).text("수신 양호");
			    		 return " checkIcon";
			    	 } else {
			    		 $(arg.element).text("수신 불가");
			    		 return " imposIcon";
			    	 }
			     } },
			     { "type" : "single", "target" : ".isSuccess+", 	"value" : function(arg) {			    	 
			    	 if(arg.item.isSuccess) {			    		 
			    		 return "수신 양호";
			    	 } else {			    		 
			    		 return "수신 불가";
			    	 }
			     } },
			  ]
		}];
		$("#listTemplate").bMRender(list, dir, { clone : true, 	newId : "list",	replace : true 	});
	},

	initInterface : function() 
	{
		//재시도 버튼
		$("#btnReflash").click(function() {	
			$("#resultI").show();
			$("#resultF, #btnReflash").hide();
			
			if(page.installData.mainYN == "Y") {
				page.retryCnt++;
			}
			page.reqData();
		});
		
		//재설치 버튼
		$("#btnBack").click(function() {
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0300.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
		});
		
		//다음 버튼
		$("#btnNext").click(function() {		
			cescoUtil.windowOpen({
				//_sPagePath	: "SET/html/SET_0600.html",
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
			_sPagePath	: "SET/html/SET_0502.html",
			_bReplace 	: true,
			_oMessage 	: {
				installData : page.installData
			}
		});
	},
};