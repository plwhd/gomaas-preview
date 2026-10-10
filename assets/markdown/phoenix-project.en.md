# The Phoenix Project: Why Work Never Seems to Get Finished

Author: Pengfei Li  
Published: 2026-10-06  
AI assistance: GPT  
Keywords: The Phoenix Project · DevOps · Theory of Constraints · Workflow · Organizational collaboration  
Original article: https://lipengfei.top/phoenix-project.html

*This article draws on the publisher's public introduction, published excerpts, the author's explanations of related concepts, and DORA research materials. It offers a framework overview and analysis, rather than claiming a complete reading of the Chinese edition. The illustrative examples are hypothetical.*

When a task remains unfinished, people often ask whether the person responsible is taking it seriously enough, whether the team needs to work overtime, or whether project management should be stricter.

Those questions sometimes identify a real problem. But another situation is possible: everyone is working hard, meetings and messages keep coming, and incidents keep occurring. People have been busy for a long time, yet very little has actually been delivered.

This is the situation explored in *The Phoenix Project*.

Written by Gene Kim, Kevin Behr, and George Spafford, this management novel is set in the fictional company Parts Unlimited. Bill, an IT leader, takes over the badly delayed Phoenix project while also facing operational pressure and demands from senior management. The company is relying on a major project, but the organization responsible for it is already struggling to keep ordinary operations running. [Publisher's book introduction](https://itrevolution.com/product/the-phoenix-project/)

The story suggests a way to examine work: follow a request through development, review, release, and actual use by customers. Along that path, problems usually discussed in isolation begin to reveal their connections.

## A delayed project may be a symptom of a larger problem

Project management often begins with a schedule: list the tasks, assign owners, set dates, and check progress.

This approach assumes that people can devote their time to the work as planned.

Suppose an engineer has scheduled three days of development, one afternoon of review, and a day of system maintenance this week. Instead, Monday is spent resolving an incident, Tuesday explaining a problem in another project, Wednesday supporting an unexpected release, and Thursday attending an urgent meeting. The five days in the schedule are no longer the same as the five days actually available to the project.

The project appears to be only a few days late. Behind that delay, however, there may be a persistent condition: the same people receive work through several channels at once. Every channel can make demands, but no one has a complete view of the commitments.

*The Phoenix Project* identifies four types of work: business projects, internal IT projects, changes, and unplanned work. This classification reminds managers that maintenance, improvement, release adjustments, and unexpected problems consume capacity alongside formal projects. [The publisher's explanation of the four types of work](https://itrevolution.com/articles/10-minute-summary-of-the-phoenix-project/)

The value of the classification lies in making the picture more complete. It need not be treated as a set of mutually exclusive accounting categories: a business project can require system changes, and a failed change can create unplanned work.

If only business projects are counted, it is easy to overestimate the team's available time. Maintenance and incident response do not stop consuming time just because they are absent from the project list.

Unplanned work can also change the conditions for later work. An incident interrupts development; the delay then compresses testing time. Insufficient testing increases release risk, and when that risk materializes, new incidents follow. Time that could have been spent on improvement is repeatedly used to restore the previous state.

Simply asking the project manager to revise the schedule will not resolve this entire cycle.

## Why the person best at solving problems can become a bottleneck

Brent is a key engineer in the novel. In a supplementary explanation, the author notes that work was initially constrained by Brent because unplanned work repeatedly occupied his time. As improvements progressed, the constraint shifted to deployment and external support. [Gene Kim on the changing constraints in the book](https://itrevolution.com/articles/learn-more-about-concepts-in-phoenix-project/)

It is easy to draw the wrong conclusion: if Brent is the bottleneck, does that mean he works slowly or refuses to share knowledge?

“Bottleneck” describes his position in the work system. It is not, by itself, a judgment about his attitude.

If most important tasks need one person's judgment, and that person can make only a limited number of decisions each day, other people's work will queue up in front of him. He may be highly capable and work harder than anyone else, but his individual capacity is still finite.

This dependence may even grow out of earlier successes. He quickly resolves an incident, so people turn to him again next time. He understands the old system, so a new project also needs his review. Others worry about making mistakes and wait for his confirmation whenever they encounter uncertainty.

Each decision makes sense on its own. Together, they make the team increasingly dependent on the same person.

The Theory of Constraints, developed in *The Goal*, asks what limits the performance of the system as a whole. Its basic improvement sequence is to identify the constraint, make the best use of its existing capacity, coordinate other arrangements around it, increase its capacity when necessary, and then identify the next constraint. [Goldratt Research Labs: the Theory of Constraints and the five focusing steps](https://www.goldrattresearchlabs.com/introduction-to-toc)

Applied to a key engineer, this approach starts by examining what he is actually doing. Some tasks genuinely require his experience. Others reach him merely out of habit. Still others arrive without essential information, forcing him to complete someone else's preparation before he can begin.

Improvement can begin with these differences: send review tasks with complete materials, reduce repeated questions, set aside uninterrupted review time, and let others make routine decisions whose rules are already clear.

Making the best use of the constraint includes protecting scarce capacity. Continually interrupting someone and then asking him to work overtime to recover the lost time may further damage the quality of his judgment.

Hiring may also be necessary. But if knowledge, permissions, and decisions remain concentrated in the same person, new hires will need more guidance from him. In the short term, the bottleneck may become even busier. Hiring increases capacity; whether it relieves the current constraint depends on which work the newcomers can take on and how soon they can handle it independently.

## How a release can turn into a lasting backlog

To illustrate these relationships, imagine a retailer preparing to launch a new returns feature.

The product manager has defined the requirements, developers have completed the main code, and testers are checking it. Every change involving refunds and accounting also needs review by a senior engineer, who is responsible for production incidents as well.

Assume the review tasks require roughly equal effort and the engineer can complete twelve per week. This week brings eight planned reviews and six unexpected issues, for a total of fourteen. If this continues and capacity stays unchanged, the backlog grows by at least two items a week.

The example is simplified, but it demonstrates a basic relationship: when work keeps arriving faster than it can be completed, the backlog grows.

Management could ask developers to finish code faster. Yet if faster development produces ten review requests each week, in addition to the same six unexpected issues, the review queue will grow even faster. The development department's output has risen, but the complete feature may not be delivered any sooner.

Another option is to start more features at once so that everyone always has something to do. This may reduce some people's idle time, but switching between features awaiting review requires them to rebuild context. The longer a feature waits, the more likely its code or business requirements are to change, creating additional work when someone returns to it.

The organization then develops an inefficiency that individual daily reports may not reveal: everyone has tasks, many tasks have started, and few are finished.

DORA's guidance on work in process limits recommends making work visible across the entire delivery path and limiting how much is under way at once. This also exposes waiting between stages and encourages teams to resolve blocked work rather than keep adding new tasks. [DORA: Work in process limits](https://dora.dev/capabilities/wip-limits/)

In this example, more useful options to compare include postponing some lower-priority features, preparing complete materials for refund reviews, letting other engineers perform routine checks, and fixing recurring production problems.

Each choice has a cost. Postponement affects some business plans; training other engineers takes time; fixing persistent problems consumes development capacity now. “Reduce the bottleneck” is not a sufficient proposal. It must also explain which cost is acceptable and who has the authority to accept it.

## How flow, feedback, and learning connect

The Three Ways in *The Phoenix Project* focus on flow, feedback, and continual experimentation and learning. Gene Kim describes them as fundamental DevOps principles, emphasizing performance across the path from request to customer, timely correction of problems, and space for improvement and practice. [Gene Kim: The Three Ways](https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/)

The returns feature helps explain how these three ideas connect.

Start with flow. If completed code waits three weeks for review and release, reducing coding time may do little to shorten the delivery cycle. The team needs to find out where the waiting occurs and why before deciding what to change. A neatly drawn process diagram cannot substitute for an investigation of actual delays.

Next, consider feedback. Suppose the finance department points out only just before release that some refunds require different accounting rules. The team must revise completed code, test it again, and repeat the review.

Involving finance in the requirements discussion could reveal this issue earlier. Even so, “communicate earlier” is too vague. A more effective approach might be to ask finance staff to check the rules against several real returns scenarios or to demonstrate a complete refund flow. Feedback needs something concrete to assess.

Continual learning concerns what happens next time. The team could rely on the senior engineer's overtime to solve the current problem. It could also, once normal operations resume, document the accounting rules, checks, and incident handling and incorporate them into tests and everyday work. The second option requires extra effort but can reduce repeated work later.

These three practices depend on one another. When workload is out of control, it is difficult to make time for learning. When feedback arrives late, a team may efficiently build the wrong thing. When experience does not become part of everyday work, the same problems will interrupt flow again.

“Faster releases” therefore cannot be the only measure of improvement. The team also needs to observe whether errors decrease, recovery becomes easier, and customers' problems are resolved.

## Why small batches help, and why they are not always easy

Small-batch delivery puts these principles into practice. It allows teams to test assumptions sooner, obtain feedback earlier, and locate problems more easily. DORA also notes that each piece of work needs to be independently testable. If all the pieces are combined into a large batch before testing or release, feedback will still be delayed. [DORA: Working in small batches](https://dora.dev/capabilities/working-in-small-batches/)

For the returns feature, the team could start with a product category whose rules are clear and risks manageable. It could verify that the request, approval, refund, and accounting record work from end to end before moving to more complex cases.

Being small does not automatically make a batch useful. A page that has been built without connecting refunds and accounting may make development progress easier to report, but it cannot test the returns process. Splitting work too finely can also require constant coordination between dependent pieces, increasing management costs.

Existing conditions may limit small-batch delivery. If each release requires extensive manual preparation, even a small change has a substantial release cost. To deliver more frequently, the team may first need to improve its test environment, deployment process, and ability to roll back changes.

This explains why tools still matter. Automated testing, deployment, and monitoring can reduce the cost of repetitive work and make earlier feedback possible. Their role needs to be understood within a specific process: whose time do they save, which errors do they reduce, and do they merely move the waiting elsewhere?

After a tool is purchased, the team may still face the same constraints if work allocation, approvals, and responsibilities remain unchanged.

## Who can decide to do less work

Limiting work in process is not technically complicated, but it is often difficult to put into practice within an organization.

The product department has business goals, sales has made promises to customers, and senior management wants to meet a market opportunity. Every request may have a legitimate reason behind it. IT cannot reject them all simply because it feels busy.

But if every department can independently add requests and no one is responsible for the work displaced by them, limited capacity will be promised repeatedly.

Return to the earlier example. The senior engineer handles an urgent release today and another customer's problem tomorrow. Each adjustment makes sense on its own. The planned returns review is delayed as a result, but no one may explicitly acknowledge that consequence when making the new request.

Improvement requires making the trade-off an explicit decision: how much capacity the new work consumes, which existing commitment will be delayed, what that delay will affect, and who can authorize the choice.

This gives “business and IT alignment” a concrete meaning. The shared discussion is about capacity, risk, and opportunity cost as well as project names and completion dates.

On the other hand, a transparent process can itself become a burden. Requiring equally elaborate approval for every task slows down low-risk changes. A reasonable process distinguishes routine changes, major changes, and emergency responses, while retaining enough information for later review.

Urgent work cannot be eliminated entirely. What deserves attention is urgency becoming the routine way to bypass prioritization. That often indicates unstable priorities or recurring problems that have never been addressed.

## Learning needs time and consequences in practice

Many teams support retrospectives and knowledge sharing. Under delivery pressure, however, these activities are often the first to be canceled.

The choice is understandable: customers are waiting, an incident has already occurred, and documentation and training appear able to wait. The question is whether “later” ever arrives.

Suppose the same kind of refund error occurs every month. After each incident, the team decides to move on to the next request. Months later, the same person is still investigating it in the same way. Each incident may have been handled promptly, while the organization continues to pay the same recurring cost over a longer period.

Whether learning is valued can be judged from work arrangements: is there time to test improvements, can others participate in key operations, have new methods been rehearsed, and do retrospective actions actually change the next response?

DORA connects a learning culture with software delivery performance and argues that organizations should treat learning as an investment rather than a burden reluctantly accepted. This offers a research reference beyond the novel, but it does not guarantee that every training arrangement will have the same effect. [DORA: Learning culture](https://dora.dev/capabilities/learning-culture/)

A more useful test for the team is to ask which tasks more people can now handle, which problems no longer recur, and which decisions have become easier after investing in learning.

If none of these changes occurs, the number of retrospectives or hours of training cannot, on its own, demonstrate progress.

## Keeping the novel's answers in perspective

*The Phoenix Project* uses fiction to bring dependencies between different kinds of work into focus. This makes them easier to understand, but it also creates distance from real companies.

First, a story can arrange for a key character to ask the right question at the right moment. Real organizations must gather their own evidence. Someone being busy does not prove that he is the main constraint. He may be dealing with problems created elsewhere. The actual limit on delivery could be decision-making authority, system architecture, supplier response, or business requirements that remain unresolved.

Second, the manufacturing analogy is useful but has limits. Software development often involves exploration: requirements change, problems cannot be fully specified in advance, and some approaches can only be assessed by trying them. Emphasizing flow does not justify requiring every development task to be estimated as precisely as repetitive production work.

Third, better delivery capability is not the same as greater business value. A team can release large numbers of features that users do not need more quickly. Improving workflow must go together with judging the needs themselves.

Another possibility cannot be avoided: the team really does lack resources. If a key stage is persistently overloaded with necessary work and existing waste has already been reduced, further emphasis on process optimization may merely recast understaffing as a management problem. The discussion should then turn to increasing capacity, reducing scope, or changing commitments.

These limits make the book's methods more useful as diagnostic tools. They help readers ask questions that can be checked. What a particular organization should do still depends on its actual work.

## How to tell whether work is improving

For a team caught in persistent disorder, start with one type of work that often runs late and matters to the organization. Follow it from request to completion.

The record needs to include waiting, rework, and unexpected interruptions as well as active processing. Otherwise, the activities consuming the most delivery time may remain invisible.

Then choose one improvement supported by evidence: remove a redundant approval, confirm a rule that often causes rework earlier, or transfer a category of routine problems away from the key engineer.

To judge its effect, look at completion time, slower tasks, incidents and rework, and whether the end user receives the expected result. Average completion speed alone can hide a few tasks that remain stuck for a long time. Release counts alone can hide declining quality.

An improvement may fail. If the queue does not shrink, reconsider the constraint diagnosis. If delivery speeds up but errors increase, check whether necessary steps have been skipped. If technical tasks are completed smoothly but business results do not change, revisit the requirements assumptions.

One useful habit offered by *The Phoenix Project* is to develop judgments by following the work itself. When a project is late, find out where its time is spent. When a key employee is overloaded, examine which tasks really have to pass through that person. After proposing an improvement, observe whether it changes actual delivery.

In this way, being busy becomes more than an individual feeling. It becomes a fact about work that can be discussed and investigated.
