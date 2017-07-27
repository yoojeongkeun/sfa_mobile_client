/**
 * @author ehpark@mcnc.co.kr
 * @desc 유틸리티 함수
 */




(function($, undefined)
{		
	window.cescoUtil = {
			appTest		: false
	};
	
	/**
	 * 서버의 응답(json 형식)에 대한 오류검사
	 * @param {Object} tr response
	 * @param {Boolean} 메시지 출력여부
	 */
	cescoUtil.checkResponseError = function(tr, noMsg)
	{
		if(!tr)
		{
			if(!noMsg) {
				cescoUtil.alert.show("서버에 연결할 수 없습니다.");
			}
			console.log("(warning)check response - tr is empty");
			return false;
		}
		if(!(tr.header))
		{
			if(!noMsg) {
				cescoUtil.alert.show("서버에 연결할 수 없습니다.");
			}
			console.log("(warning)check response - tr header is empty");
			return false;
		}
		if(!(tr.header.result))
		{			
			console.log("(warning)check response - tr.header.result is false");
		
			if(tr.header.error_code=="HE0503" ||  tr.header.error_code=="NE0001" || tr.header.error_code=="NE0002" || tr.header.error_code=="NE0003"){
				if(!noMsg) {
					cescoUtil.alert.show(tr.header.error_text||"네트워크 상태가 좋지 않습니다.\n잠시후 다시 시도해 주세요.");
				}
				return false;
			}
			else if(tr.header.error_code=="ERR000"){
				if(!noMsg) {					
					cescoUtil.alert.show({
						txtHtml : tr.header.error_text||"장시간 미사용으로 접속이 끊어졌습니다. 로그인을 다시 해주세요.",
						btnTxt : "확인",
						callback : function() {
							cescoUtil.windowOpen({	
								_sPagePath : "login/html/login.html"
							});
						}
					});
				}
				return false;
			}
			else {
				if(!noMsg) {
					bizMOB.Ui.alert( tr.header.error_text );
				}
				return false;
			}
		}
		else return true;
	};
	
	/**
	 * WEB 에뮬레이터 여부
	 * @return {Boolean} WEB 에뮬레이터 여부
	 * */
	cescoUtil.isEmulator = function()
	{
		return (bizMOB.Device.Info.model == "Emulator");
	};
		
	/**
	 * 현재화면ID 정보
	 * @return {String}  현재화면ID 
	 * */
	cescoUtil.currPageId = function()
	{
		return document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.lastIndexOf("."));
	};
	
	/**
	 * requestTr
	 * @param {Boolean} _bProgress 프로그래스바  표시여부 
	 */
	cescoUtil.requestTr = function(_sTrcode) {
		
		var required = new Array("_sTrcode");
		
		if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
			return;
		}
				
		var TR_HEADER = {
			"result" : true,
			"error_code" : "",
			"error_text" : "",         
			"info_text" : "",         
			"message_version" : "",         
			"login_session_id" : "",         
			"trcode" : arguments[0]._sTrcode
		};
		
		var TR_BODY = {};
		
		var header = $.extend(true,TR_HEADER , arguments[0]._oHeader);
		var body = $.extend(true,TR_BODY , arguments[0]._oBody);
		
		var callbackid =  bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
			
		var params ={
			trcode : arguments[0]._sTrcode,
			message:{ header: header , body : body },
			callback: callbackid,
			read_timeout : 60*1000,
			progress : arguments[0]._bProgress === true ? true : false,
		};
				
		bizMOB.Util.callPlugIn("RELOAD_WEB", params);
		
	};
	
	/**
	 * 화면 세로고정 열기
	 * @param {Boolean} _Animation 화면열기 애니메이션 여부 
	 * @param {String}_Effect 화면열기 방향 left, right, top, bottom
	 * */
	cescoUtil.windowOpen = function(param) {
		/*if(param._sType == "popup"){
			bizMOB.Window.open(param);		
		}else{
			
			var oldparam = {
					replace:arguments[0]._bReplace,
					message:arguments[0]._oMessage,
					target_page:arguments[0]._sPagePath,
					orientation:"portrait",
					page_name:arguments[0]._sName,
					hardware_accelator : arguments[0]._bHardwareAccel === true ? true : false,
					animation : arguments[0]._Animation=== true ? true : false,
					effect :arguments[0]._Effect
				};
			
			var params = $.extend(true, {
				replace:false,
				message:{},
				page_name : "",
				target_page:"",
				orientation:'none',
				animation:true,
				effect:"left"
			}, oldparam);
			
			var callPlugInID = params.replace ? "REPLACE_WEB" : "SHOW_WEB";
			
			bizMOB.Util.callPlugIn(callPlugInID, params);

		}*/
		/*_sPagePath	: "SET/html/SET_0202.html",
		_bReplace 	: true,
		_oMessage 	: {
			installData : page.installData
		}*/
		
		bizMOB.Web.open(param._sPagePath, {
			modal : false,
			replace : false,
			message : {
				installData : param._oMessage.installData
			}
		});
	};
	
	/**
	 * 화면 닫기
	 * @param {String}_Effect 화면닫기 방향 left, right, top, bottom
	 * */
	cescoUtil.windowClose = function(param) {	
		
		if(param._sType == "popup"){
			bizMOB.Window.close(param);
		}else{
			
			var oldparam = {
					message:arguments[0]._oMessage,
					callback:arguments[0]._sCallback,
					animation : true,
					effect : arguments[0]._sEffect
				};
		
			var params = $.extend(true, {
				message:{},
				callback: "bizMOBCore.Module.echo"	,
				effect : "right"
			}, oldparam);
			
			bizMOB.Util.callPlugIn("POP_VIEW", params);
		}		
	};	

	/**
	 * 팝업 alert
	 * @param {Object} arg { txtHtml, btnTxt, callback}
	 */
	cescoUtil.alert = {
		obtn 	: function() {},
		show	: function(arg) {
			
			var txtHtml ="", btnTxt = "확인";
			
			if(!arg) return;
			
			if (arg.constructor == String) {
				txtHtml = arg;
				
			} else {
				txtHtml = arg.txtHtml;
				
				if(arg.btnTxt) 	{ 
					btnTxt = arg.btnTxt; 
				}
				
				if(arg.callback) {
					cescoUtil.alert.obtn = arg.callback;
				}
			}
			
			/*bizMOB.Window.open({
				_sPagePath : "COM/html/COM_0100.html",
				_sWidth : "80%",
				_sHeight : "30%",
				_sType : "popup",
				_oMessage : {
					txtHtml		: txtHtml,
					btnTxt		: btnTxt
				}
			});*/
			bizMOB.Ui.alert("안내", txtHtml);
		}
	};
	
	/**
	 * 팝업 confirm
	 * @param arg { txtHtml, lbtnTxt, rbtnTxt, lCallback, rCallback }
	 */
	cescoUtil.confirm = {
		lbtn 	: function() {},
		rbtn 	: function() {},
		show	: function(arg) {
			
			if(arg.lCallback) {
				cescoUtil.confirm.lbtn = arg.lCallback;
			}
			
			if(arg.rCallback) {
				cescoUtil.confirm.rbtn = arg.rCallback;
			}
			
			bizMOB.Window.open({
				_sPagePath : "COM/html/COM_0200.html",
				_sWidth : "80%",
				_sHeight : "30%",
				_sType : "popup",
				_oMessage : {
					txtHtml	: arg.txtHtml,
					lbtnTxt 	: arg.lbtnTxt || "취소",
					rbtnTxt 	: arg.rbtnTxt || "확인",
				}
			});			
		}
	};
		
	/**
	 * 네이티브 메인화면이동하기
	 * */
	cescoUtil.backToMain = function()
	{
        bizMOB.Util.callPlugIn("NATIVE_NAVIGATION", { 
        	"type" : "name",
            "index" : 0,
            "page_name" : "home",
		});
	};
	
	/**
	 * 로그아웃
	 * */
	cescoUtil.logout = function()
	{	
		cescoUtil.confirm.show({
			txtHtml 	: "로그아웃 하시겠습니까?",
			rbtnTxt 	: "확인",
			rCallback	: function() {
				
				cescoUtil.StorageRemove("userInfo");
				cescoUtil.backToMain();
			}
		});
		
	};
		
	
	/**
	 * 로컬 데이터 저장
	 * @param {String}	key			
	 * @param {Object}value
	 */
	cescoUtil.StorageSet = function(key, value) {
		
		var param = {data:[]};
		
		switch(arguments[0].constructor)
		{
			case Array :
				var datalist =  arguments[0];
				for(var i=0,len = datalist.length; i< len; i++){
					var value = datalist[i]["value"];
					datalist[i]["value"] = value!=undefined && value!=null ? JSON.stringify(value) : "";
				    bizMOB.MStorage[datalist[i]["key"]] = datalist[i]["value"];
				}
				param.data = datalist;
				
				break;
			case String :
				var datalist = new Array();

				var strValue = value!=undefined && value!=null ? JSON.stringify(value) : "";
				
				datalist.push({key:key, value:strValue});
				param.data = datalist;
				
				bizMOB.MStorage[key] = strValue;
				break;
		}
				
		//bizMOB.Util.callPlugIn("SET_MSTORAGE", param);
		var v = {
		    call_type : "js2app",
	        	id    : "SET_MSTORAGE",
	        	param  : param
		    };
	    bizMOB.onFireMessage(v);
		
		
		
	};
	
	/**
	 * 로컬 데이터 가져오기
	 * @param {String}		key
	 */
	cescoUtil.StorageGet = function(key) {
		var value = bizMOB.MStorage[key];
		var retValue=null;		
		if (value) {	retValue = JSON.parse(value);	}		
		return retValue;
	};	
	
	/**
	 * 로컬 데이터 삭제
	 * @param {String}		key
	 */
	cescoUtil.StorageRemove = function(key) {
		delete bizMOB.MStorage[key];
		bizMOB.Util.callPlugIn("REMOVE_MSTORAGE", {data:[key]});
	};
			
	/**
	 * 전화연결
	 * 	@param telNumber 전번
	 * */
	cescoUtil.callTEL = function(telNumber)
	{
		if(bizMOB.Device.isIOS() && bizMOB.Device.isTablet()){
			
			cescoUtil.alert.show("사용 기기는 전화 연결을 할 수 없습니다.");
			
		} else {
						
			cescoUtil.confirm.show({
				txtHtml	: "전화연결<br/>" + telNumber,
				rbtnTxt 	: "연결",
				rCallback	: function() {
					
					bizMOB.System.callTEL({						
						_sNumber : telNumber,
						_fCallback  : function(json){
							cescoUtil.alert.show("사용 기기는 전화 연결을 할 수 없습니다.");
						}
					});
				}
			});
		}
	};		
		
	/**
	 * 브라우저열기	 
	 * 	@param {String} url url
	 * */
	cescoUtil.callBrowser = function(url)
	{
		if(url && url != "" && "http://, https://, HTTP://, HTTPS://".indexOf(url.substr(0,7)) > -1)
		{
			bizMOB.System.callBrowser({	_sURL : url });			
		} else {
			bizMOB.System.callBrowser({	_sURL : "http://"+url });	
		}
	},
		
	/**
	 * 와이파이상태 가져오기 (Android)
	 * */	
	/*cescoUtil.wifiSatus = function(callback){				
		bizMOB.Util.callPlugIn("CHECK_AND_GET_FROM_WIFI", { 
			 type			: "status",
             callback 	: callback
		});		
	};*/
	cescoUtil.wifiSatus = function(callback){
	    var v = {
	    call_type : "js2app",
        	id    : "CHECK_AND_GET_FROM_WIFI",
        	param  : {
        		type   : "status",
        		callback  :callback
        	}
	    };
	    bizMOB.onFireMessage(v);
	};
	
	/**
	 * 와이파이목록 가져오기 (Android)
	 * */	
	cescoUtil.getWifiList = function(callback){				
		/*bizMOB.Util.callPlugIn("CHECK_AND_GET_FROM_WIFI", { 
			 type			: "list",
             callback 	: callback
		});	*/	
		var v = {
		    call_type : "js2app",
	        	id    : "CHECK_AND_GET_FROM_WIFI",
	        	param  : {
	        		type   : "list",
	        		callback  :callback
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};
	
	/**
	 * 와이파이연결 하기 (Android)
	 *  @param {String}  ssid, pwd, security_type, callback
	 * */	
	cescoUtil.connectWifi = function(ssid, pwd, security_type, callback){				
		/*bizMOB.Util.callPlugIn("CHECK_AND_GET_FROM_WIFI", { 
			type				: "connect",
            security_type	: security_type,
            ssid				: ssid,
            pwd				: pwd||"",
            callback 			: callback,
		});*/
		
		var v = {
		    call_type : "js2app",
	        	id    : "CHECK_AND_GET_FROM_WIFI",
	        	param  : {
	        		type   			: "connect",
	        		security_type	: security_type,
	                ssid			: ssid,
	                pwd				: pwd||"",
	        		callback  		:callback
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};
	
	/**
	 * 와이파이연결 끊기 (Android)
	 * */	
	cescoUtil.wifiDisconnect = function(callback){				
		/*bizMOB.Util.callPlugIn("CHECK_AND_GET_FROM_WIFI", { 
			type			: "disconnect",
			callback		: callback
		});	*/
		var v = {
		    call_type : "js2app",
	        	id    : "CHECK_AND_GET_FROM_WIFI",
	        	param  : {
	        		type   : "disconnect",
	        		callback  :callback
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};	
	
	/**
	 * 디바이스 설정화면 열기 (IOS)
	 * */	
	cescoUtil.wifiSetting = function(callback){				
		/*bizMOB.Util.callPlugIn("REQUEST_IOT_WIFI_SETTING", { 
             callback 	: callback
		});		*/
		var v = {
		    call_type : "js2app",
	        	id    : "REQUEST_IOT_WIFI_SETTING",
	        	param  : {
	        		callback  :callback
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};
	
	
	/**
	 * WIFI 연결 확인  (IOS)
	 * 	@param {String} ssid  
	 * */	
	cescoUtil.verifyWifiSetting = function(ssid, callback){				
		bizMOB.Util.callPlugIn("VERIFY_IOT_WIFI_SETTING", { 
			ssid		: ssid,
            callback 	: callback
		});		
	}; 
		
	/**
	 * Device 연결 확인  (IOS)
	 * 	@param callback 
	 * @return result
	 * */	
	cescoUtil.connectToIotDevice = function(callback){				
		bizMOB.Util.callPlugIn("CONNECT_TO_IOT_DEVICE", { 
             callback 		: callback
		});		
	}; 
	
	/**
	 * [CESCO_IOT] 
	 * WIFI 목록 가져오기
	 * @return result
	 * @return data [ { ssid, signalStrength, securityType}]
	 * */	
	cescoUtil.getSSIDList = function(callback){	
		/*bizMOB.Util.callPlugIn("GET_SSID_LIST", { 
             callback 	: callback
		});	*/
		//alert("!!");
		var v = {
		    call_type : "js2app",
	        	id    : "GET_SSID_LIST",
	        	param  : {
	        		callback  		:"page.callbackGetSSIDList"
	        	}
		    };
	    bizMOB.onFireMessage(v);
	}; 

	/**
	 * [CESCO_IOT] 
	 * 기기 설정하기 
	 * @param p { callback, ssid, pwd, securityType, staticIP, subnetMask, gateway, dns}
	 * */	
	cescoUtil.setIotDevece = function(p){
		//bizMOB.Util.callPlugIn("SET_IOT_DEVICE_WITH_SSID", p);
		
		p.ssid	= encodeURIComponent(p.ssid||"");
 		p.pwd	= encodeURIComponent(p.pwd||"");
		
		var v = {
		    call_type : "js2app",
	        	id    : "SET_IOT_DEVICE_WITH_SSID",
	        	param  : p
		    };
	    bizMOB.onFireMessage(v);
	}; 
	
		
	/**
	 * 데이트피커 setDate (yyyymmdd)
	 */
	$.fn.cescoSetDate = function(setDate) {
						
		var $this = this, date={};
		
		if(setDate) {
			date = {
					yyyymmdd		: option.setDate,
					year	 			: Number(option.setDate.substr(0,4)),
					month 			: Number(option.setDate.substr(4,2))-1,
					day				: Number(option.setDate.substr(6,2)),
					calendar_type : option.calendar_type || "양력"
				};
		} else {			
			var today = new Date();
			date = {
					yyyymmdd		: today.bMToFormatDate("yyyymmdd"),
					year	 			: today.getFullYear(),
					month 			: today.getMonth(),
					day				: today.getDay(),
					calendar_type : "양력"
			};
		}
				
		$this
			.data("date", date)
			.text( date.bMToFormatDate("yyyy.mm.dd"));
		
		return this;
		
	};
	/**
	 * 데이트피커 선택 이벤트
	 * option
	 *    validate
	 *    callback
	 */
	$.fn.cescoDatePicker = function(option) {
		
		var $this = this;
		
		$this
			.cescoSetDate()
			.click(function() {
				
				var cdate = $this.data("date");
				
				bizMOB.Util.callPlugIn("GET_PICKER", { 
					type 				: "date",
					calendar_type : cdate.calendar_type,
					year				: cdate.year,
					month			: cdate.month,
					day				: cdate.day,
		            callback 			: function(arg) {
		            	 if(arg.result) {
		            		 
		            		 if(option.validate) {
		            			if(option.validate(arg.result)) {
		            				_seledted(arg.result);
		            			}
		            		 } else {
		            			 _seledted(arg.result);
		            		 }
		            		             		 
						 }
		             },
				});	
					
			});
		
		var _seledted = function(arg) {   		
			
			arg.yyyymmdd = new Date(arg.year, arg.month, arg.day).bMToFormatDate("yyyymmdd");
			
	   		 $this.data("date", arg)
	   		 		.val( arg.yyyymmdd.bMToFormatDate(option.inputDateFormat || "yyyy.mm.dd") );
	   		 
	   		 if(callback) {
	   			option.callback(arg);
	   		 }   		 
		};
			
		return this;
	};
	
	/**
	 * 타임피커 setTime (HHnn)
	 */
	$.fn.cescoSetTime = function(setTime) {
		
		var $this = this, n = new Date();
		
		if(setTime) {
			var hour		= Number(setTime.substr(0,2)),
				minute 	= Number(setTime.substr(2,2));			
			n.setHours(hour, minute, 0, 0);
		} 
						
		var time = {
				hour 		: n.getHours(),
				minute 	: n.getMinutes(),
				HHHnn	: n.bMToFormatDate("HHnn")
			},
			time_type = time.hour < 12 ? "오전 " : "오후 ";	
			
		$this
			.data("time", time)
			.text( time_type + n.bMToFormatDate("hh:nn"));
		
		return this;
		
	};
	/**
	 * 타임피커 선택 이벤트
	 */
	$.fn.cescoTimePicker = function() {
		
		var $this = this;
		
		$this
			.cescoSetTime()
			.click(function() {
				
				var $this = $(this);
				var ctime = $this.data("time");
				
				bizMOB.Util.callPlugIn("GET_PICKER", { 
					type 			: "time",
					hour			: ctime.hour,
					minute		: ctime.minute,
		            callback 		: function(arg) {
		            	
		            	 if(arg.result) {
		            		 
		            		var n = new Date(); n.setHours(arg.hour, arg.minute, 0, 0);
		            			
		            		$this
		            			.text( arg.time_type + n.bMToFormatDate(" hh:nn"))
		            			.data("time", {
		            				hour 		: arg.hour,		
		            				minute 	: arg.minute,
		            				HHHnn	: n.bMToFormatDate("HHHnn")
		            			});
						 }
		             }
				});			
			});	
	
		return this;
	};
	
	/**
	 * 페북
	 * @param {Object} fb_info 
	 * @param {Function} callback
	 * */	
	cescoUtil.sendToFacebook = function(fb_info, callback){			
		
		var _fb_info = {
    			imagePath 	: "",
    			imageUrl 	: "",
    			urlPath 		: "",
    			urlInfo 	: {
    				title 		: "title",
    				desc 		: "desc",
    				imageUrl	: "",
    			}
    		};
		
		$.extend(true, _fb_info, fb_info);
		
		bizMOB.Util.callPlugIn("SEND_TO_SNS", { 
			type 			: "fb",
            fb_info		: _fb_info,
            callback	 	: function(arg) {
            	if(!arg.result) {
            		bizMOB.Window.toast({	_sMessage : arg.error_message	});
            		
            	} else {
            		if(callback) { callback();}
            	}
            },
		});		
	};
	
	/**
	 * 카톡
	 * @param {Object} kt_info 
	 * @param {Function} callback
	 * */	
	cescoUtil.sendToKakaotalk = function(kt_info, callback){			
		
		var _kt_info = {
				text 				: "text",
				urlPath 			: "",  
				imageUrl 		: "",
    		};
		
		$.extend(true, _kt_info, kt_info);
		
		bizMOB.Util.callPlugIn("SEND_TO_SNS", { 
			type 			: "kt",
			kt_info		: _kt_info,
            callback	 	: function(arg) {
            	if(!arg.result) {
            		bizMOB.Window.toast({	_sMessage : arg.error_message	});
            		
            	} else {
            		if(callback) { callback();}
            	}
            }
		});		
	};
	

	/**
	 * 카스
	 * @param {Object} ks_info 
	 * 	@param {Function} callback
	 * */	
	cescoUtil.sendToKakaostory = function(ks_info, callback){			
		
		var _ks_info = {
				imagePath 	: "",
				text 			: "text",
				urlPath 		: "",
				urlInfo : {
					title 		: "title",
					desc 		: "desc",
					imageUrl : ""
				}
    		};
		
		$.extend(true, _ks_info, ks_info);
		
		bizMOB.Util.callPlugIn("SEND_TO_SNS", { 
			type 			: "ks",
			ks_info		: _ks_info,
            callback	 	: function(arg) {
            	if(!arg.result) {
            		bizMOB.Window.toast({	_sMessage : arg.error_message	});
            		
            	} else {
            		if(callback) { callback();}
            	}
            }
		});		
	};
		
	/**
	 * qr 리더
	 * */	
	cescoUtil.qr = function(callback){				
		/*bizMOB.Util.callPlugIn("QR_AND_BAR_CODE", { 
			type 			: "standby",
            callback	 	: callback
		});		*/
		var v = {
		    call_type : "js2app",
	        	id    : "QR_AND_BAR_CODE",
	        	param  : {
	        		type   : "standby",
	        		callback  :callback
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};
	
	/**
	 * nfc (Android)
	 * check_status
	 * */	
	cescoUtil.nfcCheckStatus = function(){
		/*bizMOB.Util.callPlugIn("GET_NFC", { 
			type 			: "check_status",
            callback	 	: "callback_nfcCheckStatus"
		});	*/
		var v = {
		    call_type : "js2app",
	        	id    : "GET_NFC",
	        	param  : {
	        		type   : "check_status",
	        		callback  :"callback_nfcCheckStatus"
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};
	callback_nfcCheckStatus = function(resStatus)
	{		
		page.callback_nfcCheckStatus(resStatus);
	};
	
	/**
	 * nfc (Android)
	 * enable_read_nfc
	 * */	
	cescoUtil.nfcEnable = function(){				
		/*bizMOB.Util.callPlugIn("GET_NFC", { 
			type 					: "enable_read_nfc",
			event_callback 	: "callback_readNFC",
            callback	 			: "callback_nfcEnable"
		});		*/
		var v = {
		    call_type : "js2app",
	        	id    : "GET_NFC",
	        	param  : {
	        		type   : "enable_read_nfc",
	        		event_callback 	: "callback_readNFC",
	        		callback  :"callback_nfcEnable"
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};	
	callback_readNFC = function(resReadNFC)
	{
		if(resReadNFC.result) {
			page.callback_readNFC(resReadNFC);
		} else {
			bizMOB.Window.toast({_sMessage : "정보를 읽어올 수 없습니다"});
		}
	};	
	callback_nfcEnable = function(nfcEnable) {		
		if(!nfcEnable.result) {
			bizMOB.Window.toast({_sMessage : "정보를 읽어올 수 없습니다"});
		}
	};
	
	/**
	 * nfc (Android)
	 * request_nfc_setting
	 * */	
	cescoUtil.nfcRequestSetting = function(){				
		bizMOB.Util.callPlugIn("GET_NFC", { 
			type 			: "request_nfc_setting"
		});		
		
		var v = {
		    call_type : "js2app",
	        	id    : "GET_NFC",
	        	param  : {
	        		type   : "request_nfc_setting"
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};
		
	/**
	 * nfc (Android)
	 * disable_read_nfc
	 * */	
	cescoUtil.nfcDisable = function(){				
		bizMOB.Util.callPlugIn("GET_NFC", { 
			type 			: "disable_read_nfc"
		});	
		var v = {
		    call_type : "js2app",
	        	id    : "GET_NFC",
	        	param  : {
	        		type   : "disable_read_nfc"
	        	}
		    };
	    bizMOB.onFireMessage(v);
	};
		
	/**
	 * input type number 
	 * maxlength check
	 * 
	 * ex) html 
	 * <input type="number" pattern="[0-9]*" inputmode="numeric" oninput="cescoUtil.inpNumMaxLengChk(this)" value="1" maxlength="4" class="inpQnt" >
	 * */
	cescoUtil.inpNumMaxLengChk = function(el){
	   if (el.value.length > el.maxLength){
		   el.value = el.value.slice(0, el.maxLength);
	   }    
	};
	
	/**
	 * event click 
	 * prevent double click
	 * @param {Number} term (millisecond)
	 * */	
	cescoUtil.dbClick=false;
	$.event.special.click = {
	    delegateType: "click",
	    bindType: "click",
	    handle: function( event ) {
	        var handleObj = event.handleObj;
	        var ret = null;

	        if(cescoUtil.dbClick) return;	
	        cescoUtil.dbClick = true;
	        
			setTimeout(function() { 	
				cescoUtil.dbClick = false;
			}, ((event.data && event.data.term) || 700) );		
			
            event.type = handleObj.origType;
            ret = handleObj.handler.apply( this, arguments );
            event.type = handleObj.type;
            return ret;	        
	    }
	};
		
	/**
	 *  bizMOB.Util.Validate  메시지가 없는경우 alert 표시하지 않는다
	 * */
	bizMOB.Util.Validate.setDefaults({
		onError : function(errors) {
			var message = "";
			for(key in errors)
			{
				if(errors.hasOwnProperty(key))
				{
					var errorInfo = errors[key];
					if(message) message+="\n";
					message += errorInfo.message;
				}
			}
			if(message) {
				cescoUtil.alert.show(message);
			}
		}		
	});
				
})(jQuery, undefined);
