export function createAlert() {
  return `
    <div class="alert">
    
        
        <div class="message">
            <div class="target_press"></div>
            <div>구독 해지 할꺼야?</div>
        </div>

        <div class="flex_row button_container">
            <button class="unsub_ok_button">예</button>
            <button class="unsub_cancel_button">아니오</button>
        </div>
    
    </div>
    `;
}
