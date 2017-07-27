page  =
/**
 * @author INSEOK
 *
 */
{
	CustCode:"",
	CustNm:"",
	pageType : "",
    init : function(json)
    {
    	page.CustCode = json.custCode;
    	page.pageType = json.pageType;
    	ipmutil.appendCommonMenu();
        // 기본 설정값
        page.initInterface();
        page.initData(json);
        page.initLayout();
    },
    
    initInterface:function()
    {     
    	custInfoMove.init($(".contentsWrap2"), page.CustCode, "cont", page.pageType);
    },
    
    initData:function(json)
    {
    	page.SearchCustInfo(page.CustCode);
    	page.SearchCheckList(page.CustCode);
    },
    initLayout:function()
    {
    	var IDName  =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		$("#subname").text(IDName);
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		var layout = ipmutil.getDefaultLayout("고객정보");
 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));
 		
 		bizMOB.Ui.displayView(layout);
    	//bizMOB.Ui.displayView(layout);
    },
    SearchCustInfo:function(CustCD)
    {
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00502");
    	tr.body.P01  = CustCD;
    	
    	bizMOB.Web.post({
    		message:tr,
    		success:function(json){
    			if(json.header.result == false){
    				bizMOB.Ui.alert("고객정보", "데이터가 존재하지 않습니다." );
    			}
    			else {
    				$("#R01").text(json.body.R01);
    				$("#R02").text(json.body.R02);
    				$("#R03").text(json.body.R03);
    				$("#R04").text(json.body.R04.bMToCommaNumber());
    				$("#R05").text(json.body.R05);
    				$("#R06").text(json.body.R06);
    				$("#R07").text(json.body.R07);
    			}
			}
		});
    },
    
    SearchCheckList:function(CustCD)
	{
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00501");
    	tr.body.P01  = CustCD;
		 		 
    	bizMOB.Web.post({
    		message:tr,
    		success:function(json){
    			if(json.header.result==false){
    				bizMOB.Ui.alert("계약내역", "데이터가 존재하지 않습니다." );
    			}
				else {
					//bizMOB.Ui.alert("반환값", JSON.stringify(json));
					page.SearchCheckListBinding(json);
				}
			}
		});
	},
	SearchCheckListBinding:function(json)
	 {
		var dir = 
			[
			 	{
			 		type:"loop",
			 		target:".clList",
			 		value:"CONTINFO",
			 		detail:
					[
					 	{type:"single", target:".clList-cl01", value:"R01"},
						{type:"single", target:".clList-cl02", value:"R02"},
						{type:"single", target:".clList-cl05", value:"R05"},
						//{type:"single", target:".clList-cl06", value:"R06"},
						//{type:"single", target:".clList-cl07", value:"R07"},
						{type:"single", target:".clList-cl06", value:function(arg){
							return (arg.item.R06.bMToNumber() + "").bMToCommaNumber();
						} },
						{type:"single", target:".clList-cl07", value:function(arg){
							return (arg.item.R07.bMToNumber() + "").bMToCommaNumber();
						} },
						{type:"single", target:".clList-cl01", value:"R01"},
						{type:"single", target:".clList-cl11", value:"R11"},
					    {type:"single", target:".clList-cl12", value:"R12"},
					    {type:"single", target:".clList-cl13", value:"R13"},
					    {type:"single", target:".clList-cl18", value:"R18"}	
			        ]
			 	}
			];
		 
			// 그리기
		var options = { clone:true, newId:".contlistnew", replace:true };
		$("#contlist").bMRender(json.body, dir,options);
		var listCnt = $(".clList .clList-cl07").length;
		var earlyMoney = 0;
		var regularMoney = 0;
		for(var i = 0; i < listCnt; i++ ){
			earlyMoney += $($(".clList .clList-cl06")[i]).text().bMToNumber();
			regularMoney += $($(".clList .clList-cl07")[i]).text().bMToNumber();			
		}
		$("#sumEarlyMoney").text((earlyMoney + "").bMToCommaNumber() + " 원");
		$("#sumRegularMoney").text((regularMoney + "").bMToCommaNumber() + " 원");
	 }
};