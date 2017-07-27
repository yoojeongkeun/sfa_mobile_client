

/**
 * bizMOB client xross interface 
 * 
 * @class	bizMOB xross 인터페이스
 * @version 3.0.0
 * @author	mobile C&C
 */
var bizMOB = new Object();

//bizMOB.prototype = new Object();

bizMOB.servicename = "bizMOB";

bizMOB.addEvent = function(sEvent, sCallback) {
	
	var action = "addevent";
	
	if(bizMOBCore.EventManager.storage[sEvent] ) {
		bizMOBCore.EventManager.storage[sEvent].push(sCallback);
		bizMOBCore.Module.logger(this.servicename, action ,"D", "'"+sEvent+ "' event added.");
	}else{
		bizMOBCore.Module.logger(this.servicename, action ,"D", "Event add failed. Cannot find '"+sEvent+"' eventname.");
	}
	
//	if(bizMOBCore.EventManager.list.indexOf(sEvent) > -1 ) {
//		bizMOBCore.EventManager.storage[sEvent] = sCallback;
//		bizMOBCore.Module.logger(this.servicename, action ,"D", "'"+sEvent+ "' event added.");
//	}else{
//		bizMOBCore.Module.logger(this.servicename, action ,"D", "Event add failed. Cannot find '"+sEvent+"' eventname.");
//	}

	
};

/**
 * biZMOB Logger class
 * 
 * @class	웹 인터페이스
 */
bizMOB.Logger = new Object();

//bizMOB.Logger.prototype = new Object();

bizMOB.Logger.info = function(_sMessage) {
	
	bizMOBCore.Module.logger("Page", "logging" ,"I", _sMessage);
	
};

bizMOB.Logger.warn = function(_sMessage) {
	
	bizMOBCore.Module.logger("Page", "logging" ,"W", _sMessage);
	
};

bizMOB.Logger.debug = function(_sMessage) {
	
	bizMOBCore.Module.logger("Page", "logging" ,"D", _sMessage);
	
};

bizMOB.Logger.error = function(_sMessage) {
	
	bizMOBCore.Module.logger("Page", "logging" ,"E", _sMessage);
	
};

/**
 * biZMOB Window class
 * 
 * @class	웹 인터페이스
 */
bizMOB.App = new Object();

//bizMOB.App.prototype = new Object();

bizMOB.App.exit = function(_sKey_vValue) {
	
	var required = new Array("_sKey","_vValue");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Storage.set(arguments[0]);
	
};


/**
 * biZMOB Window class
 * 
 * @class	웹 인터페이스
 */
bizMOB.Storage = new Object();

//bizMOB.Storage.prototype = new Object();

bizMOB.Storage.set = function(_sKey_vValue) {
	
	var required = new Array("_sKey","_vValue");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Storage.set(arguments[0]);
	
};

bizMOB.Storage.setList = function(_aList) {
	
	var required = new Array("_aList");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Storage.set(arguments[0]);
	
};

bizMOB.Storage.get = function(_sKey) {
	
	var required = new Array("_sKey");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	return bizMOBCore.Storage.get(arguments[0]);
	
};

bizMOB.Storage.remove = function(_sKey) {
	
	var required = new Array("_sKey");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Storage.remove(arguments[0]);
	
};

/**
 * biZMOB Window class
 * 
 * @class	웹 인터페이스
 */
bizMOB.Properties = new Object();

//bizMOB.Properties.prototype = new Object();

bizMOB.Properties.set = function(_sKey_vValue) {
	
	var required = new Array("_sKey","_vValue");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Properties.set(arguments[0]);
	
};

bizMOB.Properties.setList = function(_aList) {
	
	var required = new Array("_aList");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Properties.set(arguments[0]);
	
};

bizMOB.Properties.get = function(_sKey) {
	
	var required = new Array("_sKey");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	return bizMOBCore.Properties.get(arguments[0]);
	
};

