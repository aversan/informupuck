//inforumpack
if (typeof system !== "object") {
	system = {};
}

//company categories
var companyCategories = null;

$.ajax({
	dataType: "JSON",
	url: "/ajax/json/companyCategories.json",
	success: (function (data) {
		companyCategories = data;
	})
});

$(window).ready(function () {
	$("*[data-timer]").each(function () {
		hideOnTimer(this);
	});
});

function hideOnTimer(that) {
	setTimeout(function () {
		$(that).animate({
			opacity: 0
		}, 500);
	}, parseFloat($(that).data("timer")) * 1000);
}

$(function () {
	//select block
	$('*[data-i-select]').select_block({
		max_height: 500,
		title: "Выберите категорию",
		search_title: "Введите название",
		notfound: "Не найдено"
	});
	$('[data-name=cat_1]').on('choose', function (event, value) {});

	//checkbox registration
	if (Modernizr.touch) {
		$('input.checkbox[type=checkbox]').on('click', function (event) {
			event.preventDefault();
			return event.stopPropagation();
		}).on('touchend', function (event) {
			var t = $(this);
			event.preventDefault();
			event.stopPropagation();
			if (t.is(':checked')) {
				return t.prop('checked', false);
			} else {
				return t.prop('checked', true);
			}
		});
	}

	$('.indeks-spisok .indeks-name2 span').bind('marquee', function () {
		if (parseFloat($(this).width()) <= parseFloat($(this).parent().width())) {
			return;
		}
		var ob = $(this);
		var left = 20;
		var ww = left + ob.width() - ob.parent().width();
		ob.css("left", left);
		ob.mouseover(function () {
			ob.animate({
				left: -ww
			}, 5000, 'linear', function () {
				ob.trigger('marquee');
			});
		});
		ob.mouseleave(function () {
			ob.stop().css("left", left);
		});
	}).trigger('marquee');

	$("body").on("click mouseup", function (e) {
		if ($(".psevdoselect ul").length > 0) {
			var div = $(".psevdoselect").parent();
			if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0) { // и не по его дочерним элементам
				div.find(".active").removeClass("active"); // скрываем его
			}
		}
	});
	//$.mask.definitions['~']='[+?]';
	//$.mask.definitions['N']='[0-9?]';
	//$("input[name^='PROPERTY[89]']").mask("9 (999) 999-99-99");
	/*commented
	$("input[name^='PROPERTY[89]']").mask("?999 (?9999) 999?-99-99", {
		placeholder: " "
	});
	*/

	/*$('#med-slider').slick({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 0,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:5000,
		dotsClass:"slide-pagi"
	});*/
	/*$('#med-slider').slick({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 0,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:5000,
		dotsClass:"slide-pagi"
	});*/
	/*$('.med-slider:not(.tovar)').slick({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 0,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:5000,
		dotsClass:"slide-pagi"
	});*/

	var  $mainSlider = $('#main_slider');

	$mainSlider.on('init', function () {
		$('<span id="main_slider_slide_n"></span>').insertAfter($mainSlider.find('.slide-pagi'));
	});

	$mainSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#main_slider_slide_n').text(i + '/' + slick.slideCount);
		$(".frametube").fancybox({
			'transitionIn'	: 'none',
			'transitionOut'	: 'none'
		});
    });

	$mainSlider.slick({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		dotsClass: "slide-pagi",
		autoplay: true,
		autoplaySpeed: 5000
	});



	$(".nano").nanoScroller();

	$(".submit-company").on("click", function () {
		$("form[name='iblock_add']").submit();
		return false;
	});
	$(".submit-profile").on("click", function () {
		$("form[name='form-profile']").submit();
		return false;
	});
	$("a.logo-file-btn").on("click", function () {
		$("input#logo-file-btn").click();
		return false;
	});

	$(".lk-input-line .input-add").on("click", function () {
		var template = $(this).parent().find(".input-lk-line.template").clone(),
			validate = $(this).parent().find('.validate-error').eq(0).clone(), //just 1
			lastId = parseInt($(this).parent().find(".input-lk-line.v-activ").last().data("id")),
			lastPid = $(this).parent().find(".input-lk-line.v-activ").last().data("pid");
		template.attr("name", "PROPERTY[" + lastPid + "][" + (lastId + 1) + "]").data("id", (lastId + 1)).data("pid", lastPid).addClass("v-activ").removeClass("template").css("margin-top", "15px");
		$(this).parent().append(template);
		$(this).parent().append(validate);
		/*commented
		if (lastPid == 89) {
			$("input[name^='PROPERTY[89]']").mask("9 (999) 999-99-99");
		}
		*/
	});

	$("span.telephone,.list__item.phone_company").on("click", "span.magick-show", function () {
		dataS = $(this).data("info");
		$.ajax({
			type: "POST",
			url: "/ajax/content/gif.php",
			data: {
				"show": dataS
			},
			success: function (msg) {
				$("span.telephone  img, .list__item.phone_company .telephone img").attr("src", "data:image/gif;base64," + msg).show();
				$("span.telephone  i, .list__item.phone_company .telephone i").html("");
				$("span.telephone  span.magick-show,.list__item.phone_company .list__item-secondary-content").css("visibility", "hidden");

			}
		});
		$.ajax({
			type: "POST",
			url: "/ajax/content/phone.php",
			data: {
				"show": dataS
			},
			success: function (msg) {
				$("#modal-phone .typography--display-2").html(msg);
			}
		});
	});

	$("a.izbr-link.f_swith").on("click", function () {
		var tab = $(this);
		var target = tab.data("id");

		var lasttarget = $("a.izbr-link.f_swith.active").data("id");

		$("a.izbr-link.f_swith.active").removeClass("active");

		tab.addClass("active");

		$(".tab_favorites .lk-izbr-block.tab-" + lasttarget).fadeOut(300, function () {
			$(".tab_favorites .lk-izbr-block.tab-" + target).fadeIn(300);
		});

	});
	$(".pokazat.fulltext").on("click", function () {
		$(".pokazat.fulltext").hide();
		$(".detail_info").show();
	});

	//котировки
	if (typeof datasets !== 'undefined' && datasets !== null) {
		var i = 0;
		$.each(datasets, function (key, val) {
			val.color = i;
			++i;
		});

		// insert checkboxes
		var choiceContainer = $(".indeks-spisok");
		var firstStat = "checked='checked'";
		$.each(datasets, function (key, val) {
			$("#checked-" + val.id).append("<input type='checkbox' name='" + key + "' " + firstStat + " id='id" + key + "'>");
			if (firstStat != "") {
				$(".linecheck-" + val.id).addClass("active");
			}
			firstStat = "";
		});

		choiceContainer.find("input").click(plotAccordingToChoices);

		function plotAccordingToChoices() {
			var data = [];
			choiceContainer.find("input:checked").each(function () {
				var key = $(this).attr("name");
				if (key && datasets[key]) {
					data.push(datasets[key]);
				}
			});
			if (data.length > 0) {
				$.plot("#placeholder", data, {
					yaxis: {
						min: 0
					},
					grid: {
						hoverable: true
					},
					xaxis: {
						tickDecimals: 0
					},
					points: {
						show: true
					},
					lines: {
						show: true
					}
				});
			}
		}

		plotAccordingToChoices();

		$(".indeks-spisok").on("click", "a.indeks-line2:not(.active)", function () {
			$(this).addClass("active");
			$("#checked-" + $(this).data("id") + " input").trigger("click");
			return false;
		});
		$(".indeks-spisok").on("click", "a.indeks-line2.active", function () {
			if ($("a.indeks-line2.active").size() > 1) {
				$(this).removeClass("active");
				$("#checked-" + $(this).data("id") + " input").trigger("click");
			}
			return false;
		});
		$(".lk-plus-obiava .company-lenta-redakt ").on("click", "a.skrepka", function () {
			$("input[name='PROPERTY_FILE_PREVIEW_PICTURE_0']").trigger("click");
			return false;
		});
		$(".lk-plus-obiava .company-lenta-redakt").on("click", "span.close-your-eyes", function () {
			$(".in_shadow .checkbox#file_delete_PREVIEW_PICTURE_0").trigger("click");
			$(".photaaa img").attr("src", "/local/img/no-picture.jpg");
			return false;
		});

		$(".lk-plus-obiava .company-lenta-redakt input[name='PROPERTY_FILE_PREVIEW_PICTURE_0']").on("change", function () {
			var fileName = $(this).val();
			if (fileName) {} else {
				$(".photaaa img").attr("src", fileName);
			}
		});
		if ($("#placeholder").size() > 0) {
			$("<div id='tooltip'></div>").css({
				position: "absolute",
				display: "none",
				padding: "10px",
				"font-family": "Arial, helvetica,san-sherif",
				"border-radius": "5px",
				color: "#fff",
				"background-color": "#4D739F",
				opacity: 0.80,
				"font-weight": 400,
				width: "180px",
				"font-size": "12px"
			}).appendTo("body");
		}
		$("#placeholder").on("plothover", function (event, pos, item) {
			armont = [];
			armont[1] = "январь";
			armont[2] = "февраль";
			armont[3] = "март";
			armont[4] = "апрель";
			armont[5] = "май";
			armont[6] = "июнь";
			armont[7] = "июль";
			armont[8] = "август";
			armont[9] = "сентябрь";
			armont[10] = "октябрь";
			armont[11] = "ноябрь";
			armont[12] = "декабрь";
			if (item) {
				var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);
				var date = new Date(x * 1000);
				d = 1;
				dateStr = "";
				if (!date.getDay()) {
					d = 1;
				} else {
					d = date.getDay();
				}
				dateStr = d + " " + armont[date.getMonth()] + " " + date.getFullYear();

				$("#tooltip").html(item.series.label + "<br><hr style='height: 2px'><br>Изменение " + dateStr + "<br>Цена " + y + " руб") //item.series.label +
					.css({
						top: item.pageY + 5,
						left: item.pageX + 5
					})
					.fadeIn(200);
			} else {
				$("#tooltip").hide();
			}
		});
	}

	$('.fancybox-media').fancybox({
		openEffect: 'none',
		closeEffect: 'none',
		helpers: {
			media: {}
		}
	});

	$(".fancybox_messag").fancybox();
	initMessagUpdate(30000);
	initMessagReload(30000);

	$('.size-up').fancybox();

	//scroll blocks
	$("#news_block_scroll").scroll_block();
	$("#advert").scroll_block();
	$("#article").scroll_block();

	$("#send_messag_to_company").on("submit", function () {
		sdata = $("#send_messag_to_company form").serialize();
		$.ajax({
			type: "POST",
			url: "/ajax/messages/send.php",
			data: sdata,
			success: function (msg) {
				if (msg == '0') {
					location.href = '?empty=1';
				} else if (msg == "ok") {
					$("#send_messag_to_company form").html("<b>Отпарвленно</b>");
				}
			}
		});
		return false;
	});

	$("#form-authorise").on("submit", function () {
		sdata = $("#form-authorise").serialize();
		$.ajax({
			type: "POST",
			url: "/ajax/auth/authorize.php",
			data: sdata,
			success: function (msg) {
				if (msg == '0') {
					location.href = '?empty=1';
				} else {
					content = $(msg).find("#form-authorise");
					if (content.find("input[type='text']").size() > 0) {
						$("#form-authorise input[type='text']").css("border-left", "8px solid red");
						$("#form-authorise input[type='password']").css("border-left", "8px solid red");
					} else {
						location.reload()
					}
				}
			}
		});
		return false;
	});

	hText = $(".cell-big-col div.company-text p.current-text").height();
	if (hText > 124) {
		$(".pokazat.fulltext").show();
	} else {
		$(".pokazat.fulltext").hide();
	}
	$(".edit-description-button").on("click", function () {
		if (!$(this).hasClass("cancel")) {
			var prevText = "";
			var detailText = "";
			var pid = "";
			if ($("textarea.preview-text").size() > 0) {
				prevText = $("textarea.preview-text").val();
			}
			if ($("textarea.detail-text").size() > 0) {
				detailText = $("textarea.detail-text").val();
			}
			if ($(".company-info-top").size() > 0) {
				pid = $(".company-info-top").data("id");
			}

			$(".company-description p.current-text").hide();
			$(".company-description > span.textblock").show();
			$(".pokazat.fulltext").hide();
			$(".redakt-save").show();
			$(this).addClass("cancel").removeClass("off").html("Отмена");

			$(".cell-big-col div.company-text").animate({
				height: "auto"
			});
			$(".company-description").removeClass("company-text").addClass("company-input");


		} else {
			$(this).removeClass("cancel").addClass("off").html("Редактировать");
			$(".company-description").removeClass("company-input").addClass("company-text");
			$(".company-description p.current-text").show();
			$(".company-description > span.textblock").hide();
			$(".redakt-save").hide();
			$(".cell-big-col div.company-description").animate({
				height: "auto"
			});
		}
	});

	//// news action
	$(".company-lenta-redakt").on("focus", ".new-news-name", function () {
		$(".description-news").fadeIn();
	}).on("blur", ".new-news-name", function () {
		if ($(".description-news").val() == "") {
			$(".description-news").fadeOut();
		}
	});

	$(".company-lenta-redakt .skrepka").on("click", function () {
		$(".photo-add-block").fadeIn();
		$(".add-file-button").click();
		return false;
	});
	//компания
	$("#logo-file-btn").on("change", function () {
		var fileCount = $("#logo-file-btn")[0].files.length;
		if (fileCount > 0) {
			arPhoto = $("#logo-file-btn")[0].files;
			var source = $(".comp-logo-lk a");
			$(arPhoto).each(function (i) {
				item = this;
				var f;

				var fReader = new FileReader();
				fReader.onloadend = (function (aFile) {
					var css;
					if (fileCount == 1) {
						css = {
							'width': 92,
							'height': 92
						};
					}

					return function (e) {
						text = "<span class=\"photaaa\" style='display: inline-block; float: left; background-image: url(" + e.target.result + "); background-size: cover; background-position: center;' data-size=\"" + aFile.size + "\" data-name=\"" + aFile.name + "\">\
						<span class=\"close-your-eyes\"></span>\
						</span>";
						newimg = $(text).css(css);
						source.html(newimg);
					};
				})(item);
				fReader.readAsDataURL(item);
			});
		}
	});
	//объявления
	$(".photo-add-block input[name='PROPERTY_FILE_PREVIEW_PICTURE_0']").on("change", function () {
		var fileCount = $(this)[0].files.length;
		if (fileCount > 0) {
			$(".photo-add-block .photo-add-block-cell1 > span").remove();
			arPhoto = $(this)[0].files;
			var count = 1;
			var source = $("<div>");
			$(arPhoto).each(function (i) {
				item = this;
				var f;
				var fReader = new FileReader();
				fReader.onloadend = (function (aFile) {
					var css;

					if (fileCount == 1) {
						css = {
							'width': 295,
							'height': 158
						};
					} else if (fileCount == 2) {
						css = {
							'width': 145,
							'height': 145
						};
						if (count == 2) {
							css.marginLeft = 4;
						}
					} else if (fileCount == 3) {
						if (count == 1) {
							css = {
								'width': 175,
								'height': 158
							};
						} else {
							css = {
								'width': 116,
								'height': 77
							};
							if (count > 1) {
								css.marginLeft = 4;
							}
							if (count > 2) {
								css.marginTop = 4;
							}
						}
					} else {
						if (count == 1) {
							css = {
								'width': 175,
								'height': 239
							};
						} else {
							css = {
								'width': 116,
								'height': 77
							};
							if (count > 1) {
								css.marginLeft = 4;
							}
							if (count > 2) {
								css.marginTop = 4;
							}
						}
					}
					count++;
					return function (e) {
						text = "<span class=\"photaaa\" style='display: inline-block; float: left; background-image: url(" + e.target.result + "); background-size: cover; background-position: center;' data-size=\"" + aFile.size + "\" data-name=\"" + aFile.name + "\">\
						<span class=\"close-your-eyes\"></span>\
						</span>";
						newimg = $(text).css(css);
						source.append(newimg);
					};
				})(item);
				fReader.readAsDataURL(item);
				$(".photaaa .close-your-eyes").on("click", function () {
					$(this).parent().remove();
					return false;
				});

			});

			$(".photo-add-block-cell1").append(source);
		}
	});
	//новости
	$(".company-lenta-redakt .add-file-button").on("change", function () {
		var fileCount = $(".add-file-button")[0].files.length;
		if (fileCount > 4) {
			alert("Максимум 4 файла");
			$(".company-lenta-redakt .photaaa").remove();
			return;
		}
		$(".company-lenta-redakt .z-f i").html(fileCount);
		if (fileCount > 0) {
			$(".company-lenta-redakt .photo-add-block-cell1 > div").remove();
			arPhoto = $(".company-lenta-redakt .add-file-button")[0].files;
			var count = 1;
			var source = $("<div>");
			$(arPhoto).each(function (i) {
				item = this;
				var f;
				var fReader = new FileReader();
				fReader.onloadend = (function (aFile) {
					var css;

					if (fileCount == 1) {
						css = {
							'width': 295,
							'height': 158
						};
					} else if (fileCount == 2) {
						css = {
							'width': 145,
							'height': 145
						};
						if (count == 2) {
							css.marginLeft = 4;
						}
					} else if (fileCount == 3) {
						if (count == 1) {
							css = {
								'width': 175,
								'height': 158
							};
						} else {
							css = {
								'width': 116,
								'height': 77
							};
							if (count > 1) {
								css.marginLeft = 4;
							}
							if (count > 2) {
								css.marginTop = 4;
							}
						}
					} else {
						if (count == 1) {
							css = {
								'width': 175,
								'height': 239
							};
						} else {
							css = {
								'width': 116,
								'height': 77
							};
							if (count > 1) {
								css.marginLeft = 4;
							}
							if (count > 2) {
								css.marginTop = 4;
							}
						}
					}
					count++;
					return function (e) {
						text = "<span class=\"photaaa\" style='display: inline-block; float: left; background-image: url(" + e.target.result + "); background-size: cover; background-position: center;' data-size=\"" + aFile.size + "\" data-name=\"" + aFile.name + "\">\
						<span class=\"close-your-eyes\"></span>\
						</span>";
						newimg = $(text).css(css);
						source.append(newimg);
					};
				})(item);
				fReader.readAsDataURL(item);
				$(".photaaa .close-your-eyes").on("click", function () {
					$(this).parent().remove();
					return false;
				});

			});

			$(".photo-add-block-cell1").append(source);
		}

	});

	//product action
	$(".company-lenta-redakt").on("focus", ".new-prod-name", function () {
		$(".description-prod").fadeIn();
		$(".vtavka-summi").fadeIn();
		$(".vibor-ceni").fadeIn();
	}).on("blur", ".new-prod-name", function () {
		if ($(".description-prod").val() == "" && $(".vtavka-summi").val() == "" && $(".vibor-ceni").val() == "" && !$(".add-file-button").val()) {
			//$(".description-prod").fadeOut();
			//$(".vtavka-summi").fadeOut();
			//$(".vibor-ceni").fadeOut();
		}
	});

	/*$(".company-lenta-redakt .skrepka").on("click",function(){
		$(".photo-add-block").fadeIn();
		$(".add-file-button").click();
		return false;
	});*/

	/*$(".company-lenta-redakt .add-file-button").on("change",function(){
		var fileCount = $(".add-file-button")[0].files.length;
		$(".company-lenta-redakt .z-f i").html(fileCount);
		if(fileCount>0){
			//удалим старые фотки если есть
			$(".company-lenta-redakt .photaaa").remove();
			arPhoto = $(".company-lenta-redakt .add-file-button")[0].files;


			$(arPhoto).each(function(i) {
				item = this;

				var f;
				var fReader = new FileReader();
				fReader.onload = (function(aFile) {

					return function(e) {
						text = "<span class=\"photaaa\">\
						<span class=\"close-your-eyes\"></span>\
						<img src=\""+e.target.result+"\"  data-size=\""+aFile.size+"\" data-name=\""+aFile.name+"\">\
						</span>";
						newimg = $(text);
						$(".photo-add-block-cell1").append(newimg);
					};
				})(item);
				fReader.readAsDataURL(item);


			});
			$(".photaaa .close-your-eyes").on("click",function(){
				name = $(this).parent().find("img").data("name");
				$(this).parent().remove();
				return false
			});
		}

	});
*/
	//отзывы
	$(".star-click span.stars ").on("click", "i", function () {
		el = $(this);
		el.parent().find("i").removeClass("active");
		val = el.data("val");
		var valN = el.data("valn");
		$(".add-review-form .ocenite input[name='STARS']").val(val);
		$(".starsval").html("" + valN + "/5");
		el.parent().find("i").each(function () {
			v = $(this).data("valn");
			if (v <= valN) {
				$(this).addClass("active");
			}

		});

	});

	//поиск категорий в ЛК
	/*commented
	if ($(".vibor-cat.newlist").size() > 0) {
		$(".input-vibor-cat").on("keyup", function () {
			if (this.value != "") {
				$(".vibor-cat.newlist ul.vibor-cat-ul").hide();
				$(".vibor-cat.newlist .s-result").show();
			} else {
				$(".vibor-cat.newlist ul.vibor-cat-ul").show();
				$(".vibor-cat.newlist .s-result").hide();
			}
			//Убрать Не найдено
			$(".vibor-cat.newlist .s-result li:not(.notfound)").remove();
			notfound = $(".vibor-cat.newlist .s-result .notfound");
			notfound.css("display", "none");
			var exp = this.value.toUpperCase();
			var count = 0;
			$(".vibor-cat.newlist ul ul.second-ul").children("li").each(function () {
				if (($(this).html().toUpperCase().search(exp) != -1)) {
					clon = $(this).clone();
					$(".vibor-cat.newlist .s-result").append(clon);
					count++;
				}

			});
			if (count == 0) {
				notfound.css("display", "block");

			}
		});
	}*/





	$("#med-slider.admin:not(.tovar)").slidesjs({
		width: 255,
		height: 470
	});
	/**/
});

