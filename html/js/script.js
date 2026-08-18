function $$$(id) {
	return document.getElementById(id);
}
function Forward(url) {
	window.location.href = url;
}
function _postback() {
	return void (1);
}
jQuery.fn.exists = function () { return this.length > 0; }
//----------------------------------------------------------------------------------------------------------------------
function ajaxFunction() {
	var xmlHttp = null;
	try {
		// Firefox, Internet Explorer 7. Opera 8.0+, Safari.
		xmlHttp = new XMLHttpRequest();
	}
	catch (e) {
		// Internet Explorer 6.
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {
				return false;
			}
		}
	}
}

//----------------------------------------------------------------------------------------------------------------------
/**
 *
 * @param obj
 * @returns {string}
 */
function $query(obj) {
	var query = "";
	$(obj).find("input").each(function (i) {
		var t = $(obj).find("input").eq(i);
		if ((t.attr("type") != "checkbox") && (t.attr("type") != "button") && (t.attr("type") != "radio")) {
			if (t.attr("type") != "password") {
				query += "&" + t.attr("name") + "=" + encodeURIComponent(t.val());
			} else {
				query += "&" + t.attr("name") + "=" + document.getElementById(t.attr("name")).value;
			}
		}
		else {
			if (t.attr("type") == "checkbox") {
				if (t.is(":checked"))
					query += "&" + t.attr("name") + "=" + t.attr("value");
			}
			else if (t.attr("type") == "radio") {
				if (t.is(":checked"))
					query += "&" + t.attr("name") + "=" + t.attr("value");
			}
		}
	});
	$(obj).find("textarea").each(function (i) {
		var t = $(obj).find("textarea").eq(i);
		query += "&" + t.attr("name") + "=" + encodeURIComponent(t.val());
	});
	$(obj).find("button").each(function (i) {
		var t = $(obj).find("button").eq(i);
		query += "&" + t.attr("name") + "=" + encodeURIComponent(t.val());
	});
	$(obj).find("select").each(function (i) {
		var t = $(obj).find("select").eq(i);
		query += "&" + t.attr("name") + "=" + encodeURIComponent(t.val());
	});

	return query.substring(1);
}

//----------------------------------------------------------------------------------------------------------------------
function $query_unt(obj) {
	var query = "";
	$(obj).find("input").each(function (i) {
		var t = $(obj).find("input").eq(i);
		if ((t.attr("type") != "button") && (t.attr("type") != "submit") && (t.attr("type") != "reset") && (t.attr("type") != "hidden")) {
			if ((t.attr("type") != "checkbox") && (t.attr("type") != "radio")) {
				t.val('');
			} else {
				t.attr("checked", false);
			}
		} else { }
	});
	$(obj).find("textarea").each(function (i) {
		var t = $(obj).find("textarea").eq(i);
		t.val('');
	});
	return true;
}
//----------------------------------------------------------------------------------------------------------------------
function showLoader() {
	$("#_loading").html("<div style=\"position: fixed; top: 50%; right: 0;left: 0; text-align: center; background: transparent; z-index: 999999999;\"><div class=\"windows8\"> <div class=\"wBall\" id=\"wBall_1\"> <div class=\"wInnerBall\"> </div> </div> <div class=\"wBall\" id=\"wBall_2\"> <div class=\"wInnerBall\"> </div> </div> <div class=\"wBall\" id=\"wBall_3\"> <div class=\"wInnerBall\"> </div> </div> <div class=\"wBall\" id=\"wBall_4\"> <div class=\"wInnerBall\"> </div> </div> <div class=\"wBall\" id=\"wBall_5\"> <div class=\"wInnerBall\"> </div> </div> </div></div>").show().fadeIn(10);
	block = true;
}

//----------------------------------------------------------------------------------------------------------------------
function closeLoader() {
	$("#_loading").html("").hide().fadeOut(100);
	block = false;
}

//----------------------------------------------------------------------------------------------------------------------
function showResult(type, data) {
	closeLoader();
	$("#" + type + "").html(data).hide().fadeIn(100);
	block = false;
}

