window.cm031004 =
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
			$.get("CM031_004.html", function(data){
				$target.append(data);
				
				$("#selProbLarge").change(function() {
					var probLarge = $("#selProbLarge").val();
					cm031004.setComboProbMiddle(probLarge);
				});
				
				$("#selCheckStat").change(function() {
					$("#txtImprove").val($(this).children("option:selected").attr("desc").trim());
				});
				
				$("button[name=checkCamera]").click(function() {
					var $target = $(this);
					ipmutil.cameraOn($target, "imgseqn");
				});
				
				cm031004.setComboProbLarge(function() {
					$("#selProbLarge").trigger("change");
				});
				cm031004.setComboCheckStat();
				
				if(callback) callback();
			});
		}
	},
	/**
	 * 데이터 셋팅
	 * @param json { reqNum, probLarge, probMiddle, checkStat, image1, image2, probText, improveText }
	 */
	setData:function(json)
	{
		$("#reqNum").text(json.reqNum);
		$("#selProbLarge").val(json.probLarge);
		cm031004.setComboProbMiddle(json.probLarge, function() {
			$("#selProbMiddleNew").val(json.probMiddle);
		});
		$("#selCheckStat").val(json.checkStat);
		ipmutil.setImg($("button[name=checkCamera][seqn=1]"), json.image1, "imgseqn");
		ipmutil.setImg($("button[name=checkCamera][seqn=2]"), json.image2, "imgseqn");
		$("#txtProb").val(json.probText);
		$("#txtImprove").val(json.improveText);
	},
	/**
	 * 데이터 리턴
	 * @returns { probLarge, probMiddle, checkStat, image1, image2, probText, improveText }
	 */
	getData:function()
	{
		var imgSeqn1 = $("button[name=checkCamera][seqn=1]").attr("imgseqn").bMToNumber();
		var imgSeqn2 = $("button[name=checkCamera][seqn=2]").attr("imgseqn").bMToNumber();
		
		return {
			reqNum : $("#reqNum").text().trim(),
			probLarge : $("#selProbLarge").val(),
			probLargeName : $("#selProbLarge option:selected").text(),
			probMiddle : $("#selProbMiddleNew").val(),
			checkStat : $("#selCheckStat").val(),
			image1 : imgSeqn1,
			image2 : imgSeqn2,
			probText : $("#txtProb").val(),
			improveText : $("#txtImprove").val()
		};
	},
	/**
	 * 문제 유형대 콤보 셋팅 
	 * @param callback
	 */
	setComboProbLarge:function(callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00034");
		
		cescommutil.getTr(tr, function(json){

			var detail = 
			[
			 	{type:"single", target:"@value+", value:"R01"}, // 항목명
 			 	{type:"single", target:"", value:"R02"} // 항목내용
	        ];
			
			cescommutil.renderLoopList(
				$("#selProbLarge"),
				{
					loopTarget : ".selectItem",
					listName : "list01",
					details : detail,
					isClone : false,
					loopTargetNew : "selProbLargeNew",
					isReplace : false,
				},
				json, 
				function() {
					$("#selProbLarge option:eq(0)").attr("selected", "selected");
					
					if(callback) callback();
				});
		});
	},
	/**
	 * 문제 유형중 콤보 셋팅
	 * @param probLarge : 유형대 코드
	 * @param callback
	 */
	setComboProbMiddle:function(probLarge, callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00023");
		tr.body.P01 = probLarge;
		
		cescommutil.getTr(tr, function(json){

			var detail = 
			[
			 	{type:"single", target:"@value+", value:"R01"}, // 항목명
 			 	{type:"single", target:"", value:"R02"} // 항목내용
	        ];
			
			cescommutil.renderLoopList(
				$("#selProbMiddle"),
				{
					loopTarget : ".selectItem",
					listName : "list01",
					details : detail,
					isClone : true,
					loopTargetNew : "selProbMiddleNew",
					isReplace : true,
				},
				json, 
				function() {
					$("#selProbMiddleNew option:eq(0)").attr("selected", "selected");
					if (callback) callback();
				});
		});
	},
	/**
	 * 시설점검 상태 콤보 셋팅
	 * @param callback
	 */
	setComboCheckStat:function(callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00024");
		tr.body.P01 = "";
		
		cescommutil.getTr(tr, function(json){

			var detail = 
			[
			 	{type:"single", target:"@value+", value:"R01"}, // 항목명
 			 	{type:"single", target:"", value:"R02"}, // 항목내용
 			 	{type:"single", target:"@desc+", value:"R03"} // 기타내용
	        ];
			
			cescommutil.renderLoopList(
				$("#selCheckStat"),
				{
					loopTarget : ".selectItem",
					listName : "list01",
					details : detail,
					isClone : false,
					loopTargetNew : "selCheckStatNew",
					isReplace : false,
				},
				json, 
				function() {
					$("#selCheckStat option:eq(0)").attr("selected", "selected");
					$("#selCheckStat").trigger("change");
					if (callback) callback();
				});
		});
	},
	/**
	 * 리셋
	 */
	resetInputData:function()
	{
		// input 리셋
		$("#txtProb").val("");
		$("#txtImprove").val("");
		$("#reqNum").text("");
		
		// 콤보 리셋
		$("#selProbLarge option:eq(0)").attr("selected", "selected");
		$("#selProbLarge").trigger("change");
		$("#selCheckStat option:eq(0)").attr("selected", "selected");
		$("#selCheckStat").trigger("change");
		
		// 카메라 리셋
		$("button[name=checkCamera]").attr("imgseqn", -1);
		$("button[name=checkCamera]").attr("class", "btn_camera");
	}
};