function showCompanyContact(el) {
	el = $(el);
	$(".contact-mail").fadeIn();
	el.remove();
	return false;
}

function showCompanyText(el) {
	el = $(el);
	hText = $(".cell-big-col div.company-text p.current-text").height() + 10;
	$(".cell-big-col div.company-text").animate({
		height: hText
	});
	el.remove();
	return false;
}

function saveCompanyField(type, el) {
	if (type == "TEXT") {
		preview = $(".company-input .preview-text").val();
		detail = $(".company-input .detail-text").val();
		id = $(el).data("id");
		$.ajax({
			type: "POST",
			url: "/ajax/company/update.php",
			data: {
				"preview": preview,
				"detail": detail,
				"id": id
			},
			success: function (msg) {
				if (msg == '0')
					location.href = '?empty=1';
				else {
					$(".company-description p.current-text").show();
					$(".company-description > span.textblock").hide();
					$(".company-description").html(msg).addClass("company-text").removeClass("company-input");
					$(".redakt-save").hide();
					$(".pokazat.fulltext").hide();
					$(".edit-description-button").removeClass("cancel").addClass("off").html("Редактировать");
					$(".company-description ").removeClass("company-input").addClass("company-text");
				}
			}
		});
	}
	return false;
}

function selectLoadCompany(select, categoryId) {
	select.empty();
	$.get("/ajax/company/list.php", {
			id: categoryId
		},
		function (data) {
			var k = Object.keys(data);
			for (var i = 0; i < k.length; i++) {
				select.append("<option value=" + k[i] + ">" + data[k[i]] + "</option>");
			}
			$(select).removeAttr("disabled");
		},
		"JSON"
	);
}

