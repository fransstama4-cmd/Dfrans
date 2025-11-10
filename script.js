const calendar = document.getElementById('calendar');
const workoutList = document.getElementById('workout-list');
const saveBtn = document.getElementById('save-btn');
const caloriesInput = document.getElementById('calories');
const calorieProgress = document.getElementById('calorie-progress');
const weightInput = document.getElementById('weight');
const saveWeightBtn = document.getElementById('save-weight');
const weightList = document.getElementById('weight-list');
const exportBtn = document.getElementById('export-btn');

const days = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'];
const workouts = {
  'Senin': ['Workout Rumah - Full Body'],
  'Selasa': ['Dada','Tricep','Bahu'],
  'Rabu': ['Core & Abs'],
  'Kamis': ['Workout Rumah - Cardio'],
  'Jumat': ['Bicep','Wing','Back'],
  'Sabtu': ['Bulutangkis'],
  'Minggu': ['Rest']
};

let data = JSON.parse(localStorage.getItem('trackerData')) || { weights: [] };
let selectedDay = '';

days.forEach(day => {
  const li = document.createElement('li');
  li.textContent = day;
  li.addEventListener('click', () => selectDay(day));
  calendar.appendChild(li);
});

function selectDay(day) {
  selectedDay = day;
  document.getElementById('day-title').textContent = day;
  workoutList.innerHTML = '';
  workouts[day].forEach(ex => {
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    const lbl = document.createElement('label');
    lbl.textContent = ex;
    const div = document.createElement('div');
    div.append(chk,lbl);
    workoutList.appendChild(div);
  });
}

saveBtn.addEventListener('click', () => {
  const calories = parseInt(caloriesInput.value) || 0;
  calorieProgress.value = calories;
  localStorage.setItem('trackerData', JSON.stringify(data));
});

saveWeightBtn.addEventListener('click', () => {
  const weight = parseFloat(weightInput.value);
  if (!isNaN(weight)) {
    data.weights.push({ week: data.weights.length + 1, weight });
    renderWeights();
    localStorage.setItem('trackerData', JSON.stringify(data));
  }
});

function renderWeights() {
  weightList.innerHTML = '';
  data.weights.forEach(w => {
    const li = document.createElement('li');
    li.textContent = `Minggu ${w.week}: ${w.weight} kg`;
    weightList.appendChild(li);
  });
}

exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'workout_tracker_data.json';
  a.click();
});

renderWeights();
