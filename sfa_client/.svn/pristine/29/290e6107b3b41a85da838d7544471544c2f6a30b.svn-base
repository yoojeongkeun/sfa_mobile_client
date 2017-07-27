// 올레맵 관련 모음집
map = 
{
    addrJson: [],
    latlngList: [],
    markerList: [],
    addrCnt: 0,
    funcExecCnt: 0,
    clusterer: null,
    ollehMap: null,
    directionsService: null,
    geocoder: null,
    control: null,
    geocodeListPush: function(data){
    	var custCode = "";
    	var custName = "";
    	var num = "";
    	if(map.addrJson.length == 0){
    		custName = "세스코";
    		num = "1";
    	}else{
    		custCode = map.addrJson[map.funcExecCnt].custcode;
    		custName = map.addrJson[map.funcExecCnt].custname;
    		num = map.addrJson[map.funcExecCnt].num;
    	}
    	var geocoderResult = map.geocoder.parseGeocode(data); 
      	
      	if(geocoderResult["count"] != "0" && geocoderResult["count"] != undefined){ 
          	var infoArr = geocoderResult["infoarr"];      	
          	map.latlngList.push({lat: infoArr[0].x, lng: infoArr[0].y, address: infoArr[0].address, custcode: custCode, custname: custName, imgnum: num });
          	
      	}
      	map.funcExecCnt++;
      	
      	if(map.funcExecCnt == map.addrCnt || map.addrCnt == 0){ 
      		map.setMarker(); 		
      	}else{
      		map.setGeocode(map.funcExecCnt);
        } 
    },
    setGeocode: function(cnt){
    	var target = "";
    	if(map.addrJson.length == 0){
    		target = "서울시 강동구 양재대로 1414-8";
    	}else{
    		target = map.addrJson[cnt].addr;
    	}
    	
    	map.geocoder.geocode({
           	type: 0,
           	addr: target,
         	addrcdtype: 3
        }, "map.geocodeListPush");
    },
    setMarker: function(){
    	map.clusterer = new olleh.maps.overlay.MarkerClusterer({
            gap: 20
        });

      	for(var i = 0; i < map.latlngList.length; i++){
          	var marker = new olleh.maps.overlay.Marker({
    			position: new olleh.maps.UTMK(map.latlngList[i].lat, map.latlngList[i].lng),
    			icon: "../images/circle" + map.latlngList[i].imgnum + ".png",
    			caption: map.latlngList[i].custname
    		});
          	map.markerList.push(marker);
          	map.clusterer.add(marker);
    	}
      	map.clusterer.setMap(map.ollehMap);
      	map.setMap();
    },
    setMap: function(){
    	map.ollehMap.setCenter(new olleh.maps.UTMK(map.latlngList[0].lat, map.latlngList[0].lng));	
    	for(var i = 0; i < map.latlngList.length - 1; i++){
    		var fx = map.latlngList[i].lat;
    		var fy = map.latlngList[i].lng;
    		var lx = map.latlngList[i + 1].lat;
    		var ly = map.latlngList[i + 1].lng;
    		if(map.addrCnt != 1)
    			map.setDirection(fx, fy, lx, ly);
    	}
    },
    initialize: function(){
    	map.geocoder = new olleh.maps.Geocoder("frKMcOKXS*l9iO5g");
        
    	map.control = olleh.maps.control.Control;
    	var mapOpts = {
        	center: new olleh.maps.UTMK(0, 0),
            zoom: 6,
            mapTypeId: 'ROADMAP',
            mapTypeControl: true,
            copyrightControl: false,
            mapTypeControlOptions: {
                position: map.control.TOP_RIGHT, // 컨트롤의 기본위치: 오른쪽 아래
                direction: map.control.HORIZONTAL, // 컨트롤의 배치방향: 세로로 배치
                bottom: 10 // 아래쪽 여백: 10px 
            }
        };

    	map.ollehMap = new olleh.maps.Map('map_div', mapOpts); 
        
        $(".control-change").parent().hide(); // 우측 하단 컨트롤 삭제   
        $(".control-pan").parents(".ollehmap-corner").hide(); // 좌측 상단 컨트롤 삭제
        map.setGeocode(0);
    },
    setDirection: function(fx, fy, lx, ly){
    	map.directionsService = new olleh.maps.DirectionsService('frKMcOKXS*l9iO5g');
    	map.directionsService.route({
            origin: new olleh.maps.UTMK(fx, fy),
            destination: new olleh.maps.UTMK(lx, ly),
            projection: olleh.maps.DirectionsProjection.UTM_K,
            travelMode: olleh.maps.DirectionsTravelMode.DRIVING,
            priority: olleh.maps.DirectionsDrivePriority.PRIORITY_0
        }, "map.directionsService_callback");
    },
    directionsService_callback: function(data){
    	var directionsResult = map.directionsService.parseRoute(data);
        var directionsRenderer = new olleh.maps.DirectionsRenderer({
            directions: directionsResult,
            map: map.ollehMap,
            keepView: true,
            offMarkers: true, 
            offPolylines: false,
            polylineOptions : {				// 경로 폴리라인 스타일 옵션
            strokeColor: '#5a52ff', // 경로 폴리라인 칼라. 디폴트 #ff3131
            strokeWeight : 3			// 경로 폴리라인 두께. 디폴트 5 
            }
        });
        directionsRenderer.setMap(map.ollehMap);
    }
};

