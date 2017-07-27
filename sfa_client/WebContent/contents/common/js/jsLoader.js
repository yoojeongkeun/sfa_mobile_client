(function()
{
	var CURRENT_PATH = location.pathname;
	var PATH_DEPTH = CURRENT_PATH.split("/");
	var PATHARR_IDX=PATH_DEPTH.length-2;
	var RELATE_DEPTH = "";
	
	for(var i=PATHARR_IDX; i > 0;i--){
		if(PATH_DEPTH[i] != "contents"){
			RELATE_DEPTH += "../"; 
		}else{
			break;
		}
	}
	
	var jsUrls = 
	[ 
	 	"common/js/cescoConstants.js",
	 	"common/js/cescoTitlebar.js",
	 	"common/js/cescoUtil.js",
//	 	"common/js/fakeResponse.js",
//	 	"common/js/fakeResponseByEH.js"
	];

	var jsList="";
		
	for(var i=0;i<jsUrls.length;i++) 
	{
		jsList +=	"<script type=\"text/javascript\" src=\""+ RELATE_DEPTH + jsUrls[i] + "\" charset=\"utf-8\"></script>";
	}
	console.log(jsList);
	document.write(jsList);
})();
