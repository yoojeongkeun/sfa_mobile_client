/*
 * BizMOB 사용 FTP 간편화 유틸
 */
window.ImgUtil = 
{
	/**** [{file_name : "파일명", file_id : "파일경로"}] ****/
	fileUpload:function(fileArray, callBackFunc)
	{
		bizMOB.Network.fileUpload(fileArray, function(data){
			data.uids;
		});
	},
	/**** 사진 찍기 ****/
	shoot:function(externalDirPath, imgName, callbackFunc)
	{
		var directory = "{external}/" + externalDirPath + "/";
		var imageName = imgName + ".jpg";
		
		bizMOB.Camera.capture(function(data){
			ImgUtil.resizeImage(data, function(resultjson){
				var fileList     = new Array;
				fileList.push({
				    file_name 	: ImgUtil.getFileName(resultjson.result), // 파일 이름
					file_id 	: resultjson.result // 파일 경로
				});
				if (callbackFunc) callbackFunc(fileList);
			});
		}, directory, imageName);
	},
	/**** 이미지 파일명 추출 ****/
	getFileName : function(file_path) {	// 이미지 파일명 추출
		
		var len = file_path.length;
	    var last = file_path.lastIndexOf("/"); // 파일명 추출
	    var ext = file_path.substr(last + 1, len - last);  //파일명 추출 (공백 제외)
	   
	    return ext;
	},
	/**** 이미지 리사이즈 ****/
	resizeImage:function(data, callbackfunc)
	{
		var imgInfo = 
		{
			call_type	:"js2app",
	        id			:"RESIZE_IMAGE",
	        param		:
	        	{
		               callback			: "bizMOB.callbacks["+bizMOB.callbackId+"].success",
		               image_paths 		: [data.result],
		               // 0.0은 최저품질  1.0은 최대품질
		               compress_rate	: 1.0, 
		               // true 인 경우 fileName_resize 로 파일 생성, false 인 경우 기존 파일에 어쓰기.
		               copy_flag 		: false,
		               //해상도 조절(1이면 원본, 2는 1/2, 4는 1/4로 되며 2의제곱값 입력, 2의 제곱값 외에는 입력값 반올림 처리됨, integer)
		               split_resolution : 2//,
		               // 복사된 파일이 저장될 경로 타입. internal or external (copy_flag 가 true 일때 사용됨)
		               //source_path_type : "internal",
		               // directory 명을 적는곳. 파일 이름은 컨테이너 내부에서 해결합니다. (copy_flag 가 true 일때 사용됨)
		               //source_path 		: "temporary/"

                  }    
		};
		
		var callback =  function(json) {
			if (callbackfunc) callbackfunc(json);
		};
         
		bizMOB.callbacks[bizMOB.callbackId++] = {success:callback};
		bizMOB.onFireMessage(imgInfo);
	}
};
