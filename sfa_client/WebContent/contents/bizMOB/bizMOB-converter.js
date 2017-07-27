/**
 * 
 * bizMOB Converter
 * 
 */

/**
 * biZMOB Web class
 * 
 * @class	웹 인터페이스
 */
bizMOB.Web = function() {};
/**
 * biZMOB Native class
 * 
 * @class	웹 인터페이스
 */
bizMOB.Native = function() {};
/**
 * biZMOB Ui class
 * 
 * @class	Native Ui 인터페이스
 */
bizMOB.Ui = function() {};
/**
 * biZMOB Phone class
 * 
 * @class	전화 연동 인터페이스
 */
bizMOB.Phone = function() {};
/**
 * biZMOB Map class
 * 
 * @class	지도 연동 인터페이스
 */
bizMOB.Map = function() {};
/**
 * biZMOB Contacts class
 * 
 * @class	주소록 연동 인터페이스
 */
bizMOB.Contacts = function() {};
/**
 * biZMOB Network class
 * 
 * @class	통신(binary) 인터페이스
 */
bizMOB.Network = function() {};

bizMOB.WebStorage = function() {};

/**
 * bizMOB SQLite class <br/>
 * HTML5의 표준 API 적용
 * 
 * @class	로컬 데이터페이스 인터페이스
 */
bizMOB.SQLite = function() {};

/**
 * bizMOB Camera class <br/>
 * 
 * @class	디바이스의 카메라 인터페이스
 */
bizMOB.Camera = function() {};

/**
 * bizMOB Gallery <br/>
 * 
 * @class	디바이스의 사진 앨범 인터페이스
 */
bizMOB.Gallery = function() {};

/**
 * bizMOB Security
 * 
 * @class bizMOB platform 보안 인터페이스
 */
bizMOB.Security = function() {};

/**
 * bizMOB Gps
 * 
 * @class bizMOB Gps 인터페이스
 */
bizMOB.Gps = function() {};

