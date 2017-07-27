/**
 * bizMOB WEB Emulator Environment Setting
 * EMULATOR_TYPE : phone, iphone, phonehigh, ipad, galtab 
 */
var EMULATOR_TYPE = "phone";
/**
 * bizMOB WEB Emulator Environment Setting 
 */
var DEVICE_CONFIG = {
		"phone" : {
			EMUL_DEVICE_INFO : {"locale":"ko_KR", "device_type" : "Phone","model":"SHW-M250S","spec_version":"0.9","app_build_version":"0","app_major_version":"1","screen_width":"720","app_minor_version":"0","content_minor_version":"0","device_id":"358362042435174","content_major_version":"0","os_version":"2.3","os_type":"emulator","network_operater_name":"SKTelecom","mobile_number":"01045182680","manufacturer":"samsung","screen_density":"2.0","screen_density_dpi":"320","screen_height":"1280","client_version":"KBGWANP0"},
			PHONE_HEIGHT : 800,
			PHONE_WIDTH : 480,
			STATE_BAR_HEIGHT : 38,
			HEADER_HEIGHT : 60,
			BOTTOM_TOOLBAR_HEIGHT : 70,
			LEFT_RIGHT_TOOLBAR_WIDTH : 0,
			WEBKIT_HEIGHT : 632
		},
		"iphone" : {
			 EMUL_DEVICE_INFO : {"locale":"ko_KR", "device_type" : "Phone","model":"iPhone 5","spec_version":"0.9","app_build_version":"0","app_major_version":"1","screen_width":"720","app_minor_version":"0","content_minor_version":"0","device_id":"358362042435174","content_major_version":"0","os_version":"2.3","os_type":"emulator","network_operater_name":"SKTelecom","mobile_number":"01045182680","manufacturer":"samsung","screen_density":"2.0","screen_density_dpi":"320","screen_height":"1280","client_version":"KBGWANP0"},
			 PHONE_HEIGHT : 480,
			 PHONE_WIDTH : 320,
			 STATE_BAR_HEIGHT : 20,
			 HEADER_HEIGHT : 44,
			 BOTTOM_TOOLBAR_HEIGHT : 44,
			 LEFT_RIGHT_TOOLBAR_WIDTH : 0,
			 WEBKIT_HEIGHT : 372
		},
		"phonehigh" : {
			 EMUL_DEVICE_INFO : {"locale":"ko_KR", "device_type" : "Phone","model":"SHV-E120S","spec_version":"0.9","app_build_version":"0","app_major_version":"1","screen_width":"720","app_minor_version":"0","content_minor_version":"0","device_id":"358362042435174","content_major_version":"0","os_version":"2.3","os_type":"emulator","network_operater_name":"SKTelecom","mobile_number":"01035689214","manufacturer":"samsung","screen_density":"2.0","screen_density_dpi":"320","screen_height":"1280","client_version":"BM20ANP0"},
			 PHONE_HEIGHT : 1280,
			 WEBKIT_HEIGHT : 982,
			 HEADER_HEIGHT : 100,
			 BOTTOM_TOOLBAR_HEIGHT : 100,
			 STATE_BAR_HEIGHT : 38,
			 PHONE_WIDTH : 800,
			 LEFT_RIGHT_TOOLBAR_WIDTH : 0
		},
		"ipad" : {
			 EMUL_DEVICE_INFO : {"locale":"ko_KR","device_type" : "Tablet", "model":"iPad 2G","spec_version":"0.9","app_build_version":"0","app_major_version":"1","screen_width":"720","app_minor_version":"0","content_minor_version":"0","device_id":"358362042435174","content_major_version":"0","os_version":"2.3","os_type":"emulator","network_operater_name":"SKTelecom","mobile_number":"01045182680","manufacturer":"samsung","screen_density":"2.0","screen_density_dpi":"320","screen_height":"1280","client_version":"KBGWANP0"},
			 WEBKIT_HEIGHT : 600,
			 PHONE_HEIGHT : 768,
			 PHONE_WIDTH : 1024,
			 STATE_BAR_HEIGHT : 38,
			 HEADER_HEIGHT : 60,
			 BOTTOM_TOOLBAR_HEIGHT : 70,
			 LEFT_RIGHT_TOOLBAR_WIDTH : 128
		},
		"galtab" : {
			 EMUL_DEVICE_INFO : {"locale":"ko_KR", "device_type" : "Tablet","model":"SHW-M380K","spec_version":"0.9","app_build_version":"0","app_major_version":"1","screen_width":"720","app_minor_version":"0","content_minor_version":"0","device_id":"358362042435174","content_major_version":"0","os_version":"2.3","os_type":"emulator","network_operater_name":"SKTelecom","mobile_number":"01045182680","manufacturer":"samsung","screen_density":"2.0","screen_density_dpi":"320","screen_height":"1280","client_version":"KBGWANP0"},
			 WEBKIT_HEIGHT : 600,
			 PHONE_HEIGHT : 768,
			 PHONE_WIDTH : 1024,
			 STATE_BAR_HEIGHT : 38,
			 HEADER_HEIGHT : 60,
			 BOTTOM_TOOLBAR_HEIGHT : 70,
			 LEFT_RIGHT_TOOLBAR_WIDTH : 70
		}
};


