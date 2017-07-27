page  =
{	
	mode: "",
	popupJson: "",
	custCode: "",
	custName: "",
	reasonCode: "",
	salesPlanID: "",
	
	msgId: "",
	msgSendYN: "",
	msgType: "",
	msgSendTime: "",	
	init : function(json)
	{
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{			
		page.setDateTime("#calFrom", "#btnCalFrom");
		
		$(".btn_search").click(function(){
			page.custSearch();
		});
		
		$(".btnRegist").click(function(){
			var btnOK = bizMOB.Ui.createTextButton("네", function(){
				if(page.mode == ""){
					bizMOB.Ui.alert("안내", "고객 검색 후 진행해주세요.");
					return;
				}
				page.timeCheck();
			});
			var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
				return;
			});
			bizMOB.Ui.confirm("알림", "일정을 " + $(".btnRegist").text() + "하시겠습니까?", btnOK, btnCancel);	
			
		});
		
		$(".btn_close").click(function(){
			bizMOB.Ui.closeDialog();
		});
		
		$(".btnCancel").click(function(){
			if(page.mode == "M"){
				var btnOK = bizMOB.Ui.createTextButton("네", function(){
					page.deletePlan();
				});
				var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
					return;
				});
				bizMOB.Ui.confirm("알림", "일정을 삭제하시겠습니까?", btnOK, btnCancel);	
				
				
			}else{
				bizMOB.Ui.closeDialog({
					
				});
			}
		});
		
		// 예약발송 체크박스 클릭 이벤트
		$("#reserveCheck").click(function(){
			if($(this).prop("checked")){
				$("#selReserve, #trReserveTime").show();
			}else{
				$("#selReserve, #trReserveTime").hide();
			}
		});
		
		// 시작시간 변경시 예약발송시간 변경 이벤트
		$("#dteFromTime, #selReserve").change(function(){
			page.changeReserveTime();
		});
		
		
	},	
	initData:function(json)
	{		
		page.mode = json.mode;
		page.msgId = json.jsonData.msgId;
		page.msgSendYN = json.jsonData.msgSendYN;
		page.msgType = json.jsonData.msgType;
		page.msgSendTime = json.jsonData.msgSendTime;
		
		$("#calFrom").val(json.fromDate);
		$("#calTo").val(json.toDate);
		
		if(json.fromTime != undefined){
			$("#dteFromTime").val(json.fromTime);
		}
		if(json.toTime != undefined){
			$("#dteToTime").val(json.toTime);
		}
		/*
		
		address: $that.find(".address").val(),
		contents: $that.find(".contents").val(),
		custType: $that.attr("custtype")*/
		if(page.mode != undefined){
			page.salesPlanID = json.jsonData.salesPlanID;
			$("#txtCustCode").attr("disabled", "");
			$("#txtCustName").attr("disabled", "");
			$("#txtCustCode").val(json.jsonData.custCode);
			$("#txtCustName").val(json.jsonData.custName);
			$("#txtTitle").val(json.jsonData.title);
			$("#txtDeptName").val(json.jsonData.repDept);
			$("#txtUserName").val(json.jsonData.repUser);
			$("#txtCustType").val(json.jsonData.custType);
			
			page.reasonCode = json.jsonData.contactReson;
			
			$("#txtAddress").val(json.jsonData.address);			
			$("#txtContents").val(json.jsonData.contents);
			
			$(".btn_search").hide();
			$(".btnRegist").text("수정");
			$(".btnCancel").text("삭제");
			page.mode = "M";
			
		}
		page.getComboBoxList("#selReason");
		page.setReserveCombobox();
	},
	initLayout:function()
	{
		
	},
	setDateTime: function(txtName, btnName){
		$(btnName).click(function(){
			$(txtName).focus();
		});
		var option = cescommutil.datePickerOption(function(date){		
			$("#calTo").val(date);
			}, "yy-mm-dd"		 			
		);
		$(txtName).datepicker(option);
	},
	custSearch: function(){
		if($("#txtCustCode").val().trim() == "" && $("#txtCustName").val().trim() == ""){
			bizMOB.Ui.alert("안내", "고객코드 또는 고객명을 입력 후 검색해주세요.");
			return;
		}
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01318");
		tr.body.P01 = "N";
		tr.body.P02 = $("#txtCustCode").val();
		tr.body.P03 = $("#txtCustName").val();
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "고객 목록을 불러오는데 실패하였습니다.");
					return;
				}
				
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "검색된 고객이 없습니다.");
					return;
				}
				
				if(json.body.LIST01.length > 1){
					// 고객 조회가 2 이상일 경우 팝업으로 고객 선택				
					page.popupJson = json;
					var paramJson = {body: "", header: ""}; paramJson.body = {LIST01: [{}]}; paramJson.body.LIST01 = [];
					for(var i=0; i<json.body.LIST01.length; i++){
						paramJson.body.LIST01[i] = {R01:"", R02:""};
						paramJson.body.LIST01[i].R01 = json.body.LIST01[i].CustCode;
						paramJson.body.LIST01[i].R02 = json.body.LIST01[i].CustName;
					}
					bizMOB.Ui.openDialog("service/html/SD011_pop2.html", 
					{ 
						message : 
					   	{
							custCode: $("#txtCustCode").val(),
							custName: $("#txtCustName").val()
					   	},
					   	width:"95%",
						height:"85%"
					});
				}else{
					page.setCustData(json.body.LIST01[0]);
				}
			
			}
		});
	},
	callbackNotSelected: function(){
		
	},
	callbackSetCustList: function(json){		
		page.setCustData(page.popupJson.body.LIST01[json.custIndex]);
	},
	setCustData: function(list){
		$("#txtCustCode").val(list.CustCode);
		$("#txtCustName").val(list.CustName);
		$("#txtDeptName").val(list.DeptName);
		$("#txtUserName").val(list.UserName);
		$("#txtCustType").val(list.CustGubun);
		$("#txtAddress").val(list.Address1);
		$("#txtTitle").val("[" + list.CustGubun.replace("고객", "") + "] " + list.CustName);
		
		page.mode = "I";		
	},
	getComboBoxList: function(selID, type, strValue){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01303");
		tr.body.P01 = "X01";
		tr.body.P02 = "";
		tr.body.P03 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "접촉사유 리스트를 불러오는데 실패하였습니다.");
					return;
				}
				page.setComboBox(selID, json.body.LIST01, strValue);
			}
		});		
	},
	// 부서관련 콤보박스!
    setComboBox: function(id, list, strValue){
		var options = "";
		$.each(list, function(i, listElement){
			options += "<option value='" + listElement.R01 + "'>" + listElement.R02 + "</option>";
		});
		$(id).html(options);
		if(page.reasonCode != "")
			$(id).val(page.reasonCode);
	},
	timeCheck: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01321");
		tr.body.P01 = page.salesPlanID;
		tr.body.P02 = ""; //session userid
		tr.body.P03 = $("#calFrom").val().replace(/-/g, "");
		tr.body.P04 = $("#dteFromTime").val().replace(":", "");
		tr.body.P05 = $("#dteToTime").val().replace(":", "");
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "시간 체크에 실패하였습니다.");
					return;
				}
				
				if(json.body.LIST01.length == 0 || json.body.LIST01[0].R01 == "0"){
					if(page.mode == "I"){
						page.insert();
					}else if(page.mode == "M"){
						page.modify();
					}
				}else{
					bizMOB.Ui.alert("안내", "시간이 겹치는 일정이 존재합니다.");
					return;
				}
			}
		});
		
	},
	insert: function(){
		if($("#txtContents").val().trim() == ""){
			bizMOB.Ui.alert("안내", "내용을 입력해주세요.");
			return;
		}
		if($("#selReason").val() == "N"){
			bizMOB.Ui.alert("안내", "방문/접촉사유를 선택해주세요.");
			return;
		}
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01319");
		tr.body.P01 = ""; // session userid
		tr.body.P02 = "150"; // 박혀져있음.
		tr.body.P03 = $("#txtTitle").val();
		tr.body.P04 = $("#txtAddress").val();
		tr.body.P05 = "0"; // 박혀져있음.
		tr.body.P06 = $("#selReason").val();
		tr.body.P07 = $("#txtCustCode").val();
		tr.body.P08 = $("#txtCustName").val();
		tr.body.P09 = $("#txtContents").val();
		tr.body.P10 = $("#calFrom").val() + " " + $("#dteFromTime").val();
		tr.body.P11 = $("#calTo").val() + " " + $("#dteToTime").val();
		tr.body.P12 = "0";
		tr.body.P13 = "1";
		tr.body.P14 = "0";
		tr.body.P15 = "0 minutes"; // 전부 이 값으로 insert가 되어있음.
		tr.body.P16 = "";// session userid
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result || json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "영업일정 등록에 실패하였습니다.");
					return;
				}
				bizMOB.Ui.toast("영업일정이 등록되었습니다.");
				
				var planId = json.body.LIST01[0].R01;
				
				// 예약발송이 체크되어 있으면 예약문자 발송 로직 호출
				if($("#reserveCheck").prop("checked")){
					page.checkMsg(planId, "INSERT");					
				}else{					
					bizMOB.Ui.closeDialog({
						callback: "page.refresh"
					});					
				}
			}
		});
	},
	modify: function(){
		if($("#txtContents").val().trim() == ""){
			bizMOB.Ui.alert("안내", "내용을 입력해주세요.");
			return;
		}
		if($("#selReason").val() == "N"){
			bizMOB.Ui.alert("안내", "방문/접촉사유를 선택해주세요.");
			return;
		}
		if(!($("#calFrom").val() + " " + $("#dteFromTime").val() < $("#calTo").val() + " " + $("#dteToTime").val())){
			bizMOB.Ui.alert("안내", "시작 / 종료시간을 확인해주세요.");
			return;
		}
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01320");
		tr.body.P01 = ""; // session userid
		tr.body.P02 = "150"; // 박혀져있음.
		tr.body.P03 = $("#txtTitle").val();
		tr.body.P04 = $("#txtAddress").val();
		tr.body.P05 = "0"; // 박혀져있음.
		tr.body.P06 = $("#selReason").val();
		tr.body.P07 = $("#txtCustCode").val();
		tr.body.P08 = $("#txtCustName").val();
		tr.body.P09 = $("#txtContents").val();
		tr.body.P10 = $("#calFrom").val() + " " + $("#dteFromTime").val();
		tr.body.P11 = $("#calTo").val() + " " + $("#dteToTime").val();
		tr.body.P12 = "0";
		tr.body.P13 = "1";
		tr.body.P14 = "0";
		tr.body.P15 = "0 minutes"; // 전부 이 값으로 insert가 되어있음.
		tr.body.P16 = "";// session userid
		tr.body.P17 = page.salesPlanID;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "영업일정 수정에 실패하였습니다.");
					return;
				}
				bizMOB.Ui.toast("영업일정이 수정되었습니다.");
				
				// 예약발송이 체크되어 있으면 예약문자 발송 로직 호출
				if($("#reserveCheck").prop("checked") || page.msgId != ""){
					page.checkMsg(page.salesPlanID, "MOD");			
				}else{		
					bizMOB.Ui.closeDialog({
						callback: "page.refresh"
					});			
				}				
			}
		});
	},
	deletePlan: function(){
		if(page.salesPlanID == ""){
			bizMOB.Ui.alert("안내", "잘못된 접근입니다.");
			return;
		}
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01322");
		tr.body.P01 = page.salesPlanID;
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "영업일정 삭제에 실패하였습니다.");
					return;
				}
				bizMOB.Ui.toast("영업일정이 삭제되었습니다.");
				
				// 예약문자 아이디가 있는 경우 문자 삭제처리
				if(page.msgId != ""){
					page.deleteMsg(page.salesPlanID);
				}
				
				
				
				
				bizMOB.Ui.closeDialog({
					callback: "page.refresh"
				});
			}
		});
	},
	setReserveCombobox: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01103");
		tr.body.GROUPCD = "TM01"; 
		tr.body.GUBN = "";
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("예약발송 리스트 정보를 가져오는데 실패하였습니다.");
					return;
				}
				$(json.body.LIST01).each(function(i, item){
					$("#selReserve").append("<option value=" + item.BASECD + ">" + item.BASENM + "</option>" );
				});				
				
				if(page.msgSendYN == "True"){
					$("#reserveCheck").prop("checked", true);
					$("#selReserve, #trReserveTime").show();					
				}
				
				if(page.msgType != undefined){
					$("#selReserve").val(page.msgType);
				}
				
				page.changeReserveTime();
				/*
				page.msgId = json.msgId;
				page.msgSendYN = json.msgSendYN;
				page.msgType = json.msgType;
				page.msgSendTime = json.msgSendTime;
				*/
			}
		});
	},
	changeReserveTime: function(){
		var hour = $("#selReserve").val().substring(0, 2);
		var minute = $("#selReserve").val().substring(2, 4);
		
		var calTime = new Date($("#calFrom").val() + " " + $("#dteFromTime").val());
		calTime.setHours(calTime.getHours() - hour);
		calTime.setMinutes(calTime.getMinutes() - minute);
		
		$("#txtReserveTime").val(calTime.bMToFormatDate("yyyy-mm-dd hh:nn"));		
	},
	checkMsg: function(planId, gubn){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01104");
		tr.body.reserGubn = "";
		tr.body.reserTime = ($("#calFrom").val() + $("#dteFromTime").val()).replace(/-/g, "").replace(/:/g, "");
		tr.body.Contents = "";
		tr.body.STAFFID = "";
		tr.body.RegUserID = "";
		tr.body.GUBN = gubn;
		tr.body.MSG_ID = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result || json.body.LIST01.length == 0){
					bizMOB.Ui.alert("예약문자 유효성 검사에 실패하였습니다.");
					return;
				}
				if(json.body.LIST01[0].result == "T"){
					// 유효성 검사 성공 로직
					page.sendMsg(planId, gubn);
				}else{
					// 유효성 검사 실패시 return
					bizMOB.Ui.alert(json.body.LIST01[0].result);
					return;
				}
			}
		});		
	},
	sendMsg: function(planId, gubn){
		// 예약문자 저장
		var reserTime = ($("#txtReserveTime").val()).replace(/-/g, "").replace(/:/g, "").replace(" ", "");
		if(!$("#reserveCheck").prop("checked")){
			reserTime = "";		
		} 
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01105");
		tr.body.sScheduleID = planId;
		tr.body.reserGubn = $("#selReserve").val();
		tr.body.reserTime = reserTime;
		tr.body.Contents = ""; // contents에 뭐 들어가나 확인
				
		tr.body.STAFFID = "";
		tr.body.RegUserID = "";
		tr.body.GUBN = gubn;
		tr.body.MSG_ID = page.msgId;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result || json.body.LIST01.length == 0){
					bizMOB.Ui.alert("예약문자 처리에 실패하였습니다.");
					return;
				}
				if(json.body.LIST01[0].result == "T"){
					// 유효성 검사 성공 로직
					bizMOB.Ui.toast("예약문자 전송이 완료되었습니다.");
					bizMOB.Ui.closeDialog({
						callback: "page.refresh"
					});
				}else{
					// 유효성 검사 실패시 return
					bizMOB.Ui.alert(json.body.LIST01[0].result);
					return;
				}
			}
		});	
	},
	deleteMsg: function(planId){
		// 예약문자 삭제
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01105");
		tr.body.sScheduleID = planId;
		tr.body.reserGubn = $("#selReserve").val();
		tr.body.reserTime = ($("#calFrom").val() + $("#dteFromTime").val()).replace(/-/g, "").replace(/:/g, "");
		tr.body.Contents = ""; // contents에 뭐 들어가나 확인
		tr.body.STAFFID = "";
		tr.body.RegUserID = "";
		tr.body.GUBN = "DEL";
		tr.body.MSG_ID = page.msgId;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result || json.body.LIST01.length == 0){
					bizMOB.Ui.alert("예약문자 처리에 실패하였습니다.");
					return;
				}
				if(json.body.LIST01[0].result == "T"){
					// 유효성 검사 성공 로직
					bizMOB.Ui.toast("예약문자 전송이 완료되었습니다.");
					bizMOB.Ui.closeDialog({
						callback: "page.refresh"
					});
				}else{
					// 유효성 검사 실패시 return
					bizMOB.Ui.alert(json.body.LIST01[0].result);
					return;
				}
			}
		});	
	}
	
};