$(function () {
  //Chage todo styles when checked or unchecked
  $('li [type="checkbox"]').change(function () {
    var $parentEl = $(this).parent();
    var id = $parentEl.data('id');
    var checked = $(this).is(':checked');
    $.ajax({
      type: "PUT",
      url: '/todo/' + id + '/' + checked,
      data: { completed: checked },
      success: function (data) {
        console.log('Todo: ' + id + ' set to ' + checked);
        $($parentEl).data('completed', checked);
        $parentEl.toggleClass('completed', checked);
      }
    });
  });

  //Show Add Grind description
  var $todoDescButton = $('.desc-drop');
  var $todoDesc = $('#add-todo-desc');
  $todoDescButton.click(function () {
    $todoDesc.slideToggle('fast');
  });

}); //end on document load