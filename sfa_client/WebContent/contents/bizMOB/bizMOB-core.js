/**
 * bizMOBCore 
 * 
 * @class	bizMOBCore
 * @version 3.0.0
 * @author	mobile C&C 김승현
 */

var bizMOBCore = {};

bizMOBCore.version = "3.0";
bizMOBCore.readystatus = false;
bizMOBCore.classes = {};
bizMOBCore.loglevel = 15;  //Log(1)Debug(2)Wargin(4)Error(8)
bizMOBCore.layers = {};
bizMOBCore.RELATE_DEPTH = "";
bizMOBCore.APP_CONFIG = $.ajax({ "url" : "../../bizMOB/config/app.config", "async" : false, "cache" : false, "dataType" : "JSON" }).responseJSON;

bizMOBCore.CallbackManager = function() {};

bizMOBCore.CallbackManager.prototype = new Object();

bizMOBCore.CallbackManager.servicename = "CallbackManager";

bizMOBCore.CallbackManager.index = 0;

bizMOBCore.CallbackManager.storage = {};

bizMOBCore.CallbackManager.listener = {};

bizMOBCore.CallbackManager.save = function(fCallback, sType){
	
	var action = "save";
	var callbackId = "";
	
	if(!fCallback){
		bizMOBCore.Module.logger(this.servicename, action ,"L", "Callback function is not defined.");
		fCallback =  bizMOBCore.Module.echo;
	}
	
	switch(sType){
		case "listener" :
			callbackId = "lsn"+this.index++;
			this.listener[callbackId] = fCallback;
			bizMOBCore.Module.logger(this.servicename, action, "L", " Callback listener saved the function at "+callbackId+" area.");
			break;
		default :
			callbackId = "stg"+this.index++;
			this.storage[callbackId] = fCallback;
			bizMOBCore.Module.logger(this.servicename, action, "L", " Callback storage saved the function at "+callbackId+" area.");
			break;
	}
	
	
	return callbackId;
	
};

bizMOBCore.CallbackManager.responser = function(oCallback, oResdata){
	
	bizMOBCore.Module.logger(this.servicename, "responser", "L",  "CallbackManager recieve response from native : " );
	
	if(oCallback.callback == "exception"){
		bizMOBCore.Module.logger(this.servicename, "responser", "E",  "Recieve Message is " + JSON.stringify(oResdata) );
		return;
	}
	
	//if(this.storage[oCallback.callback]){
	if(oCallback.callback.indexOf("stg") == 0){
		bizMOBCore.Module.logger(this.servicename, "responser", "D", oCallback.callback + " call from the storage : " );
		this.storage[oCallback.callback](oResdata.message);
		delete this.storage[oCallback.callback];
		
	//}else if(this.listener[oCallback.callback]){
	}else if(oCallback.callback.indexOf("lsn") == 0){
		
		bizMOBCore.Module.logger(this.servicename, "responser", "D", oCallback.callback + " call from the listener : " );
		this.listener[oCallback.callback](oResdata.message);
		
	}else{
		
		bizMOBCore.Module.logger(this.servicename, "responser", "D", oCallback.callback + " call from the page : " );
		
		var tempcall
		
		try{
			tempcall = eval(oCallback.callback);
			tempcall.call(undefined, oResdata.message);
		}catch(e){
			if(tempcall == undefined ){
				bizMOBCore.Module.logger(this.servicename, "responser", "E", "Callback does not exist. : " + JSON.stringify(oCallback.callback));
				
			}else if(tempcall.constructor !== Function){
				bizMOBCore.Module.logger(this.servicename, "responser", "E", "Callback is not a function. : " + JSON.stringify(oCallback.callback));
			}
		}
		
		
		
	}
	
	bizMOBCore.Module.logger(this.servicename, "responser", "L", oCallback.callback+" function called and removed.");
	
};

bizMOBCore.Module = function() {};

bizMOBCore.Module.prototype = new Object();

bizMOBCore.Module.servicename = "Module";

bizMOBCore.Module.cmdwatcher = false;

bizMOBCore.Module.cmdPosition = 0;

//bizMOBCore.Module.library = {
//		"util" : undefined,
//		"multilayout" : undefined
//};

bizMOBCore.Module.loadlibrary = function(fCallback){
	
	var action = "loadlibrary";
	var CURRENT_PATH = location.pathname;
	var PATH_DEPTH = CURRENT_PATH.split("/");
	var PATHARR_IDX=PATH_DEPTH.length-2;
	
	
	for(var i=PATHARR_IDX; i > 0;i--){
		if(PATH_DEPTH[i] != "contents"){
			bizMOBCore.RELATE_DEPTH += "../"; 
		}else{
			break;
		}
		
	}
	
	var jsUrls = 
	[ 
	 	//"bizMOB/lib/highcharts.js",
		"bizMOB/lib/jquery-1.7.2.min.js"
	];

	
	for(var i=0;i<jsUrls.length;i++) 
	{
		//JsList +=	"<script type=\"text/javascript\" src=\""+ bizMOBCore.RELATE_DEPTH + jsUrls[i] + "\" charset=\"utf-8\"></script>";
		var head= document.getElementsByTagName('head')[0];
		var script= document.createElement('script');
		script.type= 'text/javascript';
		script.defer = "defer";
		if(i == jsUrls.length-1){
			script.onload = fCallback;
		}
		script.src= bizMOBCore.RELATE_DEPTH + jsUrls[i] ;
		head.appendChild(script);
	}
	bizMOBCore.Module.logger(this.servicename, action ,"L", "bizMOB Library initialized. ");
	//document.write(JsList);
	
};
//bizMOBCore.Module.loadlibrary();

bizMOBCore.Module.checkelement = function(aParams, sElementName ){
	
	var action = "checkelement";
	var result = true;
	var typeList = {
			"textbutton" : bizMOBCore.Window.TextButton ,
			"imagebutton" : bizMOBCore.Window.ImageButton,
			"titlebar" : bizMOBCore.Window.TitleBar,
			"toolbar" : bizMOBCore.Window.TitleBar
	};
	
//	console.log("sElementName : %s", sElementName);
//	console.log("sElementName : %s", sElementName.substring(2).toLowerCase());
	
//	if(aParams && aParams.length > 0)	{
////		console.log("aParams : %o", aParams[0].constructor);
//	} else	{
////		console.log("aParams : %o", aParams);
//	}
	
	return result;
};

bizMOBCore.Module.checkparam = function(oParams, aRequired){
	
	var action = "checkparam";
	var result = true;
	var typeList = {
			"b" : Boolean ,
			"a" : Array, 
			"s" : String ,
			"f" : Function ,
			"o" : Object ,
			"n" : Number ,
			"v" : "Variable",
			"e" : "Element"
	};
	
	if(oParams == undefined) { 
		bizMOBCore.Module.logger(this.servicename, action ,"D", "Paramter is undefined.");
		return true; 
	}
	if(aRequired == undefined) { aRequired = new Array(); }
	
	bizMOBCore.Module.logger(this.servicename, action ,"D", "Paramter is " + JSON.stringify(oParams));
	
	//Basic Check
	if(oParams == undefined || oParams.constructor != Object ) {
		bizMOBCore.Module.logger(this.servicename, action ,"E", "Invalid parameter format. Paramter have to define JSON.");
		return false;
	}
	
	
	for(var i =0; i< aRequired.length ; i++){
		//Required param Check
		if(oParams[aRequired[i]] == undefined ) {
			bizMOBCore.Module.logger(this.servicename, action ,"E", aRequired[i]+" parameter is required.");
			result = false;
			break;
		}
	}
	
	//Param Type Check
	for(var prop in oParams){
		
		if(oParams[prop] == undefined){
			bizMOBCore.Module.logger(this.servicename, action ,"L", prop+" parameter is undefined. it skip check");
		}else if(oParams[prop] == null) {
			bizMOBCore.Module.logger(this.servicename, action ,"L", prop+" parameter is null. it skip check.");
		}else{
			var paramtype = prop.substring(1,2);
			
			if(typeList[paramtype] == undefined) {
				bizMOBCore.Module.logger(this.servicename, action ,"E", prop+" parameter is unknown variable type.");
				result = false;
				break;
			} else if(typeList[paramtype] == Array)	{
				for(var idx = 0; idx < aRequired.length; idx++)	{
					if(aRequired[i] == prop && oParams[prop].length === 0)	{
						bizMOBCore.Module.logger(this.servicename, action ,"E", prop+" is empty Array.");
						result = false;
						break;
					}
				}
			} else if(oParams[prop].constructor !== typeList[paramtype] && typeList[paramtype] != "Variable" ){
				
				if(typeList[paramtype] == "Element" ){
						
					if( !bizMOBCore.Module.checkelement([oParams[prop]], prop ) ){
						bizMOBCore.Module.logger(this.servicename, action ,"E", prop+" parameter have wrong value.");
						result = false;
						break;
					}
					
				}else{
					bizMOBCore.Module.logger(this.servicename, action ,"E", prop+" parameter have wrong value.");
					result = false;
					break;
				}
				
			}
				
		}
	}
	
	return result;
};

