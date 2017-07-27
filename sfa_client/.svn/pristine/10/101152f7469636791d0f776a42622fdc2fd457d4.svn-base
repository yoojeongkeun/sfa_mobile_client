window.cm022001  =
{
	custCode:"",
	init:function($target, callback)
	{
		if ($target.children().length == 0)
		{
			$.get("../../service/html/CM022_001.html", function(data){
				// 페이지 채워주기
				$target.append(data);
				
				var nowDate  = new Date();
		        $("#calfromDate").val(nowDate.bMAddMonth(-2).bMToFormatDate("yyyy-mm-dd"));  // 수금일자
		        $("#calToDate").val((new Date()).bMToFormatDate("yyyy-mm-dd"));  // 수금일자
		     	$(".chdlist").hide();
		     	
		        $("#btnRefresh").click(function(){
		        	cm022001.getCustMeetList(cm022001.custCode);
		        });
		        
		        $("#meetListNew").delegate(".mstlist", "click", function()
    			{	        	
		        	cm022001.setViewContent($(this));
   		 		}); 
		        cm022001.getMeetType(function() {
		        	// 완료후 펑션
		        	if(callback) callback();
		        });
			});
		}
	},
	setViewContent:function($view)
	{
		var loadYN = $view.parent().attr("loadyn");  
			//$(".sList01").attr("loadyn")
		if(loadYN != "Y")
		{
			$view.parent().attr("loadyn","Y");		
			$view.parent().find(".chdlist").show();
		}
		else
		{
			$view.parent().attr("loadyn","N");		
			$view.parent().find(".chdlist").hide();
		}
		// 자신의 노드만 펼치기
		$(".mstlist").removeClass("bg02");
		$view.parent().find(".mstlist").addClass("bg02");
		
	},
	
	getMeetType:function(callback)
	{
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00701");		
		 
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				     
				}
				else {
					     $("#comMeetgubn").empty().data('option');  // 아이템 제거 
					  
					
					     for(var i=0; i<json.body.LIST.length; i++)
						 {
    		    	        $("#comMeetgubn").append("<option value='"+json.body.LIST[i].R01+"'> "+json.body.LIST[i].R02+" </option>") ;
						 }
					     
					     if (callback) callback();
    		    		
					  }
			}
		});
	},
	getCustMeetList:function(custCode)
	{
		cm022001.custCode = custCode;
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00702");
		
		 tr.body.P01 = $("#comMeetgubn").val();   
		 tr.body.P02 = $("#calfromDate").val().replace("-", "").replace("-", "");
		 tr.body.P03 = $("#calToDate").val().replace("-", "").replace("-", "");
		 tr.body.P04 = cm022001.custCode;      
		 
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				     
				}
				else {
					
						if(json.header.result==false)
						{
							bizMOB.Ui.alert("경고", json.header.error_text);
							return;
						}
					    else{
					        cm022001.RederList(json);
					    }
					 }
			}
		});
	}, 	
	
	RederList:function(json)
	{
		  var dir = 
				[
				 	{
				 		type:"loop",
				 		target:".sList01",
				 		value:"LIST",
				 		detail:
			 			[
							{type:"single", target:".workType", value:"R02"},
							{type:"single", target:".workDate", value:"R03"},
							{type:"single", target:".meetTime", value:"R05"},
							{type:"single", target:".workStaff", value:"R06"},
							{type:"single", target:".workDept", value:"R07"},
							{type:"single", target:".workText", value:"R04"}
		 		        ]
				 	}
				];
				// 반복옵션(이전의 항목을 삭제하는 옵션)
				var options = { clone:true, newId:"meetListNew", replace:true };
				// 그리기
				$("#meetList").bMRender(json.body, dir, options);
		
	},
};