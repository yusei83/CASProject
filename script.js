const uploadForm = document.getElementById('uploadForm');
const resourceList = document.getElementById('resourceList');
const filterSubject = document.getElementById('filterSubject');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const resources = [];

const subjects = [
  "Business management",
  "Japanese Language A: language and literature",
  "English Language A: language and literature",
  "Japanese Language Ab initio",
  "French Language Ab initio",
  "Japanese Language B",
  "French Language B",
  "Economics",
  "History",
  "Biology",
  "Chemistry",
  "Computer science",
  "Design technology",
  "Physics",
  "Mathematics Analysis and approaches",
  "Mathematics Applications and interpretation"
];

subjects.forEach(subject => {
  const option = document.createElement("option");
  option.value = subject;
  option.textContent = subject;
  filterSubject.appendChild(option);
});

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const subject = document.getElementById('subject').value;
  const file = document.getElementById('file').files[0];
  const link = document.getElementById('link').value;

  const levelCheckboxes = document.querySelectorAll('input[name="level"]:checked');
  const levels = Array.from(levelCheckboxes).map(cb => cb.value).join(', ');

  if (!file && !link) {
    alert("Please upload a file or enter a website link.");
    return;
  }

  let fileURL = "";
  if (file) {
    fileURL = URL.createObjectURL(file);
  } else {
    fileURL = link;
  }

  resources.push({ title, subject, levels, fileURL });
  alert("Resource uploaded successfully!");
  uploadForm.reset();
});

filterSubject.addEventListener('change', () => {
  const selected = filterSubject.value;
  resourceList.innerHTML = '';

  const filtered = resources.filter(r => r.subject === selected);
  filtered.forEach(r => {
    const isLink = r.fileURL.startsWith("http");
    const li = document.createElement('li');
    li.innerHTML = `<strong>${r.title}</strong> (${r.levels}) - <a href="${r.fileURL}" target="_blank">${isLink ? "Visit Link" : "Download File"}</a>`;
    resourceList.appendChild(li);
  });
});
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = '';

  if (!query) return;

  const matched = resources.filter(r => r.title.toLowerCase().includes(query));

  if (matched.length === 0) {
    searchResults.innerHTML = '<li>No results found.</li>';
    return;
  }

  matched.forEach(r => {
    const isLink = r.fileURL.startsWith("http");
    const li = document.createElement('li');
    li.innerHTML = `<strong>${r.title}</strong> (${r.levels}, ${r.subject}) - <a href="${r.fileURL}" target="_blank">${isLink ? "Visit Link" : "Download File"}</a>`;
    searchResults.appendChild(li);
  });
});
