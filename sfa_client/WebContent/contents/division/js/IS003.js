page  =
{
	custInfo : "",
	custCode : "",
	custNm : "",
	div : "",
	workDt : "",
		
	init : function(json)
	{	
		ipmutil.appendCommonMenu();
		
		
		page.initInterface();				
		page.custInfo = json.CustInfo;
		if(json.CustInfo != undefined && json.CustInfo != "")
		{
			page.custCode = json.CustInfo.custCode;
			page.custNm = json.CustInfo.custNm;
			page.workDt = json.CustInfo.workDt;		
			
			$("#custNm").val("[" + page.custCode + "] " + page.custNm);
			$("#txtCustSearchText").val("[" + page.custCode + "] " + page.custNm);
		}
		else
		{
			page.custInfo = ipmutil.CustInfo;
			page.workDt = new Date().bMToFormatDate("yyyymmdd");
		}
		
		page.initData();
		page.initLayout();
	},
	
	initInterface:function()
	{
		ipmutil.makeCustSearchWrap();
		ipmutil.setCustSearch($("#selCustSearchType"), $("#txtCustSearchText"), $("#btnCustSearch"), "page.returnCustomerInfo");
		
		 $("#custNm").keyup( function(e) {
			
			var searchText = $("#custNm").val();
		 	var code = e.which;
				
			if (code  == "13")
			{			
				if (searchText.length > 1)
					 page.CustlistCheck();
			}
						
		});
		 
		$(".InspDiv2").click(function()
		{
			$(".InspDiv2").val() == "Y" ? $(".InspDiv2").val("N") : $(".InspDiv2").val("Y");
		});
		
		$("#btnTabHis").click(function() 
		{
			if(page.custInfo.custCode.length < 1)
			{
				bizMOB.Ui.alert("알림", "고객을 검색하여 주십시오.");
				return;
			}
			
			bizMOB.Web.open("division/html/IS002.html", 
			{ 
				message : 
		    	{
					CustInfo  :  page.custInfo
		    	},
		    	modal:false,
		    	replace:false
			});
		});
		
		$("#tapOpen").click(function() 
		{	
			$("#tapOpen").toggleClass("on");
			
			if($("#tapOpen").hasClass("on"))
			{
				$(".search_box").show();
				page.getList();
			}
			else
				$(".search_box").hide();
		});
		
		$(".remove_btn").click(function() 
		{	
			$("#custNm").val("");
			//$("#custNm").text("");
		});
		
		$("#btnNewDiv").click(function()
		{
			if(page.custInfo.custCode.length < 1)
			{
				bizMOB.Ui.alert("알림", "고객을 검색하여 주십시오.");
				return;
			}
			
			$(".LaClsNm2").prop("disabled", false);
			$(".FlooNm2").prop("disabled", false);
			$(".MiClsNm2").prop("disabled", false);
			$(".DeClsNm2").prop("disabled", false);
			
			$(".LaClsNm2").css("background-color", "white");
			$(".FlooNm2").css("background-color", "white");
			$(".MiClsNm2").css("background-color", "white");
			$(".DeClsNm2").css("background-color", "white");
			
			$(".divSeNum2").val("");
			$(".LaClsNm2").val("");
			$(".FlooNm2").val("");
			$(".MiClsNm2").val("");
			$(".DeClsNm2").val("");
			$(".PosiDesp2").val("");
			$(".DivCategory").val("");
			$(".InspDiv2").attr("checked", false);
			$(".InspDiv2").val("N");
			$(".FRYMD").val(page.workDt.substring(0,4) + "-" + page.workDt.substring(4,6) + "-" + page.workDt.substring(6,8));			
			$(".TOYMD").val("9999-12-31");
			
			$(".divSeNum2").attr("code", "");
			$(".LaClsNm2").attr("code", "");
			$(".FlooNm2").attr("code", "");
			$(".MiClsNm2").attr("code", "");
			$(".DeClsNm2").attr("code", "");
			
			$("#btnLtUdt").hide();
			$("#btnLtNew").show();
			
			$("#slider").show();
			
		});
		
		$("#closeBtn").click(function()
		{
			$("#slider").hide();
		});
		
		$("#divListNew").delegate(".dListTr", "click", function() 
		{
			$(".LaClsNm2").prop("disabled", false);
			$(".FlooNm2").prop("disabled", false);
			$(".MiClsNm2").prop("disabled", false);
			$(".DeClsNm2").prop("disabled", false);
			
			$(".LaClsNm2").css("background-color", "white");
			$(".FlooNm2").css("background-color", "white");
			$(".MiClsNm2").css("background-color", "white");
			$(".DeClsNm2").css("background-color", "white");
			
			var $target = $(this);
			
			page.getListDetail($target.parent().find(".divSeNum").text());
			
			$("#btnLtUdt").show();
			$("#btnLtNew").hide();
			
			$("#slider").show();
			
			var $selectItem = $target.parent();
			
			$.each($(".dList"), function(i, colElement){
				if($(colElement).find(".laClsNm").attr("code") == $selectItem.find(".laClsNm").attr("code") && $(colElement).find(".divSeNum").text() != $selectItem.find(".divSeNum").text() )
				{
					$(".LaClsNm2").prop("disabled", true);
					$(".LaClsNm2").css("background-color", "whitesmoke");
					if($(colElement).find(".flooNm").attr("code") == $selectItem.find(".flooNm").attr("code"))
					{
						$(".FlooNm2").prop("disabled", true);
						$(".FlooNm2").css("background-color", "whitesmoke");
						if($(colElement).find(".miClsNm").attr("code") == $selectItem.find(".miClsNm").attr("code"))
						{
							$(".MiClsNm2").prop("disabled", true);
							$(".MiClsNm2").css("background-color", "whitesmoke");
							if($(colElement).find(".deClsNm").attr("code") == $selectItem.find(".deClsNm").attr("code"))
							{
								$(".DeClsNm2").prop("disabled", true);
								$(".DeClsNm2").css("background-color", "whitesmoke");
							}
						}	
					}
				}
			});
		});
		
		$("#btnUpd").click(function()
		{						
			page.div = "U";
			
			bizMOB.Ui.openDialog("division/html/IS003_1.html", 
			{
	           message:  
	           {
	        	   CUSTCODE 	: page.custCode,
	        	   DIVVER  		: $(".divSeNum").attr("version"),
	        	   OBJTK  		: "",
	        	   DIVSENUM		: $(".divSeNum2").attr("code"),
	        	   DEOCK		: "",
        		   OBJTTYPE		: "CS005"
        	   }, 
	           width : "95%",
	           height : "56%",
			});		
		});
		
		$("#btnDel").click(function()
		{			
			page.div = "D";
			
			bizMOB.Ui.openDialog("division/html/IS003_1.html", 
			{
	           message:  
	           {
	        	   CUSTCODE 	: page.custCode,
	        	   DIVVER  		: $(".divSeNum").attr("version"),
	        	   OBJTK  		: "",
	        	   DIVSENUM		: $(".divSeNum2").attr("code"),
	        	   DEOCK		: "",
        		   OBJTTYPE		: "CS005"
        	   },
	           width : "95%",
	           height : "56%",
			});		
		});
		
		$("#btnCop").click(function()
		{	
			bizMOB.Ui.openDialog("division/html/IS017_1.html",
					{
						width:"80%",
						height:"45%",
						base_on_size:"page",
						base_size_orientation:"vertical"
					});
			
			//page.insertDiv("I");
			//page.div = "I";
		});
		
		$("#btnIns").click(function()
		{			
			page.insertDiv("I");
		
		});
		
		$("#searchBtn").click(function()
		{
			page.getList();
		});
		
		$("#comLaClsDiv").change(function()
		{
			for(var i=0; i< $("#divListNew tbody").length; i++)
			{
				var $target = $($("#divListNew tbody")[i]);
				
				if( $target.find(".laClsNm").attr("code") == $("#comLaClsDiv").val())
				{
					$("#comFloor").append("<option value=\"" + $target.find(".flooNm").attr("code") + "\">" + $target.find(".flooNm").text() +"</option>");
				}
			}
			
			var seen = {};
			jQuery('#comFloor').children().each(function() {
			    var txt = jQuery(this).clone().wrap('<select>').parent().html();
			    if (seen[txt]) {
			        jQuery(this).remove();
			    } else {
			        seen[txt] = true;
			    }
			});
		});
		
		// 구획검색 버튼 클릭시
		$("#btnDivSearch").click(function(){
			var searchText = $("#txtDivSearchText").val();
			$(".dList").hide();
			switch($("#selDivSearchType").val()){			
				case "T01": // 구획명
					$(".dList[divnm*=" + searchText + "]").show();
					break;
				case "T02": // 대분류
					$(".dList[laclsnm*=" + searchText + "]").show();
					break;
				case "T03": // 중분류
					$(".dList[miclsnm*=" + searchText + "]").show();
					break;
				case "T04": // 소분류
					$(".dList[declsnm*=" + searchText + "]").show();
					break;
			}
		});
		
		// Open 버튼 클릭시
		$("#btnOpen").click(function(){
			if($(".openBar").css("top") == "0px"){
				$(".tit_tab").show();
				$(".searchWrap").show();
				$(".divSearchWrap").show();			
				$(".openBar").css("top", "162px");
				$(".topWrap").css("padding-top", "258px"); 
			}else{
				$(".tit_tab").hide();
				$(".searchWrap").hide();
				$(".divSearchWrap").hide();			
				$(".openBar").css("top", "0px");
				$(".topWrap").css("padding-top", "96px");
			}			
		});
		
		$("#txtDivSearchText").keyup(function(e){
			if(e.keyCode == "13"){
				$("#btnDivSearch").trigger("click");
			}
		});
	},
	
	initData:function()
	{
		var IDName    =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		
		if(page.custInfo.custCode != "")
		{
			page.getList();
			page.getDivList();			
		}
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
	
	getDivList : function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISGS008");
		tr.body.CustCode = page.custCode;
		
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
				if(json.body.List01.length == 0)
				{
					return;
				}
				var cnt = json.body.List01.length;
				var list = json.body.List01;
				for(var i = 0; i < cnt; i++)
				{
					$(".DivCategory").append("<option value=\"" + list[i].DivCode + "\">" + list[i].DivNm +"</option>");
				}
			}
		});
	},
	
	getList : function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS001");
		tr.body.CustCode = page.custCode;
		tr.body.SearchYMD = page.workDt;
		tr.body.DeClsNm = $("#comDeClsDiv").val();
		tr.body.FlooCode = $("#comFloor").val();
		tr.body.LaClsCode = $("#comLaClsDiv").val();
		
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
				if(json.body.List01.length == 0)
				{
					bizMOB.Ui.alert("안내", "자료가 존재하지 않습니다.");
					return;
				}
				page.renderList(json, "List01");
				
				var cnt = json.body.List01.length;
				var list = json.body.List01;
				for(var i = 0; i < cnt; i++)
				{
					$("#comLaClsDiv").append("<option value=\"" + list[i].LaClsCode + "\">" + list[i].LaClsNm +"</option>");
					//$("#comFloor").append("<option value=\"" + list[i].FlooCode + "\">" + list[i].FlooNm +"</option>");
				}
				var seen = {};
				jQuery('#comLaClsDiv').children().each(function() {
				    var txt = jQuery(this).clone().wrap('<select>').parent().html();
				    if (seen[txt]) {
				        jQuery(this).remove();
				    } else {
				        seen[txt] = true;
				    }
				});
				
				$("#slider").hide();
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
	 			 		{type:"single", target:".divSeNum", value:"DivSeNum"}, 
	 			 		{type:"single", target:".laClsNm", value:"LaClsNm"}, 
	 			 		{type:"single", target:".flooNm", value:"FlooNm"}, 
	 			 		{type:"single", target:".miClsNm", value:"MiClsNm"}, 
	 			 		{type:"single", target:".deClsNm", value:"DeClsNm"},
	 			 		{type:"single", target:"@divnm", value:"DivNm"},
	 			 		{type:"single", target:"@laclsnm", value:"LaClsNm"}, 
	 			 		{type:"single", target:"@floonm", value:"FlooNm"}, 
	 			 		{type:"single", target:"@miclsnm", value:"MiClsNm"}, 
	 			 		{type:"single", target:"@declsnm", value:"DeClsNm"}, 
	 			 		{type:"single", target:".posiDesp", value:"PosiDesp"}, 
	 			 		{type:"single", target:".divNm", value:"DivNm"}, 
	 			 		{type:"single", target:".inspDivCh", value:"InspDiv"}, 
	 			 		{type:"single", target:".inspDivCh@src", value:function(arg)
						{ 
 			 				return (arg.item.InspDiv == "Y" ? "../../common/images/img_check.png" : "../../common/images/img_check_d.png");
						} },
	 			 		{type:"single", target:".divSeNum@version+", value:"DIVVER"},
	 			 		{type:"single", target:".laClsNm@code", value:"LaClsCode"}, 
	 			 		{type:"single", target:".flooNm@code", value:"FlooCode"}, 
	 			 		{type:"single", target:".dListTr@class", value:function(arg){
	 			 										return arg.item.NUM  == "1" ? "dListTr enterd_row" : "dListTr enterd_row color02";		 			
	 			 		}}
	 		        ]
			 	}
			];
			// 반복옵션(이전의 항목을 삭제하는 옵션)
			var options = { clone:true, newId:"divListNew", replace:true };
			// 그리기
			$("#divList").bMRender(json.body, dir, options);
	},
	
	getListDetail : function($target)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBS002");
		tr.body.CustCode = page.custCode;
		tr.body.SearchYMD = page.workDt;
		tr.body.DivSeNum = $target;
		
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
				$(".divSeNum2").val(json.body.DivSeNum);
				$(".LaClsNm2").val(json.body.LaClsNm);
				$(".FlooNm2").val(json.body.FlooNm);
				$(".MiClsNm2").val(json.body.MiClsNm);
				$(".DeClsNm2").val(json.body.DeClsNm);
				$(".PosiDesp2").val(json.body.PosiDesp);
				$(".DivCategory").val(json.body.DivCode);
				json.body.InspDiv == "Y" ? $(".InspDiv2").attr("checked", true) : $(".InspDiv2").attr("checked", false);
				$(".InspDiv2").val(json.body.InspDiv);
				$(".FRYMD").val(json.body.FRYMD);
				$(".TOYMD").val(json.body.TOYMD);
				
				$(".divSeNum2").attr("code", json.body.DivSeNum);
				$(".LaClsNm2").attr("code", json.body.LaClsCode);
				$(".FlooNm2").attr("code", json.body.FlooCode);
				$(".MiClsNm2").attr("code", json.body.MiClsCode);
				$(".DeClsNm2").attr("code", json.body.DeClsCode);
			}
		});
	},
	
	insertDiv : function(useDiv)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBM003");
		tr.body.CustCode = page.custCode;
		tr.body.DivSeNum = useDiv == "I" ? "" : $(".divSeNum2").attr("code");
		tr.body.LaClsCode = $(".LaClsNm2").attr("code");
		tr.body.LaClsNm = $(".LaClsNm2").val();
		tr.body.FlooCode = $(".FlooNm2").attr("code");
		tr.body.FlooNm = $(".FlooNm2").val();
		tr.body.MiClsCode = $(".MiClsNm2").attr("code");
		tr.body.MiClsNm = $(".MiClsNm2").val();
		tr.body.DeClsCode = $(".DeClsNm2").attr("code");
		tr.body.DeClsNm = $(".DeClsNm2").val();
		tr.body.PosiDesp = $(".PosiDesp2").val();
		tr.body.DivCode = $(".DivCategory").val();
		tr.body.InspDiv = $(".InspDiv2").val();
		tr.body.UseDiv = useDiv == "D" ? "D" : "I";
		
		tr.body.DivVer = $(".divSeNum").attr("version");
		tr.body.FRYMD = page.workDt;
		tr.body.TOYMD = $(".TOYMD").val().substring(0,4) + $(".TOYMD").val().substring(5,7) + $(".TOYMD").val().substring(8,10);
		
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
					if(useDiv == "I")
					{
						/*
						var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
							bizMOB.Web.open("division/html/IS004.html", 
							{ 
								message : 
						    	{
									CustInfo  :  page.custInfo
						    	},
						    	modal:false,
						    	replace:false
							});
						});
						var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
							bizMOB.Ui.alert("저장", "저장되었습니다.");
							page.getList();
							return;
						});
						bizMOB.Ui.confirm("등록", "집기시설장비를 추가하시겠습니까?"
								, btnConfirm,
								btnCancel);
						*/
						bizMOB.Ui.alert("저장", "저장되었습니다.");
						page.getList();
					}
					else if(useDiv == "U")
					{
						/*
						var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
							bizMOB.Web.open("division/html/IS004.html", 
							{ 
								message : 
						    	{
									CustInfo  :  page.custInfo
						    	},
						    	modal:false,
						    	replace:false
							});
						});
						var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
							bizMOB.Ui.alert("수정", "수정되었습니다.");
							page.getList();
							return;
						});
						bizMOB.Ui.confirm("등록", "집기시설장비를 추가하시겠습니까?"
								, btnConfirm,
								btnCancel);
						*/
						bizMOB.Ui.alert("알림", "수정되었습니다.");
						page.getList();
					}
					else
					{
						bizMOB.Ui.alert("삭제", "삭제되었습니다.");
						page.getList();
						
					}
						
        		}
			}
		});
	},
	
	CallIns : function()
	{
		page.insertDiv(page.div);
	},
	
	// 고객조회
	CustlistCheck:function()
	{
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01101");
		tr.body.P01 = $("#custNm").val();
		tr.body.P02 = "";
	   
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					return;
				}
				
				if(json.body.List01.length > 1)
				{
						bizMOB.Ui.openDialog("collection/html/CM011.html", 
						{
				           message:  {
				        	   			Custin : $("#custNm").val() 
				        	   		,	Pagepath : "page.returnCustomerInfo"
			        	   			 }, //
				           width : "80%",
						    height : "67%",
						});
				}
				else if(json.body.List01.length == 0)
				{
					bizMOB.Ui.toast("검색된 고객이 없습니다.", "short");
					return;
				}
				else
				{					
				   $("#txtCustText").html(json.body.List01[0].R01);
				   page.custCode = json.body.List01[0].R01;
				   page.custNm = json.body.List01[0].R02;					
				   $("#custNm").text("[" + page.custCode + "] " + page.custNm);
				   $("#custNm").val("[" + page.custCode + "] " + page.custNm);
				   
				   page.custInfo.custCode = json.body.List01[0].R01;
				   page.custInfo.custNm = json.body.List01[0].R02;
				   
				   $("#custNm").hideKeypad();
				   page.getDivList();
				   page.getList();
				}
				
			}
		});
		
	},
	
	returnCustomerInfo:function(json)
	{
		// 데이터가 없다면 실행하지 않음
		if (json == undefined || json.CustCode.length < 6)
		{
			page.getDivList();
			return;
		}
		
		page.custCode = json.CustCode;
		page.custNm = json.CustName;
		page.custInfo.custCode = json.CustCode;
	    page.custInfo.custNm = json.CustName;
	    
	    $("#txtCustSearchText").val("[" + page.custCode + "] " + page.custNm);
		$("#custNm").val("[" + page.custCode + "] " + page.custNm);
		page.getDivList();
		page.getList();
	},
	
	SetDetail:function(json)
	{
		switch(json.copyCode)
        {
	        case "DI01": // 대분류
	        	$(".divSeNum2").val("");
				$(".FlooNm2").val("");
				$(".MiClsNm2").val("");
				$(".DeClsNm2").val("");
				$(".PosiDesp2").val("");
				$(".DivCategory").val("");
				$(".InspDiv2").attr("checked", false);
				$(".InspDiv2").val("N");
				$(".FRYMD").val(page.workDt.substring(0,4) + "-" + page.workDt.substring(4,6) + "-" + page.workDt.substring(6,8));			
				$(".TOYMD").val("9999-12-31");
				
				$(".divSeNum2").attr("code", "");
				$(".FlooNm2").attr("code", "");
				$(".MiClsNm2").attr("code", "");
				$(".DeClsNm2").attr("code", "");
				
				$(".LaClsNm2").prop("disabled", true);
				$(".FlooNm2").prop("disabled", false);
				$(".MiClsNm2").prop("disabled", false);
				$(".DeClsNm2").prop("disabled", false);
				
				$(".LaClsNm2").css("background-color", "whitesmoke");
				$(".FlooNm2").css("background-color", "white");
				$(".MiClsNm2").css("background-color", "white");
				$(".DeClsNm2").css("background-color", "white");
				
				$("#btnLtUdt").hide();
				$("#btnLtNew").show();
	        	break;
	        case "DI02": // 층분류
	        	$(".divSeNum2").val("");
				$(".MiClsNm2").val("");
				$(".DeClsNm2").val("");
				$(".PosiDesp2").val("");
				$(".DivCategory").val("");
				$(".InspDiv2").attr("checked", false);
				$(".InspDiv2").val("N");
				$(".FRYMD").val(page.workDt.substring(0,4) + "-" + page.workDt.substring(4,6) + "-" + page.workDt.substring(6,8));			
				$(".TOYMD").val("9999-12-31");
				
				$(".divSeNum2").attr("code", "");
				$(".MiClsNm2").attr("code", "");
				$(".DeClsNm2").attr("code", "");
				
				$(".LaClsNm2").prop("disabled", true);
				$(".FlooNm2").prop("disabled", true);
				$(".MiClsNm2").prop("disabled", false);
				$(".DeClsNm2").prop("disabled", false);
				
				$(".LaClsNm2").css("background-color", "whitesmoke");
				$(".FlooNm2").css("background-color", "whitesmoke");
				$(".MiClsNm2").css("background-color", "white");
				$(".DeClsNm2").css("background-color", "white");
				
				$("#btnLtUdt").hide();
				$("#btnLtNew").show();
	        	break;
	        case "DI03": // 중분류
	        	$(".divSeNum2").val("");
				$(".DeClsNm2").val("");
				$(".PosiDesp2").val("");
				$(".DivCategory").val("");
				$(".InspDiv2").attr("checked", false);
				$(".InspDiv2").val("N");
				$(".FRYMD").val(page.workDt.substring(0,4) + "-" + page.workDt.substring(4,6) + "-" + page.workDt.substring(6,8));			
				$(".TOYMD").val("9999-12-31");
				
				$(".divSeNum2").attr("code", "");
				$(".DeClsNm2").attr("code", "");
				
				$(".LaClsNm2").prop("disabled", true);
				$(".FlooNm2").prop("disabled", true);
				$(".MiClsNm2").prop("disabled", true);
				$(".DeClsNm2").prop("disabled", false);
				
				$(".LaClsNm2").css("background-color", "whitesmoke");
				$(".FlooNm2").css("background-color", "whitesmoke");
				$(".MiClsNm2").css("background-color", "whitesmoke");
				$(".DeClsNm2").css("background-color", "white");
				
				$("#btnLtUdt").hide();
				$("#btnLtNew").show();
	        	break;
	        case "DI04": // 세분류
	        	$(".divSeNum2").val("");
				$(".PosiDesp2").val("");
				$(".DivCategory").val("");
				$(".InspDiv2").attr("checked", false);
				$(".InspDiv2").val("N");
				$(".FRYMD").val(page.workDt.substring(0,4) + "-" + page.workDt.substring(4,6) + "-" + page.workDt.substring(6,8));			
				$(".TOYMD").val("9999-12-31");
				
				$(".divSeNum2").attr("code", "");
				
				$(".LaClsNm2").prop("disabled", true);
				$(".FlooNm2").prop("disabled", true);
				$(".MiClsNm2").prop("disabled", true);
				$(".DeClsNm2").prop("disabled", true);
				
				$(".LaClsNm2").css("background-color", "whitesmoke");
				$(".FlooNm2").css("background-color", "whitesmoke");
				$(".MiClsNm2").css("background-color", "whitesmoke");
				$(".DeClsNm2").css("background-color", "whitesmoke");
				
				$("#btnLtUdt").hide();
				$("#btnLtNew").show();
	        	break;
            default :
            	break;
        }
	}	
};