import { AITechnology } from '../types';

export const FUNCTIONAL_TAGS = [
  '#文字生成',
  '#知識檢索',
  '#程式開發',
  '#圖像生成',
  '#視覺理解',
  '#語音處理',
  '#工作流自動化',
  '#工具調用',
  '#複雜推理',
  '#思維鏈',
  '#效能微調',
  '#輕量化部署',
  '#向量比對',
  '#具身控制'
] as const;

export const CATEGORIES = [
  { id: 'all', label: '全部技術', count: 12 },
  { id: 'nlp', label: '語言與推理', count: 3 },
  { id: 'vision', label: '視覺與圖像', count: 2 },
  { id: 'multimodal', label: '多模態全能', count: 2 },
  { id: 'agent', label: '智慧體與工作流', count: 2 },
  { id: 'infra', label: '架構與資料檢索', count: 2 },
  { id: 'audio', label: '語音與音訊', count: 1 },
] as const;

export const AI_TECHNOLOGIES: AITechnology[] = [
  {
    id: 'llm',
    name: '大型語言模型',
    englishName: 'Large Language Models (LLMs)',
    shortDefinition: '基於 Transformer 解碼器架構與自注意力機制，透過海量文本預訓練實現下一詞預測與通用文本理解生成。',
    category: 'nlp',
    categoryLabel: '語言與推理',
    tags: ['#文字生成', '#程式開發', '#複雜推理', '#思維鏈'],
    maturity: '實用工程級',
    yearIntroduced: '2017 (Transformer) / 2020~至今',
    iconName: 'MessageSquareText',
    accentColor: 'indigo',
    corePrinciple: 'LLM 核心為 Autoregressive（自回歸）預測模型。將文字拆解為 Token 序列，透過多頭自注意力機制 (Multi-Head Self-Attention) 計算上下文中各詞元之間的關聯權重，並預測下一個最可能出現的 Token。經過海量無監督預訓練 (Pre-training) 獲取通用知識，再透過監督微調 (SFT) 與對齊訓練 (RLHF/DPO) 遵循人類指令。',
    architectureSteps: [
      {
        step: 1,
        title: 'Tokenization 詞元編碼',
        description: '將自然語言文本切分為 Token ID 序列（如 Byte-Pair Encoding BPE），並映射至高維 Embedding 向量空間。'
      },
      {
        step: 2,
        title: 'Self-Attention 自注意力計算',
        description: '透過 Query (Q)、Key (K)、Value (V) 矩陣運算，計算序列中每個詞與其餘詞的相關度權重 softmax(QK^T / √d_k)V。'
      },
      {
        step: 3,
        title: '前饋神經網絡與層疊變換',
        description: '經過 Multi-layer Perceptron (MLP) 和 RMSNorm 正則化，捕捉複雜的非線性抽象語義特徵。'
      },
      {
        step: 4,
        title: 'Logits 預測與採樣生成',
        description: '將最終隱藏狀態投影至詞表維度，透過 Temperature、Top-P 或 Top-K 採樣選出下一個詞元，逐字遞迴輸出。'
      }
    ],
    strengths: [
      '強大的零樣本 (Zero-shot) 與少樣本 (Few-shot) 泛化能力',
      '具備深厚的語言理解、摘要歸納、代碼生成與創意寫作潛能',
      '豐富的生態系與標準化 API，便於整合於各式企業軟體中'
    ],
    limitations: [
      '存在幻覺現象 (Hallucination)，可能以自信語氣輸出錯誤資訊',
      '知識受限於訓練資料截止時間 (Cut-off date)，無法原生獲取最新私有資料',
      '計算資源開銷龐大，長上下文推理需高階 GPU 支援'
    ],
    useCases: [
      {
        title: '智慧客服與對話機器人',
        industry: '電子商務 / 金融保險',
        scenario: '7x24 小時解答用戶各類諮詢、自動歸納訂單問題並生成專業回覆。'
      },
      {
        title: '輔助代碼編寫與除錯',
        industry: '軟體開發',
        scenario: '分析工程代碼庫、自動產生單元測試、自動補全函數與解釋複雜邏輯。'
      },
      {
        title: '企業內部文件智能萃取',
        industry: '法律與醫療',
        scenario: '快速研讀數百頁合約與文獻，提取關鍵條款並產出結構化合規摘要。'
      }
    ],
    representativeTools: [
      { name: 'GPT-4o / GPT-4', type: '商業服務', description: 'OpenAI 旗艦通用多模態大模型，具備極佳推理與自然對話能力。' },
      { name: 'Claude 3.7 Sonnet', type: '商業服務', description: 'Anthropic 混合推理模型，兼具極速反應與深度鏈路思考能力。' },
      { name: 'Llama 3.3 (70B)', type: '開源模型', description: 'Meta 開源大模型典範，開放權重支援本機私有化部署。' },
      { name: 'Gemini 2.0 Flash', type: '商業服務', description: 'Google 高速低延遲多模態模型，支援百萬級長上下文。' },
      { name: 'vLLM', type: '開發框架', description: '高吞吐量 LLM 服務引擎，採用 PagedAttention 技術極致優化顯存利用率。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '使用 OpenAI API 呼叫 LLM 範例',
      code: `from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一位資深的技術架構師。"},
        {"role": "user", "content": "請用繁體中文以三點簡短說明 Transformer 架構的優勢。"}
    ],
    temperature=0.7,
    max_tokens=300
)

print(response.choices[0].message.content)`,
      explanation: '透過標準 Chat Completion 格式傳入系統提示與使用者問題，模型根據機率分佈流式或一次性產出回答。'
    },
    comparisonMetrics: {
      computeCost: 4,
      latency: 3,
      customizationEase: 3,
      dataRequirement: 5,
      realTimeCapability: 3
    },
    interactiveDemo: {
      type: 'cot',
      title: 'Token 預測與生成過程模擬',
      description: '觀察 LLM 如何根據上下文機率分佈逐步預測詞元並完成語意建構。'
    }
  },
  {
    id: 'rag',
    name: '檢索增強生成',
    englishName: 'Retrieval-Augmented Generation (RAG)',
    shortDefinition: '將外部專屬資料庫的語義檢索與 LLM 生成能力結合，徹底解決模型幻覺並實現最新私有知識問答。',
    category: 'infra',
    categoryLabel: '架構與資料檢索',
    tags: ['#知識檢索', '#文字生成', '#向量比對', '#輕量化部署'],
    maturity: '實用工程級',
    yearIntroduced: '2020 (Lewis et al.) / 2023 爆發',
    iconName: 'Database',
    accentColor: 'emerald',
    corePrinciple: 'RAG 採用「先搜尋、再生成」的兩階段策略。將企業私有文件切塊 (Chunking) 並透過 Embedding 模型轉為向量索引。當使用者發問時，先在向量庫進行相似度檢索 (Vector Similarity Search) 找出最相關的 Top-K 文本片段，再將檢索結果與問題包裝為 Prompt 傳給 LLM 生成具備精準依據的回答。',
    architectureSteps: [
      {
        step: 1,
        title: '文件解析與切塊 (Ingestion & Chunking)',
        description: '將 PDF、Markdown、HTML 等原始資料清洗並按照語義或固定 Token 大小切割為片段。'
      },
      {
        step: 2,
        title: '向量化與持久化 (Embedding & Indexing)',
        description: '調用嵌入模型計算各文本區塊的高維向量，儲存至 Pinecone/Milvus/Qdrant 建立 HNSW 索引。'
      },
      {
        step: 3,
        title: '語義檢索與重排序 (Retrieval & Rerank)',
        description: '使用餘弦相似度或混合檢索 (BM25 + Dense) 找出最相關區塊，並透過 Cross-Encoder 重新排序。'
      },
      {
        step: 4,
        title: '增強 Prompt 生成回答 (Generation)',
        description: '將檢索到的上下文資訊附帶引用標註置入 Prompt，由 LLM 基於事實生成回答。'
      }
    ],
    strengths: [
      '無需昂貴的模型重新訓練，即可隨時動態更新企業知識庫',
      '回答具備明確的可追溯來源與頁碼引用，大幅降低 AI 幻覺',
      '可嚴格結合企業權限控制 (ACL)，確保機密資料隔離'
    ],
    limitations: [
      '檢索精準度高度依賴切塊策略、Embedding 品質與 Reranker 效能',
      '跨文件綜合關聯分析能力在簡單架構下受限（需依賴 GraphRAG）',
      '引入向量資料庫與檢索管線，增加了系統架構複雜度'
    ],
    useCases: [
      {
        title: '企業內部知識庫問答',
        industry: 'IT / 人資 / 企業營運',
        scenario: '員工隨時查詢內規、技術 Wiki、報銷制度，由 AI 精準引述規章條文。'
      },
      {
        title: '產品手冊與售後技術支援',
        industry: '製造業 / 智慧硬體',
        scenario: '快速比對數萬頁規格書與故障代碼，為現場工程師提供即時排錯建議。'
      },
      {
        title: '金融投資研報深度問答',
        industry: '證券金融',
        scenario: '即時檢索數百份季報與財報 PDF，精準對比營收利潤與產業趨勢。'
      }
    ],
    representativeTools: [
      { name: 'LlamaIndex', type: '開發框架', description: '專為資料增強與 RAG 設計的資料框架，提供強大的切塊與檢索索引管道。' },
      { name: 'LangChain', type: '開發框架', description: '構建 LLM 應用與檢索工作流的通用鏈接框架。' },
      { name: 'Pinecone / Qdrant', type: '基礎設施', description: '專用雲端高效能向量資料庫，支援億級向量低延遲檢索。' },
      { name: 'Cohere Rerank', type: '商業服務', description: '先進的語義重排序模型，顯著提升 Top-N 檢索的準確率。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '使用 LlamaIndex 建立極簡 RAG 檢索流程',
      code: `from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# 1. 讀取本地文件目錄
documents = SimpleDirectoryReader("data").load_data()

# 2. 自動切塊、向量化並構建向量索引
index = VectorStoreIndex.from_documents(documents)

# 3. 創建問答檢索查詢引擎
query_engine = index.as_query_engine(similarity_top_k=3)

# 4. 發問並取得附帶引用的回答
response = query_engine.query("這份產品規格中的保固期限與除外責任為何？")
print(response)`,
      explanation: '展示使用現代框架一鍵完成「文件加載 -> 切塊向量化 -> 相似度匹配 -> 增強提示詞回答」完整工作流。'
    },
    comparisonMetrics: {
      computeCost: 2,
      latency: 2,
      customizationEase: 4,
      dataRequirement: 2,
      realTimeCapability: 4
    },
    interactiveDemo: {
      type: 'rag',
      title: 'RAG 檢索增強與向量比對模擬器',
      description: '嘗試輸入問題，即時體驗「切塊向量比對 ➔ 信心度篩選 ➔ 增強提示詞拼接 ➔ 最終生成」完整鏈路。'
    }
  },
  {
    id: 'ai-agents',
    name: 'AI 智慧體與自主工作流',
    englishName: 'AI Agents & Function Calling',
    shortDefinition: '賦予大模型目標規劃、工具調用、環境反思與多步驟自主執行能力，從對話升級為主動解決複雜任務。',
    category: 'agent',
    categoryLabel: '智慧體與工作流',
    tags: ['#工作流自動化', '#工具調用', '#複雜推理', '#程式開發'],
    maturity: '實用工程級',
    yearIntroduced: '2022 (ReAct 範式) / 2024~至今',
    iconName: 'Bot',
    accentColor: 'blue',
    corePrinciple: 'AI Agent 核心遵循 ReAct (Reasoning + Acting) 範式。Agent 接收目標後，先進行「思考 (Thought)」，決定調用何種外部 API 或工具（例如搜尋引擎、代碼執行器、資料庫查詢）；「執行 (Action)」後獲取「觀察反饋 (Observation)」，並自我評估是否達成目標，持續循環直至任務完成。',
    architectureSteps: [
      {
        step: 1,
        title: '目標分解與規劃 (Planning)',
        description: '將模糊的複雜目標拆解為可執行的子任務清單（如 DAG 有向無環圖）。'
      },
      {
        step: 2,
        title: '工具調用與執行 (Tool / Function Calling)',
        description: '模型輸出符合 JSON Schema 的參數，調用計算器、瀏覽器、Shell 或第三方 API。'
      },
      {
        step: 3,
        title: '環境反饋與記憶讀取 (Observation & Memory)',
        description: '將工具執行結果回傳給模型，並結合短期對話歷史與長期向量記憶。'
      },
      {
        step: 4,
        title: '自我反思與終止判定 (Reflection & Completion)',
        description: '檢查結果是否合乎要求，若遇錯則自我修正重試，直到產生最終結論。'
      }
    ],
    strengths: [
      '具備自主執行多步驟複雜任務的能力，無需人類每一步提示',
      '能無縫串接外部軟體、API 與現代資料庫，打破靜態模型邊界',
      '多 Agent 協作 (Multi-Agent Swarm) 可模擬軟體團隊角色分工'
    ],
    limitations: [
      '長鏈路執行容易發生誤差累積或死循環 (Infinite Loop)，需嚴格設定 Guardrails',
      '多次模型推理與工具交互導致 Token 開銷與延遲顯著增加',
      '非確定性行為在關鍵商業流程中需人工介入核准 (Human-in-the-loop)'
    ],
    useCases: [
      {
        title: '自主深度研究助理',
        industry: '市場分析 / 學術研究',
        scenario: '輸入主題後，Agent 自主搜尋十幾篇網路文章、交叉比對數據並輸出排版嚴密的調研報告。'
      },
      {
        title: '自動化軟體工程師',
        industry: 'DevOps & 軟體開發',
        scenario: '讀取 GitHub Issue，定位出錯檔案、編寫測試、修復代碼並自動提交 PR。'
      },
      {
        title: '智慧跨系統流程自動化',
        industry: '企業 ERP / 電商營運',
        scenario: '自動比對發票金額、登入財會系統過帳，並向異常供應商發送澄清郵件。'
      }
    ],
    representativeTools: [
      { name: 'LangGraph', type: '開發框架', description: '專為循環與有狀態 Agent 設計的圖結構編排庫，支援強大分支控制。' },
      { name: 'CrewAI', type: '開發框架', description: '直覺的多 Agent 角色扮演框架，輕鬆模擬經理、研究員與寫手分工。' },
      { name: 'AutoGen (Microsoft)', type: '開發框架', description: '微軟開源的多代理對話協同框架。' },
      { name: 'OpenAI Operator / Swarm', type: '開發框架', description: '輕量化多代理協同與自主工具調用標準。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '使用 OpenAI Function Calling 定義工具調用',
      code: `tools = [{
    "type": "function",
    "function": {
        "name": "get_stock_price",
        "description": "取得指定股票代號的最新即時價格",
        "parameters": {
            "type": "object",
            "properties": {
                "ticker": {"type": "string", "description": "股票代號，例如 AAPL, TSLA, 2330.TW"}
            },
            "required": ["ticker"]
        }
    }
}]

# Agent 會根據使用者提問自動判斷是否輸出 function call 結構
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "台積電 (2330.TW) 現在股價多少？"}],
    tools=tools,
    tool_choice="auto"
)`,
      explanation: '定義嚴謹的 JSON Schema 工具規範，LLM 會在需要時返回結構化調用參數由宿主程式執行。'
    },
    comparisonMetrics: {
      computeCost: 5,
      latency: 5,
      customizationEase: 3,
      dataRequirement: 3,
      realTimeCapability: 2
    },
    interactiveDemo: {
      type: 'agent',
      title: 'ReAct 自主循環模擬器 (Thought-Action-Observation)',
      description: '觀察 Agent 如何拆解使用者任務，逐步進行「推理 ➔ 調用工具 ➔ 獲取環境反饋 ➔ 自我反思輸出」。'
    }
  },
  {
    id: 'diffusion',
    name: '潛在擴散模型與生成式視覺',
    englishName: 'Latent Diffusion Models (LDMs)',
    shortDefinition: '透過在低維潛在空間中模擬「加噪」與「去噪」數學物理過程，將純隨機高斯噪聲逐步重構成極致細膩的圖像與影片。',
    category: 'vision',
    categoryLabel: '視覺與圖像',
    tags: ['#圖像生成', '#視覺理解', '#輕量化部署'],
    maturity: '實用工程級',
    yearIntroduced: '2020 (DDPM) / 2022 (Stable Diffusion) / 2024 (Flux)',
    iconName: 'Image',
    accentColor: 'purple',
    corePrinciple: '擴散模型本質是基於熱力學非平衡擴散理論的生成模型。訓練時在圖像中逐步加入高斯噪聲（前向過程）；生成時利用神經網路（U-Net 或 Diffusion Transformer DiT）預測每一步的噪聲殘差，從純隨機白噪聲中逐級反向去噪（反向過程）。Latent Diffusion (LDM) 透過 VAE 編碼器將圖像壓縮到潛空間，大幅降低顯存開銷。',
    architectureSteps: [
      {
        step: 1,
        title: '提示詞特徵編碼 (Text Conditioning)',
        description: '使用 CLIP 或 T5 語言模型將文字 Prompt 轉化為語義引導向量 (Text Embeddings)。'
      },
      {
        step: 2,
        title: '潛在空間噪聲初始化 (Latent Noise Initialization)',
        description: '生成一組符合標準常態分佈的高斯隨機噪聲張量 (Random Noise Latent)。'
      },
      {
        step: 3,
        title: '多步反向去噪 (Iterative Denoising Loop)',
        description: '利用 U-Net / DiT 結合 Cross-Attention，在 20~50 步採樣步數 (如 Euler, DPM++) 下逐步剔除噪聲。'
      },
      {
        step: 4,
        title: 'VAE 解碼還原高清像素 (VAE Decoding)',
        description: '將去噪完成的潛空間特徵張量透過 VAE Decoder 還原為 RGB 像素圖像。'
      }
    ],
    strengths: [
      '生成質量極高、細節紋理逼真，徹底超越傳統 GAN 架構',
      '具備優異的多樣性與可控性（結合 ControlNet、IP-Adapter、LoRA）',
      '架構容易擴展至影片生成 (Sora, Kling, Runway Gen-3) 與 3D 資產合成'
    ],
    limitations: [
      '自回歸或多步去噪需要多次前向運算，生成一張圖像需數十次採樣，延遲較高',
      '對極複雜文字排版、精細人體肢體結構仍偶有空間扭曲',
      '顯存需求較大（儘管有 LCM 與 SD-Turbo 等加速蒸餾技術）'
    ],
    useCases: [
      {
        title: '遊戲美術概念設計與資產生成',
        industry: '數位娛樂與遊戲',
        scenario: '在幾秒內產生數十款角色設定圖、場景氛圍圖與貼圖材質原型。'
      },
      {
        title: '電商廣告商品圖生成',
        industry: '行銷與廣告',
        scenario: '無縫將商品置入多種逼真的生活化場景中，省去高昂實體棚拍成本。'
      },
      {
        title: '影視特效與動態視覺合成',
        industry: '電影製作與短影音',
        scenario: '透過文生影片與圖生影片模型快速生成分鏡動畫與特效轉場。'
      }
    ],
    representativeTools: [
      { name: 'Flux.1 (Schnell / Dev)', type: '開源模型', description: 'Black Forest Labs 開發的頂級開源 DiT 圖像生成模型，解剖學與文字渲染卓越。' },
      { name: 'Stable Diffusion 3.5', type: '開源模型', description: 'Stability AI 開源的多模態擴散模型，支援多種權重規格。' },
      { name: 'Midjourney v6', type: '商業服務', description: '業界標竿商業 AI 繪圖服務，藝術風格化與質感極致。' },
      { name: 'ComfyUI', type: '開發框架', description: '節點式模組化擴散模型工作流 GUI，專業創作者首選工具。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '使用 Diffusers 庫調用 Stable Diffusion 生成圖像',
      code: `import torch
from diffusers import StableDiffusionXLPipeline

# 加載 SDXL 模型權重並移至 GPU
pipe = StableDiffusionXLPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16,
    variant="fp16"
).to("cuda")

# 透過文字提示詞進行反向去噪生成
prompt = "Futuristic cyber city at sunset, neon reflections in rain, 8k resolution, cinematic lighting"
image = pipe(prompt=prompt, num_inference_steps=30, guidance_scale=7.5).images[0]

image.save("cyber_city.png")`,
      explanation: '使用 Hugging Face 的 Diffusers 管道，指定推理採樣步數與引導尺度完成去噪生成。'
    },
    comparisonMetrics: {
      computeCost: 4,
      latency: 4,
      customizationEase: 4,
      dataRequirement: 4,
      realTimeCapability: 2
    },
    interactiveDemo: {
      type: 'diffusion',
      title: '去噪步進視覺化模擬器 (Denoising Slider)',
      description: '拖動去噪進度條，直觀體會從「純隨機高斯噪聲 ➔ 粗糙輪廓 ➔ 細緻結構 ➔ 高清成品」的演變過程。'
    }
  },
  {
    id: 'multimodal',
    name: '多模態全能模型',
    englishName: 'Multimodal Foundation Models (Omni Models)',
    shortDefinition: '原生統一音訊、視覺、文字與影片的原生神經架構，實現跨模態無縫即時理解、語音對話與視覺推理。',
    category: 'multimodal',
    categoryLabel: '多模態全能',
    tags: ['#視覺理解', '#語音處理', '#文字生成', '#複雜推理'],
    maturity: '實用工程級',
    yearIntroduced: '2023 (GPT-4V) / 2024 (GPT-4o, Gemini 1.5/2.0)',
    iconName: 'Sparkles',
    accentColor: 'amber',
    corePrinciple: '早期多模態採用「各自模型拼裝（如 Whisper 轉文字 -> LLM -> TTS）」的串聯架構，損失了音調、語氣、視覺即時性。現代 Omni 模型採用單一神經網絡端到端處理多種模態 Token，具備原生視覺編碼 (ViT) 與即時音訊流編解碼器，實現端到端 <300ms 超低延遲跨模態交互。',
    architectureSteps: [
      {
        step: 1,
        title: '跨模態 Token 化 (Cross-Modal Tokenization)',
        description: '將影像切片成 Patch 向量、將音訊切片成音訊 Token、將文字轉為 Text Token。'
      },
      {
        step: 2,
        title: '聯合注意力對齊 (Unified Attention Space)',
        description: '所有模態在統一的 Transformer 隱藏層中進行注意力交互，實現跨模態語意對齊。'
      },
      {
        step: 3,
        title: '原生音訊與視覺流解碼 (Omni Streaming Output)',
        description: '模型可直接輸出連續音訊特徵或文字流，無需經過中間轉錄步驟。'
      }
    ],
    strengths: [
      '超低延遲人機自然語音對話，能理解語氣、停頓甚至背景噪音',
      '具備深厚的圖像、圖表、UI 截圖、醫學影像解讀與影片時序推理能力',
      '消除了多模型串聯產生的訊息損耗與累計延遲'
    ],
    limitations: [
      '高幀率連續影片輸入對帶寬與上下文窗口 (Context Window) 消耗極大',
      '端到端音訊微調難度高，需要龐大精標的多模態配對數據集'
    ],
    useCases: [
      {
        title: '即時視覺語音輔助 (AI 視障眼鏡 / 智慧鏡頭)',
        industry: '無障礙輔助 / 穿戴裝置',
        scenario: '透過鏡頭即時辨識周遭路況、辨認藥品說明書並用自然聲音引導使用者。'
      },
      {
        title: '複雜技術架構圖與報表審計',
        industry: '金融與企業 IT',
        scenario: '直接輸入複雜的雲端架構圖或折線圖，AI 自動計算增長率並檢查安全性弱點。'
      },
      {
        title: '外語口語真人互動陪練',
        industry: '教育科技',
        scenario: '模擬各國口音即時打斷對話、糾正發音與語法錯誤。'
      }
    ],
    representativeTools: [
      { name: 'Gemini 2.0 Flash / Pro', type: '商業服務', description: 'Google 原生多模態標竿，支援即時雙向音訊流與影片理解。' },
      { name: 'GPT-4o / GPT-4o-mini', type: '商業服務', description: 'OpenAI 旗艦 Omni 模型，語音響應極速且自然。' },
      { name: 'Qwen2.5-VL (72B)', type: '開源模型', description: '阿里開源的多模態視覺語言大模型，文字定位與細節辨識頂尖。' }
    ],
    codeSnippet: {
      language: 'typescript',
      title: '使用 Google GenAI SDK 進行多模態圖片分析',
      code: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 傳入圖片 base64 與提問
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: [
    { text: "請分析這張電路圖是否有短路風險，並列出主要晶片型號。" },
    { inlineData: { mimeType: 'image/jpeg', data: base64ImageString } }
  ]
});

console.log(response.text);`,
      explanation: '多模態 API 支援同時傳入文字提示與多張高解析度圖片或音訊二進位資料。'
    },
    comparisonMetrics: {
      computeCost: 4,
      latency: 2,
      customizationEase: 3,
      dataRequirement: 5,
      realTimeCapability: 5
    },
    interactiveDemo: {
      type: 'multimodal',
      title: '多模態視覺與圖表感知模擬',
      description: '切換不同的視覺場景（流程圖、代碼截圖、物件照片），體驗多模態 AI 的結構化解讀。'
    }
  },
  {
    id: 'reasoning-cot',
    name: '思維鏈推理與測試時計算',
    englishName: 'Reasoning Models & Test-Time Compute (o1/R1)',
    shortDefinition: '突破傳統快速預測模式，透過強化學習 (RL) 激發內在深思熟慮 (Thinking / CoT)，在回答前自主探索多種解法並驗證。',
    category: 'nlp',
    categoryLabel: '語言與推理',
    tags: ['#複雜推理', '#思維鏈', '#程式開發'],
    maturity: '前沿探索級',
    yearIntroduced: '2024 (OpenAI o1) / 2025 (DeepSeek-R1)',
    iconName: 'BrainCircuit',
    accentColor: 'rose',
    corePrinciple: '傳統 LLM 是「System 1 快思考」，每個 Token 分配相同計算量。推理模型引入「System 2 慢思考」與測試時計算 (Test-Time Compute Scaling)。在輸出最終答案前，模型會在內部生成隱藏或顯式的思考鏈 (Chain-of-Thought)，進行試錯、假設檢驗、回溯 (Backtracking) 與自我除錯，極大提升在競賽數學、算法、科學論證上的上限。',
    architectureSteps: [
      {
        step: 1,
        title: '問題拆解與假設提出',
        description: '模型在 <think> 標籤內對問題進行多角度拆解，定義邊界條件與潛在解法。'
      },
      {
        step: 2,
        title: '多分支路徑搜尋與驗證 (Search & Verification)',
        description: '在思維空間內嘗試第一種解法，若發現矛盾則主動執行 Backtracking 尋找替代路徑。'
      },
      {
        step: 3,
        title: '結論綜合與精簡輸出',
        description: '在確認邏輯自洽後，結束內部思考流程，向使用者輸出最終經過驗證的清晰結論。'
      }
    ],
    strengths: [
      '在奧林匹亞競賽數學、高難度編程競賽 (Codeforces)、密碼學領域表現卓越',
      '大幅降低邏輯跳躍與推論錯誤，具備強大的自我反思驗證機制',
      '揭示了 AI 模型擴展的全新維度（測試時計算資源越多，智力表現越高）'
    ],
    limitations: [
      '思考過程需要產生額外數千甚至上萬個 Thinking Tokens，響應延遲大幅拉長 (5~30秒)',
      '對於簡單的閒聊、直接事實查詢顯得過於大材小用且成本較高'
    ],
    useCases: [
      {
        title: '複雜算法競賽與深層系統除錯',
        industry: '軟體研發與架構',
        scenario: '排查複雜的分散式死鎖條件，精確證明邊界狀態與設計最佳時間複雜度解法。'
      },
      {
        title: '生醫藥物分子結構推導與論文驗證',
        industry: '生命科學與醫藥',
        scenario: '分析多階段化學反應機制，推導分子合成路徑並驗證物理可實現性。'
      },
      {
        title: '高階法律論證與複雜稅務合規架構',
        industry: '稅務會計與跨國法律',
        scenario: '跨多國法規交叉檢驗投資架構，進行深層風險回溯與合規論證。'
      }
    ],
    representativeTools: [
      { name: 'DeepSeek-R1', type: '開源模型', description: '透過大規模純強化學習訓練的開源推理模型標竿，公開完整思維鏈。' },
      { name: 'OpenAI o1 / o3-mini', type: '商業服務', description: 'OpenAI 頂級慢思考推理模型，在 STEM 領域達到博士級水平。' },
      { name: 'Claude 3.7 Sonnet (Extended Thinking)', type: '商業服務', description: '支援彈性調節思考預算 (Thinking Budget) 的混合推理模型。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '調用具備思考預算的推理模型 API',
      code: `import anthropic

client = anthropic.Anthropic()

# 啟用擴展思考模式，設定最大思考 Token 數
response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=20000,
    thinking={
        "type": "enabled",
        "budget_tokens": 8000  # 分配 8000 tokens 給內部推理探索
    },
    messages=[{
        "role": "user",
        "content": "請證明是否存在無窮多個形如 4k+3 的質數，並提供嚴謹的反證法數學證明。"
    }]
)

# 可分別讀取 thinking 過程與最終回答
for block in response.content:
    if block.type == "thinking":
        print(f"[思考過程]: {block.thinking[:200]}...")
    elif block.type == "text":
        print(f"[最終答案]: {block.text}")`,
      explanation: '推理模型會將計算資源分配在生成內部思考鏈上，確保最終結論具備嚴謹數學與邏輯證明。'
    },
    comparisonMetrics: {
      computeCost: 5,
      latency: 5,
      customizationEase: 2,
      dataRequirement: 4,
      realTimeCapability: 1
    },
    interactiveDemo: {
      type: 'cot',
      title: '思維鏈 (CoT) 慢思考逐步展開模擬',
      description: '觀察模型在回答難題時，如何在內部進行「假設 ➔ 自我質疑 ➔ 修正路徑 ➔ 輸出確定結論」。'
    }
  },
  {
    id: 'embeddings',
    name: '向量嵌入與語義搜尋',
    englishName: 'Vector Embeddings & Semantic Search',
    shortDefinition: '將文字、圖像、代碼等任意資料映射至高維幾何空間，透過向量距離衡量深層語義相似度。',
    category: 'infra',
    categoryLabel: '架構與資料檢索',
    tags: ['#向量比對', '#知識檢索', '#輕量化部署'],
    maturity: '實用工程級',
    yearIntroduced: '2013 (Word2Vec) / 2018 (BERT) / 現代稠密向量',
    iconName: 'Network',
    accentColor: 'cyan',
    corePrinciple: '向量嵌入將高維離散符號轉為稠密向量 (Dense Vector，如 1536 維)。在該幾何空間中，意義相近的概念在空間中距離極近（如「國王 - 男人 + 女人 ≈ 女王」）。利用餘弦相似度 (Cosine Similarity) 或內積計算，可突破傳統關鍵字匹配的字面限制，實現意圖理解與模糊語義檢索。',
    architectureSteps: [
      {
        step: 1,
        title: '文本輸入與編碼 (Bi-Encoder)',
        description: '將輸入句子傳入 BERT / RoBERTa 等雙向編碼器抽取語意表徵。'
      },
      {
        step: 2,
        title: '池化層降維壓縮 (Mean Pooling & Normalization)',
        description: '將所有 Token 的隱藏層狀態匯聚為單一固定長度的單位長度向量 (L2 Norm)。'
      },
      {
        step: 3,
        title: '向量空間相似度計算 (Cosine Metric)',
        description: '計算兩個向量夾角餘弦值：Similarity = (A · B) / (||A|| ||B||)。'
      }
    ],
    strengths: [
      '徹底解決同義詞、錯別字與不同表達方式的語義匹配難題',
      '計算速度極快，結合 HNSW 索引可實現毫秒級億級向量檢索',
      '可作為 RAG、推薦系統、聚類分析、異常檢測的底層基礎設施'
    ],
    limitations: [
      '對極其精確的專有名詞、型號代碼（如 "iPhone 15 Pro Max 256GB"）有時不如 BM25 關鍵字檢索精準',
      '向量維度過大時會佔用較多內存與存儲（需引入二值化或標量量化 PQ）'
    ],
    useCases: [
      {
        title: '跨語言智能語義搜尋',
        industry: '電商與媒體',
        scenario: '使用者輸入「適合夏天的輕薄透氣衣服」，精準召回未包含該字眼但符合語意的「亞麻短袖短褲」。'
      },
      {
        title: '個人化內容推薦系統',
        industry: '社群網路 / 串流影音',
        scenario: '計算使用者歷史觀看興趣向量與影片庫向量的相似度，推薦最符合口味的內容。'
      },
      {
        title: '重複工單與相似文檔自動歸類',
        industry: '客戶服務與維運',
        scenario: '自動比對新進客訴問題與歷史資料庫，快速聚合相同故障並自動關聯解決方案。'
      }
    ],
    representativeTools: [
      { name: 'text-embedding-3-large', type: '商業服務', description: 'OpenAI 旗艦嵌入模型，支援自定義輸出維度縮減 (Matryoshka)。' },
      { name: 'BGE-M3 (BAAI)', type: '開源模型', description: '強大的開源多語言多功能嵌入模型，同時支援稠密、稀疏與多向量檢索。' },
      { name: 'Voyage AI', type: '商業服務', description: '專注於程式碼與特定領域的高精度語意向量模型。' },
      { name: 'FAISS (Meta)', type: '開發框架', description: 'Facebook 開源的高性能稠密向量相似性搜尋與聚類函式庫。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '計算兩個句子的餘弦相似度',
      code: `import numpy as np

def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# 假定透過 embedding 函數獲取向量
vec_a = get_embedding("人工智慧在醫學影像上的應用")
vec_b = get_embedding("利用深度學習診斷 X 光肺部疾病")
vec_c = get_embedding("義大利麵的最佳烹飪水溫")

sim_ab = cosine_similarity(vec_a, vec_b) # 高度相似，~0.88
sim_ac = cosine_similarity(vec_a, vec_c) # 毫無關聯，~0.12

print(f"醫學主題語義相似度: {sim_ab:.2f}")
print(f"跨主題語義相似度: {sim_ac:.2f}")`,
      explanation: '透過幾何向量夾角計算，量化兩段文字在語意概念空間中的親疏遠近。'
    },
    comparisonMetrics: {
      computeCost: 1,
      latency: 1,
      customizationEase: 4,
      dataRequirement: 2,
      realTimeCapability: 5
    },
    interactiveDemo: {
      type: 'embedding',
      title: '2D 語意空間向量距離比對演示',
      description: '在 2D 投影座標系中即時查看不同詞彙的空間距離與相似度夾角。'
    }
  },
  {
    id: 'peft-lora',
    name: '參數高效微調與 LoRA',
    englishName: 'Parameter-Efficient Fine-Tuning (PEFT & LoRA / QLoRA)',
    shortDefinition: '凍結預訓練大模型主體權重，僅訓練極小比例（<1%）的低秩旁路矩陣，以消費級硬體極低成本達成專業領域客製化。',
    category: 'nlp',
    categoryLabel: '語言與推理',
    tags: ['#效能微調', '#輕量化部署', '#文字生成'],
    maturity: '實用工程級',
    yearIntroduced: '2021 (Hu et al. LoRA) / 2023 (QLoRA)',
    iconName: 'Layers',
    accentColor: 'teal',
    corePrinciple: '全量微調 (Full Fine-Tuning) 需要更新數百億參數與對應的優化器狀態 (AdamW)，顯存需求巨大。LoRA (Low-Rank Adaptation) 假設權重矩陣更新量的內在秩 (Intrinsic Rank) 很小。它將權重增量 ΔW 分解為兩個低秩矩陣的乘積 ΔW = B · A (其中 A∈R^{d×r}, B∈R^{r×k}, r ≪ d)。只訓練 A 和 B，大幅降低可訓練參數數量達 99% 以上。',
    architectureSteps: [
      {
        step: 1,
        title: '凍結基礎骨幹權重 (Freeze Base Model)',
        description: '將原始大模型的千億級權重標記為不可訓練 (requires_grad=False)。'
      },
      {
        step: 2,
        title: '插入低秩分解矩陣 (Inject LoRA Adapter)',
        description: '在自注意力層的 Q, K, V 投影矩陣旁平行掛載秩為 r (如 r=8 或 16) 的 A、B 小矩陣。'
      },
      {
        step: 3,
        title: '領域資料監督微調 (Training Adapter)',
        description: '僅對低秩矩陣進行梯度反向傳播更新，顯存需求由 8 張 A100 降至單張 RTX 4090。'
      },
      {
        step: 4,
        title: '零延遲權重合併 (Weight Merging)',
        description: '推理時直接將 W_new = W_base + B·A 融合成單一模型，完全不增加線上推理延遲。'
      }
    ],
    strengths: [
      '顯著降低 GPU 顯存與算力成本，訓練速度大幅提升',
      'Adapter 檔案體積極小 (數十 MB)，便於熱插拔部署與多租戶客製化',
      '推理時可將權重直接合併，保持原生模型的極速推理延遲'
    ],
    limitations: [
      '在需要極度重塑底層基礎世界知識的場景下，適配上限低於全量預訓練',
      '過度擬合 (Overfitting) 小樣本資料可能損害模型的通用指令遵循能力'
    ],
    useCases: [
      {
        title: '企業特有格式與風格微調',
        industry: '新聞媒體 / 行銷企劃',
        scenario: '訓練專屬品牌語調 (Brand Voice) 與特定排版規範的 LoRA 模組。'
      },
      {
        title: '專有代碼庫與 DSL 語法適配',
        industry: '金融核心系統 / 工控語言',
        scenario: '讓開源代碼模型精通 COBOL、Rust 或公司內部封裝 API 規範。'
      },
      {
        title: '特定風格圖像擴散模型客製化',
        industry: '視覺藝術與文創',
        scenario: '只需 10~20 張特定角色或水墨畫風圖片，快速訓練專屬繪畫風格 LoRA。'
      }
    ],
    representativeTools: [
      { name: 'Unsloth', type: '開發框架', description: '極致優化的 LLM/LoRA 訓練框架，速度提升 5 倍且顯存降低 80%。' },
      { name: 'Hugging Face PEFT', type: '開發框架', description: '業界標準的參數高效微調函式庫，支援 LoRA, QLoRA, Prefix Tuning。' },
      { name: 'Axolotl', type: '開發框架', description: '現代化 LLM 批量微調流水線工具，簡化配置與評測流程。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '使用 PEFT 庫為模型掛載 LoRA 轉接器',
      code: `from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

base_model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")

# 配置 LoRA 參數 (r 為秩，lora_alpha 為縮放係數)
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# 獲取僅包含 0.2% 可訓練參數的微調模型
peft_model = get_peft_model(base_model, lora_config)
peft_model.print_trainable_parameters()`,
      explanation: '透過簡單配置將原始數十億參數凍結，僅更新掛載的輕量矩陣層。'
    },
    comparisonMetrics: {
      computeCost: 2,
      latency: 1,
      customizationEase: 5,
      dataRequirement: 3,
      realTimeCapability: 4
    },
    interactiveDemo: {
      type: 'lora',
      title: 'LoRA 低秩分解矩陣原理模擬',
      description: '動態調整秩 (Rank) 參數，觀察參數量從千萬級銳減為千級的矩陣分解結構。'
    }
  },
  {
    id: 'vision-sam',
    name: '視覺 Transformer 與萬物分割大模型',
    englishName: 'Vision Transformers (ViT) & Segment Anything (SAM)',
    shortDefinition: '將影像切為 Patch 並引入注意力機制，以通用基礎模型實現像素級萬物分割、物體偵測與空間幾何理解。',
    category: 'vision',
    categoryLabel: '視覺與圖像',
    tags: ['#視覺理解', '#物體辨識', '#具身控制'],
    maturity: '實用工程級',
    yearIntroduced: '2020 (ViT) / 2023 (SAM) / 2024 (SAM 2)',
    iconName: 'ScanEye',
    accentColor: 'orange',
    corePrinciple: '傳統電腦視覺依賴卷積神經網絡 (CNN) 局部感受野。Vision Transformer (ViT) 將整張圖片切為 16x16 像素方塊 (Patches)，將其視為類似 Token 的序列進行全域自注意力計算。Meta 的 SAM (Segment Anything Model) 基於大模型預訓練理念，結合 Promptable 提示編碼器（點、框、文字），實現零樣本分割任何影像中任意物體邊界。',
    architectureSteps: [
      {
        step: 1,
        title: '圖像切片與特徵抽取 (Image Encoder)',
        description: '大型 ViT 骨幹網絡提取整張圖像的富語意高解析度特徵金字塔。'
      },
      {
        step: 2,
        title: '提示詞編碼 (Prompt Encoder)',
        description: '將使用者點擊座標、邊界框 (Bounding Box) 或自然語言轉化為嵌入向量。'
      },
      {
        step: 3,
        title: '輕量解碼與多掩膜生成 (Mask Decoder)',
        description: '在毫秒內交叉融合影像特徵與提示向量，輸出高精準度像素級二值掩膜 (Mask)。'
      }
    ],
    strengths: [
      '具備無與倫比的零樣本泛化能力，能分割訓練集中從未出現過的奇特物體',
      '支援點擊、框選、語意描述多種直覺引導方式，解碼速度達實時 60fps',
      'SAM 2 進一步擴展至連續視訊時序追蹤，徹底解決物體遮擋重識別難題'
    ],
    limitations: [
      'Image Encoder 運算量較大，在超邊緣嵌入式設備上需做模型剪枝 (MobileSAM)',
      '對於微米級半透明材質或極度密集重疊物體邊界仍有一定挑戰'
    ],
    useCases: [
      {
        title: '醫療影像精細病灶分割',
        industry: '醫療健康',
        scenario: '輔助放射科醫師自動圈出 MRI 或 CT 影像中的微小腫瘤與器官邊界。'
      },
      {
        title: '自動駕駛道路感知與語義地圖構建',
        industry: '智慧出行',
        scenario: '實時識別車道線、障礙物、行人邊界與施工錐桶像素級輪廓。'
      },
      {
        title: '智慧零售與無人結帳結算',
        industry: '智慧零售',
        scenario: '透過俯視鏡頭精準辨識購物籃內重疊擺放的各式商品輪廓並自動計價。'
      }
    ],
    representativeTools: [
      { name: 'SAM 2 (Segment Anything 2)', type: '開源模型', description: 'Meta 開源的即時圖像與視訊通用分割大模型。' },
      { name: 'YOLOv11', type: '開源模型', description: 'Ultralytics 最新即時物體檢測、實例分割與姿態估計模型。' },
      { name: 'Grounding DINO', type: '開源模型', description: '開放詞彙目標檢測模型，根據任意自然語言文字檢索圖像中的物體位置。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '使用 SAM 進行點擊提示分割',
      code: `from segment_anything import sam_model_registry, SamPredictor
import numpy as np

# 加載 SAM 模型與圖像預測器
sam = sam_model_registry["vit_h"](checkpoint="sam_vit_h_4b8939.pth")
predictor = SamPredictor(sam)

predictor.set_image(image_rgb)

# 給定點擊座標 (X=500, Y=375)
input_point = np.array([[500, 375]])
input_label = np.array([1]) # 1 表示正樣本點

# 毫秒級預測像素掩膜
masks, scores, logits = predictor.predict(
    point_coords=input_point,
    point_labels=input_label,
    multimask_output=True
)`,
      explanation: '傳入點擊座標，SAM 的輕量解碼器在數毫秒內即時返回多層精準分割輪廓。'
    },
    comparisonMetrics: {
      computeCost: 3,
      latency: 2,
      customizationEase: 4,
      dataRequirement: 4,
      realTimeCapability: 4
    },
    interactiveDemo: {
      type: 'multimodal',
      title: '視覺分割與目標邊界偵測模擬',
      description: '模擬點擊物體進行像素級 Mask 高亮提取的互動過程。'
    }
  },
  {
    id: 'speech-ai',
    name: '神經語音合成與語音識別',
    englishName: 'Speech AI (Neural TTS & Whisper ASR)',
    shortDefinition: '結合自監督語音表徵、神經聲碼器與多語言序列轉錄，實現人類級別的精準語音轉文字與超逼真語音複製。',
    category: 'audio',
    categoryLabel: '語音與音訊',
    tags: ['#語音處理', '#多模態全能', '#文字生成'],
    maturity: '實用工程級',
    yearIntroduced: '2022 (Whisper) / 2023 (ElevenLabs) / 2024 端到端實時語音',
    iconName: 'Mic',
    accentColor: 'pink',
    corePrinciple: '現代語音識別 (ASR) 以 OpenAI Whisper 為代表，使用弱監督訓練於 68 萬小時多語音資料集，將梅爾頻譜圖 (Log-Mel Spectrogram) 透過 Encoder-Decoder 架構直接轉錄為多語言文字。神經語音合成 (TTS) 與語音複製（如 VALL-E、ElevenLabs）將音訊量化為神經編解碼 Token (Neural Audio Codec)，只需數秒音訊即可精確還原音色、情感與說話節奏。',
    architectureSteps: [
      {
        step: 1,
        title: '聲學特徵提取 (Mel-Spectrogram)',
        description: '將連續音訊波形透過短時傅立葉變換 (STFT) 轉為 80 或 128 通道梅爾頻譜。'
      },
      {
        step: 2,
        title: '神經聲學模型預測 (Acoustic Modeling)',
        description: '利用 Transformer 或擴散架構建立文字與聲學特徵的非線性對齊。'
      },
      {
        step: 3,
        title: '神經聲碼器波形還原 (Neural Vocoder)',
        description: '使用 HiFi-GAN 或 SoundStream 將聲學特徵合成回 44.1kHz 高保真真實音訊波形。'
      }
    ],
    strengths: [
      '對背景雜音、方言口音與混雜語言具備極強的魯棒性',
      '只需 3 秒樣本文檔即可完成零樣本聲音克隆 (Voice Cloning)',
      '結合端到端架構可達到 150ms 以內的真人對話反應速度'
    ],
    limitations: [
      '長錄音即時轉錄在網絡波動環境下需高效分塊傳輸',
      '語音克隆技術存在潛在深偽 (Deepfake) 欺詐風險，需強化聲紋防偽浮水印'
    ],
    useCases: [
      {
        title: '多國語言國際會議即時字幕與同聲傳譯',
        industry: '跨國協作與展會',
        scenario: '實時轉錄講者多語系發言，同步翻譯並以克隆之原講者音色播放目標語言。'
      },
      {
        title: '有聲書與虛擬主播配音全自動化',
        industry: '出版與數位傳媒',
        scenario: '將百萬字小說自動賦予多角色情感聲線，生成具備呼吸節奏的高品質廣播劇。'
      },
      {
        title: '車載語音助理無障礙互動',
        industry: '智慧座艙',
        scenario: '在高速行駛噪音下精準辨識駕駛複雜指令，提供自然流暢的語音反饋。'
      }
    ],
    representativeTools: [
      { name: 'OpenAI Whisper', type: '開源模型', description: '開源多語言語音轉文字標竿，準確率極高。' },
      { name: 'ElevenLabs', type: '商業服務', description: '業界頂尖擬真 TTS 與情緒化聲音複製平台。' },
      { name: 'CosyVoice / ChatTTS', type: '開源模型', description: '支援自然笑聲、嘆氣與中英文口語化的開源對話語音合成模型。' }
    ],
    codeSnippet: {
      language: 'python',
      title: '使用 Faster-Whisper 極速轉錄音訊檔案',
      code: `from faster_whisper import WhisperModel

# 使用 CTranslate2 加速的 Whisper 模型
model = WhisperModel("large-v3", device="cuda", compute_type="float16")

# 轉錄音訊並自動偵測語言與時間戳
segments, info = model.transcribe("meeting_recording.mp3", beam_size=5)

print(f"偵測到語言: {info.language} (信心度: {info.language_probability:.2f})")

for segment in segments:
    print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")`,
      explanation: '幾行代碼即可完成音訊的時間戳精確切分、語言識別與轉錄。'
    },
    comparisonMetrics: {
      computeCost: 2,
      latency: 2,
      customizationEase: 4,
      dataRequirement: 4,
      realTimeCapability: 5
    }
  },
  {
    id: 'embodied-ai',
    name: '具身智慧與世界模型',
    englishName: 'Embodied AI & World Models',
    shortDefinition: '將多模態大腦接入物理實體機器人與空間環境，學習空間幾何、物理交互預測與端到端動作控制。',
    category: 'robotics',
    categoryLabel: '具身智慧與機器人',
    tags: ['#具身控制', '#視覺理解', '#工具調用', '#複雜推理'],
    maturity: '前沿探索級',
    yearIntroduced: '2023 (RT-2, PaLM-E) / 2024~2025 人形機器人爆發',
    iconName: 'Boxes',
    accentColor: 'emerald',
    corePrinciple: '具身智慧 (Embodied AI) 將 Vision-Language-Action (VLA) 模型與機器人硬體結合。模型接收攝影機視覺流與關節本體感受 (Proprioception)，在內部預測環境未來的動態物理演變（世界模型 World Model），並直接輸出機器人關節的 6-DoF 軌跡與末端夾爪控制動作 (End-effector Actions)。',
    architectureSteps: [
      {
        step: 1,
        title: '空間感知與深度預估 (Spatial RGB-D Perception)',
        description: '雙目相機與光達獲取 3D 點雲與幾何姿態，建構環境空間世界座標系。'
      },
      {
        step: 2,
        title: 'VLA 大模型動作決策 (Vision-Language-Action Policy)',
        description: '將「把桌面紅色蘋果放入右側籃子」等高階自然語言指令轉化為連續動作軌跡。'
      },
      {
        step: 3,
        title: '力反饋低延遲伺服控制 (Closed-loop Impedance Control)',
        description: '以 100Hz~500Hz 實時頻率調整電機力矩，柔順適應物體碰撞與防滑抓取。'
      }
    ],
    strengths: [
      '打破傳統工業機器人需硬編碼軌跡的限制，具備強大通用泛化操作能力',
      '能理解模糊的自然語言人類意圖，自適應未知環境與隨機擺放物體',
      '推進人形機器人進入製造工廠、物流分揀與家庭養老照護場景'
    ],
    limitations: [
      '真實物理世界採樣資料成本高昂（仰賴 Isaac Sim 等模擬器虛擬遷移 Sim-to-Real）',
      '硬體關節耐久度與動力電池續航仍是量產關鍵瓶頸'
    ],
    useCases: [
      {
        title: '智慧倉儲物流自主拆垛與異形件分揀',
        industry: '智慧物流',
        scenario: '自適應識別任意尺寸破損紙箱，自主規劃最穩固吸附與搬運姿態。'
      },
      {
        title: '汽車智慧製造精密裝配',
        industry: '先進製造',
        scenario: '利用高精度力控與雙臂協同，完成車門線束插接與螺栓緊固作業。'
      },
      {
        title: '家庭環境多功能服務機器人',
        industry: '養老與家政服務',
        scenario: '摺疊衣物、清理桌面餐具、安全遞送藥物給行動不便的長者。'
      }
    ],
    representativeTools: [
      { name: 'OpenVLA', type: '開源模型', description: '7B 參數的開源視覺-語言-動作基礎模型，支援多種機械手臂開箱即用。' },
      { name: 'NVIDIA Isaac Sim / GR00T', type: '基礎設施', description: '專為通用人形機器人訓練打造的物理仿真平台與基礎模型。' },
      { name: 'Google RT-2 / Gemini Robotics', type: '商業服務', description: 'Google DeepMind 領先的機器人端到端具身操作大腦。' }
    ],
    codeSnippet: {
      language: 'python',
      title: 'VLA 模型推理並輸出機器人控制動作向量',
      code: `# 輸入當前相機畫面與操作任務描述
observation = {"image": camera_frame, "instruction": "pick up the yellow block"}

# VLA 模型輸出 7 維動作向量 [x, y, z, roll, pitch, yaw, gripper_state]
action = vla_model.predict_action(observation)

print(f"末端位移指令: {action[:3]}, 夾爪開合狀態: {action[6]}")
robot_controller.execute_action(action)`,
      explanation: '模型將高維視覺像素直接映射至物理機械關節的空間動作指令。'
    },
    comparisonMetrics: {
      computeCost: 5,
      latency: 3,
      customizationEase: 1,
      dataRequirement: 5,
      realTimeCapability: 5
    }
  },
  {
    id: 'ai-code',
    name: '程式碼智慧與軟體工程 Agent',
    englishName: 'AI Code Assistants & SWE Agents',
    shortDefinition: '結合抽象語法樹 (AST)、跨檔案倉庫上下文感知與終端執行環境，實現全端代碼重構、單元測試自動化與 Issue 自動修復。',
    category: 'agent',
    categoryLabel: '智慧體與工作流',
    tags: ['#程式開發', '#工作流自動化', '#文字生成', '#複雜推理'],
    maturity: '實用工程級',
    yearIntroduced: '2021 (Copilot) / 2024 (Cursor, Devin, SWE-bench)',
    iconName: 'Code2',
    accentColor: 'indigo',
    corePrinciple: '現代代碼 AI 已經從單行補全演進為 Repository-Level SWE Agents。利用 Tree-sitter 等工具建立專案全域符號表 (Symbol Graph)，配合 RAG 檢索相關依賴定義。Agent 能自主在沙箱終端執行編譯器、運行 linter 與單元測試，並根據錯誤日誌自我修正代碼直至測試全數通過。',
    architectureSteps: [
      {
        step: 1,
        title: '代碼庫語法樹解析 (Repo Indexing & AST)',
        description: '解析整個專案目錄結構、函數呼叫關係與型別定義。'
      },
      {
        step: 2,
        title: '意圖理解與修改計畫 (Spec & Edit Planning)',
        description: '將需求拆解為多檔案修改策略，確保不破壞既有架構設計。'
      },
      {
        step: 3,
        title: '沙箱編譯與迴歸驗證 (Execution & Test Loop)',
        description: '在隔離容器內自動執行 npm test / pytest，自我修復 SyntaxError 或邏輯斷言。'
      }
    ],
    strengths: [
      '極大提升開發者生產力（日常樣板代碼、單元測試編寫效率提升 50%+）',
      '具備跨檔案全局重構與老舊代碼庫現代化遷移能力',
      '大幅降低非專業程式設計師構建客製化工具的門檻'
    ],
    limitations: [
      '在超大型百萬行遺留系統中，若架構文檔不足可能產生隱蔽的副作用 Bug',
      '需要嚴格的代碼審查機制 (Code Review) 避免引入安全漏洞'
    ],
    useCases: [
      {
        title: '全專案代碼遷移與框架升級',
        industry: '互聯網與軟體架構',
        scenario: '將整套舊版 JavaScript/Vue2 專案自動重構為嚴格型別的 TypeScript/Vue3 現代架構。'
      },
      {
        title: '全自動單元測試覆蓋率補齊',
        industry: '金融核心軟體',
        scenario: '自動掃描所有無測試函數，邊界條件全面覆蓋並自動修正 Mock 資料。'
      },
      {
        title: '即時除錯與效能瓶頸診斷',
        industry: '雲原生與後端維運',
        scenario: '分析慢查詢 SQL 或內存洩漏 Heap Dump，精準定位造成阻塞的代碼行。'
      }
    ],
    representativeTools: [
      { name: 'Cursor', type: '開發框架', description: '深度整合 AI 的新一代 IDE，支援全專案索引與多檔案即時編輯。' },
      { name: 'GitHub Copilot', type: '商業服務', description: '微軟與 OpenAI 合作的先驅代碼助手，企業採納率第一。' },
      { name: 'Claude Code', type: '商業服務', description: 'Anthropic 推出的終端原生研發 Agent，可直接在終端機內閱讀倉庫、修改檔案並執行測試。' },
      { name: 'Aider', type: '開源模型', description: '熱門的開源終端代碼結對程式設計 Agent，支援 Git 自動提交。' }
    ],
    codeSnippet: {
      language: 'typescript',
      title: '典型的 Code Agent 工具循環邏輯',
      code: `async function runCodeFixer(issueDescription: string) {
  // 1. 檢索相關檔案上下文
  const relevantFiles = await codeGraph.searchSymbols(issueDescription);
  
  // 2. 生成修復補丁 (Unified Diff)
  const patch = await llm.generatePatch({ files: relevantFiles, issue: issueDescription });
  
  // 3. 應用補丁並執行單元測試驗證
  await git.applyPatch(patch);
  const testResult = await sandbox.exec("npm run test");
  
  if (testResult.failed) {
    // 自我修復循環
    return runSelfCorrection(testResult.stderr);
  }
  return { status: "success", patch };
}`,
      explanation: '展示 Code Agent 透過「符號搜尋 -> 補丁生成 -> 沙箱測試 -> 自我修正」的完整閉環。'
    },
    comparisonMetrics: {
      computeCost: 3,
      latency: 3,
      customizationEase: 4,
      dataRequirement: 4,
      realTimeCapability: 4
    }
  }
];