bizMOB.Properties.remove = function(_sKey) {
	
	var required = new Array("_sKey");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Properties.remove(arguments[0]);
	
};


/**
 * biZMOB Network class
 * 
 * @class	웹 인터페이스
 */
bizMOB.Network = new Object();

//bizMOB.Network.prototype = new Object();

bizMOB.Network.requestTr = function(_sTrcode) {
	
	var required = new Array("_sTrcode");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Network.requestTr (arguments[0]);
	
};

bizMOB.Network.requestLogin = function(_sUserId_sPassword) {
	
	var required = new Array("_sUserId","_sPassword");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.Network.requestLogin (arguments[0]);	
	
};

/**
 * biZMOB System class
 * 
 * @class	웹 인터페이스
 */
bizMOB.System = new Object();

//bizMOB.System.prototype = new Object();

bizMOB.System.callTEL = function(_sNumber){
	
	var required = new Array("_sNumber");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	var number = arguments[0]._sNumber;
	
	arguments[0]._sNumber = number ? (number.match(/(^[+0-9])|[0-9]/gi).join("")) : "";
	
	bizMOBCore.System.callTEL(arguments[0]);
	
};

bizMOB.System.callSMS = function(_aNumber){
	
	var required = new Array("_aNumber");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.System.callSMS(arguments[0]);
	
};

bizMOB.System.callBrowser = function(_sURL){
	
	var required = new Array("_sURL");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.System.callBrowser(arguments[0]);
	
};

bizMOB.System.callGallery = function(_fCallback){
	
	var required = new Array("_fCallback");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	switch(arguments[0]._sType)
	{
		case "all" :
			arguments[0]._sType = ["video","image"];
			break;
		case "video" :
			arguments[0]._sType = ["video"];
			break;
		case "image" :
			arguments[0]._sType = ["image"];
			break;
		default :
			arguments[0]._sType = ["video","image"];
			break;
	}
	
	bizMOBCore.System.callGallery(arguments[0]);
	
};

bizMOB.System.callCamera = function(_fCallback){
	
	var required = new Array("_fCallback");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.System.callCamera(arguments[0]);
	
};

bizMOB.System.callMap = function(_sLocation){
	
	var required = new Array("_sLocation");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.System.callMap(arguments[0]);
	
};

bizMOB.System.getGPS = function(_fCallback){
	
	var required = new Array("_fCallback");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.System.getGPS(arguments[0]);
	
};
// API삭제
//bizMOB.System.setconfigGPS = function(_fCallback){
//	
//	var required = new Array("_fCallback");
//	
//	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
//		return;
//	}
//	
//	bizMOBCore.System.setconfigGPS(arguments[0]);
//	
//};

/**
 * biZMOB Window class
 * 
 * @class	웹 인터페이스
 */
bizMOB.Window = new Object();

//bizMOB.Window.prototype = new Object();

bizMOB.Window.back = function(_nStep) {
	
	var required = new Array("_nStep");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	arguments[0]._sType = "index";
	
	bizMOBCore.Window.go(arguments[0]);
	
};

bizMOB.Window.go = function(_sName) {
	
	var required = new Array("_sName");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	arguments[0]._sType = "name";
	
	bizMOBCore.Window.go(arguments[0]);
	
};

