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
  "← 返回生活与杂记": "← Back to life notes",
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
  "我有 1 年互联网产品工作经验，曾从事 UI 设计，参与产品需求分析与跨团队协作。": "I have one year of experience working on internet products as a UI designer, contributing to requirements analysis and collaboration across teams.",
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
  "在 UI 设计与个人产品实践中，我逐步明确了对需求分析、方案讨论与业务取舍的兴趣，希望转向云服务销售，将产品理解与客户沟通结合起来。": "Through UI design and personal product development, I developed an interest in requirements analysis, solution discussions and business trade-offs. I hope to move into cloud services sales, combining product knowledge with customer communication.",
  "七牛云的云产品工作经历，以及声笺开发中的服务调研、选型与验证，为这一职业方向提供了实践基础。目前仍处于转行准备阶段，尚无独立拓客与成交经验。": "My work on cloud products at Qiniu, together with researching, selecting and testing services for Jotora, provides a practical foundation for this career direction. I am still preparing for the transition and have not yet independently prospected or closed deals.",

  "当前以个人项目的选型与验证经验为基础，整理云产品应用场景、成本估算与 PoC 验证等学习内容，并结合求职沟通反馈，明确需要补足的能力。": "I am building on my experience selecting and testing services for personal projects to organize what I learn about cloud use cases, cost estimation and PoC validation. Feedback from career conversations helps me identify the skills I need to develop.",
  "在个人产品与网站建设中，我注重将想法转化为可检验的实践成果，并依据使用反馈持续修订方案。": "In personal product development and website work, I focus on turning ideas into outcomes that can be tested and refining solutions in response to user feedback.",
  "后续希望在具体岗位中学习客户开发、需求判断与商机跟进。长期通过实践、复盘与分享积累专业判断，成为能够为客户和同行提供价值、值得信任的人。": "My next goal is to learn prospecting, needs assessment and opportunity follow-up in a sales role. Over time, I hope to develop sound professional judgment through practice, reflection and sharing, and become someone customers and peers can trust for useful guidance."
};
  const entries = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, template, [data-language-switch], [data-article-content], [data-text-en]')) continue;
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
  const texts = [...document.querySelectorAll('[data-text-en]')].map(node => ({node, original: node.textContent}));
  const descriptions = [...document.querySelectorAll('[data-content-en]')].map(node => ({node, original: node.getAttribute('content')}));
  const article = document.querySelector('[data-bilingual-article]');
  const template = article?.querySelector('template[data-article-english]');
  const versions = template ? {
    zh: [...article.childNodes].filter(node => node !== template),
    en: [...template.content.cloneNode(true).childNodes],
  } : null;
  let current = 'zh';
  function readingBlocks() {
    return [...document.querySelectorAll('[data-bilingual-article] .article-heading, [data-bilingual-article] .article-content > *, footer')];
  }
  function capturePosition() {
    if (!versions || scrollY < 1) return null;
    const blocks = readingBlocks();
    const reference = 36;
    // Match the paragraph at the top of the viewport, including progress through it.
    const index = blocks.findIndex(node => node.getBoundingClientRect().bottom > reference);
    if (index < 0) return null;
    const box = blocks[index].getBoundingClientRect();
    return {index, fraction: Math.max(0, Math.min(1, (reference - box.top) / box.height)), offset: box.top > reference ? box.top - reference : 0};
  }
  function restorePosition(position) {
    if (!position) return;
    const box = readingBlocks()[position.index]?.getBoundingClientRect();
    if (!box) return;
    const target = scrollY + box.top + position.fraction * box.height - 36 - position.offset;
    window.scrollTo({top: target, behavior: 'instant'});
  }
  const controls = document.querySelectorAll('[data-language]');
  let toggle;
  function setLanguage(language, preservePosition = true) {
    const english = language === 'en';
    const next = english ? 'en' : 'zh';
    const position = next !== current && preservePosition ? capturePosition() : null;
    document.documentElement.lang = english ? 'en' : 'zh-CN';
    for (const {node, original, key} of entries) node.textContent = english ? original.replace(key, () => translations[key]) : original;
    for (const {node, attr, original} of attributes) node.setAttribute(attr, english ? translations[original] : original);
    for (const {node, original} of texts) node.textContent = english ? node.dataset.textEn : original;
    for (const {node, original} of descriptions) node.setAttribute('content', english ? node.dataset.contentEn : original);
    document.querySelectorAll('[data-bilingual-entry]').forEach(node => { node.lang = english ? 'en' : 'zh-CN'; });
    if (versions && next !== current) {
      // Keep both DOM trees, so returning to Chinese restores the original nodes.
      article.replaceChildren(...versions[next], template);
      article.lang = english ? 'en' : 'zh-CN';
    }
    current = next;
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === next)));
    if (toggle) {
      toggle.textContent = english ? '\u4e2d' : 'EN';
      const label = english ? 'Switch to Chinese' : '\u5207\u6362\u4e3a\u82f1\u6587';
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
      toggle.lang = english ? 'zh-CN' : 'en';
    }
    try { sessionStorage.setItem('gomaas-language', next); } catch { /* Storage is optional. */ }
    restorePosition(position);
  }
  controls.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  if (controls.length && document.querySelector('[data-site-greeting]')) {
    toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'language-toggle';
    toggle.setAttribute('data-language-toggle', '');
    toggle.addEventListener('click', () => setLanguage(current === 'en' ? 'zh' : 'en'));
    document.body.append(toggle);
    document.body.classList.add('has-floating-language');
    // The existing footer controls remain inert fallback markup, not a second UI.
    document.querySelectorAll('[data-language-switch]').forEach(group => { group.hidden = true; });
  } else {
    // Legacy pages without the greeting/style keep their original language controls.
    document.querySelectorAll('[data-language-switch]').forEach(group => { group.hidden = false; });
  }
  let initial = 'zh';
  try { if (sessionStorage.getItem('gomaas-language') === 'en') initial = 'en'; } catch { /* Default Chinese. */ }
  setLanguage(initial, false);
})();
