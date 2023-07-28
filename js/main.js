$(function(){
	/*
	Header JavaScript

	var agent=navigator.userAgent.toLowerCase();

	if(agent.indexOf("iphone") != -1 || agent.indexOf("android") != -1){
		location.href="mobile/index.html";
	}else{
		location.href="pc/index.html";
	}
	*/

	var n=0; // GNB 1Depth의 이동 번호 변수입니다.
	var distance; // GNB 1Depth의 이동량 변수입니다.
	var total=7; // GNB 1Depth의 전체 메뉴의 개수 변수입니다.

	// GNB 1Depth
	$(window).resize(function(){
		distance=$("#gnb .menu").width()/3;
		// console.log("distance : "+distance);
	});
	$(window).trigger("resize");

	$("#gnb .prev").click(function(e){
		e.preventDefault();
		if(n > 0){
			n--;
			$("#gnb .menu ul").animate({left:n*(-1)*distance});
		}
	});
	$("#gnb .next").click(function(e){
		e.preventDefault();
		if(n < total-3){
			n++;
			$("#gnb .menu ul").animate({left:n*(-1)*distance});
		}
	});

	// Keyvisual
	$(".owl-carousel").owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		items: 1,
		autoplay: true,
		smartSpeed: 400,
	});

	// Search Form
	$(".search").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(".search_open").toggleClass("active");
		$(".search_open input[type=text]").focus();
	});

	// Mobile GNB
	$("#header .tab").click(function(e){
		e.preventDefault();
		$(".wrapper").addClass("ismenu");
		$("#header").addClass("ismenu");
		$("#header .tab").addClass("active");
		$(".gnb_open").addClass("active");
		$("body, html").addClass("prevent");
		$(".gnb_open .location li").first().find("a").focus();
		$(".dim").fadeIn(300);
	});
	$(".dim").click(function(){
		$(".wrapper").removeClass("ismenu");
		$("#header").removeClass("ismenu");
		$("#header .tab").removeClass("active");
		$(".gnb_open").removeClass("active");
		$("body, html").removeClass("prevent");
		$(".dim").fadeOut(300);
		$(".gnb_open .color .tit").removeClass("active");
		$(".gnb_open .color .tit").next(".tab_con").slideUp(300);
		$(".gnb_open .pattern .tit").removeClass("active");
		$(".gnb_open .pattern .tit").next(".tab_con").slideUp(300);
	});
	$(".sns li").last().focusout(function(){
		if($(".gnb_open").hasClass("active")){
			$(".gnb_open .location li").first().find("a").focus();
		}
	});
	$(".gnb_open .color .tit, .gnb_open .pattern .tit").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).next(".tab_con").slideToggle(300);
	});

	// Slim Scroll
	$(".gnb_open_inner").slimscroll({
		height: "100%"
	});

	// Top Button
	$(window).scroll(function(){
		t=$(window).scrollTop();
		// console.log("t : "+t);

		if(t > 180){
			$(".btn_top a").fadeIn(200);
		}else{
			$(".btn_top a").fadeOut(200);
		}
	});
	$(window).trigger("scroll");

	$(".btn_top a").click(function(e){
		e.preventDefault();
		$("body, html").animate({scrollTop:0});
	});

	// Mobile Drag
	var xDown=null; // x 좌표의 클릭 위치 변수입니다.
	var yDown=null; // y 좌표의 클릭 위치 변수입니다.
	var num=0; // 배너 이동 번호 변수입니다.
	var movingOffset=0; // 배너 이동량 변수입니다.
	var productWidth=1920; // 배너 컨테이너 가로 크기 변수입니다.
	var bannerWidth=260; // 하나의 배너 가로 크기 변수입니다.
	// var productTotal=Math.ceil(productWidth/bannerWidth);
	// console.log("productTotal : "+productTotal);
	var productTotal=5; // 배너의 개수 변수입니다.

	document.addEventListener("touchstart", handleTouchStart);
	document.addEventListener("touchmove", handleTouchMove);

	function handleTouchStart(evt){
		xDown=evt.touches[0].clientX;
		yDown=evt.touches[0].clientY;
	}
	function handleTouchMove(evt){
		if(!xDown || !yDown){
			return;
		}

		var xUp=evt.touches[0].clientX;
		var yUp=evt.touches[0].clientY;
		var xDiff=xDown-xUp;
		var yDiff=yDown-yUp;

		if(Math.abs(xDiff) > Math.abs(yDiff)){
			if(xDiff > 0){
				/* left swipe */
				if(num < (productTotal-1)){
					num++;
					movingOffset=bannerWidth*num*(-1);
					$(".hot_issue").animate({left:movingOffset}, 400);
				}
				// console.log("swipe left!!");
			}else{
				/* right swipe */
				if(num > 0){
					num--;
					movingOffset=bannerWidth*num*(-1);
					$(".hot_issue").animate({left:movingOffset}, 400);
				}
				// console.log("swipe right!!");
			}
		}else{
			if(yDiff > 0){
				/* up swipe */
			}else{
				/* down swipe */
			}
		}
		/* reset values */
		xDown=null;
		yDown=null;
	};

	/* Story Tab */
	$("#story .story_list > ul > li").click(function(e){
		e.preventDefault();
		$("#story .story_list > ul > li").removeClass("active");
		$(this).addClass("active");
		$("#story .photo").removeClass("active");
		$(this).children(".photo").addClass("active");
	});
});