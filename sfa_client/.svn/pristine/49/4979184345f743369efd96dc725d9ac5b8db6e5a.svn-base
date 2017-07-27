page  =
{
	UserID :"",

	init : function(json)
	{   
		page.userID = bizMOB.Storage.get("UserID");
		ipmutil.resetChk();
		ipmutil.setAllSelect(document, "input", "click");
		ipmutil.appendCommonMenu();

		page.UserID  = json.UserID;
		page.initInterface();
		page.initData();
		page.initLayout();
		
	},
	initInterface:function()
	{
		$("#btnSearch").click(function(){
			
			bizMOB.Ui.openDialog("Address/html/AD001.html", 
			{
				message: {	
							callback1 : "page.setAddress"
	        	   		 }, 
    	   		width:"90%",
				height:"90%"
			});
		});
		
		$("#btnSearchDaum").click(function(){
			
			var tet = $("#divlayer");
			
			 new daum.Postcode({
		            oncomplete: function(data) {
		                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	            		alert(data);
		            	
		                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
		                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
		                var fullAddr = data.address; // 최종 주소 변수
//		                var extraAddr = ''; // 조합형 주소 변수
//
//		                // 기본 주소가 도로명 타입일때 조합한다.
//		                if(data.addressType === 'R'){
//		                    //법정동명이 있을 경우 추가한다.
//		                    if(data.bname !== ''){
//		                        extraAddr += data.bname;
//		                    }
//		                    // 건물명이 있을 경우 추가한다.
//		                    if(data.buildingName !== ''){
//		                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
//		                    }
//		                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
//		                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
//		                }

		                // 우편번호와 주소 정보를 해당 필드에 넣는다.
//		                document.getElementById('sample2_postcode').value = data.zonecode; //5자리 새우편번호 사용
//		                document.getElementById('sample2_address').value = fullAddr;
//		                document.getElementById('sample2_addressEnglish').value = data.addressEnglish;

		                // iframe을 넣은 element를 안보이게 한다.
		                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
		                $("#divlayer").hide();
		            },
		            onresize:function(size){
		            	tet.style.height = size.height+'px';
		            },
		            width : '100px',
		            height : '100px'
		        }).embed(tet);

			 	// iframe을 넣은 element를 보이게 한다.
		        $("#divlayer").show();

		        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
		        //initLayerPosition();

		});
		
		$("#btnCloseLayer").click(function(){
			$("#divlayer").hide();
		});
	},
	initData:function()
	{		
		
	},
	initLayout:function()
	{
		var IDName    =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
		var custCode  =  bizMOB.Storage.get("custCode");
		
		var UserID  =  bizMOB.Storage.get("UserID");
		var deptName  =  bizMOB.Storage.get("deptName");
		var deptCode  =  bizMOB.Storage.get("deptCode");
		var layout = ipmutil.getDefaultLayout("주소검색테스트");
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
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
	
	setAddress: function(rMsg){
		
		$("#txtLT_ADDR1").val(rMsg.LT_ADDR1);
		$("#txtLT_ADDR2").val(rMsg.LT_ADDR2);
		$("#txtZIPCODE5").val(rMsg.ZIPCODE5);
		$("#txtLT_ZIPSEQ").val(rMsg.LT_ZIPSEQ);
		$("#txtST_ADDR1").val(rMsg.ST_ADDR1);
		$("#txtST_ADDR2").val(rMsg.ST_ADDR2);
		$("#txtST_ZIPCODE").val(rMsg.ST_ZIPCODE);
		$("#txtST_BLD").val(rMsg.ST_BLD);
		$("#txtUNQ_LAW").val(rMsg.UNQ_LAW);
		
//		rMsg.LT_ZIPCODE 	구주소우편번호6자리(사용X)
//		rMsg.ZIPCODE5   	구주소우편번호5자리
//		rMsg.LT_ZIPSEQ  	구주소 우편번호 순번
//		rMsg.LT_ADDR1 		구주소1
//		rMsg.LT_ADDR2 		구주소2
//
//		rMsg.ST_ZIPCODE 	신주소우편번호
//		rMsg.ST_ADDR1		신주소1
//		rMsg.ST_ADDR2		신주소2
//		rMsg.ST_BLD 		건물명
//
//		rMsg.UNQ_LAW		법정동코드
//		rMsg.UNQ_OFFICE 	행정동코드
//		rMsg.UNQ_BLD_MNO	건물관리번호
//		rMsg.ADDR_RESULT	정제결과코드
//
//		rMsg.GIS1X			좌표1X
//		rMsg.GIS1Y			좌표1Y
//		rMsg.GIS2X			좌표2X
//		rMsg.GIS2Y			좌표2Y
	}
};