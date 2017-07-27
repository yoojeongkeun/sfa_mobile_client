window.cm031001 =
{
	/**
	 * 초기화
	 * @param $target 
	 * 
	 * @param callback
	 */
	init:function($target, callback)
	{
		if ($target.children().length == 0)
		{
			$.get("CM031_001.html", function(data){
				$target.append(data);
				
				$("#txtDetailArea").focusout(function() {
					$("#detailInfoContent .areaName").text($(this).val());
				});
				
				if(callback) callback();
			});
		}
	},
	/**
	 * 상세명 가져오기
	 * @returns string
	 */
	getData:function()
	{
		return $("#txtDetailArea").val();
	},
	/**
	 * 상세명 셋팅
	 * @param strText : 상세명
	 */
	setData:function(strText, callback)
	{
		$("#txtDetailArea").val(strText);
		
		if (callback) callback();
	},
	/**
	 * 
	 */
	aFocusOut:function()
	{
		$("#txtDetailArea").trigger("focusout");
	},
	/**
	 * 리셋
	 */
	resetInputControl:function()
	{
		$("#txtDetailArea").val("");
	}
};