bizMOBCore.Module.requester = function() {
	
	var action = "requester";
	
	if(this.cmdQueue.length > this.cmdPosition){
		bizMOBCore.Module.logger(this.servicename , action, "D", (this.cmdPosition+1)+"th COMMAND Request.");
		document.location.href=this.cmdQueue[this.cmdPosition];
		this.cmdQueue[this.cmdPosition] = null;
		this.cmdPosition++;
		setTimeout("bizMOBCore.Module.requester();", 200);
	}else{
		console.log("COMMAND Stopped!!");
		this.cmdwatcher = false;
	}
	
};

bizMOBCore.Module.gateway = function(oMessage, sServiceName, sAction){
	
	var action = "gateway";
	
	oMessage.service_name = "["+sServiceName+"]["+sAction+"]";
	
	if( ! this.cmdQueue ){this.cmdQueue = new Array();}
	bizMOBCore.Module.logger(this.servicename , action, "D", (this.cmdPosition+1)+"th COMMAND Reserved. ---  " +sServiceName+ "."+sAction);
	oMessage = JSON.stringify(oMessage, this.replacer, 3);
	
	var url = 'mcnc:///';
//	if( bizMOB.Device.Info.os_type.indexOf("iPhone") >-1  && bizMOB.Device.Info.os_version.indexOf("8") == 0)
//	{
//		url +="/";
//	}
	url += encodeURIComponent(oMessage);
	this.cmdQueue.push(url);
	
	bizMOBCore.Module.logger(this.servicename , action, "D", "Request Service : "+sServiceName);
	bizMOBCore.Module.logger(this.servicename , action, "D", "Request Action : "+sAction);
	bizMOBCore.Module.logger(this.servicename , action, "D", "Request Param : "+oMessage);
	
	if( !this.cmdwatcher ){
		
		this.cmdwatcher = true;
		bizMOBCore.Module.logger(this.servicename , action, "D", (this.cmdPosition+1)+"th COMMAND Request!! ");
		document.location.href=this.cmdQueue[this.cmdPosition];
		this.cmdPosition++;
		setTimeout("bizMOBCore.Module.requester();", 200);
	}
		
};


bizMOBCore.Module.replacer = function(sKey, vValue) {
    if (typeof vValue === 'number' && !isFinite(vValue)) {
        return String(vValue);
    }
    return vValue;
};

bizMOBCore.Module.stringjson = function(vValue) {

	var value =  vValue!=undefined && vValue!=null ? JSON.stringify(vValue) : "";
    return value;
    
};

bizMOBCore.Module.parsejson = function(vValue) {

	var retValue;
	
	if ( vValue != undefined && vValue.slice(0, 1) != "0" && vValue != "" ) {
		retValue = JSON.parse(vValue);
	}
	
	return retValue;
    
};

bizMOBCore.Module.pathParser = function(sPath) {
	var splitPathType = {};
	var regExp = new RegExp("\{(.*?)\}\/(.*)","g");
	var result = regExp.exec(sPath);
	if(result)
	{
		splitPathType.type = result[1] ? result[1] : "absolute";
		splitPathType.path = result[2];
	}
	else 
	{
		splitPathType.type = "absolute"; 
		splitPathType.path = sPath; 
	}
	return splitPathType;
};


bizMOBCore.Module.echo = function(oReturnValue){
	var action = "echo";
	bizMOBCore.Module.logger("Module", action ,"L", "Echo callback . : ");
	if(oReturnValue.constructor !== Event){
		bizMOBCore.Module.logger("Module", action ,"D", "callback parameter . : "+ JSON.stringify(oReturnValue));
	}
	
};

bizMOBCore.Module.logger = function(sService, sAction, sLogtype, sMessage){
	
	var logmsg = "["+sService+"]"+"["+sAction+"] - "+sMessage;
	//logmsg = logmsg.replace(/\{/gi, "{\n").replace(/\}/gi, "}\n").replace(/\\"/gi, "");
	
	switch(sLogtype){
	case "E" :
		if([1,3,5,7,9,11,13,15].indexOf(bizMOBCore.loglevel) > -1){
			
			console.error("bizMOB ERROR : "+logmsg);
			console.trace();
			throw("bizMOB error. stop process");
		}
		break;
	case "W" :
		if([2,3,6,7,10,11,14,15].indexOf(bizMOBCore.loglevel) > -1){
			console.log("bizMOB WARN :"+logmsg);
		}
		break;
	case "L" :
		if([4,5,6,7,12,11,14,15].indexOf(bizMOBCore.loglevel) > -1){
			console.log("bizMOB LOG :"+logmsg);
		}
		break;
	case "D" :
		if([8,9,10,11,12,13,14,15].indexOf(bizMOBCore.loglevel) > -1){
			console.debug("bizMOB DEBUG:"+logmsg);
		}
		break;
	}

};

bizMOBCore.Module.init = function(oRequired, oOptions){
	
	var action = "init";
	
//	for(key in bizMOBCore.Module.library){
//		if(bizMOBCore.Module.library[key]){
//			bizMOBCore.Module.library[key]();
//			bizMOBCore.Module.logger(this.servicename, action ,"L", "bizMOB "+key+" Extends Library loaded. ");
//		}
//	}
	
	bizMOBCore.DeviceManager.init(); 
	bizMOBCore.Module.logger(this.servicename, action ,"L", "bizMOB DeviceManager initialized. ");
	bizMOBCore.EventManager.init();
	bizMOBCore.Module.logger(this.servicename, action ,"L", "bizMOB EventManager initialized. ");
	
	bizMOBCore.Module.logger(this.servicename, action ,"L", "bizMOB Module initialized. ");

};


bizMOBCore.Module.gettrid = function(){
	  var today = new Date();
	 
	  var year = today.getFullYear(); 
	  var month = today.getMonth()+1;
	  var day = today.getDate();
	  if(month<10) month= "0" + month ;
	  if(day<10) day = "0" + day;
	  
	  var fulldate = year+""+month+""+day;
	  
	  console.log("fulldate"+fulldate);
	  
	  var curHour = today.getHours();
	  var curMin = today.getMinutes();
	  var curSec = today.getSeconds();
	  var curMillSec = today.getMilliseconds();
	  if(curMillSec<10){
		  curMillSec = "00"+curMillSec;
	  }else if(curMillSec<100){
		  curMillSec = "0"+curMillSec;
	  }
	  var curTime = 
	    ((curHour < 10) ? "0" : "") + curHour  
	    + ((curMin < 10) ? "0" : "") + curMin  
	    + ((curSec < 10) ? "0" : "") + curSec + curMillSec;
	  console.log("curTime"+curTime);
	  return fulldate+curTime+bizMOB.Device.Info.device_id;
};

//bizMOBCore.Module.loadlibrary();

/**
 * biZMOB Web class
 * 
 * @class	웹 인터페이스
 */
bizMOBCore.Window = function() {};

bizMOBCore.Window.prototype = new Object();

bizMOBCore.Window.servicename = "Window";

bizMOBCore.Window.TitleBar = function(_sTitle) {
	this.element_type = "Bar";
	this.element_name = "titlebar";
	this.visible = true;
	this.title = arguments[0]._sTitle;
	this.id = "";
	this.left = [];
	this.right = [];
};

bizMOBCore.Window.TitleBar.prototype.setProperty = function(_sTitle){
	
	var required = new Array("_sTitle");
	if(this.title == "" || this.title == undefined){
		if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
			return;
		}
	}
	
	this.visible  = arguments[0]._bVisible != undefined ? arguments[0]._bVisible : this.visible;
	this.image_name = arguments[0]._sImagePath;
	this.title = arguments[0]._sTitle ? arguments[0]._sTitle : this.title;
	this.left = arguments[0]._aLeftImageButton;
	this.right = arguments[0]._aRightImageButton;
	
	if(this.left && this.left.length)	{
		this.left.forEach(function(imageButton)	{
			if(imageButton && imageButton.constructor == bizMOBCore.Window.ImageButton)	{
				bizMOBCore.Window.setElement(imageButton);
			}
		});
	}
	
	if(this.right && this.right.length)	{
		this.right.forEach(function(imageButton)	{
			if(imageButton && imageButton.constructor == bizMOBCore.Window.ImageButton)	{
				bizMOBCore.Window.setElement(imageButton);
			}
		});
	}

	this.id = arguments[0]._sID;
};

