require("dotenv").config(); // 读取 .env 文件
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000; // 你可以修改端口

// 允许跨域请求
app.use(cors());
app.use(bodyParser.json()); // 解析 JSON 格式的请求体

// 创建邮件发送函数
const transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // QQ 邮箱 SMTP 服务器
    port: 465,
    secure: true, // 使用 SSL
    auth: {
        user: "2769691794@qq.com", // 你的 QQ 邮箱
        pass: "nbffuwujgiogdegd", // 你的 QQ 邮箱授权码
    },
});

// 处理 POST 请求，接收表单数据并发送邮件
app.post("/send-email", (req, res) => {
    const { name, company, email, phone, subject, projectType, budget, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
        return res.status(400).json({ error: "请填写所有必填字段" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "2769691794@qq.com", // 收件人邮箱
        subject: `来自 ${name} 的联系请求：${subject}`,
        html: `
            <h2>来自 ${name} 的联系请求：</h2>
            <p><strong>公司名称:</strong> ${company || "未填写"}</p>
            <p><strong>邮箱:</strong> ${email}</p>
            <p><strong>电话:</strong> ${phone}</p>
            <p><strong>主题:</strong> ${subject}</p>
            <p><strong>项目类型:</strong> ${projectType || "未选择"}</p>
            <p><strong>预算范围:</strong> ${budget || "未选择"}</p>
            <p><strong>消息内容:</strong> <br/>${message}</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ 邮件发送失败:", error);
            return res.status(500).json({ error: "邮件发送失败" });
        }
        console.log("✅ 邮件发送成功:", info.response);
        res.status(200).json({ message: "邮件已发送！" });
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});
