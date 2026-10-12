# 海外大模型、云平台与 API 售卖基础

作者：李鹏飞  
发布于：2026-10-12  
版本：V1  
AI 辅助：GPT  
关键词：海外大模型 · 阿里云 · 腾讯云 · AWS · API 售卖  
原文链接：https://lipengfei.top/ai-cloud-api-basics.html

## 海外主流大模型

以下是常见的海外模型系列及其提供方：

| 模型开发公司 | 模型系列 | 基本介绍 |
| --- | --- | --- |
| OpenAI | [GPT](https://developers.openai.com/api/docs/models) | 提供文本生成、推理、编程等模型，并有图像、语音等专用模型 |
| Anthropic | [Claude](https://platform.claude.com/docs/en/models/overview) | 包括 Opus、Sonnet、Haiku 等产品线，支持文本处理、编程、图像理解和工具调用等能力 |
| Google | [Gemini](https://ai.google.dev/gemini-api/docs/models) | 包括 Pro、Flash、Flash-Lite 等产品线，覆盖文本、图像、音频等能力 |
| xAI | [Grok](https://docs.x.ai/developers/models) | 提供对话、推理、编程及工具调用能力，另有图像、视频和语音相关服务 |
| Meta | [Llama](https://github.com/meta-llama/llama-models) | 开放权重模型系列，可按对应许可下载并自行部署 |
| Mistral AI | [Mistral](https://docs.mistral.ai/models) | 提供 Large、Medium、Small 等模型，以及代码、文档识别、语音等专用模型；部分模型开放权重 |

熟悉一个模型，需要掌握以下内容：

- **名称与版本**：模型系列、具体型号、正式版或预览版。
- **功能**：支持文字、图片、音频等哪些输入，能够生成哪些内容。
- **上下文窗口**：一次请求能够容纳的内容范围，通常以 Token 表示。
- **调用方式**：官方 API、云平台托管服务，或自行部署。
- **计费**：输入、输出、缓存及其他功能如何收费。

“开放权重”指可以取得模型运行所需的参数，不等于使用、部署和商业用途都没有限制。

## 阿里云、腾讯云与 AWS 的主要产品

三家云平台都有计算、存储、数据库、网络和 AI 服务。下面列出与应用开发、大模型调用直接相关的常见产品。

| 产品类别 | 阿里云 | 腾讯云 | AWS |
| --- | --- | --- | --- |
| 云服务器 | [ECS](https://cn.aliyun.com/product/ecs) | [CVM](https://cloud.tencent.com/product/cvm) | [Amazon EC2](https://aws.amazon.com/ec2/) |
| 对象存储 | [OSS](https://help.aliyun.com/zh/oss/user-guide/what-is-oss) | [COS](https://cloud.tencent.com/document/product/436/6222) | [Amazon S3](https://aws.amazon.com/s3/) |
| 模型服务 | [百炼](https://help.aliyun.com/zh/model-studio/what-is-model-studio) | [混元 API](https://cloud.tencent.com/document/product/1729/101832) | [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) |

**云服务器**提供计算资源，用于运行网站、业务后端和其他程序。ECS、CVM、EC2 分别是三家平台的云服务器产品名称。

**对象存储**用于保存和访问文件，例如图片、音频、视频、文档和备份。OSS、COS、S3 分别是三家平台的对象存储产品名称。

**模型服务**提供可直接调用的模型能力：

- **阿里云百炼**：提供千问（Qwen）及第三方模型服务，也提供知识库和应用构建能力。
- **腾讯混元 API**：提供混元相关模型接口，包括文本生成、翻译、图像生成等。
- **Amazon Bedrock**：AWS 的托管模型服务，提供来自多家模型厂商的模型调用能力。

数据库用于保存用户、订单等业务记录；网络服务负责资源连接和访问；权限管理用于控制谁能够使用哪些资源。

## 大模型 API 售卖

API（Application Programming Interface，应用程序接口）让软件直接调用模型。例如，一个客服系统把用户的问题发送给模型接口，再接收模型生成的回答。

大模型 API 售卖，通常是向客户提供模型调用服务。产品内容包括可调用的模型、使用额度、调用容量、价格和技术支持。

### 接入需要哪些信息

常见的接入信息包括：

| 名称 | 含义 |
| --- | --- |
| API Key | 用于身份认证的访问密钥 |
| 接口地址 | 软件发送请求的服务地址 |
| 模型名称 | 指定本次请求调用哪个模型 |
| 请求参数 | 输入内容、输出长度等设置 |
| 返回结果 | 模型生成的内容、用量或错误信息 |

### 如何计费

Token 是模型处理内容的计量单位，可以是一个词、词的一部分或其他内容片段，不固定等于一个汉字或单词。

文本模型常见的收费项目包括：

- **输入费用**：发送给模型的内容。
- **输出费用**：模型生成的内容。
- **缓存费用**：缓存读取或写入，按产品规则收费。
- **工具费用**：搜索、代码执行等功能可能单独收费。

价格通常以“每百万 Token”表示。只考虑普通文本输入、输出时：

> 调用费用＝输入 Token 数 ÷ 1,000,000 × 输入单价＋输出 Token 数 ÷ 1,000,000 × 输出单价

不同产品的具体收费项目，以对应价格表为准。[参考：OpenAI API 计费说明](https://developers.openai.com/api/docs/pricing)

### 调用容量怎么看

| 指标 | 含义 |
| --- | --- |
| RPM | 每分钟允许的请求数量 |
| TPM | 每分钟允许处理的 Token 数量 |
| 并发数 | 同时进行的请求数量 |
| 响应时间 | 请求发出后，开始返回内容或完成回答所需的时间 |

有的平台会分别限制输入和输出 Token，例如 ITPM、OTPM。[参考：Claude API 限流说明](https://platform.claude.com/docs/en/api/rate-limits)

### 售卖时需要明确什么

向客户介绍 API 产品时，需要说明：

1. **提供什么**：模型名称、版本和支持的功能。
2. **如何使用**：接入文档、接口地址、认证方式和示例。
3. **如何收费**：计费单位、付款方式、额度及超额收费规则。
4. **容量多少**：请求限额、Token 限额和并发限制。
5. **如何支持**：故障处理、技术支持范围和约定的服务保障。
