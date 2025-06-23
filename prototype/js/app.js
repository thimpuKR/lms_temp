// DOM 요소 가져오기
const memoInput = document.getElementById('memo-input');
const saveBtn = document.getElementById('save-btn');
const memoList = document.getElementById('memo-list');

// "메모 추가" 버튼 클릭 이벤트 리스너 추가
saveBtn.addEventListener('click', () => {
    const memoText = memoInput.value;

    // 입력값이 비어있지 않을 때만 메모 추가
    if (memoText.trim() !== '') {
        addMemoToList(memoText);
        memoInput.value = ''; // 입력 필드 초기화
        memoInput.focus(); // 입력 필드에 포커스 유지
    }
});

// 메모를 목록에 추가하는 함수
function addMemoToList(text) {
    const newMemo = document.createElement('li');
    newMemo.textContent = text;
    memoList.appendChild(newMemo);
}

// 초기화 함수
function init() {
    console.log("메모 앱 프로토타입이 시작되었습니다.");
}

init(); 