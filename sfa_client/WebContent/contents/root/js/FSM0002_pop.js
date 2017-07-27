/**
 * 위생점검 리스트
 */
page  =
{
	popCount: 0,  	// 팝업 컨텐츠 총 하바
	popNow: 0,		// 현재 컨텐츠 페이지
	
    sqmList: [],
    /**
     * 최초 진입점
     * @param json : 전화면에서 넘겨진 데이터
     */
    init:function(json)
    {
		var datetime = 	new Date();
		page.DATE = datetime.bMToFormatDate("yyyymmdd");
		
        page.initInterface();
        page.initData(json);
    },
    /**
     * UI 셋팅
     */
    initInterface:function()
    {
    	$(".paging .prev").click(function(){
    		page.setNowPage(-1);
    	});
    	$(".paging .next").click(function(){
    		page.setNowPage(1);
    	});
    	
    	$("#agree").change(function(){
    		localStorage.setItem("popView" + page.DATE, "True");
    		bizMOB.Ui.closeDialog();
    	});
    },
    /**
     * 데이터 셋팅
     * @param json : 전 화면에서 넘겨진 데이터
     */
    initData:function(json)
    {
    	page.Seq = json.seq;
    	$(".title").html(json);
        page.pageTitle = "식품안전정보";
        page.popInit();
    },
    popInit: function(){
    	page.popCount = page.Seq.length;
    	$("#totalPage").html(page.popCount);
		page.getSQMDetailList(1);
    }, 
    
    /**
     * 팝업 Body 가져오기 
     */
    getSQMDetailList: function(i){
    	var _i = i-1;
    	
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0063");
    	tr.body.cSQMLTYPE = page.sqmlType; 
    	tr.body.vcSEARCHTEXT = "";
    	tr.body.iSEQ = page.Seq[_i];
    	
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result){
    				bizMOB.Ui.alert("안내", "SQM 리스트를 가져오는데 실패하였습니다.");    				
    				return;
    			}
    			else{
    				if(json.body.LIST01.length > 0){
    		    		_body = json.body.LIST01[0].Body;
    		    	}
    		    	else{
    		    		_body = "";
    		    	}
    				$(".popWrap .content").html(_body);
    				
    		    	var _title = json.body.LIST01[0].Title + "<p>" + json.body.LIST01[0].SubTitle + "</p>";
    		    	$(".popWrap .title").html(_title);    	
    		    	
    		    	// 현재 페이지 번호 설정
    				page.popNow = i;
    				$("#nowPage").html(i);
    				
    				// 페이징 버튼 설정
    				page.pagingBtnDisplay();
    			}
    		}
    	});
    },
    /**
     * 페이징 버튼 display 설정 
     */
    pagingBtnDisplay: function(){
    	$(".paging .prev").hide();
    	$(".paging .next").hide();
    	$(".agree").hide();
    	if(page.popCount > 1){
    		if(page.popNow == 1){
        		$(".paging .next").show();
        	}
    		else if(page.popNow == page.popCount){
        		$(".paging .prev").show();
        		$(".agree").show();
        	}
    		else{
    			$(".paging .prev").show();
    			$(".paging .next").show();
    		}
    	}
    	else{
    		$(".agree").show();
    	}
    	
    	var _pb = ($(".agree").css("display") == "none") ? "0": "50px"; 
    	$(".container").css("padding-bottom",_pb);
    },
    setNowPage: function(p){
    	var chkPage = page.popNow+p;
    	if(chkPage <= 1){
    		chkPage = 1;
    	}
    	else if(chkPage >= page.popCount){
    		chkPage = page.popCount;
    	}
    	page.getSQMDetailList(chkPage);
    }
};