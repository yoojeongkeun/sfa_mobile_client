/**
 * CESCO COMMON UTIL
 */
window.cescommutil = 
{
	/**
	 * datepicker option (기본
	 * @param callback : 선택이 완료되었을때 이벤트
	 * @param format : 날짜 형식 (yy-mm-dd)
	 * @returns { option }
	 */
	datePickerOption:function(callback, format)
	{
		var dateFormat = "yy-mm-dd";
		if(format) dateFormat = format;
		var option = 
		{
    		showButtonPanel    : true,
			changeMonth        : true,
			changeYear         : true,
			minDate            : "-500y",
			yearRange          : "c-15:c+15",
			currentText        : "오늘",
			dateFormat         : dateFormat,
			defaultDate        : new Date(),
			prevText           : "전월",
			nextText           : "다음월",
			monthNames         : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
			monthNamesShort    : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
			dayNames           : ["일","월","화","수","목","금","토"],
			dayNamesMin        : ["일","월","화","수","목","금","토"],
			closeText          : "닫기" ,
			showMonthAfterYear : true,
			onSelect		   : callback
    	    //buttonImageOnly: true
		};
		
		return option;
	},
	/**
	 * 빈값 확인 빈값일 경우 true 리턴
	 * @param value
	 * @returns {Boolean}
	 */
	isEmpty:function(value)
	{
		if (value != null && value != undefined)
			return false;
		else
			return true;
	},
	/**
	 * 전문통신 (실패시 자동으로 메시지 리턴)
	 * @param tr : 전문
	 * @param trueFunction : 성공시 callback
	 */
	getTr:function(tr, trueFunction)
	{
		bizMOB.Web.post(
		{
			message : tr,
			success : function(json) {
				if (json.header.result == true)
				{
					if(trueFunction) trueFunction(json);
				}
				else 
					bizMOB.Ui.alert("전문 접속 오류", json.header.error_text);
			}
		});
	},
	/**
	 * 전문통신 실패 펑션 포함!
	 * @param tr : 전문
	 * @param trueFunction : 성공시 callback
	 * @param falseFunction : 실패시 callback
	 */
	getTr2:function(tr, trueFunction, falseFunction)
	{
		bizMOB.Web.post(
		{
			message : tr,
			success : function(json) {
				if (json.header.result == true)
				{
					if(trueFunction) trueFunction(json);
				}
				else 
				{
					if(falseFunction) falseFunction(json);
				}
			}
		});
	},
	/**
	 * 공통 렌더 { type, target, listName }
	 * @param $target : 렌더링 타겟
	 * @param detail : 상세 바인딩 셋팅
	 * @param json : 데이터
	 * @param callback : 완료 후 callback 함수
	 */
	renderLoopList:function($target, detail, json, callback)
	{
		var dir = 
		[
		 	{
		 		type	: "loop",
		 		target	: detail.loopTarget,
		 		value	: detail.listName,
		 		detail	: detail.details
		 	}
		];
			
		$target.bMRender(json.body, dir, 
		{ 
			clone:detail.isClone,
			newId: detail.loopTargetNew,
			replace:detail.isReplace 
		});
		
		if (callback) callback();
	}
};
