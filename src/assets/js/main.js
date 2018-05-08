$(document).on('click', '.btn-download-publish', function (e) {
  e.preventDefault();
  var $this = $(this);
  var url=$this.data('href');
  console.log(url);
  $.ajax({
    url: $this.data('href'),
    method: 'GET',
    success: function (data) {
      download(data, $this.data('name')+".html", "text/html");
    }
  });
});
