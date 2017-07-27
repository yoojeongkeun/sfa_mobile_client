
page  =
{
	custInfo : "",
	custCode : "",
	custNm : "",
		
	init : function(json)
	{	
		page.custInfo = json.CustInfo;
		page.custCode = json.CustInfo.custCode;
		page.custNm = json.CustInfo.custNm;
		
		page.initInterface();
		page.initData();
		page.initLayout();	
		
		$("#custNm").val("[" + page.custCode + "] " + page.custNm);
	},
	
	initInterface:function()
	{
		$("#btnTabDiv").click(function() 
		{
			bizMOB.Web.open("division/html/IS003.html", 
			{ 
				message : 
		    	{
					CustInfo  :  page.custInfo
		    	},
		    	modal:false,
		    	replace:false
			});
		});
		
		$("#list01New").delegate(".dTr", "click", function()
		{
			$("#list01New .largeTableContents").hide();
			var $contents = $(this).parent().find(".largeTableContents");			
			if($contents.parent().find(".dTr").hasClass("on"))
			{
				$contents.parent().find(".dTr").removeClass('on');
				$contents.hide();
				return;
			}
			else
				$contents.show();			
			
			$(".largeNameContents").find(".dTr").removeClass('on');
			$contents.parent().find(".dTr").toggleClass('on');
			
			var loadyn = $contents.attr("load");
			
			if (loadyn === "Y") return;
			
			page.getDivList($contents.parent().find(".DivVer").text(), $contents);
		});
		
		$("#list01New").delegate(".middleNameContents", "click", function()
		{
			$("#list01New .middleTableContents").hide();
			
			var $contents = $(this).parent().find(".middleTableContents");
			
			if($contents.parent().find(".divTr").hasClass("on"))
			{
				$contents.parent().find(".divTr").removeClass('on');
				$contents.hide();
				return;
			}
			else
				$contents.show();
			
			$(".middleNameContents").removeClass('on');
			$contents.parent().find(".divTr").toggleClass('on');			
			
			var loadyn = $contents.attr("load");			
			if (loadyn === "Y") return;
			
			page.getHisList($(".dTr.on").find(".DivVer").text(), "CS005" ,$contents.parent().find(".p20").text().substring(0, 4), $contents, $contents.parent().find(".p20").attr("divsenum"));			
		
		});
	},
	
	initData:function()
	{
		page.getVerList();
	},
	
	initLayout:function()
	{
		var layout = ipmutil.getDefaultLayout("구획화 등록");
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
	
	getVerList : function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS013");
		tr.body.CUSTCODE = page.custCode;
		tr.body.DIV = "0";
		
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
				if(json.body.LIST01.length == 0)
				{
					bizMOB.Ui.alert("안내", "데이터가 존재하지 않습니다.");
					return;
				}
				page.renderList(json, "LIST01");
			}
		});
	},
	
	renderList: function(json, listName)
	{
		var dir = 
			[
			 	{
			 		type:"loop",
			 		target:".dList",
			 		value:listName,
			 		detail:
		 			[
	 			 		{type:"single", target:".DivVer", value:"DIVVER"}, 
	 			 		{type:"single", target:".FrYMD", value:"FRYMD"},
	 			 		{type:"single", target:".ToYMD", value:"TOYMD"},
	 		        ]
			 	}
			];
			// 반복옵션(이전의 항목을 삭제하는 옵션)
			var options = { clone:true, newId:"list01New", replace:true };
			// 그리기
			$("#list01").bMRender(json.body, dir, options);
	},
	
	getDivList : function(divVer, $middleGruop)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS014");
		tr.body.CUSTCODE = page.custCode;
		tr.body.DIVVER = divVer;
		
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
				else
				{
					var callbackFunc = function(){
						$middleGruop.attr("load", "Y");
					};
					
					var disp = true;
					
					$.each(json.body.LIST01, function(i, colElement){
						if(colElement.ExistsHIS == "0")
						{
							disp = false;
						}
					});
					
					if(disp)
					{
						$middleGruop.hide();
						$middleGruop.parent().find(".dTr").removeClass("on");
						return;
					}
					
					page.renderDivList(json, "LIST01" , $middleGruop, callbackFunc);
				}
			}
		});
	},
	
	renderDivList: function(json, listName, $middleGruop, callback)
	{
		var dir = 
			[
			 	{
			 		type:"loop",
			 		target:".middleGroup",
			 		value:listName,
			 		detail:
		 			[
	 			 		{type:"single", target:".p20", value:function(arg)
    						{ 
	 			 				return (arg.item.DivSeNum + "/" + arg.item.LaClsNm + "/" + arg.item.FlooNm + "/" + arg.item.MiClsNm
	 			 						+ "/" + arg.item.DeClsNm + "/" + arg.item.DivNm + "/" + arg.item.PosiDesp);
    						} },
						{type:"single", target:".divTr@style", value:function(arg)
        						{ 
 			 				return (arg.item.ExistsHIS == "1" ? "color:red" : "");
						} },
						{type:"single", target:".p20@DIVSENUM", value:"DivSeNum"},
	 		        ]
			 	}
			];
			$middleGruop.bMRender(json.body, dir);
			if(callback) callback();
	},
	
	getHisList : function(divVer, objtType, objTK, $target, divsenum)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS015");
		tr.body.CUSTCODE = page.custCode;
		tr.body.DIVVER = divVer;
		tr.body.OBJTTYPE = objtType;
		tr.body.OBJTK = objTK;
		tr.body.DIVSENUM = divsenum;
		
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
				if(json.body.LIST01.length < 1)
					return;
				
				else
				{
					var callbackFunc = function(){
						$target.attr("load", "Y");
					};
					page.renderHisList(json, "LIST01", $target, callbackFunc);
				}
				
			}
		});
	},
	
	renderHisList: function(json, listName, $target, callback)
	{
		var dir = 
			[
			 	{
			 		type:"loop",
			 		target:".lowGroup",
			 		value:listName,
			 		detail:
		 			[
	 			 		{type:"single", target:".p30", value:function(arg)
    						{ 
	 			 				return (arg.item.EDITYMD + "/" + arg.item.NAME + "/" + arg.item.EDITDESC);
    						} }
	 		        ]
			 	}
			];
			$target.bMRender(json.body, dir);
			if(callback) callback();
	},
};