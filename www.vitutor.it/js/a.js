(function($){$.fn.acordeon = function(custom) {return this.each(function(){var context = $(this);$(this).find('li', context).click(function(event){var element = $(this).children('a').next();if(element.is('ul')){$(".menu-active").removeClass("menu-active");event.preventDefault();element.slideToggle();$(this).children('a').parent().addClass("menu-active");context.find('ul:visible').not(element).not(element.parents('ul:visible')).slideUp();}else if($(this).find('a').attr('href')!="#"){document.location.href=$(this).find('a').attr('href');event.preventDefault();}});});};})(jQuery);(function($){$.fn.desplegable = function(op){return this.each(function() {var id;$(this).children('li').mouseover(function(e) {clearTimeout(id);$(".cAuxiliar").removeClass("cAuxiliar");$(this).children('ul').addClass('cAuxiliar');});$(this).find('li>ul>li:not(ul.nav>li>ul>li>ul>li)').each(function(index, element) {$(this).mouseover(function(e) {$(this).children('ul').css('display','block');});$(this).mouseout(function(e) {$(this).children('ul').css('display','none');});});$(this).children('li').mouseout(function(e) {id=setTimeout(function(){$(".cAuxiliar").removeClass("cAuxiliar");},500);});}).addClass('desplegable');};$(window).unload(function(){$('ul.desplegable').each(function(){$('li',this).unbind('mouseover','mouseout','mouseenter','mouseleave');});});})(jQuery);
$(document).ready(function() {var cad1="ma";var cad3="o@vitut";var cad2="ilto:nex";var cad4="or.com";$('.menu-lateral').acordeon();$('.nav').desplegable({delay: 400});$('[title=Imprimir]').click(function(e) {print();});$('#vertnav').desplegable({delay: 400});$('[id^=botonSlider]').toggle(function(){var textoParaOcultarContenido=$(this).siblings("[type=hidden]").val().split("_")[0];$(this).val(textoParaOcultarContenido);$(this).prev('.cSliderContainer').slideDown(1000);},function(){var textoParaMostrarContenido=$(this).siblings("[type=hidden]").val().split("_")[1];$(this).val(textoParaMostrarContenido);$(this).prev('.cSliderContainer').slideUp(1000);});$('table.ro tr:even').addClass('roja');$('table.ro  tr').mouseover(function(){$(this).addClass('r2');}).mouseout(function(){$(this).removeClass('r2');});$('table.ve tr:even').addClass('verde');$('table.ve  tr').mouseover(function(){$(this).addClass('v2');}).mouseout(function(){$(this).removeClass('v2');});$("#miC img").css('cursor','pointer');$("#miC img").click(function(e) {window.location.href = cad1+cad2+cad3+cad4;});$("#miC").children('img').hover(function(e){$(this).attr('src','../www.vitutor.it/images/vitutor_hover.png');},function(e){$(this).attr('src','../www.vitutor.it/images/vitutor.png');});$('option:odd').addClass('selr');});function ref(){location.reload(true);}
function getCookie(c_name){var c_value = document.cookie;var c_start = c_value.indexOf(" " + c_name + "=");if (c_start == -1){c_start = c_value.indexOf(c_name + "=");}if (c_start == -1){c_value = null;}else{c_start = c_value.indexOf("=", c_start) + 1;var c_end = c_value.indexOf(";", c_start);if (c_end == -1){c_end = c_value.length;}c_value = unescape(c_value.substring(c_start,c_end));}return c_value;}function setCookie(c_name,value,exdays){var exdate=new Date();exdate.setDate(exdate.getDate() + exdays);var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());document.cookie=c_name + "=" + c_value;}$(document).ready(function(e) {var olduser=getCookie("olduser");if (olduser!=null && olduser!=""){}else{$('body').append('<div id="cookies-overlay"><div class="cookies-overlay"><button type="button" onclick="$(\'#cookies-overlay\').remove();">×</button><p>Utilizamos cookies propias y de terceros para nuestras estadísticas anónimas y para mostrarle publicidad acorde a sus preferencias. Si continúa navegando, consideramos que acepta su uso.<a href="http://www.vitutor.it/informacion_cookies.html" target="_blank"> Más información &gt; </a> </p></div></div>');setCookie("olduser","1",365);}});