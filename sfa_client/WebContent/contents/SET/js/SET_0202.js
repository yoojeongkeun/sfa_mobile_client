/**
 * @author ehpark@mcnc.co.kr
 * @title 제품등록 2. 바코드스캔
 */
//bizMOB.addEvent("backbutton", "page.backbutton");
var page = {
	
	installData : {},	//설치정보
		
	init : function(event) 
	{
		ipmutil.appendCommonMenu();
		page.initInterface();
		page.initData(event);
		page.initLayout();
	},

	initData : function(data) 
	{
		var IDName    =  bizMOB.Storage.get("UserName");
		var custName  =  bizMOB.Storage.get("custName");
 		var custCode  =  bizMOB.Storage.get("custCode");
 		
 		var UserID    =  bizMOB.Storage.get("UserID");
 		var deptName  =  bizMOB.Storage.get("deptName");
 		var deptCode  =  bizMOB.Storage.get("deptCode");
		
		ipmutil.ipmMenuMove(IDName,custCode,custName,UserID,deptName,deptCode);
		if(!data.installData || !data.installData.barcode) {
			$("#btnBarcode").click();
		} else {
			$("#inpBarcode").val(data.installData.barcode).change();	
		}
		
		page.installData = data.installData||{};
	},

	initInterface : function() 
	{
		//텍스트 지우기
		$("#btnTxtClear").click(function() {
			$("#inpBarcode").val("").change();
		});

		//텍스트 지우기 버튼표시
		$("#inpBarcode").on("input keyup change", function() {
			var $btnTxtClear =  $("#btnTxtClear");
			
			if( $(this).val() == "" )  {
				$btnTxtClear.hide();
			} else {
				$btnTxtClear.show();
			};
		});
		
		//바코드스캔
		$("#btnBarcode").click(function() {			
			/*cescoUtil.qr(function(resQr) {	
				alert("OK");
				$("#inpBarcode").val(resQr.message).change();
				$("#btnNext").click();
			});*/
			bizMOB.Native.qrAndBarCode.open(function(arg){
				$("#inpBarcode").val(arg.message).change();
				$("#btnNext").click();		
			});
			
		});
		
		//다음버튼
		$("#btnNext").click(function() {			
			var barcode = $("#inpBarcode").val().trim();		
			if( barcode == "") {
				bizMOB.Ui.toast("바코드번호를 입력하세요");
				return;
			}			
			page.reqData(barcode);
		});
		
	},
	
	//바코드정보 인증
	reqData : function (barcode)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CES0031");
		tr.body.barcode = barcode;
		bizMOB.Web.post({
			message: tr,
			success: function(resCES0031){
				if (cescoUtil.checkResponseError(resCES0031)) {
					
					$("#txtBarcodeError").hide();
					page.installData = $.extend(true, page.installData, resCES0031.body);
										
					//if(resCES0031.body.deviceSetYN == "Y") {
					if(false) {
						bizMOB.Ui.alert("안내", "이미 기기설정이 되어있는 기기입니다.");
						/*cescoUtil.confirm.show({
							txtHtml : "기기설정이 되어있습니다.<br/>기기설정 단계를 넘어가시겠습니까?",
							lbtnTxt : "아니요",
							lCallback : function() {
								cescoUtil.windowOpen({
									_sPagePath	: "SET/html/SET_0204.html",
									_oMessage 	: {
										installData : page.installData
									},
									_bReplace 	: true
								});
							},
							rbtnTxt : "네 (정보입력)",
							rCallback : function() {
								cescoUtil.windowOpen({
									_sPagePath	: "SET/html/SET_0600.html",
									_oMessage 	: {
										skipSetting	: true,
										installData 	: page.installData
									},
									_bReplace 	: true
								});
							}
						});*/
					
					} else {
						cescoUtil.windowOpen({
							_sPagePath	: "SET/html/SET_0204.html",
							_oMessage 	: {
								installData : page.installData
							},
							_bReplace 	: true
						});
					}
										
				} else {
					$("#txtBarcodeError").show();
				}
			}
		});
		
		/*bizMOB.Network.requestTr({
			_sTrcode 	: "CES0031",
			_oBody 		: {
				barcode : barcode
			},
			_fCallback 	: function(resCES0031) {
						
				if (cescoUtil.checkResponseError(resCES0031)) {
				
					$("#txtBarcodeError").hide();
					page.installData = $.extend(true, page.installData, resCES0031.body);
										
					if(resCES0031.body.deviceSetYN == "Y") {
						
						cescoUtil.confirm.show({
							txtHtml : "기기설정이 되어있습니다.<br/>기기설정 단계를 넘어가시겠습니까?",
							lbtnTxt : "아니요",
							lCallback : function() {
								cescoUtil.windowOpen({
									_sPagePath	: "SET/html/SET_0204.html",
									_oMessage 	: {
										installData : page.installData
									},
									_bReplace 	: true
								});
							},
							rbtnTxt : "네 (정보입력)",
							rCallback : function() {
								cescoUtil.windowOpen({
									_sPagePath	: "SET/html/SET_0600.html",
									_oMessage 	: {
										skipSetting	: true,
										installData 	: page.installData
									},
									_bReplace 	: true
								});
							}
						});
					
					} else {
						cescoUtil.windowOpen({
							_sPagePath	: "SET/html/SET_0204.html",
							_oMessage 	: {
								installData : page.installData
							},
							_bReplace 	: true
						});
					}
										
				} else {
					$("#txtBarcodeError").show();
				}
			}
		});*/
	},
		
	initLayout : function() 
	{
		//cescoTitlebar.setInsTitleBar("설치하기", page.backbutton);
		var layout = ipmutil.getDefaultLayout("설치하기");
		layout.titlebar.setTopRight(bizMOB.Ui.createButton({ button_text : "전체메뉴", image_name : "common/images/top_icon_map.png", listener : function() {
 			
 			$("#_submain").show();
			$("#_menuf").show();
			$("#_menuf").animate({
				left : 0
			}, 500);
 		   // 메뉴 열림 
 	         
 		}}));
  	  	bizMOB.Ui.displayView(layout);  
	},
		
	backbutton : function()
	{
		var isAndroid = bizMOB.Device.isAndroid();	
		
		if( isAndroid ) {
			//바코드, NFC 선택
			cescoUtil.windowOpen({
				_sPagePath	: "SET/html/SET_0200.html",
				_bReplace 	: true,
				_oMessage 	: {
					installData : page.installData
				}
			});
			
		} else {
			cescoUtil.windowClose({});
		}
	},
};