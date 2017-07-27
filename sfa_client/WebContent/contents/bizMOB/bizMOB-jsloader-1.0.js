var RELATE_DEPTH = "";

(function(){

	var EXTEN_LIB = {
			"UTIL" : {
						"LOAD": true,
						"LIB" : "bizMOB/util/bizMOB-util-1.0.js"
					},
			"MULTILAYOUT" : {
								"LOAD": false,
								"LIB" : "bizMOB/multilayout/bizMOB-multilayout.js"
							},
			"WEBUI" : {
							"LOAD": false,
							"LIB" : "bizMOB/webui/bizMOB-ui.js"
						}
	};


	var CURRENT_PATH = location.pathname;
	var PATH_DEPTH = CURRENT_PATH.split("/");
	var PATHARR_IDX=PATH_DEPTH.length-2;
	
	
	for(var i=PATHARR_IDX; i > 0;i--){
		if(PATH_DEPTH[i] != "contents"){
			RELATE_DEPTH += "../"; 
		}else{
			break;
		}
		
	}
	
	var jsUrls = 
	[ 
		"bizMOB/jscore/jquery-1.7.2.min.js",
		"bizMOB/jscore/json2.js",
		"bizMOB/jscore/bizMOB-xross-1.0.js",
		"bizMOB/config/web/configuration.js",
		"common/js/ipmutil.js"
	];
	
	for ( var lib in EXTEN_LIB){
		if(EXTEN_LIB[lib].LOAD) {jsUrls.push(EXTEN_LIB[lib].LIB);}
	}
	


	if( !(navigator.userAgent.toLowerCase().search("mobile") > -1 || 
			navigator.userAgent.toLowerCase().search("android") > -1) ) 
	{
		jsUrls.push("../webemulator/js/bizMOB-emulator.js");
	} 


	var JsList = "";
	for(var i=0;i<jsUrls.length;i++) 
	{
		JsList +=	"<script type=\"text/javascript\" src=\""+ RELATE_DEPTH + jsUrls[i] + "\" charset=\"utf-8\"></script>";
		
	}
	document.write(JsList);
})();


