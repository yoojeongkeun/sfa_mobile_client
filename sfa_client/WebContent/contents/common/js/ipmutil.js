/**
 * 
 * ############### 세스코 웹 공용 펑션 #####################
 * 
 * 작성자 확실히 할것!!!!!!!!!!!!!!!!!!!!!
 * 주석은 꼭 작성할것!!!!!!!!!!!!!!!!!!!!!
 */
window.ipmutil = {
	/**
	 * ??????
	 * 작성자 :
	 *  
	 * @param titleName
	 * @returns {bizMOB.Ui.PageLayout}
	 */
	getDefaultLayout : function(titleName) {
		var titlebar = new bizMOB.Ui.TitleBar(titleName);
		titlebar.setBackGroundImage("common/images/bg_titlebar.png");
		titlebar.setTopLeft(bizMOB.Ui
				.createBackButton("common/images/top_icon_back.png"));

		titlebar.setVisible(true);

		var layout = new bizMOB.Ui.PageLayout();
		layout.setTitleBar(titlebar);

		return layout;
	},
	CustInfo:
	{
    	custCode 	: "",
    	custNm		: "",
    	workDt 		: ""
	},
	/**
	 * ???????
	 * 작성자 : 
	 * 
	 * @param titleName
	 */
	setDefaultLayout : function(titleName) {
		var layout = ipmutil.getDefaultLayout(titleName);
		bizMOB.Ui.displayView(layout);
	},
	/**
	 * ???????
	 * 작성자 : 
	 * 
	 * @param titleName
	 * @returns {bizMOB.Ui.PageLayout}
	 */
	getCheckBackButtonLayout:function(titleName)
	{
		var titlebar = new bizMOB.Ui.TitleBar(titleName); 
		titlebar.setBackGroundImage("common/images/bg_titlebar.png");
		titlebar.setTopLeft(bizMOB.Ui.createButton({ button_text : "뒤로가기", image_name : "common/images/top_icon_back.png", listener : function() {
			onClickAndroidBackButton();
		}}));
		titlebar.setVisible(true);
		
		var layout = new bizMOB.Ui.PageLayout();
		layout.setTitleBar(titlebar);
		  
		return layout;
	},
	/**
	 * Push 시작 function
	 * 
	 * @param url
	 * @param userId
	 * @description Android만 실행됨.
	 */
	pushStart : function(url, userId)
	{
		var v = {
			call_type : "js2app",
			id : "PUSH_REGISTRATION",
			param : {
				type : "push", // push or bizpush, 아이맘의 경우 bizpush 만 되도록 구현.
				url : url, // 푸쉬 컨텍스트루트까지 입력
				user_id : userId,
				// product_id:"894887807839" // android only
				product_id : "633777499356" // android only
			}
		};

		bizMOB.onFireMessage(v);
		return;

	},
	/**
	 * IsNull 체크
	 * 
	 * @param value       : 체크할 값
	 * @param nullIsValue : null, undefined 일 경우 리턴값
	 * @returns
	 */
	isNull : function(value, nullIsValue) 
	{
		if (value == null || value == undefined)
			return nullIsValue;
		else
			return value;
	},
	/**
	 * Null Check
	 * @param value : 체크하려는 값
	 * @returns {Boolean}
	 */
	isNullValueCheck:function(value)
	{
		if (value == null || value == undefined)
			return true;
		else
			return false;
	},
	/**
	 * 이미지 있을때 버튼 클래스 이름
	 */
	imgOnClassName : "btn_gallery",
	/**
	 * 이미지 없을때 버튼 클래스 이름
	 */
	imgOffClassName : "btn_camera",
	/**
	 * 사진 셋팅 (카메라 버튼)
	 * 
	 * @param $cameraTarget : 카메라버튼
	 * @param imgseqn       : 이미지 번호
	 * @param attrName      : 이미지 번호가 들어갈 속성 이름
	 */
	setImg : function($cameraTarget, imgseqn, attrName)
	{
		// btn_gallery / btn_camera
		var imgNum = imgseqn.toString().bMToNumber();
		$cameraTarget.attr(attrName, imgNum);
		if (imgNum > 0) {
			// 이미지가 있을때
			$cameraTarget.removeClass(ipmutil.imgOffClassName);
			$cameraTarget.addClass(ipmutil.imgOnClassName);
		} else {
			// 이미지가 없을때
			$cameraTarget.removeClass(ipmutil.imgOnClassName);
			$cameraTarget.addClass(ipmutil.imgOffClassName);
		}
	},
	
	/**
	 * 카메라 구동(버튼 클릭 이벤트에 연동)
	 * 
	 * @param $cameraTarget : 카메라버튼
	 * @param attrName      : 이미지 번호가 들어갈 속성 이름
	 */
	cameraOn : function($cameraTarget, attrName)
	{
		if ($cameraTarget.hasClass(ipmutil.imgOnClassName)) {
			// 이미지가 있을때
			var btnReShoot = bizMOB.Ui.createTextButton("재 촬영", function() {
				ImgUtil.shoot("ipm", "shoot_temp", function(data) {
					ipmutil.setImg($cameraTarget, data, attrName);
				}); 
			});

			var btnImgView = bizMOB.Ui.createTextButton("사진보기", function() {
				var imgSeqn = $cameraTarget.attr(attrName).toString().bMToNumber();
				ImgUtil.imageView(imgSeqn);
			});

			bizMOB.Ui.confirm("알림", "사진 재촬영 여부", btnReShoot, btnImgView);
		} else {
			// 이미지가 없을때
			ImgUtil.shoot("ipm", "test", function(data) {
				ipmutil.setImg($cameraTarget, data, attrName);
			});
		}
	},
	
	barcodeMove: function(barcodeNum, custCode, workDate, srNum){
		
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM06201");
	
		//barcodeNum = 'C1009191209110526';// 운영시 삭제해야 함 and 바코드 첫 자리에 영문자가 오는지 확인해야 함
    	tr.body.P01 = barcodeNum;
		
		
    	bizMOB.Web.post({
    		message:tr,
    		success:function(json){
    			if(json.header.result==false){
    				bizMOB.Ui.alert("조회내역", json.header.error_text );
    			}
				else {
					//Mouse Trap ThunderBlue Insect General
					
					switch(json.body.R22){
						case "General" :
							page.barcodeOpen("37", barcodeNum, custCode, workDate, srNum); // 30							
							break;
						case "Insect" :
							page.barcodeOpen("33", barcodeNum, custCode, workDate, srNum);
							break;
						case "Mouse" :
							page.barcodeOpen("37", barcodeNum, custCode, workDate, srNum);
							break;
						case "Trap" :
							page.barcodeOpen("43", barcodeNum, custCode, workDate, srNum);
							break;
						case "ThunderBlue" :
							page.barcodeOpen("46", barcodeNum, custCode, workDate, srNum);
							break;							
						default:
							bizMOB.Ui.alert("구분이 잘못된 바코드입니다.");
							break;
					}
				}
			}
		});
	},
	
	barcodeOpen: function(pageNum, barcodeNum, custCode, workDate, srNum){
		bizMOB.Web.open("monitoring/html/CM0" + pageNum + ".html", {
			modal : false,
			replace : false,
			message: {
				custCode: custCode,
				custName: "",
				AsstNum: barcodeNum,
				workDate: workDate,
				srNumber: srNum
			}
		});
	},
	
	/**
	 * 전체 selection 된 내역 이벤트 먹이기
	 * 작성자 : 조선호
	 * 
	 * @param docu :
	 *            document
	 * @param jqueryString :
	 *            selection string
	 * @param event :
	 *            이벤트 네임(ex:click)
	 */
	/**
	 * Input Box Selection Option
	 */
	setAllSelect : function(docu, jqueryString, event) {
		$(docu).delegate(jqueryString, event, function() {
			if($(this).val() != "")
			{
				$(this).select();
			}
			$(this).keyup(function() {
				bizMOB.Storage.save("inputcheck", "1");
			});
			$(this).change(function() {
				bizMOB.Storage.save("inputcheck", "1");
			});
		});
	},
	/**
	 * 전체메뉴에서 페이지 이동
	 * 작성자 : 
	 * 
	 * @param UserName : 
	 * @param custCode : 
	 * @param custName : 
	 * @param UserID   : 
	 * @param deptName : 
	 * @param deptCode : 
	 */
	ipmMenuMove : function(UserName, custCode, custName, UserID, deptName, deptCode) {

		$("#_submain").hide();
		
		$("#bottomCommonMenu").delegate(".btn_logout", "click", function() {
			var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
				bizMOB.Native.exit();
			});

			var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
				return;
			});
			bizMOB.Ui.confirm("메인종료", "로그아웃 하시겠습니까?", btnConfirm, btnCancel);
		});

		$("#bottomCommonMenu").delegate("#_submain", "click", function() {
			$("#_menuf").animate({
				left : -400
			}, 500, function() {
				$("#_submain").hide();
			});
		});

		$("#bottomCommonMenu").delegate(".btn_close", "click", function() {
			$("#_menuf").animate({
				left : -400
			}, 500, function() {
				$("#_submain").hide();
			});
		});

		$("#bottomCommonMenu").delegate(
				"#_sub00",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub00",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub01",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub01",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub02",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub02",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub03",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub03",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub04",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub04",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub05",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub05",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub06",
				"click",
				function() {
					ipmutil.sMoniServiceCheck("sub06",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub07",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub07",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub08",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub08",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub09",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub09",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});

		$("#bottomCommonMenu").delegate(
				"#_sub10",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub10",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});
		
		$("#bottomCommonMenu").delegate(
				"#_sub11",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub11",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});
		
		$("#bottomCommonMenu").delegate(
				"#_sub12",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub12",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});
		$("#bottomCommonMenu").delegate(
				"#_sub13",
				"click",
				function() {
					bizMOB.Storage.save("sEquiment","");
					ipmutil.sMoniServiceCheck("sub13",UserName, custCode, custName, UserID, deptName,
							deptCode);
				});
	},
	/**
	 * ?????
	 * 작성자 : 
	 * 
	 * @param Type
	 * @param UserName
	 * @param custCode
	 * @param custName
	 * @param UserID
	 * @param deptName
	 * @param deptCode
	 */
	Amovepage : function(Type, UserName, custCode, custName, UserID, deptName, deptCode) 
	{
		
		if (Type == "sub00") // 메인
		{
			//bizMOB.Ui.alert("알림", "서비스준비중입니다.");
			
			var v = {
						call_type:"js2app",
						id:"GOTO_HOME",
						param:{} 
					};

			bizMOB.onFireMessage(v);
			
			/*bizMOB.Web.open("root/html/CM002.html", {
				modal : false,
				replace : false,
				message : {
					UserID : UserID
				}
			});*/

		} else if (Type == "sub01") // 고객정보열람
		{

			bizMOB.Web.open("custmaster/html/CM005.html", {
				modal : false,
				replace : false,
				message : {
					custCode : "",
					HistoryGubun : "메인"
				}
			});

		} else if (Type == "sub02") // 모니터링열람
		{
			bizMOB.Web.open("custmaster/html/CM077.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});

		} else if (Type == "sub03") {
			bizMOB.Web.open("custmaster/html/CM076.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});

		} else if (Type == "sub04") {
			bizMOB.Web.open("service/html/SD011.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		} else if (Type == "sub05") {

			var nowDate = new Date();
			bizMOB.Web.open("service/html/CM017.html", {
				modal : false,
				replace : false,
				message : {

					workYMD : nowDate.bMToFormatDate("yyyymmdd")
				}
			});

		} else if (Type == "sub06") {
			bizMOB.Web.open("root/html/CM003.html", {
				modal : false,
				replace : false,
				message : {
					UserID : UserID
				}
			});
		} else if (Type == "sub07") {

			bizMOB.Ui.alert("알림", "서비스준비중입니다.");

		} else if (Type == "sub08") {

			bizMOB.Ui.alert("알림", "서비스준비중입니다.");
		} else if (Type == "sub09") {
			bizMOB.Web.open("service/html/CM072.html", {
				modal : false,
				replace : false,
				message : {
					UserID : UserID
				}
			});
		} else if (Type == "sub10") {
			bizMOB.Web.open("service/html/CM070.html", {
				modal : false,
				replace : false,
				message : {
					UserID : UserID
				}
			});
		} else if (Type == "sub11") {
			bizMOB.Web.open("custmaster/html/CM076.html", {
				modal : false,
				replace : false,
				message : {
					UserID : UserID
				}
			});
		} else if (Type == "sub12") {
			bizMOB.Web.open("collection/html/CM079.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		} else if (Type == "sub13") {
			bizMOB.Web.open("collection/html/CM081.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		}

	},
	/**
	 * ??????
	 * 작성자 :  
	 */
	appendCommonMenu : function() 
	{
		$.get("../../common/html/slideMenu.html", function(data) {
			$("#bottomCommonMenu").append(data);
			$("#subname").html(bizMOB.Storage.get("UserName"));
		});
	},
	/**
	 * ??????
	 * 작성자 : 
	 */
	resetChk : function() 
	{
		bizMOB.Storage.save("inputcheck", "0");
	},
	/**
	 * ?????
	 * 작성자 : 
	 */
	doChk : function() 
	{
		bizMOB.Storage.save("inputcheck", "1");
	},
	/**
	 * 서비스내용 등록 체크
	 * 작성자 : 
	 * 
	 * @param sTab
	 * @param UserName
	 * @param custCode
	 * @param custName
	 * @param UserID
	 * @param deptName
	 * @param deptCode
	 */
	sMoniServiceCheck:function(sTab,UserName, custCode, custName, UserID, deptName,deptCode)
	{
		
		if (bizMOB.Storage.get("sEquiment") == "" || bizMOB.Storage.get("sEquiment") == undefined ){
			
			ipmutil.Amovepage(sTab, UserName, custCode, custName, UserID, deptName,deptCode);
			
		}else{
			
		// 체크리스트 저장
        var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00063");
        
        tr.body.P01 = bizMOB.Storage.get("sEquiment"); 
       
		        bizMOB.Web.post(
		        {
		            message:tr,
		            success:function(json)
		            {
		                if(json.header.result==false)
		                {
		                    bizMOB.Ui.alert("경고", json.header.error_text);
		                    return;
		                }
		                else
		            	{
		                	if (json.body.R01 == "N" ){
		                		
		                		bizMOB.Ui.alert("서비스내용 체크", "서비스내용을 등록 해주시기 바랍니다.");
		                		return;
		                	}
		                	else{
		                		
		                		ipmutil.Amovepage(sTab, UserName, custCode, custName, UserID, deptName,deptCode);
		                	}
		            	}
		            }
		        });
		}
     },
     /**
 	 * 서버 시간 체크
 	 * 작성자 : 장우제  
 	 */
    chkServerTime:function(callback)
    {
        var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00005");
	    bizMOB.Web.post({
	    	message: tr,
	    	success: function(json){
	    		if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
	    		if(json.body.R01 == "Y"){
	    			callback();
	    		}else{
	    			bizMOB.Ui.alert("안내", "당일 날짜 이외에는 수정을 할 수 없습니다.");
	    		}		    		
	    	}
	    });		 
    },
     
    /**
  	* 서버 시간 체크(파라미터 받는 버전
  	* 작성자 : 장우제  
  	*/
    pchkServerTime:function(workDate, srNum, custCode, callback)
    {
     	var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00006");
     	tr.body.P01 = workDate;
     	tr.body.P02 = custCode;
     	tr.body.P03 = srNum;
     	 
	    bizMOB.Web.post({
	    	message: tr,
	    	success: function(json){
	    		if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
	    		if(json.body.R01 == "Y"){
	    			callback();
	    		}else{
	    			bizMOB.Ui.alert("안내", "당일 날짜 이외에는 수정을 할 수 없습니다.");
	    		}		    		
	    	}
	    });		 
    },
    
    /**
 	 * 서명여부 체크 (먼지다듬이 고객)
 	 * 작성자 : 박태환
 	 */
    chkSign:function()
    {
        var tr = bizMOB.Util.Resource.getTr("Cesco", "CM02303");
        tr.body.P01 = bizMOB.Storage.get("srNum");
        
	    bizMOB.Web.post({
	    	message: tr,
	    	success: function(json){
	    		if(!json.header.result)
				{
					bizMOB.Ui.alert("경고", json.header.error_text);
					return;
				}
	    		if(json.body.R01 != "Y"){
	    			$(".item3 li").css("width", "33%");
	    			$("#li04").css("display", "none");
	    		}
	    	}
	    });		 
    },
    /**
     * 금일날짜 리턴
     * @returns {Date}
     */
    getNow:function()
    {
    	return new Date();
    },
    /**
     * 날짜 리턴(스트링)
     * @param stringFormat : 날짜포멧
     * @returns string
     */
    getNowString:function(stringFormat)
    {
    	return ipmutil.getNow().bMToFormatDate(stringFormat);
    },
    /**
     * Yes / No 확인창 띄우기
     * @param json { YesText : Yes 텍스트, YesCallback : Yes callback함수, NoText : No 텍스트, NoCallback : No callback함수, Title : 확인창 제목, Content : 확인창 내용 }
     */
    messageBoxYesNo:function(json)
    {
    	var strYesText = "확인";
    	var strNoText = "취소";
    	var callbackYes = function() { };
    	var callbackNo = function() { };
    	var titleText = "확인";
    	var contentText = "진행 하시겠습니까?";
    	
    	if (!ipmutil.isNullValueCheck(json.YesText))
    		strYesText = json.YesText;
    	
    	if (!ipmutil.isNullValueCheck(json.NoText))
    		strNoText = json.NoText;
    	
    	if (!ipmutil.isNullValueCheck(json.YesCallback))
    		callbackYes = json.YesCallback;
    	
    	if (!ipmutil.isNullValueCheck(json.NoCallback))
    		callbackNo = json.NoCallback;
    	
    	if (!ipmutil.isNullValueCheck(json.Title))
    		titleText = json.Title;
    	
    	if (!ipmutil.isNullValueCheck(json.Content))
    		contentText = json.Content;
    	
    	var btnConfirm	= bizMOB.Ui.createTextButton(strYesText	, callbackYes);
   	 	var btnCancel 	= bizMOB.Ui.createTextButton(strNoText	, callbackNo);
   	 	bizMOB.Ui.confirm(titleText, contentText, btnConfirm, btnCancel);
    },
    
    makeCustSearchWrap: function(){
		var searchWrap = '<div class="searchWrap"  style="padding: 10px; background: #ececec; border-bottom: 1px solid #c3d5df;">'+
		'<select style="width: 29%;" id="selCustSearchType">'+
			'<option value="CS001">고객명</option>'+
			'<option value="CS002">고객코드</option>'+
			'<option value="CS003">전화번호</option>'+
		'</select>'+
		'<div class="inp_srch" style="width: 57%; height: 30px; float: right; position: relative; padding-right: 40px; background: #fff; border: 1px solid #a9a9a9;">'+
			'<input type="text" id="txtCustSearchText" placeholder="검색어를 입력하세요" style="height: 29px; border: none; width: 100%; box-shadow: none;"/>'+
			'<button id="btnCustSearch" type="button" style="position: absolute; right: 0; top: 0; height: 100%; width: 40px; text-indent: -999em; background: url(../../common/images/btn_search.png) no-repeat center center; background-size: 16px auto;">검색</button>'+
		'</div>'+
	'</div>';
		$(".commonCustSearch").append(searchWrap);
	},
	/*
	2015-10-21 장우제 추가(공통 고객 검색 Setting)
	sel : 셀렉트 박스 변수(검색 타입 입력) 
	inp : 인풋박스 변수(검색 텍스트 입력)
	btn : 조회 버튼 변수
	*/
	setCustSearch: function(sel, inp, btn, cfnName){		
		inp.toSel(); 
		inp.keydown(function(e){
			if(e.keyCode == 13)
				ipmutil.setCustSearchExec(sel, inp, btn, cfnName);
		});
		
		btn.click(function(){			
			ipmutil.setCustSearchExec(sel, inp, btn, cfnName);
		});
	},
	setCustSearchExec: function(sel, inp, btn, cfnName){
		var searchType = sel.val();
		var searchText = inp.val();
		
		if(searchText.trim().length < 1){
			bizMOB.Ui.toast("검색어를 입력해주세요.");
			return;
		}
		
		bizMOB.Ui.openDialog("common/html/CommonCustSearchPop.html", 
		{ 
			message : 
		   	{
				searchType: searchType,
				searchText: searchText,
				callbackFunctionName: cfnName 
		   	},
		   	width:"90%",
			height:"65%"
		});
	}
};

$.fn.toNum = function() {
	if($(this).attr("id") == null){
		$(this).keyup(function(e) {
			var a = $(this).val()[$(this).val().length - 1];
			if (a == "." || ($(this).val().indexOf(".") != -1 && a == "0"))
				return;
			$(this).val(($(this).val().bMToNumber() + "").bMToCommaNumber());
		});		
	}else{
		// 2014-07-07 장우제 사원 추가사항 - backspace키 인식 문제 해결 버전 (jquery로 input을 bind 할 수 있는지 알아봐야 함)
		var inputBox = document.getElementById($(this).attr("id"));
		inputBox.addEventListener('input', function() {
			var a = $(this).val()[$(this).val().length - 1];
			if (a == "." || ($(this).val().indexOf(".") != -1 && a == "0"))
				return;
			$(this).val(($(this).val().bMToNumber() + "").bMToCommaNumber());
		}, false);
	}
};
$.fn.toSel = function() {
	$(this).click(function() {
		$(this).select();
	});
	$(this).keyup(function() {
		bizMOB.Storage.save("inputcheck", "1");
	});
};
$.fn.toDel = function(t) {
	$(this).delegate(t, "click", function() {
		$(this).select();
	});
	$(this).keyup(function() {
		bizMOB.Storage.save("inputcheck", "1");
	});
};
// 키패드 hide 처리
$.fn.hideKeypad = function(){
	var _this = $(this);
	_this.attr("readonly", "");
	setTimeout(function(){
		_this.removeAttr("readonly");
	}, 1000);
};
// 더블탭 이벤트 바인딩 관련
(function($){
	$.fn.doubletap = function(fn) {
		return fn ? this.bind('doubletap', fn) : this.trigger('doubletap');    };     
		$.attrFn.doubletap = true;     
		$.event.special.doubletap = {        
				setup: function(data, namespaces){            
					$(this).bind('touchend', $.event.special.doubletap.handler);        
					},         
					teardown: function(namespaces){            
						$(this).unbind('touchend', $.event.special.doubletap.handler);        
						},         
						handler: function(event){            
							var action;             
							clearTimeout(action);             
							var now       = new Date().getTime();            //the first time this will make delta a negative number            
		var lastTouch = $(this).data('lastTouch') || now + 1;            
		var delta     = now - lastTouch;            
		var delay     = delay == null? 500 : delay;             
		if(delta < delay && delta > 0){                // After we detct a doubletap, start over                $(this).data('lastTouch', null);                 // set event type to 'doubletap'                
			event.type = 'doubletap';                 // let jQuery handle the triggering of "doubletap" event handlers               
			$.event.handle.apply(this, arguments);            
			}else{                $(this).data('lastTouch', now);                 action = setTimeout(function(evt){                    // set event type to 'doubletap'
				event.type = 'tap';                     // let jQuery handle the triggering of "doubletap" event handlers                    
				$.event.handle.apply(this, arguments);                     
				clearTimeout(action); // clear the timeout               
			}, delay, [event]);            
			}        
		}    
    };
})(jQuery);