function backHistory() {
	history.back();
	return false;
}


function initMessagUpdate(timer) {
	if (timer == undefined) {
		timer = 60000;
	}
	setInterval(function () {
		$.ajax({
			type: "POST",
			url: "/ajax/messages/stat.php",
			success: function (msg) {
				if (msg == "none") {
					return false;
				} else {
					if ($(".lk-cell-menu").size() > 0) {
						$($(".lk-cell-menu .lk-menu-item")[1]).find("span").html(msg);
					}
					if ($(".log-add .knopka-ava-shapka").size() > 0) {
						$(".log-add .knopka-ava-shapka span").html(msg);
					}
					if (parseInt(msg) > 0) {
						$(".log-add .knopka-ava-shapka span").addClass("active");
					} else {
						$(".log-add .knopka-ava-shapka span").removeClass("active");
					}
				}
			}
		});
	}, timer);
}

function initMessagReload(timer) {
	if (timer == undefined) {
		timer = 60000;
	}
	if ($(".lk-cell-content .dialog-in-block").size() > 0) {
		setInterval(function () {
			$.ajax({
				type: "POST",
				url: "",
				success: function (msg) {
					if (msg == "none") {
						return false;
					} else {
						$(".lk-cell-content .dialog-in-block").html($(msg).find(".lk-cell-content .dialog-in-block").children());
					}
				}
			});
		}, timer);
	}

}

