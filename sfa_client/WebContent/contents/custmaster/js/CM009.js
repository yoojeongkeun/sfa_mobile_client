
page  =
{
	CustCode : "",
	pageType : "",
	init : function(json)
	{		
		page.CustCode = json.custCode;
		page.pageType = json.pageType;
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData();
		page.initLayout();
		
	},
	initInterface:function()
	{
		custInfoMove.init($(".contentsWrap2"), page.CustCode, "vbc", page.pageType);
	},
	initData:function()
	{
		page.Search();
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
	Search:function()
	{
		var nowDate  = new Date();
				 
		nowDate.bMToFormatDate("yyyy-mm-dd");
				 
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00601");
				 
		tr.body.P01 = page.CustCode;
				 
		bizMOB.Web.post({
							message:tr,
							success:function(json){
								if(json.header.result==true){
							    
									page.CustCode = json.body.R01;           // 고객코드
									$("#ContractDate").html(json.body.R02);  // 계약일자
									$(".ContractType").html(json.body.R03);  // 계약유형
									$(".ContractTem").html(json.body.R08);   // 계약기간
									$(".Area1").html(json.body.R04.bMToCommaNumber());         // 면적av평 
									$(".Area2").html(json.body.R05.bMToCommaNumber());         // 면적aM 
									$(".Area3").html(json.body.R06.bMToCommaNumber());         // 면적c평 
									$(".Area4").html(json.body.R07.bMToCommaNumber());         // 면적cm 
									$(".VisitCount").html(json.body.R09);    // 방문주기
									
								    page.renderVbcAmtInfo(json);
								    page.renderVbcEquipInfo(json);
								    page.renderVbcSaleInfo(json);
							}
							else{
								
								bizMOB.Ui.alert("로그인", json.header.error_text);
							}
						}
					});
		 
		
	},
	renderVbcAmtInfo:function(json)
	{
			
		  var dir = 
			[
			 	{
			 		type:"loop",
			 		target:".detail",
			 		value:"VbcAmtInfo",
			 		detail:
		 			[
					    	 			 
                        {type:"single", target:".ContractNm", value:"R07"},
						//{type:"single", target:".Amt1", value:"R04"},
						//{type:"single", target:".Amt2", value:"R06"}
                        {type:"single", target:".Amt1", value:function(arg){
                        	return (arg.item.R04.bMToNumber() + "").bMToCommaNumber();
                        } },
                        {type:"single", target:".Amt2", value:function(arg){
                        	return (arg.item.R06.bMToNumber() + "").bMToCommaNumber();
                        } },
						
	 		        ]
			 	}
			];
			// 반복옵션(이전의 항목을 삭제하는 옵션)
			var options = { clone:true, newId:"RenderListNew", replace:true };
			// 그리기
			$(".RenderList").bMRender(json.body, dir, options);
			
		
				
	},
	renderVbcEquipInfo:function(json)
	{
			
		var dir = 
			[
			 	{
			 		type:"loop",
			 		target:".detail1",
			 		value:"VbcEquipInfo",
			 		detail:
		 			[
					    	 			 
                        {type:"single", target:".EquiNm", value:"R10"},
                        {type:"single", target:".EquiFit", value:"R05"},
						//{type:"single", target:".Amt3", value:"R06"},
						//{type:"single", target:".Amt4", value:"R08"},
                        {type:"single", target:".Amt3", value:function(arg){
                        	return (arg.item.R04.bMToNumber() + "").bMToCommaNumber();
                        } },
                        {type:"single", target:".Amt4", value:function(arg){
                        	return (arg.item.R06.bMToNumber() + "").bMToCommaNumber();
                        } },
                        {type:"single", target:".Amt5", value:function(arg){
                        	return (arg.item.R08.bMToNumber() + "").bMToCommaNumber();
                        } },
						{type:"single", target:".Remark", value:"R09"}
						
	 		        ]
			 	}
			];
			// 반복옵션(이전의 항목을 삭제하는 옵션)
			var options = { clone:true, newId:"RenderListNew1", replace:true };
			// 그리기
			$(".RenderList1").bMRender(json.body, dir, options);	
				
	},
	renderVbcSaleInfo:function(json)
	{
			
		  var dir = 
			[
			 	{
			 		type:"loop",
			 		target:".detail2",
			 		value:"VbcSaleInfo",
			 		detail:
		 			[
					    	 			 
		 			 {type:"single", target:".EquiNm1", value:"R09"},
                     {type:"single", target:".EquiFit1", value:"R04"},
					 //{type:"single", target:".Amt5", value:"R05"},
					 //{type:"single", target:".Amt6", value:"R07"},
                     {type:"single", target:".Amt5", value:function(arg){
                     	return (arg.item.R05.bMToNumber() + "").bMToCommaNumber();
                     } },
                     {type:"single", target:".Amt6", value:function(arg){
                     	return (arg.item.R07.bMToNumber() + "").bMToCommaNumber();
                     } },
					 {type:"single", target:".Remark", value:"R08"}
						
	 		        ]
			 	}
			];
			// 반복옵션(이전의 항목을 삭제하는 옵션)
			var options = { clone:true, newId:"RenderListNew2", replace:true };
			// 그리기
			$(".RenderList2").bMRender(json.body, dir, options);
			
		
	}
	
	
};