bizMOB.Window.open = function(_sPagePath) {
	
	var required = new Array("_sPagePath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	arguments[0]._bReplace = false;
	if(arguments[0] == undefined){ arguments[0] = {_sType : "normal"}; }
	
	if(arguments[0]._sType == "popup"){
		bizMOBCore.Window.openpopup(arguments[0]);
	}else{
		bizMOBCore.Window.open(arguments[0]);
	}
	
};

bizMOB.Window.replace = function(_sPagePath) {
	
	var required = new Array("_sPagePath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	arguments[0]._bReplace = true;
	arguments[0]._sType = "normal";
	
	bizMOBCore.Window.open(arguments[0]);
	
};

bizMOB.Window.close = function() {
	
	if(arguments[0] == undefined){ arguments[0] = {_sType : "normal"}; }
	
	if(!bizMOBCore.Module.checkparam(arguments[0])) {
		return;
	}
	
	if(arguments[0]._sType == "popup"){
		bizMOBCore.Window.closepopup(arguments[0]);
	}else{
		bizMOBCore.Window.close(arguments[0]);
	}
	
};

bizMOB.Window.createElement = function(_sElementName) {
	
	var required = new Array("_sElementName");
	
	if(!bizMOBCore.Module.checkparam(arguments[0],required)) {
		return;
	}
	
	switch(arguments[0]._sElementName){
		case "TextButton" :
			return new bizMOBCore.Window.TextButton();
			break;
		case "ImageButton" :
			return new bizMOBCore.Window.ImageButton();
			break;
		case "BadgeButton" :
			return new bizMOBCore.Window.BadgeButton();
			break;
//		case "L" :
//			if([4,5,6,7,12,11,14,15].indexOf(bizMOBCore.loglevel) > -1){
//				console.log("bizMOB LOG :"+logmsg);
//			}
//			break;
//		case "D" :
//			if([8,9,10,11,12,13,14,15].indexOf(bizMOBCore.loglevel) > -1){
//				console.debug("bizMOB DEBUG:"+logmsg);
//			}
//			break;
	}
	
};

bizMOB.Window.changeElementProperty = function(_sID_oProperty)	{
	
	var required = new Array("_sID", "_oProperty");
	
	if(!bizMOBCore.Module.checkparam(arguments[0],required)) {
		return;
	}
	
	var element = bizMOBCore.Window.getElement({
		"_sID" : arguments[0]._sID
	});
	
	if(element)	{
		element.changeProperty(arguments[0]._oProperty);
	}
	
};

bizMOB.Window.createTitleBar = function(_sTitle) {
	if(arguments[0] == undefined){ arguments[0] = {_sTitle : ""}; }
	return new bizMOBCore.Window.TitleBar(arguments[0]);
};

bizMOB.Window.createToolBar = function(_aImageButton) {
	if(arguments[0] == undefined){ arguments[0] = {_aImageButton : []}; }
	return new bizMOBCore.Window.ToolBar(arguments[0]);
};

bizMOB.Window.createSideBar = function(_aImageButton) {
	if(arguments[0] == undefined){ arguments[0] = {_aImageButton : []}; }
	return new bizMOBCore.Window.SideBar(arguments[0]);
};

bizMOB.Window.draw = function() {
	bizMOBCore.Window.draw(arguments[0]);
};

bizMOB.Window.alert = function(_vMessage){
	
	var required = new Array("_vMessage");
	
	if(!bizMOBCore.Module.checkparam(arguments[0],required)) {
		return;
	}
	
	if(!bizMOBCore.Module.checkelement(arguments[0]._eTextButton, "TextButton" ) ){
		return;
	}
	
	if(arguments[0]._vMessage && arguments[0]._vMessage.constructor !== String) {
		arguments[0]._sMessage = bizMOBCore.Module.stringjson(arguments[0]._vMessage);
	}else{
		arguments[0]._sMessage = arguments[0]._vMessage;
	}
	
	arguments[0]._aButtons = new Array();
	
	if(!arguments[0]._eTextButton) {
		arguments[0]._aButtons.push(bizMOB.Window.createElement({_sElementName:"TextButton"}));
	}else{
		arguments[0]._aButtons.push(arguments[0]._eTextButton);
	}
	
	bizMOBCore.Window.showMessage(arguments[0]);
	
};


bizMOB.Window.confirm = function(_vMessage_aTextButton){
	
	var required = new Array("_vMessage","_aTextButton");
	
	if(!bizMOBCore.Module.checkparam(arguments[0],required)) {
		return;
	}
	
	if(arguments[0]._vMessage && arguments[0]._vMessage.constructor !== String) {
		arguments[0]._sMessage = bizMOBCore.Module.stringjson(arguments[0]._vMessage);
	}else{
		arguments[0]._sMessage = arguments[0]._vMessage;
	}
	
	arguments[0]._aButtons = arguments[0]._aTextButton;
	
	bizMOBCore.Window.showMessage(arguments[0]);
	
};

bizMOB.Window.toast = function(_sMessage){
	
	var required = new Array("_sMessage");
	
	if(!bizMOBCore.Module.checkparam(arguments[0],required)) {
		return;
	}

	if (!arguments[0]._sDuration) arguments[0]._sDuration = "long";
		
	bizMOBCore.Window.toast(arguments[0]);
	
};

bizMOB.Window.openSignPad = function(){
	
	if(arguments[0] == undefined) { arguments[0] = {}; }
	
	if(arguments[0]._sTargetPath == undefined)	{
		arguments[0]._sTargetPath = "{external}/signpad/sign.bmp"
	}
	
	bizMOBCore.Window.openSignPad(arguments[0]);
	
};

bizMOB.Window.openImageViewer = function(){
	
	if(arguments[0] == undefined){ arguments[0] = {}; }
	
	bizMOBCore.Window.openImageViewer(arguments[0]);
	
};

bizMOB.Window.openCodeReader = function(){
	
	if(arguments[0] == undefined){ arguments[0] = {}; }
	
	bizMOBCore.Window.openCodeReader(arguments[0]);
	
};

//bizMOB.Window.postMessage = function(_sPosition_sCallback)	{
//	var required = new Array("_sPosition", "_sCallback");
//	
//	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
//		return;
//	}
//	
//	bizMOBCore.SideView.postMessage(arguments[0]);
//};

bizMOB.SideView = new Object();

//bizMOB.SideView.prototype = new Object();

bizMOB.SideView.create = function(_sPosition_sPagePath_sWidth)	{
	var required = new Array("_sPosition", "_sPagePath", "_sWidth");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.SideView.create(arguments[0]);
};

bizMOB.SideView.show = function(_sPosition)	{
	var required = new Array("_sPosition");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.SideView.show(arguments[0]);
};

bizMOB.SideView.hide = function()	{
	var required = new Array();
	
	if(!arguments[0])	arguments[0] = {};
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.SideView.hide(arguments[0]);
};

//bizMOB.SideView.postMessage = function(_sCallback)	{
//	var required = new Array("_sCallback");
//	
//	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
//		return;
//	}
//	
//	arguments[0]._sPosition = "center";
//	
//	bizMOBCore.SideView.postMessage(arguments[0]);
//};

bizMOB.App = new Object();

//bizMOB.App.prototype = new Object();

bizMOB.App.servicename = "App";

bizMOB.App.exit = function(){
	
	arguments[0]._sType = arguments[0]._sType? arguments[0]._sType : "exit";
	
	bizMOBCore.App.exit(arguments[0]);
	
};

bizMOB.App.setTimeout = function(_nSeconds){
	
	var required = new Array("_nSeconds");
	
	if(!bizMOBCore.Module.checkparam(arguments[0],required)) {
		return;
	}

	
	bizMOBCore.App.requestTimeout(arguments[0]);
	
};

bizMOB.App.getTimeout = function(_fCallback){
	
	var required = new Array("_fCallback");
	
	if(!bizMOBCore.Module.checkparam(arguments[0],required)) {
		return;
	}
	arguments[0]._nSeconds = -1;
	
	bizMOBCore.App.requestTimeout(arguments[0]);
	
};


/* ********** Contacts  ***************************************** */

bizMOB.Contacts = new Object();

//bizMOB.Contacts.prototype = new Object();

bizMOB.Contacts.get = function() {
	
	if(!arguments[0]._sSearchType) arguments[0]._sSearchType = "";
	if(!arguments[0]._sSearchText) arguments[0]._sSearchText = "";
	
	bizMOBCore.Contacts.get(arguments[0]);
};

/* ********** File  ***************************************** */

bizMOB.File = new Object();

//bizMOB.File.prototype = new Object();

bizMOB.File.open = function(_sSourcePath){
	
	var required = new Array("_sSourcePath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.open(arguments[0]);
};

bizMOB.File.zip= function(_sSourcePath_sTargetPath){
	
	var required = new Array("_sSourcePath","_sTargetPath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.zip(arguments[0]);
};

bizMOB.File.unzip= function(_sSourcePath_sDirectory){
	var required = new Array("_sSourcePath","_sDirectory");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.unzip(arguments[0]);
};

bizMOB.File.move = function(_sSourcePath_sTargetPath){
	var required = new Array("_sSourcePath","_sTargetPath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.move(arguments[0]);
};

bizMOB.File.copy = function(_sSourcePath_sTargetPath){
	var required = new Array("_sSourcePath","_sTargetPath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.copy(arguments[0]);
};

bizMOB.File.remove = function(_aSourcePath) {
	
	var required = new Array("_aSourcePath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.remove(arguments[0]);
	
};

bizMOB.File.directory = function(_sDirectory){
	var required = new Array("_sDirectory");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.directory(arguments[0]);
};

bizMOB.File.exist = function(_sSourcePath) {
	
	var required = new Array("_sSourcePath");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.exist(arguments[0]);
	
};

bizMOB.File.download = function(_aFileList) {
	
	var required = new Array("_aFileList");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	var progressbar = {};
	
	switch(arguments[0]._sProgressBar)
	{
		case "full" :
			progressbar.provider = "native";
			progressbar.type = "full_list";
			break;
		case "each" :
			progressbar.provider = "native";
			progressbar.type = "each_list";
			break;
		case "off" :
			progressbar.provider = "web";
			progressbar.type = "";
			break;
		default :
			progressbar.provider = "native";
			progressbar.type = "default";
			break;
	}
	
	arguments[0]._oProgressBar = progressbar;
	
	bizMOBCore.File.download(arguments[0]);
	
};

bizMOB.File.upload = function(_aFileList)	{
	
	var required = new Array("_aFileList");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.upload(arguments[0]);
};

bizMOB.File.getInfo = function(_aFileList)	{
	
	var required = new Array("_aFileList");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.getInfo(arguments[0]);
};

bizMOB.File.resizeImage = function(_aFileList)	{
	
	var required = new Array("_aFileList");
    
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.File.resizeImage(arguments[0]);
};

bizMOB.File.rotateImage = function(_sSourcePath_sTargetPath_nOrientation)    {
	
    var required = new Array("_sSourcePath", "_sTargetPath", "_nOrientation");
    
    if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
    
    bizMOBCore.File.rotateImage(arguments[0]);
};

/* ********** Push  ***************************************** */

bizMOB.Push = new Object();

//bizMOB.Push.prototype = new Object();

bizMOB.Push.reset = function()	{
	var required = new Array();

	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}

	bizMOBCore.PushManager.reset(arguments[0]);
};

bizMOB.Push.getPushKey = function()	{
	var required = new Array();

	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}

	bizMOBCore.PushManager.getPushKey(arguments[0]);
};

bizMOB.Push.registerToServer = function(_sServerType_sUserId_sAppName)	{
	var required = new Array("_sServerType", "_sUserId", "_sAppName");
	
	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}

	bizMOBCore.PushManager.registerToServer(arguments[0]);
};

bizMOB.Push.setAlarm = function(_sUserId)	{
	var required = new Array("_sUserId", "_sPushKey", "_bEnabled");
	var params = $.extend(true, {
		"_sPushKey" : bizMOB.Device.getInfo({
			"_sKey" : "push_key"
		}),
		"_bEnabled" : true
	}, arguments[0]);
	
	if(!bizMOBCore.Module.checkparam(params, required)) {
		return;
	}
	
	bizMOBCore.PushManager.setAlarm(params);
};

bizMOB.Push.getAlarm = function(_sUserId_fCallback)	{
	var required = new Array("_sUserId", "_sPushKey", "_fCallback");
	var params = $.extend(true, {
		"_sPushKey" : bizMOB.Device.getInfo({
			"_sKey" : "push_key"
		}),
	}, arguments[0]);
	
	if(!bizMOBCore.Module.checkparam(params, required)) {
		return;
	}
	
	bizMOBCore.PushManager.getAlarm(params);
};

bizMOB.Push.getMessageList = function(_sAppName_nPageIndex_nItemCount_sUserId_fCallback)	{
	var required = new Array("_sAppName", "_nPageIndex", "_nItemCount", "_sUserId", "_fCallback");

	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.PushManager.getMessageList(arguments[0]);
};

bizMOB.Push.readMessage = function(_sTrxDay_sTrxId_sUserId)	{
	var required = new Array("_sTrxDay", "_sTrxId", "_sUserId");

	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.PushManager.readMessage(arguments[0]);
};

bizMOB.Push.getUnreadCount = function(_sAppName_sUserId_fCallback)	{
	var required = new Array("_sAppName", "_sUserId", "_fCallback");

	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.PushManager.getUnreadMessageCount(arguments[0]);
};

bizMOB.Push.setBadgeCount = function(_nBadgeCount)	{
	var required = new Array("_nBadgeCount");

	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.PushManager.setBadgeCount(arguments[0]);
};

bizMOB.Push.sendMessage = function(_sAppName_aUsers_sFromUser_sSubject_sContent)	{
	var required = new Array("_sAppName", "_aUsers", "_sFromUser", "_sSubject", "_sContent");
	var params = $.extend(true, {
		_sTrxType : "INSTANT",
		_sScheduleDate : "",
		_aGroups : [],
		_bToAll : false,
		_sCategory : "def",
		_oPayLoad : {} 
	}, arguments[0]);

	if(!bizMOBCore.Module.checkparam(params, required)) {
		return;
	}
	
	bizMOBCore.PushManager.sendMessage(params);
};

bizMOB.Push.readReceiptMessage = function(_sUserId_sMessageId_fCallback)	{
	var required = new Array("_sUserId", "_sMessageId");

	if(!bizMOBCore.Module.checkparam(arguments[0], required)) {
		return;
	}
	
	bizMOBCore.PushManager.readReceiptMessage(arguments[0]);
};

/* ********** Device  ***************************************** */

bizMOB.Device = new Object();

//bizMOB.Device.prototype = new Object();

//bizMOB.Device.Info = {};

bizMOB.Device.getInfo = function(_sKey){
	
	var required = new Array("_sKey");
	
	if(!bizMOBCore.Module.checkparam(arguments[0],required)) {
		return;
	}
	
	var rtVal;
	if(arguments[0] && arguments[0]._sKey){
		rtVal = bizMOB.Device.Info[arguments[0]._sKey];
	}else{
		rtVal = bizMOB.Device.Info;
	}
	return rtVal; 
};

bizMOB.Device.isIOS = function() {
	
	var isIOS = false;
	if(bizMOB.Device.Info.os_type.indexOf("iPhone") > -1
		|| bizMOB.Device.Info.os_type.indexOf("iOS") > -1)	{
		isIOS = true;
	}
	
	return isIOS;
};

bizMOB.Device.isAndroid = function() {
	
	var isAndroid = bizMOB.Device.Info.os_type == "Android"?true:false;
	
	return isAndroid;
	
};

bizMOB.Device.isPhone = function()
{
	var isPhone = bizMOB.Device.Info.device_type == "Phone"?true:false;
	
	return isPhone; 
};

bizMOB.Device.isTablet = function()
{
	var isTablet = bizMOB.Device.Info.device_type == "Tablet"?true:false;
	
	return isTablet; 
};