function sendMessag(el) {
	sdata = $($(el).data("form")).serialize();
	$.ajax({
		type: "POST",
		url: "/bitrix/components/bitrix/im.messenger/im.ajax.php?MESSAGE_SEND&V=57",
		data: sdata,
		dataType: 'text',
		success: function (msg) {
			ddata = eval("(" + msg + ")");
			armont = [];
			armont[1] = "января";
			armont[2] = "февраля";
			armont[3] = "марта";
			armont[4] = "апреля";
			armont[5] = "мая";
			armont[6] = "июня";
			armont[7] = "июля";
			armont[8] = "августа";
			armont[9] = "сентября";
			armont[10] = "октября";
			armont[11] = "ноября";
			armont[12] = "декабря";
			if (typeof ddata == "object") {
				if (ddata.ERROR == "") {
					var dateTime = new Date(ddata.SEND_DATE * 1000);
					userData = $(".data-cover.messag-user .user" + ddata.SENDER_ID);
					insertData = "<div class='dialog-item'>\
										<div class='dialog-logo'>\
										<a href='" + userData.data("companyurl") + "'><img src='" + userData.data("companylogo") + "' alt='" + userData.html() + " (" + userData.data("companyname") + ")'></a>\
										</div>\
										<div class='dialog-body'>\
										<span class='info-date'>" + dateTime.getHours() + ":" + dateTime.getMinutes() + "</span><span class='info-date'>" + dateTime.getDay() + " " + armont[dateTime.getMonth()] + " " + dateTime.getYear() + "</span> <a href='" + userData.data("companyurl") + "' class='company-name-dialog'>" + userData.html() + " (" + userData.data("companyname") + ")</a>\
									<p>" + ddata.SEND_MESSAGE + "</p>\
									</div>\
									</div>";
					$(".dialog-in-block").prepend(insertData);
					$(".messaga-area .text-messag").val("");
				}
			}
		}
	});

	//return false;
}

function getScrollOffsets(w) {
	// использовать указанное окно или текущее,
	// если функция вызвана без аргумента
	w = w || window;
	if (w.pageXOffset != null) return {
		x: w.pageXOffset,
		y: w.pageYOffset
	};
	// Для IE (и других браузеров) в стандартном режиме
	var d = w.document;
	if (document.compatMode == "CSS1Compat") {
		return {
			x: d.documentElement.scrollLeft,
			y: d.documentElement.scrollTop
		};
	}
	// Для браузеров в режиме совместимости
	return {
		x: d.body.scrollLeft,
		y: d.body.scrollTop
	};
}

//marvil
function loadNextSections(inputHolder, el) {
	var input = $(inputHolder);
	var el = $(el);
	el.parent().prev().html(el.find("span.s-name").html());
	step = parseInt(el.data("tostep"));
	val = el.data("val");
	input.val(val);

	appendedUL = $("#mydiv" + step);
	appendedUL.html("");
	appendedUL.parent().css("background-image", "url(/local/img/loader16x16.gif)");
	$("input.section" + step).val("");
	if (step < 3) {
		$("input.section" + (step + 1)).val("");
	}
	for (var i = step; i <= 3; i++) {
		$("#mydiv" + i).html("").parent().children("span:first-child").html("Категории товаров");
	}
	$.ajax({
		type: "POST",
		url: "/ajax/company/droplist.php",
		data: {
			"id": val
		},
		success: function (msg) {
			sectObject = JSON.parse(msg);
			if (step > 3) return;
			$(sectObject).each(function (k) {
				sect = this;
				strToAppend = '<li data-tostep="' + (step + 1) + '" data-val="' + sect.id + '" onclick="return loadNextSections(' + "'.section" + (step) + "'" + ',this);" id="" ><span class="s-name">' + sect.name + ' </span><span>' + sect.count + '</span></li>';
				appendedUL.append(strToAppend);
			});
			appendedUL.parent().css("background-image", "");
			if (appendedUL.find("li").size() > 0) {
				appendedUL.removeClass("empty");
				appendedUL.parent().removeClass("cont-empty");
			}

		}
	});
}



