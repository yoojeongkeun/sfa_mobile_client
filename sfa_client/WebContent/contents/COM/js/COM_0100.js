/**
 * @author ehpark@mcnc.co.kr
 * @title alert
 */

var page = {

	init : function(event) {
		page.initInterface();
		page.initData(event);
		page.initLayout();
	},

	initData : function(data)
	{
		//알림메시지 text
		$("#message").html(data.txtHtml);
		
		//버튼 text
		$("#obtn").text(data.btnTxt);
	},

	initInterface : function()
	{
		$("#obtn").click(function() {
			cescoUtil.windowClose({
				_sType 		: "popup",
				_sCallback	: "cescoUtil.alert.obtn",
			});
		});
	},

	initLayout : function() 
	{
		cescoTitlebar.none("alert");
	}
};