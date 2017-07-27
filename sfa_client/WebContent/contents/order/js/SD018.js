page = 
{
	slider:"",
	json:"",
	orderNo : "",
	custCode : "",
	orderjson : "",
	unitType : "",
	
    init:function(json)
	{
    	page.json = json;
    	page.orderNo = json.orderNo;
    	page.custCode = json.custCode;
    	page.orderjson = json.orderjson;
    	page.unitType = json.unitType;
    	
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		
		
		
		$("div, input").not("#sItemCode, #sItemNm").click(function(){
			$("#dummyDiv").hide();
		});
		
		$("#sItemCode, #sItemNm").click(function(){
			setTimeout(function(){
				$("#dummyDiv").show();	
			}, 30);
		});
		
		$("#sItemCode, #sItemNm").keydown(function(e){
			alert("dddd");
		});
		
		$("#btnSlider").click(function(){
			
			if($("#btnSlider").hasClass("bottom_openbtn"))
			{
				$("#btnSlider").removeClass("bottom_openbtn");
				$("#btnSlider").toggleClass("bottom_closebtn");
			}	
			else
			{
				$("#btnSlider").removeClass("bottom_closebtn");
				$("#btnSlider").toggleClass("bottom_openbtn");
			}
			
			if($("#btnSlider").css("top") == "493px")
			{
				$(".hide").parent().css("overflow-y", "hidden").css("height", "100%");
				//$(".hideSlider").show();
				$("#btnSlider").css("top", "94px");
				$(".itemC").show();
				$(".itemM").hide();
				
				$.each($(".tbItem"), function(i, colElement){
					$(colElement).find(".itemChkBox").attr("checked", false);
				});
			}
			else
			{
				$(".hide").parent().css("overflow-y", "scroll").css("height", "100%");
				$(".hideSlider").hide();
				//$("#btnSlider").css("top", "493px");
				//$("#btnSlider").show();
				$(".itemC").hide();
				$(".itemM").show();
			}
			
		});
		
		$("#itemBtnCancel").click(function(){
			$(".hide").parent().css("overflow-y", "scroll").css("height", "100%");
			$(".hideSlider").hide();
			//$("#btnSlider").css("top", "493px");
			//$("#btnSlider").show();
			$(".itemC").hide();
			$(".itemM").show();
		});
		
		$("#deBtnDel").click(function(){
			var int = 0;
			
			$.each($(".tbDetail"), function(i, colElement){
				
				int++;
				
				if($(colElement).find(".seq").find("input").is(":checked"))
				{
					$(colElement).hide();
					int--;
				}
				else
				{
					$(colElement).find(".seq").html("<input type='checkbox'/>" + int);
				}
			});
		});
		
		$("#itemBtnChoice").click(function(){
			$("#btnSlider").removeClass("bottom_closebtn");
			$("#btnSlider").toggleClass("bottom_openbtn");
			
			var html = "";
			var int = 0;
			$.each($(".tbItem"), function(i, colElement){
				if($(colElement).find(".itemChkBox").is(":checked"))
				{
					var appendBoll = true;
					$.each($(".tbDetail"), function(j, colElementDe){
						if($(colElementDe).find(".SALEITEMNAME").attr("code") == $(colElement).find(".itemCode").text())
						{
							appendBoll = false;
							$(colElementDe).show();
						}
					});
					
					var length = 0;
					
					$.each($("#detailListNew").find("tbody"), function(i, colElement){
						if($(colElement).is(":visible"))
							length++;
					});
					
					if(appendBoll)
					{
						html += "<tbody class='tbDetail'>";
						html += "<tr>";
						html += "<td rowspan='2' class='seq'><input type='checkbox'/>" + (length + ++int) + "</td>";
						html += "<td rowspan='2' class='saleType'>유상</td>";
						html += "<td class='CONTTARGNAME' code='" + $(colElement).find(".itemContNm").attr("code") + "'>" + $(colElement).find(".itemContNm").text() + "</td>";
						html += "<td class='SALEITEMNAME' code='" + $(colElement).find(".itemCode").text() + "'>" + $(colElement).find(".itemNm").text() + "</td>";
						html += "<td class='UNITPRICE'>" + $(colElement).find(".itemAmt").text() + "</td>";
						html += "<td><input type='number' min='0' value='1' class='QUANTITY'></td>";
						html += "<td rowspan='2' class='TOTAMT'>" + ($(colElement).find(".itemAmt").text().bMToNumber() + $(colElement).find(".itemTax").text().bMToNumber()) + "</td>";
						html += "</tr>";
						html += "<td class='AMT'>" + $(colElement).find(".itemAmt").text() + "</td>";
						html += "<td><input type='number'  value='" + $(colElement).find(".itemAmt").text() + "' class='APPLAMT' disabled></td>";
						html += "<td class='DISCRATE' rate=" + $(colElement).find(".itemTax").attr("rate") + ">" + ($(colElement).find(".itemTax").attr("rate") * 100) + "%" + "</td>";
						html += "<td class='TAX'>" + $(colElement).find(".itemTax").text() + "</td>";
						html += "<tr>";
						html += "</tbody>";
					}
				}
			});
			
			if($("#detailListNew").find("tbody").length == 0)
			{
				$("#detailListNew").append($("#colGroup"));
				$("#detailListNew").append($("#thead"));
				$("#detailListNew").append(html);
			}
			else
				$("#detailListNew").append(html);
			
			$(".hide").parent().css("overflow-y", "scroll").css("height", "100%");
			$(".hideSlider").hide();
			$("#btnSlider").css("top", "493px");
			$("#btnSlider").show();
			
			$(".itemC").hide();
			$(".itemM").show();
			
			$(".bx-viewport").css("height", ($(".tab02_").height() + 86) + "px");
			
			
			
		});
		
		$("#btnSearchItem").click(function(){
			page.getItemList();
		});
		
		$("#itemListNew").delegate(".tdMas", "click", function(){
			$this = $(this);
			
			if(!$this.hasClass("itemChk"))
			{
				if($this.parent().parent().find(".trDe").is(":visible"))
					$this.parent().parent().find(".trDe").hide();
				else  
					$this.parent().parent().find(".trDe").show();
			}
		});
		
		$("#deBtnAdd").click(function(){
			if($("#custCode").val() == "")
			{
				bizMOB.Ui.alert("안내", " 고객을 조회하여 주십시오.");
				return;
			}
			
			bizMOB.Ui.openDialog("order/html/SD017_pop.html",
			{ 
			   	width:"95%",
				height:"68%",
				message: {
					prePath : "page.addItem",
				    unitType : page.unitType,
				    custCode : $("#custCode").val()
				}
			});
		});
	},	 
	initData:function(json)
	{
		
	},	 
	initLayout:function()
	{
		var layout = ipmutil.getDefaultLayout("주문서 등록");
		bizMOB.Ui.displayView(layout);
		$.get("SD016.html", function(data){
			$(".bxslider").append(data);
			$.get("SD017.html", function(data){
				$(".bxslider").append(data);
					page.slider = $('.bxslider').bxSlider({
						pager : false,
						controls: false,
						touchEnabled: false,	
						infiniteLoop: false,
						onSliderLoad: function(){
							$(".bx-viewport").css("height", "650px");
							$(".itemM").hide();
							$(".item4").show();
							$(".hideSlider").hide();
						},
						onSlideAfter: function(){
							switch(page.slider.getCurrentSlide()){
							case 0:
								$(".bx-viewport").css("height", "650px");
								$(".itemM").hide();
								$(".item4").show();
								$(".hideSlider").hide();
								break;
							case 1:
								$(".bx-viewport").css("height", ($(".tab02_").height() + 86) + "px");
								$(".itemM").show();
								$(".item4").hide();
								$(".hideSlider").hide();
								//$("#btnSlider").show();
								//$("#btnSlider").css("top", "493px");
								break;
							}							
						}
					});
					$(".btn_bx").click(function(){
						page.slider.goToSlide(page.slider.getCurrentSlide() == 0 ? 1 : 0);
						//$(".bx-viewport").css("height", "650px");
						if(page.slider.getCurrentSlide() == 0)
							$(".tab01_").css("height", "650px");
					});
					page.onInitCompleted();
			});
		});
	},
	onInitCompleted: function(){
		master.init(page.json, page.orderjson);
		page.getOrderList();
		
	},
	
	addItem: function(json){
		var html = "";
		var int = 0;
		$.each($(json.html), function(i, colElement){
			var appendBoll = true;
			$.each($(".tbDetail"), function(j, colElementDe){
				if($(colElementDe).find(".SALEITEMNAME").attr("code") == $(colElement).find(".itemCode").text())
				{
					appendBoll = false;
					$(colElementDe).show();
				}
			});
			
			var length = 0;
			
			$.each($("#detailListNew").find("tbody"), function(i, colElement){
				if($(colElement).is(":visible"))
					length++;
			});
			
			if(appendBoll)
			{
				html += "<tbody class='tbDetail' minimum_qty='" + $(colElement).attr("minimum_qty") 
					+ "' discount_price='" + $(colElement).attr("discount_price") 
					+ "' discount_tax='" + $(colElement).attr("discount_tax")
					+ "' itemamt='" + $(colElement).find(".itemAmt").text() 
					+ "' itemtax='" + $(colElement).find(".itemTax").text()
					+ "'>";
				html += "<tr>";
				html += "<td rowspan='2' class='seq'><input type='checkbox'/>" + (length + ++int) + "</td>";
				html += "<td rowspan='2' class='saleType'>유상</td>";
				html += "<td class='CONTTARGNAME' code='" + $(colElement).find(".itemContNm").attr("code") + "'>" + $(colElement).find(".itemContNm").text() + "</td>";
				html += "<td class='SALEITEMNAME' code='" + $(colElement).find(".itemCode").text() + "'>" + $(colElement).find(".itemNm").text() + "</td>";
				html += "<td class='UNITPRICE' origin="+ ($(colElement).find(".itemAmt").text().bMToNumber() + $(colElement).find(".itemTax").text().bMToNumber()) +">" + $(colElement).find(".itemAmt").text().bMToCommaNumber() + "</td>";
				html += "<td><input type='number' min='0' value='1' class='QUANTITY'></td>";
				html += "<td rowspan='2' class='TOTAMT'>" + ($(colElement).find(".itemAmt").text().bMToNumber() + $(colElement).find(".itemTax").text().bMToNumber()).toString().bMToCommaNumber() + "</td>";
				html += "</tr>";
				html += "<td class='AMT'>" + $(colElement).find(".itemAmt").text().bMToCommaNumber() + "</td>";
				html += "<td><input type='text' value='" + $(colElement).find(".itemAmt").text().bMToCommaNumber() + "' class='APPLAMT' disabled></td>";
				html += "<td class='DISCRATE' rate=" + $(colElement).find(".itemTax").attr("rate") + ">" + ($(colElement).find(".itemTax").attr("rate") * 100) + "%" + "</td>";
				html += "<td class='TAX'>" + $(colElement).find(".itemTax").text().bMToCommaNumber() + "</td>";
				html += "<tr>";
				html += "</tbody>";
			}
		});
		
		if($("#detailListNew").find("tbody").length == 0)
		{
			$("#detailListNew").append($("#colGroup"));
			$("#detailListNew").append($("#thead"));
			$("#detailListNew").append(html);
		}
		else
			$("#detailListNew").append(html);
		
		$(".itemC").hide();
		$(".itemM").show();
		
		$(".bx-viewport").css("height", ($(".tab02_").height() + 86) + "px");
	},
	
	getOrderList:function()
	{	
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01601");
		tr.body.P01 = page.orderNo;
		tr.body.P02 = page.custCode;
		
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
				master.bindingData(json);
				detail.bindingData(json);
			}
		});		
	},
	
	getItemList:function()
	{	
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01701");
		tr.body.P01 = $("#sItemCode").val();
		tr.body.P02 = $("#sItemNm").val();
		tr.body.P03 = "";
		tr.body.P04 = $("#selOriginType").val();
		tr.body.P05 = page.unitType;
		tr.body.P06 = page.custCode;			
		
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
				
				page.renderList(json);
			}
		});		
	},
	
	renderList:function(json)
	{
		// 항목 리스트를 셋팅하기
		var num = 0;
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".tbItem",
		 		value:"LIST",
		 		detail:
	 			[
	 			 	{type:"single", target:".itemSeq", value:function(){
	 			 		return ++num;
	 			 	}},
	 			 	{type:"single", target:".itemCode", value:"SALEITEMCODE"},
	 			 	{type:"single", target:".itemNm", value:"SALEITEMNAME"},
	 			 	{type:"single", target:".itemNm", value:"SALEITEMNAME"},
	 			 	{type:"single", target:".itemAmt", value:"STDPRICE"},
	 			 	{type:"single", target:".itemTax", value:"TAX"},
	 			 	{type:"single", target:".itemTax@rate", value:function(args){
	 			 		return 0;
	 			 	}},
	 			 	{type:"single", target:".itemTotNm", value:"SALEITEMFULLNAME"},
	 			 	{type:"single", target:".itemDeNm", value:"SALEITEMSHRTNAME"},
	 			 	{type:"single", target:".itemContNm", value:"CONTTARGNAME"},
	 			 	{type:"single", target:".itemContNm@code", value:"CONTTARGCODE"},
	 			 	{type:"single", target:".itemContIven", value:"CPMSITEMNAME"},
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"itemListNew", replace:true };
		// 그리기
		$("#itemList").bMRender(json.body, dir, options);
	},
};