function filterSetButonProp(el) {
	el = $(el);
	//получить текущее значение чекбокса
	input = el.find("input");
	link = el.find("a");
	checked = input.prop("checked");
	if (checked) {
		input.removeAttr("checked");
		link.removeClass("active");
	} else {
		input.attr("checked", "checked");
		link.addClass("active");
	}

	// инвертировать
	return false;
}



function selectFilterRegion(el) {
	val = $(el).data("reg");
	$(".region_input").val(val);
}

function showAllSections(selector, btn) {
	if ($(selector + " > div> div> div").size() > 16) {
		if ($(selector).size() > 0) {
			hRel = $(selector + " > div >div").height();
			lastSlide = false;
			topMargin = Math.abs(parseInt($(selector + " > div").css("margin-top")));
			viwBLock = $(selector).height();
			toMargin = topMargin + viwBLock;
			if ($(btn).data("finish") == "Y") {
				toMargin = 0;
			} else if ((hRel - toMargin) <= viwBLock) {
				toMargin -= viwBLock + toMargin - hRel;
				lastSlide = true;
			}
			$(selector + " > div").animate({
				"margin-top": "-" + toMargin
			}, 1000, function () {
				if (lastSlide) {
					$(btn).find("span").html("Вернуться к началу");
					$(btn).data("finish", "Y");
				} else {
					$(btn).find("span").html("Загрузить еще");
					$(btn).data("finish", "N");
				}
			});
		}
	}
	return false;
}

function addReview(form) {
	$(form).submit();

	return false;
}

