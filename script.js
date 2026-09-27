// Page navigation

const navigationItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const pageTitle = document.getElementById("pageTitle");

const pageNames = {
  dashboard: "Dashboard Overview",
  search: "Search Insights",
  reports: "Feasibility Reports",
  schemes: "Government Schemes",
  settings: "Application Settings"
};

function showPage(pageId) {
  pages.forEach(function (page) {
    page.classList.remove("active");
  });

  navigationItems.forEach(function (item) {
    item.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);
  const selectedNavigation = document.querySelector(
    `[data-page="${pageId}"]`
  );

  if (selectedPage) {
    selectedPage.classList.add("active");
  }

  if (selectedNavigation) {
    selectedNavigation.classList.add("active");
  }

  pageTitle.textContent = pageNames[pageId];

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

navigationItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const pageId = item.getAttribute("data-page");
    showPage(pageId);
  });
});


// Dark and Light Mode

const themeToggle = document.getElementById("themeToggle");
const darkSwitch = document.getElementById("darkSwitch");

function toggleTheme() {
  document.body.classList.toggle("dark");

  const darkModeEnabled = document.body.classList.contains("dark");

  if (darkModeEnabled) {
    themeToggle.textContent = "☀";
    darkSwitch.classList.add("active");
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "☾";
    darkSwitch.classList.remove("active");
    localStorage.setItem("theme", "light");
  }
}

themeToggle.addEventListener("click", toggleTheme);
darkSwitch.addEventListener("click", toggleTheme);

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
  darkSwitch.classList.add("active");
}


// Financial Calculator

const marginSlider = document.getElementById("marginSlider");

const marginValue = document.getElementById("marginValue");
const projectCost = document.getElementById("projectCost");
const loanValue = document.getElementById("loanValue");
const emiValue = document.getElementById("emiValue");
const sliderText = document.getElementById("sliderText");

function formatCurrency(value) {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

function calculateEMI(principal, annualInterestRate, months) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  const emi =
    principal *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, months) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);

  return emi;
}

function updateFinancialData() {
  const marginCapital = Number(marginSlider.value);

  const totalProjectCost = marginCapital * 10;
  const eligibleLoan = totalProjectCost - marginCapital;

  const monthlyEMI = calculateEMI(
    eligibleLoan,
    8.5,
    120
  );

  marginValue.textContent = formatCurrency(marginCapital);
  sliderText.textContent = formatCurrency(marginCapital);
  projectCost.textContent = formatCurrency(totalProjectCost);
  loanValue.textContent = formatCurrency(eligibleLoan);
  emiValue.textContent = formatCurrency(monthlyEMI);
}

marginSlider.addEventListener("input", updateFinancialData);

updateFinancialData();


// Search Functionality

function filterSearchResults(searchText) {
  const searchTerm = searchText.toLowerCase();
  const searchableItems = document.querySelectorAll(".searchable");

  searchableItems.forEach(function (item) {
    const itemText = item.innerText.toLowerCase();

    if (itemText.includes(searchTerm)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

const topSearch = document.getElementById("topSearch");
const insightSearch = document.getElementById("insightSearch");

topSearch.addEventListener("input", function () {
  filterSearchResults(topSearch.value);
});

insightSearch.addEventListener("input", function () {
  filterSearchResults(insightSearch.value);
});


// Download Report

function downloadReport() {
  const reportText = `
GRAMINSAATHI AI
DAIRY UNIT FEASIBILITY REPORT

-----------------------------------

Feasibility Score: 72%
Confidence: Medium
Location: Rampur Block

Financial Summary:
Project Cost: ${projectCost.textContent}
Loan Eligibility: ${loanValue.textContent}
Estimated EMI: ${emiValue.textContent}

Recommended Schemes:
1. PMEGP
2. MUDRA Loan

Strengths:
- Strong local demand
- Existing dairy experience
- Family labor availability

Weaknesses:
- Limited working capital
- Seasonal fodder availability

Opportunities:
- Fresh milk delivery
- Nearby schools and households
- Local market expansion

Risks:
- Feed price increases
- Disease risk
- Buyer dependency

Disclaimer:
This report is advisory only.
Final approval rests with the concerned bank or government agency.
`;

  const reportFile = new Blob(
    [reportText],
    { type: "text/plain" }
  );

  const downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(reportFile);
  downloadLink.download = "GraminSaathi-Feasibility-Report.txt";

  downloadLink.click();

  URL.revokeObjectURL(downloadLink.href);
}


// Settings Switches

const switches = document.querySelectorAll(".switch");

switches.forEach(function (switchElement) {
  switchElement.addEventListener("click", function () {
    switchElement.classList.toggle("active");
  });
});