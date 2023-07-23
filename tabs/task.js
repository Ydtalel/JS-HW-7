const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab__content');

tabs.forEach((tab, idx) => {
  tab.addEventListener('click', () => {
    const activeTab = document.querySelector('.tab_active');
    const activeTabContent = document.querySelector('.tab__content_active');

    if (activeTab) {
      activeTab.classList.remove('tab_active');
    }
    if (activeTabContent) {
      activeTabContent.classList.remove('tab__content_active');
    }

    tab.classList.add('tab_active');
    tabContents[idx].classList.add('tab__content_active');
  });
});