var STATE_BAR_HEIGHT = 38;

var EMUL_DEVICE_INFO =  DEVICE_CONFIG[EMULATOR_TYPE].EMUL_DEVICE_INFO;
var PHONE_HEIGHT = DEVICE_CONFIG[EMULATOR_TYPE].PHONE_HEIGHT;
var PHONE_WIDTH = DEVICE_CONFIG[EMULATOR_TYPE].PHONE_WIDTH;
var HEADER_HEIGHT = DEVICE_CONFIG[EMULATOR_TYPE].HEADER_HEIGHT;
var BOTTOM_TOOLBAR_HEIGHT = DEVICE_CONFIG[EMULATOR_TYPE].BOTTOM_TOOLBAR_HEIGHT;
var LEFT_RIGHT_TOOLBAR_WIDTH = DEVICE_CONFIG[EMULATOR_TYPE].LEFT_RIGHT_TOOLBAR_WIDTH;
var WEBKIT_HEIGHT = DEVICE_CONFIG[EMULATOR_TYPE].WEBKIT_HEIGHT;

var CURRENT_PATH = location.pathname;
var ROOT_PATH = CURRENT_PATH.substring(0,CURRENT_PATH.indexOf("/contents"));
var SERVER_URL = ROOT_PATH+"/emulator/";
var CONTENTS_PATH = ROOT_PATH+"/contents/";
var emulator;
var APP_KEY = "CESCANP2";
var DEVICE_ID = "1";
var POP_IDX = 0;

/*
$(document).ready(function() {
	
	var param = location.search;
	param = param.replace("?message=","");
	
	param = jQuery.parseJSON(decodeURIComponent(param));
	emulator = new bizMOB.Emulator();
//	alert(window.dialogArguments);
//	if(window.dialogArguments == undefined) {
//		emulator.generateSpace();
//		appcallOnLoad(param);
//	} else {
//		//alert(JSON.stringify(window.dialogArguments));
//		appcallOnLoad(window.dialogArguments);
//	}
//	
	if(window.name!='popup') {
		emulator.generateSpace();
	}
	emulator.loadStorage();
	emulator.loadPropertis();
	appcallOnLoad(param);
});
*/
window.BizmobPluginMgr = {
		"addPlugin" :function(){ 
			this.start =  function(a,b,c,d,e){};
			return this;
		}
};
//window.BizmobPluginMgr.addPlugin.prototype =   new Object();
//window.BizmobPluginMgr.addPlugin.start =  function(a,b,c,d,e){};
//
//window.BizmobPluginMgr.prototype = new Object();
//window.BizmobPluginMgr.prototype.addPlugin = function(){
//	this.start = function(){};
//};


bizMOB.Emulator = function() {
	
	
	
	this.STATE_BAR_ID = "emulStateBar";
	this.HEADER_ID = "emulHeader";
	this.TITLE_BAR_ID = "emulTitleBar";
	this.TOP_LEFT_ID = "emulTopLeft";
	this.TOP_RIGHT_ID = "emulTopRight";
	this.TOOLBAR_BOX_ID = "emulToolbarBox";
	this.BOTTOM_TOOLBAR_ID = "emulBottomToolbar";
	this.LEFT_TOOLBAR_ID = "emulLeftToolbar";
	this.RIGHT_TOOLBAR_ID = "emulRightToolbar";
	this.CONTENTS_ID = "emulContents";
	this.CONSOLE_ID = "emulConsole";
	
	this.menuHeight = 0;
};
bizMOB.Emulator.prototype = new Object();

