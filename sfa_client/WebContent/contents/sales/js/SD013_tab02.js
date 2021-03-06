tab02 = 
{	 
	popupJSON: "",
	json: "",
    init:function(json)
	{
    	tab02.initInterface();
    	tab02.initData(json);
    	tab02.initLayout();
	},
	initInterface:function()
	{
		// 하단 탭 show, hide 기능
		$(".t2_liTab").click(function(){
			$(".t2_liTab button").removeAttr("id");
			$(this).find("button").attr("id", "current");
			var tabIndex = $(this).attr("tabindex");
			if(tabIndex == "1" ){
				$("#t2_divTab1").show();
				$("#t2_divTab2").hide();
			}else if(tabIndex == "2"){
				$("#t2_divTab1").hide();
				$("#t2_divTab2").show();
			}
		});
		
		$(".t02_btnRegist").click(function(){
			bizMOB.Ui.openDialog("sales/html/SD013_tab02_pop.html", 
			{ 				
			   	width:"100%",
				height:"90%",
				message: {
					custType: $("#chkHomeCust").prop("checked") ? "0" : "1"
				}
			});
		});
		
		$(".t2_btnSave").click(function(){
			 bizMOB.Ui.alert("TAB2에서 저장버튼");
		 });
		
		$("#t02_btnSearch").click(function(){
			tab02.getCustInfo();			
		});
		
		// 추가버튼 클릭시
		$(".t02_btnAdd").click(function(){
			if($("#t02_txtCustRespUser").val().trim() == ""){
				bizMOB.Ui.toast("고객담당자명을 입력 후 추가해주세요.");
				return;
			}
			if($("#t02_txtCustRespDept").val().trim() == ""){
				bizMOB.Ui.toast("고객담당부서를 입력 후 추가해주세요.");
				return;
			}
			//휴대폰을 필수로 해야하는지 확인 필요
			/*if($("#t02_txtPhone").val().trim() == ""){
				bizMOB.Ui.toast("휴대폰을 입력 후 추가해주세요.");
				return;
			}*/
			
			var appendHtml = '<tr class="t02_trList" useyn="1" email="' + $("#t02_txtEMail").val() + '" tel="' + $("#t02_txtTel").val() + '" fax="' + $("#t02_txtFax").val() + '">' +
                    			'<td><span class="t02_spanNo">' + ($("#t02_tbodyPotentialCustomerListNew tr").length + 1) + '</span></td>' +
                    			'<td><input type="checkbox" class="t02_chkCheck"></td>'+
								'<td><span class="t02_spanCustomerName">' + $("#t02_txtCustRespUser").val() + '</span></td>'+
                    			'<td><span class="t02_spanCustomerDepartmentName">' + $("#t02_txtCustRespDept").val() + '</span></td>'+
                    			'<td><span class="t02_spanCustomerPhoneNumber">' + $("#t02_txtPhone").val() + '</span></td>'+
	                         '</tr>';
			$("#t02_tbodyPotentialCustomerListNew").append(appendHtml);
			tab02.resetCustRespInfo();
		});
		
		// 삭제버튼 클릭시
		$(".t02_btnDelete").click(function(){
			if($(".t02_chkCheck:visible:checked").length == 0){
				bizMOB.Ui.toast("체크된 삭제 대상이 존재하지 않습니다.");
				return;
			}
			$(".t02_chkCheck:visible:checked").parents("tr").remove();
			$(".t02_spanNo:visible").each(function(i, listElement){
				$(listElement).text(i + 1);
			});
		});
		
		// 고객 담당자 저장버튼 클릭시
		$(".t2_btnSave").click(function(){
			var saveList = $(".t02_trList:visible");
			if(saveList.length == 0){
				bizMOB.Ui.toast("고객담당자가 존재하지 않습니다.");
				return;
			}
		});
		
		// 가정집 고객 체크박스 선택시
		$("#chkHomeCust").click(function(){
			page.clear();
			//tab04.getDetailData();
		});
		
	},	 
	initData:function(json)
	{
		$("#t02_selRegBR").html("<option value='" + bizMOB.Storage.get("deptCode") + "'>" + bizMOB.Storage.get("deptName") + "</option>");
		$("#t02_selRegUserID").html("<option value='" + bizMOB.Storage.get("UserID") + "'>" + bizMOB.Storage.get("UserName") + "</option>");
		
	    $("#t02_typeLarge").change(function(){
		    page.setTypeMediumCombobox($("#t02_typeMedium"), $("#t02_typeLarge"));
		});
		page.setTypeLargeCombobox($("#t02_typeLarge"));
		
		$("#t02_selBR").change(function(){
			 page.getComboBoxList("#t02_selUserID", "C01", $(this).val());
		 });
		
		page.getComboBoxList("#t02_selBR", "B01", "", "", bizMOB.Storage.get("deptCode"));
		page.setContractExpactGradeCombobox("#t02_selContractExpactGrade");
	},	 
	initLayout:function()
	{	
		// 달력 input text 이름, 오른쪽 달력모양 버튼 이름
		page.setDateTime("#t02_calContractEndDay", "#t02_btnCal");	
	},
	getCustInfo: function(){
		var custCode = $("#t02_txtCustCode").val();
		var custName = $("#t02_txtCustName").val();
		
		if(custCode.trim() == "" && custName.trim() == ""){
			bizMOB.Ui.alert("안내", "고객코드나 고객명을 입력 후 조회해주세요.");
			return;
		}
		
		bizMOB.Ui.openDialog("sales/html/CustSearchPop.html", { 
			message : 
		   	{
				custCode: custCode,
				custName: custName,
				houseYN: $("#chkHomeCust").prop("checked") ? "Y" : "N"
		   	},
		   	width:"90%",
			height:"65%"
		});
	},
	setCustData: function(list){
		$("#t02_txtCustCode").val(list.R01);
		$("#t02_txtCustName").val(list.R02);
		$("#t02_txtFacilityName").val(list.R03);
		$("#t02_typeLarge").val(list.R06);
		page.setTypeMediumCombobox($("#t02_typeMedium"), $("#t02_typeLarge"), list.R07);
		$("#t02_selBR").val(list.R05);					
		page.getComboBoxList("#t02_selUserID", "C01", list.R05, list.R27);
		$("#t02_txtOldAddress").val(list.R11 + " " + list.R12);
		$("#t02_txtNewAddress").val(list.R09 + " " + list.R10);
		$("#t02_txtAddressNumber").val(list.R08);
		
		$("#t02_txtETC").val(list.R22);//특이사항
		$("#t02_txtYearArea").val(list.R23);
		$("#t02_txtPrice").val(list.R24.bMToNumber().toString().bMToCommaNumber());
		$("#t02_calContractEndDay").val(page.changeDateFormat(list.R25));
		tab02.getPotentialCustList(list.R01);
	},
	getPotentialCustList: function(custCode){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01305");
		tr.body.P01 = custCode; // 테스트
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "잠재고객 리스트를 불러오는데 실패하였습니다.");
					return;
				}
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.toast("담당자 정보가 존재하지 않습니다.");
					return;
				}
				tab02.renderPotentialCust(json); 
			}
		});
	},
	renderPotentialCust: function(json){
		var no = 0;
		var dir = 
        [
            {
                type:"loop",
                target:".t02_trList",
                value:"LIST01",
                detail:
                [
                    {type:"single", target:".t02_spanNo", value: function(){
                    	return ++no;
                    }},
                    {type:"single", target:".t02_chkUseYN", value:"R05"},
                    {type:"single", target:".t02_spanCustomerName", value:"R03"},
                    {type:"single", target:".t02_spanCustomerDepartmentName", value:"R02"},
                    {type:"single", target:".t02_spanCustomerPhoneNumber", value:"R09"},
                    {type:"single", target:"@useyn+", value:"R05"},
                    {type:"single", target:"@email+", value:"R06"},
                    {type:"single", target:"@tel+", value:"R07"},
                    {type:"single", target:"@fax+", value:"R08"}
                ]
            }
        ];
        var options = { clone:true, newId: "t02_tbodyPotentialCustomerListNew", replace:true };
        $("#t02_tbodyPotentialCustomerList").bMRender(json.body, dir, options);
	},
	resetAllData: function(){
		
	},
	resetCustRespInfo: function(){
		$("#t02_txtCustRespDept").val("");
		$("#t02_txtCustRespUser").val("");
		$("#t02_txtTel").val("");
		$("#t02_txtPhone").val("");
		$("#t02_txtFax").val("");
		$("#t02_txtEMail").val("");		
	},
	callbackSetCustList: function(message){
		var index = -1;
		for(var i=0; i<tab02.json.body.LIST01.length; i++){
			if(message.custCode == tab02.json.body.LIST01[i].R01){
				index = i;
				break;
			}
		}		
		if(index == -1){
			bizMOB.Ui.toast("일치하는 고객이 존재하지 않습니다.");
			return;
		}	
		tab02.setCustData(tab02.json.body.LIST01[i]);
	},
	callbackGetDetailCustData: function(returnJson){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01326");
		tr.body.P01 = $("#chkHomeCust").prop("checked") ? "Y" : "N";
		tr.body.P02 = returnJson.custCode;
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "고객 상세데이터를 불러오는데 실패했습니다.");
					return;
				}
				if(json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "해당 고객의 상세정보가 존재하지 않습니다.");
					return;
				}
				var list = json.body.LIST01[0];
				$("#t02_txtCustCode").val(list.R01);
				$("#t02_txtCustName").val(list.R02);
				$("#t02_txtFacilityName").val(list.R04);
				$("#t02_typeLarge").val(list.R05);
				page.setTypeMediumCombobox($("#t02_typeMedium"), $("#t02_typeLarge"), list.R06);
				$("#t02_selBR").val(returnJson.deptCode);					
				$("#t02_txtNewAddress").val(list.R08 + " " + list.R09);
				$("#t02_txtAddressNumber").val(list.R07);				
			}
		});		
	},
	setData: function(list, userId){
		if(list.R02.length == "10"){
			$("#chkHomeCust").prop("checked", true);
			$("#N00002").parents("li").hide();
			$(".N00002_1").parent().show();
		}
		$("#t02_txtCustCode").val(list.R02);
		$("#t02_txtCustName").val(list.R03);
		$("#t02_txtFacilityName").val(list.R04);
		$("#t02_typeLarge").val(list.R05);
		page.setTypeMediumCombobox($("#t02_typeMedium"), $("#t02_typeLarge"), list.R06);
		$("#t02_selBR").val(list.R14);					
		//page.getComboBoxList("#t02_selUserID", "C01", list.R14, userId);
		$("#t02_txtNewAddress").val(list.R08 + " " + list.R09);
		$("#t02_txtAddressNumber").val(list.R07);
	}
};


