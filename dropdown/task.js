const itemText = document.querySelector('.dropdown__value');

document.addEventListener('click', function (event) {
  const dropdownList = event.currentTarget.querySelector('.dropdown__list');
  if (event.target.closest('.dropdown')) {
    dropdownList.classList.toggle('dropdown__list_active');
  } else {
    dropdownList.classList.remove('dropdown__list_active');
  }

  if (event.target.classList.contains('dropdown__link')) {
    event.preventDefault();
    itemText.textContent = event.target.textContent;
    dropdownList.classList.remove('dropdown__list_active');
  }
});
