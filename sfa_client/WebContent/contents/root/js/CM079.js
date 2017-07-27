page  =
{
	UserID : "",	
	Pagepath:"page.SetCarNm",
	Hide : "",
	CarCode : "",
		
	init : function(json)
	{
		ipmutil.resetChk();
		ipmutil.appendCommonMenu();
		page.UserID = json.UserID;
		page.initInterface();
		page.initData(json);
		page.initLayout();
		ipmutil.setAllSelect(document, "input", "click");
		
	},
	initInterface:function()
	{
		$('.btn02').click(function(){
			 
			page.CarlistCheck();
			
		});
		
		$('#btnHide').click(function(){
			
			if(page.Hide == "1")
			{
				$(".hideArea").show();
				page.Hide = "0";
				$("#list").css("margin-top", "370px");
			}
			else
			{
				$(".hideArea").hide();
				page.Hide = "1";
				$("#list").css("margin-top", "142px");
			}
		});
		
		$("#contlistnew").delegate("#conBody", "click", function() {
			$("#contlistnew #conBody").removeClass('bg02');
			$(this).toggleClass('bg02');
			
			page.SetData($(this));
		});
		
		$('#btnDel').click(function(){
			if($("#contlistnew").find(".bg02").length > 0)
			{
				var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
					page.DeleteData();
				});
				var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
					return;
				});
				bizMOB.Ui.confirm("삭제", "선택한 데이터를 삭세하시겠습니까?", btnConfirm, btnCancel);
			}
			else
				bizMOB.Ui.alert("알림", "삭제할 데이터를 선택해주세요.");
			
		});
		
		$('#btnInsert').click(function(){
			if($("#FuelAmt").val().bMToNumber() == 0 && $("#WashAmt").val().bMToNumber() == 0)
			{
				bizMOB.Ui.alert("알림", "주유비나 세차비를 입력하여 주십시오.");
				return; 
			}
			
			if($("#carcode").val().length != 6 || $("#carnum").val().length < 5 || page.CarCode != $("#carcode").val())
			{
				bizMOB.Ui.alert("알림", "차량코드를 확인해주십시오.");
				return; 
			}
			
			if($("#contlistnew").find(".bg02").length > 0)
			{
				var btnConfirm = bizMOB.Ui.createTextButton("신규", function() {
					$("#FuelSeq").val("");
					$("#WashSeq").val("");
					page.FuelStChk($("#carcode").val(), $("#FuelStation").val(), "n");
				});
				var btnCancel = bizMOB.Ui.createTextButton("수정", function() {
					page.FuelStChk($("#carcode").val(), $("#FuelStation").val(), "y");
				});
				bizMOB.Ui.confirm("등록", "선택한 데이터를 수정하시겠습니까?\n신규등록시 신규버튼을 눌러주십시오.", btnConfirm, btnCancel);
			}
			else
				page.FuelStChk($("#carcode").val(), $("#FuelStation").val(), "n");
		});
	},
	initData:function(json)
	{
		page.FuelStationCombo();
		
		page.CarList();
		page.FuelList();
		page.SetData("empty");
	},
	initLayout:function()
	{
		var IDName    =  bizMOB.Storage.get("UserName");
 		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
 		
 		$("#subname").text(IDName);
 		
 		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
 		var layout = ipmutil.getDefaultLayout("주유세차비등록");
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
	
	CarList : function()
	{
	 	 var nowDate  = new Date();
	 	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00301");
		 tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		 
		 bizMOB.Web.post({
			 
				message:tr,
				success:function(json){
					if(json.header.result==true){
						$("#carcode").attr('value', json.body.R01);
						$("#carnum").attr('value', json.body.R02);
						page.CarCode = json.body.R01;
					}
					else{
						
						bizMOB.Ui.alert("조회", json.header.error_text);
					}
				}
			});
				
	},
	
	CarlistCheck:function()
	{
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00401");
		tr.body.P01 = $('#carcode').val();
	   
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					return;
				}
				
				if(json.body.CARLIST.length > 1)
				{
						bizMOB.Ui.openDialog("root/html/CM080.html", 
						{
				           message:  {Carcode : $('#carcode').val() ,Pagepath : page.Pagepath},
				           width : "80%",
					       height : "70%",
						});
				}
				else
				{			
					$("#carcode").attr('value', json.body.R01);
					$("#carnum").attr('value', json.body.R02);
				}
				
			}
		});
		
	},
	SetCarNm:function(json)
	{
		$("#carcode").attr('value', json.carCode);
		$("#carnum").attr('value', json.carName);
		page.CarCode = json.carCode;
		
		page.FuelStationCombo();
		page.FuelList();
		page.SetData("empty");
	},
	
	FuelStationCombo:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07901");
		tr.body.P01 = bizMOB.Storage.get("deptCode");
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#FuelStation option").remove();
					var listCode = json.body.LIST;

					for ( var i = 0; i < listCode.length; i++) {
						$("#FuelStation").append(
								"<option value='" + listCode[i].R01 + "'>"
										+ listCode[i].R02 + "</option>");
					}
				}
			}
		});
		
	},
	FuelList:function()
	{
		var nowDate  = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07904");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		//tr.body.P01 = "20140813";
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				
				page.renderList(json, "LIST");
			}
		});
		
	},
	renderList:function(json, listName)
	{
		// 항목 리스트를 셋팅하기
		var dir = 
			[
			 	{
			 		type:"loop",
			 		target:"#conBody",
			 		value:listName,
			 		detail:
					[
					 	{type:"single", target:".StName", value:"R01"},
					 	{type:"single", target:".FuelQty", value:function(arg)
    						{ 
					 			return (arg.item.R02.bMToNumber() + "").bMToCommaNumber(); 
    						} },
					 	{type:"single", target:".FuelAmt", value:function(arg)
        						{ 
					 			return (arg.item.R03.bMToNumber() + "").bMToCommaNumber(); 
							} },
					 	{type:"single", target:".WashType", value:"R11"},
					 	{type:"single", target:".WashAmt", value:function(arg)
    						{ 
					 			return (arg.item.R05.bMToNumber() + "").bMToCommaNumber(); 
							} },
					 	{type:"single", target:".r06", value:"R06"},
					 	{type:"single", target:".r07", value:"R07"},
					 	{type:"single", target:".r08", value:"R08"},
					 	{type:"single", target:".r09", value:"R09"},
					 	{type:"single", target:".r10", value:"R10"},
					 	{type:"single", target:".r11", value:"R04"},
			        ]
			 	}
			];
		 
			// 그리기
		var options = { clone:true, newId:"contlistnew", replace:true };
		$("#contlist").bMRender(json.body, dir, options);
	},
	
	SetData:function(select)
	{
		if(select == "empty")
		{
			$("#FuelQty").val("");
			$("#FuelAmt").val("");
			$("#CarWashType").val("001");
			$("#WashAmt").val("");
			$("#FuelSeq").val("");
			$("#WashSeq").val("");
		}
		else
		{
			$("#carcode").val(select.find(".r09").text());
			$("#carnum").val(select.find(".r10").text());
			$("#FuelStation").val(select.find(".r08").text());
			$("#FuelQty").val(select.find(".FuelQty").text());
			$("#FuelAmt").val(select.find(".FuelAmt").text());
			$("#CarWashType").val(select.find(".r11").text());
			$("#WashAmt").val(select.find(".WashAmt").text());
			$("#FuelSeq").val(select.find(".r06").text());
			$("#WashSeq").val(select.find(".r07").text());
			page.CarCode = select.find(".r09").text();
		}
	},
	
	SaveData:function()
	{
		var nowDate  = new Date();
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07902");
		tr.body.P01 = $("#carcode").val();
		tr.body.P02 = nowDate.bMToFormatDate("yyyymmdd");
		tr.body.P04 = $("#FuelSeq").val() == "" ? -1 : $("#FuelSeq").val().bMToNumber();
		tr.body.P05 = $("#FuelStation").val();
		tr.body.P06 = $("#FuelQty").val().bMToNumber();
		tr.body.P07 = $("#FuelAmt").val().bMToNumber();
		tr.body.P09 = $("#WashSeq").val() == "" ? -1 : $("#WashSeq").val().bMToNumber();
		tr.body.P10 = $("#CarWashType").val();
		tr.body.P11 = $("#WashAmt").val().bMToNumber();
		
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if (json.header.result == false) {
					bizMOB.Ui.alert("저장오류", json.header.error_text);
				} else {
					bizMOB.Ui.alert("저장", "저장되었습니다.");
					page.initData(json);
				}
			}
		});
		
	},
	
	DeleteData:function()
	{
		var nowDate  = new Date();
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM07903");
		tr.body.P01 = $("#carcode").val();
		tr.body.P02 = nowDate.bMToFormatDate("yyyymmdd");
		tr.body.P04 = $("#FuelSeq").val() == "" ? -1 : $("#FuelSeq").val().bMToNumber();
		tr.body.P05 = $("#WashSeq").val() == "" ? -1 : $("#WashSeq").val().bMToNumber();
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if (json.header.result == false) {
					bizMOB.Ui.alert("삭제오류", json.header.error_text);
				} else {
					bizMOB.Ui.alert("삭제", "삭제되었습니다.");
					page.initData(json);
				}
			}
		});
		
	},
	
	FuelStChk:function(carcode, fuelst, select) //select "y"이면 선택한 데이터는 제외 체크
	{
		var data = $("#contlistnew #conBody");
		var yn = "y";
		
		if(select == "y")
		{
			for( var i = 0; i < data.length; i++) {
				if($(data[i]).find(".r09").text() == carcode && $(data[i]).find(".r08").text() == fuelst && $(data[i]).find(".r08").text() != $("#contlistnew").find(".bg02").find(".r08").text())
				{
					yn = "n";
				}
			}
		}
		else
		{
			for( var i = 0; i < data.length; i++) {
				if($(data[i]).find(".r09").text() == carcode && $(data[i]).find(".r08").text() == fuelst)
				{
					yn = "n";
				}
			}
		}
		
		if(yn == "y")
			page.SaveData();
		else
		{
			bizMOB.Ui.alert("저장오류", "차량, 주유소가 같은 데이터가 이미 등록되어 있습니다.");
			return;
		}
	},
};