/**
 * @author ehpark@mcnc.co.kr
 * @title 주소검색
 */

var page = {
		
	addRegion 	: false, //관심지역 설정여부
	
	init : function(event) 
	{
		page.initInterface();
		page.initData(event);
		page.initLayout(event);
	},

	initData : function(data) 
	{
		page.addRegion = data.addRegion;
	},

	initInterface : function() 
	{
		//도로명주소 탭
		$("#btnDoroAddr").click(function() {
			$("#btnDoroAddr").addClass("on");
			$("#btnJibunAddr").removeClass("on");
			
			$("#txtRoadname").show();
			$("#txtJibunAddr").hide();
			
			$("#inpSearch").attr("placeholder", "도로명 + 건물번호");
		});
		
		//지번주소 탭
		$("#btnJibunAddr").click(function() {
			$("#btnJibunAddr").addClass("on");
			$("#btnDoroAddr").removeClass("on");
			
			$("#txtJibunAddr").show();
			$("#txtRoadname").hide();
			
			$("#inpSearch").attr("placeholder", "동 (읍/면/리/가)");
		});
		
		//검색버튼
		$("#btnSearch").click(function() {

			var keyWord  = $("#inpSearch").val().trim();
			
			if(keyWord.length < 3) {
				cescoUtil.alert.show("검색어를 3자이상 입력하세요");
				return;
			} 
			
			page.reqList(keyWord);
		});
		
		//검색어입력 Enter
		$("#inpSearch").on("keyup input",function(e) {	
			
			if(!e) {e=window.event;}			
			var code = e.keyCode ? e.keyCode : e.charCode;
 
			if( $("#inpSearch").val().trim() == "") {
				$("#btnTxtClear").hide();
			} else {
				$("#btnTxtClear").show();
			}
			
			if (code  == 13) {
				$(this).blur().focusout();
				$("#btnSearch").click();
		    }
		});
				
		//검색어 삭제
		$("#btnTxtClear").click(function() {
			$("#btnTxtClear").hide();
			$("#inpSearch").val("");
		});
		
		//주소선택
		$("body").on("click", ".btnRecord", function() {
			var addr = $(this).data("data");
						
			
			//지역코드 조회
			bizMOB.Network.requestTr({
				_bProgress	: false,
				_sTrcode 	: "CES0038",
				_oBody 		: {
					doroAddr 		: addr.doroAddr,
					commonAddr	: addr.commonAddr,
					zipcode			: addr.zipcode
				},
				_fCallback : function(resCES0038) {
					if (cescoUtil.checkResponseError(resCES0038)) 
					{
						addr.regionID = resCES0038.body.regionID;
						
						if(page.addRegion) {
							//관심지역설정
							page.reqAddRegion(addr);
							
						} else {
							//주소선택
							cescoUtil.windowClose({
								_sCallback : "page.callbackADD_0100",
								_oMessage : {
									addr				: addr,
									selAddr 			: addr.commonAddr + " " +addr.doroAddr
								}
							});	
						}
					}
				}
			});
					
		});
		
		//도로명주소링크
		$("#btnJusoLink").click(function() {
			cescoUtil.callBrowser("www.juso.go.kr");
		});
	},
	
	//관심지역 설정
	reqAddRegion : function(addr)
	{
		bizMOB.Network.requestTr({
			_sTrcode 	: "CES0123",
			_oBody 		: {
				regionID : addr.regionID
			},
			_fCallback : function(resCES0123) {
				if (cescoUtil.checkResponseError(resCES0123)) 
				{
					if(resCES0123.body.isSuccess) {
						cescoUtil.alert.show({
							txtHtml : "관심지역이 설정되었습니다.",
							btnTxt : "확인",
							callback : function() {
								cescoUtil.windowClose({});
							}
						});
						
					} else {
						cescoUtil.alert.show({
							txtHtml : "관심지역을 저장하지 못했습니다.",
							btnTxt : "확인",
							callback : function() {
								cescoUtil.windowClose({});
							}
						});						
					}
					
					
				}
			}
		});
		
	},
	
	//주소검색
	reqList : function(keyWord) 
	{
		bizMOB.Network.requestTr({
			_sTrcode 	: "CES0033",
			_oBody 		: {				
				keyWord			: keyWord,
			},
			_fCallback	 : function(resCES0033) {
				if (cescoUtil.checkResponseError(resCES0033)) 	{		
					$("#searchTxt").text(keyWord);
					$("#searchCnt").text(resCES0033.body.searchCnt);
					
					page.renderList(resCES0033.body);					
				}				
			}
		});
		
	},
	
	
	//목록랜더
	renderList : function(data)
	{	
		var dir = [ {
			"type"	: "loop",
			"target" 	: ".record",
			"value" 	: "addrList",
			"detail" : [
			    { "type" : "single", "target" : ".btnRecord@data",	"value" : function(arg) {
			    	return arg.item;
			    }, "valueType" : "data" },			    
			    { "type" : "single", "target" : ".commonAddr",			"value" : "commonAddr" },
				{ "type" : "single", "target" : ".jibunAddr",				"value" : "jibunAddr" },
				{ "type" : "single", "target" : ".doroAddr",				"value" : "doroAddr" },
			 ]
		}];
		
		$("#listTemplate").bMRender(data, dir, { clone : true, newId : "list", replace : true });	

		if(list.length == 0) {
			$("#noData").show();		
		} else{
			$("#noData").hide();	
		}
		
		$("#scrollArea").scrollTop(0); 
	},


	initLayout : function(data) 
	{
		cescoTitlebar.setCloseBtnTitleBar(data.addRegion ? "관심지역" : "주소검색");
	}
};