# Understanding Large Model APIs: Service Delivery, Billing, and Selection

Author: Pengfei Li  
Published: 2026-10-10  
AI assistance: GPT  
Keywords: Large Model APIs · Model Aggregation · Token Billing · Prompt Caching · Service Selection  
Original article: https://lipengfei.top/model-api-guide.html

Opening a model service platform for the first time can be confusing. A single model card may list input prices, output prices, caching, multipliers, channels, TPM, and maximum tokens. All relate to calling a model, but each describes a different part of the service.

Some determine fees, some control generation, and others describe service capacity. Comparing them without distinguishing their roles can lead to mistakes: treating maximum tokens as throughput, interpreting temperature as speed, or assuming that an OpenAI-compatible service is provided by OpenAI.

A useful starting point is a single request.

Suppose someone gives AI a report and asks it to extract the main arguments. The software sends the report and instructions to a service, which runs a model and returns the generated result. Four questions organize this process: **Who receives the request, how much content does the model process, how is the result returned, and how is the call billed?**

Following this chain gives each term on the model card a clear place.

## Model Names and Service Sources

When a platform lists a model, it first indicates that the platform offers an endpoint for calling it. Who developed the model, who actually runs it, and whom the user pays are separate questions.

| Role | Main responsibilities | What the user buys or uses |
|---|---|---|
| Model developer, often called the original model provider | Develops and releases models, and may offer its own API | Model access supplied by the original provider |
| Inference provider | Deploys models and uses computing resources to process requests | Hosted model inference |
| Cloud provider | Supplies infrastructure, deployment, model access, and supporting services | Model services delivered through a cloud platform |
| Model aggregation platform | Connects multiple models or suppliers and unifies interfaces, billing, and channel selection | Model access organized and delivered by the platform |

These roles can overlap. A cloud provider may aggregate models, an original model provider may operate an inference platform, and an aggregator may host some open-weight models itself.

**Inference** is the process through which a trained model generates results from an input. Training establishes its capabilities; inference puts those capabilities to use. An ordinary question-and-answer interaction usually involves inference.

For open-weight models whose licenses allow deployment under the relevant conditions, different providers can run the model on their own hardware. For other models, a platform may obtain access from the original provider or another upstream service. The same model name can therefore sit behind different delivery chains:

> User → Original provider's API  
> User → Cloud platform → Model service  
> User → Aggregation platform → Upstream supplier → Model service

Some platforms call inference suppliers “token factories.” The name can help explain their business: they use computing resources to process requests continuously, with tokens as a unit of measurement. They do not manufacture a stock of text in advance and then sell those words to users. The exact classification still depends on the platform's own definition.

This also explains why services with the same model name may differ in price and performance. Purchasing arrangements, runtime configuration, resource utilization, queuing policies, and intermediary services can all contribute.

“Official” is another frequently ambiguous term. **A platform's own official service, a service supplied by the original model provider, and a service authorized through a partnership are different descriptions.** A platform that emphasizes a partnership or authorization should be able to supply corresponding public documentation. A model name and brand logo alone do not establish that relationship.

## APIs Provide Access; Tokens Measure Usage

API stands for Application Programming Interface. It is an agreed interface through which software systems call one another.

A person submits questions through a chat window; a program sends requests through an API. A request generally specifies the model, input content, and generation parameters. The service processes it and returns both the result and the relevant usage information.

Three settings commonly appear during setup:

| Setting | Purpose |
|---|---|
| **Base URL** | Tells the software which service address should receive requests |
| **API Key** | A credential that identifies the account, permissions, and associated allowance |
| **Model ID** | Specifies the model to call; some platforms also append channel identifiers |

An API key is sometimes called a token. This differs from the token used in billing: one is a credential, while the other measures the content processed by a model.

