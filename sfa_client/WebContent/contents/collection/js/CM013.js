page  =
{
	CustCode : "",
	custNAme : "",
	Custin :"",
	UserID :"",
	deptCode :"",
	deptName :"",
	Pagepath:"page.SetCustNm",
	HistoryGubun : "",
	init : function(json)
	{   
		
		ipmutil.resetChk();
		ipmutil.setAllSelect(document, "input", "click");
		ipmutil.appendCommonMenu();
		if (json.CustCode ==  undefined)
			{
				page.custNAme  = "";
			    page.CustCode  = "";
			}
		else{
			page.custNAme  = json.custNAme;
			page.CustCode  = json.CustCode;
		}
		
		if (json.HistoryGubun == undefined){
			page.HistoryGubun  =  "";
		
		}
		else{
			page.HistoryGubun  =  json.HistoryGubun;
		}
			
		page.UserID  = json.UserID;
		page.deptCode  =  json.deptCode;
		page.deptName  = json.deptName;
		
		
		
		page.initInterface();
		page.initData();
		page.initLayout();
		
	},
	initInterface:function()
	{
		 var nowDate  = new Date();
         $("#CollectDate").val(nowDate.bMToFormatDate("yyyy-mm-dd"));  // 수금일자 
         $("#SaleYYYY").val(nowDate.bMToFormatDate("yyyy")); // 매출년 
		 $("#SaleMM").val(nowDate.bMToFormatDate("mm"));     // 매출월
		 $("#DepositYYYY").val(nowDate.bMToFormatDate("yyyy")); // 입금년
		 $("#DepositMM").val(nowDate.bMToFormatDate("mm"));      // 입금월 
	 	 $("#CustNm1").val(page.CustCode);
	 	 	 			
	 	 $(".DeptNm").attr("DeptCode",page.deptCode); 
	 	 $(".DeptNm").html(page.deptName); 
	 	 $(".UserNm").attr("UserID",page.UserID);
	 	 $(".UserNm").html(bizMOB.Storage.get("UserName"));
		 
	 	 $("#CustNm1").keyup( function(e) {
			
	 		 var code = e.which;
				
				if (code  == "13")
				{			
					 if ($("#CustNm1").val() !="")
						 page.CustlistCheck();
				}     

		 });
		
		 $("#SearchBtn").click(function(){
			 
			 if ($("#CustNm1").val() !="")
			 page.CustlistCheck();
			 
		 });
		 
		 $("#Refresh").click(function(){
			 
			 bizMOB.Web.open("collection/html/CM013.html", 
						{ message : 
						    	{
									UserID : page.UserID,
									deptName : page.deptName,
									deptCode : page.deptCode,
									CustCode : "",
									custNAme : "",
									HistoryGubun  :  "메인"
						    	},
						  modal:false,
				          replace:true 	
						});
			 
		 });
		 
		 $(".saleDate").change(function(){
			 
			 if(page.CustCode != "")
			 {
				 page.CollectInformationS();   //수금정보를 가져온다
			 }
			 page.CollectSeqSearchList(); // 이전에 등록된 수금순번을 가져온다.
			 
		 });
		 
		 
         $("#CollectSeq").change(function(){
			 
        	 if($("#CollectSeq").val() != "")
    		 {
        		 page.CustCode = $("#CollectSeq option:selected").attr("custcode");
        		 $(".CustNm").html($("#CollectSeq option:selected").attr("custnm"));
        		 page.CollectSeqSearch( $("#CollectSeq").val()); // 수금순번선택시 선택된 수금정보를 가져온다.
        		 var date = $("#CollectSeq option:selected").attr("collectdt");
        		 $("#CollectDate").val(date.substring(0, 4) + "-" 
        				 + date.substring(4, 6) + "-"
        				 + date.substring(6, 8));
    		 }
        	 else
    		 {
        		 bizMOB.Web.open("collection/html/CM013.html", 
 						{ message : 
 						    	{
 									UserID : page.UserID,
 									deptName : page.deptName,
 									deptCode : page.deptCode,
 									CustCode : "",
 									custNAme : "",
 									HistoryGubun  :  "메인"
 						    	},
 						  modal:false,
 				          replace:true 	
 						});
    		 }
		 });
         
         $("#btnAdd").click(function(){
        	        	 
        	 bizMOB.Ui.openDialog("collection/html/CM014.html", 
						{
				           message:  {CustCode : page.CustCode}, 
				           width : "80%",
						    height : "47%",
						}); 
        	 
         });
		 
		 $( "#datepicker" ).datepicker({ 

			 showButtonPanel: true,
			 changeMonth:true,
			 changeYear:true,
			 minDate:"-100y",
			 yearRange:"c-10:c+1",
			 currentText:"오늘 날짜",
			 dateFormat: "yy-mm-dd",
			 prevText: "이전 달",
			 nextText: "다음 달",
			 monthNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
			 monthNamesShort: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
			 dayNames:["일","월","화","수","목","금","토"],
			 dayNamesMin:["일","월","화","수","목","금","토"],
			 closeText: "닫기" ,
			 showMonthAfterYear: true,
			 onSelect: function(date) {
			
			  var datetime = 	$(this).datepicker("getDate");
			  $("#CollectDate").val(datetime.bMToFormatDate("yyyy-mm-dd"));
			  page.CollectSeqSearchList();  // 이전에 등록된 수금순번을 가져온다.
			  
			 }
		      
		   });
		 
		 $('.btn_cal').click(function(){
			 
			 $( "#datepicker" ).datepicker( "show" );	 
			 
		 });
		 
		
		 
		 $("#List01New").delegate("#Delete1","click", function(){
			 var clickedRow = $(this).parent().parent();
			 var button1 = bizMOB.Ui.createTextButton("확인", function()
	                    {
				            clickedRow.remove();
				            var amt = 0;
				            
				            if  ($("#list02 tr").length -1 > 0)
				            {
					            for(var i=0; i< $("#list02 tr").length; i++)
						         {
						        	amt += $($("#list02 tr")[i]).find("#Amt").html().replace("원","").bMToNumber();
						         }
				            }
				            else
				            {
				            	amt = 0;
				               
				            }
				            $("#CollectAmt").val((amt).bMToNumber());
				            $("#SaleMonthAmt").val(amt);
				            
	                    });
			 var button2 = bizMOB.Ui.createTextButton("취소", function(){	 return;});
	         bizMOB.Ui.confirm("알림", "항목을 제거 하시겠습니까?", button1, button2);   
			 
		   });
		 
		 $("#btnDel").click(function(){
			 
			 
			 //bizMOB.Ui.alert("알림","매출수금 안정화 이후에 기능 사용가능합니다.");
			 var button1 = bizMOB.Ui.createTextButton("확인", function()
	                    {
							 if ($("#CustNm1").val() == "")
				             {
				            	 bizMOB.Ui.alert( "알림","수금순번을 선택해주세요.");
				            	 return;	  
				             } 
							 else
							 {
								 page.AccountCheck("D");
							 }
	                    });
			 var button2 = bizMOB.Ui.createTextButton("취소", function(){	 return;});
	            bizMOB.Ui.confirm("알림", "삭제 하시겠습니까?", button1, button2);  
			 
		 });
		 $("#btnInsert").click(function(){
			 //bizMOB.Ui.alert("알림","매출수금 안정화 이후에 기능 사용가능합니다.");
			 var button1 = bizMOB.Ui.createTextButton("확인", function()
	                    {
				             
				              if ($("#SaleYYYY").val() == "" || $("#SaleMM").val() == "" )
				              {
				            	  bizMOB.Ui.alert( "알림","매출년월을 입력해주세요.");
				            	  return;
				              }
				              
				              
				               
				              if ($("#CollectAmt").val().bMToNumber() == "" || $("#CollectAmt").val().bMToNumber() == "0")
				              {
				            	  bizMOB.Ui.alert( "알림","수금금액을 입력해주세요.");
				            	  return;
				            	  
				              } 
				              
				              if (page.CustCode == "")
				              {
				            	  bizMOB.Ui.alert( "알림","고객코드를  입력해주세요.");
				            	  return;
				            	  
				              } 
				              page.SaleCheck();
				              
				            
	                    });
			 var button2 = bizMOB.Ui.createTextButton("취소", function(){	 return;});
	            bizMOB.Ui.confirm("알림", "등록 하시겠습니까?", button1, button2);
			 
			 
		 });
		 
	},
	initData:function()
	{		
		if(page.CustCode != "")
		{
			page.CollectInformationS();   //수금정보를 가져온다
		}
		page.CollectSeqSearchList(); // 이전에 등록된 수금순번을 가져온다.
	   
	},
	initLayout:function()
	{
		var IDName    =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
		var custCode  =  bizMOB.Storage.get("custCode");
		
		var UserID  =  bizMOB.Storage.get("UserID");
		var deptName  =  bizMOB.Storage.get("deptName");
		var deptCode  =  bizMOB.Storage.get("deptCode");
		var layout = ipmutil.getDefaultLayout("수금등록");
		if (page.HistoryGubun != "메인"){
						
					}
					else{
						
//						 var btnConfirm = bizMOB.Ui.createTextButton("확인", function()
//							        {
//											 bizMOB.Web.open("root/html/CM002.html", {
//													modal : false,
//													replace : false,
//													message : {
//														UserID : page.UserID,
//														HistoryGubun  :  "메인"
//													}
//											});
//							        });
//							        
//						var btnCancel = bizMOB.Ui.createTextButton("취소", function()
//							        {
//							
//							        });
//						
//						
//						layout.titlebar.setTopLeft(bizMOB.Ui.createButton({ button_text : "이전", image_name : "common/images/top_icon_back.png", listener : function() {
//						 			    
//										      bizMOB.Ui.confirm("수금등록", "메인화면으로 이동하시겠습니까?", btnConfirm, btnCancel);
//							
//						 		}}));
						
					}
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		
 		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));
 		
 		bizMOB.Ui.displayView(layout);
	},
	CollectInformationS:function()
	{
		var SumAmt = 0;
		$("#DepositNumber").val("");      // 입금표번호 
		$("#Remark").val("");      // 비고 
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00801");
		tr.body.P01 = $("#CollectDate").val().replace("-","").replace("-","").substr(0,6);
		tr.body.P02 = page.CustCode;
		bizMOB.Web.post({					 
							message:tr,
							success:function(json){
							if(json.header.result==true){
							 
								for(var i=0; i<json.body.list01.length; i++ )
								{
									SumAmt += json.body.list01[i].R05.bMToNumber();
								}
								 $("#CollectAmt").val(parseInt(SumAmt));
								 $("#CollectAmt").val().bMToCommaNumber();
								 $("#SaleMonthAmt").val(parseInt(SumAmt));
								 var dir = 
										[
										 	{
										 		type:"loop",
										 		target:"#Detaile",
										 		value:"list01",
										 		detail:
									 			[
												    	 			 
							                        {type:"single", target:"#ContracNm", value:"R02"},
							                        {type:"single", target:"#ContracNm@ContractCode", value:"R01"},
							                        {type:"single", target:"#Amt", value:function(arg)
							    					    {  
							    					      return parseInt(arg.item.R05) + "원";
							    					    }
							                         }
													
								 		        ]
										 	}
										];
										// 반복옵션(이전의 항목을 삭제하는 옵션)
										var options = { clone:true, newId:"List01New", replace:true };
										// 그리기
										$("#List01").bMRender(json.body, dir, options);
								
							}
							else{
								
								
							}
						}
					});
				
	},
	CollectSeqSearchList:function(json)
	{
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01301");
			
		 tr.body.P01 = $("#CollectDate").val().replace("-", "").replace("-", "");  //수금일자 
		 tr.body.P02 = "12345-67890";  // 고정값
		 tr.body.P03 = page.UserID;     // 수금사원
		 
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				     
				}
				else {
					     $("#CollectSeq").empty().data('option');  // 아이템 제거 
					     $("#CollectSeq").append("<option value=''></option>") ;
					
					     for(var i=0; i<json.body.list01.length; i++)
						 {
    		    	        $("#CollectSeq").append("<option value='"+json.body.list01[i].R01+"' custcode='"+json.body.list01[i].R03+"' " +
    		    	        		"custnm='"+json.body.list01[i].R04+"' collectdt='"+json.body.list01[i].R05+"' " +
    		    	        				"saleym='"+json.body.list01[i].R06+"' collecttype='"+json.body.list01[i].R07+"'> "+json.body.list01[i].R02+" </option> ") ;
						 }
    		    		
					  }
			}
		});
	},
	CollectSeqSearch:function(data)
	{
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01302");
		 
		 tr.body.P01 = $("#CollectDate").val().replace("-", "").replace("-", "");  //수금일자 
		 tr.body.P02 = "12345-67890";  // 고정값
		 tr.body.P03 = data.bMToNumber();     // 
		 tr.body.P04 = page.CustCode;     // 고객코드
		 
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				  	bizMOB.Ui.alert("경고", json.header.error_text);
				}
				else {
					
					    if (json.body.R07 !=  $(".DeptNm").attr("deptcode")){
					    	
					    	  bizMOB.Ui.alert("알림", "타부서가 등록한 수금내역이므로 조회 할 수 없습니다.");
					    	  return;
					    	  
					    	}
					    else{
						    	
						    	page.RederList(json);
						        page.GetInformation(json);
					        
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
				 		target:"#Detaile",
				 		value:"list01",
				 		detail:
			 			[
						    	 			 
	                        {type:"single", target:"#ContracNm", value:"R19"},
	                        {type:"single", target:"#ContracNm@ContractCode", value:"R18"},
	                        {type:"single", target:"#Amt", value:function(arg)
	    					    {  
	    					      return arg.item.R20 + "원";
	    					    }
	                         }
							
		 		        ]
				 	}
				];
				// 반복옵션(이전의 항목을 삭제하는 옵션)
				var options = { clone:true, newId:"List01New", replace:true };
				// 그리기
				$("#List01").bMRender(json.body, dir, options);
		
	},
	GetInformation:function(json)
	{
		 $("#CollectAmt").val((json.body.R09).bMToNumber());
		 $("#SaleMonthAmt").val((json.body.R09).bMToNumber());
		 $("#SaleYYYY").val(json.body.R06.substr(0,4)); // 매출년 
		 $("#SaleMM").val(json.body.R06.substr(4,2));     // 매출월
		 $("#DepositYYYY").val(json.body.R13.substr(0,4)); // 입금년
		 $("#DepositMM").val(json.body.R13.substr(4,2));      // 입금월 
		 $("#DepositNumber").val(json.body.R14);      // 입금표번호 
		 $("#Remark").val(json.body.R15);      // 비고 
		 $("#CustNm1").val(json.body.R05);      // 고객코드
		 $(".CustNm").val(json.body.R17);      // 고객명
		 
		 
	},
	CustlistCheck:function()
	{
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01101");
		tr.body.P01 = $("#CustNm1").val();
		tr.body.P02 = page.UserID;
	   
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					return;
				}
				
				if(json.body.List01.length > 1)
				{
						bizMOB.Ui.openDialog("collection/html/CM011.html", 
						{
				           message:  {Custin : $("#CustNm1").val() ,Pagepath : page.Pagepath}, //SR번호 넘기기" +
				           width : "80%",
						    height : "45%",
						});
				}
				else
				{			
				   $("#CustNm1").html(json.body.List01[0].R01);
				   $(".CustNm").html(json.body.List01[0].R02);
				   
				   page.CustCode = json.body.List01[0].R01;
				   
				   $("#CustNm1").hideKeypad();
				   
				   if(page.CustCode != "")
				   {
					   page.CollectInformationS();   //수금정보를 가져온다
				   }
				   page.CollectSeqSearchList(); // 이전에 등록된 수금순번을 가져온다.
				   
				}
				
			}
		});
		
	},
	SetCustNm:function(json)
	{
		$("#CustNm1").val("");
		$(".CustNm").val("");
		$("#CustNm1").html(json.CustCode);
		$(".CustNm").html(json.CustName);
		page.CustCode = json.CustCode;
		page.initData();
	},
	SetContractAdd:function(json)
	{
		
		var ContractNm   =  json.ContractName;
		var ContractAmt  =  json.Amt.bMToCommaNumber();
	    page.ContractCode  = json.ContractCode;
	  
	   
	   if ($("#List01New #Detaile").length > 0)
	   {
		   var cnt = $("#list02 th").length - 1;
		   var isDuplicate = false;
		   for(var i = 0; i < cnt; i++){
			   if($($("#list02 th")[i]).attr("contractcode") == page.ContractCode){
				   isDuplicate = true;
			   }
		   }
		   if(isDuplicate){
			   bizMOB.Ui.alert("안내", "이미 추가되어있는 계약대상입니다.");
			   return;
		   }
		   var AddRwo  =  $("#Detaile");
		   var newrow  =  AddRwo.clone(true);
		   newrow.find("#ContracNm").text(ContractNm);
		   newrow.find("#ContracNm").attr("ContractCode",page.ContractCode);
		   newrow.find("#Amt").text(ContractAmt +"원");
		   newrow.insertAfter("#Detaile");
	   }
	   else
	   {
		   var cnt = $("#list02 th").length - 1;
		   var isDuplicate = false;
		   for(var i = 0; i < cnt; i++){
			   if($($("#list02 th")[i]).attr("contractcode") == page.ContractCode){
				   isDuplicate = true;
			   }
		   }
		   if(isDuplicate){
			   bizMOB.Ui.alert("안내", "이미 추가되어있는 계약대상입니다.");
			   return;
		   }
	       $("#List01New").append("<colgroup> <col style='width:25%;' />" 
	    		                 +"<col style='width:30%;' />"
	    		                 +"<col style='width:30%;' />"
	    		                 +"<col style='width:15%;' />"
	    		                 +"</colgroup>"
	    		                 +"<tbody id='list02'>"
	    		                 +"<tr id='Detaile' class=''>"
	    		                 +"<th scope='row' id='ContracNm' ContractCode='"+page.ContractCode+"'>"+ContractNm+ "</th>"
	    		                 +"<td class='subj' ><span></span></td>"
	    		                 +"<td class='num' id='Amt'><span>"+ContractAmt+ "</span> 원</td>"
	    		                 +"<td><button type='button' class='btn02' id='Delete1'>삭제</button></td>"
	    		                 +"</tr> </tbody>");
	   
	   }
	   var Amt  =  $("#CollectAmt").val();
	   var Amt1 =  ContractAmt.bMToNumber() + Amt.bMToNumber();
	   $("#CollectAmt").val(Amt1.bMToStr().bMToCommaNumber());  
	   $("#SaleMonthAmt").val(Amt1.bMToStr().bMToCommaNumber());  
	   
	},
	Delete:function()
	{
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01304");
		tr.body.P01 = page.CustCode;  // 고객코드
		tr.body.P02 = $("#CollectDate").val().replace("-","").replace("-","");// 수금일자
		tr.body.P03 = $("#CollectSeq option:selected").attr("saleym");//매출년월
		tr.body.P04 = $("#CollectAmt").val().bMToNumber();//수금금액
		tr.body.P05 = "12345-67890";   //수금계좌
		tr.body.P06 = $("#CollectSeq option:selected").attr("collecttype");//수금방법
		tr.body.P07 = $("#CollectSeq").val().bMToNumber();   //수금순번
	   
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					return;
				}
				else
				{
					 var btnConfirm = bizMOB.Ui.createTextButton("확인", function()
						        {
						 			bizMOB.Web.open("collection/html/CM013.html", 
									{ message : 
									    	{
												UserID : page.UserID,
												deptName : page.deptName,
												deptCode : page.deptCode,
												CustCode : "",
												custNAme : "",
												HistoryGubun  :  "메인"
									    	},
									  modal:false,
							          replace:true 	
									});
									 
						        });
					
					 bizMOB.Ui.confirm("알림", "삭제 하였습니다.", btnConfirm);  
				}
			
			}
		});
		
	},
	AccountCheck:function(data)
	{
		var Messastring = "";
		if (data == "D")
		{
			Messastring =  "회계마감이 된 건은 삭제 할 수 없습니다.";
		}
		else
		{
			Messastring =  "회계마감이 된 건은 등록 할 수 없습니다.";
		}
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00002");
		tr.body.P01 = page.deptCode;  // 부서코드
		tr.body.P02 = $("#CollectDate").val().replace("-","").replace("-","");// 수금일자
	
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고",  json.header.error_text);
					return;
				}
				else
				{
					if (json.body.R03 == "Y" )
					{
						bizMOB.Ui.alert("알림", Messastring);
						return;
					}
					else
					{
						if (data == "D")
							{
							  page.ballotCheck("D");
							
							}
						else
							{
							page.ballotCheck("I");
							
							}
					}
				}
			}
		});
		
		
	},
	ballotCheck:function(data)
	{
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01303");
		var Messastring = "";
		var Messastring1 = "";
		if (data == "D")
		{
			Messastring = "기표완료된 수금내역은 삭제 할 수 없습니다.";
			Messastring1 = "송금내역이 발송된 수금내역은 삭제 할 수 없습니다.";
		} 
		else
		{
			
			Messastring = "기표완료된 수금내역은 등록 할 수 없습니다.";
			Messastring1 = "송금내역이 발송된 수금내역은 등록 할 수 없습니다.";
		}
		tr.body.P01 = page.CustCode;  // 고객코드
		tr.body.P02 = $("#CollectDate").val().replace("-","").replace("-","");// 수금일자
		tr.body.P03 = "12345-67890";   //수금계좌
		tr.body.P04 = $("#CollectSeq").val();   //수금순번
	
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고",  json.header.error_text);
					return;
				}
				else
				{
					if (json.body.R01 == "Y" )
					{
						bizMOB.Ui.alert("알림",Messastring);
						return;
					}
					
					if (json.body.R02 == "Y" )
					{
						bizMOB.Ui.alert("알림",Messastring1 );
						return;
					}
					if (data =="D")
					   page.Delete();
					else
					{
						if($("#CollectSeq").val() == "")
							page.InsertSeq();
						else
							page.Insert($("#CollectSeq").val());
					}
					   
					
				}
			}
		});
		
		
	},
	SaleCheck:function()
	{	
		var CollectArr = new Array;
		var vList = $("#List01New tr");
		
		for (var i=0; i<$("#List01New tr").length; i++ )
        {
        	CollectArr.push( 
			{
					P01 : $("#CollectDate").val().replace("-","").replace("-","")  // 수금일자
			        ,P02 : page.CustCode // 고객코드
			        ,P03 : $("#CollectSeq").val() == "" ? 0 : $("#CollectSeq").val().bMToNumber() // 수금순번
			        ,P04 : $(vList[i]).find("#ContracNm").attr("ContractCode")
			});
        }
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01307");
		
		if(CollectArr.length == 0)
    	{
        	bizMOB.Ui.alert("저장실패", "저장할 계약대상이 없습니다.");
        	return;
    	}
        tr.body.LIST = CollectArr;
	
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고",  json.header.error_text);
					return;
				}
				else
				{
					if (json.body.R03 != "0" )
					{
						bizMOB.Ui.alert("알림", "해당하는 매출년월에 수금내역이 존재합니다.");
						return;
					}
					else
					{
						page.AccountCheck("I");
					}
					
				}
			}
		});
		
	},
	InsertSeq:function()
	{
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01305");
		tr.body.P01 =  page.CustCode;
		tr.body.P02 =  $("#CollectDate").val().replace("-","").replace("-","");  // 수금일자
		tr.body.P03 =  "12345-67890"; // 고객코드
		
		bizMOB.Web.post(
		{
			message:tr,
			success:function(json)
			{
				if(json.header.result==false)
				{
					bizMOB.Ui.alert("경고",  json.header.error_text);
					return;
				}
				else
				{
					page.Insert(json.body.R01);
				}
			}
		});
		
		
	},
	Insert:function(data)
	{
		    var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01306");
	        var CollectArr1 = new Array;
	        var CollectArr = new Array;
	        
	        CollectArr1 = $("#list02 tr").map(function(val, i)
		    {
			      var ContractCode = $(this).find("#ContracNm").attr("ContractCode");
			      var Amt = $(this).find("#Amt").text().replace("원","").bMToNumber();
			              
			      if (Amt.bMToNumber() >  0)
			  	  {
			  	      return { "P16":ContractCode, "P17": "", "P18":"5", "P19":Amt.bMToNumber()};
			  	  }
	          });
	        
	        for (var i=0; i<CollectArr1.length; i++ )
	        {
	        	CollectArr.push( 
				 { 
								P16		: CollectArr1[i].P16, 							//  계약대상
								P17 	: CollectArr1[i].P17,							//  약정계약
								P18 	: CollectArr1[i].P18,							//  작업구분
								P19 	: CollectArr1[i].P19,							//  금액
				 });					
	        }
	        
	        tr.body.list01 = CollectArr;
	        tr.body.P01  = $("#CollectDate").val().replace("-","").replace("-",""); // 수금일자
	        tr.body.P02  = page.CustCode;  // 고객코드 
	        tr.body.P03  = $("#SaleYYYY").val() + $("#SaleMM").val();  //매출년월
	        tr.body.P04  = $("#CollectAmt").val().bMToNumber();  // 수금금액
	        tr.body.P05  = "12345-67890";
	        tr.body.P06  = data.bMToNumber();
	        tr.body.P07  = "3204";   //수금방법
	        tr.body.P08  = page.deptCode;
	        tr.body.P09  = page.UserID;
	        tr.body.P10  = 0;
	        tr.body.P11  = "3401";
	        tr.body.P12  = $("#DepositYYYY").val() + $("#DepositMM").val() ;
	        tr.body.P13  =  $("#DepositNumber").val();
	        tr.body.P14  = $("#Remark").val();
	        tr.body.P15  = page.deptCode;
	         
	        bizMOB.Web.post(
	        {
	            message:tr,
	            success:function(json)
	            {
	            	
	                if (json.header.result == false)
	                {
	                    bizMOB.Ui.alert("경고", json.header.error_text);
	                    return;
	                }
	                
	                var btnConfirm = bizMOB.Ui.createTextButton("확인", function()
					        {
	                	       //page.CollectSeqSearchList();
	                			bizMOB.Web.open("collection/html/CM013.html", 
								{ message : 
								    	{
											UserID : page.UserID,
											deptName : page.deptName,
											deptCode : page.deptCode,
											CustCode : "",
											custNAme : "",
											HistoryGubun  :  "메인"
								    	},
								  modal:false,
						          replace:true 	
								});
					        });
	                  ipmutil.resetChk();
				      bizMOB.Ui.confirm("알림", "저장되었습니다.", btnConfirm); //  저장되면 이전 페이지로 넘어간다 . 
	               
	            }
	        });
	         		
	}
	
};