//----------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
	$('img.lazy').Lazy();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#go-top').stop().animate({
				bottom: '23px'
			}, 150);
		} else {
			$('#go-top').stop().animate({
				bottom: '-50px'
			}, 150);
		}
	});
	$('#go-top').click(function () {
		$('html, body').stop().animate({
			scrollTop: 0
		}, 500, function () {
			$('#go-top').stop().animate({
				bottom: '-50px'
			}, 150);
		});
	});
	// $('input[type="number"]').inputSpinner();
	// $('.auto-number').autoNumeric('init');
});
$(window).load(function () {
	$(".detail-wp img").each(function () {
		var ck = $(this).parent('a').length;
		if ($(this).width() > 100 && ck == 0) {
			$(this).replaceWith('<a class="f-zoom" data-fancybox="photos" href="' + $(this).attr('src') + '">' + $(this)[0].outerHTML + '</a>');
		}
	});
});
$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0 && window.innerWidth > 300) {
			$('.header').addClass('fixed');
		} else {
			$('.header').removeClass('fixed');
		}
	});
});


$('.sl-tour').owlCarousel({
	loop: true,
	nav: false,
	dots: true,
	margin: 0,
	autoplay: false,
	autoplayTimeout: 3000,
	lazyLoad: true,
	items: 1
});

// $(function () {
// 	$('.one-product__slider').slick({
// 		slidesToShow: 1,
// 		slidesToScroll: 1,
// 		asNavFor: '.one-product__slider_navigation',
// 		arrows: false,
// 		dots: false,
// 		infinite: true,
// 		focusOnSelect: true,
// 		fade: true,
// 		cssEase: 'linear'
// 	});
// 	// Slider | one-product-slider
// 	$('.one-product__slider_navigation').slick({
// 		slidesToShow: 4,
// 		slidesToScroll: 1,
// 		arrows: true,
// 		dots: false,
// 		infinite: true,
// 		asNavFor: '.one-product__slider',
// 		focusOnSelect: true,
// 		centerMode: false,
// 		vertical: true,
// 	});
// });


$('.rating-h').owlCarousel({
	loop: false,
	nav: false,
	dots: true,
	autoplay: false,
	autoplayTimeout: 3000,
	lazyLoad: true,
	margin: 0,
	responsive: {
		0: {
			items: 1,
		},
		540: {
			items: 1,
		},
		960: {
			items: 1,
		},
		1100: {
			items: 1,
		}
	}
});
$(function () {
	$(".bb-post-list .bb-post-item").slice(0, 6).show();
	$("#loadMoreNews").on('click', function (e) {
		e.preventDefault();
		$(".bb-post-list .bb-post-item:hidden").slice(0, 6).slideDown();
		if ($(".bb-post-list .bb-post-item:hidden").length == 0) {
			$(".loadMoreNews").addClass('slowsss');
		}
	});
});
$(function () {
	$(".list-gallery .grid-big").slice(0, 4).show();
	$("#loadMorePhoto").on('click', function (e) {
		e.preventDefault();
		$(".list-gallery .grid-big:hidden").slice(0, 4).slideDown();
		if ($(".list-gallery .grid-big:hidden").length == 0) {
			$(".loadMorePhoto").addClass('slowsss');
		}
	});
});
$('.otherproj').owlCarousel({
	loop: true,
	nav: false,
	dots: false,
	margin: 10,
	autoplay: false,
	autoplayTimeout: 3000,
	autoplayHoverPause: true,
	lazyLoad: true,
	responsive: {
		0: {
			items: 1
		},
		540: {
			items: 2,
		},
		960: {
			items: 3,
		},
		1100: {
			items: 3,
		}
	}
});

function change_timkiem(id) {
	$('#tk_tour').val(id);
	$('.item_tab').removeClass('tk_acti');
	$('#item_tab_' + id).addClass('tk_acti');
	$.ajax({
		url: '/action.php',
		type: 'POST',
		data: 'url=change_timkiem&id=' + id,
		dataType: "html",
		success: function (data) {
			showResult("diemden_tk", data);
		}
	});
	return false;
}

