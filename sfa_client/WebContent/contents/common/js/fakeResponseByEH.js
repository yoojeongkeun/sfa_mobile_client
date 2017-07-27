fakeResponse.regist("test", function(request, response)
{
	response.body = {};
	return response;
});

fakeResponse.regist("CES0203", function(request, response)
		{
	
	if(request.body.indexID == "D005") {
		response.body = {
				list : [
{dataList : //	시간별 데이터 리스트	array	object	 
[{
time			: "3시", //시간	string	 	 
index	: "1", //지수	string	 
},{
time			: "6시",  
index	: "2",
},{
time			: "9시",  
index	: "3",
},{
time			: "12시",  
index	: "4",
},{
time			: "15시",  
index	: "50",
},{
time			: "18시",  
index	: "100",
},{
time			: "21시",  
index	: "2",
}]},
				        ]
			};
	} else if(request.body.indexID == "D010") {
		response.body = {
				list : [
	{dataList : //	시간별 데이터 리스트	array	object	 
	[{
		time			: "3시", //시간	string	 	 
		index	: "60", //지수	string	 
		},{
		time			: "6시",  
		index	: "20",
		},{
		time			: "9시",  
		index	: "31",
		},{
		time			: "12시",  
		index	: "80",
		},{
		time			: "15시",  
		index	: "500",
		},{
		time			: "18시",  
		index	: "100",
		},{
		time			: "21시",  
		index	: "10",
		}]},
				        ]
			};
	} else if(request.body.indexID == "D007") {
				response.body = {
						list : [
{dataList : //	시간별 데이터 리스트	array	object	 
	[{
		time			: "3시", //시간	string	 	 
		index	: "5", //지수	string	 
		},{
		time			: "6시",  
		index	: "7",
		},{
		time			: "9시",  
		index	: "20",
		},{
		time			: "12시",  
		index	: "50",
		},{
		time			: "15시",  
		index	: "150",
		},{
		time			: "18시",  
		index	: "100",
		},{
		time			: "21시",  
		index	: "30",				
		},{
			time			: "12시",  
			index	: "40",
			},{
			time			: "15시",  
			index	: "10",
			},{
			time			: "18시",  
			index	: "2",
			},{
			time			: "21시",  
			index	: "30"}]},
{
		dataList : //	시간별 데이터 리스트	array	object	 
			[{
				time			: "3시", //시간	string	 	 
				index	: "5", //지수	string	 
				},{
				time			: "6시",  
				index	: "7",
				},{
				time			: "9시",  
				index	: "20",
				},{
				time			: "12시",  
				index	: "50",
				},{
				time			: "15시",  
				index	: "150",
				},{
				time			: "18시",  
				index	: "100",
				},{
				time			: "21시",  
				index	: "30",				
				},{
					time			: "12시",  
					index	: "40",
					},{
					time			: "15시",  
					index	: "10",
					},{
					time			: "18시",  
					index	: "2",
					},{
					time			: "21시",  
					index	: "30"}],}
						        ]
					};
			}  else if( request.body.indexID == "D009") {
				response.body = {
						list : [
{dataList : //	시간별 데이터 리스트	array	object	 
	[{
		time			: "3시", //시간	string	 	 
		index	: "5", //지수	string	 
		},{
		time			: "6시",  
		index	: "15",
		},{
		time			: "9시",  
		index	: "40",
		},{
		time			: "12시",  
		index	: "80",
		},{
		time			: "15시",  
		index	: "150",
		},{
		time			: "18시",  
		index	: "100",
		},{
		time			: "21시",  
		index	: "30",				
		}]},
{
		dataList : //	시간별 데이터 리스트	array	object	 
			[{
				time			: "3시", //시간	string	 	 
				index	: "5", //지수	string	 
				},{
				time			: "6시",  
				index	: "15",
				},{
				time			: "9시",  
				index	: "40",
				},{
				time			: "12시",  
				index	: "80",
				},{
				time			: "15시",  
				index	: "150",
				},{
				time			: "18시",  
				index	: "100",
				},{
				time			: "21시",  
				index	: "30",				
				}],}
						        ]
					};
			}  else if(request.body.indexID == "D003") {
				response.body = {
						list : [
			{dataList : //	시간별 데이터 리스트	array	object	 
				[{
					time			: "3시", //시간	string	 	 
					index	: "10", //지수	string	 
					},{
					time			: "6시",  
					index	: "30",
					},{
					time			: "9시",  
					index	: "55",
					},{
					time			: "12시",  
					index	: "60",
					},{
					time			: "15시",  
					index	: "75",
					},{
					time			: "18시",  
					index	: "78",
					},{
					time			: "21시",  
					index	: "85",				
					},{
						time			: "15시",  
						index	: "87",
						},{
						time			: "18시",  
						index	: "90",
						},{
						time			: "21시",  
						index	: "100",				
						}]},
						        ]
					};
			}  else if(request.body.indexID == "D012" || request.body.indexID == "D004") {
				response.body = {
						list : [
			{dataList : //	시간별 데이터 리스트	array	object	 
			[{
				time			: "3시", //시간	string	 	 
				index	: "60", //지수	string	 
				},{
				time			: "6시",  
				index	: "20",
				},{
				time			: "9시",  
				index	: "31",
				},{
				time			: "12시",  
				index	: "80",
				},{
				time			: "15시",  
				index	: "500",
				},{
				time			: "18시",  
				index	: "100",
				},{
				time			: "21시",  
				index	: "10",
				}]},
						        ]
					};
			}  else if(request.body.indexID == "D001") {
				response.body = {
						list : [
			{dataList : //	시간별 데이터 리스트	array	object	 
			[{
				time			: "3시", //시간	string	 	 
				index	: "60", //지수	string	 
				},{
				time			: "6시",  
				index	: "20",
				},{
				time			: "9시",  
				index	: "31",
				},{
				time			: "12시",  
				index	: "80",
				},{
				time			: "15시",  
				index	: "500",
				},{
				time			: "18시",  
				index	: "100",
				},{
				time			: "21시",  
				index	: "10",
				}]},
						        ]
					};
			} else if(request.body.indexID == "D002") {
				response.body = {
						list : [
			{dataList : //	시간별 데이터 리스트	array	object	 
			[{
				time			: "3시", //시간	string	 	 
				index	: "60", //지수	string	 
				},{
				time			: "6시",  
				index	: "20",
				},{
				time			: "9시",  
				index	: "31",
				},{
				time			: "12시",  
				index	: "80",
				},{
				time			: "15시",  
				index	: "500",
				},{
				time			: "18시",  
				index	: "100",
				},{
				time			: "21시",  
				index	: "10",
				}]},
						        ]
					};
			} else if(request.body.indexID == "D013") {
				response.body = {
						list : [
			{dataList : //	시간별 데이터 리스트	array	object	 
				[{
					time			: "3시", //시간	string	 	 
					index	: "5", //지수	string	 
					},{
					time			: "6시",  
					index	: "20",
					},{
					time			: "9시",  
					index	: "40",
					},{
					time			: "12시",  
					index	: "60",
					},{
					time			: "15시",  
					index	: "80",
					},{
					time			: "18시",  
					index	: "100",
					},{
					time			: "21시",  
					index	: "55",				
					}]},
						        ]
					};
			}
	
			return response;
		});