function setCookie(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

function closeNewMessag(el) {
	form = $(el);
	form.parent().parent().hide();
	$(".opacity-reg").hide();

	return false;
}

function openFormSendMess(form, uid, absolut) {
	if (absolut) {
		$(form).find(".new-message").addClass("absolute");
	} else {
		$(form).find(".new-message").removeClass("absolute");
	}

	$(form).find("input[name='user']").val(uid);
	$(".nmb.sendet").hide();
	//$(".nmb:not(.sendet)").show();
	return false;
}

function sendNewMessag(form) {
	if (form != undefined) {
		sdata = $(form).serialize();
		$.ajax({
			type: "POST",
			url: "/ajax/messages/sendMessag.php",
			data: sdata,
			success: function (msg) {
				if (msg == '0') {
					location.href = '?empty=1';
				} else if (msg == "ok") {
					$(form).find(".row.form_text").hide();
					$(form).find(".row.sendet").show();

					///$(form).parent().parent().find(".nmtta").html("<span class='nmtz'><b>Отпарвленно</b></span>");
					timClose = setTimeout(function () {
						$(".uk-modal-close.uk-close").click();
					}, 3000);
				}
			}
		});
		return false;
	}
}

function uservoice_close() {
	setCookie("user_feedback", "1", {
		expires: 86400
	});
	$(".UserVoice").animate({
		bottom: "-100%"
	}, 500, function () {
		$(this).remove();
	});
}

function switchListVid(el) {
	el = $(el);
	target = $("." + el.data("target"));
	if (el.data("type") == "spisok") {
		el.parent().find(".active").removeClass("active");
		el.addClass("active");
		target.addClass("spisok");
	} else {
		el.parent().find(".active").removeClass("active");
		el.addClass("active");
		target.removeClass("spisok");
	}
	return false;
}

var userAuth = new(function () {
	this.to_url = location.href;
	this.show = (function (that) {
		this.to_url = that.href;
		$(".opacity-reg").addClass("active");
		return false;
	});
	this.close = (function () {
		$('.opacity-reg').removeClass('active');
		return true;
	});
	this.showRegister = (function () {
		$.get("/ajax/auth/drop.php", {
			action: "register"
		}, function (data) {
			$(".reg-content").html($(data).find(".reg-content").html());
		});
	});
	this.showLogin = (function () {
		$.get("/ajax/auth/drop.php", {
			action: "login"
		}, function (data) {
			$(".reg-content").html($(data).find(".reg-content").html());
		});
	});
	this.login = (function (form_selector) {
		$(".reg-vspliv").addClass("loading").addClass("show");
		var to_url = this.to_url;
		$.ajax({
			dataType: "JSON",
			type: "POST",
			url: "/ajax/auth/drop.php?action=login",
			data: $(form_selector).serialize(),
			timeout: 3000,
			success: function (data) {
				if (data.ERROR_TYPE == "LOGIN") {
					$(form_selector + " input[name=USER_LOGIN]").css("border-left", "8px solid #E24848");
					$(form_selector + " input[name=USER_PASSWORD]").css("border-left", "8px solid #E24848");
					$(".reg-vspliv").removeClass("show");
					setTimeout(function () {
						$(".reg-vspliv").removeClass("loading");
					}, 300);
				} else if (data == true) {
					location.href = to_url;
				}
			},
			error: (function (data) {
				alert("Произошла ошибка, попробуйте позднее");
				console.error(data);
			})
		});
	});
	this.register = (function (form_selector) {
		$(".reg-vspliv").addClass("loading").addClass("show");
		var to_url = this.to_url;
		$.ajax({
			dataType: "JSON",
			type: "POST",
			url: "/ajax/auth/drop.php?action=register",
			data: $(form_selector).serialize(),
			timeout: 3000,
			success: function (data) {
				console.log(data);
				$(".reg-vspliv").removeClass("show");
				setTimeout(function () {
					$(".reg-vspliv").removeClass("loading");
				}, 300);
			},
			error: function (data) {
				console.error(data.responseText);
			}
		});
	});
	return this;
})();

function showCategory(input) {
	var idx = parseInt($("[name=cat_1]").prop('value'));
	if (isNaN(idx)) return;
	$("#category_select").data("input", input);
	$("#category_select ul").html("");
	for (var id in companyCategories[idx].children) {
		$("#category_select #first_column ul").append("<li data-value='" + id + "' onClick='loadCategory(this, " + idx + ", \"" + input + "\")' title='" + companyCategories[idx].children[id].name + "'>" + companyCategories[idx].children[id].name + "</li>");
	}
	$('#category_select').addClass('active');
}

/*commented
function showNewListCategory(input) {
//	var idx = parseInt($("[name=cat_1]").prop('value'));
//	if(isNaN(idx)) return;
//	//$(".vibor-cat.newlist").data("input", input);
//	$('.vibor-cat.newlist').show();
//	//$(".vibor-cat ul").html("");
//	for(var id in companyCategories[idx].children) {
//	//<li><input type="checkbox" id="punkt1"><label for="punkt1">Упаковка и тара</label>
//		$(".vibor-cat.newlist .vibor-cat-ul ").append("<li ><input type='checkbox' id='punkt"+id+"'><label for='punkt"+id+"'  data-value='" + id + "' onClick='loadCategoryN(this, " + idx + ", \"" + input + "\")'>" + companyCategories[idx].children[id].name + "</label></li>");
//		if(companyCategories[idx].children[id]){
//
//		}
//	}
	var res;
	for (var catGroup in companyCategories) {
		catGroup;

		var ulFirstLVL = $(".vibor-cat.newlist .vibor-cat-ul ");
		//var liBlockFirst = $("<li class='lvl1 id"+id_1+"'></li>");
		//liBlockFirst.append("");
		if (companyCategories[catGroup].children != undefined) {
			catCurLVL = companyCategories[catGroup];
			li = $("<li class='id" + catGroup + "'></li>"); //каркас li
			if (catCurLVL.children == undefined) { //если нет ничего внутрилежащего то вкладываем итпут
//				li.append("<input type='checkbox' name='PROPERTY[IBLOCK_SECTION][]' value='"+catGroup+"' id='punkt"+catGroup+"'>");
//				li.append("<label for='punkt"+catGroup+"' data-value='"+catGroup+"' onClick='loadCategoryN(this, " + catGroup + ")'>"+catCurLVL.name+"</label>");
//				ulFirstLVL.append(li);
//				delete li;
			} else { // иначе буремся глубже
				li.addClass("group");
				li.append("<input type='checkbox' id='punkt" + catGroup + "'>");
				li.append("<label for='punkt" + catGroup + "'>" + catCurLVL.name + "</label>");
				ul2l = $("<ul class='second-ul' ></ul>"); //
				for (var catGroup2 in catCurLVL.children) {
					//перебор второго уровня
					catCurLVL2 = catCurLVL.children[catGroup2];
					li2 = $("<li class='id" + catGroup2 + "'></li>"); //каркас li
					if (catCurLVL2.children == undefined) { //если нет ничего внутрилежащего то вкладываем итпут
						li2.append("<input type='checkbox' name='PROPERTY[IBLOCK_SECTION][]' value='" + catGroup2 + "' id='punkt" + catGroup2 + "'>");
						li2.append("<label for='punkt" + catGroup2 + "' data-value='" + catGroup2 + "' onClick='loadCategoryN(this, " + catGroup2 + ")'>" + catCurLVL2.name + "</label>");


					} else { //есть 3 уровень
						li2.addClass("group");
						li2.append("<input type='checkbox' id='punkt" + catGroup2 + "'>");
						li2.append("<label for='punkt" + catGroup2 + "'>" + catCurLVL2.name + "</label>");
						ul3l = $("<ul class='second-ul'></ul>");
						for (var catGroup3 in catCurLVL2.children) {
							catCurLVL3 = catCurLVL2.children[catGroup3];
							li3 = $("<li class='id" + catGroup3 + "'></li>");
							li3.append("<input type='checkbox' name='PROPERTY[IBLOCK_SECTION][]' value='" + catGroup3 + "' id='punkt" + catGroup3 + "'>");
							li3.append("<label for='punkt" + catGroup3 + "' data-value='" + catGroup3 + "' onClick='loadCategoryN(this, " + catGroup3 + ")'>" + catCurLVL3.name + "</label>");
							ul3l.append(li3);
						}
						li2.append(ul3l);
					}
					ul2l.append(li2);
					//categoryConstructLI(catCurLVL.children[catGroup],catGroup,nUl,$("<li></li>"));//рекурсим вызов
					//ul.append(lili);
				}
				li.append(ul2l);
				ulFirstLVL.append(li);
				//li.append(ul);//то что нагенерили засовываем  в нашу ли
			}

			//liBlock = categoryConstructLI(companyCategories[catGroup],catGroup,ulFirstLVL);
		}
		$(".vibor-cat.newlist").show();
		//ulFirstLVL.append(liBlock);

		//ulFirstLVL.append("<li ><input type='checkbox' id='punkt"+id_1+"'><label for='punkt"+id+"'  data-value='" + id + "' onClick='loadCategoryN(this, " + idx + ", \"\")'>" + companyCategories[idx].children[id].name + "</label></li>");
	}
}
*/









/*commented
function categoryConstructLI(catCurLVL, cid, ul, li) {

	//return li;// возвращаем ли
}*/

function categorySearchSelect(el) {

}


//commented
//function loadCategoryN(that, idx, input) {
//	that = $(that);
//	var cid = that.data('value');
//
//	$("#IBLOCK_SECTION").attr("value", $(that).html());
//	if (that.data('level') === 2) {
//		$('.vibor-cat.newlist').hide();
//		if ($(".lk-input-line div.lk-tags span.cat" + cid).size() == 0) {
//			var strSeparator;
//			strSeparator = "";
//			if ($(".lk-input-line div.lk-tags .lk-tag").size() > 0) {
//				strSeparator = ", ";
//			}
//			tempInut = $("<input type='hidden' name='" + $(input).data("name") + "'>");
//			catBlock = $("<div class='lk-tag'></div>");
//			catBlock.append(tempInut);
//			catBlock.append("<span class='cat" + cid + " deletecat'  onclick='return deleteCat(this)'></span>");
//			catBlock.find("span").append($(that).html());
//			$(".lk-input-line div.lk-tags").append(catBlock);
//			$(".lk-input-line div.lk-tags span.cat" + cid + " input").val(cid);
//			$(".submit-company").on("click", function () {
//				$("form[name='iblock_add']").submit();
//				return false;
//			});
//		}
//		return;
//	}
//	//if(typeof data === "undefined") {
//	/*$("#category_select #second_column ul").addClass("empty");
//	 $(that).addClass('last');*/
//	$('#category_select').removeClass('active');
//
//	if ($(".lk-input-linediv.lk-tags span.cat" + cid).size() == 0) {
//		var strSeparator;
//		strSeparator = "";
//		if ($(".lk-input-line div.lk-tags span").size() > 0) {
//			strSeparator = ", ";
//		}
//		tempInut = $("<input type='hidden' value='' name='" + $(input).data("name") + "'>");
//		catBlock = $("<div class='lk-tag'></div>");
//		catBlock.append(tempInut);
//		catBlock.append("<span class='cat" + cid + " deletecat' onclick='return deleteCat(this);' ></span>");
//		catBlock.find("span").append($(that).html());
//
//		$(".lk-input-line div.lk-tags").append(catBlock);
//		$(".lk-input-line div.lk-tags span.cat" + cid + " input").val(cid);
//		$(".submit-company").on("click", function () {
//			$("form[name='iblock_add']").submit();
//			return false;
//		});
//	}
//
//	return;
//	//}
//	/*data = companyCategories[idx].children[cid].children;
//	$("#category_select #second_column ul").html("").removeClass("empty");
//	$(that).parent().find('.active').removeClass('active last');
//	$(that).addClass('active');
//	if(typeof data === "undefined") {
//		/!*$("#category_select #second_column ul").addClass("empty");
//		 $(that).addClass('last');*!/
//		$('#category_select').removeClass('active');
//
//		if($(".lk-input-linediv.lk-tags span.cat"+cid).size()==0){
//			var strSeparator;
//			strSeparator="";
//			if($(".lk-input-line div.lk-tags span").size()>0){
//				strSeparator = ", ";
//			}
//			tempInut = $("<input type='hidden' value='' name='"+$(input).data("name")+"'>");
//			catBlock = $("<div class='lk-tag'></div>");
//			catBlock.append(tempInut);
//			catBlock.append("<span class='cat"+cid+" deletecat' onclick='return deleteCat(this);' ></span>");
//			catBlock.find("span").append($(that).html());
//
//			$(".lk-input-line div.lk-tags").append(catBlock);
//			$(".lk-input-line div.lk-tags span.cat"+cid+" input").val(cid);
//			$(".submit-company").on("click",function(){
//				$("form[name='iblock_add']").submit();
//				return false;
//			});
//		}
//
//		return;
//	}
//	for(var id in data) {
//		$("#category_select #second_column ul").append("<li data-level=\"2\" data-value='" + id + "' onClick='loadCategory(this, " + idx + ", \"" + input + "\")' title='" + data[id].name + "'>" + data[id].name + "</li>");
//	}*/
//}
//
//function loadCategory(that, idx, input) {
//	that = $(that);
//	var cid = that.data('value');
//
//	$("#IBLOCK_SECTION").attr("value", $(that).html());
//	if (that.data('level') === 2) {
//		$('#category_select').removeClass('active');
//		if ($(".lk-input-line div.lk-tags span.cat" + cid).size() == 0) {
//			var strSeparator;
//			strSeparator = "";
//			if ($(".lk-input-line div.lk-tags .lk-tag").size() > 0) {
//				strSeparator = ", ";
//			}
//			tempInut = $("<input type='hidden' name='" + $(input).data("name") + "'>");
//			catBlock = $("<div class='lk-tag'></div>");
//			catBlock.append(tempInut);
//			catBlock.append("<span class='cat" + cid + " deletecat'  onclick='return deleteCat(this)'></span>");
//			catBlock.find("span").append($(that).html());
//			$(".lk-input-line div.lk-tags").append(catBlock);
//			$(".lk-input-line div.lk-tags span.cat" + cid + " input").val(cid);
//			$(".submit-company").on("click", function () {
//				$("form[name='iblock_add']").submit();
//				return false;
//			});
//		}
//		return;
//	}
//	data = companyCategories[idx].children[cid].children;
//	$("#category_select #second_column ul").html("").removeClass("empty");
//	$(that).parent().find('.active').removeClass('active last');
//	$(that).addClass('active');
//	if (typeof data === "undefined") {
//		/*$("#category_select #second_column ul").addClass("empty");
//		$(that).addClass('last');*/
//		$('#category_select').removeClass('active');
//
//		if ($(".lk-input-linediv.lk-tags span.cat" + cid).size() == 0) {
//			var strSeparator;
//			strSeparator = "";
//			if ($(".lk-input-line div.lk-tags span").size() > 0) {
//				strSeparator = ", ";
//			}
//			tempInut = $("<input type='hidden' value='' name='" + $(input).data("name") + "'>");
//			catBlock = $("<div class='lk-tag'></div>");
//			catBlock.append(tempInut);
//			catBlock.append("<span class='cat" + cid + " deletecat' onclick='return deleteCat(this);' ></span>");
//			catBlock.find("span").append($(that).html());
//
//			$(".lk-input-line div.lk-tags").append(catBlock);
//			$(".lk-input-line div.lk-tags span.cat" + cid + " input").val(cid);
//			$(".submit-company").on("click", function () {
//				$("form[name='iblock_add']").submit();
//				return false;
//			});
//		}
//
//		return;
//	}
//	for (var id in data) {
//		$("#category_select #second_column ul").append("<li data-level=\"2\" data-value='" + id + "' onClick='loadCategory(this, " + idx + ", \"" + input + "\")' title='" + data[id].name + "'>" + data[id].name + "</li>");
//	}
//}

/*commented
function deleteCat(el) {
	$(el).parent().fadeOut(200, 'swing', function () {
		$(this).remove();
	});
}*/

function sitemapOpen() {
	$(".wrapper .sitemap").fadeIn();
	return false;
}

function sitemapClose() {
	$(".wrapper .sitemap").fadeOut();
	return false;
}

function getUserList(el) {
	sdata = $(".user_search_form").serialize();

	$.ajax({
		type: "POST",
		url: "/ajax/messages/search.php",
		dataType: 'json',
		data: sdata,

		success: function (msg) {
			if (msg == '0')
				location.href = '?empty=1';
			else {
				$(".dialog-block.search_result").html("");
				$(msg).each(function () {
					curItem = this;
					wrapItem = $("<div></div>").addClass("dialog-item");
					logo = $("<div></div>").addClass("dialog-logo").append($("<a></a>").attr("href", curItem.url).append($("<img>").attr("src", curItem.img)));
					wrapItem.append(logo);
					infoBody = $("<div></div>").addClass("dialog-body").append($("<a></a>").attr("href", curItem.url).addClass("company-name-dialog").html(htmlspecialchars_decode(curItem.name))).append($("<p></p>").html(htmlspecialchars_decode(curItem.desc)));
					wrapItem.append(infoBody);
					$(".dialog-block.search_result").append(wrapItem);
					$(".dialog-block.search_result").show();
				});


			}
		},
		beforeSend: function () {},
		complete: function () {
			console.log("f");
		}
	});


}

function logoutBack() {
	$('.opacity-block').removeClass('active');
	$('.popup-block').removeClass('active');
}

function addNewsCompanyConfirm() {
	$("form.add-news-form").on("submit", function () {
		$(".popup-block");
	});

}

function htmlspecialchars_decode(string, quote_style) {
	var optTemp = 0,
		i = 0,
		noquotes = false;
	if (typeof quote_style === 'undefined') {
		quote_style = 2;
	}
	string = string.toString()
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
	var OPTS = {
		'ENT_NOQUOTES': 0,
		'ENT_HTML_QUOTE_SINGLE': 1,
		'ENT_HTML_QUOTE_DOUBLE': 2,
		'ENT_COMPAT': 2,
		'ENT_QUOTES': 3,
		'ENT_IGNORE': 4
	};
	if (quote_style === 0) {
		noquotes = true;
	}
	if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
		quote_style = [].concat(quote_style);
		for (i = 0; i < quote_style.length; i++) {
			// Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
			if (OPTS[quote_style[i]] === 0) {
				noquotes = true;
			} else if (OPTS[quote_style[i]]) {
				optTemp = optTemp | OPTS[quote_style[i]];
			}
		}
		quote_style = optTemp;
	}
	if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
		string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
		// string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
	}
	if (!noquotes) {
		string = string.replace(/&quot;/g, '"');
	}
	// Put this in last place to avoid escape being double-decoded
	string = string.replace(/&amp;/g, '&');

	return string;
}

