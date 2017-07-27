/**
 * IMAGE 관련 펑션
 */
window.ImgUtil = 
{
	/**
	 * 이미지 보기
	 * @param imageSeqn : 이미지 순번 (CESCOEIS.dbo.TB_CM_IMAGE)
	 */
	imageView:function(imageSeqn, callback)
	{
		ImgUtil.downLoadImg(imageSeqn, callback);
	},
	/**
	 * 이미지 다운로드
	 * ImgUtil.downLoadImg(imgse, function(imgpath) {
	 * 		bizMOB.Ui.alert(imgpath);
	 * });
	 * @param imageSeqn
	 * @param callback : 미지정시 바로 오픈, 지정시 filepath 리턴
	 */
	downLoadImg:function(imageSeqn, callback)
	{
		var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00062");
    	tr.body.P01 = imageSeqn.bMToNumber();
    	
    	bizMOB.Web.post({
    		message:tr,
    		success:function(json){
    			if(json.header.result==false){
    				bizMOB.Ui.alert("이미지 뷰", json.header.error_text);
    				return;
    			}
				var url = json.body.R01.toString() + "" + '?file_name=' + json.body.R03.toString() + "&file_path=" + json.body.R02.toString();
    			var downList = 
    				[
    				 	{
    				 		uri       : url,
    						overwrite : true,
    						filename  : json.body.R03,
    						directory : "{external}/ipm/" // 내부
    						//directory :"{temporary}/ipm/" // 외부
    				 	}
    				];
    			
    			bizMOB.Network.fileDownload(
    					downList,
    					"foreground",
    					{
    						callback : function(json){
    							if(json.result) {
    								if (callback)
									{
    									//bizMOB.Ui.alert(json.file_path);
    									callback(json.file_path);
									}
    								else
									{
    						            bizMOB.File.open(json.file_path, 
    						            {
    						            	callback : function(json)
    						            	{	
    						            	}
    						            });
									}
    							}
    							else bizMOB.Ui.alert("알림", "등록된 사진이 없습니다." + url);
    						}
    					}
    				);
			}
		});
	},
	/**
	 * 사진찍기
	 * @param externalDirPath : 임시 이미지 path
	 * @param imgName : 임시 이미지 이름
	 * @param callbackFunc : 사진촬영 완료 후 DB 저장후 데이터 리턴(callback(data{imageseqn})
	 */
	shoot:function(externalDirPath, imgName, callbackFunc)
	{
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
					var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00061");
			    	tr.body.P01 = UID;
					
			    	bizMOB.Web.post({
			    		message:tr,
			    		success:function(json){
			    			if(json.header.result==false){
			    				bizMOB.Ui.alert("이미지 저장", json.header.error_text);
			    			}
							else {
								if (callbackFunc) callbackFunc(json.body.R01);
							}
						}
					});
				});
			});
		}, directory, imageName);
	},
	/**
	 * 사진찍기
	 * @param externalDirPath : 임시 이미지 path
	 * @param imgName : 임시 이미지 이름
	 * @param callbackFunc : 사진촬영 완료 후 DB 저장후 데이터 리턴(callback(data{imageseqn})
	 */
	signPad:function(externalDirPath, imgName, callbackFunc)
	{
		var directory = "{external}/" + externalDirPath + "/";
		var imageName = imgName + ".jpg";
		
		bizMOB.Native.SignPad.open(function(data) {
			ImgUtil.resizeImage(data.file_path, 1, 1, function(resultjson){
				var fileList    = new Array;
				fileList.push({
				    file_name 	: ImgUtil.getFileNameList(resultjson.result.toString()),
				    file_id     : resultjson.result.toString()
				});
				
				bizMOB.Network.fileUpload(fileList, function(uploadResult) {
					var UID = uploadResult.uids[0].UID;
					var tr = bizMOB.Util.Resource.getTr("Cesco", "CM00061");
			    	tr.body.P01 = UID;
					
			    	bizMOB.Web.post({
			    		message:tr,
			    		success:function(json){
			    			if(json.header.result==false){
			    				bizMOB.Ui.alert("이미지 저장", json.header.error_text);
			    			}
							else {
								if (callbackFunc) callbackFunc(json.body.R01);
							}
						}
					});
				});
			});
		}, directory, imageName);
	},
	/**
	 * 이미지 파일명 추출
	 * @param file_path : 파일 path
	 * @returns string
	 */
	getFileNameList : function(file_path) {	// 이미지 파일명 추출
		
		var len = file_path.length;
	    var last = file_path.lastIndexOf("/"); // 파일명 추출
	    var ext = file_path.substr(last + 1, len - last);  //파일명 추출 (공백 제외)
	   
	    return ext;
	},
	/**
	 * 이미지 리사이즈
	 * @param data
	 * @param callbackfunc
	 */
	resizeImage:function(data, compressrate, splitresolution, callbackfunc)
	{
		
		var imgInfo = 
		{
			call_type	:"js2app",
	        id			:"RESIZE_IMAGE",
	        param		:
	        	{
		               callback			: "bizMOB.callbacks["+bizMOB.callbackId+"].success",
		               image_paths 		: [data],
		               // 0.0은 최저품질  1.0은 최대품질
		               compress_rate	: compressrate, 
		               // true 인 경우 fileName_resize 로 파일 생성, false 인 경우 기존 파일에 어쓰기.
		               copy_flag 		: false,
		               //해상도 조절(1이면 원본, 2는 1/2, 4는 1/4로 되며 2의제곱값 입력, 2의 제곱값 외에는 입력값 반올림 처리됨, integer)
		               split_resolution : splitresolution,
		               // 복사된 파일이 저장될 경로 타입. internal or external (copy_flag 가 true 일때 사용됨)
		               source_path_type : "internal",
		               // directory 명을 적는곳. 파일 이름은 컨테이너 내부에서 해결합니다. (copy_flag 가 true 일때 사용됨)
		              // source_path 		: "temporary/"
		               source_path 		: "external/"
		               
                  }    
		};
		
		var callback =  function(json) {
			
			if (callbackfunc) callbackfunc(json);
		};
         
		bizMOB.callbacks[bizMOB.callbackId++] = {success:callback};
		bizMOB.onFireMessage(imgInfo);
	}
};
