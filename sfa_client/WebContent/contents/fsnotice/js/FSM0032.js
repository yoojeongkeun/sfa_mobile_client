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
        page.pageTitle = "식품안전정보";
        page.getSQMList();
    },
    /**
     * 레이아웃 셋팅
     */
    initLayout:function()
    {
    	var layout = ipmutil.getDefaultLayout(page.pageTitle);
    	$(".spanTitle2").text(page.pageTitle + " 정보");
    	bizMOB.Ui.displayView(layout);
    },
    getSQMList: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0063");
    	tr.body.cSQMLTYPE = page.sqmlType; 
    	tr.body.vcSEARCHTEXT = "";
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "식품안전정보 리스트를 가져오는데 실패하였습니다.");    				
    				return;
    			}
    			page.sqmList = json.body.LIST01;
    			page.renderSQMList(json);
    		}
    	});
    },
    getSQMDetailList: function($that){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0063");
    	tr.body.cSQMLTYPE = page.sqmlType; 
    	tr.body.vcSEARCHTEXT = "";
    	tr.body.iSEQ = $that.parent().attr("sqmlSeq");
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "식품안전정보  리스트를 가져오는데 실패하였습니다.");    				
    				return;
    			}
    			page.renderSQMDetailList($that, json);
    		}
    	});
    },  
    renderSQMList: function(json){
    	console.info(json);
    	var num = 0;
    	var dir = 
        [
            {
                type:"loop",
                target:".tbodyList",
                value:"LIST01",
                detail:
                [
                    {type:"single", target:".spanSQMLTitle", value:"Title"},
                    {type:"single", target:".spanSQMLSubTitle", value:"SubTitle"},
                    {type:"single", target:".spanNumber", value: function(json){
                    	return ++num;
                    }},
                    {type:"single", target:".tdTitle@style",  value: function(json){
                    	var _PopView = json.item.PopView;
                    	var _st = "color:";
                    	_st+= (_PopView == "Y")? "#00AFE2" : "none";                    	
                    	return _st;
                    }},
                    {type:"single", target:".tdDate", value:"RegistDate"},
                    {type:"single", target:".tdBody", value:"Body"},
                    {type:"single", target:"@sqmlSeq+", value:"Seq"},
                ]
            }
        ];
    	
        var options = { clone:true, newId:"tableListNew", replace:true };
        $("#tableList").bMRender(json.body, dir, options);
    },
    renderSQMDetailList: function($that, json){
    	console.info("renderSQMDetailList ; " + json.body.LIST01.length);
    	var _body = "";
    	if(json.body.LIST01.length > 0){
    		_body = json.body.LIST01[0].Body;
    	}
    	else{
    		_body = "";
    	}
    	$that.parent().find(".tdBody").html(_body);    		
    },
    search: function(){
    	if($("#txtSearch").val().trim() != ""){
	    	var tempList = page.sqmList;
	    	var resultList = [];
	    	$.each(tempList, function(i, listElement){
	    		if(listElement.Title.indexOf($("#txtSearch").val()) != -1 || listElement.SubTitle.indexOf($("#txtSearch").val()) != -1){
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
    dataReload: function(json){
    	if(json.cameraYN == "Y"){
    		page.$imageThat.attr("src", "../images/btn_view_ph01.png");
    	}
    }
};