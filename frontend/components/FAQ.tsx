import { faqs } from "@/data/faqs";

export function FAQ() { return <div className="faq-list">{faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>; }
