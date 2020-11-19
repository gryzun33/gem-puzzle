export function addBestScore(sec, min, currMin, currSec, movesCount, scores) {
  const totalTime = sec + min * 60;
  const score = {
    'score-totaltime': totalTime,
    'score-time': `${currMin} : ${currSec}`,
    'score-moves': movesCount,
  };
  if (localStorage.getItem('bestScores')) {
    scores = JSON.parse(localStorage.getItem('bestScores'));
  }
  scores.push(score);
  if (scores.length >= 2) {
    scores = scores.sort((a, b) => a['score-totaltime'] - b['score-totaltime']);
  }
  if (scores.length >= 10) {
    scores.splice(10, scores.length - 1);
  }
  localStorage.setItem('bestScores', JSON.stringify(scores));
}
