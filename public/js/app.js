$(function () {
  $('li [type="checkbox"]').change(function () {
    // var $this = this;
    var id = $(this).data('id');
    var checked = $(this).is(':checked');
    $.ajax({
      type: "PUT",
      url: '/todo/' + id + '/completed',
      data: { completed: checked },
      success: function (data) {
        console.log('Todo: ' + id + ' set to ' + checked);
      }
    });
  });
});