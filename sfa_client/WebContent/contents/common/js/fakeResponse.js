(function(undefined)
{
	var defaultResponse = 
	{
		"header" :
		{
			"result" : true,
			"error_code" : "",
			"error_text" : "",         
			"info_text" : "",         
			"message_version" : "",         
			"login_session_id" : "",         
			"trcode" : ""
		},
		"body" :
		{
		}
	};
	
	function FakeResponse()
	{
		this.functions = [];
	}
	FakeResponse.prototype.getDefaultErrorResponse = function(trcode)
	{
		return {
			"header" : $.extend(false, defaultResponse.header, 
			{ 
				"trcode" : trcode,
				"result" : false,
				"error_code" : "ER0001",
				"error_text" : "잘못된 요청입니다."
			}),
			"body" : {}
		};
	};
	FakeResponse.prototype.getNotExistErrorResponse = function(trcode)
	{
		return {
			"header" : $.extend(false, defaultResponse.header, 
			{ 
				"trcode" : trcode,
				"result" : false,
				"error_code" : "FR0011",
				"error_text" : "FakeResponse에서 정의되지 않은 전문입니다."
			}),
			"body" : {}
		};
	};
	FakeResponse.prototype.getDefaultResponse = function(trcode)
	{
		return {
			"header" : $.extend(false, defaultResponse.header, { trcode:trcode }),
			"body" : {}
		};
	};
	FakeResponse.prototype.regist = function(trcode, func)
	{
		this.functions[trcode] = func;
	};
	FakeResponse.prototype.execute = function(trcode,request)
	{
		return this.functions[trcode] ? this.functions[trcode](request, fakeResponse.getDefaultResponse(trcode)) : fakeResponse.getNotExistErrorResponse(trcode);
	};
	window.fakeResponse = new FakeResponse();
	
	function FakeServer()
	{
	};
	FakeServer.prototype.request = function(param) 
	{
		
		var trcode = undefined,
			requestData = undefined,
			callback = undefined;
		try
		{
			if(!param ||  !param._sTrcode) 
			{
				console.warn("");console.trace();return;
			}
			callback = param._fCallback;
			trcode = param._sTrcode;
			requestData = 
			{
				"header" : $.extend(false, 
				{
					"result" : true,
					"error_code" : "",
					"error_text" : "",         
					"info_text" : "",         
					"message_version" : "",         
					"login_session_id" : "",         
					"trcode" : trcode
				}, param._oHeader),
				"body" : param._oBody || {}
			};
			console.log("Fake Response Log:##Request##");
			console.log("Fake Response Log:" + JSON.stringify(requestData));
		}
		catch(error)
		{
			console.warn("Fake Response Log:invaild parameter.");
		}
		var response = fakeResponse.execute(trcode,requestData);
		
		console.log("Fake Response Log:##response##");
		console.log("Fake Response Log:" + JSON.stringify(response));
		console.log("\n");
		if(callback) callback(response);
	};
	var fakeServer = new FakeServer();
	bizMOB.Network.requestTr = fakeServer.request;
	bizMOB.Network.requestLogin = fakeServer.request;
})(undefined);