/**
 * @author ehpark@mcnc.co.kr
 * @desc 타이틀바
 */


(function($, undefined)
{

	window.cescoTitlebar = new cescoTitlebar();
	
	function cescoTitlebar(){
		
		this.APP_IMAGE_PATH = "common/images/app/";
		
		this.titlebar = {
				element_type 	: "Bar",
				element_name : "titlebar",
				visible 			: true,
				left 				: [],
				right				: [],
				title 				: "",
				image_name	: this.APP_IMAGE_PATH+"top_bg.png",
				font_name 		: "CESCO R",
		};
						
		this.btnMenu = bizMOB.Window.createElement({ _sElementName:"ImageButton" });
		this.btnMenu.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_menu_air.png", 
			_fCallback 		: function() 
			{
				cescoUtil.openSlideMenu();
			}
		});
		
		this.btnMain = bizMOB.Window.createElement({ _sElementName:"ImageButton" });
		this.btnMain.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_home.png", 
			_fCallback 		: function()
			{
				cescoUtil.backToMain();
			}
		});		

		this.btnBack = bizMOB.Window.createElement({ _sElementName:"ImageButton" });
		this.btnBack.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_back.png", 
			_fCallback 		: function()
			{
				cescoUtil.windowClose({});
			}
		});
		
		this.btnClose = bizMOB.Window.createElement({ _sElementName:"ImageButton" });
		this.btnClose.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_close.png", 
			_fCallback 		: function()
			{
				cescoUtil.windowClose({});
			}
		});	
		
		this.btnCancel = bizMOB.Window.createElement({ _sElementName:"ImageButton" });
		this.btnCancel.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_cancel.png", 
			_fCallback 		: function()
			{
				page.titlebar_btnCancel();
			}
		});	
		
		this.btnCancelIns = bizMOB.Window.createElement({ _sElementName:"ImageButton" });
		this.btnCancelIns.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_cancel.png", 
			_fCallback 		: function()
			{
				cescoUtil.confirm.show({
					txtHtml : "지금까지 진행한 모든 설치과정이취소됩니다.<br/>취소하시겠습니까?",
					lbtnTxt : "아니요",
					lCallback : function() {},
					rbtnTxt : "네",
					rCallback : function() {
						cescoUtil.windowClose({});
					}
				});	
			}
		});
		
		this.btnDelete = bizMOB.Window.createElement({ _sElementName:"ImageButton" });
		this.btnDelete.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_delete.png", 
			_fCallback 		: function()
			{
				page.titlebar_btnDelete();		
			}
		});	
	};
	
	/**
	 * [back, none] titlebar
	 * @param {String} title title
	 * @param {Function} backButtonCallback back버튼 콜백 
	 */
	cescoTitlebar.prototype.setBackBtnTitleBar = function(title, backButtonCallback) {
		
		var btnLeft = this.btnBack;
		btnLeft.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_back.png",
			_fCallback 		: function()
			{
				if (backButtonCallback) { backButtonCallback(); }
				else { cescoUtil.windowClose({}); }
			}
		});
				
		
		this.titlebar.title 		= title;
		this.titlebar.left[0]	=  btnLeft;	
		
		bizMOB.Util.callPlugIn("SET_APP", {titlebar : this.titlebar});
	};	
	
	/**
	 * [back, main] titlebar
	 * @param {String} title title
	 * @param {Function} backButtonCallback back버튼 콜백
	 */
	cescoTitlebar.prototype.setBackMainBtnTitleBar = function(title, backButtonCallback) 
	{
		var btnLeft = this.btnBack;
		btnLeft.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_back.png",
			_fCallback 		: function()
			{
				if (backButtonCallback) { backButtonCallback(); }
				else { cescoUtil.windowClose({}); }
			}
		});
		var btnRight = this.btnMain;
				
		
		this.titlebar.title 		= title;
		this.titlebar.left[0]	=  btnLeft;	
		this.titlebar.right[0]	=  btnRight;	
		
		bizMOB.Util.callPlugIn("SET_APP", {titlebar : this.titlebar});
	};
	
	/**설치하기 타이틀바
	 * [back, cancel] titlebar
	 * @param {String} title title
	 * @param {Function} backButtonCallback back버튼 콜백
	 */
	cescoTitlebar.prototype.setInsTitleBar = function(title, backButtonCallback) 
	{
		/*var btnLeft = this.btnBack;
		btnLeft.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_back.png",
			_fCallback 		: function()
			{
				if (backButtonCallback) { backButtonCallback(); }
				else { cescoUtil.windowClose({}); }
			}
		});
		var btnRight = this.btnCancelIns;
		
		
		this.titlebar.title 		= title;
		this.titlebar.left[0]	=  btnLeft;	
		this.titlebar.right[0]	=  btnRight;	
		
		bizMOB.Util.callPlugIn("SET_APP", {titlebar : this.titlebar});*/
	};
	
	/**
	 * [back, cancel] titlebar
	 * @param {String} title title
	 * @param {Function} backButtonCallback back버튼 콜백
	 */
	cescoTitlebar.prototype.setBackCancelBtnTitleBar = function(title, backButtonCallback) 
	{
		var btnLeft = this.btnBack;
		btnLeft.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_back.png",
			_fCallback 		: function()
			{
				if (backButtonCallback) { backButtonCallback(); }
				else { cescoUtil.windowClose({}); }
			}
		});
		var btnRight = this.btnCancel;
		
		
		this.titlebar.title 		= title;
		this.titlebar.left[0]	=  btnLeft;	
		this.titlebar.right[0]	=  btnRight;	
		
		bizMOB.Util.callPlugIn("SET_APP", {titlebar : this.titlebar});
	};
	
	/**
	 * [back, delete] titlebar
	 * @param {String} title title
	 * @param {Function} backButtonCallback back버튼 콜백
	 */
	cescoTitlebar.prototype.setBackDeleteBtnTitleBar = function(title, backButtonCallback) 
	{
		var btnLeft = this.btnBack;
		btnLeft.setProperty({
			_sImagePath 	: this.APP_IMAGE_PATH+"ico_title_back.png",
			_fCallback 		: function()
			{
				if (backButtonCallback) { backButtonCallback(); }
				else { cescoUtil.windowClose({}); }
			}
		});
		var btnRight = this.btnDelete;
		
		
		this.titlebar.title 		= title;
		this.titlebar.left[0]	=  btnLeft;	
		this.titlebar.right[0]	=  btnRight;	
		
		bizMOB.Util.callPlugIn("SET_APP", {titlebar : this.titlebar});
	};
	
	/**
	 * [none, close] titlebar
	 * @param {String} title title
	 */
	cescoTitlebar.prototype.setCloseBtnTitleBar = function(title) {
		
		this.titlebar.title 		= title;
		this.titlebar.right[0]	=  this.btnClose;	
		
		bizMOB.Util.callPlugIn("SET_APP", {titlebar : this.titlebar});
	};
		
	/**
	 * [none, none] none
	 * @return {bizMOBCore.Window.TitleBar} titlebar
	 */
	cescoTitlebar.prototype.none = function(title) {
		var titlebar = bizMOB.Window.createTitleBar();
		titlebar.setProperty({
			_sTitle	: title,
			_bVisible	: false
		});
		bizMOB.Window.draw({
			_aElement : [titlebar]
		});
	};
	
})(jQuery, undefined);

