window.cm031003 =
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
			$.get("CM031_003.html", function(data){
				$target.append(data);
				
				// 대표해충 변경 이벤트
				$("#selRegPestListNew").change(function()
				{
					// 대표해충 셋팅 후 진행(대표해충 있을 경우)
					var pestCode = $("#selRegPestListNew").val();
					
					cm031003.setComboReson($("#selReason1"), "selReason1New", pestCode, "", function() {
						// 사유1 콤보 셋팅후 진행
						$("#selReason1New").trigger("change");
					});
					
					cm031003.setComboSolution(pestCode);
				});
				
				// 원인1 변경 이벤트
				$("#selReason1New").change(function()
				{
					var pestCode = $("#selRegPestListNew").val();
					var reason1 = $("#selReason1New").val();
					
					cm031003.setComboReson($("#selReason2"), "selReason2New", pestCode, reason1);
				});
				
				// 시설점검 여부 변경 이벤트
				$("#selCheckProcYN").change(function()
				{
					var yn = cm031003.getCheckYNCheck();
					if (yn == "Y")
						$("button[name=eqip]").parent().show();
					else
						$("button[name=eqip]").parent().hide();
				});

				cm031003.resetControl();
				if(callback) callback();
			});
		}
	},
	/**
	 * 대표해충 셋팅
	 * @param callback
	 */
	setComboStandPest:function(callback)
	{
		cm031002.getPestItemList($("#selRegPestListNew"), $("#selRegPestList"));
		
		// 콜백 이벤트 진행
		if (callback) { callback(); }
	},
	/**
	 * 데이터 리턴
	 * @returns { }
	 */
	getData:function()
	{
		return {
			standardPest : $("#selRegPestListNew").val(),
			reason1      : $("#selReason1New").val(),
			reason2      : $("#selReason2New").val(),
			solution1    : $("#selSolution1New").val(),
			solution2    : $("#selSolution2New").val(),
			solution3    : $("#selSolution3New").val(),
			checkYN      : $("#selCheckProcYN").val()
		};
	},
	/**
	 * 데이터 셋팅
	 * @param json
	 */
	setData:function(json)
	{
		cm031003.setComboStandPest(function(){
			// 콤보 로드후 값 셋팅
			$("#selRegPestListNew").val(json.standardPest);
			
			cm031003.setComboReson($("#selReason1"), "selReason1New", json.standardPest, "", function() {
				// 콤보 로드후 값 셋팅
				$("#selReason1New").val(json.reason1);
				
				cm031003.setComboReson($("#selReason2"), "selReason2New", json.standardPest, json.reason1, function() {
					$("#selReason2New").val(json.reason2);
				});
			});
			
			cm031003.setComboSolution(json.standardPest, function() {
				// 콤보 로드후 값 셋팅
				$("#selSolution1New").val(json.solution1);
				$("#selSolution2New").val(json.solution2);
				$("#selSolution3New").val(json.solution3);
				if (json.checkYN)
					$("#selCheckProcYN").val("Y");
				else
					$("#selCheckProcYN").val("N");
				$("#selCheckProcYN").trigger("change");
			});
			
		});
		
	},
	/**
	 * 원인 콤보 로드
	 * @param $target
	 * @param newTargetName
	 * @param pestCode
	 * @param reason1
	 * @param callback
	 */
	setComboReson:function($target, newTargetName, pestCode, reason1, callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00021");
		tr.body.P01 = pestCode;
		tr.body.P02 = reason1;
		
		cescommutil.getTr(tr, function(json){
			// 성공시 세부발생위치 목록 렌더링
			var detail = 
			[
			 	{type:"single", target:"@value+", value:"R01"}, // 항목명
 			 	{type:"single", target:"", value:"R02"} // 항목내용
	        ];
			
			cescommutil.renderLoopList(
				$target,
				{
					loopTarget : ".selectItem",
					listName : "list01",
					details : detail,
					isClone : true,
					loopTargetNew : newTargetName,
					isReplace : true
				},
				json,
				function() {
					$("#" + newTargetName + " option:eq(0)").attr("selected", "selected");
					if(callback) callback();
				});
		});
	},
	/**
	 * 솔루션 콤보 로드
	 * @param pestCode
	 * @param callback
	 */
	setComboSolution:function(pestCode, callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00022");
		tr.body.P01 = pestCode;
		
		cescommutil.getTr(tr, function(json) {
			// 성공시 세부발생위치 목록 렌더링
			var detail = 
			[
			 	{type:"single", target:"@value+", value:"R01"}, // 항목명
 			 	{type:"single", target:"", value:"R02"} // 항목내용
	        ];
			
			// 솔루션1 렌더
			cescommutil.renderLoopList(
				$("#selSolution1"),
				{
					loopTarget : ".selectItem",
					listName : "list01",
					details : detail,
					isClone : true,
					loopTargetNew : "selSolution1New",
					isReplace : true,
				},
				json,
				function(){ 
					$("#selSolution1New option:eq(0)").attr("selected", "selected");
					
					// 솔루션2 렌더
					cescommutil.renderLoopList(
						$("#selSolution2"),
						{
							loopTarget : ".selectItem",
							listName : "list02",
							details : detail,
							isClone : true,
							loopTargetNew : "selSolution2New",
							isReplace : true,
						},
						json,
						function(){ 
							$("#selSolution2New option:eq(0)").attr("selected", "selected"); 
							
							// 솔루션3 렌더
							cescommutil.renderLoopList(
								$("#selSolution3"),
								{
									loopTarget : ".selectItem",
									listName : "list03",
									details : detail,
									isClone : true,
									loopTargetNew : "selSolution3New",
									isReplace : true,
								},
								json,
								function(){ 
									$("#selSolution3New option:eq(0)").attr("selected", "selected");
									
									// 최종완료 콜백
									if(callback) callback();
								});
						});
				});
		});
	},
	/**
	 * 초기화
	 */
	resetControl:function(callback)
	{
		$("#selCheckProcYN option:eq(0)").attr("selected", "selected");
		$("#selCheckProcYN").trigger("change");
		
		if (callback) callback();
	},
	/**
	 * 시설점검 등록 여부 확인
	 * @returns string
	 */
	getCheckYNCheck:function()
	{
		var yn = $("#selCheckProcYN").val();
		return yn;
	}
};