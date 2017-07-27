page  =
{
		
	custCode : "",
	custName : "",
	srNum : "",
	workDate : "",
	freeSRYN : "",
	init : function(json)
	{	
		// 기본 설정값
		ipmutil.resetChk();
		//page.custCode = "AC3208"; // 운영시 삭제
		SRMovePage.serviceRegist(); // 상당 카테고리 이동 
		page.custCode = bizMOB.Storage.get("custCode");
		page.workDate = bizMOB.Storage.get("workYMD");
		page.srNum = bizMOB.Storage.get("srNum");
		
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{		
		page.MoniComp();
		page.MoniList();
		
		$("#list01").click(function() {

			bizMOB.Web.open("monitoring/html/CM030.html", {
				modal : false,
				replace : false

			});
		});
		/*$("#list02").click(function() {

			bizMOB.Web.open("monitoring/html/CM033.html", {
				modal : false,
				replace : false,
				 message : {
					 		srNum :  page.srNum 
				 		  , custCode : page.custCode 
				 		  , workDate : page.workDate
				 		  }
			});
		});
		$("#list03").click(function() {

			bizMOB.Web.open("monitoring/html/CM037.html", {
				modal : false,
				replace : false

			});
		});
		$("#list04").click(function() {

			bizMOB.Web.open("monitoring/html/CM042.html", {
				modal : false,
				replace : false

			});
		});
		$("#list05").click(function() {

			bizMOB.Web.open("monitoring/html/CM046.html", {
				modal : false,
				replace : false

			});
		});*/
		
		$("#list02").click(function() {
			bizMOB.Web.open("monitoring/html/CM099.html", {
				message : {
			 		srNum :  page.srNum,
			 		custCode : page.custCode,
			 		workDate : page.workDate,
			 		mntType : "1"
		 		}
			});
		});
		$("#list03").click(function() {
			bizMOB.Web.open("monitoring/html/CM099.html", {
				message : {
			 		srNum :  page.srNum,
			 		custCode : page.custCode,
			 		workDate : page.workDate,
			 		mntType : "2"
		 		}
			});
		});
		$("#list04").click(function() {
			bizMOB.Web.open("monitoring/html/CM099.html", {
				message : {
			 		srNum :  page.srNum,
			 		custCode : page.custCode,
			 		workDate : page.workDate,
			 		mntType : "4"
		 		}
			});
		});
		$("#list05").click(function() {
			bizMOB.Web.open("monitoring/html/CM099.html", {
				message : {
			 		srNum :  page.srNum,
			 		custCode : page.custCode,
			 		workDate : page.workDate,
			 		mntType : "7"
		 		}
			});
		});
		
		$("#btnBarcode").click(function(){	
			//page.barcodeMove('A1009191209110526');//C1009191209110526
			bizMOB.Native.qrAndBarCode.open(function(arg){
				page.barcodeMove(arg.message);
			});			
		});
		
		$("#btnBarcodeInput").click(function(){
			bizMOB.Ui.openDialog("monitoring/html/CM064.html", {width: "95%", height: "30%"});
		});
	},
	initData:function(json)
	{
		
	},
	initLayout:function()
	{
		var IDName  =  bizMOB.Storage.get("UserName");
 		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID  =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
 		
 		$("#subname").text(IDName);
 		
 		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
 		var layout = ipmutil.getDefaultLayout(custName+"("+ custCode +")");
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
	barcodeMove: function(barcodeNum){
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM06201");
	
		//barcodeNum = 'C1009191209110526';// 운영시 삭제해야 함 and 바코드 첫 자리에 영문자가 오는지 확인해야 함
    	tr.body.P01 = barcodeNum;
		
		
    	bizMOB.Web.post({
    		message:tr,
    		success:function(json){
    			if(json.header.result==false){
    				bizMOB.Ui.alert("조회내역", json.header.error_text );
    			}
				else {
					//Mouse Trap ThunderBlue Insect General
					
					switch(json.body.R22){
						case "General" :
							page.barcodeOpen("37", barcodeNum); // 30							
							break;
						case "Insect" :
							page.barcodeOpen("33", barcodeNum);
							break;
						case "Mouse" :
							page.barcodeOpen("37", barcodeNum);
							break;
						case "Trap" :
							page.barcodeOpen("43", barcodeNum);
							break;
						case "ThunderBlue" :
							page.barcodeOpen("46", barcodeNum);
							break;							
						default:
							bizMOB.Ui.alert("구분이 잘못된 바코드입니다.");
							break;
					}
				}
			}
		});
	},
	barcodeOpen: function(pageNum, barcodeNum){
		bizMOB.Web.open("monitoring/html/CM0" + pageNum + ".html", {
			modal : false,
			replace : false,
			message: {
				custCode: page.custCode,
				custName: "",
				AsstNum: barcodeNum,
				workDate: page.workDate,
				srNumber: page.srNum
			}
		});
	},
	MoniComp : function()
	{
	 	 var nowDate  = new Date();
	 
	 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM02902");
		 
	 	 tr.body.P02 = nowDate.bMToFormatDate("yyyymmdd");
		 tr.body.P01 = "";
		 
		 bizMOB.Web.post({
			 
				message:tr,
				success:function(json){
					if(json.header.result==true){
						
						if(json.body.R01 == "0")
						{
							//$("#01").toggleClass('red');
							$("#01").attr('class',"cust_stat red");
							$("#01").html("미완료");
						}
						else
						{
							$("#01").removeClass('red');
							$("#01").html("완료");
						}
						if(json.body.R02 == "0")
						{
							$("#02").attr('class',"cust_stat red");
							$("#02").html("미완료");
						}
						else
						{
							$("#02").removeClass('red');
							$("#02").html("완료");
						}
						if(json.body.R03 == "0")
						{
							$("#03").attr('class',"cust_stat red");
							$("#03").html("미완료");
						}
						else
						{
							$("#03").removeClass('red');
							$("#03").html("완료");
						}
						if(json.body.R04 == "0")
						{
							$("#04").attr('class',"cust_stat red");
							$("#04").html("미완료");
						}
						else
						{
							$("#04").removeClass('red');
							$("#04").html("완료");
						}
						if(json.body.R05 == "0")
						{
							$("#05").attr('class',"cust_stat red");
							$("#05").html("미완료");
						}
						else
						{
							$("#05").removeClass('red');
							$("#05").html("완료");
						}
						
					}
					else{
						bizMOB.Ui.alert("조회", json.header.error_text);
					}
				}
			});
				
	 },
	MoniList : function()
	{
	 	 var nowDate  = new Date();
	 
	 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM02901");
		 
		 tr.body.P02 = nowDate.bMToFormatDate("yyyymmdd");
		 tr.body.P01 = page.custCode;
		 
		 bizMOB.Web.post({
			 
				message:tr,
				success:function(json){
					if(json.header.result==true){
						
						$(".list01").show();
						
						if(json.body.R01 == "0")
						{
							$("#list02").hide();
						}
						if(json.body.R02 == "0")
						{
							$("#list03").hide();
						}
						if(json.body.R03 == "0")
						{
							$("#list04").hide();
						}
						if(json.body.R04 == "0")
						{
							$("#list05").hide();
						}
						
					}
					else{
						
						bizMOB.Ui.alert("조회", json.header.error_text);
					}
				}
			});
				
	 },
	 callbackOnSearch : function(){
		    
			page.custCode = bizMOB.Storage.get("custCode");
			page.workDate = bizMOB.Storage.get("workYMD");
			page.srNum = bizMOB.Storage.get("srNum");
			
		    page.MoniComp();
		    page.MoniList();
	 }
	 
};