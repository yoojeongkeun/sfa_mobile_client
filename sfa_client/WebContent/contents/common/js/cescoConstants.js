/**
 * @author ehpark@mcnc.co.kr
 * @desc 공통 상수 관리
 */

const CESCO_CONST = {
	
	/* 앱이름 */
	APP_NAME : "CESCO IoT B2C DEV Android",	

	
	/* 페이징  목록요청 수 */	
	REQUEST_LIST_COUNT : 20,	
	
		
	/* DATE FORMAT */
	FORMAT : {
		DATE_TIME : "yyyy.mm.dd HH:nn",
		DATA			: "yyyy.mm.dd",
	},

	/**
	 * 기기타입
	 * */
	DEVICE_TYPE : {
		"EM20010" : { modelName : "IoT 공기질측정기", 							modelImage : "../../common/images/productImages/iaq.png"},
		"PU01852" : { modelName : "IoT 공기질 측정기 PP", 						modelImage : "../../common/images/productImages/iaq.png"},
		"EP21010" : { modelName : "IoT 룸케어 공기청정기(화이트)", 				modelImage : "../../common/images/productImages/room_silver.png"},
		"EP21011" : { modelName : "IoT 룸케어 공기청정기(실버)", 				modelImage : "../../common/images/productImages/room_white.png"},
		"PU01878" : { modelName : "IoT 룸케어 공기청정기(화이트) PP", 			modelImage : "../../common/images/productImages/room_silver.png"},
		"PU01860" : { modelName : "IoT 룸케어 공기청정기(실버) PP", 			modelImage : "../../common/images/productImages/room_white.png"},
		"EP22010" : { modelName : "IoT 공기청정기(실버)",							modelImage : "../../common/images/productImages/iot_silver.png"},
		"EP22011" : { modelName : "IoT 공기청정기(화이트)", 						modelImage : "../../common/images/productImages/iot_white.png"},
		"PU01851" : { modelName : "IoT 공기청정기(화이트) PP", 					modelImage : "../../common/images/productImages/iot_white.png"},
		"EP22110" : { modelName : "IoT 라돈 공기청정기(실버)", 					modelImage : "../../common/images/productImages/iot_silver.png"},
		"EP22111" : { modelName : "IoT 라돈 공기청정기(화이트)", 				modelImage : "../../common/images/productImages/iot_white.png"},
		"EP22210" : { modelName : "IoT 라돈 플러스 공기청정기(실버)",			modelImage : "../../common/images/productImages/iot_silver.png"},
		"EP22211" : { modelName : "IoT 라돈 플러스 공기청정기(화이트)",		modelImage : "../../common/images/productImages/iot_white.png"},
		"PU01859" : { modelName : "IoT 라돈 플러스 공기청정기(실버) PP",		modelImage : "../../common/images/productImages/iot_silver.png"},
		"PU01877" : { modelName : "IoT 라돈 플러스 공기청정기(화이트) PP",	modelImage : "../../common/images/productImages/iot_white.png"},
		"" 			  : { modelName : "자산이 등록되지 않은 장비",					modelImage : "../../common/images/productImages/iot_white.png"}
	},
	
	
	/**
	 * 지수정보
	 * indexName		이름
	 * indexMeasure	단위
	 * stepRange		단계별 범위최대값 [매우나쁨, 나쁨, 보통, 좋음]
	 * stepRangeTxt	단계별 범위
	 * max				최대값
	 * stops				그라데이션위치
	 * */	
	INDEX_ID :
	{					
		"D001" 	: { indexName : "온도", 					icon: " homeIcon06", 	indexMeasure : "℃",			stepRange : [0], 								stepRangeTxtY : [],							stepRangeBgHeight: [], 					stepRangeTxt : ['', '', '', ''],															min: 0,		max : 50,		stops : [0,0,0,1] },
		"D002" 	: { indexName : "습도", 					icon: " homeIcon07", 	indexMeasure : "RH,%",		stepRange : [0], 								stepRangeTxtY : [],							stepRangeBgHeight: [], 					stepRangeTxt : ['', '', '', ''],															min: 0,		max : 100,		stops : [0,0,1,0] },
		"D003" 	: { indexName : "VOC",				 	icon: " homeIcon05", 	indexMeasure : "ppb",		stepRange : [420, 280, 170, 125],		stepRangeTxtY : [32,95,140,168],		stepRangeBgHeight: [63,50,40,17], 		stepRangeTxt : ['600~421', '281~420', '171~280', '125~170'],			min: 125,	max : 600,		stops : [0.2, 0.6, 0.7, 1] },
		"D004" 	: { indexName : "이산화탄소", 			icon: " homeIcon10", 	indexMeasure : "ppm",		stepRange : [2000, 1000, 600, 450], 	stepRangeTxtY : [57,136,160,171],		stepRangeBgHeight: [111,37,14,8], 		stepRangeTxt : ['2001~5000', '1001~2000', '601~1000', '450~600'],	min: 450,	max : 5000,		stops : [0.5, 0.8, 0.9, 1] },
		"D005"	: { indexName : "라돈", 					icon: " homeIcon01", 	indexMeasure : "pCi/L",		stepRange : [4, 2, 1, 0], 					stepRangeTxtY : [50,126,151,168],		stepRangeBgHeight: [101,35,16,17], 	stepRangeTxt : ['4.1~10', '2.1~4.0', '1.1~2.0', '0~1.0'],					min: 0,		max : 10, 		stops : [0.4, 0.7, 0.9, 1] },
//		"D006" 	: { indexName : "극초미세먼지",		icon: " homeIcon02", 	indexMeasure : "Count/L",	stepRange : [100, 50, 15, 0],				stepRangeTxtY : [54,125,156,171],		stepRangeBgHeight: [101,35,23,11], 	stepRangeTxt : ['101~250', '51~100', '50~16', '0~15'],					min: 0,		max : 250,		stops : [0.4, 0.8, 0.9, 1] },
		"D007" 	: { indexName : "극초미세먼지",		icon: " homeIcon02", 	indexMeasure : "㎍/㎥",		stepRange : [100, 50, 15, 0],				stepRangeTxtY : [54,125,156,171],		stepRangeBgHeight: [101,35,23,11], 	stepRangeTxt : ['101~250', '51~100', '50~16', '0~15'],					min: 0,		max : 250,		stops : [0.4, 0.8, 0.9, 1] },
//		"D008" 	: { indexName : "초미세먼지", 			icon: " homeIcon03", 	indexMeasure : "Count/L",	stepRange : [100, 50, 15, 0], 			stepRangeTxtY : [54,125,156,171],		stepRangeBgHeight: [101,35,23,11], 	stepRangeTxt : ['101~250', '51~100', '50~16', '0~15'],					min: 0,		max : 250,		stops : [0.4, 0.8, 0.9, 1] },
		"D009" 	: { indexName : "초미세먼지", 			icon: " homeIcon03", 	indexMeasure : "㎍/㎥",		stepRange : [100, 50, 15, 0], 			stepRangeTxtY : [54,125,156,171],		stepRangeBgHeight: [101,35,23,11], 	stepRangeTxt : ['101~250', '51~100', '50~16', '0~15'],					min: 0,		max : 250,		stops : [0.4, 0.8, 0.9, 1] },
//		"D010" 	: { indexName : "미세먼지", 			icon: " homeIcon04", 	indexMeasure : "Count/L",	stepRange : [150, 80, 30, 0], 			stepRangeTxtY : [60,136,157,171],		stepRangeBgHeight: [117,25,17,11], 	stepRangeTxt : ['150~500', '81~150', '31~80', '0~30'],					min: 0,		max : 500,		stops : [0.5, 0.8, 0.9, 1] },
		"D011" 	: { indexName : "미세먼지", 			icon: " homeIcon04", 	indexMeasure : "㎍/㎥",		stepRange : [150, 80, 30, 0], 			stepRangeTxtY : [60,136,157,171],		stepRangeBgHeight: [117,25,17,11], 	stepRangeTxt : ['150~500', '81~150', '31~80', '0~30'],					min: 0,		max : 500,		stops : [0.5, 0.8, 0.9, 1] },
		"D012" 	: { indexName : "일산화탄소", 			icon: " homeIcon09", 	indexMeasure : "ppm",		stepRange : [0], 								stepRangeTxtY : [],							stepRangeBgHeight: [], 					stepRangeTxt : ['', '', '', ''],															min: 0,		max : 100,		stops : [0,0,0,1] },
		"D013"	: { indexName : "소음", 					icon: " homeIcon08", 	indexMeasure : "dB",			stepRange : [0], 								stepRangeTxtY : [],							stepRangeBgHeight: [], 					stepRangeTxt : ['', '', '', ''],															min: 0,		max : 100,		stops : [0,0,0,1] },
	}
};
