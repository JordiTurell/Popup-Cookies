/*!
 * ihavecookies - jQuery plugin for displaying cookie/privacy message
 * v0.0.1
 *
 * Copyright (c) 2020 Jordi Turell Nebot (https://jorditurell.com)
 */

const cookies = [
    {
        type: 'Google',
        value: 'google_tag_manager',
        description: 'Las cookies de Google Tag Manager recaban información estándar de inicio de sesión y datos sobre los hábitos de los visitantes de manera anónima.',
        expired: 720
    },
    {
        type: 'Analytics',
        value: 'analytics',
        description: 'Google Analytics la utiliza para distinguir a los usuarios',
        expired: 1
    },
    {
        type: 'Cloud Fire',
        value: 'cloud_fire',
        description: 'Se instaura por el servicio CloudFlare para identificar tráfico web fiable. No corresponde a ninguna identificación de usuario en la aplicación de la web. La cookie tampoco almacena información personal identificable.',
        expired: 1800
    },
    {
        type: 'Facebook',
        value: 'facebook',
        description: 'Esta cookie es de Facebook. Permite medir, optimizar y construir audiencias para campañas de publicidad en Facebook. En particular, permite ver cómo los usuarios navegan cuando acceden a la web de Gala Inseparables y Facebook, para asegurar que la campaña de publicidad de Gala Inseparables en Facebook sea vista por la mayoría de los usuarios que pudiesen estar interesados mediante el análisis del contenido que el usuario ver y con el que interacciona en la web de Gala Inseparables.',
        expired: 9999
    }
];
let firstpopup = null;

$(document).ready(function(){
    if(!getCookie('Accept')){
        $('#Modal_Cookies').modal('show');
    }
    
    for(var a = 0 ; a < cookies.length; a++){
        cookies[a].select = getCookie(cookies[a].value);
    }
});

function OtherPopup(){
    let content = $('#listcookes');
    firstpopup = $(content).html();
    $(content).children().remove();
    let code = '<h5>Configuración de cookies</h5><span id="close"style="position:absolute;top:10px; right:10px; cursor:pointer; font-size:15px; font-weight:bold;">X</span>'+
    '<p>A continuación puedes seleccionar la categoría de cookies que quieres habilitar para que podamos mejorar nuestros servicios y tu experiencia de navegación. Para más información sobre todas las cookies, consulta nuestra <a href="#">política de cookies.</a></p>';
    //listado de cookies
    code += '<ul>'+
    '<li>'+
        '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
        '<path fill-rule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>'+
        '</svg><span>Necesarias</span> <span class="right">Siempre activado</span>'+
    '</li>';
    $.each(cookies, function(index, value){
        code += '<li>'+
            '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
            '<path fill-rule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>'+
            '</svg><span>'+ cookies[index].type +'</span>'+
            '<div class="custom-control custom-switch">'+
                '<label class="switch">'+
                    '<input type="checkbox" name="'+ cookies[index].value +'">'+
                    '<span class="slider round"></span>'+
                '</label>'+
            '</div>'+
        '</li>';
    });
    code +='</ul>';
    code += '<input type="button" value="Guardar Cookies" class="btn btn-primary" style="float:right; margin-top:15px;" id="guardar" />';
    let html = $(content).append(code);
    $('#Modal_Cookies .modal-footer').css({
        height: '0px',
        overflow: 'hidden',
        padding: '0px'
    });
    
    $('#close').on('click', function(){
        Selectchecks(content);
        $(content).children().remove();
        $(content).append(firstpopup);
        $('#Modal_Cookies .modal-footer').css({
            height: 'auto',
            overflow: 'inherit',
            padding: '.75rem'
        });
    });

    $('#guardar').on('click', function(){
        Selectchecks(content);
        $(content).children().remove();
        $(content).append(firstpopup);
        $('#Modal_Cookies .modal-footer').css({
            height: 'auto',
            overflow: 'inherit',
            padding: '.75rem'
        });
    });

    if(getCookie('Accept')){
        LoadChecks(content);
    }else{
        $(content).find('input[type="checkbox"]').each(function(){
            this.click();
            for(var a = 0; a < cookies.length; a++){
                if(this.name === cookies[a].value){
                    if(cookies[a].select != undefined){
                        if(!cookies[a].select){
                            this.click();
                        }
                    }
                }
            }
        });
    }
}

function LoadChecks(content){
    $(content).find('input[type="checkbox"]').each(function(){
        for(var a = 0; a < cookies.length; a++){
            if(cookies[a].value === this.name){
                if(cookies[a].select != undefined){
                    $(this).prop('checked', cookies[a].select);
                }
            }
        }
    });
}

function Selectchecks(content){
    $(content).find('input[type="checkbox"]').each(function(){
        for(var a = 0; a < cookies.length; a++){
            if(cookies[a].value === this.name){
                cookies[a].select = $(this).prop('checked');
            }
        }
    });
}

function acceptCookies(){
    for(var a = 0; a < cookies.length; a++){
        if(cookies[a].select != undefined){
            setCookie(cookies[a].value, cookies[a].select, cookies[a].expired);
        }
    }
    setCookie('Accept', true, 40000);
    $('#Modal_Cookies').modal('hide');
}

/*
* Guardem les cookies
*/
var setCookie = function(name, value, expiry_days) {
    var d = new Date();
    d.setTime(d.getTime() + (expiry_days*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    return getCookie(name);
};
/*
* Agafem la cookies
*/
var getCookie = function(name) {
    var cookie_name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookie_name) === 0) {
            return c.substring(cookie_name.length, c.length);
        }
    }
    return false;
};