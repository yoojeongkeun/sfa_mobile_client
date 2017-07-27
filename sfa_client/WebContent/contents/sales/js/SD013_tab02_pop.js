page = {

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

	custType : "",
	init : function(json) {
		tab02.init(json);

		$("#t02_btnAddressSearch").click(function() {
			bizMOB.Ui.openDialog("Address/html/AD001.html", {
				message : {
					callback1 : "page.setAddress",
					type : "O"
				},
				width : "90%",
				height : "90%"
			});
		});
	},
	setCommonCombo : function(callback) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01301");
		tr.body.P01 = "";
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					list = json.body;

					// if(callback) callback();

					// tab01.setComboBox(list);

					$(".Combo1 option").remove();
					$(".Combo2 option").remove();
					$(".Combo3 option").remove();
					$(".Combo4 option").remove();
					$(".Combo5 option").remove();

					var listCode1 = list.LIST01;

					for ( var i = 0; i < listCode1.length; i++) {
						$(".Combo1").append(
								"<option value='" + listCode1[i].R01 + "'>"
										+ listCode1[i].R02 + "</option>");
					}

					var listCode2 = list.LIST02;

					for ( var i = 0; i < listCode2.length; i++) {
						$(".Combo2").append(
								"<option value='" + listCode2[i].R01 + "'>"
										+ listCode2[i].R02 + "</option>");
					}

					var listCode3 = list.LIST03;

					for ( var i = 0; i < listCode3.length; i++) {
						$(".Combo3").append(
								"<option value='" + listCode3[i].R01 + "'>"
										+ listCode3[i].R02 + "</option>");
					}

					var listCode4 = list.LIST04;

					for ( var i = 0; i < listCode4.length; i++) {
						$(".Combo4").append(
								"<option value='" + listCode4[i].R01 + "'>"
										+ listCode4[i].R02 + "</option>");
					}

					var listCode5 = list.LIST05;

					for ( var i = 0; i < listCode5.length; i++) {
						$(".Combo5").append(
								"<option value='" + listCode5[i].R01 + "'>"
										+ listCode5[i].R02 + "</option>");
					}
				}
			}
		});
	},

	setTypeLargeCombobox : function($selectID) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01202");
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result || json.body.LIST01.length == 0) {
					bizMOB.Ui.alert("안내", "유형대 리스트를 가져오는데 실패하였습니다.");
					return;
				}
				page.bindingCombobox($selectID, json.body.LIST01);

			}
		});
	},

	setTypeMediumCombobox : function($selectID, $pSelectID, strValue) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01203");
		tr.body.P01 = $pSelectID.val();
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result || json.body.LIST01.length == 0) {
					bizMOB.Ui.alert("안내", "유형중 리스트를 가져오는데 실패하였습니다.");
					return;
				}
				page.bindingCombobox($selectID, json.body.LIST01, strValue);
			}
		});
	},
	// 계약예상등급
	setContractExpactGradeCombobox : function(selID) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01303");
		tr.body.P01 = "Z01";
		tr.body.P02 = "";
		tr.body.P03 = "";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "계약예상등급 목록을 불러오는데 실패하였습니다.");
					return;
				}
				page.setComboBox(selID, json.body.LIST01);
			}
		});
	},

	bindingCombobox : function($that, list, strValue) {
		var comboboxOption = "";
		$.each(list, function(i, listElement) {
			comboboxOption += "<option value='" + listElement.R01 + "'>"
					+ listElement.R02 + "</option>";
		});
		$that.html(comboboxOption);
		if (strValue != undefined)
			$that.val(strValue);
	},
	// 부서관련 콤보박스!
	getComboBoxList : function(selID, type, strValue, strUserID) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01303");
		tr.body.P01 = type;
		tr.body.P02 = strValue;
		tr.body.P03 = "";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "본부 목록을 불러오는데 실패하였습니다.");
					return;
				}
				page.setComboBox(selID, json.body.LIST01, strUserID);
			}
		});
	},
	// 부서관련 콤보박스!
	setComboBox : function(id, list, strUserID) {
		var options = "";
		$.each(list, function(i, listElement) {
			options += "<option value='" + listElement.R01 + "'>"
					+ listElement.R02 + "</option>";
		});
		$(id).html(options);
		if (strUserID != undefined)
			$(id).val(strUserID);
	},
	setDateTime : function(txtName, btnName) {
		$(btnName).click(function() {
			$(txtName).focus();
		});
		var option = cescommutil.datePickerOption(function(date) {
		}, "yy-mm-dd");
		$(txtName).datepicker(option);
	},
	changeDateFormat : function(date, symbol) {
		if (date.length != 8)
			return "";
		if (symbol == undefined)
			symbol = "-";
		return date.substr(0, 4) + symbol + date.substr(4, 2) + symbol
				+ date.substr(6, 2);

	},
	setAddress : function(rMsg) {
		$("#t02_txtNewAddress").val(
				rMsg.ST_ADDR1 + rMsg.ST_ADDR2 + ' ' + rMsg.ST_BLD);
		$("#t02_txtAddressNumber").val(rMsg.ST_ZIPCODE);
		page.DBCODE = "D001";
		page.TBCODE = "T005";
		page.ITEMCODE = "I007";
		page.UNQCODE = "";
		page.ZIPCODE6 = rMsg.ZIPCODE6;
		page.ZIPSEQ = rMsg.LT_ZIPSEQ;
		page.ZIPCODE5 = rMsg.ST_ZIPCODE;
		page.IN_ADDR1 = rMsg.IN_ADDR1;
		page.IN_ADDR2 = rMsg.IN_ADDR2;
		page.IN_TYPE = rMsg.IN_TYPE;
		page.ST_ADDR1 = rMsg.ST_ADDR1;
		page.ST_ADDR2 = rMsg.ST_ADDR2;
		page.ST_BLD = rMsg.ST_BLD;
		page.LT_ADDR1 = rMsg.LT_ADDR1;
		page.LT_ADDR2 = rMsg.LT_ADDR2;
		page.COORDINATE1X = rMsg.GIS1X;
		page.COORDINATE1Y = rMsg.GIS1Y;
		page.COORDINATE2X = rMsg.GIS2X;
		page.COORDINATE2Y = rMsg.GIS2Y;
		page.ADDR_RESULT = rMsg.ADDR_RESULT;
		page.UNQ_BLD_MNO = rMsg.UNQ_BLD_MNO;
		page.CHANGE_YN = "Y";
		page.UNQ_LAW = rMsg.UNQ_LAW;
		page.UNQ_OFFICE = rMsg.UNQ_OFFICE;
	}
};

