/************************************************************************
   함수명 : 기타 Dialog                                  
   설  명 : actionsheet, alert, overlay, prompt, comfirm dialog 사용                
   사용법 : jActionSheet(), jAlert(), jOverlay(), jPrompt, jComfirm Dialog 사용
   인  자 : 제목, 내용, 색상, 리턴값
************************************************************************/
/*
	jQuery Alert Dialogs Plugin
	Version 1.1
	Cory S.N. LaViska
	14 May 2009
 */
(function($) {
	
	$.alerts = {
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;확인&nbsp;',         // text for the OK button
		cancelButton: '&nbsp;취소&nbsp;', // text for the Cancel button

		alert: function(message, title, theme, callback) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, theme, null,  'alert', function(result) {
				if( callback ) callback(result);
			});
		},

		ActionSheet: function(message, title, theme, btmItem, callback) {
			if( title == null ) title = 'ActionSheet';
			$.alerts._show(title, message, theme, btmItem, 'ActionSheet', function(result) {
				if( callback ) callback(result);
			});
		},

		Overlay: function(message, title, theme,  callback) {
			if( title == null ) title = 'Overlay';
			$.alerts._show(title, message, theme, null,'Overlay', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, theme, callback) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, theme, null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, title, theme,  callback) {
			if( title == null ) title = 'Prompt';
			$.alerts._show(title, message, theme, null,  'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
	
		_show: function(title, msg, value, btmItem, type, callback) { //value= theme
			if(value == null || value ==''){
				value = "a";
			}
				
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="popup_container">' +
			  '<div class="serv_pop"">' +
			  "<div class='tit_box'>"+
			   " <p class='tit_txt'>정보</p>"+
			   " <p class='btn_close'><a href='#' id='btn_close'><img src='../../common/images/btn_close.jpg' width='31' alt='' /></a></p>"+
			   " <div class='cb'></div>"+
			  "</div>"+
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
				'</div>' +
			  '</div>');

			if(value =="undefined" || value == null){
				var dialclass = $('.ui-page-active').attr("class");
				var dialindex = $('.ui-page-active').attr("class").indexOf("ui-body-");				
				var theme = $('.ui-page-active').attr("class")[dialindex+8];
			}else{
				theme = value;
			}
			// IE6 Fix
			var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed'; 

			var dataTheme = "ui-dialog-theme-"+theme;

			$("#popup_container").css({
				position: "absolute",
				zIndex: 99999,
			});

			$("#popup_container").addClass(dataTheme);
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
		msg = "<div class='ui-dialog-msg'>" + msg + "</div>";
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div class="btn_wrap"><p class="btn_sche_edit"><img src="../../common/images/btn_login.jpg "  id="popup_ok" width="161"/><div class="cb"></div></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'ActionSheet':
					var popup_msg = '<div id="popup_panel" >' ;
					
					$("#popup_message").append('<div id="popup_panel" >');
					
					for(var i =0 ; i < btmItem.length ; i++){	
						popup_msg +='<input type="button" value="' +btmItem[i].value + '" id="'+btmItem[i].id+'"/>';					
					}
					popup_msg+='<input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>';
					
					$("#popup_message").append(popup_msg);
				
					for(var i =0 ; i < btmItem.length ; i++){
						$("#"+btmItem[i].id).click( function() {
							if( callback ) callback(this.value);
							$.alerts._hide();		
						});
					}	
				
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#select1ok").focus();
					$("#select1ok, #select2ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#select1ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				
				case 'Overlay':
					$("#popup_message").after('<div id="popup_panel"></div>');
					$("#popup_container").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				
				case 'confirm':
					$("#popup_message").after('<div class="m_button"><ul><li class="btn_ok"><img src="../../common/images/btn_ok01.jpg" id="popup_ok" width="120"/></li><li class="btn_cancel"><img src="../../common/images/btn_cancel01.jpg" id="popup_cancel"  width="120"/></li></ul><div class="cb"></div></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#btn_close").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<input type="text" size="10" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});

					$("#popup_prompt").focus().select();
				break;
			}
			
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var height = $(window).height();
			var width = $(window).width();
			var scrollPosition = $(window).scrollTop();
 
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			var top =(scrollPosition + height / 2 - $("#popup_container").outerHeight() / 2);

			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();
			
			$("#popup_container").css({			
				top: top+"px",
				left: left +"px"
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	}
	
	jAlert = function(message, title, theme , callback) {
		$.alerts.alert(message, title, theme, callback);
	}
	
	jActionSheet = function(message, title, theme, btmItem, callback) {	
		$.alerts.ActionSheet(message, title, theme, btmItem, callback);
	}
	
	jOverlay = function(message, title, theme, callback) {
		$.alerts.Overlay(message, title, theme, callback);
	}
	
	jConfirm = function(message, title, theme, callback) {
		$.alerts.confirm(message, title, theme, callback);
	};
		
	jPrompt = function(message, title, theme,  callback) {
		$.alerts.prompt(message, title, theme, callback);
	};
	
})(jQuery);
