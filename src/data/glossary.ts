import { GlossaryTerm } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'transformer',
    term: 'Transformer 架構',
    englishTerm: 'Transformer Architecture',
    category: '核心架構',
    definition: '由 Vaswani 等人於 2017 年提出的神經網絡架構，拋棄了傳統循環 (RNN) 與卷積 (CNN)，完全依賴自注意力機制平行處理整個序列，成為當代所有大語言模型與多模態模型的基石。',
    formulaOrIntuition: 'Attention(Q, K, V) = softmax(QK^T / √d_k) V',
    relatedTechIds: ['llm', 'multimodal', 'diffusion', 'vision-sam']
  },
  {
    id: 'self-attention',
    term: '自注意力機制',
    englishTerm: 'Self-Attention Mechanism',
    category: '核心演算法',
    definition: '讓模型在處理輸入序列中的某個詞時，能動態計算並分配注意力給序列中所有其他相關詞元，完美解決長距離依賴與語意消歧問題。',
    formulaOrIntuition: '計算 Query 與所有 Key 的點積相似度，作為權重加權求和 Value。',
    relatedTechIds: ['llm', 'multimodal', 'vision-sam']
  },
  {
    id: 'token',
    term: '詞元 (Token)',
    englishTerm: 'Token',
    category: '資料表示',
    definition: '大模型處理文字的基本語義單元。一個 Token 通常對應約 0.75 個英文單詞或半個繁體中文字符。大模型的計費與上下文長度皆以 Token 為計量單位。',
    formulaOrIntuition: '1000 Tokens ≈ 750 個英文單字 ≈ 500~700 個中文字',
    relatedTechIds: ['llm', 'reasoning-cot', 'peft-lora']
  },
  {
    id: 'context-window',
    term: '上下文窗口',
    englishTerm: 'Context Window',
    category: '模型容量',
    definition: '模型單次前向推理所能同時接收並保留記憶的最大 Token 數量。現代前沿模型已從 4K、8K 擴展至 128K、1M 甚至 2M+ Tokens（相當於數本百萬字長篇小說）。',
    formulaOrIntuition: '百萬級上下文允許直接將整個軟體倉庫或數小時音影片一次性餵給模型。',
    relatedTechIds: ['llm', 'multimodal', 'rag', 'ai-code']
  },
  {
    id: 'hallucination',
    term: 'AI 幻覺',
    englishTerm: 'Hallucination',
    category: '模型特性',
    definition: '大模型在生成回答時，以非常自信且語法流暢的口吻輸出看似合理卻完全虛構或事實錯誤的資訊。常透過 RAG 檢索增強、思維鏈自我驗證或 RL 對齊予以抑制。',
    formulaOrIntuition: '原因源於模型追求預測「最平滑機率分佈」而非「客觀事實庫」。',
    relatedTechIds: ['llm', 'rag', 'reasoning-cot']
  },
  {
    id: 'temperature',
    term: '溫度係數 (Temperature)',
    englishTerm: 'Sampling Temperature',
    category: '推理參數',
    definition: '控制大模型生成隨機性與創造力的超參數。值越低（如 0.0~0.2），輸出越確定保守；值越高（如 0.8~1.2），輸出越豐富多樣但可能增加離題風險。',
    formulaOrIntuition: 'P(w_i) = exp(z_i / T) / ∑ exp(z_j / T)，T 趨近 0 時退化為貪婪搜尋 (Argmax)。',
    relatedTechIds: ['llm', 'diffusion', 'ai-agents']
  },
  {
    id: 'quantization',
    term: '模型量化',
    englishTerm: 'Model Quantization (FP16/INT8/INT4)',
    category: '工程最佳化',
    definition: '將模型權重與激活值從高精度浮點數（如 32-bit 或 16-bit）壓縮為低精度定點數（如 8-bit 或 4-bit），在幾乎不損失準確率的前提下，大幅削減 50%~75% 顯存佔用並加速推理。',
    formulaOrIntuition: '如 AWQ、GPTQ、GGUF，使 70B 模型可在消費級單卡運行。',
    relatedTechIds: ['peft-lora', 'llm', 'infra']
  },
  {
    id: 'rlhf',
    term: '人類反饋強化學習',
    englishTerm: 'RLHF / DPO (Alignment)',
    category: '模型訓練',
    definition: '透過獎勵模型 (Reward Model) 或直接偏好優化 (DPO)，將大模型的輸出對齊人類價值觀，使其具備有用性 (Helpful)、真實性 (Honest) 與無害性 (Harmless)。',
    formulaOrIntuition: '透過 PPO / DPO 損失函數引導策略模型往人類偏好的回答分佈優化。',
    relatedTechIds: ['llm', 'reasoning-cot']
  }
];
