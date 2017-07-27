page  =
{		
	custCode:"",	
	init : function(json)
	{		
		page.custCode  = json.CustCode;
		page.initInterface();
		page.initData();
		page.initLayout();		
	},	
	initInterface:function()
	{
		$("#btnClose").click(function(){
			bizMOB.Ui.closeDialog();
		});
		
		$("#btnInput").click(function(){
			//page.checkAndGetPrevChargeList();
			page.getPrevChargeList02();
		});
	},
	initData:function()
	{
		page.setYearMonth();
		
	},
	initLayout:function()
	{
		
	},
	// 매출년월 초기 세팅 
	setYearMonth: function(){
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var nextMonth = nowDate.getMonth() + 2 == 13 ? 1 : nowDate.getMonth() + 2;
		if(nextMonth == 1){			
			year += 1;
		}
		
		$("#selYear").val(year);
		$("#selMonth").val(nextMonth < 10 ? "0" + nextMonth : nextMonth.toString());
	},
/*	// 선청구 체크 및 체크값에 따른 선청구리스트 불러오는 함수
	checkAndGetPrevChargeList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07801");
		
		tr.body.P01 = page.custCode; 
		tr.body.P02 = ""; // 넣지 않아도 됨
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(json.header.result == false){
					bizMOB.Ui.alert("오류", "선청구 확인 오류.");
					return;
				}
				if(json.body.R01 == "0"){ // 리턴값이 0 이면 CESCO_ACCOUNT.dbo.SP_SalesCharge_Closing_INSERT 로직 후 SP_ISC_Realtime_Card_SELECT
					page.getPrevChargeList01();
				}else{ // 0이 아니면 SP_ISC_Realtime_Card_SELECT만
					
				}
			}
		});
	},
	getPrevChargeList01: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07802");
		
		tr.body.P01 = page.custCode;
		tr.body.P02 = $("#selYear").val() + $("#selMonth").val();
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(json.header.result == false){
					bizMOB.Ui.alert("오류", "선청구 리스트(1) 불러오기 오류.");
					return;
				}
				
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "선청구 할 내역이 존재하지 않습니다. 계약정보를 확인하세요.");
					return;
				}
				page.getPrevChargeList02();
				//부모쪽에서 렌더하기
			}
		});
	},*/ //당분간 쓰지 않음
	getPrevChargeList02: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07803");
		
		tr.body.P01 = page.custCode;
		tr.body.P02 = $("#selYear").val() + $("#selMonth").val();
		tr.body.P03 = $("#selMonthCount").val().bMToNumber();
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(json.header.result == false){
					bizMOB.Ui.alert("오류", "선청구 리스트(2) 불러오기 오류.");
					return;
				}
				
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "선청구 할 내역이 존재하지 않습니다. 계약정보를 확인하세요.");
					return;
				}
				
				setTimeout(function(){
					//bizMOB.Ui.closeDialog({ callback: "page.addChemicalListRow("+ json + ")" });
					bizMOB.Ui.closeDialog({ callback: "page.renderPreChargeList", message : json });
				}, 500);
				//부모쪽에서 렌더하기
			}
		});
	},
};