fakeResponse.regist("CES0202", function(request, response)
		{
		if(request.body.timeType == "0") {
			response.body = {
				dataList : //	시간별 데이터 리스트	array	object	 
					[{
						typeTime : "2016년 06월 29일 03:00",
						searchTime			: "3시", //시간	string	 	 
						totAirIndex :"70",
						radonRadioIndex	 :"60",
						discIndex :"65",
						contIndex :"50",
						indexList	 	: 		[]
					},{
						typeTime : "2016년 06월 29일 06:00",
						searchTime			: "6시",  
						totAirIndex :"50",
						radonRadioIndex	 :"65",
						discIndex :"60",
						contIndex :"55",
						indexList	 	: 		[{
							indexMeasure	: "pCi/L", 	 
							indexID			: "D005",  	 
							indexName		: "라돈방사능", 	 
							index				: "31", 	 
							level				: "1"
							}]
					},{
						typeTime : "2016년 06월 29일 09:00",
						searchTime			: "9시",  
						totAirIndex :"50",
						radonRadioIndex	 :"40",
						discIndex :"60",
						contIndex :"40",
						indexList	 	: 		[{
							indexMeasure	: "pCi/L", 	 
							indexID			: "D005",  	 
							indexName		: "라돈방사능", 	 
							index				: "31", 	 
							level				: "2"
							}]
					},{
						typeTime : "2016년 06월 29일 12:00",
						searchTime			: "12시",  
						totAirIndex :"70",
						radonRadioIndex	 :"60",
						discIndex :"65",
						contIndex :"50",
						indexList	 	: 		[{
							indexMeasure	: "pCi/L", 	 
							indexID			: "D005",  	 
							indexName		: "라돈방사능", 	 
							index				: "31", 	 
							level				: "2"
							}]
					},{
						typeTime : "2016년 06월 29일 15:00",
						searchTime			: "15시",  
						totAirIndex :"30",
						radonRadioIndex	 :"30",
						discIndex :"35",
						contIndex :"30",
						indexList	 	: 		[{
							indexMeasure	: "pCi/L", 	 
							indexID			: "D005",  	 
							indexName		: "라돈방사능", 	 
							index				: "31", 	 
							level				: "2"
							}]
					},{
						typeTime : "2016년 06월 29일 18:00",
						searchTime			: "18시",  
						totAirIndex :"70",
						radonRadioIndex	 :"60",
						discIndex :"65",
						contIndex :"50",
						indexList	 	: 		[]
					},{
						typeTime : "2016년 06월 29일 21:00",
						searchTime			: "21시",  
						totAirIndex :"66",
						radonRadioIndex	 :"50",
						discIndex :"40",
						contIndex :"20",
						indexList	 	: 		[	{
							indexMeasure	: "pCi/L", 	 
							indexID			: "D005",  	 
							indexName		: "라돈방사능", 	 
							index				: "31", 	 
							level				: "2"
							},{
								indexMeasure	: "㎍/㎥", 	 
								indexID			: "D007",  	 
								indexName		: "극초미세먼지", 	 
								index				: "120", 	 
								level				: "3"
							},{
								indexMeasure	: "ppm", 	 
								indexID			: "D012",  	 
								indexName		: "일산화탄소", 	 
								index				: "18", 	
								level				: "1"
							}]
					},{
						typeTime : "2016년 06월 29일 24:00",
						searchTime			: "24시", 	 
						totAirIndex :"80",
						radonRadioIndex	 :"54",
						discIndex :"25",
						contIndex :"63",
						indexList	 	: 	 
						[{
							indexMeasure	: "pCi/L", 	 
							indexID			: "D005",  	 
							indexName		: "라돈방사능", 	 
							index				: "3", 	 
							level				: "1"
						},{
							indexMeasure	: "㎍/㎥", 	 
							indexID			: "D007",  	 
							indexName		: "극초미세먼지", 	 
							index				: "563", 	 
							level				: "4"
						},{
							indexMeasure	: "ppm", 	 
							indexID			: "D012",  	 
							indexName		: "일산화탄소", 	 
							index				: "18", 	
							level				: "2"
						},
						{
							indexMeasure	: "dB", 	 
							indexID			: "D013",  	 
							indexName		: "소음", 	 
							index				: "18", 	 
							level				: "3"
						}]
					}],
				average	: 30 //평균
			};
		} else if (request.body.timeType == "1"){
			response.body = {
					dataList : //	시간별 데이터 리스트	array	object	 
						[{
							typeTime : "2016년 06월 10일",
							searchTime			: "10일", //시간	string	 	 
							totAirIndex :"70",
							radonRadioIndex	 :"60",
							discIndex :"65",
							contIndex :"50",
							indexList	 	: [{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "31", 	 
								level				: "1"
								}]
						},{
							typeTime : "2016년 06월 11일",
							searchTime			: "11일", //시간	string	 	 
							totAirIndex :"50",
							radonRadioIndex	 :"40",
							discIndex :"35",
							contIndex :"55",
							indexList	 	: [{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "40", 	 
								level				: "1"
								}]
						},{
							typeTime : "2016년 06월 12일",
							searchTime			: "12일", //시간	string	 	 
							totAirIndex :"70",
							radonRadioIndex	 :"60",
							discIndex :"65",
							contIndex :"50",
							indexList	 	: [{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "51", 	 
								level				: "1"
								}]
						},{
							typeTime : "2016년 06월 13일",
							searchTime			: "13일", //시간	string	 	 
							totAirIndex :"72",
							radonRadioIndex	 :"42",
							discIndex :"60",
							contIndex :"80",
							indexList	 	: [{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "21", 	 
								level				: "1"
								}]
						},{
							typeTime : "2016년 06월 14일",
							searchTime			: "14일", //시간	string	 	 
							totAirIndex :"72",
							radonRadioIndex	 :"42",
							discIndex :"60",
							contIndex :"80",
							indexList	 	: [{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "31", 	 
								level				: "1"
								}]
						},{
							typeTime : "2016년 06월 15일",
							searchTime			: "15일", //시간	string	 	 
							totAirIndex :"62",
							radonRadioIndex	 :"52",
							discIndex :"68",
							contIndex :"70",
							indexList	 	: [{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "31", 	 
								level				: "1"
								}]
						},{
							typeTime : "2016년 06월 16일",
							searchTime			: "16일", //시간	string	 	 
							totAirIndex :"22",
							radonRadioIndex	 :"52",
							discIndex :"30",
							contIndex :"40",
							indexList	 	: [{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "31", 	 
								level				: "1"
								}]
						},{
							typeTime : "2016년 06월 17일",
							searchTime			: "17일", //시간	string	 	 
							totAirIndex :"72",
							radonRadioIndex	 :"42",
							discIndex :"60",
							contIndex :"80",
							indexList	 	: []
						},{
							typeTime : "2016년 06월 18일",
							searchTime			: "18일", //시간	string	 	 
							totAirIndex :"82",
							radonRadioIndex	 :"62",
							discIndex :"65",
							contIndex :"72",
							indexList	 	: []
						},{
							typeTime : "2016년 06월 19일",
							searchTime			: "19일",  
							totAirIndex :"72",
							radonRadioIndex	 :"42",
							discIndex :"60",
							contIndex :"80",
							indexList	 	: []
						},{
							typeTime : "2016년 06월 20일",
							searchTime			: "20일",  
							totAirIndex :"92",
							radonRadioIndex	 :"32",
							discIndex :"20",
							contIndex :"20",
							indexList	 	: []
						},{
							typeTime : "2016년 06월 21일",
							searchTime			: "21일", //시간	string	 	 
							totAirIndex :"40",
							radonRadioIndex	 :"40",
							discIndex :"40",
							contIndex :"40",
							indexList	 	: []
						},{
							typeTime : "2016년 06월 22일",
							searchTime			: "22일",  
							totAirIndex :"72",
							radonRadioIndex	 :"42",
							discIndex :"60",
							contIndex :"80",
							indexList	 	: [{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "31", 	 
								level				: "1"
								}]
						},{
							typeTime : "2016년 06월 23일",
							searchTime			: "23일",  
							totAirIndex :"72",
							radonRadioIndex	 :"42",
							discIndex :"60",
							contIndex :"80",
							indexList	 	: 
								[	{
									indexMeasure	: "pCi/L", 	 
									indexID			: "D005",  	 
									indexName		: "라돈방사능", 	 
									index				: "31", 	 
									level				: "1"
									},{
										indexMeasure	: "㎍/㎥", 	 
										indexID			: "D007",  	 
										indexName		: "극초미세먼지", 	 
										index				: "120", 	 
										level				: "4"
									},{
										indexMeasure	: "ppm", 	 
										indexID			: "D012",  	 
										indexName		: "일산화탄소", 	 
										index				: "18", 	
										level				: "2"
									}]
						},{
							typeTime : "2016년 06월 24일",
							searchTime			: "24일", 	 
							totAirIndex :"72",
							radonRadioIndex	 :"42",
							discIndex :"60",
							contIndex :"80",
							indexList	 	: 	 
							[							 
							{
								indexMeasure	: "dB", 	 
								indexID			: "D013",  	 
								indexName		: "소음", 	 
								index				: "18", 	 
								level				: "3"
							},{
								indexMeasure	: "pCi/L", 	 
								indexID			: "D005",  	 
								indexName		: "라돈방사능", 	 
								index				: "3", 	 
								level				: "1"
							},{
								indexMeasure	: "㎍/㎥", 	 
								indexID			: "D007",  	 
								indexName		: "극초미세먼지", 	 
								index				: "563", 	 
								level				: "4"
							},{
								indexMeasure	: "ppm", 	 
								indexID			: "D012",  	 
								indexName		: "일산화탄소", 	 
								index				: "18", 	
								level				: "2"
							}]
						}],
					average	: 30 //평균
				};
		} else {
			response.body = {
					dataList : [] 
			};
		}
			return response;
		});