// override
bizMOB.onFireMessage = function(message) 
{
	console.log(JSON.stringify(message.param));
	if(message.id == 'SET_APP') {
		emulator.setApp(message.param);
	}else if(message.id == 'REPLACE_WEB') {
		emulator.replaceWeb(message.param);
	} else if(message.id == 'SHOW_WEB') {
		emulator.openWeb(message.param);
	} else if(message.id == 'RELOAD_WEB') {
		emulator.post(message.param);
	} else if(message.id == 'SHOW_POPUP_VIEW') {
		emulator.popup(message.param);
	} else if(message.id == 'DISMISS_POPUP_VIEW') {
		emulator.closePopup(message.param);
	} else if(message.id == 'SHOW_WEB_MODAL') {
		emulator.openModal(message.param);
	} else if(message.id == 'DISMISS_WEB_MODAL') {
		emulator.closeModal(message.param);
	} else if(message.id == 'SET_MSTORAGE') {
		emulator.saveStorage(message.param);
	} else if(message.id == 'POPUP_MESSAGE_BOX') {
		if(message.param.buttons.length > 0){
			emulator.confirm(message.param);
		} else {
			emulator.alert(message.param);
		}
	} else if(message.id == 'SET_FSTORAGE') {
		emulator.saveProperty(message.param);
	}
	else if(message.id == 'AUTH')
	{
		emulator.auth(message.param);
	}else if(message.id == 'GET_DEVICEINFO')
	{
		emulator.getDeviceInfo(message.param);
	}else if(message.id == 'APPLICATION_EXIT')
	{
		emulator.exit(message.param);
	}
	else {
		console.log("아직 웹 에뮬레이터에서 구현중임.-->" + message.id);
		console.log(JSON.stringify(message, bizMOB.replacer));
		//alert("아직 웹 에뮬레이터에서 구현중임.-->" + message.id);
		//alert(JSON.stringify(message, bizMOB.replacer));
	}
};

bizMOB.Emulator.prototype.auth = function(param) {
	var opt = param;
	var LOGIN = {
	    "header": {
	        "trcode": "LOGIN",
	        "error_text": "",
	        "info_text": "",
	        "message_version": "",
	        "result": "true",
	        "error_code": "",
	        "login_session_id": ""
	    },
	    "body": {
	        "user_id": opt.auth_info.user_id,
	        "os_type": "emulator",
	        "legacy_message": opt.legacy_message,
	        "legacy_trcode": opt.legacy_trcode,
	        "password": opt.auth_info.password,
	        "emulator_flag": true,
	        "device_id": window.DEVICE_ID,
	        "app_key": window.APP_KEY,
	        "phone_number": "",
	        "manual_phone_number": false
	    }
	};
	emulator.post(
		{
			message : LOGIN,
			trcode : LOGIN.header.trcode,
			opt : opt,
			callback : function(json)
			{
				if(json.header.result)	(eval(param.opt.callback))(json.body.legacy_message);
				else (eval(param.opt.callback))(json);
			}
		}
	);
};

