
page  =
{
	custCode : "",
	brandName: "",
	custName: "",
	init : function(json)
	{
		// 기본 설정값
		ipmutil.resetChk();
		ipmutil.appendCommonMenu();
		
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{
		// 조회 버튼 클릭
		$("#btnSearch").click(function(){
			bizMOB.Ui.openDialog("corporation/html/CustSearchPop.html", { 
				message : 
			   	{
					P01: $("#txtBrandName").val(), // 고객명
					P02: $("#txtCustName").val()  // 브랜드명
			   	},
			   	width:"90%",
				height:"65%"
			});
		});
		
		// 계약이력 콤보박스 체인지 이벤트
		$("#selContractHistory").change(function(){
			if(page.custCode == "") return;
			var json = { brandName: page.brandName, custName: page.custName, custCode: page.custCode, contractDate: $(this).val().replace(/-/g, "") };
			page.callbackGetDetailCustData(json, "CHANGE");
		});
		
		// 초기화 버튼 이벤트
		$("#btnReset").click(function(){
			var btnOK = bizMOB.Ui.createTextButton("네", function(){
				page.reset();
			});
			var btnCancel = bizMOB.Ui.createTextButton("아니오", function(){

			});
			bizMOB.Ui.confirm("알림", "화면을 초기화 하시겠습니까?", btnOK, btnCancel);			
		});
	},
	initData:function(json)
	{
		
	},
	initLayout:function()
	{
		var option = cescommutil.datePickerOption(function(date){		 				 
			}, "yy-mm-dd"		 			
		);
		$("#calFrom").datepicker(option);
		$("#calTo").datepicker(option);
		
		var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		$("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("법인계약고객 단가표");
 		/*layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));*/
 		
 		bizMOB.Ui.displayView(layout);
	},	
	callbackGetDetailCustData: function(returnJson, searchType){
		
		page.custCode = returnJson.custCode;
		page.custName = returnJson.custName;
		page.brandName = returnJson.brandName;
		
		$("#txtBrandName").val(returnJson.brandName);
		$("#txtCustName").val(returnJson.custName);
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01902");
		tr.body.P01 = returnJson.custCode;
		tr.body.P02 = returnJson.contractDate;
		tr.body.P03 = "";
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){
					bizMOB.Ui.alert("안내", "체인점 단가표 상세데이터를 불러오는데 실패했습니다.");
					return;
				}
				page.renderList(json);
				$("#txtContents").val(page.makeContents(json.body.LIST03));
				
				if(searchType == undefined)
					page.makeContractHistoryCombobox(json.body.LIST04);
			}
		});
	},
	renderList: function(json){
		var dir = 
        [
            {
                type:"loop",
                target:".trList",
                value:"LIST02",
                detail:
                [
                    {type:"single", target:".txtContractObject", value: "R12"},                    
                    {type:"single", target:".txtArea", value:"R08"},
                    {type:"single", target:".txtCharge", value:function(item){
                    	return item.item.R21.bMToCommaNumber();
                    }},
                    {type:"single", target:".txtR15", value:"R15"},
                    {type:"single", target:".txtServiceDate", value:"R10"},
                    {type:"single", target:".txtChainType", value:"R17"},
                    {type:"single", target:".txtSDRate", value:"R18"},
                    {type:"single", target:".txtSCTransYN", value:"R19"},
                    {type:"single", target:".txtContractDate", value:"R04"},
                    {type:"single", target:".txtResponser", value:"R06"}                    
                ]
            }
        ];
        var options = { clone:true, newId: "tbodyListNew", replace:true };
        $("#tbodyList").bMRender(json.body, dir, options);
	},
	makeContents: function(list){
		var str = "";
		$.each(list, function(i, listElement){
			if(listElement.R02.trim() != ""){
				str += listElement.R02 + "\n";
			}
		});
		return str;
	},
	makeContractHistoryCombobox: function(list){
		$("#selContractHistory").html("");
		var str = "";
		$.each(list, function(i, listElement){
			str += "<option value='" + listElement.R02 + "'>" + listElement.R03 + "</option> ";
		});
		$("#selContractHistory").html(str);
	},
	reset: function(){
		page.custCode = "";
		page.brandName = "";
		page.custName = "";
		
		$("#txtBrandName").val("");
		$("#txtCustName").val("");
		$("#txtContents").val("");
		$("#selContractHistory").html("");
		$("#tbodyListNew").html("");
	}
};