// Translate existing text nodes without rebuilding links or analytics handlers.
(() => {
  const translations = {
  "你好，我是李鹏飞": "Hi, I'm Pengfei Li",
  "探索云服务，理解真实需求。": "Exploring cloud. Understanding needs.",
  "跳至正文": "Skip to content",
  "主导航": "Main navigation",
  "职业方向": "Career focus",
  "工作经历": "Experience",
  "关于我": "About",
  "查看简历": "Resume",
  "首页": "Home",
  "← 返回文章列表": "← Back to articles",
  "文章": "Articles",
  "暂无公开记录": "No public entries yet",
  "李鹏飞的文章与公开记录。": "Articles and public notes by Pengfei Li.",
  "李鹏飞": "Pengfei Li",
  "李鹏飞的头像": "Portrait of Pengfei Li",
  "李鹏飞的个人介绍：面向云计算与云服务销售方向，分享云厂商工作经历、个人产品实践与学习探索。": "Pengfei Li: pursuing a career in cloud services sales, with experience at a cloud provider and hands-on personal product development.",
  "职业方向：云计算 / 云服务销售": "Career focus: cloud computing and cloud services sales",
  "曾工作于": "Where I’ve worked",
  "七牛云": "Qiniu Cloud",
  "基础架构部 · UI 设计师": "UI Designer · Infrastructure Department",
  "为什么选择云服务销售": "Why cloud services sales",
  "当前主线：学习与探索": "Current focus: learning and exploration",
  "个人产品实践": "Learning by building",
  "声笺": "",
  "个人 AI 产品开发": "Personal AI product development",
  "围绕语音记录、AI 转写和内容整理，进行云服务调研、方案选型与产品开发。": "Researched cloud services, evaluated solutions and developed a personal product for voice capture, AI transcription and content organization.",
  "组合使用火山引擎 Serverless API 网关、veFaaS、TOS 对象存储、语音识别及豆包大模型服务。根据早期低流量需求，比较固定资源与按量服务，调整资源投入。": "Combined Volcengine Serverless API Gateway, veFaaS, TOS object storage, speech recognition and Doubao model services. Compared fixed-capacity resources with usage-based services to match the project’s early, low-traffic needs.",
  "完成同步方案的技术验证，并在实际网络环境与上线要求下调整方案；实践腾讯云服务器配置、域名与 ICP 备案流程。": "Completed technical validation of a synchronization approach and adjusted it for real network conditions and deployment requirements. Gained hands-on experience with Tencent Cloud server configuration, domains and the ICP filing process.",
  "江苏纺知云科技有限公司": "Jiangsu Fangzhiyun Technology Co., Ltd.",
  "产品开发部 · UI 设计师": "UI Designer · Product Development Department",
  "参与 AI 纺织产品需求分析，与产品经理、研发工程师共同梳理业务需求、功能流程及产品方案，跟进需求实现、上线效果与体验优化。": "Contributed to requirements analysis for an AI textile product. Worked with product managers and engineers on business needs, workflows and product proposals, and followed implementation, launch results and user experience improvements.",
  "上海七牛信息技术有限公司": "Qiniu Cloud (Shanghai Qiniu Information Technology Co., Ltd.)",
  "参与七牛云控制台、AI 大模型平台及边缘计算相关产品工作，接触对象存储、AI 平台与企业客户使用场景。": "Worked on Qiniu’s cloud console, AI model platform and edge computing products, gaining exposure to object storage, AI platforms and enterprise use cases.",
  "参与智能视频云平台 SUFY、边缘计算平台 Niulink、麻雀云 PCDN 等产品项目，与产品、研发协作推进需求分析、方案讨论及产品交付。": "Contributed to projects including the SUFY intelligent video cloud platform, Niulink edge computing platform and Maqueyun PCDN. Collaborated with product and engineering teams on requirements analysis, solution discussions and delivery.",
  "我有 1 年互联网产品经验和云厂商工作背景，参与过云控制台、AI 平台与边缘计算相关产品工作。目前希望向云计算与云服务销售方向发展。": "I have one year of experience working on internet products, including at a cloud service provider. My work has covered cloud consoles, AI platforms and edge computing products. I am now looking to move into cloud computing and cloud services sales.",
  "武汉科技大学": "Wuhan University of Science and Technology",
  "视觉传达设计 · 本科": "Bachelor’s degree · Visual Communication Design",
  "联系我": "Get in touch",
  "拨打电话": "Call me",
  "复制微信号": "Copy WeChat ID",
  "微信号已复制": "WeChat ID copied",
  "未能复制，请选中上方号码手动复制。": "Copy failed. Select the number above and copy it manually.",
  "电话 / 微信：": "Phone / WeChat: ",
  "© 2026 李鹏飞": "© 2026 Pengfei Li",
  "地址：深圳": "Location: Shenzhen",
  "简历 · 李鹏飞": "Resume · Pengfei Li",
  "← 返回首页": "← Back to home",
  "简历": "Resume",
  "李鹏飞 · 云计算 / 云服务类销售": "Pengfei Li · Cloud computing / cloud services sales",
  "下载简历 PDF": "Download resume PDF",
  "在新窗口查看 ↗": "Open in a new tab ↗",
  "打开原始 PDF 简历": "Open the original PDF resume",
  "李鹏飞的原始简历，共一页。可通过上方链接查看或下载 PDF。": "Pengfei Li’s original one-page resume in Chinese. Use the links above to view or download the PDF.",
  "原始简历为中文 PDF。": "The original resume is a Chinese-language PDF.",
  "从 UI 设计工作到个人产品实践，我逐渐发现：相比持续打磨视觉细节，我更愿意投入到理解需求、讨论方案和业务取舍中。我希望向销售方向发展，更直接地与客户沟通，参与从发现问题到推动合作的过程。": "Through UI design work and personal product development, I found myself more motivated by understanding needs, discussing solutions and weighing business trade-offs than by refining visual details. I want to move into sales to work more directly with customers, from identifying problems to developing business relationships.",
  "选择云服务方向，来自具体的使用经历。在七牛云工作时，我接触过云控制台、AI 平台和边缘计算产品；开发声笺时，我又从使用者角度，根据业务场景和成本，对比、配置和验证服务器、网关、对象存储与模型服务。这让我对云服务如何解决实际问题产生了持续兴趣。": "My interest in cloud services comes from practical experience. At Qiniu, I worked on cloud consoles, AI platforms and edge computing products. While building Jotora, I compared, configured and tested servers, gateways, object storage and model services against my own use cases and costs. This developed my interest in how cloud services solve practical problems.",
  "我目前处于转行准备阶段，还没有独立拓客与成交的经验。我正在梳理自己对销售的理解：除了沟通和产品知识，还需要持续跟进、面对拒绝，并对商业结果负责。这些也是我需要通过实际工作学习和验证的部分。": "I am preparing for a career transition and do not yet have experience independently prospecting or closing deals. I am developing my understanding of sales: beyond communication and product knowledge, it requires consistent follow-up, handling rejection and accountability for commercial results. These are areas I still need to learn and test through practical work.",
  "现阶段，我继续通过个人项目理解云服务的场景、成本与选型，并梳理转行动机和能力差距。下一步希望在具体岗位中学习客户开发、需求判断和商机跟进，逐步建立能够独立承担销售工作的基础。": "I am continuing to learn about cloud use cases, costs and service selection through personal projects, while examining my reasons for changing careers and the skills I need to develop. My next goal is to learn prospecting, needs assessment and opportunity follow-up in a sales role, building towards independent responsibility.",
  "我习惯把想法推进成可以查看和验证的结果：从声笺的产品实践，到这个网站的搭建、发布与持续修改。最近，我也在根据求职沟通中的反馈，重新梳理转行动机和学习方向。这些行动是我练习执行与复盘的方式，销售能力则仍需要在实际业务中积累。": "I work to turn ideas into results that can be reviewed and tested, from developing Jotora to building, publishing and refining this website. Recently, feedback from career conversations has prompted me to revisit my reasons for changing fields and my learning priorities. These actions are how I practise follow-through and reflection; sales skills still need to be developed through real business experience.",
  "长期而言，我希望持续深耕云计算与云服务领域，积累对产品、行业场景和客户需求的理解。通过实践、复盘与分享，逐步形成自己的专业判断，成为能够为客户和同行提供价值、值得信任的人。": "Over the long term, I hope to deepen my understanding of cloud computing and cloud services, including products, industry use cases and customer needs. Through practice, reflection and sharing, I aim to develop sound professional judgment and become someone customers and peers can trust and turn to for useful insights."
};
  const entries = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, [data-language-switch], [data-article-content]')) continue;
    const key = node.textContent.trim();
    if (Object.hasOwn(translations, key)) entries.push({ node, original: node.textContent, key });
  }
  const attributes = [];
  document.querySelectorAll('[alt], [aria-label], meta[name="description"]').forEach(node => {
    for (const attr of ['alt', 'aria-label', 'content']) {
      const original = node.getAttribute(attr);
      if (Object.hasOwn(translations, original)) attributes.push({node, attr, original});
    }
  });
  const controls = document.querySelectorAll('[data-language]');
  function setLanguage(language) {
    const english = language === 'en';
    document.documentElement.lang = english ? 'en' : 'zh-CN';
    for (const {node, original, key} of entries) {
      node.textContent = english ? original.replace(key, () => translations[key]) : original;
    }
    for (const {node, attr, original} of attributes) node.setAttribute(attr, english ? translations[original] : original);
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === (english ? 'en' : 'zh'))));
    try { sessionStorage.setItem('gomaas-language', english ? 'en' : 'zh'); } catch { /* Storage is optional. */ }
  }
  controls.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  document.querySelectorAll('[data-language-switch]').forEach(group => { group.hidden = false; });
  let initial = 'zh';
  try { if (sessionStorage.getItem('gomaas-language') === 'en') initial = 'en'; } catch { /* Default Chinese. */ }
  setLanguage(initial);
})();
