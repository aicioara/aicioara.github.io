var Analytics = (function() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-55332519-1', 'auto');
  ga('send', 'pageview');

  var socialImageErrorTriggered = false;
  var socialImageErrorLogged = false;
  var pageLoaded = false;

  handleOutboundLinkClicks = function(event) {
    ga('send', 'event', {
      eventCategory: 'Outbound Link',
      eventAction: 'click',
      eventLabel: this.href,
      transport: 'beacon'
    });
  }

  handleSocialPictureError = function() {
    if (socialImageErrorLogged) {
      return;
    }
    ga('send', 'event', {
      eventCategory: 'Error',
      eventAction: 'Image',
      eventLabel: 'Social',
      transport: 'beacon'
    })
    socialImageErrorLogged = true;
  }

  sendSocialImageError = function() {
    if (pageLoaded) {
      handleSocialPictureError();
    }
    socialImageErrorTriggered = true;
  }

  window.onload = function() {
    pageLoaded = true;
    var anchors = document.getElementsByTagName("a"), item;
    for (var i = 0; i < anchors.length; i++) {
      item = anchors[i];
      if (item.id && item.id.indexOf("href-t-") == 0) {
        item.onclick = handleOutboundLinkClicks;
      }
    }
    if (socialImageErrorTriggered) {
      handleSocialPictureError();
    }
  }

  return {
    sendSocialImageError: sendSocialImageError
  }

})();
