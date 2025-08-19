const quizData = [
  { question: 'こんにちは（韓国語）', answer: '안녕하세요' },
  { question: 'ありがとう（韓国語）', answer: '감사합니다' },
  { question: 'さようなら（韓国語）', answer: '안녕히 가세요' },
  { question: '愛（韓国語）', answer: '사랑' },
  { question: '友達（韓国語）', answer: '친구' },
  { question: '家族（韓国語）', answer: '가족' },
  { question: '美味しい（韓国語）', answer: '맛있어요' },
  { question: '勉強（韓国語）', answer: '공부' },
  { question: '日本（韓国語）', answer: '일본' },
  { question: '韓国（韓国語）', answer: '한국' }
];

const grammarQuestions = [
  // 助詞
  { question: '「私は学校に行きます」韓国語の「に」に当たる助詞は？', answer: '에', choices: ['에', '에서', '와', '도'] },
  { question: '「友達と映画を見ました」韓国語の「と」に当たる助詞は？', answer: '와', choices: ['와', '에', '에서', '도'] },
  { question: '「本も読みます」韓国語の「も」に当たる助詞は？', answer: '도', choices: ['도', '에', '와', '에서'] },
  { question: '「家で勉強します」韓国語の「で」に当たる助詞は？', answer: '에서', choices: ['에서', '에', '와', '도'] },
  { question: '「彼は先生です」韓国語の「は」に当たる助詞は？', answer: '은', choices: ['은', '도', '에', '와'] },
  { question: '「私は学生です」韓国語の「は」に当たる助詞は？', answer: '는', choices: ['는', '도', '에', '와'] },
  { question: '「机の上に本があります」韓国語の「の」に当たる助詞は？', answer: '의', choices: ['의', '에', '와', '도'] },
  { question: '「日本から来ました」韓国語の「から」に当たる助詞は？', answer: '에서', choices: ['에서', '에', '와', '도'] },
  { question: '「友達と一緒に」韓国語の「と」に当たる助詞は？', answer: '과', choices: ['과', '에', '에서', '도'] },
  { question: '「学校へ行きます」韓国語の「へ」に当たる助詞は？', answer: '에', choices: ['에', '에서', '와', '도'] },
  // 語順
  { question: '「私はリンゴを食べます」韓国語の語順は？', answer: '私は リンゴを 食べます', choices: ['私は リンゴを 食べます', 'リンゴを 私は 食べます', '食べます 私は リンゴを', 'リンゴを 食べます 私は'] },
  { question: '「彼は静かにドアを開けた」韓国語の語順は？', answer: '彼は 静かに ドアを 開けた', choices: ['彼は 静かに ドアを 開けた', '静かに 彼は ドアを 開けた', 'ドアを 彼は 静かに 開けた', '開けた ドアを 彼は 静かに'] },
  { question: '「私は本を読んでいます」韓国語の語順は？', answer: '私は 本を 読んでいます', choices: ['私は 本を 読んでいます', '本を 私は 読んでいます', '読んでいます 私は 本を', '本を 読んでいます 私は'] },
  { question: '「彼女は歌を歌います」韓国語の語順は？', answer: '彼女は 歌を 歌います', choices: ['彼女は 歌を 歌います', '歌を 彼女は 歌います', '歌います 彼女は 歌を', '歌を 歌います 彼女は'] },
  { question: '「私は静かに歩きます」韓国語の語順は？', answer: '私は 静かに 歩きます', choices: ['私は 静かに 歩きます', '静かに 私は 歩きます', '歩きます 私は 静かに', '静かに 歩きます 私は'] },
  { question: '「彼は早く走ります」韓国語の語順は？', answer: '彼は 早く 走ります', choices: ['彼は 早く 走ります', '早く 彼は 走ります', '走ります 彼は 早く', '早く 走ります 彼は'] },
  { question: '「私は水を飲みます」韓国語の語順は？', answer: '私は 水を 飲みます', choices: ['私は 水を 飲みます', '水を 私は 飲みます', '飲みます 私は 水を', '水を 飲みます 私は'] },
  { question: '「彼女は静かに話します」韓国語の語順は？', answer: '彼女は 静かに 話します', choices: ['彼女は 静かに 話します', '静かに 彼女は 話します', '話します 彼女は 静かに', '静かに 話します 彼女は'] },
  { question: '「私は家に帰ります」韓国語の語順は？', answer: '私は 家に 帰ります', choices: ['私は 家に 帰ります', '家に 私は 帰ります', '帰ります 私は 家に', '家に 帰ります 私は'] },
  { question: '「彼は静かに座ります」韓国語の語順は？', answer: '彼は 静かに 座ります', choices: ['彼は 静かに 座ります', '静かに 彼は 座ります', '座ります 彼は 静かに', '静かに 座ります 彼は'] },
  // 時制
  { question: '「私は昨日映画を見ました」韓国語の時制は？', answer: '過去', choices: ['過去', '現在', '未来', '完了'] },
  { question: '「彼は明日学校へ行きます」韓国語の時制は？', answer: '未来', choices: ['未来', '現在', '過去', '完了'] },
  { question: '「私は今勉強しています」韓国語の時制は？', answer: '現在', choices: ['現在', '過去', '未来', '完了'] },
  { question: '「彼女はすでに食べました」韓国語の時制は？', answer: '完了', choices: ['完了', '過去', '現在', '未来'] },
  { question: '「私は毎日走ります」韓国語の時制は？', answer: '現在', choices: ['現在', '過去', '未来', '完了'] },
  { question: '「彼は来週旅行します」韓国語の時制は？', answer: '未来', choices: ['未来', '現在', '過去', '完了'] },
  { question: '「私は先週本を読みました」韓国語の時制は？', answer: '過去', choices: ['過去', '現在', '未来', '完了'] },
  { question: '「彼女はもう帰りました」韓国語の時制は？', answer: '完了', choices: ['完了', '過去', '現在', '未来'] },
  { question: '「私は今ご飯を食べています」韓国語の時制は？', answer: '現在', choices: ['現在', '過去', '未来', '完了'] },
  { question: '「彼は昨日友達に会いました」韓国語の時制は？', answer: '過去', choices: ['過去', '現在', '未来', '完了'] }
];

