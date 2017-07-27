
page  =
{	
		CUSTCODE : "",
		DIVVER : "",
		OBJTK : "",
		DIVSENUM : "",
 	   	DEOCK : "",
		
	init : function(json)
	{	
		page.CUSTCODE = json.CUSTCODE;
		page.DIVVER = json.DIVVER;
		page.OBJTK = json.OBJTK;
		page.DIVSENUM = json.DIVSENUM;
		page.DEOCK = json.DEOCK;
		page.OBJTTYPE = json.OBJTTYPE;
		
		page.initInterface();
		page.initData();
		page.initLayout();	
	},
	
	initInterface:function()
	{
		page.getRsonList();
		
		$(".btn01").click(function()
		{
			bizMOB.Ui.closeDialog();
		});

		$(".btn03").click(function()
		{
			page.insertRsion();
		});
	},
	
	initData:function()
	{

	},
	initLayout:function()
	{
		
	},
	
	insertRsion : function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISBI001");
		tr.body.CUSTCODE = page.CUSTCODE;
		tr.body.DIVVER = page.DIVVER;
		tr.body.OBJTTYPE = page.OBJTTYPE;
		tr.body.OBJTK = page.OBJTK;
		tr.body.EDITBASE = $("#rsonList").val();
		tr.body.EDITDESC = $("#text").val();
		tr.body.DIVSENUM = page.DIVSENUM;
		tr.body.DEOCK = page.DEOCK;
		
		
		bizMOB.Web.post({
    		message:tr,
    		success:function(json){
    			if(json.header.result==false){
    				bizMOB.Ui.alert("경고", json.header.error_text);
					return;
    			}
				else {
					bizMOB.Ui.closeDialog({
	    				 callback : "page.CallIns"
	    			});
				}
			}
		});
	},
	
	getRsonList : function()
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "ISGS015");
		tr.body.PCODE = "CP010";
		
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
				if(json.body.LIST01.length == 0)
				{
					return;
				}
				var cnt = json.body.LIST01.length;
				var list = json.body.LIST01;
				for(var i = 0; i < cnt; i++)
				{
					$("#rsonList").append("<option value=\"" + list[i].CODE + "\">" + list[i].NAME +"</option>");
				}
			}
		});
	},
};