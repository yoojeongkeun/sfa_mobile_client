page = {
	index : 0,
	fullindex : 0,
	UserID : "",
	deptCode : "",
	workYMD : "",
	deptName : "",
	CarYN : "",
	popSeq : [],
	init : function(json) {
		ipmutil.appendCommonMenu();
		page.UserID = json.UserID;

		page.initInterface();
		page.initData(json);
		page.initLayout();
	},

	initInterface : function() {

		$('.bxslider').bxSlider({
			pager : false
		});// 메인메뉴 스와이핑 (공통 라이브러리)
		$(".submain").hide();// 슬라이드 화면
		$(".submain").click(function() {
			$(".menuf").animate({
				left : -400
			}, 500, function() {
				$(".submain").hide();
			});
		});
		$(".btn_close").click(function() {
			$(".menuf").animate({
				left : -400
			}, 500, function() {
				$(".submain").hide();
			});
		});
		$(".btn_logout").click(function() {
			var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
				bizMOB.Native.exit();
			});
			var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
				return;
			});
			bizMOB.Ui.confirm("메인종료", "로그아웃 하시겠습니까?", btnConfirm, btnCancel);
		});

		$(".btn_allmenu").click(function() {
			$(".submain").show();
			$(".menuf").show();
			$(".menuf").animate({
				left : 0
			}, 500);
		});
		// 메뉴 이벤트

		// 고객정보 버튼 클릭 이벤트
		$(".info").click(function() {
			bizMOB.Web.open("custmaster/html/CM005.html", {
				modal : false,
				replace : false,
				message : {
					custCode : "",
					HistoryGubun : "메인"
				}
			});
		});

		// 무료진단 버튼 클릭 이벤트
		$(".customerMove").click(function() {
			bizMOB.Web.open("diagnosis/html/SD020.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		// 신규이관 버튼 클릭 이벤트
		$(".div").click(function() {
			bizMOB.Web.open("custmaster/html/CM076.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		$(".visitSch").click(function() {
			bizMOB.Web.open("service/html/SD011.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		$(".totalSearch").click(function() {
			bizMOB.Web.open("custmaster/html/CM093.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		$(".salesActivity").click(function() {
			bizMOB.Web.open("sales/html/SD013.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		$(".salesPlan").click(function() {
			if (true) {
				bizMOB.Ui.alert("안내", "기능 구현 중입니다.");
				return;
			}

			/*
			 * bizMOB.Web.open("sales/html/SD014.html", { modal : false, replace :
			 * false, message : { UserID : page.UserID } });
			 */
		});

		$(".order").click(function() {
			bizMOB.Web.open("order/html/SD015.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		$(".cancelCard").click(function() {
			// 교육용앱 로직 막기
			/*
			 * if(true) { bizMOB.Ui.alert("안내", "교육용 앱에서는 진행할 수 없습니다."); return; }
			 */

			bizMOB.Web.open("collection/html/CM081.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		$(".checkPriceTable").click(function() {
			// 교육용앱 로직 막기
			/*
			 * if(true) { bizMOB.Ui.alert("안내", "교육용 앱에서는 진행할 수 없습니다."); return; }
			 */

			bizMOB.Web.open("corporation/html/SD019.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		$(".freeDiagnosis").click(function() {

		});

		// QNA 클릭
		$(".qna").click(function() {
			bizMOB.Web.open("qna/html/FSM0030.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		// 안전성 자료 클릭시
		$(".safe").click(function() {
			bizMOB.Web.open("root/html/SafeDataList.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		// 시작Km 클릭시
		$(".km").click(function() {
			bizMOB.Web.open("root/html/CM003.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		// 주유세차비등록 클릭시
		$(".refuel").click(function() {
			bizMOB.Web.open("root/html/CM079.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		// 식품안전정보 클릭시
		$(".fsnotice").click(function() {
			bizMOB.Web.open("fsnotice/html/FSM0032.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});

		// 구획화 클릭시
		$(".division").click(function() {
			bizMOB.Web.open("division/html/IS003.html", {
				modal : false,
				replace : false,
				message : {
					CustInfo : ""
				}
			});
		});

		// 공기청정기설치 버튼 클릭시
		$(".equiInstall").click(function(){
			bizMOB.Web.open("SET/html/SET_0100.html", {
				modal : false,
				replace : false,
				message : {
					installData: ""
				}
			});
		});
		
		
		
		$(".u_cbox_nick").each(function(i,item){ 
			v += "'" + item.text() + "',"; 
		});
		
		
		
		
		// 카드 단말기 승인 클릭시
		$(".cardReader").click(function() {				
			page.checkSwipeApp("page.checkSwipeAppRequest");
			return;
		});

		// 카드 단말기 취소 클릭시
		$(".cardReaderCancel").click(function() {		
			page.checkSwipeApp("page.checkSwipeAppCancel");
			return;	
		});
		
		// 영수증 출력 클릭시
		$(".printReceipt").click(function() {
			page.checkSwipeApp("page.checkSwipeAppReceipt");
			return;										
		});
		
		// 무료체험장비 회수
		$(".Recall").click(function() {
			bizMOB.Web.open("sales/html/CM004.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});
		});
		
	},
	initData : function(json) {

		bizMOB.Storage.remove("custCode");
		bizMOB.Storage.remove("custName");

		page.initPopUp();

		var nowDate = new Date();

		var tr = bizMOB.Util.Resource.getTr("Cesco", "SD00201");
		$("#date").html(nowDate.bMToFormatDate("yyyy-mm-dd"));

		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {

					$("#all").html(json.body.R01);
					$("#end").text(json.body.R02);
					$("#notend").text(json.body.R03);
					$("#notassign").text(json.body.R07);
					$("#new").text(json.body.R06);
					$("#request").text(json.body.R04);
					$("#free").text(json.body.R05);
					$("#depart").text(json.body.R08);
					$("#name").text(json.body.R09);
					$("#depart").attr("deptCode", json.body.R10);
					page.deptName = json.body.R08;
					page.deptCode = json.body.R10;
					bizMOB.Storage.save("UserName", json.body.R09);
					bizMOB.Storage.save("UserID", page.UserID);
					bizMOB.Storage.save("deptCode", json.body.R10);
					bizMOB.Storage.save("deptName", json.body.R08);
					bizMOB.Storage.save("dbname", "M");
					bizMOB.Storage.save("partCode", json.body.R11);
					$("#subname").text(json.body.R09);
					bizMOB.Storage.save("dutyCode", json.body.R12);
					bizMOB.Storage.save("jobGrpCode", json.body.R13);
					page.renderList(json, "LIST");

					page.fullindex = json.body.LIST.length - 1;

					ipmutil.ipmMenuMove(json.body.R09, "", "", page.UserID,
							json.body.R08, json.body.R10);
				} else {

					bizMOB.Ui.alert("로그인", json.header.error_text);
				}
			}
		});

		// 지사출발, 도착 완료 체크(버튼 색 변경 및 text 변경)
		// page.routeStartCheck();
		// page.routeEndCheck();

	},

	renderList : function(json, listName) {
		// 항목 리스트를 셋팅하기
		var dir = [ {
			type : "loop",
			target : ".slideDetail",
			value : listName,
			detail : [
					{
						type : "single",
						target : "#tt",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R03);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#tt@custCode",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R02);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#tt@SRNum",
						value : function(arg) {
							var returnValue = $.trim(arg.item.R01);
							return returnValue;
						}
					},
					{
						type : "single",
						target : "#time",
						value : function(arg) {
							var returnValue = "오후 " + $.trim(arg.item.R04)
									+ " ~ " + $.trim(arg.item.R05);
							return returnValue;
						}
					} ]
		} ];
		$(".slide_list").bMRender(json.body, dir);
	},

	initLayout : function() {
		var titlebar = bizMOB.Ui.createTitleBar();
		titlebar.setVisible(false);
		var toolbar = bizMOB.Ui.createToolBar();
		toolbar.setVisible(false);

		var pageLayout = bizMOB.Ui.createPageLayout();
		pageLayout.setTitleBar(titlebar);
		pageLayout.setToolbar(toolbar);
		bizMOB.Ui.displayView(pageLayout);
	},
	initPopUp : function() {

		var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0063");
		tr.body.vcSEARCHTEXT = "";
		tr.body.cPOPVIEW = "Y";
		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "SQM 리스트를 가져오는데 실패하였습니다.");
					return;
				}
				page.sqmList = json.body.LIST01;
				for ( var i = 0; i < page.sqmList.length; i++) {
					page.popSeq.push(page.sqmList[i].Seq);
				}

				if (page.popSeq.length > 0) {
					page.openPopUp();
				}
			}
		});
	},
	// FS 공지사항 팝업 OPEN
	openPopUp : function() {
		// true : 팝업이 계속 발생, false : 팝업이 일회성으로 발생
		var test = false;

		var datetime = new Date();
		var chkStorage = localStorage.getItem("popView"
				+ datetime.bMToFormatDate("yyyymmdd"));
		if (chkStorage == null || chkStorage == "False" || chkStorage == ""
				|| test) {
			bizMOB.Ui.openDialog("root/html/FSM0002_pop.html", {
				message : {
					seq : page.popSeq
				},
				width : "100%",
				height : "85%",
				modal : false,
				replace : false
			});
		}
	},

	LoadCarInfo : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00307");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {

					if (json.body.R01 != "") {
						// 차량없음으로 등록한 경우
						page.CarYN = "N";
					} else {
						page.CarYN = "Y";
					}
				} else {

					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});

	},

	YCarList : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00301");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {

					if (json.body.R04 == "" || json.body.R04 == "0") {
						bizMOB.Ui.alert("알림", "시작km를 등록해주십시오.");
					} else {
						page.RouteStart();
					}

				} else {
					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});

	},

	KmClickChk : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00301");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {

					if (json.body.R04 == "" || json.body.R04 == "0") {
						$(".km").attr("class", "km");
					} else {
						$(".km").attr("class", "km1");
						// $(".km1 span").text("시작km");
					}

				} else {
					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});

	},

	RouteStart : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00202");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {

					if (json.body.R01.length > 0
							&& json.body.R01.substring(0, 4) != "1900") {
						bizMOB.Ui.alert("알림", "이미 지사출발을 등록하셨습니다.");
						return;
					} else {
						var button1 = bizMOB.Ui.createTextButton("확인",
								function() {
									page.Start();
								});

						var button2 = bizMOB.Ui.createTextButton("취소",
								function() {
									return;
								});

						bizMOB.Ui.confirm("지사출발", "지사출발을 하시겠습니까?", button1,
								button2);
					}
				} else {
					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});

	},

	RouteEnd : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00202");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {

					if (json.body.R01.length < 1
							|| json.body.R01.substring(0, 4) == "1900") {
						bizMOB.Ui.alert("알림", "지사출발이 등록되지 않았습니다.");
						return;
					} else if (json.body.R02.length > 0
							&& json.body.R02.substring(0, 4) != "1900") {
						bizMOB.Ui.alert("알림", "이미 지사도착을 등록하셨습니다.");
						return;
					} else {
						var button1 = bizMOB.Ui.createTextButton("확인",
								function() {
									page.End();
								});

						var button2 = bizMOB.Ui.createTextButton("취소",
								function() {
									return;
								});

						bizMOB.Ui.confirm("지사도착", "지사도착을 하시겠습니까?", button1,
								button2);
					}
				} else {
					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});

	},

	Start : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00203");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		tr.body.P05 = "0";

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {
					bizMOB.Ui.alert("지사출발", "지사에서 출발하셨습니다.");
					$(".start").attr("class", "start1");
					$(".start1 span").text("지사출발완료");
				} else {
					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});

	},

	End : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00203");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");
		tr.body.P05 = "1";

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {
					bizMOB.Ui.alert("지사도착", "지사에 도착하셨습니다.");
					$(".arrival").attr("class", "arrival1");
					$(".arrival1 span").text("지사도착완료");
				} else {

					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});

	},
	callbackOnClose : function(json) {
		bizMOB.Web.open("root/html/CM002.html", {
			message : {
				UserID : page.UserID
			},
			modal : false,
			replace : true
		});
	},
	routeStartCheck : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00202");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (json.header.result == true) {
					if (json.body.R01.length > 0
							&& json.body.R01.substring(0, 4) != "1900") {
						$(".start").attr("class", "start1");
						$(".start1 span").text("지사출발완료");
						return;
					}
				} else {
					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});
	},
	routeEndCheck : function() {
		var nowDate = new Date();
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00202");
		tr.body.P01 = nowDate.bMToFormatDate("yyyymmdd");

		bizMOB.Web.post({

			message : tr,
			success : function(json) {
				if (json.header.result == true) {
					if (json.body.R02.length > 0
							&& json.body.R02.substring(0, 4) != "1900") {
						$(".arrival").attr("class", "arrival1");
						$(".arrival1 span").text("지사도착완료");
						return;
					}
				} else {
					bizMOB.Ui.alert("조회", json.header.error_text);
				}
			}
		});
	},
	// 결제 앱 존재여부 체크 함수
	checkSwipeApp: function(callbackName){
		var v = {
	        call_type:"js2app",
	        id:"CHECK_USE_APPLICATION",
	        param:{
   			   app_id: ["kr.co.firstpayment.app.ksnet"], // 패키지 명
               callback: callbackName//'page.callbackCheckSwipeApp'
           }
		};
		bizMOB.onFireMessage(v);
	},
	
	// 결제 앱 존재여부 체크 후 승인 화면으로 이동
	checkSwipeAppRequest: function(json){
		if(json.result[0].install == false)
		{
			page.installSwipeApp();
		}
		else
		{
			bizMOB.Web.open("collection/html/CL001.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});	
		}
	},
	// 결제 앱 존재여부 체크 후 취소 화면으로 이동
	checkSwipeAppCancel: function(json){
		if(json.result[0].install == false)
		{
			page.installSwipeApp();
		}
		else
		{
			bizMOB.Web.open("collection/html/CL002.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});	
		}
	},
	// 결제 앱 존재여부 체크 후 영수증 출력 화면으로 이동
	checkSwipeAppReceipt: function(json){
		if(json.result[0].install == false)
		{
			page.installSwipeApp();
		}
		else
		{
			bizMOB.Web.open("collection/html/CL003.html", {
				modal : false,
				replace : false,
				message : {
					UserID : page.UserID
				}
			});		
		}
	},
	installSwipeApp : function()
	{
		var url = "market://details?id=" + "kr.co.firstpayment.app.ksnet"; // 패키지 명
		var v = {
	        call_type:"js2app",
	        id:"RUN_APPLICATION",
	        param:{
               method : "url",
               url : {
                   url : url
               }
	        }
		};		
		
		var btnConfirm = bizMOB.Ui.createTextButton("이동", function() {
			bizMOB.onFireMessage(v);
		});

		var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
			return;
		});
		bizMOB.Ui.confirm("안내", "결제에 필요한 어플리케이션이 설치되어있지 않습니다.\n설치화면으로 이동하시겠습니까?", btnConfirm, btnCancel);
	},
	installSwipeAppNoConfirm : function()
	{
		var url = "market://details?id=" + "kr.co.firstpayment.app.ksnet"; // 패키지 명
		var v = {
	        call_type:"js2app",
	        id:"RUN_APPLICATION",
	        param:{
               method : "url",
               url : {
                   url : url
               }
	        }
		};		
		bizMOB.onFireMessage(v);
	}
};

function onClickAndroidBackButton() {
	var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
		bizMOB.Native.exit();
	});

	var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
		return;
	});
	bizMOB.Ui.confirm("메인종료", "프로그램을 종료하시겠습니까?", btnConfirm, btnCancel);
}

/*
 * function appcallOnFocus() { alert("appcallOnFocus"); }
 */