bizMOB.Emulator.prototype.generateSpace = function() {
	
	var body = $("body");
	var bodyBorder = 10;
	var bodyMargin = LEFT_RIGHT_TOOLBAR_WIDTH;
	body.css("width", PHONE_WIDTH + "px")
		.css("height", PHONE_HEIGHT + "px")		
		.css("min-height", PHONE_HEIGHT + "px")		
		.css("border", bodyBorder + "px solid green")
		.css("margin", bodyMargin + "px")
		.css("margin-bottom", "150px")
		.css("position", "relative");
	
	var console = $("<div id='" + this.CONSOLE_ID + "'></div>")
		.css("width", "100%")
		.css("height","150px")
		.css('overflow',"auto")
		.css("position", "fixed")
		.css("bottom", "0")
		.css("left", -(bodyMargin))
		.css("background-color", "#dddddd")
		.css("font-size", "25px")
		.css("display", "none"); // TODO : 임시로 숨김
	
	var contents = $("<div id='" + this.CONTENTS_ID + "'></div>")
		.css("width", PHONE_WIDTH + "px")
		.css("height",WEBKIT_HEIGHT + "px")
		.css('overflow-y',"auto");
	
	$("body > *").each(function() {
		$(this).appendTo(contents);
	});
	contents.appendTo(body);
	
	/* TODO : 임시로 숨김
	console.appendTo(body);
	$("<div><h2 align='center'>CONSOLE</h2></div>")
		.css("width","100%")
		.css("position", "fixed")
		.css("bottom", (console.height()-35) + "px")
		.appendTo(body);
	*/
	
	var header = $("<div id='" + this.HEADER_ID + "'></div>")
		.css("width", PHONE_WIDTH + "px")
		.css("height",HEADER_HEIGHT + "px")
		.css('position','relative')
		.prependTo(body);
	$("<div id='" + this.TOP_LEFT_ID + "'></div>")
		.css("position","absolute")
		.css("left","10px")
		.css("top","10%")
		.css("margin-top","-18px")
		.appendTo(header);
	$("<div id='" + this.TITLE_BAR_ID + "'></div>")
		.css("height",HEADER_HEIGHT + "px")
		.css("text-align","center")
		.css("line-height",HEADER_HEIGHT + "px")
		.css("color","#FFFFFF")
		.appendTo(header);
	$("<div></div>")
		.attr("id",this.TOP_RIGHT_ID)
		.css("position","absolute")
		.css("right","10px")
		.css("top","10%")
		.css("margin-top","-18px")
		.appendTo(header);
		
	$("<div id='" + this.STATE_BAR_ID + "'></div>")
		.css("background-color","#ddd")
		.css("width", PHONE_WIDTH + "px")
		.css("height",STATE_BAR_HEIGHT + "px")
		.prependTo(body);
		
	/*
	var toolbarBox = $("<div id='" + this.TOOLBAR_BOX_ID + "'></div>")
		//.css("background-color","#88FF88")
		.css("width", (PHONE_WIDTH + 70) + "px")
		.css("height",PHONE_HEIGHT + "px")
		.css("position", "absolute")
		.css("left",-70)
		.css("top", 0)
		.css("margin", (bodyMargin + bodyBorder) + "px")
		.css("overflow","hidden")
		.appendTo(body);
	*/
	$("<div id='" + this.BOTTOM_TOOLBAR_ID + "'></div>")
		.css("background-color","#88FF88")
		.css("width", PHONE_WIDTH + "px")
		.css("height",BOTTOM_TOOLBAR_HEIGHT + "px")
		.css("overflow","hidden")
		.appendTo(body);
		
	$("<div id='" + this.LEFT_TOOLBAR_ID + "'></div>")
		.css("background-color","#88FF88")
		.css("width", LEFT_RIGHT_TOOLBAR_WIDTH + "px")
		.css("height",(PHONE_HEIGHT/2) + "px")
		.css("position", "absolute")
		.css("left",-(LEFT_RIGHT_TOOLBAR_WIDTH))
		.css("top", (PHONE_HEIGHT/2) - ((PHONE_HEIGHT/2)/2))
		.css("float","left")
		.appendTo(body);
		
	$("<div id='" + this.RIGHT_TOOLBAR_ID + "'></div>")
		.css("background-color","#88FF88")
		.css("width", LEFT_RIGHT_TOOLBAR_WIDTH + "px")
		.css("height",(PHONE_HEIGHT/2) + "px")
		.css("position", "absolute")
		.css("left",(PHONE_WIDTH) + "px")
		.css("top", (PHONE_HEIGHT/2) - ((PHONE_HEIGHT/2)/2))
		.css("float", "right")
		.appendTo(body);
		
};
bizMOB.Emulator.prototype.setApp = function(param) 
{
	if(window.name.indexOf("popup") < 0){
		emulator.generateTitleBar(param.titlebar);
		emulator.generateToolbar(param.bottom_toolbar, $('#'+this.BOTTOM_TOOLBAR_ID));
		emulator.generateToolbar(param.left_toolbar, $('#'+this.LEFT_TOOLBAR_ID));
		emulator.generateToolbar(param.right_toolbar, $('#'+this.RIGHT_TOOLBAR_ID));
		// TODO : 2011-10-20 callback 호출되도록 수정 (컨테이너가 callback을 호출하지 않고 있으므로 주석처리)
		eval(param.callback)();
	};
	
};
bizMOB.Emulator.prototype.generateTitleBar = function (titlebar) {
	var that = this;
	$("#emulTopLeft,#emulTopRight").empty();
	
	if(titlebar == undefined || (! titlebar.visible)) {
		$('#'+that.HEADER_ID).hide();
		$('#'+ that.CONTENTS_ID).css("height",+(WEBKIT_HEIGHT+HEADER_HEIGHT) + "px");
		return;
	}
	$('#'+that.HEADER_ID).show();
	
	// set title
	$('#' + that.TITLE_BAR_ID).text(titlebar.title);
	// set titlebar gackground image
	if(titlebar.image_name != undefined && titlebar.image_name != '') {
		if(titlebar.image_name.match(/https?/gi) ){
			$('#emulHeader').css("background","url('"+titlebar.image_name+"') repeat 0 0");
		}else{
			$('#emulHeader').css("background","url('"+CONTENTS_PATH+titlebar.image_name+"') repeat 0 0");
		}
		
	}
	// set left button
	if(titlebar.left) {
		titlebar.left.forEach(function(value)
		{
			var image = value.image_name;
			var text = value.button_text;
			var button = null;
			if(image != '' ){
				if(image.match(/https?/gi)){
					button = $("<button type='button'><img src='"+image+"' /></button>").appendTo('#'+that.TOP_LEFT_ID);
				}else{
					button = $("<button type='button'><img src='"+CONTENTS_PATH+image+"' /></button>").appendTo('#'+that.TOP_LEFT_ID);
				}
				
			}else {
				button = $("<button type='button'>"+text+"</button>").appendTo('#'+that.TOP_LEFT_ID);
			}
			
			if(value.action == 'APP_FUNC_GOTO_HOME') 
			{
				$(button).attr('onclick',"window.history.go("+ (-window.history.length)+");window.location.replace('../../main/html/main.html')");
			} else if(value.action == 'APP_FUNC_GOTO_BACK') 
			{
				$(button).attr('onclick',"window.history.back();");
			} else 
			{
				$(button).attr('onclick',value.action+'()');
			}
		});
		
		
	} else {
		// 기본 back button
		var back = $("<button type='button'>BACK</button>")
					.css("display","inline-block")
					.css("width","70px")
					.css("height","40px")
					.css("border","1px solid #fff")
					.appendTo('#'+that.TOP_LEFT_ID);
		$(back).click(function() 
		{
			//window.back();
			window.history.back();
		});
	}

	// set right button
	if(titlebar.right) {
		titlebar.right.forEach(function(value)
		{
			if(value.control_id == 'MHUpDown') {
				var up = "∧";
				var down = "∨";
				var upbutton = $("<button type='button'>"+up+"</button>")
								.css("display","inline-block")
								.css("width","30px")
								.css("height","40px")
								.css("border","1px solid #fff")
									.appendTo('#'+that.TOP_RIGHT_ID);
				var downbutton = $("<button type='button'>"+down+"</button>")
									.css("display","inline-block")
									.css("width","30px")
									.css("height","40px")
									.css("border","1px solid #fff")
									.appendTo('#'+that.TOP_RIGHT_ID);
				
				$(upbutton).attr('onclick',value.action+"('UP')");
				$(downbutton).attr('onclick',value.action+"('DOWN')");
				
				return;
			} 
			var image = value.image_name;
			var text = value.button_text;
			var button;
			
			if( image != '' ){
				
				if(image.match(/https?/gi)){
					button = $("<button type='button'><img src='"+image+"' /></button>").appendTo('#'+that.TOP_RIGHT_ID);
				}else{
					button = $("<button type='button'><img src='"+CONTENTS_PATH+image+"' /></button>").appendTo('#'+that.TOP_RIGHT_ID);
				}
				
			}else {
				button = $("<button type='button'>"+text+"</button>").appendTo('#'+that.TOP_RIGHT_ID);
			}
			
			if(value.action == 'APP_FUNC_GOTO_HOME') 
			{
				$(button).attr('onclick',"window.history.go("+ (-window.history.length)+");window.location.replace('../../main/html/main.html')");
			} else if(value.action == 'APP_FUNC_GOTO_BACK') 
			{
				$(button).attr('onclick',"window.history.back();");
			} else 
			{
				$(button).attr('onclick',value.action+'()');
			}
		
		});
	}
	
};
bizMOB.Emulator.prototype.generateToolbar = function(toolbar, toolbarElement) {
	
	var that = this;
	var id = toolbarElement.attr("id");
	if(toolbar == undefined || (! toolbar.visible)) {
		toolbarElement.hide();
		if(id === +that.BOTTOM_TOOLBAR_ID)
		{
			var height = $('#'+ that.CONTENTS_ID).height();
			$('#'+ that.CONTENTS_ID).css("height",+(height+BOTTOM_TOOLBAR_HEIGHT) + "px");
		}
		return;
	}
	toolbarElement.show();
	if(toolbar.image_name != undefined && toolbar.image_name != '') {
		if(toolbar.image_name.match(/https?/gi) ){
			toolbarElement.css("background","url('"+toolbar.image_name+"') repeat 0 0");
		}else{
			toolbarElement.css("background","url('"+CONTENTS_PATH+toolbar.image_name+"') repeat 0 0");
		}
		
	}
	toolbarElement.children().remove();
	
	var b = toolbar.buttons.length;
	// buttons
	$.each(toolbar.buttons, function(index, value) {
		
		var buttonWidth = id === that.BOTTOM_TOOLBAR_ID ? toolbarElement.width()/b : LEFT_RIGHT_TOOLBAR_WIDTH; 
		var buttonHeight = id === that.BOTTOM_TOOLBAR_ID ? BOTTOM_TOOLBAR_HEIGHT : toolbarElement.height()/b; 
		var div = $("<div></div>")
		.css("width", buttonWidth + "px")
		.css("height",buttonHeight + "px")
		.css("text-align","left")
		.css("float","left")
		.appendTo(toolbarElement);
		
		var button;
		if(value.image_name != '') {
			if(value.image_name.match(/https?/gi) ){
				button = $("<button type='button'><img src='"+value.image_name+"' /></button>")
				.appendTo(div);
			}else{
				button = $("<button type='button'><img src='"+CONTENTS_PATH+value.image_name+"' /></button>")
				.appendTo(div);
			}
			
		} else {
			button = $("<button type='button'>"+value.button_text+"</button>").appendTo(div);
		}
		
		if(value.action == 'APP_FUNC_GOTO_HOME') {
			//$(button).attr('onclick',"alert('메인(홈)으로 이동..')"); 
			$(button).attr('onclick',"window.history.go("+ (-window.history.length)+");window.location.replace('../../main/html/main.html')");
			//window.history.length = 0;
			return;
		} 
		else if(value.action == 'APP_FUNC_GOTO_BACK') {
			$(button).attr('onclick',"window.history.back();");
			return;
		} 
		if(value.action == 'APP_FUNC_LOG_OUT') {
			$(button).attr('onclick',"alert('로그아웃 ..')");
			$(button).attr('onclick',"window.history.go("+ (-window.history.length)+");window.location.replace('../../login/html/login2.html')");
			return;
		}
		if(value.action_type == 'popup') {
			var $box = $("<div class='" + "contextMenu" + "'></div>")
				.appendTo(toolbarElement);
			$(button).click(function() {
				var $box = $('.contextMenu', toolbarElement);
				if($box.css("display") != 'none') {
					$box.css("display","none");
					//$box.animate({height:0});
				} else {
					$box.css("display","block");
					//$box.animate({height:emulator.menuHeight});
				}
			});
			emulator.generateContextMenu(value.context, toolbarElement, $box);
		} else if(value.action_type!=''){ 
			$(button).attr('onclick',value.action+'()');
		}
	});
	
};

