window.cm031002 =
{
	/**** 전역변수 ****/
	isNewPestLoad:false,
	
	/**
	 * 초기화 
	 * @param $target
	 * @param callback
	 */
	init:function($target, callback)
	{
		if ($target.children().length == 0)
		{
			$.get("CM031_002.html", function(data){
				$target.append(data);
				
				// 콤보 바인딩
				cm031002.setComboPest();
				cm031002.setComboState();
				$("#iptPestCount").val(0);
				
				$("#test").click(function() {
					$("#selReason1New").val("A006");
				});
				
				// 해충수량 체크(숫자만 입력 받기) 이벤트
				$("#iptPestCount").keypress(function(e) {
					if (e.which && (e.which  > 47 && e.which  < 58 || e.which == 8)){ }
					else
					{
						e.preventDefault();
					}
				});
				
				// 해충상세 클릭 이벤트
				$("#pestListNew").delegate(".pestListDetail", "click", function() {
					// 항목 디자인 셋팅
					page.setListOnClass($("#pestListNew .pestListDetail"), $(this), "bg02");
					
					cm031002.selectPest($(this));
				});
				
				// 해충수량창 클릭시 선택하기
				$("#iptPestCount").click(function() {
					$(this).select();
				});

				
				// 버튼 클릭 이벤트
				$("div .btnlist .pest").click(function() {
					switch ($(this).attr("name"))
					{
						case "add": // 새해충
							$("#pestListNew .pestListDetail").removeClass("bg02");
							cm031002.addPest();
							break;
						case "del": // 해충 삭제
							cm031002.deletePest();
							break;
						case "reg": // 해충 등록
							cm031002.registerPest();
							break;
					}
				});
				
				$("#pestList").hide();
				
				if(callback) callback();
			});
		}
	},
	/**
	 * 데이터 가져오기
	 * @returns {Array}
	 */
	getPestList:function()
	{
		// 해충 상세 배열에 담기
		var pList = new Array();
		var $listTemp = $("#pestListNew .pestListDetail");
		
		$.each($listTemp, function() {
			pList.push({
				P01 : $(this).find(".seqn").text().toString().bMToNumber(), // 순번
				P02 : $(this).find(".pestName").attr("code").toString(), // 해충코드
				P03 : $(this).find(".pestCount").attr("value").toString().bMToNumber(), // 모니터링수량
				P04 : $(this).find(".pestType").attr("code").toString(), // 모니터링상태
				P05 : $(this).attr("rowstate").toString() // row상태
			});
		});
		
		return pList;
	},
	/**
	 * 리스트 셋팅 json : CM03103 전문 결과 json
	 * @param json
	 */
	setPestList:function(json, callback)
	{
		if (cescommutil.isEmpty(json)) return;
		var detail = 
		[
		 	{type:"single", target:".seqn", value:"R01"},
		 	{type:"single", target:".pestName", value:"R03"},
		 	{type:"single", target:".pestName@code+", value:"R02"},
		 	{type:"single", target:".pestType", value:"R05"},
		 	{type:"single", target:".pestType@code+", value:"R04"},
		 	{type:"single", target:".pestCount", value:function(arg){
		 		return arg.item.R06.toString().bMToNumber().toString().bMToCommaNumber();
		 	}},
		 	{type:"single", target:".pestCount@value+", value:function(arg){
		 		return arg.item.R06.toString().bMToNumber();
		 	}}
        ];
		
		cescommutil.renderLoopList(
			$("#pestList"),
			{
				loopTarget : ".pestListDetail",
				listName : "L01",
				details : detail,
				isClone : true,
				loopTargetNew : "pestListNew",
				isReplace : true,
			},
			json,
			function(){
				cm031002.isNewPestLoad = true;
				if (callback) callback();
			});
	},
	/**
	 * 해충 콤보박스 셋팅
	 * @param callback
	 */
	setComboPest:function(callback)
	{			
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM04001");
		cescommutil.getTr(tr, function(json){
			// 성공시 세부발생위치 목록 렌더링
			var detail = 
			[
			 	{type:"single", target:"@value+", value:"R01"}, // 항목명
 			 	{type:"single", target:"", value:"R02"} // 항목내용
	        ];
			
			cescommutil.renderLoopList(
				$("#selPestList"),
				{
					loopTarget : ".selectItem",
					listName : "LIST",
					details : detail,
					isClone : false,
					loopTargetNew : "selPestList",
					isReplace : false,
				},
				json, callback);
			
			$("#selPestList option:eq(0)").attr("selected", "selected");
		});
	},
	/**
	 * 상태 콤보박스 셋팅
	 * @param callback
	 */
	setComboState:function(callback)
	{			
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00014");
		
		cescommutil.getTr(tr, function(json){
			// 성공시 세부발생위치 목록 렌더링
			var detail = 
			[
			 	{type:"single", target:"@value+", value:"R01"}, // 항목명
 			 	{type:"single", target:"", value:"R02"} // 항목내용
	        ];
			
			cescommutil.renderLoopList(
				$("#selSetateList"),
				{
					loopTarget : ".selectItem",
					listName : "L01",
					details : detail,
					isClone : false,
					loopTargetNew : "selSetateList",
					isReplace : false,
				},
				json, callback);
			
			$("#selSetateList option:eq(0)").attr("selected", "selected");
			
		});
	},
	/**
	 * 입력 컨트롤 리셋 (로딩중엔 로드하지 마세요.)
	 */
	resetInputControl:function()
	{
		$("#selPestList option:eq(0)").attr("selected", "selected");
		$("#selPestList").removeAttr("disabled");
		$("#selSetateList option:eq(0)").attr("selected", "selected");
		$("#iptPestCount").val(0);
	},
	/**
	 * 전체 리셋 (로딩중엔 로드하지 마세요.)
	 */
	resetAll:function(callback)
	{
		$("#pestListNew").empty();
		cm031002.json = { };
		cm031002.resetInputControl();
		
		if (callback) callback();
	},
	/**
	 * 새 해충
	 */
	addPest:function()
	{
		cm031002.resetInputControl();
	},
	/**
	 * 해충 삭제
	 */
	deletePest:function()
	{
		var json = cm031003.getData();
		var pestCode = $("#pestListNew .bg02").find(".pestName").attr("code");
		
		if (json.standardPest == pestCode)
		{
			bizMOB.Ui.alert("대표해충으로 등록된 해충은 삭제할 수 없습니다.");
			return;
		}
		
		if ($("#detailInfoContent .unitseq").text().length == 0)
		{
			$("#pestListNew .bg02").remove();
		}
		else
		{
			$("#pestListNew .bg02").attr("rowstate", "D");
			$("#pestListNew .bg02").hide();
			$("#pestListNew .pestListDetail").removeClass("bg02");
		}
		
		cm031002.resetInputControl();
		cm031002.isNewPestLoad = true;
	},
	/**
	 * 해충 등록
	 */
	registerPest:function()
	{
		var pestCount = $("#iptPestCount").val().toString();
		
		// 마리수가 올바른지 확인
		if (!jQuery.isNumeric(pestCount))
		{
			bizMOB.Ui.alert("마리수가 올바른 숫자가 아닙니다.");
			return;
		}
		
		var seqn = $("#tbdPestDetail").attr("seqn");
		var pestCode = $("#selPestList option:selected").val();
		var pestName = $("#selPestList option:selected").text();
		var pestTypeName = $("#selSetateList option:selected").text();
		var pestTypeCode = $("#selSetateList option:selected").val();
		var $list = $("#pestListNew .bg02");
		
		if($list.length == 0)
		{
			// 새로운 항목 넣기
			$list = $("#pestList .pestListDetail").clone();
			$("#pestListNew").append($list);
			seqn = "";
		}
		
		$list.find(".seqn").text(seqn);
		$list.find(".pestName").text(pestName);
		$list.find(".pestName").attr("code", pestCode);
		$list.find(".pestType").text(pestTypeName);
		$list.find(".pestType").attr("code", pestTypeCode);
		$list.find(".pestCount").attr("value", parseInt(pestCount, 10));
		$list.find(".pestCount").text(pestCount.bMToCommaNumber());
		
		cm031002.resetInputControl();
		cm031002.isNewPestLoad = true;
	},
	/**
	 * 해충 선택
	 * @param $selection
	 */
	selectPest:function($selection)
	{
		$("#tbdPestDetail").attr("seqn", $selection.find(".seqn").text());
		$("#selPestList").val($selection.find(".pestName").attr("code"));
		$("#selSetateList").val($selection.find(".pestType").attr("code"));
		$("#iptPestCount").val($selection.find(".pestCount").attr("value"));
		
		$("#selPestList").attr("disabled", "disabled");
	},
	/**
	 * 해충 목록
	 * @param $targetCombo
	 * @param $target
	 */
	getPestItemList:function($targetCombo, $target)
	{
		$targetCombo.empty();
		var $list = $("#pestListNew .pestListDetail").not($("#pestListNew .pestListDetail[rowstate=D]")).find(".pestName");
		$.each($list, function() {
			var code = $(this).attr("code");
			
			// 해당 코드가 있으면 넘김
			if ($targetCombo.find(".selectItem[value=" + code + "]").length == 0)
			{
				// 값을 콤보박스에 넣음
				var $item = $target.find(".selectItem").clone();
				$item.text($(this).text());
				$item.val(code);
				$targetCombo.append($item);
			}			
		});
		
		$("#pestListNew option:eq(0)").attr("selected", "selected");
		cm031002.isNewPestLoad = false;
	},
	/**
	 * 등록된 해충 목록 수
	 * @returns int
	 */
	getPestListCount:function()
	{
		return $("#pestListNew .pestListDetail").length;
	}
};