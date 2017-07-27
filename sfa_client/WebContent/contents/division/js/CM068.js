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
	pPagePath : "", //콜백
	pAddDivGubn : "0",  // 0 기준구획 , 1 신규구획
	
	
	init : function(json)
	{		
		page.pCustCode = json.pCustCode;
		page.pLaClsCode = json.pLaClasCode;							   
		page.pLaClsNm = json.pLaClsNm;
		page.pFlooCode = json.pFlooCode;
		page.pFlooNm = json.pFlooNm;
		page.pMiClsCode = json.pMiClsCode;
		page.pMiClsNm = json.pMiClsNm;
		page.pDeClsCode = json.pDeClsCode;
		page.pDeClsNm = json.pDeClsNm;
		page.pPagePath = json.pCallBack;
		
		page.initInterface();
		page.initData(json);
		page.initLayout();
		
	},
	initInterface:function()
	{
		page.setDivisionType();
		
		$("#btnAddDIvision").click(function(){
			 
			 $(".dlist02").show();
			 
			 pAddDivGubn = "0";
			 $("#laAddDIv").attr("class","on");
			 $("#laNewDiv").attr("class","");
		 });
		$("#btnNewDivision").click(function(){
			 
			 $(".dlist02").hide();
			 pAddDivGubn = "1";
			 $("#laAddDIv").attr("class","");
			 $("#laNewDiv").attr("class","on");
		 });
		
		$("#btnConfirm").click(function(){			
						
			page.setDivisionCode();
			
			bizMOB.Ui.openDialog("division/html/CM016.html", 
					{
			           message: {
			        	   			pCustCode 	: page.pCustCode 	,//고객코드
			        	   			pLaClsCode	: page.pLaClsCode	,//대분류코드
			        	   			pLaClsNm 	: page.pLaClsNm 	,  //대분류명
			        	   			pFlooCode	: page.pFlooCode	,  //층 코드
			        	   			pFlooNm		: page.pFlooNm		,   //층 명
			        	   			pMiClsCode	: page.pMiClsCode	,//중분류코드
			        	   			pMiClsNm	: page.pMiClsNm	,  //중분류명
			        	   			pDeClsCode	: page.pDeClsCode	, //세분류코드
			        	   			pDeClsNm	: page.pDeClsNm	,  //세분류명
			        	   			pPagePath   : page.pPagePath
			        	   		}, 
			        	   		width:"80%",
			    				height:"85%",
					});
			
		 });
		$("#btnCancel").click(function(){
			 
			bizMOB.Ui.closeDialog();
		 });
	},
	initData:function(json)
	{
		
	},
	initLayout:function()
	{
		
	},	
	
	setDivisionType: function()
	{		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM06801");
		 
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
				else if(json.body.List01.length == 0){
					bizMOB.Ui.alert("안내", "코드값이 존재하지 않습니다.");
					return;
				}
				if(json.header.result==true)
				{
					page.getDivisionType(json);
				}
			}
		});
	},
	
	getDivisionType:function(json)
	{		
	     $("#comDivisionType").empty().data('option');  // 아이템 제거 
	     $("#comDivisionType").append("<option value=''></option>") ;
	
	     for(var i=0; i<json.body.List01.length; i++)
		 {
	        $("#comDivisionType").append("<option value='"+json.body.List01[i].R01+"'> "+json.body.List01[i].R02+" </option>") ;
		 }
	},
	
	setDivisionCode:function()
	{
		var pValue = $("#comDivisionType").val();
		if(pValue == "1")
		{
			page.pCustCode = "";
			page.pLaClsCode = "";
			page.pLaClsNm = "";
			page.pFlooCode = "";
			page.pFlooNm = "";
			page.pMiClsCode = "";
			page.pMiClsNm = "";
			page.pDeClsCode = "";
			page.pDeClsNm = "";
		}
		else if(pValue == "DI01")
		{
			page.pFlooCode = "";
			page.pFlooNm = "";
			page.pMiClsCode = "";
			page.pMiClsNm = "";			
			page.pDeClsCode = "";
			page.pDeClsNm = "";
		}
		else if(pValue == "DI04")
		{						
			page.pMiClsCode = "";
			page.pMiClsNm = "";			
			page.pDeClsCode = "";
			page.pDeClsNm = "";
		}
		else if(pValue == "DI02")
		{					
			page.pDeClsCode = "";
			page.pDeClsNm = "";	
		}		
	},
	addCallBack:function(json) // 추가후 콜백
	{
		//콜백
		bizMOB.Ui.closeDialog(
					    		{
					        		modal : false,
					        		callback: page.pPagePath,
					        		message : 
									{
					        			result : json.result						    				
									}        			
						        });
		//bizMOB.Ui.closeDialog();
	}
};
