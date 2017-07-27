page  =
{
	/**** 전역변수 ****/
	strDivSeNum:"", // 구획일련번호
	strDivLarge:"", // 대분류명
	strDivLargeCode:"", // 대분류코드
	strDivMiddle:"", // 중분류명
	strDivMiddleCode:"", // 중분류코드
	strDivDetail:"", // 세분류명
	strDivDetailCode:"", // 세분류코드
	strFloor:"", // 층명
	strFloorCode:"", // 층코드
	strDivCode:"", // 구획코드
	strPosiDesp:"", // 세부위치설명
	
	/**
	 * 기본 Init 
	 */
	init : function(json)
	{	
		// 기본 설정값
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	/**
	 * 기본 initInterface
	 */
	initInterface:function()
	{
		// 최종 확인 버튼
		$("#btnComplete").click(function() {
			
			var btnComfirm = bizMOB.Ui.createTextButton("예", function() {
				
				bizMOB.Web.close(
						{
							modal : false ,
							callback : "page.setList"
						});
				
				
			});

			var btnCancle = bizMOB.Ui.createTextButton("아니오", function() {
				return;
			});
			
			bizMOB.Ui.confirm("알림", "일반 모니터링페이지를 닫으시겠습니까?", btnComfirm, btnCancle);
			
			
		});
		
		// 대 리스트 클릭 이벤트
		$(".acc_head").click(function() {
			if ($(this).parent().hasClass("on")) return;
			// 항목 디자인 셋팅
			page.setListOnClass($("li.accodion"), $(this).parent(), "on");
			page.setTopButtonFirstMenu();
			cm031004.resetInputData();
			
			switch ($(this).attr("name"))
			{
				case "monitoring":
					$("#facilCheckContent_monitoring").append($("#facilCheckContent"));
					break;
				case "checkFacility":
					$("#facilCheckContent_checkFacility").append($("#facilCheckContent"));
					$("#facilCheckContent").show();
					$("#ftButtonBar").show();
					break;
				case "improvement":
					$("#ftButtonBar").show();
					break;
			}
		});
		
		// 세부발생위치 클릭 이벤트
		$("#tbDetailAreaListNew").delegate(".detailList", "click", function() {
			// 항목 디자인 셋팅
			page.setListOnClass($("#tbDetailAreaListNew .detailList"), $(this), "bg02");
			page.setTopButtonFirstMenu();
			cm031004.resetInputData();
			
			var text = $(this).find(".areaName").text();
			var seqn = $(this).find(".areaName").attr("unitseq");
			
			page.setDetailLabel(seqn, text);
			
			page.getDetailAreaContent(seqn);
			$("#ftButtonBar").show();
		});
		
		// 세부발생위치 클릭 이벤트
		$("#eqipListNew").delegate(".detailList", "click", function() {
			// 항목 디자인 셋팅
			page.setListOnClass($("#eqipListNew .detailList"), $(this), "bg02");
			var $target = $(this).find(".name");
			cm031004.setData({
				reqNum : $target.attr("recnum"),
				probLarge : $target.attr("qltype"),
				probMiddle : $target.attr("qmtype"),
				checkStat : $target.attr("qstype"),
				image1 : $target.attr("img1"),
				image2 : $target.attr("img2"),
				probText : $target.attr("qcontent"),
				improveText : $target.attr("qicontent")
			});
			
			
		});
		
		// 탑 메뉴(4건 체크)
		$("ul .topButton").click(function() {
			switch ($(this).find("button").attr("name"))
			{
				case "morn":
				case "eqip":
					if ($("#pestListNew tr").length == 0)
					{
						bizMOB.Ui.alert("해충을 하나라도 등록하셔야 진행 가능합니다.");
						return;
					}
				default:
					break;
			}
			
			// 항목 디자인 셋팅
			page.setListOnClass($("li.topButton"), $(this), "on");
			$(".deAreaListConts").hide();
			
			switch ($(this).find("button").attr("name"))
			{
				case "name":
					$("#moniAreaContent").show();
					break;
				case "pest":
					$("#pestContent").show();
					break;
				case "morn":
					$("#moniContent").show();
					$("#ftButtonBar").show();
					if (cm031002.isNewPestLoad)
					{
						cm031003.setComboStandPest(function() {
							$("#selRegPestListNew").trigger("change");
						});
					}
					break;
				case "eqip":
					$("#facilCheckContent_monitoring").show();
					$("#facilCheckContent").show();
					$("#ftButtonBar").show();
					break;
			}
		});
		
		// 신규버튼 클릭 이벤트
		$(".bot_btn button[name=btnNew]").click(function() {
			
			var json = {
				monifunc : function() {
					// 모니터링 이벤트
					page.resetMoni();
					
					$("#tbDetailAreaListNew .detailList").removeClass("bg02");
					$("#ftButtonBar").hide();
				},
				chkffunc : function() {
					// 시설점검 이벤트
					cm031004.resetInputData();
					$("#eqipListNew .detailList").removeClass("bg02");
				},
				imprfunc : function() {
					// 개선사항 이벤트
					cm031005.resetInputControl();
					$("#tbProvListNew .detailList").removeClass("bg02");
				},
				callback : function() {
					// 완료 이벤트
					
				}
			};
			
			page.buttonClickEvent(json);
		});
		
		// 삭제버튼 클릭 이벤트
		$(".bot_btn button[name=btnDelete]").click(function() {
			var chkcallback = function(){
				var json = {
					monifunc : function() {
						// 모니터링 이벤트
						
						var chkeJson = cm031004.getData();
						var recnum = ipmutil.isNull(chkeJson.reqNum, "");
						var unitseq = ipmutil.isNull($("#detailInfoContent .unitseq").text(), "");
						
						if (unitseq.length == 0)
						{
							bizMOB.Ui.alert("삭제할 대상이 선택되지 않았습니다.");
							return;
						}
						
						var btnDelete = bizMOB.Ui.createTextButton("삭제", function() {
							page.deleteMonitoring(recnum, unitseq, function() {
								// 초기화
								page.resetMoni();
							});
						});
	
						var btnCancle = bizMOB.Ui.createTextButton("취소", function() {
							return;
						});
						
						bizMOB.Ui.confirm("알림", "일반 모니터링을 삭제하시겠습니까?", btnDelete, btnCancle);
					},
					chkffunc : function() {
						// 시설점검 이벤트
						var chkeJson = cm031004.getData();
						var recnum = ipmutil.isNull(chkeJson.reqNum, "");
						
						if (recnum.length == 0)
						{
							bizMOB.Ui.alert("삭제할 대상이 선택되지 않았습니다.");
							return;
						}
						
						var btnDelete = bizMOB.Ui.createTextButton("삭제", function() {
							page.deleteFacilCheck(recnum, function() {
								page.getFacilCheck();
								page.getImprovementList();
								
								cm031004.resetInputData();
							});
						});
	
						var btnCancle = bizMOB.Ui.createTextButton("취소", function() {
							return;
						});
						
						bizMOB.Ui.confirm("알림", "시설점검 내용을 삭제하시겠습니까?", btnDelete, btnCancle);
					},
					imprfunc : function() {
						// 개선사항 이벤트
						
					},
					callback : function() {
						// 완료 이벤트
						
					}
				};
				
				page.buttonClickEvent(json);
			};
			ipmutil.chkServerTime(chkcallback);
		});
		
		// 등록버튼 클릭 이벤트
		$(".bot_btn button[name=btnConfirm]").click(function() {
			var chkcallback = function(){
				var json = {
					monifunc : function() {
						// 모니터링 이벤트
						page.saveMonitoring(function() {
							page.resetMoni();
						});
					},
					chkffunc : function() {
						// 시설점검 이벤트
						page.saveFacilCheck(function() {
							page.getFacilCheck();
							page.getImprovementList();
							
							cm031004.resetInputData();
						});
					},
					imprfunc : function() {
						// 개선사항 이벤트
						page.saveImprove(function() {
							// 저장 완료후 진행
							page.getImprovementList();
							
							cm031005.resetInputControl();
						});
					},
					callback : function() {
						// 완료 이벤트
						
					}
				};
				
				page.buttonClickEvent(json);
			};
			ipmutil.chkServerTime(chkcallback);
		});
		
		$("#tbProvListNew").delegate(".detailList", "click", function() {
			page.setListOnClass($("#tbProvListNew .detailList"), $(this), "bg02");
			
			var json ={
					impSuyong : $(this).find(".suyongyn").attr("code"),
					impProc : $(this).find(".sihangyn").attr("code"),
					impResDate : $(this).find(".provPreDate").text(),
					ipmtext : $(this).find(".provReqDate").attr("impcontent"),
					impImg1 : $(this).find(".provReqDate").attr("prvimg1"),
					impImg2 : $(this).find(".provReqDate").attr("prvimg2")
			};
			
			$("#improvementContent").attr("recnum", $(this).find(".provReqDate").attr("recnum"));
			$("#improvementContent").attr("workymd", $(this).find(".provReqDate").attr("ymd"));
			
			cm031005.setData(json);
		});
	},
	/**
	 * 기본 initData
	 */
	initData:function(json)
	{
		page.setGlobalValue(json, function(){
			// 글로벌 변수가 완료되면 구획정보를 설정함.
			page.setDivInfo();
			page.getDetailAreaList();
			page.getImprovementList();
			page.getFacilCheck();
		});
	},
	/**
	 * 기본 initLayout
	 */
	initLayout:function()
	{
		var titlebar = new bizMOB.Ui.TitleBar("일반모니터링 등록");
		titlebar.setVisible(false);
		var layout = new bizMOB.Ui.PageLayout();
		layout.setTitleBar(titlebar);
		bizMOB.Ui.displayView(layout);
		
		cm031001.init($("#moniAreaContent"));
		cm031002.init($("#pestContent"));
		cm031003.init($("#moniContent"));
		cm031004.init($("#facilCheckContent"));
		cm031005.init($("#improvementContent"));
		
		$("#eqipList").hide();
		$("#tbProvList").hide();
	},
	/**
	 * 모니터링 데이터 초기화
	 */
	resetMoni:function()
	{
		// 초기화
		page.getDetailAreaList();
		page.getImprovementList();
		
		cm031001.resetInputControl();
		cm031002.resetAll();
		cm031003.resetControl();
		cm031004.resetInputData();
		
		page.setDetailLabel("", "");
		page.setTopButtonFirstMenu();
	},
	/**
	 * 버튼이벤트
	 * @param json
	 */
	buttonClickEvent:function(json)
	{
		var name = $("li.accodion.on div.acc_head").attr("name");
		switch (name)
		{
			case "monitoring": // 모니터링
				json.monifunc();
				break;
			case "checkFacility": // 시설점검
				json.chkffunc();
				break;
			case "improvement": // 개선사항
				json.imprfunc();
				break;
			default:
				break;
		};
		
		if (json.callback) json.callback();
	},
	/**
	 * 세부항목 이름 표시
	 * @param seqn
	 * @param text
	 */
	setDetailLabel:function(seqn, text)
	{
		$("#detailInfoContent .unitseq").text(seqn);
		$("#detailInfoContent .areaName").text(text);
	},
	/**
	 * TOP BUTTON 첫번째 메뉴 클릭
	 */
	setTopButtonFirstMenu:function()
	{
		var $target = $("ul .topButton button[name=name]").parent();
		page.setListOnClass($("ul .topButton"), $target, "on");
		
		var yn = cm031003.getCheckYNCheck();
		if (yn == "Y")
			$("button[name=eqip]").parent().show();
		else
			$("button[name=eqip]").parent().hide();
		
		$(".deAreaListConts").hide();
		$("#moniAreaContent").show();
		$("#facilCheckContent").hide();
		
		page.setCommonButtonBarView();
	},
	/**
	 * 하단 공통 버튼 영역 셋팅
	 */
	setCommonButtonBarView:function()
	{
		var isView = true;
		
		// 새로 등록되었을때에는 하단 버튼 바를 숨김
		if ($("#detailInfoContent .unitseq").text().length == 0)
			isView = false;
		
		if (isView)
			$("#ftButtonBar").show();
		else
			$("#ftButtonBar").hide();
	},
	/**
	 * class 공통 추가
	 */
	setListOnClass:function($target, $thisTarget, onClassName)
	{
		$target.not($thisTarget).removeClass(onClassName);
		$thisTarget.addClass(onClassName);
	},
	/**
	 * 구획정보 설정
	 */
	setDivInfo:function()
	{
		var $info = $("#custDivInfo");
		
		$info.find(".divSeNum").text(page.strDivSeNum);
		$info.find(".divLarge").text(page.strDivLarge);
		$info.find(".floor").text(page.strFloor);
		$info.find(".divMiddle").text(page.strDivMiddle);
		$info.find(".divDetail").text(page.strDivDetail);
	},
	/**
	 * 글로벌 변수 설정
	 * @param json { custCode, workYMD, divSeNum, divLarge, divLargeCode, divMiddle, divMiddleCode, divDetail, divDetailCode, floor, floorCode }
	 * @param callback function
	 */
	setGlobalValue:function(json, callback)
	{
		// 넘겨져온 데이터가 없으면 리턴
		if (cescommutil.isEmpty(json))
			return;
		
		// 전역변수 셋팅
		page.strDivSeNum = json.divSeNum;
		page.strDivLarge = json.divLarge;
		page.strDivLargeCode = json.divLargeCode;
		page.strDivMiddle = json.divMiddle;
		page.strDivMiddleCode = json.divMiddleCode;
		page.strDivDetail = json.divDetail;
		page.strDivDetailCode = json.divDetailCode;
		page.strFloor = json.floor;
		page.strFloorCode = json.floorCode;
		page.strDivCode = json.divCode;
		page.strPosiDesp = json.posiDesp;
		
		// 콜백함수 호출
		if(callback) callback();
	},
	/**
	 * 상세내역 셋팅
	 * @param unitSeq
	 */
	getDetailAreaContent:function(unitSeq)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03111");
		tr.body.P01 = unitSeq;
		
		cescommutil.getTr(tr, function(json){
			// 발생위치명 셋팅
			cm031001.setData(json.body.R02, function() {
				cm031001.aFocusOut();
			});
			
			cm031002.resetAll(function() {
				// 해충리스트 셋팅
				cm031002.setPestList(json, function() {
					// 모니터링 셋팅
					cm031003.setData({
						standardPest : json.body.R03,
						reason1 : json.body.R04,
						reason2 : json.body.R05,
						solution1 : json.body.R06,
						solution2 : json.body.R07,
						solution3 : json.body.R08,
						checkYN : json.body.R09
					});
					
					// 시설점검 셋팅
					if (!json.body.R09) return;
					
					cm031004.setData({
						reqNum : json.body.R10.trim(),
						probLarge : json.body.R11,
						probMiddle : json.body.R12,
						checkStat : json.body.R13,
						image1 : json.body.R16,
						image2 : json.body.R17,
						probText : json.body.R14,
						improveText : json.body.R15
					});
				});
			});
		});
	},
	/**
	 * 세부발생위치 목록 조회(전문)
	 */
	getDetailAreaList:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03102");
		tr.body.P01 = "";
		tr.body.P02 = page.strDivSeNum;
		tr.body.P03 = page.strDivLargeCode;
		tr.body.P04 = page.strFloorCode;
		tr.body.P05 = page.strDivMiddleCode;
		tr.body.P06 = page.strDivDetailCode;
		
		cescommutil.getTr(tr, function(json){
			// 성공시 세부발생위치 목록 렌더링
			var detail = 
			[
			 	{type:"single", target:".areaName", value:"R02"},
			 	{type:"single", target:".areaName@unitseq+", value:"R01"}
	        ];
			
			cescommutil.renderLoopList(
				$("#tbDetailAreaList"),
				{
					loopTarget : ".detailList",
					listName : "L01",
					details : detail,
					isClone : true,
					loopTargetNew : "tbDetailAreaListNew",
					isReplace : true,
				},
				json);
		});
	},
	/**
	 * 개선사항 리스트 조회
	 */
	getImprovementList:function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03114");
		tr.body.P01 = page.strDivSeNum;
		
		cescommutil.getTr(tr, function(json){
			// 성공시 세부발생위치 목록 렌더링
			var detail = 
			[
			 	{type:"single", target:".provReqDate", value:function(arg) {
			 		if (arg.item.R02.length == 8)
		 			{
				 		return arg.item.R02.trim().bMToFormatDate("yyyy-mm-dd");
		 			}
			 		else
		 			{
			 			return "";
		 			}
			 	}},
			 	{type:"single", target:".provReqDate@recnum+", value:"R01"},
			 	{type:"single", target:".provReqDate@ymd+", value:"R02"},
			 	{type:"single", target:".provReqDate@chkimg1+", value:"R09"},
			 	{type:"single", target:".provReqDate@chkimg2+", value:"R10"},
			 	{type:"single", target:".provReqDate@prvimg1+", value:"R11"},
			 	{type:"single", target:".provReqDate@prvimg2+", value:"R12"},
			 	{type:"single", target:".provReqDate@impcontent+", value:"R05"},
			 	{type:"single", target:".suyongyn", value:"R04"},
			 	{type:"single", target:".suyongyn@code+", value:"R03"},
			 	{type:"single", target:".sihangyn", value:"R08"},
			 	{type:"single", target:".sihangyn@code+", value:"R07"},
			 	{type:"single", target:".provPreDate", value:function(arg) {
			 		if (arg.item.R06.length == 8)
		 			{
				 		return arg.item.R06.trim().bMToFormatDate("yyyy-mm-dd");
		 			}
			 		else
		 			{
			 			return "";
		 			}
			 	}},
			 	{type:"single", target:".provPreDate@ymd+", value:"R06"}
	        ];
			
			cescommutil.renderLoopList(
				$("#tbProvList"),
				{
					loopTarget : ".detailList",
					listName : "L01",
					details : detail,
					isClone : true,
					loopTargetNew : "tbProvListNew",
					isReplace : true,
				},
				json);
		});
	},
	/**
	 * 시설점검 리스트 조회
	 * @param callback
	 */
	getFacilCheck:function(callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03115");
		tr.body.P01 = page.strDivSeNum;
		tr.body.P02 = page.strDivLargeCode;
		tr.body.P03 = page.strFloorCode;
		tr.body.P04 = page.strDivMiddleCode;
		tr.body.P05 = page.strDivDetailCode;
		
		cescommutil.getTr(tr, function(json){
			// 성공시 세부발생위치 목록 렌더링
			var detail = 
			[
			 	{type:"single", target:".name", value:"R06"},
			 	{type:"single", target:".name@recnum+", value:"R01"},
			 	{type:"single", target:".name@qltype+", value:"R03"},
			 	{type:"single", target:".name@qmtype+", value:"R05"},
			 	{type:"single", target:".name@qstype+", value:"R07"},
			 	{type:"single", target:".name@qcontent+", value:"R08"},
			 	{type:"single", target:".name@qicontent+", value:"R09"},
			 	{type:"single", target:".name@img1+", value:"R10"},
			 	{type:"single", target:".name@img2+", value:"R11"}
	        ];
			
			cescommutil.renderLoopList(
				$("#eqipList"),
				{
					loopTarget : ".detailList",
					listName : "L01",
					details : detail,
					isClone : true,
					loopTargetNew : "eqipListNew",
					isReplace : true,
				},
				json);
		});
	},
	/**
	 * 일반모니터링 저장
	 * @param callback
	 */
	saveMonitoring:function(callback)
	{
		var pUnitSeq = $("#detailInfoContent .unitseq").text();
		var pUnit = cm031001.getData();
		var pestList = cm031002.getPestList();
		var moniJson = cm031003.getData();
		var chkeJson = cm031004.getData();
		
		// 제약사항 체크
		if (pUnit.length == 0)
		{
			bizMOB.Ui.alert("발생위치명을 등록해 주세요.");
			return;
		}
		
		if (cescommutil.isEmpty(pestList) && pestList.length == 0)
		{
			bizMOB.Ui.alert("해충을 등록해 주세요.");
			return;
		}
		
		if (cescommutil.isEmpty(moniJson.standardPest) && moniJson.standardPest.length == 0)
		{
			bizMOB.Ui.alert("모니터링에서 대표해충을 선택해 주세요.");
			return;
		}
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03112");
		tr.body.P01 =  pUnitSeq; // unitseq
	    tr.body.P02 =  page.strDivSeNum; // divsenum
	    tr.body.P03 =  pUnit; // unit
	    tr.body.P04 =  page.strDivLargeCode; // divlargecode
	    tr.body.P05 =  page.strDivLarge; // divlarge
	    tr.body.P06 =  page.strFloorCode; // floorcode
	    tr.body.P07 =  page.strFloor; // floor
	    tr.body.P08 =  page.strDivMiddleCode; // divmiddlecode
	    tr.body.P09 =  page.strDivMiddle; // divmiddle
	    tr.body.P10 =  page.strDivDetailCode; // divdetailcode
	    tr.body.P11 =  page.strDivDetail; // divdetail
	    tr.body.P12 =  page.strDivCode; // divcode
	    tr.body.P13 =  moniJson.standardPest; // bugscode
	    tr.body.P14 =  ipmutil.isNull(moniJson.reason1, ""); // causecode1
	    tr.body.P15 =  ipmutil.isNull(moniJson.reason2, ""); // causecode2
	    tr.body.P16 =  ipmutil.isNull(moniJson.solution1, ""); // solutioncode1
	    tr.body.P17 =  ipmutil.isNull(moniJson.solution2, ""); // solutioncode2
	    tr.body.P18 =  ipmutil.isNull(moniJson.solution3, ""); // solutioncode3
	    tr.body.P19 =  moniJson.checkYN; // 점검등록여부
	    tr.body.P20 =  chkeJson.reqNum; // receivenum
	    tr.body.P21 =  ipmutil.isNull(chkeJson.probLarge, ""); // qltypecode
	    tr.body.P22 =  ipmutil.isNull(chkeJson.probMiddle, ""); // qmtypecode
	    tr.body.P23 =  ipmutil.isNull(chkeJson.checkStat, ""); // qstypecode
	    tr.body.P24 =  chkeJson.probText; // quescontent
	    tr.body.P25 =  chkeJson.improveText; // qeusimprocontent
	    tr.body.P26 =  chkeJson.image1; // img1
	    tr.body.P27 =  chkeJson.image2; // img2
	    
	    tr.body.L01 =  pestList; // bugslist
	    
	    bizMOB.Web.post(
		{
			message : tr,
			success : function(json) {
				if (json.header.result == true)
				{
					bizMOB.Ui.alert("저장 하였습니다.");
					if (callback) { callback(); }
				}
				else 
					bizMOB.Ui.alert("오류", json.header.error_text);
			}
		});
	},
	/**
	 * 시설점검 저장
	 * @param callback
	 */
	saveFacilCheck:function(callback)
	{
		var chkeJson = cm031004.getData();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03116");
		tr.body.P01 =  chkeJson.reqNum; // receivenum
	    tr.body.P02 =  ipmutil.isNull(chkeJson.probLarge, ""); // qltypecode
	    tr.body.P03 =  ipmutil.isNull(chkeJson.probMiddle, ""); // qmtypecode
	    tr.body.P04 =  ipmutil.isNull(chkeJson.checkStat, ""); // qstypecode
	    tr.body.P05 =  chkeJson.probText; // quescontent
	    tr.body.P06 =  chkeJson.improveText; // qeusimprocontent
	    tr.body.P07 =  chkeJson.image1; // img1
	    tr.body.P08 =  chkeJson.image2; // img2	    
	    tr.body.P09 =  page.strDivSeNum; // divsenum
	    tr.body.P10 =  page.strDivLargeCode; // divlargecode
	    tr.body.P11 =  page.strDivLarge; // divlarge
	    tr.body.P12 =  page.strFloorCode; // floorcode
	    tr.body.P13 =  page.strFloor; // floor
	    tr.body.P14 =  page.strDivMiddleCode; // divmiddlecode
	    tr.body.P15 =  page.strDivMiddle; // divmiddle
	    tr.body.P16 =  page.strDivDetailCode; // divdetailcode
	    tr.body.P17 =  page.strDivDetail; // divdetail
	    tr.body.P18 =  page.strDivCode; // divcode
	    
	    bizMOB.Web.post(
	    		{
	    			message : tr,
	    			success : function(json) {
	    				if (json.header.result == true)
	    				{
	    					bizMOB.Ui.alert("저장 하였습니다.");
	    					if (callback) { callback(); }
	    				}
	    				else 
	    					bizMOB.Ui.alert("오류", json.header.error_text);
	    			}
	    		});
	},
	/**
	 * 개선사항 저장
	 */
	saveImprove:function(callback)
	{
		var recnum  = $("#improvementContent").attr("recnum");
		
		if (recnum.length == 0)
		{
			bizMOB.Ui.alert("개선사항을 선택후 진행해 주세요.");
			return;
		}
		
		var workymd = $("#improvementContent").attr("workymd");
		var impJson = cm031005.getData();
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03113");
		tr.body.P01 = recnum;
		tr.body.P02 = workymd;
		tr.body.P03 = ipmutil.isNull(impJson.impSuyong, "");
		tr.body.P04 = impJson.ipmtext;
		tr.body.P05 = impJson.impResDate;
		tr.body.P06 = ipmutil.isNull(impJson.impProc, "");
		tr.body.P07 = ipmutil.isNull(impJson.impImg1, -1);
		tr.body.P08 = ipmutil.isNull(impJson.impImg2, -1);
		
		bizMOB.Web.post(
		{
			message : tr,
			success : function(json) {
				if (json.header.result == true)
				{
					bizMOB.Ui.alert("저장 하였습니다.");
					if (callback) { callback(); }
				}
				else 
					bizMOB.Ui.alert("오류", json.header.error_text);
			}
		});
		
	},
	/**
	 * 일반 모니터링 삭제
	 * @param callback
	 */
	deleteMonitoring:function(recnum, unitseq, callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03117");
		tr.body.P01 = unitseq;
		tr.body.P02 = recnum;
		
		bizMOB.Web.post(
		{
			message : tr,
			success : function(json) {
				if (json.header.result == true)
				{
					bizMOB.Ui.alert("삭제 하였습니다.");
					if (callback) { callback(); }
				}
				else 
					bizMOB.Ui.alert("오류", json.header.error_text);
			}
		});
	},
	/**
	 * 피드백 삭제
	 * @param callback
	 */
	deleteFacilCheck:function(recnum, callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03118");
		tr.body.P01 = recnum;
		
		bizMOB.Web.post(
		{
			message : tr,
			success : function(json) {
				if (json.header.result == true)
				{
					bizMOB.Ui.alert("삭제 하였습니다.");
					if (callback) { callback(); }
				}
				else 
					bizMOB.Ui.alert("오류", json.header.error_text);
			}
		});
	}
};


/**
 * 안드로이드 빽버튼 이벤트!
 */
function onClickAndroidBackButton() {
	bizMOB.Web.close(
			{
				modal : false ,
				callback : "page.setList"
			});
}