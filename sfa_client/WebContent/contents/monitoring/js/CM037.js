page = {
	custCode : "",
	custName : "",
	workDate : "",
	DeptCode : "", // 부서코드
	StaffID : "",
	srNumber : "",
	UnitSeq : "",
	pramJson : null,
	tabPageNum : "",
	AsstNum : "", // 바코드 번호
	pEquiSeNum : "",
	pDivSeNum : "",
	chkEquiSeNum : "",
	chkSelInsect : "",
	pResult : "",
	pSave : "",
	Monidiv : "",
	init : function(json) {
		ipmutil.appendCommonMenu();
		ipmutil.resetChk();// input check 스토리지 초기화
		ipmutil.setAllSelect(document, "input", "click"); // input태그 스토리지 상태값
		ipmutil.setAllSelect(document, "select", "click"); // select태그 스토리지 상태값
		ipmutil.setAllSelect(document, "textarea", "click"); // textarea태그
		// 스토리지 상태값
		SRMovePage.serviceRegist(); // 상당 카테고리 이동
		// 기본 설정값
		page.initInterface(json);
		page.initData(json);
		page.initLayout();
		page.Monidiv = "0";
	},
	initInterface : function(json) {
		if (json != null && JSON.stringify(json) != "{}") {
			page.custCode = json.custCode;
			page.custName = json.custName;
			if(json.AsstNum != undefined)
			{
				page.AsstNum = json.AsstNum;
			}
			page.workDate = json.workDate;
			page.srNumber = json.srNumber;
		} else {
			/*
			 * page.custCode = "AJ2555"; page.custName = "세스코"; page.AsstNum =
			 * ""; //"C9002010002010001"; page.workDate = "20140514";
			 * page.DeptCode = "10225"; page.StaffID = "10970"; page.srNumber =
			 * "109702014051401";
			 */
		}

		page.UnitSeq = "";

		if (page.AsstNum == "") {
			$("#section1").hide();
			$("#section2").show();
		} else {
			page.getBCodeList(page.AsstNum);
			$("#section1").show();
			$("#section2").hide();
		}

		// 날짜선택 설정
		$("#datepicker1")
				.datepicker(
						{
							dateFormat : 'yy-mm-dd',
							prevText : '이전 달',
							nextText : '다음 달',
							monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월',
									'7월', '8월', '9월', '10월', '11월', '12월' ],
							monthNamesShort : [ '1월', '2월', '3월', '4월', '5월',
									'6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
							dayNames : [ '일', '월', '화', '수', '목', '금', '토' ],
							dayNamesShort : [ '일', '월', '화', '수', '목', '금', '토' ],
							dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ],
							showMonthAfterYear : true,
							yearSuffix : '년',
							showOn : "button",
							buttonImage : "../../common/images/btn_cal.png"
						// buttonImageOnly: true
						});

		$("#datepicker1").datepicker("setDate", new Date());

		page.setInsCategory();
		page.tabPageNum = "1";

		page.SetTabPages(page.tabPageNum);
		page.setCategory();
		
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
					var $target = $(this);
					ipmutil.cameraOn($target, "value");
					$("#pic1").attr("class", "btn_gallery");
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
				});
			} else if ($(this).attr("class") == "btn_gallery") {
				ImgUtil.imageView(page.pic2.bMToNumber());
			}*/
		});

		$("#tbNew").delegate(
				"#searchDetail",
				"click",
				function() {
					var $value1 = $(this).find(".rowData04");
					var $value2 = $(this).find(".rowData03");
					page.pEquiSeNum = $value1[0].textContent;
					page.chkSelInsect = $(this).find(".rowData26").val();
					if (page.chkEquiSeNum != ""
							&& page.chkEquiSeNum != page.pEquiSeNum) {
						page.ChkSoultion(page.chkEquiSeNum,
								$value1[0].textContent, $value2[0].textContent,
								$(this));
					} else {
						page.pDivSeNum = $value2[0].textContent;

						$(".slideDetail tr").removeClass('bg02');
						$(this).toggleClass('bg02');

						page.SearchDList1($value1[0].textContent,
								$value2[0].textContent);

						$("#ulTabBtns").find("li").attr("class", "");
						$("#ulTabBtns").find("#num1").attr("class", "on");

						page.tabPageNum = "1";

						$("#tabDiv1").show();
						$("#tabDiv2").hide();
						$("#tabDiv3").hide();
						$("#tabDiv4").hide();
						$("#tabDiv5").hide();
						$("#tabDiv6").hide();
						$("#tabDiv7").hide();
					}
					
					var $selcetValue;
					if(page.AsstNum == "")
					{
						$selcetValue = $("#tbNew").find(".bg02");
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

					// var dat = new Date(Date.$value4[0].val());
					$("#datepicker1").val($value4[0].textContent);
					/*$("#datepicker1").datepicker(
							"setDate",
							$value4[0].val().substring(0, 4) + "-"
									+ $value4[0].val().substring(4, 6)
									+ "-"
									+ $value4[0].val().substring(6, 8));
					*/
					$("#tabDiv7Text1").val($value5[0].textContent);
					// page.SearchDList($value1[0].val(),
					// $value2[0].val());
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
				});

		// 버튼클릭 설정
		$("#tabDiv101").click(function() {
			if ($('#tabDiv101').is(':checked'))
				$("#tabDiv102").attr("checked", false);
		});

		$("#tabDiv102").click(function() {
			if ($('#tabDiv102').is(':checked'))
				$("#tabDiv101").attr("checked", false);
		});

		$("#ulSearchSet").click(function() {
			if ($("#liSearchSet").attr("class") == "on") {
				$("#liSearchSet").attr("class", "");
			} else {
				$("#liSearchSet").attr("class", "on");
			}
		});

		$("#btnsearch").click(function() {
			page.searchList();
		});

		$("#btnsave").click(function() {
			var callback = function(){
				page.SaveData(page.tabPageNum);
			};			
			ipmutil.chkServerTime(callback);
		});

		$("#ulTabBtns").delegate("li", "click", function() {
			if($(this).text().length > 0)
			{
				$("#ulTabBtns").find("li").attr("class", "");
				$(this).attr("class", "on");
				page.tabPageNum = $(this).attr("value");
				page.SetTabPages(page.tabPageNum);
			}
		});

		// 대표해충 선택이벤트
		$("#tabDiv5Sel1").change(function() {
			page.SearchDList5Code2($("#tabDiv5Sel1").val(), "");
			page.SearchDList5Code4($("#tabDiv5Sel1").val());
			$("#tabDiv5Sel3 option").remove();
			$("#tabDiv5Sel3").append("<option value=''>없음</option>");
		});

		$("#tabDiv5Sel2").change(
				function() {
					page.SearchDList5Code3($("#tabDiv5Sel1").val(), $(
							"#tabDiv5Sel2").val());
				});

		$("#tabDiv6Sel2").change(function() {
			page.SearchDList6Code3("");
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
					var $target = $(this);
					ipmutil.cameraOn($target, "value");
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

		// 기본조회
		$("#btnsearch").trigger("click");

		$("#btnF01").click(function() {

			page.SearchDList1(page.pEquiSeNum, page.pDivSeNum);

		}); // 기본해충 탭 클릭시

		$("#btnF02").click(function() {

			page.SearchDList2(page.pEquiSeNum, page.pDivSeNum);

		}); // 추가해충 탭 클릭시

		$("#btnF03").click(function() {

			page.SearchDList3(page.pEquiSeNum, page.pDivSeNum);

		}); // 장비점검 탭 클릭시

		$("#btnF04").click(function() {

			page.SearchDList4(page.pEquiSeNum, page.pDivSeNum);

		}); // 소모품 탭 클릭시

		$("#btnF05").click(function() {
			
			page.SearchDList5(page.pEquiSeNum, page.pDivSeNum);

		}); // 소모품 탭 클릭시

		$("#btnF06").click(function() {
			$("#receiveNum").attr("value", "");
			page.SearchDList6(page.pEquiSeNum, page.pDivSeNum);

		}); // 소모품 탭 클릭시

		$("#btnF07").click(function() {

			page.SearchDList7(page.pEquiSeNum, page.pDivSeNum);

		}); // 소모품 탭 클릭시

		// 시설점검 상태 변경시 이벤트
		$("#tabDiv6Sel4").change(function() {
			
			$("#tabDiv6Text2").val($(this).children("option:selected").attr("text").trim());
		});

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
							page.MoniServiceCheck(page.pEquiSeNum, page.pDivSeNum, $(this), "2");
						}
						// 메뉴 열림

					}
				}));

		bizMOB.Ui.displayView(layout);

	},

	getBCodeList : function(acctNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM06201");
		tr.body.P01 = acctNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("조회내역", json.header.error_text);
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

	SearchDList : function(EquiSeNum, DivSeNum) {
		page.SearchDList1(EquiSeNum, DivSeNum);
		page.SearchDList2(EquiSeNum, DivSeNum);
		page.SearchDList3(EquiSeNum, DivSeNum);
		page.SearchDList4(EquiSeNum, DivSeNum);
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
						bizMOB.Ui.alert("서비스내용 체크", "서비스내용을 등록 해주시기 바랍니다.");
						page.pEquiSeNum = EquiSeNum;
					} 
					else if(json.body.R01 == "C")
					{
						bizMOB.Ui.alert("서비스내용 체크", "서비스내용 원인1,솔루션1은 필수등록항목입니다.");
						page.pEquiSeNum = EquiSeNum;
					}
					else {
						page.pEquiSeNum = prEquiSeNum;
						page.pDivSeNum = prDivSeNum;

						$(".slideDetail tr").removeClass('bg02');
						thisDoc.toggleClass('bg02');

						page.SearchDList1(prEquiSeNum, prDivSeNum);

						$("#ulTabBtns").find("li").attr("class", "");
						$("#ulTabBtns").find("#num1").attr("class", "on");

						page.tabPageNum = "1";

						$("#tabDiv1").show();
						$("#tabDiv2").hide();
						$("#tabDiv3").hide();
						$("#tabDiv4").hide();
						$("#tabDiv5").hide();
						$("#tabDiv6").hide();
						$("#tabDiv7").hide();
					}

				}
			}
		});
	},
	SearchDList1 : function(EquiSeNum, DivSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03701");
		tr.body.P01 = page.workDate;
		tr.body.P02 = page.custCode;
		tr.body.P03 = EquiSeNum;
		tr.body.P04 = DivSeNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					// bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다." );
				} else {
					// bizMOB.Ui.alert("반환값", JSON.stringify(json));
					if (json.body.R03 == "Y")
						$("#tabDiv101").attr("checked", true);
					else
						$("#tabDiv101").attr("checked", false);
					if (json.body.R04 == "Y")
						$("#tabDiv102").attr("checked", true);
					else
						$("#tabDiv102").attr("checked", false);

					$("#tabDiv103").val(json.body.R05);
					$("#tabDiv104").val(json.body.R06);
					$("#tabDiv105").val(json.body.R07);
					page.UnitSeq = json.body.R08;
					// page.SearchDList5(EquiSeNum, DivSeNum);
					// page.SearchDList7(EquiSeNum, DivSeNum);
				}
			}
		});
	},
	SearchDList2 : function(EquiSeNum, DivSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03702");
		tr.body.P01 = page.workDate;
		tr.body.P02 = page.custCode;
		tr.body.P03 = EquiSeNum;
		tr.body.P04 = DivSeNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					// bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다." );
				} else {
					// bizMOB.Ui.alert("반환값", JSON.stringify(json));
					$("#tabDiv201").val(json.body.R03);
					$("#tabDiv202").val(json.body.R04);
					$("#tabDiv203").val(json.body.R05);
					$("#tabDiv204").val(json.body.R06);
					$("#tabDiv205").val(json.body.R07);
					$("#tabDiv206").val(json.body.R08);
					$("#tabDiv207").val(json.body.R09);
				}
			}
		});
	},
	SearchDList3 : function(EquiSeNum, DivSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03703");
		tr.body.P01 = page.workDate;
		tr.body.P02 = page.custCode;
		tr.body.P03 = EquiSeNum;
		tr.body.P04 = DivSeNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					// bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다." );
				} else {
					// bizMOB.Ui.alert("반환값", JSON.stringify(json));
					$("#tabDiv301").val(json.body.R03);
					$("#tabDiv302").val(json.body.R05);
					$("#tabDiv303").val(json.body.R06);
					$("#tabDiv304").val(json.body.R08);
					$("#tabDiv305").val(json.body.R09);
					$("#tabDiv306").val(json.body.R11);
				}
			}
		});
	},
	SearchDList4 : function(EquiSeNum, DivSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03704");
		tr.body.P01 = page.workDate;
		tr.body.P02 = page.custCode;
		tr.body.P03 = EquiSeNum;
		tr.body.P04 = DivSeNum;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					// bizMOB.Ui.alert("조회내역", "데이터가 존재하지 않습니다." );
				} else {
					// bizMOB.Ui.alert("반환값", JSON.stringify(json));
					if (json.body.R03 == "Y")
						$("#tabDiv401").attr("checked", true);
					else
						$("#tabDiv401").attr("checked", false);
					if (json.body.R04 == "Y")
						$("#tabDiv402").attr("checked", true);
					else
						$("#tabDiv402").attr("checked", false);
					if (json.body.R05 == "Y")
						$("#tabDiv403").attr("checked", true);
					else
						$("#tabDiv403").attr("checked", false);
					if (json.body.R06 == "Y")
						$("#tabDiv404").attr("checked", true);
					else
						$("#tabDiv404").attr("checked", false);
				}
			}
		});
	},
	SearchDList5 : function(EquiSeNum, DivSeNum) {
		//page.SearchDList5Code1(EquiSeNum, DivSeNum);
		page.SearchDList5List1(EquiSeNum, DivSeNum);
	},
	SearchDList5List1 : function(EquiSeNum, DivSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00025");
		tr.body.P01 = page.srNumber;
		tr.body.P02 = "3000";
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
						// page.setDiv5Sel2(json.body.list01[0].R24,
						// json.body.list01[0].R19); // 원인1
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
					if (SetCode != "")
						$("#tabDiv5Sel3").val(SetCode); // 초기화를 바인딩 직 후 해야함 ~~
					// ㅡ.ㅡ;;
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

	SearchDList5Code1 : function(EquiSeNum, DivSeNum, SetValue) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00020");
		tr.body.P01 = page.srNumber;
		tr.body.P02 = page.workDate;
		tr.body.P03 = page.custCode;
		tr.body.P04 = DivSeNum;
		tr.body.P05 = "3000"; // 모니터링구분값 2000: 포충등
		tr.body.P06 = EquiSeNum;
		tr.body.P07 = "";

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
	SearchDList5Code3 : function(bugCode, parentCode) {
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
					// $("#tabDiv5Sel1").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
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
	SearchDList6 : function(EquiSeNum, DivSeNum) {
		page.SearchDList6Code2();
		page.SearchDList6Code4();
		page.SearchDList6DList(EquiSeNum, DivSeNum);
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
								"<option text = '" + listCode[i].R03 + "' value='" + listCode[i].R01 + "'>"
										+ listCode[i].R02 + "</option>");
					}
					// $("#tabDiv5Sel1").val(""); // 초기화를 바인딩 직 후 해야함 ~~ ㅡ.ㅡ;;
					$("#tabDiv6Sel4").trigger("change");
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
	SearchDList6DList : function(EquiSeNum, DivSeNum) {
		$("#tabDiv6Sel1").val("1");
		
		$("#pic1").attr("class", "btn_camera");
		$("#pic2").attr("class", "btn_camera");
		$("#pic1").attr("value", "");
		$("#pic2").attr("value", "");

		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00026");
		tr.body.P01 = page.srNumber;
		tr.body.P02 = "3000";
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
						$("#tabDiv6Text2").val(json.body.list01[0].R12);
						$("#receiveNum").attr("value", json.body.list01[0].R09);
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

		$("#datepicker1").datepicker("setDate", new Date());
		$("#tabDiv7Text1").text("");
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
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

	setCategory : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04001");
		tr.body.P01 = "2";
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				if (json.body.LIST.length == 0) {					
					return;
				}
				else
				{
					page.setSelect(json, "category");
				}
			}
		});
	},
	setSelect : function(json, selectID) {
		var cnt = json.body.LIST.length;
		var list = json.body.LIST;
		for ( var i = 0; i < cnt; i++) {
			$("." + selectID).append(
					"<option value=\"" + list[i].R01 + "\">" + list[i].R02
							+ "</option>");
		}
	},

	setInsCategory : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04201");
		tr.body.P01 = page.custCode;
		tr.body.P02 = page.workDate;
		tr.body.P03 = "2"; // 모니터링 구분 (쥐)

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				if (json.body.List01.length == 0) {					
					return;
				}
				else
				{
					page.setDivSelect(json, "division");
					page.setEquipSelect(json, "equip");
				}
			}
		});
	},
	setDivSelect : function(json, selectID) {
		var cnt = json.body.List01.length;
		var list = json.body.List01;
		for ( var i = 0; i < cnt; i++) {
			$("#" + selectID).append(
					"<option value=\"" + list[i].R01 + "\">" + list[i].R02
							+ "</option>");
		}
	},
	setEquipSelect : function(json, selectID) {
		var cnt = json.body.List02.length;
		var list = json.body.List02;
		for ( var i = 0; i < cnt; i++) {
			$("#" + selectID).append(
					"<option value=\"" + list[i].R01 + "\">" + list[i].R02
							+ "</option>");
		}
	},
	searchList : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04203");

		tr.body.P01 = page.custCode;
		tr.body.P02 = page.workDate;
		tr.body.P03 = "2"; // 모니터링 구분 (쥐)
		tr.body.P04 = $("#division").val();
		tr.body.P05 = $("#equip").val();

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {
					page.renderList(json, "List01");
				} else {

					bizMOB.Ui.alert("로그인", json.header.error_text);
				}
			}
		});
	},
	renderList : function(json, listName) {
		// 항목 리스트를 셋팅하기
		var dir = [ {
			type : "loop",
			target : "#searchDetail",
			value : listName,
			detail : [ {
				type : "single",
				target : "#r01",
				value : function(arg) {
					var returnValue = $.trim(arg.item.R01);
					return returnValue;
				}
			}, {
				type : "single",
				target : "#r02",
				value : function(arg) {
					var returnValue = $.trim(arg.item.R02);
					return returnValue;
				}
			}, {
				type : "single",
				target : "#r03",
				value : function(arg) {
					var returnValue = $.trim(arg.item.R04);
					return returnValue;
				}
			}, {
				type : "single",
				target : "#r04",
				value : function(arg) {
					var returnValue = $.trim(arg.item.R06);
					return returnValue;
				}
			}, {
				type : "single",
				target : "#r05",
				value : function(arg) {
					var returnValue = $.trim(arg.item.R10);
					return returnValue;
				}
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
		// 반복옵션(이전의 항목을 삭제하는 옵션)
		var options = {
			clone : true,
			newId : "tbNew",
			replace : true
		};
		// 그리기
		$("#tb").bMRender(json.body, dir, options);
	},
	SaveData : function(idxTab) // 데이터 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		if ($selcetValue.length == 0 && page.AsstNum == "") {
			bizMOB.Ui.alert("알림", "모니터링 대상을 선택하여 주세요.");
			return;
		}
		if (idxTab == "1") // 기본해충
		{
			page.saveTabPage1();
		} else if (idxTab == "2") // 기타해충
		{
			page.saveTabPage2();
		} else if (idxTab == "3") // 온도, 장비점검
		{
			page.saveTabPage3();
		} else if (idxTab == "4") // 소모품교체
		{
			page.saveTabPage4();
		} else if (idxTab == "5") // 서비스내용 등록
		{
			if ($("#tabDiv5Sel2").val() == undefined || $("#tabDiv5Sel2").val() == ""
				|| $("#tabDiv5Sel4").val() == undefined || $("#tabDiv5Sel4").val() == ""){
				bizMOB.Ui.alert("알림", "대표해충, 원인1, 솔루션1은 필수입력항목입니다.");
				return;
			}
			page.getUnitSeq();
		} else if (idxTab == "6") // 서비스점검 등록
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
	saveTabPage1 : function() // 기본해충 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var nowDate = new Date();
		var moniTime = "" + nowDate.getHours() + nowDate.getMinutes()
				+ nowDate.getSeconds();

		var CollectArr = new Array;

		for ( var i = 0; i < 4; i++) {
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
				P07 : "3000" // monidiv 2000 고정
				,
				P08 : "" // 카운트수
				,
				P09 : "" // MONISTAT
				,
				P10 : "" // 빈값!!

				,
				P11 : page.DeptCode// 부서코드
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
				P27 : "1" // MONISEQ
				,
				P28 : "" // REMARK
			});
		}

		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03301");
		tr.body.list01 = CollectArr;

		tr.body.list01[0].P05 = "1000"; // 해충코드 섭식
		if ($("#tabDiv101").is(':checked')) {
			tr.body.list01[0].P08 = "0"; // EquiStatYN 세스넷은 섭식일때 CNT 1로 들어간다.
			tr.body.list01[0].P09 = "13"; // MONISTAT
		}
		if ($("#tabDiv102").is(':checked')) {
			tr.body.list01[0].P08 = "0"; // EquiStatYN
			tr.body.list01[0].P09 = "12"; // MONISTAT
		}

		tr.body.list01[1].P05 = "1030"; // 해충코드 생쥐
		tr.body.list01[1].P08 = $("#tabDiv103").val(); // 카운트수
		tr.body.list01[1].P09 = "11"; // MONISTAT

		tr.body.list01[2].P05 = "1020"; // 해충코드 시궁쥐
		tr.body.list01[2].P08 = $("#tabDiv104").val(); // 카운트수
		tr.body.list01[2].P09 = "11"; // MONISTAT

		tr.body.list01[3].P05 = "1010"; // 해충코드 집웅쥐
		tr.body.list01[3].P08 = $("#tabDiv105").val(); // 카운트수
		tr.body.list01[3].P09 = "11"; // MONISTAT

		// 대표해충 체크
		page.pResult = true;
		for ( var i = 0; i < 4; i++) {
			if (tr.body.list01[i].P05 == page.chkSelInsect
					&& tr.body.list01[i].P08 < 1  && page.chkSelInsect != "")
				page.pResult = false;
		}
		// 대표해충 삭제 확인
		if (page.pResult != true) {
			var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
				// 삭제 로직
				page.deleteInsect("3000",
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
						$selcetValue = $("#tbNew").find(".bg02");
					}
					else
					{
						$selcetValue = $("#barcodeDiv").find(".bg02");
					}
					page.deleteCheckInsect("3000",$selcetValue.find(".rowData04")[0].textContent);
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

	saveTabPage2 : function() // 기타해충 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var nowDate = new Date();
		var moniTime = "" + nowDate.getHours() + nowDate.getMinutes()
				+ nowDate.getSeconds();

		var CollectArr = new Array;

		for ( var i = 0; i < 7; i++) {
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
				P07 : "3000" // monidiv 2000 고정
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
				P27 : "1" // MONISEQ
				,
				P28 : "" // REMARK
			});
		}

		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM03301");
		tr.body.list01 = CollectArr;

		tr.body.list01[0].P05 = "1710"; // 해충코드 1
		tr.body.list01[0].P08 = $("#tabDiv201").val(); // 카운트수

		tr.body.list01[1].P05 = "1810"; // 해충코드 2
		tr.body.list01[1].P08 = $("#tabDiv202").val(); // 카운트수

		tr.body.list01[2].P05 = "1200"; // 해충코드 3
		tr.body.list01[2].P08 = $("#tabDiv203").val(); // 카운트수

		tr.body.list01[3].P05 = "9029"; // 해충코드 3
		tr.body.list01[3].P08 = $("#tabDiv204").val(); // 카운트수

		tr.body.list01[4].P05 = "1820"; // 해충코드 3
		tr.body.list01[4].P08 = $("#tabDiv205").val(); // 카운트수

		tr.body.list01[5].P05 = "1830"; // 해충코드 3
		tr.body.list01[5].P08 = $("#tabDiv206").val(); // 카운트수

		tr.body.list01[6].P05 = "9030"; // 해충코드 3
		tr.body.list01[6].P08 = $("#tabDiv207").val(); // 카운트수

		page.pResult = true;
		page.pSave = true;
		for ( var i = 0; i < 7; i++) {
			if (tr.body.list01[i].P05 == page.chkSelInsect
					&& tr.body.list01[i].P08 < 1)
				page.pResult = false;
		}
		// 대표해충 삭제 확인
		if (page.pResult != true) {
			var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
				// 삭제 로직
				page.deleteInsect("3000",
						$selcetValue.find(".rowData04")[0].textContent);
				// 저장로직
				page.pSave = true;
			});
			var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
				page.pSave = false;
			});
			bizMOB.Ui.confirm("등록",
					"대표해충을 0마리로 변경하시면 서비스 내용이 삭제됩니다. 계속 진행하시겠습니까?", btnConfirm,
					btnCancel);
		}

		// 저장
		if (page.pSave == true) {
			bizMOB.Web.post({
				message : tr,
				success : function(json) {
					if (json.header.result == false) {
						bizMOB.Ui.alert("경고", json.header.error_text);
						return;
					} else {
						bizMOB.Ui.alert("저장", "저장되었습니다.");
						page.chkEquiSeNum = page.pEquiSeNum;
						ipmutil.resetChk();
						bizMOB.Storage.save("sEquiment", page.pEquiSeNum);
						page.SearchDList1(page.pEquiSeNum, page.pDivSeNum);

					}

				}
			});
		}

	},
	saveTabPage3 : function() // 장비점검 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var nowDate = new Date();
		var moniTime = "" + nowDate.getHours() + nowDate.getMinutes()
				+ nowDate.getSeconds();

		var CollectArr = new Array;

		for ( var i = 0; i < 3; i++) {
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
				P07 : "3000" // monidiv 2000 고정
				,
				P08 : "" // 카운트수
				,
				P09 : "11" // MONISTAT
				,
				P10 : "" // 빈값!!

				,
				P11 : page.DeptCode// 부서코드
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

		tr.body.list01[0].P05 = $("#tabDiv301").attr("value"); // 해충코드1
		tr.body.list01[0].P08 = $("#tabDiv302").val(); // 카운트수
		tr.body.list01[0].P27 = "16"; // MoniSeq

		tr.body.list01[1].P05 = $("#tabDiv303").attr("value"); // 해충코드1
		tr.body.list01[1].P08 = $("#tabDiv304").val(); // 카운트수
		tr.body.list01[1].P27 = "19"; // MoniSeq

		tr.body.list01[2].P05 = $("#tabDiv305").attr("value"); // 해충코드1
		tr.body.list01[2].P08 = $("#tabDiv306").val(); // 카운트수
		tr.body.list01[2].P27 = "22"; // MoniSeq

		page.pResult = true;
		page.pSave = true;
		for ( var i = 0; i < 3; i++) {
			if (tr.body.list01[i].P05 == page.chkSelInsect
					&& tr.body.list01[i].P08 < 1)
				page.pResult = false;
		}
		// 대표해충 삭제 확인
		if (page.pResult != true) {
			var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
				// 삭제 로직
				page.deleteInsect("3000",
						$selcetValue.find(".rowData04")[0].textContent);
				// 저장로직
				page.pSave = true;
			});
			var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
				page.pSave = false;
			});
			bizMOB.Ui.confirm("등록",
					"대표해충을 0마리로 변경하시면 서비스 내용이 삭제됩니다. 계속 진행하시겠습니까?", btnConfirm,
					btnCancel);
		}

		// 저장
		if (page.pSave == true) {
			bizMOB.Web.post({
				message : tr,
				success : function(json) {
					if (json.header.result == false) {
						bizMOB.Ui.alert("경고", json.header.error_text);
						return;
					} else {
						bizMOB.Ui.alert("저장", "저장되었습니다.");
						page.chkEquiSeNum = page.pEquiSeNum;
						ipmutil.resetChk();
						bizMOB.Storage.save("sEquiment", page.pEquiSeNum);
						page.SearchDList1(page.pEquiSeNum, page.pDivSeNum);
						// 대표해충 마직 체크
						page.deleteCheckInsect("3000",$selcetValue.find(".rowData04")[0].textContent);
					}

				}
			});
		}

		
	},
	saveTabPage4 : function() // 소모품 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var CollectArr = new Array;

		for ( var i = 0; i < 4; i++) {
			CollectArr.push({

				P04 : "",
				P05 : "",
				P06 : ""
			});
		}

		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04101");
		tr.body.list01 = CollectArr;

		tr.body.list01[0].P05 = "2030"; // 약제
		tr.body.list01[0].P04 = "1000";
		if ($("#tabDiv401").is(':checked'))
			tr.body.list01[0].P06 = "Y";
		else
			tr.body.list01[0].P06 = "N";

		tr.body.list01[1].P05 = "2010"; // 상자
		tr.body.list01[1].P04 = "2000";
		if ($("#tabDiv402").is(':checked'))
			tr.body.list01[1].P06 = "Y";
		else
			tr.body.list01[1].P06 = "N";

		tr.body.list01[2].P05 = "2030"; // 끈끈이
		tr.body.list01[2].P04 = "3000";
		if ($("#tabDiv403").is(':checked'))
			tr.body.list01[2].P06 = "Y";
		else
			tr.body.list01[2].P06 = "N";

		tr.body.list01[3].P05 = "2010"; // 쥐덫
		tr.body.list01[3].P04 = "4000";
		if ($("#tabDiv404").is(':checked'))
			tr.body.list01[3].P06 = "Y";
		else
			tr.body.list01[3].P06 = "N";

		tr.body.P01 = page.workDate;
		tr.body.P02 = page.custCode;
		tr.body.P03 = $selcetValue.find(".rowData04")[0].textContent;
		tr.body.P07 = page.StaffID;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					bizMOB.Ui.alert("저장", "저장되었습니다.");
					ipmutil.resetChk();
				}

			}
		});
	},
	saveTabPage5 : function(pUniSeq) // 서비스내용 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
		}
		else
		{
			$selcetValue = $("#barcodeDiv").find(".bg02");
		}
		var _UnitSeq;

		if (page.UnitSeq == undefined || page.UnitSeq.trim() == ""
				|| page.UnitSeq.bMToNumber() == 0) {
			_UnitSeq = pUniSeq;
			page.UnitSeq = pUniSeq;
		} else
			_UnitSeq = page.UnitSeq;

		// 체크리스트 저장
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00031");
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
		tr.body.P28 = "3000"; // 모니터링구분 1000,2000,3000,4000,5000
		tr.body.P31 = page.srNumber; // SR번호
		tr.body.P32 = $selcetValue.find(".rowData04")[0].textContent;
		; // 세부위치설명 및 장비일련번호

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					bizMOB.Ui.alert("저장", "저장되었습니다.");
					ipmutil.resetChk();
					bizMOB.Storage.save("sEquiment", "");
					page.SearchInsect(page.pEquiSeNum);
				}
			}
		});
		//page.SearchDList(page.pEquiSeNum, page.pDivSeNum);
	},
	SearchInsect : function(EquiSeNum) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00037");
		tr.body.P01 = ""; //SR넘버
		tr.body.P02 = "3000"; //모니터링
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
						pSeleRow = $("#tbNew").find(".bg02");
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
	
	getUnitSeq : function() // 
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
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
		tr.body.P04 = "3000"; // 원인코드1

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
	saveTabPage6 : function() // 시설점검 등록
	{
		var $selcetValue;
		if(page.AsstNum == "")
		{
			$selcetValue = $("#tbNew").find(".bg02");
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
			tr.body.P32 = $selcetValue.find(".rowData04")[0].textContent; // Unit 세부위치설명 OR 장비일련번호
			tr.body.P33 = page.UnitSeq; // UnitSeq
		} else
		{
			tr = bizMOB.Util.Resource.getTr("Cesco", "CM00032");
			tr.body.P31 = $selcetValue.find(".rowData04")[0].textContent; // 장비일련번호
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
		tr.body.P28 = "3000"; // 모니터링구분 1000,2000,3000,4000,5000
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
					ipmutil.resetChk();
				}
			}
		});
		page.SearchDList(page.pEquiSeNum, page.pDivSeNum);
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
					ipmutil.resetChk();
				}
			}
		});
		page.SearchDList7DList();
	},
	SetTabPages : function(idxTab) {
		if (idxTab == "1") {
			$("#tabDiv1").show();
			$("#tabDiv2").hide();
			$("#tabDiv3").hide();
			$("#tabDiv4").hide();
			$("#tabDiv5").hide();
			$("#tabDiv6").hide();
			$("#tabDiv7").hide();
		} else if (idxTab == "2") {
			$("#tabDiv1").hide();
			$("#tabDiv2").show();
			$("#tabDiv3").hide();
			$("#tabDiv4").hide();
			$("#tabDiv5").hide();
			$("#tabDiv6").hide();
			$("#tabDiv7").hide();
		} else if (idxTab == "3") {
			$("#tabDiv1").hide();
			$("#tabDiv2").hide();
			$("#tabDiv3").show();
			$("#tabDiv4").hide();
			$("#tabDiv5").hide();
			$("#tabDiv6").hide();
			$("#tabDiv7").hide();
		} else if (idxTab == "4") {
			$("#tabDiv1").hide();
			$("#tabDiv2").hide();
			$("#tabDiv3").hide();
			$("#tabDiv4").show();
			$("#tabDiv5").hide();
			$("#tabDiv6").hide();
			$("#tabDiv7").hide();
		} else if (idxTab == "5") // 소모품교체
		{
			$("#tabDiv1").hide();
			$("#tabDiv2").hide();
			$("#tabDiv3").hide();
			$("#tabDiv4").hide();
			$("#tabDiv5").show();
			$("#tabDiv6").hide();
			$("#tabDiv7").hide();
			/*
			 * if($selcetValue != undefined && $selcetValue.length > 0) {
			 * page.SearchDList5($selcetValue.find(".rowData04")[0].val(),
			 * $selcetValue.find(".rowData03")[0].val()); }
			 */
		} else if (idxTab == "6") // 소모품교체
		{
			$("#tabDiv1").hide();
			$("#tabDiv2").hide();
			$("#tabDiv3").hide();
			$("#tabDiv4").hide();
			$("#tabDiv5").hide();
			$("#tabDiv6").show();
			$("#tabDiv7").hide();
			/*
			 * if($selcetValue != undefined && $selcetValue.length > 0) {
			 * page.SearchDList5($selcetValue.find(".rowData04")[0].val(),
			 * $selcetValue.find(".rowData03")[0].val());
			 * page.SearchDList6($selcetValue.find(".rowData04")[0].val(),
			 * $selcetValue.find(".rowData03")[0].val()); }
			 */
		} else if (idxTab == "7") // 소모품교체
		{
			$("#tabDiv1").hide();
			$("#tabDiv2").hide();
			$("#tabDiv3").hide();
			$("#tabDiv4").hide();
			$("#tabDiv5").hide();
			$("#tabDiv6").hide();
			$("#tabDiv7").show();
			/*
			 * if($selcetValue != undefined && $selcetValue.length > 0) {
			 * page.SearchDList7($selcetValue.find(".rowData04")[0].val(),
			 * $selcetValue.find(".rowData03")[0].val()); }
			 */
		}
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
										// page.SearchDList($value1[0].val(),
										// $value2[0].val());
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
		} 
		else // 백 버튼 클릭시
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