$('#_search').on('change', 'input[name="s_type"]', function () {
	var c = $.trim($(this).val());
	var r = $(this).closest('.s-form').find('.load-nuoc-ngoai');
	$.ajax({
		url: '/action.php',
		type: 'POST',
		data: {
			'url': 'box_search',
			'type': 'select',
			'choice': c
		},
		dataType: 'html',
		success: function (rs) {
			r.html(rs);
		}
	});
	return false;
});

// $(function () {

// 	$("#booking_date").datepicker({
// 		changeMonth: true,
// 		changeYear: true,
// 		minDate: +0,
// 		dateFormat: 'dd/mm/yy'
// 	});
// });
// $(function () {
// 	$("#booking_date1").datepicker({
// 		changeMonth: true,
// 		changeYear: true,
// 		minDate: +0,
// 		dateFormat: 'dd/mm/yy'
// 	});
// });
$(function () {
	$('.tour-tn-list').owlCarousel({
		loop: true,
		nav: false,
		dots: false,
		margin: 20,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		lazyLoad: true,
		responsive: {
			0: {
				items: 1.3,
				nav: false
			},
			420: {
				items: 1.3,
				nav: false
			},
			768: {
				items: 2.3,
				margin: 16,
				nav: false
			},
			1100: {
				items: 4,
				loop: false,
			}

		}
	});
});
$(function () {
	$('.slide-t-mb').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		margin: 16,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		lazyLoad: true,
		responsive: {
			0: {
				items: 1.3,
				nav: false
			},
			420: {
				items: 1.3,
				nav: false
			},
			768: {
				items: 2,
				nav: false
			},
			1100: {
				items: 4
			}
		}
	});
});
// $(function () {
// 	$('#_partners').owlCarousel({
// 		loop: true,
// 		nav: false,
// 		dots: false,
// 		margin: 50,
// 		autoplay: true,
// 		autoplayTimeout: 1000,
// 		autoplayHoverPause: true,
// 		smartSpeed: 1000,
// 		responsive: {
// 			0: {
// 				items: 3
// 			},
// 			540: {
// 				items: 4,
// 			},
// 			960: {
// 				items: 5,
// 			},
// 			1100: {
// 				items: 6,
// 				margin: 60
// 			}
// 		}
// 	});
// });
$(function () {
	$('#_ratings').owlCarousel({
		loop: true,
		nav: false,
		dots: false,
		margin: 24,
		autoplay: true,
		autoplayTimeout: 2000,
		autoplayHoverPause: true,
		lazyLoad: true,
		responsive: {
			0: {
				items: 1
			},
			540: {
				items: 2,
			},
			960: {
				items: 3,
			},
			1100: {
				items: 3,
			}
		}
	});
});

function open_book(id) {
	$.post('/action.php?url=open_book&lang=' + language + '&id=' + id, function (html) {
		$('#_modal').html(html).modal();
		$("#_modal").modal({
			escapeClose: false,
			showClose: true
		});
	});
}
function open_book2(id) {
	$.post('/action.php?url=open_book&lang=' + language + '&id=' + id, function (html) {
		$('#_modal').html(html).modal();
		$("#_modal").modal({
			escapeClose: false,
			showClose: true
		});
	});
}

function open_hotel(id, hotel_id) {
	$.post('/action.php?url=open_hotel&lang=' + language + '&id=' + id + '&hotel_id=' + hotel_id, function (html) {
		$('#_modal').html(html).modal();
		$("#_modal").modal({
			escapeClose: false,
			showClose: true
		});
	});
}
function open_apartment(id, hotel_id) {
	$.post('/action.php?url=open_apartment&lang=' + language + '&id=' + id + '&hotel_id=' + hotel_id, function (html) {
		$('#_modal').html(html).modal();
		$("#_modal").modal({
			escapeClose: false,
			showClose: true
		});
	});
}
function open_car(id) {
	$.post('/action.php?url=open_car&lang=' + language + '&id=' + id, function (html) {
		$('#_modal').html(html).modal();
		$("#_modal").modal({
			escapeClose: false,
			showClose: true
		});
	});
}
function open_code(id) {
	$.post('/action.php?url=open_code&id=' + id, function (html) {
		$('#_modal').html(html).modal();
		$("#_modal").modal({
			escapeClose: false,
			showClose: true
		});
	});
}


