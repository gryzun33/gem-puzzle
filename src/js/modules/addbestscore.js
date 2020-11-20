export function addBestScore(sec, min, currMin, currSec, movesCount, scores) {
  const totalTime = sec + min * 60;
  const score = {
    'score-totaltime': totalTime,
    'score-time': `${currMin} : ${currSec}`,
    'score-moves': movesCount,
  };
  const best = localStorage.getItem('bestScores');
  if (best) {
    scores = JSON.parse(best);
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