bizMOB.Emulator.prototype.generateContextMenu = function(menu, toolbarElement, $box) {
	var rowHeight, rowWidth, left, top, rowFloat, buttonWidth, buttonHeight;
	
	switch(toolbarElement.attr("id"))
	{
		case this.BOTTOM_TOOLBAR_ID :
			rowHeight = 100;
			left = 0;
			emulator.menuHeight = rowHeight * menu.length;
			top =  PHONE_HEIGHT - BOTTOM_TOOLBAR_HEIGHT - emulator.menuHeight+5;
			rowFloat = "none";
			break; 
		case this.LEFT_TOOLBAR_ID :
			rowWidth = 100;
			top =  (PHONE_HEIGHT/2) - toolbarElement.height();
			rowFloat = "left";
			emulator.menuHeight = toolbarElement.height();
			left = toolbarElement.width();
			break;
		case this.RIGHT_TOOLBAR_ID :
			rowWidth = 100;
			top =  (PHONE_HEIGHT/2) - toolbarElement.height();
			rowFloat = "right";
			emulator.menuHeight = toolbarElement.height();
			left = -(rowWidth*menu.length);
			break; 
	}
	
	$box.empty();
	
	$box.css('position',"absolute")
	.css('left',left)
	.css('top',top)
	.css('display','none')
	.css("text-align","left");
	if(rowWidth) $box.css("width",  (rowWidth*menu.length) + "px");
	else $box.css("width",  "100%");
	if(rowHeight) $box.css("height",emulator.menuHeight+"px");
	else $box.css("height","100%");
	
	
	$.each(menu, function(index, buttons) {
		// row button area 를 생성
		var br = $("<div></div")
					.attr('id',"br"+index)
					.css("overflow","hidden")
					.css('padding-top','5px')
					.css('background-color',"#f0f0f0")
					.css("float", rowFloat);
					if(rowWidth) br.css("width",  rowWidth + "px");
					else br.css("width",  "100%");
					if(rowHeight) br.css("height",rowHeight +"px");
					else br.css("height","100%");
					
					br.appendTo($box);
		
			// row의 button 생성
			var button_width = Math.round(PHONE_WIDTH/buttons.length);		
			$.each(buttons, function(i,value) {
				var length = value.length;
				var ba = $("<div></div>")
				.css("text-align","center")
				.css("float","left")
				.css("width",button_width)
				.appendTo(br);
				
				var button;
				
				if(value.image_name.match(/https?/gi) ){
					button = $("<button type='button' ><img src='"+value.image_name+"' /></button>");
				}else{
					button = $("<button type='button' ><img src='"+CONTENTS_PATH+value.image_name+"'  /></button>");
				}
				
				button.appendTo(ba);
				
				$('<p></p>').text(value.button_text).appendTo(ba);
				if(value.action != undefined && value.action != '')
					$(button).attr('onclick',value.action+'()');
			});
	});
	
};

