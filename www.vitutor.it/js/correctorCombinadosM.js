$(document).ready(function() {
	var dragsAndDropsVar = {};
	var objetoClonado;
	$('.cCampoPuntuacion').val('');
	$('input.cResultPropuestoMultipleInputText').val('');
	$('input.cResultPropuestoInputText').val('');
	$('.cBotonCorregir').attr('disabled',false);
	$("input:radio").attr('disabled',false).removeAttr('checked');
	$('.cResultPropuestoInputText,.cBaseResult,.cExpResult,.cResultPropuestoMultipleInputText').attr('disabled',false);
	$('.cResult').attr('disabled',false);
	$('.cBotonRepetir').css('display','none');
	
	
	$('.cBotonCorregir').click(function (e){
		var context=$(this).parents("section");
	
		var numeroCuestiones=$(context.find('div[id^=cuestion]')).length;
		var numeroCuestionesCorrectas=0;
		var puntuacion;
		
		var registroCorrectas={
			correctas:[],
			incorrectas:[]
		};
		
		var id_seccion = $(this).parents("section").attr("id");
		
		puntuacion=0;
	
		$(context.find(".cOrdenable")).each(function(index, element) {
			var idsInOrder = $(this).sortable("toArray");
			var i=0;
			var ordenacionCorrecta=true;
			var cadAux1,cadAux2,cadAux3;
			var auxDomElement;
			while((i<idsInOrder.length)&&(ordenacionCorrecta)){
				cadAux1=idsInOrder[i];
				cadAux2=cadAux1.split("_");
				if($(this).children('.cSeparador').length==0){
					if((i+1)!=cadAux2[0]){
						ordenacionCorrecta=false;
					}
					i+=1;
				}
				else{
					cadAux3=idsInOrder[i+1].substring(0,3);
					if(((i/2+1)!=cadAux2[0])||(cadAux3!="sep")){
						ordenacionCorrecta=false;
					}
					i+=2;
				}
			}       
			if(ordenacionCorrecta){
				numeroCuestionesCorrectas++;
				registroCorrectas.correctas.push($(this).parents('[id^=cuestion]').attr('id').substring(8,$(this).parents('[id^=cuestion]').attr('id').length));
			}else{
				registroCorrectas.incorrectas.push($(this).parents('[id^=cuestion]').attr('id').substring(8,$(this).parents('[id^=cuestion]').attr('id').length));
			}	
		});
	
		$(context.find(".cCuestionRadio")).each(function(){			
			if($(this).find('input:checked').val()=='b'){
				numeroCuestionesCorrectas++;
				registroCorrectas.correctas.push($(this).attr('id').substring(8,$(this).attr('id').length));				
			}else{
				registroCorrectas.incorrectas.push($(this).attr('id').substring(8,$(this).attr('id').length));
			}
			$(this).find('label[for='+$(this).find('input[value="b"]').attr('id')+']').css({
					'border':'1px solid hsl(140,100%,30%)',
					'box-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
					'-moz-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
					'-webkit-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
					'-o-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
					'padding':'2px',
					'color':'#000',
					'font-weight': 'bold'
				});
		});
		$(context.find(".cCuestionInputText")).each(function(){
			
			var cadAux1=$(this).find("[id^=resultPropuestoInputText]").val().replace(/(^\s*)|(\s*$)/g, "");
			$(this).find("[id^=resultPropuestoInputText]").attr('disabled','disabled');
			$(this).find("[id^=resultPropuestoInputText]").css('background-color','white');
			var resultadosCorrectos=$(this).find("[id^=resultCorrectoInputText]").val().split('_');
			var resultadoCorrecto=false;
			var i=0;
			while((i<resultadosCorrectos.length)&&(!resultadoCorrecto)){
				if(cadAux1==resultadosCorrectos[i]){
					numeroCuestionesCorrectas++;
					registroCorrectas.correctas.push($(this).attr('id').substring(8,$(this).attr('id').length));
					resultadoCorrecto=true;
					$(this).find("[id^=resultPropuestoInputText]").css({
						'border':'1px solid hsl(140,100%,30%)',
						'box-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-moz-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-webkit-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-o-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'padding':'2px',
						'color':'#000',
						'font-weight': 'bold'
					});
				}
				i++;
			}
			if(!resultadoCorrecto){		
				$(this).children(':last-child').children('input').addClass('sal')	;
				registroCorrectas.incorrectas.push($(this).attr('id').substring(8,$(this).attr('id').length));
					$(this).find("[id^=resultPropuestoInputText]").css({'color': "#CD0001",'font-weight': 'bold'/*, 'border-color':'#CD0001'*/});
			}
		});
		$(context.find(".cCuestionPot")).each(function(index, element) {
			$(this).find(".cBaseResult,.cExpResult").attr('disabled','disabled');
			$(this).find(".cBaseResult,.cExpResult").css('background-color','white');
			var cadAux;
			var baseCorrecta;
			var exponenteCorrecto;
			
			cadAux=$(this).find('input[type^=hidden]').attr('value');
			baseCorrecta=cadAux.substr(1,cadAux.indexOf('-')-1);
			exponenteCorrecto=cadAux.substr(cadAux.indexOf('-')+2);	
			if((baseCorrecta==$(this).find('input[id^=resultPropuestoPotBase]').val().replace(/(^\s*)|(\s*$)|[ ]/g, ""))&&(exponenteCorrecto==$(this).find('input[id^=resultPropuestoPotExp]').val().replace(/(^\s*)|(\s*$)|[ ]/g, ""))){
				numeroCuestionesCorrectas++;
				registroCorrectas.correctas.push($(this).attr('id').substring(8,$(this).attr('id').length));
				$(this).find('.cBaseResult,.cExpResult').css({
						'border':'1px solid hsl(140,100%,30%)',
						'box-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-moz-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-webkit-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-o-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'padding':'2px',
						'color':'#000',
						'font-weight': 'bold'
					});
			}else{
				registroCorrectas.incorrectas.push($(this).attr('id').substring(8,$(this).attr('id').length));
				$(this).find('.cBaseResult,.cExpResult').addClass('sal');
			}			
		});
		$(context.find(".cCuestionMultipleInputText")).each(function(index,element){
			var inputCorrectos=0;
		
			$(this).find('input[type=text]').each(function(index, element) {
				var cadAux1=$(this).val().replace(/(^\s*)|(\s*$)/g, "");

				$(this).attr('disabled','disabled');
				$(this).css('background-color','white');
				
				var resultadosCorrectos=$(this).parents('[id^=cuestion]').find("[id^=resultCorrectoMultipleInputText]").val().split(';')[index];
				resultadosCorrectos=resultadosCorrectos.split('_');
			
				var resultadoCorrecto=false;
				var i=0;	
				while((i<resultadosCorrectos.length)&&(!resultadoCorrecto)){
					if(cadAux1==resultadosCorrectos[i]){
						inputCorrectos++;
						resultadoCorrecto=true;
						$(this).css({
							'border':'1px solid hsl(140,100%,30%)',
							'box-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
							'-moz-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
							'-webkit-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
							'-o-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
							'padding':'2px',
							'color':'#000',
							'font-weight': 'bold'
						});
					}
					i++;
				}
				if(!resultadoCorrecto){		
					$(this).addClass('sal');	
				}			
			});
			if(inputCorrectos<$(this).find('input[type=text]').length){
				registroCorrectas.incorrectas.push($(this).attr('id').substring(8,$(this).attr('id').length));
			}else{
				registroCorrectas.correctas.push($(this).attr('id').substring(8,$(this).attr('id').length));
				numeroCuestionesCorrectas++;
			}			
			
		});

		$(context.find(".cCuestionDragNDrop")).each(function(index, element) {
	
			var numeroDrags=$(this).find('.cDrag').length;
			var numeroDeDragsDropped=0;
			var cuestionCorrecta=true;
			for(var i in dragsAndDropsVar[$(this).attr('id')]){
				numeroDeDragsDropped++;
			}
			if(numeroDrags>numeroDeDragsDropped){
				cuestionCorrecta=false;
			}
			for(var i in dragsAndDropsVar[$(this).attr('id')]){
				
				var numeroDragObservado=i.substring(4,i.length);
	
				var numeroCuestion=$(this).attr('id').split("_")[0].substring(8,$(this).attr('id').split("_")[0].length);
	
				if($(context.find('#drag'+numeroCuestion+'_'+numeroDragObservado)).attr('class').split(' ')[1].split("_")[0].substring(1,$(context.find('#drag'+numeroCuestion+'_'+numeroDragObservado)).attr('class').split(' ')[1].split("_")[0].length).toLowerCase()!=dragsAndDropsVar[$(this).attr('id')][i]){
					$(context.find('#drag'+numeroCuestion+'_'+numeroDragObservado)).css({
						'border':'1px solid hsl(15,100%,38%)',
						'box-shadow':'2px 2px 2px hsla(15,100%,38%,1)',
						'-moz-text-shadow':'2px 2px 2px hsla(15,100%,38%,1)',
						'-webkit-text-shadow':'2px 2px 2px hsla(15,100%,38%,1)',
						'-o-text-shadow':'2px 2px 2px hsla(15,100%,38%,1)'
					});
					cuestionCorrecta=false;
				}else{
					$(context.find('#drag'+numeroCuestion+'_'+numeroDragObservado)).css({
						'border':'1px solid hsl(140,100%,30%)',
						'box-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-moz-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-webkit-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)',
						'-o-text-shadow':'2px 2px 2px hsla(140,100%,30%,1)'
					});
				} 			
			}
			$(context.find('.cDrag')).draggable( "option", "disabled", true );
			$(context.find('.cDrag')).css('cursor','default');
			if(!cuestionCorrecta){
				registroCorrectas.incorrectas.push($(this).attr('id').split("_")[0].substring(8,$(this).attr('id').split("_")[0].length));
			}else{
				numeroCuestionesCorrectas++;
				registroCorrectas.correctas.push($(this).attr('id').split("_")[0].substring(8,$(this).attr('id').split("_")[0].length));
			}
			
        });
		
	
		$(context.find(".cCuestionSelect")).each(function(){			 
			var estiloLetra;
			var numeroSelectsCorrectos = 0;
			$(this).find('select').each(function(){
				if($(this).val() == "b"){
					numeroSelectsCorrectos++;
					estiloLetra = "color:hsla(140,100%,30%,1);";

				}else{
					estiloLetra="color:hsla(15,100%,38%,1);";
				}
				var opcionSeleccionada=$(this).find(':selected').html();
				opcionSeleccionada='<div style="'+estiloLetra+'font-style:italic;display:inline-block;width:'+$(this).css('width')+'">'+opcionSeleccionada+'</div>';
				$(this).after(opcionSeleccionada);
			
			});
			if(numeroSelectsCorrectos ==  $(this).find('select').length){
	
				numeroCuestionesCorrectas++;
				registroCorrectas.correctas.push($(this).attr('id').substring(8,$(this).attr('id').length));
				
			}else{
	
				registroCorrectas.incorrectas.push($(this).attr('id').substring(8,$(this).attr('id').length));
			}
			$(this).find('select').remove();
			
			
			
		});
		var imagenParaColocar,altParaColocar;
			
		$(context).find('.cGetImg.cEsProblema').each(function(index, element) {
            if($.inArray($(this).parents('[id^=cuestion]').attr('id').substr(8,$(this).parents('[id^=cuestion]').attr('id').length),registroCorrectas.correctas)==-1){
				imagenParaColocar="mal.html";
				altParaColocar="Resultado incorrecto";
			}else{
				imagenParaColocar="bien.html";
				altParaColocar="Resultado correcto";
			}
			$(this).append('<img src="http://www.vitutor.it/images/'+imagenParaColocar+'" alt="'+altParaColocar+'" class="cImgBienMal">');
			$(this).find('img').fadeIn(1000);
        });
		$(context).find('.cGetImg:not(.cEsProblema)').each(function(index,element){
			
			$(this).wrap('<div class="cImgHook" style="display:inline-block;width:100%;"/>');
	
			
			if($.inArray($(this).parents('[id^=cuestion]').attr('id').split("_")[0].substr(8,$(this).parents('[id^=cuestion]').attr('id').split("_")[0].length),registroCorrectas.correctas)==-1){
				imagenParaColocar="mal.html";
				altParaColocar="Resultado incorrecto";
			}else{
				imagenParaColocar="bien.html";
				altParaColocar="Resultado correcto";
			}
			$(this).parents(".cImgHook").append('<img style="float:right" src="http://www.vitutor.it/images/'+imagenParaColocar+'" alt="'+altParaColocar+'" class="cImgBienMal">');
			$(this).parents('[id^=cuestion]').find('img.cImgBienMal').fadeIn(1000);
		});
		
		
	
	
	
	$(context.find("[id^=contRes]")).each(function(e){
			if((!$(this).hasClass('ssm'))||(($(this).hasClass('ssm'))&&($.inArray($(this).attr('id').substr(7,$(this).attr('id').length),registroCorrectas.incorrectas)!=-1))){
				$(this).fadeIn(2400);
			}
		});
		$(this).attr('disabled','disabled');
		puntuacion=((numeroCuestionesCorrectas/numeroCuestiones)*100).toFixed(2);
		
		
		$(context.find("#campoPuntuacion")).val(puntuacion+' % ');
	
		$(context.find("input:radio")).attr('disabled',true);
	
			$(context.find('.cBotonRepetir')).css('display','inline');
			$(context.find('.cBotonCorregir')).css('display','none');
	});
	
	$('body').on('click','.cBotonRepetir',restablecer);
	
	
	function sortabilizar(ambito){
		ambito.find('.cOrdenable').sortable({
			cancel: "li[id^=sep]",
			placeholder:"placeHolder",
			start: function(event, ui) {
				ui.helper.css("border","none");
			},
			beforeStop: function(event, ui) {
				ui.helper.css("border","1px solid #CDE4CD");
			}
		});
		ambito.find('.cOrdenable').disableSelection();
	}
	
	
	
	
	function dragearYdropear(ambito){
		
		ambito.find('.cCuestionDragNDrop').each(function(index, element) {
        	dragsAndDropsVar[$(this).attr('id')]={};
    	});
		ambito.find('.cDrag').each(function(){
			$(this).draggable();
			$(this).draggable({
				revert:"invalid",
				containment: "#contenedorDragsNDrops"+$(this).parents('[id^=contenedorDragsNDrops]').attr("id").substring(21,$(this).parents('[id^=contenedorDragsNDrops]').attr("id").length), 
				scroll: false,
				snap: ".cDrop", 
				snapMode: "inner",
				stack: '.cDrag'
			});
		});
		ambito.find('.cDrop').each(function(){
			
			$(this).droppable({
				drop: function(event, ui) {
	
						var cuestion=$(this).parents('[id^=cuestion]').attr('id').substring(8,$(this).parents('[id^=cuestion]').attr('id').length);
						var drop=$(this).attr('id').split("_")[1];
						var drag=$(ui.draggable).attr('id').split("_")[1];
						dragsAndDropsVar['cuestion'+cuestion]['drag'+drag]='drop'+drop;
				}
			});
		});
	}
function restablecer(e) {
		
		var me = $(e.target);
		//var contexto = me.parents("section.cEjerciciosIngles"); //Comentado el 22/08/2013
		
		var contexto = me.parents("section");

		var objetoIncrustado = objetoClonado.clone(true,true);
		$(contexto).after(objetoIncrustado);		
		$(contexto).remove();
		dragearYdropear(objetoIncrustado);
		sortabilizar(objetoIncrustado);
}
	
	
	//$('.cBotonCorregir').parents('section.cEjerciciosIngles').each(function(index, element) {//Comentado el 22/08/2013
	$('.cBotonCorregir').parents('section').each(function(index, element) {
    	objetoClonado = $(this).clone(true,true);
    });
	//dragearYdropear($('section.cEjerciciosIngles'));//Comentado el 22/08/2013
	dragearYdropear($('section'));
	sortabilizar($('section'));
});

