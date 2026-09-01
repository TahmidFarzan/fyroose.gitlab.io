(function ($) {
  'use strict';

  var $header = $('#siteHeader');

  function handleHeaderScroll() {
    if ($(window).scrollTop() > 40) {
      $header.addClass('scrolled');
    } else {
      $header.removeClass('scrolled');
    }
  }

  $(window).on('scroll', handleHeaderScroll);
  handleHeaderScroll();

  $('#navMenu .nav-link').on('click', function () {
    var $menu = $('#navMenu');
    if ($menu.hasClass('show')) {
      $menu.collapse('hide');
    }
  });

  var $year = $('#year');
  if ($year.length) {
    $year.text(new Date().getFullYear());
  }

  var revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  var workVideos = [
    "https://youtube.com/shorts/YbqJW7BMCfU?si=PXQepedbox9ZTYBk",
    "https://youtube.com/shorts/neZF2IpPI_U?si=5bvwCN60DrpUHepD",
    "https://youtube.com/shorts/ajZg2gkSVG8?si=ANHmAWovkgFjVulj"
  ];

  var INITIAL_WORK_COUNT = 6;
  var WORK_LOAD_MORE_COUNT = 6;

  var $workGrid = $('#workGrid');
  var $workLoadMoreWrap = $('#workLoadMoreWrap');
  var $workLoadMore = $('#workLoadMore');
  var $workCount = $('#workCount');

  function getYouTubeVideoId(url) {
    try {
      var parsedUrl = new URL(url);

      var hostname = parsedUrl.hostname.replace(/^www\./, '').replace(/^m\./, '');

      var videoId = '';

      if (hostname === 'youtube.com' || hostname === 'music.youtube.com') {

        if (parsedUrl.pathname.startsWith('/shorts/')) {
          videoId = parsedUrl.pathname.split('/shorts/')[1].split('/')[0];
        }
        else if (parsedUrl.pathname === '/watch') {
          videoId = parsedUrl.searchParams.get('v') || '';
        }
        else if (parsedUrl.pathname.startsWith('/embed/')) {
          videoId = parsedUrl.pathname.split('/embed/')[1].split('/')[0];
        }

      } else if (hostname === 'youtu.be') {
        videoId = parsedUrl.pathname.substring(1).split('/')[0];
      }

      videoId = videoId.trim();

      if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return null;
      }

      return videoId;

    } catch (error) {
      console.warn('Invalid YouTube URL:', url);
      return null;
    }
  }

  function padIndex(n) {
    return String(n).padStart(2, '0');
  }

  function thumbnailSrc(id) {
    return 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
  }

  function thumbnailFallback(id) {
    return 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
  }

  function pluralLabel(n) {
    return n === 1 ? n + ' PROJECT' : n + ' PROJECTS';
  }

  function prepareVideos(urls) {
    var valid = [];
    urls.forEach(function (url) {
      var id = getYouTubeVideoId(url);
      if (id) {
        valid.push({ videoId: id, originalUrl: url });
      } else {
        console.warn('Invalid YouTube URL:', url);
      }
    });
    return valid;
  }

  var validVideos = prepareVideos(workVideos);
  var renderedCount = 0;

  function detectTouch() {
    var touch = (
      'ontouchstart' in window ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
    );
    if (touch) {
      $workGrid.addClass('is-touch');
    }
  }

  var cardObserver = null;
  if ('IntersectionObserver' in window) {
    cardObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  }

  function watchCard($card) {
    $card.addClass('in-view');
    if (cardObserver) {
      $card.removeClass('in-view');
      cardObserver.observe($card[0]);
    }
  }

  function buildCard(item) {
    var id = item.videoId;
    var originalUrl = item.originalUrl;
    var num = padIndex(item.index);
    var label = 'Selected Edit ' + num;
    var watchLabel = 'Watch ' + label + ' on YouTube';

    var $card = $('<div>', {
      class: 'col-12 col-sm-6 col-lg-4'
    });

    var $inner = $('<a>', {
      class: 'work-card',
      href: originalUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': watchLabel
    });

    $inner.append(
      $('<img>', {
        class: 'work-thumb',
        src: thumbnailSrc(id),
        alt: label + ' thumbnail',
        loading: 'lazy',
        decoding: 'async',
        onerror: 'this.onerror=null;this.src=' + JSON.stringify(thumbnailFallback(id))
      }),
      $('<div>', { class: 'work-thumb-shade' }),
      $('<span>', { class: 'work-frame-label' }).text('EDIT ' + num),
      $('<span>', { class: 'work-card-index' }).text(num),
      $('<span>', { class: 'work-crop work-crop-tl', 'aria-hidden': 'true' }),
      $('<span>', { class: 'work-crop work-crop-br', 'aria-hidden': 'true' }),
      $('<span>', { class: 'work-play', 'aria-hidden': 'true' }).html('<i class="fas fa-play"></i>'),
      $('<div>', { class: 'work-caption' }).append(
        $('<span>', { class: 'work-edit-label' }).text('Selected Edit'),
        $('<span>', { class: 'work-category' }).text(label)
      ),
      $('<span>', { class: 'work-play-hint', 'aria-hidden': 'true' }).text('Watch Edit')
    );

    $card.append($inner);
    return $card;
  }

  function renderRange(start, count) {
    for (var i = start; i < start + count && i < validVideos.length; i++) {
      var item = {
        videoId: validVideos[i].videoId,
        originalUrl: validVideos[i].originalUrl,
        index: i + 1
      };
      var $card = buildCard(item);
      $workGrid.append($card);
      watchCard($card.find('.work-card'));
    }
  }

  function updateWorkControls() {
    $workCount.text(pluralLabel(validVideos.length));

    var remaining = validVideos.length - renderedCount;
    if (validVideos.length > INITIAL_WORK_COUNT && remaining > 0) {
      $workLoadMoreWrap.addClass('visible');
    } else {
      $workLoadMoreWrap.removeClass('visible');
    }
  }

  $workLoadMore.on('click', function () {
    renderRange(renderedCount, WORK_LOAD_MORE_COUNT);
    renderedCount = Math.min(renderedCount + WORK_LOAD_MORE_COUNT, validVideos.length);
    updateWorkControls();
  });

  function initWork() {
    detectTouch();

    var initialCount = Math.min(INITIAL_WORK_COUNT, validVideos.length);
    renderRange(0, initialCount);
    renderedCount = initialCount;

    updateWorkControls();
  }

  initWork();

})(jQuery);
