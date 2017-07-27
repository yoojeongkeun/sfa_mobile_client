page = 
{	 
	custCode: "",
	userId: "",
	Text: "", // 문구
	Code: "", // return
	SurveyCode : "", // 문진코드
	CustName : "", // 고객명
	DiagType : "", // 진단구분	
	AssetCD : "", // 장비일련번호
   SetupDate : "", // 설치일자
   SetupSEQN : "", // 설치순번
   dtStartDate : "", // 시작시간
   Type : "", // 타입
		
	init:function(json)
	{		 
		page.custCode = json.CustCode;
		page.userId = json.UserId;
		page.Text = json.strText;
		page.Code = json.strCode;
		page.SurveyCode = json.strSurveyCode;
		page.CustName = json.strCustName;
		page.DiagType = json.strDiagType;
		
		page.AssetCD = json.strAssetCD;
		page.SetupDate = json.strSetupDate;
		page.SetupSEQN = json.strSetupSEQN;
		page.dtStartDate = json.strdtStartDate;
		page.Type = json.strType;
		
		page.initInterface();
		page.initData(json);
		page.initLayout();
		
		// 문구 변경
		page.setText(page.Text);
		
		// 확인 클릭
		$(".p_btn01").click(function(){
			switch(page.Code){
//			switch("00005"){
			case "00002":		
				bizMOB.Ui.openDialog("sales/html/SD014_POP001.html", {
				       width : "90%",
					   height : "80%",
					   message : {
						   CustCode : page.custCode,
						   UserId : page.userId,
						   strSurveyCode : page.SurveyCode,
						   strCustName : page.CustName,
						   strDiagType : page.DiagType
					   }
					});//	
				bizMOB.Ui.closeDialog();
				break;
			case "00003":
				bizMOB.Native.Browser.open('http://report.cesco.co.kr?cusCode=' + page.custCode +'&mCode='+page.SurveyCode +'&sDate='+page.SetupDate+'&jNum='+page.AssetCD+'&sNum='+ page.SetupSEQN +'&userID='+page.userId+'&startTime='+page.dtStartDate+'&type=' + page.Type);
//				bizMOB.Ui.openDialog("http://112.169.182.131:8089", {
//				       width : "90%",
//					   height : "80%",
//					   message : {
//						   CustCode : $("#t02_txtCustCode").val().trim(),
//						   UserId : bizMOB.Storage.get("UserID")						   				
//					   }
//					});
				bizMOB.Ui.closeDialog();
				break;
			case "00004":	
				bizMOB.Native.Browser.open('http://report.cesco.co.kr?cusCode=' + page.custCode +'&mCode='+page.SurveyCode +'&sDate='+page.SetupDate+'&jNum='+page.AssetCD+'&sNum='+ page.SetupSEQN +'&userID='+page.userId+'&startTime='+page.dtStartDate+'&type=' + page.Type);
				bizMOB.Ui.closeDialog();
				break;
			case "00005":	
				bizMOB.Native.Browser.open('http://report.cesco.co.kr?cusCode=' + page.custCode +'&mCode='+page.SurveyCode +'&sDate='+page.SetupDate+'&jNum='+page.AssetCD+'&sNum='+ page.SetupSEQN +'&userID='+page.userId+'&startTime='+page.dtStartDate+'&type=' + page.Type);
				bizMOB.Ui.closeDialog();
				break;
			}
			
    	});
		
		// 취소 클릭
		$(".p_btn02").click(function(){
			switch(page.Code){
//			switch("00002"){
			case "00002":		
				bizMOB.Ui.closeDialog();
				break;
			case "00003":
				bizMOB.Ui.closeDialog();
				break;
			case "00004":	
				bizMOB.Ui.closeDialog();
				break;
			case "00005":	
				bizMOB.Ui.openDialog("sales/html/SD014_POP001.html", {
				       width : "90%",
					   height : "80%",
					   message : {
						   CustCode : page.custCode,
						   UserId : page.userId,
						   strSurveyCode : page.SurveyCode,
						   strCustName : page.CustName,
						   strDiagType : page.DiagType
					   }
					});
				bizMOB.Ui.closeDialog();
				break;
			}
			
    	});

		$(".btn_close").click(function(){
			bizMOB.Ui.closeDialog();
		});
	},	 
	initInterface:function()
	{
		
	},	 
	
	initData:function(json)
	{
		
	},	
	
	initLayout:function()
	{
		var ID  =  bizMOB.Storage.get("UserID");
		var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
			
	    $("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(ID,IDName,page.custCode,custName,page.workYMD);
		var layout = ipmutil.getDefaultLayout("체크리스트");
 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		}}));
	 	bizMOB.Ui.displayView(layout);
	},
	
	setText: function(strText){		
		$("#_text p").remove();					
		$("#_text").append("<p>" + strText + "</p>");			
    },
 	
};

