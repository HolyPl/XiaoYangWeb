document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    // 表单验证函数
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const privacyPolicy = document.getElementById('privacy_policy');

        // 重置所有输入框的样式
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.style.borderColor = '#ddd';
            const errorMsg = input.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });

        // 验证姓名
        if (!name.value.trim()) {
            showError(name, '请输入您的姓名');
            isValid = false;
        }

        // 验证邮箱
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            showError(email, '请输入有效的邮箱地址');
            isValid = false;
        }

        // 验证主题
        if (!subject.value.trim()) {
            showError(subject, '请输入消息主题');
            isValid = false;
        }

        // 验证消息内容
        if (!message.value.trim()) {
            showError(message, '请输入消息内容');
            isValid = false;
        }

        // 验证隐私政策
        if (!privacyPolicy.checked) {
            const label = privacyPolicy.parentElement;
            label.style.color = '#e74c3c';
            isValid = false;
        }

        return isValid;
    }

    // 显示错误信息
    function showError(input, message) {
        input.style.borderColor = '#e74c3c';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.textContent = message;
        input.parentElement.appendChild(errorDiv);
    }

    // 表单提交处理
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // 模拟表单提交
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '发送中...';

        setTimeout(() => {
            formSuccess.style.display = 'block';
            formError.style.display = 'none';
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = '发送消息';

            // 3秒后隐藏成功消息
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 3000);
        }, 1500);
    });

    // 添加输入框焦点效果
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'none';
        });
    });

    // 添加社交媒体图标悬停效果
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(360deg)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'none';
        });
    });

    // 添加地图容器加载动画
    const mapContainer = document.querySelector('.map-container');
    mapContainer.style.opacity = '0';
    mapContainer.style.transform = 'translateY(20px)';

    setTimeout(() => {
        mapContainer.style.transition = 'all 0.8s ease';
        mapContainer.style.opacity = '1';
        mapContainer.style.transform = 'none';
    }, 500);

    // 隐私政策模态框交互逻辑
    document.getElementById('privacy-policy-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('privacy-modal').style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    document.getElementById('close-privacy-modal').addEventListener('click', function() {
        document.getElementById('privacy-modal').style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    });

    // 点击模态框外部区域关闭
    document.getElementById('privacy-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('privacy-modal').style.display === 'block') {
            document.getElementById('privacy-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});