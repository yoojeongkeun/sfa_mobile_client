window.fsutil = {
  getDefaultLayout:function(titleName)
  {
      var titlebar = new bizMOB.Ui.TitleBar(titleName); 
      titlebar.setBackGroundImage("common/images/bg_header.jpg");
      titlebar.setTopLeft(bizMOB.Ui.createBackButton("common/images/btn_back.png"));
      
      titlebar.setVisible(true);

      var toolbar = new bizMOB.Ui.ToolBar();

      toolbar.setBackGroundImage("common/images/bg_footer.jpg");

      var btnHome = bizMOB.Ui.createHomeButton("common/images/bottom_01.jpg");
      var btnService = bizMOB.Ui.createButton({
          button_text : "서비스일정", 
          image_name : "common/images/bottom_02.jpg", 
          listener : function() {
              
              bizMOB.Web.open("service/html/FSM0005.html", {
              modal : false,
              replace : false,
              message : 
              {
              }
          });
          }
      });
      var btnGroupWare = bizMOB.Ui.createButton({
          button_text : "CESCO", 
          image_name : "common/images/bottom_03.jpg",  
          listener : function() {
        	  bizMOB.Ui.alert("알림","서비스 준비중입니다.");   
          }
      });
      var btnWebSite = bizMOB.Ui.createButton({
          button_text : "MobileWeb", 
          image_name : "common/images/bottom_04.jpg", 
          listener : function() {
        	  
        	  bizMOB.Ui.alert("알림","서비스 준비중입니다.");
              
          }
      });
      var btnLogOut = bizMOB.Ui.createLogoutButton("common/images/bottom_05.jpg");
      var btns = new Array();
      btns.push(btnHome);
      btns.push(btnService);
      btns.push(btnGroupWare);
      btns.push(btnWebSite);
      btns.push(btnLogOut);
      toolbar.setButtons(btns);

      toolbar.setVisible(true);

      var layout = new bizMOB.Ui.PageLayout();
      layout.setTitleBar(titlebar);
      layout.setToolbar(toolbar);
      
      return layout;
  },
  setDefaultLayout:function(titleName)
  {
      var layout = fsutil.getDefaultLayout(titleName);
      bizMOB.Ui.displayView(layout);
  },
  
  /**
	 * Push 시작 function
	 * @param url
	 * @param userId
	 * @description Android만 실행됨.
	 */
	pushStart:function(url,userId)
	{
		var v = {
					call_type:"js2app",
					id:"PUSH_REGISTRATION",
					param:{
							type:"push", // push or bizpush, 아이맘의 경우 bizpush 만 되도록 구현.
							url : url, // 푸쉬 컨텍스트루트까지 입력 
							user_id:userId, 
		                    //product_id:"894887807839" // android only 
							product_id:"633777499356" // android only 
					} 
			};

		bizMOB.onFireMessage(v);
		return;	
		
		
	}
  
};