page = 
{	 
		custCode: "",
	 	userId: "",
	 	Text: "", // 문구
	 	Code: "", // return
	 	SurveyCode : "", // 문진코드
	 	CustName : "", // 고객명
	 	DiagType : "", // 진단구분	

	init:function(json)
	{		 
		page.initInterface();
		page.initData(json);
		page.initLayout();
		
		var nowDate  = new Date();
		$("#t03_calDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
		$("#t01_calDay").val(nowDate.bMToFormatDate("yyyy-mm-dd"));		
	},	 
	initInterface:function()
	{
		$(".p_btn01").click(function(){
			page.Save();    		
    	});
		
		 $("#t01_selDeType").change(function(){			 
			 page.setTypeMediumCombobox();
			 page.setSchedule();
		 });
		 
		 $("#t03_fromTime").click(function() {
			 
			//var bool = true;

			if($("#t04_selDeType").val().trim() == "")
 			{
 				bizMOB.Ui.alert("안내", "설치형태를 선택해 주시기 바랍니다.");
 				//bool = false;
 				return;
 			}		
			 	
			//if(bool)
 			//{
				//page.setTime();
 			//}		
		 });
		 
		 $("#t03_fromTime").change(function() {
			 page.setTime();
		 });
		 
		 $("#t04_selDeType").change(function() {		 
			 if($(this).val().trim() != ""){
				 $("#t03_fromTime").removeAttr("readonly");
			 }else{
				 $("#t03_fromTime").attr("readonly", "");
			 }
			 page.setTime();
	 				
	     });
		 
		 $(".btn_close").click(function() {
			 bizMOB.Ui.closeDialog();
		 });
		 
		 page.setDateTime("#t03_calDay", "#t03_btnCal");
		 page.setDateTime("#t01_calDay", "#t01_btnCal");		 
		 		 
		 $('#_Schedule').delegate('.sld_btn', 'click', function(){
/*			//alert($(this).children('.list_top'));
			var top = $(this).children('.list_top');
			var bottom = $(this).children('.list_bottom');
			if (bottom.is(':hidden')) {
				$('.schedule_wrap li').removeClass('on');
				$('.list_bottom').slideUp();
				top.parent('li').addClass("on");
				bottom.slideDown();
			} else {
				top.parent('li').removeClass("on");
				bottom.slideUp();
			}
			return false;*/
			 var row = $(this).parent().parent().find(".list_bottom"); 
			 row.toggle();
			 if(row.is(":visible")){
				 $(this).parents("li").addClass("on");	 
			 }else{
				 $(this).parents("li").removeClass("on");
			 }
			 
		});
	},	 
	
	initData:function(json)
	{
		page.custCode = json.CustCode;
 		page.userId = json.UserId;
 		page.Text = json.strText;
 		page.Code = json.strCode;
 		page.SurveyCode = json.strSurveyCode;
 		page.CustName = json.strCustName;
 		page.DiagType = json.strDiagType;
		page.getCheckListGroup();
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
	
	setTime: function(){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01337");
		tr.body.P01 = $("#t03_calDay").val() + " " + $("#t03_fromTime").val(); // 시작시간
		tr.body.P02 = $("#t04_selDeType").val(); // 설치형태
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					list = json.body;		
					
					var listCode1 = list.LIST01;
					$("#t01_calDay").val(listCode1[0].R01); //  종료시간				
					$("#t01_fromTime").val(listCode1[0].R02);// 종료시간
				}
			}
		});
    },
	
	Save: function(){		
		var bool = true;
		if($("#t01_selDeType").val().trim() == "")
		{
			bizMOB.Ui.alert("안내", "진단구분을 선택해 주시기 바랍니다.");
			bool = false;
			return;
		}
		
		if($("#t02_selDeType option:checked").text().trim() == "")
		{
			bizMOB.Ui.alert("안내", "장비번호를 선택해 주시기 바랍니다.");
			bool = false;
			return;
		}
		
		if($("#t03_selDeType").val().trim() == "")
		{
			bizMOB.Ui.alert("안내", "설치구획을 선택해 주시기 바랍니다.");
			bool = false;
			return;
		}
		
		if($("#t04_selDeType").val().trim() == "")
		{
			bizMOB.Ui.alert("안내", "설치형태를 선택해 주시기 바랍니다.");
			bool = false;
			return;
		}
		
		if($('input:checkbox[id="agreeOk"]').is(":checked") != true)
		{
			bizMOB.Ui.alert("안내", "상기 주의사항을 확인 체크해주시기 바랍니다.");
			bool = false;
			return;
		}
		
		if(bool)
		{
			var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01336");	
			
			tr.body.P01 = $("#_CustCode").text();
			tr.body.P02 = $("#t02_selDeType option:checked").text(); // 장비번호
			tr.body.P03 = $("#t03_calDay").val() + " " + $("#t03_fromTime").val(); // 시작시간
			tr.body.P04 = $("#t01_calDay").val() + " " + $("#t01_fromTime").val(); // 종료시간
			tr.body.P05 = $("#t04_selDeType").val(); // 설치형태
			tr.body.P06 = $("#t03_selDeType").val(); //설치구획
			tr.body.P07 = page.userId; // 사용자		
			tr.body.P08 = $("#t02_selDeType").val(); // 수불번호		
			
			bizMOB.Web.post({
				message: tr,
				success: function(json){
					if(!json.header.result){
						bizMOB.Ui.alert("안내", "저장에 실패하였습니다.");
						return;
					}	
					else {					
						
						list = json.body;								
						
						var listCode1 = list.LIST01;
						var sResult = listCode1[0].R03;
						if(sResult == "Y")
						{
							if($("#t04_selDeType").val() == "DT01")
							{
								bizMOB.Ui.toast("저장하였습니다.");
								
								var sDate = listCode1[0].R01;
								var sNum = listCode1[0].R02;
								
								
								bizMOB.Native.Browser.open('http://report.cesco.co.kr?cusCode='+ page.custCode +'&mCode='+page.SurveyCode +'&sDate='+sDate+'&jNum='+$("#t02_selDeType option:checked").text().trim()+'&sNum='+ sNum +'&userID='+page.userId+'&startTime='+$("#t03_calDay").val() + " " + $("#t03_fromTime").val()+'&type=');
								bizMOB.Ui.closeDialog();
							}
							else
							{
								bizMOB.Ui.alert("안내", "공기질 " + $("#t04_selDeType option:checked").text() + " 진단을 위한 IAQ 장비 등록이 되었습니다.");
								return;
							}							
						}
						else
						{
							bizMOB.Ui.alert("안내", sResult);
							return;
						}
					}				
					
	//				bizMOB.Ui.openDialog("sales/html/SD014_POP002.html", {
	//			       width : "90%",
	//				   height : "80%",
	//				   message : {
	//					   CustCode : $this.parent().parent().parent().parent().find(".t01_CustCode").text(),
	//					   UserId : bizMOB.Storage.get("UserID")
	//				   }
	//				});	
				}
			});		
		}
		
	},
	
	setDateTime: function(txtName, btnName){
		
		var bool = true;
		
		$(btnName).click(function(){	
			if($("#t04_selDeType").val().trim() == "")
			{
				bizMOB.Ui.alert("안내", "설치형태를 선택해 주시기 바랍니다.");
				bool = false;
				return;
			}		
			$(txtName).focus();
		});		
		
		if(bool)
		{
			var option = cescommutil.datePickerOption(function(date){						
					page.setTime();				
				}, "yy-mm-dd"		 			
			);
		}
		
		$(txtName).datepicker(option);
	},
	
	setTypeMediumCombobox: function(){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01334");
//		tr.body.P01 = $("#t01_selDeType").val();
		tr.body.P01 = "DS02";
		tr.body.P02 = page.userId;
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					list = json.body;
					
					$("#t02_selDeType option").remove();
					
					var listCode1 = list.LIST01;

					for ( var i = 0; i < listCode1.length; i++) {
						$("#t02_selDeType").append(
								"<option value='" + listCode1[i].R01 + "'>" + listCode1[i].R02 + "</option>");
					}					
				}
			}
		});
    },
    
    setSchedule: function(){		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01335");
		tr.body.P01 = $("#t01_selDeType").val();
		tr.body.P02 = "DI";
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					list = json.body;
					
					$("#_Schedule li").remove();
					
					var listCode1 = list.LIST01;

					for ( var i = 0; i < listCode1.length; i++) {
						$("#_Schedule").append(
//								"<option value='" + listCode1[i].R01 + "'>" + listCode1[i].R02 + "</option>");
						"<li>" + 
							"<div class='list_top'>" + 
								"<h3><span>" + listCode1[i].R01 + "</span></h3>" + 
								"<button class='sld_btn'>열기/닫기</button>" + 
							"</div>" + 
							"<div class='list_bottom'>" + 
								"<div class='box'>" + 
									"<p>" + 
									listCode1[i].R02 +  
									"</p>" + 
								"</div>	" + 
							"</div>" + 
						"</li>");
					}					
				}
			}
		});
    },
    
	getCheckListGroup: function(){
		
		var CustCode = page.custCode;//"AJ2555";
		var custName = page.CustName;
		$("#_CustCode").text(CustCode);
		$("#_CustName").text(custName);
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01333");
		tr.body.P01 = "";
		tr.body.P02 = "";
		tr.body.P03 = "";
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					list = json.body;
					list1 = json.body;
					list2 = json.body;
					
					$("#t01_selDeType option").remove();
					$("#t03_selDeType option").remove();
					$("#t04_selDeType option").remove();
					
					var listCode1 = list.LIST01;

					for ( var i = 0; i < listCode1.length; i++) {
						$("#t01_selDeType").append(
								"<option value='" + listCode1[i].R01 + "'>" + listCode1[i].R02 + "</option>");
					}
					
					var listCode2 = list1.LIST02;

					for ( var i = 0; i < listCode2.length; i++) {
						$("#t03_selDeType").append(
								"<option value='" + listCode2[i].R01 + "'>" + listCode2[i].R02 + "</option>");
					}
					
					var listCode3 = list2.LIST03;

					for ( var i = 0; i < listCode3.length; i++) {
						$("#t04_selDeType").append(
								"<option value='" + listCode3[i].R01 + "'>" + listCode3[i].R02 + "</option>");
					}			
					
				}
			}
		});		
	}, 	
};


//백버튼 이벤트 / 메인화면 데이터 갱신
function onClickAndroidBackButton() {
	
}

