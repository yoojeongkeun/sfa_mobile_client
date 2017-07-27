page = {
	CUSTCODE : "",
	DATE : "",
	USERID : "",
	init : function(json) {
		var datetime = 	new Date();
		
		page.CUSTCODE = json.CustCode;
		page.DATE = datetime.bMToFormatDate("yyyymmdd");
		page.USERID = json.UserId;
		
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initData : function(json) {
		var datetime = 	new Date();
 		$("#VISITDATE").val(datetime.bMToFormatDate("yyyy-mm-dd"));
	    
		page.getSalesActivity();
	},
	initInterface : function() {
		$(".closeBtn").click(function() {
			bizMOB.Ui.closeDialog();
		});
		$(".btn01").click(function() {
			bizMOB.Ui.closeDialog();
		});

		$(".btn03").click(function() {
			page.insertSalesActivity();
		});

		var option = cescommutil.datePickerOption(function(date) {
		}, "yy-mm-dd");
		$("#VISITDATE").datepicker(option);

		$('.btn_cal').click(function() {
			$("#VISITDATE").datepicker("show");
		});
	},
	initLayout : function() {
		bizMOB.Ui.displayView();
	},
	getSalesActivity : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01309");
		tr.body.CUSTCODE = page.CUSTCODE;
		tr.body.DATE = page.DATE;
		tr.body.USERID = page.USERID;
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result==false) {
					return;
				}
				if (json.body.LIST.length == 0)
					return;
				
				$("#VISITDATE").val(json.body.LIST[0].VISITDATE);
				$("#INTERVIEWER").val(json.body.LIST[0].INTERVIEWER);
				$("#PHONE1").val(
						json.body.LIST[0].PHONE.substring(0,
								json.body.LIST[0].PHONE.indexOf("-", 1)));
				$("#PHONE2").val(
						json.body.LIST[0].PHONE.substring(
								json.body.LIST[0].PHONE.indexOf("-", 1) + 1,
								json.body.LIST[0].PHONE.indexOf("-",
										json.body.LIST[0].PHONE.indexOf("-",
												1) + 1)));
				$("#PHONE3").val(
						json.body.LIST[0].PHONE.substring(
								json.body.LIST[0].PHONE.length - 4,
								json.body.LIST[0].PHONE.length));
				$("#HP1").val(
						json.body.LIST[0].HP.substring(0,
								json.body.LIST[0].HP.indexOf("-", 1)));
				$("#HP2").val(
						json.body.LIST[0].HP.substring(json.body.LIST[0].HP
								.indexOf("-", 1) + 1, json.body.LIST[0].HP
								.indexOf("-", json.body.LIST[0].HP.indexOf(
										"-", 1) + 1)));
				$("#HP3").val(
						json.body.LIST[0].HP.substring(
								json.body.LIST[0].HP.length - 4,
								json.body.LIST[0].HP.length));

				if (json.body.LIST[0].BASIC == "Y") {
					$('input:checkbox[id="BASIC"]').attr("checked", true);
				}
				if (json.body.LIST[0].FIC == "Y") {
					$('input:checkbox[id="FIC"]').attr("checked", true);
				}
				if (json.body.LIST[0].VBC == "Y") {
					$('input:checkbox[id="VBC"]').attr("checked", true);
				}
				if (json.body.LIST[0].BEDBUG == "Y") {
					$('input:checkbox[id="BEDBUG"]').attr("checked", true);
				}
				if (json.body.LIST[0].MOTH == "Y") {
					$('input:checkbox[id="MOTH"]').attr("checked", true);
				}
			}
		});
	},
	insertSalesActivity : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01310");
		tr.body.CUSTCODE = page.CUSTCODE;
		tr.body.DATE = page.DATE;
		tr.body.USERID = page.USERID;
		tr.body.VISITDATE = $("#VISITDATE").val().substring(0, 4)
				+ $("#VISITDATE").val().substring(5, 7)
				+ $("#VISITDATE").val().substring(8, 10);
		tr.body.INTERVIEWER = $("#INTERVIEWER").val();
		tr.body.PHONE = $("#PHONE1").val() + "-" + $("#PHONE2").val() + "-" + $("#PHONE3").val();
		tr.body.HP = $("#HP1").val() + "-" + $("#HP2").val() + "-" + $("#HP3").val();
		tr.body.BASIC = "N";
		if ($('input:checkbox[id="BASIC"]').is(":checked") == true) {
			tr.body.BASIC = "Y";
		}
		tr.body.FIC = "N";
		if ($('input:checkbox[id="FIC"]').is(":checked") == true) {
			tr.body.FIC = "Y";
		}
		tr.body.VBC = "N";
		if ($('input:checkbox[id="VBC"]').is(":checked") == true) {
			tr.body.VBC = "Y";
		}
		tr.body.BEDBUG = "N";
		if ($('input:checkbox[id="BEDBUG"]').is(":checked") == true) {
			tr.body.BEDBUG = "Y";
		}
		tr.body.MOTH = "N";
		if ($('input:checkbox[id="MOTH"]').is(":checked") == true) {
			tr.body.MOTH = "Y";
		}
		tr.body.TRACT = "";
		tr.body.REGISTER = page.USERID;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == false) {
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				} else {
					var button = bizMOB.Ui.createTextButton("확인", function() {
                		bizMOB.Ui.closeDialog();
            		});

            		bizMOB.Ui.confirm("알림", "등록되었습니다.", button);
				}
			}
		});
	}
};