function sendMail(type, id) {
	var dataList = $query('#' + id);
	showLoader();
	$.ajax({
		url: '/action.php',
		type: 'POST',
		data: 'url=' + type + '&' + dataList,
		dataType: "html",
		success: function (data) {
			closeLoader();
			$query_unt('#' + id);
			alert(data);
			// setTimeout(function () {
			// 	window.location.reload();
			// }, 5000);
		}
	});
	return false;
}


$(function () {

	// Vars
	var modBtn = $('#modBtn4'),
		modal = $('#modal4'),
		close = modal.find('.close'),
		modContent = modal.find('.modal-content');

	// open modal when click on open modal button
	modBtn.on('click', function () {
		modal.css('display', 'block');
		modContent.removeClass('modal-animated-out').addClass('modal-animated-in');
	});

	// close modal when click on close button or somewhere out the modal content
	$(document).on('click', function (e) {
		var target = $(e.target);
		if (target.is(modal) || target.is(close)) {
			modContent.removeClass('modal-animated-in').addClass('modal-animated-out').delay(300).queue(function (next) {
				modal.css('display', 'none');
				next();
			});
		}
	});

});

$('.link-a-close').click(function () {
	$('#modal4').css('display', 'none');
});
$('.close').click(function () {
	$('#modal4').css('display', 'none');
});
var lastScrollTop = 0;

$(window).scroll(function () {
	if ($(window).width() < 961) {
		var st = $(this).scrollTop();
		if (st > lastScrollTop && st > 50) {
			$('.header').css('opacity', '0');
		} else if (st < lastScrollTop && st > 50) {
			$('.header').css('opacity', '1');
		} else if (st <= 50) {
			$('.header').css('opacity', '1');
		}
		lastScrollTop = st;
	}
});

$(document).ready(function () {

	$("div.ten_lt").click(function () {

		$(this).next("div.noi_dung_lichtrinh").slideToggle(300).siblings("div.noi_dung_lichtrinh").slideUp(100);


	});
})


// var mydisabledDates = "[2020-12-25 12:00, 2020-12-26 12:00]";
// var disabledDates = mydisabledDates.replace("[", "")
// 	.replace("]", "")
// 	.split(',')
// 	.map(d => new Date(d.trim()));

// $("#booking_date3").datepicker({
// 	format: "yyyy-mm-dd",
// 	daysOfWeekDisabled: [0, 6],
// 	datesDisabled: disabledDates // <- Use new object
// });

// $('#date_departure').datepicker({
// 	dateFormat: 'dd-mm-yy', // format tương đương với yyyy-mm-dd
// 	minDate: 0 // không cho chọn ngày trước hôm nay
// });


const projectBoxs = document.querySelectorAll(' .menuactive');
projectBoxs.forEach((item, index) => {
	item.onmouseover = function () {
		document.querySelector('.menuactive.active').classList.remove('active');
		this.classList.add('active');
	}
})


