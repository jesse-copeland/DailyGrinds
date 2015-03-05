$(function () {
  var $todoList = $('ul.todo');
  
  // Chage todo styles when checked or unchecked

  $todoList.on('change', 'li [type="checkbox"]', function () {
    var $parentEl = $(this).parent();
    console.log($parentEl);
    var id = $parentEl.data('id');
    console.log(id);
    var checked = $(this).is(':checked');
    $.ajax({
      type: 'PUT',
      url: '/todo/' + id + '/' + checked,
      data: { completed: checked },
      success: function (data) {
        console.log('Todo: ' + id + ' set to ' + checked);
        $($parentEl).data('completed', checked);
        $parentEl.toggleClass('completed', checked);
      }
    });
  });
  
  var $todoForm = $('form.add-todo-form');
  
  // Show Add Grind description
  var $addTodoInput = $('.add-todo-title');
  var $todoDesc = $('#add-todo-desc');
  
  $todoForm.focusin($todoDesc.slideToggle('fast'));


    
  // Submit new Grind
  $todoForm.submit(function (event) {
    event.preventDefault();
    console.log('add todo submit');
    var newTodoTitle = $addTodoInput.val();
    var newTodoDescription = $todoDesc.val();

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: {
        title: newTodoTitle,
        description: newTodoDescription
      },
      success: function (data) {
        $todoList.prepend(data);
        $addTodoInput.val('');
        $todoDesc.val('');

      },
      fail: function () {
        
      }
    });
  });
}); // end on document load