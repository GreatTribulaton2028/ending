/**
 * TRIBULATION SYSTEM CORE (progression.js)
 * 用於 index.html, monitor.html, timeline.html 的統一狀態管理
 */

const TRIB_SYSTEM = {
    // 狀態存儲鍵值
    STORAGE_KEY: 'tribulation_progress',
    
    // 定義等級 (0-5)
    LEVELS: {
        0: { name: "AWAKENING", desc: "初次抵達，僅能看見表象 (首頁)" },
        1: { name: "AWARENESS", desc: "完成靈魂問答，解鎖監控儀 (Monitor)" },
        2: { name: "OBSERVER", desc: "在監控儀互動超過 3 次，解鎖時間軸 (Timeline)" },
        3: { name: "SEEKER", desc: "在時間軸閱讀預言，解鎖深度連結" }
    },

    // 獲取當前狀態
    getState: function() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : { level: 0, xp: 0, interactions: 0 };
    },

    // 保存狀態
    saveState: function(state) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        this.initUI(); // 更新介面
    },

    // 增加互動經驗 (XP)
    addInteraction: function(amount = 1) {
        let state = this.getState();
        state.interactions += amount;
        
        // 升級邏輯：Level 1 -> 2 (需要 3 次互動)
        if (state.level === 1 && state.interactions >= 3) {
            this.levelUp(2);
        } else {
            this.saveState(state);
        }
    },

    // 執行升級
    levelUp: function(newLevel) {
        let state = this.getState();
        if (newLevel > state.level) {
            state.level = newLevel;
            this.saveState(state);
            this.showNotification(`SYSTEM UPGRADE: ${this.LEVELS[newLevel].name} - ACCESS GRANTED`);
        }
    },

    // 檢查並鎖定/解鎖 UI 元素 (在頁面加載時調用)
    initUI: function() {
        const state = this.getState();
        const currentPath = window.location.pathname;

        // 1. 首頁 (index.html) 的邏輯
        if (currentPath.includes('index') || currentPath === '/' || currentPath.endsWith('.html')) {
            const monitorGate = document.querySelector('a[href*="monitor"]');
            const timelineGate = document.querySelector('a[href*="timeline"]');
            
            // Level 0: 鎖住 Monitor 和 Timeline
            if (state.level < 1) {
                if (monitorGate) this.lockElement(monitorGate, "COMPLETE 'IF IT WERE YOU' FIRST");
                if (timelineGate) this.lockElement(timelineGate, "SYSTEM OFFLINE");
            } else {
                if (monitorGate) this.unlockElement(monitorGate);
            }

            // Level 1: 鎖住 Timeline
            if (state.level < 2) {
                if (timelineGate) this.lockElement(timelineGate, "INSUFFICIENT DATA. ANALYZE MONITOR FIRST.");
            } else {
                if (timelineGate) this.unlockElement(timelineGate);
            }
        }
    },

    // 鎖定元素的視覺處理
    lockElement: function(el, msg) {
        if (!el || el.classList.contains('locked')) return;
        el.classList.add('locked');
        el.style.pointerEvents = 'none';
        el.style.filter = 'grayscale(1) brightness(0.5)';
        el.style.opacity = '0.5';
        
        // 添加鎖頭圖標
        let lock = document.createElement('div');
        lock.className = 'lock-overlay';
        lock.innerHTML = `<div style='position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#ff4444; font-family:monospace; background:rgba(0,0,0,0.8); z-index:10; border-radius:inherit;'>
            <span style='font-size:24px'>🔒</span>
            <span style='font-size:10px; margin-top:5px; text-align:center'>${msg}</span>
        </div>`;
        el.style.position = 'relative';
        el.appendChild(lock);
    },

    // 解鎖元素的視覺處理
    unlockElement: function(el) {
        if (!el) return;
        el.classList.remove('locked');
        el.style.pointerEvents = 'auto';
        el.style.filter = 'none';
        el.style.opacity = '1';
        const lock = el.querySelector('.lock-overlay');
        if (lock) lock.remove();
    },

    // 簡單的通知彈窗
    showNotification: function(text) {
        const div = document.createElement('div');
        div.style.cssText = "position:fixed; bottom:20px; right:20px; background:rgba(0,20,30,0.9); border:1px solid #00f3ff; color:#00f3ff; padding:15px; font-family:monospace; z-index:99999; backdrop-filter:blur(5px); animation: slideIn 0.5s ease-out; box-shadow: 0 0 20px rgba(0,243,255,0.2);";
        div.innerHTML = `<span style='margin-right:10px'>⚠️</span>${text}`;
        document.body.appendChild(div);
        setTimeout(() => {
            div.style.opacity = '0';
            div.style.transition = 'opacity 0.5s';
            setTimeout(() => div.remove(), 500);
        }, 4000);
    }
};

// 自動初始化
document.addEventListener('DOMContentLoaded', () => TRIB_SYSTEM.initUI());