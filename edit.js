var editButton = document.getElementById('editButton');
var editForm = document.getElementById('editForm');
var newTextInput = document.getElementById('newTextInput');
var originalTextElement = document.getElementById('originalText');

// 编辑按钮点击事件处理
editButton.addEventListener('click', function() {
  // 显示编辑表单
  editForm.style.display = 'block';

  // 将原始文本预填入输入框（可选）
  newTextInput.value = originalTextElement.textContent;
});

// 提交按钮事件处理
editForm.addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表单默认提交行为

  // 获取用户输入的新文本
  var newText = newTextInput.value;

  // 更改原始文本内容
  originalTextElement.textContent = newText;

  // 隐藏编辑表单
  editForm.style.display = 'none';
});