/*------------------------------------------------------------
 * NanoScrollerJS
 *------------------------------------------------------------*/

/*! nanoScrollerJS - v0.8.4 - (c) 2014 James Florentino; Licensed MIT */

! function (a, b, c) {
	"use strict";
	var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
	z = {
		paneClass: "nano-pane",
		sliderClass: "nano-slider",
		contentClass: "nano-content",
		iOSNativeScrolling: !1,
		preventPageScrolling: !1,
		disableResize: !1,
		alwaysVisible: !1,
		flashDelay: 1500,
		sliderMinHeight: 20,
		sliderMaxHeight: null,
		documentContext: null,
		windowContext: null
	}, u = "scrollbar", t = "scroll", l = "mousedown", m = "mouseenter", n = "mousemove", p = "mousewheel", o = "mouseup", s = "resize", h = "drag", i = "enter", w = "up", r = "panedown", f = "DOMMouseScroll", g = "down", x = "wheel", j = "keydown", k = "keyup", v = "touchmove", d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject, e = null, D = b.requestAnimationFrame, y = b.cancelAnimationFrame, F = c.createElement("div").style, H = function () {
		var a, b, c, d, e, f;
		for (d = ["t", "webkitT", "MozT", "msT", "OT"], a = e = 0, f = d.length; f > e; a = ++e)
			if (c = d[a], b = d[a] + "ransform", b in F) return d[a].substr(0, d[a].length - 1);
		return !1
	}(), G = function (a) {
		return H === !1 ? !1 : "" === H ? a : H + a.charAt(0).toUpperCase() + a.substr(1)
	}, E = G("transform"), B = E !== !1, A = function () {
		var a, b, d;
		return a = c.createElement("div"), b = a.style, b.position = "absolute", b.width = "100px", b.height = "100px", b.overflow = t, b.top = "-9999px", c.body.appendChild(a), d = a.offsetWidth - a.clientWidth, c.body.removeChild(a), d
	}, C = function () {
		var a, c, d;
		return c = b.navigator.userAgent, (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c)) ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a && +d > 23) : !1
	}, q = function () {
		function j(d, f) {
			this.el = d, this.options = f, e || (e = A()), this.$el = a(this.el), this.doc = a(this.options.documentContext || c), this.win = a(this.options.windowContext || b), this.body = this.doc.find("body"), this.$content = this.$el.children("." + f.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
		}
		return j.prototype.preventScrolling = function (a, b) {
			if (this.isActive)
				if (a.type === f)(b === g && a.originalEvent.detail > 0 || b === w && a.originalEvent.detail < 0) && a.preventDefault();
				else if (a.type === p) {
				if (!a.originalEvent || !a.originalEvent.wheelDelta) return;
				(b === g && a.originalEvent.wheelDelta < 0 || b === w && a.originalEvent.wheelDelta > 0) && a.preventDefault()
			}
		}, j.prototype.nativeScrolling = function () {
			this.$content.css({
				WebkitOverflowScrolling: "touch"
			}), this.iOSNativeScrolling = !0, this.isActive = !0
		}, j.prototype.updateScrollValues = function () {
			var a, b;
			a = this.content, this.maxScrollTop = a.scrollHeight - a.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = a.scrollTop, b = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== b && this.$el.trigger("update", {
				position: this.contentScrollTop,
				maximum: this.maxScrollTop,
				direction: b
			}), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
		}, j.prototype.setOnScrollStyles = function () {
			var a;
			B ? (a = {}, a[E] = "translate(0, " + this.sliderTop + "px)") : a = {
				top: this.sliderTop
			}, D ? (y && this.scrollRAF && y(this.scrollRAF), this.scrollRAF = D(function (b) {
				return function () {
					return b.scrollRAF = null, b.slider.css(a)
				}
			}(this))) : this.slider.css(a)
		}, j.prototype.createEvents = function () {
			this.events = {
				down: function (a) {
					return function (b) {
						return a.isBeingDragged = !0, a.offsetY = b.pageY - a.slider.offset().top, a.slider.is(b.target) || (a.offsetY = 0), a.pane.addClass("active"), a.doc.bind(n, a.events[h]).bind(o, a.events[w]), a.body.bind(m, a.events[i]), !1
					}
				}(this),
				drag: function (a) {
					return function (b) {
						return a.sliderY = b.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || .5 * a.sliderHeight), a.scroll(), a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"), !1
					}
				}(this),
				up: function (a) {
					return function () {
						return a.isBeingDragged = !1, a.pane.removeClass("active"), a.doc.unbind(n, a.events[h]).unbind(o, a.events[w]), a.body.unbind(m, a.events[i]), !1
					}
				}(this),
				resize: function (a) {
					return function () {
						a.reset()
					}
				}(this),
				panedown: function (a) {
					return function (b) {
						return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight, a.scroll(), a.events.down(b), !1
					}
				}(this),
				scroll: function (a) {
					return function (b) {
						a.updateScrollValues(), a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (a.contentScrollTop >= a.maxScrollTop ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend")) : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, w), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
					}
				}(this),
				wheel: function (a) {
					return function (b) {
						var c;
						if (null != b) return c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1
					}
				}(this),
				enter: function (a) {
					return function (b) {
						var c;
						if (a.isBeingDragged) return 1 !== (b.buttons || b.which) ? (c = a.events)[w].apply(c, arguments) : void 0
					}
				}(this)
			}
		}, j.prototype.addEvents = function () {
			var a;
			this.removeEvents(), a = this.events, this.options.disableResize || this.win.bind(s, a[s]), this.iOSNativeScrolling || (this.slider.bind(l, a[g]), this.pane.bind(l, a[r]).bind("" + p + " " + f, a[x])), this.$content.bind("" + t + " " + p + " " + f + " " + v, a[t])
		}, j.prototype.removeEvents = function () {
			var a;
			a = this.events, this.win.unbind(s, a[s]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + t + " " + p + " " + f + " " + v, a[t])
		}, j.prototype.generate = function () {
			var a, c, d, f, g, h, i;
			return f = this.options, h = f.paneClass, i = f.sliderClass, a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && C() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), c = {
				right: -14,
				paddingRight: +d + 14
			}) : e && (c = {
				right: -e
			}, this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this
		}, j.prototype.restore = function () {
			this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
		}, j.prototype.reset = function () {
			var a, b, c, f, g, h, i, j, k, l, m, n;
			return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({
				height: this.$content.height()
			}), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(a.scrollHeight > l ? l : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * j), n < this.options.sliderMinHeight ? n = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight), g === t && f.overflowX !== t && (n += e), this.maxSliderTop = j - n, this.contentHeight = b, this.paneHeight = i, this.paneOuterHeight = j, this.sliderHeight = n, this.paneTop = k, this.slider.height(n), this.events.scroll(), this.pane.show(), this.isActive = !0, a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== t ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === a.scrollHeight && g === t ? this.slider.hide() : this.slider.show(), this.pane.css({
				opacity: this.options.alwaysVisible ? 1 : "",
				visibility: this.options.alwaysVisible ? "visible" : ""
			}), c = this.$content.css("position"), ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({
				right: "",
				marginRight: m
			})), this)
		}, j.prototype.scroll = function () {
			return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
		}, j.prototype.scrollBottom = function (a) {
			return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(p), this.stop().restore(), this) : void 0
		}, j.prototype.scrollTop = function (a) {
			return this.isActive ? (this.$content.scrollTop(+a).trigger(p), this.stop().restore(), this) : void 0
		}, j.prototype.scrollTo = function (a) {
			return this.isActive ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this) : void 0
		}, j.prototype.stop = function () {
			return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
		}, j.prototype.destroy = function () {
			return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), d && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({
				right: ""
			})), this
		}, j.prototype.flash = function () {
			return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function (a) {
				return function () {
					a.pane.removeClass("flashed")
				}
			}(this), this.options.flashDelay), this) : void 0
		}, j
	}(), a.fn.nanoScroller = function (b) {
		return this.each(function () {
			var c, d;
			if ((d = this.nanoscroller) || (c = a.extend({}, z, b), this.nanoscroller = d = new q(this, c)), b && "object" == typeof b) {
				if (a.extend(d.options, b), null != b.scrollBottom) return d.scrollBottom(b.scrollBottom);
				if (null != b.scrollTop) return d.scrollTop(b.scrollTop);
				if (b.scrollTo) return d.scrollTo(b.scrollTo);
				if ("bottom" === b.scroll) return d.scrollBottom(0);
				if ("top" === b.scroll) return d.scrollTop(0);
				if (b.scroll && b.scroll instanceof a) return d.scrollTo(b.scroll);
				if (b.stop) return d.stop();
				if (b.destroy) return d.destroy();
				if (b.flash) return d.flash()
			}
			return d.reset()
		})
	}, a.fn.nanoScroller.Constructor = q
}(jQuery, window, document);