bizMOB.Device.getInfo = function(key)	{
	var required = new Array("_sKey"),
		newparams = {
			_sKey : ""
		};
	
	if(!arguments[0] || arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		newparams._sKey = key;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	var rtVal;
	if(newparams && newparams._sKey){
		rtVal = bizMOB.Device.Info[newparams._sKey];
	}else{
		rtVal = bizMOB.Device.Info;
	}
	return rtVal;
};

//bizMOB.Web.setDefault = function(param)	{
//	
//};
//
//bizMOB.Web.responseFilterOut = function (url)	{
//	
//};
//
//bizMOB.Web.replaceChar = function (url)	{
//	
//};

bizMOB.Web.replaceFilterChars = function(param)	{
	var result;
	
	if(param)	{
		switch(param.constructor)	{
			case Object :
				result = {};
				for(key in param)	{
					result[key] = replaceFilterChars(param[key]);
				}
				break;
			case Array :
				result = [];
				for(var i=0;i<param.length;i++)	{
					result[i] = replaceFilterChars(param[i]);
				}
				break;
			case String :
				result = replaceChar(param);
				break;
			default :
				result = param;
				break;
		}
	}
	
	return result;
};

bizMOB.Web.open = function(html, options){
	if(!options) options = {};
	
	var newparams = {
		_bReplace : false,
		_oMessage : options.message,
		_sPagePath : html,
		_sOrientation : options.orientation
	};
	
	if(!bizMOBCore.Module.checkparam(newparams)) {
		return;
	}
	
	bizMOBCore.Window.open(newparams);
};

bizMOB.Web.close = function(options)	{
	if(!options) options = {};
	
	var newparams = {
		_oMessage : options.message,
		_sCallback : options.callback
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.close(newparams);
};

bizMOB.Web.post = function(options)	{
	var newparams = {
		_sTrcode : '',
		_oHeader : {},
		_oBody : {},
		_fCallback : function()	{}
	};
	
	newparams._sTrcode = options.message.header.trcode;
	newparams._oHeader = options.message.header;
	newparams._oBody = options.message.body;
	newparams._fCallback = options.success;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Network.requestTr(newparams);
};

bizMOB.Native.exit = function(param)	{
	if(!param)	param = { 'kill_type' : 'exit' };
	
	var newparams = {
		_sType : ''
	};
	
	newparams._sType = param.kill_type;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.App.exit(newparams);
};

bizMOB.Native.SignPad = {};

bizMOB.Native.SignPad.open = function(callback) {
	var newparams = {
		_fCallback : function()	{}
	};
	
	newparams._fCallback = callback;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.openSignPad(newparams);
};

bizMOB.Native.ImageViewer = {};

bizMOB.Native.ImageViewer.open = function(image_path, options) {
	if(!options)	options = {};
	
	var newparams = {
		_sImagePath : '',
		_fCallback : function()	{}
	};
	
	newparams._sImagePath = image_path;
	newparams._fCallback = options.callback;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.openImageViewer(newparams);
};

bizMOB.Native.Browser = {};

bizMOB.Native.Browser.open = function(url) {
	var newparams = {
		_sURL : ""
	};
	
	newparams._sURL = url;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.System.callBrowser(newparams);
};

bizMOB.Native.qrAndBarCode = {};

bizMOB.Native.qrAndBarCode.open = function(callback) {
	var newparams = {
		_fCallback : function()	{}
	};
	
	newparams._fCallback = callback;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.openCodeReader(newparams);
};

bizMOB.Gps.configuration = function(callback)	{
	
};

bizMOB.Gps.get = function(callback)	{
	var newparams = {
		_fCallback : function()	{}
	};
	
	newparams._fCallback = callback;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.System.getGPS(newparams);
};

bizMOB.Phone.tel = function(number)	{
	var newparams = {
		_sNumber : ""
	};
	
	newparams._sNumber = number;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.System.callTEL(newparams);
};

bizMOB.Phone.sms = function(number, message)	{
	var newparams = {
		_aNumber : [],
		_sMessage : ""
	};
	
	if(number.constructor === String)	newparams._aNumber.push(number);
	else	newparams._aNumber = number;
	newparams._sMessage = message;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.System.callSMS(newparams);
};

/**
 * *** deprecated. detectiOS로 대체함 ***
 */
bizMOB.detectiPhone = function() {
	var DEVICE_IPHONE = "iphone";
	var DEVICE_IPAD = "ipad";
	
	if (USER_AGENT.search(ENGINE_WEBKIT) > -1 
			&&( USER_AGENT.search(DEVICE_IPHONE) > -1
			|| USER_AGENT.search(DEVICE_IPAD) > -1)) return true;
	
	else return false;
};

bizMOB.detectIOS = function() {
	return bizMOB.Device.isIOS();
};

bizMOB.detectAndroid = function() {
	return bizMOB.Device.isAndroid;
};

bizMOB.detectPhone = function()	{
	return bizMOB.Device.isPhone();
};
bizMOB.detectTablet = function()	{
	return bizMOB.Device.isTablet(); 
};

bizMOB.Properties.set = function(key, value) {
	var newparams = {
		_sKey : '',
		_vValue : ''
	};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		newparams._sKey = key;
		newparams._vValue = value;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Properties.set(newparams);
};

bizMOB.Properties.sets = function(properties) {
	var newparams = {
		_aList : []
	};
	
	newparams._aList = properties.map(function(prop)	{
		return {
			_sKey : prop.key,
			_vValue : prop.value
		};
	});
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Properties.set(newparams);
};

bizMOB.Properties.get = function(key) {
	var newparams = {
		_sKey : ''
	};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		newparams._sKey = key;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	return bizMOBCore.Properties.get(newparams);
};

bizMOB.Properties.remove = function(key) {
	var newparams = {
		_sKey : ''
	};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		newparams._sKey = key;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Properties.remove(newparams);
};



bizMOB.Storage.save = function(key, value)	{
	var newparams = {
		_sKey : '',
		_vValue : ''
	};
	
	newparams._sKey = key;
	newparams._vValue = value;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Storage.set(newparams);
};

bizMOB.Storage.get = function(key) {
	var newparams = {
		_sKey : ''
	};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		newparams._sKey = key;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	return bizMOBCore.Storage.get(newparams);
};

bizMOB.Storage.remove = function(key) {
	var newparams = {
		_sKey : ''
	};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		newparams._sKey = key;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Storage.remove(newparams);
};

bizMOB.Security.authorize = function(options)	{
	var newparams = {
		_sTrcode : '',
		_oHeader : {},
		_oBody : {},
		_fCallback : function()	{},
		_sUserId : '',
		_sPassword : ''
	};
	
	newparams._sTrcode = options.trcode;
	newparams._oHeader = options.message.header;
	newparams._oBody = options.message.body;
	newparams._fCallback = options.success;
	newparams._sUserId = options.userid;
	newparams._sPassword = options.password;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Network.requestLogin(newparams);
};

bizMOB.Ui.prototype = new Object();

bizMOB.Ui.alert = function(title, message, btnConfirm)	{
	var newparams = {
		_sTitle : title,
		_sMessage : message,
		_aButtons : [ btnConfirm ]
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.showMessage(newparams);
};

bizMOB.Ui.confirm = function(title, message, btnConfirm, btnCancel)	{
	var newparams = {
		_sTitle : title,
		_sMessage : message,
		_aButtons : [ btnConfirm, btnCancel ]
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.showMessage(newparams);
};

bizMOB.Ui.toast = function(message, duration)	{
	var newparams = {
		_sMessage : message,
		_sDuration : duration ? duration : "long"
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.toast(newparams);
};

bizMOB.Ui.TextButton = function(text, listener)	{
	bizMOBCore.Window.TextButton.apply(this);
	
	this.text = text;
	this.callback = bizMOBCore.CallbackManager.save(listener, "listener");
};

bizMOB.Ui.createTextButton = function(text, listener)	{
	var newparams = {
		_sText : "",
		_fCallback : function()	{}
	};
	
	newparams._sText = text;
	newparams._fCallback = listener;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	var textButton = new bizMOBCore.Window.TextButton();
	textButton.setProperty(newparams);
	
	return textButton;
};

bizMOB.Ui.Button = function(options)	{
	bizMOBCore.Window.ImageButton.apply(this);
	
	this.image_name = options.image_name;
	this.callback = bizMOBCore.CallbackManager.save(options.listener, "listener");
};

bizMOB.Ui.createButton = function(options)	{
	if(!options)	options = {};
		
	var newparams = {
		_sImagePath : options.image_name,
		_fCallback : options.listener,
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	return;
	
	var imageButton = new bizMOBCore.Window.ImageButton();
	imageButton.setProperty(newparams);
	
	return imageButton;
};

bizMOB.Ui.TitleBar = function(title)	{
	this.image_name = "";
	this.visible = true;
	this.left = [];
	this.right = [];
	this.title = title;
};

bizMOB.Ui.prototype.defaultTitlebar = new bizMOB.Ui.TitleBar("");

bizMOB.Ui.TitleBar.prototype.setBackGroundImage = function(image) {
	this.image_name = image;
};

bizMOB.Ui.TitleBar.prototype.getBackGroundImage = function() {
	return this.image_name;
};

bizMOB.Ui.TitleBar.prototype.setTopLeft = function(button) {
	this.setLeftButton(button);
};

bizMOB.Ui.TitleBar.prototype.setLeftButton = function(button) {
	this.left = [button];
};

bizMOB.Ui.TitleBar.prototype.setLeftButtons = function(buttons) {
	this.left = buttons;
};

bizMOB.Ui.TitleBar.prototype.getLeftButtons = function() {
	return this.left;
};

bizMOB.Ui.TitleBar.prototype.setTopRight = function(button) {
	this.setRightButton(button);
};

bizMOB.Ui.TitleBar.prototype.setRightButton = function(button) {
	this.right = [button];
};

bizMOB.Ui.TitleBar.prototype.setRightButtons = function(buttons) {
	this.right = buttons;
};

bizMOB.Ui.TitleBar.prototype.getRightButtons = function() {
	return this.right;
};

bizMOB.Ui.TitleBar.prototype.setVisible = function(visible) {
	this.visible = visible;
};

bizMOB.Ui.TitleBar.prototype.getVisible = function() {
	return this.visible;
};

bizMOB.Ui.TitleBar.setDefaults = function(titlebar) {
	bizMOB.Ui.TitleBar.prototype.defaultTitlebar = titlebar;
};

bizMOB.Ui.TitleBar.getDefaults = function() {
	return bizMOB.Ui.TitleBar.prototype.defaultTitlebar;
};

bizMOB.Ui.createTitleBar = function(title) {
	var t = new bizMOB.Ui.TitleBar(title);
	return t;
};

bizMOB.Ui.ToolBar = function() {
	this.visible = true;
	this.image_name = "";
	this.buttons = [];
};
bizMOB.Ui.prototype.defaultToolbar = new bizMOB.Ui.ToolBar("");

bizMOB.Ui.createToolBar = function() {
	var t = new bizMOB.Ui.ToolBar();
	return t;
};

bizMOB.Ui.ToolBar.prototype.setBackGroundImage = function(image) {
	this.image_name = image;
};

bizMOB.Ui.ToolBar.prototype.getBackGroundImage = function() {
	return this.image_name;
};

bizMOB.Ui.ToolBar.prototype.setButtons = function(buttons) {
	this.buttons = buttons;
};

bizMOB.Ui.ToolBar.prototype.getButtons = function() {
	return this.buttons;
};

bizMOB.Ui.ToolBar.prototype.setVisible = function(visible) {
	this.visible = visible;
};

bizMOB.Ui.ToolBar.prototype.getVisible = function() {
	return this.visible;
};

bizMOB.Ui.ToolBar.setDefaults = function(toolbar) {
	bizMOB.Ui.ToolBar.prototype.defaultToolbar = toolbar;
};

bizMOB.Ui.ToolBar.getDefaults = function() {
	return bizMOB.Ui.ToolBar.prototype.defaultToolbar;
};


bizMOB.Ui.PageLayout = function() {
	this.titlebar = new bizMOB.Ui.TitleBar("");
	this.bottom_toolbar;
	this.left_toolbar;
	this.right_toolbar;
};

bizMOB.Ui.PageLayout.prototype.setToolbar = function(toolbar) {
	this.setBottomToolbar(toolbar);
};

bizMOB.Ui.PageLayout.prototype.setBottomToolbar = function(toolbar) {
	this.bottom_toolbar = toolbar;
};

bizMOB.Ui.PageLayout.prototype.setLeftToolbar = function(toolbar) {
	this.left_toolbar = toolbar;
};

bizMOB.Ui.PageLayout.prototype.setRightToolbar = function(toolbar) {
	this.right_toolbar = toolbar;
};

bizMOB.Ui.PageLayout.prototype.setTitleBar = function(titlebar) {
	this.titlebar = titlebar;
};

bizMOB.Ui.createPageLayout = function() {
	var b = new bizMOB.Ui.PageLayout("");
	return b;
};

bizMOB.Ui.displayView = function(pageLayout, options)	{
	var newparams = {
		_aElement : []
	};
	
	newparams._aElement = Object.keys(pageLayout).map(function(elementKey)	{
		var element;
		
		switch( pageLayout[elementKey].constructor )	{
		case bizMOB.Ui.TitleBar :
			element = new bizMOBCore.Window.TitleBar({
				_sTitle : pageLayout[elementKey].title
			});
			
			element.setProperty({
				_bVisible : pageLayout[elementKey].visible,
				_sImagePath : pageLayout[elementKey].image_name,
				_aLeftImageButton : pageLayout[elementKey].left,
				_aRightImageButton : pageLayout[elementKey].right
			});

			break;
		case bizMOB.Ui.ToolBar :
			element = new bizMOBCore.Window.ToolBar({
				_aImageButton : pageLayout[elementKey].buttons
			});
			
			element.setProperty({
				_bVisible : pageLayout[elementKey].visible,
				_sImagePath : pageLayout[elementKey].image_name
			});
			
			break;
		}
		
		return element;
	});
	
	console.log(JSON.stringify(newparams));
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.draw(newparams);
};

bizMOB.Ui.openDialog = function(html_page, options)	{
	if(options == undefined)	options = {};
	
	var newparams = {
		_oMessage : options.message,
		_sPagePath : html_page,
		_sWidth : options.width,
		_sHeight : options.height,
		_sBaseSize : options.base_on_size,
		_sBaseOrientation : options.base_size_orientation
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.openpopup(newparams);
};

bizMOB.Ui.closeDialog = function(options)	{
	if(options == undefined)	options = {};
	
	var newparams = {
		_oMessage : options.message,
		_sCallback : options.callback
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Window.closepopup(newparams);
};

bizMOB.Map.show = function(location) {
	var newparams = {
		_sLocation : location
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.System.callMap(newparams);
};

bizMOB.Contacts.get = function(options)	{
	var newparams = {
		_sSearchType : "",
		_sSearchText : "",
		_fCallback : ""
	};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	{
			options.search_type = "";
			options.search_text = "";
			options.callback = appcallOnContacts;
		}
		
		newparams._sSearchType = options.search_type;
		newparams._sSearchText = options.search_text;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Contacts.get(newparams);
};

bizMOB.Network.setSessionTimeout = function(msec) {
	var newparams = {
		_fCallback : function()	{},
		_nSeconds : msec
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.App.requestTimeout(newparams);
};

bizMOB.Network.getSessionTimeout = function(callback) {
	var newparams = {
		_fCallback : callback,
		_nSeconds : -1
	};
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.App.requestTimeout(newparams);
};

//bizMOB.Network.fileUpload = function(fileList, callback)	{
//	
//};

bizMOB.Network.fileDownload = function(file_list, method, options) {
	var newparams = {
		_fCallback : function()	{},
		_aFileList : [],
		_sMode : "",
		_oProgressBar : {
			provider : "native",
			type : "default"
		}
	};
	
	newparams._fCallback = options.callback;
	newparams._aFileList = file_list.map(function(file)	{
		return {
			_sDirectory : file.directory,
			_sFileName : file.filename,
			_bOverwrite : file.overwrite,
			_sURI : file.uri
		};
	});
	newparams._sMode = method;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.File.download(newparams);
};

//bizMOB.Network.imageDownload = function(uri, display_name, callback)	{
//	
//};

bizMOB.File.zip = function(sourcePath, targetPath, options)	{
	var required = new Array("_sSourcePath","_sTargetPath"),
		newparams = {
			_sSourcePath : "",
			_sTargetPath : "",
			_fCallback : function()	{} 
		};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	options = {};
		
		newparams._sSourcePath = sourcePath;
		newparams._sTargetPath = targetPath;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	bizMOBCore.File.zip(newparams);
};

bizMOB.File.unzip =	function(sourcePath, targetDir, options)	{
	var required = new Array("_sSourcePath","_sTargetPath"),
		newparams = {
			_sSourcePath : "",
			_sTargetPath : "",
			_fCallback : function()	{} 
		};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	options = {};
		
		newparams._sSourcePath = sourcePath;
		newparams._sTargetPath = targetDir;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	bizMOBCore.File.unzip(newparams);
};

bizMOB.File.open = function(sourcePath, options)	{
	var required = new Array("_sSourcePath"),
		newparams = {
			_sSourcePath : "",
			_fCallback : function()	{} 
		};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	options = {};
		
		newparams._sSourcePath = sourcePath;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	bizMOBCore.File.open(newparams);
};

bizMOB.File.move = function(sourcePath, targetPath, options)	{
	var required = new Array("_sSourcePath","_sTargetPath"),
		newparams = {
			_sSourcePath : "",
			_sTargetPath : "",
			_fCallback : function()	{} 
		};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	options = {};
		
		newparams._sSourcePath = sourcePath;
		newparams._sTargetPath = targetPath;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	bizMOBCore.File.move(newparams);
};

bizMOB.File.copy = function(sourcePath, targetPath, options)	{
	var required = new Array("_sSourcePath","_sTargetPath"),
		newparams = {
			_sSourcePath : "",
			_sTargetPath : "",
			_fCallback : function()	{} 
		};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	options = {};
		
		newparams._sSourcePath = sourcePath;
		newparams._sTargetPath = targetPath;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	bizMOBCore.File.copy(newparams);
};

bizMOB.File.remove = function(sourcePaths, options)	{
	var required = new Array("_aSourcePath"),
		newparams = {
			_aSourcePath : [],
			_fCallback : function()	{} 
		};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	options = {};
		
		newparams._aSourcePath = sourcePaths;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	bizMOBCore.File.remove(newparams);
};

bizMOB.File.directory = function(dir, options)	{
	var required = new Array("_sSourcePath"),
		newparams = {
			_sSourcePath : "",
			_fCallback : function()	{} 
		};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	options = {};
		
		newparams._sSourcePath = dir;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	bizMOBCore.File.directory(newparams);
};

bizMOB.File.exist = function(sourcePath, options)	{
	var required = new Array("_sSourcePath"),
		newparams = {
			_sSourcePath : "",
			_fCallback : function()	{} 
		};
	
	if(arguments[0].constructor == Object)	{
		newparams = arguments[0];
	} else	{
		if(options == undefined)	options = {};
		
		newparams._sSourcePath = sourcePath;
		newparams._fCallback = options.callback;
	}
	
	if(!bizMOBCore.Module.checkparam(newparams, required))	{
		return;
	}
	
	bizMOBCore.File.exist(newparams);
};

bizMOB.WebStorage.save = function(key, value)	{
	var newparams = {
		_sKey : '',
		_vValue : ''
	};
	
	newparams._sKey = key;
	newparams._vValue = value;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Storage.set(newparams);
};

bizMOB.WebStorage.get = function(key) {
	var newparams = {
		_sKey : ''
	};
	
	newparams._sKey = key;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	return bizMOBCore.Storage.get(newparams);
};

bizMOB.WebStorage.remove = function(key) {
	var newparams = {
		_sKey : ''
	};
	
	newparams._sKey = key;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.Storage.remove(newparams);
};

bizMOB.Camera.capture = function(listener, directory, filename) {
	var newparams = {
		_sDirectory : "",
		_sFileName : "",
		_fCallback : function()	{}
	};
	
	newparams._sDirectory = directory;
	newparams._sFileName = filename;
	newparams._fCallback = listener;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	bizMOBCore.System.callCamera(newparams);
};

bizMOB.Gallery.show = function(listener, options) {
	if(options == undefined)	options = {};
	
	var newparams = {
		_aType : [ "video", "image" ],
		_sType : "",
		_fCallback : function()	{}
	};
	
	if(options.typeList)	{
		if(options.typeList.length == 1)	{
			newparams._aType = [ options.typeList[0] ];
		}
	}
	
	newparams._fCallback = listener;
	
	if(!bizMOBCore.Module.checkparam(newparams))	{
		return;
	}
	
	newparams._sType = newparams._aType.slice(0);
	
	delete newparams._aType;
	
	bizMOBCore.System.callGallery(newparams);
};
