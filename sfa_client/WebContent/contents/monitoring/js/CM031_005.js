window.cm031005 =
{
	/**
	 * 초기화
	 * @param $target
	 * @param callback
	 */
	init:function($target, callback)
	{
		if ($target.children().length == 0)
		{
			$.get("CM031_005.html", function(data){
				$target.append(data);
				
				$("button[name=improveCamera]").click(function() {
					ipmutil.cameraOn($(this), "imgseqn");
				});
				
				$("#btnResDateShow").click(function() {
					$("#inpResDate").datepicker("show");
				});
				
				cm031005.setComboProbProc();
				cm031005.resetInputControl();
				
				var option = cescommutil.datePickerOption(function(date){
					
					}, "yy-mm-dd"
				);
				$("#inpResDate").datepicker(option);
				
				if(callback) callback();
			});
		}
	},
	/**
	 * 데이터 셋팅
	 * @param json
	 */
	setData:function(json)
	{
		$("#selImprovSuyong").val(json.impSuyong);
		$("#seleImproProc").val(json.impProc);
		$("#inpResDate").datepicker("setDate", json.impResDate);
		$("#txtImproveText").val(json.ipmtext);
		ipmutil.setImg($("button[name=improveCamera][seqn=1]"), json.impImg1, "imgseqn");
		ipmutil.setImg($("button[name=improveCamera][seqn=2]"), json.impImg2, "imgseqn");
	},
	/**
	 * 데이터 가져오기
	 * @returns { impSuyong, impProc, impResDate, ipmtext, impImg1, impImg2 }
	 */
	getData:function()
	{
		var imgSeqn1 = $("button[name=improveCamera][seqn=1]").attr("imgseqn").bMToNumber();
		var imgSeqn2 = $("button[name=improveCamera][seqn=2]").attr("imgseqn").bMToNumber();
		
		return {
			impSuyong	: $("#selImprovSuyong").val(),
			impProc		: $("#seleImproProc").val(),
			impResDate	: $("#inpResDate").val().replace("-", "").replace("-", ""),
			ipmtext		: $("#txtImproveText").val(),
			impImg1		: imgSeqn1,
			impImg2		: imgSeqn2
		};
	},
	/**
	 * 콤보 셋팅
	 * @param callback
	 */
	setComboProbProc:function(callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00001");
		tr.body.Gubun = "A006";
    	tr.body.Type = "1";
		
		cescommutil.getTr(tr, function(json) {

			var detail = 
			[
			 	{type:"single", target:"@value+", value:"Code"}, // 항목명
 			 	{type:"single", target:"", value:"CodeName"} // 항목내용
	        ];
			
			cescommutil.renderLoopList(
				$("#seleImproProc"),
				{
					loopTarget : ".selectItem",
					listName : "list01",
					details : detail,
					isClone : false,
					loopTargetNew : "seleImproProcNew",
					isReplace : false,
				},
				json, 
				function() {
					$("#seleImproProc option:eq(0)").attr("selected", "selected");
					
					if (callback) callback();
				});
		});
	},
	/**
	 * 컨트롤 리셋
	 */
	resetInputControl:function()
	{
		// input 리셋
		$("#txtImproveText").val("");
		
		$("#inpResDate").datepicker("setDate", new Date());
		$("#selImprovSuyong option:eq(0)").attr("selected", "selected");
		$("#seleImproProc option:eq(0)").attr("selected", "selected");
		
		// 카메라 리셋
		$("button[name=improveCamera]").attr("imgseqn", -1);
		$("button[name=improveCamera]").attr("class", "btn_camera");
	}
};