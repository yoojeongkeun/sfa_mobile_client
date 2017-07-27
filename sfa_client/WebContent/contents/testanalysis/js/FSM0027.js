/**
 * 위생점검 리스트
 */
page = {
	planId : "",
	custName : "",
	custCode : "",
	serviceYN : "",
	workDay : "",
	workCnt : "",
	$imageThat : "",
	listTitle: "",
	

	/**
	 * 최초 진입점
	 * 
	 * @param json :
	 *            전화면에서 넘겨진 데이터
	 */
	init : function(json) {
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	/**
	 * UI 셋팅
	 */
	initInterface : function() {
		$("#checkListFNew").delegate(".btnImage", "click", function() {
			page.$imageThat = $(this);
			bizMOB.Ui.openDialog("testanalysis/html/CameraImageControl.html", {
				message : {
					planId : page.planId,
					workNo : "",
					smplNo : $(this).parents(".divList").attr("rownum")
				},
				width : "90%",
				height : "65%",
			});
		});

		$("#checkListHNew").delegate(".btnImage", "click", function() {
			page.$imageThat = $(this);
			bizMOB.Ui.openDialog("testanalysis/html/CameraImageControl.html", {
				message : {
					planId : page.planId,
					workNo : "",
					smplNo : $(this).parents(".divList").attr("rownum")
				},
				width : "90%",
				height : "65%",
			});
		});

		$("#btnRegist").click(function() {
			page.regist();
		});

		$("#btnClear").click(function() {
			$(".txtGatherMemo").val("");
			$(".chkGatherYN").attr("checked", false);
		});
	},
	/**
	 * 데이터 셋팅
	 * 
	 * @param json :
	 *            전 화면에서 넘겨진 데이터
	 */
	initData : function(json) {
		page.listTitle = json.listTitle;
		page.planId = json.planId;
		page.custName = json.custName;
		page.custCode = json.custCode;
		page.serviceYN = json.serviceYN;
		page.workDay = json.workDay;
		page.workCnt = json.workCnt;

		page.getSurfaceFoulingList();
		//page.getWaterTestList(); // 20170122 물검사 일단 제외
	},
	/**
	 * 레이아웃 셋팅
	 */
	initLayout : function() {
		$(".tit_work").text(page.listTitle);
		var layout = ipmutil.getDefaultLayout(page.custName + "(" + page.custCode + ")");
		bizMOB.Ui.displayView(layout);
	},
	getSurfaceFoulingList : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0052");
		tr.body.cCUSTCODE = page.custCode;
		tr.body.cFROMDATE = page.workDay; // 나중 대비
		tr.body.cTODATE = ""; // 나중 대비
		tr.body.cSRNO = page.planId; // SRNO -> PlanID로 변경
		tr.body.cSMPLTYPE = "SU";

		bizMOB.Web.post({
			message : tr,  
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "표면오염도 값 목록을 가져오는데 실패하였습니다.");
					return;
				}
				page.renderList(json, "checkListF", "F001");
			}
		});
	},
	getWaterTestList : function() {
		var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0052");
		tr.body.cCUSTCODE = page.custCode;
		tr.body.cFROMDATE = ""; // 나중 대비
		tr.body.cTODATE = ""; // 나중 대비
		tr.body.cSRNO = page.planId;
		tr.body.cSMPLTYPE = "WA";

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "물검사 값 목록을 가져오는데 실패하였습니다.");
					return;
				}
				page.renderList(json, "checkListH", "W001");
			}
		});
	},
	renderList : function(json, renderID, smplType) {
		var dir = [ {
			type : "loop",
			target : ".divList",
			value : "LIST01",
			detail : [
					{
						type : "single",
						target : ".sampleName",
						value : "PRODNM"
					},
					{
						type : "single",
						target : ".txtGatherMemo@value",
						value : "GATHMEMO"
					},
					{
						type : "single",
						target : ".spanPurpose",
						value : "PURPOSE"
					},
					{
						type : "single",
						target : "@rownum+",
						value : "ROWNUM"
					},
					{
						type : "single",
						target : "@testseq+",
						value : "TESTSEQ"
					},
					{
						type : "single",
						target : "@foodseq+",
						value : "FOODSEQ"
					},
					{
						type : "single",
						target : "input[type='checkbox']@checked+",
						value : function(items) {
							return items.item.GATHYN == "0" ? false : true;
						}
					},
					{
						type : "single",
						target : ".btnImage@src",
						value : function(items) {
							return items.item.IMAGYN == "Y" ? "../images/btn_view_ph01.png"
									: "../images/btn_view01_ph.png";
						}
					}, {
						type : "single",
						target : "@smpltype",
						value : function(items) {
							return smplType; // 시료
						}
					} ]
		} ];
		var options = {
			clone : true,
			newId : renderID + "New",
			replace : true
		};
		$("#" + renderID).bMRender(json.body, dir, options);

		$("#" + renderID + "New .divList")
				.delegate(
						".lbtoggle",
						"click",
						function() {
							if ($(this).parent().find(".chkGatherYN").attr(
									"checked") == undefined
									|| $(this).parent().find(".chkGatherYN")
											.attr("checked") == false)
								$(this).parent().find(".chkGatherYN").attr(
										"checked", true);
							else
								$(this).parent().find(".chkGatherYN").attr(
										"checked", false);
						});
	},
	regist : function() {
		var registList = $(".divList:visible");
		if (registList.length == 0) {
			bizMOB.Ui.toast("등록 할 항목이 존재하지 않습니다.");
			return;
		}
		var bodyList = [];
		var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0053");

		$.each(registList, function(i, listElement) {
			bodyList
					.push({
						cSRNO : page.planId,
						vcWORKNO : "",
						vcSMPLNO : $(listElement).attr("rownum"),
						vcTESTSEQ : $(listElement).attr("testseq"),
						vcFOODSEQ : $(listElement).attr("foodseq"),
						vcGATHYN : $(listElement).find(".chkGatherYN").prop(
								"checked") ? 1 : 0,
						vcGATHMEMO : $(listElement).find(".txtGatherMemo")
								.val(),
						cUSID : "",
						IMAGINFO : "",
						cSMPLTYPE : $(listElement).attr("smpltype"),
					});
		});

		tr.body.LIST01 = bodyList;

		bizMOB.Web.post({
			message : tr,
			success : function(json) {
				if (!json.header.result) {
					bizMOB.Ui.alert("안내", "등록에 실패하였습니다.");
					return;
				}
				bizMOB.Ui.toast("등록되었습니다.");
				                         
				// 등록 후 sfa 일정 페이지로 이동하기
				
				urlpath = "service/html/SD011.html";
				
				// 경로 이동 
				openOption = {
					message : {
						UserID: bizMOB.Storage.get("UserID")
					}
				};
				bizMOB.Web.open(urlpath, openOption);
				
			}
		});
	},
	dataReload : function(json) {
		if (json.cameraYN == "Y") {
			page.$imageThat.attr("src", "../images/btn_view_ph01.png");
		}
	}
};