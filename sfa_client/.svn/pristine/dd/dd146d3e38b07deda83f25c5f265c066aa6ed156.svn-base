page  =
/**
 * @author INSEOK
 *
 */
{
	contractObjects: "",
    init : function(json)
    {    	
    	page.contractObjects = json.contractObjects;
        page.initInterface();
        page.initData(json);
        page.initLayout();
    },
    
    initInterface:function()
    {     
    	$("#tbodyList").delegate(".tdContractObject", "click", function(){
    		$(this).toggleClass("on");
    	});
    	
    	$("#btnSelectAll").click(function(){
    		$(".tdContractObject").addClass("on");
    	});
    	
    	$("#btnCancelAll").click(function(){
    		$(".tdContractObject").removeClass("on");
    	});
    	
    	$("#btnOK").click(function(){
    		var returnValue = "";
    		$(".on").each(function(i, listElement){
    			if(!($(listElement).attr("contractObjectCode") == undefined)){
    				returnValue += $(listElement).attr("contractObjectCode") + "|";
    			}
    		});
			bizMOB.Ui.closeDialog({
				modal : false,
        		callback:  "page.setContractObjects",
        		message : 
				{
        			returnValue: returnValue
				}
			});	
    	});
    },
    
    initData:function(json)
    {
    	page.setContractObject();
    },
    initLayout:function()
    {	
 		bizMOB.Ui.displayView();
    },
    
    setContractObject: function(){
    	var tr = bizMOB.Util.Resource.getTr("Cesco", "SD01206");
    	tr.body.P01 = "68";
    	bizMOB.Web.post({
    		message: tr,
    		success: function(json){
    			if(!json.header.result || json.body.LIST01.length == 0){
    				bizMOB.Ui.alert("안내", "계약대상 리스트를 가져오는데 실패하였습니다.");
    				return;
    			}
    			page.bindingObject(json.body.LIST01);
    		}
    	});
    },
    bindingObject: function(list){
    	var divHTML = "";
    	$.each(list, function(i, listElement){
    		if(i % 3 == 0){
    			divHTML += "<tr>";
    		}    		
    		divHTML += "<td contractObjectCode='" + listElement.R01 + "' class='tdContractObject'>" + listElement.R02 + "</td>";
    		
    		if(i % 3 == 3){
    			divHTML += "</tr>";
    		}
    	});
    	$("#tbodyList").append(divHTML);
    	if(page.contractObjects != ""){
    		var splitObject = page.contractObjects.split("|");
    		$.each(splitObject, function(i, listElement){
    			$("td[contractobjectcode='" + listElement + "']").addClass("on");
    		});
    	}
    }    
};

















