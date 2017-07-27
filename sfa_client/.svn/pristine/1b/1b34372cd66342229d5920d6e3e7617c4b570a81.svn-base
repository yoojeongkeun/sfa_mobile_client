page  =
{
	custCode : "",
	pageType : "",
	init : function(json)
	{
		// 기본 설정값
		ipmutil.appendCommonMenu();
		page.custCode  = json.custCode;
		page.pageType = json.pageType;
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		custInfoMove.init($(".contentsWrap2"), page.custCode, "basic", page.pageType);
	},
	initData:function(json)
	{	
		page.search();
	},
	initLayout:function()
	{
		var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		$("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("고객정보");
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
	search : function()
	{
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00401");
				 
		 tr.body.P01 = page.custCode;				 
				 
		 bizMOB.Web.post({
			 
			message:tr,
			success:function(json){
				if(json.header.result==true){
					
					page.custInfoRender(json, "List01");
					
				}
				else{
					
					bizMOB.Ui.alert("경고", json.header.error_text);
				}
			}
		 });
		 
	},
	custInfoRender:function(json, listName)
	{
		// 항목 리스트를 셋팅하기
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".fieldInfo",
		 		value:listName,
		 		detail:
	 			[
					{type:"single", target:".codename", value:"R01"},
					{type:"single", target:".codevalue", value:"R02"}
					
 		        ]
		 	}
		];
		// 그리기
		$("#tlist01").bMRender(json.body, dir);
		
		var phoneNumber = $($(".codevalue")[4]).text();
		var cellPhoneNumber = $($(".codevalue")[6]).text();
		
		if(phoneNumber != "") $($(".codevalue")[4]).html('<span style="float: left; width: 174px; padding-top: 9px;">' + phoneNumber + '</span><div class="btn_group" phonenumber="' + phoneNumber + '"><button type="button" class="btn_call">전화걸기</button><button type="button" class="btn_sms">문자 보내기</button></div>');
		if(cellPhoneNumber != "") $($(".codevalue")[6]).html('<span style="float: left; width: 174px; padding-top: 9px;">' + cellPhoneNumber + '</span><div class="btn_group" phonenumber="' + cellPhoneNumber + '"><button type="button" class="btn_call">전화걸기</button><button type="button" class="btn_sms">문자 보내기</button></div>');

		$(".btn_call").click(function(){			
			var telnum = $(this).parent().attr("phonenumber").replace(/-/g, "");
            var button1 = bizMOB.Ui.createTextButton("예", function(){
                if (telnum.length > 8) bizMOB.Phone.tel(telnum);
		    });
            var button2 = bizMOB.Ui.createTextButton("아니오", function(){
		        return;
		    });
            
            if (telnum == "")
            {	
            	bizMOB.Ui.alert("알림","고객전화번호가 등록되지 않았습니다.");
            	return;
            }
            
            bizMOB.Ui.confirm("통화", "고객과 통화 하시겠습니까?", button1, button2);
		});
		
		$(".btn_sms").click(function(){			
			var telnum = $(this).parent().attr("phonenumber").replace(/-/g, "");
            var button1 = bizMOB.Ui.createTextButton("예", function(){
            	if (telnum.length > 8) bizMOB.Phone.sms(telnum, "");
		    });
            var button2 = bizMOB.Ui.createTextButton("아니오", function(){
		        return;
		    });
            
            if (telnum == "")
            {	
            	bizMOB.Ui.alert("알림","고객전화번호가 등록되지 않았습니다.");
            	return;
            }
            
            bizMOB.Ui.confirm("SMS", "고객에게 문자메시지를 발송 하시겠습니까?", button1, button2);
		});
	}
};