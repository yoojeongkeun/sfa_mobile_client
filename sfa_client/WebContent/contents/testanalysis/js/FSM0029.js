/**
 * 위생점검 리스트
 */
page  =
{
    /**
     * SR번호
     */
    srNum : "",
    /**
     * 고객명
     */
    CustNm : "",
    /**
     * 고객코드 
     */
    custCode: "",
    /**
     * 서비스 유무
     */
    serviceYN : "",
    /**
     * 작업일자
     */
    workDay : "",
    
    /**
     * 최초 진입점
     * @param json : 전화면에서 넘겨진 데이터
     */
    init:function(json)
    {
        page.initInterface();
        page.initData(json);
        page.initLayout();
    },
    /**
     * UI 셋팅
     */
    initInterface:function()
    {
        $("#menuList .detailList").click(function()
        {
            var menuName = $(this).attr("name");
            
            var openOption = {
                message : 
                {
                    srNum       : page.srNum,
                    custName    : page.CustNm,
                    custCode	: page.custCode,
                    serviceYN   : page.serviceYN,
                    workDay     : page.workDay,
                    sqmlType	: ""
                }
            };
            
            switch (menuName)
            {
            	case "menu1":
            		openOption.message.sqmlType = "1"; // 법규기준
            		bizMOB.Web.open("service/html/FSM0030.html", openOption);
            		break;
            	case "menu2":
            		openOption.message.sqmlType = "2"; // 장비/기기
            		bizMOB.Web.open("service/html/FSM0030.html", openOption);
            		break;
            	case "menu3":
            		openOption.message.sqmlType = "3"; // 위생교육정보
            		bizMOB.Web.open("service/html/FSM0030.html", openOption);
            		break;
            	case "menu4":
            		openOption.message.sqmlType = "4"; // 용어정의
            		bizMOB.Web.open("service/html/FSM0030.html", openOption);
            		break;
            	case "menu5":
            		openOption.message.sqmlType = "5"; // Q&A
            		bizMOB.Web.open("service/html/FSM0030.html", openOption);
            		break;
            	case "menu6":
            		openOption.message.sqmlType = "6"; // 마이리스트
            		bizMOB.Web.open("service/html/FSM0031.html", openOption);
            		break;
            	case "menu7":
            		openOption.message.sqmlType = "7"; // 식품안전정보
            		bizMOB.Web.open("service/html/FSM0032.html", openOption);
            		break;
            	case "menu8":
            		openOption.message.sqmlType = "8"; // 식품안전정보
            		bizMOB.Web.open("service/html/FSM0033.html", openOption);
            		break;
            	case "sampleAnalysisCancel": // 식품시료분석 취소 
            		bizMOB.Ui.openDialog("service/html/FSP0001.html", 
    				{ 
    					message : 
    				   	{
    						CustInfo  : page.custInfo,
    						SRNum     : page.srNum,
    						cancelType : "H"
    				   	},
    				   	width:"90%",
    					height:"45%"
    				});
                    
                    break;
                default:
                    break;
            }
            
            
        });
    },
    /**
     * 데이터 셋팅
     * @param json : 전 화면에서 넘겨진 데이터
     */
    initData:function(json)
    {
        page.srNum = json.SRNum;
        page.CustNm = json.CustName;
        page.custCode = json.custCode;
        page.serviceYN = json.serviceYN;
        page.workDay = json.workDay;
        
    	//page.CompleteCheck();
    },
    /**
     * 레이아웃 셋팅
     */
    initLayout:function()
    {
    	var layout = fsutil.getDefaultLayout("SQM");
    	bizMOB.Ui.displayView(layout);
    },
    
};