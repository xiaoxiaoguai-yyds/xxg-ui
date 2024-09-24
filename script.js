document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const progressBar = document.getElementById('progress-bar');
  const welcomePopup = document.getElementById('welcome-popup');
  const fadeInText = document.querySelector('.fade-in-text');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 添加淡入效果
  setTimeout(() => {
    const fadeInText = document.querySelector('.fade-in-text');
    fadeInText.style.opacity = '0.5';
  }, 500);

  // 模拟加载进度
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        progressBar.style.width = '0';
      }, 300);
    }
    progressBar.style.width = `${progress}%`;
  }, 200);

  // 显示欢迎提示窗
  setTimeout(() => {
    welcomePopup.classList.add('show');
  }, 1000);

  // 4秒后关闭欢迎提示窗
  setTimeout(() => {
    welcomePopup.classList.remove('show');
  }, 5000);

  // 添加滚动事件监听器
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const fadeOutThreshold = 200; // 开始淡出的滚动位置
    
    if (scrollPosition > fadeOutThreshold) {
      const opacity = Math.max(0, 1 - (scrollPosition - fadeOutThreshold) / 200);
      fadeInText.style.opacity = opacity;
    } else {
      fadeInText.style.opacity = 1;
    }
  });

  const lazyLoadSections = document.querySelectorAll('.lazy-load');

  const lazyLoad = () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    lazyLoadSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  };

  // 初始加载
  lazyLoad();

  // 滚动时加载
  window.addEventListener('scroll', lazyLoad);

  // 添加夜间模式切换功能
  const nightModeToggle = document.getElementById('night-mode-toggle');
  const body = document.body;

  nightModeToggle.addEventListener('click', () => {
    // 添加一个类来触发过渡效果
    body.classList.add('transitioning');
    
    // 切换夜间模式
    body.classList.toggle('night-mode');
    
    // 切换图标
    const icon = nightModeToggle.querySelector('i');
    if (body.classList.contains('night-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }

    // 保存用户偏好
    localStorage.setItem('nightMode', body.classList.contains('night-mode'));

    // 在过渡结束后移除过渡类
    setTimeout(() => {
      body.classList.remove('transitioning');
    }, 500); // 这个时间应该与CSS中的过渡时间相匹配
  });

  // 检查用户之前的偏好
  const nightModePreference = localStorage.getItem('nightMode');
  if (nightModePreference === 'true') {
    // 添加一个小延迟，以确保页面加载后再应用夜间模式
    setTimeout(() => {
      body.classList.add('night-mode');
      nightModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }, 100);
  }

  // 删除原有的language-cloud相关代码

  // 添加以下代码
  const skills = [
    { name: 'JavaScript', percentage: 90 },
    { name: 'Python', percentage: 85 },
    { name: 'Java', percentage: 80 },
    { name: 'C++', percentage: 75 },
    { name: 'HTML', percentage: 95 },
    { name: 'CSS', percentage: 90 },
    { name: 'React', percentage: 85 },
    { name: 'Node.js', percentage: 80 },
    { name: 'SQL', percentage: 75 }
  ];

  function createSkillCircles() {
    const skillsContainer = document.getElementById('skills-container');

    skills.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      circle.setAttribute('class', 'skill-circle');
      circle.setAttribute('viewBox', '0 0 36 36');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'circle-bg');
      path.setAttribute('d', 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', '#eee');
      path.setAttribute('stroke-width', '3');

      const progressPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      progressPath.setAttribute('class', 'circle');
      progressPath.setAttribute('d', 'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831');
      progressPath.setAttribute('fill', 'none');
      progressPath.setAttribute('stroke', '#3498db');
      progressPath.setAttribute('stroke-width', '3');
      progressPath.setAttribute('stroke-dasharray', '0, 100');

      circle.appendChild(path);
      circle.appendChild(progressPath);

      const skillName = document.createElement('div');
      skillName.className = 'skill-name';
      skillName.textContent = skill.name;

      const skillPercentage = document.createElement('div');
      skillPercentage.className = 'skill-percentage';
      skillPercentage.textContent = '0%';

      skillItem.appendChild(circle);
      skillItem.appendChild(skillName);
      skillItem.appendChild(skillPercentage);

      skillsContainer.appendChild(skillItem);
    });
  }

  function animateSkillCircles() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
      const circle = item.querySelector('.circle');
      const percentage = item.querySelector('.skill-percentage');
      const targetPercentage = skills[index].percentage;
      let currentPercentage = 0;

      const animation = setInterval(() => {
        if (currentPercentage >= targetPercentage) {
          clearInterval(animation);
        } else {
          currentPercentage++;
          circle.setAttribute('stroke-dasharray', `${currentPercentage}, 100`);
          percentage.textContent = `${currentPercentage}%`;
        }
      }, 20);
    });
  }

  // 在DOMContentLoaded事件监听器中调用createSkillCircles函数
  createSkillCircles();

  // 添加滚动监听器来触发动画
  const skillsSection = document.getElementById('skills');
  let animated = false;

  window.addEventListener('scroll', () => {
    if (!animated && isElementInViewport(skillsSection)) {
      animateSkillCircles();
      animated = true;
    }
  });

  // 辅助函数：检查元素是否在视口中
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
});