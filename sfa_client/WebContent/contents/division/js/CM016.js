page  =
{	
    pCustcode : "", //고객코드
	pLaClsCode : "",//대분류코드
	pLaClsNm : "",  //대분류명
	pFlooCode : "", //층 코드
	pFlooNm : "",   //층 명
	pMiClsCode : "",//중분류코드
	pMiClsNm : "",  //중분류명
	pDeClsCode : "", //세분류코드
	pDeClsNm : "",  //세분류명
	pPagePath : "",
	
	init : function(json)
	{		
		ipmutil.resetChk();
		$("input").toSel();
		page.pCustCode = json.pCustCode;
		page.pLaClsCode = json.pLaClsCode;
		page.pLaClsNm = json.pLaClsNm;
		page.pFlooCode = json.pFlooCode;
		page.pFlooNm = json.pFlooNm;
		page.pMiClsCode = json.pMiClsCode;
		page.pMiClsNm = json.pMiClsNm;
		page.pDeClsCode = json.pDeClsCode;
		page.pDeClsNm = json.pDeClsNm;
		page.pPagePath = json.pPagePath;
		
		page.initInterface();
		page.initData(json);
		page.initLayout();
		
	},
	initInterface:function()
	{
		page.setDivIndex();
		page.setDivisionType();
		page.setDataBiding();
		
		$("#btnSearch").click(function(){
			page.setDivisionType();
		});
		
		$("#txtSearch").keyup(function(e){
			if(e.keyCode == "13"){
				page.setDivisionType();
				$("#txtSearch").hideKeypad();
			}
		});
		
		$("#chkInspDiv").click(function(){			 
			if($("#chkInspDiv").is(':checked') == true)
				$("#chkInspDiv").attr('checked',true);
   	        else
   	        	$("#chkInspDiv").attr('checked',false);
		 });		
		
		$("#btnClose").click(function(){			 
			//bizMOB.Ui.closeDialog();
			onClickAndroidBackButton();
		 });		
		
		$("#btnNewDiv").click(function(){			 
			page.setClearTxt();
		 });		
		
		$("#btnAddDiv").click(function(){		
			var button1 = bizMOB.Ui.createTextButton("확인", function()
            {
				//저장
				var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01502");
				var pResult = "N";
				tr.body.P01 = page.pCustCode;
				tr.body.P02 = $("#txtdivIndex").text();			
				tr.body.P03 = $("#txtLaCls").attr("code");
				tr.body.P04 = $("#txtLaCls").attr("value");
				tr.body.P05 = $("#txtFloo").attr("code");
				tr.body.P06 = $("#txtFloo").attr("value");
				tr.body.P07 = $("#txtMiCls").attr("code");
				tr.body.P08 = $("#txtMiCls").attr("value");
				tr.body.P09 = $("#txtDeCls").attr("code");
				tr.body.P10 = $("#txtDeCls").attr("value");
				tr.body.P11 = $("#txtPosiDesp").attr("value");
				tr.body.P12 = $("#comDivisionType").val();
				if($("#chkInspDiv").is(':checked'))
					tr.body.P13 = "Y";
				else 
					tr.body.P13 = "N";
				
				bizMOB.Web.post(
				{
					message:tr,
					success:function(json)
					{				
						if(json.header.result==false)
						{
							bizMOB.Ui.alert("경고", json.header.error_text);
							return;
						}				
						ipmutil.resetChk();
						if(json.header.result==true)
							page.pResult = "Y";
						else
							page.pResult = "N";
						//콜백
						bizMOB.Ui.closeDialog(
									    		{
									        		modal : false,
									        		callback: page.pPagePath,
									        		message : 
													{
									        			result : page.pResult						    				
													}
										        });
					}
				});				           
				            
            });
            bizMOB.Ui.confirm("알림", "등록 하시겠습니까?", button1);  
		 });
	},
	initData:function(json)
	{
		
	},
	initLayout:function()
	{
		bizMOB.Ui.displayView();
	},
	setDivisionType: function()
	{		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01601");
		tr.body.P01 = page.pCustCode;
		tr.body.P02 = $("#txtSearch").val();
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{				
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
				if(json.body.DivList.length == 0){
					bizMOB.Ui.alert("안내", "코드값이 존재하지 않습니다.");
					return;
				}
				page.getDivisionType(json);
			}
		});
	},
	
	getDivisionType:function(json)
	{		
	     $("#comDivisionType").empty().data('option');  // 아이템 제거 	  
	
	     for(var i=0; i<json.body.DivList.length; i++)
		 {
	        $("#comDivisionType").append("<option value='"+json.body.DivList[i].R01+"'> "+json.body.DivList[i].R02+" </option>") ;
		 }
	},
	
	setDivIndex: function()
	{		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01602");
		tr.body.P01 = page.pCustCode;
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{				
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}				
				page.getDivIndex(json);
			}
		});
	},
	
	getDivIndex:function(json)
	{		
	     $("#txtdivIndex").empty().data('option');  // 아이템 제거 	  
		     
         $("#txtdivIndex").append(json.body.R01) ;
	
	},
	
	setDataBiding:function()
	{
		$("#txtLaCls").attr("code",page.pLaClsCode);
		$("#txtLaCls").attr("value",page.pLaClsNm); 

		$("#txtFloo").attr("code",page.pFlooCode);
		$("#txtFloo").attr("value",page.pFlooNm); 
		
		$("#txtMiCls").attr("code",page.pMiClsCode);
		$("#txtMiCls").attr("value",page.pMiClsNm); 
		
		$("#txtDeCls").attr("code",page.pDeClsCode);
		$("#txtDeCls").attr("value",page.pDeClsNm); 
		 
	},
	
	setClearTxt:function()
	{
		$("#txtLaCls").attr("code","");
		$("#txtLaCls").attr("value",""); 

		$("#txtFloo").attr("code","");
		$("#txtFloo").attr("value",""); 
		
		$("#txtMiCls").attr("code","");
		$("#txtMiCls").attr("value",""); 
		
		$("#txtDeCls").attr("code","");
		$("#txtDeCls").attr("value",""); 		
		$("#txtPosiDesp").attr("value","");
	}
	
};