Text is tokenized before it enters the model. A word may correspond to one or several tokens, and a Chinese character is not necessarily one token. Tokenization can differ between models. Images, audio, and video may also have their own accounting rules. [Google's explanation of tokens](https://ai.google.dev/gemini-api/docs/tokens)

Price tables commonly use these units:

- **K: one thousand, or 1,000.**
- **M: one million, or 1,000,000.**

A price of CNY 0.02 per K tokens therefore equals CNY 20 per M tokens. Prices become comparable only after their units are aligned.

**Input tokens** include more than the question typed for the current turn. System instructions, conversation history, reference material, and tool descriptions carried in the request may all consume input tokens. A seemingly short follow-up can send a long report again in the background.

**Output tokens** measure content generated by the model. For reasoning models, the billing treatment of thinking or reasoning tokens also needs checking. The length of the visible answer may not equal the full amount of billable generation.

A chat product subscription and an API allowance should also be understood separately. The former purchases usage rights within a product; the latter is settled under the API's billing rules. They are not interchangeable unless the provider explicitly says so.

## From a Price Table to an Actual Bill

The basic calculation when comparing model prices is:

> Call cost = each category of billable usage × its unit price, plus any applicable additional charges.

For a simple text call without caching or extra charges, this can be written as:

> Cost = input tokens ÷ 1,000,000 × input unit price  
> \+ output tokens ÷ 1,000,000 × output unit price

Suppose two platforms quote the following prices for a service. These figures are illustrative.

| Per million tokens | Platform A | Platform B |
|---|---:|---:|
| Standard input | CNY 20 | CNY 12 |
| Output | CNY 100 | CNY 60 |

For one million input tokens and two hundred thousand output tokens:

- Platform A: 20 + 0.2 × 100 = **CNY 40**.
- Platform B: 12 + 0.2 × 60 = **CNY 24**.

For this same usage, B costs 40% less than A.

The example also shows that output can account for a large share of the bill. Reading lengthy material and returning a short conclusion has a different cost structure from generating a long article. A price comparison should use your own ratio of input to output.

If a platform bills in credits, another conversion is needed.

Suppose CNY 35 buys 1,000 credits, and input costs 420 credits per M tokens. The effective price in yuan is:

> 420 × 35 ÷ 1,000 = **CNY 14.70 per M tokens**

The number 420 being larger than another provider's 20 does not mean the first service is more expensive. Their units differ.

A **multiplier** also needs to be interpreted within the platform's billing rules. It may express a model's price relative to a reference rate, or the output charge relative to input. If the page already shows the final price in yuan, multiplying it again may count the adjustment twice.

The most reliable check is to take one call record and reconcile its usage, displayed unit prices, deducted allowance, and the cost of purchasing that allowance. The price table explains the rules; the bill shows how they are applied.

## Why Caching Can Reduce Costs

When the same report is analyzed repeatedly, many requests start with identical instructions and reference material. Only the later question changes.

**Prompt caching allows a service to reuse eligible context computation.** The model still needs to generate an answer to the new question; caching does not simply copy the previous answer. [OpenAI's explanation of caching](https://developers.openai.com/api/docs/guides/prompt-caching)

Relevant price tables commonly distinguish:

- **Standard input:** the portion of input that is not reused through caching.
- **Cache creation or writing:** establishing a cache that later requests can reuse.
- **Cache reads or hits:** successfully reusing an existing cache in subsequent requests.

A cache may also expire after a period known as **TTL, or Time to Live**. Some services offer shorter and longer retention options with different write prices. Claude's documentation, for example, distinguishes five-minute and one-hour caches. One hour describes the retention period, rather than unlimited calls for an hour. [Claude's caching rules](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

“A 90% cache discount” and “a 90% cache hit rate” describe entirely different things.

Consider another hypothetical price: standard input costs CNY 20 per M tokens, while cache reads cost CNY 2 per M tokens.

The cache-read unit price is indeed 90% lower. But if only 90% of one million input tokens are cache hits, the combined input charge is:

> 0.9 × 2 + 0.1 × 20 = **CNY 3.8**

Compared with CNY 20 for entirely uncached input, this is an **81%** reduction.

If the call also generates two hundred thousand output tokens at CNY 100 per M tokens, its cost is:

> 3.8 + 0.2 × 100 = **CNY 23.8**

Compared with the uncached total of CNY 40, the whole call costs **40.5%** less. This calculation does not yet include cache creation or similar fees.

The cache-read discount, the share of input that hits the cache, and the reduction in the total bill therefore need separate calculations.

Caching benefits also depend on usage. Many requests that repeat stable reference material offer more room for reuse; requests that always process new content may gain little. Prompt arrangement, the model, retention time, and server matching rules can all affect cache hits. When checking a bill, inspect actual cached usage rather than relying only on advertised hit rates.

## Capacity, Speed, and Generation Parameters

“Handling many requests” and “generating one answer quickly” describe different capabilities.

| Metric | Meaning | Main question it answers |
|---|---|---|
| **TPM** | Tokens Per Minute: a token limit or capacity per minute | How much measured content can the service handle in a minute? |
| **RPM** | Requests Per Minute: a request limit per minute | How many calls are allowed in a minute? |
| **Concurrency** | The number of requests running simultaneously | How many tasks can be processed at once? |
| **TTFT** | Time to First Token | How long after submission does generated content begin to arrive? |
| **Generation speed** | Usually measured in tokens/s | Once generation starts, how many tokens arrive each second? |

Services may limit input and output separately, for example through ITPM and OTPM. Account tiers, models, and organization scopes may also affect the limits. [Claude's rate-limit documentation](https://platform.claude.com/docs/en/api/rate-limits)

If a service lists “TPM 5000W,” and W means ten thousand in that listing, the statement describes a capacity or limit of fifty million tokens per minute.

Assuming each request consumes ten thousand tokens against that limit, the token budget alone would allow five thousand requests per minute. Actual requests are also constrained by RPM, concurrency, and processing capacity. It is also necessary to establish whether the stated capacity is exclusive to the account or shared across the platform.

For someone who occasionally analyzes reports, the wait for the first result may matter more. For a team processing large batches, sustained throughput may be more important.

Generation parameters form a separate group of concepts:

| Parameter or specification | Meaning |
|---|---|
| **Context window** | The amount of content a model can accommodate in one operation; specific input and output constraints depend on the model |
| **Maximum output or generation tokens** | The limit or budget for generation in the current request; some interfaces include reasoning tokens |
| **Temperature** | Adjusts sampling randomness in models that support the parameter |
| **Reasoning effort** | Adjusts reasoning investment in models that support it |

For example, setting the maximum generation amount to 32,768 defines the generation budget for that request. It is not TPM, nor does it mean the model will necessarily generate that much. OpenAI explicitly defines `max_completion_tokens` as including visible output and reasoning tokens. [OpenAI's parameter documentation](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create)

Higher temperature generally leads to greater variation, while lower temperature concentrates choices. It is neither a speed multiplier nor an accuracy switch. Lowering temperature does not guarantee factual correctness, and not every model allows unrestricted temperature adjustment.

**Streaming** returns generated content progressively. Users can see the answer earlier, but the time required to finish the whole task remains a separate measurement.

## The Value of Aggregators and Gateways

If original providers already offer APIs, why do aggregation platforms exist?

Using several models can require managing multiple accounts, interfaces, keys, and bills. Services may also differ in request format and availability. Aggregators bring this work into one access point and may offer price advantages through purchasing arrangements or resource organization.

Their commercial value follows from this: unified access, consolidated billing, channel management, support, and the margin between purchase and sale prices. Explaining a particular platform's low prices requires evidence; its business practices cannot be inferred from a discount alone.

**OpenAI-compatible interfaces** are one way of unifying access. A platform adopts similar request formats so existing software can connect more easily. Google, for example, offers an endpoint for calling Gemini through OpenAI libraries; the requests are still processed by Gemini services. [Google's compatibility documentation](https://ai.google.dev/gemini-api/docs/openai)

Compatibility first addresses how to send a request. Support for images, tool calling, structured outputs, and reasoning parameters still needs checking individually.

**Tool calling** typically means that the model generates an intention to call a tool, together with its arguments, and a program or service then executes that tool. This requires both model capability and correct handling of the full workflow by the client and API.

A related concept is the **model gateway**. A gateway forwards requests to configured services and may offer protocol conversion, logging, budget management, and routing. LiteLLM provides unified access and management of multiple deployments. [LiteLLM's gateway documentation](https://docs.litellm.ai/docs/proxy/quick_start)

A gateway can run on your own computer. In that case, “local” describes the gateway's location. If it forwards requests to an external API, model computation and transmission of request content still take place externally.

An aggregator and a gateway can appear in the same chain:

> Application → Local gateway → Aggregator or original provider's API → Model service

Two further mechanisms matter:

**Routing** selects a model or supplier channel according to rules. These may prioritize cost, latency, available capacity, or load.

**Fallback or failover** tries a backup source after another source fails. LiteLLM's routing documentation lists strategies that account for cost, latency, and rate limits. [LiteLLM's routing documentation](https://docs.litellm.ai/docs/routing)

Switching improves the chance of completing a task, but may also change the actual unit price, waiting time, and cache-hit behavior. Different sources should not be assumed to share a cache automatically. Charges for retries also depend on the platform's billing rules.

Prices for automatically routed services should therefore be checked alongside the channels actually used. The cheapest channel on a model card is not necessarily the one selected for every request.

## Assessing Value in Actual Use

A price comparison ultimately needs to answer whether the task was completed and whether the result met the requirements.

For summarization, check whether key arguments were omitted. For information extraction, check field completeness and whether results can be traced back to the source. For coding, check actual execution and necessary tests. Different tasks require different standards; “the answer looks good” is difficult to use as a reliable comparison.

Consider another set of hypothetical results:

| The same 100 tasks | Service A | Service B |
|---|---:|---:|
| Total API cost | CNY 15 | CNY 10 |
| Results meeting predefined acceptance criteria | 95 | 50 |
| API cost per acceptable result | About CNY 0.158 | CNY 0.20 |

B has the lower bill, but A has the lower cost per acceptable result for this task set. Including retries, manual revision, and waiting time may change the comparison further.

Conversely, if two services deliver similar results for your tasks, the cheaper one may well be the better choice. The basis should be the same task set, comparable settings, and clear acceptance criteria, rather than brand names or the wording of two answers.

Keep a small task set and start by checking the following:

| Item to check | Information to obtain |
|---|---|
| Service source | Actual model version, deployment or forwarding arrangement, and any necessary partnership documentation |
| Billing rules | Actual input, output, cache, and other unit prices; conversion rules for credits and multipliers |
| Feature support | Whether required image inputs, tools, structured outputs, and generation parameters work |
| Performance | Wait for the first result, total time, failures, and interruptions |
| Routing and billing | Actual channels, switching conditions, retry charges, and accessible usage records |
| Terms of use | Balance expiry, refund conditions, data processing scope, and service assurances |

For someone new to APIs, one real call record that can be reconciled clearly is often more useful than more model cards. It connects the request, model, channel, tokens, and charge, turning abstract terms into facts that can be checked.

Once those pieces align, “which platform offers better value?” has a definite basis for comparison: which service, under your own usage pattern and acceptance criteria, consistently delivers the required results at an acceptable cost.
