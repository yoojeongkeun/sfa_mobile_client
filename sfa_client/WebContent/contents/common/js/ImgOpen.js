page  =
{
	/**
	 * 
	 * @param json : (imgsrc, subject)
	 */
	init : function(json)
	{	
		// 기본 설정값
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	/**
	 * 
	 */
	initInterface:function()
	{ 
		$("#btnComplete").click(function() {
			bizMOB.Web.close(
					{
						modal : false
					});
		});
	},
	/**
	 * 
	 * @param json
	 */
	initData:function(json)
	{
		if (ipmutil.isNull(json).length != 0)
		{
			$("#image").attr("src", json.imgsrc);
			$(".imgSubject").text(json.subject);
		}
	},
	/**
	 * 
	 */
	initLayout:function()
	{
		var titlebar = new bizMOB.Ui.TitleBar("이미지 보기");
		titlebar.setVisible(false);
		var layout = new bizMOB.Ui.PageLayout();
		layout.setTitleBar(titlebar);
		bizMOB.Ui.displayView(layout);
	}
};