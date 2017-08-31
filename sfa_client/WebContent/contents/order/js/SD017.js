detail = 
{
    init:function(json)
	{
    	detail.initInterface();
    	detail.initData(json);
    	detail.initLayout();
	},
	initInterface:function()
	{
		
	},	 
	initData:function(json)
	{
		
	},	 
	initLayout:function()
	{		
		$(".bx-viewport").css("height", "650px");
		$(".itemM").hide();
		$(".item4").show();
		$(".hideSlider").hide();
	},
	
	bindingData: function(json){
		if(json == "")
		{
			$("#detailListNew").find(".tbDetail").remove();
		}
		else
		{
			detail.renderList(json);
			$("#detailListNew").delegate("input", "click", function() {
				$(this).select();
			});
			
			$("#detailListNew").delegate(".QUANTITY", "change keyup", function() {
				var $this = $(this);
				var $that = $(this).parents(".tbDetail");
				
				//minimum_qty가 0보다 크면.
				if($that.attr("minimum_qty") > 0)
				{
					//최소구매수량이 10개 이상일경우
					//if($(this).val() >= 10)
					if( parseInt($(this).val()) >= parseInt($that.attr("minimum_qty")))
					{				
						$that.find(".UNITPRICE").text($that.attr("discount_price").bMToCommaNumber());
						$that.find(".TAX").text($that.attr("discount_tax").bMToCommaNumber());
												
						$this.parent().parent().parent().find(".AMT").text(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()).toString().bMToCommaNumber());
						$this.parent().parent().parent().find(".APPLAMT").val(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()).toString().bMToCommaNumber());
						$this.parent().parent().parent().find(".DISCRATE").text("0%");
						$this.parent().parent().parent().find(".DISCRATE").attr("rate", "0.00");
						//$this.parent().parent().parent().find(".TAX").text($that.find(".TAX").text($that.attr("discount_tax") * $this.val()));
						$this.parent().parent().parent().find(".TAX").text(($that.attr("discount_tax") * $this.val()).toString().bMToCommaNumber());						
						$this.parent().parent().parent().find(".TOTAMT").text((($that.attr("discount_price") * $this.val()) + ($that.attr("discount_tax") * $this.val())).toString().bMToCommaNumber());
					}
					//10개 이하일경우 원래 가격으로 
					else
					{
						$that.find(".UNITPRICE").text($that.attr("itemamt").bMToCommaNumber());
						$that.find(".TAX").text($that.attr("itemtax").bMToCommaNumber());
						
						$this.parent().parent().parent().find(".AMT").text(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()).toString().bMToCommaNumber());
						$this.parent().parent().parent().find(".APPLAMT").val(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()).toString().bMToCommaNumber());
						$this.parent().parent().parent().find(".DISCRATE").text("0%");
						$this.parent().parent().parent().find(".DISCRATE").attr("rate", "0.00");
						$this.parent().parent().parent().find(".TAX").text((($this.parent().parent().find(".UNITPRICE").attr("origin").bMToNumber() * $this.val()) - ($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val())).toString().bMToCommaNumber());
						//$this.parent().parent().parent().find(".TAX").text((Math.round(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()) / 10)).toString().bMToCommaNumber());
						$this.parent().parent().parent().find(".TOTAMT").text(($this.parent().parent().find(".UNITPRICE").attr("origin").bMToNumber() * $this.val()).toString().bMToCommaNumber());
					}
				}
				//minimu_qty가 없을경우.(기존 로직)
				else
				{
					$this.parent().parent().parent().find(".AMT").text(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()).toString().bMToCommaNumber());
					$this.parent().parent().parent().find(".APPLAMT").val(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()).toString().bMToCommaNumber());
					$this.parent().parent().parent().find(".DISCRATE").text("0%");
					$this.parent().parent().parent().find(".DISCRATE").attr("rate", "0.00");
					$this.parent().parent().parent().find(".TAX").text((($this.parent().parent().find(".UNITPRICE").attr("origin").bMToNumber() * $this.val()) - ($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val())).toString().bMToCommaNumber());
					//$this.parent().parent().parent().find(".TAX").text((Math.round(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()) / 10)).toString().bMToCommaNumber());
					$this.parent().parent().parent().find(".TOTAMT").text(($this.parent().parent().find(".UNITPRICE").attr("origin").bMToNumber() * $this.val()).toString().bMToCommaNumber());
					/*$this.parent().parent().parent().find(".TOTAMT").text((($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val())
																			+ Math.round(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()) / 10)).toString().bMToCommaNumber());*/
				}
			});
			
			/*$("#detailListNew").delegate(".QUANTITY", "keyup", function() {
				var $this = $(this);
				
				$this.parent().parent().parent().find(".AMT").text(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()).toString().bMToCommaNumber());
				$this.parent().parent().parent().find(".APPLAMT").val(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()).toString().bMToCommaNumber());
				$this.parent().parent().parent().find(".DISCRATE").text("0%");
				$this.parent().parent().parent().find(".DISCRATE").attr("rate", "0.00");
				$this.parent().parent().parent().find(".TAX").text((($this.parent().parent().find(".UNITPRICE").attr("origin").bMToNumber() * $this.val()) - ($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val())).toString().bMToCommaNumber());
				//$this.parent().parent().parent().find(".T551323AX").text((Math.round(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()) / 10)).toString().bMToCommaNumber());
				$this.parent().parent().parent().find(".TOTAMT").text(($this.parent().parent().find(".UNITPRICE").attr("origin").bMToNumber() * $this.val()).toString().bMToCommaNumber());
				$this.parent().parent().parent().find(".TOTAMT").text((($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val())
																		+ Math.round(($this.parent().parent().find(".UNITPRICE").text().bMToNumber() * $this.val()) / 10)).toString().bMToCommaNumber());
			});*/
			
			/*$("#detailListNew").delegate(".APPLAMT", "change", function() {
				var $this = $(this);
				
				$this.parent().parent().parent().find(".DISCRATE").text(Math.round(($this.parent().parent().parent().find(".AMT").text() - $this.val()) / $this.parent().parent().parent().find(".AMT").text() * 100) + "%");
				$this.parent().parent().parent().find(".DISCRATE").attr("rate", Math.round(($this.parent().parent().parent().find(".AMT").text() - $this.val()) / $this.parent().parent().parent().find(".AMT").text() * 100) + ".00");
				$this.parent().parent().parent().find(".TAX").text((Math.round($this.val() / 10)).toString().bMToCommaNumber());
				$this.parent().parent().parent().find(".TOTAMT").text((Math.round($this.val()) + Math.round($this.val() / 10)).toString().bMToCommaNumber());
			});
			
			$("#detailListNew").delegate(".APPLAMT", "keyup", function() {
				var $this = $(this);
				
				$this.parent().parent().parent().find(".DISCRATE").text(Math.round(($this.parent().parent().parent().find(".AMT").text() - $this.val()) / $this.parent().parent().parent().find(".AMT").text() * 100) + "%");
				$this.parent().parent().parent().find(".DISCRATE").attr("rate", Math.round(($this.parent().parent().parent().find(".AMT").text() - $this.val()) / $this.parent().parent().parent().find(".AMT").text() * 100) + ".00");
				$this.parent().parent().parent().find(".TAX").text((Math.round($this.val() / 10)).toString().bMToCommaNumber());
				$this.parent().parent().parent().find(".TOTAMT").text((Math.round($this.val()) + Math.round($this.val() / 10)).toString().bMToCommaNumber());
			});*/
		}
	},
	
	renderList:function(json)
	{
		// 항목 리스트를 셋팅하기
		var num = 0;
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".tbDetail",
		 		value:"LIST03",
		 		detail:
	 			[
	 			 	{type:"single", target:".seq", value:function(){
	 			 		return "<input type='checkbox'/>" + ++num;
	 			 	}},
	 			 	{type:"single", target:".seq@ordrseqn", value:"ORDRSEQN"},
	 			 	{type:"single", target:".CONTTARGNAME", value:"CONTTARGNAME"},
	 			 	{type:"single", target:".CONTTARGNAME@code", value:"CONTTARGCODE"},
	 			 	{type:"single", target:".SALEITEMNAME", value:"SALEITEMNAME"},
	 			 	{type:"single", target:".SALEITEMNAME@code", value:"SALEITEMCODE"},
	 			 	//{type:"single", target:".UNITPRICE", value:"UNITPRICE"},
	 			 	{type:"single", target:".UNITPRICE", value:function(args){
	 			 		return args.item.UNITPRICE.bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".UNITPRICE@origin", value:function(args){
	 			 		return (args.item.TOTAMT.bMToNumber()) / args.item.QUANTITY.bMToNumber();
	 			 	}},
	 			 	{type:"single", target:".QUANTITY@value", value:"QUANTITY"},
	 			 	{type:"single", target:".TOTAMT", value:function(args){
	 			 		return args.item.TOTAMT.bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".AMT", value:function(args){
	 			 		return args.item.AMT.bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".APPLAMT@value", value:function(args){
	 			 		return args.item.APPLAMT.bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".DISCRATE@rate", value:"DISCRATE"},
	 			 	{type:"single", target:".DISCRATE", value:function(args){
	 			 		var disc;
	 			 		disc = (args.item.DISCRATE * 100) + "%";
	 			 		return disc;
	 			 	}},
	 			 	{type:"single", target:".TAX", value:function(args){
	 			 		return args.item.TAX.bMToCommaNumber();
	 			 	}},
	 			 	{type:"single", target:".saleType",value:function(args){
	 			 		return args.item.SALETYPE == "OT10" ? "유상" : "무상";
	 			 	}},
	 			 	
	 			 	//.bMToCommaNumber()
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"detailListNew", replace:true };
		// 그리기
		$("#detailList").bMRender(json.body, dir, options);
		
		$.each($(".seq"), function(i, colElement){
			$(colElement).html($(colElement).text());
			//$(".seq").html($(".seq").text())
		});
	},
	
};



