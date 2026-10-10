# 浏览器作为信息容器：Edge 的信息层级架构拆解

作者：李鹏飞  
发布于：2026-10-02  
AI 辅助：Qwen3.8-Max  
关键词：信息架构 · 浏览器 · 标签页管理 · Microsoft Edge · 交互设计 · 个人信息管理  
原文链接：https://lipengfei.top/edge-information-architecture.html

## 一句话结论

Edge 的解法可以概括成一句话： **把"打开的网页"这一团混沌，按时间—任务—语义—身份四种不同的生命周期，切成四条独立的信息流，再给每一层配上专属的可见性策略和进出通道。** 

它值得研究的不是某个功能多精巧，而是它承认了一个前提：用户对网页的组织需求从来不是单一的。任何试图用一种结构承载全部需求的方案都会崩塌——只有收藏夹会崩，只有标签组也会崩。后面所有的拆解和批评，都建立在这个判断上。

这篇文章想干三件事：说清浏览器为什么是信息架构最难的场景之一；给出一个能拆开 Edge（也能拆开任何信息容器类产品）的模型；最后把这套东西翻译成你自己产品上能用的操作步骤。

* * *

## 浏览器为什么这么难整理

要评价 Edge，得先看清它面对的是什么问题。浏览器大概是消费级软件里信息结构最恶劣的场景，原因有三个。

 **第一，对象是用户自己不断制造、且拒绝清理的。** 

