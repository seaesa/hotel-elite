document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ---------------- Transparent header on scroll ---------------- */
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    var syncHeaderScroll = function () {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    syncHeaderScroll();
    window.addEventListener('scroll', syncHeaderScroll, { passive: true });
  }

  /* ---------------- Mobile nav ---------------- */
  var hamburger = document.querySelector('.hamburger');
  var mainNav = document.querySelector('.main-nav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open-mobile');
      hamburger.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    mainNav.querySelectorAll('li.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (!mainNav.classList.contains('open-mobile')) return;
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      });
    });
  }

  /* ---------------- Destination carousel (scroll-snap + dots) ---------------- */
  var destTrack = document.querySelector('.destination-grid');
  var dots = document.querySelectorAll('.dots button');
  if (destTrack && dots.length) {
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        var card = destTrack.children[i];
        if (!card) return;
        destTrack.scrollTo({ left: card.offsetLeft - destTrack.offsetLeft, behavior: 'smooth' });
      });
    });
    var syncDots = function () {
      var cards = Array.prototype.slice.call(destTrack.children);
      var idx = 0, min = Infinity;
      cards.forEach(function (c, i) {
        var d = Math.abs(c.offsetLeft - destTrack.scrollLeft);
        if (d < min) { min = d; idx = i; }
      });
      dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    };
    destTrack.addEventListener('scroll', function () {
      window.clearTimeout(destTrack._t);
      destTrack._t = window.setTimeout(syncDots, 80);
    });
  }

  /* ---------------- Video play swap ---------------- */
  var videoBox = document.querySelector('.video-box');
  if (videoBox) {
    var playBtn = videoBox.querySelector('.video-play-btn');
    playBtn && playBtn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/EuzCI9GTXxA?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      videoBox.appendChild(iframe);
      videoBox.classList.add('playing');
    });
  }

  /* ---------------- Featured brands: filter pills + tabs + pagination ---------------- */
  var DISTRICTS = ['Hải Châu', 'Sơn Trà', 'Ngũ Hành Sơn', 'Cẩm Lệ', 'Thanh Khê', 'Liên Chiểu', 'Hòa Vang'];
  var IMG = {
    pool: 'uploads/product_menu/dat-phong-khach-san-resort-1749032225.webp',
    room: 'uploads/article/danh-sach-can-ho-cho-thue-tai-da-nang-gia-hop-ly-nhat-2025-1756259555.jpg',
    building: 'uploads/product_menu/quan-ly-van-hanh-toa-nha-1748503936.webp',
    event: 'uploads/product_menu/to-chuc-su-kien-1748503834.webp'
  };
  var IMG_CYCLE = [IMG.pool, IMG.room, IMG.building, IMG.event];

  function buildList(names, basePrice) {
    return names.map(function (name, i) {
      return {
        name: name,
        district: DISTRICTS[i % DISTRICTS.length],
        price: (basePrice + i * 95) * 1000,
        img: IMG_CYCLE[i % IMG_CYCLE.length]
      };
    });
  }

  var DATA = {
    apartment: buildList([
      'Elite Luxury Apartment Đà Nẵng', 'Tarasa Hotel Suites', 'Golden Light Residence',
      'Sơn Trà Beachside Apartment', 'Ngũ Hành Sơn Seaview Apartment', 'Hải Châu Central Apartment',
      'Bạch Đằng River View Apartment', 'Mỹ Khê Beach Apartment', 'Cẩm Lệ Garden Apartment',
      'Thanh Khê Skyline Apartment', 'Liên Chiểu Bay Apartment', 'Hòa Vang Hillside Apartment',
      'Elite Luxury Riverside Suites', 'Tarasa Ocean Residence', 'Golden Light City Apartment',
      'Sơn Trà Peninsula Apartment', 'Ngũ Hành Sơn Marble Suites', 'Hải Châu Old Town Apartment'
    ], 900),
    hotel: buildList([
      'Elite Luxury Hotel', 'Tarasa Hotel', 'Golden Light Hotel',
      'Sơn Trà Beach Hotel', 'Ngũ Hành Sơn Resort Hotel', 'Hải Châu Boutique Hotel',
      'Bạch Đằng Riverside Hotel', 'Mỹ Khê Ocean Hotel', 'Cẩm Lệ Garden Hotel'
    ], 1050)
  };

  var brandsGrid = document.querySelector('.brands-grid');
  var pillsWrap = document.querySelector('.filter-pills');
  var tabsWrap = document.querySelector('.brand-tabs');
  var pager = document.querySelector('.pager');

  if (brandsGrid && pillsWrap && tabsWrap && pager) {
    var state = { tab: 'apartment', district: 'all', page: 1, perPage: 6 };
    var pageCountEl = pager.querySelector('.page-count');
    var prevBtn = pager.querySelector('.prev');
    var nextBtn = pager.querySelector('.next');

    function money(n) { return n.toLocaleString('vi-VN'); }

    function render() {
      var list = DATA[state.tab].filter(function (item) {
        return state.district === 'all' || item.district === state.district;
      });
      var totalPages = Math.max(1, Math.ceil(list.length / state.perPage));
      state.page = Math.min(state.page, totalPages);
      var start = (state.page - 1) * state.perPage;
      var pageItems = list.slice(start, start + state.perPage);

      brandsGrid.innerHTML = pageItems.map(function (item) {
        return '' +
          '<div class="brand-card">' +
            '<div class="thumb">' +
              '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy">' +
              '<button class="fav-btn" aria-label="Yêu thích"><i class="fa-regular fa-heart"></i></button>' +
            '</div>' +
            '<div class="body">' +
              '<h3>' + item.name + '</h3>' +
              '<p class="loc">Quận ' + item.district + ', Đà Nẵng</p>' +
              '<p class="price">Từ <strong>' + money(item.price) + 'đ</strong> / đêm</p>' +
              '<a href="javascript:void(0)" class="more">Xem chi tiết <i class="fa-solid fa-arrow-right"></i></a>' +
            '</div>' +
          '</div>';
      }).join('') || '<p style="grid-column:1/-1;color:var(--gray-500)">Không có kết quả phù hợp.</p>';

      pageCountEl.textContent = state.page + '/' + totalPages;
      prevBtn.disabled = state.page <= 1;
      nextBtn.disabled = state.page >= totalPages;
    }

    pillsWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      pillsWrap.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.district = btn.dataset.district || 'all';
      state.page = 1;
      render();
    });

    tabsWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.brand-tab');
      if (!btn) return;
      tabsWrap.querySelectorAll('.brand-tab').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.tab = btn.dataset.tab;
      state.page = 1;
      render();
    });

    brandsGrid.addEventListener('click', function (e) {
      var fav = e.target.closest('.fav-btn');
      if (!fav) return;
      fav.classList.toggle('active');
      fav.querySelector('i').classList.toggle('fa-regular');
      fav.querySelector('i').classList.toggle('fa-solid');
    });

    prevBtn.addEventListener('click', function () { if (state.page > 1) { state.page--; render(); } });
    nextBtn.addEventListener('click', function () { state.page++; render(); });

    render();
  }

  /* ---------------- Article card favorite toggle ---------------- */
  document.querySelectorAll('.article-card .fav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('active');
      var icon = btn.querySelector('i');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    });
  });

  /* ---------------- Newsletter form ---------------- */
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector('input');
      var btn = newsletterForm.querySelector('button');
      if (!input.value.trim()) return;
      var original = btn.textContent;
      btn.textContent = 'Đã đăng ký!';
      input.value = '';
      window.setTimeout(function () { btn.textContent = original; }, 2200);
    });
  }

  /* ---------------- Search box: destination, dates, guests ---------------- */
  var searchFields = document.querySelectorAll('.search-field[data-toggle]');
  if (searchFields.length) {
    function closeAllFields(except) {
      searchFields.forEach(function (f) { if (f !== except) f.classList.remove('open'); });
    }
    function openField(field) {
      if (!field) return;
      closeAllFields(field);
      field.classList.add('open');
    }
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-field')) closeAllFields();
    });
    searchFields.forEach(function (field) {
      field.addEventListener('click', function () {
        var willOpen = !field.classList.contains('open');
        closeAllFields(field);
        field.classList.toggle('open', willOpen);
      });
      var popover = field.querySelector('.field-popover');
      if (popover) popover.addEventListener('click', function (e) { e.stopPropagation(); });
    });

    var destField = document.querySelector('.search-field[data-toggle="destination"]');
    var checkinField = document.querySelector('.search-field[data-toggle="checkin"]');
    var checkoutField = document.querySelector('.search-field[data-toggle="checkout"]');
    var guestsField = document.querySelector('.search-field[data-toggle="guests"]');

    /* Destination dropdown */
    if (destField) {
      destField.querySelectorAll('.option-list li').forEach(function (li) {
        li.addEventListener('click', function () {
          destField.querySelector('.value').textContent = li.dataset.value;
          destField.querySelectorAll('.option-list li').forEach(function (o) { o.classList.remove('active'); });
          li.classList.add('active');
          destField.classList.remove('open');
          openField(checkinField);
        });
      });
    }

    /* Date pickers */
    if (checkinField && checkoutField) {
      var checkinCal = checkinField.querySelector('.popover-calendar');
      var checkoutCal = checkoutField.querySelector('.popover-calendar');
      var dateState = { checkin: null, checkout: null };
      var MONTHS = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
      var WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      var today0 = new Date(); today0.setHours(0, 0, 0, 0);

      function pad2(n) { return n < 10 ? '0' + n : '' + n; }
      function formatDate(d) { return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear(); }
      function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

      function renderCalendar(container, opts) {
        var viewDate = opts.viewDate;
        function build() {
          var y = viewDate.getFullYear(), m = viewDate.getMonth();
          var startOffset = new Date(y, m, 1).getDay();
          var daysInMonth = new Date(y, m + 1, 0).getDate();
          var html = '<div class="cal-header">' +
            '<button type="button" class="cal-nav prev" aria-label="Tháng trước"><i class="fa-solid fa-chevron-left"></i></button>' +
            '<span class="cal-title">' + MONTHS[m] + ' ' + y + '</span>' +
            '<button type="button" class="cal-nav next" aria-label="Tháng sau"><i class="fa-solid fa-chevron-right"></i></button>' +
            '</div>' +
            '<div class="cal-weekdays">' + WEEKDAYS.map(function (w) { return '<span>' + w + '</span>'; }).join('') + '</div>' +
            '<div class="cal-days">';
          for (var i = 0; i < startOffset; i++) html += '<span class="cal-day empty"></span>';
          for (var d = 1; d <= daysInMonth; d++) {
            var date = new Date(y, m, d);
            var disabled = opts.minDate && date < opts.minDate;
            var classes = ['cal-day'];
            if (sameDay(date, opts.selected)) classes.push('selected');
            if (sameDay(date, today0)) classes.push('today');
            if (disabled) classes.push('disabled');
            html += '<button type="button" class="' + classes.join(' ') + '" data-day="' + d + '"' + (disabled ? ' disabled' : '') + '>' + d + '</button>';
          }
          html += '</div>';
          container.innerHTML = html;
          container.querySelector('.prev').addEventListener('click', function () {
            viewDate = new Date(y, m - 1, 1);
            build();
          });
          container.querySelector('.next').addEventListener('click', function () {
            viewDate = new Date(y, m + 1, 1);
            build();
          });
          container.querySelectorAll('.cal-day:not(.empty):not(.disabled)').forEach(function (btn) {
            btn.addEventListener('click', function () {
              opts.onSelect(new Date(y, m, parseInt(btn.dataset.day, 10)));
            });
          });
        }
        build();
      }

      function updateCheckinCalendar() {
        renderCalendar(checkinCal, {
          selected: dateState.checkin,
          minDate: today0,
          viewDate: dateState.checkin || today0,
          onSelect: function (date) {
            dateState.checkin = date;
            checkinField.querySelector('.value').textContent = formatDate(date);
            checkinField.classList.remove('open');
            if (dateState.checkout && dateState.checkout <= date) {
              dateState.checkout = null;
              checkoutField.querySelector('.value').textContent = 'Chọn ngày';
            }
            updateCheckinCalendar();
            updateCheckoutCalendar();
            openField(checkoutField);
          }
        });
      }
      function updateCheckoutCalendar() {
        var minCheckout = dateState.checkin ? new Date(dateState.checkin.getTime() + 86400000) : today0;
        renderCalendar(checkoutCal, {
          selected: dateState.checkout,
          minDate: minCheckout,
          viewDate: dateState.checkout || minCheckout,
          onSelect: function (date) {
            dateState.checkout = date;
            checkoutField.querySelector('.value').textContent = formatDate(date);
            checkoutField.classList.remove('open');
            updateCheckoutCalendar();
            openField(guestsField);
          }
        });
      }
      updateCheckinCalendar();
      updateCheckoutCalendar();
    }

    /* Guests stepper */
    if (guestsField) {
      var guestState = { adults: 2, children: 0, rooms: 1 };
      var guestLimits = { adults: { min: 1, max: 10 }, children: { min: 0, max: 6 }, rooms: { min: 1, max: 5 } };

      function updateGuestSummary() {
        var text = guestState.adults + ' người lớn';
        if (guestState.children > 0) text += ', ' + guestState.children + ' trẻ em';
        text += ', ' + guestState.rooms + ' phòng';
        guestsField.querySelector('.value').textContent = text;
      }

      guestsField.querySelectorAll('.guest-row').forEach(function (row) {
        var key = row.dataset.key;
        var countEl = row.querySelector('.count');
        var minusBtn = row.querySelector('.minus');
        var plusBtn = row.querySelector('.plus');
        function refresh() {
          countEl.textContent = guestState[key];
          minusBtn.disabled = guestState[key] <= guestLimits[key].min;
          plusBtn.disabled = guestState[key] >= guestLimits[key].max;
        }
        minusBtn.addEventListener('click', function () {
          if (guestState[key] > guestLimits[key].min) { guestState[key]--; refresh(); }
        });
        plusBtn.addEventListener('click', function () {
          if (guestState[key] < guestLimits[key].max) { guestState[key]++; refresh(); }
        });
        refresh();
      });

      var guestsApplyBtn = guestsField.querySelector('.guests-apply');
      guestsApplyBtn.addEventListener('click', function () {
        updateGuestSummary();
        guestsField.classList.remove('open');
      });
    }
  }
});
