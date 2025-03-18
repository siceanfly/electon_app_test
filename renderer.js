document.addEventListener('DOMContentLoaded', () => {
  // Tab 切换逻辑
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // 移除所有激活状态
      document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
        el.classList.remove('active')
      })
      
      // 设置当前激活状态
      const tabId = btn.dataset.tab
      btn.classList.add('active')
      document.getElementById(tabId).classList.add('active')
    })
  })

  // 终端功能（Tab2）
  const output = document.getElementById('output')
  const commandInput = document.getElementById('commandInput')
  const executeBtn = document.getElementById('executeBtn')

  executeBtn.addEventListener('click', async () => {
    const command = commandInput.value.trim()
    if (!command) return

    try {
      const result = await window.electronAPI.executeCommand(command)
      output.textContent += `$ ${command}\n${result}\n`
      commandInput.value = ''
      output.scrollTop = output.scrollHeight
    } catch (error) {
      output.textContent += `Error: ${error.message}\n`
    }
  })

  // 粒子动画初始化
  function initParticles() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(0, 243, 255, ${Math.random() * 0.5});
        border-radius: 50%;
        animation: particle ${10 + Math.random() * 20}s linear infinite;
      `;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const animation = particle.style.animation;
      particle.style.animation = `${animation} ${-Math.random() * 20}s`;
      
      particles.appendChild(particle);
    }
  }

  // 添加 CSS 关键帧
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particle {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    
    // 按钮波纹效果
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: ripple 0.6s linear;
        `;
        
        const rect = btn.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  });

  // Tab1 按钮悬浮效果
  document.querySelectorAll('#tab1 .action-btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      this.style.setProperty('--x', `${x}px`)
      this.style.setProperty('--y', `${y}px`)
    })
  })

  // Tab3 按钮机甲启动音效
  const activateSound = new Audio('data:audio/wav;base64,UklGRl9v...') // 替换为真实音效

  document.querySelectorAll('#tab3 .action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activateSound.play()
      btn.style.animation = 'glitch 0.3s linear'
      setTimeout(() => btn.style.animation = '', 300)
    })
  })

  // 终端输入增强
  commandInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') executeBtn.click()
  })

  // 添加动态日志效果
  setInterval(() => {
    const messages = [
      'System: All systems nominal',
      'Security: Firewall active',
      'Network: 1.2Gbps throughput',
      'Storage: 87% capacity free'
    ]
    if (Math.random() > 0.7 && output.textContent.split('\n').length < 20) {
      output.textContent += `${messages[Math.floor(Math.random()*messages.length)]}\n`
      output.scrollTop = output.scrollHeight
    }
  }, 3000)
})