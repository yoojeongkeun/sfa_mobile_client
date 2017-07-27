tab04 = 
{	 
	userID: "",
	positionType: "",
	salePlanID: "",
    init:function(json)
	{
    	tab04.setPage();
    	tab04.userID = bizMOB.Storage.get("UserID");
    	tab04.initInterface();
    	tab04.initData(json);
    	tab04.initLayout();
	},
	initInterface:function()
	{
		$("#diagTbNew").delegate("input", "click", function(){
			/*$(this).select();
			$(this).parents(".contTarg").find(".chkBox").attr("checked", true);
			$(".contMas").removeClass("on02");
			$(this).parents(".contTarg").find(".contMas").addClass("on02");*/
		});
		
		$("#diagTbNew").delegate("textarea", "click", function(){
			$(this).parents(".contTarg").find(".chkBox").attr("checked", true);
			$(".contMas").removeClass("on02");
			$(this).parents(".contTarg").find(".contMas").addClass("on02");
		});
		
		$("#N2G04New").delegate("input", "click", function(){
			$(this).select();
		});
		
		$("#diagTbNew").delegate("input", "keyup", function(){
			if($(this).parent().hasClass("tarNum"))
			{
				$(this).val($(this).val().bMToCommaNumber());
			}
		});
		
		$(".acc_head").click(function(){
			$(this).parent().toggleClass("on");
		});
		
		$(".btn_result").click(function(){
			$(this).toggleClass("btn_on");
			
			if($(this).attr('id') == "diagOn" && $(this).hasClass("btn_on"))
			{
				$("#N00007").show();
			}
			else if($(this).attr('id') == "diagOn" && !($(this).hasClass("btn_on"))) 
			{
				$("#N00007").hide();
			}
			$(".bx-viewport").css("height", ($("#tab04").height() + 56) + "px");
				
		});
		
		$(".t04_btnRegist, .t03_btnRegist").click(function(){
			if(!tab04.checkContents()){
				return;
			}
			if(page.mode =="I"){				
				tab04.checkDate("I");
			}else if(page.mode == "M"){
				var btnOK = bizMOB.Ui.createTextButton("네", function(){		
					var strUserID = bizMOB.Storage.get("UserID");
					if (strUserID != $("#t02_selRegUserID").val() && !(strUserID == "09112" || strUserID == "11027" || strUserID == "12157" || strUserID == "10860"))
			        {
			            bizMOB.Ui.alert("안내", "작성자 본인만 수정이 가능합니다.");
			            return;
			        }
					
					if (strUserID == "09112" || strUserID == "06389" || strUserID == "11027" || strUserID == "10860")
			        {
			            if ("2010-10-01" > $("#t03_calDay").val())      // 임시로 영업일지 수정 가능하도록..                
			            {                
			                bizMOB.Ui.alert("안내", "수정할 수 없습니다. 재등록 하여 주십시오.");
			                return;
			            }
			        }else{
			        	tab04.checkDate("M");
			        }					
				});
				var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){
					return;
				});
				bizMOB.Ui.confirm("알림", "영업일지를 수정하시겠습니까?", btnOK, btnCancel);	
			}
		});
		
		// 계약대상 선택
		$("#diagTbNew").delegate(".contMas", "click", function(){
			if($(this).find(".chkBox").is(":checked"))
			{
				// 문진내역확인
				tab04.CodeSearch($(this).parent().find(".target").attr("code"));
				
				$(".contMas").removeClass("on02");
				$(this).addClass("on02");
				$(this).parent().find(".contDtl").show();	
			}
			else
			{
				$(this).removeClass("on02");
				$(this).parent().find(".contDtl").hide();
				/*if($(this).hasClass("on02"))
				{
					$(this).removeClass("on02");
					$(this).parent().find(".contDtl").hide();
				}
				else
				{
					$(".contMas").removeClass("on02");
					$(this).addClass("on02");
					$(this).parent().find(".contDtl").show();
				}*/
			}
			
			$(".bx-viewport").css("height", ($("#tab04").height() + 56) + "px");
		});
		
				
	},	
	
    
	CodeSearch: function(txtCode){
		
		//$("#t02_txtCustCode").val().trim()
		if($("#t02_txtCustCode").val().trim().length <= 5){
			bizMOB.Ui.toast("고객코드를 확인해주세요.");
			return;
		}
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01338");
		tr.body.P01 = $("#t02_txtCustCode").val().trim(); // 고객코드
//		tr.body.P01 = "AJ2555"; // 고객코드
		tr.body.P02 = txtCode; // 계약대상
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				else
				{
					list = json.body;
					var listCode1 = list.LIST01;
					
					switch(listCode1[0].R01){
//					switch("00002"){
					case "00001":						
						return true;
					case "00002":
						bizMOB.Ui.openDialog("sales/html/SD014_POP002.html", {
						       width : "90%",
							   height : "35%",
							   message : {
								   CustCode : $("#t02_txtCustCode").val().trim(),
								   UserId : bizMOB.Storage.get("UserID"),
								   strText : listCode1[0].R04 + " 설치장비 진단을 진행 하시겠습니까?",
								   strSurveyCode : listCode1[0].R02, // 문진코드
								   strCustName : $("#t02_txtCustName").val().trim(),
								   strDiagType : listCode1[0].R03, // 진단구분
								   strCode : "00002",
								   strAssetCD : listCode1[0].R08, // 장비일련번호
								   strSetupDate : listCode1[0].R07, // 설치일자
								   strSetupSEQN : listCode1[0].R09, // 설치순번
								   strdtStartDate : listCode1[0].R10, // 시작시간
								   strType : "" // 타입
							   }
							});
						break;
					case "00003":
//						bizMOB.Ui.confirm("알림", "문진을 진행하지 않은 등록된 설치장비 기록이 존재합니다.\r\n문진을 진행 하시겠습니까?", btnOK, btnCancel);
						bizMOB.Ui.openDialog("sales/html/SD014_POP002.html", {
						       width : "90%",
							   height : "35%",
							   message : {
								   CustCode : $("#t02_txtCustCode").val().trim(),
								   UserId : bizMOB.Storage.get("UserID"),
								   strText : "문진을 진행하지 않은 등록된 설치장비 기록이 존재합니다.\r\n문진을 진행 하시겠습니까?",
								   strSurveyCode : listCode1[0].R02, // 문진코드
								   strCustName : $("#t02_txtCustName").val().trim(),
								   strDiagType : listCode1[0].R03, // 진단구분
								   strCode : "00003",
								   strAssetCD : listCode1[0].R08, // 장비일련번호
								   strSetupDate : listCode1[0].R07, // 설치일자
								   strSetupSEQN : listCode1[0].R09, // 설치순번
								   strdtStartDate : listCode1[0].R10, // 시작시간
								   strType : "" // 타입
							   }
							});
						break;
					case "00004":
//						bizMOB.Ui.confirm("알림", "결과를 확인하지 않은 진단 내역이 존재 합니다.\r\n확인하시겠습니까?", btnOK, btnCancel);
						bizMOB.Ui.openDialog("sales/html/SD014_POP002.html", {
						       width : "90%",
							   height : "35%",
							   message : {
								   CustCode : $("#t02_txtCustCode").val().trim(),
								   UserId : bizMOB.Storage.get("UserID"),
								   strText : "결과를 확인하지 않은 진단 내역이 존재 합니다.\r\n확인하시겠습니까?",
								   strSurveyCode : listCode1[0].R02, // 문진코드
								   strCustName : $("#t02_txtCustName").val().trim(),
								   strDiagType : listCode1[0].R03, // 진단구분
								   strCode : "00004",
								   strAssetCD : listCode1[0].R08, // 장비일련번호
								   strSetupDate : listCode1[0].R07, // 설치일자
								   strSetupSEQN : listCode1[0].R09, // 설치순번
								   strdtStartDate : listCode1[0].R10, // 시작시간
								   strType : "a" // 타입
							   }
							});
						break;
					case "00005":
//						bizMOB.Ui.confirm("알림", "이미 진단한 결과보고서가 있습니다.\r\n확인하시려면 Yes를 재진단하시려면 No를 클릭해 주시기 바랍니다.", btnOK, btnCancel);
						bizMOB.Ui.openDialog("sales/html/SD014_POP002.html", {
						       width : "90%",
							   height : "35%",
							   message : {
								   CustCode : $("#t02_txtCustCode").val().trim(),
								   UserId : bizMOB.Storage.get("UserID"),
								   strText : "이미 진단한 결과보고서가 있습니다.\r\n확인하시려면 Yes를 재진단하시려면 No를 클릭해 주시기 바랍니다.",
								   strSurveyCode : listCode1[0].R02, // 문진코드
								   strCustName : $("#t02_txtCustName").val().trim(),
								   strDiagType : listCode1[0].R03, // 진단구분
								   strCode : "00005",
								   strAssetCD : listCode1[0].R08, // 장비일련번호
								   strSetupDate : listCode1[0].R07, // 설치일자
								   strSetupSEQN : listCode1[0].R09, // 설치순번
								   strdtStartDate : listCode1[0].R10, // 시작시간
								   strType : "r" // 타입
							   }
							});
						break;
					default:
						break;
					}
				}
			}
		});
    },
    
	initData:function(json)
	{
		if(bizMOB.Storage.get("dutyCode") == "B35" || bizMOB.Storage.get("dutyCode") == "B36"){
			tab04.positionType = "C";
		}else{
			tab04.positionType = "S";
		}
		tab04.getDetailData();
	},	 
	initLayout:function()
	{	
		
	},
	checkContents: function(){
		if($("#t02_txtCustCode").val().trim() == "" && $("input[name=rdConType]:checked").attr("code") == "C10000"){
			ale("외근 고객일 경우 고객을 먼저 선택해야 합니다.");
			return false;
		}
		if($("#textCont").val().trim() == ""){
			ale("상담내용을 입력해주세요.");
			return false;
		}
		if($("#t03_selWorkType").val() == ""){
			ale("업무구분을 선택해주세요.");
			return false;
		}
		if($("#t03_selDeType").val() == ""){
			ale("세부구분을 선택해주세요.");
			return false;
		}
		if($("#t03_selActReason").val() == "" && $("#t03_selDeType").val() != "D50000" && $(".reportType").val() != "003"){ 
			ale("활동사유를 선택해주세요.");
			return false;
		}
		if(!page.checkUser("5", $("#t03_selActReason").val()) && $("#t03_selFutPlan").val() == "" && $("#t03_selDeType").val() != "D50000" && $(".reportType").val() != "003"){			
			ale("상담결과를 선택해주세요.");
			return false;			
		}
		if($("#t03_timeHour").val() < 0 || $("#t03_timeHour").val() + $("t03_timeMin").val() == "00"){
			ale("활동 시간을 정확하게 입력해주세요.");
			return false;
		}
		if($("input[name=rdConType]:checked").attr("code") == "C10000" && $("#t03_colorcutor").val().trim() == ""){
			ale("대담자를 입력해주세요.");
			return false;
		}
		if($("input[name=rdConType]:checked").attr("code") == "C20000" 
			&& !($("#t02_txtCustCode").val().trim() == "" ||$("#t02_txtCustCode").val().trim() == "Indoor" ) 
			&& $("#t03_colorcutor").val().trim() == ""){
			ale("대담자를 입력해주세요.");
			return false;
		}
		
		
		if($("#t03_btnTrans").hasClass("btn_on")){ // 영업 이관에 체크가 되어있을 경우 추가 체크로직
			if($("#VISITDATE").val().trim() == ""){
				ale("영업이관 - 방문예정일자를 입력해주세요.");
				$(".t03_tab06").trigger("click");
				return false;
			}
			if($("#INTERVIEWER").val().trim() == ""){
				ale("영업이관 - 대담자를 입력해주세요.");
				$(".t03_tab06").trigger("click");
				return false;
			}
			var tel = $("#PHONE1").val().trim() + $("#PHONE2").val().trim() + $("#PHONE3").val().trim();
			var phone = $("#HP1").val().trim() + $("#HP2").val().trim() + $("#HP3").val().trim();
			if(tel == "" && phone == ""){
				ale("영업이관 - 전화번호, 휴대폰번호 중 하나는 필수로 입력해주세요.");
				$(".t03_tab06").trigger("click");
				return false;
			}
			if(tel != "" && !($("#PHONE1").val().length >= 2 && $("#PHONE2").val().length >= 3 && $("#PHONE3").val().length >= 4)){
				ale("영업이관 - 전화번호 형식이 올바르지 않습니다.");
				$(".t03_tab06").trigger("click");
				return false;
			}
			if(phone != "" && !($("#HP1").val().length >= 3 && $("#HP2").val().length >= 3 && $("#HP3").val().length >= 4)){
				ale("영업이관 - 휴대폰번호 형식이 올바르지 않습니다.");
				$(".t03_tab06").trigger("click");
				return false;
			}
			
			var isChecked = false;
			$("input[name='Chk']").not(".t03_chkEqual").each(function(i, le){
				if($(le).prop("checked"))
					isChecked = true;				
			});
			if(!isChecked){
				ale("영업이관 - 상품 서비스를 하나 이상 체크해주세요.");
				$(".t03_tab06").trigger("click");
				return false;
			}
		}
		return true;
	},	
	checkDate: function(checkType){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01311");
		tr.body.P01 = (new Date).bMToFormatDate("yyyy-mm-dd"); // 오늘
		if(checkType == "I"){
			tr.body.P02 = "3";	
		}else if(checkType == "M" || checkType == "D"){
			tr.body.P01 = $("#t03_calDay").val();
			tr.body.P02 = "-3";
		}
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result || json.body.LIST01.length == 0){
					bizMOB.Ui.alert("안내", "날짜 유효성 체크에 실패하였습니다.");
					return;
				}
				
				if(checkType == "I"){
					if(json.body.LIST01[0].R01 == "N" && !tab04.checkID()){
						bizMOB.Ui.alert("안내", "영업일 기준 3일을 초과한 영업일지는 작성하실 수 없습니다.");
						return;
					}else{
						if(!($("#t02_txtCustCode").val().trim() == "" || $("#t02_txtCustCode").val().trim() == "Indoor") 
								&& !$("#chkHomeCust").prop("checked")){ //고객코드가 비어있지 않거나 Indoor가 아니거나 가정집이 아닐 때 영업담당자 등록
							tab04.resgistSalesResp();
						}else{
							tab04.save(); // 아니면 바로 저장
						}
					}
				}else if(checkType == "M"){
					if(json.body.LIST01[0].R01 == "N"){
						bizMOB.Ui.alert("안내", "수정할 수 없습니다. 재등록 하여 주십시오.");
						return;
					}else{						
						tab04.save();
					}
				}else if(checkType == "D"){
					if(json.body.LIST01[0].R01 == "N"){
						bizMOB.Ui.alert("안내", "삭제할 수 없습니다.");
						return;
					}else{						
						page.deleteReport();
					}
				}
			}
		});
	},
	checkID: function(){
		var id = tab04.userID;
		var result = false;
		var checkIDs = ["09112", "06389", "11027", "12157", "10860"]; //예외 아이디
		for(var i=0; i<checkIDs.length; i++){
			if(checkIDs[i] == id){
				result = true;
				break;
			}
		}
		return result;		
	},
	
	getDetailData: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01308");
		tr.body.P01 = ""; // 사번
		tr.body.P02 = $("#chkHomeCust").prop("checked") ? "Y" : "N"; // 가정집YN 구현해야 함!
		tr.body.P03 = page.type;
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "세부업무내역 리스트를 가져오는데 실패하였습니다.");
					return;
				}
				if(page.type == "1")
					tab04.setDetailData(json, "LIST01");
				else
				{
					tab04.setDetailData2(json, "LIST01");
					tab04.getDetailData2();
				}
			}
		});
	},
	
	setPage: function(){
		if(page.type == "1")
		{
    		$("#newPage").hide();
    		$("#oldPage").show();
		}
    	else
		{
    		$("#newPage").show();
    		$("#oldPage").hide();
		}
		
		if(page.type == "1")
		{
			if($("#chkHomeCust").prop("checked")){
				$("#N00002").parents("li").hide();
				$(".N00002_1").parent().show();
			}else{
				$("#N00002").parents("li").show();
				$(".N00002_1").parent().hide();
			}
		}
	},
	
	setDetailData: function(json, listName){
		
		if(json.body[listName].length == 0){
			return;
		}
		var list = tab04.divideList(json.body[listName]);
		
		for(var i=0; i<list.length; i++){
			if(list[i].length != 0 && list[i][0].R07 == "N00002" && !$("#chkHomeCust").prop("checked")){
				json.body[listName] = list[i];
				var rList = tab04.divideDetailList(json, listName, listName);
				for(var j=0; j<rList.length; j++){
					if(rList[j].length != 0 && rList[j][0].R12 == "000007"){ // 대수, 총액
						json.body[listName] = rList[j];
						tab04.renderList(json, ".trList2", "N2G07", listName);
					}else if(rList[j].length != 0 && rList[j][0].R12 == "000008"){ // 총액만
						json.body[listName] = rList[j];
						tab04.renderList(json, ".trList3", "N2G08", listName);
					}else if(rList[j].length != 0 && rList[j][0].R12 == "000004"){ // 총액 aasdfasds,
						json.body[listName] = rList[j];
						tab04.renderList(json, ".trList1", "N2G04", listName);
					}
				}
			}else if(list[i].length != 0 && list[i][0].R07 == "N00002" && $("#chkHomeCust").prop("checked")){
				tab04.setResultDatas(list[i], ".N00002_1");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00001"){ // 사전홍보
				tab04.setResultDatas(list[i], ".N00001");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00003"){ // 제안/견적서제출
				tab04.setResultDatas(list[i], ".N00003");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00004"){ // 계약
				tab04.setResultDatas(list[i], ".N00004");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00005"){ // 제안여부확정
				tab04.setResultDatas(list[i], ".N00005");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00006"){ // 사전계약
				
			}
		}
	},
	setDetailData2: function(json, listName){
		if(json.body[listName].length == 0){
			return;
		}
		var list = tab04.divideList(json.body[listName]);
		
		for(var i=0; i<list.length; i++){
			if(list[i].length != 0 && list[i][0].R07 == "N00002"){
				tab04.setResultDatas(list[i], ".N00007");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00001"){ // 사전홍보
				tab04.setResultDatas(list[i], ".N00001");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00003"){ // 제안/견적서제출
				tab04.setResultDatas(list[i], ".N00003");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00004"){ // 계약
				tab04.setResultDatas(list[i], ".N00004");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00005"){ // 제안여부확정
				tab04.setResultDatas(list[i], ".N00005");
			}else if(list[i].length != 0 && list[i][0].R07 == "N00006"){ // 사전계약
				
			}
		}
	},
	divideList: function(listName){
		var list = listName;
		var str = listName[0].R07;
		var tempList = [];
		var resultList = [];
		$(list).each(function(i, listElement){			
			if(str == listElement.R07){
				tempList.push(listElement);
			}else{
				resultList.push(tempList);
				tempList = [];
				tempList.push(listElement);
				str = listElement.R07;
			}
		});
		resultList.push(tempList);
		return resultList;
	},
	divideDetailList: function(json, listName){
		var list = json.body[listName].bMSort({"keys":[{"orderby":"asc","field":"R12"}]});
		var str = json.body[listName][0].R12;
		var tempList = [];
		var resultList = [];
		$(list).each(function(i, listElement){			
			if(str == listElement.R12){
				tempList.push(listElement);
			}else{
				resultList.push(tempList);
				tempList = [];
				tempList.push(listElement);
				str = listElement.R12;
			}
		});
		resultList.push(tempList);
		return resultList;
	},
	
	getDetailData2: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01329");
		tr.body.P01 = ""; // 사번
		tr.body.P02 = $("#chkHomeCust").prop("checked") ? "Y" : "N"; // 가정집YN 구현해야 함!
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "세부업무내역 리스트를 가져오는데 실패하였습니다.");
					return;
				}
				tab04.renderList2(json, ".contTarg", "diagTb", "LIST01", json.body.LIST02);
			}
		});
	},
	
	renderList2: function(json, target, id, listName, list02){	
		var dir = 
        [
            {
                type:"loop",
                target: target,
                value:listName,
                detail: [
                         	{type:"single", target:".target", value:"R02"},
                         	{type:"single", target:".target@code", value:"R03"},
                         	{type:"single", target:".chkBox@checked", value:function(json){
                     			return json.item.R01 == "Y" ? true : false;
                     		}},
                     		{type:"single", target:".textCont", value:"R04"},
                        ]
            }
        ];
        var options = { clone:true, newId: id + "New", replace:true };
        $("#" + id).bMRender(json.body, dir, options);
        
        $(".bx-viewport").css("height", ($("#tab04").height() + 56) + "px");
        
        
        var divideList = $(".contTarg");//json.body.LIST02;
		
		$.each(divideList, function(i, colElement){
			for(var i=0; i<list02.length; i++)
			{
				if($(colElement).find(".target").attr("code") == list02[i].R01)
				{
					var text =    '<tr>';
					text +=   '<td class="tac" code=' + list02[i].R01 + ' targDtl=' + list02[i].R03 + '>' + list02[i].R02 + '</td>';
					text +=   '<td class="tarNum"><input type="tel" value=' + parseInt(list02[i].R04).toString().bMToCommaNumber() + ' style="text-align: right"></td>';
					text +=   '<td class="Pl10"><input type="text" value=' + list02[i].R05 + '></td>';
					text +=   '</tr>';
					
					$(colElement).find(".contDet").append(text);
				}
			}
		});
		
		if($("#diagOn").hasClass("btn_on") && page.type == "2")
		{
			$("#N00007").show();
		}
	},
	
	renderList: function(json, target, id, listName){	
		var dir = 
        [
            {
                type:"loop",
                target: target,
                value:listName,
                detail: [
                         	{type:"single", target:"@r01+", value:"R01"},
                         	{type:"single", target:"@r02+", value:"R02"},
                         	{type:"single", target:"@r03+", value:"R03"},
                         	{type:"single", target:"@r04+", value:"R04"},
                         	{type:"single", target:"@r05+", value:"R05"},
                         	{type:"single", target:"@r06+", value:"R06"},
                         	{type:"single", target:"@r07+", value:"R07"},
                         	{type:"single", target:"@r08+", value:"R08"},
                         	{type:"single", target:"@r09+", value:"R09"},
                         	{type:"single", target:"@r10+", value:"R10"},
                         	{type:"single", target:"@r11+", value:"R11"},
                         	{type:"single", target:"@r12+", value:"R12"},
                         	{type:"single", target:"@r13+", value:"R13"},
                         	{type:"single", target:"@r14+", value:"R14"},
                         	{type:"single", target:"@r15+", value:"R15"},
                         	{type:"single", target:"@r16+", value:"R16"},
                         	{type:"single", target:"@r17+", value:"R17"},
                         	{type:"single", target:"@r18+", value:"R18"},
                         	{type:"single", target:"@r19+", value:"R19"},
                         	{type:"single", target:"@r20+", value:"R20"},
                     		{type:"single", target:".spanContObj", value:"R04"},
                     		{type:"single", target:".t04_txtVal1@value", value:function(json){
                     			return json.item.R13 == "" ? "0" : json.item.R13;
                     		}},
                     		{type:"single", target:".t04_txtVal2@value", value:function(json){
                     			return json.item.R16 == "" ? "0" : json.item.R16;
                     		}},
                     		{type:"single", target:".t04_txtVal3@value", value:function(json){
                     			return json.item.R19 == "" ? "0" : json.item.R19;
                     		}},
                     		
                        ]
            }
        ];
        var options = { clone:true, newId: id + "New", replace:true };
        $("#" + id).bMRender(json.body, dir, options);
	},
	// row에 값 세팅
	setResultDatas: function(list, className){
		if(list.length == 0){
			return;
		}
		for(var i=0; i<Object.keys(list[0]).length + 1; i++){
			$(className).attr("R" + (i.toString().length == 1 ? "0" + i : i), list[0]["R" + (i.toString().length == 1 ? "0" + i : i)]);
			if(list[0].R13 == "True"){
				$(className).parent().find(".btnOK").addClass("btn_on");
			}else{
				$(className).parent().find(".btnOK").removeClass("btn_on");
			}
			if(list[0].R16 == "True"){
				$(className).parent().find(".btnOK2").addClass("btn_on");
			}else{
				$(className).parent().find(".btnOK2").removeClass("btn_on");
			}
		}
	},
	resgistSalesResp: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01323");
		
		tr.body.P01 = $("#t02_txtCustCode").val().trim();
		tr.body.P02 = "";
		
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "영업 담당자 배정에 실패하였습니다.");
					return;
				}
				if(json.body.R01 == "0000"){
					tab04.save();
				}else{
					bizMOB.Ui.alert("안내", "영업 담당자 배정에 실패하였습니다.");
					return;
				}
			}
		});
	},
	save: function(){
		if(page.type == "1")
		{
			if(page.mode == "I")
				tab04.regist();
			if(page.mode == "M"){
				tab04.modify();
			}
		}
		else
		{
			if(page.mode == "I")
				tab04.regist2();
			if(page.mode == "M"){
				tab04.modify2();
			}
		}
	},
	regist: function(){
		var custCode = $("#t02_txtCustCode").val();
		if(custCode.trim() == ""){
			custCode = "Indoor";
		}
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01315");
		tr.body.P01 = "";
		tr.body.P02 = custCode;
		tr.body.P03 = $(".t03_Accomp").length - 1 == 0 ? "False" : "True";
		tr.body.P04 = $(".t03_Accomp").length - 1 == 0 ? $($(".t03_Accomp")[0]).find(".t03_compUser").text() : "";
		tr.body.P05 = $("#t03_calDay").val() + " " + $("#t03_fromTime").val();
		tr.body.P06 = $("#t03_calDay").val() + " " + $("#t03_toTime").val();
		tr.body.P07 = $("#t03_colorcutor").val();
		tr.body.P08 = $("#t03_Area2").val();
		tr.body.P09 = $("#t03_Area").val();
		tr.body.P10 = $("input[name=rdConType]:checked").attr("code");
		tr.body.P11 = $("#t03_selWorkType").val();
		tr.body.P12 = $("#t03_selDeType").val();
		tr.body.P13 = $("#t03_selActReason").val() != "" ? $("#t03_selActReason").val() : "A00000";
		tr.body.P14 = $("#t03_selCounResult").val() != "" ? $("#t03_selCounResult").val() : "R00000";
		tr.body.P15 = $("#t03_selFutPlan").val() != "" ? $("#t03_selFutPlan").val() : "P00000";
		tr.body.P16 = $("#textCont").val();
		tr.body.P17 = ""; //세션 userid
		tr.body.P18 = $("#t02_selRegUserID").val();
		tr.body.P19 = tab04.positionType; //박힌거 다시 보기 
		tr.body.P20 = tab04.salePlanID; // strSalePlanID 현재 "" 값을 세팅해주고 있음
		tr.body.P21 = $("#t03_btnTrans").hasClass("btn_on") ? "Y" : "N"; // 영업이관 체크시
		tr.body.P22 = ""; // 이관일자   Adapter에서 처리
		tr.body.P23 = ""; // 이관SEQN  Adapter에서 처리		
		
		// 더미!
		tr.body.P24 = $(".reportType").val();
		
		
		
		var tel = $("#PHONE1").val() + "-" + $("#PHONE2").val() + "-" + $("#PHONE3").val();
		var phone = $("#HP1").val() + "-" + $("#HP2").val() + "-" + $("#HP3").val();
		
		tr.body.P26 = custCode; // 고객코드
		tr.body.P27 = (new Date).bMToFormatDate("yyyymmdd"); // 접수일자 -> 오늘 
		tr.body.P28 = ""; // 세션 userid
		tr.body.P29 = $("#VISITDATE").val().replace(/-/g, "");
		tr.body.P30 = $("#INTERVIEWER").val();
		tr.body.P31 = tel != "--" ? tel : "";
		tr.body.P32 = phone != "--" ? phone : "";
		tr.body.P33 = $("#BASIC").prop("checked") ? "Y" : "N";
		tr.body.P34 = $("#FIC").prop("checked") ? "Y" : "N";
		tr.body.P35 = $("#VBC").prop("checked") ? "Y" : "N";
		tr.body.P36 = $("#BEDBUG").prop("checked") ? "Y" : "N";
		tr.body.P37 = $("#MOTH").prop("checked") ? "Y" : "N";
		tr.body.P38 = $("#t03_Area").val();
		tr.body.P39 = $("#t03_calDay").val().replace(/-/g, ""); //
		
		tr.body.P40 = $("#t03_btnFree").hasClass("btn_on") ? "Y" : "N"; //무료진단 YN
		
		if($(".reportType").val() == "003"){ //FSD 수행일지일 경우
			tr.body.P25 = $("#t03_selFSClassify").val(); // FS분류
			tr.body.P41 = $("#t03_calTestSendDay").val() + " " + $("#t03_txtTime").val(); // FS시료발송일시
			tr.body.P42 = $("#t03_calNextPlan").val().replace(/-/g, ""); // 다음일정
			tr.body.P43 = $("#t03_txtPerformOrder").val(); // 수행차수
		}else{
			tr.body.P25 = "";
			tr.body.P41 = "";
			tr.body.P42 = "";
			tr.body.P43 = "";
		}
		tr.body.P26 = $("#t03_txtHQRequest").val(); //본사요청사항
		
		var submitDocsList = [];
		$(".t03_chkSubmitDoc:checked").each(function(i, le){			
			submitDocsList.push({
				P01: $("#t02_txtCustCode").val(),
				P02: "", //저장시는 adapter에서 seqn 처리, 수정시에는 page.salesSeqn
				P03: $(le).parents("tr").attr("code"),
				P04: "",
				P05: "",
				P06: ""
			});
		});		
		
		var accompList = [];
		$("#t03_AccompListNew .t03_Accomp").each(function(i, listElement){
			accompList.push({
				P01: "",
				P02: "",
				P03: "",
				P04: $(listElement).find(".t03_compUser").attr("val"),
				P05: ""
			});
		});
		
		if(custCode != "Indoor"){	
			var detailList = [];
			$(".N00001, .N00005, .N00003, .N00004").each(function(i, listElement){
				var le = $(listElement);
				detailList.push({
					P01: "", //custcode
					P02: "", //seqn
					P03: le.attr("r07"),
					P04: le.attr("r08"),
					P05: le.attr("r09"),
					P06: le.attr("r10"),
					P07: le.parent().find(".btnOK").hasClass("btn_on") ? "True" : "False",
				    P08: le.parent().find(".btnOK2").length != 0 ? (le.parent().find(".btnOK2").hasClass("btn_on") ? "True" : "False") : "",
				    P09: "",
				    P10: le.attr("r20"),
				    P11: "" //usid
				});
			});
			
			if(!$("#chkHomeCust").prop("checked")){ // 가정집이 아닐 경우
				$("#N00002").find(".trList1").each(function(i, le){
					if($("#N00002").find(".trList1").length != i + 1){ //마지막 행은 dummy data이므로 제외
						var $le = $(le);
						detailList.push({
							P01: "", //custcode
							P02: "", //seqn
							P03: $le.attr("r07"),
							P04: $le.attr("r08"),
							P05: $le.attr("r09"),
							P06: $le.attr("r10"),
							P07: $le.find(".t04_txtVal1").val(),
						    P08: $le.find(".t04_txtVal2").val(),
						    P09: $le.find(".t04_txtVal3").val(),
						    P10: $le.attr("r20"),
						    P11: "" //usid
						});
					}					
				});			
				
				$("#N00002").find(".trList2").each(function(i, le){
					if($("#N00002").find(".trList2").length != i + 1){ //마지막 행은 dummy data이므로 제외
						var $le = $(le);
						detailList.push({
							P01: "", //custcode
							P02: "", //seqn
							P03: $le.attr("r07"),
							P04: $le.attr("r08"),
							P05: $le.attr("r09"),
							P06: $le.attr("r10"),
							P07: $le.find(".t04_txtVal1").val(),
						    P08: $le.find(".t04_txtVal2").val(),
						    P09: "",
						    P10: $le.attr("r20"),
						    P11: "" //usid
						});
					}					
				});
				
				$("#N00002").find(".trList3").each(function(i, le){
					if($("#N00002").find(".trList3").length != i + 1){ //마지막 행은 dummy data이므로 제외
						var $le = $(le);
						detailList.push({
							P01: "", //custcode
							P02: "", //seqn
							P03: $le.attr("r07"),
							P04: $le.attr("r08"),
							P05: $le.attr("r09"),
							P06: $le.attr("r10"),
							P07: $le.find(".t04_txtVal1").val(),
						    P08: "",
						    P09: "",
						    P10: $le.attr("r20"),
						    P11: "" //usid
						});
					}					
				});
			}else{
				$(".N00002_1").each(function(i, listElement){
					var le = $(listElement);
					detailList.push({
						P01: "", //custcode
						P02: "", //seqn
						P03: le.attr("r07"),
						P04: le.attr("r08"),
						P05: le.attr("r09"),
						P06: le.attr("r10"),
						P07: le.parent().find(".btnOK").hasClass("btn_on") ? "True" : "False",
					    P08: "",
					    P09: "",
					    P10: le.attr("r20"),
					    P11: "" //usid
					});
				});
			}
			
			tr.body.LIST01 = detailList;
			tr.body.LIST02 = accompList;
			tr.body.LIST03 = submitDocsList;
		}
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", json.header.error_text);
					return;
				}
				bizMOB.Ui.toast("영업일지가 등록되었습니다.");
				
				//등록 후 수정모드로 변경
				page.salesSeq = json.body.R01;
				page.mode = "M";
				$("#t02_txtCustCode").attr("disabled", "");
				$("#t02_txtCustName").attr("disabled", "");
				$(".t03_btnRegist, .t04_btnRegist").text("일지수정");
			}
		});
	},
	
	regist2: function(){
		var custCode = $("#t02_txtCustCode").val();
		if(custCode.trim() == ""){
			custCode = "Indoor";
		}
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01330");
		tr.body.P01 = "";
		tr.body.P02 = custCode;
		tr.body.P03 = $(".t03_Accomp").length - 1 == 0 ? "False" : "True";
		tr.body.P04 = $(".t03_Accomp").length - 1 == 0 ? $($(".t03_Accomp")[0]).find(".t03_compUser").text() : "";
		tr.body.P05 = $("#t03_calDay").val() + " " + $("#t03_fromTime").val();
		tr.body.P06 = $("#t03_calDay").val() + " " + $("#t03_toTime").val();
		tr.body.P07 = $("#t03_colorcutor").val();
		tr.body.P08 = $("#t03_Area2").val();
		tr.body.P09 = $("#t03_Area").val();
		tr.body.P10 = $("input[name=rdConType]:checked").attr("code");
		tr.body.P11 = $("#t03_selWorkType").val();
		tr.body.P12 = $("#t03_selDeType").val();
		tr.body.P13 = $("#t03_selActReason").val() != "" ? $("#t03_selActReason").val() : "A00000";
		tr.body.P14 = $("#t03_selCounResult").val() != "" ? $("#t03_selCounResult").val() : "R00000";
		tr.body.P15 = $("#t03_selFutPlan").val() != "" ? $("#t03_selFutPlan").val() : "P00000";
		tr.body.P16 = $("#textCont").val();
		tr.body.P17 = ""; //세션 userid
		tr.body.P18 = $("#t02_selRegUserID").val();
		tr.body.P19 = tab04.positionType; //박힌거 다시 보기 
		tr.body.P20 = tab04.salePlanID; // strSalePlanID 현재 "" 값을 세팅해주고 있음
		tr.body.P21 = $("#t03_btnTrans").hasClass("btn_on") ? "Y" : "N"; // 영업이관 체크시
		tr.body.P22 = ""; // 이관일자   Adapter에서 처리
		tr.body.P23 = ""; // 이관SEQN  Adapter에서 처리		
		
		// 더미!
		tr.body.P24 = $(".reportType").val();
		
		
		
		var tel = $("#PHONE1").val() + "-" + $("#PHONE2").val() + "-" + $("#PHONE3").val();
		var phone = $("#HP1").val() + "-" + $("#HP2").val() + "-" + $("#HP3").val();
		
		tr.body.P26 = custCode; // 고객코드
		tr.body.P27 = (new Date).bMToFormatDate("yyyymmdd"); // 접수일자 -> 오늘 
		tr.body.P28 = ""; // 세션 userid
		tr.body.P29 = $("#VISITDATE").val().replace(/-/g, "");
		tr.body.P30 = $("#INTERVIEWER").val();
		tr.body.P31 = tel != "--" ? tel : "";
		tr.body.P32 = phone != "--" ? phone : "";
		tr.body.P33 = $("#BASIC").prop("checked") ? "Y" : "N";
		tr.body.P34 = $("#FIC").prop("checked") ? "Y" : "N";
		tr.body.P35 = $("#VBC").prop("checked") ? "Y" : "N";
		tr.body.P36 = $("#BEDBUG").prop("checked") ? "Y" : "N";
		tr.body.P37 = $("#MOTH").prop("checked") ? "Y" : "N";
		tr.body.P38 = $("#t03_Area").val();
		tr.body.P39 = $("#t03_calDay").val().replace(/-/g, ""); //
		
		tr.body.P40 = $("#t03_btnFree").hasClass("btn_on") ? "Y" : "N"; //무료진단 YN
		
		if($(".reportType").val() == "003"){ //FSD 수행일지일 경우
			tr.body.P25 = $("#t03_selFSClassify").val(); // FS분류
			tr.body.P41 = $("#t03_calTestSendDay").val() + " " + $("#t03_txtTime").val(); // FS시료발송일시
			tr.body.P42 = $("#t03_calNextPlan").val().replace(/-/g, ""); // 다음일정
			tr.body.P43 = $("#t03_txtPerformOrder").val(); // 수행차수
		}else{
			tr.body.P25 = "";
			tr.body.P41 = "";
			tr.body.P42 = "";
			tr.body.P43 = "";
		}
		tr.body.P26 = $("#t03_txtHQRequest").val(); //본사요청사항
		
		var submitDocsList = [];
		$(".t03_chkSubmitDoc:checked").each(function(i, le){			
			submitDocsList.push({
				P01: $("#t02_txtCustCode").val(),
				P02: "", //저장시는 adapter에서 seqn 처리, 수정시에는 page.salesSeqn
				P03: $(le).parents("tr").attr("code"),
				P04: "",
				P05: "",
				P06: ""
			});
		});		
		
		var accompList = [];
		$("#t03_AccompListNew .t03_Accomp").each(function(i, listElement){
			accompList.push({
				P01: "",
				P02: "",
				P03: "",
				P04: $(listElement).find(".t03_compUser").attr("val"),
				P05: ""
			});
		});
		
		if(custCode != "Indoor"){	
			var detailList = [];
			var detailListM = [];
			var detailListD = [];
			
			$(".N00001, .N00005, .N00003, .N00004, .N00007").each(function(i, listElement){
				var le = $(listElement);
				detailList.push({
					P01: "", //custcode
					P02: "", //seqn
					P03: le.attr("r07"),
					P04: le.attr("r08"),
					P05: le.attr("r09"),
					P06: le.attr("r10"),
					P07: le.parent().find(".btnOK").hasClass("btn_on") ? "True" : "False",
				    P08: le.parent().find(".btnOK2").length != 0 ? (le.parent().find(".btnOK2").hasClass("btn_on") ? "True" : "False") : "",
				    P09: "",
				    P10: le.attr("r20"),
				    P11: "" //usid
				});
			});
			
			if($("#diagOn").hasClass("btn_on"))
			{
				var divideList = $("#diagTbNew").find(".contMas");
				$.each(divideList, function(i, colElement){
					if($(colElement).find(".chkBox").is(":checked"))
					{
						detailListM.push({
							P01: "", //custcode
							P02: "", //seqn
							P03: $(colElement).find(".target").attr("code"),
							P04: $(colElement).parent().find(".textCont").val(),
							P05: "" //usid
						});
						
						var detailList = $(colElement).parent().find(".contDet tr");
						
						$.each(detailList, function(i, detailElement){
							detailListD.push({
								P01: "", //custcode
								P02: "", //seqn
								P03: $(detailElement).find(".tac").attr("code"),
								P04: $(detailElement).find(".tac").attr("targdtl"),
								P05: $(detailElement).find(".tarNum input").val().bMToNumber().toString(),
								P06: $(detailElement).find(".Pl10 input").val(),
								P07: "" //usid
							});
						});
					}
				});
			}
			
			tr.body.LIST01 = detailList;
			tr.body.LIST02 = accompList;
			tr.body.LIST03 = submitDocsList;
			tr.body.LIST04 = detailListD;
			tr.body.LIST05 = detailListM;
		}
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", json.header.error_text);
					return;
				}
				bizMOB.Ui.toast("영업일지가 등록되었습니다.");
				
				//등록 후 수정모드로 변경
				page.salesSeq = json.body.R01;
				page.mode = "M";
				$("#t02_txtCustCode").attr("disabled", "");
				$("#t02_txtCustName").attr("disabled", "");
				$(".t03_btnRegist, .t04_btnRegist").text("일지수정");
			}
		});
	},
	
	modify: function(){
		if(page.salesSeq == ""){
			ale("수정 할 수 없습니다.");
			return;
		}
		var custCode = $("#t02_txtCustCode").val();
		if(custCode.trim() == ""){
			custCode = "Indoor";
		}		
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01324");
		tr.body.P01 = custCode;		
		tr.body.P02 = $("#t03_calDay").val() + " " + $("#t03_fromTime").val();
		tr.body.P03 = $("#t03_calDay").val() + " " + $("#t03_toTime").val();
		tr.body.P04 = $("#t03_colorcutor").val();
		tr.body.P05 = $("#t03_Area2").val();
		tr.body.P06 = $("#t03_Area").val();
		tr.body.P07 = $("input[name=rdConType]:checked").attr("code");
		tr.body.P08 = $("#t03_selWorkType").val();
		tr.body.P09 = $("#t03_selDeType").val();
		tr.body.P10 = $("#t03_selActReason").val() != "" ? $("#t03_selActReason").val() : "A00000";
		tr.body.P11 = $("#t03_selCounResult").val() != "" ? $("#t03_selCounResult").val() : "R00000";
		tr.body.P12 = $("#t03_selFutPlan").val() != "" ? $("#t03_selFutPlan").val() : "P00000";
		tr.body.P13 = $("#textCont").val();
		tr.body.P14 = ""; //세션 userid
		tr.body.P15 = $("#t02_selRegUserID").val();
		tr.body.P16 = "0"; 
		tr.body.P17 = page.salesSeq; // strSalePlanID 현재 "" 값을 세팅해주고 있음
		tr.body.P18 = $("#t03_btnTrans").hasClass("btn_on") ? "Y" : "N"; // 영업이관 체크시 // 이관 관련 다시 보기!!!!!
		tr.body.P19 = ""; // 이관일자   // 이관 관련 다시 보기!!!!!
		tr.body.P20 = "0"; // 이관SEQN  // 이관 관련 다시 보기!!!!!	
		
		// 영업이관 관련 파라미터
		var tel = $("#PHONE1").val() + "-" + $("#PHONE2").val() + "-" + $("#PHONE3").val();
		var phone = $("#HP1").val() + "-" + $("#HP2").val() + "-" + $("#HP3").val();		
		
		tr.body.P26 = page.salesSeq;
		tr.body.P27 = (new Date).bMToFormatDate("yyyymmdd"); // 접수일자 -> 오늘 
		tr.body.P28 = ""; // 세션 userid
		tr.body.P29 = $("#t03_Area").val();
		tr.body.P30 = $("#VISITDATE").val().replace(/-/g, "");
		tr.body.P31 = $("#INTERVIEWER").val();
		tr.body.P32 = tel != "--" ? tel : "";
		tr.body.P33 = phone != "--" ? phone : "";
		tr.body.P34 = $("#BASIC").prop("checked") ? "Y" : "N";
		tr.body.P35 = $("#FIC").prop("checked") ? "Y" : "N";
		tr.body.P36 = $("#VBC").prop("checked") ? "Y" : "N";
		tr.body.P37 = $("#BEDBUG").prop("checked") ? "Y" : "N";
		tr.body.P38 = $("#MOTH").prop("checked") ? "Y" : "N";		
		tr.body.P39 = $("#t03_calDay").val().replace(/-/g, ""); //
		
		tr.body.P40 = $("#t03_btnFree").hasClass("btn_on") ? "Y" : "N"; // 무료진단 YN
		
		if($(".reportType").val() == "003"){ //FSD 수행일지일 경우
			tr.body.P21 = $("#t03_selFSClassify").val(); // FS분류
			tr.body.P22 = $("#t03_calTestSendDay").val() + " " + $("#t03_txtTime").val(); // FS시료발송일시
			tr.body.P23 = $("#t03_calNextPlan").val().replace(/-/g, ""); // 다음일정
			tr.body.P24 = $("#t03_txtPerformOrder").val(); // 수행차수
		}else{
			tr.body.P21 = "";
			tr.body.P22 = "";
			tr.body.P23 = "";
			tr.body.P24 = "";
		}
		tr.body.P25 = $("#t03_txtHQRequest").val(); //본사요청사항
		
		var accompList = [];
		$("#t03_AccompListNew .t03_Accomp").each(function(i, listElement){
			accompList.push({
				P01: "",
				P02: "",
				P03: "",
				P04: $(listElement).find(".t03_compUser").attr("val"),
				P05: ""
			});
		});
		
		var submitDocsList = [];
		$(".t03_chkSubmitDoc:checked").each(function(i, le){			
			submitDocsList.push({
				P01: $("#t02_txtCustCode").val(),
				P02: page.salesSeq,
				P03: $(le).parents("tr").attr("code"),
				P04: "",
				P05: "",
				P06: ""
			});
		});		
		
		if(custCode != "Indoor"){	
			var detailList = [];
			$(".N00001, .N00005, .N00003, .N00004").each(function(i, listElement){
				var le = $(listElement);
				detailList.push({
					P01: "", //custcode
					P02: "", //seqn
					P03: le.attr("r07"),
					P04: le.attr("r10"),
					P05: le.parent().find(".btnOK").hasClass("btn_on") ? "True" : "False",
				    P06: le.parent().find(".btnOK2").length != 0 ? (le.parent().find(".btnOK2").hasClass("btn_on") ? "True" : "False") : "",
				    P07: "",
				    P08: "" //usid
				});
			});
			
			if(!$("#chkHomeCust").prop("checked")){ // 가정집이 아닐 경우
				$("#N00002").find(".trList1").each(function(i, le){
					if($("#N00002").find(".trList1").length != i + 1){ //마지막 행은 dummy data이므로 제외
						var $le = $(le);
						detailList.push({
							P01: "", //custcode
							P02: "", //seqn
							P03: $le.attr("r07"),
							P04: $le.attr("r10"),
							P05: $le.find(".t04_txtVal1").val(),
						    P06: $le.find(".t04_txtVal2").val(),
						    P07: $le.find(".t04_txtVal3").val(),						    
						    P08: "" //usid
						});
					}					
				});			
				
				$("#N00002").find(".trList2").each(function(i, le){
					if($("#N00002").find(".trList2").length != i + 1){ //마지막 행은 dummy data이므로 제외
						var $le = $(le);
						detailList.push({
							P01: "", //custcode
							P02: "", //seqn
							P03: $le.attr("r07"),
							P04: $le.attr("r10"),
							P05: $le.find(".t04_txtVal1").val(),
						    P06: $le.find(".t04_txtVal2").val(),
						    P07: "",
						    P08: "" //usid
						});
					}					
				});
				
				$("#N00002").find(".trList3").each(function(i, le){
					if($("#N00002").find(".trList3").length != i + 1){ //마지막 행은 dummy data이므로 제외
						var $le = $(le);
						detailList.push({
							P01: "", //custcode
							P02: "", //seqn
							P03: $le.attr("r07"),
							P04: $le.attr("r10"),
							P05: $le.find(".t04_txtVal1").val(),
						    P06: "",
						    P07: "",						    
						    P08: "" //usid
						});
					}					
				});
			}else{
				$(".N00002_1").each(function(i, listElement){
					var le = $(listElement);
					detailList.push({
						P01: "", //custcode
						P02: "", //seqn
						P03: le.attr("r07"),
						P04: le.attr("r10"),
						P05: le.parent().find(".btnOK").hasClass("btn_on") ? "True" : "False",
					    P06: "",
					    P07: "",
					    P08: "" //usid
					});
				});
			}
			
			tr.body.LIST01 = detailList;
			tr.body.LIST02 = accompList;
			tr.body.LIST03 = submitDocsList;
		}
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", json.header.error_text);
					return;
				}
				bizMOB.Ui.toast("영업일지가 수정되었습니다.");
				page.mode = "M";
			}
		});
	},
	
	modify2: function(){
		if(page.salesSeq == ""){
			ale("수정 할 수 없습니다.");
			return;
		}
		var custCode = $("#t02_txtCustCode").val();
		if(custCode.trim() == ""){
			custCode = "Indoor";
		}		
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01331");
		tr.body.P01 = custCode;		
		tr.body.P02 = $("#t03_calDay").val() + " " + $("#t03_fromTime").val();
		tr.body.P03 = $("#t03_calDay").val() + " " + $("#t03_toTime").val();
		tr.body.P04 = $("#t03_colorcutor").val();
		tr.body.P05 = $("#t03_Area2").val();
		tr.body.P06 = $("#t03_Area").val();
		tr.body.P07 = $("input[name=rdConType]:checked").attr("code");
		tr.body.P08 = $("#t03_selWorkType").val();
		tr.body.P09 = $("#t03_selDeType").val();
		tr.body.P10 = $("#t03_selActReason").val() != "" ? $("#t03_selActReason").val() : "A00000";
		tr.body.P11 = $("#t03_selCounResult").val() != "" ? $("#t03_selCounResult").val() : "R00000";
		tr.body.P12 = $("#t03_selFutPlan").val() != "" ? $("#t03_selFutPlan").val() : "P00000";
		tr.body.P13 = $("#textCont").val();
		tr.body.P14 = ""; //세션 userid
		tr.body.P15 = $("#t02_selRegUserID").val();
		tr.body.P16 = "0"; 
		tr.body.P17 = page.salesSeq; // strSalePlanID 현재 "" 값을 세팅해주고 있음
		tr.body.P18 = $("#t03_btnTrans").hasClass("btn_on") ? "Y" : "N"; // 영업이관 체크시 // 이관 관련 다시 보기!!!!!
		tr.body.P19 = ""; // 이관일자   // 이관 관련 다시 보기!!!!!
		tr.body.P20 = "0"; // 이관SEQN  // 이관 관련 다시 보기!!!!!	
		
		// 영업이관 관련 파라미터
		var tel = $("#PHONE1").val() + "-" + $("#PHONE2").val() + "-" + $("#PHONE3").val();
		var phone = $("#HP1").val() + "-" + $("#HP2").val() + "-" + $("#HP3").val();		
		
		tr.body.P26 = page.salesSeq;
		tr.body.P27 = (new Date).bMToFormatDate("yyyymmdd"); // 접수일자 -> 오늘 
		tr.body.P28 = ""; // 세션 userid
		tr.body.P29 = $("#t03_Area").val();
		tr.body.P30 = $("#VISITDATE").val().replace(/-/g, "");
		tr.body.P31 = $("#INTERVIEWER").val();
		tr.body.P32 = tel != "--" ? tel : "";
		tr.body.P33 = phone != "--" ? phone : "";
		tr.body.P34 = $("#BASIC").prop("checked") ? "Y" : "N";
		tr.body.P35 = $("#FIC").prop("checked") ? "Y" : "N";
		tr.body.P36 = $("#VBC").prop("checked") ? "Y" : "N";
		tr.body.P37 = $("#BEDBUG").prop("checked") ? "Y" : "N";
		tr.body.P38 = $("#MOTH").prop("checked") ? "Y" : "N";		
		tr.body.P39 = $("#t03_calDay").val().replace(/-/g, ""); //
		
		tr.body.P40 = $("#t03_btnFree").hasClass("btn_on") ? "Y" : "N"; // 무료진단 YN
		
		if($(".reportType").val() == "003"){ //FSD 수행일지일 경우
			tr.body.P21 = $("#t03_selFSClassify").val(); // FS분류
			tr.body.P22 = $("#t03_calTestSendDay").val() + " " + $("#t03_txtTime").val(); // FS시료발송일시
			tr.body.P23 = $("#t03_calNextPlan").val().replace(/-/g, ""); // 다음일정
			tr.body.P24 = $("#t03_txtPerformOrder").val(); // 수행차수
		}else{
			tr.body.P21 = "";
			tr.body.P22 = "";
			tr.body.P23 = "";
			tr.body.P24 = "";
		}
		tr.body.P25 = $("#t03_txtHQRequest").val(); //본사요청사항
		
		var accompList = [];
		$("#t03_AccompListNew .t03_Accomp").each(function(i, listElement){
			accompList.push({
				P01: "",
				P02: "",
				P03: "",
				P04: $(listElement).find(".t03_compUser").attr("val"),
				P05: ""
			});
		});
		
		var submitDocsList = [];
		$(".t03_chkSubmitDoc:checked").each(function(i, le){			
			submitDocsList.push({
				P01: $("#t02_txtCustCode").val(),
				P02: page.salesSeq,
				P03: $(le).parents("tr").attr("code"),
				P04: "",
				P05: "",
				P06: ""
			});
		});
		
		if(custCode != "Indoor"){	
			var detailList = [];
			var detailListM = [];
			var detailListD = [];
			
			$(".N00001, .N00005, .N00003, .N00004, .N00007").each(function(i, listElement){
				var le = $(listElement);
				detailList.push({
					P01: "", //custcode
					P02: "", //seqn
					P03: le.attr("r07"),
					P04: le.attr("r10"),
					P05: le.parent().find(".btnOK").hasClass("btn_on") ? "True" : "False",
				    P06: le.parent().find(".btnOK2").length != 0 ? (le.parent().find(".btnOK2").hasClass("btn_on") ? "True" : "False") : "",
				    P07: "",
				    P08: "" //usid
				});
			});
			
			if($("#diagOn").hasClass("btn_on"))
			{
				var divideList = $("#diagTbNew").find(".contMas");
				$.each(divideList, function(i, colElement){
					if($(colElement).find(".chkBox").is(":checked"))
					{
						detailListM.push({
							P01: "", //custcode
							P02: "", //seqn
							P03: $(colElement).find(".target").attr("code"),
							P04: $(colElement).parent().find(".textCont").val(),
							P05: "" //usid
						});
						
						var detailList = $(colElement).parent().find(".contDet tr");
						
						$.each(detailList, function(i, detailElement){
							detailListD.push({
								P01: "", //custcode
								P02: "", //seqn
								P03: $(detailElement).find(".tac").attr("code"),
								P04: $(detailElement).find(".tac").attr("targdtl"),
								P05: $(detailElement).find(".tarNum input").val().bMToNumber().toString(),
								P06: $(detailElement).find(".Pl10 input").val(),
								P07: "" //usid
							});
						});
					}
				});
			}
			
			tr.body.LIST01 = detailList;
			tr.body.LIST02 = accompList;
			tr.body.LIST03 = submitDocsList;
			tr.body.LIST04 = detailListD;
			tr.body.LIST05 = detailListM;
		}
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", json.header.error_text);
					return;
				}
				bizMOB.Ui.toast("영업일지가 수정되었습니다.");
				page.mode = "M";
			}
		});
	}
};

