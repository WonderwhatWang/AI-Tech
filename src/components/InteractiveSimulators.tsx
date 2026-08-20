import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Sliders, 
  Layers, 
  Cpu, 
  Bot, 
  Database, 
  Check, 
  Eye
} from 'lucide-react';

// 1. RAG Simulator
export function RAGSimulator() {
  const [query, setQuery] = useState('請問退換貨政策是幾天內？商品包裝損毀能退嗎？');
  const [step, setStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleChunks = [
    { id: 1, text: '【條款 3.1】本平台提供消費者自收到商品起 7 天鑑賞期內無條件申請退貨服務。', score: 0.94, matched: true },
    { id: 2, text: '【條款 3.4】退回商品需保持全新狀態且包裝完整，若原廠包裝損毀將酌收 15% 整新費用。', score: 0.89, matched: true },
    { id: 3, text: '【條款 1.2】會員積分每累積 100 點可折抵新台幣 10 元，折抵上限為訂單金額 30%。', score: 0.21, matched: false },
    { id: 4, text: '【條款 5.0】海外配送約需 5-10 個工作天，關稅由收件方自行依當地法規負擔。', score: 0.12, matched: false },
  ];

  const handleRun = () => {
    setIsProcessing(true);
    setStep(1);
    setTimeout(() => setStep(2), 700);
    setTimeout(() => setStep(3), 1400);
    setTimeout(() => {
      setStep(4);
      setIsProcessing(false);
    }, 2100);
  };

  const handleReset = () => {
    setStep(0);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-500" />
          RAG 兩階段檢索增強動態流程
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isProcessing}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            {step === 0 ? '執行檢索模擬' : '重新執行'}
          </button>
          {step > 0 && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              title="重置"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Input query */}
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
          使用者查詢提問 (User Query)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Pipeline steps */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2">
        <div className={`p-2.5 rounded-lg border transition-all ${
          step >= 1 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
            <span>1. 向量化查詢</span>
            {step >= 1 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {step >= 1 ? '計算 Query 1536維稠密向量' : '待觸發...'}
          </p>
        </div>

        <div className={`p-2.5 rounded-lg border transition-all ${
          step >= 2 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
            <span>2. 向量庫 Top-K 檢索</span>
            {step >= 2 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {step >= 2 ? '餘弦相似度比對 2 個命中區塊' : '待觸發...'}
          </p>
        </div>

        <div className={`p-2.5 rounded-lg border transition-all ${
          step >= 3 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
            <span>3. 增強 Prompt 組裝</span>
            {step >= 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {step >= 3 ? '注入 Context + 來源引用' : '待觸發...'}
          </p>
        </div>

        <div className={`p-2.5 rounded-lg border transition-all ${
          step >= 4 ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
            <span>4. LLM 事實生成</span>
            {step >= 4 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {step >= 4 ? '基於事實輸出精準回答' : '待觸發...'}
          </p>
        </div>
      </div>

      {/* Vector Match visualization */}
      {step >= 2 && (
        <div className="space-y-2 pt-2">
          <div className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>向量資料庫 Chunking 匹配相似度 (Cosine Similarity)：</span>
            <span className="text-[11px] text-slate-500">門檻值: &gt; 0.80 採納</span>
          </div>
          <div className="space-y-1.5">
            {sampleChunks.map((chunk) => (
              <div 
                key={chunk.id} 
                className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-3 ${
                  chunk.matched 
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/30' 
                    : 'border-slate-200 dark:border-slate-800 opacity-50 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex-1 truncate text-slate-800 dark:text-slate-200">
                  {chunk.text}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${chunk.matched ? 'bg-emerald-500' : 'bg-slate-400'}`}
                      style={{ width: `${chunk.score * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    {(chunk.score * 100).toFixed(0)}%
                  </span>
                  {chunk.matched && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px]">
                      已召回
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Generated Answer */}
      {step >= 4 && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5 animate-fadeIn">
          <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            最終增強生成回答 (Grounded Response)：
          </div>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
            根據服務條款，您可以在收到商品的 <strong>7 天鑑賞期內</strong> 申請無條件退貨 <em>[條款 3.1]</em>。若商品原廠包裝已損毀，仍可辦理退貨，但需扣除 <strong>15% 的整新費用</strong> <em>[條款 3.4]</em>。
          </p>
        </div>
      )}
    </div>
  );
}

// 2. Agent ReAct Simulator
export function AgentSimulator() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const steps = [
    {
      type: 'thought',
      badge: '思考 (Thought 1)',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
      title: '任務意圖解析',
      content: '使用者要求「查詢台北市大安區今日降雨機率，並判斷下午三點室外活動是否需帶傘」。我需要調用即時氣象 API 獲取小時級預報。'
    },
    {
      type: 'action',
      badge: '行動 (Action 1)',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
      title: '調用外部工具: weather_api',
      content: '調用參數: { location: "Taipei, Da\'an", date: "today", include_hourly: true }'
    },
    {
      type: 'observation',
      badge: '觀察 (Observation 1)',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300',
      title: '工具回傳資料',
      content: 'API 返回: 台北大安區 15:00~18:00 氣溫 28°C，午後對流雷雨機率 85%，降雨量預估 15mm。'
    },
    {
      type: 'thought',
      badge: '思考 (Thought 2)',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
      title: '反思與結論驗證',
      content: '降雨機率高達 85% 且伴隨雷雨，資訊已充分滿足使用者需求，無需調用其他工具，可以開始輸出最終決策建議。'
    },
    {
      type: 'final',
      badge: '最終輸出 (Final Answer)',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
      title: '完成任務並回應用戶',
      content: '今日下午 3 點台北大安區有 85% 高機率發生午後雷陣雨，強烈建議您攜帶雨具或雨衣出門，並注意瞬間較大雨勢。'
    }
  ];

  useEffect(() => {
    let timer: any;
    if (autoPlay && currentStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 1000);
    } else if (currentStepIndex === steps.length - 1) {
      setAutoPlay(false);
    }
    return () => clearTimeout(timer);
  }, [autoPlay, currentStepIndex, steps.length]);

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Bot className="w-4 h-4 text-blue-500" />
          ReAct (Reason + Act) 自主循環演算法
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentStepIndex >= steps.length - 1) {
                setCurrentStepIndex(0);
              }
              setAutoPlay(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            自動逐步演練
          </button>
          <button
            onClick={() => {
              setCurrentStepIndex(0);
              setAutoPlay(false);
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Steps track */}
      <div className="space-y-2">
        {steps.slice(0, currentStepIndex + 1).map((s, idx) => (
          <div 
            key={idx} 
            className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-xs space-y-1 animate-fadeIn"
          >
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded font-mono font-medium text-[11px] ${s.badgeColor}`}>
                {s.badge}
              </span>
              <span className="text-slate-500 text-[11px]">步驟 {idx + 1} / {steps.length}</span>
            </div>
            <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
              {s.title}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-2 rounded border border-slate-100 dark:border-slate-800/50">
              {s.content}
            </p>
          </div>
        ))}
      </div>

      {currentStepIndex < steps.length - 1 && (
        <button
          onClick={() => setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1))}
          className="w-full py-2 rounded-lg border border-dashed border-blue-400 dark:border-blue-700 text-blue-600 dark:text-blue-400 text-xs font-medium hover:bg-blue-50/50 dark:hover:bg-blue-950/20 flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>手動前進下一步</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// 3. Diffusion Denoising Visualizer
export function DiffusionSimulator() {
  const [step, setStep] = useState(30); // 0 to 50

  const noisePercentage = Math.max(0, 100 - (step / 50) * 100);
  const clarityPercentage = Math.min(100, (step / 50) * 100);

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-purple-500" />
          反向去噪採樣步進控制 (Sampling Steps: {step} / 50)
        </span>
        <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-medium">
          清晰度: {clarityPercentage.toFixed(0)}%
        </span>
      </div>

      {/* Visual Canvas Simulation */}
      <div className="relative h-44 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-950 flex items-center justify-center">
        {/* Simulated rendered scene */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-300"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 40%, rgba(168, 85, 247, 0.4), rgba(59, 130, 246, 0.2)), linear-gradient(to bottom, #0f172a, #020617)`,
            filter: `blur(${Math.max(0, (noisePercentage / 100) * 20)}px) contrast(${100 + clarityPercentage * 0.5}%)`,
            opacity: Math.max(0.1, clarityPercentage / 100)
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div 
              className="w-20 h-20 rounded-full border border-purple-400/40 bg-gradient-to-tr from-purple-500/30 to-cyan-400/30 flex items-center justify-center backdrop-blur-xs transition-transform duration-300"
              style={{ transform: `scale(${0.5 + (clarityPercentage / 100) * 0.5})` }}
            >
              <Sparkles className="w-8 h-8 text-purple-200 animate-pulse" />
            </div>
            <div 
              className="mt-3 text-xs font-mono text-purple-200 font-semibold transition-opacity duration-300"
              style={{ opacity: clarityPercentage > 40 ? 1 : 0 }}
            >
              Cybernetic Cityscape - Latent Latent Rescaled
            </div>
          </div>
        </div>

        {/* Noise overlay simulating Gaussian noise tensor */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-90 transition-opacity duration-200"
          style={{
            opacity: noisePercentage / 100,
            backgroundImage: `radial-gradient(#a855f7 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: `${Math.max(2, 8 - (step / 50) * 6)}px ${Math.max(2, 8 - (step / 50) * 6)}px`,
            backgroundPosition: '0 0, 4px 4px'
          }}
        />

        {/* Status indicator on top */}
        <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[11px] font-mono text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          {step === 0 && 'Step 0: 純隨機高斯白噪聲'}
          {step > 0 && step < 20 && `Step ${step}: 幾何拓撲與主體輪廓初現`}
          {step >= 20 && step < 45 && `Step ${step}: 邊緣銳化與細緻光影構建`}
          {step >= 45 && `Step ${step}: 高清細節還原完成 (VAE Decoded)`}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>t=T (純噪聲)</span>
          <span>t=T/2 (中繼去噪)</span>
          <span>t=0 (高清生成)</span>
        </div>
        <input
          type="range"
          min="0"
          max="50"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
      </div>

      <div className="text-xs text-slate-600 dark:text-slate-400 bg-purple-500/5 p-2.5 rounded-lg border border-purple-500/20">
        💡 <strong>原理解析：</strong> 擴散模型透過 U-Net 或 DiT 預測每一步的噪聲殘差 $\epsilon_\theta(x_t, t)$。隨著採樣步數增加，模型逐步剔除隨機性，保留符合文字提示詞條件分佈的結構特徵。
      </div>
    </div>
  );
}

// 4. LoRA Adapter Simulator
export function LoRASimulator() {
  const [rank, setRank] = useState(8); // 2, 4, 8, 16, 32, 64
  const baseDim = 4096;

  const baseParams = baseDim * baseDim; // 16,777,216
  const loraParams = (baseDim * rank) + (rank * baseDim); // 2 * baseDim * rank
  const paramReduction = (1 - (loraParams / baseParams)) * 100;
  const vramSavings = (1 - (loraParams / baseParams)) * 80;

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-500" />
          LoRA 低秩分解矩陣動態參數縮放 (Rank = {rank})
        </span>
      </div>

      {/* Math Decomposition Diagram */}
      <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-mono text-center">
          <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500">主體凍結矩陣 W</div>
            <div className="font-bold text-slate-800 dark:text-slate-200">{baseDim} × {baseDim}</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400">16.78M 參數 (凍結)</div>
          </div>

          <span className="font-bold text-slate-400">+</span>

          <div className="flex items-center gap-1.5">
            <div className="p-2.5 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800">
              <div className="text-[11px] text-teal-600 dark:text-teal-400">低秩矩陣 B</div>
              <div className="font-bold text-teal-700 dark:text-teal-300">{baseDim} × {rank}</div>
              <div className="text-[10px] text-teal-600">{(baseDim * rank / 1000).toFixed(1)}k</div>
            </div>

            <span className="font-bold text-slate-400">×</span>

            <div className="p-2.5 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800">
              <div className="text-[11px] text-teal-600 dark:text-teal-400">低秩矩陣 A</div>
              <div className="font-bold text-teal-700 dark:text-teal-300">{rank} × {baseDim}</div>
              <div className="text-[10px] text-teal-600">{(rank * baseDim / 1000).toFixed(1)}k</div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/50">
            <div className="text-[11px] text-slate-500">可訓練參數量</div>
            <div className="font-bold text-slate-800 dark:text-slate-100 font-mono">
              {(loraParams / 1000).toFixed(1)} k 參數
            </div>
          </div>
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-900/50">
            <div className="text-[11px] text-slate-500">參數量縮減幅度</div>
            <div className="font-bold text-teal-600 dark:text-teal-400 font-mono">
              {paramReduction.toFixed(2)}%
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 p-2 rounded bg-slate-50 dark:bg-slate-900/50">
            <div className="text-[11px] text-slate-500">顯存佔用預估</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              ~6.2 GB (單卡可跑)
            </div>
          </div>
        </div>
      </div>

      {/* Slider for Rank */}
      <div>
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
          <span>選擇低秩維度 (Rank r)</span>
          <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">r = {rank}</span>
        </div>
        <div className="flex gap-2">
          {[2, 4, 8, 16, 32, 64].map((r) => (
            <button
              key={r}
              onClick={() => setRank(r)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                rank === r 
                  ? 'bg-teal-600 text-white shadow-xs' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. 2D Embedding Space Simulator
export function EmbeddingSimulator() {
  const [selectedWord, setSelectedWord] = useState<string>('人工智慧');

  const words = [
    { name: '人工智慧', x: 220, y: 120, category: 'AI' },
    { name: '機器學習', x: 200, y: 140, category: 'AI' },
    { name: '深度神經網絡', x: 240, y: 160, category: 'AI' },
    { name: '大語言模型', x: 260, y: 110, category: 'AI' },
    { name: '東京拉麵', x: 70, y: 220, category: 'Food' },
    { name: '義大利肉醬麵', x: 90, y: 240, category: 'Food' },
    { name: '法式烤布蕾', x: 110, y: 210, category: 'Food' },
    { name: '網球拍', x: 300, y: 260, category: 'Sports' },
    { name: '羽球運動', x: 320, y: 240, category: 'Sports' },
  ];

  const current = words.find((w) => w.name === selectedWord) || words[0];

  const calculateDistance = (w1: typeof words[0], w2: typeof words[0]) => {
    const dx = w1.x - w2.x;
    const dy = w1.y - w2.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Convert Euclidean to synthetic cosine score 0.0 ~ 1.0
    const sim = Math.max(0.05, (1 - dist / 300)).toFixed(2);
    return Number(sim);
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-500" />
          2D 語意幾何嵌入空間 (Semantic Clustering)
        </span>
        <span className="text-xs text-slate-500">點擊點查看相似度</span>
      </div>

      {/* 2D Space Visualizer */}
      <div className="relative h-64 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />

        {/* Render vectors */}
        {words.map((w) => {
          const isSelected = w.name === selectedWord;
          const sim = calculateDistance(current, w);
          return (
            <div
              key={w.name}
              onClick={() => setSelectedWord(w.name)}
              className="absolute cursor-pointer transition-transform hover:scale-110 -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${w.x}px`, top: `${w.y}px` }}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shadow-lg transition-all ${
                isSelected 
                  ? 'bg-cyan-400 ring-4 ring-cyan-500/40 animate-pulse' 
                  : w.category === 'AI' 
                    ? 'bg-indigo-500' 
                    : w.category === 'Food' 
                      ? 'bg-amber-500' 
                      : 'bg-emerald-500'
              }`}>
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
              </div>
              <div className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-medium backdrop-blur-md ${
                isSelected 
                  ? 'bg-cyan-500 text-slate-950 font-bold' 
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700'
              }`}>
                {w.name}
              </div>
            </div>
          );
        })}

        {/* Selected target info overlay */}
        <div className="absolute top-2 left-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          目標錨點: <span className="text-cyan-400 font-bold">{current.name}</span>
        </div>
      </div>

      {/* Similarity Table */}
      <div className="space-y-1.5">
        <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
          與「{current.name}」的語義餘弦相似度 (Cosine Proximity)：
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {words.filter(w => w.name !== current.name).map((w) => {
            const sim = calculateDistance(current, w);
            const isHigh = sim >= 0.7;
            return (
              <div 
                key={w.name} 
                className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                  isHigh 
                    ? 'border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-950/20' 
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <span className="text-slate-800 dark:text-slate-200 truncate">{w.name}</span>
                <span className={`font-mono text-[11px] font-bold ${
                  isHigh ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'
                }`}>
                  {sim.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Master Interactive Simulator Dispatcher
export function InteractiveSimulator({ type }: { type: string }) {
  switch (type) {
    case 'rag':
      return <RAGSimulator />;
    case 'agent':
      return <AgentSimulator />;
    case 'diffusion':
      return <DiffusionSimulator />;
    case 'lora':
      return <LoRASimulator />;
    case 'embedding':
      return <EmbeddingSimulator />;
    case 'cot':
      return <AgentSimulator />;
    case 'multimodal':
      return <DiffusionSimulator />;
    default:
      return <RAGSimulator />;
  }
}
