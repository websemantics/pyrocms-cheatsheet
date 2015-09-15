/**
 * @package    PyroCMS 3 Cheat Sheet 
 * @author     Web Semantics, Inc. Dev Team <info@websemantics.ca>
 * @author     Musbah (Adnan) Sagar, PhD <adnan@websemantics.ca>
 * @copyright  2011-2015 Web Semantics, Inc.
 * @link       http://websemantics.ca
 * @license    https://opensource.org/licenses/MIT 
 */

$(function(){

	var lights = true;

	$(document)
	  .ready(function() {
	    $(document).click(function(e) {$("body").unhighlight();});
	    $('.main.menu').visibility({type: 'fixed'});
	    $('.ui.checkbox').checkbox().click(function(){
	      lightsToggle(lights = !lights);
	    });
	    $('#search-btn').click(highlight);
	    $('#search-input').keypress(function (e) {
	      if (e.which == 13) {
	        highlight();
	        return false;
	      }
	    });
	    lightsToggle(lights);
	    $("h2").highlight("Error");
	  });

	function lightsToggle(lights){
	  // summery:
	  //  Toggle page from dark to light theme
	  
	  $('.main.menu')[ lights ? 'removeClass' : 'addClass']('inverted');
	  $('#container')[ lights ? 'removeClass' : 'addClass']('inverted');
	  $('body, h3')[ lights ? 'removeClass' : 'addClass']('inverted');
	  $('#lights-label').text( lights ? 'Lights On' : 'Lights Off');
	  $('#logo')[ lights ? 'show' : 'hide']();
	  $('#logo-inverted')[ lights ? 'hide' : 'show']();
	}

	function highlight(event){
	  // summery:
	  //  Find words on page
	  
	  if(event)  
			event.stopPropagation()	  
		var value = $('#search-input').val();
	  $("body").highlight(value);
	}
});
