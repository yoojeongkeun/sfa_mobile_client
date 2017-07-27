/**
 * 위생점검 리스트
 */
page  =
{
	pageTitle: "",
    sqmlType: "",
    sqmList: [],
    /**
     * 최초 진입점
     * @param json : 전화면에서 넘겨진 데이터
     */
    init:function(json)
    {
        page.initInterface();
        page.initData(json);
        page.initLayout();
    },
    /**
     * UI 셋팅
     */
    initInterface:function()
    {	
    	$("#tableListNew").delegate(".trTitle", "click", function(){
    		if($(this).attr("isclicked") == undefined){
    			$(this).attr("isclicked", "Y");
        		page.getSQMDetailList($(this));	
        		$(this).parent().find(".trContents").show();
        		$(this).find(".btnUpDown").removeClass("accordion-open");
        		$(this).find(".btnUpDown").addClass("accordion-close");
        		
    		}else{
    			$(this).parent().find(".trContents").toggle();
    			if($(this).parent().find(".trContents").is(":visible")){
    				$(this).find(".btnUpDown").removeClass("accordion-open");
            		$(this).find(".btnUpDown").addClass("accordion-close");
    			}else{
    				$(this).find(".btnUpDown").removeClass("accordion-close");
            		$(this).find(".btnUpDown").addClass("accordion-open");
    				
    			}
    		}    		
    	});
    	
    	$("#tableListNew").delegate(".inputCheck", "click", function(e){
    		 e.stopPropagation();
    		 
    	});
    	
    	$("#txtSearch").keyup(function(e){
    		if(e.keyCode == 13)
    			page.search();
    	});
    	
    	$("#btnSearch").click(function(){
    		page.search();
    	});
    	
    	$("#btnSave").click(function(){
    		page.save();
    	});
    	
    	$("#btnClear").click(function(){
    		$(".txtGatherMemo").val("");
    		$(".chkGatherYN").attr("checked", false);
    	});
    },
    /**
     * 데이터 셋팅
     * @param json : 전 화면에서 넘겨진 데이터
     */
    initData:function(json)
    {
        switch(json.sqmlType){
        	case "1": page.sqmlType = "AA0000"; page.pageTitle = "법규기준"; break;
        	case "2": page.sqmlType = "BB0000"; page.pageTitle = "장비/기기"; break;
        	case "3": page.sqmlType = "CC0000"; page.pageTitle = "위생교육정보"; break;
        	case "4": page.sqmlType = "DD0000"; page.pageTitle = "용어정의"; break;
        	case "5": page.sqmlType = "EE0000"; page.pageTitle = "Q & A"; break;
        	case "8": page.sqmlType = "GG0000"; page.pageTitle = "FS서비스 상품 Q&A"; break;
        }
        
        page.getSQMList();
    },
    /**
     * 레이아웃 셋팅
     */
    initLayout:function()
    {
    	var layout = fsutil.getDefaultLayout(page.pageTitle);
    	$(".spanTitle2").text(page.pageTitle + " 정보");
    	bizMOB.Ui.displayView(layout);
    },
    getSQMList: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0059");
    	tr.body.cSQMLTYPE = page.sqmlType; 
    	tr.body.vcSEARCHTEXT = "";
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "SQM 리스트를 가져오는데 실패하였습니다.");    				
    				return;
    			}
    			page.sqmList = json.body.LIST01;
    			page.renderSQMList(json);
    		}
    	});
    },
    getSQMDetailList: function($that){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0059");
    	tr.body.cSQMLTYPE = $that.parent().attr("sqmldtype"); 
    	tr.body.vcSEARCHTEXT = "";
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "SQM 상세 리스트를 가져오는데 실패하였습니다.");    				
    				return;
    			}
    			page.renderSQMDetailList($that, json);
    		}
    	});
    },  
    renderSQMList: function(json){
    	var num = 0;
    	var dir = 
        [
            {
                type:"loop",
                target:".tbodyList",
                value:"LIST01",
                detail:
                [
                    {type:"single", target:".spanSQMLMemo", value:function(json){
                    	return json.item.MEMO.replace(/---/g, "<br>");
                    }},
                    {type:"single", target:"@sqmldtype+", value:"CODE"},
                    {type:"single", target:".spanNumber", value: function(json){
                    	return ++num;
                    }}
                ]
            }
        ];
        var options = { clone:true, newId:"tableListNew", replace:true };
        $("#tableList").bMRender(json.body, dir, options);
        
    },
    renderSQMDetailList: function($that, json){
    	var dir = 
        [
            {
                type:"loop",
                target:".tbodyDetailList",
                value:"LIST01",
                detail:
                [
					{type:"single", target:".spanDetailTitle", value: function(json){
					    return json.item.MEMO.replace(/---/g, "<br>").replace(/\+\+\+/g, "&nbsp;&nbsp;").replace(/\+\+/g, "&nbsp;");
					}}                   
                ]
            }
        ];
    	 var options = { clone:true, newId:$that.parent().find(".tableDetailListNew"), replace:true, isClass: true };
 		$that.parent().find(".tableDetailList").bMRender(json.body, dir, options);
 		$(".spanDetailTitle").each(function(i, listElement){
 			$(listElement).html($(listElement).text());
 		});
        
    },
    search: function(){
    	/*var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0059");
    	tr.body.cSQMLTYPE = page.sqmlType; 
    	tr.body.vcSEARCHTEXT = $("#txtSearch").val();
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "SQM 리스트를 가져오는데 실패하였습니다.");    				
    				return;
    			}
    			page.renderSQMList(json);
    		}
    	});*/
    	if($("#txtSearch").val().trim() != ""){
	    	var tempList = page.sqmList;
	    	var resultList = [];
	    	$.each(tempList, function(i, listElement){
	    		if(listElement.MEMO.indexOf($("#txtSearch").val()) != -1){
	    			resultList.push(listElement);    		
	    		}
	    	});
	    	
	    	var json = []; json.body = [];
	    	json.body.LIST01 = resultList;
	    	page.renderSQMList(json);
    	}else{
    		var json = []; json.body = [];
    		json.body.LIST01 = page.sqmList;
    		page.renderSQMList(json);
    	}
    },
    save: function(){
    	var registList = $(".tbodyList:visible .inputCheck:checked").parents(".tbodyList");
    	if(registList.length == 0){
    		bizMOB.Ui.toast("등록 할 항목이 존재하지 않습니다.");
    		return;
    	}
    	var bodyList = [];
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0060");
    	
    	$.each(registList, function(i, listElement){
    		bodyList.push({
    			CODE: $(listElement).attr("sqmldtype"),
    			USID: "",
    			PROCTYPE: "I"
    		});
    	});
    	
    	tr.body.LIST01 = bodyList;
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "등록에 실패하였습니다.");
    				return;
    			}
    			bizMOB.Ui.toast("등록되었습니다.");
    		}
    	});	
    },
    dataReload: function(json){
    	if(json.cameraYN == "Y"){
    		page.$imageThat.attr("src", "../images/btn_view_ph01.png");
    	}
    }
};