const novelQuestions = [
  { question: '「그는 조용히 문을 열었다」日本語訳は？', answer: '彼は静かにドアを開けた', choices: ['彼は静かにドアを開けた', '彼は大きな声でドアを閉めた', '彼女は静かに窓を開けた', '彼は急いでドアを開けた'] },
  { question: '「그녀는 슬프게 웃었다」日本語訳は？', answer: '彼女は悲しそうに笑った', choices: ['彼女は悲しそうに笑った', '彼女は嬉しそうに泣いた', '彼は悲しそうに笑った', '彼女は静かに笑った'] },
  { question: '「바람이 부드럽게 불었다」日本語訳は？', answer: '風がやさしく吹いた', choices: ['風がやさしく吹いた', '雨が激しく降った', '風が強く吹いた', '雲が静かに流れた'] },
  { question: '「그는 천천히 걸었다」日本語訳は？', answer: '彼はゆっくり歩いた', choices: ['彼はゆっくり歩いた', '彼は急いで走った', '彼女はゆっくり歩いた', '彼は静かに座った'] },
  { question: '「그녀는 조용히 말했다」日本語訳は？', answer: '彼女は静かに話した', choices: ['彼女は静かに話した', '彼女は大きな声で話した', '彼は静かに話した', '彼女は静かに歌った'] },
  { question: '「나무가 푸르게 빛났다」日本語訳は？', answer: '木が青々と輝いた', choices: ['木が青々と輝いた', '空が青く広がった', '木が赤く染まった', '花が美しく咲いた'] },
  { question: '「그는 힘차게 문을 닫았다」日本語訳は？', answer: '彼は力強くドアを閉めた', choices: ['彼は力強くドアを閉めた', '彼は静かにドアを開けた', '彼女は力強く窓を閉めた', '彼は急いでドアを開けた'] },
  { question: '「그녀는 기쁘게 달렸다」日本語訳は？', answer: '彼女は嬉しそうに走った', choices: ['彼女は嬉しそうに走った', '彼女は悲しそうに歩いた', '彼は嬉しそうに走った', '彼女は静かに走った'] },
  { question: '「하늘이 맑게 개었다」日本語訳は？', answer: '空が晴れ渡った', choices: ['空が晴れ渡った', '空が曇った', '雲が流れた', '雨が降った'] },
  { question: '「그는 조용히 앉았다」日本語訳は？', answer: '彼は静かに座った', choices: ['彼は静かに座った', '彼女は静かに座った', '彼は静かに立った', '彼女は静かに立った'] }
];