tab02 = {
	popupJSON : "",
	mode : "",
	custType : "",
	init : function(json) {
		tab02.custType = json.custType;
		tab02.initInterface();
		tab02.initData(json);
		tab02.initLayout();
	},
	initInterface : function() {
		// 하단 탭 show, hide 기능
		$(".t2_liTab").click(function() {
			$(".t2_liTab button").removeAttr("id");
			$(this).find("button").attr("id", "current");
			var tabIndex = $(this).attr("tabindex");
			if (tabIndex == "1") {
				$("#t2_divTab1").show();
				$("#t2_divTab2").hide();
			} else if (tabIndex == "2") {
				$("#t2_divTab1").hide();
				$("#t2_divTab2").show();
			}
		});

		// 등록버튼 클릭시
		$("#btnRegist").click(function() {
			tab02.regist();
		});

		// 초기화 버튼 클릭시
		$("#btnClear").click(function() {
			page.tab02 = "I";
			$("#t02_txtCustCode").val("");
			$("#t02_txtCustName").val("");
			$("input[name=t02_rd][value=1]").prop("checked", true);
			$("#t02_txtFacilityName").val("");
			$("#calTo").val("");
			$("#t02_typeLarge").val(0);
			$("#t02_typeMedium").html("<option value> 유형중</option>");
			$("#t02_selBR").val("");
			$("#t02_selUserID").html("<option value>관리사원</option>");

			$("#t02_txtOldAddress").val("");
			$("#t02_txtOldAddress").attr("addr1", "");
			$("#t02_txtOldAddress").attr("addr2", "");

			$("#t02_txtNewAddress").val("");
			$("#t02_txtNewAddress").attr("addr1", "");
			$("#t02_txtNewAddress").attr("addr2", "");

			$("#t02_txtAddressNumber").val("");
			$("#t02_tbodyPotentialCustomerListNew").html("");

			tab02.resetCustRespInfo();

			$("#t02_txtETC").val("");
			$("#t02_txtYearArea").val("");
			$("#chkManagementYN").prop("checked", false);
			$("#t02_txtPrice").val("");
			$("#t02_calContractEndDay").val("");
			$("#t02_selContractExpactGrade").val(0);
			$("#t02_calCompletionDay").val("");

			$(".t2_liTab[tabindex=1]").trigger("click");
		});

		// 우측 상단 X 버튼 클릭시
		$(".btn_close").click(function() {
			bizMOB.Ui.closeDialog();
		});

		// 돋보기 버튼 클릭시
		$("#t02_btnSearch").click(function() {
			tab02.getCustInfo();
		});

		// 추가버튼 클릭시
		$(".t02_btnAdd")
				.click(
						function() {
							if ($("#t02_txtCustRespUser").val().trim() == "") {
								bizMOB.Ui.toast("고객담당자명을 입력 후 추가해주세요.");
								return;
							}
							if ($("#t02_txtCustRespDept").val().trim() == "") {
								bizMOB.Ui.toast("고객담당부서를 입력 후 추가해주세요.");
								return;
							}
							// 휴대폰을 필수로 해야하는지 확인 필요
							/*
							 * if($("#t02_txtPhone").val().trim() == ""){
							 * bizMOB.Ui.toast("휴대폰을 입력 후 추가해주세요."); return; }
							 */

							var appendHtml = '<tr class="t02_trList" useyn="1" email="'
									+ $("#t02_txtEMail").val()
									+ '" tel="'
									+ $("#t02_txtTel").val()
									+ '" fax="'
									+ $("#t02_txtFax").val()
									+ '">'
									+ '<td><span class="t02_spanNo">'
									+ ($("#t02_tbodyPotentialCustomerListNew tr").length + 1)
									+ '</span></td>'
									+ '<td><input type="checkbox" class="t02_chkCheck"></td>'
									+ '<td><span class="t02_spanCustomerName">'
									+ $("#t02_txtCustRespUser").val()
									+ '</span></td>'
									+ '<td><span class="t02_spanCustomerDepartmentName">'
									+ $("#t02_txtCustRespDept").val()
									+ '</span></td>'
									+ '<td><span class="t02_spanCustomerPhoneNumber">'
									+ $("#t02_txtPhone").val()
									+ '</span></td>'
									+ '</tr>';
							$("#t02_tbodyPotentialCustomerListNew").append(
									appendHtml);
							tab02.resetCustRespInfo();
						});

		// 삭제버튼 클릭시
		$(".t02_btnDelete").click(function() {
			if ($(".t02_chkCheck:visible:checked").length == 0) {
				bizMOB.Ui.toast("체크된 삭제 대상이 존재하지 않습니다.");
				return;
			}
			$(".t02_chkCheck:visible:checked").parents("tr").remove();
			$(".t02_spanNo:visible").each(function(i, listElement) {
				$(listElement).text(i + 1);
			});
		});

		// 고객 담당자 저장버튼 클릭시
		$(".t2_btnSave").click(function() {
			var saveList = $(".t02_trList:visible");
			if (saveList.length == 0) {
				bizMOB.Ui.toast("고객담당자가 존재하지 않습니다.");
				return;
			}
		});

	},
	initData : function(json) {
		$("#t02_typeLarge").change(
				function() {
					page.setTypeMediumCombobox($("#t02_typeMedium"),
							$("#t02_typeLarge"));
				});
		page.setTypeLargeCombobox($("#t02_typeLarge"));

		$("#t02_selBR").change(function() {
			page.getComboBoxList("#t02_selUserID", "C01", $(this).val());
		});

		page.getComboBoxList("#t02_selBR", "B01", "");
		page.setContractExpactGradeCombobox("#t02_selContractExpactGrade");
	},
	initLayout : function() {
		// 달력 input text 이름, 오른쪽 달력모양 버튼 이름
		page.setDateTime("#calTo", "#btnCalTo");
		page.setDateTime("#t02_calContractEndDay", "#t02_btnCal");
		page.setDateTime("#t02_calCompletionDay", "#t02_btnCal2");
	},
	getCustInfo : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01302");

		if ($("#t02_txtCustCode").val().trim() == ""
				&& $("#t02_txtCustName").val().trim() == "") {
			bizMOB.Ui.alert("안내", "검색어를 입력 후 진행해주세요.");
			return;
		}

		tr.body.P01 = $("#t02_txtCustCode").val();
		tr.body.P02 = $("#t02_txtCustName").val();
		tr.body.P03 = "";
		tr.body.P04 = bizMOB.Storage.get("deptCode"); // TEST

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "유망고객 리스트를 불러오는데 실패하였습니다.");
					return;
				}

				if (json.body.LIST01.length == 0) {
					// 고객 조회가 없을 경우 새로 발급
					tab02.callbackNotSelected();
				} else if (json.body.LIST01.length > 1) {
					// 고객 조회가 2 이상일 경우 팝업으로 고객 선택
					tab02.json = json;
					var paramJson = {
						body : "",
						header : ""
					};
					paramJson.body = {
						LIST01 : [ {} ]
					};
					paramJson.body.LIST01 = [];
					for ( var i = 0; i < json.body.LIST01.length; i++) {
						paramJson.body.LIST01[i] = {
							R01 : "",
							R02 : ""
						};
						paramJson.body.LIST01[i].R01 = json.body.LIST01[i].R01;
						paramJson.body.LIST01[i].R02 = json.body.LIST01[i].R02;
					}
					bizMOB.Ui.openDialog("sales/html/SD013_pop1.html", {
						message : {
							list : paramJson,
							type : "1"
						},
						width : "95%",
						height : "85%"
					});
				} else {
					tab02.setCustData(json.body.LIST01[0]);
				}
			}
		});
	},
	makeCustCode : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01307");

		tr.body.P01 = tab02.custType;
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result || json.body.LIST01.length == 0) {
					bizMOB.Ui.alert("안내", "고객코드 신규 발급에 실패하였습니다.");
					return;
				}
				tab02.resetAllData();
				$("#t02_txtCustCode").val(json.body.LIST01[0].고객코드);
				tab02.mode = "I"; // 신규 발번 후 insert 모드로
				$("#t02_txtCustCode").attr("disabled", ""); // 고객코드 수정 못 하도록
			}
		});
	},
	setCustData : function(list) {
		$("#t02_txtCustCode").val(list.R01);
		$("#t02_txtCustName").val(list.R02);
		$("#t02_txtFacilityName").val(list.R03);
		$("#t02_typeLarge").val(list.R06);
		page.setTypeMediumCombobox($("#t02_typeMedium"), $("#t02_typeLarge"),
				list.R07);
		$("#t02_selBR").val(list.R05);
		page.getComboBoxList("#t02_selUserID", "C01", list.R05, list.R27);
		$("#t02_txtOldAddress").val(list.R11 + " " + list.R12);
		$("#t02_txtOldAddress").attr("addr1", list.R11);
		$("#t02_txtOldAddress").attr("addr2", list.R12);
		$("#t02_txtNewAddress").val(list.R09 + " " + list.R10);
		$("#t02_txtNewAddress").attr("addr1", list.R09);
		$("#t02_txtNewAddress").attr("addr2", list.R10);
		$("#t02_txtAddressNumber").val(list.R08);

		$("#t02_txtETC").val(list.R22);// 특이사항
		$("#t02_txtYearArea").val(list.R23);
		$("#t02_txtPrice").val(
				list.R24.bMToNumber().toString().bMToCommaNumber());
		$("#t02_calContractEndDay").val(page.changeDateFormat(list.R25));
		tab02.getPotentialCustList(list.R01);

		tab02.mode = "U";
	},
	getPotentialCustList : function(custCode) {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01305");
		tr.body.P01 = custCode; // 테스트
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "잠재고객 리스트를 불러오는데 실패하였습니다.");
					return;
				}
				if (json.body.LIST01.length == 0) {
					bizMOB.Ui.toast("담당자 정보가 존재하지 않습니다.");
					return;
				}
				tab02.renderPotentialCust(json);
			}
		});
	},
	renderPotentialCust : function(json) {
		var no = 0;
		var dir = [ {
			type : "loop",
			target : ".t02_trList",
			value : "LIST01",
			detail : [ {
				type : "single",
				target : ".t02_spanNo",
				value : function() {
					return ++no;
				}
			}, {
				type : "single",
				target : ".t02_chkUseYN",
				value : "R05"
			}, {
				type : "single",
				target : ".t02_spanCustomerName",
				value : "R03"
			}, {
				type : "single",
				target : ".t02_spanCustomerDepartmentName",
				value : "R02"
			}, {
				type : "single",
				target : ".t02_spanCustomerPhoneNumber",
				value : "R09"
			}, {
				type : "single",
				target : "@useyn+",
				value : "R05"
			}, {
				type : "single",
				target : "@email+",
				value : "R06"
			}, {
				type : "single",
				target : "@tel+",
				value : "R07"
			}, {
				type : "single",
				target : "@fax+",
				value : "R08"
			} ]
		} ];
		var options = {
			clone : true,
			newId : "t02_tbodyPotentialCustomerListNew",
			replace : true
		};
		$("#t02_tbodyPotentialCustomerList").bMRender(json.body, dir, options);
	},
	regist : function() {
		if (tab02.mode == "") {
			bizMOB.Ui.alert("안내", "고객 검색 혹은 새로운 고객코드 발번 후 등록이 가능합니다.");
			return;
		}
		if ($("#t02_txtCustCode").val() == "") {
			bizMOB.Ui.alert("안내", "고객코드를 입력해주세요.");
			return;
		}
		if ($(".t02_trList").length - 1 <= 0) {
			bizMOB.Ui.alert("안내", "고객 담당자를 한 명 이상 입력해주세요.");
			return;
		}
		if ($("#t02_txtNewAddress").val().trim() == "") {
			bizMOB.Ui.alert("안내", "주소 검색 후 등록해주세요.");
			return;
		}
		
		if($("#t02_selBR").val() == "" || $("#t02_selBR").val() == "0"){
			bizMOB.Ui.alert("안내", "담당부서 선택 후 등록해주세요.");
			return;
		}
		
		if($("#t02_selUserID").val() == "" || $("#t02_selUserID").val() == "0"){
			bizMOB.Ui.alert("안내", "담당자 선택 후 등록해주세요.");
			return;
		}
		
		if($("#t02_typeLarge").val() == "" || $("#t02_typeLarge").val() == "0"){
			bizMOB.Ui.alert("안내", "유형대 선택 후 등록해주세요.");
			return;
		}
		
		if($("#t02_typeMedium").val() == "" || $("#t02_typeMedium").val() == "0"){
			bizMOB.Ui.alert("안내", "유형중 선택 후 등록해주세요.");
			return;
		}

		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01313");

		// 신주소 관련 파라미터
		tr.body.DBCODE = "D001";
		tr.body.TBCODE = "T001";
		tr.body.ITEMCODE = "I001";
		tr.body.UNQCODE = $("#t02_txtCustCode").val();
		tr.body.ZIPCODE6 = page.ZIPCODE6;
		tr.body.ZIPSEQ = page.ZIPSEQ;
		tr.body.ZIPCODE5 = page.ZIPCODE5;
		tr.body.IN_ADDR1 = page.IN_ADDR1;
		tr.body.IN_ADDR2 = page.IN_ADDR2;
		tr.body.IN_TYPE = page.IN_TYPE;
		tr.body.ST_ADDR1 = page.ST_ADDR1;
		tr.body.ST_ADDR2 = page.ST_ADDR2;
		tr.body.ST_BLD = page.ST_BLD;
		tr.body.LT_ADDR1 = page.LT_ADDR1;
		tr.body.LT_ADDR2 = page.LT_ADDR2;
		tr.body.COORDINATE1X = page.COORDINATE1X;
		tr.body.COORDINATE1Y = page.COORDINATE1Y;
		tr.body.COORDINATE2X = page.COORDINATE2X;
		tr.body.COORDINATE2Y = page.COORDINATE2Y;
		tr.body.ADDR_RESULT = page.ADDR_RESULT;
		tr.body.UNQ_BLD_MNO = page.UNQ_BLD_MNO;
		tr.body.CHANGE_YN = page.CHANGE_YN;
		tr.body.UNQ_LAW = page.UNQ_LAW;
		tr.body.UNQ_OFFICE = page.UNQ_OFFICE;

		tr.body.P01 = $("#t02_txtCustCode").val();
		tr.body.P02 = $("#t02_txtCustName").val();
		tr.body.P03 = $("#t02_txtFacilityName").val();
		tr.body.P04 = $("input[name='t02_rd']:checked").val();
		tr.body.P05 = "1"; // 더 보기
		tr.body.P06 = $("#t02_calCompletionDay").val().replace(/-/g, "");
		tr.body.P07 = $("#t02_selBR").val();
		tr.body.P08 = $("#t02_selUserID").val();
		tr.body.P09 = $($(".t02_trList")[0]).find(
				".t02_spanCustomerDepartmentName").text();
		tr.body.P10 = $($(".t02_trList")[0]).find(".t02_spanCustomerName")
				.text();
		tr.body.P11 = $("#t02_typeLarge").val();
		tr.body.P12 = $("#t02_typeMedium").val();
		tr.body.P13 = $($(".t02_trList")[0]).attr("tel");
		tr.body.P14 = $($(".t02_trList")[0]).find(
				".t02_spanCustomerPhoneNumber").text();
		tr.body.P15 = $($(".t02_trList")[0]).attr("fax");
		tr.body.P16 = $($(".t02_trList")[0]).attr("email");
		;
		tr.body.P17 = page.ZIPCODE5;
		tr.body.P18 = page.IN_ADDR1; // $("#t02_txtOldAddress").val();
										// //$("#t02_txtOldAddress").attr("addr1");
										// 신주소1
		tr.body.P19 = page.ST_BLD
				+ (page.ST_ADDR2 == "" ? "" : (" " + page.ST_ADDR2)); // $("#t02_txtOldAddress").attr("addr2");
																		// 신주소2
		tr.body.P20 = $("#t02_txtETC").val();
		tr.body.P21 = $("#t02_txtYearArea").val();
		tr.body.P22 = $("#t02_txtPrice").val().bMToNumber().toString();
		tr.body.P23 = $("#t02_calContractEndDay").val().replace(/-/g, "");
		tr.body.P24 = page.LT_ADDR1; // $("#t02_txtNewAddress").attr("addr1");
										// 구주소1
		tr.body.P25 = page.LT_ADDR2; // $("#t02_txtNewAddress").attr("addr2");
										// 구주소2
		tr.body.P26 = $("#t02_selContractExpactGrade").val();
		tr.body.P27 = tab02.mode;
		tr.body.P28 = $("#chkManagementYN").prop("checked") ? "Y" : "N";
		tr.body.P29 = "";
		tr.body.P30 = tab02.custType;

		var list01 = [];
		for ( var i = 0; i < $(".t02_trList").length - 1; i++) {
			var listElement = $($(".t02_trList")[i]);
			list01.push({
				P01 : $("#t02_txtCustCode").val(),
				P02 : listElement.find(".t02_spanCustomerDepartmentName")
						.text(),
				P03 : listElement.find(".t02_spanCustomerName").text(),
				P04 : listElement.attr("useyn"),
				P05 : listElement.attr("tel"),
				P06 : listElement.find(".t02_spanCustomerPhoneNumber").text(),
				P07 : listElement.attr("fax"),
				P08 : listElement.attr("email")
			});
		}

		tr.body.LIST01 = list01;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "유망고객 등록에 실패하였습니다.");
					return;
				}
				bizMOB.Ui.toast("유망고객을 등록하였습니다.");
			}
		});

	},
	resetAllData : function() {

	},
	resetCustRespInfo : function() {
		$("#t02_txtCustRespDept").val("");
		$("#t02_txtCustRespUser").val("");
		$("#t02_txtTel").val("");
		$("#t02_txtPhone").val("");
		$("#t02_txtFax").val("");
		$("#t02_txtEMail").val("");
	},
	callbackSetCustList : function(message) {
		var index = -1;
		for ( var i = 0; i < tab02.json.body.LIST01.length; i++) {
			if (message.custCode == tab02.json.body.LIST01[i].R01) {
				index = i;
				break;
			}
		}
		if (index == -1) {
			bizMOB.Ui.toast("일치하는 고객이 존재하지 않습니다.");
			return;
		}
		tab02.setCustData(tab02.json.body.LIST01[i]);
	},
	callbackNotSelected : function() {
		var btnOK = bizMOB.Ui.createTextButton("네", function() {
			tab02.makeCustCode();
		});
		var btnCancel = bizMOB.Ui.createTextButton("아니오", function() {
			return;
		});
		bizMOB.Ui.confirm("알림", "새로운 "
				+ (tab02.custType == "0" ? "가정집" : "산업체") + " 고객코드를 발번하시겠습니까?",
				btnOK, btnCancel);
	}
};