bizMOBCore.Window.ToolBar = function(aImageButton) {
	this.element_type = "Bar";
	this.element_name = "toolbar";
	this.visible = true;
	this.buttons = arguments[0]._aImageButton;
	this.id = "";
};

bizMOBCore.Window.ToolBar.prototype.setProperty = function(_aImageButton){
	
	var required = new Array("_aImageButton");
	
	if(!this.buttons){
		if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
			return;
		}
	}
	
	
	this.visible  = arguments[0]._bVisible != undefined ? arguments[0]._bVisible : this.visible;
	this.image_name = arguments[0]._sImagePath? arguments[0]._sImagePath : this.image_name;
	this.buttons = arguments[0]._aImageButton? arguments[0]._aImageButton : this.buttons;
	this.id = arguments[0]._sID;
	
	if(this.buttons instanceof Array)	{
		this.buttons.forEach(function(imageButton)	{
			if(imageButton && imageButton.constructor == bizMOBCore.Window.ImageButton)	{
				bizMOBCore.Window.setElement(imageButton);
			}
		});
	}
	
};

bizMOBCore.Window.SideBar = function(_aImageButton) {
	this.element_type = "Bar";
	this.element_name = "SideBar";
	this.buttons = arguments[0]._aImageButton;
	this.position = "left";
	this.id = "";
};

bizMOBCore.Window.SideBar.prototype.setProperty = function(_aImageButton){
	
	var required = new Array("_aImageButton");
	
	if(!this.buttons){
		if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
			return;
		}
	}
	
	this.visible  = arguments[0]._bVisible ? arguments[0]._bVisible : true;
	this.image_name = arguments[0]._sImagePath? arguments[0]._sImagePath : this.image_name;
	this.buttons = arguments[0]._aImageButton? arguments[0]._aImageButton : this.buttons;
	this.position = arguments[0]._sPosition? arguments[0]._sPosition : this.position;
	this.id = arguments[0]._sID;
	
	if(this.buttons instanceof Array)	{
		this.buttons.forEach(function(imageButton)	{
			if(imageButton && imageButton.constructor == bizMOBCore.Window.ImageButton)	{
				bizMOBCore.Window.setElement(imageButton);
			}
		});
	}
	
};

bizMOBCore.Window.draw = function(_aElement) {
	
	var action = "draw";
	
	if(!arguments[0]){
		bizMOBCore.Module.logger(this.servicename, action ,"L", "Parameter is empty.");
		return;
	}
	
	
//	var oldparam = {
//		titlebar : {},
//		bottom_toolbar: {},
//		left_toolbar: {},
//		right_toolbar: {}
//	};
	
	var oldparam = {};
	
	var tr = {
		id:"SET_APP",
		param:{}
	};
	
	for(var i=0; i < arguments[0]._aElement.length ; i++ ) {
		switch( arguments[0]._aElement[i].constructor )
		{
			case bizMOBCore.Window.TitleBar :
				oldparam.titlebar = arguments[0]._aElement[i];
				
				bizMOBCore.Window.setElement(oldparam.titlebar);
				break;
			case bizMOBCore.Window.ToolBar :
				oldparam.bottom_toolbar = arguments[0]._aElement[i];
				
				bizMOBCore.Window.setElement(oldparam.bottom_toolbar);
				break;
			case bizMOBCore.Window.SideBar :
				if(arguments[0]._aElement[i].position == "left"){
					oldparam.left_toolbar = arguments[0]._aElement[i];
					
					bizMOBCore.Window.setElement(oldparam.left_toolbar);
				}else if(arguments[0]._aElement[i].position == "right"){
					oldparam.right_toolbar = arguments[0]._aElement[i];
					
					bizMOBCore.Window.setElement(oldparam.right_toolbar);
				}else{
					bizMOBCore.Module.logger(this.servicename, action ,"L", "A SideBar must have position value.");
				}
				break;
			
		}
	}
	
	var params = $.extend(true, {}, oldparam);
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
	
};

bizMOBCore.Window.ELEMENT_MAP = {};

bizMOBCore.Window.setElement = function(eElement)	{
	if(!eElement)	{
		bizMOBCore.Module.logger("Window", "setElement" ,"D", "This Element[" + eElement + "] is not existed");
		return false;
	}
	
	var id = eElement.id;

	if(id != undefined)	{
		id = id.toString();
		if(id.trim().length > 0)	{
			bizMOBCore.Window.ELEMENT_MAP[id] = eElement;
		}
	}
};

bizMOBCore.Window.getElement = function(_sID)	{
	var id = arguments[0]._sID;
	
	if(bizMOBCore.Window.ELEMENT_MAP[id])	{
		return bizMOBCore.Window.ELEMENT_MAP[id];
	} else	{
		bizMOBCore.Module.logger("Window", "getElement" ,"D", "This Element[" + id + "] is not existed");
		return;
	}
};

bizMOBCore.Window.TextButton = function() {
	this.element_type = "button";
	this.element_name = "textbutton";
	this.text = "확인";
	this.callback = "";
};

bizMOBCore.Window.TextButton.prototype.setProperty = function(_sText){
	
	var required = new Array("_sText");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	this.text = arguments[0]._sText;
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback,"listener");
	this.callback = callback;
	
};

bizMOBCore.Window.ImageButton = function() {
	this.element_type = "button";
	this.element_name = "imagebutton";
	this.image_name = "";
	this.action = "";
	this.badge = {};
	this.id = "imageButton" + bizMOBCore.Window.ImageButton.INDEX++;
};

bizMOBCore.Window.ImageButton.INDEX = 0;

bizMOBCore.Window.ImageButton.prototype.setProperty = function(_sImagePath){
	
	var required = new Array("_sImagePath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}

	if(arguments[0]._sID)	{
		this.id = arguments[0]._sID;
	}
	this.image_name = arguments[0]._sImagePath;
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback, "listener");
	this.action = callback;
	
	if(arguments[0]._eBadgeButton)	{
		this.badge = arguments[0]._eBadgeButton;
		arguments[0]._eBadgeButton.button_id = this.id;
		
		bizMOBCore.Window.setElement(this.badge);
	}
};

bizMOBCore.Window.BadgeButton = function() {
	this.element_type = "button";
	this.element_name = "badgebutton";
	this.id = "";
	this.button_id = "";
	this.count = "";
	this.background_image = "";
	this.count_color = "FF000000";
	this.callback = "";
};

bizMOBCore.Window.BadgeButton.prototype.setProperty = function(){
	
	var required = new Array();
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	} else if(arguments[0]._vText != undefined && arguments[0]._vText != null)	{
		if(!isNaN(parseInt(arguments[0]._vText)))	{
			if(arguments[0]._vText > 99)	{
				bizMOBCore.Module.logger("Window.BadgeButton", "setProperty" ,"D", "Parameter length is longer than one length.");
				return;
			}
		} else if(arguments[0]._vText.toString().length > 1)	{
			bizMOBCore.Module.logger("Window.BadgeButton", "setProperty" ,"D", "Parameter length is longer than one length.");
			return;
		}
	}
	
	this.count = arguments[0]._vText;
	this.background_image = arguments[0]._sImagePath;
	this.count_color = arguments[0]._sTextColor;
	this.id = arguments[0]._sID;
	
};

bizMOBCore.Window.BadgeButton.prototype.changeProperty = function(){
	
	var required = new Array();
	var action = "changeProperty";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	} else if(arguments[0]._vText != undefined && arguments[0]._vText != null)	{
		if(!isNaN(parseInt(arguments[0]._vText)))	{
			if(arguments[0]._vText > 99)	{
				bizMOBCore.Module.logger("Window.BadgeButton", "setProperty" ,"D", "Parameter length is longer than one length.");
				return;
			}
		} else if(arguments[0]._vText.toString().length > 1)	{
			bizMOBCore.Module.logger("Window.BadgeButton", "setProperty" ,"D", "Parameter length is longer than one length.");
			return;
		}
	}
	
	this.count = arguments[0]._vText;

	var tr = {
		id : "BADGE_BUTTON",
		param : {
	        type : "set", // get
	        button_id : this.button_id,
	        count : this.count,
	        callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, "Window.BadgeButton", action);
};

