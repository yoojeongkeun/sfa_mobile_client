/**
 * 위생점검 리스트
 */
page  =
{
	pageTitle: "",
    sqmlType: "",
    sqmList: [],
    /**
     * 최초 진입점
     * @param json : 전화면에서 넘겨진 데이터
     */
    init:function(json)
    {
        page.initInterface();
        page.initData(json);
        page.initLayout();
        
        $('.bxslider').bxSlider(
		{
			slideWidth: 500,
			slideHigth: 500,
			pager : false,
			touchEnabled: false
		});
    },
    /**
     * UI 셋팅
     */
    initInterface:function()
    {	
   
    },
    /**
     * 데이터 셋팅
     * @param json : 전 화면에서 넘겨진 데이터
     */
    initData:function(json)
    {
    	
    },
    /**
     * 레이아웃 셋팅
     */
    initLayout:function()
    {    	
    	var titlebar = new bizMOB.Ui.TitleBar("upDown Button"); 
		titlebar.visible = false;
		var layout = bizMOB.Ui.createPageLayout();  
		layout.setTitleBar(titlebar);
		bizMOB.Ui.displayView(layout); 
    }
};