$(function () {
  var $todoList = $('ul.todo');
  
  // Check or uncheck Todo as completed
  $todoList.on('change', 'li [type="checkbox"]', function () {
    var $parentEl = $(this).parent();
    var id = $parentEl.data('id');
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
  
  // $todoForm.focusin($todoDesc.slideToggle('fast'));

  // Submit new Grind to add
  $todoForm.submit(function (event) {
    event.preventDefault();
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

  // Delete Grind
  $todoList.on('click', 'a.delete-todo-button', function (event) {    
    event.preventDefault();
    var delTarget = $(this).attr('href');

    $.ajax({
      type: 'DELETE',
      url: delTarget,
      success: function (data) {
        console.log('Client: delete todo ' + data._id);
        $('li[data-id="' + data._id + '"]').remove();
      }
    });
  });

  // Change Todo list item to update input when clicked
  $todoList.on('click', 'span.todo-title', function (event) {
    var $editTarget = $(this);
    var $parentWrapper = $editTarget.parent();
    var existingText = $editTarget.text();
    var todoId = $editTarget.parentsUntil('ul').last().data('id');
    var $inputField = $('<input>', {
      type: 'text',
      name: 'update-todo',
      class: 'todo-update-input',
      val: existingText
    });
    $editTarget.hide();
    $inputField.appendTo($parentWrapper).focus();
    $inputField[0].setSelectionRange(0,999);
    $inputField.bind('blur', event, function () {
      updateTodo(todoId, existingText, $(this).val());
    });
  });
}); // end on document load

function updateTodo (id, oldVal, newVal) {

  if (oldVal !== newVal) {
    $.ajax({
      type: 'PUT',
      url: '/todo/' + id,
      data: { title: newVal },
      success: function (data) {
        console.log('update successful:', data);
      },
      fail: function () {
        
      }
    });   
  }
}