jQuery(document).ready(function ($) {
	var filter = $('.search-detail');
	var category_id = filter.find('.for-type').val();
	filter.on('click change', '.list-group-item ', function () {
		var countc = 0;
		var list = [];
		var elemet = $(this);
		const url = new URL(window.location.href);
		const params = url.searchParams;

		if (elemet.hasClass('active')) {
			elemet.removeClass('active');
		} else {
			elemet.addClass('active');
		}
		filter.find('.list-group-item.tiennghi.active').each(function (i) {
			let tiennghi = parseInt($(this).attr('data-typer'));
			list.push({
				tiennghi: tiennghi,
			});
		});
		filter.find('.list-group-item.hangks2.active').each(function (i) {
			let hangks = $(this).attr('data-hangks');
			list.push({
				hangks: hangks,
			});
		});
		$.ajax({
			url: '/action.php',
			type: 'POST',
			data: {
				url: 'filter',
				type: 'loc',
				category_id: category_id,
				list: list,
				key: params.get('key'),
				lang: G_web['LANG']
			},
			dataType: 'json',
			success: function (data) {
				if (data.count > 0) {
					for (i = 0; i < data.count; i++) {
						var xhtml = "";
						for (i = 0; i < data.count; i++) {
							xhtml += "<div class='pdt-item clearfix'><div class='box bb--hotel'>";
							xhtml += "<div class='img'><a href='" + data.msg[i].slug + "'><img src=\"/uploads/hotel/" + data.msg[i].image + "\"/></a></div>";
							xhtml += "<div class='float-info'>";
							if (data.msg[i].code != '' && data.msg[i].code != 0) {
								xhtml += "<span class=\"sale\"><i class=\"fa-light fa-tag\"></i>&nbsp;Sale " + data.msg[i].code + "%</span>";
							}
							if (data.msg[i].hot == 1) {
								xhtml += "<span class=\"hot\"><i class=\"fa fa-fire\"></i>&nbsp;Hot</span>";
							}
							xhtml += "</div>";
							xhtml += "<div class='txt'>";
							xhtml += "<h3 class='title-hotel'><a href='" + data.msg[i].slug + "'>" + data.msg[i].ten + "</a></h3>";
							xhtml += "<div class='sm-info'><p><i class=\"fa-light fa-location-dot\"></i>" + data.msg[i].maps + "</p>\n";
							xhtml += "<p><i class=\"fa-light fa-paper-plane\"></i>" + data.msg[i].comment + "</p></div>";
							xhtml += " <p class='pdt-price' " + data.msg[i].css_sale + "><span>" + data.msg[i].price + "</span></p>";
							xhtml += "<div class='price-2'>";
							xhtml += "<p class='text'>Chi phí</p><p class='number'><span>" + data.msg[i].price2 + "</span></p>";
							xhtml += "</div>";
							xhtml += "</div>";
							xhtml += "</div>";
							xhtml += "</div></div>";

						}
					}
					$('.bb-hotel-list').html(xhtml);
					$('.page-ht .page-navigation').css('display', 'none')
				} else {
					$('.bb-hotel-list').html('');
				}


			}
		});
	})
});


$(function () {
	$(".gallery-list-tv .item-images").slice(0, 16).show();
	$("#loadMorePhoto").on('click', function (e) {
		e.preventDefault();
		$(".gallery-list-tv .item-images:hidden").slice(0, 16).slideDown();
		if ($(".gallery-list-tv .item-images:hidden").length == 0) {
			$(".loadMorePhoto").addClass('slowsss');
		}
	});
});
$(document).ready(function () {
	$("#myModal_p").modal();
});
$(document).ready(function () {
	$("#myModal_p_mb").modal();
});

function open_tienich(id, type) {
	$.post('/action.php?url=open_tienich&id=' + id + '&type=' + type, function (html) {
		$(html).appendTo('body').modal();
	});
}
var defaultImagePath = $(".text-item:first").data("image");
$(".image-container img").attr("src", defaultImagePath);
$(".text-item:first").find(".sub-info").show();
$(".text-item:first").find("h2").css("color", "#035449");