let current = 0;
let score = 0;
let selected = null;
let mode = 'word'; // 'word' or 'grammar' or 'novel'

const tabWord = document.getElementById('tab-word');
const tabGrammar = document.getElementById('tab-grammar');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

function getRandomChoices(correct, allData, num = 4) {
  if (Array.isArray(allData)) {
    if (allData[0].choices) {
      // 文法・小説問題はchoicesを使う
      return allData[current].choices;
    }
    // 単語問題はランダム生成
    const wrongs = allData.map(q => q.answer).filter(a => a !== correct);
    const shuffled = wrongs.sort(() => Math.random() - 0.5);
    const choices = shuffled.slice(0, num - 1);
    choices.push(correct);
    return choices.sort(() => Math.random() - 0.5);
  }
  return [];
}

function showQuestion() {
  let dataArr;
  if (mode === 'word') {
    dataArr = quizData;
  } else if (mode === 'grammar') {
    dataArr = grammarQuestions;
  } else {
    dataArr = novelQuestions;
  }
  questionEl.textContent = dataArr[current].question;
  resultEl.textContent = '';
  resultEl.className = '';
  resultEl.style.display = 'none';
  submitBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none';
  choicesEl.innerHTML = '';
  selected = null;
  const choices = getRandomChoices(dataArr[current].answer, dataArr);
  choices.forEach(choice => {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.margin = '10px 0';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'choice';
    radio.value = choice;
    radio.style.marginRight = '10px';
    radio.onclick = () => { selected = choice; };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(choice));
    choicesEl.appendChild(label);
  });
}

submitBtn.addEventListener('click', () => {
  let dataArr;
  if (mode === 'word') {
    dataArr = quizData;
  } else if (mode === 'grammar') {
    dataArr = grammarQuestions;
  } else {
    dataArr = novelQuestions;
  }
  if (!selected) {
    resultEl.textContent = '選択肢を選んでください';
    resultEl.className = '';
    resultEl.style.display = 'inline-block';
    return;
  }
  if (selected === dataArr[current].answer) {
    resultEl.textContent = '正解！';
    resultEl.className = 'result-correct';
    resultEl.style.display = 'inline-block';
    score++;
    scoreEl.textContent = score;
  } else {
    resultEl.textContent = `不正解。正しい答え: ${dataArr[current].answer}`;
    resultEl.className = 'result-wrong';
    resultEl.style.display = 'inline-block';
  }
  submitBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
});

nextBtn.addEventListener('click', () => {
  let dataArr;
  if (mode === 'word') {
    dataArr = quizData;
  } else if (mode === 'grammar') {
    dataArr = grammarQuestions;
  } else {
    dataArr = novelQuestions;
  }
  current++;
  if (current < dataArr.length) {
    showQuestion();
  } else {
    questionEl.textContent = '終了！お疲れ様でした。';
    choicesEl.innerHTML = '';
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    resultEl.textContent = `最終スコア: ${score} / ${dataArr.length}`;
    resultEl.className = '';
    resultEl.style.display = 'inline-block';
  }
});

tabWord.addEventListener('click', () => {
  tabWord.classList.add('active');
  tabGrammar.classList.remove('active');
  mode = 'word';
  current = 0;
  score = 0;
  scoreEl.textContent = score;
  showQuestion();
});

tabGrammar.addEventListener('click', () => {
  tabGrammar.classList.add('active');
  tabWord.classList.remove('active');
  mode = 'grammar';
  current = 0;
  score = 0;
  scoreEl.textContent = score;
  showQuestion();
});

// 小説語彙タブ追加
const novelTab = document.createElement('button');
novelTab.id = 'tab-novel';
novelTab.className = 'tab-btn';
novelTab.textContent = '小説語彙';
document.getElementById('tab-container').appendChild(novelTab);
novelTab.addEventListener('click', () => {
  tabWord.classList.remove('active');
  tabGrammar.classList.remove('active');
  novelTab.classList.add('active');
  mode = 'novel';
  current = 0;
  score = 0;
  scoreEl.textContent = score;
  showQuestion();
});

showQuestion();
