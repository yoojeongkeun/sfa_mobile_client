master = {
	orderNo : "",
	custCode : "",
	orderjson : "",
	unitType : "",

	list01 : "",
	list02 : "",
	list03 : "",

	DBCODE : "",
	TBCODE : "",
	ITEMCODE : "",
	UNQCODE : "",
	ZIPCODE6 : "",
	ZIPSEQ : "",
	ZIPCODE5 : "",
	IN_ADDR1 : "",
	IN_ADDR2 : "",
	IN_TYPE : "",
	ST_ADDR1 : "",
	ST_ADDR2 : "",
	ST_BLD : "",
	LT_ADDR1 : "",
	LT_ADDR2 : "",
	COORDINATE1X : "",
	COORDINATE1Y : "",
	COORDINATE2X : "",
	COORDINATE2Y : "",
	ADDR_RESULT : "",
	UNQ_BLD_MNO : "",
	CHANGE_YN : "",
	UNQ_LAW : "",
	UNQ_OFFICE : "",

	init : function(json, orderjson) {
		var deptCode = bizMOB.Storage.get("deptCode");
		if(deptCode == "12014" || deptCode == "13510" || deptCode == "10225" || deptCode == "10285" || deptCode == "12052" || deptCode == "13511")
		{
			$("#selOriginType").removeAttr("disabled").css("background-color", "white");
		}
		else
		{
			$("#selOriginType").attr("disabled", true).css("background-color", "whitesmoke");
		}
		
		// 20170830 장우제 대리 수정 * 수정모드로 집입시에는 원천구분을 변경 못하도록 막음
		if(json.orderNo != ""){
			$("#selOriginType").attr("disabled", true).css("background-color", "whitesmoke");
		}
		
		master.orderNo = json.orderNo;
		master.custCode = json.custCode;
		master.orderjson = orderjson;
		master.unitType = json.unitType;

		master.initInterface();
		master.initData(json);
		master.initLayout();
	},
	initInterface : function() {
		ipmutil.makeCustSearchWrap();
		ipmutil.setCustSearch($("#selCustSearchType"), $("#txtCustSearchText"),
				$("#btnCustSearch"), "master.callbackSetCustList");

		$(".searchWrap").removeAttr("style");
		$(".searchWrap").removeClass("searchWrap");
		$(".inp_srch").css("width", "53%");

		master.setDateTime("#orderYMD", "#cal");
		master.setDateTime("#deliYMD", "#deliCal");

		var nowDate = new Date();
		$("#orderYMD").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
		$("#deliYMD").val(nowDate.bMToFormatDate("yyyy-mm-dd"));

		master.getComboBoxList("", ".selDept", "L1", "N");

		$("#btnOpen").click(function() {
			$(".searchDiv").toggle();

			if ($("#btnOpen").hasClass("btn_close")) {
				$("#btnOpen").removeClass("btn_close");
				$("#btnOpen").toggleClass("btn_open");
				$("#belowArea").css("top", "70px");
			}

			else {
				$("#btnOpen").removeClass("btn_open");
				$("#btnOpen").toggleClass("btn_close");
				$("#belowArea").css("top", "280px");
			}
		});
		
		$("#bCustBtn").click(function() {
			bizMOB.Ui.openDialog("order/html/SD018_pop.html", {
				message : {
					custCode : $("#custCode").val(),
					custNm : $("#custNm").val(),
					prePath : "master.callbackSetCustList",
				},
				width : "95%",
				height : "95%"
			});
		});

		$("#saleDept").change(function() {
			master.getComboBoxList($("#saleDept"), "#saleUser", "L2", "Y");
		});

		$("#contDept").change(function() {
			master.getComboBoxList($("#contDept"), "#contUser", "L2", "Y");
		});

		$("#selPaidType2").change(function() {
			if ($("#selPaidType2").val() == "3205") {
				$("#btnCard").show();
				$("#btnAdd").hide();
				$("#btnDel").hide();
				$(".imgAcct").hide();
				$(".imgAcct").val("");
				$(".imgAcct").attr("key", "");
			} else {
				$("#btnCard").hide();
				$("#btnAdd").show();
				$("#btnDel").show();
				$(".imgAcct").show();
			}

		});

		// 하단 탭 show, hide 기능
		$(".liTab").click(function() {
			$(".liTab button").removeAttr("id");
			$(this).find("button").attr("id", "current");
			var tabIndex = $(this).attr("tabindex");
			if (tabIndex == "1") {
				$("#tab1").show();
				$("#tab2").hide();
				$("#tab3").hide();
				$(".bx-viewport").css("height", "650px");
			} else if (tabIndex == "2") {
				$("#tab1").hide();
				$("#tab2").show();
				$("#tab3").hide();
				$(".bx-viewport").css("height", "700px");
			} else if (tabIndex == "3") {
				$("#tab1").hide();
				$("#tab2").hide();
				$("#tab3").show();
				$(".bx-viewport").css("height", "650px");
			}
		});

		$("#btnSearchDeli").click(function() {
			/*
			 * if(master.list02.CONFYN == "1") { bizMOB.Ui.alert("안내", "이미 완료된
			 * 주문서입니다."); return; }
			 */
			if ($("#custCode").val() == "") {
				bizMOB.Ui.alert("안내", " 고객을 조회하여 주십시오.");
				return;
			}

			bizMOB.Ui.openDialog("Address/html/AD001.html", {
				message : {
					callback1 : "master.setAddress",
					type : "O"
				},
				width : "90%",
				height : "90%"
			});
		});

		$("#btnDel").click(function() {
			$(".imgAcct").val("");
			$(".imgAcct").attr("key", "");
		});

		$("#btnAdd").click(function() {
			/*
			 * if($("#btnAdd").attr("useYN") != "Y") { bizMOB.Ui.alert("안내",
			 * "해당고객은 수금방법이 전용계좌가 아닙니다.\n고객센터로 연락바랍니다."); return; }
			 */

			if ($("#custCode").val() == "") {
				bizMOB.Ui.alert("안내", " 고객을 조회하여 주십시오.");
				return;
			}

			bizMOB.Ui.openDialog("order/html/SD016_pop.html", {
				message : {
					custCode : $("#custCode").val(),
					custNm : $("#custNm").val(),
					prePath : "master.callbackSetAccount",
				},
				width : "95%",
				height : "85%"
			});
		});

		/*
		 * $("#masBtnCancel").click(function(){ bizMOB.Ui.alert("안내", "서비스
		 * 준비중입니다."); });
		 */

		$("#masBtnClear").click(function() {
			master.bindingData("");
			detail.bindingData("");
		});

		$("#masBtnSearch").click(function() {
			var button1 = bizMOB.Ui.createTextButton("예", function() {
				bizMOB.Web.open("order/html/SD015.html", {
					modal : false,
					replace : false,
				});
			});
			var button2 = bizMOB.Ui.createTextButton("아니오", function() {
				return;
			});
			bizMOB.Ui.confirm("알림", "조회화면으로 이동하시겠습니까?", button1, button2);
		});

		$("#btnCard").click(
				function() {
					// 교육용앱 로직 막기
					/*
					 * if(true) { bizMOB.Ui.alert("안내", "교육용 앱에서는 진행할 수 없습니다.");
					 * return; }
					 */

					if ($("#orderNo").val() == "") {
						bizMOB.Ui.alert("안내", "미등록된 주문서는 카드결제를 진행할 수 없습니다.");
						return;
					}

					/*if ($("#btnCard").attr("useYN") != "Y") {
						bizMOB.Ui.alert("안내",
								"해당고객은 수금방법이 카드결제가 아닙니다.\n고객센터로 연락바랍니다.");
						return;
					}*/

					if (master.list02 != undefined && master.list02 != "") {
						if (master.list02.PAIDMTHD == "3220") {
							bizMOB.Ui.alert("안내", "해당 주문서는 전용계좌로 등록된 주문서입니다.");
							return;
						}
					}

					var cardMsg = "";
					var cardSum = 0;
					var cnt = $("#detailListNew").find("tbody").length;

					for ( var i = 0; i < cnt; i++) {
						if ($($("#detailListNew").find("tbody")[i]).is(
								":visible")) {
							cardSum += $($("#detailListNew").find("tbody")[i])
									.find(".TOTAMT").text().bMToNumber();

							if (i != (cnt - 1)) {
								cardMsg = cardMsg
										+ $(
												$("#detailListNew").find(
														"tbody")[i]).find(
												".SALEITEMNAME").text()
										+ " - "
										+ $(
												$("#detailListNew").find(
														"tbody")[i]).find(
												".TOTAMT").text()
												.bMToCommaNumber() + "원,\n";
							}

							else {
								cardMsg = cardMsg
										+ $(
												$("#detailListNew").find(
														"tbody")[i]).find(
												".SALEITEMNAME").text()
										+ " - "
										+ $(
												$("#detailListNew").find(
														"tbody")[i]).find(
												".TOTAMT").text()
												.bMToCommaNumber() + "원\n총 "
										+ cardSum.toString().bMToCommaNumber()
										+ "원에 대한 카드 승인을 진행하시겠습니까?";
							}

						}
					}

					bizMOB.Web.open("collection/html/CL001.html", {
						modal : false,
						replace : false,
						message : {
							CustCode : $("#custCode").val(),
							orderNo : $("#orderNo").val(),
							cardMsg : cardMsg
						}
					});
				});

		$("#masBtnSave").click(function() {
			if (master.list02 != undefined) {
				if (master.list02.CLOSYN == "1") {
					bizMOB.Ui.alert("안내", "매출 확정된 주문서는 수정할 수 없습니다.");
					return;
				} else if (master.list02.CONFYN == "1") {
					bizMOB.Ui.alert("안내", "주문 완료된 주문서는 수정할 수 없습니다.");
					return;
				} else
					master.Save(master.orderjson);
			} else {
				master.Save(master.orderjson);
			}
		});

		$("#deBtnSave").click(function() {
			if (master.list02 != undefined) {
				if (master.list02.CLOSYN == "1") {
					bizMOB.Ui.alert("안내", "매출 확정된 주문서는 수정할 수 없습니다.");
					return;
				} else if (master.list02.CONFYN == "1") {
					bizMOB.Ui.alert("안내", "주문 완료된 주문서는 수정할 수 없습니다.");
					return;
				} else
					master.Save(master.orderjson);
			} else {
				master.Save(master.orderjson);
			}
		});
		
		// 20170830 장우제 대리 수정 * 원천구분 변경 시 주문세부내역 항목 초기화
		var preVal = "";
		$("#selOriginType").focus(function(){
			preVal = $(this).val();
		}).change(function(){
			// 주문세부내역에 항목이 존재할 경우 삭제
			if($("#detailListNew .tbDetail").length != 0){			
				var $that = $(this);
				var btnOK = bizMOB.Ui.createTextButton("삭제", function(){
					$("#detailListNew .tbDetail").remove();
				})
				var btnCancel = bizMOB.Ui.createTextButton("취소", function() {				
					$that.val(preVal);
				});
				bizMOB.Ui.confirm("알림", "원천구분 변경 시 상품이 삭제됩니다. 변경하시겠습니까?", btnOK, btnCancel);
			}
		});
	},

	initData : function(json) {

	},

	initLayout : function() {
		$(".bx-viewport").css("height", "650px");
		$(".itemM").hide();
		$(".item4").show();
		$(".hideSlider").hide();
		
		if(master.orderNo != "")
			$("#bCustBtn").hide();
	},

	// 일자 세팅
	setDateTime : function(txtName, btnName) {
		$(btnName).click(function() {
			$(txtName).focus();
		});
		var option = cescommutil.datePickerOption(function(date) {
		}, "yy-mm-dd");
		$(txtName).datepicker(option);
	},

	// 콤보박스 조회
	getComboBoxList : function(preID, selID, type, changeYN) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01403");
		tr.body.P01 = changeYN == "Y" ? $(preID).val() : "";
		tr.body.P05 = type;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "목록을 불러오는데 실패하였습니다.");
					return;
				}
				master
						.setComboBox(preID, selID, json.body.LIST, type,
								changeYN);
			}
		});
	},

	// 콤보박스 세팅
	setComboBox : function(preID, selID, list, type, changeYN) {
		var options = "";
		$.each(list, function(i, listElement) {
			options += "<option value='" + listElement.R01 + "'>"
					+ listElement.R02 + "</option>";
		});
		$(selID).html(options);
		if (type == "L1") {
			$(selID).val(bizMOB.Storage.get("deptCode"));
			master.getComboBoxList("", ".selUser", "L2", "N");
		} else if (type == "L2" || changeYN == "N")
			$(selID).val(bizMOB.Storage.get("UserID"));
	},

	callbackSetCustList : function(message) {
		$("#custCode").val(message.CustCode);
		$("#custNm").val(message.CustName);
		// $("#custInfo").val(message.DeptName);
		master.unitType = message.CustClCd;
		page.unitType = message.CustClCd;
		$(".bx-viewport").css("height", "650px");

		$("#txtCustSearchText").val(
				"[" + message.CustCode + "] " + message.CustName);

		master.getOrderList("");
	},

	callbackNotSelected : function() {
		/*
		 * $("#custCode").val(""); $("#custNm").val(""); $("#custInfo").val("");
		 */
	},

	getOrderList : function(orderNo) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01601");
		tr.body.P01 = orderNo;
		tr.body.P02 = $("#custCode").val();

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				master.bindingData(json);
				detail.bindingData(json);
			}
		});
	},

	bindingData : function(json) {
		var nowDate = new Date();

		if (json == "" || json.body.LIST01.length == 0) {
			// 상위값
			$("#orderNo").val("");
			$("#custCode").val("");
			$("#custNm").val("");
			$("#txtCustSearchText").val("");
			$("#custInfo").val("");
			$("#orderYMD").val(nowDate.bMToFormatDate("yyyy-mm-dd"));
			$("#selOrderType").val("");
			$("#selOriginType").val("");
			$("#chkBox").attr("checked", false);
			$("#saleDept").val(bizMOB.Storage.get("deptCode"));
			$("#saleUser").val(bizMOB.Storage.get("UserID"));
			$("#contDept").val(bizMOB.Storage.get("deptCode"));
			$("#contUser").val(bizMOB.Storage.get("UserID"));

			// 주문자
			$("#custName").val("");
			$("#phoneNum").val("");
			// $("#custEtc").val(L1.R01); 주문자 비고란 추가 확인

			// 배송
			$("#selDeliType").val("");
			$("#deliName").val("");
			$("#deliAddr1").val("");
			$("#deliAddr2").val("");
			$("#deliAddr3").val("");
			$("#selDeliProc").val("");
			$("#deliPhoneNum").val("");
			$("#deliEtc").val("");
			$("#deliYMD").val(nowDate.bMToFormatDate("yyyy-mm-dd"));

			// 결제
			$("#selPaidType1").val("");
			$("#selPaidType2").val("");

			$("#btnCard").show();
			$("#btnAdd").hide();
			$("#btnDel").hide();
			$(".imgAcct").hide();
		} else {
			var L1 = json.body.LIST01[0];
			var L2 = json.body.LIST02[0];
			var L3 = json.body.LIST04[0];

			master.list01 = json.body.LIST01[0];
			master.list02 = json.body.LIST02[0];
			master.list03 = json.body.LIST04[0];

			master.DBCODE = L3 == undefined ? L1.DBCODE : L3.DBCODE;
			master.TBCODE = L3 == undefined ? L1.TBCODE : L3.TBCODE;
			master.ITEMCODE = L3 == undefined ? L1.ITEMCODE : L3.ITEMCODE;
			master.UNQCODE = L3 == undefined ? L1.UNQCODE : L3.UNQCODE;
			master.ZIPCODE6 = L3 == undefined ? L1.ZIPCODE6 : L3.ZIPCODE6;
			master.ZIPSEQ = L3 == undefined ? L1.ZIPSEQ : L3.ZIPSEQ;
			master.ZIPCODE5 = L3 == undefined ? L1.ZIPCODE5 : L3.ZIPCODE5;
			master.IN_ADDR1 = L3 == undefined ? L1.IN_ADDR1 : L3.IN_ADDR1;
			master.IN_ADDR2 = L3 == undefined ? L1.IN_ADDR2 : L3.IN_ADDR2;
			master.IN_TYPE = L3 == undefined ? L1.IN_TYPE : L3.IN_TYPE;
			master.ST_ADDR1 = L3 == undefined ? L1.ST_ADDR1 : L3.ST_ADDR1;
			master.ST_ADDR2 = L3 == undefined ? L1.ST_ADDR2 : L3.ST_ADDR2;
			master.ST_BLD = L3 == undefined ? L1.ST_BLD : L3.ST_BLD;
			master.LT_ADDR1 = L3 == undefined ? L1.LT_ADDR1 : L3.LT_ADDR1;
			master.LT_ADDR2 = L3 == undefined ? L1.LT_ADDR2 : L3.LT_ADDR2;
			master.COORDINATE1X = L3 == undefined ? L1.COORDINATE1X
					: L3.COORDINATE1X;
			master.COORDINATE1Y = L3 == undefined ? L1.COORDINATE1Y
					: L3.COORDINATE1Y;
			master.COORDINATE2X = L3 == undefined ? L1.COORDINATE2X
					: L3.COORDINATE2X;
			master.COORDINATE2Y = L3 == undefined ? L1.COORDINATE2Y
					: L3.COORDINATE2Y;
			master.ADDR_RESULT = L3 == undefined ? L1.ADDR_RESULT
					: L3.ADDR_RESULT;
			master.UNQ_BLD_MNO = L3 == undefined ? L1.UNQ_BLD_MNO
					: L3.UNQ_BLD_MNO;
			master.CHANGE_YN = L3 == undefined ? L1.CHANGE_YN : L3.CHANGE_YN;
			master.UNQ_LAW = L3 == undefined ? L1.UNQ_LAW : L3.UNQ_LAW;
			master.UNQ_OFFICE = L3 == undefined ? L1.UNQ_OFFICE : L3.UNQ_OFFICE;

			if (master.list02 != undefined && master.list02.CONFYN == "1") {
				$("#custNm").attr("disabled", true);
				$("#custNm").css("background-color", "whitesmoke");
				$("#txtCustSearchText").attr("disabled", true);
				$("#txtCustSearchText").css("background-color", "whitesmoke");
			}
			// 상위값
			$("#orderNo").val(L2 == undefined ? "" : L2.ORDRNO);
			$("#custCode").val(L1.R02);
			$("#custNm").val(L1.R03);
			$("#txtCustSearchText").val("[" + L1.R02 + "] " + L1.R03);
			$("#custInfo").val(L1.R04);
			$("#orderYMD").val(
					L2 == undefined ? nowDate.bMToFormatDate("yyyy-mm-dd")
							: L2.RCPTYMD);
			$("#selOrderType").val(L2 == undefined ? "" : L2.SALETYPE);
			$("#selOriginType").val(L2 == undefined ? "" : L2.ROOTTYPE);
			L2 == undefined ? "" : (L2.RCPYN == "1" ? $("#chkBox").attr(
					"checked", true) : $("#chkBox").attr("checked", false));
			$("#saleDept").val(
					L2 == undefined ? bizMOB.Storage.get("deptCode")
							: L2.RCPTDEPT);
			$("#saleUser").val(
					L2 == undefined ? bizMOB.Storage.get("UserID")
							: L2.RCPTUSER);
			$("#contDept").val(
					L2 == undefined ? bizMOB.Storage.get("deptCode")
							: L2.CONTDEPTCD);
			$("#contUser").val(
					L2 == undefined ? bizMOB.Storage.get("UserID")
							: L2.CONTEMPCD);

			// 주문자
			$("#custName").val(L1.CUSTNAME);
			$("#phoneNum").val(L1.PHONENUM);
			// $("#custEtc").val(L1.R01); 주문자 비고란 추가 확인

			// 배송
			$("#selDeliType").val(L3 == undefined ? "" : L3.DLVYTYPE);
			$("#deliName").val(L3 == undefined ? "" : L3.USERNAME);
			$("#deliAddr1").val(L3 == undefined ? L1.ZIPCODE6 : L3.ZIPCODE6);
			$("#deliAddr2").val(L3 == undefined ? L1.ST_ADDR1 : L3.ST_ADDR1);
			$("#deliAddr3")
					.val(
							L3 == undefined ? L1.ST_BLD : L3.ST_ADDR2 + ' '
									+ L3.ST_BLD);
			$("#selDeliProc").val(L3 == undefined ? "" : L3.SENDYN);
			$("#deliPhoneNum").val((L3 == undefined || L3.PHONENO == '') ? L1.PHONENUM : L3.PHONENO);
			$("#deliEtc").val(L3 == undefined ? "" : L3.ETC);
			$("#deliYMD").val(
					L3 == undefined ? nowDate.bMToFormatDate("yyyy-mm-dd")
							: L3.DEVFROM);

			// 결제
			$("#btnCard").attr("useYN", L1.R05);
			$("#btnAdd").attr("useYN", L1.R06);

			$("#selPaidType1").val(L2 == undefined ? "" : L2.PAIDTYPE);
			$("#selPaidType2").val(L2 == undefined ? "" : L2.PAIDMTHD);

			if ($("#selPaidType2").val() == "3205") {
				$("#btnCard").show();
				$("#btnAdd").hide();
				$("#btnDel").hide();
				$(".imgAcct").hide();
				$(".imgAcct").val("");
				$(".imgAcct").attr("key", "");
			} else {
				$("#btnCard").hide();
				$("#btnAdd").show();
				$("#btnDel").show();
				$(".imgAcct").show();
			}

			if (L2 != undefined) {
				if (L2.PAIDMTHD == "3220") {
					$("#btnCard").hide();
					$("#btnAdd").show();
					$("#btnDel").show();
					$(".imgAcct").show();
				} else {
					$("#btnCard").show();
					$("#btnAdd").hide();
					$("#btnDel").hide();
					$(".imgAcct").hide();
				}
			}

			if (L2 != undefined) {
				if (L2.PAIDKEY != "" && L2.PAIDKEY != "-1") {
					var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01602");
					tr.body.P01 = $("#custCode").val();
					tr.body.P02 = L2.PAIDKEY;
					tr.body.P03 = "";

					bizMOB.Web.post({
						message : tr,
						success : function(json) {
							if (json.header.result == false) {
								bizMOB.Ui.alert("경고", json.header.error_text);
								return;
							}

							$("#accountNo").val(
									json.body.LIST.length == 0 ? ""
											: json.body.LIST[0].R05);
						}
					});
				}
			}
		}
	},

	callbackSetAccount : function(message) {
		$("#accountNo").val(message.accountNo);
		$("#accountNo").attr("key", message.key);
	},

	Save : function(json) {
		if ($("#custCode").val().length < 5) {
			bizMOB.Ui.alert("안내", "고객코드를 확인하여 주십시오.");
			return;
		}

		if ($("#deliName").val().length == 0) {
			bizMOB.Ui.alert("안내", "배송 받으시는 분을 확인하여 주십시오.");
			
			page.slider.goToSlide(0);
			
			$(".liTab button").removeAttr("id");
			$($(".liTab")[1]).find("button").attr("id", "current");
			$("#tab1").hide();
			$("#tab2").show();
			$("#tab3").hide();
			$(".bx-viewport").css("height", "700px");
			
			$("#deliName").focus();
			return;
		}
		
		if($("#deliPhoneNum").val().trim() == ""){
			bizMOB.Ui.alert("안내", "배송 받으시는 분의 연락처를 확인해주세요.");
			
			page.slider.goToSlide(0);
			
			$(".liTab button").removeAttr("id");
			$($(".liTab")[1]).find("button").attr("id", "current");
			$("#tab1").hide();
			$("#tab2").show();
			$("#tab3").hide();
			$(".bx-viewport").css("height", "700px");
			
			$("#deliPhoneNum").focus();
			return;
		}

		var length = 0;

		$.each($("#detailListNew").find("tbody"), function(i, colElement) {
			if ($(colElement).is(":visible"))
				length++;
		});

		if (length < 1) {
			bizMOB.Ui.alert("안내", "판매상품이 1개 이상 등록되어야 합니다.");
			page.slider.goToSlide(1);
			return;
		}

		if ($("#selPaidType2").val() == "3220" && $("#accountNo").val() == "") {
			bizMOB.Ui.alert("안내", "가상계좌를 입력하여 주십시오.");
			
			page.slider.goToSlide(0);
			
			$(".liTab button").removeAttr("id");
			$($(".liTab")[2]).find("button").attr("id", "current");
			$("#tab1").hide();
			$("#tab2").hide();
			$("#tab3").show();
			$(".bx-viewport").css("height", "650px");
			
			$("#accountNo").focus();
			return;
		}

		var button1 = bizMOB.Ui.createTextButton("예", function() {
			var CollectArr = new Array;
			var cnt = $("#detailListNew").find("tbody").length;

			for ( var i = 0; i < cnt; i++) {
				CollectArr.push({
					siORDRSEQN : $($("#detailListNew").find("tbody")[i]).find(
							".seq").attr("ordrseqn") == undefined ? 1000 : $(
							$("#detailListNew").find("tbody")[i]).find(".seq")
							.attr("ordrseqn").bMToNumber(),
					cSALEITEMCODE : $($("#detailListNew").find("tbody")[i])
							.find(".SALEITEMNAME").attr("code"),
					cSALETYPE : "OT10",
					siQUANTITY : $($("#detailListNew").find("tbody")[i]).find(
							".QUANTITY").val().bMToNumber(),
					nmUNITPRICE : $($("#detailListNew").find("tbody")[i]).find(
							".UNITPRICE").text().bMToNumber(),
					nmAMT : $($("#detailListNew").find("tbody")[i])
							.find(".AMT").text().bMToNumber(),
					nmDISCRATE : $($("#detailListNew").find("tbody")[i]).find(
							".DISCRATE").attr("rate").bMToNumber(),
					nmAPPLAMT : $($("#detailListNew").find("tbody")[i]).find(
							".APPLAMT").val().bMToNumber(),
					nmTAX : $($("#detailListNew").find("tbody")[i])
							.find(".TAX").text().bMToNumber(),
					nmTOTAMT : $($("#detailListNew").find("tbody")[i]).find(
							".TOTAMT").text().bMToNumber(),
					nvcMEMO : "",
					cType : $($("#detailListNew").find("tbody")[i]).is(
							":visible") ? "0" : "1",
				});
			}

			var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01801");

			tr.body.cORDRNOin = $("#orderNo").val();
			tr.body.cPRNTORDRNO = "";
			tr.body.vcCUSTCODE = $("#custCode").val();
			tr.body.cRCPTYMD = $("#orderYMD").val().replace("-", "").replace(
					"-", "");
			tr.body.cRCPTUSER = $("#saleUser").val();
			tr.body.cROOTTYPE = $("#selOriginType").val();
			tr.body.vcROOTCODE = json == "" ? "" : json.ROOTCODE;
			tr.body.vcPAIDKEY = $("#selPaidType2").val() == "3205" ? "" : ($(
					"#accountNo").attr("key") == undefined ? "" : $(
					"#accountNo").attr("key"));
			tr.body.cORDRTYPE = master.list02 == "" ? "AF10"
					: (master.list02 == undefined ? "AF10"
							: master.list02.ORDRTYPE);
			tr.body.cPAIDTYPE = $("#selPaidType1").val();
			tr.body.cPAIDMTHD = $("#selPaidType2").val();
			tr.body.cDLVYTYPE = $("#selDeliType").val();
			tr.body.cSALETYPE = $("#selOrderType").val();
			tr.body.cRLESYN = $("#selDeliProc").val();
			tr.body.cRLESYMD = $("#deliYMD").val().replace("-", "").replace(
					"-", "");
			tr.body.nvcMEMO = "";// $("#deliEtc").val();
			tr.body.cUSID = bizMOB.Storage.get("UserID");
			tr.body.cORDRNO = "";
			tr.body.cMNGDEPTCD = $("#saleDept").val();
			tr.body.cClosYN = "0";
			tr.body.cCONTDEPTCD = $("#contDept").val();
			tr.body.cCONTEMPCD = $("#contUser").val();

			tr.body.DLVYTYPE = $("#selDeliType").val();
			tr.body.USERNAME = $("#deliName").val();
			tr.body.SENDYN = $("#selDeliProc").val();
			tr.body.DEVFROM = $("#deliYMD").val();
			tr.body.PHONENO = $("#deliPhoneNum").val();
			tr.body.ETC = $("#deliEtc").val();
			tr.body.USID = bizMOB.Storage.get("UserID");
			tr.body.CUSTCODE = $("#custCode").val();

			tr.body.DBCODE = "D001";
			tr.body.TBCODE = "T005";
			tr.body.ITEMCODE = "I007";
			tr.body.UNQCODE = "";
			
			
			tr.body.ZIPCODE6 = master.ZIPCODE6;
			
			tr.body.ZIPSEQ = master.ZIPSEQ;
			tr.body.ZIPCODE5 = master.ZIPCODE5;
			tr.body.IN_ADDR1 = master.IN_ADDR1;
			tr.body.IN_ADDR2 = master.IN_ADDR2;
			tr.body.IN_TYPE = master.IN_TYPE;
			tr.body.ST_ADDR1 = master.ST_ADDR1;
			tr.body.ST_ADDR2 = master.ST_ADDR2;
			tr.body.ST_BLD = master.ST_BLD;
			tr.body.LT_ADDR1 = master.LT_ADDR1;
			tr.body.LT_ADDR2 = master.LT_ADDR2;
			tr.body.COORDINATE1X = master.COORDINATE1X;
			tr.body.COORDINATE1Y = master.COORDINATE1Y;
			tr.body.COORDINATE2X = master.COORDINATE2X;
			tr.body.COORDINATE2Y = master.COORDINATE2Y;
			tr.body.ADDR_RESULT = master.ADDR_RESULT;
			tr.body.UNQ_BLD_MNO = master.UNQ_BLD_MNO;
			tr.body.CHANGE_YN = "Y";
			tr.body.UNQ_LAW = master.UNQ_LAW;
			tr.body.UNQ_OFFICE = master.UNQ_OFFICE;

			tr.body.LIST = CollectArr;

			bizMOB.Web.post({
				message : tr,
				success : function(json) {
					if (json.header.result == false) {
						bizMOB.Ui.alert("경고", json.header.error_text);
						return;
					}
					bizMOB.Ui.alert("안내", "저장이 완료되었습니다.");
					master.getOrderList(json.body.orderNo);
					return;
				}
			});
		});
		var button2 = bizMOB.Ui.createTextButton("아니오", function() {
			return;
		});
		bizMOB.Ui.confirm("알림", "저장시 주문완료까지 일괄처리됩니다.\n주문서를 등록하시겠습니까?", button1,
				button2);
	},

	setAddress : function(rMsg) {
		$("#deliAddr1").val(rMsg.ST_ZIPCODE);
		$("#deliAddr2").val(rMsg.ST_ADDR1);
		$("#deliAddr3").val(rMsg.ST_ADDR2 + ' ' + rMsg.ST_BLD);
		master.DBCODE = "D001";
		master.TBCODE = "T005";
		master.ITEMCODE = "I007";
		master.UNQCODE = "";
		master.ZIPCODE6 = rMsg.ZIPCODE6;
		master.ZIPSEQ = rMsg.LT_ZIPSEQ;
		master.ZIPCODE5 = rMsg.ST_ZIPCODE;
		master.IN_ADDR1 = rMsg.IN_ADDR1;
		master.IN_ADDR2 = rMsg.IN_ADDR2;
		master.IN_TYPE = rMsg.IN_TYPE;
		master.ST_ADDR1 = rMsg.ST_ADDR1;
		master.ST_ADDR2 = rMsg.ST_ADDR2;
		master.ST_BLD = rMsg.ST_BLD;
		master.LT_ADDR1 = rMsg.LT_ADDR1;
		master.LT_ADDR2 = rMsg.LT_ADDR2;
		master.COORDINATE1X = rMsg.GIS1X;
		master.COORDINATE1Y = rMsg.GIS1Y;
		master.COORDINATE2X = rMsg.GIS2X;
		master.COORDINATE2Y = rMsg.GIS2Y;
		master.ADDR_RESULT = rMsg.ADDR_RESULT;
		master.UNQ_BLD_MNO = rMsg.UNQ_BLD_MNO;
		master.CHANGE_YN = "Y";
		master.UNQ_LAW = rMsg.UNQ_LAW;
		master.UNQ_OFFICE = rMsg.UNQ_OFFICE;
	},
};
