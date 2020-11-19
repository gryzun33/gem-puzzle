export function changeOrder(currChip, orderMemory, topMemory, bottomMemory, leftMemory,
  rightMemory) {
  const empty = document.querySelector('.empty');
  currChip.style.order = empty.style.order;
  currChip.style.top = empty.style.top;
  currChip.style.bottom = empty.style.bottom;
  currChip.style.left = empty.style.left;
  currChip.style.right = empty.style.right;
  empty.style.order = orderMemory;
  empty.style.top = topMemory;
  empty.style.bottom = bottomMemory;
  empty.style.left = leftMemory;
  empty.style.right = rightMemory;
  currChip.style.zIndex = 'auto';
}
