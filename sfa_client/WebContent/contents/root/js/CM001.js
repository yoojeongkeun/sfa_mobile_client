var fadeInOutSpeed = 250; 
var xx = 0;
var isClicked = false;
var that;
var touchDownX;
var touchDownY;

page  =
{		
	init : function(json)
	{	
		page.initInterface();
		page.initData();
		page.initLayout();	
	},
	
	callbackIns : function()
	{
		var url = "market://details?id=" + "net.soti.mobicontrol.samsung.installer"; // 패키지 명

		var v = {

		        call_type:"js2app",

		        id:"RUN_APPLICATION",

		        param:{
		               method : "url",

		               url : {

		                       url : url

		               }
		        }

		};
		
		bizMOB.onFireMessage(v);
	},

	callbackOn : function(json)
	{	
		if(json.result[0].install == true)
		{
			var btnConfirm = bizMOB.Ui.createTextButton("확인", function()
			{   
				page.gotoMain();
			});
    		var btnCancel = bizMOB.Ui.createTextButton("취소", function()
			{
    			return;
    		});
    		page.gotoMain();
    		//bizMOB.Ui.confirm("알림", "모바일 장비 관리 프로그램이 설치되어 있습니다.\n\n7월 31일까지 MobiControl을 삭제해주시기 바랍니다.\n\n※ 삭제메뉴얼은 공지메일을 참고하여 주십시오.", btnConfirm);
		}
		else
		{
			// Push 등록
			page.gotoMain();
		}
		
		
		
	},
	gotoMain: function(){
		ipmutil.pushStart("http://mobile.cesco.biz:8879/push/RegistPushDeviceServlet", $("#user_id").val());
		
		if($('#id_save').is(':checked')) {  //  로그인 아이디 값 저장 체크 
			 bizMOB.Properties.set("ID" ,$("#user_id").val());
		} else {
			bizMOB.Properties.remove("ID");
		}
		
		 
		bizMOB.Web.open("root/html/CM002.html", 
		{ message : 
		    	{
		    	   UserID  :  $("#user_id").val()
		    	},
		  modal:false,
          replace:false 	
            
		}); 
	},
	
	LoginSearch : function()
	{
		if($("#user_id").val()==""){ 
			
			bizMOB.Ui.alert("로그인", "ID를 입력해주세요" );
			return false;
		}
		if($("#user_pw").val()==""){ 
			
			bizMOB.Ui.alert("로그인", "패스워드를 입력해주세요" );
			return false;
		}
		
		
		// 배포 전 풀기 웹 로그인 때문에 적용한 부분
		
		
		page.Login();
		
	},
	
	Login : function()
	{
		 var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00101");
		 var cUsrID  =  $("#user_id").val();
		 tr.body.P02 = $("#user_pw").val();
		 tr.body.P01 = cUsrID;
		 
		 bizMOB.Security.authorize({  // 로그인 인증 
			    userid : $("#user_id").val(),
			    password:$("#user_pw").val(),
			    trcode:"SD00101",
			    message:tr,
				success:function(json){
					if(json.header.result==true){
						
						if (json.body.R01 == "FAKETRUE")
						{		
							// Push 등록
							ipmutil.pushStart("http://mobile.cesco.biz:8879/push/RegistPushDeviceServlet", cUsrID);
												
							if($('#id_save').is(':checked')) {  //  로그인 아이디 값 저장 체크 
								 bizMOB.Properties.set("ID" ,$("#user_id").val());
			    			} else {
			    				bizMOB.Properties.remove("ID");
			    			}
							
							 
							bizMOB.Web.open("root/html/CM002.html", 
									{ message : 
									    	{
									    	   UserID  :  $("#user_id").val()
									    	},
									  modal:false,
							          replace:false 	
							            
									}); 
						
						}else if(json.body.R01 == "TRUE"){
							
							var v = {

							        call_type:"js2app",

							        id:"CHECK_USE_APPLICATION",

							        param:{
					               			   app_id: ["net.soti.mobicontrol"], // 패키지 명
						                       callback:'page.callbackOn'
							               }

							};

							bizMOB.onFireMessage(v);
							
							
							
						}
						else if(json.body.R01 == "FTRUE"){
							return;
						}
						else
						{
							bizMOB.Ui.alert("로그인", json.header.error_text);
							$('#user_pw').focus();
							
						}	
							
					}
					else{
						
						bizMOB.Ui.alert("로그인", json.header.error_text);
						$('#user_pw').focus();
						
					}
				}
		 });
	},
	
	initInterface:function()
	{
		
		$("#appversion").text(bizMOB.Device.Info.app_version);
		
		$("#user_id").click(function(){
			$("#user_id").select();
		});
		if ( bizMOB.Properties.get("ID") != "" &&  bizMOB.Properties.get("ID") != undefined ) // 아이디 저장값 가져오기 
		{
			$("#user_id").val(bizMOB.Properties.get("ID"));
			$("#id_save").attr('checked',true);
		}
		else 
		{
			$("#id_save").attr('checked',false);
		}	

		$(".btn_login").click( function() {
			page.LoginSearch();
		});
		
		$(".btn_login").keyup( function(e) {
            var code = e.which;
			
			if (code  == "13")
			{			
				page.LoginSearch();
			}
		});
		
		$("#user_pw").keyup( function(e) {
			var code = e.which;
			
			if (code  == "13")
			{			
				page.LoginSearch();
			}
					
		});
		
	},
	
	
	initData:function()
	{
		//bizMOB.Network.setSessionTimeout(80);  //  container timeout 설정 15초 
	},
	initLayout:function()
	{
		
	}
};