$(".text-item").hover(
	function () {
		var imagePath = $(this).data("image");

		// Hiển thị hình ảnh trong .image-container
		$(".image-container img").attr("src", imagePath).show("fast");
		$(".text-item").find("h2").css("color", "#1f1f1f");
		$(this).find("h2").css("color", "#035449");
	},
	function () {
		setTimeout(function () {
			if (!$(".text-item").is(":hover")) {
				$(".image-container img").attr("src", defaultImagePath);
			}
		}, 200);
	}
);
$(".text-item").on("mouseenter", function () {
	$(".text-item .sub-info").hide();
	$(this).find(".sub-info").show();
});
$(".text-item").on("mouseleave", function () {
	$(".text-item .sub-info").hide();
	$(this).find(".sub-info").show();
});
function load_tour(id) {
	$.ajax({
		url: '/action.php',
		method: 'POST',
		data: { url: 'load_tour', id: id },
		success: function (data) {
			$('#load-tour').html(data);
		}
	});
}
const textLang = {
	vi: {
		txt_pl_search: "Khám phá cuộc phiêu lưu của bạn - tìm kiếm bất kỳ điểm đến",
		txt_pl_search2: "Ví dụ: Đà Nẵng, Hà Nội, Quảng Bình, Quảng Nam,...",
	},
	en: {
		txt_pl_search: "Search your tour - search destination",
		txt_pl_search2: "For example: Da Nang, Ha Noi, Quang Binh, Quang Nam,...",
	},
}
$(document).ready(function () {
	$('.s_header ._mns').click(function () {
		var $this = $(this);
		$('.s_header ._mns').removeClass('active');
		$this.addClass('active');
		$('._fsearch').removeClass('show');
		$('.form_' + $this.data('form')).addClass('show');
	});
	let data_search = {};
	const texts = [textLang[language].txt_pl_search, textLang[language].txt_pl_search2];
	const speed = 50;       // Tốc độ gõ từng ký tự (ms)
	const delay = 2000;     // Thời gian chờ trước khi bắt đầu (ms)
	const pause = 1500;     // Thời gian chờ sau mỗi dòng gõ xong (ms)
	let textIndex = 0;      // Dòng hiện tại
	let charIndex = 0;      // Ký tự hiện tại
	function typeText() {
		const currentText = texts[textIndex];
		if (charIndex <= currentText.length) {
			$('#key_s_tour').attr('placeholder', currentText.slice(0, charIndex));
			charIndex++;
			setTimeout(typeText, speed);
		} else {
			// Sau khi gõ xong 1 dòng, đợi 1 chút rồi gõ dòng tiếp theo
			setTimeout(() => {
				textIndex = (textIndex + 1) % texts.length; // quay vòng
				charIndex = 0;
				typeText();
			}, pause);
		}
	}

	// Bắt đầu sau 2s
	setTimeout(typeText, delay);

	const ajax1 = $.ajax({
		url: '/action.php',
		method: 'GET',
		data: { url: 'get_tour', lang: G_web['LANG'] },
		dataType: 'json'
	});

	const ajax2 = $.ajax({
		url: '/action.php',
		method: 'GET',
		data: { url: 'get_hotel', lang: G_web['LANG'] },
		dataType: 'json'
	});

	$.when(ajax1, ajax2).done(function (res1, res2) {
		data_search.tour = res1[0].data;
		data_search.hotel = res2[0].data;
	});

	$('form input[name="key"]').on('input', function () {
		const $this = $(this);
		const vs = $this.closest('form').data('vs');
		$this.next().addClass('show');
		const keyword = $this.val().toLowerCase().trim();
		const results = data_search[vs].filter(item => {
			const slug = item.slug.toLowerCase().replace(/-/g, ' ');
			const name = item.name.toLowerCase();
			return slug.includes(keyword) || name.includes(keyword);
		});

		// Hiển thị kết quả ra console (bạn có thể render ra giao diện sau)
		const result = results.map(item => {
			return `<div class="item" data-value="${item.name}">
            <div class="avt">
                <img src="${item.img}" onerror="this.src='/images/avt.jpg" alt="${item.name}">
            </div>
            <div class="name">${item.name}</div>
        </div>`;
		}).join('');
		$this.next().children('.list').html(result);
	});
	$('.rs_search').on('click', '.item', function () {
		const $this = $(this);
		$this.closest('._input').find('input[name="key"]').val($this.data('value'));
		$this.closest('.rs_search').removeClass('show');
	})
	$(document).on('click', function (e) {
		if (!$(e.target).closest('._fsearch ._input:nth-child(1)').length) {
			$('.rs_search').removeClass('show');
		}
	});
});

const localeData = {
	vi: {
		weekdays: {
			shorthand: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
			longhand: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
		},
		months: {
			shorthand: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
			longhand: [
				'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
				'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
			]
		}
	},
	en: {
		weekdays: {
			shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		},
		months: {
			shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			longhand: [
				'January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December'
			]
		}
	}
};
const commonOptions = {
	enableTime: false,
	locale: {
		firstDayOfWeek: 1,
		weekdays: {
			shorthand: localeData[language].weekdays.shorthand,
			longhand: localeData[language].weekdays.longhand,
		},
		months: {
			shorthand: localeData[language].months.shorthand,
			longhand: localeData[language].months.longhand,
		},
	},
	formatDate: (date, format, locale) => {
		const day = locale.weekdays.shorthand[date.getDay()];
		const dateNum = date.getDate();
		const month = locale.months.longhand[date.getMonth()];
		const year = date.getFullYear();
		return `${day}, ${dateNum} ${month}, ${year}`;
	}
};
flatpickr(".date_range", {
	...commonOptions,
	mode: 'range'
});
flatpickr("#date_go", {
	...commonOptions,
	minDate: "today",
	onChange: function (selectedDates) {
		if (selectedDates.length) {
			const timestamp = Math.floor(selectedDates[0].getTime() / 1000);;

			document.querySelector("#_s_tour input[name='date_go']").value = timestamp;
		}
	}
});

