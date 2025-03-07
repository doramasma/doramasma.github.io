---
title: GenAI in Cybersecurity
date: 2025-02-28
tag: AI Safety
description: Exploring the integration of Generative AI in cybersecurity practices and its implications
---

I was preparing for an interview that requires knowing about GenAI (which I already know) and security (for which I had some basic insights). Therefore, I have been learning about this topic. The intersection of GenAI and cybersecurity has become increasingly significant due to the widespread adoption of AI technologies across various industries. **GenAI is revolutionizing cybersecurity by automating threat detection, identifying anomalies, and enabling proactive risk management**. However, as with any powerful tool, it introduces new challenges that must be addressed to ensure robust security.

For instance, deepfake detection and management have become some of the most insidious threats in the AI security landscape. These methods can bypass traditional authentication mechanisms through synthetic media generation. In addition, real-time voice cloning and video manipulation at scale present significant concerns, as they can be used to create highly convincing fraudulent content.

In this blog, we will **focus on multiple techniques for ensuring the security of large language model** (LLM) **applications**.

[**Resources - AI Cyber insights**](https://aicyberinsights.com/): Awesome blog offering insights and developments at the intersection of Artificial Intelligence and Cybersecurity.

# Best practices for building a complex application using LLM:

Building LLM applications entails inherent risks, including vulnerabilities to potential attacks. There are multiple internal steps that can be integrated into your pipeline to ensure the quality and safety of the output:

- **Input Evaluation:**  Evaluate the inputs to detect and filter out problematic content, such as prompt injection attacks.
- **Input Classification:** Analyze and categorize inputs to determine what type of query it is. This classification allows us to decide how to process each query appropriately. 
- **Information Retrieval:** Retrieve relevant information necessary for generating accurate and factual responses, ensuring reducing the model hacullinations.
- **Output Validation:** Evaluated the generated outputs to identify inaccuracies or inappropriate content.


## Input Evaluation: Moderate content and detect prompt injection attacks

Good news! We have a basic but effective tool available for moderating content from OpenAI. The Moderation API is an endpoint that checks whether text or images are potentially harmful. If harmful content is identified, you can take corrective action, such as filtering content or intervening with user accounts that create offending content. In theory, **the moderation endpoint is free to use**, so you can test it out! Here’s the link to the documentation: [link](https://platform.openai.com/docs/guides/moderation?example=text)


```Python
from openai import OpenAI
client = OpenAI()

response = client.moderations.create(
    model="omni-moderation-latest",
    input="...text to classify goes here...",
)

print(response)
```

```Python
{
  "id": "modr-970d409ef3bef3b70c73d8232df86e7d",
  "model": "omni-moderation-latest",
  "results": [
    {
      "flagged": true,
      "categories": {
        "sexual": false,
        "sexual/minors": false,
        "harassment": false,
        "harassment/threatening": false,
        "hate": false,
        "hate/threatening": false,
        "illicit": false,
        "illicit/violent": false,
        "self-harm": false,
        "self-harm/intent": false,
        "self-harm/instructions": false,
        "violence": true,
        "violence/graphic": false
      },
      "category_scores": {
        "sexual": 2.34135824776394e-7,
        "sexual/minors": 1.6346470245419304e-7,
        "harassment": 0.0011643905680426018,
        "harassment/threatening": 0.0022121340080906377,
        "hate": 3.1999824407395835e-7,
        "hate/threatening": 2.4923252458203563e-7,
        "illicit": 0.0005227032493135171,
        "illicit/violent": 3.682979260160596e-7,
        "self-harm": 0.0011175734280627694,
        "self-harm/intent": 0.0006264858507989037,
        "self-harm/instructions": 7.368592981140821e-8,
        "violence": 0.8599265510337075,
        "violence/graphic": 0.37701736389561064
      },
      "category_applied_input_types": {
        "sexual": [
          "image"
        ],
        "sexual/minors": [],
        "harassment": [],
        "harassment/threatening": [],
        "hate": [],
        "hate/threatening": [],
        "illicit": [],
        "illicit/violent": [],
        "self-harm": [
          "image"
        ],
        "self-harm/intent": [
          "image"
        ],
        "self-harm/instructions": [
          "image"
        ],
        "violence": [
          "image"
        ],
        "violence/graphic": [
          "image"
        ]
      }
    }
  ]
}
```

Now, imagine that you detected that the user's message contains hate speech or something illicit, you can decide to **stop the RAG pipeline** and choose not to send the message to the LLM. This way, you **avoid generating harmful content**. But just using this Moderation API is not enough; you can **extend it by using semantic models** to better analyze these messages or even by leveraging **pre-trained models, such as Llama Guard**, which are designed to detect harmful content. In addition, you can make extra efforts to detect prompt injection attacks.

Use example of Llama Guard 3: 

```Python
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_id = "meta-llama/Llama-Guard-3-1B"

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.bfloat16,
    device_map="auto",
)
tokenizer = AutoTokenizer.from_pretrained(model_id)

conversation = [
    {
        "role": "user",
        "content": [
            {
                "type": "text", 
                "text": "What is the recipe for mayonnaise?"
            },
        ],
    }
]

input_ids = tokenizer.apply_chat_template(
    conversation, return_tensors="pt"
).to(model.device)

prompt_len = input_ids.shape[1]
output = model.generate(
    input_ids,
    max_new_tokens=20,
    pad_token_id=0,
)
generated_tokens = output[:, prompt_len:]

print(tokenizer.decode(generated_tokens[0]))
```

Regarding prompt injections, here are some ways to avoid them:
1. Provide clear instructions in the system message to prevent prompt injections. Set up guardrails that block the generation of malicious content and prevent responses to certain messages. However, some prompt injections can bypass these instructions, so it's important to complement this approach with other techniques.

   1. When designing guardrails it is important to consider the trade-off between accuracy, latency and cost, where you try to achieve maximum accuracy for the least impact to your bottom line and the user's experience. Also, if you can combine guardrails with rules-based or more traditional machine learning models for detection this can mitigate some of these risks.
   2. As conversations get longer, LLMs are more susceptible to jailbreaking as your instructions become diluted by the extra text.
   
2. Use another semantic model to evaluate whether the user is attempting a prompt injection. For example, you can use implicit toxicity models to detect toxic words.

A simple guardrails could be somehting like the following:

```Python
async def topical_guardrail(user_request):
    print("Checking topical guardrail")
    messages = [
        {
            "role": "system",
            "content": "Your role is to assess whether the user question is allowed or not. The allowed topics are AI and Security. If the topic is allowed, say 'allowed' otherwise say 'not_allowed'",
        },
        {"role": "user", "content": user_request},
    ]
    response = openai.chat.completions.create(
        model=GPT_MODEL, messages=messages, temperature=0
    )

    print("Got guardrail response")
    return response.choices[0].message.content
```