bizMOB.Emulator.prototype.exit = function(param) {
	
	var result={};
	var backurl = "";
	$.ajax({
        url: "../../app/config/app.config", 
        dataType: "json",
		async : false,
        success: function(data) {
        	backurl = "../../"+data.URL.LOGIN;
        },
        error: function(e) { 
        	backurl = "../../login/html/login3.html"; 
        }
    });
	//TO DO
	//스토리지(bizMOB.Storage) 초기화
	if(window.name.indexOf("popup") > -1 || window.name.indexOf("modal") > -1) {
		opener.document.location.replace(backurl);
		//opener.bizMOB.Native.exit();
		self.close();
	}
	else document.location.replace(backurl);
};

bizMOB.Emulator.prototype.replaceWeb = function(param) {
	var url = "";
	if(param.target_page.match(/https?/gi)){
		url = param.target_page;
	}else{
		url = "../../" + param.target_page;
	}
	
	url += "?message="+encodeURIComponent(JSON.stringify(param.message));
	document.location.replace(url);
};

bizMOB.Emulator.prototype.openWeb = function(param) {
	
	
	var url = "";
	if(param.target_page.match(/https?/gi)){
		url = param.target_page;
	}else{
		url = "../../" + param.target_page;
	}
	
	
	url += "?message="+encodeURIComponent(JSON.stringify(param.message));
	document.location.href=url;
};

