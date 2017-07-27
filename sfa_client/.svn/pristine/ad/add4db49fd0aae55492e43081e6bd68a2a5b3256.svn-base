page = {
	custCode : "",
	custName : "",
	workDate : "",
	srNumber : "",
	tabPageNum : "",
	AsstNum : "", // 바코드 번호
	DeptCode : "", // 부서코드
	StaffID : "", // 사원코드
	pramJson : null,
	UnitSeq : "",
	pEquiSeNum : "",
	pDivSeNum : "",
	chkEquiSeNum : "",
	chkSol : 1,
	chkSelInsect : "",
	pResult : "",
	pSave : "",
	Monidiv : "",
	init : function(json) {
		// 기본 설정값
		ipmutil.appendCommonMenu();
		bizMOB.Storage.save("sEquiment", ""); // 장비 스토리지
		ipmutil.resetChk();// input check 스토리지 초기화
		ipmutil.setAllSelect(document, "input", "click"); // input태그 스토리지 상태값
		ipmutil.setAllSelect(document, "select", "click"); // select태그 스토리지 상태값
		ipmutil.setAllSelect(document, "textarea", "click"); // textarea태그
		// 스토리지 상태값
		SRMovePage.serviceRegist(); // 상당 카테고리 이동
		page.initInterface(json);
		page.initData(json);
		page.initLayout();
		
		page.Monidiv = "0";
	},
	initInterface : function(json) {
		
		if(json != null && JSON.stringify(json) != "{}")
		{
			page.custCode = json.custCode;
			//page.custName = json.custName;
			page.workDate = json.workDate;
			page.srNumber = json.srNum;
			if(json.AsstNum != undefined)
			{
				page.AsstNum = json.AsstNum;
			}
			page.DeptCode = "";
			page.StaffID = "";
		}
		else
		{
			/*page.custCode = "AJ2555";
			page.custName = "세스코";
			page.workDate = "20140514";
			page.srNumber = "109702014051401";
			page.AsstNum = ""; //"C9002010002010001";
			page.DeptCode = "10225";
			page.StaffID = "10970";*/
		}
		// 바코드
		if (page.AsstNum == "" || page.AsstNum == undefined) {
			$("#section1").hide();
			$("#section2").show();
		} else {
			$("#section1").show();
			$("#section2").hide();
			page.getBCodeList(page.AsstNum);
		}

		// 설치구획
		page.getCodeList1();
		// 설치장비
		page.getCodeList2();
		// 탭1 : 추가해충 바인딩
		page.getCodeList3();
		// 탭 숨김
		page.tabPageNum = "1";

		page.SetTabPages(page.tabPageNum);
		$("#btnSearch").click(function() {
			page.SearchList();
		});
		// 저장
		$("#btnSave").click(function() {
			var callback = function(){
				page.SaveData(page.tabPageNum);
			};
			ipmutil.chkServerTime(callback);
		});
		
		$("#barCodeShoot").click(function() {
			bizMOB.Native.qrAndBarCode.open(function(arg){
				ipmutil.barcodeMove(arg.message, page.custCode, page.workDate, page.srNumber);
			});
		});

		$("#pic1").click(function() {
			var $target = $(this);
			ipmutil.cameraOn($target, "value");
			/*if ($(this).attr("class") == "btn_camera") {
				ImgUtil.shoot("ipm", "test", function(data) {
					// bizMOB.Ui.alert("data : " + data);
					$("#pic1").attr("class", "btn_gallery");
					page.pic1 = data;
				});
			} else if ($(this).attr("class") == "btn_gallery") {
				ImgUtil.imageView(page.pic1.bMToNumber());
			}*/
		});

		$("#pic2").click(function() {
			var $target = $(this);
			ipmutil.cameraOn($target, "value");
			/*if ($(this).attr("class") == "btn_camera") {
				ImgUtil.shoot("ipm", "test", function(data) {
					// bizMOB.Ui.alert("data : " + data);
					$("#pic2").attr("class", "btn_gallery");
					page.pic2 = data;
				});
			} else if ($(this).attr("class") == "btn_gallery") {
				ImgUtil.imageView(page.pic2.bMToNumber());
			}*/
		});
		
		// 장비리스트 클릭
		$("#contlistnew").delegate(
				"#conBody",
				"click",
				function() {
					var $value1 = $(this).find(".rowData04");
					var $value2 = $(this).find(".rowData03");
					page.chkSelInsect = $(this).find(".rowData26").val();
					if (page.chkEquiSeNum != ""
							&& page.chkEquiSeNum != $value1[0].textContent) {
						page.ChkSoultion(page.chkEquiSeNum,
								$value1[0].textContent, $value2[0].textContent,
								$(this));
					} else {

						page.pEquiSeNum = $value1[0].textContent;
						page.pDivSeNum = $value2[0].textContent;
						$("#contlistnew").find("tbody").attr("class", "");
						$(this).attr("class", "bg02");

						$("#ulTabBtns").find("li").attr("class", "");
						$("#ulTabBtns").find("#num1").attr("class", "on");

						page.SearchDList1($value1[0].textContent,
								$value2[0].textContent);
					}
					page.tabPageNum = "1";

					$("#tabl01Moni").show();
					$("#tab03Service").hide();

					$("#tabDiv5").hide();
					$("#tabDiv6").hide();
					$("#tabDiv7").hide();
					
					var $selcetValue;
					if(page.AsstNum == "")
					{
						$selcetValue = $("#contlistnew").find(".bg02");
					}
					else
					{
						$selcetValue = $("#barcodeDiv").find(".bg02");
					}
					var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00027");
					tr.body.P01 = page.workDate;
					tr.body.P02 = page.custCode;
					tr.body.P03 = $selcetValue.find(".rowData03")[0].textContent;
					tr.body.P04 = "";

					bizMOB.Web.post({
						message : tr,
						success : function(json) {
							if (json.header.result == false) {
								bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
							} else {
								if(json.body.list01.length <= 0)
								{
									$("#list07").css("display", "none");
								}
								else
								{
									$("#list07").css("display", "block");
								}
							}
						}
					});

				});

		$("#evalListnew").delegate(
				"#evalBody",
				"click",
				function() {
					var $value1 = $(this).find(".rowData09");
					var $value2 = $(this).find(".rowData04");
					var $value3 = $(this).find(".rowData05");
					var $value4 = $(this).find(".rowData06");
					var $value5 = $(this).find(".rowData07");
					$("#evalListnew").find("tbody").attr("class", "");
					$(this).attr("class", "bg02");

					$("#tabDiv7Key").attr("value", $value1[0].textContent);
					$("#tabDiv7Sel1").val($value2[0].textContent);
					$("#tabDiv7Sel2").val($value3[0].textContent);

					// var dat = new Date(Date.$value4[0].textContent);
					// $("#datepicker1").datepicker("setDate",
					// $value4[0].textContent.substring(0, 4) + "-" +
					// $value4[0].textContent.substring(4, 6) + "-" +
					// $value4[0].textContent.substring(6, 8));
					$("#datepicker1").val($value4[0].textContent);
							/*
							 * 	($value4[0].textContent.substring(0, 4) + "-"
									+ $value4[0].textContent.substring(4, 6)
									+ "-"
									+ $value4[0].textContent.substring(6, 8));
									*/
					$("#tabDiv7Text1").val($value5[0].textContent);

					if ($(this).find(".rowData12").val() == "0"
							|| $(this).find(".rowData12").val() == "") {
						$("#btnPrvPic1").attr("class", "btn_camera");
						$("#btnPrvPic1").attr("value", "");
					} else {
						$("#btnPrvPic1").attr("class", "btn_gallery");
						$("#btnPrvPic1").attr("value",
								$(this).find(".rowData12").val());
					}

					if ($(this).find(".rowData13").val() == "0"
							|| $(this).find(".rowData13").val() == "") {
						$("#btnPrvPic2").attr("class", "btn_camera");
						$("#btnPrvPic2").attr("value", "");
					} else {
						$("#btnPrvPic2").attr("class", "btn_gallery");
						$("#btnPrvPic2").attr("value",
								$(this).find(".rowData13").val());
					}
					// page.SearchDList($value1[0].textContent,
					// $value2[0].textContent);
				});

		// 탭 클릭
		$("#ulTabBtns").delegate("li", "click", function() {
			if($(this).text().length > 1)
			{
				$("#ulTabBtns").find("li").attr("class", "");
				$(this).attr("class", "on");
				page.tabPageNum = $(this).attr("value");
				page.SetTabPages(page.tabPageNum);
			}
		});

		// 범위조정 펼치기
		// 버튼클릭 설정
		$("#ulSearchSet").click(function() {
			if ($("#liSearchSet").attr("class") == "on") {
				$("#liSearchSet").attr("class", "");
			} else {
				$("#liSearchSet").attr("class", "on");
			}
		});

		// 대표해충 선택이벤트
		$("#tabDiv5Sel1").change(function() {
			page.SearchDList5Code2($("#tabDiv5Sel1").val());
			page.SearchDList5Code4($("#tabDiv5Sel1").val());
			$("#tabDiv5Sel3 option").remove();
			$("#tabDiv5Sel3").append("<option value=''>없음</option>");
		});

		// 시설점검 구분(대) 변경시 이벤트
		$("#tabDiv6Sel2").change(function() {
			page.SearchDList6Code1();
		});
		

		// 시설점검 상태 변경시 이벤트
		$("#tabDiv6Sel4").change(function() {
			
			$("#tabDiv6Text2").val($(this).children("option:selected").attr("text").trim());
		});
		
		// 개선사항 사진1 버튼 클릭
		$("#btnPrvPic1").click(function() {
			var $target = $(this);
			ipmutil.cameraOn($target, "value");
			/*
			if ($("#btnPrvPic1").attr("class") == "btn_camera") {
				ImgUtil.shoot("ipm", "test", function(data) {
					//$("#btnPrvPic1").attr("value", data);
					
					if ($("#btnPrvPic1").val() != "")
						$("#btnPrvPic1").attr("class", "btn_gallery");
					else
						$("#btnPrvPic1").attr("class", "btn_camera");
				});
			} else {
				//ImgUtil.imageView($("#btnPrvPic1").val().bMToNumber());
				var $target = $(this);
				ipmutil.cameraOn($target, "value");
			}
			*/

		});
		// 개선사항 사진2 버튼 클릭
		$("#btnPrvPic2").click(function() {
			var $target = $(this);
			ipmutil.cameraOn($target, "value");
			/*
			if ($("#btnPrvPic2").attr("class") == "btn_camera") {
				ImgUtil.shoot("ipm", "test", function(data) {
					//$("#btnPrvPic2").attr("value", data);
				
					if ($("#btnPrvPic2").val() != "")
						$("#btnPrvPic2").attr("class", "btn_gallery");
					else
						$("#btnPrvPic2").attr("class", "btn_camera");
				});
			} else {
				//ImgUtil.imageView($("#btnPrvPic2").val().bMToNumber());
				var $target = $(this);
				ipmutil.cameraOn($target, "value");
			}
			*/			
		});

		// 시설구분 대 트리거
		$("#tabDiv6Sel2").trigger("change");

		// 기본조회
		$("#btnSearch").trigger("click");
	},
	initData : function(json) {

	},
	initLayout : function() {
		var IDName = bizMOB.Storage.get("UserName");
		var custName = bizMOB.Storage.get("custName");
		var custCode = bizMOB.Storage.get("custCode");

		var UserID = bizMOB.Storage.get("UserID");
		var deptName = bizMOB.Storage.get("deptName");
		var deptCode = bizMOB.Storage.get("deptCode");

		$("#subname").text(IDName);

		ipmutil.ipmMenuMove(IDName, custCode, custName, UserID, deptName,
				deptCode);
		var layout = ipmutil.getDefaultLayout(custName + "(" + custCode + ")");

		layout.titlebar.setTopLeft(bizMOB.Ui
				.createButton({
					button_text : "이전",
					image_name : "common/images/top_icon_back.png",
					listener : function() {

						if (bizMOB.Storage.get("inputcheck") == "1") {

							var button1 = bizMOB.Ui.createTextButton("예",
									function() {
										bizMOB.Storage.save("sEquiment", "");
										bizMOB.Web.close({
											modal : false,
											callback : "page.callbackOnSearch"

										});

									});
							var btncancel = bizMOB.Ui.createTextButton("아니오",
									function() {
										return;
									});
							bizMOB.Ui.confirm("페이지 이동",
									"이 페이지를 벗어나시겠습니까? 수정한 항목은 저장되지 않습니다.",
									button1, btncancel);

						} else {
							page.MoniServiceCheck(page.pEquiSeNum,
									page.pDivSeNum, $(this), "0");
						}

					}
				}));

		layout.titlebar.setTopRight(bizMOB.Ui
				.createButton({
					button_text : "전체메뉴",
					image_name : "common/images/top_icon_map.png",
					listener : function() {

						if (bizMOB.Storage.get("inputcheck") == "1") {

							var button1 = bizMOB.Ui.createTextButton("예",
									function() {
										$("#_submain").show();
										$("#_menuf").show();
										$("#_menuf").animate({
											left : 0
										}, 500);
									});
							var btncancel = bizMOB.Ui.createTextButton("아니오",
									function() {
										return;
									});
							bizMOB.Ui.confirm("페이지 이동",
									"이 페이지를 벗어나시겠습니까? 수정한 항목은 저장되지 않습니다.",
									button1, btncancel);

						} else {
							page.MoniServiceCheck(page.pEquiSeNum,
									page.pDivSeNum, $(this), "2");
						}

						// 메뉴 열림

					}
				}));

		bizMOB.Ui.displayView(layout);

	},
	ChkSoultion : function(EquiSeNum, prEquiSeNum, prDivSeNum, thisDoc) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00063");
		tr.body.P01 = EquiSeNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					if (json.body.R01 == "N") {
						bizMOB.Ui.alert("조회내역", "서비스내용은 필수입력항목입니다. 확인해주십시오.");
					} 
					else if(json.body.R01 == "C")
					{
						bizMOB.Ui.alert("서비스내용 체크", "서비스내용 원인1,솔루션1은 필수등록항목입니다.");
					}
					else {

						page.pEquiSeNum = prEquiSeNum;
						page.pDivSeNum = prDivSeNum;
						$("#contlistnew").find("tbody").attr("class", "");
						thisDoc.attr("class", "bg02");

						$("#ulTabBtns").find("li").attr("class", "");
						$("#ulTabBtns").find("#num1").attr("class", "on");

						page.SearchDList1(prEquiSeNum, prDivSeNum);
					}
				}
			}
		});
	},
	// 바코드
	getBCodeList : function(acctNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM06201");
		tr.body.P01 = acctNum; //"s4010380002020003";//

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					// bizMOB.Ui.alert("반환값", JSON.stringify(json));
					$("#barcode_R01").text(json.body.R17);
					$("#barcode_R02").text(json.body.R18);
					$("#barcode_R03").text(json.body.R19);
					$("#barcode_R04").text(json.body.R20);
					$("#barcode_R05").text(json.body.R21);
					
					$(".rowData03").text(json.body.R02);
					$(".rowData04").text(json.body.R01);
					$(".rowData14").text(json.body.R03);
					$(".rowData15").text(json.body.R04);
					$(".rowData16").text(json.body.R05);
					$(".rowData17").text(json.body.R06);
					$(".rowData18").text(json.body.R07);
					$(".rowData19").text(json.body.R08);
					$(".rowData20").text(json.body.R09);
					$(".rowData21").text(json.body.R10);
					$(".rowData22").text(json.body.R11);
					$(".rowData23").text(json.body.R12);
					$(".rowData24").text(json.body.R15);
					$(".rowData25").text(json.body.R14);
					$(".rowData26").attr("value", json.body.R16);

					page.pEquiSeNum = json.body.R01;
					page.pDivSeNum =  json.body.R02;
					
					page.SearchDList1(page.pEquiSeNum, page.pDivSeNum);
				}
			}
		});
	},
	getCodeList1 : function() // 설치구획 목록 바인딩
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04201");
		tr.body.P01 = page.custCode;
		tr.body.P02 = page.workDate;
		tr.body.P03 = "4";
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("구획정보", "구획정보 데이터가 존재하지 않습니다.");
				} else {
					$("#SelList01 option").remove();
					var listCode1 = json.body.List01;

					$("#SelList01").append("<option value=''>전부</option>");
					for ( var i = 0; i < listCode1.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#SelList01").append(
								"<option value='" + listCode1[i].R01 + "'>"
										+ listCode1[i].R02 + "</option>");
					}
					$("#SelList01").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
				}
			}
		});
	},
	getCodeList2 : function() // 설치장비 목록 바인딩
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04201");
		tr.body.P01 = page.custCode;
		tr.body.P02 = page.workDate;
		tr.body.P03 = "4";
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("구획정보", "구획정보 데이터가 존재하지 않습니다.");
				} else {
					$("#SelList02 option").remove();
					var listCode2 = json.body.List02;

					$("#SelList02").append("<option value=''>전부</option>");
					for ( var i = 0; i < listCode2.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#SelList02").append(
								"<option value='" + listCode2[i].R01 + "'>"
										+ listCode2[i].R02 + "</option>");
					}
					$("#SelList02").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
				}
			}
		});
	},

	// 추가해충 목록 바인딩
	getCodeList3 : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04001");
		tr.body.P01 = "2";
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("추가해충", "추가해충 데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv2Sel1 option").remove();
					$("#tabDiv2Sel2 option").remove();
					$("#tabDiv2Sel3 option").remove();
					$("#tabDiv2Sel4 option").remove();
					$("#tabDiv2Sel5 option").remove();
					var listCode3 = json.body.LIST;

					$("#tabDiv2Sel1").append("<option value=''>없음</option>");
					$("#tabDiv2Sel2").append("<option value=''>없음</option>");
					$("#tabDiv2Sel3").append("<option value=''>없음</option>");
					$("#tabDiv2Sel4").append("<option value=''>없음</option>");
					$("#tabDiv2Sel5").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode3.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv2Sel1").append(
								"<option value='" + listCode3[i].R01 + "'>"
										+ listCode3[i].R02 + "</option>");
						$("#tabDiv2Sel2").append(
								"<option value='" + listCode3[i].R01 + "'>"
										+ listCode3[i].R02 + "</option>");
						$("#tabDiv2Sel3").append(
								"<option value='" + listCode3[i].R01 + "'>"
										+ listCode3[i].R02 + "</option>");
						$("#tabDiv2Sel4").append(
								"<option value='" + listCode3[i].R01 + "'>"
										+ listCode3[i].R02 + "</option>");
						$("#tabDiv2Sel5").append(
								"<option value='" + listCode3[i].R01 + "'>"
										+ listCode3[i].R02 + "</option>");
					}
					$("#tabDiv2Sel1").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
					$("#tabDiv2Sel2").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
					$("#tabDiv2Sel3").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
					$("#tabDiv2Sel5").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
					$("#tabDiv2Sel4").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
				}
			}
		});
	},

	// 추가해충 목록 바인딩
	SearchList : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04203");
		tr.body.P01 = page.custCode;
		tr.body.P02 = page.workDate;
		tr.body.P03 = "4";
		tr.body.P04 = $("#SelList01").val();
		tr.body.P05 = $("#SelList02").val();

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					// bizMOB.Ui.alert("반환값", JSON.stringify(json));
					page.SearchListBinding(json);
				}
			}
		});
	},
	SearchListBinding : function(json) {
		var dir = [ {
			type : "loop",
			target : "#conBody",
			value : "List01",
			detail : [ {
				type : "single",
				target : ".clList-cl01",
				value : "R01"
			}, {
				type : "single",
				target : ".clList-cl02",
				value : "R02"
			}, {
				type : "single",
				target : ".clList-cl04",
				value : "R04"
			}, {
				type : "single",
				target : ".clList-cl06",
				value : "R06"
			}, {
				type : "single",
				target : ".clList-cl10",
				value : "R10"
			}, {
				type : "single",
				target : ".clList-cl11",
				value : "R11"
			},

			// 히든값 설정 - 저장할 경우 넘겨야 하는 값을 위한 히든 값
			{
				type : "single",
				target : ".rowData03",
				value : "R02"
			}, {
				type : "single",
				target : ".rowData04",
				value : "R01"
			}, {
				type : "single",
				target : ".rowData14",
				value : "R03"
			}, {
				type : "single",
				target : ".rowData15",
				value : "R04"
			}, {
				type : "single",
				target : ".rowData16",
				value : "R05"
			},

			{
				type : "single",
				target : ".rowData17",
				value : "R06"
			}, {
				type : "single",
				target : ".rowData18",
				value : "R07"
			}, {
				type : "single",
				target : ".rowData19",
				value : "R08"
			}, {
				type : "single",
				target : ".rowData20",
				value : "R09"
			}, {
				type : "single",
				target : ".rowData21",
				value : "R10"
			},

			{
				type : "single",
				target : ".rowData22",
				value : "R11"
			}, {
				type : "single",
				target : ".rowData23",
				value : "R12"
			}, {
				type : "single",
				target : ".rowData24",
				value : "R15"
			}, {
				type : "single",
				target : ".rowData25",
				value : "R14"
			}, {
				type : "single",
				target : ".rowData26@value",
				value : "R16"
			} // 대표해충

			]
		} ];

		// 그리기
		var options = {
			clone : true,
			newId : "contlistnew",
			replace : true
		};
		$("#contlist").bMRender(json.body, dir, options);
	},
	SetTabPages : function(idxTab) {
		// var $selcetValue = $("#contlistnew").find(".bg02");
		if (idxTab == "1") {
			$("#tabl01Moni").show();
			$("#tab03Service").hide();
			$("#tabDiv5").hide();
			$("#tabDiv6").hide();
			$("#tabDiv7").hide();

			// if($selcetValue != undefined && $selcetValue.length > 0)
			// {
			// page.SearchDList1($selcetValue.find(".rowData04")[0].textContent,
			// $selcetValue.find(".rowData03")[0].textContent);
			// }
		} else if (idxTab == "2") {
			$("#tabl01Moni").hide();
			$("#tab03Service").show();
			$("#tabDiv5").hide();
			$("#tabDiv6").hide();
			$("#tabDiv7").hide();
			// if($selcetValue != undefined && $selcetValue.length > 0)
			// {
			// page.SearchDList2($selcetValue.find(".rowData04")[0].textContent,
			// $selcetValue.find(".rowData03")[0].textContent);
			// }
		} else if (idxTab == "5") {
			$("#tabl01Moni").hide();
			$("#tab03Service").hide();
			$("#tabDiv5").show();
			$("#tabDiv6").hide();
			$("#tabDiv7").hide();
			if (page.pEquiSeNum != undefined && page.pEquiSeNum != "") {
				page.SearchDList5(page.pEquiSeNum, page.pDivSeNum);
			}
		} else if (idxTab == "6") {
			$("#tabl01Moni").hide();
			$("#tab03Service").hide();
			$("#tabDiv5").hide();
			$("#tabDiv6").show();
			$("#tabDiv7").hide();
			if (page.pEquiSeNum != undefined && page.pEquiSeNum != "") {
				page.SearchDList6(page.pEquiSeNum, page.pDivSeNum);
			}
			// if($selcetValue != undefined && $selcetValue.length > 0)
			// {
			// page.SearchDList6($selcetValue.find(".rowData04")[0].textContent,
			// $selcetValue.find(".rowData03")[0].textContent);
			// }
		} else if (idxTab == "7") {
			$("#tabl01Moni").hide();
			$("#tab03Service").hide();
			$("#tabDiv5").hide();
			$("#tabDiv6").hide();
			$("#tabDiv7").show();
			var nowDate = new Date();
			$("#datepicker1").val(nowDate.bMToFormatDate("yyyy-mm-dd")); // 수금일자
			if (page.pEquiSeNum != undefined && page.pEquiSeNum != "") {
				page.SearchDList7(page.pEquiSeNum, page.pDivSeNum);
			}
			// if($selcetValue != undefined && $selcetValue.length > 0)
			// {
			// page.SearchDList7($selcetValue.find(".rowData04")[0].textContent,
			// $selcetValue.find(".rowData03")[0].textContent);
			// }
		}
	},
	SearchDList : function(EquiSeNum, DivSeNum) {
		// 추가 해충
		page.SearchDList1(EquiSeNum, DivSeNum);
		// 서비스내용
		// page.SearchDList5(EquiSeNum, DivSeNum);
		// 시설점검
		// page.SearchDList6(EquiSeNum, DivSeNum);
		// 개선사항
		// page.SearchDList7(EquiSeNum, DivSeNum);

	},
	SearchDList1 : function(EquiSeNum, DivSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04204");
		tr.body.P01 = page.custCode;
		tr.body.P02 = page.workDate;
		tr.body.P03 = EquiSeNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv2Sel1").val(json.body.R03);
					$("#tabDiv2Sel2").val(json.body.R05);
					$("#tabDiv2Sel3").val(json.body.R07);
					$("#tabDiv2Sel4").val(json.body.R09);
					$("#tabDiv2Sel5").val(json.body.R11);

					$("#tabDiv2R06").val(json.body.R04.bMToNumber({
						digist : 0
					}));
					$("#tabDiv2R09").val(json.body.R06.bMToNumber({
						digist : 0
					}));
					$("#tabDiv2R12").val(json.body.R08.bMToNumber({
						digist : 0
					}));
					$("#tabDiv2R13").val(json.body.R10.bMToNumber({
						digist : 0
					}));
					$("#tabDiv2R14").val(json.body.R12.bMToNumber({
						digist : 0
					}));
					if (json.body.R13 == "Y")
						$("#tabDiv3R04").attr("checked", true);
					else
						$("#tabDiv3R04").attr("checked", false);

					if (json.body.R14 == "Y")
						$("#tabDiv3R05").attr("checked", true);
					else
						$("#tabDiv3R05").attr("checked", false);

					if (json.body.R15 == "Y")
						$("#tabDiv3R06").attr("checked", true);
					else
						$("#tabDiv3R06").attr("checked", false);
					page.UnitSeq = json.body.R16; // "U100000002";
					// page.SearchDList5UnitSeq(EquiSeNum, DivSeNum);
					// page.SearchDList5(EquiSeNum, DivSeNum);
					// page.SearchDList7(EquiSeNum, DivSeNum);
				}
			}
		});
	},
	SaveData : function(idxTab) // 데이터 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#contlistnew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		if ($selcetValue.length == 0) {
			bizMOB.Ui.alert("알림", "모니터링 대상을 선택하여 주세요.");
			return;
		}
		if (idxTab == "1") // 모니터링해충
		{
			page.saveTabPage1();
		} else if (idxTab == "2") // 조치내역
		{
			page.saveTabPage2();
		} else if (idxTab == "5") // 서비스내용
		{
			if ($("#tabDiv5Sel2").val() == undefined || $("#tabDiv5Sel2").val() == ""
				|| $("#tabDiv5Sel4").val() == undefined || $("#tabDiv5Sel4").val() == ""){
				bizMOB.Ui.alert("알림", "대표해충, 원인1, 솔루션1은 필수입력항목입니다.");
				return;
			}
			page.getUnitSeq();
		} else if (idxTab == "6") // 시설점검 등록
		{
			if (page.UnitSeq == undefined || page.UnitSeq.trim() == "") {
				bizMOB.Ui.alert("알림", "서비스내용을 등록하시기 바랍니다.");
			} else {
				page.saveTabPage6();
			}
		} else if (idxTab == "7") // 개선사항 등록
		{
			if($("#tabDiv7Key").val() == "" || $("#tabDiv7Key").val() == undefined)
			{
				bizMOB.Ui.alert("알림", "개선대상을 선택하여 주세요.");
				return;
			}
			page.saveTabPage7();
		}
	},
	saveTabPage1 : function() // 기타해충 등록
	{

		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#contlistnew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var nowDate = new Date();
		var moniTime = "" + nowDate.getHours() + nowDate.getMinutes()
				+ nowDate.getSeconds();

		var CollectArr = new Array;

		for ( var i = 0; i < 5; i++) {
			CollectArr.push({
				P01 : page.workDate // 작업일자
				,
				P02 : page.custCode // 고객코드
				,
				P03 : $selcetValue.find(".rowData03")[0].textContent // DivSeNum
				// 구획번호
				,
				P04 : $selcetValue.find(".rowData04")[0].textContent,
				P05 : "" // 해충코드

				,
				P06 : moniTime // 시간 분 초
				,
				P07 : "4000" // monidiv 2000 고정
				,
				P08 : "" // 카운트수
				,
				P09 : "11" // MONISTAT 11 고정
				,
				P10 : "" // 빈값!!

				,
				P11 : page.DeptCode // 부서코드
				,
				P12 : page.StaffID // 사번
				,
				P13 : page.StaffID // 등록자사번
				,
				P14 : $selcetValue.find(".rowData14")[0].textContent,
				P15 : $selcetValue.find(".rowData15")[0].textContent

				,
				P16 : $selcetValue.find(".rowData16")[0].textContent,
				P17 : $selcetValue.find(".rowData17")[0].textContent,
				P18 : $selcetValue.find(".rowData18")[0].textContent,
				P19 : $selcetValue.find(".rowData19")[0].textContent,
				P20 : $selcetValue.find(".rowData20")[0].textContent

				,
				P21 : $selcetValue.find(".rowData21")[0].textContent,
				P22 : $selcetValue.find(".rowData22")[0].textContent,
				P23 : $selcetValue.find(".rowData23")[0].textContent,
				P24 : $selcetValue.find(".rowData24")[0].textContent,
				P25 : $selcetValue.find(".rowData25")[0].textContent

				,
				P26 : page.srNumber // SR번호
				,
				P27 : "" // MONISEQ
				,
				P28 : "" // REMARK
			});
		}

		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03301");
		tr.body.list01 = CollectArr;

		tr.body.list01[0].P05 = $("#tabDiv2Sel1").attr("value"); // 해충코드 1
		tr.body.list01[0].P08 = $("#tabDiv2R06").val(); // 카운트수
		tr.body.list01[0].P27 = "3"; // MONISEQ

		tr.body.list01[1].P05 = $("#tabDiv2Sel2").attr("value"); // 해충코드 2
		tr.body.list01[1].P08 = $("#tabDiv2R09").val(); // 카운트수
		tr.body.list01[1].P27 = "6"; // MONISEQ

		tr.body.list01[2].P05 = $("#tabDiv2Sel3").attr("value"); // 해충코드 3
		tr.body.list01[2].P08 = $("#tabDiv2R12").val(); // 카운트수
		tr.body.list01[2].P27 = "9"; // MONISEQ

		tr.body.list01[3].P05 = $("#tabDiv2Sel4").attr("value"); // 해충코드 3
		tr.body.list01[3].P08 = $("#tabDiv2R13").val(); // 카운트수
		tr.body.list01[3].P27 = "12"; // MONISEQ

		tr.body.list01[4].P05 = $("#tabDiv2Sel5").attr("value"); // 해충코드 3
		tr.body.list01[4].P08 = $("#tabDiv2R14").val(); // 카운트수
		tr.body.list01[4].P27 = "15"; // MONISEQ

		// 대표해충 체크
		page.pResult = true;
		for ( var i = 0; i < 5; i++) {
			if (tr.body.list01[i].P05 == page.chkSelInsect
					&& tr.body.list01[i].P08 < 1 && page.chkSelInsect != "")
				page.pResult = false;
		}
		// 대표해충 삭제 확인
		if (page.pResult != true) {
			var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
				// 삭제 로직
				page.deleteInsect("4000",
						$selcetValue.find(".rowData04")[0].textContent);
				page.saveTabPage1DeTail(tr);			
			});
			var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
				return;
			});
			bizMOB.Ui.confirm("등록",
					"대표해충을 0마리로 변경하시면 서비스 내용이 삭제됩니다. 계속 진행하시겠습니까?", btnConfirm,
					btnCancel);
		}
		else
		{
			// 저장
			page.saveTabPage1DeTail(tr);
			
		}
	},
	// 저장메서드
	saveTabPage1DeTail : function(tr) {
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					bizMOB.Ui.alert("저장", "저장되었습니다.");
					ipmutil.resetChk();
					bizMOB.Storage.save("sEquiment", page.pEquiSeNum);
					page.chkEquiSeNum = page.pEquiSeNum;
					page.SearchDList1(page.pEquiSeNum, page.pDivSeNum);
					var $selcetValue;
					if(page.AsstNum == "")
					{
						$selcetValue = $("#contlistnew").find(".bg02");
					}
					else
					{
						$selcetValue = $("#barcodeDiv").find(".bg02");
					}
					page.deleteCheckInsect("4000",$selcetValue.find(".rowData04")[0].textContent);
				}

			}
		});
	},
	
	deleteInsect : function(pDivNum, pEquipNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00035");
		tr.body.P02 = pDivNum;
		tr.body.P03 = pEquipNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("삭제", "대표해충 삭제에 실패하였습니다.");
				}
			}
		});
	},
	 deleteCheckInsect:function(pMoniDiv, pEquipNum)
   	 {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00036");
		tr.body.P02  = pMoniDiv;
		tr.body.P03  = pEquipNum;
		 		 
		bizMOB.Web.post({
			message:tr,
			success:function(json){
				if(json.header.result==false){
					bizMOB.Ui.alert("삭제", "대표해충 삭제에 실패하였습니다." );
			}				
		}
	  });
   	},

	saveTabPage2 : function() // 조치내역 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#contlistnew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var CollectArr = new Array;

		for ( var i = 0; i < 3; i++) {
			CollectArr.push({
				P01 : page.workDate // 작업일자
				,
				P02 : page.custCode // 고객코드
				,
				P03 : $selcetValue.find(".rowData04")[0].textContent // EquiSeNum
				,
				P04 : $selcetValue.find(".rowData25")[0].textContent // EquiCode
				,
				P05 : "" // 
				,
				P06 : "" //
				,
				P07 : "" //	
				,
				P08 : "" //
				,
				P09 : "4000" // MoniDiv 고정
				,
				P10 : page.StaffID
			// 등록자
			});
		}

		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03501");
		tr.body.list01 = CollectArr;

		// 전원on
		tr.body.list01[0].P05 = "1000"; // ChkItem
		tr.body.list01[0].P06 = "0"; // ChangeCnt
		if ($("#tabDiv3R04").attr("checked"))
			tr.body.list01[0].P07 = "Y"; // ChangeYN
		else
			tr.body.list01[0].P07 = "N"; // ChangeYN

		tr.body.list01[0].P08 = ""; // EquiStatYN

		// 청소실시
		tr.body.list01[1].P05 = "2000"; // ChkItem
		tr.body.list01[1].P06 = "0"; // ChangeCnt
		if ($("#tabDiv3R05").attr("checked"))
			tr.body.list01[1].P07 = "Y"; // ChangeYN
		else
			tr.body.list01[1].P07 = "N"; // ChangeYN

		tr.body.list01[1].P08 = ""; // EquiStatYN

		// 측정온도_좌
		tr.body.list01[2].P05 = "3000"; // ChkItem
		tr.body.list01[2].P06 = "0"; // ChangeCnt
		if ($("#tabDiv3R06").attr("checked"))
			tr.body.list01[2].P07 = "Y"; // ChangeYN
		else
			tr.body.list01[2].P07 = "N"; // ChangeYN

		tr.body.list01[2].P08 = ""; // EquiStatYN

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					bizMOB.Ui.alert("저장", "저장되었습니다.");
					// bizMOB.Storage.save("sEquiment","");
					ipmutil.resetChk();
				}
			}
		});
	},

	SearchDList5 : function(EquiSeNum, DivSeNum) {
		// 대표해충 바인딩
		// page.SearchDList5Code1(EquiSeNum, DivSeNum);
		// UnitSeq가져오기
		// page.SearchDList5UnitSeq(EquiSeNum, DivSeNum);
		// 서비스내용 조회
		page.SearchDList5List1(EquiSeNum, DivSeNum);
	},

	SearchDList5Code1 : function(EquiSeNum, DivSeNum, SetValue) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00020");
		tr.body.P01 = page.srNumber;
		tr.body.P02 = page.workDate;
		tr.body.P03 = page.custCode;
		tr.body.P04 = DivSeNum;
		tr.body.P05 = "4000"; // 모니터링구분값 2000: 포충등
		tr.body.P06 = EquiSeNum;
		tr.body.P07 = "";// page.UnitSeq;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv5Sel1 option").remove();
					var listCode = json.body.list01;
					$("#tabDiv5Sel1").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv5Sel1").append(
								"<option value='" + listCode[i].R01 + "'>"
										+ listCode[i].R02 + "</option>");
					}
					if (SetValue != "")
						$("#tabDiv5Sel1").val(SetValue); // 초기화를 바인딩 직 후 해야함
					// ~~ ㅡ.ㅡ;;
				}
			}
		});
		// 대표해충 트리거
		// $("#tabDiv5Sel1").trigger("change");
	},
	SearchDList5List1 : function(EquiSeNum, DivSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00025");
		tr.body.P01 = page.srNumber;
		tr.body.P02 = "4000";
		tr.body.P03 = page.workDate;
		tr.body.P04 = page.custCode;
		tr.body.P05 = DivSeNum;
		tr.body.P06 = EquiSeNum;
		tr.body.P07 = page.UnitSeq;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {

					if (json.body.list01.length > 0) {
						page.SearchDList5Code1(EquiSeNum, DivSeNum,
								json.body.list01[0].R24); // 대표해충
						page.SearchDList5Code2(json.body.list01[0].R24,
								json.body.list01[0].R19); // 원인1
						page.setDiv5Sel3(json.body.list01[0].R24,
								json.body.list01[0].R20,
								json.body.list01[0].R19); // 원인2
						page.setDiv5Sel4(json.body.list01[0].R24,
								json.body.list01[0].R21,
								json.body.list01[0].R22,
								json.body.list01[0].R23); // 솔루션코드1, 2, 3
						page.UnitSeq = json.body.list01[0].R37;
					} else {
						page.SearchDList5Code1(EquiSeNum, DivSeNum, "");
						$("#tabDiv5Sel1").val("");
						$("#tabDiv5Sel2").val("");
						$("#tabDiv5Sel3").val("");
						$("#tabDiv5Sel4").val("");
						$("#tabDiv5Sel5").val("");
						$("#tabDiv5Sel6").val("");
					}
				}
				// page.SearchDList6(EquiSeNum, DivSeNum);
			}
		});
	},
	setDiv5Sel2 : function(bugCode, SetCode) // 원인코드1 셋
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00021");
		tr.body.P01 = bugCode;
		tr.body.P02 = "";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv5Sel2 option").remove();
					var listCode = json.body.list01;

					$("#tabDiv5Sel2").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv5Sel2").append(
								"<option value='" + listCode[i].R01 + "'>"
										+ listCode[i].R02 + "</option>");
					}
					$("#tabDiv5Sel2").val(SetCode); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
				}
			}
		});
	},
	SearchDList5Code2 : function(bugcode, setValue) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00021");
		tr.body.P01 = bugcode;
		tr.body.P02 = "";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv5Sel2 option").remove();
					var listCode = json.body.list01;

					$("#tabDiv5Sel2").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv5Sel2").append(
								"<option value='" + listCode[i].R01 + "'>"
										+ listCode[i].R02 + "</option>");
					}
					if (setValue != "")
						$("#tabDiv5Sel2").val(setValue); // 초기화를 바인딩 직 후 해야함
					// ~~ ㅡ.ㅡ;;
				}
			}
		});
	},
	SearchDList5Code4 : function(bugcode) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00022");
		tr.body.P01 = bugcode;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv5Sel4 option").remove();
					$("#tabDiv5Sel5 option").remove();
					$("#tabDiv5Sel6 option").remove();
					$("#tabDiv5Sel4").append("<option value=''>없음</option>");
					$("#tabDiv5Sel5").append("<option value=''>없음</option>");
					$("#tabDiv5Sel6").append("<option value=''>없음</option>");
					var listCode1 = json.body.list01;
					var listCode2 = json.body.list02;
					var listCode3 = json.body.list03;

					for ( var i = 0; i < listCode1.length; i++) {
						$("#tabDiv5Sel4").append(
								"<option value='" + listCode1[i].R01 + "'>"
										+ listCode1[i].R02 + "</option>");
					}

					for ( var i = 0; i < listCode2.length; i++) {
						$("#tabDiv5Sel5").append(
								"<option value='" + listCode2[i].R01 + "'>"
										+ listCode2[i].R02 + "</option>");
					}

					for ( var i = 0; i < listCode3.length; i++) {
						$("#tabDiv5Sel6").append(
								"<option value='" + listCode3[i].R01 + "'>"
										+ listCode3[i].R02 + "</option>");
					}

					// $("#tabDiv5Sel1").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
				}
			}
		});
	},
	getUnitSeq : function() // 
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#contlistnew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}

		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00060");
		tr.body.P01 = page.srNumber; // 발생해충명
		tr.body.P02 = $selcetValue.find(".rowData03")[0].textContent; // 해충코드
		tr.body.P03 = $("#tabDiv5Sel1").val(); // 원인코드1
		tr.body.P04 = "4000"; // 원인코드1

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
				} else
					page.saveTabPage5(json.body.R01);
			}
		});
	},
	saveTabPage5 : function(pUniSeq) // 서비스내용 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#contlistnew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var _UnitSeq;

		if (page.UnitSeq == undefined || page.UnitSeq == ""
				|| page.UnitSeq.length < 1 || page.UnitSeq.bMToNumber() == 0) {
			_UnitSeq = pUniSeq;
			page.UnitSeq = pUniSeq;
		} else
			_UnitSeq = page.UnitSeq;

		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00031"); // MSP_I_CM0002801
		tr.body.P05 = $("#tabDiv5Sel1 option:selected").text(); // 발생해충명
		tr.body.P06 = $("#tabDiv5Sel1").val(); // 해충코드
		tr.body.P07 = $("#tabDiv5Sel2").val(); // 원인코드1
		tr.body.P08 = $("#tabDiv5Sel3").val(); // 원인코드2
		tr.body.P09 = $("#tabDiv5Sel4").val(); // 솔루션코드1
		tr.body.P10 = $("#tabDiv5Sel5").val(); // 솔루션코드2
		tr.body.P11 = $("#tabDiv5Sel6").val(); // 솔루션코드3
		tr.body.P12 = $selcetValue.find(".rowData04")[0].textContent; // 장비코드
		tr.body.P17 = $selcetValue.find(".rowData14")[0].textContent; // 대분류코드
		tr.body.P18 = $selcetValue.find(".rowData15")[0].textContent; // 대분류명
		tr.body.P19 = $selcetValue.find(".rowData16")[0].textContent; // 층코드
		tr.body.P20 = $selcetValue.find(".rowData17")[0].textContent; // 층명
		tr.body.P21 = $selcetValue.find(".rowData18")[0].textContent; // 중분류코드
		tr.body.P22 = $selcetValue.find(".rowData19")[0].textContent; // 중분류명
		tr.body.P23 = $selcetValue.find(".rowData20")[0].textContent; // 세분류코드
		tr.body.P24 = $selcetValue.find(".rowData21")[0].textContent; // 세분류명
		tr.body.P25 = $selcetValue.find(".rowData23")[0].textContent; // 구획코드
		tr.body.P26 = _UnitSeq; // SEQ
		tr.body.P27 = $selcetValue.find(".rowData03")[0].textContent; // 구획일련번호
		tr.body.P28 = "4000"; // 모니터링구분 1000,2000,3000,4000,5000
		tr.body.P31 = page.srNumber; // SR번호
		tr.body.P32 = $selcetValue.find(".rowData04")[0].textContent; // 세부위치설명 및 장비일련번호

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					bizMOB.Ui.alert("저장", "저장되었습니다.");
					bizMOB.Storage.save("sEquiment", "");
					ipmutil.resetChk();
					// 문제해충, unitseq 불러오기
					page.SearchInsect(page.pEquiSeNum);
					
				}
			}
		});

	},
	SearchInsect : function(EquiSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00037");
		tr.body.P01 = ""; //SR넘버
		tr.body.P02 = "4000"; //모니터링
		tr.body.P03 = EquiSeNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					page.chkSelInsect = json.body.R01;
					page.UnitSeq = json.body.R02;					
					var pSeleRow;
					if(page.AsstNum == "")
					{
						pSeleRow = $("#contlistnew").find(".bg02");
					}
					else
					{
						pSeleRow = $("#barcodeDiv").find(".bg02");
					}
					pSeleRow.find(".rowData26").val(json.body.R01);
				}
			}
		});
		
	},
	
	SearchDList6 : function(EquiSeNum, DivSeNum) {
		$("#receiveNum").attr("value", "");
		page.SearchDList6Code2();
		page.SearchDList6Code4();
		page.SearchDList6DList(EquiSeNum, DivSeNum);
	},
	SearchDList6Code4 : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00024");
		tr.body.P01 = "";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv6Sel4 option").remove();
					var listCode = json.body.list01;

					// $("#tabDiv5Sel3").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv6Sel4").append(
								"<option text = '" + listCode[i].R03 + "' value='" + listCode[i].R01 +  "'>"
										+ listCode[i].R02 + "</option>");
					}
					// $("#tabDiv5Sel1").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
					$("#tabDiv6Sel4").trigger("change");
				}
			}
		});
	},
	SearchDList6Code1 : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00023");
		if ($("#tabDiv6Sel2").val() == "")
			tr.body.P01 = "1010";
		else
			tr.body.P01 = $("#tabDiv6Sel2").val();
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv6Sel3 option").remove();
					var listCode = json.body.list01;

					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv6Sel3").append(
								"<option value='" + listCode[i].R01 + "'>"
										+ listCode[i].R02 + "</option>");
					}
					// $("#tabDiv5Sel1").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
				}
			}
		});
	},
	SearchDList6Code2 : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00001");
		tr.body.Gubun = "QTYPE";
		tr.body.Type = "1";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv6Sel2 option").remove();
					var listCode = json.body.list01;

					//$("#tabDiv6Sel2").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv6Sel2").append(
								"<option value='" + listCode[i].Code + "'>"
										+ listCode[i].CodeName + "</option>");
					}
					// $("#tabDiv5Sel1").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
				}
			}
		});
	},
	SearchDList6Code3 : function(setValue) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00023");
		tr.body.P01 = $("#tabDiv6Sel2").val();

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv6Sel3 option").remove();
					var listCode = json.body.list01;

					// $("#tabDiv5Sel3").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv6Sel3").append(
								"<option value='" + listCode[i].R01 + "'>"
										+ listCode[i].R02 + "</option>");
					}
					if (setValue != "")
						$("#tabDiv6Sel3").val(setValue); // 초기화를 바인딩 직 후 해야함
					// ~~ ㅡ.ㅡ;;
				}
			}
		});
	},
	saveTabPage6 : function() // 시설점검 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#contlistnew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}

		// 체크리스트 저장
		var tr;

		if ($("#tabDiv6Sel1").val() == "1") // 모니터링에 의한 시설점검
		{
			tr = bizMOB.Util.Resource.getTr("Cesco", "CM00033");
			tr.body.P31 = page.srNumber; // SR번호
			tr.body.P32 = $selcetValue.find(".clList-cl01")[0].textContent; // Unit 세부위치설명 OR 장비일련번호
			tr.body.P33 = page.UnitSeq; // UnitSeq
		} else
			// 일반 시설점검
		{
			tr = bizMOB.Util.Resource.getTr("Cesco", "CM00032");
			tr.body.P31 = $selcetValue.find(".clList-cl01")[0].textContent; // 장비일련번호
		}

		tr.body.P01 = $("#receiveNum").val(); // RECEIVNUMBER 시설점검 KEY

		tr.body.P03 = page.DeptCode; // 부서코드
		tr.body.P04 = page.StaffID; // 사원코드

		tr.body.P07 = $("#pic1").attr("value"); // 사진1
		tr.body.P08 = $("#pic2").attr("value"); // 사진2
		tr.body.P09 = $("#tabDiv6Sel2").val(); // 문제 유형대
		tr.body.P10 = ($("#tabDiv6Sel3").val() == null) ? "" : $("#tabDiv6Sel3").val(); // 문제 유형중
		tr.body.P11 = $("#tabDiv6Text1").val(); // 문제점
		tr.body.P12 = $("#tabDiv6Text2").val(); // 개선요청
		tr.body.P13 = $("#tabDiv6Sel4").val(); // 상태(A001)
		//tr.body.P14 = $("#tabDiv5Sel1").val(); // 대표해충
		tr.body.P14 = page.chkSelInsect; // 대표해충

		tr.body.P17 = $selcetValue.find(".rowData14")[0].textContent; // 대분류코드
		tr.body.P18 = $selcetValue.find(".rowData15")[0].textContent; // 대분류명
		tr.body.P19 = $selcetValue.find(".rowData16")[0].textContent; // 층코드
		tr.body.P20 = $selcetValue.find(".rowData17")[0].textContent; // 층명
		tr.body.P21 = $selcetValue.find(".rowData18")[0].textContent; // 중분류코드
		tr.body.P22 = $selcetValue.find(".rowData19")[0].textContent; // 중분류명
		tr.body.P23 = $selcetValue.find(".rowData20")[0].textContent; // 세분류코드
		tr.body.P24 = $selcetValue.find(".rowData21")[0].textContent; // 세분류명
		tr.body.P25 = $selcetValue.find(".rowData23")[0].textContent; // 구획코드

		tr.body.P27 = $selcetValue.find(".rowData03")[0].textContent; // 구획일련번호
		tr.body.P28 = "4000"; // 모니터링구분 1000,2000,3000,4000,5000
		tr.body.P29 = page.workDate; // 작업일자 (시설점검일자)
		tr.body.P30 = page.custCode; // 고객코드

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					bizMOB.Ui.alert("저장", "저장되었습니다.");
					// bizMOB.Storage.save("sEquiment","");
					ipmutil.resetChk();
				}
			}
		});
		page.SearchDList(page.pEquiSeNum, page.pDivSeNum);
	},
	SearchDList6DList : function(EquiSeNum, DivSeNum) {
		$("#tabDiv6Sel1").val("1");
		
		$("#pic1").attr("class", "btn_camera");
		$("#pic2").attr("class", "btn_camera");
		$("#pic1").attr("value", "");
		$("#pic2").attr("value", "");

		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00026");
		tr.body.P01 = page.srNumber;
		tr.body.P02 = "4000";
		tr.body.P03 = page.workDate;
		tr.body.P04 = page.custCode;
		tr.body.P05 = DivSeNum;
		tr.body.P06 = EquiSeNum;
		tr.body.P07 = page.UnitSeq;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
					page.SearchDList6Code3("");
				} else {

					if (json.body.list01.length > 0) {
						// bizMOB.Ui.alert("조회내역", JSON.stringify(json) );
						$("#tabDiv6Sel2").val(json.body.list01[0].R04);
						page.SearchDList6Code3(json.body.list01[0].R05);
						// $("#tabDiv6Sel3").val(json.body.list01[0].R05);						
						$("#tabDiv6Sel4").val(json.body.list01[0].R13);						
						$("#tabDiv6Text1").val(json.body.list01[0].R08);
						if(json.body.list01[0].R12.length > 5)
							$("#tabDiv6Text2").val(json.body.list01[0].R12);
						
						$("#receiveNum").attr("value", json.body.list01[0].R09);
						$("#btnChkPic1").val(json.body.list01[0].R17);
						$("#btnChkPic2").val(json.body.list01[0].R18);
						if (json.body.list01[0].R17.length > 5) {
							$("#pic1").attr("class", "btn_gallery");
							$("#pic1").attr("value", json.body.list01[0].R17);
						} else {
							$("#pic1").attr("class", "btn_camera");
							$("#pic1").attr("value", "");
						}
						if (json.body.list01[0].R18.length > 5) {
							$("#pic2").attr("class", "btn_gallery");
							$("#pic2").attr("value", json.body.list01[0].R18);
						} else {
							$("#pic2").attr("class", "btn_camera");
							$("#pic2").attr("value", "");
						}
					} else {
						page.SearchDList6Code3("");
						$("#tabDiv6Sel2").val("");
						$("#tabDiv6Sel3").val("");
						$("#tabDiv6Sel4").val("");
						$("#tabDiv6Text1").val("");
						$("#tabDiv6Text2").val($("#tabDiv6Sel4").children("option:selected").attr("text").trim());
						$("#btnChkPic1").val("");
						$("#btnChkPic2").val("");
					}

				}
			}
		});

	},
	SearchDList7 : function(EquiSeNum, DivSeNum) {
		page.SearchDList7Code1();
		page.SearchDList7DList();
	},
	SearchDList7Code1 : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00001");
		tr.body.Gubun = "A006";
		tr.body.Type = "1";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv7Sel2 option").remove();
					var listCode = json.body.list01;

					// $("#tabDiv5Sel3").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv7Sel2").append(
								"<option value='" + listCode[i].Code + "'>"
										+ listCode[i].CodeName + "</option>");
					}
					/*
					 * if(setValue != "") $("#tabDiv7Sel2").val(setValue); //
					 * 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
					 */
				}
			}
		});
	},
	SearchDList7DList : function() {
		$("#btnPrvPic1").attr("class", "btn_camera");
		$("#btnPrvPic2").attr("class", "btn_camera");
		// $("#datepicker1").datepicker("setDate", new Date());
		// $("#tabDiv7Text1").text("");
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#contlistnew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00027");
		tr.body.P01 = page.workDate;
		tr.body.P02 = page.custCode;
		tr.body.P03 = $selcetValue.find(".rowData03")[0].textContent;
		tr.body.P04 = "";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					page.SearchDList7DListBinding(json);
				}
			}
		});
	},
	SearchDList7DListBinding : function(json) {
		var dir = [ {
			type : "loop",
			target : "#evalBody",
			value : "list01",
			detail : [ {
				type : "single",
				target : ".rowView08",
				value : "R08"
			}, {
				type : "single",
				target : ".rowView10",
				value : "R10"
			}, {
				type : "single",
				target : ".rowView11",
				value : "R11"
			}, {
				type : "single",
				target : ".rowView06",
				value : "R06"
			},

			// 히든값 설정 - 저장할 경우 넘겨야 하는 값을 위한 히든 값
			{
				type : "single",
				target : ".rowData01",
				value : "R01"
			}, // 대구분
			{
				type : "single",
				target : ".rowData02",
				value : "R02"
			}, // 구획일련번호DivSeNum
			{
				type : "single",
				target : ".rowData03",
				value : "R03"
			}, // 모니터링구분
			{
				type : "single",
				target : ".rowData04",
				value : "R04"
			}, // 개선수용여부
			{
				type : "single",
				target : ".rowData05",
				value : "R05"
			}, // 개선시행여부
			{
				type : "single",
				target : ".rowData06",
				value : "R06"
			}, // 개선예정일자
			{
				type : "single",
				target : ".rowData07",
				value : "R07"
			}, // 개선수용여부 내용
			{
				type : "single",
				target : ".rowData08",
				value : "R08"
			}, // 작업일자 (개선일자)
			{
				type : "single",
				target : ".rowData09",
				value : "R09"
			}, // 시설점검 KEY
			{
				type : "single",
				target : ".rowData10",
				value : "R10"
			}, // 개선수용여부명
			{
				type : "single",
				target : ".rowData11",
				value : "R11"
			}, // 개선시행여부명
			{
				type : "single",
				target : ".rowData12",
				value : "R12"
			}, // 개선 사진번호1
			{
				type : "single",
				target : ".rowData12@value",
				value : "R12"
			}, // 개선 사진번호1
			{
				type : "single",
				target : ".rowData13",
				value : "R13"
			}, // 개선 사진번호2
			{
				type : "single",
				target : ".rowData13@value",
				value : "R13"
			} // 개선 사진번호2
			]
		} ];

		// 그리기
		var options = {
			clone : true,
			newId : "evalListnew",
			replace : true
		};
		$("#evalList").bMRender(json.body, dir, options);
	},
	saveTabPage7 : function() // 개선사항 등록
	{
		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00030");

		tr.body.P01 = $("#tabDiv7Key").val(); // RECEIVNUMBER 시설점검 KEY
		tr.body.P02 = $("#tabDiv7Sel1").val(); // 개선수용여부
		tr.body.P03 = $("#tabDiv7Text1").val(); // 개선수행텍스트
		tr.body.P04 = $("#datepicker1").val().replace(/-/gi, ""); // 개선예정일자
		tr.body.P05 = $("#tabDiv7Sel2").val(); // 개선시행여부
		tr.body.P06 = $("#btnPrvPic1").val(); // 개선사진1
		tr.body.P07 = $("#btnPrvPic2").val(); // 개선사진2

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					bizMOB.Ui.alert("저장", "저장되었습니다.");
					// bizMOB.Storage.save("sEquiment","");
					ipmutil.resetChk();
				}
			}
		});
		page.SearchDList7DList();
	},
	// UnitSeq 가져오기
	SearchDList5UnitSeq : function(EquiSeNum, DivSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00029");
		tr.body.P01 = page.custCode;
		tr.body.P02 = page.workDate;
		tr.body.P03 = EquiSeNum;
		tr.body.P04 = $("#tabDiv5Sel1").val();

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					page.UnitSeq = json.body.R01; // "U100000002";
				}
			}
		});
	},
	setDiv5Sel3 : function(bugCode, SetCode, parentCode) // 원인코드2 셋
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00021");
		tr.body.P01 = bugCode;
		tr.body.P02 = parentCode;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv5Sel3 option").remove();
					var listCode = json.body.list01;

					$("#tabDiv5Sel3").append("<option value=''>없음</option>");
					for ( var i = 0; i < listCode.length; i++) {
						// bizMOB.Ui.alert("반환값", listCode1[i].CodeName);
						$("#tabDiv5Sel3").append(
								"<option value='" + listCode[i].R01 + "'>"
										+ listCode[i].R02 + "</option>");
					}
					$("#tabDiv5Sel3").val(SetCode); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
				}
			}
		});
	},
	setDiv5Sel4 : function(bugCode, SetCode1, SetCode2, SetCode3) // 솔루션코드 셋
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00022");
		tr.body.P01 = bugCode;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다.");
				} else {
					$("#tabDiv5Sel4 option").remove();
					$("#tabDiv5Sel5 option").remove();
					$("#tabDiv5Sel6 option").remove();
					$("#tabDiv5Sel4").append("<option value=''>없음</option>");
					$("#tabDiv5Sel5").append("<option value=''>없음</option>");
					$("#tabDiv5Sel6").append("<option value=''>없음</option>");
					var listCode1 = json.body.list01;
					var listCode2 = json.body.list02;
					var listCode3 = json.body.list03;

					for ( var i = 0; i < listCode1.length; i++) {
						$("#tabDiv5Sel4").append(
								"<option value='" + listCode1[i].R01 + "'>"
										+ listCode1[i].R02 + "</option>");
					}

					for ( var i = 0; i < listCode2.length; i++) {
						$("#tabDiv5Sel5").append(
								"<option value='" + listCode2[i].R01 + "'>"
										+ listCode2[i].R02 + "</option>");
					}

					for ( var i = 0; i < listCode3.length; i++) {
						$("#tabDiv5Sel6").append(
								"<option value='" + listCode3[i].R01 + "'>"
										+ listCode3[i].R02 + "</option>");
					}

					$("#tabDiv5Sel4").val(SetCode1); // 초기화를 바인딩 직 후 해야함 ~~
					// ㅡ.ㅡ;;
					$("#tabDiv5Sel5").val(SetCode2); // 초기화를 바인딩 직 후 해야함 ~~
					// ㅡ.ㅡ;;
					$("#tabDiv5Sel6").val(SetCode3); // 초기화를 바인딩 직 후 해야함 ~~
					// ㅡ.ㅡ;;
				}
			}
		});
	},
	MoniServiceCheck : function(EquiSeNum, DivSeNum, sSelect, sGubun) // 서비스내용
	// 등록 체크
	{
		// 체크리스트 저장
		if (EquiSeNum != "") {
			var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00063");

			tr.body.P01 = page.pEquiSeNum;

			bizMOB.Web
					.post({
						message : tr,
						success : function(json) {
							if (json.header.result == false) {
								bizMOB.Ui.alert("경고", json.header.error_text);
								return;
							} else {
								if (json.body.R01 == "N") {

									bizMOB.Ui.alert("서비스내용 체크",
											"서비스내용을 등록 해주시기 바랍니다.");
								} 
								else if(json.body.R01 == "C")
								{
									bizMOB.Ui.alert("서비스내용 체크",
											"서비스내용 원인1,솔루션1은 필수등록항목입니다.");
								}
								else {

									if (sGubun == "1") { // 구획리스트에서 선택이동시
										page.pDivSeNum = DivSeNum;
										page.pEquiSeNum = EquiSeNum;
										$("#contlistnew").find("tbody").attr(
												"class", "");
										$(sSelect).attr("class", "bg02");
										// page.SearchDList($value1[0].textContent,
										// $value2[0].textContent);
										$("#ulTabBtns").find("li").attr(
												"class", "");
										$("#ulTabBtns").find("#num1").attr(
												"class", "on");

										// 최초 선택한 장비일련번호 구획코드를 가지고 있는다
										page.tabPageNum = "1";

										$("#tabDiv1").show();
										$("#tabDiv2").hide();
										$("#tabDiv3").hide();
										$("#tabDiv4").hide();
										$("#tabDiv5").hide();
										$("#tabDiv6").hide();
										$("#tabDiv7").hide();
										bizMOB.Storage.save("sEquiment", "");
										page.SearchDList1(EquiSeNum, DivSeNum);

									} 
									else if(sGubun == "2")
									{
										$("#_submain").show();
										$("#_menuf").show();
										$("#_menuf").animate({
											left : 0
										}, 500);
									}
									else // 백 버튼 클릭시
									{

										bizMOB.Web.close({
											modal : false,
											callback : "page.callbackOnSearch"

										});
									}
								}
							}
						}
					});
		} else // 백 버튼 클릭시
		{
			if(sGubun == "2")
			{
				$("#_submain").show();
				$("#_menuf").show();
				$("#_menuf").animate({
					left : 0
				}, 500);
			}
			else
			{
				bizMOB.Web.close({
					modal : false,
					callback : "page.callbackOnSearch"
	
				});
			}
		}
	}
};

function onClickAndroidBackButton() {

	if (bizMOB.Storage.get("inputcheck") == "1") {

		var button1 = bizMOB.Ui.createTextButton("예", function() {

			bizMOB.Web.close({
				modal : false,
				callback : "page.callbackOnSearch"

			});

		});
		var btncancel = bizMOB.Ui.createTextButton("아니오", function() {
			return;
		});

		bizMOB.Ui.confirm("페이지 이동", "이 페이지를 벗어나시겠습니까? 수정한 항목은 저장되지 않습니다.",
				button1, btncancel);

	} else {

		page.MoniServiceCheck(page.pEquiSeNum,
				page.pDivSeNum, $(this), "0");
		
		/*bizMOB.Web.close({
			modal : false,
			callback : "page.callbackOnSearch"

		});*/
	}
}