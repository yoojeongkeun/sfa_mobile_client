/**
 * @author ehpark@mcnc.co.kr
 * @title confirm
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
		$("#lbtn").text(data.lbtnTxt);
		$("#rbtn").text(data.rbtnTxt);
	},

	initInterface : function()
	{
		$("#lbtn").click(function() {
			cescoUtil.windowClose({
				_sType 		: "popup",
				_sCallback 	: "cescoUtil.confirm.lbtn",
			});
		});
		
		$("#rbtn").click(function() {
			cescoUtil.windowClose({
				_sType 		: "popup",
				_sCallback 	: "cescoUtil.confirm.rbtn",
			});
		});
	},

	initLayout : function() 
	{
		cescoTitlebar.none("confirm");
	}
};