bizMOBCore.Window.go = function() {
	
	var action = "go";
	
	var tr = {
		id:"NAVIGATION",
		param:{
			type : arguments[0]._sType, // index or name
	        index : arguments[0]._nStep,
	        page_name: arguments[0]._sName,
	        message:arguments[0]._oMessage,
	        callback : arguments[0]._sCallback,
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.Window.showMessage = function() {
	
	var action = "showmessage";
	
	var oldparam = {
			title : arguments[0]._sTitle,
			message : arguments[0]._sMessage,
			buttons : arguments[0]._aButtons
	};
	
	var tr = {
		id:"POPUP_MESSAGE_BOX",
		param:{}
	};
	
	var params = $.extend(true, {}, oldparam);
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.Window.toast = function() {
	
	var action = "toast";
	
	var oldparam = {
		message : arguments[0]._sMessage,
		duration : arguments[0]._sDuration
	};
	
	var tr = {
		id:"SHOW_MESSAGE",
		param:{}
	};
	
	var params = $.extend(true, {}, oldparam);
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};


bizMOBCore.Window.open = function() {
	
	var oldparam = {
		replace:arguments[0]._bReplace,
		message:arguments[0]._oMessage,
		target_page:arguments[0]._sPagePath,
		orientation:arguments[0]._sOrientation,
		page_name:arguments[0]._sName,
		hardware_accelator : arguments[0]._bHardwareAccel === true ? true : false
	};
	
	var action = "open";
	
	var tr = {
		
		id:"",
		param:{}
	};
			
	var params = $.extend(true, {
		replace:false,
		message:{},
		page_name : "",
		target_page:"",
		orientation:'none'
	}, oldparam);
	
	tr.param = params;
	
	if(params.replace) {
		tr.id="REPLACE_WEB";
	}else{
		tr.id="SHOW_WEB";
	}
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.Window.close = function() {
	
	if(arguments[0] == undefined) arguments[0] = {};
	
	var oldparam = {
		message:arguments[0]._oMessage,
		callback:arguments[0]._sCallback
	};
	
	var action = "close";
	
	var tr = {
		
		id:"POP_VIEW",
		param:{}
	};
	
	var params = $.extend(true, {
		message:{},
		callback: "bizMOBCore.Module.echo"					
	}, oldparam);
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.Window.openpopup = function() {
	
	var action = "openpopup";
	
	var oldparam = 
	{
			message : arguments[0]._oMessage,
			target_page : arguments[0]._sPagePath,
			width: arguments[0]._sWidth,
			height: arguments[0]._sHeight,
			base_on_size : arguments[0]._sBaseSize,
			base_size_orientation : arguments[0]._sBaseOrientation
	};
	
	var defparam = {
			message:{},
			height : 350,
			width : 200,
			base_on_size : "device",
			base_size_orientation : "auto",
			target_page:""
	};
	
	
	var tr = {
			
			id:"SHOW_POPUP_VIEW",
			param:{}
	};
	
	if(oldparam.height != undefined && oldparam.height != "" ){
		if( oldparam.height.indexOf("%") > 0){
			oldparam.height_percent = parseInt(oldparam.height.replace(/\%/,""));
			delete oldparam.height;
			delete defparam.height;
		}else{
			oldparam.height = parseInt(oldparam.height);
		}
		
	}
	
	if(oldparam.width != undefined && oldparam.width != "" ){
		if( oldparam.width.indexOf("%") > 0){
			oldparam.width_percent =  parseInt(oldparam.width.replace(/\%/,""));
			delete oldparam.width;
			delete defparam.width;
		}else{
			oldparam.width = parseInt(oldparam.width);
		}
		
	}
	
	
	var params = $.extend(true, defparam , oldparam);
	
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.Window.closepopup = function() {
	
	var oldparam = {
		message:arguments[0]._oMessage,
		callback:arguments[0]._sCallback
	};
	
	var action = "closepopup";
	
	var tr = {
		
		id:"DISMISS_POPUP_VIEW",
		param:{}
	};
	
	var params = $.extend(true, {
		message:{},
		callback: "bizMOBCore.Module.echo"					
	}, oldparam);
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};


bizMOBCore.Window.openSignPad = function() {
	
	var action = "openSignPad";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	var splitTargetPath = bizMOBCore.Module.pathParser(arguments[0]._sTargetPath);
	
	var oldparam = {
		target_path_type : splitTargetPath.type,
		target_path : splitTargetPath.path,
		callback:callback
	};
	
	var tr = {
		id:"GOTO_SIGNATURE",
		param:{}
	};
	
	var params = $.extend(true, {
		callback: "bizMOBCore.Module.echo"					
	}, oldparam);
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );	
	
};

bizMOBCore.Window.openImageViewer = function() {
	
	var action = "openImageViewer";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sImagePath);
	
	var oldparam = {
		"source_path" : splitSourcePath.path,
		"source_path_type" : splitSourcePath.type,
		"orientation" : "auto",
		callback : callback
	};
	
	var tr = {
		id:"SHOW_IMAGE_VIEW",
		param:{}
	};
	
	var params = $.extend(true, {
		callback: "bizMOBCore.Module.echo"					
	}, oldparam);
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );	
	
};

bizMOBCore.Window.openCodeReader = function() {
	
	var action = "openCodeReader";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var oldparam = {
		callback:callback
	};
	
	var tr = {
		id:"QR_AND_BAR_CODE",
		param:{}
	};
	
	var params = $.extend(true, {
		message:{},
		callback: "bizMOBCore.Module.echo"					
	}, oldparam);
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );	
	
};

bizMOBCore.SideView = function()	{};
bizMOBCore.SideView.prototype = new Object();
bizMOBCore.SideView.servicename = "SideView";
bizMOBCore.SideView.CURRENT_POSITION = "CURRENT_POSITION";

bizMOBCore.SideView.setCurrentPosition = function(position)	{
	localStorage.setItem(bizMOBCore.SideView.CURRENT_POSITION, position);
};

bizMOBCore.SideView.getCurrentPosition = function()	{
	return localStorage.getItem(bizMOBCore.SideView.CURRENT_POSITION);
};

bizMOBCore.SideView.create = function()	{
	var action = "create";
	var position = arguments[0]._sPosition;
	var widthPercent = arguments[0]._sWidth
	var pagePath = arguments[0]._sPagePath;
	var message = arguments[0]._oMessage;
	
	message = message == undefined ? {} : message;
		
	bizMOBCore.Module.logger(this.servicename, action, "D", "Request Parameter : " + arguments[0]);
	
	var tr = {
		id : "CREATE_MENU_VIEW",
		param : {
			target_view : position,
			width_percent : widthPercent,
			target_page : pagePath,
			message : message
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.SideView.show = function()	{
	var action = "show";
	var position = arguments[0]._sPosition.toLowerCase();
	var message = arguments[0]._oMessage;
	
	message = message == undefined ? {} : message;
	
	bizMOBCore.Module.logger(this.servicename, action, "D", "Request Parameter : " + arguments[0]);
	
	var tr = {
		id : "SHOW_MENU_VIEW",
		param:{
			target_view : position,
			message : message
		}
	};
	
	bizMOBCore.SideView.setCurrentPosition(position);
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.SideView.hide = function()	{
	var action = "hide";
	var message = arguments[0]._oMessage;
	var position = bizMOBCore.SideView.getCurrentPosition();
	
	if(!((message) instanceof Object))	message = {};
	
	bizMOBCore.Module.logger(this.servicename, action, "D", "Request Parameter : " + arguments[0]);
	
	var tr = {
		id : "CLOSE_MENU_VIEW",
		param:{
			target_view : position,
			message : message
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.SideView.postMessage = function()	{
	var action = "postMessage";
	var position = arguments[0]._sPosition;
	var callback = arguments[0]._sCallback;
	var message = arguments[0]._oMessage;
	
	bizMOBCore.Module.logger(this.servicename, action, "D", "Request Parameter : " + arguments[0]);
	
	var tr = {
		id : "SEND_DATA_MENU_VIEW",
		param : {
			target_view : position,
			message : message,
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.Properties = function() {};

bizMOBCore.Properties.prototype = new Object();

bizMOBCore.Properties.servicename = "Properties";

bizMOBCore.Properties.set = function() {
	
	var action = "set";
	var tr = {
			call_type:"js2stg",
			id:"SET_FSTORAGE",
			param:{data:[]}
	};
	
	var properties = new Array();
	
	if(arguments[0]._aList)
	{
			var savelist = arguments[0]._aList;
			for(var i=0;i < savelist.length ; i++){
				
				properties.push({key:savelist[i]._sKey, value:bizMOBCore.Module.stringjson(savelist[i]._vValue)});
				bizMOB.FStorage[savelist[i]._sKey] = bizMOBCore.Module.stringjson(savelist[i]._vValue);
			}
	}else{			
			properties.push({key:arguments[0]._sKey, value:bizMOBCore.Module.stringjson(arguments[0]._vValue)});
			bizMOB.FStorage[arguments[0]._sKey] = bizMOBCore.Module.stringjson(arguments[0]._vValue);
	}
	
	tr.param.data = properties;
	bizMOBCore.Module.logger(this.servicename, action ,"D", arguments[0]._sKey+ " set on bizMOB Properties. ");
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.Properties.get = function() {
	var action = "get";
	var key = arguments[0]._sKey;
	
	return bizMOBCore.Module.parsejson( bizMOB.FStorage[key]);
	
};

bizMOBCore.Properties.remove = function() {
	var action = "remove";
	var key = arguments[0]._sKey;
	
	var tr = {
		call_type:"js2stg",
		id:"REMOVE_FSTORAGE",
		param:{data:[key]}
	};
	delete bizMOB.FStorage[key];
	

	bizMOBCore.Module.logger(this.servicename, action ,"D", arguments[0]._sKey+ " removed on bizMOB Properties. ");
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.System = function() {};

bizMOBCore.System.prototype = new Object();

bizMOBCore.System.servicename = "System";

bizMOBCore.System.callTEL = function() {
	
	var action = "callTEL";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id:"TEL",
		param:{
			number:arguments[0]._sNumber,
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.System.callSMS = function() {
	
	var action = "callSMS";
	//var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var cell_list = arguments[0]._aNumber;
	
	for(var i=0; i< cell_list.length ; i++)
	{
		var validvalue = cell_list[i].match(/(^[+0-9])|[0-9]/gi);
		if(validvalue != null){
			cell_list[i] = validvalue.join("");
		}else{
			bizMOBCore.Module.logger(this.servicename, action ,"E", cell_list[i]+ " is wrong number format.");
		}	
	}
	
	arguments[0]._aNumber = cell_list;
	
	var tr = {
		id:"SMS",
		param:{number:arguments[0]._aNumber.join(";"), message:arguments[0]._sMessage}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.System.callBrowser = function(){
	
	var action = "callBrowser";
	
	var tr = {
		
		id:"SHOW_WEBSITE",
		param:{ "url":arguments[0]._sURL }
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
		
};

bizMOBCore.System.callGallery = function(){
	
	var action = "callGallery";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
			id:"GET_MEDIA_PICK",
			param:{
				type_list : arguments[0]._sType,
				callback:callback
			}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
		
};

bizMOBCore.System.callMap = function() {
	
	var action = "callMap";
	
	var tr = {
		id:"SHOW_MAP",
		param:{
			location:arguments[0]._sLocation
		}
	};
		
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};
	

bizMOBCore.System.getGPS = function()
{
	var action = "getGPS";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
		
    var tr = {
            id:"GET_LOCATION",
            param:{
            	callback:callback
            }
    };
    
    bizMOBCore.Module.gateway(tr, this.servicename , action );
   
};

bizMOBCore.System.callCamera = function()
{
	var action = "callCamera";
	
	var splitTargetDir = bizMOBCore.Module.pathParser(arguments[0]._sDirectory);
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	var autoVerticalHorizontal = arguments[0]._bAutoVerticalHorizontal === false ? false : true;
	
	var tr = {
			id:"CAMERA_CAPTURE",
			param:{
				target_directory: splitTargetDir.path,
				target_directory_type: splitTargetDir.type,
				picture_name:arguments[0]._sFileName,
				rotate : autoVerticalHorizontal,
				callback : callback
			}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

//
//bizMOBCore.System.setconfigGPS = function()
//{
//	var action = "setconfigGPS";
//	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
//	
//	var tr = {
//			
//			id:"SETTINGS_ACTION",
//			param:{
//				action : "LOCATION_SOURCE_SETTINGS",
//				callback : callback
//			}
//	};
//	
//	bizMOBCore.Module.gateway(tr, this.servicename , action );
//};
bizMOBCore.App = function() {};

bizMOBCore.App.prototype = new Object();

bizMOBCore.App.servicename = "App";

bizMOBCore.App.exit = function(){
	
	var action = "exit";
	
	var tr = {
		"id": "APPLICATION_EXIT",
		"param": {"kill_type" : arguments[0]._sType }
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );

};

bizMOBCore.App.requestTimeout = function(){
	
	var action = "requstTimeout";	
	
	var callback = arguments[0]._fCallback ? bizMOBCore.CallbackManager.save(arguments[0]._fCallback) : "" ;
	
	var tr = {
	    "id": "SET_SESSION_TIMEOUT",
	    "param": {
	        "callback":callback,  
	        "session_timeout": arguments[0]._nSeconds       
	    }
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};


bizMOBCore.Storage = function() {};

bizMOBCore.Storage.prototype = new Object();

bizMOBCore.Storage.servicename = "Storage";

bizMOBCore.Storage.set = function() {
	
	var action = "set";
	
	if(arguments[0]._aList)
	{		var savelist = arguments[0]._aList;
			for(var i=0;i < savelist.length ; i++){
				localStorage.setItem ( savelist[i]._sKey ,  bizMOBCore.Module.stringjson(savelist[i]._vValue) );
			}
	}else{	
			localStorage.setItem ( arguments[0]._sKey ,  bizMOBCore.Module.stringjson(arguments[0]._vValue) );
	}
	
	bizMOBCore.Module.logger(this.servicename, action ,"D", arguments[0]._sKey+ " set on bizMOB Storage. ");
	
	
};
bizMOBCore.Storage.get = function() {
	
	var action = "get";
	var key = arguments[0]._sKey;
	
	var value = localStorage.getItem ( key );
	
	return bizMOBCore.Module.parsejson(value);
};

bizMOBCore.Storage.remove = function() {
	
	var action = "remove";
	
	localStorage.removeItem(arguments[0]._sKey);
	
	bizMOBCore.Module.logger(this.servicename, action ,"D", arguments[0]._sKey+ " removed on bizMOB Storage. ");
	
};



bizMOBCore.Network = function() {};

bizMOBCore.Network.prototype = new Object();

bizMOBCore.Network.servicename = "Network";

bizMOBCore.Network.requestTr = function() {
	
	var action = "requestTr";
	
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
	var progressEnable = arguments[0]._bProgressEnable === false ? false : true;
	
//	if(arguments[0]._fCallback){
//		callbackid =  bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
//	}else{
//		bizMOBCore.Module.logger(this.servicename, action ,"L", "Callback function does not exist.");
//		callbackid = bizMOBCore.CallbackManager.save(bizMOBCore.Module.echo);	
//	}
	
	var tr = {
		
		id:"RELOAD_WEB",
		param:{}
	};
	
	var params ={
		trcode : arguments[0]._sTrcode,
		message:{ header: header , body : body },
		callback: callbackid,
		read_timeout : 60*1000,
		progress : progressEnable
	};
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};


bizMOBCore.Network.requestLogin = function() {
	
	var TR_HEADER = {
		"result" : true,
		"error_code" : "",
		"error_text" : "",         
		"info_text" : "",         
		"message_version" : "",         
		"login_session_id" : "",         
		"trcode" : arguments[0]._sTrcode
	};
	
	var action = "requestLogin";
	
	var header = $.extend(true,TR_HEADER , arguments[0]._oHeader);
	
	var TR_BODY = {};
	
	var body = $.extend(true,TR_BODY , arguments[0]._oBody);
	
	var callbackid =  bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
//	if(arguments[0]._fCallback){
//		callbackid =  bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
//	}else{
//		bizMOBCore.Module.logger(this.servicename, action ,"L", "Callback function does not exist.");
//		callbackid = bizMOBCore.CallbackManager.save(bizMOBCore.Module.echo);	
//	}
	
	var tr = {
		
		id:"AUTH",
		param:{}
	};
	
	
	
	var params ={
			
			auth_info:{user_id:arguments[0]._sUserId,password:arguments[0]._sPassword},
			legacy_trcode:arguments[0]._sTrcode,
			legacy_message:{ header: header , body : body },
			message:{},
			callback:callbackid,
			read_timeout : 10*1000,
			progress : true
	
	};
	
	tr.param = params;
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};


bizMOBCore.EventManager = function() {};

bizMOBCore.EventManager.prototype = new Object();

bizMOBCore.EventManager.servicename = "EventManager";

bizMOBCore.EventManager.storage = {
		"ready" : ["page.init"],
		"resume" : [],
		"backbutton" : [],
		"beforeready" : [],
		"open" : [],
		"close" : [],
		"push" : []
};

bizMOBCore.EventManager.list = new Array("ready","resume","backbutton","open","close");

bizMOBCore.EventManager.init = function() {
	
	var action = "init";
	var backYn = false;
	
	for (var evtname in this.storage) {
		
		var evtlist = bizMOBCore.EventManager.storage[evtname];
		
		for(var i=0; i < evtlist.length;i++){
			
			bizMOBCore.Module.logger(this.servicename, action ,"D", evtname+" event add start. Listener is "+evtlist[i]);
			var evtlistener = eval(evtlist[i]);
			
			if(evtlistener ){
				
				if(evtlistener.constructor === Function){
					
					if(evtname == "backbutton" && bizMOB.Device.isAndroid()) { backYn = true; }
					
					document.addEventListener("bizMOB.on"+evtname, evtlistener, false);
					bizMOBCore.Module.logger(this.servicename, action ,"D", evtlist[i]+" has been added in the "+evtname+" event. ");
					
				}else{
					bizMOBCore.Module.logger(this.servicename, action ,"W", evtlist[i]+" cannot added in the "+evtname+" event. it is not a function.");
				}
				
			}else{
				bizMOBCore.Module.logger(this.servicename, action ,"W",  evtlist[i]+" is undefined. ");
			}
			
			
		}
		
	}
	
	if(backYn){
		bizMOBCore.EventManager.requester({ "eventname" : "backbutton" });
	}
	
//	for(var i=0;i < this.list.length; i++){
//		
//		var evtname = this.list[i];
//		if(bizMOBCore.EventManager.storage[evtname]){
//			bizMOBCore.Module.logger(this.servicename, action ,"D", "on"+evtname+" event initialized. ");
//			document.addEventListener("bizMOB.on"+evtname, eval(bizMOBCore.EventManager.storage[evtname]), false);
//			bizMOBCore.EventManager.requester({eventname : evtname});
//		}else{
//			if(evtname == "ready"){
//				bizMOBCore.Module.logger(this.servicename, action ,"D", "on"+evtname+" default event initialized. ");
//				document.addEventListener("bizMOB.on"+evtname, page.init , false);
//			}else{
//				bizMOBCore.Module.logger(this.servicename, action ,"D", "on"+evtname+" event initialized. ");
//				document.addEventListener("bizMOB.on"+evtname, bizMOBCore.Module.echo, false);
//			}
//			
//		}
//		
//	}
	
	bizMOBCore.Module.logger(this.servicename, action ,"L", "EventManager initialized.");
	
};

bizMOBCore.EventManager.requester = function(oRequired, oOptions) {

	var action = "requester";
	
	switch(oRequired.eventname)
	{
		case "backbutton" :
			
			var tr = {
			        
			        id:"HARDWARE_BACKBUTTON",
			        param:{}
			};

			
			var params ={
		               useBackEvent : true,
	        };
			
			tr.param = params;
			
			bizMOBCore.Module.gateway(tr, this.servicename , action );
			bizMOBCore.Module.logger(this.servicename, action ,"L", "EventManager request add event.");
			
			break;
//		default :
//			bizMOBCore.EventManager.raiseevent(oRequired, oOptions);
//			break;
	}

};

bizMOBCore.EventManager.responser = function(oRequired, oOptions) {

	var action = "responser";
	
	bizMOBCore.Module.logger(this.servicename, action ,"L", "EventManager recieved event.");
	bizMOBCore.Module.logger(this.servicename, action ,"D", "Event Name : " + oRequired.eventname);
	bizMOBCore.Module.logger(this.servicename, action ,"D", "Event Data : " + JSON.stringify(oOptions));
	
	switch(oRequired.eventname)
	{
		case "onReady" :
			if(!bizMOBCore.readystatus){
//				bizMOBCore.Module.loadlibrary(
//						function(){
//							bizMOBCore.Module.init(oRequired, oOptions);
//							bizMOBCore.readystatus = true;
//							bizMOBCore.EventManager.raiseevent(oRequired, oOptions);
//						}
//				);
				
				bizMOBCore.Module.init(oRequired, oOptions);
				bizMOBCore.readystatus = true;
				bizMOBCore.EventManager.raiseevent({eventname : "onbeforeready"}, oOptions);
				bizMOBCore.EventManager.raiseevent(oRequired, oOptions);
				
			}
			break;
		default :
			bizMOBCore.EventManager.raiseevent(oRequired, oOptions);
			break;
	}

};

bizMOBCore.EventManager.raiseevent = function(oRequired, oOptions) {
	
	var action = "raiseevent";
	
	bizMOBCore.Module.logger(this.servicename, action ,"L", "EventManager raise event.");
	bizMOBCore.Module.logger(this.servicename, action ,"D", "Event Name : "+oRequired.eventname.toLowerCase());
	bizMOBCore.Module.logger(this.servicename, action ,"D", "Event Message : "+JSON.stringify(oOptions.message));

	
	var evt = document.createEvent("Event");
	evt.initEvent("bizMOB."+oRequired.eventname.toLowerCase(), false, true );
	evt.data = oOptions.message;
	
//	for (var prop in data) {
//		evt[prop] = data[prop];
//	}
		
	try{
		document.dispatchEvent(evt); 
	}catch(e){ 
		bizMOBCore.Module.logger(this.servicename, action ,"E", e);
	}
	
	
		
};


bizMOBCore.DeviceManager = function() {};

bizMOBCore.DeviceManager.prototype = new Object();

bizMOBCore.DeviceManager.servicename = "DeviceManager";

bizMOBCore.DeviceManager.init = function(){
	
	bizMOB.Device.Info.app_version = bizMOB.Device.Info.app_major_version+"."+
									 bizMOB.Device.Info.app_minor_version+"."+
									 bizMOB.Device.Info.app_build_version+ "_" + 
									 bizMOB.Device.Info.content_major_version + "." + 
									 bizMOB.Device.Info.content_minor_version;
	
	bizMOBCore.Module.logger(this.servicename, "init", "D", "Device Info initialized - "+JSON.stringify(bizMOB.Device.Info));
	
};


bizMOBCore.ExtendsManager = function() {};

bizMOBCore.ExtendsManager.prototype = new Object();

bizMOBCore.ExtendsManager.servicename = "Extends";

bizMOBCore.ExtendsManager.executer = function(){
	
	var action = "executer";
	
	var required = new Array("_sID");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Module.logger(this.servicename, action, "D", " ID : "+JSON.stringify(arguments[0]._sID));
	bizMOBCore.Module.logger(this.servicename, action, "D", " Parameter : "+JSON.stringify(arguments[0]._oParam));
	
	for(var prop in arguments[0]._oParam ){
		if(arguments[0]._oParam[prop].constructor === Function ){
			var callback = bizMOBCore.CallbackManager.save(arguments[0]._oParam[prop]);
			arguments[0]._oParam[prop] = callback;
		}
	}

	var tr = {
	        id: arguments[0]._sID,
	        param:arguments[0]._oParam
	};

	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.Contacts = function() {};
bizMOBCore.Contacts.prototype = new Object();
bizMOBCore.Contacts.servicename = "Contacts";

bizMOBCore.Contacts.get = function(options) {
	
	var action = "get";
	
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
    var tr = 
    {
           id:"GET_CONTACT",
           param:{
        	   search_type : arguments[0]._sSearchType,
        	   search_text : arguments[0]._sSearchText,
        	   callback : callback
           }
    };
    
    bizMOBCore.Module.gateway(tr, this.servicename , action );
    
};

bizMOBCore.File = function() {};

bizMOBCore.File.prototype = new Object();

bizMOBCore.File.servicename = "File";

bizMOBCore.File.open = function()
{
	var action = "open";
	
	var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sSourcePath);
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
    var tr = 
    {
           
           id:"OPEN_FILE",
           param:{
                  target_path : splitSourcePath.path,
                  target_path_type : splitSourcePath.type,
                  callback:callback
           }
    };
    
    bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.File.zip= function()
{
	var action = "zip";
	
	var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sSourcePath);
	var splitTargetPath = bizMOBCore.Module.pathParser(arguments[0]._sTargetPath);
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = 
	{
		
		id:"ZIP_FILE",
		param:{
			source_path: splitSourcePath.path,
			source_path_type: splitSourcePath.type,
		    target_path: splitTargetPath.path,
		    target_path_type: splitTargetPath.type,
			callback:callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.File.unzip= function()
{
	var action = "unzip";
	
	var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sSourcePath);
	var splitTargetPath = bizMOBCore.Module.pathParser(arguments[0]._sDirectory);
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = 
	{
			
			id:"UNZIP_FILE",
			param:{
				source_path: splitSourcePath.path,
				source_path_type: splitSourcePath.type,
			    target_directory: splitTargetPath.path,
				target_directory_type: splitTargetPath.type,
				callback:callback
			}
	};

	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};


bizMOBCore.File.move = function()
{
	var action = "move";
	
	var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sSourcePath);
	var splitTargetPath = bizMOBCore.Module.pathParser(arguments[0]._sTargetPath);
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = 
	{
			
			id:"MOVE_FILE",
			param:{
				source_path: splitSourcePath.path,
				source_path_type: splitSourcePath.type,
			    target_path: splitTargetPath.path,
			    target_path_type: splitTargetPath.type,
				callback:callback
			}
	};

	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.File.copy = function() {
	
	var action = "copy";
	
	var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sSourcePath);
	var splitTargetPath = bizMOBCore.Module.pathParser(arguments[0]._sTargetPath);
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
			
		    "id": "COPY_FILE",
		    "param": {
		        source_path: splitSourcePath.path,
				source_path_type: splitSourcePath.type,
			    target_path: splitTargetPath.path,
			    target_path_type: splitTargetPath.type,
				callback:callback
		    }
		};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.File.remove = function() {
	
	var action = "remove";
	
	var targetfiles = new Array();
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
		
	for(var i=0;i<arguments[0]._aSourcePath.length;i++){
		
		var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._aSourcePath[i]);
		
		var file = {
				"source_path": splitSourcePath.path,
				"source_path_type": splitSourcePath.type,
		};
		
		
		targetfiles[i] = file;
	}
	
	var tr = {
			
		    "id": "REMOVE_FILES",
		    "param": {
		    	list: targetfiles,
		    	callback:callback
		    }
		};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.File.directory = function()
{
	var action = "directory";
	
	var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sDirectory);
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = 
	{
			
			id:"GET_DIRECTORY_INFO",
			param:{
				source_directory: splitSourcePath.path,
				source_directory_type: splitSourcePath.type,
				callback:callback
			}
	};

	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.File.exist = function() {
	
	var action = "exist";
	
	var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sSourcePath);
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = 
	{
			
			id:"EXISTS_FILE",
			param:{
				source_directory: splitSourcePath.path,
				source_directory_type: splitSourcePath.type,
				callback:callback
			}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.File.upload = function() {
	
	var action = "upload";
	
	var file_list = arguments[0]._aFileList.map(function(row, index)	{
	var splitSourcePath = bizMOBCore.Module.pathParser(row._sSourcePath);
		
		return {
			source_path : splitSourcePath.path,
			source_path_type : splitSourcePath.type,
			file_name : row._sFileName
		};
	});
	
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = 
	{
			id:"FILE_UPLOAD",
			param:{
				list : file_list,
				callback : callback
			}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};


bizMOBCore.File.download = function() {
	
	var action = "download";
	
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback, "listener");
	var file_list = arguments[0]._aFileList;
	var list_len = file_list.length;
	
	for(var i=0;i< list_len; i++){
		var splitTargetPath = bizMOBCore.Module.pathParser(file_list[i]._sDirectory);
		file_list[i].target_path = splitTargetPath.path + file_list[i]._sFileName,
		file_list[i].target_path_type = splitTargetPath.type,
		file_list[i].overwrite = file_list[i]._bOverwrite,
		file_list[i].uri = file_list[i]._sURI,
		file_list[i].file_id = i;
	}
	
	var tr = {
		
		id:"DOWNLOAD",
		param:{
			method:arguments[0]._sMode,
			uri_list:file_list,
			progress : arguments[0]._oProgressBar,
			callback:callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
	
};

bizMOBCore.File.getInfo = function()    {
    var action = "getInfo";

    var serviceName = this.servicename;
    var fileList = arguments[0]._aFileList.map(function(row, index)	{
	    var splitSourcePath = bizMOBCore.Module.pathParser(row._sSourcePath);
		
		return {
            index : index,
			source_path : splitSourcePath.path,
			source_path_type : splitSourcePath.type
		};
	});
    var userCallback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var callback = bizMOBCore.CallbackManager.save(function(res)   {
        bizMOBCore.Module.logger(serviceName, action ,"D", res);

        if(res.result)	{
            var nonIndexFileList = new Array();
            
            res.list.forEach(function(row)    {
                var index = row.index;
                
                nonIndexFileList[index] = row;
                delete nonIndexFileList[index].index;
            });
    
            res.list = nonIndexFileList;
        }

        bizMOBCore.CallbackManager.responser({
            "callback" : userCallback
        }, {
            "message" : res
        });
    });

    var tr = {
		id : "GET_IMAGE_INFO",
		param : {
			file_path : fileList,
			callback : callback
		}
	};

    bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.File.resizeImage = function()    {
    var action = "resizeImage";

    var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var fileList = arguments[0]._aFileList.map(function(row)	{
	    var splitSourcePath = bizMOBCore.Module.pathParser(row._sSourcePath);
		
		return {
			source_path : splitSourcePath.path,
			source_path_type : splitSourcePath.type
		};
	});
    var splitTargetDir = bizMOBCore.Module.pathParser(arguments[0]._sTargetDirectory);
    var compressRate = isNaN(Number(arguments[0]._nCompressRate)) ? 1.0 : arguments[0]._nCompressRate;
    var copy = arguments[0]._bIsCopy === false ? false : true;

    var tr = {
		id : "RESIZE_IMAGE",
		param : {
			image_paths  : fileList,
			callback : callback,
            compress_rate : compressRate,
            copy_flag : copy,
            width : arguments[0]._nWidth,
            height : arguments[0]._nHeight,
            file_size : arguments[0]._nFileSize,
            target_path_type : splitTargetDir.type,
            target_path : splitTargetDir.path
		}
	};

    bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.File.rotateImage = function()    {
    var action = "rotateImage";
    var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var splitSourcePath = bizMOBCore.Module.pathParser(arguments[0]._sSourcePath);
    var splitTargetPath = bizMOBCore.Module.pathParser(arguments[0]._sTargetPath);
    var orientation = (arguments[0]._nOrientation).toString();

    var tr = {
        id : "ROTATE_IMAGE",
        param : {
        	orientation : orientation,
            source_path_type : splitSourcePath.type,
            source_path : splitSourcePath.path,
            target_path_type : splitTargetPath.type,
            target_path : splitTargetPath.path,
            callback : callback
        }
    };
    
    bizMOBCore.Module.gateway(tr, this.servicename , action );
};

//
//bizMOBCore.ServiceRequest = function() {};
//
//bizMOBCore.ServiceRequest.prototype = new Object();
//
//bizMOBCore.ServiceRequest.setparam = function(oRequired, oOptions){
//	var parameter = {
//			"required" : oRequired,
//			"options" :oOptions,
//			"meta" : { "transaction_id" : bizMOBCore.Module.gettrid() }
//	};
//
//	return parameter;
//};

bizMOBCore.PushManager = function()	{};

bizMOBCore.PushManager.prototype = new Object();

bizMOBCore.PushManager.servicename = "PushManager";

bizMOBCore.PushManager.userCallback = {};

bizMOBCore.PushManager.reset = function()	{
	bizMOBCore.Properties.remove({
		"_sKey" : "STORED_PUSHKEY"
	});
	bizMOBCore.Properties.remove({
		"_sKey" : "STORED_PUSH_USERID"
	});
	bizMOBCore.Properties.remove({
		"_sKey" : "IS_REGISTRATION"
	});
};

bizMOBCore.PushManager.isRegistration = function()	{
	var isRegistration = bizMOBCore.Properties.get({
		"_sKey" : "IS_REGISTRATION"
	}) ? true : false;
	
	return isRegistration;
};

bizMOBCore.PushManager.checkValidPushKey = function()	{
	var deviceInfoPushKey = bizMOB.Device.getInfo({
			"_sKey" : "push_key"
		});
	var storedPushKey = bizMOBCore.Properties.get({
		"_sKey" : "STORED_PUSHKEY"
	});
	var result = false;
	
	deviceInfoPushKey = bizMOBCore.APP_CONFIG.PUSH.URL + ":" + deviceInfoPushKey;
	
	if(bizMOB.Device.isAndroid())	{
		if(typeof deviceInfoPushKey == "string")	{
			if(deviceInfoPushKey.trim().length > 0)	{
				if(deviceInfoPushKey == storedPushKey)	result = true;
			}
		}
	} else	{
		if(deviceInfoPushKey == storedPushKey)	result = true;
	}
	
	return result;
};

bizMOBCore.PushManager.checkValidPushUserId = function(userId)	{
	var storedPushUserId = bizMOBCore.Properties.get({
		"_sKey" : "STORED_PUSH_USERID"
	});
	var result = false;

	if(storedPushUserId != undefined)	{
		if(storedPushUserId.toString().trim().length > 0)	{
			if(storedPushUserId == userId)	{
				result = true;
			}
		}
	}
	
	return result;
};

bizMOBCore.PushManager.setStoredPushKey = function(pushKey)	{
	var storedPushKey = bizMOBCore.Properties.get({
		"_sKey" : "STORED_PUSHKEY"
	});

	pushKey = bizMOBCore.APP_CONFIG.PUSH.URL + ":" + pushKey;
	
	if(storedPushKey != pushKey)	{
		bizMOBCore.Properties.set({
			"_sKey" : "STORED_PUSHKEY",
			"_vValue" : pushKey
		});
	}
};

bizMOBCore.PushManager.setStoredPushUserId = function(userId)	{
	var storedPushUserId = bizMOBCore.Properties.get({
		"_sKey" : "STORED_PUSH_USERID"
	});
	
	if(storedPushUserId != userId)	{
		bizMOBCore.Properties.set({
			"_sKey" : "STORED_PUSH_USERID",
			"_vValue" : userId
		});
	}
};

bizMOBCore.PushManager.getPushKey = function()	{
	var action = "getPushKey";
	var callback = bizMOBCore.CallbackManager.save(this.resGetPushKey);
	var userCallback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var progressEnable = arguments[0]._bProgressEnable === false ? false : true;

	this.userCallback[action] = userCallback;
	
	var tr = {
		id : "GET_PUSHKEY",
		param : {
			callback : callback,
            read_timeout : 10*1000,
            progress : progressEnable
		}
	};
	
	if(!this.checkValidPushKey())	{
		bizMOBCore.Properties.remove({
			"_sKey" : "IS_REGISTRATION"
		});
		bizMOBCore.Module.gateway(tr, this.servicename, action);
	} else	{
		var returnValue = {
			"result" : true,
			"resultCode" : "0000",
			"resultMessage" : bizMOB.Device.getInfo({
				"_sKey" : "push_key"
			})
		};
		
		this.resGetPushKey(returnValue);
	}
};

bizMOBCore.PushManager.resGetPushKey = function(res)	{
	if(res.result)	{
		bizMOBCore.PushManager.setStoredPushKey(res.resultMessage);
		bizMOB.Device.Info.push_key = res.resultMessage;
	} else	{
		bizMOBCore.Module.logger(this.servicename, "getPushKey" ,"D", res.resultMessage);		
	}
	
	bizMOBCore.CallbackManager.responser({
		"callback" : bizMOBCore.PushManager.userCallback["getPushKey"]
	}, {
		"message" : res
	});
}

bizMOBCore.PushManager.registerToServer = function()	{
	var action = "registerToServer";
	var callback = {};
	var userCallback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	var userId = arguments[0]._sUserId;
    var progressEnable = arguments[0]._bProgressEnable === false ? false : true;
	
	this.userCallback[action] = userCallback;
	
	callback = function(res)	{
		bizMOBCore.PushManager.resRegistration(res, userId);
	};
	
	var tr = {
		id : "PUSH_REGISTRATION",
		param : {
			type : arguments[0]._sServerType,
			push_key : bizMOB.Device.getInfo({
				"_sKey" : "push_key"
			}),
			user_id : userId,
			app_name : arguments[0]._sAppName,
			callback : bizMOBCore.CallbackManager.save(callback),
            read_timeout : 10*1000,
            progress : progressEnable
		}
	};
	
	if(this.checkValidPushUserId(userId) && this.isRegistration())	{
		var resultValue = {
			"result" : true,
			"resultCode" : "0000",
			"resultMessage" : "성공",
			"body" : null
		};
		
		this.resRegistration(resultValue, userId);
	} else	{
		bizMOBCore.Module.gateway(tr, this.servicename , action );
	}
};

bizMOBCore.PushManager.resRegistration = function(res, userId)	{
	if(res.result)	{
		bizMOBCore.Properties.set({
			"_sKey" : "IS_REGISTRATION",
			"_vValue" : true
		});
		
		bizMOBCore.PushManager.setStoredPushUserId(userId);
	} else	{
		bizMOBCore.Module.logger(this.servicename, "registerToServer" ,"D", res.resultMessage);
	}
	
	bizMOBCore.CallbackManager.responser({
		"callback" : bizMOBCore.PushManager.userCallback["registerToServer"]
	}, {
		"message" : res
	});
};

bizMOBCore.PushManager.setAlarm = function()	{
	var action = "setAlarm";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var progressEnable = arguments[0]._bProgressEnable === false ? false : true;
	
	var tr = {
		id : "PUSH_UPDATE_ALARM_SETTING",
		param : {
			user_id : arguments[0]._sUserId,
			push_key : arguments[0]._sPushKey,
			enabled : arguments[0]._bEnabled,
			callback : callback,
            read_timeout : 10*1000,
            progress : progressEnable
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.PushManager.getAlarm = function()	{
	var action = "getAlarm";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var progressEnable = arguments[0]._bProgressEnable === false ? false : true;
	
	var tr = {
		id : "PUSH_ALARM_SETTING_INFO",
		param : {
			user_id : arguments[0]._sUserId,
			push_key : arguments[0]._sPushKey,
			callback : callback,
            read_timeout : 10*1000,
            progress : progressEnable
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.PushManager.getMessageList = function()	{
	var action = "getMessageList";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var progressEnable = arguments[0]._bProgressEnable === false ? false : true;
	
	var tr = {
		id : "PUSH_GET_MESSAGES",
		param : {
			app_name : arguments[0]._sAppName,
			page_index : arguments[0]._nPageIndex,
			item_count : arguments[0]._nItemCount,
			user_id : arguments[0]._sUserId,
			callback : callback,
            read_timeout : 10*1000,
            progress : progressEnable
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.PushManager.readMessage = function()	{ 
	var action = "read";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var progressEnable = arguments[0]._bProgressEnable === false ? false : true;
	
	var tr = {
		id : "PUSH_MARK_AS_READ",
		param : {
			trx_day : arguments[0]._sTrxDay,
			trx_id : arguments[0]._sTrxId,
			user_id : arguments[0]._sUserId,
			read : true,
			callback : callback,
            read_timeout : 10*1000,
            progress : progressEnable
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.PushManager.getUnreadMessageCount = function()	{
	var action = "getUnreadMessageCount";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var progressEnable = arguments[0]._bProgressEnable === false ? false : true;
	
	var tr = {
		id : "PUSH_GET_UNREAD_PUSH_MESSAGE_COUNT",
		param : {
			app_name : arguments[0]._sAppName,
			user_id : arguments[0]._sUserId,
			callback : callback,
            read_timeout : 10*1000,
            progress : progressEnable
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.PushManager.setBadgeCount = function()	{
	var action = "setBadgeCount";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "SET_BADGE_COUNT",
		param : {
			badge_count : arguments[0]._nBadgeCount,
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.PushManager.sendMessage = function()	{
	var action = "sendMessage";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
    var progressEnable = arguments[0]._bProgressEnable === false ? false : true;
	
	var tr = {
		id : "SEND_PUSH_MESSAGE",
		param : {
			trx_type : arguments[0]._sTrxType,
			app_name : arguments[0]._sAppName,
			schedule_date : arguments[0]._sScheduleDate,
			to_users : arguments[0]._aUsers,
			to_groups : arguments[0]._aGroups,
			to_all : arguments[0]._bToAll,
			from_user : arguments[0]._sFromUser,
			message_subject : arguments[0]._sSubject,
			message_content : arguments[0]._sContent,
			message_category : arguments[0]._sCategory,
			message_payload : arguments[0]._oPayLoad,
			callback : callback,
            read_timeout : 10*1000,
            progress : progressEnable
		}

	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.PushManager.readReceiptMessage = function()	{
	var action = "readReceiptMessage";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "CHECK_PUSH_RECEIVED",
		param : {
			callback : callback,
			user_id : arguments[0]._sUserId,
			message_id : arguments[0]._sMessageId
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename , action );
};

bizMOBCore.Database = function()	{};
bizMOBCore.Database.prototype = new Object();
bizMOBCore.Database.servicename = "Database";

bizMOBCore.Database.openDatabase = function()	{
	var action = "openDatabase";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	var dbName = arguments[0]._sDbName;
	
	var tr = {
		id : "OPEN_DATABASE",
		param : {
			db_name : dbName,
            callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.Database.closeDatabase = function()	{
	var action = "closeDatabase";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "CLOSE_DATABASE",
		param : {
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.Database.beginTransaction = function()	{
	var action = "beginTransaction";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "BEGIN_TRANSACTION",
		param : {
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.Database.commitTransaction = function()	{
	var action = "commitTransaction";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "COMMIT_TRANSACTION",
		param : {
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.Database.rollbackTransaction = function()	{
	var action = "rollbackTransaction";
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "ROLLBACK_TRANSACTION",
		param : {
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.Database.executeSql = function()	{
	var action = "executeSql";
	var query = arguments[0]._sQuery;
	var bidingValues = arguments[0]._aBindingValues;
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "EXECUTE_SQL",
		param : {
			query : query,
			bind_array : bidingValues,
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.Database.executeSelect = function()	{
	var action = "executeSelect";
	var query = arguments[0]._sQuery;
	var bidingValues = arguments[0]._aBindingValues;
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "EXECUTE_SELECT",
		param : {
			query : query,
			bind_array : bidingValues,
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

bizMOBCore.Database.executeBatchSql = function()	{
	var action = "executeBatchSql";
	var query = arguments[0]._sQuery;
	var bidingValues = arguments[0]._aBindingValues;
	var callback = bizMOBCore.CallbackManager.save(arguments[0]._fCallback);
	
	var tr = {
		id : "EXECUTE_BATCH_SQL",
		param : {
			query : query,
			bind_array : bidingValues,
			callback : callback
		}
	};
	
	bizMOBCore.Module.gateway(tr, this.servicename, action);
};

console.log("bizMOBCore ready." );