卡内基梅隆大学人机交互研究所的团队在 CHI 2021 发表了一项研究，访谈了十名用户，结论是标签页之所以难管，根源在于它被塞进了太多功能，而且每个都做得不好[\[1\]](https://lipengfei.top/edge-information-architecture.html#ref-1)。校方在报道这项研究时引了一句很扎心的话——研究者 Joseph Chee Chang 说，"人们担心一旦某个东西离开视线，它就消失了"[\[2\]](https://lipengfei.top/edge-information-architecture.html#ref-2)。

阿尔托大学在 CHI 2023 把范围从标签页扩大到了整个"浏览杂乱"：16 次半结构化访谈，加上 400 人的在线问卷[\[3\]](https://lipengfei.top/edge-information-architecture.html#ref-3)。他们发现大约四分之一的互联网用户被浏览器里的杂乱压垮，而多数参与者平时会同时开着 5 到 10 个标签页[\[4\]](https://lipengfei.top/edge-information-architecture.html#ref-4)。更麻烦的是应对方式：只有问题导向的策略（比如给自己定一个标签上限）真正管用，情绪导向的策略——刻意不去想、和同事互相迁就——反而会让问题持续下去[\[3\]](https://lipengfei.top/edge-information-architecture.html#ref-3)。研究第一作者 Rongjun Ma 补了一句关键的话：即便是有效的策略，"投入的努力本身也会阻止用户去采用它"[\[4\]](https://lipengfei.top/edge-information-architecture.html#ref-4)。

这句话对做产品的人来说是判决性的。它意味着，信息架构在这里不能假设内容量可控，必须假设内容量无界；而且不能假设用户愿意为维护结构付出劳动。

 **第二，同一个对象承担三种互相冲突的角色。** 

一个标签页同时是：当前任务的工作面（现在在用）、短期记忆的体外延伸（等下要用）、长期资料的存档（以后要用）。这三种角色的访问频率、留存周期、检索方式完全不同，却被塞进了同一个 UI 控件里。早在 2008 年，Weinreich 等人对 25 名用户的长期追踪就发现，多窗口和多标签的使用在一定程度上替代了后退按钮，代价是用户定向与回溯变得更难[\[5\]](https://lipengfei.top/edge-information-architecture.html#ref-5)——用户保留标签，本质上是把浏览器当工作记忆的外挂。这是 Edge 所有分层设计的根本动因。

 **第三，组织行为本身会制造新的混乱。** 

阿尔托的研究负责人 Janne Lindqvist 打了个很狠的比方：这就像一张厨房餐桌同时充当餐桌、大孩子写作业的书桌和幼儿的玩耍台，而且从来不收拾[\[4\]](https://lipengfei.top/edge-information-architecture.html#ref-4)。用工具去"整理"，很多时候只是在同一空间里重新摆放东西，问题并没有消失。

所以设计的警示是： **层级结构如果要求用户持续投入维护成本，就注定失败。** 会用它的人本来就不爱整理，不爱整理的人才会把它弄乱。

* * *

## 一个模型：四层 × 三轴

我用下面这个框架来拆 Edge。它也可以用来评估任何信息容器类产品。

### 纵向：按生命周期分四层

| 层级 | 时间尺度 | 用户心智 | Edge 的承载物 | 关键设计命题 |
| --- | --- | --- | --- | --- |
| **L1 瞬时态** | 秒—小时 | "我现在在看什么" | 标签条、固定标签、睡眠标签、标签缩略图 | 数量无界时如何保持可扫描 |
| **L2 会话态** | 小时—天 | "我正在做哪几件事" | 标签分组、垂直标签窗格、分屏、AI 整理 | 如何降低上下文切换成本 |
| **L3 持久态** | 天—年 | "我存了什么" | 收藏夹、历史记录、（已退役的）集合 | 结构如何经得起长期膨胀 |
| **L4 身份/情境态** | 月—永久 | "我是谁、我在哪个世界" | 配置文件、工作区、InPrivate | 如何隔离互不兼容的状态 |

这张表是全文的骨架。注意每层的"关键设计命题"都不一样—— **这意味着不存在通用的最优解，只有某一层的最优解。** 很多产品的失败就是把 L3 的结构强加给 L1（要求用户给每个新标签页选文件夹），或者把 L1 的轻量化强加给 L3（用纯时间线代替分类）。

判断一个对象该归哪层，我通常问三个问题：用户心里承诺保留多久？丢了它的代价什么时候显现、由谁承担？它需要和别人的对象共存吗？第三个问题一旦答"需要"，共享性就必须显式建模，而且应该放在 L4——Edge 工作区旧版的麻烦正出在这里，后面会讲。

### 横向：三个正交的属性轴

任何一个信息对象，都能用三个属性定位：

-    **可见性** ：常驻可见 / 按需展开 / 完全隐藏但可检索
-    **持久性** ：关闭即失 / 会话级 / 账号级同步 / 本地独占
-    **共享性** ：私有 / 团队共享

Edge 这几年的功能演进，很大程度上就是在这三根轴上反复试探边界。最典型的一次是工作区从"团队共享"退回"私有"[\[6\]](https://lipengfei.top/edge-information-architecture.html#ref-6)——本质是在共享性这根轴上收缩取值域，换来概念清晰。

这个模型和信息架构经典的"四系统"（组织、标签、导航、搜索）不冲突，是补了一个时间维度[\[7\]](https://lipengfei.top/edge-information-architecture.html#ref-7)：四系统回答"信息如何被组织、命名、导航和检索"，四层回答"不同生命周期的信息流该被分别组织到什么程度"。

* * *

## 逐层拆解：Edge 到底做了什么

### L1 瞬时态：把"不可读"变成"可扫描"

水平标签条的致命缺陷是： **宽度是固定预算，标签数量却无界。** 标签一多，标题被裁掉，只剩 favicon，识别成本陡增。

Edge 的应对不是去优化标签本身，而是换掉布局的约束条件——垂直标签页，把标签挪到窗口侧边的纵向窗格，用垂直高度换水平宽度[\[8\]](https://lipengfei.top/edge-information-architecture.html#ref-8)。官方给的理由很直白：移到侧边窗格后"更易于扫描"，用 Ctrl+Shift+, 就能在两种布局间切换[\[8\]](https://lipengfei.top/edge-information-architecture.html#ref-8)。窗格还能取消固定，收起后不占空间，鼠标悬停临时展开[\[8\]](https://lipengfei.top/edge-information-architecture.html#ref-8)。

这不是一次性设计，而是一条长期投资的线索。有报道称 Edge 在 2021 年的第 89 版稳定通道引入了垂直标签页[\[9\]](https://lipengfei.top/edge-information-architecture.html#ref-9)（另有中文资料记为第 91 版起原生支持，两处说法我没能裁决，先并列放着）。2025 年 4 月，代号 Project Jupiter 的垂直标签重构出现在 Canary 通道，通过 edge://flags 的 #edge-project-jupiter 开关启用，提供 Switcher（标签栏与窗口分离、配置文件图标右移、标签操作按钮置顶）和 Transient（浮动面板，占用更小）两种模式[\[10\]](https://lipengfei.top/edge-information-architecture.html#ref-10)。2026 年 8 月的官方路线图消息显示，微软还在重写垂直标签的实现架构，涉及窗格、布局与控件的全面重新实现[\[11\]](https://lipengfei.top/edge-information-architecture.html#ref-11)。一个"换个位置"的功能被连续投入五年，说明微软把 L1 的布局约束当基础设施，而不是当特性。

这一层还有三个值得单独说的手法。

 **固定标签** ，把高频、确定性强的对象从"列表项"提升为常驻图标，右键即可固定，之后每次启动浏览器自动打开[\[12\]](https://lipengfei.top/edge-information-architecture.html#ref-12)。从模型看，这是把 L1 对象往 L2/L3 的性质迁移——从易逝变常驻。它的真正价值不在检索效率，而在保住了"提醒"：早在 1995 年，Barreau 和 Nardi 就发现用户偏好基于位置的查找方式，因为它带有关键的提醒功能[\[13\]](https://lipengfei.top/edge-information-architecture.html#ref-13)。Arc 把这个思路推到极致（固定标签就是类 App 的持久入口），Edge 保持克制，只做了左端小图标。

 **睡眠标签** ，官方说明是：非活动的后台标签在闲置一段时间后进入睡眠以释放内存和 CPU，睡眠标签"会淡出，以指示它们已释放资源"，点一下就唤醒并立即恢复内容[\[14\]](https://lipengfei.top/edge-information-architecture.html#ref-14)。消费版默认阈值是闲置 1 小时，可在 30 秒到 12 小时之间调[\[14\]](https://lipengfei.top/edge-information-architecture.html#ref-14)；企业策略的默认值是 7200 秒（2 小时），取值域同样是 30 秒到 12 小时[\[15\]](https://lipengfei.top/edge-information-architecture.html#ref-15)。技术上它建立在 Chromium 的"冻结"机制上，只暂停脚本计时器；这跟"丢弃"不同——丢弃会完全抛弃页面内容，返回时要重新加载[\[16\]](https://lipengfei.top/edge-information-architecture.html#ref-16)。从 Edge 120 起还有个策略允许闲置 1.5 天后自动丢弃睡眠标签[\[15\]](https://lipengfei.top/edge-information-architecture.html#ref-15)。

我认为这是最被低估的设计： **它让系统的内部状态对外可见。** 信息层级不只是"怎么排"，还包括"怎么标注状态"。用户敢开一百个标签，一部分原因是界面明确告诉他哪些活着、哪些睡了。代价后面会说——淡出同时也削弱了识别线索。

 **标签搜索** ，官方说明是输入关键词即可定位任何已打开或最近关闭的标签页，而且会扫描所有已打开的 Edge 窗口，不只当前窗口[\[17\]](https://lipengfei.top/edge-information-architecture.html#ref-17)。入口是窗口左上角那个向下箭头，唤出的菜单里同时塞了"开启/关闭垂直标签页""整理标签页""管理工作区"[\[6\]](https://lipengfei.top/edge-information-architecture.html#ref-6)。它的架构意义超出功能本身，我在后面单独讲。

### L2 会话态：用"组"对抗上下文切换

标签分组解决的是那个老问题：标签的线性列表表达不了"任务集合"的结构[\[1\]](https://lipengfei.top/edge-information-architecture.html#ref-1)。阿尔托的研究也印证了这点——当用户为不同活动同时保持标签页（一边订机票一边跟同事聊天），杂乱感会显著累积[\[3\]](https://lipengfei.top/edge-information-architecture.html#ref-3)。

Edge 在这层做了三件事，其中两件比同期竞品走得更远。

 **一是分组与垂直标签深度耦合。** 官方明确说标签组"在经典标签和垂直标签中都可以使用"[\[18\]](https://lipengfei.top/edge-information-architecture.html#ref-18)，支持右键加入组、命名、指定颜色[\[18\]](https://lipengfei.top/edge-information-architecture.html#ref-18)。但耦合不只是兼容，而是表达能力的差别：水平标签条的空间装不下组名和折叠控件，分组近乎"加个颜色标"；到了垂直窗格里，分组才变成真正的手风琴——可命名、可折叠、可批量操作（关闭整组、移到新窗口、加入工作区）。

 **这大概是本文最想让人记住的一条：同一个信息架构概念，在不同载体上的表达能力是不同的。分组的价值不是被发明出来的，是被垂直布局释放出来的。** 

 **二是 AI 自动分组。** 官方的"整理标签页"标注为 AI 驱动，根据标签相似性自动创建分组并分配名称与颜色，用户可以在创建前审查每个组包含哪些标签、改名改色[\[12\]](https://lipengfei.top/edge-information-architecture.html#ref-12)。默认情况下标签组会自动固定，所以关掉浏览器回来时分组还在[\[12\]](https://lipengfei.top/edge-information-architecture.html#ref-12)。早期版本的菜单项还挂着"（预览版）"字样，2024 年初的界面记录能看到[\[19\]](https://lipengfei.top/edge-information-architecture.html#ref-19)，2026 年的官方页面上已经去掉了[\[12\]](https://lipengfei.top/edge-information-architecture.html#ref-12)。

这一步的战略意义大于战术意义： **它承认了"让用户手动整理"这个前提本身不成立** ，正好接上 Ma 那句"努力本身会阻止用户采用整理策略"[\[3\]](https://lipengfei.top/edge-information-architecture.html#ref-3)。当结构可以由系统先生成一版，采用率才有可能突破临界点。

 **三是分屏。** 这是同一层的另一种思路：不是把任务藏起来再切换，而是减少切换的需要。有评测指出 Edge 的分屏只支持两个页面并排，Arc 能到四个[\[20\]](https://lipengfei.top/edge-information-architecture.html#ref-20)。它的价值可以用切换成本研究来解释——任务切换是高度耗时的活动[\[21\]](https://lipengfei.top/edge-information-architecture.html#ref-21)，被打断的工作虽然完成得更快、质量也没差，但代价是更高的压力、挫败感和时间压迫感[\[22\]](https://lipengfei.top/edge-information-architecture.html#ref-22)。两个页面并排，等于把一次切换成本变成零次。

这其实是对"层级"本身的消解： **最好的层级，是识别出哪些场合根本不需要层级，然后直接消掉它。** 

### L3 持久态：收藏夹的胜利，与集合的死亡

这是全文最值得产品人琢磨的部分，因为它是一个真实发生的、关于信息架构收敛的完整案例，而且证据链在公开渠道里罕见地齐全。

Edge 曾长期维持两套并行的"收藏"体系：收藏夹（传统树形书签）和集合（侧边栏的可视化卡片墙，支持图文混排、批注、导出到 Excel）[\[23\]](https://lipengfei.top/edge-information-architecture.html#ref-23)。论能力，集合明显更强。论结果，微软官方文档白纸黑字写着： **从 2026 年 6 月 4 日发布的 Edge 版本 149 开始，集合不再可用** ；而从 Edge 145 起就已不再支持向集合添加新页面，存量内容仍可访问，集合窗格里会显示逐步停用的通知[\[23\]](https://lipengfei.top/edge-information-architecture.html#ref-23)。稳定通道 v146 的发行说明（2026 年 3 月 13 日）记录了停用横幅的开始推送[\[24\]](https://lipengfei.top/edge-information-architecture.html#ref-24)，v149（2026 年 6 月 4 日）把它作为功能更新正式落地[\[25\]](https://lipengfei.top/edge-information-architecture.html#ref-25)。更早的 2026 年 1 月，Dev 通道就已经在敦促用户导出和迁移数据了[\[26\]](https://lipengfei.top/edge-information-architecture.html#ref-26)。

 **为什么更强的输了？** 

微软官方的解释是："Microsoft 定期评审我们的产品/服务，以确保为用户提供最高价值体验……我们将停用 Edge 中的集合，以更好地简化产品/服务"[\[23\]](https://lipengfei.top/edge-information-architecture.html#ref-23)，社区答复里也提到集合可能落入了使用率较低的功能类别[\[27\]](https://lipengfei.top/edge-information-architecture.html#ref-27)。这个解释成立，但同义反复——它说明了决策标准，没说明为什么使用率低。

我认为真正的原因有三个，而且都直指信息层级的本质。

 **其一，集合卡在 L2 与 L3 之间，不属于任何一层。** 它比标签组持久，又比收藏夹临时；它鼓励"先收起来再说"，却没有提供成熟的长期检索与复用路径。用户在心智模型里找不到它的位置。而 **一个对象如果在层级里没有明确的归属层，就一定会被遗忘。** 

这一点有研究上的呼应。Jones、Bruce 和 Dumais 在 2001 年的观测研究得出过一个对产品界挺难堪的结论：专门为帮用户追踪网页信息而做的两个工具——收藏夹和历史列表——在研究中并没有被广泛使用；反倒是把网址连同批注发给自己或别人的做法更有效，因为它同时提供了提醒功能和相关性语境[\[28\]](https://lipengfei.top/edge-information-architecture.html#ref-28)。集合的可视化卡片墙、图文混排和批注，正是在补收藏夹缺的这两样东西。它补对了功能，却没在层级里拿到明确的位置——结果一样被忘。

 **其二，收藏夹虽然笨，但位置感唯一且稳固。** 固定的文件夹树、固定的书签栏、固定的 Ctrl+Shift+O[\[29\]](https://lipengfei.top/edge-information-architecture.html#ref-29)。它的结构可预测，而 **在长周期里，可预测性胜过丰富性。** 

 **其三，集合的维护成本随时间线性增长，收益却递减。** 卡片墙在 20 个条目时很愉悦，200 个条目时就是灾难。社区里有位用户说自己有 166 个主集合、每个装着几十条内容，手工迁移"根本不可能完成"[\[30\]](https://lipengfei.top/edge-information-architecture.html#ref-30)——这句话本身就是维护规模失控的证据。

 **代价是真实的，而且不该被轻描淡写。** 2026 年 5 月的报道称，微软确认逐步停用收藏集和侧边栏应用列表后，长期使用者表达了强烈不满，部分用户表示可能转投其他浏览器；报道特别提到一位自闭症谱系使用者说，收藏集的网格化视觉布局对维持注意力有显著辅助作用，取消它会大幅降低自己的信息检索效率与工作连贯性[\[31\]](https://lipengfei.top/edge-information-architecture.html#ref-31)。同期的报道也指出，迁移选项并不完整：移到收藏夹只保留 URL，图片和备注会丢；CSV 导出保留全部数据，但丧失了可视化界面[\[32\]](https://lipengfei.top/edge-information-architecture.html#ref-32)。

官方的两个出口是这样的：一是"移动到收藏夹"，一键把集合里的网页移入收藏夹，转换为收藏夹根目录下名为 CollectionsExport 的文件夹，但 **只移动 URL，图像、备注和其他非页面项不含在内** ；二是"导出数据"，仅限使用工作或学校账户的企业用户，导出为 collections\_export.csv 存到"文档"文件夹，包含全部链接及完整的图片与备注；此外个人微软账户用户仍能在 bing.com/saves 查看此前保存的内容[\[23\]](https://lipengfei.top/edge-information-architecture.html#ref-23)。

这就是信息架构里经典的"收敛税"： **简化产品线必然伤害边缘但深度的工作流。** 微软的选择是把复杂度交还给生态（扩展、OneNote、Bing Saves），自己守住主干。这个取舍对不对可以吵，但它是有意识的取舍，而且配了可逆的迁移路径，不是静默删除——这一点本身值得肯定。

顺带说收藏夹自己的硬伤：纯文件夹树是单一分类体系，而一个网页天然属于多个主题。信息架构理论对此的标准药方是多面分类和受控词表[\[7\]](https://lipengfei.top/edge-information-architecture.html#ref-7)。Edge 没去改造收藏夹，而是靠下面第 6 节的检索旁路来稀释这个缺陷。

### L4 身份/情境态：工作区与配置文件

这里 Edge 做了两层隔离，很容易混，必须拆开。

 **配置文件（Profile）隔离的是身份与数据** ：Cookie、密码、扩展、历史。它是硬的、进程级的边界。官方说明 Edge 可以根据访问的站点自动切换配置文件，并用当前工作或学校账户自动登录站点[\[33\]](https://lipengfei.top/edge-information-architecture.html#ref-33)；企业策略 AutomaticProfileSwitchingSiteList（Windows/macOS ≥120）能把 URL 主机名映射到指定配置文件，取值包括"工作""个人""无首选项"和通配邮箱，未配置时就走启发式判断[\[34\]](https://lipengfei.top/edge-information-architecture.html#ref-34)。它解决的问题是"我不该在这个世界里看到那个世界的东西"。

 **工作区（Workspaces）隔离的是任务上下文** ：一组标签页 + 一套收藏夹 + 浏览状态。官方的定位是"根据跨多个上下文的活动组织工作、浏览器选项卡和项目"，卖点是"打开相关工作区即可立即访问所有关联的选项卡，而无需搜索以前打开的页面……有助于改进组织、减少上下文切换"[\[6\]](https://lipengfei.top/edge-information-architecture.html#ref-6)。它解决的问题是"我要一键回到上次做这件事的地方"。

 **这两者的分工是 Edge 整个信息架构里最干净的一笔：一个管"你是谁"，一个管"你在做什么"。** 绝大多数混乱来自产品用一个机制回答这两个问题——比如用多个浏览器实例同时承担两种隔离，或者用标签组去承担长期项目管理。

但要注意新版工作区的能力收缩。官方对照表列了六项变化：任务支持从"跨组共享"改为"供个人使用"；不再支持共享、协作与加入；不再支持邀请他人；不再需要 OneDrive 存储空间；不再支持锁定选项卡；菜单排序从"默认创建顺序（可自定义）"改为"按最近使用的顺序"，版本要求从 114+ 提到 144+[\[6\]](https://lipengfei.top/edge-information-architecture.html#ref-6)。

架构层面的动因写在发行说明里：为了提升可靠性与性能，微软把已保存工作区的数据从 OneDrive/SharePoint 迁到 Edge 同步服务，并移除了协作/共享能力；这项更新从 Edge Stable v145 开始逐步推出，在 v146 和 v149 中继续[\[25\]](https://lipengfei.top/edge-information-architecture.html#ref-25)[\[24\]](https://lipengfei.top/edge-information-architecture.html#ref-24)。对于已经通过策略禁用同步的组织，v1 数据仍会迁移，但迁移后新建的 v2 工作区不再跨设备同步，只保持每台设备的本地状态[\[25\]](https://lipengfei.top/edge-information-architecture.html#ref-25)。

用模型翻译一下：旧版工作区让一个 L2 性质的对象（一组标签页）同时背上了 L4 的团队身份与共享职责，违反了"一个对象只属于一层"。代价是实现复杂度和可靠性问题。新版在共享性这根轴上收缩取值域（团队共享 → 私有），换来概念清晰；共享协作交给 Teams，浏览器只管本地上下文。

这同样是收敛，同样要交税。2026 年 3 月的官方社区里出现了"Why ruin Workspaces?"这样的帖子，发帖人说工作区是他把 Edge 当主力浏览器的唯一理由[\[35\]](https://lipengfei.top/edge-information-architecture.html#ref-35)；同月还有用户报告更新后工作区消失、得去 OneDrive 回收站里翻[\[36\]](https://lipengfei.top/edge-information-architecture.html#ref-36)，以及"这次更新让 50 个工作区变得无法导航"的抱怨[\[37\]](https://lipengfei.top/edge-information-architecture.html#ref-37)。

我的评价是双重的： **架构方向对，执行过程糙。** 消除跨层职责混淆是正确的收敛，但迁移期的数据可见性和沟通没做好。这个区分对做产品的人挺重要——别因为执行失误就否定收敛决策，也别因为决策正确就无视执行代价。

* * *

## 一个被低估的维度：东西怎么出去

好的层级设计必须回答"东西怎么离开某一层"，而不只是"怎么进来"。Edge 这块相当完整：

| 通道 | 迁移方向 | 可逆性 |
| --- | --- | --- |
| 睡眠标签 | L1 活跃 → L1 休眠 | 点击唤醒，内容立即恢复[\[14\]](https://lipengfei.top/edge-information-architecture.html#ref-14) |
| 最近关闭的标签 | L1 → 墓碑态 | Ctrl+Shift+T 恢复[\[29\]](https://lipengfei.top/edge-information-architecture.html#ref-29) |
| 标签搜索里的"最近关闭" | 跨窗口检索 | 可搜索恢复[\[17\]](https://lipengfei.top/edge-information-architecture.html#ref-17) |
| 来自其他设备的标签 | L1 → 另一台设备的 L1 | 历史记录面板提供入口[\[29\]](https://lipengfei.top/edge-information-architecture.html#ref-29) |
| 添加到收藏夹 | L1 → L3 | Ctrl+D，之后可再组织[\[29\]](https://lipengfei.top/edge-information-architecture.html#ref-29) |
| 加入工作区 / 移到新窗口 | L1/L2 → L4；L2 → 独立窗口 | 右键菜单，或用 X 个标签页创建工作区[\[6\]](https://lipengfei.top/edge-information-architecture.html#ref-6) |
| 集合 → 收藏夹 / 导出数据 | L3 → L3′ | CollectionsExport（仅 URL）；CSV（含图片备注，限企业账户）[\[23\]](https://lipengfei.top/edge-information-architecture.html#ref-23) |

最后一行最关键。我的判断是： **任何层级重构都必须提供可逆的迁移路径，否则就是单方面处置用户数据。** 微软给了两个出口加一个网页端查看途径，这是最低限度的架构伦理。但也得说清楚，这条路不够宽：个人微软账户用户在浏览器里用不了"导出数据"，走"移动到收藏夹"又会丢掉图片和备注[\[23\]](https://lipengfei.top/edge-information-architecture.html#ref-23)[\[32\]](https://lipengfei.top/edge-information-architecture.html#ref-32)，所以社区里才会在功能移除前请求官方提供导出工具[\[30\]](https://lipengfei.top/edge-information-architecture.html#ref-30)。逃生通道存在，带宽却撑不住深度用户的存量——这就是收敛税的具体形状。

* * *

## 检索：层级的旁路，也是层级的救赎

这一节回答所有层级设计都躲不开的问题： **层级太深怎么办？** 

Edge 实际上提供了两套并行的导航系统。 **结构化通路** 自上而下：工作区 → 分组 → 标签，依赖用户的预先组织。 **检索式通路** 自下而上：输入关键词 → 命中任意层的任意对象，完全不需要组织。

后者的证据链是这样的：地址栏自动建议支持通过"搜索筛选器"限定范围，企业策略 SearchFiltersEnabled（Windows/macOS ≥109）的机制描述是"从搜索筛选器功能区中选择筛选器来筛选自动建议，例如选择'收藏夹'筛选器后仅显示收藏夹建议"[\[38\]](https://lipengfei.top/edge-information-architecture.html#ref-38)；2024 年初的界面记录显示筛选器有历史记录、收藏夹、标签页三项，需要在 edge://settings/searchFilters 打开[\[19\]](https://lipengfei.top/edge-information-architecture.html#ref-19)；标签搜索则覆盖所有已打开窗口和最近关闭项[\[17\]](https://lipengfei.top/edge-information-architecture.html#ref-17)。此外从版本 138 起，Edge 还提供了 AI 增强的历史记录搜索，策略文档说明它允许"使用同义词、自然语言短语和轻微拼写错误进行搜索，以查找以前访问的页面"，关掉后只做完全匹配[\[39\]](https://lipengfei.top/edge-information-architecture.html#ref-39)。

关键在于： **检索式通路的存在，反过来降低了结构化通路的采用门槛。** 用户不必再为"万一将来找不到"焦虑，因此更愿意关掉标签页、更愿意信任分组和折叠。这直接破解了 CMU 记录的那种心态——"一旦离开视线就等于消失"[\[2\]](https://lipengfei.top/edge-information-architecture.html#ref-2)，也回应了阿尔托发现的"对关闭标签页的犹豫会加剧杂乱"[\[3\]](https://lipengfei.top/edge-information-architecture.html#ref-3)。

所以： **搜索不是层级的替代品，而是层级的安全网。** 

顺着这条推下去，就能解释为什么我不认为"收藏夹只有树形结构"是致命伤。在有可靠全域检索的前提下，单一分类体系的缺陷会被大幅稀释；反过来，如果你的产品没有可靠检索，就必须提供更细的分类。这两者是此消彼长的关系，替代的方向由检索质量决定。信息架构理论长期把组织系统和搜索系统当成两个并列的独立系统[\[7\]](https://lipengfei.top/edge-information-architecture.html#ref-7)，我觉得这里其实存在一个可以被量化的替代关系。

 **但这条安全网在 2026 年出现了一次收缩，值得单独记一笔。** AI 增强的历史记录搜索虽然已经写进了策略文档（≥138）[\[39\]](https://lipengfei.top/edge-information-architecture.html#ref-39)，但据报道，微软在 2026 年 6 月 25 日的 Microsoft 365 路线图条目里把状态改成了"我们已决定目前不推进此项变更"，没有给出详细理由；这个决定紧随用户批评而来，批评者认为该功能具有侵入性、加剧浏览器臃肿[\[40\]](https://lipengfei.top/edge-information-architecture.html#ref-40)。报道称它原本使用端侧模型，数据留在设备上、不发给微软[\[40\]](https://lipengfei.top/edge-information-architecture.html#ref-40)。

这件事修正了我原来的想法。一是 **检索能力的上限不只由技术决定，也由用户对"被记住"的接受度决定** ——当检索通路开始触碰隐私感知，它作为安全网的可信度反而下降。二是架构上的安全网必须是用户可信赖的常量；一旦它可能被撤回，用户在结构化通路上的投入意愿也会跟着掉。 **把层级设计的安全性押在一个可能被砍掉的功能上，本身就是架构风险。** 

* * *

## 六个可复用的交互手法

抛开具体功能，Edge 在交互层面反复用同一组手法。名称不重要，失效条件才重要。

| 手法 | 在 Edge 里的样子 | 什么时候会失效 |
| --- | --- | --- |
| **渐进式披露** | 垂直窗格可取消固定、悬停展开[\[8\]](https://lipengfei.top/edge-information-architecture.html#ref-8)；分组可折叠[\[12\]](https://lipengfei.top/edge-information-architecture.html#ref-12)；侧边栏自 Edge 129 起默认隐藏，可选"始终启用/自动隐藏/关闭"[\[41\]](https://lipengfei.top/edge-information-architecture.html#ref-41) | 可发现性下降，必须用引导提示和快捷键对冲 |
| **视觉降权而非隐藏** | 睡眠标签淡出[\[14\]](https://lipengfei.top/edge-information-architecture.html#ref-14)；固定标签缩为图标[\[18\]](https://lipengfei.top/edge-information-architecture.html#ref-18) | 降权过度会削弱识别线索（见下一节缺陷三） |
| **多轨入口** | 同一动作同时给点击、右键菜单、快捷键（Ctrl+Shift+,／Ctrl+D／Ctrl+Shift+O／Ctrl+H／Ctrl+Shift+T）[\[29\]](https://lipengfei.top/edge-information-architecture.html#ref-29)、拖拽 | 入口太多会造成概念膨胀 |
| **可逆性与无损感** | 最近关闭、睡眠唤醒、集合迁移的两个出口[\[14\]](https://lipengfei.top/edge-information-architecture.html#ref-14)[\[17\]](https://lipengfei.top/edge-information-architecture.html#ref-17)[\[23\]](https://lipengfei.top/edge-information-architecture.html#ref-23) | 逃生通道带宽不足时，反而加剧不信任[\[30\]](https://lipengfei.top/edge-information-architecture.html#ref-30)[\[32\]](https://lipengfei.top/edge-information-architecture.html#ref-32) |
| **用空间换可读性** | 垂直布局牺牲一点内容宽度，换标题完整可见[\[8\]](https://lipengfei.top/edge-information-architecture.html#ref-8) | 目标用户屏幕形态不匹配时收益反转（窄屏、竖屏） |
| **自动化前置** | AI 整理标签页[\[12\]](https://lipengfei.top/edge-information-architecture.html#ref-12)、自动配置文件切换[\[33\]](https://lipengfei.top/edge-information-architecture.html#ref-33)[\[34\]](https://lipengfei.top/edge-information-architecture.html#ref-34)、自动睡眠[\[14\]](https://lipengfei.top/edge-information-architecture.html#ref-14) | 结果不可审查、不可修改时会引发抵触 |

这六个之间有两组关系值得强调。 **渐进式披露和多轨入口互为对冲** ：前者降低常驻认知负荷、削弱可发现性，后者正是补偿。 **自动化前置是可逆性的下游** ：只有当自动化结果可被审查和修改（Edge 允许在建组前审查组内标签、改名改色[\[12\]](https://lipengfei.top/edge-information-architecture.html#ref-12)），效率收益才不会变成失控感。

另外补一句关于视觉降权的依据。用连续的量（透明度、尺寸）而不是离散的"在/不在"来表达状态变化，用户才不会丢失场所感——这跟位置式查找研究里的提醒功能[\[13\]](https://lipengfei.top/edge-information-architecture.html#ref-13)、以及"空间"与"场所"的区分[\[42\]](https://lipengfei.top/edge-information-architecture.html#ref-42)是一脉相承的。信息架构那本经典教材甚至专门有一章叫"A Sense of Place"[\[7\]](https://lipengfei.top/edge-information-architecture.html#ref-7)。

* * *

## 五个真问题

只夸不骂的分析没什么用。Edge 至少有五个真实缺陷，我把它们分成设计缺陷和治理缺陷两类。

 **一、层级入口过深，可发现性差。** 垂直标签、分组、工作区、搜索筛选器、睡眠阈值，大量能力埋在 edge://settings 的子菜单里（搜索筛选器在 edge://settings/searchFilters[\[19\]](https://lipengfei.top/edge-information-architecture.html#ref-19)，睡眠阈值在"设置 > 系统和性能 > 性能"[\[14\]](https://lipengfei.top/edge-information-architecture.html#ref-14)）。 **一个信息架构如果对 80% 的用户不可见，那它对那 80% 的用户就等于不存在。** Project Jupiter 把相关入口集中到左上角统一菜单[\[10\]](https://lipengfei.top/edge-information-architecture.html#ref-10)[\[17\]](https://lipengfei.top/edge-information-architecture.html#ref-17)，方向对，但没解决触发时机：这些能力应该在用户第一次开到第 15 个标签页、第一次因为找不到标签而反复切换的时候主动出现，而不是躺在设置里等人发掘。用模型说就是——L1 的过载信号本该成为 L2/L4 能力的自然入口，Edge 没建立这个耦合。

 **二、概念重叠没清理干净。** "保存一个网页"这件事在 Edge 里仍有四五个落点：收藏夹、标签组（默认自动固定，因此具备一定持久性[\[12\]](https://lipengfei.top/edge-information-architecture.html#ref-12)）、工作区里的收藏夹集[\[6\]](https://lipengfei.top/edge-information-architecture.html#ref-6)、已退役但存量可访问的集合[\[23\]](https://lipengfei.top/edge-information-architecture.html#ref-23)、固定标签[\[18\]](https://lipengfei.top/edge-information-architecture.html#ref-18)。好的信息架构应该让每类对象只有一个自然归宿。用户面对多个相似选项时，最常见的反应不是仔细分辨，而是全部不用——这跟收藏夹和历史列表使用率不高的发现是同一个机制[\[28\]](https://lipengfei.top/edge-information-architecture.html#ref-28)。集合退役消掉了一个落点，但概念层面的收敛还没完成。

 **三、"整理"和"性能"两套逻辑互相干扰。** 睡眠标签为了释放资源把非活动标签灰化[\[14\]](https://lipengfei.top/edge-information-architecture.html#ref-14)，可这恰好削弱了用户用来识别内容的视觉线索。另一头，有资料指出 Windows 11 默认在 Alt+Tab 里把 Edge 的每个标签页当独立窗口展示，标签一多就是巨大的视觉噪音，得去"设置 > 系统 > 多任务处理"里调（这条我只有一个来源，标一下：⚠️单源待校验）。局部最优的功能组合起来可能全局劣化，而这类跨功能的体验冲突，单一功能团队解决不了—— **需要一个高于功能团队的信息架构治理角色来裁决。** 这是治理缺陷，不是设计缺陷。

 **四、缺一个统一的"全局视图"。** Arc 有 Spaces，官方定义是彼此独立的浏览区域，每个 Space 有自己的固定区、非固定区、主题和图标[\[43\]](https://lipengfei.top/edge-information-architecture.html#ref-43)；Vivaldi 有标签堆栈和平铺，可以把两个或更多标签页并排显示以便对照和并行监控[\[44\]](https://lipengfei.top/edge-information-architecture.html#ref-44)；Edge 没有一个能把"我所有工作区、所有分组、所有标签"一次性摊开的界面。而且这件事的技术答案已经被验证过了：CHI 2016 的《Window Shopping》比较了三种窗口切换界面，结果是按最近性组织的网格（Mosaic）最具可扩展性，选择速度快于卡片式堆叠，错误率低于地图化的 Exposé[\[45\]](https://lipengfei.top/edge-information-architecture.html#ref-45)。层级越深，越需要顶层地图——这本来就是"先概览、再缩放筛选、然后按需看细节"的老规矩[\[46\]](https://lipengfei.top/edge-information-architecture.html#ref-46)。 **Edge 缺的不是方案，是决策。** 

 **五、收敛过程的沟通成本。** 集合和侧边栏应用列表的退役引发了强烈反弹，甚至出现迁移威胁[\[31\]](https://lipengfei.top/edge-information-architecture.html#ref-31)；社区里有人在功能移除前请求官方导出工具[\[30\]](https://lipengfei.top/edge-information-architecture.html#ref-30)；工作区 V2 迁移期间出现了数据可见性问题[\[36\]](https://lipengfei.top/edge-information-architecture.html#ref-36)。问题不在退役本身，而在于：一个被部分用户当作核心工作流的功能，在路线图上的定位始终是"附加功能"，所以它的退役显得突兀。这说明需求洞察和架构决策之间脱节了——微软掌握使用率数据，但没有掌握（或没有公开）深度依赖者的规模和依赖强度。

有个对照很有意思：AI 增强的历史搜索在遭到用户批评后被撤回[\[40\]](https://lipengfei.top/edge-information-architecture.html#ref-40)，说明微软对用户反馈并不是无感。差别在于，前者是"少数人的深度依赖"，后者是"多数人的普遍抵触"，而现行的决策机制显然只稳定地响应后者。 **这可能才是真正需要修的东西。** 

* * *

## 搬到你自己产品上：七步，顺序不能跳

如果你要把这套研究用到自己的产品上，我建议按这个顺序推进。跳步的典型表现是从"菜单该怎么排"开始——那是层级问题的下游产物。

 **第 1 步：列出全部信息对象，标注生命周期。** 别从界面开始，先从"我们手里有哪些东西、各自活多久"开始，用上面那张四层表填一遍。大部分信息架构问题在这一步就会暴露，症状通常是某一层塞了太多异质对象。提醒一点：清单里要包含"状态"而不只是"实体"——睡眠标签、最近关闭的标签都是状态，但它们承载了关键的迁移语义。

 **第 2 步：检查是否有对象同时扮演多个角色。** 如果有（浏览器的标签页就是典型），不要强行统一，拆成多个承载物，明确各自的职责边界。这是 Edge 做得最好的一件事：配置文件管身份，工作区管任务。反面教材是旧版工作区——让一个 L2 对象背上 L4 的共享职责，最后以能力收缩收场。

 **第 3 步：为每一层独立定义可见性策略。** 对每层问三个问题：这一层的对象默认该被看见吗？看见多少？看不见的时候怎么找回来？答案必须随层变化——L1 高密度低承诺，L4 低密度高承诺。

 **第 4 步：设计进出通道与降级路径。** 给每一个"进入某层"的动作配一个对称的"退出"动作，并明确降级的可逆性（可唤醒 / 可复活 / 可导出）。 **没有出口的结构会变成坟墓，而坟墓会被用户避开。** 如果不得不重构层级（比如废弃某个容器），迁移路径的带宽要匹配深度用户的存量规模，否则逃生通道形同虚设。

 **第 5 步：建立检索旁路，并让它覆盖所有层。** 在确定分类之前先确定检索能力，因为 **检索能力决定了你可以把分类做得多粗** 。同时留个心眼：涉及隐私感知的检索能力可能被撤回，别把整个层级的安全性单方面押在它上面。

 **第 6 步：把结构化工作尽可能自动化，并保证结果可审查。** 评估标准不是"自动得有多准"，而是"用户第一次使用时是否得到了一个可用的起点"。理由前面说过——努力本身就会阻止用户去整理[\[3\]](https://lipengfei.top/edge-information-architecture.html#ref-3)，收藏夹和历史列表的低使用率也是这么来的[\[28\]](https://lipengfei.top/edge-information-architecture.html#ref-28)。

 **第 7 步：设立信息架构治理机制，定期做收敛审计。** 每加一个功能就问三句：它落在哪一层？和已有功能是否重叠？如果不重叠，边界在哪里？ **功能可以一直加，概念不能一直加。** Edge 这两年的主线就是收敛，这本身是成熟度的体现；但收敛必须配三样东西——明确的迁移路径、对深度依赖者的规模评估、跨功能冲突的裁决机制。

* * *

## 结语：唯一的评价标准

Edge 真正值得研究的，不是它加了什么，而是它在"一个控件承载所有需求"的诱惑面前坚持了分层，并且在后期有勇气做减法。它的四层结构（瞬时—会话—持久—身份）是个可复用的模板；它的失败（集合、入口过深、概念重叠、缺全局视图）是同样有价值的反面教材。

衡量一个信息层级设计好坏，我认为标准只有一个： **当信息量增长十倍时，它是变得更难用，还是基本不变？** 

Edge 的答案是——靠分层和检索，让可用性衰减得比信息增长慢得多。这大概是这类设计能达到的最好结果。它没解决的部分（缺全局概览、概念仍有重叠），恰好也是这条标准下最容易被检出的缺口。

这条标准的好处是可操作：它允许你用一个明确的压力测试（把对象数量提高一个数量级）替代没完没了的主观评审。下次评审你们产品的信息架构时，不妨就从这里开始。

* * *

## 参考来源

 **学术文献** 

\[1\] Chang J C, et al. When the tab comes due: challenges in the cost structure of browser tab usage. CHI 2021. [https://dl.acm.org/doi/10.1145/3411764.3445585](https://dl.acm.org/doi/10.1145/3411764.3445585) [↩](https://lipengfei.top/edge-information-architecture.html#cite-1-1)

\[3\] Ma R, Lassila H, Nurgalieva L, Lindqvist J. When browsing gets cluttered: exploring and modeling interactions of browsing clutter, browsing habits, and coping. CHI 2023. [https://dl.acm.org/doi/10.1145/3544548.3580690](https://dl.acm.org/doi/10.1145/3544548.3580690) [↩](https://lipengfei.top/edge-information-architecture.html#cite-3-1)

\[5\] Weinreich H, et al. Not quite the average: an empirical study of web use. ACM Transactions on the Web, 2008, 2(1). [https://dl.acm.org/doi/10.1145/1326561.1326566](https://dl.acm.org/doi/10.1145/1326561.1326566) [↩](https://lipengfei.top/edge-information-architecture.html#cite-5-1)

\[7\] Rosenfeld L, Morville P, Arango J. Information Architecture: For the Web and Beyond. 4th ed. O'Reilly Media, 2015. [↩](https://lipengfei.top/edge-information-architecture.html#cite-7-1)

\[13\] Barreau D, Nardi B A. Finding and reminding: file organization from the desktop. ACM SIGCHI Bulletin, 1995, 27(3): 39-43. [↩](https://lipengfei.top/edge-information-architecture.html#cite-13-1)

\[21\] Jeuris S, Tell P, Houben S, Bardram J E. The hidden cost of window management. arXiv:1810.04673, 2018. [↩](https://lipengfei.top/edge-information-architecture.html#cite-21-1)

\[22\] Mark G, Gudith D, Klocke U. The cost of interrupted work: more speed and stress. CHI 2008. [https://dl.acm.org/doi/10.1145/1357054.1357072](https://dl.acm.org/doi/10.1145/1357054.1357072) [↩](https://lipengfei.top/edge-information-architecture.html#cite-22-1)

\[28\] Jones W, Bruce H, Dumais S. Keeping found things found on the web. CIKM 2001: 119-126. [↩](https://lipengfei.top/edge-information-architecture.html#cite-28-1)

\[42\] Harrison S, Dourish P. Re-place-ing space: the roles of place and space in collaborative systems. CSCW 1996. [https://dl.acm.org/doi/10.1145/240080.240193](https://dl.acm.org/doi/10.1145/240080.240193) [↩](https://lipengfei.top/edge-information-architecture.html#cite-42-1)

\[45\] Warr A, Chi E H, Harris H, et al. Window shopping: a study of desktop window switching. CHI 2016: 3335-3338. [https://dl.acm.org/doi/10.1145/2858036.2858526](https://dl.acm.org/doi/10.1145/2858036.2858526) [↩](https://lipengfei.top/edge-information-architecture.html#cite-45-1)

\[46\] Shneiderman B. The eyes have it: a task by data type taxonomy for information visualizations. IEEE Symposium on Visual Languages, 1996. [↩](https://lipengfei.top/edge-information-architecture.html#cite-46-1)

 **微软官方文档与发行说明** 

\[2\] Carnegie Mellon University. Overcoming tab overload. 2021-05-10. [https://www.cmu.edu/news/stories/archives/2021/may/overcoming-tab-overload.html](https://www.cmu.edu/news/stories/archives/2021/may/overcoming-tab-overload.html) [↩](https://lipengfei.top/edge-information-architecture.html#cite-2-1)

\[4\] Aalto University. One in four internet users are overwhelmed by the clutter in their browser. 2023-04-25. [https://www.aalto.fi/en/news/one-in-four-internet-users-are-overwhelmed-by-the-clutter-in-their-browser](https://www.aalto.fi/en/news/one-in-four-internet-users-are-overwhelmed-by-the-clutter-in-their-browser) [↩](https://lipengfei.top/edge-information-architecture.html#cite-4-1)

\[6\] Microsoft. Getting started with Microsoft Edge Workspaces. [https://support.microsoft.com/en-us/edge/getting-started-with-microsoft-edge-workspaces](https://support.microsoft.com/en-us/edge/getting-started-with-microsoft-edge-workspaces) [↩](https://lipengfei.top/edge-information-architecture.html#cite-6-1)

\[8\] Microsoft. Stay organized with vertical tabs. [https://explore.microsoft.com/en-us/edge/features/vertical-tabs](https://explore.microsoft.com/en-us/edge/features/vertical-tabs) [↩](https://lipengfei.top/edge-information-architecture.html#cite-8-1)

\[12\] Microsoft. Organize tabs (AI-powered). [https://www.microsoft.com/edge/features/organize-tabs](https://www.microsoft.com/edge/features/organize-tabs) [↩](https://lipengfei.top/edge-information-architecture.html#cite-12-1)

\[14\] Microsoft. 了解 Microsoft Edge 中的性能功能（睡眠标签页）. [https://support.microsoft.com/zh-cn/edge/learn-about-performance-features-in-microsoft-edge](https://support.microsoft.com/zh-cn/edge/learn-about-performance-features-in-microsoft-edge) [↩](https://lipengfei.top/edge-information-architecture.html#cite-14-1)

\[15\] Microsoft. SleepingTabsTimeout / AutoDiscardSleepingTabsEnabled 策略文档. [https://learn.microsoft.com/zh-tw/deployedge/microsoft-edge-browser-policies/sleepingtabstimeout](https://learn.microsoft.com/zh-tw/deployedge/microsoft-edge-browser-policies/sleepingtabstimeout) [↩](https://lipengfei.top/edge-information-architecture.html#cite-15-1)

\[16\] Microsoft. Sleeping tabs FAQ. [https://techcommunity.microsoft.com/discussions/edgeinsiderannouncements/sleeping-tabs-faq/1705434](https://techcommunity.microsoft.com/discussions/edgeinsiderannouncements/sleeping-tabs-faq/1705434) [↩](https://lipengfei.top/edge-information-architecture.html#cite-16-1)

\[17\] Microsoft. Tab search. [https://www.microsoft.com/en-us/edge/features/tab-search](https://www.microsoft.com/en-us/edge/features/tab-search) [↩](https://lipengfei.top/edge-information-architecture.html#cite-17-1)

\[18\] Microsoft. 分组和整理你的标签页. [https://www.microsoft.com/zh-cn/edge/features/tab-groups](https://www.microsoft.com/zh-cn/edge/features/tab-groups) [↩](https://lipengfei.top/edge-information-architecture.html#cite-18-1)

\[23\] Microsoft. 使用 Microsoft Edge 中的"集合"整理创意（含停用说明）. [https://support.microsoft.com/zh-cn/edge/organize-your-ideas-with-collections-in-microsoft-edge](https://support.microsoft.com/zh-cn/edge/organize-your-ideas-with-collections-in-microsoft-edge) [↩](https://lipengfei.top/edge-information-architecture.html#cite-23-1)

\[24\] Microsoft. Microsoft Edge 稳定渠道存档发行说明（v146.0.3856.59，2026-03-13）. [https://learn.microsoft.com/zh-cn/deployedge/microsoft-edge-relnote-archive-stable-channel](https://learn.microsoft.com/zh-cn/deployedge/microsoft-edge-relnote-archive-stable-channel) [↩](https://lipengfei.top/edge-information-architecture.html#cite-24-1)

\[25\] Microsoft. Microsoft Edge release notes for Stable Channel（v149.0.4022.52，2026-06-04）. [https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel) [↩](https://lipengfei.top/edge-information-architecture.html#cite-25-1)

\[29\] Microsoft. Microsoft Edge 键盘快捷方式. [https://support.microsoft.com/zh-CN/edge/microsoft-edge-keyboard-shortcuts](https://support.microsoft.com/zh-CN/edge/microsoft-edge-keyboard-shortcuts) [↩](https://lipengfei.top/edge-information-architecture.html#cite-29-1)

\[33\] Microsoft. Profiles and Work Sign-in. [https://explore.microsoft.com/en-us/edge/features/profiles](https://explore.microsoft.com/en-us/edge/features/profiles) [↩](https://lipengfei.top/edge-information-architecture.html#cite-33-1)

\[34\] Microsoft. AutomaticProfileSwitchingSiteList 策略文档. [https://learn.microsoft.com/zh-cn/deployedge/microsoft-edge-policies/automaticprofileswitchingsitelist](https://learn.microsoft.com/zh-cn/deployedge/microsoft-edge-policies/automaticprofileswitchingsitelist) [↩](https://lipengfei.top/edge-information-architecture.html#cite-34-1)

\[38\] Microsoft. SearchFiltersEnabled 策略文档. [https://learn.microsoft.com/en-ca/deployedge/microsoft-edge-browser-policies/searchfiltersenabled](https://learn.microsoft.com/en-ca/deployedge/microsoft-edge-browser-policies/searchfiltersenabled) [↩](https://lipengfei.top/edge-information-architecture.html#cite-38-1)

\[39\] Microsoft. EdgeHistoryAISearchEnabled 策略文档. [https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies/edgehistoryaisearchenabled](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-policies/edgehistoryaisearchenabled) [↩](https://lipengfei.top/edge-information-architecture.html#cite-39-1)

\[43\] The Browser Company. Spaces: distinct browsing areas. [https://resources.arc.net/hc/en-us/articles/19228064149143-Spaces-Distinct-Browsing-Areas](https://resources.arc.net/hc/en-us/articles/19228064149143-Spaces-Distinct-Browsing-Areas) [↩](https://lipengfei.top/edge-information-architecture.html#cite-43-1)

\[44\] Vivaldi. Tab tiling in Vivaldi. [https://help.vivaldi.com/desktop/tabs/tab-tiling/](https://help.vivaldi.com/desktop/tabs/tab-tiling/) [↩](https://lipengfei.top/edge-information-architecture.html#cite-44-1)

 **媒体报道与社区反馈** 

\[9\] Laptop Mag. Microsoft Edge 89 ushers in Vertical Tabs and New History View. [https://www.laptopmag.com/news/microsoft-edge-89-ushers-in-vertical-tabs-and-new-history-view](https://www.laptopmag.com/news/microsoft-edge-89-ushers-in-vertical-tabs-and-new-history-view) [↩](https://lipengfei.top/edge-information-architecture.html#cite-9-1)

\[10\] DoNews. 微软 Edge 浏览器垂直标签设计迎新变革（Project Jupiter）. 2025-04-15. [https://www.donews.com/news/detail/8/5011354.html](https://www.donews.com/news/detail/8/5011354.html) [↩](https://lipengfei.top/edge-information-architecture.html#cite-10-1)

\[11\] Merrill Consultants. RM569217 — Microsoft Edge: Vertical Tabs update. 2026-08-12. [https://mc.merill.net/message/RM569217](https://mc.merill.net/message/RM569217) [↩](https://lipengfei.top/edge-information-architecture.html#cite-11-1)

\[19\] 腾讯云开发者社区. Edge 搜索栏太方便了：历史记录、书签、标签页快速搜索. 2024-01-31. [https://cloud.tencent.com/developer/article/2385276](https://cloud.tencent.com/developer/article/2385276) [↩](https://lipengfei.top/edge-information-architecture.html#cite-19-1)

\[20\] XDA-Developers. Arc browser hands-on. 2024-05-10. [https://www.xda-developers.com/arc-browser-hands-on/](https://www.xda-developers.com/arc-browser-hands-on/) [↩](https://lipengfei.top/edge-information-architecture.html#cite-20-1)

\[26\] IT之家. 曝微软 Edge 浏览器"集锦"功能将停用，用户需尽快导出数据. 2026-01-11. [https://www.ithome.com/0/912/286.htm](https://www.ithome.com/0/912/286.htm) [↩](https://lipengfei.top/edge-information-architecture.html#cite-26-1)

\[27\] Microsoft Q&A. Why is Collections being retired? 2026-06-05. [https://learn.microsoft.com/en-us/answers/questions/5912318/why-is-collections-being-retired](https://learn.microsoft.com/en-us/answers/questions/5912318/why-is-collections-being-retired) [↩](https://lipengfei.top/edge-information-architecture.html#cite-27-1)

\[30\] Microsoft Tech Community. Export tool for Edge Collections before deprecation. 2026-03-25. [https://techcommunity.microsoft.com/discussions/edgeinsiderdiscussions/export-tool-for-edge-collections-before-deprecation/4505752](https://techcommunity.microsoft.com/discussions/edgeinsiderdiscussions/export-tool-for-edge-collections-before-deprecation/4505752) [↩](https://lipengfei.top/edge-information-architecture.html#cite-30-1)

\[31\] 中关村在线. 微软将停用 Edge 收藏集与侧边栏功能，用户质疑实用性与无障碍支持. 2026-05-18. [https://news.zol.com.cn/1183/11837572.html](https://news.zol.com.cn/1183/11837572.html) [↩](https://lipengfei.top/edge-information-architecture.html#cite-31-1)

\[32\] WinBuzzer. Microsoft retires Edge Collections feature, leaving users with incomplete migration options. 2026-01-19. [https://winbuzzer.com/2026-01-19/microsoft-retires-edge-collections-feature-leaving-users-with-incomplete-migration-options-xcxwbn/](https://winbuzzer.com/2026-01-19/microsoft-retires-edge-collections-feature-leaving-users-with-incomplete-migration-options-xcxwbn/) [↩](https://lipengfei.top/edge-information-architecture.html#cite-32-1)

\[35\] Microsoft Q&A. Why ruin Workspaces? 2026-03-13. [https://learn.microsoft.com/en-us/answers/questions/5820637/why-ruin-workspaces](https://learn.microsoft.com/en-us/answers/questions/5820637/why-ruin-workspaces) [↩](https://lipengfei.top/edge-information-architecture.html#cite-35-1)

\[36\] Microsoft Q&A. edge 浏览器更新后工作区消失. 2026-03-16. [https://learn.microsoft.com/zh-cn/answers/questions/5823289/edge](https://learn.microsoft.com/zh-cn/answers/questions/5823289/edge) [↩](https://lipengfei.top/edge-information-architecture.html#cite-36-1)

\[37\] Microsoft Q&A. Edge Workspaces update makes 50 workspaces unnavigable. 2026-03-22. [https://learn.microsoft.com/en-us/answers/questions/5832043/edge-workspaces-update-makes-50-workspaces-unnavig](https://learn.microsoft.com/en-us/answers/questions/5832043/edge-workspaces-update-makes-50-workspaces-unnavig) [↩](https://lipengfei.top/edge-information-architecture.html#cite-37-1)

\[40\] gHacks. Microsoft cancels AI-powered history search feature in Edge after user backlash. 2026-06-29. [https://www.ghacks.net/2026-06-29/microsoft-cancels-ai-powered-history-search-feature-in-edge-after-user-backlash/](https://www.ghacks.net/2026-06-29/microsoft-cancels-ai-powered-history-search-feature-in-edge-after-user-backlash/) [↩](https://lipengfei.top/edge-information-architecture.html#cite-40-1)

\[41\] 网易科技（转引 IT之家）. 微软 Edge 129 版本默认隐藏侧边栏. 2024-09-30. [https://news.qq.com/rain/a/20240930A010EZ00](https://news.qq.com/rain/a/20240930A010EZ00) [↩](https://lipengfei.top/edge-information-architecture.html#cite-41-1)

 **两处需要说明的数据口径** 

关于 Aalto 那项研究：400 是 **在线问卷的受访者人数** ，不是某个用户的标签页数量；"多数人常开 5–10 个标签页"来自同一项研究的另一组分布统计，两个数字不要混用。

关于版本时间线：Edge 144+ 是新版工作区的 **功能要求** ；而工作区 V2 架构迁移（数据从 OneDrive/SharePoint 转到 Edge 同步服务、移除协作共享）是从 Edge Stable  **v145**  开始逐步推出、延续到 v146 和 v149 的。集合方面，Edge 145 起停止新增，149（2026 年 6 月 4 日）起正式不可用。

本文的观点与判断部分欢迎反驳。所有版本号、日期与参数均核对过官方文档或原始论文；仅有单一来源支撑的说法已在正文就地标注。