page  =
{
	srNo : "",
	custCode : "",
	workYMD : "",
	workCnt : "",
	custType : "",
	custName : "",
	currentYMD : "",
	contentName : "",
	workType    : "",
	srYN    : "",
	isFirst: true,
	
	/**
	 * 최초 Init (반드시 존재해야 함)
	 * 
	 * @param json : data
	 */
	init : function(json)
	{
		// 기초값 넣기
		page.srNo = "";
		page.custCode = "";
		page.workYMD = "";
		page.workCnt = "";
		page.custType = "";
		page.custName = "";
		page.workType = "";
		bizMOB.Storage.save("freeSRYN", "N");
		bizMOB.Storage.remove("contentName");
		ipmutil.appendCommonMenu();
				
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		// 맵 숨기기(임시)
		$("#maplist").hide();
		
		$("#btnRefresh").click(function()
		{
			page.searchCustList();
		});
		
		$("#btnMapOnOff").click(function(){
			$("#map_div").toggle();
			page.mapToggleAfter();
		});
		
		$("#calendar").click(function()
		{
			$("#datepicker1").datepicker("show");
		});
		
		$("#btnconfirmCall").click(function()
		{
			// 확정통화
			if (page.custCode.length == 0 || !$(".list01 li").hasClass("on")) // 펼쳐진 항목이 없을 때
			{
				bizMOB.Ui.alert("고객을 먼저 선택해 주세요.");
				return;
			}
			
			var openOption = 
			{
				message:{ CustCode : page.custCode, workYMD : page.workYMD, srNum: page.srNo, srYN: page.srYN },
				width:"80%",
				height:"80%",
				base_on_size:"page",
				base_size_orientation:"vertical"
			};
			
			bizMOB.Ui.openDialog("service/html/CM018.html", openOption);
		});
		
		$("#btnNowork").click(function()
		{
			// 미작업등록
			if (page.custCode == 0 || !$(".list01 li").hasClass("on")) // 펼쳐진 항목이 없을 때
			{
				bizMOB.Ui.alert("고객을 먼저 선택해 주세요.");
				return;
			}
			
			var openOption = 
			{
				message:
				{
					custCode : page.custCode,
					srNo     : page.srNo,
					workYMD  : page.workYMD,
					srYN  	 : page.srYN
				},
				width:"80%",
				height:"80%",
				base_on_size:"page",
				base_size_orientation:"vertical"
			};
			
			bizMOB.Ui.openDialog("service/html/CM019.html", openOption);
		});
		
		$("#btnService").click(function()
		{	
			// 서비스제공
			if (page.custCode.length == 0 || !$(".list01 li").hasClass("on")) // 펼쳐진 항목이 없을 때
			{
				bizMOB.Ui.alert("고객을 먼저 선택해 주세요.");
				return;
			}
			
			if(($(".list01 li.on").find("#Pos").text() != "대기" && $(".list01 li.on").find("#Pos").text() != "완료") || ($(".list01 li.on").find("#Dc").text() != "일정확정" && $(".list01 li.on").find("#Dc").text() != "" ))
			{
				bizMOB.Ui.alert("일정확정 이외의 확정통화나 미작업이 등록된 플랜은 서비스를 시작할 수 없습니다.");
				return;
			}
			
			page.deptStartCheck();
		});
		
		$("#servicelistNew").delegate(".btnlist", "click", function()
        {
			// 선택 값 셋팅
			if($(this).parent().hasClass("on")){
				$(this).parent().removeClass("on");
				return;
			}
			page.setCenterMap($(this).attr("custcode"));
			page.custCode = $(this).attr("custcode");
			page.workYMD  = $(this).attr("workymd");
			page.workCnt  = $(this).attr("workcnt");
			page.custType = $(this).attr("custtype");
			page.srNo     = $(this).attr("srNum");
			page.custName = $(this).find(".custName").text();
			page.freeSRYN = $(this).attr("freeSRYN");
			page.contentName  = $(this).attr("workmngyn");
			page.workType  = $(this).attr("workType");
			page.srYN = $(this).attr("srYN");
			
			
			// 고객의 주소로 맵 세팅
			
			
			
			var loadYN = $(this).parent().find(".serviceInfo").attr("loadyn");
			
			if(loadYN != "Y")
			{
				// 세부항목리스트 셋팅
				page.setDetailInfo($(this).parent().find(".serviceInfo"));
				// 이미 로드 되어 있음을 표시
				$(this).parent().find(".serviceInfo").attr("loadyn", "Y");
			}
			
			// 자신의 노드만 펼치기
			$(".listopen").removeClass("on");
			$(this).parent().addClass("on");
			
        });
		
		$("#servicelistNew").delegate(".btn_call", "click", function()
        {
			var telnum = $(this).parent().attr("phonenumber").replace("-", "");
            
			if (telnum.length < 8)
            {
            	bizMOB.Ui.alert("알림","고객전화번호가 등록되지 않았습니다.");
            	return;
            }
            
            var button1 = bizMOB.Ui.createTextButton("예", function()
			{
	            if (telnum.length > 8) bizMOB.Phone.tel(telnum);
		    });
            var button2 = bizMOB.Ui.createTextButton("아니오", function(){	 return;});
            bizMOB.Ui.confirm("통화", "고객과 통화 하시겠습니까?", button1, button2);
        });
		
		$("#servicelistNew").delegate(".btn_sms", "click", function()
        {
			var telnum = $(this).parent().attr("phonenumber").replace("-", "");
            
            if (telnum.length < 9)
            {
            	bizMOB.Ui.alert("알림","고객전화번호가 등록되지 않았습니다.");
            	return;
            }
            
            var button1 = bizMOB.Ui.createTextButton("예", function()
	        {
	            if (telnum.length > 8) bizMOB.Phone.sms(telnum, "");
	        });
            var button2 = bizMOB.Ui.createTextButton("아니오", function(){	 return;});
            bizMOB.Ui.confirm("통화", "고객에게 문자메시지를 발송 하시겠습니까?", button1, button2);
        });
		
		// 지도
		$("#servicelistNew").delegate(".btn_map", "click", function()
        {
			var address = $(this).parent().parent().find(".serviceInfo tr:nth-child(6)").find(".contentValue").text();
			var parenthesesIndex = address.lastIndexOf("(");
			if(parenthesesIndex == -1){
				bizMOB.Map.show(address);
			}else{
				bizMOB.Map.show(address.substr(0, parenthesesIndex));
			}
        });
		
		// 사전조사 예비조사 등록 전 SR은 삭제 가능토록 허용
		$("#servicelistNew").delegate(".btn_srDel", "click", function()
        {
			var button1 = bizMOB.Ui.createTextButton("예", function()
	        {
				page.deleteSR();
	        });
            var button2 = bizMOB.Ui.createTextButton("아니오", function(){	 return;});
            bizMOB.Ui.confirm("알림", "서비스제공을 취소하시겠습니까?", button1, button2);
        });
	},
	initData:function(json)
	{
		var IDName    =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
 		$("#subname").text(IDName);
 		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
 		
 		if(page.isFirst){
 			page.isFirst = false;
 		}else{
 			page.resetMap();
 		}
 		$("#map_div").show();
		page.setDateName();
		page.searchCustList();
		
	},
	initLayout:function()
	{
		var option = cescommutil.datePickerOption(function(date){
				 page.currentYMD = date;
				 page.initData();
			}, "yymmdd"
		);
		$("#datepicker1").datepicker(option);
		var layout = ipmutil.getDefaultLayout("서비스일정");
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
	deleteSR:function()
	{
		if(page.srNo.length < 15 )
		{
			bizMOB.Ui.alert("알림","플랜에 대한 SR정보가 정확하지 않습니다.");
        	return;
		}
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01706");
		tr.body.P01 = page.srNo;
		
		
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
				else if(json.body.R01 == "Y")
				{
					bizMOB.Ui.alert("알림", "서비스 제공이 취소되었습니다.");										
				}
				else if(json.body.R01 == "N")
				{
					bizMOB.Ui.alert("알림", "사전조사, 예비조사가 등록된 서비스내역은 취소 할 수 없습니다.");										
				}
				else
				{
					bizMOB.Ui.alert("알림", "취소에 실패하였습니다. 다시 시도하여 주세요.");		
				}
				page.searchCustList();	
			}
		});		
		
	},
	
	
	callbackOnClose:function()
    {
		page.searchCustList();
    },
	setDateName:function()
	{
		var datestring = "";
		
		// 날짜 형식이 아니면 리턴함
		if (page.currentYMD.length != 8)
		{
			var today = new Date();
			datestring = today.bMToFormatDate("yyyy-mm-dd");
		}
			
		else
			datestring = page.currentYMD.substring(0, 4) + "-" + page.currentYMD.substring(4, 6) + "-" + page.currentYMD.substring(6, 8);
		
		var date = new Date(datestring);
		var days = date.getDay();
		var daystring = "";
		
		switch(days)
        {
	        case 1: // 월요일
	        	daystring = "월";
	        	break;
	        case 2: // 화요일
	        	daystring = "화";
	        	break;
	        case 3: // 수요일
	        	daystring = "수";
	        	break;
	        case 4: // 목요일
	        	daystring = "목";
	        	break;
	        case 5: // 금요일
	        	daystring = "금";
	        	break;
	        case 6: // 토요일
	        	daystring = "토";
	        	break;
	        case 0: // 일요일
	        	daystring = "일";
	        	break;
            default :
            	break;
        }
		
		$("#workdates").text(date.bMToFormatDate("yyyy-mm-dd"));
		$("#days").text(daystring + "요일");
		page.currentYMD = date.bMToFormatDate("yyyymmdd");
	},
	setNumber:function()
	{
		var lists = $("#servicelistNew .btnlist");
		for (var i=0; i<lists.length;i++)
		{
			$(lists[i]).find(".num").text(i+1);
		}
	},
	searchCustList:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01701");
		tr.body.P01 = "";
		tr.body.P02 = page.currentYMD;
		
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
				
				page.renderList(json, "list");
				page.setNumber();
			}
		});
	},
	renderList:function(json, listName)
	{
		// 항목 리스트를 셋팅하기
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".listopen",
		 		value:listName,
		 		detail:
	 			[
 			 		{type:"single", target:".btnlist@custcode+", value:"R04"}, // 고객코드
 			 		{type:"single", target:".custCode", value:"R04"}, // 고객코드
 			 		{type:"single", target:".btnlist@workcnt+", value:"R05"}, // 작업횟수
 			 		{type:"single", target:".btnlist@workymd+", value:"R01"}, // 작업일자
 			 		{type:"single", target:".btnlist@custtype+", value:"R03"}, // 업종구분
 			 		{type:"single", target:".btnlist@srNum+", value:"R15"}, // sr번호
 			 		{type:"single", target:".btnlist@freeSRYN+", value:"R16"}, // 무료진단여부
 			 		{type:"single", target:".btnlist@workType+", value:"R19"}, // 작업구분
 			 		{type:"single", target:".btnlist@srYN+", value:"R20"}, // sr등록여부
 			 		{type:"single", target:".custName", value:"R06"}, // 고객명
 			 		{type:"single", target:"#Pos", value:"R09"}, // 고객명
 			 		{type:"single", target:".phone@phonenumber+", value:"R14"}, // 전화번호
 			 		{type:"single", target:".btnlist@workmngyn+", value:"R17"}, // 담당구분
 			 		{type:"single", target:"#Dc", value:"R18"}, // 고객명
 			 		{type:"single", target:".serviceTime", value:function(arg)
 			 			{
 			 			    var start = new Date(arg.item.R07);
 			 			    var end = new Date(arg.item.R08);
 			 				
 			 				return start.bMToFormatDate("HH:nn") + " ~ " + end.bMToFormatDate("HH:nn");
 			 					
 			 			}}, // 서비스시간
 			 		
					{type:"single", target:"#Pos@class+", value:function(arg)
                        { 
                            // 작업구분에 따른
					        var workType = arg.item.R09;
					        var imageClass = "";
                            
					        switch(workType)
					        {
						        case "일정변경":
						        case "작업취소":
						        case "미통화":
						        case "해약요구":
						        case "회사사정":
						        case "부재":
						        case "기타":
						        case "당월미작업":
						        case "대기":
					            	imageClass = " poss";
                                    break;
					            case "완료":
					            default :
                                	imageClass = "";
                                    	break;
					        }
                            
                            return imageClass;
                        }}
 		        ]
		 	}
		];
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = { clone:true, newId:"servicelistNew", replace:true };
		// 그리기
		$("#servicelist").bMRender(json.body, dir, options);
		page.getCustAddressList();
	},
	setDetailInfo:function($target)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01702");
		var trWorkCnt = new Number(page.workCnt);
		tr.body.P01 = trWorkCnt;
		tr.body.P02 = page.custCode;
		tr.body.P03 = page.custType;
		tr.body.P04 = page.workYMD;
		
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
				
				// 세부항목리스트 렌더
				page.renderDetailList(json, "L01", $target);
				
			}
		});
	},
	renderDetailList:function(json, listName, $target)
	{
		// 세부항목리스트 렌더
		var dir = 
		[
		 	{
		 		type:"loop",
		 		target:".customerInfoDetail",
		 		value:listName,
		 		detail:
	 			[
	 			 
					{type:"single", target:".contentName@contentYN+", value:function(arg)
							{
							    var contentName1 = arg.item.R01;
							    
							    if (contentName1 == "담당여부")
							    	{
							    	 contentName1 = "Y";
							    	}
							    else{
							    	
							    	contentName1 = "N";
							    }
									return contentName1;
							}}, 
	 			    
	 			 
	 			 	{type:"single", target:".contentName", value:"R01"}, // 항목명
	 			 	{type:"single", target:".contentValue", value:function(arg){
	 			 		return arg.item.R02 == "1900-01-01" ? "" : arg.item.R02; // 확정통화일자가 '1900-01-01'로 나오는 현상 처리
	 			 	}}, // 항목내용
 		        ]
		 	}
		];
		// 그리기
		$target.bMRender(json.body, dir, null);
		
		// 자동이체가 아닌 고객들은 자동이체일자 hide 시키기
		if($($(".on td")[11]).text() == ""){
			$($(".on td")[11]).parent().hide();
		}
	},
	/**
	 * 서비스 시간 체크
	 */
	ServiceDateChk : function ()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01703");
		tr.body.P01 = page.srNo;
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if (json.header.result == false)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					page.serviceStart(json);
				}						
			}
		});
	},
	/**
	 * 서비스 시작 로직 : 조선호 추가(20140625)
	 * 
	 * @param json : 서비스 시간 데이터
	 */
	serviceStart:function(json)
	{
		var serviceTime = json.body.R01;
		
		if (page.contentName != "Y")
		{
			var btnSetStartTime 	= bizMOB.Ui.createTextButton("이동", page.serviceOpen);
			var message 			= "부담당자로 플랜이 생성되어 있습니다.\n모니터링 등록만 진행할 수 있습니다.\n그외의 기능은 제한되거나 조회만 가능합니다.";
			bizMOB.Ui.alert("서비스시작", message, btnSetStartTime);
		}
		else
		{
			if (serviceTime.length > 0)
			{
				var nowDate = new Date().bMToFormatDate("yyyymmdd");
				if(nowDate > page.workYMD)
				{
					page.serviceOpen();
				}
				else
				{
					var btnSetStartTime 	= bizMOB.Ui.createTextButton("예(시간수정)", page.ServiceDateInsert);
					var btnMoveService 		= bizMOB.Ui.createTextButton("아니요(사전미팅이동)", page.serviceOpen);
					var message 			= serviceTime + "로 시작시간이 설정되어 있습니다.\n서비스 시작시간을 재설정 하시겠습니까?\n시작시간은 변경하시면 기존 서비스 시작시간을 덮어씁니다.";
					
					bizMOB.Ui.confirm("서비스시작", message, btnSetStartTime, btnMoveService);
				}
			}
			else
				page.ServiceDateInsert();
		}
	},
	/**
	 * 서비스 이동
	 */
	serviceOpen:function()
	{
		// 스토리지 셋팅
		bizMOB.Storage.save("srNum"			, page.srNo);
		bizMOB.Storage.save("custCode"		, page.custCode);
		bizMOB.Storage.save("workYMD"		, page.workYMD);
		bizMOB.Storage.save("custName"		, page.custName);
		bizMOB.Storage.save("workCnt"		, page.workCnt);
		bizMOB.Storage.save("freeSRYN"		, page.freeSRYN);
		bizMOB.Storage.save("contentName"	, page.contentName);
		bizMOB.Storage.save("custType"	    , page.custType);
		bizMOB.Storage.save("workType"	    , page.workType);
		var openOption = 
		{
			modal   : false,
			replace : false,
			message : { }
		};
		
		bizMOB.Web.open("service/html/CM023.html", openOption);
	},
	/**
	 * 직접 서비스 이동
	 */
	ServiceDateInsert:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01704");
	
		tr.body.P01 = page.srNo;
		tr.body.P02 = page.custCode;
		tr.body.P03 = page.workYMD;
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("오류", json.header.error_text);
					return;
				}
				else
				{					  	
					page.serviceOpen();
				}
			}
		});
	},
	/**
	 * 시작시간 체크 로직
	 */
	deptStartCheck : function()
	{
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01705");
		
		tr.body.P01 = page.workYMD;
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
					bizMOB.Ui.alert("오류", json.header.error_text);
				else
					{
						page.checkDate(json);
					}
					
					
			}
		});
	},
	/**
	 * 서비스 시작시간 재설정(설정) 또는 서비스 오픈(당일이 아닌경우)
	 * 
	 * @parem json : data
	 */
	checkDate:function(json)
	{
		var nowDate = new Date();
		if($("#workdates").text().bMToNumber() >= nowDate.bMToFormatDate("yyyymmdd").bMToNumber())
		{
			if (json.body.R01 == "Y")
			{							
				var nowDate = new Date().bMToFormatDate("yyyymmdd");
			    
			    if (nowDate == page.workYMD) // 당일에만 서비스 시작시간을 재설정해준다.
		    	{
			    	page.ServiceDateChk();
		    	}
			    else if (nowDate < page.workYMD)
		    	{
			    	bizMOB.Ui.alert("경고", "예정된 서비스는 시작할 수 없습니다.");
		    	}
			    else
		    	{
			    	page.serviceOpen();
		    	}
			}
			else
				bizMOB.Ui.alert("경고", "지사 출발이 등록되지 않은 서비스 입니다.");
		}
		else
		{
			var nowDate = new Date().bMToFormatDate("yyyymmdd");
		    
		    if (nowDate == page.workYMD) // 당일에만 서비스 시작시간을 재설정해준다.
	    	{
		    	page.ServiceDateChk();
	    	}
		    else if (nowDate < page.workYMD)
	    	{
		    	bizMOB.Ui.alert("경고", "예정된 서비스는 시작할 수 없습니다.");
	    	}
		    else
	    	{
		    	page.ServiceDateChk();
		    	//page.serviceOpen();
	    	}
		}
	},
	// 오늘 루트 고객들의 주소(추후 gps 위도경도) 세팅 부분
	getCustAddressList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01707");
		tr.body.P01 = page.currentYMD;//(new Date()).bMToFormatDate("yyyymmdd");
		tr.body.P02 = "";
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
					bizMOB.Ui.alert("오류", json.header.error_text);
				else{
					//{addr: "서울 강동구 양재대로 1412", num: "1", custname: "세스코"}
					var cnt = json.body.LIST01.length;
					for(var i = 0; i < cnt; i++){
						map.addrJson.push({addr: json.body.LIST01[i].R01, num: (i + 1).toString(), custcode: json.body.LIST01[i].R03, custname: json.body.LIST01[i].R04});
						map.addrCnt++;
					}
					map.initialize();
				}	
			}
		});
	},
	// 고객 위치 표시 관련 함수
	setCenterMap: function(custcode){
		var cnt = 0;
		for(var i = 0; i < map.latlngList.length; i++){
			if(map.latlngList[i].custcode == custcode){
				cnt = i;
				break;
			}
		}
		if(map.ollehMap != undefined)
			map.ollehMap.setCenter(new olleh.maps.UTMK(map.latlngList[cnt].lat, map.latlngList[cnt].lng));
	},
	// map 안의 객체 리셋, 관련 리스트 초기화
	resetMap: function(){
		$("#map_div").html("");
		map.latlngList.length = 0;
		map.addrJson.length = 0;
		map.markerList.length = 0;
		map.addrCnt = 0;
		map.funcExecCnt = 0;
	},
	// map hide, show 후 margin 처리
	mapToggleAfter: function(){
		if($("#map_div").is(":visible")){
			$("#servicelistNew").css("margin-top", "248px");
		}else{
			$("#servicelistNew").css("margin-top", "0px");
		}
	}
	
};

function onClickAndroidBackButton()
{
    var btnConfirm = bizMOB.Ui.createTextButton("이동", function()
    {
	    bizMOB.Web.open("root/html/CM002.html", 
		{ 
	    	message : 
	    	{
	    	   UserID  :  bizMOB.Storage.get("UserID")
	    	},
		    modal:false,
            replace:false
		}); 
/*    	var v = {
				call_type:"js2app",
				id:"GOTO_HOME",
				param:{} 
			};

		bizMOB.onFireMessage(v);*/
     });    
     var btnCancel = bizMOB.Ui.createTextButton("취소", function()
     {
    	 return;
     });
     bizMOB.Ui.confirm("화면이동", "업무절차상 메인화면으로 이동합니다.", btnConfirm, btnCancel);
}