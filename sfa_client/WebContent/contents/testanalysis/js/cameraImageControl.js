page = 
{	
	imgList: [],
	strVALUNO: "",
	strVALUGRUPNO: "",
	strPATH: "",
	boolOnView: false,
	callback1: "",
	planId: "",
	workNo: "",
	smplNo: "",  
	init:function(json)
	{	
		page.initInterface();
		page.initData(json);
		page.initLayout();
	},
	initData:function(json)
	{
		page.planId = json.planId;
		page.workNo = json.workNo;
		page.smplNo = json.smplNo;
		
		page.getImageList();	
		
	},
	initInterface:function()
	{		
		
		$("#btnClose").click(function(){
			bizMOB.Ui.closeDialog({ 
				callback: "page.dataReload",
				message : {
					cameraYN: page.imgList.length != 0 ? "Y" : "N"
				}
			});//, message: { barcodeNum: $("#txtBarcode").val()}
		});
		
		$(".closeBtn").click(function(){
			bizMOB.Ui.closeDialog({
				callback: "page.dataReload",
				message : {
					cameraYN: page.imgList.length != 0 ? "Y" : "N"
				}
			});
		});
		
		$("#btnCamera").click(function(){		  
			var externalDirPath = "ieis";
			var imgName = "test";
			
			var directory = "{external}/" + externalDirPath + "/";
			var imageName = imgName + ".jpg";
			
			bizMOB.Camera.capture(function(data){
				
				ImgUtil.resizeImage(data.result, 0.5, 2, function(resultjson){
					var fileList    = new Array;
				    
					fileList.push({
					    file_name 	: ImgUtil.getFileNameList(resultjson.result.toString()),
					    file_id     : resultjson.result.toString()
					});
						bizMOB.Network.fileUpload(fileList, function(uploadResult) {
						var UID = uploadResult.uids[0].UID;
						var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0054");
				    	tr.body.P01 = UID;
				    	tr.body.P02 = page.smplNo;
				    	tr.body.P03 = page.planId;
				    	tr.body.P04 = ""//page.workNo;
				    	tr.body.P05 = "";
				    	bizMOB.Web.post({
				    		message:tr,
				    		success:function(json){
				    			if(!json.header.result){
				    				bizMOB.Ui.alert("이미지 등록", json.header.error_text);
				    			}
								else {
									page.appendImage(json.body.R01);
								}
							}
						});
					});
				});
			}, directory, imageName);
		});
		$("#btnRegist").click(function(){
			
			var isCOMMYN = false; // 대표이미지 선택 여부
			$(".group02:not(.bx-clone) .chkComm").each(function(i, listElement){
				if($(listElement).prop("checked")){
					isCOMMYN = true; 
				}
			});
			
			if(page.imgList.length == 0){
				bizMOB.Ui.toast("사진 촬영 후 진행해주세요.");
				return;
			};
			
			bizMOB.Ui.closeDialog();			
		});
		
		$(".divImages").delegate(".chkComm", "click", function(){			
			if($(this).prop("checked")){
				$(".chkComm").prop("checked", false);
				$(this).prop("checked", true);
				var $that = $(this).parent().find(".images");
				
				$.each(page.imgList, function(i, listElement){
					if(listElement.IMAGNO == $that.attr("imagno")){
						listElement.COMMYN = "1";
					}else{
						listElement.COMMYN = "0";
					}
				});
				return;
			}else{
				$(this).prop("checked", false);
			}
			
		});
		
	},
	initLayout:function()
	{		
		//bizMOB.Ui.displayView();
	},
	getImageList: function(){
		var tr = bizMOB.Util.Resource.getTr("Cesco", "FS0055");

		tr.body.P01 = page.smplNo;
		tr.body.P02 = page.planId;
		tr.body.P03 = "";//page.workNo;
		bizMOB.Web.post({
			message: tr,
			success: function(json){
				if(!json.header.result){					
					bizMOB.Ui.toast("이미지 리스트를 불러오는데 실패하였습니다.");					
					return;
				}
				page.imgList = json.body.LIST01;
				page.setImageList();				
			}
		});
	},
	
	setImageList: function(){
		$("#sliderBox").html('<div style="height:100%;" class="bxslider imgList h"> </div>');
		//var ip = "http://10.200.0.104:8481/";
		var ip = "http://mobile.cesco.biz/sfa/";
		$.each(page.imgList, function(i, listElement){
			$(".imgList").append('<ul class="group02"><img class="images" src="' + ip + 
					listElement.IMAGPATH + '" style="width:260px; height: 240px; margin-left: 32px;" imagno="' + listElement.IMAGSEQN + '"/>');
		});
		if(page.imgList.length != 0){
		$(".bxslider").bxSlider(
			{
				pager : false
			});
		}
	},
	appendImage: function(imagePath){		
		page.imgList.push({
			IMAGPATH: imagePath
		});
		page.setImageList();
	},
	viewImage: function(){
		$("#sliderBox").html('<div style="height:100%;" class="bxslider imgList h"> </div>');
		//var ip = "http://10.200.0.104:8481/";
		var ip = "http://mobile.cesco.biz/sfa/";
		
		var varSplitTemp = page.strPATH.split('|');
		
		$.each(varSplitTemp, function(i, item){
			
			var varItemTemp = item.split('_');
			$(".imgList").append('<ul class="group02"><img class="images" src="' + ip + 
					varItemTemp[0] + '" style="width:260px; height: 240px; margin-left: 32px;" imagno="' + varItemTemp[0]+ '"/>' +
					'<input type="checkbox" class="chkComm" style="margin-left:150px; margin-top: 10px; "' + (varItemTemp[1] == "1" ? "checked" : "") + '/> </ul>');
		});
		
		if(varSplitTemp.length != 0){
			
			$(".bxslider").bxSlider({
				pager : false
			});
		}
		
//		$(".imgList").append('<ul class="group02"><img class="images" src="' + ip + 
//				page.strPATH + '" style="width:260px; height: 240px; margin-left: 32px;" imagno="' + "0" + '"/><input type="checkbox" class="chkComm" style="margin-left:150px; margin-top: 10px;"/> </ul>');
//		$('.bxslider').bxSlider(
//		{
//			pager : false
//		});
	},
};