$(document).ready(function(){
// JavaScript Document
var cad1,cad3,cad2,cad4;
cad1="mai";
cad4="tutor.com";
cad3="licidad@vi";
cad2="lto:pub";
$("#miCP img").css('cursor','pointer');$("#miCP img").click(function(e) {window.location.href = cad1+cad2+cad3+cad4;});$("#miCP").children('img').hover(function(e){$(this).attr('src','../www.vitutor.it/images/publicidadmail_hover.png');},function(e){$(this).attr('src','../www.vitutor.it/images/publicidadmail.png');});
});