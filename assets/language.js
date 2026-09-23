// Translate existing text nodes without rebuilding links or analytics handlers.
(() => {
  const translations = {
  "跳至正文": "Skip to content",
  "主导航": "Main navigation",
  "职业方向": "Career focus",
  "工作经历": "Experience",
  "关于我": "About",
  "查看简历": "Resume",
  "李鹏飞 · Gomaas": "Pengfei Li · Gomaas",
  "李鹏飞的头像": "Portrait of Pengfei Li",
  "李鹏飞的个人介绍：面向云计算与云服务销售方向，分享云厂商工作经历、个人产品实践与学习探索。": "Pengfei Li: pursuing a career in cloud services sales, with experience at a cloud provider and hands-on personal product development.",
  "职业方向：云计算 / 云服务销售": "Career focus: cloud computing and cloud services sales",
  "曾工作于": "Where I’ve worked",
  "七牛云": "Qiniu Cloud",
  "基础架构部 · UI 设计师": "UI Designer · Infrastructure Department",
  "为什么选择云服务销售": "Why cloud services sales",
  "我对销售工作的兴趣，来自与人沟通、理解需求并帮助解决问题的过程。我乐于助人，也愿意面对挑战、探索不熟悉的领域，希望把这些倾向带入与客户建立信任、共同寻找合适方案的工作中。": "My interest in sales comes from talking with people, understanding their needs and helping solve problems. I enjoy helping others, taking on challenges and exploring unfamiliar areas. I hope to bring these qualities to building trust with customers and finding solutions together.",
  "在七牛云的工作让我接触到云产品；开发个人产品声笺时，我进一步参与了云服务调研、选型、成本比较和上线验证。这些实践让我对云计算与云服务产生了更具体、持续的兴趣。": "Working at Qiniu introduced me to cloud products. While developing my personal project, Jotora, I explored cloud services, compared options and costs, and tested deployments. These experiences deepened my interest in cloud computing and cloud services.",
  "我关注企业在上云、使用 AI 和控制资源成本时的实际需求，希望在这一领域长期学习，把产品理解与客户沟通结合起来。": "I am interested in what businesses need when adopting cloud services and AI while managing resource costs. I want to keep learning in this field and connect product understanding with customer communication.",
  "当前主线：学习与探索": "Current focus: learning and exploration",
  "持续学习云计算与云服务，结合个人项目理解产品的应用场景、计费方式与选型取舍，并向云服务销售岗位发展。": "I am learning about cloud computing and cloud services through personal projects, exploring use cases, pricing and trade-offs as I work towards a role in cloud services sales.",
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
  "设计与产品协作经历让我熟悉需求澄清、方案讨论和交付跟进；个人产品实践让我开始从业务场景、成本与实际约束理解云服务。": "My design and product collaboration experience has made me familiar with clarifying requirements, discussing solutions and following up on delivery. Building my own product has helped me understand cloud services through use cases, costs and practical constraints.",
  "武汉科技大学": "Wuhan University of Science and Technology",
  "视觉传达设计 · 本科": "Bachelor’s degree · Visual Communication Design",
  "在 GitHub 找到我": "Find me on GitHub",
  "电话 / 微信：": "Phone / WeChat: ",
  "© 2026 李鹏飞": "© 2026 Pengfei Li",
  "地址：深圳南山西丽": "Location: Xili, Nanshan, Shenzhen",
  "简历 · 李鹏飞": "Resume · Pengfei Li",
  "← 返回首页": "← Back to home",
  "简历": "Resume",
  "李鹏飞 · 云计算 / 云服务类销售": "Pengfei Li · Cloud computing / cloud services sales",
  "下载简历 PDF": "Download resume PDF",
  "在新窗口查看 ↗": "Open in a new tab ↗",
  "打开原始 PDF 简历": "Open the original PDF resume",
  "李鹏飞的原始简历，共一页。可通过上方链接查看或下载 PDF。": "Pengfei Li’s original one-page resume in Chinese. Use the links above to view or download the PDF.",
  "原始简历为中文 PDF。": "The original resume is a Chinese-language PDF."
};
  const entries = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, [data-language-switch]')) continue;
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
