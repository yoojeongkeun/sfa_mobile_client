
function onClickAndroidBackButton() {
	var inputcheck = bizMOB.Storage.get("inputcheck");
	if(inputcheck == null || inputcheck == '0') bizMOB.Web.close();
	var btnConfirm = bizMOB.Ui.createTextButton("확인", function() {
		ipmutil.resetChk();
		bizMOB.Web.close();
	});      
	var btnCancel = bizMOB.Ui.createTextButton("취소", function() {
		return;     
	});     
	bizMOB.Ui.confirm("페이지 이동", "이 페이지를 벗어나시겠습니까? 수정한 항목은 저장되지 않습니다.", btnConfirm, btnCancel); 
}