// xử lý ap dụng flatpickr cho các thẻ input có class date_select
document.querySelectorAll('.date_select').forEach(input => {
    const useTimestamp = input.dataset.timestamp === 'true';
    const mode = input.dataset.mode || 'single';

    flatpickr(input, {
        ...commonOptions,
        mode: mode,
        // giá trị thực gửi lên server -> ISO Y-m-d (đơn) hoặc timestamp (nếu useTimestamp)
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d-m-Y",
        allowInput: false,
        minDate: "today",
        // bắt buộc dùng flatpickr trên mobile để minDate có hiệu lực
        disableMobile: true,
        onChange: function (selectedDates, dateStr, instance) {
            if (!selectedDates || !selectedDates.length) return;

            if (mode === 'range') {
                // nếu cần lưu range, lưu dưới dạng "YYYY-MM-DD|YYYY-MM-DD" hoặc timestamp
                if (selectedDates.length < 2) return;
                const a = selectedDates[0], b = selectedDates[1];
                if (useTimestamp) {
                    instance.input.value = `${Math.floor(a.getTime()/1000)}|${Math.floor(b.getTime()/1000)}`;
                } else {
                    instance.input.value = `${instance.formatDate(a, "Y-m-d")}|${instance.formatDate(b, "Y-m-d")}`;
                }
            } else {
                const d = selectedDates[0];
                if (useTimestamp) {
                    instance.input.value = Math.floor(d.getTime() / 1000);
                } else {
                    instance.input.value = instance.formatDate(d, "Y-m-d");
                }
            }

            // kích hoạt event change để validator/form xử lý
            instance.input.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
});

function formatDate(date, useShorthand = true, lang = language) {
	const d = new Date(date);
	const locale = localeData[lang] || localeData.vi;

	const dayName = useShorthand
		? locale.weekdays.shorthand[d.getDay()]
		: locale.weekdays.longhand[d.getDay()];

	const monthName = useShorthand
		? locale.months.shorthand[d.getMonth()]
		: locale.months.longhand[d.getMonth()];

	return `${dayName}, ${d.getDate()} ${monthName}, ${d.getFullYear()}`;
}
// const thu = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
// const thang = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
// 	'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'];

// function formatDateVN(date) {
// 	const d = new Date(date);
// 	return `${thu[d.getDay()]}, ${d.getDate()} ${thang[d.getMonth()]}, ${d.getFullYear()}`;
// }
function calculateNights(checkIn, checkOut) {
	// Chuyển đổi ngày sang milliseconds
	const timeDiff = checkOut.getTime() - checkIn.getTime();

	// Chuyển đổi milliseconds sang ngày (1 ngày = 24 * 60 * 60 * 1000 ms)
	const dayDiff = timeDiff / (1000 * 3600 * 24);

	// Làm tròn xuống để lấy số ngày nguyên
	return Math.floor(dayDiff);
}
// Thêm biến cờ để tránh lặp vô hạn
let isUpdating = false;

// var picker3 = flatpickr("#start_date", {
// 	...commonOptions,
// 	mode: "range",
// 	minDate: "today",
// 	onChange: function (selectedDates) {
// 		if (isUpdating) return; // Nếu đang cập nhật thì bỏ qua
// 		if (selectedDates.length === 2) {
// 			isUpdating = true; // Đánh dấu đang cập nhật
// 			const [checkIn, checkOut] = selectedDates;
// 			picker4.setDate([checkIn, checkOut], false); // Không trigger onChange
// 			isUpdating = false; // Hoàn thành cập nhật
// 			document.querySelector('#start_date').value = formatDateVN(checkIn);
// 			document.querySelector('#end_date').value = formatDateVN(checkOut);
// 			if (document.querySelector('#count_night')) {
// 				document.querySelector('#count_night').innerHTML = `${calculateNights(checkIn, checkOut)}<i class="fa-solid fa-moon"></i>`;
// 			}
// 		}

// 	}
// });

// var picker4 = flatpickr("#end_date", {
// 	...commonOptions,
// 	mode: "range",
// 	minDate: "today",
// 	onChange: function (selectedDates) {
// 		if (isUpdating) return; // Nếu đang cập nhật thì bỏ qua
// 		if (selectedDates.length === 2) {
// 			isUpdating = true; // Đánh dấu đang cập nhật
// 			const [checkIn, checkOut] = selectedDates;
// 			picker3.setDate([checkIn, checkOut], false); // Không trigger onChange
// 			isUpdating = false; // Hoàn thành cập nhật
// 			document.querySelector('#start_date').value = formatDateVN(checkIn);
// 			document.querySelector('#end_date').value = formatDateVN(checkOut);
// 		}
// 	}
// });

var picker = flatpickr("#date_nhan", {
	...commonOptions,
	mode: "range",
	minDate: "today",
	onChange: function (selectedDates) {
		if (isUpdating) return; // Nếu đang cập nhật thì bỏ qua
		if (selectedDates.length === 2) {
			isUpdating = true; // Đánh dấu đang cập nhật
			const [checkIn, checkOut] = selectedDates;
			picker2.setDate([checkIn, checkOut], false);
			// if (picker3 && picker4) {
			// 	picker3.setDate([checkIn, checkOut], false);
			// 	picker4.setDate([checkIn, checkOut], false);
			// }
			isUpdating = false; // Hoàn thành cập nhật
			document.querySelector('#date_nhan').value = formatDate(checkIn);
			document.querySelector('#date_tra').value = formatDate(checkOut);
			if (document.querySelector('#count_night')) {
				document.querySelector('#count_night').innerHTML = `${calculateNights(checkIn, checkOut)}<i class="fa-solid fa-moon"></i>`;
			}
			// if (document.querySelector('#end_date') && document.querySelector('#start_date')) {
			// 	document.querySelector('#start_date').value = formatDateVN(checkIn);
			// 	document.querySelector('#end_date').value = formatDateVN(checkOut);
			// }
		}

	}
});

var picker2 = flatpickr("#date_tra", {
	...commonOptions,
	mode: "range",
	minDate: "today",
	onChange: function (selectedDates) {
		if (isUpdating) return; // Nếu đang cập nhật thì bỏ qua
		if (selectedDates.length === 2) {
			isUpdating = true; // Đánh dấu đang cập nhật
			const [checkIn, checkOut] = selectedDates;
			picker.setDate([checkIn, checkOut], false);
			// if (picker3 && picker4) {
			// 	picker3.setDate([checkIn, checkOut], false);
			// 	picker4.setDate([checkIn, checkOut], false);
			// }
			isUpdating = false; // Hoàn thành cập nhật
			document.querySelector('#date_nhan').value = formatDate(checkIn);
			document.querySelector('#date_tra').value = formatDate(checkOut);
			if (document.querySelector('#count_night')) {
				document.querySelector('#count_night').innerHTML = `${calculateNights(checkIn, checkOut)}<i class="fa-solid fa-moon"></i>`;
			}
			// if (document.querySelector('#end_date') && document.querySelector('#start_date')) {
			// 	document.querySelector('#start_date').value = formatDateVN(checkIn);
			// 	document.querySelector('#end_date').value = formatDateVN(checkOut);
			// }
		}
	}
});

$('.box-sear-lt').on('change', 'select[name="hotel"]', function () {
	var hotel_id = $(this).val();
	$('#myModal').find('select[name="hotel_id"]').val(hotel_id).attr('selected', true);
}).on('change', 'input[name="soluong"]', function () {
	var qty = $(this).val();
	$('#myModal').find('input[name="soluong"]').val(qty).attr('selected', true);
});

document.querySelectorAll('.slimselect').forEach(el => {
	var v_search = el.getAttribute('data-search') === 'true' || el.getAttribute('data-search') !== null ? true : false;

	new SlimSelect({
		select: el,
		settings: {
			showSearch: v_search
		}
	})
})
