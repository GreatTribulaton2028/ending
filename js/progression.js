/**
 * Progressive Awakening Protocol - Progression System
 * Manages user progression through the awakening journey
 */

const Progression = {
    // localStorage keys
    KEYS: {
        LEVEL: 'awakening_level',
        CANDLES: 'candle_interactions'
    },

    /**
     * Initialize awakening - sets level to 1 and redirects to monitor.html
     */
    awaken: function() {
        localStorage.setItem(this.KEYS.LEVEL, '1');
        localStorage.setItem(this.KEYS.CANDLES, '0');
        window.location.href = 'monitor.html';
    },

    /**
     * Check monitor progress - increments candle count and checks for level 2 unlock
     */
    checkMonitorProgress: function() {
        const level = parseInt(localStorage.getItem(this.KEYS.LEVEL) || '0');
        const candles = parseInt(localStorage.getItem(this.KEYS.CANDLES) || '0');
        
        // Increment candle count
        const newCandles = candles + 1;
        localStorage.setItem(this.KEYS.CANDLES, newCandles.toString());
        
        // Check if eligible for level 2
        if (newCandles >= 3 && level < 2) {
            localStorage.setItem(this.KEYS.LEVEL, '2');
            alert('Permission Elevated: Level 2');
            
            // Dynamically add timeline access button
            this.addTimelineButton();
        }
    },

    /**
     * Add timeline access button to the page
     */
    addTimelineButton: function() {
        // Check if button already exists
        if (document.getElementById('timeline-access-btn')) {
            return;
        }

        // Create button
        const button = document.createElement('button');
        button.id = 'timeline-access-btn';
        button.textContent = '進入時間軸 | Enter Timeline';
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 15px 30px;
            background: linear-gradient(135deg, #00f3ff 0%, #0066ff 100%);
            color: #000000;
            font-family: 'Orbitron', monospace;
            font-weight: 700;
            font-size: 14px;
            border: 2px solid #00f3ff;
            border-radius: 5px;
            cursor: pointer;
            z-index: 10000;
            box-shadow: 0 0 30px rgba(0, 243, 255, 0.5);
            transition: all 0.3s ease;
            letter-spacing: 2px;
        `;
        
        // Hover effect
        button.onmouseover = function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 50px rgba(0, 243, 255, 0.8)';
        };
        button.onmouseout = function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.5)';
        };
        
        // Click handler
        button.onclick = function() {
            window.location.href = 'timeline.html';
        };
        
        document.body.appendChild(button);
    },

    /**
     * Verify timeline access - checks if user has level 2 access
     * If not, alerts and redirects to index.html
     */
    verifyTimelineAccess: function() {
        const level = parseInt(localStorage.getItem(this.KEYS.LEVEL) || '0');
        
        if (level < 2) {
            alert('Access Denied');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
};

// Auto-execute verification if on timeline.html
if (window.location.pathname.includes('timeline.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        Progression.verifyTimelineAccess();
    });
}
