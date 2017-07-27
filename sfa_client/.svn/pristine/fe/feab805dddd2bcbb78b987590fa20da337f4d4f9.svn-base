custInfoMove  =
{
	/*

	작성자 			: 조선호
	최초작성일자	: 2014-05-21
	수정이력
	  1. ----- 

	*/ 
	custCode:"",
	type:"",
	pageType: "",
	/**** 상단메뉴바 이닛 type (basic : 기본정보, cont : 계약정보, vbc : vbc정보) ****/
	init:function($section, custCode, type, pageType)
	{
		// 고객코드셋팅
		page.pageType = pageType;
		if(custCode) custInfoMove.custcode = custCode;
		if(type) custInfoMove.type = type;
		$section.attr("custcode", custCode);
		if ($section.find(".btnMove").length == 0)
		{
			$.get("CM006_01.html", function(data){
				$section.append(data);
				$section.find("li").removeClass("on");
				switch (custInfoMove.type)
				{
					case "basic":
						$section.find("button[name=basicInfo]").parent().addClass("on");
						break;
					case "cont":
						$section.find("button[name=contInfo]").parent().addClass("on");
						break;
					case "vbc":
						$section.find("button[name=vbcInfo]").parent().addClass("on");
						break;
					case "history":
						$section.find("button[name=custHis]").parent().addClass("on");
						break;
				}
			});
		}
		
		$section.delegate(".btnMove", "click", function(){
			var name = $(this).attr("name");
			var fileName = "service/html/CM023.html";
			switch (name)
			{
				case "basicInfo":
					fileName = "custmaster/html/CM007.html";
					break;
				case "contInfo":
					fileName = "custmaster/html/CM010.html";
					break;
				case "vbcInfo":
					fileName = "custmaster/html/CM009.html";
					break;
				case "custHis":
					fileName = "custmaster/html/CM075.html";
					break;
			}
			
			if(page.pageType == "POP"){
				var openOption = 
				{
					modal   : false,
					replace : true,
					message : 
					{
					    custCode : $section.attr("custcode"),
					    pageType : "POP"
					}
				};
				
				bizMOB.Web.open(fileName, openOption);
			}else{
				var openOption = 
				{
					modal   : false,
					replace : false,
					message : 
					{
					    custCode : $section.attr("custcode")
					}
				};
				
				bizMOB.Web.open(fileName, openOption);
			}
		});
	}
};