bizMOB.Emulator.prototype.post = function(param) {
	
	var url = "http://" + location.host + SERVER_URL+param.trcode+".json";
	var m = JSON.stringify(param.message);
	console.log(url +"?jsonpcallback={'message':" + m + "}");
	m = encodeURIComponent(m);
	console.log("request to bizMOB Server");
//	if(m.length < 4000) {
//		$.getJSON(url+"?jsonpcallback=?",{'message':m},function(json){
//			console.log("response from bizMOB Server");
//			//120420 -  에러인 경우 메세지 출력하고 콜백은 보내지 않았던 기존로직 제거. 
//			/*
//			if(!json.header.result) {
//				alert(json.header.error_text);
//			} else {
//				var funcCall = param.callback + "("+ JSON.stringify(json) +")";
//				eval("(" + funcCall + ")");
//			}
//			*/
//			var funcCall = param.callback + "("+ JSON.stringify(json) +")";
//			eval("(" + funcCall + ")");
//		}).error(function(e){console.log("bizMOB post Error : "+xhr.status + ", " + xhr.statusText);});
//	} else {
		$.ajax({
			url:url,
			type:'POST',
			dataType:'json',
			data:{'message':m},
			success:function(json) {
				console.log("response from bizMOB Server");
				//120420 -  에러인 경우 메세지 출력하고 콜백은 보내지 않았던 기존로직 제거.
				/*
				if(!json.header.result) {
					alert(json.header.error_text);
				} else {
					var funcCall = param.callback + "("+ JSON.stringify(json) +")";
					eval("(" + funcCall + ")");
				}
				*/
				var funcCall = param.callback + "("+ JSON.stringify(json) +")";
				eval("(" + funcCall + ")");
			},
			error:function(xhr, textStatus, errorThrown) {
				console.log("bizMOB post Error : "+xhr.status + ", " + xhr.statusText);
			}
		});
	//}
	
	
};

bizMOB.Emulator.prototype.popup = function(param) {
	
	var width = 0;
	var height = 0;
	
	var url = "../../"+param.target_page + "?message="+JSON.stringify(param.message);
	if(param.height){
		width = param.width;
		height = param.height;
	}else{
		width = parseInt(PHONE_WIDTH*(param.width_percent/100));
		height = parseInt(PHONE_HEIGHT*(param.height_percent/100));
	}
	url += "&pop_width="+width + "&pop_height="+height;
	
	var windowFeatures = "width="+width + ",height="+height+",dependent=yes";
	
	POP_IDX++;
	window.open(url,"popup"+POP_IDX, windowFeatures);

};

