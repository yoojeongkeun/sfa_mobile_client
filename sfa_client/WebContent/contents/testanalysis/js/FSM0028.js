/**
 * 위생점검 리스트
 */
page  =
{    
    custName : "",
    custCode: "",
    planId: "",
    serviceYN : "",
    workDay : "",
    listTitle: "",
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
        $("#tableWaterTestListNew, #tableSurfaceFoulingListNew").delegate(".trMasterRow", "click", function(){
        	if($(this).hasClass("clicked")){
        		$(this).parent().find(".trDetailRow").toggle();
        		if($(this).parent().find(".trDetailRow").is(":visible")){
        			$(this).find(".btnOpenClose").removeClass("accordion-open");
        			$(this).find(".btnOpenClose").addClass("accordion-close");
        		}else{
        			$(this).find(".btnOpenClose").removeClass("accordion-close");
        			$(this).find(".btnOpenClose").addClass("accordion-open");
        		}        		
        	}else{
        		$(this).addClass("clicked");
        		page.getUnitList($(this).parent());
        		$(this).find(".btnOpenClose").removeClass("accordion-open");
    			$(this).find(".btnOpenClose").addClass("accordion-close");
        	}
        });
        
        $("#btnInput").click(function(){        	
        	var openOption = 
            {
                message : 
                {
                    planId      : page.planId,
                    custName    : page.custName,
                    custCode	: page.custCode,
                    serviceYN   : page.serviceYN,
                    workDay     : page.workDay,
                    listTitle	: page.listTitle
                    
                }
            };    
        	bizMOB.Web.open("testanalysis/html/FSM0027.html", openOption);
        });
    },
    /**
     * 데이터 셋팅
     * @param json : 전 화면에서 넘겨진 데이터
     */
    initData:function(json)
    {
    	page.listTitle = json.listTitle;    	
        page.custName = json.custName;
        page.custCode = json.custCode == undefined ? "" : json.custCode;
        page.planId = json.planId;
        
        page.serviceYN = json.serviceYN;
        page.workDay = json.workDay;
        
        /*if (page.custName.length > 3){
    		if (page.custName.substr(0,3) == "(주)"){
	   			namesub  = page.custName.substr(0,4);
	   	    	name = page.custName.substr(4, namesub.length -2);
	   	    	$("#CustName").html(namesub +"<br/>" +name);
	   		}else{
   			    namesub  = page.custName.substr(0,4);
   	    	    name = page.custName.substr(2, namesub.length -2);
   	    	    $("#CustName").html(namesub.substr(0,2) +"<br/>" +name);	
	   		}
		}else{
		    $("#CustName").text(page.custName);
		}*/
        
    	page.getSurfaceFoulingList();
    	//page.getWaterTest();
    },
    /**
     * 레이아웃 셋팅
     */
    initLayout:function()
    {
    	$("#listTitle").text(page.listTitle);
    	var layout = ipmutil.getDefaultLayout(page.custName + "(" + page.custCode + ")");
    	bizMOB.Ui.displayView(layout);
    },
    getSurfaceFoulingList: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0048");
    	tr.body.cCUSTCODE = page.custCode; 
    	tr.body.cFROMDATE = page.workDay; // 작업일자 *
    	tr.body.cTODATE = ""; // 나중 대비
    	tr.body.vcType = "SU"; // 타입 설정해야 함
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "표면오염도 목록을 가져오는데 실패하였습니다.");    				
    				return;
    			}
    			page.renderProductSampleList(json, "tableSurfaceFoulingList");
    		}
    	});
    },
    getWaterTest: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0048");
    	tr.body.cCUSTCODE = page.custCode; 
    	tr.body.cFROMDATE = ""; //나중 대비
    	tr.body.cTODATE = ""; // 나중 대비
    	tr.body.vcType = "WA"; // 타입 설정해야 함
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "물검사 목록을 가져오는데 실패하였습니다.");    				
    				return;
    			}
    			page.renderProductSampleList(json, "tableWaterTestList");
    		}
    	});
    },
    getUnitList: function($that){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0051");
    	tr.body.vcFOODSEQ = $that.attr("foodseq");
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "상세 목록을 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.renderUnitList(json, $that);
    		}
    	});
    },
    renderProductSampleList: function(json, renderID){
    	var dir = 
        [
            {
                type:"loop",
                target:".tbodyList",
                value:"LIST01",
                detail:
                [
                    {type:"single", target:".spanRowNumber", value:"ROWNUM"},
                    {type:"single", target:".spanSampleName", value:"PRODNM"},
                    {type:"single", target:".spanPurpose", value:"PURPOSE"},
                    {type:"single", target:"@foodseq+", value:"FOODSEQ"}
                ]
            }
        ];
        var options = { clone:true, newId:renderID + "New", replace:true };
        $("#" + renderID).bMRender(json.body, dir , options);
        
    },
    renderUnitList: function(json, $that){
    	var dir = 
        [
            {
                type:"loop",
                target:".trUnitList",
                value:"LIST01",
                detail:
                [
                    {type:"single", target:".spanUnitName", value:"TESTNM"},
                    {type:"single", target:".spanUnitCnt", value:"CNT"},                    
                    {type:"single", target:"@uprice+", value:"UPRICE"},
                    {type:"single", target:"@tprice+", value:"TPRICE"}                    
                ]
            }
        ];
        var options = { clone:true, newId:$that.find(".tableUnitListNew"), replace:true, isClass: true };
		$that.find(".tableUnitList").bMRender(json.body, dir, options);
		$that.find(".trDetailRow").show();
    }
};