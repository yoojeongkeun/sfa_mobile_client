page = 
{
	 carcode : 1,
	 UserID : "",	
	 startKm : "",
	 init:function(json)
	 {
		 ipmutil.resetChk();
		 ipmutil.appendCommonMenu();
		 page.UserID = json.UserID;
		 page.initInterface();
		 page.initData(json);
		 page.initLayout();
	 },
	 
	 initInterface:function()
	 {
		 page.LoadCarInfo();
		 
		 $(".txtc_r01").toNum();
		 
		 $("#carcode").toSel();
		 $(".txtc_r01").toSel();
		 
		 if($('#chk').is(':checked')) 
		 { 
			 $(".txtc_r01").attr('readonly', true);
			 $(".btn02").attr('readonly', true);
		 }
		 
		 $(".btn02").click( function() {
			 page.SearchCarList();
		  });
		 
		 $("#chk").click( function() {
			 if($('#chk').is(':checked')) 
			 {
				 $(".txtc_r01").attr('readonly', true);
				 $("#carcode").attr('value', "");
				 $("#carnum").attr('value', "");
				 $(".txtc_r01").attr('value', "");
			 }
			 else 
			 {
				 $(".txtc_r01").attr('readonly', false);
			 }
		  });
		 
	 	  $("#t01New").delegate(".seachdetail", "click", function(){
	 		  $(".seachdetail").removeClass("bg02");
	 		  $(this).addClass("bg02");
	 		 if(!$('#chk').is(':checked'))
 			 {
 			 	$("#carcode").attr('value', $(this).find("#scode").text());
 			 	$("#carnum").attr('value', $(this).find("#snum").text());
 			 	page.carcode = $(this).find("#scode").text();
 			 }
		  });
	 	  
	 	 $("#btnsave").click( function() {
	 		if($('#carcode').val() == page.carcode || $('#chk').is(':checked'))
			{
	 			if(!($('#chk').is(':checked')) && $("#km").val() == "")
	 			 {
		 			bizMOB.Ui.alert("저장실패", "시작km를 등록하여 주십시오.");
	 			 }
		 		 else
	 			 {
		 			page.SearchStartKm();
		 			ipmutil.resetChk();
	 			 }
			}
			else
			{
				bizMOB.Ui.alert("알림", "차량검색 후 선택해주십시오.");
			}
		  });
	 	 
	 	 $("#btndelete").click( function() {
			 page.DeleteStartKm();
		  });
	 },
	 
	 //시작km 차량정보 조회
	 LoadCarInfo : function()
	 {
	 	 var nowDate  = new Date();
	 
	 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00307");
	 	 
		 var cUsrID  =  page.UserID;
		 
		 tr.body.P02 = cUsrID;
		 tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		 
		 bizMOB.Web.post({
			 
				message:tr,
				success:function(json){
					if(json.header.result==true){
						
						if(json.body.R01 != "")
							{
								page.NCarList();
							}
						else
							{
								page.YCarList();
							}
					}
					else{
						
						bizMOB.Ui.alert("조회", json.header.error_text);
					}
				}
			});
				
	 },
	 
	 //이전 등록된 시작km와 등록할 시작km 비교
	 SearchStartKm : function()
	 {
	 	 var nowDate  = new Date();
	 
	 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00308");
		 
		 tr.body.P02 = $("#carcode").val();
		 tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		 
		 bizMOB.Web.post({
			 
				message:tr,
				success:function(json){
					if(json.header.result==true){
						page.startKm = json.body.R01;
						page.lastKm = json.body.R02;
						if(page.lastKm.bMToNumber() >= $("#km").val().bMToNumber() && !($('#chk').is(':checked')))
		 				{
			 				bizMOB.Ui.alert("저장실패", "시작 Km가 이전 최종 Km보다 작거나 같게 입력할 수 없습니다.");
			 				return;
		 				}
						else
						{
							if($("#km").val().bMToNumber() >= $("#lastkm").val().bMToNumber() && !($('#chk').is(':checked')) && $("#lastkm").val().bMToNumber() > 0)
							{
								bizMOB.Ui.alert("저장실패", "최종 Km가 시작 Km보다 작거나 같게 입력할 수 없습니다.");
								return;
							}
							page.SaveStartKm();
						}
					}
					else{
						bizMOB.Ui.alert("조회", json.header.error_text);
					}
				}
			});
				
	 },
		
	 //차량없음 시 조회
	 NCarList : function()
	 {
	 	 var nowDate  = new Date();
	 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00306");
		 tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		 
		 bizMOB.Web.post({
			 
				message:tr,
				success:function(json){
					if(json.header.result==true){
						
						$('#chk').attr('checked', true);
						$("#carcode").attr('value', "");
						$("#carnum").attr('value', "");
						$("#km").attr('value', "");
						$("#km").attr('readonly', true);
						$("#workdate").attr('value', nowDate.bMToFormatDate("yyyy-mm-dd"));
						
					}
					else{
						
						bizMOB.Ui.alert("조회", json.header.error_text);
					}
				}
			});
				
	 },
		
	//차량없음이 아닐 경우 조회
	 YCarList : function()
	 {
	 	 var nowDate  = new Date();
	 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00301");
		 tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		 
		 bizMOB.Web.post({
			 
				message:tr,
				success:function(json){
					if(json.header.result==true){
						
						$('#chk').attr('checked', false);
						$("#carcode").attr('value', json.body.R01);
						$("#carnum").attr('value', json.body.R02);
						$("#workdate").attr('value', nowDate.bMToFormatDate("yyyy-mm-dd"));
						$("#km").attr('value', json.body.R04.bMToCommaNumber());
						$("#km").attr('readonly', false);
						$("#lastkm").attr('value', json.body.R04 == json.body.R05 ? 0 : json.body.R05.bMToCommaNumber());
						$("#lastkm").attr('readonly', false);
						//$("#kmNum").val(json.body.R04.bMToCommaNumber());
						//$("#kmNum").val(json.body.R04.bMToCommaNumber());
						if(json.body.R01 != "")
						{
							page.carcode = json.body.R01;
						}
					}
					else{
						
						bizMOB.Ui.alert("조회", json.header.error_text);
					}
				}
			});
				
	 },
	 
	 //차량 검색
	 SearchCarList : function()
	 {
	 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00401");
	 	 
		 tr.body.P01 = $('#carcode').val();
		 
		 bizMOB.Web.post({
			 
				message:tr,
				success:function(json){
					if(json.header.result==true){
						
						page.renderList(json, "CARLIST");
						
					}
					else{
						
						bizMOB.Ui.alert("조회", json.header.error_text);
					}
				}
			});
				
	 },
		
	 renderList:function(json, listName)
	 {
		// 항목 리스트를 셋팅하기
		var dir = 
		[
		 	{
		 		type:"loop", target:".seachdetail", value:listName,
		 		detail:
	 			[
					{
						type:"single", target:"#scode", value:function(arg)
						{  
							var returnValue = $.trim(arg.item.R01);
							return returnValue;						
						}
					},					
					{
						type:"single", target:"#snum", value:function(arg)
						{
							var returnValue = $.trim(arg.item.R02);
							return returnValue;
						}
					},
					{
						type:"single", target:"#sname", value:function(arg)
						{
							var returnValue = $.trim(arg.item.R03);
							return returnValue;
						}
					}
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"t01New", replace:true };
		// 그리기
		$("#t01").bMRender(json.body, dir, options);
		},
		
	 //시작km 등록
	 SaveStartKm : function()
	 {
		if($('#chk').is(':checked'))
		{
			 var nowDate  = new Date();
		 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00302");
			 tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
			 tr.body.P02 = page.UserID;
			 
			 bizMOB.Web.post({
				 
					message:tr,
					success:function(json){
						if(json.header.result==true){
							
							var button1 = bizMOB.Ui.createTextButton("확인", function()
				                    {
								           bizMOB.Web.close({
								  			 modal : false, 
											 callback : "page.callbackOnClose", 
											 message :
											 {
												 UserID :  page.UserID
											 }
										 });
								           
				                    });
				            bizMOB.Ui.confirm("알림", "시작km가 등록되었습니다.", button1);
							
						}
						else{
							
							bizMOB.Ui.alert("경고", json.header.error_text);
						}
					}
				});
		}	
		else
		{
			if($('#carcode').val() == page.carcode)
			{
				 var nowDate  = new Date();
			 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00303");
			 	 
				 tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
				 tr.body.P03 = $('#carcode').val();
				 tr.body.P05 = $("#km").val().bMToNumber();
				 tr.body.P06 = $("#lastkm").val().bMToNumber();
				 tr.body.P02 = "";
				 tr.body.P04 = "";
				 
				 bizMOB.Web.post({
					 
						message:tr,
						success:function(json){
							if(json.header.result==true){
								
								var button1 = bizMOB.Ui.createTextButton("확인", function()
					                    {
									           bizMOB.Web.close({
									  			 modal : false, 
												 callback : "page.callbackOnClose", 
												 message :
												 {
													 UserID :  page.UserID
												 }
											 });
									           
					                    });
					            bizMOB.Ui.confirm("알림", "시작km가 등록되었습니다.", button1);
								
							}
							else{
								
								bizMOB.Ui.alert("알림", json.header.error_text);
							}
						}
					});
			}
			else
			{
				bizMOB.Ui.alert("알림", "차량검색 후 선택해주십시오.");
			}
		}
		
		
				
	 },
		
	 //시작km 삭제 (시작km를 0 으로 insert)
	 DeleteStartKm : function()
	 {
		if($('#chk').is(':checked')) 
		{
			bizMOB.Ui.alert("알림", "차량없음 상태에서는 삭제 기능이 제공되지 않습니다.");
		}
		else
		{
			if($('#carcode').val() == page.carcode)
			{
				var nowDate  = new Date();
			 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00304");
			 	 
				 tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
				 tr.body.P03 = $('#carcode').val();
				 
				 bizMOB.Web.post({
					 
						message:tr,
						success:function(json){
							if(json.header.result==true){
								var button1 = bizMOB.Ui.createTextButton("확인", function()
					                    {
											page.YCarList();
											ipmutil.resetChk();
					                    });
					            bizMOB.Ui.confirm("알림", "시작km가 삭제되었습니다.", button1);
							}
							else{
								bizMOB.Ui.alert("경고", json.header.error_text);
							}
						}
					});
			}
			else
			{
				bizMOB.Ui.alert("알림", "차량검색 후 선택해주십시오.");
			}
		}
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
			var layout = ipmutil.getDefaultLayout("시작km");
	 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
	 			
	 			$("#_submain").show();
				$("#_menuf").show();
				$("#_menuf").animate({
					left : 0
				}, 500);
	 		   // 메뉴 열림 
	 	         
	 		}}));
	 		
	 		bizMOB.Ui.displayView(layout);
	 }
};

//백버튼 이벤트 / 메인화면 데이터 갱신
function onClickAndroidBackButton() {
	var inputcheck = bizMOB.Storage.get("inputcheck");
	if(inputcheck == null || inputcheck == '0') bizMOB.Web.close({
		 modal : false, 
		 callback : "page.callbackOnClose", 
		 message :
		 {
			 UserID :  page.UserID
		 }
	 });
	var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
		bizMOB.Web.close({
			 modal : false, 
			 callback : "page.callbackOnClose", 
			 message :
			 {
				 UserID :  page.UserID
			 }
		 });
	});      
	var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
		return;     
	});     
	bizMOB.Ui.confirm("페이지 이동", "이 페이지를 벗어나시겠습니까? 수정한 항목은 저장되지 않습니다.", btnConfirm, btnCancel); 
}

