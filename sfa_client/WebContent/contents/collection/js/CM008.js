page  =
{
	Seq : "",
	custCode  : "",
	deptCode  : "",
	deptName  : "",
	UserID  : "",
	HistoryGubun : "",
	UserName : "",
	CHAINSTATUS : "", 
	init : function(json)
	{	
		
		
		ipmutil.resetChk();
		ipmutil.setAllSelect(document, "input", "click");
		page.UserName    =  bizMOB.Storage.get("UserName");
		page.custCode  =  json.custCode;
		page.UserID  =  json.UserID;
		page.deptCode  = json.deptCode;
		page.deptName  = json.deptName;
		
		if (json.HistoryGubun == undefined){
			page.HistoryGubun  =  "";
		
		}
		else{
		    
			page.HistoryGubun  =  json.HistoryGubun;
		 	
		}
		ipmutil.appendCommonMenu(page.UserName);
		
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initInterface:function()
	{ 
		$("#SearchBtn").click(function(){
			 
			 if ($("#CustNm1").val() !="")
				 page.CustlistCheck();
		});
		
		 $(".cardnum input").keyup(function(e){
			  if($(this).val().length >= 4 )
			  {
				  //$(this).val($(this).val().substr(0, 4));
				  $(this).next().focus();
			  }
		 });
		
		 $("#ChangeAmt").toNum();
		 
			$("#ChangeAmt").keyup(function(){
				$(this).select();
			});
		 
		 
		  var nowDate  = new Date();
	     $("#CardDate").html(nowDate.bMToFormatDate("yyyy-mm-dd"));  // 수금일자 
	     $("#CustNm1").val(page.custCode);
	     
	     $("#DetpNm").attr("DeptCode", page.deptCode);
	     $("#DetpNm").html(page.deptName);
	     
	     $("#RenderListNew").delegate("#btnDelete","click", function(){
			 var clickedRow = $(this).parent().parent().parent();
//			 var button1 = bizMOB.Ui.createTextButton("확인", function()
//	                    {
//				            clickedRow.remove();
//				            var amt = 0;
//				            
//				            if  ($("#RenderListNew tr").length > 0)
//				            {
//					            for(var i=0; i< $("#RenderListNew tr").length; i++)
//						         {
//						        	amt += $($("#RenderListNew tr")[i]).find("#Amt").html().replace("원","").bMToNumber();
//						         }
//				            }
//				            else
//				            {
//				            	amt = 0;
//				               
//				            }
//				            $("#ChangeAmt").val(amt);
//				        
//				            
//	                    });
//	            bizMOB.Ui.confirm("알림", "항목을 제거 하시겠습니까?", button1);   
	    	 clickedRow.remove();
	            var amt = 0;
	            
	            if  ($("#RenderListNew tr").length > 0)
	            {
		            for(var i=0; i< $("#RenderListNew tr").length; i++)
			         {
			        	amt += $($("#RenderListNew tr")[i]).find("#Amt").html().replace("원","").bMToNumber();
			         }
	            }
	            else
	            {
	            	amt = 0;
	               
	            }
	            $("#ChangeAmt").val(amt);
		   });
	     
	     $("#btnAdd").click(function(){
        	 
        	 bizMOB.Ui.openDialog("collection/html/CM012.html", 
						{
				           message:  {CustCode : $("#CustNm1").val()}, 
				           width : "80%",
						    height : "60%",
						}); 
        	 
        	 page.CHAINSTATUS  ="1";
        	 
        	 
         });
		
	     $("#btnRequest").click(function(){
	    	 
	    	 bizMOB.Ui.alert("알림","매출수금 안정화 이후에 기능 사용가능합니다.");
//	    	 if ($("#CustNm1").val() !="") {
//		    	 page.SetCardMAMT("I");
//		    	 page.CHAINSTATUS  ="1";
//	    	 }
//	    	 else 
//	    		 {
//	    		 bizMOB.Ui.alert("알림","고객코드를 입력해주세요.");
//	    		 }
	    	 
	    	 
	     });
	     
		 $("#CardSort").change(function(){
					 
		     page.SetCardMAMT("T");   // 수수료율 가져오기 
		     page.CHAINSTATUS  ="1";
		     		 
		 });
		 
		 $("#CustNm1").keyup( function(e) {
				
	 		 var code = e.which;
				
				if (code  == "13")
				{			
					 if ($("#CustNm1").val() !="")
						 page.CustlistCheck();
				}     

		 });
		 
		
	     
	},
	initData:function(json)
	{	
		page.Seq = "";
		
		page.CommonCodeSearch();
		
		if (page.custCode != "" )  page.SearchInformation();
		
	},
	initLayout:function()
	{ 
		var custName  =  bizMOB.Storage.get("custName");
		var custCode  =  bizMOB.Storage.get("custCode");
		
		var UserID  =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
 		
		ipmutil.ipmMenuMove(page.UserName,custCode,custName,UserID,deptName,deptCode);
		
		var layout; 
		layout = ipmutil.getDefaultLayout("카드승인");
		
		
		  layout.titlebar.setTopLeft(bizMOB.Ui.createButton({ button_text : "이전", image_name : "common/images/top_icon_back.png", listener : function() {
		       	
     	     if (bizMOB.Storage.get("inputcheck") == "1"){
     	    	 
     	    	 var button1 = bizMOB.Ui.createTextButton("예", function()
  	                    {
  				             
		        	    		 bizMOB.Web.close(
										 {
											 modal : false 
											
										 });
								 
  				            
  	                    });
     	    	 var btncancel = bizMOB.Ui.createTextButton("아니오", function()
   	                    {
   				               return;
   	                    });
  	            bizMOB.Ui.confirm("페이지 이동", "이 페이지를 벗어나시겠습니까? 수정한 항목은 저장되지 않습니다.", button1,btncancel);   
     	    	 
     	     }
     	     else
     	     {
     	    	 bizMOB.Web.close(
							 {
								 modal : false 
								
							 });
					 
     	    	 
     	     }
     	
		}}));
		
		
		
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
	
	setCardInfomation: function()
	{
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00801");
		 tr.body.P01 = $("#CardDate").val().replace("-", "").replace("-", "");  //승인일자 
		 tr.body.P02 = $("#CustNm1").val();  // 고객코드
		
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				  
				  $("#RenderListNew").remove();
				  $("#ChangeAmt").val("0");
				  $("#CardNum1").val("");
				  $("#CardNum2").val("");
				  $("#CardNum3").val("");
				  $("#CardNum4").val("");
				  
				}
				else {
					    $("#CardSort").val(json.body.R11);  //  카드종류
    		    		$("#CardNum1").val(json.body.R10.substr(0,4));  //카드번호 
    		    		$("#CardNum2").val(json.body.R10.substr(4,4));  //카드번호 
    		    		$("#CardNum3").val(json.body.R10.substr(8,4));  //카드번호 
    		    		$("#CardNum4").val(json.body.R10.substr(12,4));  //카드번호 
    		    		$("#CardYear").val(json.body.R09.substr(0,4));  //카드유효기간
    		    		$("#CardMonth").val(json.body.R09.substr(4,2)); //카드유효기간
    		    		$("#CustNm").html($("#CustNm1").val() + ' '+ json.body.R12); // 고객코드 , 고객명
    		    		$("#CustNm").attr("CustCode",$("#CustNm1").val());  //  고객코드 
    		    		$("#DetpNm").html(json.body.R07);   //부서명
    		    		$("#DetpNm").attr("DeptCode",json.body.R08); //부서코드 
    		    		
    		    		page.ContractAmtList();
    		    		page.SetCardMAMT("T");
    		    		
					  }
			}
		});
		
	},
	CommonCodeSearch:function()
	{
		
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00001");
		 tr.body.Gubun ="A003";  //카드종류 
		 tr.body.Type = "1";  // 업종구분
		
		 
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				     
				}
				else {
					     $("#CardSort").empty().data('option');  // 아이템 제거 
					     $("#CardSort").append("<option value=''></option>") ;
					
					     for(var i=0; i<json.body.list01.length; i++)
						 {
    		    	        $("#CardSort").append("<option value='"+json.body.list01[i].Code+"'> "+json.body.list01[i].CodeName+" </option>") ;
						 }
    		    		
					  }
			}
		});
		
	},
	ContractAmtList:function()
	{
		var SumAmt = 0;
		 
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00801");
		tr.body.P01 = $("#CardDate").text().substr(0,7).replace("-","");
		tr.body.P02 = $("#CustNm1").val();
		bizMOB.Web.post({					 
							message:tr,
							success:function(json){
							if(json.header.result==true){
							 
								for(var i=0; i<json.body.list01.length; i++ )
								{
									SumAmt += json.body.list01[i].R05.bMToNumber();
								}
								 $("#ChangeAmt").val(parseInt(SumAmt));
								 
								 var dir = 
										[
										 	{
										 		type:"loop",
										 		target:"#Detaile",
										 		value:"list01",
										 		detail:
									 			[
												    	 			 
							                        {type:"single", target:"#ContractNm", value:"R02"},
							                        {type:"single", target:"#ContractNm@ContractCode", value:"R01"},
							                        {type:"single", target:"#SaleYYMM", value:"R06"},
							                        {type:"single", target:"#Amt", value:function(arg)
							    					    {  
							                        	   return parseInt(arg.item.R05);
							    					    }
							                         },
							                         {type:"single", target:"#WorkNm", value:function(arg)
								    					    {  
							                        	       var WorkName  = "";
								                        	   switch(arg.item.R04)
								                        	   {
								                        	   
								                        	      case "1":
								                        		     WorkName  = "초기1차";
								                        		     break;
								                        	      case "2":
									                        		     WorkName  = "초기2차";
									                        		     break;
								                        	      case "3":
									                        		     WorkName  = "초기3차";
									                        		     break;     
								                        	      case "4":
									                        		     WorkName  = "정기이월";
									                        		     break;     
								                        	      case "5":
									                        		     WorkName  = "정기작업";
									                        		     break;     
								                        	      case "6":
									                        		     WorkName  = "크레임";
									                        		     break;     
								                        	      case "E":
									                        		     WorkName  = "방문요청";
									                        		     break;     
								                        	      case "F":
									                        		     WorkName  = "서류전달";
									                        		     break;     
								                        	      case "Z":
									                        		     WorkName  = "기타";
									                        		     break;     
								                        	      case "7":
									                        		     WorkName  = "추가(有)";
									                        		     break;     
								                        	      case "8":
									                        		     WorkName  = "추가(無)";
									                        		     break;     
								                        	      case "9":
									                        		     WorkName  = "무료진단";
									                        		     break;     
								                        	      case "V":
									                        		     WorkName  = "VBC 설치";
									                        		     break;	     
								                        	   
								                        	   }
								                        	   
								                        	   return WorkName;
								    					    }
								                     },
							                         {type:"single", target:"#WorkNm@WorkGubun", value:function(arg)
								    					    {  
								                        	
								    					      return parseInt(arg.item.R04);
								    					    }
								                     }
													
								 		        ]
										 	}
										];
										// 반복옵션(이전의 항목을 삭제하는 옵션)
										var options = { clone:true, newId:"RenderListNew", replace:true };
										// 그리기
										$("#RenderList").bMRender(json.body, dir, options);
								
							}
							else{
								
								bizMOB.Ui.alert("경고", json.header.error_text);
							}
						}
					});
				
	},
	SetCardContractAdd:function(json)
	{
		
		var ContractNm   =  json.ContractName;
		var ContractAmt  =  json.Amt;
		var WorkName  =  json.WorkName;
		var WorkGubun  =  json.WorkGubun;
		var ContractEnd  =  json.ContractEnd;
	    var SaleYYMM  =  json.SaleYYMM;
	    page.ContractCode  = json.ContractCode;
	  	   
	   if ($("#RenderListNew #Detaile").length > 0)
		   {
	           var AddRwo  =  $("#Detaile");
			   var newrow  =  AddRwo.clone(true);
			   newrow.find("#ContractNm").text(ContractNm);
			   newrow.find("#ContractNm").attr("ContractCode",page.ContractCode);
			   newrow.find("#Amt").text(ContractAmt);
			   newrow.find("#SaleYYMM").text(SaleYYMM);
			   newrow.find("#WorkNm").text(WorkName);
			   newrow.find("#WorkNm").attr("WorkGubun" ,WorkGubun);
			   newrow.find("#WorkNm").attr("ContractEnd" ,ContractEnd);
			   newrow.insertAfter("#Detaile");
		   }
	   else
		   {
		   
			   $("#RenderListNew").append("<tr id='Detaile'>" 
						                 +"<td class='subj'><span id='SaleYYMM'>"+SaleYYMM+ "</span></td>"
						                 +"<td class='subj' colspan='3'>"
						                 +"<div class='rbtnWrap'>"
						                 +"<p class='txtc01'><strong>청구금액 <span id='Amt' >"+ContractAmt+"</span>원</strong></p>"
						                 +"<p class='subtxt01'><strong id='ContractNm' ContractCode='"+page.ContractCode+"'>"+ContractNm+"</strong> | <span id='WorkNm' WorkGubun='"+WorkGubun+"' ContractEnd = '"+ContractEnd+"'>정기작업</span></p>"
						                 +"<button type='button' class='btn02 rcen_btn' id='btnDelete'>삭제</button>"
						                 +"</div>"
						                 +"</td>"
						                 +"</tr>");
		   
		   }
	   var Amt  =  $("#ChangeAmt").val();
	   var Amt1  =  ContractAmt.bMToNumber() + Amt.bMToNumber();
	   $("#ChangeAmt").val(Amt1.bMToStr().bMToCommaNumber());
	   
	},
	SetCardMAMT:function(data)
	{
		
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00802");
		 tr.body.P01 =$("#CardNum1").val() + $("#CardNum2").val()   ;  //카드번호 
		 
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				      return;
				}
				else {
							 if (json.body.R01 == "")
						    	{
								   if (data  == "I")
									   {
						    	          bizMOB.Ui.alert("알림","수수료율 조회 오류");
									   }
						    	}
						    else {
							      $("#CardMAMT").val(json.body.R01);
							      if (data  == "I")  page.SetSeq();
						    }
					     
					 }
			}
		});
		
		
	},
	SetSeq:function()
	{
		 page.Seq = "";
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM01305");
		 tr.body.P01 =$("#CustNm1").val();  //고객코드
		 tr.body.P02 =$("#CardDate").text().replace("-","").replace("-","");  //수금일자
		 tr.body.P03 ="221-10-001237"   ;  //수금계좌
		 
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				     
				  bizMOB.Ui.alert("경고",json.header.error_text);
				  return;
				}
				else {
					
					    if (json.body.R01 == "")
					    	{
					    	    bizMOB.Ui.alert("알림","수금 순선 생성 오류");
					    	}
					    else {
					    	
					    	  page.Seq  =  json.body.R01;
						      page.CustCodeCheck();
					    }
					
					 }
			}
		});
		
		
	},
    CustCodeCheck:function()
    {
	   	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00803");
		 tr.body.P01 =$("#CustNm1").val();  //고객코드 
		 
		 bizMOB.Web.post({
			  message:tr,
			  success:function(json){
			  if(json.header.result==false){
				     
				  bizMOB.Ui.alert("경고",json.header.error_text);
				  return;
				}
				else {
					     if(json.body.R01 == "N")
					     {
					    	 bizMOB.Ui.alert("알림", "유효하지 않은 고객코드입니다.");
					    	 return;
					     }
					     else
					     {
					    	 page.CheckList();
					    	 
					     }
					     
					  }
			}
		});
    	
    },
    
    CheckList:function()
    {
    	 var STATUS = "TRUE";
    	 for(var i=0; i< $("#RenderListNew tr").length -1; i++)
         {
    		 if ($($("#RenderListNew tr")[i]).find("#WorkNm").attr("WorkGubun") == "")
    		 {
    			 bizMOB.Ui.alert("알림","작업구분이 누락되었습니다.");
    			 return;
    		 }
    		 if ($($("#RenderListNew tr")[i]).find("#Amt").text().replace("원","") == "")
    		 {
    			 bizMOB.Ui.alert("알림","청구금액을 기입해주시기 바랍니다.");
    			 return;
    		 }
    		 
         }
    	 
    	 for(var i=0; i< $("#RenderListNew tr").length -1; i++)
         {
		     	 var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00803");
				 tr.body.P01 =$("#CustNm1").val();  //고객코드
				 tr.body.P02 =$($("#RenderListNew tr")[i]).find("#SaleYYMM").val();  //고객코드
				 
				 bizMOB.Web.post({
					  message:tr,
					  success:function(json){
					  if(json.header.result==false){
						     
						  bizMOB.Ui.alert("경고",json.header.error_text);
						  STATUS = "FASE";
						  return;
						}
						else {
							    
							     if (json.body.list01[0].R01 == json.body.R01 ||  json.body.list01[1].R10 ==  json.body.R01)
							    	 {
							    	 
							    	     if (json.body.R02 == "Y")
							    	    	 {
							    	    	 
								    	    	 bizMOB.Ui.alert("알림","배치청구된 고객입니다. 계속 진행 할 수 없습니다.");
								    	    	 STATUS = "FASE";
								    			 return;
							    	    	 
							    	    	 }
							    	    
							    	 
							    	 }
							     
							 }
					}
				});
         }
    	 
    	 
    	 if (STATUS == "TRUE") page.CardApproval();
    	
    },
    CardApproval:function()
    {
		   var tr = bizMOB.Util.Resource.getTr("Cesco", "CARD001");
		   var CardArr1 = new Array;
		   var CardArr = new Array;
		   
		   CardArr1 = $("#RenderListNew tr").map(function(val, i)
		   {
			      var ContractCode = $(this).find("#ContractNm").attr("ContractCode");
			      var SaleYYMM = $(this).find("#SaleYYMM").text().replace("-","");
			      var Amt = $(this).find("#Amt").text().replace("원","").bMToNumber().bMToStr();
			      var WorkGugun = $(this).find("#WorkNm").attr("WorkGubun");
			      var ContractEnd = $(this).find("#WorkNm").attr("ContractEnd");
			              
			      if (Amt.bMToNumber() >  0)
			  	  {
			  	      return { "P01":ContractCode, "P02": SaleYYMM, "P03":Amt, "P04":WorkGugun, "P05":ContractEnd};
			  	  }
	        });
		 	        
	 	    for (var i=0; i<CardArr1.length; i++ )
	 	    {
	 	        	CardArr.push( 
	 				 { 
	 								P01		: CardArr1[i].P01, 	//  게약대상 
	 								P02 	: CardArr1[i].P02,	//  매출년월
	 								P03 	: CardArr1[i].P03,	//  청구금액
	 								P04 	: CardArr1[i].P04,	//  작업구분
	 								P05 	: CardArr1[i].P05,	//  작업구분
	 				 });					
	 	    }
 	        tr.body.list01 = CardArr;
 	        
	        tr.body.P01 = $("#CardDate").text().replace("-","").replace("-","");// 수금일자 
	        tr.body.P02 = $("#CustNm1").val();// 고객코드
	        tr.body.P03 = $("#ChangeAmt").val().bMToNumber().bMToStr();// 청구금액
	        tr.body.P04 = $("#CardNum1").val() + $("#CardNum2").val() +  $("#CardNum3").val() +  $("#CardNum4").val() ;// 카드번호
	        tr.body.P05 = page.Seq;// 수금순번
	        tr.body.P06 = "";// 수금부서
	        tr.body.P07 = page.UserID;// 수금사원
	        tr.body.P08 = "";// 매출부서
	        tr.body.P09 = $("#CardMAMT").val();// 수수료
	        tr.body.P10 = $("#CardYear").val() + $("#CardMonth").val();// 유효기간
	        tr.body.P11 = $("#Installment").val()=="" ? "0": $("#Installment").val();// 할부횟수
	     
			 bizMOB.Web.post({
				  message:tr,
				  success:function(json){
				  if(json.header.result==false){
					     
					  bizMOB.Ui.alert("경고",json.header.error_text);
					  return;
					}
					else {
                              if (json.body.CardApproval.substr(0,1) == "O") 
                              {
                            	  var btnConfirm = bizMOB.Ui.createTextButton("확인", function()
          						        {
          						 			 bizMOB.Web.close(
          									 {
          										 modal : false 
          										
          									 });
          									 
          						        });
                             ipmutil.resetChk();
          					 bizMOB.Ui.confirm("알림", "승인완료", btnConfirm); 
                             
                             }	  
                              else
                              {
                            	  bizMOB.Ui.alert("알림",json.body.CardApproval);
                              }
						  }
				}
		     });
    	
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
				           message:  {Custin : $("#CustNm1").val() ,Pagepath : "page.cardMove"}, //SR번호 넘기기" +
				           width  : "80%",
						   height : "75%",
						});
				}
				else
				{
				   page.custCode  =  json.body.List01[0].R01;
				   $("#CustNm1").val(json.body.List01[0].R01);
				   $("#CustNm").val(json.body.List01[0].R02);
				   $("#CustNm").attr("custcode",page.custCode);
				   
				   $("#CustNm1").hideKeypad();
				   
				   page.SearchInformation();
				}
				
			}
		});
		
	},
	cardMove :function(json){
		page.custCode  =  json.CustCode;
		$("#CustNm").val(json.CustCode);
		$("#CustNm").attr("custcode",json.CustCode);
		$("#CustNm1").val(json.CustCode);
		page.initData(json);
	}
	
    
	
};

function maxLengthCheck(object){
   if (object.value.length > object.maxLength){
    object.value = object.value.slice(0, object.maxLength);
   }    
  }