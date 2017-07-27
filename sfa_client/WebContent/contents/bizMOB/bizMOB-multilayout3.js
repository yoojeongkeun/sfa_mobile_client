/**
 * @author vertex210@mcnc.co.kr 김영호
 */
(function()
{
	var bizMOBMultiLayout = new (function()
	{
		this.frameName = "";
		this.parent = "";
		this.broadcastMsgList = new Array();
		
		this.isPhone;
		this.callbacks = []; //최종 displayView 를 실행된 후 불러질 callback 목록 
		this.commandStack = []; //최종 displayView 를 실행된 후 실행된 command 목록 
		this.replaceStrings = {};
		
		this.layout = {};
	})();
	bizMOBMultiLayout.open = function(key, options)
	{
		var layouts = bizMOBMultiLayout._readLayoutFile();
		var layout = bizMOBMultiLayout.getLayout(layouts, key);
		if(!layout) bizMOBCore.Module.logger("MultiLayout", "open", "E", "can't find multilayout info. key : " + key);
		var inherits = layout.inherit;
		if(inherits)
		{
			if(inherits.constructor === String) inherits = [inherits];
			if(inherits.constructor !== Array) bizMOBCore.Module.logger("MultiLayout", "open", "E", "type error. inherit type : " + inherits.constructor + "\nkey : " + key);
			var inheritLayout={};
			inherits.forEach(function(value)
			{
				var inherit = layouts[value];
				if(!inherit) bizMOBCore.Module.logger("MultiLayout", "open", "E", "type error. can't find inherit. inherit : " + inherit + "\nkey : " + key);
				$.extend(inheritLayout, inherit);
			});
			layout = $.extend(false, inheritLayout, layout);
		}
		
		layout = this._replaceSpecChars(layout, /{=(.+)}/g, bizMOBMultiLayout.replaceStrings);		
		
		var html = layout.url; 
		var callType = layout.callType;
		
		switch(callType)
		{
			case "openPage" :
				$.extend(layout, { opener : bizMOBMultiLayout.frameName });
				
				var frameCount = 0;
				for(key in layout.frames) frameCount++;
				$.extend(layout, { frameCount : frameCount });
				var message = $.extend(options._oMessage, layout.message, 
				{
					bizMOBLayout : layout
				});
				var param = $.extend(options, { _oMessage : message, _sPagePath : html });
				delete options.multiLayout;
				bizMOBCore.Window.open(param);
				break;
			case "notifyFrame" :
				var target = layout.target;
				var frame = parent.document[target].document;
				if(!target || !frame) bizMOBCore.Module.logger("MultiLayout", "open", "E", "reference error. target : " + target + "\nkey : " + key);
				var evt = frame.createEvent("Event");
				evt.initEvent("bizMOBMultiLayout.onNotifyFrame", false, true);
				evt.data = options._oMessage;
				frame.dispatchEvent(evt);

				break;
			case "openFrame" :
				bizMOBMultiLayout.openFrame(
					$.extend(options._oMessage, 
					{
						bizMOBLayout : layout
					})
				);
				break;
			default:
				bizMOBCore.Module.logger("MultiLayout", "open", "E", "unknown callType. callType : " + callType + "\nkey : " + key);
		}
	};
	
	bizMOBMultiLayout.addReplaceString = function(key, string)
	{
		this.replaceStrings[key] = string;
	};
	bizMOBMultiLayout.broadcast = function(data)
	{
		var curDocument = this.isFrame() ? window.parent.document : document; 
		var frames = $("iframe", curDocument);
		var isLoadMultiLayout=true;
		$("iframe", curDocument).each(function()
		{
			if(!$(this).attr("isLoadMultiLayout")) isLoadMultiLayout = false;
		});
		if(isLoadMultiLayout)
		{
			frames.each(function()
			{
				var frame = $(this)[0].contentDocument;
				if(frame!=document)
				{
					var evt = frame.createEvent("Event");
					evt.initEvent("bizMOBMultiLayout.onBroadcast", false, true);
					evt.data = data;
					try{ frame.dispatchEvent(evt); } 
					catch(e) { bizMOB._warring("MultiLayout - " + e);}
				}
			});
		}
		else parent.bizMOB.MultiLayout._reservBroadcast(data);
	};
	bizMOBMultiLayout._readLayoutFile = function()
	{
		var dataUrl;
		var data = {};
		var CURRENT_PATH = location.pathname;
		var MULTI_ROOT_PATH = CURRENT_PATH.substring(0,CURRENT_PATH.indexOf("/contents"))+"/contents/bizMOB/config/";
		// IS_PHONE = true;
		if(bizMOBMultiLayout.isPhone) dataUrl = MULTI_ROOT_PATH+"layout_phone.config";
		else dataUrl = MULTI_ROOT_PATH+"layout_tablet.config";
		$.ajax({
            type : "get",
			url: dataUrl, 
            dataType: "json",
			async : false,
            success: function(json) 
			{
				data = json;
			},
            error: function(e) 
            {
            	bizMOBCore.Module.logger("MultiLayout", "_readLayoutFile", "E", "load layout failed.(" + dataUrl + ") // [" + e.status + "]" + e.statusText);
            }
        });
		return data;
	};
	
	bizMOBMultiLayout.getLayout = function(data, key)
	{
		var layout;
		//키가 존재할 경우
		if(data[key]) layout=data[key];
		else
		{
			layout = this._getLayoutByPattern(data, key);
		}
		return layout;
	};
	bizMOBMultiLayout._getLayoutByPattern = function(data, key)
	{
		var layout=undefined;
		for(var dataKey in data)
		{
			var specChars = {};
			var specCharIndexs = [];
			 
			strRegExp = dataKey.replace(/{(\d+)}/g, function($1, $2)
			{ 
			  specCharIndexs.push($2);
			  return "(.+)";
			});
			//패턴형식 인경우
			if(specCharIndexs.length>0)
			{
				layout = data[dataKey]; 
				var regExp = eval("/" + strRegExp + "/");
				
				//key가 패턴에 만족하는지 검사
				var result = regExp.exec(key);
				if(result)
				{
					result = result.slice(1);
					result.forEach(function(value, i)
					{
						specChars[specCharIndexs[i]] = value;
					});
					
					layout = this._replaceSpecChars(layout, /{(\d+)}/g, specChars);
					break;
				}
				else layout = undefined;
			}
		}
		return layout;
	};
	bizMOBMultiLayout._replaceSpecChars = function(layout, regExp, specChars)
	{
		function replaceUrl(url)
		{
			var lastReplaceChar, lastReplaceSpecChar;
			var result =  url.replace(regExp, function($1, $2)
			{
				lastReplaceChar = $1;
				lastReplaceSpecChar = specChars[$2];
				return lastReplaceSpecChar;  
			});
			//문자열 전체를 다른 타입의 객체로 바꿀때(이 처리를 하지 않으면 문자열로만 변환됨)
			if(url === lastReplaceChar) return lastReplaceSpecChar;
			return result;
		}
		
		//_replaceSpecChars 내부 함수. 대상을 특정문자열(specChars)로 치환함.
		function replaceSpecChars(param)
		{
			var result;
			if(param!==undefined)
			{
				switch(param.constructor)
				{
					case Object :
						result = {};
						for(key in param)
						{
							result[key] = replaceSpecChars(param[key]);
						}
						break;
					case Array :
						result = [];
						for(var i=0;i<param.length;i++)
						{
							result[i] = replaceSpecChars(param[i]);
						}
						break;
					case String :
						result = replaceUrl(param);
						break;
					default :
						result = param;
						break;
				}
			}
			return result;
		};
		
		return replaceSpecChars(layout);
	};
	
	bizMOBMultiLayout._reservBroadcast = function(data)
	{
		this.broadcastMsgList.push(data);
	};
	bizMOBMultiLayout._broadcastReservs = function(data)
	{
		var that = this;
		this.broadcastMsgList.forEach(function(value)
		{
			that.broadcast(value);
		});
		this.broadcastMsgList = new Array();
	};
	
	bizMOBMultiLayout.isFrame = function()
	{
		return window!=window.parent && $("iframe[multiLayout]", parent.document).size()>0; 
	};
	bizMOBMultiLayout.initFrame = function(frame)
	{
		var parent = window.parent;
		Object.prototype.constructor = parent.Object;
		Object = parent.Object;
		Array.prototype.constructor = parent.Array;
		Array = parent.Array;
		String.prototype.constructor = parent.String;
		String = parent.String;
		Number.prototype.constructor = parent.Number;
		Number = parent.Number;
		Boolean.prototype.constructor = parent.Boolean;
		Boolean = parent.Boolean;
		
		this.frameName = frame.name;
		if(frame.opener) this.opener = frame.opener;
		this.interruptClose = frame.interruptClose; 
		
		
		
		
		var frameName = this.frameName;
		var parentWindow = window.parent;
		var parentOnFireMessageFunc = parent.bizMOBCore.Module.gateway; 
		bizMOBCore.Module.gateway = function(message, service, action) 
		{
			if(message.id==="POPUP_MESSAGE_BOX")
			{
				for(var key in message.param.buttons)
				{
					var button = message.param.buttons[key];
					if(button.callback) 
					{
						(function()
						{
							var buttonCallback = button.callback;
							button.callback = window.parent.bizMOBCore.CallbackManager.save(function(data)
							{
								window.bizMOBCore.CallbackManager.responser({ callback : buttonCallback }, { message : data });
							}, "listener");
						})();
						
					}
				}
			} 
			else
			{
				var callback = message.param.callback;
				if(message.param)
				{
					switch(message.id)
					{
						case "SHOW_WEB" :
						case "GOTO_WEB" :
						case "POP_VIEW" :
						case "SHOW_MESSAGE" :
						case "DISMISS_POPUP_VIEW" :
						case "QR_AND_BAR_CODE" :
						case "CREATE_MENU_VIEW" :
						case "CLOSE_MENU_VIEW" :
						case "SMS" :
							break;
						default :
							message.param.message = $.extend(message.param.message, 
							{
								bizMOBLayout : 
								{
									opener : frameName
								}
							});
				
							if(callback)	{
								message.param.callback = window.parent.bizMOBCore.CallbackManager.save(function(data)
								{
									window.bizMOBCore.CallbackManager.responser({ callback : callback }, { message : data });
								});
							}
							break; 
					}
					
				}
			}
			console.log("TEST :: MultiLayout Frame -- gateway333");
			if(parent.bizMOB.MultiLayout.isRunCallback) parent.bizMOBMultiLayout.commandStack.push(message);
			else parentOnFireMessageFunc.apply(parentWindow.bizMOBCore.Module, [message, service, action]);
		};
		
		bizMOB.Window.draw = function(_aElement)
		{
			var layout = {};
			for(var i=0; i < arguments[0]._aElement.length ; i++ ) {
				switch( arguments[0]._aElement[i].constructor )
				{
					case bizMOBCore.Window.TitleBar :
						layout.titlebar = arguments[0]._aElement[i];
						break;
					case bizMOBCore.Window.ToolBar :
						layout.bottom_toolbar = arguments[0]._aElement[i];
						break;
					case bizMOBCore.Window.SideBar :
						if(arguments[0]._aElement[i].position == "left"){
							layout.left_toolbar = arguments[0]._aElement[i];
						}else if(arguments[0]._aElement[i].position == "right"){
							layout.right_toolbar = arguments[0]._aElement[i];
						}
						break;
				}
			}
			bizMOBMultiLayout.layout = $.extend(false, bizMOBMultiLayout.layout, layout);
			if(_aElement._fCallback)
			{
				window.parent.bizMOB.MultiLayout._addCallback(_aElement._fCallback);
			}
			$("iframe[name=" + bizMOBMultiLayout.frameName + "]", window.parent.document).attr("isCallDisplayView", true);
			var isCallDisplayView=true;
			$("iframe", window.parent.document).each(function()
			{
				if(!$(this).attr("isCallDisplayView")) isCallDisplayView = false;
			});
			if(isCallDisplayView)
			{
				window.parent.bizMOB.MultiLayout._displayView();
				
				// TODO :  
				/*
				$("iframe", window.parent.document).each(function()
				{
					if(this.contentWindow.bizMOBCore.EventManager.storage.backbutton.length>0)
					{
						
					}
//					this.bizMOBCore.EventManager.storage
				});
				//bizMOB.addEvent("backbutton", "bizMOB.MultiLayout.onAndroidBackButton");
				*/
				
				
			}
		};
		bizMOB.Storage.set = function() {
			parent.bizMOB.Storage.set.apply(this, arguments);
		};
		bizMOB.Storage.setList = function() {
			parent.bizMOB.Storage.setList.apply(this, arguments);
		};
		bizMOB.Storage.get = function() {
			return parent.bizMOB.Storage.get.apply(this, arguments);
		};
		bizMOB.Properties.set = function() {
			parent.bizMOB.Properties.set.apply(this, arguments);
		};
		bizMOB.Properties.setList = function() {
			parent.bizMOB.Properties.setList.apply(this, arguments);
		};
		bizMOB.Properties.get = function() {
			return parent.bizMOB.Properties.get.apply(this, arguments);
		};
		bizMOB.Properties.remove = function() {
			return parent.bizMOB.Properties.remove.apply(this, arguments);
		};
		
		bizMOB.Device.Info = parent.bizMOB.Device.Info; 
		
		var that = this;

		$(window.parent).bind('onorientationchange' in window.parent ? 'orientationchange' : 'resize', function(){ setTimeout(that.resetFrameHeight, 500); });
		that.resetFrameHeight();
	};
	bizMOBMultiLayout.resetFrameHeight = function()
	{
		$(document.body).css("height", $(window.parent).height());
	};
	bizMOBMultiLayout.openPage = function(json)
	{
		var opener = json.bizMOBLayout.opener;
		var views = json.bizMOBLayout.frames;
		bizMOBMultiLayout.opener = opener;
		var message = {};
		for(key in json) 
		{
			if(key!="bizMOBLayout") message[key] = json[key];
		}
		for(name in views)
		{
			var url = views[name].url;
			var frame = document[name];
			if(!frame) bizMOBCore.Module.logger("MultiLayout", "openPage", "E", "can't find frame. frame name: " + name);
			var param = views[name].message ? $.extend(views[name].message,message) : message;
			
			param.bizMOBFrame = { name : name, opener : opener, interruptClose : views[name].interruptClose};
			$("iframe[name=" + name +"]").attr("src","../../" + url +"?message=" + JSON.stringify(param));
		}
	};
	bizMOBMultiLayout.openFrame = function(json)
	{
		var opener = json.bizMOBLayout.opener;
		var views = json.bizMOBLayout.frames;
		if(!views) bizMOBCore.Module.logger("MultiLayout", "openFrame", "E", "reference error. frame : " + views);
		var message = {};
		for(key in json) 
		{
			if(key!="bizMOBLayout") message[key] = json[key];
		}
		
		for(name in views)
		{
			var url = views[name].url;
			var frame = parent.document[name];
			if(!frame) bizMOBCore.Module.logger("MultiLayout", "openFrame", "E", "can't find frame. frame name: " + name);
			var param = views[name].message ? $.extend(views[name].message,message) : message;
			param.bizMOBFrame = { name : name, opener : opener, interruptClose : views[name].interruptClose};
			var page = "../../" + url +"?message=" + encodeURIComponent(JSON.stringify(param));
			frame.location.replace(page);
		}
	}; 
	var parentDisplayViewFunc = bizMOB.Window.draw;
	bizMOBMultiLayout.displayView = function()
	{
		//bizMOBMultiLayout.displayView 내부함수
		function rebuildBarInfo(bar, strTarget, barClass)
		{
			var result, barObject;
			if(bar)
			{
				result = {};
				if(bar.background) 
				{
					bar.image_name = bar.background;
					delete bar.background;
				}
				
				for(key in bar)
				{
					//치환
					//재귀를 위한 내부함수
					function replaceBarSpecChars(data ,key)
					{
						var replaceResult = undefined;
						switch(data.constructor)
						{
							case Array :
								replaceResult = [];
								data.forEach(function(value)
								{
									var result = replaceBarSpecChars(value, key);
									if(result) replaceResult.push(result);
								});
								break;
							case String :
								var lastReplaceString=undefined, lastReplaceSpecObj=undefined;
								
								var frameName, frame, index, targetLayout; 
								var replaceResult = data.replace(/\{(.*)\}/g, function($1, $2)
								{
									lastReplaceString = $1;
									var split = $2.split(".");
									if(split.length===2) index = split[1];
									frameName = split[0];
									//frame = window.parent.document[frameName]; 
									frame = document[frameName]; 
									if(frame) targetLayout = frame.bizMOB.MultiLayout._getLayoutInfo(strTarget); 
									if(targetLayout && targetLayout[key])
									{
										if(index!=undefined)
										{
											lastReplaceSpecObj = targetLayout[key][index]; 
											return lastReplaceSpecObj;
										}
										else 
										{
											lastReplaceSpecObj = targetLayout[key]; 
											return lastReplaceSpecObj;
										}
									}
									else return;
								});
								
								if(data === lastReplaceString) replaceResult = lastReplaceSpecObj;
								if(replaceResult!=undefined)
								{
									if(replaceResult.action)
									{
										var btn = JSON.parse(JSON.stringify(replaceResult));
										var currentAction = btn.action;
										btn.action = bizMOBCore.CallbackManager.save(function(data)
										{
											document[frameName].bizMOBCore.CallbackManager.responser({ callback : currentAction }, { message : data });
										}, "listener");
										
										return btn;
									}
								}
								return replaceResult;
								
								break;
							default : 
								replaceResult = data;	
						}
						return replaceResult;
					}
					result[key] = replaceBarSpecChars(bar[key], key); 
				}
				barObject = $.extend(new barClass({_sTitle : ""}), result);
				
				return barObject;
			}
		}
		var titlebar = rebuildBarInfo(bizMOBMultiLayout.titlebar, "titlebar", bizMOBCore.Window.TitleBar);
		var bottomToolbar = rebuildBarInfo(bizMOBMultiLayout.bottom_toolbar, "bottom_toolbar", bizMOBCore.Window.ToolBar);
		var leftToolbar = rebuildBarInfo(bizMOBMultiLayout.left_toolbar, "bottom_toolbar", bizMOBCore.Window.SideBar);
		var rightToolbar = rebuildBarInfo(bizMOBMultiLayout.right_toolbar, "bottom_toolbar", bizMOBCore.Window.SideBar);
		
		var elements = [titlebar, bottomToolbar, leftToolbar, rightToolbar].filter(function(value) { return value || false; });
		parentDisplayViewFunc(
		{
			_aElement : elements,
			_fCallback : function()
			{
				bizMOB.MultiLayout.isRunCallback = true;
				bizMOBMultiLayout.callbacks.forEach(function(value)
				{
					eval(value)();
				});
				bizMOBMultiLayout.callbacks = [];
				bizMOB.MultiLayout.isRunCallback = false;
				
				//커맨드처리를 위한 재귀함수
				function runCommand()
				{
					var cmd = undefined;
					
					if(bizMOBMultiLayout.commandStack.length>0)
					{
						//쌓아둔 커맨드목록 중 첫번째 항목 선택
						cmd = bizMOBMultiLayout.commandStack[0];
						bizMOBMultiLayout.commandStack = bizMOBMultiLayout.commandStack.splice(1);
						if(cmd.param && cmd.param.callback) // 콜백이 있는경우
						{
							var oriCallback = cmd.param.callback;
							var filterCallback = function(message)
							{
								bizMOB.MultiLayout.isRunCallback = true;
								bizMOBCore.CallbackManager.responser({ callback : oriCallback}, { message : message });
								bizMOB.MultiLayout.isRunCallback = false;
								runCommand();
							};
							cmd.param.callback = bizMOBCore.CallbackManager.save(filterCallback);
							bizMOBCore.Module.gateway(cmd);
						}
						else bizMOBCore.Module.gateway(cmd);
					}
				};
				runCommand();
			}
		});
	};
	window.page = 
	{
		init : function(json)
		{
			
		}
	};
	
	bizMOBMultiLayout.init = function(json)
	{
		var layout = json ? json.bizMOBLayout : undefined;
		bizMOBMultiLayout.isPhone = bizMOB.Device.Info.device_type === "Phone";
		if(layout)
		{
			if(layout.opener) bizMOBMultiLayout.opener = layout.opener;
			$.extend(bizMOBMultiLayout, layout);
			if(layout.callType)	bizMOBMultiLayout[layout.callType].call(bizMOBMultiLayout, json);
			delete json.bizMOBLayout;
		}
	};
	
	bizMOBMultiLayout.initAPI = function()
	{
		bizMOB.MultiLayout = function(){};
		
		bizMOB.MultiLayout.init = function(json)
		{
			bizMOBMultiLayout.init(json.data);
		};
		bizMOB.MultiLayout._getLayoutInfo = function(name)
		{
			return bizMOBMultiLayout.layout[name];
		};
		
		bizMOB.MultiLayout._broadcastReservs = function()
		{
			bizMOBMultiLayout._broadcastReservs();
		};
		
		bizMOB.MultiLayout._addCallback = function(callback)
		{
			bizMOBMultiLayout.callbacks.push(callback);
		};
		
		bizMOB.MultiLayout._displayView = function()
		{
			bizMOBMultiLayout.displayView();
		};
		
		bizMOB.MultiLayout._reservBroadcast = function(data)
		{
			bizMOBMultiLayout._reservBroadcast(data);
		};
		
		
		bizMOB.MultiLayout.broadcast =function(data)
		{
			if(bizMOBMultiLayout.isFrame())
			{
				bizMOBMultiLayout.broadcast(data);
			}
		};
		
		bizMOB.MultiLayout._dispatchEvent = function(event)
		{
			$("iframe[multiLayout]").each(function()
			{
				var eventName = event.type.split("bizMOB.")[1];
				this.contentWindow.bizMOBCore.EventManager.responser(
				{
					eventname : eventName
				},
				{
					message : event.data
				});
			});
		};
		
		var parentOpenPopupFunc = bizMOB.Window.open;
		bizMOB.MultiLayout.open = function(_sLayoutKey)
		{
			if(arguments[0] === undefined){ arguments[0] = {_sType : "normal"}; }
			
			var param = arguments[0];
			if(param._sType == "popup")
			{ 
				var required = new Array("_sPagePath");
				if(!bizMOBCore.Module.checkparam(arguments[0], required)) { return; }
				
				if((param._sHeight && param._sHeight.indexOf("%") > 0) &&
						(param._sWidth && param._sWidth.indexOf("%") > 0) ){
					
					param = $.extend(true, {
						_sBaseOrientation : "auto",
						_sBaseSize : "device"
					}, param);
					
					var widthPercent = parseInt(param._sWidth.replace(/\%/,""));
					var heightPercent = parseInt(param._sHeight.replace(/\%/,""));
					
					if(param._sBaseSize == "page" && this.isFrame()){
						var frameName = bizMOBMultiLayout.frameName;
						var frameWidth = parent.document[frameName].innerWidth;
						var frameHeight = parent.document[frameName].innerHeight;
						frameWidth = frameWidth*(widthPercent/100);
						frameHeight = frameHeight*(heightPercent/100);
						
						param._sWidth = Math.ceil(frameWidth);
						param._sHeight = Math.ceil(frameHeight);
					}
				}
				
				if(bizMOBMultiLayout.frameName)
				{
					param._oMessage = $.extend(param._oMessage, 
					{
						bizMOBLayout : 
						{
							opener : bizMOBMultiLayout.frameName
						}
					});
				}
				parentOpenPopupFunc(param);
			}
			else 
			{ 
				var required = new Array("_sLayoutKey");
				if(!bizMOBCore.Module.checkparam(arguments[0], required)) { return; }
				bizMOBMultiLayout.open(param._sLayoutKey, param); 
			}
		};
		
		var parentCloseFunc = bizMOB.Window.close; 
		var parentClosePopupFunc = bizMOB.Window.close; 
		bizMOB.MultiLayout.close = function() {
			
			if(arguments[0] == undefined){ arguments[0] = {_sType : "normal"}; }
			if(!bizMOBCore.Module.checkparam(arguments[0])) {	return; }
			
			var param = arguments[0];
			if(param._sType == "popup")
			{
				var opener = bizMOBMultiLayout.opener; 
				if(opener && param && param._sCallback) param._sCallback = "document." + opener + "." + param._sCallback;
				parentClosePopupFunc(param);
			}
			else
			{
				if(bizMOBMultiLayout.interruptClose && bizMOBMultiLayout.interruptClose.targetCallback===param._sCallback)
				{
					var frameName = bizMOBMultiLayout.interruptClose.throwFrame;
					var frame = window.parent.document[frameName];
					if(frame)
					{
						var callbackFunc = frame[param._sCallback];
						if(callbackFunc) callbackFunc(param._oMessage);
					}
					else bizMOBCore.Module.logger("MultiLayout", "close", "E", "bizMOB.MultiLayout.close : can't find interrupt frame. frameName : " + frameName);
				}
				else
				{
					if( param && param._sCallback) {
						var opener = bizMOBMultiLayout.opener; 
						if(opener) param._sCallback = "document." + opener + "." + param._sCallback;
					}
					parentCloseFunc(param);
				}
			}
		};
		
		var bizMOBCoreGateWay = bizMOBCore.Module.gateway; 
		bizMOBCore.Module.gateway = function(message, service, action)	{
			switch(message.id)	{
			case "RELOAD_WEB" :
			case "AUTH" :
			case "DISMISS_POPUP_VIEW" :
			case "POP_VIEW" :
			case "CHECK_PUSH_RECEIVED" :
			case "GET_MEDIA_PICK" :
			case "CAMERA_CAPTURE" :
			case "FILE_UPLOAD" :
				break;
			default :
				var opener = bizMOBMultiLayout.opener;
				if(opener && message.param && message.param.callback) message.param.callback = "document." + opener + "." + message.param.callback;
			}
			
			bizMOBCoreGateWay.call(bizMOBCore.Module, message, service, action);
		}
	};
	
	
	$(document).ready(function()
	{
		bizMOBMultiLayout.initAPI();
		if(bizMOBMultiLayout.isFrame()) 
		{
			var param = location.href.split("?message=");
			if(param.length>1)
			{
				param = param[1]; 
				param = jQuery.parseJSON(decodeURIComponent(param));
			}
			else param = {};
			bizMOBMultiLayout.initFrame(param.bizMOBFrame);
			
			delete param.bizMOBFrame;
			
			bizMOBCore.EventManager.responser(
			{
				eventname : "onReady"
			},
			{
				message : param
			});
			
			for(var eventName in bizMOBCore.EventManager.storage)
			{
				if(bizMOBCore.EventManager.storage[eventName].length>0)
				{
					var hasDispatchEvent = !parent.bizMOBCore.EventManager.storage[eventName].every(function(value)
					{
						return value!=="bizMOB.MultiLayout._dispatchEvent"; 
					});
					if(!hasDispatchEvent) { parent.bizMOBCore.EventManager.storage[eventName].push("bizMOB.MultiLayout._dispatchEvent"); } 
				}
				/*if(!parent.bizMOBCore.EventManager.storage[eventName]["bizMOB.MultiLayout.dispatchEvent"])
				{
					parent.bizMOBCore.EventManager.storage[eventName]["bizMOB.MultiLayout.dispatchEvent"] = function()
					{
						bizMOBCore.EventManager.responser
						parent.bizMOBCore.EventManager.storage[eventName].concat(bizMOBCore.EventManager.storage[eventName]);
					}
				}*/
				 
			}
			
			$("iframe[name=" + bizMOBMultiLayout.frameName + "]", window.parent.document).attr("isLoadMultiLayout", true);
			var isLoadMultiLayout=true;
			$("iframe", window.parent.document).each(function()
			{
				if(!$(this).attr("isLoadMultiLayout")) isLoadMultiLayout = false;
			});
			if(isLoadMultiLayout) 
			{
				window.parent.bizMOB.MultiLayout._broadcastReservs();
				parent.bizMOBCore.EventManager.init();
			}
		}
	});
	
	bizMOB.addEvent("beforeready", "bizMOB.MultiLayout.init");
})();
