plugins={pointerEvents:isIE<11?"js/pointer-events.min.js":false,bootstrapTooltip:$("[data-toggle='tooltip']"),bootstrapTabs:$(".tabs"),rdParallax:$(".rd-parallax"),rdAudioPlayer:$(".rd-audio"),rdVideoPlayer:$(".rd-video-player"),responsiveTabs:$(".responsive-tabs"),rdGoogleMaps:$(".rd-google-map"),rdNavbar:$(".rd-navbar"),rdVideoBG:$(".rd-video"),rdRange:$('.rd-range'),textRotator:$(".text-rotator"),owl:$(".owl-carousel"),swiper:$(".swiper-slider"),counter:$(".counter"),flickrfeed:$(".flickr"),twitterfeed:$(".twitter"),progressBar:$(".progress-bar"),isotope:$(".isotope"),countDown:$(".countdown"),calendar:$(".rd-calendar"),facebookfeed:$(".facebook"),instafeed:$(".instafeed"),facebookWidget:$('#fb-root'),materialTabs:$('.rd-material-tabs'),filePicker:$('.rd-file-picker'),fileDrop:$('.rd-file-drop'),popover:$('[data-toggle="popover"]'),dateCountdown:$('.DateCountdown'),statefulButton:$('.btn-stateful'),slick:$('.slick-slider'),scroller:$(".scroll-wrap"),socialite:$(".socialite"),viewAnimate:$('.view-animate'),selectFilter:$("select"),rdInputLabel:$(".form-label"),stacktable:$("[data-responsive=true]"),bootstrapDateTimePicker:$("[data-time-picker]"),customWaypoints:$('[data-custom-scroll-to]'),photoSwipeGallery:$("[data-photo-swipe-item]"),circleProgress:$(".progress-bar-circle"),stepper:$("input[type='number']"),radio:$("input[type='radio']"),checkbox:$("input[type='checkbox']"),customToggle:$("[data-custom-toggle]"),rdMailForm:$(".rd-mailform"),regula:$("[data-constraints]"),search:$(".rd-search"),searchResults:$('.rd-search-results'),imgZoom:$('[mag-thumb]')};if(plugins.rdInputLabel.length){plugins.rdInputLabel.RDInputLabel();}
if(plugins.regula.length){attachFormValidator(plugins.regula);}
if(plugins.rdMailForm.length){var i,j,k,msg={'MF000':'Successfully sent!','MF001':'Recipients are not set!','MF002':'Form will not work locally!','MF003':'Please, define email field in your form!','MF004':'Please, define type of your form!','MF254':'Something went wrong with PHPMailer!','MF255':'Aw, snap! Something went wrong.'};for(i=0;i<plugins.rdMailForm.length;i++){var $form=$(plugins.rdMailForm[i]);$form.attr('novalidate','novalidate').ajaxForm({data:{"form-type":$form.attr("data-form-type")||"contact","counter":i},beforeSubmit:function(){var form=$(plugins.rdMailForm[this.extraData.counter]);var inputs=form.find("[data-constraints]");if(isValidated(inputs)){var output=$("#"+ form.attr("data-form-output"));if(output.hasClass("snackbars")){output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');output.addClass("active");}}else{return false;}},error:function(result){var output=$("#"+ $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output"));output.text(msg[result]);},success:function(result){var form=$(plugins.rdMailForm[this.extraData.counter]);var output=$("#"+ form.attr("data-form-output"));form.addClass('success');result=result.length==5?result:'MF255';output.text(msg[result]);if(result==="MF000"){if(output.hasClass("snackbars")){output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>'+ msg[result]+'</span></p>');}else{output.addClass("success");output.addClass("active");}}else{if(output.hasClass("snackbars")){output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>'+ msg[result]+'</span></p>');}else{output.addClass("error");output.addClass("active");}}
form.clearForm();form.find('input, textarea').blur();setTimeout(function(){output.removeClass("active");form.removeClass('success');},5000);}});}}
function attachFormValidator(elements){for(var i=0;i<elements.length;i++){var o=$(elements[i]),v;o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");v=o.parent().find(".form-validation");if(v.is(":last-child")){o.addClass("form-control-last-child");}}
elements.on('input change propertychange blur',function(e){var $this=$(this),results;if(e.type!="blur"){if(!$this.parent().hasClass("has-error")){return;}}
if($this.parents('.rd-mailform').hasClass('success')){return;}
if((results=$this.regula('validate')).length){for(i=0;i<results.length;i++){$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")}}else{$this.siblings(".form-validation").text("").parent().removeClass("has-error")}}).regula('bind');}
function isValidated(elements){var results,errors=0;if(elements.length){for(j=0;j<elements.length;j++){var $input=$(elements[j]);if((results=$input.regula('validate')).length){for(k=0;k<results.length;k++){errors++;$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");}}else{$input.siblings(".form-validation").text("").parent().removeClass("has-error")}}
return errors==0;}
return true;}
if(plugins.rdRange.length){plugins.rdRange.RDRange({});}
if(plugins.bootstrapDateTimePicker.length){var i;for(i=0;i<plugins.bootstrapDateTimePicker.length;i++){var $dateTimePicker=$(plugins.bootstrapDateTimePicker[i]);var options={};options['format']='dddd DD MMMM YYYY - HH:mm';if($dateTimePicker.attr("data-time-picker")=="date"){options['format']='DD.MM.YYYY';options['minDate']=new Date();}else if($dateTimePicker.attr("data-time-picker")=="time"){options['format']='HH:mm';}
options["time"]=($dateTimePicker.attr("data-time-picker")!="date");options["date"]=($dateTimePicker.attr("data-time-picker")!="time");options["shortTime"]=true;$dateTimePicker.bootstrapMaterialDatePicker(options);}}
if(plugins.selectFilter.length){var i;for(i=0;i<plugins.selectFilter.length;i++){var select=$(plugins.selectFilter[i]);select.select2({theme:"bootstrap"}).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",",'g')," "));}}
if(plugins.stepper.length){plugins.stepper.stepper({labels:{up:"",down:""}});}
if(plugins.radio.length){var i;for(i=0;i<plugins.radio.length;i++){var $this=$(plugins.radio[i]);$this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")}}
if(plugins.checkbox.length){var i;for(i=0;i<plugins.checkbox.length;i++){var $this=$(plugins.checkbox[i]);$this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")}}
function include(scriptUrl){document.write('<script src="'+ scriptUrl+'"></script>');}
function isIE(){var myNav=navigator.userAgent.toLowerCase();return(myNav.indexOf('msie')!=-1)?parseInt(myNav.split('msie')[1]):false;};include('js/jquery.cookie.js');include('js/jquery.easing.1.3.js');;(function($){var o=$('html');if(o.hasClass('desktop')){include('js/tmstickup.js');$(document).ready(function(){$('#stuck_container').TMStickUp({})});}})(jQuery);;(function($){var o=$('html');if(o.hasClass('desktop')){include('js/jquery.ui.totop.js');$(document).ready(function(){$().UItoTop({easingType:'easeOutQuart',containerClass:'toTop fa fa-angle-up'});});}})(jQuery);;(function($){var o=$('[data-equal-group]');if(o.length>0){include('js/jquery.equalheights.js');}})(jQuery);;(function($){var o=$('html');if(o.hasClass('desktop')){include('js/jquery.mousewheel.min.js');include('js/jquery.simplr.smoothscroll.min.js');$(document).ready(function(){$.srSmoothscroll({step:150,speed:800});});}})(jQuery);;(function($){var currentYear=(new Date).getFullYear();$(document).ready(function(){$("#copyright-year").text((new Date).getFullYear());});})(jQuery);;(function($){include('js/superfish.js');})(jQuery);;(function($){include('js/jquery.rd-navbar.js');})(jQuery);;(function($){var o=document.getElementById("google-map");if(o){include('//maps.google.com/maps/api/js?sensor=false');include('js/jquery.rd-google-map.js');$(document).ready(function(){var o=$('#google-map');if(o.length>0){o.googleMap({styles:[{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]});}});}})
(jQuery);;(function($){var o=$('html');if((navigator.userAgent.toLowerCase().indexOf('msie')==-1)||(isIE()&&isIE()>9)){if(o.hasClass('desktop')){include('js/wow.js');$(document).ready(function(){new WOW().init();});}}})(jQuery);;(function($){var o=$('#contact-form');if(o.length>0){include('js/modal.js');include('js/TMForm.js');if($('#contact-form .recaptcha').length>0){include('//www.google.com/recaptcha/api/js/recaptcha_ajax.js');}}})(jQuery);$(function(){var viewportmeta=document.querySelector&&document.querySelector('meta[name="viewport"]'),ua=navigator.userAgent,gestureStart=function(){viewportmeta.content="width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";},scaleFix=function(){if(viewportmeta&&/iPhone|iPad/.test(ua)&&!/Opera Mini/.test(ua)){viewportmeta.content="width=device-width, minimum-scale=1.0, maximum-scale=1.0";document.addEventListener("gesturestart",gestureStart,false);}};scaleFix();if(window.orientation!=undefined){var regM=/ipod|ipad|iphone/gi,result=ua.match(regM);if(!result){$('.sf-menus li').each(function(){if($(">ul",this)[0]){$(">a",this).toggle(function(){return false;},function(){window.location.href=$(this).attr("href");});}})}}});var ua=navigator.userAgent.toLocaleLowerCase(),regV=/ipod|ipad|iphone/gi,result=ua.match(regV),userScale="";if(!result){userScale=",user-scalable=0"}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0'+ userScale+'">');;(function($){var o=$('.vide');if(o.length>0){include('js/jquery.vide.js');}})(jQuery);;(function($){var o=$('.thumb');if(o.length>0){include('js/jquery.fancybox.js');include('js/jquery.fancybox-media.js');include('js/jquery.fancybox-buttons.js');$(document).ready(function(){o.fancybox();});}})(jQuery);