bizMOB.Emulator.prototype.getDeviceInfo = function(param) {
	eval(param.callback + "(" +  JSON.stringify(EMUL_DEVICE_INFO) + ")");
};

bizMOB.Emulator.prototype.closePopup = function(param) {
	
	if(param.callback != undefined && param.callback != '') {
		var funcCall = param.callback + "(" + JSON.stringify(param.message) + ")";
		eval("window.opener."+funcCall);
	}
	window.close();

};

bizMOB.Emulator.prototype.openModal = function(param) {
	
	var width = PHONE_WIDTH+20;
	var height = PHONE_HEIGHT+20;
	var windowFeatures = "width="+width + ",height="+height+",dependent=yes";
	var url = "";
	
	if(param.target_page.match(/https?/gi)){
		url = param.target_page + "?message="+JSON.stringify(param.message);
	}else{
		url = "../../"+param.target_page + "?message="+JSON.stringify(param.message);
	}
	
	window.open(url, "modal",windowFeatures);
};

bizMOB.Emulator.prototype.closeModal = function(param) {
	
	var funcCall = param.callback + "(" + JSON.stringify(param.message) + ")";
	eval("opener."+funcCall);
	window.close();
};

bizMOB.Emulator.prototype.loadStorage = function() {

	for(var key in localStorage) {
		var value = localStorage[key];
		bizMOB.MStorage[key] = value;
	}
};

bizMOB.Emulator.prototype.saveStorage = function(param) {
	
	var data = param.data;
	$.each(data, function(index, d) {
		localStorage.setItem(d.key,d.value);
	});

	for(var key in localStorage) {
		var value = localStorage[key];
		bizMOB.MStorage[key] = value;
	}
	
};

bizMOB.Emulator.prototype.loadPropertis = function() {

	for(var key in localStorage) {
		var value = localStorage[key];
		bizMOB.FStorage[key] = value;
	}
};

bizMOB.Emulator.prototype.saveProperty = function(param) {
	
	var data = param.data;
	$.each(data, function(index, d) {
		localStorage.setItem(d.key,d.value);
	});

	for(var key in localStorage) {
		var value = localStorage[key];
		bizMOB.FStorage[key] = value;
	}
	
};

bizMOB.Emulator.prototype.alert = function(param) {
	alert(param.message);
};

bizMOB.Emulator.prototype.confirm = function(param) {
	
	var func ="";
	var r = confirm(param.message);
	if(r == true) {
		func = param.buttons[0].callback;
	} else {
		if(param.buttons[1]) func = param.buttons[1].callback;
	}
	
	func += "()";
	if(func != "()") eval(func);
	
};


$(document).ready(function() 
{
	if(window.name.indexOf("popup") < 0 && window.parent==window) {

		emulator.generateSpace();
	}
	
	//var param = location.search;
	var param = location.href.split("?message=");
	var popup_width = 0;
	var popup_height = 0;
	
	var percenlist;
	
	if(param.length>1) 
	{
		percenlist = param[1].split("&pop_width"); 
		
		if( percenlist.length>1 && percenlist[1].indexOf("pop_width") > -1 ){
			
			popup_width = percenlist[1].split("=")[1];
			popup_height = percenlist[2].split("=")[1];
			
			$("body").css("width",popup_width);
			$("body").css("min-height","");
			$("body").css("height",popup_height);
			
			
			$("#"+emulator.CONTENTS_ID).css("width",popup_width);
			$("#"+emulator.CONTENTS_ID).css("height",popup_height);
			
			
			$("#"+emulator.STATE_BAR_ID).css("width",popup_width);
			
			$("#"+emulator.BOTTOM_TOOLBAR_ID).hide();
			$("#"+emulator.STATE_BAR_ID).hide();
			$("#"+emulator.HEADER_ID).hide();
			$("#"+emulator.LEFT_TOOLBAR_ID).hide();
			$("#"+emulator.RIGHT_TOOLBAR_ID).hide();
			
			$("#"+emulator.CONTENTS_ID).css("width",popup_width);
			$("#"+emulator.CONTENTS_ID).css("height",popup_height);
			
			param[1] = percenlist[0];
		}	
	}
	
	
	if(param.length>1)
	{
		param = param[1]; 
		param = param.split("&pop_width")[0];
		param = jQuery.parseJSON(decodeURIComponent(param));
	}
	else param = {};
	if(window==window.parent) appcallOnLoad(param);	
	

	
});

emulator = new bizMOB.Emulator();
emulator.loadStorage();
emulator.loadPropertis();