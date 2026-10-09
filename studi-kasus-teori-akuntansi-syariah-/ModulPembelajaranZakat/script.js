const quizData = [
    {
        question: "Berapakah harga yang digunakan untuk menilai Emas Batangan dalam perhitungan Zakat (BAZNAS)?",
        options: [
            "Harga Jual Emas (Rp 2,25 juta/gram)",
            "Harga Beli Historis",
            "Harga Buyback (Rp 2,10 juta/gram)",
            "Harga Rata-rata"
        ],
        correct: 2,
        explanation: "Sesuai dengan PSAK 113 dan Pedoman BAZNAS, nilai wajar menggunakan konsep 'exit price' yaitu harga yang diterima saat aset dijual, sehingga menggunakan Harga Buyback (Rp 2,10 juta/gram)."
    },
    {
        question: "Mengapa persediaan barang laku (fast moving) PT ANS dinilai dengan Harga Grosir (Rp 2.400 juta)?",
        options: [
            "Karena nilai tersebut paling tinggi agar zakatnya besar",
            "Karena PT ANS beroperasi di pasar grosir (principal market)",
            "Karena mengikuti prinsip konservatisme akuntansi",
            "Karena itu adalah harga eceran"
        ],
        correct: 1,
        explanation: "PSAK 113 mewajibkan penggunaan harga di pasar utama (principal market) tempat entitas beroperasi. Karena PT ANS adalah distributor grosir, pasar utamanya adalah grosir."
    },
    {
        question: "Bagaimana perlakuan zakat terhadap Bunga Giro Bank Konvensional sebesar Rp 6,00 juta?",
        options: [
            "Dihitung sebagai penambah dasar zakat",
            "Dibiarkan saja karena jumlahnya kecil",
            "Dikeluarkan (dikurangkan) dari saldo giro dan disalurkan ke dana kebajikan",
            "Diakui sebagai pendapatan bersih perusahaan"
        ],
        correct: 2,
        explanation: "Dana non-halal seperti bunga konvensional harus dipurifikasi (dikeluarkan) dari perhitungan kekayaan dan disalurkan terpisah sebagai dana kebajikan."
    },
    {
        question: "Apakah kenaikan nilai wajar Aset Tetap dan Properti Investasi (Rp 1.900 juta) dikenakan zakat?",
        options: [
            "Ya, karena meningkatkan kekayaan pemegang saham",
            "Tidak, karena difungsikan untuk operasional dan tidak memenuhi syarat harta berkembang (nama' perdagangan)",
            "Ya, tetapi hanya separuhnya",
            "Tidak, karena belum dijual"
        ],
        correct: 1,
        explanation: "Aset tetap (qunayah) difungsikan untuk operasional (value in use), bukan untuk diperdagangkan (urud al-tijarah), sehingga gugur syarat nama' (berkembang/perdagangan)."
    },
    {
        question: "Berapa total Dasar Zakat (Wi'a) akhir perusahaan berdasarkan perhitungan BAZNAS?",
        options: [
            "Rp 4.108,00 juta",
            "Rp 5.837,00 juta",
            "Rp 1.570,00 juta",
            "Rp 4.267,00 juta"
        ],
        correct: 3,
        explanation: "Dasar zakat = Total Aset Wajib Zakat (Rp 5.837 juta) - Total Liabilitas Pengurang (Rp 1.570 juta) = Rp 4.267,00 juta."
    }
];

let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

// Tab Navigation
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Quiz Initialization
function initQuiz() {
    const quizContainer = document.getElementById('quiz-questions');
    quizContainer.innerHTML = '';
    
    quizData.forEach((q, index) => {
        const qBox = document.createElement('div');
        qBox.className = `question-box ${index === 0 ? 'active' : ''}`;
        qBox.id = `qbox-${index}`;
        
        let optionsHtml = '';
        q.options.forEach((opt, optIdx) => {
            optionsHtml += `<button class="option-btn" onclick="selectOption(${index}, ${optIdx}, this)">${opt}</button>`;
        });
        
        qBox.innerHTML = `
            <h3>Pertanyaan ${index + 1} dari ${quizData.length}</h3>
            <p style="font-size:1.1rem; margin-top:1rem; font-weight:600;">${q.question}</p>
            <div class="options">${optionsHtml}</div>
            <div class="explanation" id="expl-${index}" style="display:none; margin-top:1.5rem;">
                <div class="explanation-title">Penjelasan:</div>
                ${q.explanation}
            </div>
        `;
        quizContainer.appendChild(qBox);
    });
    
    updateQuizButtons();
}

function selectOption(qIndex, optIdx, btnElement) {
    if (hasAnswered) return; // Prevent multiple clicks
    
    hasAnswered = true;
    const isCorrect = optIdx === quizData[qIndex].correct;
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        // Show the correct one
        const btns = document.getElementById(`qbox-${qIndex}`).querySelectorAll('.option-btn');
        btns[quizData[qIndex].correct].classList.add('correct');
    }
    
    // Show explanation
    document.getElementById(`expl-${qIndex}`).style.display = 'block';
    
    // Enable Next button
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        document.getElementById(`qbox-${currentQuestion}`).classList.remove('active');
        currentQuestion++;
        document.getElementById(`qbox-${currentQuestion}`).classList.add('active');
        hasAnswered = false;
        document.getElementById('next-btn').disabled = true;
        
        if (currentQuestion === quizData.length - 1) {
            document.getElementById('next-btn').innerText = 'Lihat Hasil';
        }
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('quiz-controls').style.display = 'none';
    
    const resultBox = document.getElementById('quiz-result');
    resultBox.style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    let msg = '';
    if (percentage === 100) msg = "Luar Biasa! Pemahaman Anda sempurna.";
    else if (percentage >= 60) msg = "Bagus! Anda memahami konsep dasar dengan baik.";
    else msg = "Silakan pelajari kembali modul teori dan perhitungan.";
    
    resultBox.innerHTML = `
        <h3>Skor Anda: ${score} / ${quizData.length} (${percentage}%)</h3>
        <p>${msg}</p>
        <button class="btn btn-primary" style="margin-top:2rem;" onclick="resetQuiz()">Ulangi Kuis</button>
    `;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    hasAnswered = false;
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('quiz-controls').style.display = 'flex';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('next-btn').innerText = 'Selanjutnya';
    document.getElementById('next-btn').disabled = true;
    initQuiz();
}

function updateQuizButtons() {
    document.getElementById('next-btn').disabled = true;
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
});
