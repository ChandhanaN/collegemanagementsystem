$(document).ready(function(){
	$('li.has-child > a').after('<div class="child-menu-btn fa fa-plus"></div>');

	$(document).click(function(e){
		$('body').removeClass('menu-active');
	    $('.close-btn').removeClass('anim');
	    $('.menu ul ul.menu-ul').slideUp();
	    $('.child-menu-btn').removeClass('fa-minus');
	});

	$('.menu-open').click(function(e){
		e.stopPropagation();
	    $('body').addClass('menu-active');
	    setTimeout(function(){
	        $('.close-btn').addClass('anim');
	    },500)
	});

	$('.close-btn').click(function(e){
		e.stopPropagation();
	    $('body').removeClass('menu-active');
	    $(this).removeClass('anim');
	    $('.menu ul ul.menu-ul').slideUp();
	    $('.child-menu-btn').removeClass('fa-minus');
	});

	$('.menu').click(function(e){
		e.stopPropagation();
	});

	//Sub Menu Click Function

	$('.child-menu-btn').click(function(){
		//do this to its sub menu
		$(this).next('ul.menu-ul').slideToggle();
		$(this).toggleClass('fa-minus');

		//do this to all other sub menus excluding the one that is clicked
		$(this).parent('li').siblings().children('ul.menu-ul').slideUp();
		$(this).parent('li').siblings().children('.child-menu-btn').removeClass('fa-minus');
		$(this).parent('li').siblings().children().find('.child-menu-btn').removeClass('fa-minus');

		//this closes all the child sub menus when its parent child button
		//at level 1 is clicked and now you can make multi level menus with ease after 
		//including below code

		$(this).next('ul.menu-ul').children('li.has-child').find('ul.menu-ul').slideUp();
		$(this).next('ul.menu-ul').children('li.has-child').find('.child-menu-btn').removeClass('fa-minus');

	});

});